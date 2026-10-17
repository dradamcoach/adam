/*
 * ADAM Program Builder (Phase 3, beta only, standalone prototype page builder.html)
 *
 * Training / rehab program builder: programs, phases, weeks, days, exercises with sets / reps (or time /
 * distance) / rest / instructions, supersets and station circuits (with group rotation for teams),
 * edit / replace / copy / reorder, role-based permissions, rehab approval gate, audience and player-view
 * scoping (whole program / month / phase / week / tomorrow / selected players), and Print / Word / Excel export.
 *
 * What is real and what is not:
 *  - The screen and its logic are real front-end code.
 *  - Every permission and every status change is decided by ADAM_BUILDER_SERVER (adam-builder-server-sim.js),
 *    which is a SIMULATION that runs in the browser. It defines the rules a real backend must enforce; it is not security.
 *  - Programs are stored in this browser (localStorage) as a stand-in for a shared database. Sample people and programs.
 *  - Nothing is sent to any server. No Firebase, Auth, Firestore or network.
 *
 * Icons: Tabler Icons 3.49.0 (outline), MIT, Copyright (c) 2020-2026 Pawel Kuna.
 */
(function () {
  'use strict';
  var D = window.ADAM_BUILDER_DATA, SV = window.ADAM_BUILDER_SERVER;
  if (!D || !SV || window.adamBuilder) return;

  var LS_DB = 'adam-builder:v1', LS_LANG = 'adam-lang', LS_THEME = 'adam-theme';
  var DOW_MAX = 7;

  var IC = {"plus": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M12 5l0 14\" /> <path d=\"M5 12l14 0\" />", "x": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M18 6l-12 12\" /> <path d=\"M6 6l12 12\" />", "check": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M5 12l5 5l10 -10\" />", "arrow-left": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M5 12l14 0\" /> <path d=\"M5 12l6 6\" /> <path d=\"M5 12l6 -6\" />", "moon": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008\" />", "sun": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0\" /> <path d=\"M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7\" />", "device-desktop": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10\" /> <path d=\"M7 20h10\" /> <path d=\"M9 16v4\" /> <path d=\"M15 16v4\" />", "info-circle": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0\" /> <path d=\"M12 9h.01\" /> <path d=\"M11 12h1v4h1\" />", "trash": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M4 7l16 0\" /> <path d=\"M10 11l0 6\" /> <path d=\"M14 11l0 6\" /> <path d=\"M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12\" /> <path d=\"M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3\" />", "pencil": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4\" /> <path d=\"M13.5 6.5l4 4\" />", "chevron-down": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M6 9l6 6l6 -6\" />", "chevron-up": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M6 15l6 -6l6 6\" />", "copy": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666\" /> <path d=\"M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1\" />", "search": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0\" /> <path d=\"M21 21l-6 -6\" />", "user-shield": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M6 21v-2a4 4 0 0 1 4 -4h2\" /> <path d=\"M22 16c0 4 -2.5 6 -3.5 6s-3.5 -2 -3.5 -6c1 0 2.5 -.5 3.5 -1.5c1 1 2.5 1.5 3.5 1.5\" /> <path d=\"M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0\" />", "lock": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6\" /> <path d=\"M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0\" /> <path d=\"M8 11v-4a4 4 0 1 1 8 0v4\" />", "alert-triangle": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M12 9v4\" /> <path d=\"M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0\" /> <path d=\"M12 16h.01\" />", "printer": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2\" /> <path d=\"M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4\" /> <path d=\"M7 15a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2l0 -4\" />", "file-type-doc": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /> <path d=\"M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4\" /> <path d=\"M5 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1\" /> <path d=\"M20 16.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0\" /> <path d=\"M12.5 15a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1 -3 0v-3a1.5 1.5 0 0 1 1.5 -1.5\" />", "file-spreadsheet": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /> <path d=\"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2\" /> <path d=\"M8 11h8v7h-8l0 -7\" /> <path d=\"M8 15h8\" /> <path d=\"M11 11v7\" />", "users": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0\" /> <path d=\"M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2\" /> <path d=\"M16 3.13a4 4 0 0 1 0 7.75\" /> <path d=\"M21 21v-2a4 4 0 0 0 -3 -3.85\" />", "user-plus": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0\" /> <path d=\"M16 19h6\" /> <path d=\"M19 16v6\" /> <path d=\"M6 21v-2a4 4 0 0 1 4 -4h4\" />", "arrows-exchange": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M7 10h14l-4 -4\" /> <path d=\"M17 14h-14l4 4\" />", "replace": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M3 4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4\" /> <path d=\"M15 16a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4\" /> <path d=\"M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3\" /> <path d=\"M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3\" />", "send": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M10 14l11 -11\" /> <path d=\"M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5\" />", "circle-check": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /> <path d=\"M9 12l2 2l4 -4\" />", "eye": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0\" /> <path d=\"M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6\" />", "calendar": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12\" /> <path d=\"M16 3v4\" /> <path d=\"M8 3v4\" /> <path d=\"M4 11h16\" /> <path d=\"M11 15h1\" /> <path d=\"M12 15v3\" />", "lock-open": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2l0 -6\" /> <path d=\"M11 16a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" /> <path d=\"M8 11v-5a4 4 0 0 1 8 0\" />", "arrow-back-up": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M9 14l-4 -4l4 -4\" /> <path d=\"M5 10h11a4 4 0 1 1 0 8h-1\" />", "list-details": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M13 5h8\" /> <path d=\"M13 9h5\" /> <path d=\"M13 15h8\" /> <path d=\"M13 19h5\" /> <path d=\"M3 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4\" /> <path d=\"M3 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4\" />", "flag": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9\" /> <path d=\"M5 21v-7\" />", "bolt": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11\" />", "refresh": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4\" /> <path d=\"M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4\" />", "stack-2": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M12 4l-8 4l8 4l8 -4l-8 -4\" /> <path d=\"M4 12l8 4l8 -4\" /> <path d=\"M4 16l8 4l8 -4\" />", "arrow-up": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M12 5l0 14\" /> <path d=\"M18 11l-6 -6\" /> <path d=\"M6 11l6 -6\" />", "arrow-down": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M12 5l0 14\" /> <path d=\"M18 13l-6 6\" /> <path d=\"M6 13l6 6\" />", "clipboard-check": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2\" /> <path d=\"M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2\" /> <path d=\"M9 14l2 2l4 -4\" />", "certificate": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M12 15a3 3 0 1 0 6 0a3 3 0 1 0 -6 0\" /> <path d=\"M13 17.5v4.5l2 -1.5l2 1.5v-4.5\" /> <path d=\"M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73\" /> <path d=\"M6 9l12 0\" /> <path d=\"M6 12l3 0\" /> <path d=\"M6 15l2 0\" />", "player-play": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M7 4v16l13 -8l-13 -8\" />"};
  function icon(name, cls) {
    return '<svg class="axi ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (IC[name] || '') + '</svg>';
  }

  /* ----------------------------------------------------------------- text */
  var TX = {
    ar: {
      title: 'منشئ البرامج', close: 'إغلاق', back: 'رجوع للبرامج',
      sample: 'بيانات تجريبية — الأشخاص والبرامج مخترعة. اللي بيقرر الصلاحيات وحالة البرنامج "سيرفر تجريبي" شغال في المتصفح ومش حماية حقيقية. البرامج بتتحفظ في المتصفح ده بس.',
      switch_t: 'تجربة فقط: اختار مين تشوف الشاشة بدالّه', switch_p: 'بالتبديل بتشوف إزاي كل دور بيشوف البرنامج نفسه بصلاحيات مختلفة.',
      role_coach: 'مدرب', role_specialist: 'متخصص', role_admin: 'إدارة', role_client: 'عميل / لاعب',
      h1: 'البرامج', lead_build: 'ابني برامج تدريب أو تأهيل، ورتّب الأيام والتمارين والمحطات، وحدد مين يشوفها.', lead_client: 'البرامج اللي مدربك نشرها ليك.',
      new_prog: 'برنامج جديد', team_btn: 'إدارة الفريق', prog_none_t: 'لسه مفيش برامج', prog_none_p: 'ابدأ ببرنامج جديد أو انسخ برنامج موجود.', prog_none_c: 'مفيش برامج منشورة ليك دلوقتي', prog_none_cp: 'لما مدربك ينشر برنامج ليك هتلاقيه هنا.',
      st_draft: 'مسودة', st_pending_review: 'مستني اعتماد متخصص', st_approved: 'معتمد (غير منشور)', st_published: 'منشور',
      ty_training: 'تدريب', ty_rehab: 'تأهيل', rev: 'نسخة', weeks_n: 'أسابيع', people_n: 'أشخاص', open: 'فتح', dup: 'نسخ', del: 'حذف', del_none: 'المنشور لازم يتوقف نشره الأول',
      np_title: 'برنامج جديد', f_title: 'اسم البرنامج', f_type: 'النوع', f_weeks: 'عدد الأسابيع (1 إلى 12)', f_start: 'تاريخ أول يوم', f_goal: 'الهدف (اختياري)', f_kind: 'الجمهور',
      kind_team: 'الفريق', kind_ind: 'أفراد', create: 'إنشاء', cancel: 'إلغاء', save: 'حفظ',
      e_title: 'اكتب اسم للبرنامج.', e_weeks: 'عدد الأسابيع من 1 إلى 12.', e_date: 'اختار تاريخ صالح.', e_rehab_admin: 'الإدارة ما تنشئش برامج تأهيل.',
      tab_plan: 'الخطة', tab_people: 'الجمهور والمعاينة', tab_review: 'المراجعة والنشر', tab_export: 'التصدير والطباعة', tabs_label: 'أقسام البرنامج',
      week: 'الأسبوع', week_n: 'أسبوع', day_n: 'اليوم', add_day: 'يوم جديد', no_days: 'مفيش حصص في الأسبوع ده.', day_title: 'اسم الحصة',
      copy_day: 'انسخ اليوم', copy_week: 'انسخ الأسبوع', move_up: 'فوق', move_down: 'تحت', remove: 'شيل', phases: 'المراحل', phase_n: 'مرحلة',
      add_ex: 'تمرين', add_ss: 'سوبر سيت', add_st: 'محطات', blk_single: 'تمرين', blk_superset: 'سوبر سيت (ورا بعض من غير راحة)', blk_stations: 'محطات (دايرة)',
      blk_add_item: 'ضيف تمرين', blk_rounds: 'عدد الجولات', blk_rest: 'راحة بين الجولات (ثانية)', blk_stsec: 'مدة المحطة (ثانية)',
      ss_hint: 'السوبر سيت: 2 إلى 4 تمارين ورا بعض، وبعدها راحة.', st_hint: 'المحطات: كل تمرين محطة. كل مجموعة بتتحرك لمحطة بعد كل جولة.',
      rot_t: 'جدول دوران المجموعات', rot_round: 'الجولة', rot_ind: 'في برنامج الأفراد، كل واحد بيعدّي على المحطات بالترتيب.',
      it_edit: 'تعديل التمرين', it_replace: 'استبدل', it_sets: 'المجموعات', it_rest: 'الراحة (ثانية)', it_load: 'الحمل أو الشدة', it_note: 'تعليمات إضافية', it_default: 'الشرح الأساسي',
      it_err_sets: 'المجموعات من 1 إلى 20.', it_err_val: 'القيمة من 1 إلى 5000.', it_err_rest: 'الراحة من 0 إلى 900 ثانية.',
      pk_title: 'اختار تمرين', pk_search: 'ابحث بالاسم أو الأداة', pk_cat: 'القسم', pk_all: 'كل الأقسام', pk_none: 'مفيش تمارين بالبحث ده.', pk_add: 'ضيف', pk_pick: 'اختار', pk_impact: 'عالي الصدمة',
      impact_high: 'عالي الصدمة', impact_note: 'في برنامج تأهيل المتخصص المعتمد لازم يوافق على التمارين عالية الصدمة.',
      mt_reps: 'تكرار', mt_time: 'ثانية', mt_distance: 'متر', mt_cals: 'سعر', rest_s: 'راحة', by: 'تمرين',
      ppl_h: 'مين يشوف البرنامج', ppl_team: 'الفريق', ppl_all: 'الكل', ppl_none: 'ولا واحد', ppl_group: 'مجموعة', ppl_sel: 'مختار', ppl_ind: 'العملاء',
      ppl_rehab_note: 'تغيير الجمهور بعد الاعتماد بيلغي الاعتماد ويحتاج اعتماد جديد.',
      pv_h: 'معاينة اللي يشوفه اللاعب', pv_who: 'اللاعب', pv_scope: 'النطاق',
      sc_all: 'البرنامج كله', sc_month: 'شهر', sc_phase: 'مرحلة', sc_week: 'أسبوع', sc_tomorrow: 'تمرينة بكرة', sc_n: 'رقم', sc_pick: 'اختار',
      pv_empty: 'مفيش حصص في النطاق ده.', pv_notin: 'اللاعب ده مش ضمن الجمهور — مش هيشوف حاجة.', pv_unpub: 'البرنامج لسه مش منشور — اللاعب مش هيشوفه لحد ما يتنشر.',
      rv_h: 'قبل النشر', ck_items: 'فيه تمرين واحد على الأقل', ck_aud: 'فيه لاعب أو عميل واحد على الأقل', ck_ss: 'كل سوبر سيت فيه تمرينين على الأقل', ck_st: 'كل دايرة محطات فيها محطتين على الأقل',
      ck_ok: 'تمام', ck_bad: 'ناقص',
      rv_rehab_h: 'اعتماد برنامج التأهيل', rv_rehab_p: 'برنامج التأهيل ما يتنشرش إلا بعد اعتماد متخصص معتمد. الاعتماد مربوط بنص البرنامج بالظبط: أي تعديل بعده يلغيه.',
      ap_by: 'اعتمده', ap_at: 'في', ap_note: 'الملاحظة', ap_valid: 'الاعتماد سارٍ', ap_stale: 'الاعتماد قديم (البرنامج اتعدّل)', ap_none: 'لسه مفيش اعتماد', rv_note: 'ملاحظة المتخصص',
      a_submit: 'ابعت لمتخصص للاعتماد', a_approve: 'اعتمد', a_changes: 'اطلب تعديلات', a_publish: 'انشر', a_unpublish: 'أوقف النشر',
      why_notowner: 'مش برنامجك.', why_state: 'الحالة الحالية مش بتسمح.', why_spec: 'الاعتماد من متخصص معتمد بس.', why_unq: 'شهاداتك لسه ماتفحصتش.', why_client: 'الحساب ده بيشوف بس.',
      note_h: 'الملاحظة', note_approve_ph: 'اكتب ملاحظة الاعتماد (10 حروف على الأقل)', note_changes_ph: 'اكتب اللي لازم يتعدّل (10 حروف على الأقل)', confirm: 'تأكيد',
      warn_edit_t: 'تعديل برنامج تأهيل معتمد', warn_edit_p: 'لو عدّلت هيتلغي الاعتماد ويتوقف النشر ويرجع مسودة، ومحتاج اعتماد جديد من متخصص معتمد.', warn_edit_go: 'عدّل واحذف الاعتماد',
      toast_saved: 'اتحفظ', toast_inval: 'اتلغى الاعتماد لأن البرنامج اتعدّل', toast_done: 'تم', toast_dup: 'اتنسخ كمسودة', toast_del: 'اتحذف', toast_copied: 'اتنسخ',
      ex_h: 'تصدير وطباعة', ex_p: 'اختار النطاق الأول: البرنامج كله أو شهر أو مرحلة أو أسبوع أو تمرينة بكرة.', ex_print: 'طباعة', ex_word: 'ملف Word', ex_xls: 'ملف Excel', ex_note: 'ملف Excel بصيغة XML بيفتح في Excel، وممكن يطلب تأكيد الصيغة. الطباعة والتصدير من نفس النطاق اللي اخترته.',
      xl_week: 'الأسبوع', xl_day: 'اليوم', xl_date: 'التاريخ', xl_session: 'الحصة', xl_block: 'النوع', xl_ex: 'التمرين', xl_sets: 'المجموعات', xl_val: 'القيمة', xl_unit: 'الوحدة', xl_rest: 'الراحة', xl_load: 'الحمل', xl_note: 'تعليمات', xl_round: 'جولات',
      team_h: 'فريق', team_add: 'ضيف لاعب', team_name: 'اسم اللاعب', team_group: 'المجموعة', team_remove: 'شيل', team_empty: 'الفريق فاضي.', team_n: 'لاعب', team_name_req: 'اكتب اسم اللاعب.',
      team_note: 'المدرب بس هو اللي يضيف أو يشيل أو ينقل لاعبين.',
      th_dark: 'داكن', th_light: 'فاتح', th_system: 'حسب الجهاز', theme_group: 'المظهر', lang_btn: 'تغيير اللغة', lang_to: 'ع',
      no_access: 'مش مسموح', start_on: 'بتبدأ', day_off: 'اليوم', rounds_x: 'جولات', secs: 'ث', members_all: 'كل الفريق',
      err_generic: 'ماحصلش', unknown: 'غير معروف',
      months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
    },
    en: {
      title: 'Program builder', close: 'Close', back: 'Back to programs',
      sample: 'Sample data — people and programs are invented. Permissions and program status are decided by a SIMULATED server running in the browser; it is not real security. Programs are kept in this browser only.',
      switch_t: 'Prototype only: pick who to view the screen as', switch_p: 'Switch to see how each role sees the same program with different permissions.',
      role_coach: 'Coach', role_specialist: 'Specialist', role_admin: 'Admin', role_client: 'Client / player',
      h1: 'Programs', lead_build: 'Build training or rehab programs, arrange days, exercises and stations, and choose who sees them.', lead_client: 'Programs your coach has published to you.',
      new_prog: 'New program', team_btn: 'Manage team', prog_none_t: 'No programs yet', prog_none_p: 'Start a new program or copy an existing one.', prog_none_c: 'No published programs for you yet', prog_none_cp: 'When your coach publishes a program to you it will appear here.',
      st_draft: 'Draft', st_pending_review: 'Waiting for specialist approval', st_approved: 'Approved (not published)', st_published: 'Published',
      ty_training: 'Training', ty_rehab: 'Rehab', rev: 'Revision', weeks_n: 'weeks', people_n: 'people', open: 'Open', dup: 'Copy', del: 'Delete', del_none: 'Unpublish it first',
      np_title: 'New program', f_title: 'Program name', f_type: 'Type', f_weeks: 'Number of weeks (1 to 12)', f_start: 'First day date', f_goal: 'Goal (optional)', f_kind: 'Audience',
      kind_team: 'Team', kind_ind: 'Individuals', create: 'Create', cancel: 'Cancel', save: 'Save',
      e_title: 'Enter a program name.', e_weeks: 'Weeks must be from 1 to 12.', e_date: 'Choose a valid date.', e_rehab_admin: 'Admins do not create rehab programs.',
      tab_plan: 'Plan', tab_people: 'Audience and preview', tab_review: 'Review and publish', tab_export: 'Export and print', tabs_label: 'Program sections',
      week: 'Week', week_n: 'Week', day_n: 'Day', add_day: 'New day', no_days: 'No sessions in this week.', day_title: 'Session name',
      copy_day: 'Copy day', copy_week: 'Copy week', move_up: 'Up', move_down: 'Down', remove: 'Remove', phases: 'Phases', phase_n: 'Phase',
      add_ex: 'Exercise', add_ss: 'Superset', add_st: 'Stations', blk_single: 'Exercise', blk_superset: 'Superset (back to back, no rest)', blk_stations: 'Stations (circuit)',
      blk_add_item: 'Add exercise', blk_rounds: 'Rounds', blk_rest: 'Rest between rounds (sec)', blk_stsec: 'Station time (sec)',
      ss_hint: 'Superset: 2 to 4 exercises back to back, then rest.', st_hint: 'Stations: each exercise is a station. Every group moves to the next station after each round.',
      rot_t: 'Group rotation table', rot_round: 'Round', rot_ind: 'In an individual program, each person goes through the stations in order.',
      it_edit: 'Edit exercise', it_replace: 'Replace', it_sets: 'Sets', it_rest: 'Rest (sec)', it_load: 'Load or intensity', it_note: 'Extra instructions', it_default: 'Default instructions',
      it_err_sets: 'Sets must be 1 to 20.', it_err_val: 'Value must be 1 to 5000.', it_err_rest: 'Rest must be 0 to 900 seconds.',
      pk_title: 'Choose an exercise', pk_search: 'Search by name or equipment', pk_cat: 'Category', pk_all: 'All categories', pk_none: 'No exercises match this search.', pk_add: 'Add', pk_pick: 'Choose', pk_impact: 'High impact',
      impact_high: 'High impact', impact_note: 'In a rehab program the qualified specialist must confirm high-impact exercises.',
      mt_reps: 'reps', mt_time: 'sec', mt_distance: 'm', mt_cals: 'cal', rest_s: 'rest', by: 'exercise',
      ppl_h: 'Who sees this program', ppl_team: 'Team', ppl_all: 'All', ppl_none: 'None', ppl_group: 'Group', ppl_sel: 'selected', ppl_ind: 'Clients',
      ppl_rehab_note: 'Changing the audience after approval cancels the approval and needs a new one.',
      pv_h: 'Preview what the player sees', pv_who: 'Player', pv_scope: 'Scope',
      sc_all: 'Whole program', sc_month: 'A month', sc_phase: 'A phase', sc_week: 'A week', sc_tomorrow: 'Tomorrow’s session', sc_n: 'Number', sc_pick: 'Choose',
      pv_empty: 'No sessions in this scope.', pv_notin: 'This player is not in the audience — they will see nothing.', pv_unpub: 'The program is not published yet — the player will not see it until it is.',
      rv_h: 'Before publishing', ck_items: 'At least one exercise', ck_aud: 'At least one player or client', ck_ss: 'Every superset has at least 2 exercises', ck_st: 'Every station circuit has at least 2 stations',
      ck_ok: 'OK', ck_bad: 'Missing',
      rv_rehab_h: 'Rehab program approval', rv_rehab_p: 'A rehab program cannot be published until a qualified specialist approves it. The approval is tied to the exact content: any change afterwards cancels it.',
      ap_by: 'Approved by', ap_at: 'on', ap_note: 'Note', ap_valid: 'Approval is valid', ap_stale: 'Approval is stale (the program changed)', ap_none: 'No approval yet', rv_note: 'Specialist note',
      a_submit: 'Send to a specialist for approval', a_approve: 'Approve', a_changes: 'Request changes', a_publish: 'Publish', a_unpublish: 'Unpublish',
      why_notowner: 'This is not your program.', why_state: 'The current status does not allow this.', why_spec: 'Only a qualified specialist can approve.', why_unq: 'Your credentials have not been checked yet.', why_client: 'This account is view-only.',
      note_h: 'Note', note_approve_ph: 'Write the approval note (at least 10 characters)', note_changes_ph: 'Write what must change (at least 10 characters)', confirm: 'Confirm',
      warn_edit_t: 'Editing an approved rehab program', warn_edit_p: 'If you edit it, the approval is cancelled, publishing stops and it goes back to draft. It needs a new approval from a qualified specialist.', warn_edit_go: 'Edit and cancel approval',
      toast_saved: 'Saved', toast_inval: 'Approval cancelled because the program changed', toast_done: 'Done', toast_dup: 'Copied as a draft', toast_del: 'Deleted', toast_copied: 'Copied',
      ex_h: 'Export and print', ex_p: 'Pick the scope first: whole program, a month, a phase, a week or tomorrow’s session.', ex_print: 'Print', ex_word: 'Word file', ex_xls: 'Excel file', ex_note: 'The Excel file is XML that Excel opens; it may ask you to confirm the format. Print and export use the scope you chose.',
      xl_week: 'Week', xl_day: 'Day', xl_date: 'Date', xl_session: 'Session', xl_block: 'Type', xl_ex: 'Exercise', xl_sets: 'Sets', xl_val: 'Value', xl_unit: 'Unit', xl_rest: 'Rest', xl_load: 'Load', xl_note: 'Instructions', xl_round: 'Rounds',
      team_h: 'Team', team_add: 'Add player', team_name: 'Player name', team_group: 'Group', team_remove: 'Remove', team_empty: 'The team is empty.', team_n: 'players', team_name_req: 'Enter the player’s name.',
      team_note: 'Only the coach can add, remove or move players.',
      th_dark: 'Dark', th_light: 'Light', th_system: 'Use device settings', theme_group: 'Appearance', lang_btn: 'Change language', lang_to: 'ع',
      no_access: 'Not allowed', start_on: 'starts', day_off: 'Day', rounds_x: 'rounds', secs: 's', members_all: 'Whole team',
      err_generic: 'Failed', unknown: 'Unknown',
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
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function today() {
    var f = window.__adamBuilderToday, m = f && /^(\d{4})-(\d{2})-(\d{2})$/.exec(f);
    return iso(m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date());
  }
  function addDays(s, n) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s); return iso(new Date(+m[1], +m[2] - 1, +m[3] + n)); }
  function validIso(s) { return /^\d{4}-\d{2}-\d{2}$/.test(s || '') && iso(new Date(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10))) === s; }
  function fmtDate(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? parseInt(m[3], 10) + ' ' + tx('months')[parseInt(m[2], 10) - 1] + ' ' + m[1] : ''; }
  function fmtDateH(s) { return '<bdi class="axn">' + esc(fmtDate(s)) + '</bdi>'; }
  var seq = 0;
  function nid(p) { seq++; return p + Date.now().toString(36) + seq; }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

  var CATALOG = {};
  function ex(id) { return CATALOG[id] || null; }
  function exName(id) { var e = ex(id); return e ? L(e.name) : id; }

  /* ---------------------------------------------------------------- state */
  var DB = null, actorId = null, view = { name: 'list', pid: null }, tab = 'plan', week = 1;
  var scope = { kind: 'all', n: 1 }, previewMember = null;
  var theme = 'dark', built = false, sheet = null, sheetFocus = null, unlocked = {}, status = 'idle';
  var els = {}, toastTimer = null, pendingEdit = null, catalogList = [];
  var mqDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var pickState = { q: '', cat: 'all' };

  function actor() { return SV.who(actorId); }
  function isBuilder() { return SV.canBuild(actorId); }
  function curProg() { return view.pid ? progById(view.pid) : null; }
  function progById(id) { for (var i = 0; i < DB.programs.length; i++) if (DB.programs[i].id === id) return DB.programs[i]; return null; }
  function persist() { store('set', LS_DB, JSON.stringify(DB)); }

  /* ----------------------------------------------------- sample database */
  function mkItem(exId, o) {
    var e = ex(exId) || { sets: 3, val: 10, rest: 60 };
    o = o || {};
    return { id: nid('i'), exId: exId, sets: o.sets || e.sets, val: o.val || e.val, rest: o.rest != null ? o.rest : e.rest, load: o.load || '', note: o.note || '' };
  }
  function mkBlock(kind, items, o) { o = o || {}; return { id: nid('b'), kind: kind, rounds: o.rounds || (kind === 'stations' ? 3 : 1), restBetween: o.restBetween != null ? o.restBetween : (kind === 'single' ? 0 : 90), stationSec: o.stationSec || 40, items: items }; }
  function mkDay(week, idx, title, blocks) { return { id: nid('d'), week: week, idx: idx, title: title, blocks: blocks }; }
  function seedDb() {
    var t = today(), members = clone(D.TEAM.members);
    var w1 = function (w) {
      return [
        mkDay(w, 0, { ar: 'قوة الجسم السفلي', en: 'Lower-body strength' }, [mkBlock('single', [mkItem('bx_squat')]), mkBlock('single', [mkItem('bx_rdl')]), mkBlock('superset', [mkItem('bx_pullup'), mkItem('bx_band_face')], { restBetween: 90 })]),
        mkDay(w, 1, { ar: 'رشاقة: محطات', en: 'Agility stations' }, [mkBlock('stations', [mkItem('bx_ladder_ickey', { val: 40 }), mkItem('bx_cone_5105'), mkItem('bx_hurdle_hops'), mkItem('bx_band_sprint')], { rounds: 4, stationSec: 40, restBetween: 60 })]),
        mkDay(w, 3, { ar: 'تكييف هايروكس', en: 'HYROX conditioning' }, [mkBlock('single', [mkItem('bx_hx_sledpush')]), mkBlock('single', [mkItem('bx_wallball')]), mkBlock('single', [mkItem('bx_rope_wave')])])
      ];
    };
    var days = [];
    for (var w = 1; w <= 4; w++) {
      w1(w).forEach(function (d) { d.title = { ar: d.title.ar, en: d.title.en }; days.push(d); });
    }
    var p1 = { id: 'prog-falcons', ownerId: 'u-coach-hossam', title: 'Falcons pre-season', goal: 'Strength, agility and HYROX-style conditioning', type: 'training', weeks: 4, startDate: t,
      phases: [{ id: 'ph1', name: 'Base', from: 1, to: 2 }, { id: 'ph2', name: 'Build', from: 3, to: 4 }], days: days,
      audience: { kind: 'team', teamId: D.TEAM.id, memberIds: members.map(function (m) { return m.id; }) }, status: 'published', approval: null, rev: 3 };
    var p2 = { id: 'prog-mona-rehab', ownerId: 'u-coach-hossam', title: 'Mona knee return-to-run', goal: 'Rebuild knee control before running', type: 'rehab', weeks: 2, startDate: t,
      phases: [{ id: 'ph1', name: 'Control', from: 1, to: 2 }], days: [
        mkDay(1, 0, { ar: 'تحكم الركبة', en: 'Knee control' }, [mkBlock('single', [mkItem('bx_glutebridge')]), mkBlock('single', [mkItem('bx_clam')]), mkBlock('superset', [mkItem('bx_calf'), mkItem('bx_balance')])]),
        mkDay(1, 2, { ar: 'تحكم الركبة 2', en: 'Knee control 2' }, [mkBlock('single', [mkItem('bx_balance')]), mkBlock('single', [mkItem('bx_glutebridge')])]),
        mkDay(2, 0, { ar: 'تحكم الركبة 3', en: 'Knee control 3' }, [mkBlock('single', [mkItem('bx_calf', { load: 'bodyweight' })]), mkBlock('single', [mkItem('bx_clam')])])
      ], audience: { kind: 'individual', teamId: null, memberIds: ['u-client-mona'] }, status: 'pending_review', approval: null, rev: 2, submittedHash: null };
    p2.submittedHash = SV.contentHash(p2);
    var p3 = { id: 'prog-omar-home', ownerId: 'u-coach-hossam', title: 'Omar home conditioning', goal: '', type: 'training', weeks: 2, startDate: t, phases: [{ id: 'ph1', name: 'Start', from: 1, to: 2 }],
      days: [mkDay(1, 0, { ar: 'يوم 1', en: 'Day 1' }, [mkBlock('single', [mkItem('bx_burpee')]), mkBlock('single', [mkItem('bx_plank')])])],
      audience: { kind: 'individual', teamId: null, memberIds: [] }, status: 'draft', approval: null, rev: 1 };
    return { v: 1, programs: [p1, p2, p3], team: { id: D.TEAM.id, name: D.TEAM.name, groups: D.TEAM.groups.slice(), members: members } };
  }
  function loadDb(fromStorage) {
    var raw = store('get', LS_DB) || (LS_DB in memStore ? memStore[LS_DB] : null), r = null;
    try { r = raw ? JSON.parse(raw) : null; } catch (e) { r = null; }
    if (!r || r.v !== 1 || !Array.isArray(r.programs) || !r.team || !Array.isArray(r.team.members)) { r = seedDb(); }
    DB = r; if (!fromStorage) persist();
  }
  /* day -> date */
  function dayDate(p, d) { return addDays(p.startDate, (d.week - 1) * 7 + d.idx); }
  function sortedDays(p, w) { return p.days.filter(function (d) { return d.week === w; }).sort(function (a, b) { return a.idx - b.idx; }); }

  /* ----------------------------------------------------------- scoping */
  function monthWeeks(p, n) { return { from: (n - 1) * 4 + 1, to: Math.min(n * 4, p.weeks) }; }
  function maxMonths(p) { return Math.max(1, Math.ceil(p.weeks / 4)); }
  function daysInScope(p, sc) {
    var all = p.days.slice().sort(function (a, b) { return a.week - b.week || a.idx - b.idx; });
    if (sc.kind === 'all') return all;
    if (sc.kind === 'week') return all.filter(function (d) { return d.week === sc.n; });
    if (sc.kind === 'month') { var m = monthWeeks(p, sc.n); return all.filter(function (d) { return d.week >= m.from && d.week <= m.to; }); }
    if (sc.kind === 'phase') { var ph = null; p.phases.forEach(function (x) { if (x.id === sc.n) ph = x; }); return ph ? all.filter(function (d) { return d.week >= ph.from && d.week <= ph.to; }) : []; }
    if (sc.kind === 'tomorrow') { var tm = addDays(today(), 1); return all.filter(function (d) { return dayDate(p, d) === tm; }); }
    return all;
  }
  function scopeLabel(p, sc) {
    if (sc.kind === 'all') return tx('sc_all');
    if (sc.kind === 'week') return tx('sc_week') + ' ' + sc.n;
    if (sc.kind === 'month') return tx('sc_month') + ' ' + sc.n;
    if (sc.kind === 'phase') { var ph = null; p.phases.forEach(function (x) { if (x.id === sc.n) ph = x; }); return tx('sc_phase') + ': ' + (ph ? ph.name : ''); }
    return tx('sc_tomorrow') + ' (' + fmtDate(addDays(today(), 1)) + ')';
  }
  function normScope(p) {
    if (scope.kind === 'week') scope.n = clamp(parseInt(scope.n, 10) || 1, 1, p.weeks);
    if (scope.kind === 'month') scope.n = clamp(parseInt(scope.n, 10) || 1, 1, maxMonths(p));
    if (scope.kind === 'phase') { var ok = p.phases.some(function (x) { return x.id === scope.n; }); if (!ok) scope.n = p.phases[0] ? p.phases[0].id : ''; }
  }

  /* ----------------------------------------------------- shared rendering */
  function metricUnit(e) { return tx('mt_' + (e ? e.metric : 'reps')); }
  function presc(it) {
    var e = ex(it.exId);
    return '<bdi class="axn">' + it.sets + ' × ' + it.val + '</bdi> ' + esc(metricUnit(e)) + ' · ' + esc(tx('rest_s')) + ' <bdi class="axn">' + it.rest + '</bdi>' + esc(tx('secs')) + (it.load ? ' · ' + esc(it.load) : '');
  }
  function groupsOf(p) {
    var a = p.audience || {};
    if (a.kind !== 'team') return [];
    var seen = {}, out = [];
    DB.team.members.forEach(function (m) { if ((a.memberIds || []).indexOf(m.id) > -1 && !seen[m.group]) { seen[m.group] = 1; out.push(m.group); } });
    return out.sort();
  }
  function rotationHtml(p, b) {
    var gs = groupsOf(p), n = b.items.length;
    if (!gs.length) return '<p class="ax-note">' + esc(tx('rot_ind')) + '</p>';
    if (n < 2) return '';
    var h = '<div class="ax-tw"><table class="ax-table axb-rot"><caption class="ax-sr">' + esc(tx('rot_t')) + '</caption><thead><tr><th scope="col">' + esc(tx('rot_round')) + '</th>';
    gs.forEach(function (g) { h += '<th scope="col">' + esc(tx('ppl_group')) + ' ' + esc(g) + '</th>'; });
    h += '</tr></thead><tbody>';
    for (var r = 0; r < b.rounds; r++) {
      h += '<tr><th scope="row">' + num(r + 1) + '</th>';
      gs.forEach(function (g, gi) { h += '<td>' + esc(exName(b.items[(gi + r) % n].exId)) + '</td>'; });
      h += '</tr>';
    }
    return h + '</tbody></table></div>';
  }
  function blockKindLabel(b) { return tx(b.kind === 'single' ? 'blk_single' : b.kind === 'superset' ? 'blk_superset' : 'blk_stations'); }
  /* read-only program body (used by the player view, the preview and print) */
  function programBodyHtml(p, sc) {
    var days = daysInScope(p, sc);
    if (!days.length) return '<div class="ax-state"><h2>' + esc(tx('pv_empty')) + '</h2></div>';
    var h = '', curW = 0;
    days.forEach(function (d) {
      if (d.week !== curW) { curW = d.week; h += '<h3 class="axb-wh">' + esc(tx('week_n')) + ' ' + num(d.week) + '</h3>'; }
      h += '<section class="axb-pday"><h4>' + esc(tx('day_n')) + ' ' + num(d.idx + 1) + ' · ' + fmtDateH(dayDate(p, d)) + ' — ' + esc(L(d.title)) + '</h4>';
      d.blocks.forEach(function (b) {
        h += '<div class="axb-pblk"><p class="axb-pk">' + esc(blockKindLabel(b)) + (b.kind !== 'single' ? ' · ' + num(b.rounds) + ' ' + esc(tx('rounds_x')) + (b.kind === 'stations' ? ' · ' + num(b.stationSec) + esc(tx('secs')) : '') : '') + '</p><ul class="axb-pul">';
        b.items.forEach(function (it) {
          var e = ex(it.exId);
          h += '<li><b>' + esc(exName(it.exId)) + '</b> — ' + (b.kind === 'stations' ? num(b.stationSec) + esc(tx('secs')) : presc(it)) +
            (e ? '<span class="axb-how">' + esc(L(e.how)) + '</span>' : '') + (it.note ? '<span class="axb-how axb-extra">' + esc(it.note) + '</span>' : '') + '</li>';
        });
        h += '</ul>' + (b.kind === 'stations' ? rotationHtml(p, b) : '') + '</div>';
      });
      h += '</section>';
    });
    return h;
  }

  /* ------------------------------------------------------------ DOM shell */
  function build() {
    if (built) return; built = true;
    var root = document.createElement('div');
    root.className = 'ax axb'; root.id = 'adam-builder';
    root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-labelledby', 'axb-h1');
    root.innerHTML =
      '<div class="ax-main" id="axb-main">' +
        '<header class="ax-top"><div class="ax-brand" data-i="title"></div><div class="ax-ctrl">' +
          '<div class="ax-seg" role="group" data-ia="theme_group">' +
            '<button type="button" data-th="dark" data-ia="th_dark">' + icon('moon') + '</button>' +
            '<button type="button" data-th="light" data-ia="th_light">' + icon('sun') + '</button>' +
            '<button type="button" data-th="system" data-ia="th_system">' + icon('device-desktop') + '</button></div>' +
          '<button type="button" class="ax-lang" id="axb-lang" data-ia="lang_btn"></button></div></header>' +
        '<div class="ax-scroll" id="axb-scroll"><div class="ax-wrap" id="axb-body"></div></div>' +
      '</div>' +
      '<div class="ax-sheet-bg" id="axb-sheetbg" hidden><div class="ax-sheet axb-sheet" id="axb-sheet" role="dialog" aria-modal="true" aria-labelledby="axb-sh-t" tabindex="-1"></div></div>' +
      '<div class="ax-toast axb-toast" id="axb-toast" role="status" aria-live="polite"></div>';
    document.body.appendChild(root);
    els.root = root; els.main = $('#axb-main', root); els.body = $('#axb-body', root); els.sheetbg = $('#axb-sheetbg', root); els.sheet = $('#axb-sheet', root);
    els.toast = $('#axb-toast', root); els.lang = $('#axb-lang', root); els.scroll = $('#axb-scroll', root);
    bind();
  }
  function applyStatic() {
    var r = els.root;
    $$('[data-i]', r).forEach(function (n) { n.textContent = tx(n.getAttribute('data-i')); });
    $$('[data-ia]', r).forEach(function (n) { n.setAttribute('aria-label', tx(n.getAttribute('data-ia'))); });
    els.lang.textContent = tx('lang_to');
    $$('[data-th]', r).forEach(function (b) { b.setAttribute('title', tx('th_' + b.getAttribute('data-th'))); });
    r.setAttribute('lang', lang()); r.setAttribute('dir', lang() === 'ar' ? 'rtl' : 'ltr');
    document.title = tx('title') + ' — ADAM';
  }
  function getThemePref() { var t = store('get', LS_THEME); return (t === 'light' || t === 'dark' || t === 'system') ? t : 'dark'; }
  function applyTheme() {
    var r = theme === 'system' ? ((mqDark && !mqDark.matches) ? 'light' : 'dark') : theme;
    els.root.setAttribute('data-theme', r); els.root.style.colorScheme = r;
    $$('[data-th]', els.root).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-th') === theme)); });
  }
  function setTheme(t) { theme = t; store('set', LS_THEME, t); applyTheme(); }
  function toast(msg, warn) {
    els.toast.textContent = msg; els.toast.classList.add('on'); els.toast.classList.toggle('is-warn', !!warn);
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { els.toast.classList.remove('on'); }, warn ? 5000 : 2600);
  }
  function errMsg(r) { return r && r.msg ? L(r.msg) : tx('err_generic'); }

  /* ------------------------------------------------------------ render */
  function renderAll() {
    if (!built) return;
    applyStatic();
    var keepScroll = els.scroll.scrollTop, a = actor();
    var h = '';
    h += '<p class="ax-sample" role="note">' + icon('info-circle') + '<span>' + esc(tx('sample')) + '</span></p>';
    h += '<div class="axt-switch"><label class="axt-swl"><span class="axt-swt">' + esc(tx('switch_t')) + '</span><span class="ax-sw"><select id="axb-as" class="ax-mini">' +
      D.USERS.map(function (u) { return '<option value="' + esc(u.id) + '"' + (u.id === actorId ? ' selected' : '') + '>' + esc(L(u.name)) + '</option>'; }).join('') +
      '</select>' + icon('chevron-down', 'ax-caret') + '</span></label><p class="ax-note">' + esc(tx('switch_p')) + '</p></div>';
    if (!storageOk) h += '<p class="axt-warn" role="status">' + icon('alert-triangle') + '<span>' + esc(L({ ar: 'ماقدرناش نحفظ على الجهاز ده — التغييرات هتفضل لحد ما تقفل الصفحة.', en: 'We could not save on this device — changes last until you close the page.' })) + '</span></p>';
    if (!a) { els.body.innerHTML = h; return; }
    if (view.name === 'list') h += listHtml(a);
    else if (view.name === 'edit') h += editHtml(a);
    else h += playerHtml(a);
    els.body.innerHTML = h;
    els.scroll.scrollTop = keepScroll;
  }

  function progCardHtml(p, a) {
    var builder = SV.canBuild(a.id), n = (p.audience.memberIds || []).length;
    var can = SV.canView(a.id, p);
    var h = '<li class="axt-card axb-prog" data-pc="' + esc(p.id) + '"><div class="axt-c-top"><h3 class="axt-name">' + esc(p.title) + '</h3></div><div class="axt-tags">' +
      '<span class="ax-badge axb-st ' + p.status + '">' + esc(tx('st_' + p.status)) + '</span>' +
      '<span class="ax-badge ' + (p.type === 'rehab' ? 'axb-rehab' : '') + '">' + esc(tx('ty_' + p.type)) + '</span>' +
      '<span class="ax-badge">' + num(p.weeks) + ' ' + esc(tx('weeks_n')) + '</span>' +
      '<span class="ax-badge">' + num(n) + ' ' + esc(tx('people_n')) + '</span>' +
      '<span class="ax-badge ax-smp">' + esc(tx('rev')) + ' ' + num(p.rev || 1) + '</span></div>' +
      (p.goal ? '<p class="axt-nt">' + esc(p.goal) + '</p>' : '') +
      '<div class="axt-acts"><button type="button" class="ax-btn ax-primary" data-act="open" data-id="' + esc(p.id) + '" aria-label="' + esc(tx('open') + ': ' + p.title) + '">' + icon('eye') + '<span>' + esc(tx('open')) + '</span></button>';
    if (builder && can) {
      h += '<button type="button" class="ax-btn" data-act="dup" data-id="' + esc(p.id) + '" aria-label="' + esc(tx('dup') + ': ' + p.title) + '">' + icon('copy') + '<span>' + esc(tx('dup')) + '</span></button>';
      if (SV.canDelete(a.id, p)) h += '<button type="button" class="ax-ib" data-act="del" data-id="' + esc(p.id) + '" aria-label="' + esc(tx('del') + ': ' + p.title) + '">' + icon('trash') + '</button>';
    }
    return h + '</div></li>';
  }
  function visibleProgs(a) { return DB.programs.filter(function (p) { return SV.canView(a.id, p); }); }
  function listHtml(a) {
    var builder = SV.canBuild(a.id), progs = visibleProgs(a);
    var h = '<section class="ax-hero"><h1 id="axb-h1" tabindex="-1">' + esc(tx('h1')) + '</h1><p class="ax-lead">' + esc(builder ? tx('lead_build') : tx('lead_client')) + '</p><p class="axt-rolel">' + esc(L({ ar: 'بتشوف كـ:', en: 'Viewing as:' })) + ' <b>' + esc(tx('role_' + a.role)) + '</b></p></section>';
    if (builder) {
      h += '<div class="axb-bar"><button type="button" class="ax-btn ax-primary" id="axb-new">' + icon('plus') + '<span>' + esc(tx('new_prog')) + '</span></button>' +
        (a.role === 'coach' || a.role === 'admin' ? '<button type="button" class="ax-btn" id="axb-team">' + icon('users') + '<span>' + esc(tx('team_btn')) + '</span></button>' : '') + '</div>';
    }
    if (!progs.length) {
      h += '<div class="ax-state">' + icon('list-details', 'ax-big') + '<h2>' + esc(builder ? tx('prog_none_t') : tx('prog_none_c')) + '</h2><p>' + esc(builder ? tx('prog_none_p') : tx('prog_none_cp')) + '</p></div>';
    } else h += '<ul class="axt-ul axb-plist">' + progs.map(function (p) { return progCardHtml(p, a); }).join('') + '</ul>';
    return h;
  }

  /* ----------------------------------------------- editor: header + tabs */
  function editHtml(a) {
    var p = curProg();
    if (!p) { view = { name: 'list', pid: null }; return listHtml(a); }
    var h = '<div class="axb-eh"><button type="button" class="ax-btn ax-quiet" id="axb-back">' + icon('arrow-left', 'ax-flip') + '<span>' + esc(tx('back')) + '</span></button></div>';
    h += '<section class="ax-hero axb-hero"><h1 id="axb-h1" tabindex="-1">' + esc(p.title) + '</h1><div class="axt-tags"><span class="ax-badge axb-st ' + p.status + '">' + esc(tx('st_' + p.status)) + '</span><span class="ax-badge ' + (p.type === 'rehab' ? 'axb-rehab' : '') + '">' + esc(tx('ty_' + p.type)) + '</span><span class="ax-badge">' + num(p.weeks) + ' ' + esc(tx('weeks_n')) + '</span><span class="ax-badge ax-smp">' + esc(tx('rev')) + ' ' + num(p.rev || 1) + '</span></div></section>';
    h += '<div class="ax-tabs axt-tabs" id="axb-tabs" role="tablist" data-ia="tabs_label" aria-label="' + esc(tx('tabs_label')) + '">' +
      ['plan', 'people', 'review', 'export'].map(function (k) {
        var on = tab === k;
        return '<button type="button" role="tab" id="axb-tab-' + k + '" data-tab="' + k + '" aria-selected="' + on + '" tabindex="' + (on ? 0 : -1) + '" aria-controls="axb-panel">' + esc(tx('tab_' + k)) + '</button>';
      }).join('') + '</div>';
    h += '<div id="axb-panel" role="tabpanel" aria-labelledby="axb-tab-' + tab + '" class="axb-panel">';
    h += tab === 'plan' ? planHtml(p, a) : tab === 'people' ? peopleHtml(p, a) : tab === 'review' ? reviewHtml(p, a) : exportHtml(p, a);
    return h + '</div>';
  }
  function readOnlyNote(p, a) { return ''; }

  /* ------------------------------------------------------- plan (editor) */
  function planHtml(p, a) {
    var h = '', editable = SV.canView(a.id, p) && (p.ownerId === a.id || (a.role === 'admin' && p.type !== 'rehab'));
    if (!editable) h += '<p class="ax-sample" role="note">' + icon('lock') + '<span>' + esc(tx('why_notowner')) + '</span></p>';
    if (editable && p.type === 'rehab' && (p.status === 'approved' || p.status === 'published' || p.status === 'pending_review')) h += '<p class="axt-warn" role="note">' + icon('alert-triangle') + '<span>' + esc(tx('warn_edit_p')) + '</span></p>';
    /* weeks */
    h += '<div class="axb-weeks" role="group" aria-label="' + esc(tx('week')) + '">';
    for (var w = 1; w <= p.weeks; w++) h += '<button type="button" class="ax-chip" data-week="' + w + '" aria-pressed="' + (w === week) + '">' + esc(tx('week_n')) + ' ' + num(w) + '</button>';
    h += '</div>';
    h += '<div class="axb-bar">' + (editable ? '<button type="button" class="ax-btn" data-act="phases">' + icon('stack-2') + '<span>' + esc(tx('phases')) + '</span></button><button type="button" class="ax-btn" data-act="copy-week">' + icon('copy') + '<span>' + esc(tx('copy_week')) + '</span></button><button type="button" class="ax-btn ax-primary" data-act="add-day">' + icon('plus') + '<span>' + esc(tx('add_day')) + '</span></button>' : '') + '</div>';
    var ph = p.phases.filter(function (x) { return week >= x.from && week <= x.to; })[0];
    if (ph) h += '<p class="axt-rolel">' + esc(tx('phase_n')) + ': <b>' + esc(ph.name) + '</b> (' + esc(tx('week_n')) + ' ' + num(ph.from) + '–' + num(ph.to) + ')</p>';
    var days = sortedDays(p, week);
    if (!days.length) h += '<div class="ax-state"><h2>' + esc(tx('no_days')) + '</h2></div>';
    days.forEach(function (d, di) { h += dayHtml(p, d, di, days.length, editable); });
    return h;
  }
  function dayHtml(p, d, di, n, editable) {
    var h = '<section class="axb-day" data-day="' + esc(d.id) + '" aria-label="' + esc(tx('day_n') + ' ' + (d.idx + 1)) + '"><div class="axb-dh"><div class="axb-dt"><span class="axb-dn">' + esc(tx('day_n')) + ' ' + num(d.idx + 1) + ' · ' + fmtDateH(dayDate(p, d)) + '</span>';
    if (editable) h += '<label class="ax-sr" for="dt-' + esc(d.id) + '">' + esc(tx('day_title')) + '</label><input id="dt-' + esc(d.id) + '" class="ax-input axb-dti" data-daytitle="' + esc(d.id) + '" type="text" maxlength="60" value="' + esc(L(d.title)) + '">';
    else h += '<b>' + esc(L(d.title)) + '</b>';
    h += '</div>';
    if (editable) h += '<div class="axb-da"><button type="button" class="ax-ib" data-act="day-up" data-id="' + esc(d.id) + '" aria-label="' + esc(tx('move_up') + ': ' + L(d.title)) + '"' + (di === 0 ? ' disabled' : '') + '>' + icon('arrow-up') + '</button><button type="button" class="ax-ib" data-act="day-down" data-id="' + esc(d.id) + '" aria-label="' + esc(tx('move_down') + ': ' + L(d.title)) + '"' + (di === n - 1 ? ' disabled' : '') + '>' + icon('arrow-down') + '</button><button type="button" class="ax-ib" data-act="day-copy" data-id="' + esc(d.id) + '" aria-label="' + esc(tx('copy_day') + ': ' + L(d.title)) + '">' + icon('copy') + '</button><button type="button" class="ax-ib" data-act="day-del" data-id="' + esc(d.id) + '" aria-label="' + esc(tx('remove') + ': ' + L(d.title)) + '">' + icon('trash') + '</button></div>';
    h += '</div>';
    d.blocks.forEach(function (b, bi) { h += blockHtml(p, d, b, bi, d.blocks.length, editable); });
    if (editable) h += '<div class="axb-addrow"><button type="button" class="ax-btn" data-act="add-single" data-day="' + esc(d.id) + '">' + icon('plus') + '<span>' + esc(tx('add_ex')) + '</span></button><button type="button" class="ax-btn" data-act="add-ss" data-day="' + esc(d.id) + '">' + icon('bolt') + '<span>' + esc(tx('add_ss')) + '</span></button><button type="button" class="ax-btn" data-act="add-st" data-day="' + esc(d.id) + '">' + icon('refresh') + '<span>' + esc(tx('add_st')) + '</span></button></div>';
    return h + '</section>';
  }
  function blockHtml(p, d, b, bi, nb, editable) {
    var h = '<div class="axb-blk ' + b.kind + '" data-blk="' + esc(b.id) + '"><div class="axb-bh"><span class="axb-bk">' + esc(blockKindLabel(b)) + '</span>';
    if (editable) {
      h += '<span class="axb-ba"><button type="button" class="ax-ib" data-act="blk-up" data-day="' + esc(d.id) + '" data-id="' + esc(b.id) + '" aria-label="' + esc(tx('move_up') + ': ' + blockKindLabel(b)) + '"' + (bi === 0 ? ' disabled' : '') + '>' + icon('arrow-up') + '</button><button type="button" class="ax-ib" data-act="blk-down" data-day="' + esc(d.id) + '" data-id="' + esc(b.id) + '" aria-label="' + esc(tx('move_down') + ': ' + blockKindLabel(b)) + '"' + (bi === nb - 1 ? ' disabled' : '') + '>' + icon('arrow-down') + '</button><button type="button" class="ax-ib" data-act="blk-del" data-day="' + esc(d.id) + '" data-id="' + esc(b.id) + '" aria-label="' + esc(tx('remove') + ': ' + blockKindLabel(b)) + '">' + icon('trash') + '</button></span>';
    }
    h += '</div>';
    if (b.kind === 'superset') h += '<p class="ax-note">' + esc(tx('ss_hint')) + '</p>';
    if (b.kind === 'stations') h += '<p class="ax-note">' + esc(tx('st_hint')) + '</p>';
    if (b.kind !== 'single') {
      if (editable) {
        h += '<div class="axb-bopts"><label class="axt-lab">' + esc(tx('blk_rounds')) + '<input class="ax-input axb-num" type="number" inputmode="numeric" min="1" max="20" value="' + b.rounds + '" data-bf="rounds" data-day="' + esc(d.id) + '" data-id="' + esc(b.id) + '"></label>' +
          '<label class="axt-lab">' + esc(tx('blk_rest')) + '<input class="ax-input axb-num" type="number" inputmode="numeric" min="0" max="900" value="' + b.restBetween + '" data-bf="restBetween" data-day="' + esc(d.id) + '" data-id="' + esc(b.id) + '"></label>' +
          (b.kind === 'stations' ? '<label class="axt-lab">' + esc(tx('blk_stsec')) + '<input class="ax-input axb-num" type="number" inputmode="numeric" min="10" max="600" value="' + b.stationSec + '" data-bf="stationSec" data-day="' + esc(d.id) + '" data-id="' + esc(b.id) + '"></label>' : '') + '</div>';
      }
    }
    h += '<ul class="axb-items">';
    b.items.forEach(function (it, ii) {
      var e = ex(it.exId), imp = e && e.impact === 'high' && p.type === 'rehab';
      h += '<li class="axb-item"><div class="axb-it"><b class="axb-itn">' + esc(exName(it.exId)) + '</b>' + (imp ? ' <span class="ax-badge axb-hi">' + icon('alert-triangle') + esc(tx('impact_high')) + '</span>' : '') +
        '<span class="axb-ps">' + (b.kind === 'stations' ? num(b.stationSec) + esc(tx('secs')) : presc(it)) + '</span>' + (it.note ? '<span class="axb-how axb-extra">' + esc(it.note) + '</span>' : '') + '</div>';
      if (editable) h += '<div class="axb-ia"><button type="button" class="ax-ib" data-act="it-edit" data-day="' + esc(d.id) + '" data-blk="' + esc(b.id) + '" data-id="' + esc(it.id) + '" aria-label="' + esc(tx('it_edit') + ': ' + exName(it.exId)) + '">' + icon('pencil') + '</button>' +
        '<button type="button" class="ax-ib" data-act="it-replace" data-day="' + esc(d.id) + '" data-blk="' + esc(b.id) + '" data-id="' + esc(it.id) + '" aria-label="' + esc(tx('it_replace') + ': ' + exName(it.exId)) + '">' + icon('replace') + '</button>' +
        (b.items.length > 1 ? '<button type="button" class="ax-ib" data-act="it-up" data-day="' + esc(d.id) + '" data-blk="' + esc(b.id) + '" data-id="' + esc(it.id) + '" aria-label="' + esc(tx('move_up') + ': ' + exName(it.exId)) + '"' + (ii === 0 ? ' disabled' : '') + '>' + icon('arrow-up') + '</button><button type="button" class="ax-ib" data-act="it-down" data-day="' + esc(d.id) + '" data-blk="' + esc(b.id) + '" data-id="' + esc(it.id) + '" aria-label="' + esc(tx('move_down') + ': ' + exName(it.exId)) + '"' + (ii === b.items.length - 1 ? ' disabled' : '') + '>' + icon('arrow-down') + '</button>' : '') +
        '<button type="button" class="ax-ib" data-act="it-del" data-day="' + esc(d.id) + '" data-blk="' + esc(b.id) + '" data-id="' + esc(it.id) + '" aria-label="' + esc(tx('remove') + ': ' + exName(it.exId)) + '">' + icon('x') + '</button></div>';
      h += '</li>';
    });
    h += '</ul>';
    if (editable && b.kind !== 'single' && b.items.length < (b.kind === 'superset' ? 4 : 10)) h += '<button type="button" class="ax-btn" data-act="blk-add-item" data-day="' + esc(d.id) + '" data-id="' + esc(b.id) + '">' + icon('plus') + '<span>' + esc(tx('blk_add_item')) + '</span></button>';
    if (b.kind === 'stations') h += '<div class="axb-rot"><p class="axb-rt">' + esc(tx('rot_t')) + '</p>' + rotationHtml(p, b) + '</div>';
    return h + '</div>';
  }

  /* ------------------------- the rest of the module continues below ------ */
    /* ------------------------------------------------- scope controls (shared) */
  function scopeControlsHtml(p, idp) {
    normScope(p);
    var h = '<div class="axb-scope"><label class="axt-lab" for="' + idp + '-sk">' + esc(tx('pv_scope')) + '</label><span class="ax-sw"><select id="' + idp + '-sk" class="ax-mini" data-scope="kind">' +
      ['all', 'month', 'phase', 'week', 'tomorrow'].map(function (k) { return '<option value="' + k + '"' + (scope.kind === k ? ' selected' : '') + '>' + esc(tx('sc_' + k)) + '</option>'; }).join('') + '</select>' + icon('chevron-down', 'ax-caret') + '</span>';
    if (scope.kind === 'week' || scope.kind === 'month' || scope.kind === 'phase') {
      h += '<label class="ax-sr" for="' + idp + '-sn">' + esc(tx('sc_n')) + '</label><span class="ax-sw"><select id="' + idp + '-sn" class="ax-mini" data-scope="n">';
      if (scope.kind === 'week') for (var w = 1; w <= p.weeks; w++) h += '<option value="' + w + '"' + (scope.n === w ? ' selected' : '') + '>' + esc(tx('week_n')) + ' ' + w + '</option>';
      else if (scope.kind === 'month') for (var m = 1; m <= maxMonths(p); m++) h += '<option value="' + m + '"' + (scope.n === m ? ' selected' : '') + '>' + esc(tx('sc_month')) + ' ' + m + '</option>';
      else p.phases.forEach(function (x) { h += '<option value="' + esc(x.id) + '"' + (scope.n === x.id ? ' selected' : '') + '>' + esc(x.name) + '</option>'; });
      h += '</select>' + icon('chevron-down', 'ax-caret') + '</span>';
    }
    return h + '</div>';
  }

  /* ----------------------------------------------------- people + preview */
  function everyone(p) { /* the people this program could be shared with */
    if (p.audience.kind === 'team') return DB.team.members.map(function (m) { return { id: m.id, name: L(m.name), group: m.group }; });
    return D.USERS.filter(function (u) { return u.role === 'client'; }).map(function (u) { return { id: u.id, name: L(u.name), group: '' }; });
  }
  function peopleHtml(p, a) {
    var editable = p.ownerId === a.id || (a.role === 'admin' && p.type !== 'rehab'), list = everyone(p), sel = p.audience.memberIds || [];
    var h = '<section class="axb-sec"><h2 class="axt-gh">' + esc(tx('ppl_h')) + ' <span class="ax-tn">' + num(sel.length) + '</span></h2>';
    if (p.type === 'rehab') h += '<p class="ax-note">' + esc(tx('ppl_rehab_note')) + '</p>';
    if (editable) {
      h += '<div class="axb-bar"><button type="button" class="ax-btn" data-act="aud-all">' + esc(tx('ppl_all')) + '</button><button type="button" class="ax-btn" data-act="aud-none">' + esc(tx('ppl_none')) + '</button>';
      if (p.audience.kind === 'team') DB.team.groups.forEach(function (g) { h += '<button type="button" class="ax-btn" data-act="aud-group" data-g="' + esc(g) + '">' + esc(tx('ppl_group')) + ' ' + esc(g) + '</button>'; });
      h += '</div>';
    }
    h += '<ul class="axb-people">';
    list.forEach(function (m) {
      var on = sel.indexOf(m.id) > -1;
      h += '<li><label class="axt-radio"><input type="checkbox" data-member="' + esc(m.id) + '"' + (on ? ' checked' : '') + (editable ? '' : ' disabled') + '><span>' + esc(m.name) + (m.group ? ' <small>(' + esc(tx('ppl_group')) + ' ' + esc(m.group) + ')</small>' : '') + '</span></label></li>';
    });
    h += '</ul></section>';
    /* preview as a player */
    if (!previewMember || !list.some(function (m) { return m.id === previewMember; })) previewMember = list[0] ? list[0].id : null;
    h += '<section class="axb-sec"><h2 class="axt-gh">' + esc(tx('pv_h')) + '</h2><div class="axb-scope"><label class="axt-lab" for="axb-pm">' + esc(tx('pv_who')) + '</label><span class="ax-sw"><select id="axb-pm" class="ax-mini" data-pm="1">' +
      list.map(function (m) { return '<option value="' + esc(m.id) + '"' + (m.id === previewMember ? ' selected' : '') + '>' + esc(m.name) + '</option>'; }).join('') + '</select>' + icon('chevron-down', 'ax-caret') + '</span></div>' + scopeControlsHtml(p, 'axb-pv');
    h += '<div class="axb-preview" aria-live="polite">';
    if (sel.indexOf(previewMember) < 0) h += '<p class="axt-warn" role="status">' + icon('alert-triangle') + '<span>' + esc(tx('pv_notin')) + '</span></p>';
    else {
      if (p.status !== 'published') h += '<p class="ax-sample" role="note">' + icon('info-circle') + '<span>' + esc(tx('pv_unpub')) + '</span></p>';
      h += '<p class="axb-sl">' + esc(scopeLabel(p, scope)) + '</p>' + programBodyHtml(p, scope);
    }
    return h + '</div></section>';
  }

  /* --------------------------------------------------------- review tab */
  function checks(p) {
    var items = SV.countItems(p) >= 1, aud = (p.audience.memberIds || []).length >= 1, ss = true, st = true;
    p.days.forEach(function (d) { d.blocks.forEach(function (b) { if (b.kind === 'superset' && b.items.length < 2) ss = false; if (b.kind === 'stations' && b.items.length < 2) st = false; }); });
    return [['ck_items', items], ['ck_aud', aud], ['ck_ss', ss], ['ck_st', st]];
  }
  var lastErr = '';
  function reviewHtml(p, a) {
    var isOwner = p.ownerId === a.id, h = '<section class="axb-sec"><h2 class="axt-gh">' + esc(tx('rv_h')) + '</h2><ul class="axb-checks">';
    checks(p).forEach(function (c) { h += '<li class="' + (c[1] ? 'ok' : 'bad') + '">' + icon(c[1] ? 'circle-check' : 'alert-triangle') + '<span>' + esc(tx(c[0])) + ' — <b>' + esc(tx(c[1] ? 'ck_ok' : 'ck_bad')) + '</b></span></li>'; });
    h += '</ul></section>';
    if (p.type === 'rehab') {
      var ap = p.approval, valid = ap && ap.hash === SV.contentHash(p) && !((p.audience.memberIds || []).some(function (id) { return (ap.members || []).indexOf(id) < 0; }));
      h += '<section class="axb-sec axb-rehabbox"><h2 class="axt-gh">' + icon('certificate') + esc(tx('rv_rehab_h')) + '</h2><p class="ax-note">' + esc(tx('rv_rehab_p')) + '</p>';
      if (ap) h += '<dl class="ax-dl"><div class="ax-dr"><dt>' + esc(tx('ap_by')) + '</dt><dd>' + esc(L(ap.byName)) + '</dd></div><div class="ax-dr"><dt>' + esc(tx('ap_at')) + '</dt><dd>' + fmtDateH(String(ap.at).slice(0, 10)) + '</dd></div><div class="ax-dr"><dt>' + esc(tx('ap_note')) + '</dt><dd>' + esc(ap.note) + '</dd></div></dl>';
      h += '<p class="axb-apst ' + (valid ? 'ok' : 'bad') + '" id="axb-apst">' + icon(valid ? 'circle-check' : 'alert-triangle') + '<span>' + esc(ap ? (valid ? tx('ap_valid') : tx('ap_stale')) : tx('ap_none')) + '</span></p>';
      if (p.reviewNote && p.status === 'draft') h += '<p class="ax-note"><b>' + esc(tx('rv_note')) + ':</b> ' + esc(p.reviewNote.note) + '</p>';
      var hi = [];
      p.days.forEach(function (d) { d.blocks.forEach(function (b) { b.items.forEach(function (it) { var e = ex(it.exId); if (e && e.impact === 'high' && hi.indexOf(L(e.name)) < 0) hi.push(L(e.name)); }); }); });
      if (hi.length) h += '<p class="axt-warn" role="note">' + icon('alert-triangle') + '<span>' + esc(tx('impact_note')) + ' <b>' + esc(hi.join(' · ')) + '</b></span></p>';
      h += '</section>';
    }
    /* actions: the buttons only mirror the server's answer; the server re-checks every action */
    var acts = [], role = a.role, q = a.qualified;
    function add(name, label, enabled, why, primary) { acts.push({ name: name, label: label, enabled: enabled, why: why, primary: primary }); }
    var st = p.status;
    if (p.type === 'rehab') {
      add('submit', tx('a_submit'), isOwner && st === 'draft', !isOwner ? tx('why_notowner') : tx('why_state'), true);
      add('approve', tx('a_approve'), role === 'specialist' && q && st === 'pending_review', role !== 'specialist' ? tx('why_spec') : (!q ? tx('why_unq') : tx('why_state')), true);
      add('changes', tx('a_changes'), role === 'specialist' && q && st === 'pending_review', role !== 'specialist' ? tx('why_spec') : (!q ? tx('why_unq') : tx('why_state')), false);
    }
    var canPub = (isOwner || (role === 'admin' && p.type !== 'rehab')) && st !== 'published' && (p.type !== 'rehab' || st === 'approved');
    add('publish', tx('a_publish'), canPub, role === 'client' ? tx('why_client') : (!isOwner && role !== 'admin' ? tx('why_notowner') : (p.type === 'rehab' && st !== 'approved' ? tx('rv_rehab_p') : tx('why_state'))), true);
    add('unpublish', tx('a_unpublish'), (isOwner || role === 'admin') && st === 'published', st !== 'published' ? tx('why_state') : tx('why_notowner'), false);
    h += '<section class="axb-sec"><div class="axb-bar axb-acts">';
    acts.forEach(function (x) {
      h += '<div class="axb-actw"><button type="button" class="ax-btn ' + (x.primary ? 'ax-primary' : '') + '" data-act="rv-' + x.name + '"' + (x.enabled ? '' : ' aria-disabled="true" data-off="1"') + (x.enabled ? '' : ' aria-describedby="why-' + x.name + '"') + '><span>' + esc(x.label) + '</span></button>' + (x.enabled ? '' : '<span class="axb-why" id="why-' + x.name + '">' + esc(x.why) + '</span>') + '</div>';
    });
    h += '</div><p class="axt-err" id="axb-err" role="alert">' + esc(lastErr) + '</p></section>';
    return h;
  }
  function act(name, note) {
    var p = curProg(); if (!p) return { ok: false };
    var r;
    if (name === 'submit') r = SV.submit(actorId, p);
    else if (name === 'approve') r = SV.approve(actorId, p, note);
    else if (name === 'changes') r = SV.requestChanges(actorId, p, note);
    else if (name === 'publish') r = SV.publish(actorId, p);
    else if (name === 'unpublish') r = SV.unpublish(actorId, p);
    else r = { ok: false, msg: { ar: 'إجراء غير معروف', en: 'Unknown action' } };
    if (r.ok) { replaceProg(r.program); persist(); lastErr = ''; toast(tx('toast_done')); }
    else { lastErr = errMsg(r); toast(lastErr, true); }
    renderAll();
    return r;
  }
  function replaceProg(np) { for (var i = 0; i < DB.programs.length; i++) if (DB.programs[i].id === np.id) { DB.programs[i] = np; return; } DB.programs.push(np); }

  /* --------------------------------------------------------- export tab */
  function exportHtml(p, a) {
    var h = '<section class="axb-sec"><h2 class="axt-gh">' + esc(tx('ex_h')) + '</h2><p class="ax-note">' + esc(tx('ex_p')) + '</p>' + scopeControlsHtml(p, 'axb-ex');
    h += '<div class="axb-bar"><button type="button" class="ax-btn ax-primary" data-act="ex-print">' + icon('printer') + '<span>' + esc(tx('ex_print')) + '</span></button><button type="button" class="ax-btn" data-act="ex-word">' + icon('file-type-doc') + '<span>' + esc(tx('ex_word')) + '</span></button><button type="button" class="ax-btn" data-act="ex-xls">' + icon('file-spreadsheet') + '<span>' + esc(tx('ex_xls')) + '</span></button></div><p class="ax-note">' + esc(tx('ex_note')) + '</p>';
    h += '<p class="axb-sl">' + esc(scopeLabel(p, scope)) + ' — ' + num(daysInScope(p, scope).length) + ' ' + esc(tx('day_n')) + '</p></section>';
    return h;
  }
  function rowsFor(p, sc) {
    var rows = [];
    daysInScope(p, sc).forEach(function (d) {
      d.blocks.forEach(function (b) {
        b.items.forEach(function (it) {
          var e = ex(it.exId);
          rows.push([d.week, d.idx + 1, dayDate(p, d), L(d.title), blockKindLabel(b), exName(it.exId), b.kind === 'stations' ? '' : it.sets, b.kind === 'stations' ? b.stationSec : it.val, b.kind === 'stations' ? tx('mt_time') : metricUnit(e), b.kind === 'stations' ? b.restBetween : it.rest, it.load, (e ? L(e.how) : '') + (it.note ? ' | ' + it.note : ''), b.kind === 'single' ? '' : b.rounds]);
        });
      });
    });
    return rows;
  }
  var XCOLS = ['xl_week', 'xl_day', 'xl_date', 'xl_session', 'xl_block', 'xl_ex', 'xl_sets', 'xl_val', 'xl_unit', 'xl_rest', 'xl_load', 'xl_note', 'xl_round'];
  function xmlEsc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function buildExport(p, kind) {
    var rows = rowsFor(p, scope), title = p.title + ' — ' + scopeLabel(p, scope);
    if (kind === 'xls') {
      var x = '<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>\n<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="h"><Font ss:Bold="1"/><Interior ss:Color="#DDEEDD" ss:Pattern="Solid"/></Style></Styles><Worksheet ss:Name="' + xmlEsc(p.title.slice(0, 28).replace(/[\\\/?*\[\]:]/g, ' ')) + '"' + (lang() === 'ar' ? '' : '') + '><Table>';
      x += '<Row><Cell ss:MergeAcross="12"><Data ss:Type="String">' + xmlEsc(title) + '</Data></Cell></Row><Row>';
      XCOLS.forEach(function (c) { x += '<Cell ss:StyleID="h"><Data ss:Type="String">' + xmlEsc(tx(c)) + '</Data></Cell>'; });
      x += '</Row>';
      rows.forEach(function (r) { x += '<Row>' + r.map(function (v, i) { var isNum = (i === 0 || i === 1 || i === 6 || i === 7 || i === 9 || i === 12) && v !== '' && !isNaN(+v); return '<Cell><Data ss:Type="' + (isNum ? 'Number' : 'String') + '">' + xmlEsc(v) + '</Data></Cell>'; }).join('') + '</Row>'; });
      x += '</Table></Worksheet></Workbook>';
      return { mime: 'application/vnd.ms-excel', name: fileName(p, 'xls'), content: x };
    }
    var dir = lang() === 'ar' ? 'rtl' : 'ltr';
    var body = '<h1>' + xmlEsc(p.title) + '</h1><p>' + xmlEsc(tx('ty_' + p.type)) + ' · ' + xmlEsc(scopeLabel(p, scope)) + (p.goal ? ' · ' + xmlEsc(p.goal) : '') + '</p>';
    var cw = 0;
    daysInScope(p, scope).forEach(function (d) {
      if (d.week !== cw) { cw = d.week; body += '<h2>' + xmlEsc(tx('week_n')) + ' ' + d.week + '</h2>'; }
      body += '<h3>' + xmlEsc(tx('day_n')) + ' ' + (d.idx + 1) + ' · ' + xmlEsc(fmtDate(dayDate(p, d))) + ' — ' + xmlEsc(L(d.title)) + '</h3><table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;width:100%"><tr>' + ['xl_block', 'xl_ex', 'xl_sets', 'xl_val', 'xl_rest', 'xl_load', 'xl_note'].map(function (c) { return '<th style="background:#ddeedd">' + xmlEsc(tx(c)) + '</th>'; }).join('') + '</tr>';
      d.blocks.forEach(function (b) {
        b.items.forEach(function (it) {
          var e = ex(it.exId);
          body += '<tr><td>' + xmlEsc(blockKindLabel(b)) + (b.kind !== 'single' ? ' (' + b.rounds + ' ' + xmlEsc(tx('rounds_x')) + ')' : '') + '</td><td>' + xmlEsc(exName(it.exId)) + '</td><td>' + (b.kind === 'stations' ? '' : it.sets) + '</td><td>' + (b.kind === 'stations' ? b.stationSec + ' ' + xmlEsc(tx('mt_time')) : it.val + ' ' + xmlEsc(metricUnit(e))) + '</td><td>' + (b.kind === 'stations' ? b.restBetween : it.rest) + '</td><td>' + xmlEsc(it.load) + '</td><td>' + xmlEsc((e ? L(e.how) : '') + (it.note ? ' | ' + it.note : '')) + '</td></tr>';
        });
      });
      body += '</table>';
    });
    if (kind === 'word') {
      var doc = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>' + xmlEsc(title) + '</title><style>body{font-family:Calibri,Arial,sans-serif}h1{color:#15803D}</style></head><body dir="' + dir + '" lang="' + lang() + '">' + body + '</body></html>';
      return { mime: 'application/msword', name: fileName(p, 'doc'), content: doc };
    }
    return { mime: 'text/html', name: fileName(p, 'html'), content: body };
  }
  function fileName(p, ext) { return (p.title.replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 40) || 'program') + '.' + ext; }
  function download(kind) {
    var p = curProg() || curProg(); if (!p) return null;
    var f = buildExport(p, kind);
    var blob = new Blob(['﻿' + f.content], { type: f.mime + ';charset=utf-8' });
    var url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = f.name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
    toast(tx('toast_done'));
    return f;
  }
  function doPrint(p) {
    var old = $('#axb-print'); if (old) old.remove();
    var d = document.createElement('div'); d.id = 'axb-print'; d.className = 'axb-print'; d.setAttribute('dir', lang() === 'ar' ? 'rtl' : 'ltr'); d.setAttribute('lang', lang());
    d.innerHTML = '<h1>' + esc(p.title) + '</h1><p>' + esc(tx('ty_' + p.type)) + ' · ' + esc(scopeLabel(p, scope)) + (p.goal ? ' · ' + esc(p.goal) : '') + '</p>' + programBodyHtml(p, scope);
    document.body.appendChild(d);
    document.documentElement.classList.add('axb-printing');
    var done = function () { document.documentElement.classList.remove('axb-printing'); var n = $('#axb-print'); if (n) n.remove(); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    if (window.__adamBuilderNoPrint) { window.__adamBuilderPrinted = (window.__adamBuilderPrinted || 0) + 1; return; } /* test hook: keep the print region, skip the dialog */
    window.print();
  }

  /* ------------------------------------------------------ player's view */
  function playerHtml(a) {
    var p = curProg();
    if (!p || !SV.canView(a.id, p)) { view = { name: 'list', pid: null }; return listHtml(a); }
    var h = '<div class="axb-eh"><button type="button" class="ax-btn ax-quiet" id="axb-back">' + icon('arrow-left', 'ax-flip') + '<span>' + esc(tx('back')) + '</span></button></div>' +
      '<section class="ax-hero axb-hero"><h1 id="axb-h1" tabindex="-1">' + esc(p.title) + '</h1><div class="axt-tags"><span class="ax-badge ' + (p.type === 'rehab' ? 'axb-rehab' : '') + '">' + esc(tx('ty_' + p.type)) + '</span><span class="ax-badge">' + num(p.weeks) + ' ' + esc(tx('weeks_n')) + '</span></div>' + (p.goal ? '<p class="ax-lead">' + esc(p.goal) + '</p>' : '') + '</section>' +
      scopeControlsHtml(p, 'axb-pl') + '<div class="axb-bar"><button type="button" class="ax-btn" data-act="ex-print">' + icon('printer') + '<span>' + esc(tx('ex_print')) + '</span></button></div><p class="axb-sl">' + esc(scopeLabel(p, scope)) + '</p><div class="axb-preview" aria-live="polite">' + programBodyHtml(p, scope) + '</div>';
    return h;
  }

  /* ---------------------------------------------------------------- sheets */
  function sheetHead(title) { return '<div class="ax-sh-h"><h2 id="axb-sh-t" class="ax-name ax-lg" tabindex="-1">' + esc(title) + '</h2><button type="button" class="ax-ib" data-act="sheet-close" aria-label="' + esc(tx('close')) + '">' + icon('x') + '</button></div>'; }
  function foot(primaryAct, primaryLabel) { return '<div class="ax-sh-f"><button type="button" class="ax-btn ax-primary" data-act="' + primaryAct + '">' + esc(primaryLabel) + '</button><button type="button" class="ax-btn ax-quiet" data-act="sheet-close">' + esc(tx('cancel')) + '</button></div>'; }
  function dayById(p, id) { for (var i = 0; i < p.days.length; i++) if (p.days[i].id === id) return p.days[i]; return null; }
  function blkOf(d, id) { for (var i = 0; i < d.blocks.length; i++) if (d.blocks[i].id === id) return d.blocks[i]; return null; }
  function itOf(b, id) { for (var i = 0; i < b.items.length; i++) if (b.items[i].id === id) return b.items[i]; return null; }
  function opt(v, lab, sel) { return '<option value="' + esc(v) + '"' + (sel ? ' selected' : '') + '>' + esc(lab) + '</option>'; }

  function sheetBody() {
    var s = sheet, p = curProg(), a = actor(), v = s.draft || {};
    if (s.type === 'newprog') {
      return sheetHead(tx('np_title')) + '<form class="ax-sh-b axt-form" novalidate><label class="axt-lab" for="np-t">' + esc(tx('f_title')) + '</label><input id="np-t" class="ax-input axt-in" type="text" maxlength="80" value="' + esc(v.title || '') + '" aria-describedby="axb-err2">' +
        '<div class="axt-row"><div><label class="axt-lab" for="np-ty">' + esc(tx('f_type')) + '</label><span class="ax-sw"><select id="np-ty" class="ax-mini axt-in2">' + opt('training', tx('ty_training'), v.type !== 'rehab') + (a.role === 'admin' ? '' : opt('rehab', tx('ty_rehab'), v.type === 'rehab')) + '</select>' + icon('chevron-down', 'ax-caret') + '</span></div>' +
        '<div><label class="axt-lab" for="np-k">' + esc(tx('f_kind')) + '</label><span class="ax-sw"><select id="np-k" class="ax-mini axt-in2">' + opt('team', tx('kind_team'), v.kind !== 'individual') + opt('individual', tx('kind_ind'), v.kind === 'individual') + '</select>' + icon('chevron-down', 'ax-caret') + '</span></div></div>' +
        '<div class="axt-row"><div><label class="axt-lab" for="np-w">' + esc(tx('f_weeks')) + '</label><input id="np-w" class="ax-input axt-in2" type="number" inputmode="numeric" min="1" max="12" value="' + esc(v.weeks || 4) + '" aria-describedby="axb-err2"></div>' +
        '<div><label class="axt-lab" for="np-d">' + esc(tx('f_start')) + '</label><input id="np-d" class="ax-input axt-in2 axt-date" type="date" value="' + esc(v.start || today()) + '" aria-describedby="axb-err2"></div></div>' +
        '<label class="axt-lab" for="np-g">' + esc(tx('f_goal')) + '</label><input id="np-g" class="ax-input axt-in" type="text" maxlength="120" value="' + esc(v.goal || '') + '"><p class="axt-err" id="axb-err2" role="alert"></p></form>' + foot('np-save', tx('create'));
    }
    if (s.type === 'phases') {
      var h = sheetHead(tx('phases')) + '<form class="ax-sh-b axt-form" novalidate><div id="ph-rows">';
      (v.rows || []).forEach(function (r, i) {
        h += '<div class="axb-phrow" data-pr="' + i + '"><label class="axt-lab">' + esc(tx('phase_n')) + ' ' + (i + 1) + '<input class="ax-input axt-in" type="text" maxlength="30" value="' + esc(r.name) + '" data-pf="name"></label><label class="axt-lab">' + esc(tx('week_n')) + ' ↦<input class="ax-input axb-num" type="number" min="1" max="' + p.weeks + '" value="' + r.from + '" data-pf="from"></label><label class="axt-lab">↤<input class="ax-input axb-num" type="number" min="1" max="' + p.weeks + '" value="' + r.to + '" data-pf="to"></label><button type="button" class="ax-ib" data-act="ph-del" data-i="' + i + '" aria-label="' + esc(tx('remove') + ': ' + r.name) + '">' + icon('trash') + '</button></div>';
      });
      return h + '</div><button type="button" class="ax-btn" data-act="ph-add">' + icon('plus') + '<span>' + esc(tx('add_day').replace(tx('add_day'), tx('phase_n'))) + '</span></button><p class="axt-err" id="axb-err2" role="alert"></p></form>' + foot('ph-save', tx('save'));
    }
    if (s.type === 'copyday' || s.type === 'copyweek') {
      var wopts = ''; for (var w = 1; w <= p.weeks; w++) if (s.type === 'copyday' || w !== week) wopts += opt(w, tx('week_n') + ' ' + w, v.to ? +v.to === w : w === (s.type === 'copyday' ? week : Math.min(p.weeks, week + 1)));
      return sheetHead(s.type === 'copyday' ? tx('copy_day') : tx('copy_week')) + '<form class="ax-sh-b axt-form" novalidate><label class="axt-lab" for="cp-w">' + esc(tx('week')) + '</label><span class="ax-sw"><select id="cp-w" class="ax-mini axt-in2">' + wopts + '</select>' + icon('chevron-down', 'ax-caret') + '</span><p class="axt-err" id="axb-err2" role="alert"></p></form>' + foot('cp-save', tx('confirm'));
    }
    if (s.type === 'item') {
      var d = dayById(p, s.day), b = d && blkOf(d, s.blk), it = b && itOf(b, s.id), e = it && ex(it.exId);
      if (!it) return sheetHead(tx('it_edit')) + '<div class="ax-sh-b"></div>';
      var dv = s.draft || { sets: it.sets, val: it.val, rest: it.rest, load: it.load, note: it.note };
      return sheetHead(tx('it_edit')) + '<form class="ax-sh-b axt-form" novalidate><p class="axt-ft">' + esc(exName(it.exId)) + '</p><div class="axt-row"><div><label class="axt-lab" for="it-s">' + esc(tx('it_sets')) + '</label><input id="it-s" class="ax-input axt-in2" type="number" inputmode="numeric" min="1" max="20" value="' + esc(dv.sets) + '" aria-describedby="axb-err2"></div>' +
        '<div><label class="axt-lab" for="it-v">' + esc(metricUnit(e)) + '</label><input id="it-v" class="ax-input axt-in2" type="number" inputmode="numeric" min="1" max="5000" value="' + esc(dv.val) + '" aria-describedby="axb-err2"></div></div>' +
        '<div class="axt-row"><div><label class="axt-lab" for="it-r">' + esc(tx('it_rest')) + '</label><input id="it-r" class="ax-input axt-in2" type="number" inputmode="numeric" min="0" max="900" value="' + esc(dv.rest) + '" aria-describedby="axb-err2"></div>' +
        '<div><label class="axt-lab" for="it-l">' + esc(tx('it_load')) + '</label><input id="it-l" class="ax-input axt-in2" type="text" maxlength="40" value="' + esc(dv.load) + '"></div></div>' +
        '<label class="axt-lab" for="it-n">' + esc(tx('it_note')) + '</label><textarea id="it-n" class="ax-input axt-ta" rows="3" maxlength="400">' + esc(dv.note) + '</textarea>' +
        (e ? '<p class="ax-note"><b>' + esc(tx('it_default')) + ':</b> ' + esc(L(e.how)) + '</p>' : '') + '<p class="axt-err" id="axb-err2" role="alert"></p></form>' + foot('it-save', tx('save'));
    }
    if (s.type === 'picker') {
      return sheetHead(tx('pk_title')) + '<div class="ax-sh-b"><div class="axt-row"><div><label class="axt-lab" for="pk-q">' + esc(tx('pk_search')) + '</label><input id="pk-q" class="ax-input axt-in2" type="search" value="' + esc(pickState.q) + '" autocomplete="off"></div>' +
        '<div><label class="axt-lab" for="pk-c">' + esc(tx('pk_cat')) + '</label><span class="ax-sw"><select id="pk-c" class="ax-mini axt-in2">' + opt('all', tx('pk_all'), pickState.cat === 'all') + Object.keys(D.CATS).map(function (k) { return opt(k, L(D.CATS[k]), pickState.cat === k); }).join('') + '</select>' + icon('chevron-down', 'ax-caret') + '</span></div></div>' +
        '<p class="ax-count" id="pk-count" role="status" aria-live="polite"></p><ul class="axb-pk" id="pk-list"></ul></div><div class="ax-sh-f"><button type="button" class="ax-btn ax-quiet" data-act="sheet-close">' + esc(tx('cancel')) + '</button></div>';
    }
    if (s.type === 'team') {
      var th = sheetHead(tx('team_h') + ': ' + L(DB.team.name)) + '<div class="ax-sh-b"><p class="ax-note">' + esc(tx('team_note')) + '</p><ul class="axb-roster">';
      DB.team.members.forEach(function (m) {
        th += '<li class="axb-rrow"><span class="axb-rn">' + esc(L(m.name)) + '</span><span class="ax-sw"><select class="ax-mini" data-tm-group="' + esc(m.id) + '" aria-label="' + esc(tx('team_group') + ': ' + L(m.name)) + '">' + DB.team.groups.map(function (g) { return opt(g, tx('ppl_group') + ' ' + g, m.group === g); }).join('') + '</select>' + icon('chevron-down', 'ax-caret') + '</span><button type="button" class="ax-ib" data-act="tm-del" data-id="' + esc(m.id) + '" aria-label="' + esc(tx('team_remove') + ': ' + L(m.name)) + '">' + icon('trash') + '</button></li>';
      });
      if (!DB.team.members.length) th += '<li>' + esc(tx('team_empty')) + '</li>';
      return th + '</ul><form class="axt-form" id="tm-form" novalidate><label class="axt-lab" for="tm-n">' + esc(tx('team_name')) + '</label><input id="tm-n" class="ax-input axt-in" type="text" maxlength="40" aria-describedby="axb-err2"><label class="axt-lab" for="tm-g">' + esc(tx('team_group')) + '</label><span class="ax-sw"><select id="tm-g" class="ax-mini axt-in2">' + DB.team.groups.map(function (g) { return opt(g, tx('ppl_group') + ' ' + g, false); }).join('') + '</select>' + icon('chevron-down', 'ax-caret') + '</span><p class="axt-err" id="axb-err2" role="alert"></p></form></div><div class="ax-sh-f"><button type="button" class="ax-btn ax-primary" data-act="tm-add">' + icon('user-plus') + '<span>' + esc(tx('team_add')) + '</span></button><button type="button" class="ax-btn ax-quiet" data-act="sheet-close">' + esc(tx('close')) + '</button></div>';
    }
    if (s.type === 'note') {
      return sheetHead(s.kind === 'approve' ? tx('a_approve') : tx('a_changes')) + '<form class="ax-sh-b axt-form" novalidate><label class="axt-lab" for="nt-t">' + esc(tx('note_h')) + '</label><textarea id="nt-t" class="ax-input axt-ta" rows="4" maxlength="400" placeholder="' + esc(s.kind === 'approve' ? tx('note_approve_ph') : tx('note_changes_ph')) + '" aria-describedby="axb-err2">' + esc(v.note || '') + '</textarea><p class="axt-err" id="axb-err2" role="alert"></p></form>' + foot('note-save', tx('confirm'));
    }
    if (s.type === 'warn') return sheetHead(tx('warn_edit_t')) + '<div class="ax-sh-b"><p>' + esc(tx('warn_edit_p')) + '</p></div>' + foot('warn-go', tx('warn_edit_go'));
    if (s.type === 'delprog') { var dp = progById(s.id); return sheetHead(tx('del') + ': ' + (dp ? dp.title : '')) + '<div class="ax-sh-b"><p>' + esc(L({ ar: 'الحذف نهائي ومفيش تراجع.', en: 'Deleting is permanent and cannot be undone.' })) + '</p></div>' + foot('delprog-go', tx('del')); }
    return '';
  }
  function renderSheet() { if (!sheet) return; els.sheet.innerHTML = sheetBody(); if (sheet.type === 'picker') updatePicker(); }
  function openSheet(s, focusSel) {
    var first = !sheet; if (first) sheetFocus = captureFocus();
    sheet = s; renderSheet(); els.sheetbg.hidden = false; els.main.inert = true; els.main.setAttribute('aria-hidden', 'true');
    var f = (focusSel && $(focusSel, els.sheet)) || $('input:not([type=hidden]), select, textarea', els.sheet) || $('#axb-sh-t', els.sheet) || els.sheet;
    f.focus({ preventScroll: true });
  }
  function closeSheet(noRestore) {
    if (!sheet) return;
    sheet = null; els.sheetbg.hidden = true; els.sheet.innerHTML = ''; els.main.inert = false; els.main.removeAttribute('aria-hidden');
    if (!noRestore) restoreFocus(sheetFocus);
    sheetFocus = null;
  }
  /* focus helpers: the page body is re-rendered after every change, so remember the control by its attributes */
  function captureFocus() {
    var a = document.activeElement; if (!a || a === document.body || !els.body.contains(a)) return null;
    var k = { id: a.id || null, sel: null };
    if (!k.id) { var parts = ['data-act', 'data-id', 'data-blk', 'data-day', 'data-week', 'data-tab', 'data-g', 'data-member', 'data-daytitle', 'data-bf']; k.sel = a.tagName.toLowerCase() + parts.filter(function (n) { return a.hasAttribute(n); }).map(function (n) { return '[' + n + '="' + a.getAttribute(n).replace(/"/g, '\\"') + '"]'; }).join(''); }
    return k;
  }
  function restoreFocus(k) {
    var n = k && (k.id ? document.getElementById(k.id) : $(k.sel, els.body));
    if (!n || n.disabled) n = $('#axb-h1', els.body);
    if (n) n.focus({ preventScroll: true });
  }

  /* picker list */
  function updatePicker() {
    var q = pickState.q.trim().toLowerCase(), list = catalogList.filter(function (e) {
      if (pickState.cat !== 'all' && e.cat !== pickState.cat) return false;
      if (!q) return true;
      return (e.name.ar + ' ' + e.name.en + ' ' + e.equip + ' ' + L(D.CATS[e.cat])).toLowerCase().indexOf(q) > -1;
    });
    var ul = $('#pk-list', els.sheet), cnt = $('#pk-count', els.sheet), rehab = (curProg() || {}).type === 'rehab';
    if (!ul) return;
    ul.innerHTML = list.length ? list.map(function (e) {
      return '<li class="axb-pkrow"><div><b>' + esc(L(e.name)) + '</b><span class="axb-how">' + esc(L(D.CATS[e.cat])) + ' · ' + esc(e.equip) + ' · <bdi class="axn">' + e.sets + ' × ' + e.val + '</bdi> ' + esc(tx('mt_' + e.metric)) + '</span>' + (e.impact === 'high' ? '<span class="ax-badge axb-hi">' + icon('alert-triangle') + esc(tx('pk_impact')) + '</span>' : '') + '</div><button type="button" class="ax-btn" data-act="pk-pick" data-id="' + esc(e.id) + '" aria-label="' + esc((sheet.mode === 'replace' ? tx('pk_pick') : tx('pk_add')) + ': ' + L(e.name)) + '">' + icon(sheet.mode === 'replace' ? 'replace' : 'plus') + '<span>' + esc(sheet.mode === 'replace' ? tx('pk_pick') : tx('pk_add')) + '</span></button></li>';
    }).join('') : '<li class="axb-pkrow">' + esc(tx('pk_none')) + '</li>';
    cnt.innerHTML = num(list.length) + ' / ' + num(catalogList.length);
    void rehab;
  }

  /* ----------------------------------------------------------- mutations */
  function needsWarn(p) { return p.type === 'rehab' && (p.status === 'approved' || p.status === 'published' || p.status === 'pending_review'); }
  function mutate(fn, opts) {
    var cur = curProg(); if (!cur) return false;
    if (needsWarn(cur) && !unlocked[cur.id] && !(opts && opts.skipWarn)) { pendingEdit = { fn: fn, opts: opts }; openSheet({ type: 'warn' }); return false; }
    var next = clone(cur); fn(next);
    var r = SV.save(actorId, cur, next);
    if (!r.ok) { toast(errMsg(r), true); return false; }
    var fk = captureFocus();
    replaceProg(r.program); persist();
    if (r.invalidated) { toast(tx('toast_inval'), true); unlocked[cur.id] = false; }
    renderAll(); restoreFocus(fk);
    return true;
  }
  function moveIn(arr, i, dir) { var j = i + dir; if (j < 0 || j >= arr.length) return false; var t = arr[i]; arr[i] = arr[j]; arr[j] = t; return true; }
  function copyBlocks(blocks) { return clone(blocks).map(function (b) { b.id = nid('b'); b.items.forEach(function (it) { it.id = nid('i'); }); return b; }); }
  function firstFreeIdx(p, w) { var used = {}; p.days.forEach(function (d) { if (d.week === w) used[d.idx] = 1; }); for (var i = 0; i < DOW_MAX; i++) if (!used[i]) return i; return -1; }

  function pickExercise(id) {
    var s = sheet, e = ex(id); if (!e) return;
    var ok = false;
    mutate(function (p) {
      var d = dayById(p, s.day); if (!d) return;
      if (s.mode === 'replace') {
        var b = blkOf(d, s.blk), it = b && itOf(b, s.item); if (!it) return;
        var old = ex(it.exId); it.exId = id; if (!old || old.metric !== e.metric) it.val = e.val;
      } else if (s.blk) {
        var b2 = blkOf(d, s.blk); if (b2) b2.items.push(mkItem(id));
      } else {
        d.blocks.push(mkBlock(s.newKind, [mkItem(id)]));
      }
      ok = true;
    });
    if (ok || !sheet) closeSheet(true);
    if (ok) { toast(tx('toast_saved')); restoreFocus(null); }
  }

  /* ------------------------------------------------------------- events */
  function bind() {
    var r = els.root;
    r.addEventListener('click', function (e) {
      var t = e.target, b;
      if ((b = t.closest('[data-th]'))) { setTheme(b.getAttribute('data-th')); return; }
      if (t.closest('#axb-lang')) { toggleLang(); return; }
      if (t.closest('#axb-new')) { openSheet({ type: 'newprog', draft: { type: 'training', kind: 'team', weeks: 4, start: today() } }, '#np-t'); return; }
      if (t.closest('#axb-team')) { openSheet({ type: 'team' }); return; }
      if (t.closest('#axb-back')) { view = { name: 'list', pid: null }; renderAll(); var h1 = $('#axb-h1', els.body); if (h1) h1.focus({ preventScroll: true }); return; }
      if ((b = t.closest('[data-tab]'))) { tab = b.getAttribute('data-tab'); renderAll(); var tb = $('#axb-tab-' + tab, els.body); if (tb) tb.focus({ preventScroll: true }); return; }
      if ((b = t.closest('[data-week]'))) { week = parseInt(b.getAttribute('data-week'), 10); var fk = captureFocus(); renderAll(); restoreFocus(fk); return; }
      if (!(b = t.closest('[data-act]'))) { if (t === els.sheetbg) closeSheet(); return; }
      if (b.getAttribute('data-off')) { lastErr = ''; var wy = $('#' + (b.getAttribute('aria-describedby') || ''), r); if (wy) toast(wy.textContent, true); return; }
      var a = b.getAttribute('data-act'), id = b.getAttribute('data-id'), dayId = b.getAttribute('data-day'), blkId = b.getAttribute('data-blk');
      var p = curProg();
      switch (a) {
        case 'open': { var pr = progById(id); if (!pr) return; view = { name: SV.canBuild(actorId) ? 'edit' : 'player', pid: id }; tab = 'plan'; week = 1; scope = { kind: 'all', n: 1 }; renderAll(); var h = $('#axb-h1', els.body); if (h) h.focus({ preventScroll: true }); els.scroll.scrollTop = 0; break; }
        case 'dup': { var src = progById(id); if (!src) return; var c = clone(src); c.id = nid('prog-'); c.title = src.title + (lang() === 'ar' ? ' (نسخة)' : ' (copy)'); c.status = 'draft'; c.approval = null; c.rev = 1; c.ownerId = actorId; delete c.reviewNote; delete c.submittedHash; c.days.forEach(function (d) { d.id = nid('d'); d.blocks.forEach(function (bk) { bk.id = nid('b'); bk.items.forEach(function (it) { it.id = nid('i'); }); }); });
          var rs = SV.save(actorId, null, c); if (!rs.ok) { toast(errMsg(rs), true); return; } DB.programs.push(rs.program); persist(); renderAll(); toast(tx('toast_dup')); break; }
        case 'del': openSheet({ type: 'delprog', id: id }); break;
        case 'delprog-go': { var dpg = progById(sheet.id); if (dpg && SV.canDelete(actorId, dpg)) { DB.programs = DB.programs.filter(function (x) { return x.id !== dpg.id; }); persist(); closeSheet(true); renderAll(); toast(tx('toast_del')); var h2 = $('#axb-h1', els.body); if (h2) h2.focus({ preventScroll: true }); } else toast(tx('del_none'), true); break; }
        case 'sheet-close': closeSheet(); break;
        case 'np-save': saveNew(); break;
        case 'phases': { openSheet({ type: 'phases', draft: { rows: clone(p.phases) } }); break; }
        case 'ph-add': { var d0 = collectPhases(); var last = d0.length ? d0[d0.length - 1].to : 0; d0.push({ id: nid('ph'), name: '', from: Math.min(p.weeks, last + 1), to: p.weeks }); sheet.draft = { rows: d0 }; renderSheet(); var nr = $$('.axb-phrow input[data-pf=name]', els.sheet).pop(); if (nr) nr.focus(); break; }
        case 'ph-del': { var d1 = collectPhases(); d1.splice(parseInt(b.getAttribute('data-i'), 10), 1); sheet.draft = { rows: d1 }; renderSheet(); break; }
        case 'ph-save': savePhases(); break;
        case 'copy-week': openSheet({ type: 'copyweek' }); break;
        case 'day-copy': openSheet({ type: 'copyday', id: id }); break;
        case 'cp-save': saveCopy(); break;
        case 'add-day': mutate(function (np) { var ix = firstFreeIdx(np, week); if (ix < 0) { toast(L({ ar: 'الأسبوع ده فيه 7 أيام بالفعل.', en: 'This week already has 7 days.' }), true); return; } np.days.push(mkDay(week, ix, { ar: 'حصة جديدة', en: 'New session' }, [])); }); break;
        case 'day-del': mutate(function (np) { np.days = np.days.filter(function (d) { return d.id !== id; }); }); break;
        case 'day-up': case 'day-down': mutate(function (np) { var ds = sortedDays(np, week), i = -1; ds.forEach(function (d, k) { if (d.id === id) i = k; }); var j = i + (a === 'day-up' ? -1 : 1); if (j < 0 || j >= ds.length) return; var t = ds[i].idx; ds[i].idx = ds[j].idx; ds[j].idx = t; }); break;
        case 'add-single': case 'add-ss': case 'add-st': pickState = { q: '', cat: 'all' }; openSheet({ type: 'picker', mode: 'add', day: dayId, blk: null, newKind: a === 'add-single' ? 'single' : a === 'add-ss' ? 'superset' : 'stations' }, '#pk-q'); break;
        case 'blk-add-item': pickState = { q: '', cat: 'all' }; openSheet({ type: 'picker', mode: 'add', day: dayId, blk: id }, '#pk-q'); break;
        case 'it-replace': pickState = { q: '', cat: 'all' }; openSheet({ type: 'picker', mode: 'replace', day: dayId, blk: blkId, item: id }, '#pk-q'); break;
        case 'pk-pick': pickExercise(id); break;
        case 'it-edit': openSheet({ type: 'item', day: dayId, blk: blkId, id: id }, '#it-s'); break;
        case 'it-save': saveItem(); break;
        case 'it-del': mutate(function (np) { var d = dayById(np, dayId), bk = d && blkOf(d, blkId); if (!bk) return; bk.items = bk.items.filter(function (x) { return x.id !== id; }); if (!bk.items.length) d.blocks = d.blocks.filter(function (x) { return x.id !== blkId; }); }); break;
        case 'it-up': case 'it-down': mutate(function (np) { var d = dayById(np, dayId), bk = d && blkOf(d, blkId); if (!bk) return; var i = -1; bk.items.forEach(function (x, k) { if (x.id === id) i = k; }); moveIn(bk.items, i, a === 'it-up' ? -1 : 1); }); break;
        case 'blk-del': mutate(function (np) { var d = dayById(np, dayId); if (d) d.blocks = d.blocks.filter(function (x) { return x.id !== id; }); }); break;
        case 'blk-up': case 'blk-down': mutate(function (np) { var d = dayById(np, dayId); if (!d) return; var i = -1; d.blocks.forEach(function (x, k) { if (x.id === id) i = k; }); moveIn(d.blocks, i, a === 'blk-up' ? -1 : 1); }); break;
        case 'aud-all': setAudience(function () { return everyone(p).map(function (m) { return m.id; }); }); break;
        case 'aud-none': setAudience(function () { return []; }); break;
        case 'aud-group': { var g = b.getAttribute('data-g'); setAudience(function (cur) { var ids = cur.slice(); DB.team.members.forEach(function (m) { if (m.group === g && ids.indexOf(m.id) < 0) ids.push(m.id); }); return ids; }); break; }
        case 'rv-submit': act('submit'); break;
        case 'rv-publish': act('publish'); break;
        case 'rv-unpublish': act('unpublish'); break;
        case 'rv-approve': openSheet({ type: 'note', kind: 'approve' }, '#nt-t'); break;
        case 'rv-changes': openSheet({ type: 'note', kind: 'changes' }, '#nt-t'); break;
        case 'note-save': { var nt = ($('#nt-t', els.sheet).value || '').trim(); var kind = sheet.kind; var res = kind === 'approve' ? SV.approve(actorId, p, nt) : SV.requestChanges(actorId, p, nt); if (!res.ok) { $('#axb-err2', els.sheet).textContent = errMsg(res); $('#nt-t', els.sheet).setAttribute('aria-invalid', 'true'); $('#nt-t', els.sheet).focus(); return; } replaceProg(res.program); persist(); lastErr = ''; closeSheet(true); renderAll(); toast(tx('toast_done')); var tb2 = $('#axb-tab-review', els.body); if (tb2) tb2.focus({ preventScroll: true }); break; }
        case 'warn-go': { var pe = pendingEdit; pendingEdit = null; unlocked[p.id] = true; closeSheet(true); if (pe) mutate(pe.fn, pe.opts); break; }
        case 'ex-print': { var pp = curProg(); if (pp) doPrint(pp); break; }
        case 'ex-word': download('word'); break;
        case 'ex-xls': download('xls'); break;
        case 'tm-add': addMember(); break;
        case 'tm-del': removeMember(id); break;
      }
    });
    r.addEventListener('change', function (e) {
      var t = e.target, p = curProg();
      if (t.id === 'axb-as') { setActor(t.value); var s = $('#axb-as', els.body); if (s) s.focus({ preventScroll: true }); try { var u = new URL(location.href); u.searchParams.set('as', t.value); history.replaceState(history.state, '', u.pathname + u.search + u.hash); } catch (er) { } return; }
      if (t.hasAttribute('data-scope')) { if (t.getAttribute('data-scope') === 'kind') { scope = { kind: t.value, n: t.value === 'phase' ? ((p && p.phases[0]) ? p.phases[0].id : '') : 1 }; } else scope.n = scope.kind === 'phase' ? t.value : parseInt(t.value, 10); var fk = captureFocus(); renderAll(); restoreFocus(fk); return; }
      if (t.hasAttribute('data-pm')) { previewMember = t.value; var fk2 = captureFocus(); renderAll(); restoreFocus(fk2); return; }
      if (t.hasAttribute('data-member')) { var id = t.getAttribute('data-member'), on = t.checked; setAudience(function (cur) { var i = cur.indexOf(id); if (on && i < 0) return cur.concat([id]); if (!on && i > -1) return cur.filter(function (x) { return x !== id; }); return cur; }); return; }
      if (t.hasAttribute('data-daytitle')) { var dv = t.value.trim().slice(0, 60) || L({ ar: 'حصة', en: 'Session' }); mutate(function (np) { var d = dayById(np, t.getAttribute('data-daytitle')); if (d) d.title = { ar: dv, en: dv }; }); return; }
      if (t.hasAttribute('data-bf')) { var f = t.getAttribute('data-bf'), lim = { rounds: [1, 20], restBetween: [0, 900], stationSec: [10, 600] }[f], val = clamp(parseInt(t.value, 10) || lim[0], lim[0], lim[1]); mutate(function (np) { var d = dayById(np, t.getAttribute('data-day')), bk = d && blkOf(d, t.getAttribute('data-id')); if (bk) bk[f] = val; }); return; }
      if (t.id === 'pk-c') { pickState.cat = t.value; updatePicker(); return; }
      if (t.hasAttribute('data-tm-group')) { var m = DB.team.members.filter(function (x) { return x.id === t.getAttribute('data-tm-group'); })[0]; if (m && SV.canManageTeam(actorId)) { m.group = t.value; persist(); renderAll(); } return; }
    });
    r.addEventListener('input', function (e) { if (e.target.id === 'pk-q') { pickState.q = e.target.value; updatePicker(); } });
    r.addEventListener('submit', function (e) { e.preventDefault(); });
    r.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && sheet && e.target.tagName === 'INPUT' && e.target.type !== 'search' && sheet.type !== 'picker') {
        e.preventDefault(); var map = { newprog: 'np-save', item: 'it-save', copyday: 'cp-save', copyweek: 'cp-save', phases: 'ph-save' }; var tgt = sheet.type === 'team' ? 'tm-add' : map[sheet.type]; var bt = tgt && $('[data-act="' + tgt + '"]', els.sheet); if (bt) bt.click(); return;
      }
      if (e.key === 'Tab' && sheet) {
        var f = $$('button:not([disabled]), input:not([disabled]), select, textarea, [href], [tabindex]:not([tabindex="-1"])', els.sheet).filter(function (n) { return n.offsetParent !== null; });
        if (!f.length) { e.preventDefault(); els.sheet.focus(); return; }
        var first = f[0], last = f[f.length - 1], a = document.activeElement;
        if (!els.sheet.contains(a) || a === els.sheet) { e.preventDefault(); (e.shiftKey ? last : first).focus(); }
        else if (e.shiftKey && a === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
        return;
      }
      if (e.key === 'Escape' && sheet) { e.preventDefault(); closeSheet(); return; }
      var tabEl = e.target.closest && e.target.closest('#axb-tabs [role=tab]');
      if (tabEl && (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'Home' || e.key === 'End')) {
        var tabs = $$('#axb-tabs [role=tab]'), i = tabs.indexOf(tabEl), rtl = lang() === 'ar';
        var step = e.key === 'ArrowRight' ? (rtl ? -1 : 1) : e.key === 'ArrowLeft' ? (rtl ? 1 : -1) : 0;
        var n = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (i + step + tabs.length) % tabs.length;
        e.preventDefault(); tab = tabs[n].getAttribute('data-tab'); renderAll(); var nt = $('#axb-tab-' + tab, els.body); if (nt) nt.focus();
      }
    });
    if (mqDark) { var h = function () { if (theme === 'system') applyTheme(); }; if (mqDark.addEventListener) mqDark.addEventListener('change', h); else if (mqDark.addListener) mqDark.addListener(h); }
    new MutationObserver(function () { if (built) { rerenderSheet(); renderAll(); } }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    window.addEventListener('storage', function (e) { if (e.key === LS_THEME) { theme = getThemePref(); applyTheme(); } if (e.key === LS_DB) { loadDb(true); if (built && !sheet) renderAll(); } });
  }
  function rerenderSheet() {
    if (!sheet) return;
    var d = collectDraft(); if (d) sheet.draft = d;
    var id = document.activeElement && document.activeElement.id; renderSheet();
    var n = id && document.getElementById(id); (n || $('#axb-sh-t', els.sheet) || els.sheet).focus({ preventScroll: true });
  }
  function collectDraft() {
    var s = sheet, g = function (i) { var n = $(i, els.sheet); return n ? n.value : ''; };
    if (!s) return null;
    if (s.type === 'newprog') return { title: g('#np-t'), type: g('#np-ty'), kind: g('#np-k'), weeks: g('#np-w'), start: g('#np-d'), goal: g('#np-g') };
    if (s.type === 'item') return { sets: g('#it-s'), val: g('#it-v'), rest: g('#it-r'), load: g('#it-l'), note: g('#it-n') };
    if (s.type === 'note') return { note: g('#nt-t') };
    if (s.type === 'phases') return { rows: collectPhases() };
    return s.draft || null;
  }
  function collectPhases() {
    return $$('.axb-phrow', els.sheet).map(function (row, i) {
      var old = (sheet.draft && sheet.draft.rows && sheet.draft.rows[i]) || {};
      return { id: old.id || nid('ph'), name: $('[data-pf=name]', row).value, from: parseInt($('[data-pf=from]', row).value, 10) || 1, to: parseInt($('[data-pf=to]', row).value, 10) || 1 };
    });
  }
  function setErr(msg, el) { var e = $('#axb-err2', els.sheet); if (e) e.textContent = msg; $$('[aria-invalid]', els.sheet).forEach(function (n) { n.removeAttribute('aria-invalid'); }); if (el) { el.setAttribute('aria-invalid', 'true'); el.focus(); } }

  function saveNew() {
    var t = ($('#np-t', els.sheet).value || '').trim().replace(/\s+/g, ' '), ty = $('#np-ty', els.sheet).value, kind = $('#np-k', els.sheet).value, w = parseInt($('#np-w', els.sheet).value, 10), d = $('#np-d', els.sheet).value, goal = ($('#np-g', els.sheet).value || '').trim();
    if (!t) { setErr(tx('e_title'), $('#np-t', els.sheet)); return; }
    if (!(w >= 1 && w <= 12)) { setErr(tx('e_weeks'), $('#np-w', els.sheet)); return; }
    if (!validIso(d)) { setErr(tx('e_date'), $('#np-d', els.sheet)); return; }
    var p = { id: nid('prog-'), title: t, goal: goal, type: ty === 'rehab' ? 'rehab' : 'training', weeks: w, startDate: d, phases: [{ id: nid('ph'), name: L({ ar: 'المرحلة 1', en: 'Phase 1' }), from: 1, to: w }], days: [], audience: { kind: kind === 'individual' ? 'individual' : 'team', teamId: kind === 'individual' ? null : DB.team.id, memberIds: [] } };
    var r = SV.save(actorId, null, p);
    if (!r.ok) { setErr(errMsg(r)); return; }
    DB.programs.push(r.program); persist(); closeSheet(true); view = { name: 'edit', pid: r.program.id }; tab = 'plan'; week = 1; renderAll(); var h1 = $('#axb-h1', els.body); if (h1) h1.focus({ preventScroll: true }); toast(tx('toast_saved'));
  }
  function savePhases() {
    var p = curProg(), rows = collectPhases(), ok = true, last = 0;
    if (!rows.length) { setErr(L({ ar: 'لازم مرحلة واحدة على الأقل.', en: 'At least one phase is required.' })); return; }
    rows.sort(function (a, b) { return a.from - b.from; });
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i]; r.name = String(r.name).trim().slice(0, 30);
      if (!r.name) { setErr(L({ ar: 'اكتب اسم لكل مرحلة.', en: 'Name every phase.' }), $$('.axb-phrow [data-pf=name]', els.sheet)[i]); return; }
      if (r.from < 1 || r.to > p.weeks || r.from > r.to) { setErr(L({ ar: 'الأسابيع لازم تكون من 1 إلى ' + p.weeks + ' والبداية قبل النهاية.', en: 'Weeks must be within 1 to ' + p.weeks + ' with start before end.' }), $$('.axb-phrow [data-pf=from]', els.sheet)[i]); return; }
      if (r.from <= last) { setErr(L({ ar: 'المراحل ما تتداخلش.', en: 'Phases must not overlap.' }), $$('.axb-phrow [data-pf=from]', els.sheet)[i]); return; }
      last = r.to;
    }
    var okm = mutate(function (np) { np.phases = rows; }, { skipWarn: false });
    if (okm || !sheet || sheet.type !== 'phases') closeSheet(true); else if (sheet && sheet.type === 'warn') { /* waiting for the warning dialog */ }
  }
  function saveCopy() {
    var p = curProg(), to = parseInt($('#cp-w', els.sheet).value, 10), s = sheet, msg = null;
    if (s.type === 'copyday') {
      var src = dayById(p, s.id); if (!src) { closeSheet(); return; }
      if (firstFreeIdx(p, to) < 0) { setErr(L({ ar: 'الأسبوع ده فيه 7 أيام بالفعل.', en: 'That week already has 7 days.' }), $('#cp-w', els.sheet)); return; }
      var ok1 = mutate(function (np) { var sd = dayById(np, s.id), ix = firstFreeIdx(np, to); np.days.push({ id: nid('d'), week: to, idx: ix, title: clone(sd.title), blocks: copyBlocks(sd.blocks) }); });
      if (ok1) { closeSheet(true); toast(tx('toast_copied')); }
      return;
    }
    if (sortedDays(p, to).length) { setErr(L({ ar: 'الأسبوع المستهدف فيه حصص بالفعل — اختار أسبوع فاضي.', en: 'The target week already has sessions — choose an empty week.' }), $('#cp-w', els.sheet)); return; }
    var ok2 = mutate(function (np) { sortedDays(np, week).forEach(function (sd) { np.days.push({ id: nid('d'), week: to, idx: sd.idx, title: clone(sd.title), blocks: copyBlocks(sd.blocks) }); }); });
    if (ok2) { closeSheet(true); toast(tx('toast_copied')); }
    void msg;
  }
  function saveItem() {
    var s = sheet, sets = parseInt($('#it-s', els.sheet).value, 10), val = parseInt($('#it-v', els.sheet).value, 10), rest = parseInt($('#it-r', els.sheet).value, 10), load = ($('#it-l', els.sheet).value || '').trim().slice(0, 40), note = ($('#it-n', els.sheet).value || '').trim().slice(0, 400);
    if (!(sets >= 1 && sets <= 20)) { setErr(tx('it_err_sets'), $('#it-s', els.sheet)); return; }
    if (!(val >= 1 && val <= 5000)) { setErr(tx('it_err_val'), $('#it-v', els.sheet)); return; }
    if (!(rest >= 0 && rest <= 900)) { setErr(tx('it_err_rest'), $('#it-r', els.sheet)); return; }
    var ok = mutate(function (np) { var d = dayById(np, s.day), b = d && blkOf(d, s.blk), it = b && itOf(b, s.id); if (it) { it.sets = sets; it.val = val; it.rest = rest; it.load = load; it.note = note; } });
    if (ok) closeSheet(true), toast(tx('toast_saved'));
  }
  function setAudience(fn) { mutate(function (np) { np.audience.memberIds = fn(np.audience.memberIds || []); }); }
  function addMember() {
    if (!SV.canManageTeam(actorId)) { setErr(tx('why_notowner')); return; }
    var n = ($('#tm-n', els.sheet).value || '').trim().replace(/\s+/g, ' '), g = $('#tm-g', els.sheet).value;
    if (!n) { setErr(tx('team_name_req'), $('#tm-n', els.sheet)); return; }
    DB.team.members.push({ id: nid('p-'), name: { ar: n, en: n }, group: g }); persist(); sheet.draft = null; renderSheet(); renderAll(); var f = $('#tm-n', els.sheet); if (f) f.focus();
  }
  function removeMember(id) {
    if (!SV.canManageTeam(actorId)) return;
    DB.team.members = DB.team.members.filter(function (m) { return m.id !== id; });
    DB.programs.forEach(function (p) { if (p.audience && p.audience.memberIds) p.audience.memberIds = p.audience.memberIds.filter(function (x) { return x !== id; }); }); /* removing people never needs a new approval */
    persist(); renderSheet(); renderAll();
    var f = $('[data-act=tm-del]', els.sheet) || $('#tm-n', els.sheet); if (f) f.focus();
  }

  function toggleLang() {
    var next = lang() === 'ar' ? 'en' : 'ar';
    store('set', LS_LANG, next); document.documentElement.lang = next; document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  }
  function setActor(id) {
    if (!SV.who(id)) return;
    actorId = id; view = { name: 'list', pid: null }; tab = 'plan'; week = 1; scope = { kind: 'all', n: 1 }; previewMember = null; lastErr = ''; unlocked = {}; pendingEdit = null;
    if (sheet) closeSheet(true);
    renderAll();
  }

  /* ------------------------------------------------------------------ boot */
  window.adamBuilder = {
    setActor: setActor, _server: SV,
    /* test hooks */
    _db: function () { return clone(DB); }, _act: act,
    _export: function (kind, sc) { var p = curProg(); if (sc) scope = sc; return p ? buildExport(p, kind) : null; },
    _scope: function (sc) { scope = sc; },
    _state: function () { return { actor: actorId, view: clone(view), tab: tab, week: week, scope: clone(scope), storageOk: storageOk }; }
  };

  function boot() {
    var q; try { q = new URLSearchParams(location.search); } catch (e) { q = null; }
    var forced = q && q.get('lang'), l = (forced === 'ar' || forced === 'en') ? forced : (store('get', LS_LANG) === 'en' ? 'en' : 'ar');
    document.documentElement.lang = l; document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    if (q && /^\d{4}-\d{2}-\d{2}$/.test(q.get('today') || '')) window.__adamBuilderToday = q.get('today');
    if (q && q.get('noprint')) window.__adamBuilderNoPrint = true;
    var th = q && q.get('theme'); if (th === 'dark' || th === 'light' || th === 'system') store('set', LS_THEME, th);
    if (q && q.get('reset')) { try { localStorage.removeItem(LS_DB); } catch (e) { } }
    build(); theme = getThemePref(); applyTheme(); applyStatic();
    actorId = (q && SV.who(q.get('as')) && q.get('as')) || D.USERS[0].id;
    els.body.innerHTML = '<p class="ax-sr" role="status">…</p>';
    var delay = q && q.get('slow') ? parseInt(q.get('slow'), 10) || 900 : 0, fail = q && q.get('xerr');
    status = 'loading';
    setTimeout(function () {
      D.api.catalog().then(function (list) {
        if (fail) throw new Error('sample failure');
        catalogList = list; CATALOG = {}; list.forEach(function (e) { CATALOG[e.id] = e; });
        loadDb(); status = 'ready';
        if (q && q.get('open') && progById(q.get('open'))) { view = { name: SV.canBuild(actorId) ? 'edit' : 'player', pid: q.get('open') }; if (q.get('tab')) tab = q.get('tab'); if (q.get('week')) week = parseInt(q.get('week'), 10) || 1; }
        renderAll();
      }).catch(function () {
        status = 'error';
        els.body.innerHTML = '<div class="ax-state" role="alert">' + icon('alert-triangle', 'ax-big') + '<h2>' + esc(L({ ar: 'ماقدرناش نحمّل كتالوج التمارين', en: 'We could not load the exercise catalog' })) + '</h2><p>' + esc(L({ ar: 'جرّب تاني.', en: 'Try again.' })) + '</p><button type="button" class="ax-btn ax-primary" id="axb-retry">' + esc(L({ ar: 'جرّب تاني', en: 'Try again' })) + '</button></div>';
        var rb = $('#axb-retry', els.body); if (rb) rb.addEventListener('click', function () { location.href = location.pathname + location.search.replace(/[?&]xerr=[^&]*/, ''); });
      });
    }, delay);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

})();
