/*
 * ADAM Task Center - SAMPLE task templates (Phase 2 prototype)
 *
 * The tasks produced here are SAMPLES: they are not read from clients, programs,
 * reviews or any other real source. Tasks a person adds themselves are real in
 * the sense that they are kept on that device (see adam-tasks.js).
 * No Firebase, Auth, Firestore or network is used.
 *
 * Names are invented. Dates are relative to "today" so the demo always looks live.
 */
(function (root) {
  'use strict';

  var CATEGORIES = {
    training:  { ar: 'التمرين',    en: 'Training' },
    nutrition: { ar: 'التغذية',    en: 'Nutrition' },
    rehab:     { ar: 'التأهيل',    en: 'Rehab' },
    clients:   { ar: 'العملاء',    en: 'Clients' },
    programs:  { ar: 'البرامج',    en: 'Programs' },
    cases:     { ar: 'الحالات',    en: 'Cases' },
    consults:  { ar: 'الاستشارات', en: 'Consultations' },
    review:    { ar: 'المراجعة',   en: 'Review' },
    profile:   { ar: 'الصفحة والملف', en: 'Profile and page' },
    shop:      { ar: 'المتجر والخدمات', en: 'Products and services' },
    schedule:  { ar: 'الجدول',     en: 'Schedule' },
    support:   { ar: 'الدعم',      en: 'Support' },
    personal:  { ar: 'شخصية',      en: 'Personal' }
  };

  var ROLES = {
    client:     { ar: 'عميل',        en: 'Client' },
    coach:      { ar: 'مدرب',        en: 'Coach' },
    specialist: { ar: 'متخصص',       en: 'Specialist' },
    admin:      { ar: 'إدارة المنصة', en: 'Platform admin' },
    partner:    { ar: 'شريك (متجر / جيم / عيادة)', en: 'Partner (store / gym / clinic)' }
  };

  /* people used by the standalone test page; inside the app the real signed-in
     role comes from the app (event adam:screen) and this list is not used */
  var USERS = [
    { id: 'u-client-mona',   kind: 'client',     name: { ar: 'منى — عميلة',   en: 'Mona — client' } },
    { id: 'u-client-omar',   kind: 'client',     name: { ar: 'عمر — عميل',    en: 'Omar — client' } },
    { id: 'u-coach-hossam',  kind: 'coach',      name: { ar: 'كابتن حسام — مدرب', en: 'Coach Hossam — coach' } },
    { id: 'u-spec-sara',     kind: 'specialist', name: { ar: 'د. سارة — أخصائية', en: 'Dr. Sara — specialist' } },
    { id: 'u-admin-ahmed',   kind: 'admin',      name: { ar: 'أحمد — إدارة', en: 'Ahmed — admin' } },
    { id: 'u-partner-delta', kind: 'partner',    name: { ar: 'مركز دلتا — شريك', en: 'Delta Center — partner' } }
  ];

  function T(ar, en) { return { ar: ar, en: en }; }
  function D(key, ar, en, needNote, result) { return { key: key, ar: ar, en: en, needNote: !!needNote, result: result || 'done' }; }

  /* due: day offset from today (null = no date). opt: optional task (never blocks anything). */
  var SEEDS = {
    client: [
      { k: 'checkin', t: T('سجّل متابعة النهارده (الوزن والنوم والطاقة)', 'Log today’s check-in (weight, sleep, energy)'), cat: 'training', pri: 'normal', due: 0, a: T('تم', 'Done') },
      { k: 'reply',   t: T('ردّ على رسالة المدرب بخصوص جلسة السبت', 'Reply to your coach about Saturday’s session'), cat: 'training', pri: 'normal', due: -1, a: T('تم الرد', 'Replied') },
      { k: 'injury',  t: T('كمّل استبيان الإصابة', 'Finish the injury questionnaire'), cat: 'rehab', pri: 'high', due: 2, a: T('تم', 'Done'), n: T('بيساعد المتخصص يجهّز خطتك. ممكن تكمّله على أكتر من مرة.', 'It helps your specialist prepare your plan. You can finish it in more than one go.') },
      { k: 'plan',    t: T('راجع خطة التغذية بتاعة الأسبوع', 'Review this week’s nutrition plan'), cat: 'nutrition', pri: 'normal', due: 1, a: T('تم', 'Done') },
      { k: 'inbody',  t: T('ابعت نتيجة InBody لمدربك', 'Send your InBody result to your coach'), cat: 'profile', pri: 'low', due: null, opt: true, a: T('تم', 'Done'), n: T('اختياري — لما يكون عندك قياس حديث.', 'Optional — when you have a recent measurement.') },
      { k: 'goals',   t: T('حدّث أهدافك للشهر', 'Update your goals for the month'), cat: 'profile', pri: 'low', due: 7, a: T('تم', 'Done') }
    ],
    coach: [
      { k: 'missed',  t: T('تابع 3 عملاء فاتتهم جلستين أو أكتر', 'Follow up with 3 clients who missed 2+ sessions'), cat: 'clients', pri: 'high', due: -1, a: T('تمت المتابعة', 'Followed up') },
      { k: 'adjust',  t: T('عدّل برنامج كريم بعد الأسبوع اللي فاته', 'Adjust Karim’s program after the missed week'), cat: 'programs', pri: 'normal', due: 0, a: T('تم التعديل', 'Adjusted') },
      { k: 'swap',    t: T('طلب تبديل تمرين من نور', 'Exercise-swap request from Nour'), cat: 'programs', pri: 'normal', due: 0, a: T('قرّر', 'Decide'),
        dec: [D('approve', 'وافق على التبديل', 'Approve the swap'), D('decline', 'ارفض مع ملاحظة', 'Decline with a note', true)] },
      { k: 'adh',     t: T('راجع التزام الفريق الأسبوع ده', 'Review the squad’s adherence this week'), cat: 'clients', pri: 'normal', due: 1, a: T('تمت المراجعة', 'Reviewed') },
      { k: 'page',    t: T('ابعت صفحتك للمراجعة قبل النشر', 'Submit your page for review before publishing'), cat: 'profile', pri: 'normal', due: 3, a: T('تم', 'Done'), n: T('الشهادات اختيارية دلوقتي — ممكن تضيفها بعدين.', 'Certificates are optional for now — you can add them later.') },
      { k: 'drills',  t: T('ضيف 5 تمارين لمكتبة الدريلات بتاعتك', 'Add 5 exercises to your drills library'), cat: 'programs', pri: 'low', due: null, opt: true, a: T('تم', 'Done') },
      { k: 'tpl',     t: T('جهّز قالب خطة الشهر الجاي', 'Prepare next month’s plan template'), cat: 'programs', pri: 'low', due: 10, a: T('تم', 'Done') }
    ],
    specialist: [
      { k: 'clear',   t: T('طلب تصريح: عميل بإصابة ركبة (رجوع للجري)', 'Clearance request: client with a knee injury (return to running)'), cat: 'cases', pri: 'high', due: 0, a: T('قرّر', 'Decide'),
        dec: [D('cleared', 'تصريح بالرجوع', 'Cleared to return'), D('more', 'محتاج معلومات أكتر', 'Needs more information', true, 'waiting'), D('notcleared', 'لا يُصرَّح بعد', 'Not cleared yet', true)] },
      { k: 'answer',  t: T('ردّ على 3 استشارات مفتوحة', 'Answer 3 open consultation messages'), cat: 'consults', pri: 'high', due: -1, a: T('تم الرد', 'Answered') },
      { k: 'phase',   t: T('حدّث مرحلة التأهيل لعميلين', 'Update the rehab phase for 2 clients'), cat: 'cases', pri: 'normal', due: 1, a: T('تم التحديث', 'Updated') },
      { k: 'article', t: T('راجع مسودة مقال: تقوية الركبة', 'Review a draft article: knee strengthening'), cat: 'review', pri: 'normal', due: 2, a: T('قرّر', 'Decide'),
        dec: [D('approve', 'موافق', 'Approve'), D('changes', 'محتاج تعديلات', 'Request changes', true, 'waiting')] },
      { k: 'clinical', t: T('كمّل ملفك المهني', 'Complete your professional profile'), cat: 'profile', pri: 'low', due: null, opt: true, a: T('تم', 'Done'), n: T('اختياري — الشهادات بتتضاف لما تحب.', 'Optional — add certificates whenever you like.') }
    ],
    admin: [
      { k: 'app1',    t: T('راجع طلب انضمام: مركز دلتا للتأهيل', 'Review application: Delta Rehab Center'), cat: 'review', pri: 'high', due: 0, a: T('قرّر', 'Decide'),
        dec: [D('approve', 'اعتمد الطلب', 'Approve'), D('changes', 'اطلب تعديلات', 'Request changes', true, 'waiting'), D('reject', 'ارفض', 'Reject', true)] },
      { k: 'app2',    t: T('راجع طلب انضمام: جيم أيرون هاوس (الوثائق اختيارية)', 'Review application: Iron House gym (documents optional)'), cat: 'review', pri: 'normal', due: 1, a: T('قرّر', 'Decide'),
        n: T('الجيمات والمتاجر والعيادات: الوثائق اختيارية دلوقتي. بدونها الصفحة تظهر "تمت مراجعة الصفحة" من غير علامة فحص.', 'Gyms, stores and clinics: documents are optional for now. Without them the page shows “page reviewed” with no checked label.'),
        dec: [D('approve', 'اعتمد الطلب', 'Approve'), D('changes', 'اطلب تعديلات', 'Request changes', true, 'waiting'), D('reject', 'ارفض', 'Reject', true)] },
      { k: 'mod',     t: T('راجع محتوى مُبلَّغ عنه (2)', 'Moderate reported content (2 items)'), cat: 'review', pri: 'normal', due: 0, a: T('قرّر', 'Decide'),
        dec: [D('keep', 'خلّيه', 'Keep it'), D('remove', 'احذفه مع سبب', 'Remove with a reason', true)] },
      { k: 'mail',    t: T('رسائل التفعيل بتروح Spam: اضبط نطاق الإرسال (SPF و DKIM) من إعدادات Firebase', 'Verification emails land in spam: set up the sending domain (SPF and DKIM) in the Firebase console'), cat: 'support', pri: 'high', due: null, a: T('تم', 'Done'),
        n: T('هيحتاج منك تضيف سجلات DNS للدومين. ده تغيير في الإعدادات الحية، فمش بيتعمل من البرنامج.', 'You will add DNS records for the domain. This is a live-settings change, so it is not done from the app.') },
      { k: 'stores',  t: T('اعتمد 3 متاجر جديدة', 'Approve 3 new store pages'), cat: 'review', pri: 'low', due: 3, a: T('تم', 'Done') }
    ],
    partner: [
      { k: 'draft',   t: T('كمّل مسودة صفحتك (الاسم والصور والخدمات)', 'Finish your page draft (name, photos, services)'), cat: 'profile', pri: 'high', due: 2, a: T('تم', 'Done') },
      { k: 'first',   t: T('ضيف أول منتج أو خدمة', 'Add your first product or service'), cat: 'shop', pri: 'normal', due: 3, a: T('تم', 'Done') },
      { k: 'enq',     t: T('ردّ على استفسارين جداد', 'Answer 2 new enquiries'), cat: 'support', pri: 'normal', due: 0, a: T('تم الرد', 'Answered') },
      { k: 'docs',    t: T('ضيف الترخيص أو الوثائق (اختياري)', 'Add your licence or documents (optional)'), cat: 'profile', pri: 'low', due: null, opt: true, a: T('تم', 'Done'),
        n: T('اختياري دلوقتي. ضيفها لما تحب — بتفتح علامة "تم فحص الوثائق" على صفحتك، وصفحتك بتظهر عادي من غيرها.', 'Optional for now. Add them whenever you like — they unlock a “documents checked” label on your page, and your page appears normally without them.') },
      { k: 'hours',   t: T('حدّث مواعيد العمل أو الكلاسات', 'Update opening hours or class schedule'), cat: 'schedule', pri: 'low', due: 5, a: T('تم', 'Done') }
    ]
  };

  root.ADAM_TASKS_DATA = { CATEGORIES: CATEGORIES, ROLES: ROLES, USERS: USERS, SEEDS: SEEDS, isSample: true };
})(window);
