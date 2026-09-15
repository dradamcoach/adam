/*
 * المساعد الذكي (AI) لشات ADAM
 * ================================
 * الوظيفة دي بتشتغل تلقائيًا كل ما العميل يبعت رسالة جديدة في شاته،
 * وبتردّ عليه فورًا باستخدام OpenAI — إلا لو مدربه رد قبلها هو، ساعتها
 * سايبينلها للمدرب وملناش دعوة.
 *
 * لازم قبل ما تشتغل:
 *   1) مشروع Firebase بتاعك يبقى على خطة Blaze (مدفوعة على حسب الاستخدام).
 *   2) عندك مفتاح API من OpenAI (platform.openai.com/api-keys) وحساب عليه
 *      وسيلة دفع مفعّلة هناك.
 *   3) تحط المفتاح ده كـ secret (مش تكتبه في الكود خالص):
 *        firebase functions:secrets:set OPENAI_API_KEY
 *   4) بعد كده تنشر الوظيفة:
 *        firebase deploy --only functions
 *
 * الشرح الكامل خطوة بخطوة موجود في ملف AI_CHAT_SETUP.md
 */

const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { defineSecret } = require('firebase-functions/params');
const { logger } = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

const OPENAI_API_KEY = defineSecret('OPENAI_API_KEY');

// اسم الموديل — gpt-4o-mini رخيص وسريع ومناسب لشات دعم زي ده.
// لو حبيت موديل تاني من OpenAI غيّر الاسم هنا بس.
const OPENAI_MODEL = 'gpt-4o-mini';

const SYSTEM_PROMPT = `
انت المساعد الذكي جوه تطبيق ADAM — منصة تدريب رياضي وتأهيل من الإصابات
وتغذية واستشارات طبية، بيديرها مدربين ومتخصصين حقيقيين.

دورك: ترد على أسئلة العميل بسرعة وبشكل ودود ومفيد، باللهجة اللي بيكتب
بيها العميل (لو كتب عربي رد عربي، لو كتب إنجليزي رد إنجليزي).

قواعد مهمة جدًا لازم تلتزم بيها:
- انت مساعد بيساعد، مش دكتور ومش مدرب فعلي. متديش تشخيص طبي ولا تقول
  للعميل ياخد دوا معين أو يوقف دوا. لو حد بيتكلم عن ألم أو إصابة أو أي
  حاجة صحية، اطمنه بسرعة واقترح عليه يستنى ردّ مدربه أو المتخصص المتابع
  حالته، أو يبلّغ عن الإصابة من زرار "بلّغ عن إصابة" في التطبيق.
- متديش قرار في حاجة خاصة بالفلوس أو الاشتراك أو الأسعار أو الاسترجاع —
  قول للعميل إن مدربه هيتابع معاه ده بنفسه.
- لو مش متأكد من إجابة سؤال، قول بصراحة إنك مش متأكد واقترح إنه يستنى
  المدرب يرد بدل ما تخمّن.
- خلي ردودك قصيرة ومباشرة (2-4 جمل غالبًا)، من غير حشو.
`.trim();

/**
 * بيجيب آخر رسايل الشات (حد أقصى limit) عشان يديها لـ OpenAI كسياق للمحادثة
 */
async function fetchRecentMessages(email, limit) {
  const snap = await db
    .collection('chats').doc(email).collection('messages')
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  return snap.docs.map(function (docSnap) { return docSnap.data(); }).reverse();
}

exports.onChatMessageCreated = onDocumentCreated(
  {
    document: 'chats/{email}/messages/{messageId}',
    secrets: [OPENAI_API_KEY]
  },
  async function (event) {
    const snapshot = event.data;
    if (!snapshot) return;

    const message = snapshot.data();
    const email = event.params.email;

    // بنردّ بالذكاء الاصطناعي بس على رسايل العميل — مش على رد المدرب
    // ولا على رد المساعد نفسه (عشان منعملش لوب لا نهائي)
    if (!message || message.sender !== 'client') return;

    let clientName = '';
    try {
      const clientDoc = await db.collection('clients').doc(email).get();
      if (clientDoc.exists) clientName = clientDoc.data().name || '';
    } catch (error) {
      logger.warn('تعذر قراءة بيانات العميل', error);
    }

    let history = [];
    try {
      history = await fetchRecentMessages(email, 12);
    } catch (error) {
      logger.error('تعذر قراءة سجل الشات', error);
      return;
    }

    const openAiMessages = [
      { role: 'system', content: SYSTEM_PROMPT + (clientName ? ('\nاسم العميل: ' + clientName) : '') }
    ];
    history.forEach(function (item) {
      if (!item || !item.text) return;
      if (item.sender === 'client') {
        openAiMessages.push({ role: 'user', content: item.text });
      } else {
        // رسايل المدرب والمساعد الذكي القديمة بتتحط كـ "assistant" عشان
        // الموديل يعرف اتقال ايه قبل كده ومايكررش نفس الكلام
        openAiMessages.push({ role: 'assistant', content: item.text });
      }
    });

    let replyText = '';
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + OPENAI_API_KEY.value()
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages: openAiMessages,
          max_tokens: 300,
          temperature: 0.6
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        logger.error('OpenAI API error', response.status, errorBody);
        return;
      }

      const data = await response.json();
      replyText = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content || '').trim();
    } catch (error) {
      logger.error('فشل استدعاء OpenAI', error);
      return;
    }

    if (!replyText) return;

    const nowIso = new Date().toISOString();
    await db.collection('chats').doc(email).collection('messages').add({
      sender: 'ai',
      text: replyText,
      createdAt: nowIso
    });
    await db.collection('chats').doc(email).set({
      clientEmail: email,
      lastMessage: replyText,
      lastMessageAt: nowIso,
      lastSender: 'ai'
    }, { merge: true });
  }
);