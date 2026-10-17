/*
 * ADAM Task Center - role-based tasks (Phase 2, beta only)
 *
 * One screen that adapts to who is signed in (client, coach, specialist,
 * platform admin, partner). Each person sees only their own tasks.
 *
 * What is real here and what is not:
 *  - Tasks that come from the app (clients, programs, reviews...) are SAMPLES
 *    generated from adam-tasks-data.js. They are not read from real records.
 *  - Tasks a person adds themselves are kept on THIS DEVICE only (localStorage,
 *    under a key derived from a one-way hash of the user id). They are not sent
 *    to any server and do not follow the person to another device.
 *  - Decisions (approve / decline ...) are SIMULATED: nothing is sent to anyone.
 *    Real decisions must be checked and enforced by the backend later.
 *
 * Self-contained: no Firebase, no network, no dependency. The signed-in role
 * arrives through the "adam:role" event (see the small hook in showScreen).
 * Language follows html[lang] (key adam-lang). Theme follows adam-theme and is
 * scoped to this screen.
 *
 * Icons: Tabler Icons 3.49.0 (outline), MIT, Copyright (c) 2020-2026 Pawel Kuna.
 */
(function () {
  'use strict';
  var D = window.ADAM_TASKS_DATA;
  if (!D || window.adamTasks) return;

  var LS_LANG = 'adam-lang', LS_THEME = 'adam-theme', KEY = 'adam-tasks:v1:';
  var STANDALONE = document.documentElement.hasAttribute('data-tasks-standalone');
  if (!STANDALONE && window.ADAM_FEATURES && window.ADAM_FEATURES.tasks === false) return; /* feature flag (adam-features.js) */
  var MAX_TITLE = 120, MAX_NOTE = 400;

  /* ---------------------------------------------------------------- icons */
  var IC = {"checklist": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8\" /> <path d=\"M14 19l2 2l4 -4\" /> <path d=\"M9 8h4\" /> <path d=\"M9 12h2\" />", "plus": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M12 5l0 14\" /> <path d=\"M5 12l14 0\" />", "check": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M5 12l5 5l10 -10\" />", "circle-check": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /> <path d=\"M9 12l2 2l4 -4\" />", "calendar-due": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12\" /> <path d=\"M16 3v4\" /> <path d=\"M8 3v4\" /> <path d=\"M4 11h16\" /> <path d=\"M11 16a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" />", "arrow-left": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M5 12l14 0\" /> <path d=\"M5 12l6 6\" /> <path d=\"M5 12l6 -6\" />", "x": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M18 6l-12 12\" /> <path d=\"M6 6l12 12\" />", "moon": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008\" />", "sun": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0\" /> <path d=\"M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7\" />", "device-desktop": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10\" /> <path d=\"M7 20h10\" /> <path d=\"M9 16v4\" /> <path d=\"M15 16v4\" />", "info-circle": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0\" /> <path d=\"M12 9h.01\" /> <path d=\"M11 12h1v4h1\" />", "trash": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M4 7l16 0\" /> <path d=\"M10 11l0 6\" /> <path d=\"M14 11l0 6\" /> <path d=\"M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12\" /> <path d=\"M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3\" />", "pencil": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4\" /> <path d=\"M13.5 6.5l4 4\" />", "flag": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9\" /> <path d=\"M5 21v-7\" />", "chevron-down": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M6 9l6 6l6 -6\" />", "inbox": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12\" /> <path d=\"M4 13h3l3 3h4l3 -3h3\" />", "alarm-snooze": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M5 13a7 7 0 1 0 14 0a7 7 0 1 0 -14 0\" /> <path d=\"M10 11h4l-4 4h4\" /> <path d=\"M7 4l-2.75 2\" /> <path d=\"M17 4l2.75 2\" />", "arrow-back-up": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M9 14l-4 -4l4 -4\" /> <path d=\"M5 10h11a4 4 0 1 1 0 8h-1\" />", "hourglass": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M6.5 7h11\" /> <path d=\"M6.5 17h11\" /> <path d=\"M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1\" /> <path d=\"M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1\" />", "user-shield": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M6 21v-2a4 4 0 0 1 4 -4h2\" /> <path d=\"M22 16c0 4 -2.5 6 -3.5 6s-3.5 -2 -3.5 -6c1 0 2.5 -.5 3.5 -1.5c1 1 2.5 1.5 3.5 1.5\" /> <path d=\"M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0\" />", "alert-triangle": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M12 9v4\" /> <path d=\"M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0\" /> <path d=\"M12 16h.01\" />", "lock": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6\" /> <path d=\"M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0\" /> <path d=\"M8 11v-4a4 4 0 1 1 8 0v4\" />"};
  function icon(name, cls) {
    return '<svg class="axi ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (IC[name] || '') + '</svg>';
  }

  /* ----------------------------------------------------------------- text */
  var TX = {
    ar: {
      title: 'مركز المهام', launch: 'المهام', close: 'إغلاق', back: 'رجوع',
      h1: 'مهامّك', role_lbl: 'بتشوف مهام:', lead_client: 'الحاجات المطلوبة منك عشان تكمّل خطتك، مرتبة بالأهم.',
      lead_coach: 'متابعة العملاء والبرامج والطلبات اللي محتاجة قرارك.', lead_specialist: 'الحالات والاستشارات وطلبات التصريح اللي محتاجة رأيك.',
      lead_admin: 'طلبات الانضمام والمراجعة والإعدادات اللي محتاجة إدارة.', lead_partner: 'اللي محتاجه صفحتك عشان تتنشر وتستقبل استفسارات.',
      sample: 'مهام تجريبية — اتولّدت لتجربة الشاشة ومش من بيانات حقيقية. القرارات هنا محاكاة ومش بتتبعت لحد. المهام اللي بتضيفها بنفسك بتتحفظ على الجهاز ده بس.',
      switch_t: 'تجربة فقط: اختار مين تشوف الشاشة بدالّه', switch_p: 'جوه التطبيق الشاشة بتتبع الحساب المسجَّل دخوله تلقائيًا.',
      role_client: 'عميل', role_coach: 'مدرب', role_specialist: 'متخصص', role_admin: 'إدارة المنصة', role_partner: 'شريك',
      s_group: 'ملخص', s_overdue: 'متأخرة', s_today: 'النهارده', s_open: 'مفتوحة', s_later: 'مؤجلة ومنتظرة', s_done: 'تمت',
      tabs_label: 'حالة المهام', t_open: 'مفتوحة', t_later: 'مؤجلة ومنتظرة', t_done: 'تمت', t_all: 'الكل',
      cat_label: 'القسم', cat_all: 'كل الأقسام', sort_label: 'الترتيب', sort_smart: 'الأهم أولًا', sort_due: 'الأقرب موعدًا',
      g_overdue: 'متأخرة', g_today: 'النهارده', g_soon: 'قريبًا', g_nodate: 'بدون موعد', g_later: 'مؤجلة ومنتظرة', g_done: 'تمت',
      p_high: 'أولوية عالية', p_low: 'أولوية منخفضة', p_normal: 'أولوية عادية', optional: 'اختياري', sample_chip: 'تجريبي', mine: 'مهمتك',
      due_today: 'النهارده', due_tom: 'بكرة', due_none: 'بدون موعد',
      st_waiting: 'منتظر', st_snoozed: 'مؤجل', st_done: 'تم',
      a_snooze: 'أجّل', a_undo: 'تراجع', a_reopen: 'افتح تاني', a_edit: 'تعديل', a_delete: 'حذف', add: 'مهمة جديدة',
      snz_title: 'أجّل المهمة لحد', snz_tom: 'بكرة', snz_3: 'بعد 3 أيام', snz_7: 'الأسبوع الجاي',
      dec_title: 'قرارك', dec_pick: 'اختار القرار', dec_note: 'ملاحظة', dec_note_req: 'ملاحظة (مطلوبة)', dec_note_opt: 'ملاحظة (اختيارية)',
      dec_err_pick: 'اختار قرار الأول.', dec_err_note: 'اكتب ملاحظة قصيرة للقرار ده (3 حروف على الأقل).',
      dec_sim: 'محاكاة: القرار ده بيتحفظ هنا بس ومش بيتبعت لحد. في النسخة الحقيقية السيرفر هو اللي يتحقق من صلاحيتك ويسجّل القرار.',
      dec_save: 'سجّل القرار', cancel: 'إلغاء', save: 'حفظ',
      f_title: 'عنوان المهمة', f_title_new: 'مهمة جديدة', f_title_edit: 'تعديل المهمة', f_pri: 'الأولوية', f_due: 'الموعد (اختياري)', f_note: 'ملاحظة (اختيارية)',
      f_err_title: 'اكتب عنوان للمهمة.', f_err_long: 'العنوان أطول من المسموح (120 حرف).', f_err_date: 'اختار تاريخ النهارده أو بعده.',
      f_private: 'المهمة دي خاصة بيك ومحفوظة على الجهاز ده بس.',
      toast_done: 'اتعلّمت كمكتملة', toast_snz: 'اتأجلت لحد', toast_del: 'اتحذفت', toast_added: 'اتضافت', toast_saved: 'اتحفظ التعديل', toast_dec: 'اتسجل القرار (محاكاة)', toast_reopen: 'اتفتحت تاني',
      toast_undone: 'اتراجع',
      loading: 'بنحمّل مهامّك…', err_t: 'ماقدرناش نحمّل المهام', err_p: 'تأكد من الاتصال وجرّب تاني. مهامّك الشخصية محفوظة زي ما هي.', retry: 'جرّب تاني',
      e_open_t: 'خلّصت كل المهام المفتوحة', e_open_p: 'مفيش حاجة مطلوبة منك دلوقتي. ممكن تضيف مهمة لنفسك.',
      e_later_t: 'مفيش مهام مؤجلة أو منتظرة', e_later_p: 'المهام اللي بتأجلها أو بتنتظر ردّ عليها بتظهر هنا.',
      e_done_t: 'لسه مفيش مهام تمت', e_done_p: 'لما تخلّص مهمة هتلاقيها هنا.',
      e_all_t: 'مفيش مهام', e_cat_t: 'مفيش مهام في القسم ده', e_cat_p: 'جرّب قسم تاني أو اعرض كل الأقسام.', show_all_cats: 'كل الأقسام',
      warn_store: 'ماقدرناش نحفظ على الجهاز ده (ممكن يكون التصفح خاص). تغييراتك هتفضل لحد ما تقفل الصفحة.',
      count_shown: 'معروض', of: 'من',
      theme_group: 'المظهر', th_dark: 'داكن', th_light: 'فاتح', th_system: 'حسب الجهاز', lang_btn: 'تغيير اللغة', lang_to: 'ع',
      entry_t: 'مركز المهام', entry_p: 'مهامّك المطلوبة ومواعيدها', open_tasks: 'افتح مركز المهام',
      due_aria: 'مستحقة', n_due: 'مهمة مستحقة',
      months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
    },
    en: {
      title: 'Task center', launch: 'Tasks', close: 'Close', back: 'Back',
      h1: 'Your tasks', role_lbl: 'Showing tasks for:', lead_client: 'What is needed from you to keep your plan moving, most important first.',
      lead_coach: 'Client follow-ups, programs and requests waiting for your decision.', lead_specialist: 'Cases, consultations and clearance requests waiting for your opinion.',
      lead_admin: 'Applications, reviews and settings that need the platform team.', lead_partner: 'What your page needs to be published and to receive enquiries.',
      sample: 'Sample tasks — generated to try the screen, not from real records. Decisions here are simulated and sent to no one. Tasks you add yourself are kept on this device only.',
      switch_t: 'Prototype only: pick who to view the screen as', switch_p: 'Inside the app the screen follows whoever is signed in, automatically.',
      role_client: 'Client', role_coach: 'Coach', role_specialist: 'Specialist', role_admin: 'Platform admin', role_partner: 'Partner',
      s_group: 'Summary', s_overdue: 'Overdue', s_today: 'Due today', s_open: 'Open', s_later: 'Snoozed and waiting', s_done: 'Done',
      tabs_label: 'Task status', t_open: 'Open', t_later: 'Snoozed and waiting', t_done: 'Done', t_all: 'All',
      cat_label: 'Category', cat_all: 'All categories', sort_label: 'Sort', sort_smart: 'Most important first', sort_due: 'Soonest due',
      g_overdue: 'Overdue', g_today: 'Today', g_soon: 'Coming up', g_nodate: 'No date', g_later: 'Snoozed and waiting', g_done: 'Done',
      p_high: 'High priority', p_low: 'Low priority', p_normal: 'Normal priority', optional: 'Optional', sample_chip: 'Sample', mine: 'Your task',
      due_today: 'Today', due_tom: 'Tomorrow', due_none: 'No date',
      st_waiting: 'Waiting', st_snoozed: 'Snoozed', st_done: 'Done',
      a_snooze: 'Snooze', a_undo: 'Undo', a_reopen: 'Reopen', a_edit: 'Edit', a_delete: 'Delete', add: 'New task',
      snz_title: 'Snooze until', snz_tom: 'Tomorrow', snz_3: 'In 3 days', snz_7: 'Next week',
      dec_title: 'Your decision', dec_pick: 'Choose a decision', dec_note: 'Note', dec_note_req: 'Note (required)', dec_note_opt: 'Note (optional)',
      dec_err_pick: 'Choose a decision first.', dec_err_note: 'Add a short note for this decision (at least 3 characters).',
      dec_sim: 'Simulation: this decision is kept here only and sent to no one. In the real version the server checks your permission and records the decision.',
      dec_save: 'Record decision', cancel: 'Cancel', save: 'Save',
      f_title: 'Task title', f_title_new: 'New task', f_title_edit: 'Edit task', f_pri: 'Priority', f_due: 'Due date (optional)', f_note: 'Note (optional)',
      f_err_title: 'Enter a title for the task.', f_err_long: 'The title is too long (120 characters max).', f_err_date: 'Pick today or a later date.',
      f_private: 'This task is private to you and kept on this device only.',
      toast_done: 'Marked as done', toast_snz: 'Snoozed until', toast_del: 'Deleted', toast_added: 'Task added', toast_saved: 'Changes saved', toast_dec: 'Decision recorded (simulated)', toast_reopen: 'Reopened',
      toast_undone: 'Undone',
      loading: 'Loading your tasks…', err_t: 'We could not load your tasks', err_p: 'Check your connection and try again. Your own tasks are still saved.', retry: 'Try again',
      e_open_t: 'You are all caught up', e_open_p: 'Nothing is needed from you right now. You can add a task for yourself.',
      e_later_t: 'Nothing snoozed or waiting', e_later_p: 'Tasks you snooze or are waiting on appear here.',
      e_done_t: 'No completed tasks yet', e_done_p: 'Tasks you finish will appear here.',
      e_all_t: 'No tasks', e_cat_t: 'No tasks in this category', e_cat_p: 'Try another category or show all categories.', show_all_cats: 'All categories',
      warn_store: 'We could not save on this device (private browsing?). Your changes last until you close the page.',
      count_shown: 'Showing', of: 'of',
      theme_group: 'Appearance', th_dark: 'Dark', th_light: 'Light', th_system: 'Use device settings', lang_btn: 'Change language', lang_to: 'ع',
      entry_t: 'Task center', entry_p: 'What is needed from you, and when', open_tasks: 'Open the task center',
      due_aria: 'due', n_due: 'tasks due',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  };

  /* --------------------------------------------------------------- helpers */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function lang() { return document.documentElement.lang === 'en' ? 'en' : 'ar'; }
  function tx(k) { var L = TX[lang()]; return L[k] != null ? L[k] : (TX.ar[k] != null ? TX.ar[k] : k); }
  function num(n) { return '<bdi class="axn">' + String(n) + '</bdi>'; }
  function L(o) { return o ? (o[lang()] || o.ar || '') : ''; }
  var memStore = {}, storageOk = true;
  function store(op, key, val) {
    try { return op === 'get' ? localStorage.getItem(key) : localStorage.setItem(key, val); }
    catch (e) { if (op === 'set') { storageOk = false; memStore[key] = val; } else if (key in memStore) return memStore[key]; return null; }
  }
  function storeGetAny(key) { var v = store('get', key); return v != null ? v : (key in memStore ? memStore[key] : null); }

  /* one-way, non-reversible short id: raw user ids never appear in storage keys */
  function hash(s) {
    var h1 = 0xdeadbeef ^ 0, h2 = 0x41c6ce57 ^ 0, i, ch;
    s = 'adam-tasks|' + String(s);
    for (i = 0; i < s.length; i++) { ch = s.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
  }

  /* dates: local calendar days; tests may pin "today" with window.__adamTasksToday */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function todayDate() {
    var f = window.__adamTasksToday, m = f && /^(\d{4})-(\d{2})-(\d{2})$/.exec(f);
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date();
  }
  function today() { return iso(todayDate()); }
  function addDays(isoStr, n) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoStr); var d = new Date(+m[1], +m[2] - 1, +m[3] + n); return iso(d); }
  function diffDays(a, b) { /* a - b in whole days */
    var x = /^(\d{4})-(\d{2})-(\d{2})$/.exec(a), y = /^(\d{4})-(\d{2})-(\d{2})$/.exec(b);
    return Math.round((Date.UTC(+x[1], +x[2] - 1, +x[3]) - Date.UTC(+y[1], +y[2] - 1, +y[3])) / 86400000);
  }
  function validIso(s) { return /^\d{4}-\d{2}-\d{2}$/.test(s || '') && iso(new Date(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10))) === s; }
  function fmtDate(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); if (!m) return '';
    return '<bdi class="axn">' + parseInt(m[3], 10) + ' ' + tx('months')[parseInt(m[2], 10) - 1] + ' ' + m[1] + '</bdi>';
  }
  function plainDate(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? parseInt(m[3], 10) + ' ' + tx('months')[parseInt(m[2], 10) - 1] : ''; }
  function daysWord(n) {
    if (lang() === 'en') return n + (n === 1 ? ' day' : ' days');
    if (n === 1) return 'يوم'; if (n === 2) return 'يومين'; if (n <= 10) return n + ' أيام'; return n + ' يوم';
  }
  function dueText(due) {
    if (!due) return tx('due_none');
    var d = diffDays(due, today());
    if (d < 0) return lang() === 'en' ? 'Overdue by ' + daysWord(-d) : 'متأخرة ' + daysWord(-d);
    if (d === 0) return tx('due_today');
    if (d === 1) return tx('due_tom');
    if (d <= 6) return lang() === 'en' ? 'In ' + daysWord(d) : 'بعد ' + daysWord(d);
    return plainDate(due);
  }

  /* ---------------------------------------------------------------- state */
  var user = null;                 /* {kind, id} or null: who is signed in */
  var rec = null;                  /* that person's saved state */
  var status = 'idle', reqId = 0;
  var F = { tab: 'open', cat: 'all', sort: 'smart' };
  var theme = 'dark', opened = false, built = false, lastFocus = null, sheet = null, sheetFocus = null, pushed = false, inertList = [];
  var els = {}, toastTimer = null, undoFn = null;
  var mqDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function keyFor(u) { return KEY + hash(u.id); }
  function blank() { return { v: 1, seeds: {}, mine: [], n: 0 }; }
  function loadRec() {
    var raw = storeGetAny(keyFor(user)), r = null;
    try { r = raw ? JSON.parse(raw) : null; } catch (e) { r = null; }
    if (!r || r.v !== 1 || typeof r.seeds !== 'object' || !Array.isArray(r.mine)) r = blank();
    /* keep only well-formed saved items */
    r.mine = r.mine.filter(function (t) { return t && typeof t.id === 'string' && typeof t.title === 'string'; });
    rec = r;
  }
  function saveRec() { if (user && rec) store('set', keyFor(user), JSON.stringify(rec)); }

  /* ---------------------------------------------------------------- model */
  /* the full list for the signed-in person: sample tasks for their role + their own */
  function buildList() {
    var out = [], t0 = today();
    (D.SEEDS[user.kind] || []).forEach(function (s) {
      var sv = rec.seeds[s.k] || {}, st = 'open';
      if (sv.st === 'done') st = 'done';
      else if (sv.st === 'waiting') st = 'waiting';
      else if (sv.st === 'snoozed' && sv.until && sv.until > t0) st = 'snoozed';
      out.push({
        id: 's:' + s.k, seed: true, title: L(s.t), cat: s.cat, pri: s.pri, opt: !!s.opt,
        due: s.due == null ? null : addDays(t0, s.due), note: s.n ? L(s.n) : '', actionLabel: L(s.a), dec: s.dec || null,
        st: st, until: st === 'snoozed' ? sv.until : null, res: sv.res || null, resNote: sv.note || ''
      });
    });
    rec.mine.forEach(function (m) {
      var st = m.st === 'done' ? 'done' : (m.until && m.until > t0 ? 'snoozed' : 'open');
      out.push({ id: m.id, seed: false, title: m.title, cat: 'personal', pri: m.pri || 'normal', opt: false, due: m.due || null, note: m.note || '', actionLabel: tx('st_done'), dec: null, st: st, until: st === 'snoozed' ? m.until : null });
    });
    return out;
  }
  var PRI = { high: 0, normal: 1, low: 2 };
  function bucket(t) {
    if (t.st === 'done') return 'done';
    if (t.st !== 'open') return 'later';
    if (!t.due) return 'nodate';
    var d = diffDays(t.due, today());
    return d < 0 ? 'overdue' : d === 0 ? 'today' : 'soon';
  }
  function matchesTab(t) {
    if (F.tab === 'all') return true;
    if (F.tab === 'open') return t.st === 'open';
    if (F.tab === 'later') return t.st === 'waiting' || t.st === 'snoozed';
    return t.st === 'done';
  }
  function visible(all) {
    return all.filter(function (t) { return matchesTab(t) && (F.cat === 'all' || t.cat === F.cat); });
  }
  function cmpTasks(a, b) {
    var l = lang();
    if (F.sort === 'smart') {
      var ao = bucket(a) === 'overdue' ? 0 : 1, bo = bucket(b) === 'overdue' ? 0 : 1;
      if (ao !== bo) return ao - bo;
      if (PRI[a.pri] !== PRI[b.pri]) return PRI[a.pri] - PRI[b.pri];
    }
    var ad = a.due || '9999-99-99', bd = b.due || '9999-99-99';
    if (ad !== bd) return ad < bd ? -1 : 1;
    if (PRI[a.pri] !== PRI[b.pri]) return PRI[a.pri] - PRI[b.pri];
    return a.title.localeCompare(b.title, l);
  }
  function stats(all) {
    var s = { overdue: 0, today: 0, open: 0, later: 0, done: 0 };
    all.forEach(function (t) {
      if (t.st === 'open') { s.open++; var b = bucket(t); if (b === 'overdue') s.overdue++; if (b === 'today') s.today++; }
      else if (t.st === 'done') s.done++; else s.later++;
    });
    return s;
  }
  function dueCount() { /* tasks that need attention now: open and due today or earlier */
    if (!user || !rec) return 0;
    return buildList().filter(function (t) { var b = bucket(t); return t.st === 'open' && (b === 'overdue' || b === 'today'); }).length;
  }

  /* --------------------------------------------------------------- theme */
  function getThemePref() { var t = store('get', LS_THEME); return (t === 'light' || t === 'dark' || t === 'system') ? t : 'dark'; }
  function resolveTheme() { return theme === 'system' ? ((mqDark && !mqDark.matches) ? 'light' : 'dark') : theme; }
  function applyTheme() {
    if (!els.root) return;
    var r = resolveTheme();
    els.root.setAttribute('data-theme', r); els.root.style.colorScheme = r;
    $$('[data-th]', els.root).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-th') === theme)); });
  }
  function setTheme(t) { theme = t; store('set', LS_THEME, t); applyTheme(); }

  /* ----------------------------------------------------------------- DOM */
  function build() {
    if (built) return; built = true;
    var root = document.createElement('div');
    root.className = 'ax axt'; root.id = 'adam-tasks'; root.hidden = true;
    root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-labelledby', 'axt-h1');
    root.innerHTML =
      '<div class="ax-main" id="axt-main">' +
        '<header class="ax-top">' +
          '<button type="button" class="ax-ib" id="axt-close" data-ia="close">' + icon('arrow-left', 'ax-flip') + '</button>' +
          '<div class="ax-brand" data-i="title"></div>' +
          '<div class="ax-ctrl">' +
            '<div class="ax-seg" role="group" data-ia="theme_group">' +
              '<button type="button" data-th="dark" data-ia="th_dark">' + icon('moon') + '</button>' +
              '<button type="button" data-th="light" data-ia="th_light">' + icon('sun') + '</button>' +
              '<button type="button" data-th="system" data-ia="th_system">' + icon('device-desktop') + '</button>' +
            '</div>' +
            '<button type="button" class="ax-lang" id="axt-lang" data-ia="lang_btn"></button>' +
          '</div>' +
        '</header>' +
        '<div class="ax-scroll" id="axt-scroll"><div class="ax-wrap">' +
          '<p class="ax-sample" role="note">' + icon('info-circle') + '<span data-i="sample"></span></p>' +
          '<div class="axt-switch" id="axt-switch" hidden></div>' +
          '<p class="axt-warn" id="axt-warn" role="status" hidden>' + icon('alert-triangle') + '<span data-i="warn_store"></span></p>' +
          '<section class="ax-hero"><h1 id="axt-h1" tabindex="-1" data-i="h1"></h1><p class="ax-lead" id="axt-lead"></p>' +
            '<p class="axt-rolel" id="axt-rolel"></p></section>' +
          '<dl class="axt-stats" id="axt-stats" data-ia="s_group"></dl>' +
          '<div class="axt-bar">' +
            '<div class="ax-tabs axt-tabs" id="axt-tabs" role="tablist" data-ia="tabs_label"></div>' +
            '<button type="button" class="ax-btn ax-primary" id="axt-add">' + icon('plus') + '<span data-i="add"></span></button>' +
          '</div>' +
          '<div class="ax-filters">' +
            '<label class="ax-sortl"><span class="ax-fl" data-i="cat_label"></span><span class="ax-sw"><select id="axt-cat" class="ax-mini"></select>' + icon('chevron-down', 'ax-caret') + '</span></label>' +
            '<label class="ax-sortl"><span class="ax-fl" data-i="sort_label"></span><span class="ax-sw"><select id="axt-sort" class="ax-mini"><option value="smart" data-i="sort_smart"></option><option value="due" data-i="sort_due"></option></select>' + icon('chevron-down', 'ax-caret') + '</span></label>' +
          '</div>' +
          '<p class="ax-count" id="axt-count" role="status" aria-live="polite"></p>' +
          '<div id="axt-list" class="axt-list" aria-busy="false"></div>' +
        '</div></div>' +
      '</div>' +
      '<div class="ax-sheet-bg" id="axt-sheetbg" hidden><div class="ax-sheet" id="axt-sheet" role="dialog" aria-modal="true" aria-labelledby="axt-sh-t" tabindex="-1"></div></div>' +
      '<div class="ax-toast axt-toast" id="axt-toast" role="status" aria-live="polite"></div>';
    document.body.appendChild(root);
    els.root = root; els.main = $('#axt-main', root); els.scroll = $('#axt-scroll', root); els.list = $('#axt-list', root);
    els.tabs = $('#axt-tabs', root); els.stats = $('#axt-stats', root); els.count = $('#axt-count', root);
    els.cat = $('#axt-cat', root); els.sort = $('#axt-sort', root); els.sheetbg = $('#axt-sheetbg', root); els.sheet = $('#axt-sheet', root);
    els.toast = $('#axt-toast', root); els.lang = $('#axt-lang', root); els.close = $('#axt-close', root); els.warn = $('#axt-warn', root);
    els.lead = $('#axt-lead', root); els.rolel = $('#axt-rolel', root); els.sw = $('#axt-switch', root); els.add = $('#axt-add', root);
    if (STANDALONE) els.close.hidden = true;
    bind();
  }

  function applyStatic() {
    var r = els.root;
    $$('[data-i]', r).forEach(function (n) { n.textContent = tx(n.getAttribute('data-i')); });
    $$('[data-ia]', r).forEach(function (n) { n.setAttribute('aria-label', tx(n.getAttribute('data-ia'))); });
    els.lang.textContent = tx('lang_to');
    $$('[data-th]', r).forEach(function (b) { b.setAttribute('title', tx('th_' + b.getAttribute('data-th'))); });
    r.setAttribute('lang', lang()); r.setAttribute('dir', lang() === 'ar' ? 'rtl' : 'ltr');
    if (STANDALONE) document.title = tx('title') + ' — ADAM';
    els.sort.value = F.sort;
  }

  function fillCats(all) {
    var present = {}; all.forEach(function (t) { present[t.cat] = 1; });
    if (F.cat !== 'all' && !present[F.cat]) F.cat = 'all';
    var h = '<option value="all">' + esc(tx('cat_all')) + '</option>';
    Object.keys(D.CATEGORIES).forEach(function (k) { if (present[k]) h += '<option value="' + k + '">' + esc(L(D.CATEGORIES[k])) + '</option>'; });
    els.cat.innerHTML = h; els.cat.value = F.cat;
  }

  function renderSwitch() {
    if (!STANDALONE) { els.sw.hidden = true; return; }
    els.sw.hidden = false;
    var h = '<label class="axt-swl"><span class="axt-swt">' + esc(tx('switch_t')) + '</span><span class="ax-sw"><select id="axt-as" class="ax-mini">';
    D.USERS.forEach(function (u) { h += '<option value="' + esc(u.id) + '"' + (user && user.id === u.id ? ' selected' : '') + '>' + esc(L(u.name)) + '</option>'; });
    h += '</select>' + icon('chevron-down', 'ax-caret') + '</span></label><p class="ax-note">' + esc(tx('switch_p')) + '</p>';
    els.sw.innerHTML = h;
  }

  function renderHead() {
    if (!user) return;
    els.lead.textContent = tx('lead_' + user.kind);
    els.rolel.innerHTML = esc(tx('role_lbl')) + ' <b>' + esc(tx('role_' + user.kind)) + '</b>';
    els.warn.hidden = storageOk;
  }

  function renderStats(all) {
    var s = stats(all), items = [['overdue', 'warn'], ['today', ''], ['open', ''], ['later', ''], ['done', '']];
    els.stats.innerHTML = items.map(function (p) {
      return '<div class="axt-stat' + (p[0] === 'overdue' && s.overdue ? ' axt-hot' : '') + '"><dt>' + esc(tx('s_' + p[0])) + '</dt><dd>' + num(s[p[0]]) + '</dd></div>';
    }).join('');
  }

  function renderTabs(all) {
    var s = stats(all), cnt = { open: s.open, later: s.later, done: s.done, all: all.length };
    els.tabs.innerHTML = ['open', 'later', 'done', 'all'].map(function (k) {
      var on = F.tab === k;
      return '<button type="button" role="tab" id="axt-tab-' + k + '" data-tab="' + k + '" aria-selected="' + on + '" tabindex="' + (on ? 0 : -1) + '" aria-controls="axt-list">' + esc(tx('t_' + k)) + ' <span class="ax-tn">' + num(cnt[k]) + '</span></button>';
    }).join('');
  }

  function priChip(t) {
    if (t.pri === 'high') return '<span class="ax-badge axt-pri hi">' + icon('flag') + esc(tx('p_high')) + '</span>';
    if (t.pri === 'low') return '<span class="ax-badge axt-pri lo">' + esc(tx('p_low')) + '</span>';
    return '';
  }
  function dueChip(t) {
    if (t.st === 'done') return '';
    if (t.st === 'snoozed') return '<span class="axt-due">' + icon('alarm-snooze') + esc(tx('st_snoozed')) + ' — ' + fmtDate(t.until) + '</span>';
    if (t.st === 'waiting') return '<span class="axt-due">' + icon('hourglass') + esc(tx('st_waiting')) + '</span>';
    var b = bucket(t);
    return '<span class="axt-due ' + (b === 'overdue' ? 'od' : b === 'today' ? 'td' : '') + '">' + icon(b === 'overdue' ? 'alert-triangle' : 'calendar-due') + esc(dueText(t.due)) + '</span>';
  }

  function cardHtml(t) {
    var act = '';
    var q = esc(t.title);
    if (t.st === 'done') {
      act = '<button type="button" class="ax-btn" data-act="reopen" data-id="' + esc(t.id) + '" aria-label="' + esc(tx('a_reopen') + ': ' + t.title) + '">' + icon('arrow-back-up') + '<span>' + esc(tx('a_reopen')) + '</span></button>';
    } else {
      if (t.dec) act += '<button type="button" class="ax-btn ax-primary" data-act="decide" data-id="' + esc(t.id) + '" aria-label="' + esc(t.actionLabel + ': ' + t.title) + '">' + icon('user-shield') + '<span>' + esc(t.actionLabel) + '</span></button>';
      else act += '<button type="button" class="ax-btn ax-primary" data-act="done" data-id="' + esc(t.id) + '" aria-label="' + esc(t.actionLabel + ': ' + t.title) + '">' + icon('check') + '<span>' + esc(t.actionLabel) + '</span></button>';
      if (t.st === 'open') act += '<button type="button" class="ax-btn" data-act="snooze" data-id="' + esc(t.id) + '" aria-label="' + esc(tx('a_snooze') + ': ' + t.title) + '">' + icon('alarm-snooze') + '<span>' + esc(tx('a_snooze')) + '</span></button>';
      else if (t.st === 'snoozed') act += '<button type="button" class="ax-btn" data-act="reopen" data-id="' + esc(t.id) + '" aria-label="' + esc(tx('a_reopen') + ': ' + t.title) + '">' + icon('arrow-back-up') + '<span>' + esc(tx('a_reopen')) + '</span></button>';
    }
    if (!t.seed) {
      act += '<button type="button" class="ax-ib" data-act="edit" data-id="' + esc(t.id) + '" aria-label="' + esc(tx('a_edit') + ': ' + t.title) + '">' + icon('pencil') + '</button>' +
        '<button type="button" class="ax-ib" data-act="delete" data-id="' + esc(t.id) + '" aria-label="' + esc(tx('a_delete') + ': ' + t.title) + '">' + icon('trash') + '</button>';
    }
    var cat = D.CATEGORIES[t.cat] ? L(D.CATEGORIES[t.cat]) : '';
    var result = '';
    if (t.res && t.dec) {
      var d = t.dec.filter(function (x) { return x.key === t.res; })[0];
      if (d) result = '<p class="axt-res">' + icon('circle-check') + '<span>' + esc(L(d)) + (t.resNote ? ' — ' + esc(t.resNote) : '') + '</span></p>';
    }
    return '<li class="axt-card' + (t.st === 'done' ? ' is-done' : '') + '" data-card="' + esc(t.id) + '">' +
      '<div class="axt-c-top"><h3 class="axt-name">' + q + '</h3></div>' +
      '<div class="axt-tags">' + dueChip(t) + priChip(t) +
        '<span class="ax-badge">' + esc(cat) + '</span>' +
        (t.opt ? '<span class="ax-badge axt-opt">' + esc(tx('optional')) + '</span>' : '') +
        (t.seed ? '<span class="ax-badge ax-smp">' + esc(tx('sample_chip')) + '</span>' : '<span class="ax-badge axt-mine">' + esc(tx('mine')) + '</span>') + '</div>' +
      (t.note ? '<p class="axt-nt">' + esc(t.note) + '</p>' : '') + result +
      '<div class="axt-acts">' + act + '</div></li>';
  }

  function renderList(all) {
    var vis = visible(all).sort(cmpTasks);
    els.list.setAttribute('aria-busy', 'false');
    if (!vis.length) {
      var t, p, btn = '';
      if (all.length && F.cat !== 'all' && all.some(function (x) { return matchesTab(x); })) { t = tx('e_cat_t'); p = tx('e_cat_p'); btn = '<button type="button" class="ax-btn" data-act="allcats">' + esc(tx('show_all_cats')) + '</button>'; }
      else { t = tx('e_' + F.tab + '_t'); p = F.tab === 'all' ? '' : tx('e_' + F.tab + '_p'); }
      if (F.tab === 'open' && (!F.cat || F.cat === 'all')) btn = '<button type="button" class="ax-btn ax-primary" data-act="add">' + icon('plus') + '<span>' + esc(tx('add')) + '</span></button>';
      els.list.innerHTML = '<div class="ax-state">' + icon('inbox', 'ax-big') + '<h2>' + esc(t) + '</h2>' + (p ? '<p>' + esc(p) + '</p>' : '') + btn + '</div>';
      els.count.textContent = '';
      return;
    }
    var groups = [], order = F.tab === 'open' && F.sort === 'smart' ? ['overdue', 'today', 'soon', 'nodate'] : (F.tab === 'open' ? ['all'] : ['all']);
    if (F.tab === 'all') {
      order = ['open', 'later', 'done'];
      order.forEach(function (g) {
        var items = vis.filter(function (x) { return (g === 'open' && x.st === 'open') || (g === 'later' && (x.st === 'waiting' || x.st === 'snoozed')) || (g === 'done' && x.st === 'done'); });
        if (items.length) groups.push([g === 'open' ? 't_open' : g === 'later' ? 'g_later' : 'g_done', items]);
      });
    } else if (order[0] === 'all') {
      groups.push([null, vis]);
    } else {
      order.forEach(function (g) {
        var items = vis.filter(function (x) { return bucket(x) === g; });
        if (items.length) groups.push(['g_' + g, items]);
      });
    }
    els.list.innerHTML = groups.map(function (g) {
      return '<section class="axt-grp">' + (g[0] ? '<h2 class="axt-gh">' + esc(tx(g[0])) + ' <span class="ax-tn">' + num(g[1].length) + '</span></h2>' : '') +
        '<ul class="axt-ul">' + g[1].map(cardHtml).join('') + '</ul></section>';
    }).join('');
    els.count.innerHTML = esc(tx('count_shown')) + ' ' + num(vis.length) + ' ' + esc(tx('of')) + ' ' + num(all.length);
  }

  function renderAll() {
    if (!built) return;
    applyStatic();
    renderSwitch();
    if (!user) { els.list.innerHTML = ''; return; }
    renderHead();
    if (status === 'loading') {
      els.stats.innerHTML = ''; els.tabs.innerHTML = ''; els.count.textContent = '';
      els.list.setAttribute('aria-busy', 'true');
      els.list.innerHTML = '<p class="ax-sr" role="status">' + esc(tx('loading')) + '</p>' + [0, 1, 2].map(function () {
        return '<div class="ax-card ax-sk axt-sk"><span class="ax-bar w70"></span><span class="ax-bar w50"></span><span class="ax-bar w30"></span></div>';
      }).join('');
      return;
    }
    if (status === 'error') {
      els.stats.innerHTML = ''; els.tabs.innerHTML = ''; els.count.textContent = '';
      els.list.innerHTML = '<div class="ax-state" role="alert">' + icon('alert-triangle', 'ax-big') + '<h2>' + esc(tx('err_t')) + '</h2><p>' + esc(tx('err_p')) + '</p><button type="button" class="ax-btn ax-primary" data-act="retry">' + icon('arrow-back-up') + '<span>' + esc(tx('retry')) + '</span></button></div>';
      return;
    }
    var all = buildList();
    fillCats(all); renderStats(all); renderTabs(all); renderList(all);
    paintLauncher();
  }

  /* --------------------------------------------------------------- sheets */
  function sheetHead(title) {
    return '<div class="ax-sh-h"><h2 id="axt-sh-t" class="ax-name ax-lg" tabindex="-1">' + esc(title) + '</h2><button type="button" class="ax-ib" data-act="sheet-close" aria-label="' + esc(tx('close')) + '">' + icon('x') + '</button></div>';
  }
  function findTask(id) { var a = buildList(); for (var i = 0; i < a.length; i++) if (a[i].id === id) return a[i]; return null; }

  function decideHtml(t) {
    var h = sheetHead(tx('dec_title')) + '<form class="ax-sh-b axt-form" id="axt-form" novalidate>' +
      '<p class="axt-ft">' + esc(t.title) + '</p>' +
      '<p class="ax-smpn">' + icon('info-circle') + '<span>' + esc(tx('dec_sim')) + '</span></p>' +
      '<fieldset class="axt-fs"><legend>' + esc(tx('dec_pick')) + '</legend>';
    t.dec.forEach(function (d, i) {
      h += '<label class="axt-radio"><input type="radio" name="dec" value="' + esc(d.key) + '"' + (sheet && sheet.draft && sheet.draft.pick === d.key ? ' checked' : '') + '><span>' + esc(L(d)) + (d.needNote ? ' <small>(' + esc(tx('dec_note_req')) + ')</small>' : '') + '</span></label>';
    });
    h += '</fieldset><label class="axt-lab" for="axt-note">' + esc(tx('dec_note')) + '</label><textarea id="axt-note" class="ax-input axt-ta" rows="3" maxlength="' + MAX_NOTE + '" aria-describedby="axt-err">' + esc(sheet && sheet.draft ? sheet.draft.note || '' : '') + '</textarea>' +
      '<p class="axt-err" id="axt-err" role="alert"></p></form>' +
      '<div class="ax-sh-f"><button type="button" class="ax-btn ax-primary" data-act="dec-save">' + esc(tx('dec_save')) + '</button><button type="button" class="ax-btn ax-quiet" data-act="sheet-close">' + esc(tx('cancel')) + '</button></div>';
    return h;
  }
  function snoozeHtml(t) {
    var t0 = today();
    var opts = [['snz_tom', 1], ['snz_3', 3], ['snz_7', 7]];
    return sheetHead(tx('snz_title')) + '<div class="ax-sh-b"><p class="axt-ft">' + esc(t.title) + '</p><div class="axt-snz">' +
      opts.map(function (o) { return '<button type="button" class="ax-btn" data-act="snz" data-days="' + o[1] + '">' + esc(tx(o[0])) + ' <small>' + fmtDate(addDays(t0, o[1])) + '</small></button>'; }).join('') +
      '</div></div><div class="ax-sh-f"><button type="button" class="ax-btn ax-quiet" data-act="sheet-close">' + esc(tx('cancel')) + '</button></div>';
  }
  function editHtml(t) {
    var v = (sheet && sheet.draft) || { title: t ? t.title : '', pri: t ? t.pri : 'normal', due: t && t.due ? t.due : '', note: t ? t.note : '' };
    return sheetHead(t ? tx('f_title_edit') : tx('f_title_new')) + '<form class="ax-sh-b axt-form" id="axt-form" novalidate>' +
      '<label class="axt-lab" for="axt-ttl">' + esc(tx('f_title')) + '</label><input id="axt-ttl" class="ax-input axt-in" type="text" maxlength="' + (MAX_TITLE + 40) + '" value="' + esc(v.title) + '" aria-describedby="axt-err" autocomplete="off">' +
      '<div class="axt-row"><div><label class="axt-lab" for="axt-pri">' + esc(tx('f_pri')) + '</label><span class="ax-sw"><select id="axt-pri" class="ax-mini axt-in2">' +
        ['high', 'normal', 'low'].map(function (p) { return '<option value="' + p + '"' + (v.pri === p ? ' selected' : '') + '>' + esc(tx('p_' + p)) + '</option>'; }).join('') + '</select>' + icon('chevron-down', 'ax-caret') + '</span></div>' +
      '<div><label class="axt-lab" for="axt-due">' + esc(tx('f_due')) + '</label><input id="axt-due" class="ax-input axt-in2 axt-date" type="date" min="' + today() + '" value="' + esc(v.due) + '" aria-describedby="axt-err"></div></div>' +
      '<label class="axt-lab" for="axt-note">' + esc(tx('f_note')) + '</label><textarea id="axt-note" class="ax-input axt-ta" rows="2" maxlength="' + MAX_NOTE + '">' + esc(v.note) + '</textarea>' +
      '<p class="ax-smpn">' + icon('lock') + '<span>' + esc(tx('f_private')) + '</span></p>' +
      '<p class="axt-err" id="axt-err" role="alert"></p></form>' +
      '<div class="ax-sh-f"><button type="button" class="ax-btn ax-primary" data-act="edit-save">' + esc(tx('save')) + '</button><button type="button" class="ax-btn ax-quiet" data-act="sheet-close">' + esc(tx('cancel')) + '</button></div>';
  }
  function renderSheet() {
    if (!sheet) return;
    var t = sheet.id ? findTask(sheet.id) : null;
    if (sheet.type !== 'edit' && !t) { closeSheet(); return; }
    els.sheet.className = 'ax-sheet axt-sheet';
    els.sheet.innerHTML = sheet.type === 'decide' ? decideHtml(t) : sheet.type === 'snooze' ? snoozeHtml(t) : editHtml(t);
  }
  /* language switch while a dialog is open: keep what the person typed */
  function captureDraft() {
    if (!sheet) return null;
    if (sheet.type === 'edit') {
      var a = $('#axt-ttl', els.sheet); if (!a) return sheet.draft || null;
      return { title: a.value, pri: $('#axt-pri', els.sheet).value, due: $('#axt-due', els.sheet).value, note: $('#axt-note', els.sheet).value };
    }
    if (sheet.type === 'decide') {
      var c = $('input[name=dec]:checked', els.sheet), n = $('#axt-note', els.sheet);
      return { pick: c ? c.value : null, note: n ? n.value : '' };
    }
    return null;
  }
  function rerenderSheet() {
    if (!sheet) return;
    var id = document.activeElement && document.activeElement.id, d = captureDraft();
    if (d) sheet.draft = d;
    renderSheet();
    var n = id && $('#' + id, els.sheet); (n || $('#axt-sh-t', els.sheet) || els.sheet).focus({ preventScroll: true });
  }
  function openSheet(s) {
    var first = !sheet;
    if (first) sheetFocus = document.activeElement;
    sheet = s; renderSheet();
    els.sheetbg.hidden = false; els.main.inert = true; els.main.setAttribute('aria-hidden', 'true');
    var f = s.type === 'edit' ? $('#axt-ttl', els.sheet) : (s.type === 'decide' ? $('input[name=dec]', els.sheet) : $('[data-act=snz]', els.sheet));
    (f || $('#axt-sh-t', els.sheet) || els.sheet).focus({ preventScroll: true });
  }
  function closeSheet(restore) {
    if (!sheet) return;
    sheet = null; els.sheetbg.hidden = true; els.sheet.innerHTML = '';
    els.main.inert = false; els.main.removeAttribute('aria-hidden');
    if (restore !== false) {
      if (sheetFocus && document.contains(sheetFocus)) sheetFocus.focus({ preventScroll: true });
      else focusFirstAction();
    }
    sheetFocus = null;
  }
  function focusFirstAction() {
    var n = $('.axt-card [data-act]', els.list) || $('#axt-add', els.root);
    if (n) n.focus({ preventScroll: true });
  }

  /* -------------------------------------------------------------- actions */
  function toast(msg, undo) {
    undoFn = undo || null;
    els.toast.innerHTML = '<span>' + esc(msg) + '</span>' + (undo ? '<button type="button" class="axt-undo" data-act="undo">' + esc(tx('a_undo')) + '</button>' : '');
    els.toast.classList.add('on'); els.toast.classList.toggle('has-undo', !!undo);
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { els.toast.classList.remove('on'); undoFn = null; }, undo ? 7000 : 2600);
  }
  function snap() { return JSON.stringify(rec); }
  function restore(s) { rec = JSON.parse(s); saveRec(); }

  /* after a card leaves the visible list, put focus on the next card's button */
  function neighborAfter(id) {
    var cards = $$('.axt-card', els.list), i = -1;
    cards.forEach(function (c, k) { if (c.getAttribute('data-card') === id) i = k; });
    var n = cards[i + 1] || cards[i - 1];
    return n ? n.getAttribute('data-card') : null;
  }
  function refocusCard(id) {
    var c = id && $('[data-card="' + (window.CSS && CSS.escape ? CSS.escape(id) : id) + '"] [data-act]', els.list);
    if (c) c.focus({ preventScroll: true }); else { var h = $('#axt-h1', els.root); if (h) h.focus({ preventScroll: true }); }
  }
  function setSeed(key, patch) { rec.seeds[key] = Object.assign({}, rec.seeds[key] || {}, patch); }
  function mineById(id) { for (var i = 0; i < rec.mine.length; i++) if (rec.mine[i].id === id) return rec.mine[i]; return null; }

  function markDone(id) {
    var before = snap(), next = neighborAfter(id), t = findTask(id); if (!t) return;
    if (t.seed) setSeed(id.slice(2), { st: 'done', at: today(), until: null });
    else { var m = mineById(id); m.st = 'done'; m.until = null; }
    saveRec(); renderAll(); refocusCard(next);
    toast(tx('toast_done'), function () { restore(before); renderAll(); refocusCard(id); toast(tx('toast_undone')); });
  }
  function reopen(id) {
    var before = snap(), next = neighborAfter(id), t = findTask(id); if (!t) return;
    if (t.seed) { var key = id.slice(2); rec.seeds[key] = {}; }
    else { var m = mineById(id); m.st = 'open'; m.until = null; }
    saveRec(); renderAll(); refocusCard(next);
    toast(tx('toast_reopen'), function () { restore(before); renderAll(); refocusCard(id); toast(tx('toast_undone')); });
  }
  function snoozeTo(id, days) {
    var before = snap(), next = neighborAfter(id), until = addDays(today(), days), t = findTask(id); if (!t) return;
    if (t.seed) setSeed(id.slice(2), { st: 'snoozed', until: until });
    else { var m = mineById(id); m.until = until; }
    saveRec(); closeSheet(false); renderAll(); refocusCard(next);
    toast(tx('toast_snz') + ' ' + plainDate(until), function () { restore(before); renderAll(); refocusCard(id); toast(tx('toast_undone')); });
  }
  function deleteMine(id) {
    var before = snap(), next = neighborAfter(id);
    rec.mine = rec.mine.filter(function (m) { return m.id !== id; });
    saveRec(); renderAll(); refocusCard(next);
    toast(tx('toast_del'), function () { restore(before); renderAll(); refocusCard(id); toast(tx('toast_undone')); });
  }

  function setErr(msg, focusEl) {
    var e = $('#axt-err', els.sheet); if (e) e.textContent = msg;
    $$('[aria-invalid]', els.sheet).forEach(function (n) { n.removeAttribute('aria-invalid'); });
    if (focusEl) { focusEl.setAttribute('aria-invalid', 'true'); focusEl.focus(); }
  }
  function saveDecision() {
    var t = findTask(sheet.id); if (!t) return;
    var pick = $('input[name=dec]:checked', els.sheet), note = ($('#axt-note', els.sheet).value || '').trim();
    if (!pick) { setErr(tx('dec_err_pick'), $('input[name=dec]', els.sheet)); return; }
    var d = t.dec.filter(function (x) { return x.key === pick.value; })[0];
    if (!d) return;
    if (d.needNote && note.length < 3) { setErr(tx('dec_err_note'), $('#axt-note', els.sheet)); return; }
    var before = snap(), next = neighborAfter(t.id);
    setSeed(t.id.slice(2), { st: d.result === 'waiting' ? 'waiting' : 'done', res: d.key, note: note.slice(0, MAX_NOTE), at: today(), until: null });
    saveRec(); closeSheet(false); renderAll(); refocusCard(next);
    toast(tx('toast_dec'), function () { restore(before); renderAll(); refocusCard(t.id); toast(tx('toast_undone')); });
  }
  function saveEdit() {
    var ttl = $('#axt-ttl', els.sheet), title = (ttl.value || '').trim().replace(/\s+/g, ' '),
      pri = $('#axt-pri', els.sheet).value, dueEl = $('#axt-due', els.sheet), due = dueEl.value || '', note = ($('#axt-note', els.sheet).value || '').trim();
    if (!title) { setErr(tx('f_err_title'), ttl); return; }
    if (title.length > MAX_TITLE) { setErr(tx('f_err_long'), ttl); return; }
    if (due && (!validIso(due) || due < today())) { setErr(tx('f_err_date'), dueEl); return; }
    if (['high', 'normal', 'low'].indexOf(pri) < 0) pri = 'normal';
    var before = snap(), id = sheet.id, isNew = !id;
    if (isNew) { rec.n = (rec.n || 0) + 1; id = 'm:' + Date.now().toString(36) + rec.n; rec.mine.push({ id: id, title: title, pri: pri, due: due || null, note: note.slice(0, MAX_NOTE), st: 'open' }); }
    else { var m = mineById(id); if (!m) { closeSheet(); return; } m.title = title; m.pri = pri; m.due = due || null; m.note = note.slice(0, MAX_NOTE); }
    saveRec();
    F.tab = F.tab === 'done' || F.tab === 'later' ? 'open' : F.tab; F.cat = 'all';
    closeSheet(false); renderAll(); refocusCard(id);
    toast(isNew ? tx('toast_added') : tx('toast_saved'), function () { restore(before); renderAll(); toast(tx('toast_undone')); });
  }

  /* --------------------------------------------------------------- events */
  function bind() {
    var r = els.root;
    r.addEventListener('click', function (e) {
      var t = e.target, b;
      if ((b = t.closest('[data-th]'))) { setTheme(b.getAttribute('data-th')); return; }
      if (t.closest('#axt-lang')) { toggleLang(); return; }
      if (t.closest('#axt-close')) { close(); return; }
      if (t.closest('#axt-add')) { sheetFocus = null; openSheet({ type: 'edit', id: null }); return; }
      if ((b = t.closest('[data-tab]'))) { F.tab = b.getAttribute('data-tab'); renderAll(); return; }
      if ((b = t.closest('[data-act]'))) {
        var a = b.getAttribute('data-act'), id = b.getAttribute('data-id');
        if (a === 'done') markDone(id);
        else if (a === 'reopen') reopen(id);
        else if (a === 'decide') openSheet({ type: 'decide', id: id });
        else if (a === 'snooze') openSheet({ type: 'snooze', id: id });
        else if (a === 'edit') openSheet({ type: 'edit', id: id });
        else if (a === 'delete') deleteMine(id);
        else if (a === 'add') openSheet({ type: 'edit', id: null });
        else if (a === 'allcats') { F.cat = 'all'; renderAll(); }
        else if (a === 'retry') load();
        else if (a === 'sheet-close') closeSheet();
        else if (a === 'snz') snoozeTo(sheet.id, parseInt(b.getAttribute('data-days'), 10));
        else if (a === 'dec-save') saveDecision();
        else if (a === 'edit-save') saveEdit();
        else if (a === 'undo') { var f = undoFn; undoFn = null; els.toast.classList.remove('on'); if (f) f(); }
        return;
      }
      if (t === els.sheetbg) closeSheet();
    });
    r.addEventListener('change', function (e) {
      var t = e.target;
      if (t.id === 'axt-cat') { F.cat = t.value; renderAll(); var n = $('#axt-cat', r); if (n) n.focus({ preventScroll: true }); }
      else if (t.id === 'axt-sort') { F.sort = t.value; renderAll(); var s2 = $('#axt-sort', r); if (s2) s2.focus({ preventScroll: true }); }
      else if (t.id === 'axt-as') { setUser({ kind: kindOfDemo(t.value), id: t.value }); var s3 = $('#axt-as', r); if (s3) s3.focus({ preventScroll: true }); try { var u = new URL(location.href); u.searchParams.set('as', t.value); history.replaceState(history.state, '', u.pathname + u.search + u.hash); } catch (er) { } }
      else if (t.name === 'dec') { var er2 = $('#axt-err', els.sheet); if (er2) er2.textContent = ''; }
    });
    r.addEventListener('submit', function (e) { e.preventDefault(); });
    r.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && sheet && sheet.type === 'edit' && e.target.id === 'axt-ttl') { e.preventDefault(); saveEdit(); return; }
      if (e.key === 'Tab' && sheet) {
        var f = $$('button:not([disabled]), input:not([disabled]), select, textarea, [href], [tabindex]:not([tabindex="-1"])', els.sheet).filter(function (n) { return n.offsetParent !== null; });
        if (!f.length) { e.preventDefault(); els.sheet.focus(); return; }
        var first = f[0], last = f[f.length - 1], a = document.activeElement;
        if (!els.sheet.contains(a) || a === els.sheet) { e.preventDefault(); (e.shiftKey ? last : first).focus(); }
        else if (e.shiftKey && a === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
        return;
      }
      if (e.key === 'Escape') {
        if (sheet) { e.preventDefault(); closeSheet(); } else if (!STANDALONE) { e.preventDefault(); close(); }
        return;
      }
      var tab = e.target.closest && e.target.closest('#axt-tabs [role=tab]');
      if (tab && (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'Home' || e.key === 'End')) {
        var tabs = $$('[role=tab]', els.tabs), i = tabs.indexOf(tab), rtl = lang() === 'ar';
        var step = e.key === 'ArrowRight' ? (rtl ? -1 : 1) : e.key === 'ArrowLeft' ? (rtl ? 1 : -1) : 0;
        var n = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (i + step + tabs.length) % tabs.length;
        e.preventDefault(); F.tab = tabs[n].getAttribute('data-tab'); renderAll(); var nt = $('#axt-tab-' + F.tab, els.tabs); if (nt) nt.focus();
      }
    });
    if (mqDark) {
      var h = function () { if (theme === 'system') applyTheme(); };
      if (mqDark.addEventListener) mqDark.addEventListener('change', h); else if (mqDark.addListener) mqDark.addListener(h);
    }
    window.addEventListener('popstate', function () {
      if (!opened || STANDALONE) return;
      if (sheet) { closeSheet(); history.pushState({ adamTasks: 1 }, ''); return; }
      pushed = false; close(true);
    });
    new MutationObserver(function () { if (built) { rerenderSheet(); renderAll(); } paintLauncher(); placeEntry(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    window.addEventListener('storage', function (e) {
      if (e.key === LS_THEME) { theme = getThemePref(); applyTheme(); }
      if (user && e.key === keyFor(user)) { loadRec(); if (built) renderAll(); paintLauncher(); }
    });
  }

  function toggleLang() {
    var next = lang() === 'ar' ? 'en' : 'ar';
    var appBtn = !STANDALONE && document.getElementById('lang-btn');
    if (appBtn) { appBtn.click(); return; }
    store('set', LS_LANG, next);
    document.documentElement.lang = next; document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  }

  /* ------------------------------------------------------- open / close */
  function setInert(on) {
    if (on) {
      inertList = [];
      Array.prototype.forEach.call(document.body.children, function (n) {
        if (n === els.root || n.tagName === 'SCRIPT' || n.tagName === 'STYLE' || n.hasAttribute('inert')) return;
        n.setAttribute('inert', ''); inertList.push(n);
      });
    } else { inertList.forEach(function (n) { n.removeAttribute('inert'); }); inertList = []; }
  }
  function open(o) {
    if (!user) return;
    build();
    if (opened) return;
    opened = true; lastFocus = document.activeElement; theme = getThemePref();
    els.root.hidden = false;
    if (!STANDALONE) { setInert(true); document.documentElement.classList.add('ax-lock'); history.pushState({ adamTasks: 1 }, ''); pushed = true; }
    applyTheme(); applyStatic();
    if (status === 'idle' || status === 'error') load(); else renderAll();
    if (!STANDALONE || (o && o.focus)) setTimeout(function () { var h = $('#axt-h1', els.root); if (h) h.focus({ preventScroll: true }); }, 30);
    paintLauncher();
  }
  function close(fromPop) {
    if (!opened || STANDALONE) return;
    if (sheet) closeSheet(false);
    opened = false; els.root.hidden = true; setInert(false); document.documentElement.classList.remove('ax-lock');
    if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) { } }
    paintLauncher();
    if (lastFocus && document.contains(lastFocus)) { try { lastFocus.focus({ preventScroll: true }); } catch (e) { } }
  }

  /* ------------------------------------------------ loading (adapter) */
  /* The real version will read tasks from the backend. For now the sample
     tasks come from adam-tasks-data.js and the person's own from this device. */
  function fetchTasks(u) {
    return new Promise(function (resolve, reject) {
      var delay = window.__adamTasksDelay || 0, fail = window.__adamTasksFail;
      setTimeout(function () {
        if (fail) { window.__adamTasksFail = fail > 1 ? fail - 1 : 0; reject(new Error('sample failure')); } else resolve(u);
      }, delay);
    });
  }
  function load() {
    if (!user) return;
    var my = ++reqId, u = user;
    status = 'loading'; renderAll();
    fetchTasks(u).then(function () {
      if (my !== reqId || !user || user.id !== u.id) return;
      loadRec(); status = 'ready'; renderAll();
    }).catch(function () {
      if (my !== reqId) return;
      status = 'error'; renderAll();
    });
  }

  /* --------------------------------------------- who is signed in */
  function kindOfDemo(id) { for (var i = 0; i < D.USERS.length; i++) if (D.USERS[i].id === id) return D.USERS[i].kind; return 'client'; }
  function setUser(u) {
    var ok = u && u.id && D.SEEDS[u.kind];
    var same = ok && user && user.id === u.id && user.kind === u.kind;
    if (same) return;
    /* a different person (or nobody): drop everything about the previous one */
    reqId++; rec = null; status = 'idle'; F = { tab: 'open', cat: 'all', sort: 'smart' }; undoFn = null;
    if (built) { if (sheet) closeSheet(false); els.toast.classList.remove('on'); els.list.innerHTML = ''; els.stats.innerHTML = ''; els.tabs.innerHTML = ''; }
    user = ok ? { kind: u.kind, id: String(u.id) } : null;
    if (!user) { if (opened && !STANDALONE) close(); if (built && STANDALONE) renderAll(); paintLauncher(); placeEntry(); return; }
    if (opened || STANDALONE) load(); else { loadRec(); status = 'ready'; }
    paintLauncher(); placeEntry();
  }

  /* ------------------------------------------- launcher + entry card (in app) */
  var fab = null;
  function paintLauncher() {
    if (STANDALONE) return;
    if (!fab) {
      fab = document.createElement('button'); fab.type = 'button'; fab.className = 'axt-fab'; fab.id = 'adam-tasks-fab';
      fab.addEventListener('click', function () { open(); });
      document.body.appendChild(fab);
    }
    if (!user || opened) { fab.hidden = true; return; }
    if (!rec) loadRec();
    var n = dueCount();
    fab.hidden = false;
    fab.innerHTML = icon('checklist') + '<span class="axt-fl">' + esc(tx('launch')) + '</span>' + (n ? '<span class="axt-badge" aria-hidden="true">' + num(n > 9 ? '9+' : n) + '</span>' : '');
    fab.setAttribute('aria-label', tx('open_tasks') + (n ? ' — ' + n + ' ' + tx('n_due') : ''));
  }
  function placeEntry() { /* a card on the client home, in addition to the launcher */
    if (STANDALONE) return;
    var home = document.getElementById('client-home'), e = document.getElementById('adam-tasks-entry');
    if (!home || !user || user.kind !== 'client') { if (e) e.remove(); return; }
    if (!e) {
      e = document.createElement('section'); e.id = 'adam-tasks-entry'; e.className = 'axe';
      var anchor = document.getElementById('adam-explore-entry') || document.getElementById('adam-v2');
      if (anchor && anchor.parentNode === home) home.insertBefore(e, anchor.nextSibling); else home.insertBefore(e, home.firstChild);
      e.addEventListener('click', function (ev) { if (ev.target.closest('.axe-card')) open(); });
    }
    var n = dueCount();
    e.innerHTML = '<button type="button" class="axe-card" aria-label="' + esc(tx('open_tasks') + (n ? ' — ' + n + ' ' + tx('n_due') : '')) + '"><span class="axe-ic">' + icon('checklist') + '</span><span class="axe-tx"><b>' + esc(tx('entry_t')) + '</b><small>' + esc(tx('entry_p')) + '</small></span>' + (n ? '<span class="axt-badge axt-inline" aria-hidden="true">' + num(n > 9 ? '9+' : n) + '</span>' : '') + '<span class="axe-go">' + icon('arrow-left', 'ax-flip ax-rev') + '</span></button>';
  }

  /* ------------------------------------------------------------------ boot */
  window.adamTasks = {
    open: open, close: close, setUser: setUser,
    /* test hooks: read-only snapshots */
    _state: function () { return { user: user && { kind: user.kind }, status: status, F: JSON.parse(JSON.stringify(F)), storageOk: storageOk, opened: opened }; }
  };

  function onRole(e) {
    var d = e && e.detail;
    if (!d || !d.kind || !d.uid) { setUser(null); return; }
    setUser({ kind: d.kind, id: d.uid });
  }
  window.addEventListener('adam:role', onRole);

  function boot() {
    if (STANDALONE) {
      var p; try { p = new URLSearchParams(location.search); } catch (e) { p = null; }
      var forced = p && p.get('lang');
      var l = (forced === 'ar' || forced === 'en') ? forced : (store('get', LS_LANG) === 'en' ? 'en' : 'ar');
      document.documentElement.lang = l; document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
      if (p && p.get('xerr')) window.__adamTasksFail = parseInt(p.get('xerr'), 10) || 1;
      if (p && p.get('slow')) window.__adamTasksDelay = parseInt(p.get('slow'), 10) || 1500;
      if (p && /^\d{4}-\d{2}-\d{2}$/.test(p.get('today') || '')) window.__adamTasksToday = p.get('today');
      var th = p && p.get('theme'); if (th === 'dark' || th === 'light' || th === 'system') store('set', LS_THEME, th);
      var as = (p && p.get('as')) || D.USERS[0].id;
      build(); opened = true; theme = getThemePref(); els.root.hidden = false; applyTheme(); applyStatic();
      setUser({ kind: kindOfDemo(as), id: as });
    } else {
      /* the app announces the role through "adam:role"; if it already did, pick it up */
      if (window.adamRole && window.adamRole.kind) onRole({ detail: window.adamRole });
      var q; try { q = new URLSearchParams(location.search); } catch (e) { q = null; }
      if (q && q.get('tasks') === '1') setTimeout(function () { open(); }, 0);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
