# نشر ADAM — الدليل السريع

الملف ده بيشرح إزاي تنشر أي تعديل من غير نسخ ولصق بالإيد في Firebase Console.

---

## مرة واحدة بس (أول مرة على جهازك)

افتح Terminal على الماك واكتب:

```bash
npm install -g firebase-tools
firebase login
```

`firebase login` هيفتحلك المتصفح عشان تسجّل دخول بحساب Google بتاع مشروع Firebase.

بعد كده ادخل على مجلد المشروع:

```bash
cd ~/المسار/بتاع/adam-website
firebase use adam-32e6c
```

---

## كل مرة عايز تنشر تعديل

### 1) قواعد الأمان (firestore.rules)

```bash
firebase deploy --only firestore:rules
```

بديل النسخ واللصق في Console خالص. لو في غلطة في القواعد هيقولك قبل ما ينشر.

### 2) الوظائف (Cloud Functions — المساعد الذكي)

```bash
firebase deploy --only functions
```

محتاج المشروع يكون على خطة **Blaze**، ومفتاح OpenAI متحطوط كـ secret:

```bash
firebase functions:secrets:set OPENAI_API_KEY
```

### 3) الواجهة (الموقع نفسه)

الواجهة مستضافة على **GitHub Pages**، فالتحديث بيتم من GitHub:

ارفع الملفات دي للمستودع (استبدال):

- `index.html`
- `app.js`
- `style.css`
- `exercise-library.js`
- `food-library.js`
- `rehab-templates.js`
- `sports.js`
- `providers.js`
- `med-library-seed.js`
- `firebase-config.js`

GitHub Pages بياخد دقيقة-دقيقتين لحد ما يحدّث.

**مهم:** بعد أي رفع، افتح الموقع واعمل **hard refresh** (`Cmd + Shift + R`) — غير كده هتفضل شايف النسخة القديمة المحفوظة في المتصفح.

---

## إيه اللي بيتنشر فين

| الحاجة | بتتنشر فين | الأمر |
|---|---|---|
| index.html / app.js / style.css / المكتبات | GitHub Pages | رفع على GitHub |
| firestore.rules | Firebase | `firebase deploy --only firestore:rules` |
| firestore.indexes.json | Firebase | `firebase deploy --only firestore:indexes` |
| functions/index.js (المساعد الذكي) | Cloud Functions | `firebase deploy --only functions` |
| مفتاح OpenAI | Secret في Firebase | `firebase functions:secrets:set OPENAI_API_KEY` |

---

## تجربة محلية من غير ما تلمس الداتا الحقيقية

```bash
firebase emulators:start
```

بيشغّل نسخة وهمية من Firestore والقواعد على جهازك، تقدر تجرب عليها أي تعديل في القواعد قبل ما تنشره على الحقيقي.

---

## لو حصلت مشكلة وانت ناشر

**رسالة "Missing or insufficient permissions" عند مستخدم:**
معناها قاعدة أمان ناقصة أو مانشرتهاش. اتأكد إنك عملت `firebase deploy --only firestore:rules` بعد آخر تعديل.

**حاجة اتكسرت في الموقع بعد رفع:**
ارجع للنسخة القديمة من GitHub (History → اختار الكوميت اللي قبله → Restore)، وبعدين نشوف الغلط على مهلنا.

**الوظيفة (AI) مش بترد:**
شوف الـ logs:

```bash
firebase functions:log
```

---

## ملاحظات مهمة

- **متحطش أي مفتاح سري في `app.js` أو `index.html`** — دول بيتشافوا من أي حد على GitHub Pages. مفتاح OpenAI مكانه Secret في Firebase بس.
- إعدادات Firebase في `firebase-config.js` عادي تكون ظاهرة — دي مصممة كده، والأمان الحقيقي جاي من قواعد Firestore.
- مفيش مشروع تجارب (staging) لسه — يعني أي تعديل في القواعد بيأثر على الداتا الحقيقية على طول. لما يبقى في مستخدمين كتير، ينفع نعمل مشروع تاني للتجارب.
