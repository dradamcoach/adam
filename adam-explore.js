/*
 * ADAM Explore - unified discovery (Phase 1, beta only)
 *
 * One screen for coaches, specialists, clinics, stores, clubs and gyms:
 * search, category tabs, city and specialty selects, format/language filters,
 * favorites, comparison, details, and loading / error / empty states.
 *
 * Self-contained: no Firebase, no network, no dependency. Data comes from
 * adam-explore-data.js (SAMPLE data). Language follows the page
 * (html[lang], key adam-lang). Theme (dark | light | system) is scoped to
 * this screen and stored under adam-theme, independent from language.
 *
 * Icons: Tabler Icons 3.49.0 (outline), MIT, Copyright (c) 2020-2026 Pawel Kuna.
 */
(function () {
  'use strict';
  var D = window.ADAM_EXPLORE_DATA;
  if (!D || window.adamExplore) return;

  var LS_FAV = 'adam-explore-fav', LS_LANG = 'adam-lang', LS_THEME = 'adam-theme';
  var STANDALONE = document.documentElement.hasAttribute('data-explore-standalone');
  if (!STANDALONE && window.ADAM_FEATURES && window.ADAM_FEATURES.explore === false) return; /* feature flag (adam-features.js) */
  var MAX_COMPARE = 3;

  /* ---------------------------------------------------------------- icons */
  var IC = {"users": "<path d=\"M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0\" /> <path d=\"M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2\" /> <path d=\"M16 3.13a4 4 0 0 1 0 7.75\" /> <path d=\"M21 21v-2a4 4 0 0 0 -3 -3.85\" />", "search": "<path d=\"M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0\" /> <path d=\"M21 21l-6 -6\" />", "map-pin": "<path d=\"M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0\" /> <path d=\"M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0\" />", "star": "<path d=\"M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245\" />", "git-compare": "<path d=\"M4 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M16 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M11 6h5a2 2 0 0 1 2 2v8\" /> <path d=\"M14 9l-3 -3l3 -3\" /> <path d=\"M13 18h-5a2 2 0 0 1 -2 -2v-8\" /> <path d=\"M10 15l3 3l-3 3\" />", "x": "<path d=\"M18 6l-12 12\" /> <path d=\"M6 6l12 12\" />", "filter": "<path d=\"M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227\" />", "language": "<path d=\"M9 6.371c0 4.418 -2.239 6.629 -5 6.629\" /> <path d=\"M4 6.371h7\" /> <path d=\"M5 9c0 2.144 2.252 3.908 6 4\" /> <path d=\"M12 20l4 -9l4 9\" /> <path d=\"M19.1 18h-6.2\" /> <path d=\"M6.694 3l.793 .582\" />", "device-laptop": "<path d=\"M3 19l18 0\" /> <path d=\"M5 7a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1l0 -8\" />", "building-hospital": "<path d=\"M3 21l18 0\" /> <path d=\"M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16\" /> <path d=\"M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4\" /> <path d=\"M10 9l4 0\" /> <path d=\"M12 7l0 4\" />", "barbell": "<path d=\"M2 12h1\" /> <path d=\"M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2\" /> <path d=\"M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1\" /> <path d=\"M9 12h6\" /> <path d=\"M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1\" /> <path d=\"M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2\" /> <path d=\"M22 12h-1\" />", "stethoscope": "<path d=\"M6 4h-1a2 2 0 0 0 -2 2v3.5a5.5 5.5 0 0 0 11 0v-3.5a2 2 0 0 0 -2 -2h-1\" /> <path d=\"M8 15a6 6 0 1 0 12 0v-3\" /> <path d=\"M11 3v2\" /> <path d=\"M6 3v2\" /> <path d=\"M18 10a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" />", "trophy": "<path d=\"M8 21l8 0\" /> <path d=\"M12 17l0 4\" /> <path d=\"M7 4l10 0\" /> <path d=\"M17 4v8a5 5 0 0 1 -10 0v-8\" /> <path d=\"M3 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M17 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" />", "run": "<path d=\"M11.007 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M4 17l5 1l.75 -1.5\" /> <path d=\"M15 21v-4l-4 -3l1 -6\" /> <path d=\"M7 12v-3l5 -1l3 3l3 1\" />", "building-store": "<path d=\"M3 21l18 0\" /> <path d=\"M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4\" /> <path d=\"M5 21l0 -10.15\" /> <path d=\"M19 21l0 -10.15\" /> <path d=\"M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4\" />", "rosette-discount-check": "<path d=\"M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1\" /> <path d=\"M9 12l2 2l4 -4\" />", "eye-check": "<path d=\"M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0\" /> <path d=\"M11.102 17.957c-3.204 -.307 -5.904 -2.294 -8.102 -5.957c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6a19.5 19.5 0 0 1 -.663 1.032\" /> <path d=\"M15 19l2 2l4 -4\" />", "link": "<path d=\"M9 15l6 -6\" /> <path d=\"M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464\" /> <path d=\"M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463\" />", "moon": "<path d=\"M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008\" />", "sun": "<path d=\"M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0\" /> <path d=\"M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7\" />", "device-desktop": "<path d=\"M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10\" /> <path d=\"M7 20h10\" /> <path d=\"M9 16v4\" /> <path d=\"M15 16v4\" />", "refresh": "<path d=\"M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4\" /> <path d=\"M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4\" />", "compass": "<path d=\"M8 16l2 -6l6 -2l-2 6l-6 2\" /> <path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /> <path d=\"M12 3l0 2\" /> <path d=\"M12 19l0 2\" /> <path d=\"M3 12l2 0\" /> <path d=\"M19 12l2 0\" />", "chevron-down": "<path d=\"M6 9l6 6l6 -6\" />", "arrow-left": "<path d=\"M5 12l14 0\" /> <path d=\"M5 12l6 6\" /> <path d=\"M5 12l6 -6\" />", "info-circle": "<path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0\" /> <path d=\"M12 9h.01\" /> <path d=\"M11 12h1v4h1\" />", "world": "<path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0\" /> <path d=\"M3.6 9h16.8\" /> <path d=\"M3.6 15h16.8\" /> <path d=\"M11.5 3a17 17 0 0 0 0 18\" /> <path d=\"M12.5 3a17 17 0 0 1 0 18\" />", "alert-triangle": "<path d=\"M12 9v4\" /> <path d=\"M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0\" /> <path d=\"M12 16h.01\" />", "mood-search": "<path d=\"M21 12a9 9 0 1 0 -9 9\" /> <path d=\"M9 10h.01\" /> <path d=\"M15 10h.01\" /> <path d=\"M9.5 15c.658 .672 1.56 1 2.5 1\" /> <path d=\"M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0\" /> <path d=\"M20.2 20.2l1.8 1.8\" />"};
  function icon(name, cls) {
    return '<svg class="axi ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (IC[name] || '') + '</svg>';
  }
  var KIND_ICON = { coach: 'barbell', specialist: 'stethoscope', clinic: 'building-hospital', store: 'building-store', club: 'trophy', gym: 'run' };
  var KIND_HUE = { coach: '#22C55E', specialist: '#60A5FA', clinic: '#2DD4BF', store: '#FBBF24', club: '#A78BFA', gym: '#F472B6' };

  /* ----------------------------------------------------------------- text */
  var TX = {
    ar: {
      title: 'استكشف ADAM', close: 'إغلاق', back: 'رجوع',
      h1: 'لاقي المتخصص أو المكان المناسب ليك',
      lead: 'مدربين وأخصائيين وعيادات ومتاجر وأندية وجيمات في مكان واحد.',
      sample: 'بيانات تجريبية — كل القوائم هنا مخترعة لتجربة الشاشة. مفيش تقييمات ولا مواعيد ولا حجز.',
      search_label: 'بحث', search_ph: 'ابحث بالاسم أو التخصص', search_btn: 'بحث', clear_q: 'مسح البحث',
      city_label: 'المدينة', city_all: 'كل المدن', city_online: 'أونلاين (من أي مكان)',
      spec_label: 'التخصص', spec_all: 'كل التخصصات',
      try_label: 'جرّب:',
      tabs_label: 'نوع النتائج',
      k_all: 'الكل', k_coach: 'مدربون', k_specialist: 'أخصائيون', k_clinic: 'عيادات ومراكز', k_store: 'متاجر', k_club: 'أندية', k_gym: 'جيمات',
      s_coach: 'مدرب', s_specialist: 'أخصائي', s_clinic: 'عيادة أو مركز', s_store: 'متجر', s_club: 'نادي', s_gym: 'جيم',
      filters: 'الفلاتر', f_format: 'الطريقة', f_online: 'أونلاين', f_inperson: 'حضوري', f_lang: 'اللغة', f_ar: 'بالعربي', f_en: 'English',
      f_fav: 'المفضلة', sort: 'ترتيب', sort_rel: 'الأنسب', sort_name: 'الاسم', reset: 'إعادة ضبط الفلاتر',
      sample_chip: 'تجريبي', soon: 'قريبًا', soon_t: 'قريبًا', soon_p: 'لسه مفيش قوائم هنا. أول ما الأندية والجيمات والمتخصصين والمدربين والمتاجر والعيادات ينضموا لـ ADAM هتظهر هنا.', soon_pk: 'لسه محدش من القسم ده انضم. هيظهر هنا أول ما ينضم.', details: 'التفاصيل',
      fav_add: 'احفظ في المفضلة', fav_remove: 'شيل من المفضلة', cmp_add: 'قارن', cmp_remove: 'شيل من المقارنة',
      m_online: 'أونلاين', m_inperson: 'حضوري', m_both: 'حضوري وأونلاين', m_online_only: 'أونلاين فقط',
      l_ar: 'العربية', l_en: 'English', l_both: 'العربية والإنجليزية',
      t_checked_p: 'تم فحص الشهادات', t_checked_o: 'تم فحص الوثائق', t_reviewed: 'تمت مراجعة الصفحة — الشهادات لسه ماتفحصتش', t_reviewed_o: 'تمت مراجعة الصفحة',
      t_explain_checked_p: 'فريق ADAM خلّص فحص الشهادات والتراخيص المطلوبة لهذا التخصص في التاريخ المذكور.',
      t_explain_checked_o: 'فريق ADAM خلّص فحص الوثائق المطلوبة لهذا النوع من الأنشطة في التاريخ المذكور.',
      t_explain_reviewed: 'محتوى الصفحة اتراجع، لكن الشهادات أو الوثائق لسه ماتفحصتش. ماتعتبرش ده توثيق.',
      t_explain_reviewed_o: 'محتوى الصفحة اتراجع. الوثائق والتراخيص اختيارية دلوقتي لهذا النوع من الأماكن؛ لو صاحب المكان ضافها وفريق ADAM فحصها هتظهر علامة «تم فحص الوثائق». غياب العلامة مش معناه وجود مشكلة.',
      loading: 'بنحمّل النتائج…', err_t: 'ماقدرناش نحمّل القوائم', err_p: 'تأكد من الاتصال وجرّب تاني. المفضلة والمقارنة محفوظين زي ما هما.', retry: 'جرّب تاني',
      empty_t: 'مفيش نتائج بالفلاتر دي', empty_p_q: 'راجع الكتابة أو جرّب كلمات أقل أو قسم تاني.', empty_p: 'شيل فلتر أو جرّب قسم تاني.', clear_all: 'مسح كل الفلاتر',
      fav_empty_t: 'لسه ماحفظتش حاجة', fav_empty_p: 'دوس على النجمة في أي نتيجة عشان تحفظها وترجع لها بعدين.', browse_all: 'تصفح الكل',
      no_results_n: 'لا نتائج', r1: 'نتيجة واحدة', r2: 'نتيجتان', r_few: 'نتائج', r_many: 'نتيجة',
      tray_sel: 'مختار للمقارنة', tray_cmp: 'قارن', tray_clear: 'امسح', tray_hint: 'اختار 2 على الأقل', tray_remove: 'شيل',
      cmp_title: 'مقارنة', cmp_diff: 'الفروق فقط', cmp_need: 'اختار 2 أو 3 نتايج عشان تقارن بينهم.',
      cmp_r_kind: 'النوع', cmp_r_place: 'المكان', cmp_r_format: 'الطريقة', cmp_r_lang: 'اللغات', cmp_r_spec: 'التخصصات', cmp_r_serv: 'الخدمات', cmp_r_trust: 'حالة المراجعة',
      cmp_back: 'رجوع للمقارنة',
      d_contact: 'التواصل', d_creds: 'المستندات', d_cred_ok: 'تمت مراجعته',
      d_about: 'نبذة', d_kind: 'النوع', d_place: 'المكان', d_format: 'الطريقة', d_lang: 'اللغات', d_spec: 'التخصصات', d_serv: 'الخدمات', d_trust: 'حالة المراجعة',
      d_sample: 'قائمة تجريبية — الاسم والبيانات مخترعة لتجربة الشاشة.',
      copy: 'انسخ الرابط', copied: 'اتنسخ الرابط', copy_fail: 'مقدرناش ننسخ الرابط — انسخه من هنا:',
      toast_max: 'تقدر تقارن لحد 3 بس — شيل واحد الأول', toast_fav_on: 'اتحفظ في المفضلة', toast_fav_off: 'اتشال من المفضلة',
      theme_group: 'المظهر', th_dark: 'داكن', th_light: 'فاتح', th_system: 'حسب الجهاز', lang_btn: 'تغيير اللغة', lang_to: 'EN',
      online_place: 'أونلاين', entry_t: 'استكشف ADAM', entry_p: 'مدربين وأخصائيين وعيادات ومتاجر وأندية وجيمات', open_explore: 'افتح الاستكشاف',
      months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      try_q: ['تأهيل الكتف', 'تغذية علاجية', 'جري', 'قوة']
    },
    en: {
      title: 'Explore ADAM', close: 'Close', back: 'Back',
      h1: 'Find the right professional or place for you',
      lead: 'Coaches, specialists, clinics, stores, clubs and gyms in one place.',
      sample: 'Sample data — every listing here is invented to try out the screen. There are no ratings, availability or booking.',
      search_label: 'Search', search_ph: 'Search by name or specialty', search_btn: 'Search', clear_q: 'Clear search',
      city_label: 'City', city_all: 'All cities', city_online: 'Online (anywhere)',
      spec_label: 'Specialty', spec_all: 'All specialties',
      try_label: 'Try:',
      tabs_label: 'Result type',
      k_all: 'All', k_coach: 'Coaches', k_specialist: 'Specialists', k_clinic: 'Clinics and centers', k_store: 'Stores', k_club: 'Clubs', k_gym: 'Gyms',
      s_coach: 'Coach', s_specialist: 'Specialist', s_clinic: 'Clinic or center', s_store: 'Store', s_club: 'Club', s_gym: 'Gym',
      filters: 'Filters', f_format: 'Format', f_online: 'Online', f_inperson: 'In person', f_lang: 'Language', f_ar: 'Arabic', f_en: 'English',
      f_fav: 'Favorites', sort: 'Sort', sort_rel: 'Best match', sort_name: 'Name', reset: 'Reset filters',
      sample_chip: 'Sample', soon: 'Soon', soon_t: 'Coming soon', soon_p: 'No listings yet. They will appear here as soon as clubs, gyms, specialists, coaches, stores and clinics join ADAM.', soon_pk: 'Nobody from this category has joined yet. They will appear here as soon as they do.', details: 'Details',
      fav_add: 'Save to favorites', fav_remove: 'Remove from favorites', cmp_add: 'Compare', cmp_remove: 'Remove from comparison',
      m_online: 'Online', m_inperson: 'In person', m_both: 'In person and online', m_online_only: 'Online only',
      l_ar: 'Arabic', l_en: 'English', l_both: 'Arabic and English',
      t_checked_p: 'Credentials checked', t_checked_o: 'Documents checked', t_reviewed: 'Page reviewed — credentials not checked yet', t_reviewed_o: 'Page reviewed',
      t_explain_checked_p: 'The ADAM team finished checking the credentials and licences required for this specialty on the date shown.',
      t_explain_checked_o: 'The ADAM team finished checking the documents required for this type of business on the date shown.',
      t_explain_reviewed: 'The page content was reviewed, but credentials or documents have not been checked yet. Do not treat this as verification.',
      t_explain_reviewed_o: 'The page content was reviewed. Documents and licences are optional for this type of place for now; if the owner adds them and the ADAM team checks them, a “Documents checked” label appears. No label does not mean there is a problem.',
      loading: 'Loading results…', err_t: 'Could not load the listings', err_p: 'Check your connection and try again. Your favorites and comparison are kept.', retry: 'Try again',
      empty_t: 'No results with these filters', empty_p_q: 'Check the spelling, try fewer words, or another category.', empty_p: 'Remove a filter or try another category.', clear_all: 'Clear all filters',
      fav_empty_t: 'Nothing saved yet', fav_empty_p: 'Tap the star on any result to save it and come back to it later.', browse_all: 'Browse all',
      no_results_n: 'No results', r1: '1 result', r2: '', r_few: 'results', r_many: 'results',
      tray_sel: 'selected to compare', tray_cmp: 'Compare', tray_clear: 'Clear', tray_hint: 'Select at least 2', tray_remove: 'Remove',
      cmp_title: 'Comparison', cmp_diff: 'Differences only', cmp_need: 'Select 2 or 3 results to compare them.',
      cmp_r_kind: 'Type', cmp_r_place: 'Location', cmp_r_format: 'Format', cmp_r_lang: 'Languages', cmp_r_spec: 'Specialties', cmp_r_serv: 'Services', cmp_r_trust: 'Review status',
      cmp_back: 'Back to comparison',
      d_contact: 'Contact', d_creds: 'Credentials', d_cred_ok: 'reviewed',
      d_about: 'About', d_kind: 'Type', d_place: 'Location', d_format: 'Format', d_lang: 'Languages', d_spec: 'Specialties', d_serv: 'Services', d_trust: 'Review status',
      d_sample: 'Sample listing — the name and details are invented to try out the screen.',
      copy: 'Copy link', copied: 'Link copied', copy_fail: 'Could not copy the link — copy it from here:',
      toast_max: 'You can compare up to 3 — remove one first', toast_fav_on: 'Saved to favorites', toast_fav_off: 'Removed from favorites',
      theme_group: 'Appearance', th_dark: 'Dark', th_light: 'Light', th_system: 'Use device settings', lang_btn: 'Change language', lang_to: 'ع',
      online_place: 'Online', entry_t: 'Explore ADAM', entry_p: 'Coaches, specialists, clinics, stores, clubs and gyms', open_explore: 'Open Explore',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      try_q: ['shoulder rehab', 'nutrition', 'running', 'strength']
    }
  };

  /* --------------------------------------------------------------- helpers */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function lang() { return document.documentElement.lang === 'en' ? 'en' : 'ar'; }
  function tx(k) { var L = TX[lang()]; return L[k] != null ? L[k] : (TX.ar[k] != null ? TX.ar[k] : k); }
  function num(n) { return '<bdi class="axn">' + String(n) + '</bdi>'; }
  function store(op, key, val) {
    try { return op === 'get' ? localStorage.getItem(key) : localStorage.setItem(key, val); } catch (e) { return null; }
  }

  /* Arabic-aware normalisation so search ignores diacritics, alef/ya/ta-marbuta
     variants and Arabic-Indic digits. Both languages are searched together. */
  function norm(s) {
    return String(s == null ? '' : s).toLowerCase()
      .replace(/[ً-ٰٟـ]/g, '')
      .replace(/[أإآٱ]/g, 'ا')
      .replace(/ى/g, 'ي').replace(/ة/g, 'ه')
      .replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
      .replace(/[٠-٩]/g, function (d) { return d.charCodeAt(0) - 0x660; })
      .replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 0x6F0; })
      .replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
  }

  function plural(n) {
    var l = lang();
    if (n === 0) return tx('no_results_n');
    if (l === 'en') return n === 1 ? tx('r1') : num(n) + ' ' + tx('r_many');
    if (n === 1) return tx('r1');
    if (n === 2) return tx('r2');
    if (n <= 10) return num(n) + ' ' + tx('r_few');
    return num(n) + ' ' + tx('r_many');
  }

  function fmtDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    if (!m) return '';
    return '<bdi class="axn">' + parseInt(m[3], 10) + ' ' + tx('months')[parseInt(m[2], 10) - 1] + ' ' + m[1] + '</bdi>';
  }
  function L(obj) { return obj ? (obj[lang()] || obj.ar || '') : ''; }
  function isPerson(k) { return k === 'coach' || k === 'specialist'; }

  /* ---------------------------------------------------------------- state */
  var S = { q: '', kind: 'all', city: 'all', spec: 'all', mode: '', langf: '', fav: false, sort: 'relevance' };
  var data = [], status = 'idle', favs = [], cmp = [], theme = 'dark';
  var sheet = null; /* {type:'detail'|'compare', id, from} */
  var els = {}, built = false, opened = false, lastFocus = null, sheetFocus = null, pushed = false, inertList = [];
  var mqDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var debTimer = null, toastTimer = null, reqId = 0;

  function loadFavs() {
    try { var a = JSON.parse(store('get', LS_FAV) || '[]'); favs = Array.isArray(a) ? a.filter(function (x) { return typeof x === 'string'; }) : []; } catch (e) { favs = []; }
  }
  function saveFavs() { store('set', LS_FAV, JSON.stringify(favs)); }
  function isFav(id) { return favs.indexOf(id) > -1; }
  function byId(id) { for (var i = 0; i < data.length; i++) if (data[i].id === id) return data[i]; return null; }

  /* --------------------------------------------------------------- theme */
  function getThemePref() { var t = store('get', LS_THEME); return (t === 'light' || t === 'dark' || t === 'system') ? t : 'dark'; }
  function resolveTheme() {
    if (theme === 'system') return (mqDark && !mqDark.matches) ? 'light' : 'dark';
    return theme;
  }
  function applyTheme() {
    if (!els.root) return;
    var r = resolveTheme();
    els.root.setAttribute('data-theme', r);
    els.root.style.colorScheme = r;
    $$('[data-th]', els.root).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-th') === theme)); });
  }
  function setTheme(t) { theme = t; store('set', LS_THEME, t); applyTheme(); }

  /* ------------------------------------------------------------ filtering */
  function haystack(it) {
    if (it._h && it._hl === 1) return it._h;
    var parts = [it.name.ar, it.name.en, it.headline.ar, it.headline.en, it.about.ar, it.about.en];
    it.specs.forEach(function (k) { var sp = D.SPECIALTIES[k]; if (sp) parts.push(sp.ar, sp.en); });
    it.services.forEach(function (s) { parts.push(s.ar, s.en); });
    it.cities.forEach(function (c) { var ci = D.CITIES[c[0]]; if (ci) parts.push(ci.ar, ci.en); parts.push(c[1][0], c[1][1]); });
    parts.push(tx('s_' + it.kind), TX.ar['s_' + it.kind], TX.en['s_' + it.kind]);
    it._h = norm(parts.join(' ')); it._hl = 1;
    return it._h;
  }
  function nameHay(it) { return norm(it.name.ar + ' ' + it.name.en); }
  function specHay(it) {
    return norm(it.specs.map(function (k) { var sp = D.SPECIALTIES[k]; return sp ? sp.ar + ' ' + sp.en : ''; }).join(' '));
  }
  function matches(it, o) {
    if (!o.skipKind && S.kind !== 'all' && it.kind !== S.kind) return false;
    if (S.city === 'online') { if (it.modes.indexOf('online') < 0) return false; }
    else if (S.city !== 'all') { if (!it.cities.some(function (c) { return c[0] === S.city; })) return false; }
    if (S.spec !== 'all' && it.specs.indexOf(S.spec) < 0) return false;
    if (S.mode && it.modes.indexOf(S.mode) < 0) return false;
    if (S.langf && it.langs.indexOf(S.langf) < 0) return false;
    if (S.fav && !isFav(it.id)) return false;
    return true;
  }
  function run() {
    var toks = norm(S.q).split(' ').filter(Boolean);
    var out = [];
    data.forEach(function (it) {
      if (!matches(it, {})) return;
      var score = 0;
      if (toks.length) {
        var h = haystack(it), nh = nameHay(it), sh = specHay(it);
        for (var i = 0; i < toks.length; i++) {
          if (h.indexOf(toks[i]) < 0) return;
          score += (nh.indexOf(toks[i]) > -1 ? 5 : 0) + (sh.indexOf(toks[i]) > -1 ? 3 : 0) + 1;
        }
      }
      out.push({ it: it, score: score });
    });
    var l = lang();
    out.sort(function (a, b) {
      if (S.sort === 'relevance' && b.score !== a.score) return b.score - a.score;
      return L(a.it.name).localeCompare(L(b.it.name), l);
    });
    return out.map(function (x) { return x.it; });
  }
  /* per-tab counts: same search and filters, ignoring the selected tab */
  function counts() {
    var toks = norm(S.q).split(' ').filter(Boolean), c = { all: 0 };
    D.KINDS.forEach(function (k) { c[k] = 0; });
    data.forEach(function (it) {
      if (!matches(it, { skipKind: true })) return;
      var h = haystack(it);
      for (var i = 0; i < toks.length; i++) if (h.indexOf(toks[i]) < 0) return;
      c.all++; c[it.kind]++;
    });
    return c;
  }
  function activeFilterCount() {
    return (S.city !== 'all' ? 1 : 0) + (S.spec !== 'all' ? 1 : 0) + (S.mode ? 1 : 0) + (S.langf ? 1 : 0) + (S.fav ? 1 : 0) + (S.kind !== 'all' ? 1 : 0);
  }

  /* ----------------------------------------------------------------- DOM */
  function build() {
    if (built) return; built = true;
    var root = document.createElement('div');
    root.className = 'ax'; root.id = 'adam-explore'; root.hidden = true;
    root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-labelledby', 'ax-h1');
    root.innerHTML =
      '<div class="ax-main" id="ax-main">' +
        '<header class="ax-top">' +
          '<button type="button" class="ax-ib" id="ax-close" data-ia="close">' + icon('arrow-left', 'ax-flip') + '</button>' +
          '<div class="ax-brand" data-i="title"></div>' +
          '<div class="ax-ctrl">' +
            '<div class="ax-seg" role="group" data-ia="theme_group">' +
              '<button type="button" data-th="dark" data-ia="th_dark" data-it="th_dark">' + icon('moon') + '</button>' +
              '<button type="button" data-th="light" data-ia="th_light" data-it="th_light">' + icon('sun') + '</button>' +
              '<button type="button" data-th="system" data-ia="th_system" data-it="th_system">' + icon('device-desktop') + '</button>' +
            '</div>' +
            '<button type="button" class="ax-lang" id="ax-lang" data-ia="lang_btn"></button>' +
          '</div>' +
        '</header>' +
        '<div class="ax-scroll" id="ax-scroll"><div class="ax-wrap">' +
          (D.isSample ? '<p class="ax-sample" role="note">' + icon('info-circle') + '<span data-i="sample"></span></p>' : '') +
          '<section class="ax-hero"><h1 id="ax-h1" tabindex="-1" data-i="h1"></h1><p class="ax-lead" data-i="lead"></p></section>' +
          '<form class="ax-search" id="ax-form" role="search" autocomplete="off">' +
            '<label class="ax-field ax-q"><span class="ax-sr" data-i="search_label"></span>' + icon('search') +
              '<input type="search" id="ax-q" class="ax-input" enterkeyhint="search" data-ip="search_ph" aria-controls="ax-results">' +
              '<button type="button" class="ax-x" id="ax-qx" data-ia="clear_q" hidden>' + icon('x') + '</button></label>' +
            '<label class="ax-field ax-sel">' + '<span class="ax-sr" data-i="city_label"></span>' + icon('map-pin') + '<select id="ax-city" class="ax-input"></select>' + icon('chevron-down', 'ax-caret') + '</label>' +
            '<label class="ax-field ax-sel">' + '<span class="ax-sr" data-i="spec_label"></span>' + icon('filter') + '<select id="ax-spec" class="ax-input"></select>' + icon('chevron-down', 'ax-caret') + '</label>' +
            '<button type="submit" class="ax-btn ax-primary" data-it="search_btn"></button>' +
          '</form>' +
          '<div class="ax-try" id="ax-try"></div>' +
          '<div class="ax-tabs" id="ax-tabs" role="tablist" data-ia="tabs_label"></div>' +
          '<div class="ax-filters" role="group" data-ia="filters">' +
            '<div class="ax-fg" role="group" data-ia="f_format"><span class="ax-fl" data-i="f_format"></span>' +
              '<button type="button" class="ax-chip" data-f="mode:online" aria-pressed="false">' + icon('device-laptop') + '<span data-i="f_online"></span></button>' +
              '<button type="button" class="ax-chip" data-f="mode:inperson" aria-pressed="false">' + icon('map-pin') + '<span data-i="f_inperson"></span></button></div>' +
            '<div class="ax-fg" role="group" data-ia="f_lang"><span class="ax-fl" data-i="f_lang"></span>' +
              '<button type="button" class="ax-chip" data-f="langf:ar" aria-pressed="false">' + icon('language') + '<span data-i="f_ar"></span></button>' +
              '<button type="button" class="ax-chip" data-f="langf:en" aria-pressed="false">' + icon('language') + '<span data-i="f_en"></span></button></div>' +
            '<div class="ax-fg"><button type="button" class="ax-chip" data-f="fav" aria-pressed="false">' + icon('star') + '<span data-i="f_fav"></span> <span id="ax-favn"></span></button></div>' +
            '<div class="ax-fg ax-push"><label class="ax-sortl"><span class="ax-fl" data-i="sort"></span>' +
              '<span class="ax-sw"><select id="ax-sort" class="ax-mini"><option value="relevance" data-i="sort_rel"></option><option value="name" data-i="sort_name"></option></select>' + icon('chevron-down', 'ax-caret') + '</span></label>' +
              '<button type="button" class="ax-btn ax-quiet" id="ax-reset" data-it="reset"></button></div>' +
          '</div>' +
          '<p class="ax-count" id="ax-count" role="status" aria-live="polite"></p>' +
          '<div id="ax-results" class="ax-results" aria-busy="false"></div>' +
        '</div></div>' +
        '<div class="ax-tray" id="ax-tray" hidden></div>' +
      '</div>' +
      '<div class="ax-sheet-bg" id="ax-sheetbg" hidden><div class="ax-sheet" id="ax-sheet" role="dialog" aria-modal="true" aria-labelledby="ax-sh-t" tabindex="-1"></div></div>' +
      '<div class="ax-toast" id="ax-toast" role="status" aria-live="polite"></div>';
    document.body.appendChild(root);
    els.root = root; els.main = $('#ax-main', root); els.scroll = $('#ax-scroll', root);
    els.q = $('#ax-q', root); els.qx = $('#ax-qx', root); els.city = $('#ax-city', root); els.spec = $('#ax-spec', root);
    els.tabs = $('#ax-tabs', root); els.count = $('#ax-count', root); els.res = $('#ax-results', root);
    els.tray = $('#ax-tray', root); els.sheetbg = $('#ax-sheetbg', root); els.sheet = $('#ax-sheet', root);
    els.toast = $('#ax-toast', root); els.try = $('#ax-try', root); els.sort = $('#ax-sort', root); els.favn = $('#ax-favn', root);
    els.lang = $('#ax-lang', root); els.close = $('#ax-close', root);
    if (STANDALONE) els.close.hidden = true;
    bind();
  }

  /* static labels: re-applied on language change; inputs are never rebuilt,
     so typed text and selections survive language and theme switches */
  function applyStatic() {
    var r = els.root;
    $$('[data-i]', r).forEach(function (n) { n.textContent = tx(n.getAttribute('data-i')); });
    $$('[data-it]', r).forEach(function (n) { n.setAttribute('title', tx(n.getAttribute('data-it'))); if (n.tagName === 'BUTTON' && !n.querySelector('svg')) n.textContent = tx(n.getAttribute('data-it')); });
    $$('[data-ia]', r).forEach(function (n) { n.setAttribute('aria-label', tx(n.getAttribute('data-ia'))); });
    $$('[data-ip]', r).forEach(function (n) { n.setAttribute('placeholder', tx(n.getAttribute('data-ip'))); });
    els.lang.textContent = tx('lang_to');
    $$('[data-th]', r).forEach(function (b) { b.setAttribute('title', tx('th_' + b.getAttribute('data-th'))); });
    r.setAttribute('lang', lang()); r.setAttribute('dir', lang() === 'ar' ? 'rtl' : 'ltr');
    if (STANDALONE) document.title = tx('title') + ' — ADAM';
    fillSelects();
    els.sort.value = S.sort;
  }

  function fillSelects() {
    var c = els.city.value || S.city, s = els.spec.value || S.spec, l = lang();
    var h = '<option value="all">' + esc(tx('city_all')) + '</option>';
    Object.keys(D.CITIES).forEach(function (k) {
      if (data.length && !data.some(function (it) { return it.cities.some(function (x) { return x[0] === k; }); })) return;
      h += '<option value="' + k + '">' + esc(D.CITIES[k][l]) + '</option>';
    });
    h += '<option value="online">' + esc(tx('city_online')) + '</option>';
    els.city.innerHTML = h; els.city.value = S.city;
    /* specialties offered by the selected kind (or by everything) that exist in data */
    var present = {};
    data.forEach(function (it) { if (S.kind === 'all' || it.kind === S.kind) it.specs.forEach(function (k) { present[k] = 1; }); });
    var keys = Object.keys(present).sort(function (a, b) { return D.SPECIALTIES[a][l].localeCompare(D.SPECIALTIES[b][l], l); });
    if (S.spec !== 'all' && !present[S.spec]) S.spec = 'all';
    var sh = '<option value="all">' + esc(tx('spec_all')) + '</option>';
    keys.forEach(function (k) { sh += '<option value="' + k + '">' + esc(D.SPECIALTIES[k][l]) + '</option>'; });
    els.spec.innerHTML = sh; els.spec.value = S.spec;
    void c; void s;
  }

  /* -------------------------------------------------------------- render */
  /* does the whole list hold at least one real listing of this kind (ignoring search and filters)? */
  function hasKind(k) { return data.some(function (it) { return k === 'all' || it.kind === k; }); }
  function renderTabs() {
    var c = counts(), kinds = ['all'].concat(D.KINDS);
    els.tabs.innerHTML = kinds.map(function (k) {
      var sel = S.kind === k, soon = status === 'ready' && !hasKind(k);
      return '<button type="button" role="tab" id="ax-tab-' + k + '" data-k="' + k + '" aria-selected="' + sel + '" tabindex="' + (sel ? 0 : -1) + '" aria-controls="ax-results">' +
        (k === 'all' ? icon('compass') : icon(KIND_ICON[k])) + '<span>' + esc(tx('k_' + k)) + '</span> <span class="ax-tn">' + (soon ? esc(tx('soon')) : num(status === 'ready' ? c[k] : 0)) + '</span></button>';
    }).join('');
  }
  function renderChips() {
    $$('[data-f]', els.root).forEach(function (b) {
      var f = b.getAttribute('data-f'), on;
      if (f === 'fav') on = S.fav; else { var p = f.split(':'); on = S[p[0]] === p[1]; }
      b.setAttribute('aria-pressed', String(on));
    });
    els.favn.innerHTML = favs.length ? '(' + num(favs.length) + ')' : '';
    els.qx.hidden = !els.q.value;
    $('#ax-reset', els.root).disabled = !(activeFilterCount() || S.q);
    $('#ax-reset', els.root).setAttribute('aria-disabled', String(!(activeFilterCount() || S.q)));
    els.try.innerHTML = (!S.q && status === 'ready' && data.length) ? '<span class="ax-fl">' + esc(tx('try_label')) + '</span>' + tx('try_q').map(function (q) {
      return '<button type="button" class="ax-sug" data-q="' + esc(q) + '">' + esc(q) + '</button>';
    }).join('') : '';
  }
  function trustHtml(it, long) {
    var cls = it.trust === 'checked' ? 'ok' : 'rv';
    var label = it.trust === 'checked' ? tx(isPerson(it.kind) ? 't_checked_p' : 't_checked_o') + ' · ' + fmtDate(it.checkedOn) : tx(isPerson(it.kind) ? 't_reviewed' : 't_reviewed_o');
    var ic = it.trust === 'checked' ? 'rosette-discount-check' : 'eye-check';
    return '<span class="ax-trust ' + cls + '">' + icon(ic) + '<span>' + label + '</span></span>';
  }
  function placeText(it) {
    if (!it.cities.length) return tx('m_online_only');
    var c = it.cities[0], ci = D.CITIES[c[0]];
    return c[1][lang() === 'en' ? 1 : 0] + (ci ? (lang() === 'en' ? ', ' : '، ') + ci[lang()] : '');
  }
  function formatText(it) {
    var o = it.modes.indexOf('online') > -1, p = it.modes.indexOf('inperson') > -1;
    return o && p ? tx('m_both') : (o ? tx('m_online') : tx('m_inperson'));
  }
  function langText(it) { return it.langs.length > 1 ? tx('l_both') : tx(it.langs[0] === 'en' ? 'l_en' : 'l_ar'); }
  function specLabels(it) { return it.specs.map(function (k) { return D.SPECIALTIES[k] ? D.SPECIALTIES[k][lang()] : k; }); }

  function actsHtml(it, nm, fav, inC) {
    return '<span class="ax-acts">' +
      '<button type="button" class="ax-ib ax-fav" data-fav="' + esc(it.id) + '" aria-pressed="' + fav + '" aria-label="' + esc((fav ? tx('fav_remove') : tx('fav_add')) + ': ' + nm) + '" title="' + esc(fav ? tx('fav_remove') : tx('fav_add')) + '">' + icon('star') + '</button>' +
      '<button type="button" class="ax-ib ax-cmp" data-cmp="' + esc(it.id) + '" aria-pressed="' + inC + '" aria-label="' + esc((inC ? tx('cmp_remove') : tx('cmp_add')) + ': ' + nm) + '" title="' + esc(inC ? tx('cmp_remove') : tx('cmp_add')) + '">' + icon('git-compare') + '</button></span>';
  }
  function cardHtml(it) {
    var nm = L(it.name), fav = isFav(it.id), inC = cmp.indexOf(it.id) > -1;
    return '<article class="ax-card" data-id="' + esc(it.id) + '" style="--c:' + KIND_HUE[it.kind] + '">' +
      '<div class="ax-ch"><span class="ax-tile">' + icon(KIND_ICON[it.kind]) + '</span>' +
      '<div class="ax-cn"><h2 class="ax-name"><button type="button" class="ax-open" data-open="' + esc(it.id) + '">' + esc(nm) + '</button></h2>' +
      '<div class="ax-badges"><span class="ax-badge">' + esc(tx('s_' + it.kind)) + '</span>' + (D.isSample ? '<span class="ax-badge ax-smp">' + esc(tx('sample_chip')) + '</span>' : '') + '</div></div>' + actsHtml(it, nm, fav, inC) + '</div>' +
      '<p class="ax-hl">' + esc(L(it.headline)) + '</p>' +
      '<ul class="ax-meta"><li>' + icon('map-pin') + '<span>' + esc(placeText(it)) + '</span></li><li>' + icon(it.modes.length > 1 ? 'world' : (it.modes[0] === 'online' ? 'device-laptop' : 'users')) + '<span>' + esc(formatText(it)) + '</span></li><li>' + icon('language') + '<span>' + esc(langText(it)) + '</span></li></ul>' +
      '<div class="ax-cf">' + trustHtml(it) + '</div></article>';
  }
  function skeleton() {
    var h = '';
    for (var i = 0; i < 6; i++) h += '<div class="ax-card ax-sk" aria-hidden="true"><div class="ax-ch"><span class="ax-tile"></span><div class="ax-cn"><i class="ax-bar w60"></i><i class="ax-bar w30"></i></div></div><i class="ax-bar w90"></i><i class="ax-bar w70"></i><i class="ax-bar w50"></i></div>';
    return h;
  }
  function panel(ic, title, body, btns) {
    return '<div class="ax-state">' + icon(ic, 'ax-big') + '<h2>' + esc(title) + '</h2>' + (body ? '<p>' + esc(body) + '</p>' : '') + (btns || '') + '</div>';
  }

  function renderResults() {
    var list = [];
    els.res.setAttribute('aria-busy', String(status === 'loading'));
    if (status === 'loading' || status === 'idle') {
      els.res.className = 'ax-results'; els.res.innerHTML = skeleton(); els.count.textContent = tx('loading'); return;
    }
    if (status === 'error') {
      els.res.className = 'ax-results ax-one'; els.count.textContent = '';
      els.res.innerHTML = panel('alert-triangle', tx('err_t'), tx('err_p'), '<button type="button" class="ax-btn ax-primary" data-act="retry">' + icon('refresh') + esc(tx('retry')) + '</button>');
      return;
    }
    if (!hasKind(S.kind)) {
      els.count.innerHTML = '';
      els.res.className = 'ax-results ax-one';
      els.res.innerHTML = panel('info-circle', tx('soon_t'), S.kind === 'all' ? tx('soon_p') : tx('soon_pk'), '');
      return;
    }
    list = run();
    els.count.innerHTML = plural(list.length) + (S.q ? ' <span class="ax-q-echo">· ' + esc(S.q) + '</span>' : '');
    if (!list.length) {
      els.res.className = 'ax-results ax-one';
      if (S.fav && !favs.length && !S.q && activeFilterCount() === 1) {
        els.res.innerHTML = panel('star', tx('fav_empty_t'), tx('fav_empty_p'), '<button type="button" class="ax-btn ax-primary" data-act="browse">' + esc(tx('browse_all')) + '</button>');
      } else {
        els.res.innerHTML = panel('mood-search', tx('empty_t'), S.q ? tx('empty_p_q') : tx('empty_p'), '<button type="button" class="ax-btn ax-primary" data-act="clear">' + esc(tx('clear_all')) + '</button>');
      }
      return;
    }
    els.res.className = 'ax-results';
    els.res.innerHTML = list.map(cardHtml).join('');
  }

  function renderTray() {
    if (!cmp.length) { els.tray.hidden = true; els.tray.innerHTML = ''; return; }
    els.tray.hidden = false;
    var ready = cmp.length >= 2;
    els.tray.innerHTML =
      '<div class="ax-tray-in"><div class="ax-tray-l"><span class="ax-tray-t">' + icon('git-compare') + num(cmp.length) + ' / ' + num(MAX_COMPARE) + ' <span>' + esc(tx('tray_sel')) + '</span></span>' +
      '<span class="ax-pills">' + cmp.map(function (id) {
        var it = byId(id); if (!it) return '';
        return '<span class="ax-pill">' + esc(L(it.name)) + '<button type="button" data-cmp-rm="' + esc(id) + '" aria-label="' + esc(tx('tray_remove') + ': ' + L(it.name)) + '">' + icon('x') + '</button></span>';
      }).join('') + '</span></div>' +
      '<div class="ax-tray-r">' + (ready ? '' : '<span class="ax-hint">' + esc(tx('tray_hint')) + '</span>') +
      '<button type="button" class="ax-btn ax-quiet" data-act="cmp-clear">' + esc(tx('tray_clear')) + '</button>' +
      '<button type="button" class="ax-btn ax-primary" data-act="cmp-open"' + (ready ? '' : ' disabled aria-disabled="true"') + '>' + esc(tx('tray_cmp')) + '</button></div></div>';
  }

  function renderAll() {
    renderTabs(); renderChips(); renderResults(); renderTray();
    if (sheet) renderSheet();
    syncUrl();
  }
  /* cheap refresh after favorite / compare toggles: keep scroll and focus */
  function refreshMarks(id) {
    $$('.ax-card', els.res).forEach(function (c) {
      var cid = c.getAttribute('data-id'), it = byId(cid); if (!it || (id && cid !== id)) return;
      var f = c.querySelector('.ax-fav'), m = c.querySelector('.ax-cmp'), nm = L(it.name);
      f.setAttribute('aria-pressed', String(isFav(cid))); f.setAttribute('aria-label', (isFav(cid) ? tx('fav_remove') : tx('fav_add')) + ': ' + nm);
      f.title = isFav(cid) ? tx('fav_remove') : tx('fav_add');
      m.setAttribute('aria-pressed', String(cmp.indexOf(cid) > -1)); m.setAttribute('aria-label', (cmp.indexOf(cid) > -1 ? tx('cmp_remove') : tx('cmp_add')) + ': ' + nm);
      m.title = cmp.indexOf(cid) > -1 ? tx('cmp_remove') : tx('cmp_add');
    });
    els.favn.innerHTML = favs.length ? '(' + num(favs.length) + ')' : '';
    renderTray();
  }

  /* --------------------------------------------------------------- sheet */
  function contactHtml(c) {
    var out = [];
    var ph = String(c.phone || '').replace(/[^\d+]/g, '');
    var wa = String(c.whatsapp || '').replace(/[^\d]/g, '');
    if (ph) out.push('<a class="ax-ltr" href="tel:' + esc(ph) + '">' + esc(c.phone) + '</a>');
    if (wa) out.push('<a class="ax-ltr" href="https://wa.me/' + esc(wa) + '" target="_blank" rel="noopener">WhatsApp ' + esc(c.whatsapp) + '</a>');
    return out.join(' · ');
  }
  function row(label, html) { return '<div class="ax-dr"><dt>' + esc(label) + '</dt><dd>' + html + '</dd></div>'; }
  function chipsOf(arr) { return '<span class="ax-tags">' + arr.map(function (s) { return '<span class="ax-badge">' + esc(s) + '</span>'; }).join('') + '</span>'; }
  function detailHtml(it) {
    var nm = L(it.name), fav = isFav(it.id), inC = cmp.indexOf(it.id) > -1;
    return '<div class="ax-sh-h">' +
        (sheet.from === 'compare' ? '<button type="button" class="ax-btn ax-quiet" data-act="to-compare">' + icon('arrow-left', 'ax-flip') + esc(tx('cmp_back')) + '</button>' : '<span></span>') +
        '<button type="button" class="ax-ib" data-act="sheet-close" aria-label="' + esc(tx('close')) + '">' + icon('x') + '</button></div>' +
      '<div class="ax-sh-b"><div class="ax-ch" style="--c:' + KIND_HUE[it.kind] + '"><span class="ax-tile">' + icon(KIND_ICON[it.kind]) + '</span><div class="ax-cn"><h2 id="ax-sh-t" class="ax-name ax-lg">' + esc(nm) + '</h2><div class="ax-badges"><span class="ax-badge">' + esc(tx('s_' + it.kind)) + '</span><span class="ax-badge ax-smp">' + esc(tx('sample_chip')) + '</span></div></div></div>' +
      '<p class="ax-hl ax-lg">' + esc(L(it.headline)) + '</p>' +
      '<dl class="ax-dl">' +
        row(tx('d_about'), esc(L(it.about))) +
        row(tx('d_place'), esc(placeText(it))) +
        row(tx('d_format'), esc(formatText(it))) +
        row(tx('d_lang'), esc(langText(it))) +
        row(tx('d_spec'), chipsOf(specLabels(it))) +
        row(tx('d_serv'), '<ul class="ax-ul">' + it.services.map(function (s) { return '<li>' + esc(L(s)) + '</li>'; }).join('') + '</ul>') +
        (it.contact ? row(tx('d_contact'), contactHtml(it.contact)) : '') +
        (it.credentials && it.credentials.length ? row(tx('d_creds'), '<ul class="ax-ul">' + it.credentials.map(function (c) { return '<li>' + esc(c.title + (c.issuer ? ' — ' + c.issuer : '') + (c.verified ? ' · ' + tx('d_cred_ok') : '')) + '</li>'; }).join('') + '</ul>') : '') +
        row(tx('d_trust'), trustHtml(it) + '<p class="ax-note">' + esc(it.trust === 'checked' ? tx(isPerson(it.kind) ? 't_explain_checked_p' : 't_explain_checked_o') : tx(isPerson(it.kind) ? 't_explain_reviewed' : 't_explain_reviewed_o')) + '</p>') +
      '</dl>' + (D.isSample ? '<p class="ax-note ax-smpn">' + icon('info-circle') + esc(tx('d_sample')) + '</p>' : '') + '</div>' +
      '<div class="ax-sh-f">' +
        '<button type="button" class="ax-btn ax-toggle" data-fav="' + esc(it.id) + '" aria-pressed="' + fav + '">' + icon('star') + '<span>' + esc(fav ? tx('fav_remove') : tx('fav_add')) + '</span></button>' +
        '<button type="button" class="ax-btn ax-toggle" data-cmp="' + esc(it.id) + '" aria-pressed="' + inC + '">' + icon('git-compare') + '<span>' + esc(inC ? tx('cmp_remove') : tx('cmp_add')) + '</span></button>' +
        '<button type="button" class="ax-btn" data-act="copy" data-id="' + esc(it.id) + '">' + icon('link') + '<span>' + esc(tx('copy')) + '</span></button>' +
      '</div><div class="ax-copyfb" id="ax-copyfb" hidden></div>';
  }
  var diffOnly = false;
  function compareHtml() {
    var items = cmp.map(byId).filter(Boolean);
    var head = '<div class="ax-sh-h"><h2 id="ax-sh-t" class="ax-name ax-lg">' + icon('git-compare') + esc(tx('cmp_title')) + '</h2><button type="button" class="ax-ib" data-act="sheet-close" aria-label="' + esc(tx('close')) + '">' + icon('x') + '</button></div>';
    if (items.length < 2) {
      return head + '<div class="ax-sh-b">' + panel('git-compare', tx('cmp_title'), tx('cmp_need'), '<button type="button" class="ax-btn ax-primary" data-act="sheet-close">' + esc(tx('close')) + '</button>') + '</div>';
    }
    var rows = [
      [tx('cmp_r_kind'), function (it) { return esc(tx('s_' + it.kind)); }, function (it) { return it.kind; }],
      [tx('cmp_r_place'), function (it) { return esc(placeText(it)); }, function (it) { return placeText(it); }],
      [tx('cmp_r_format'), function (it) { return esc(formatText(it)); }, function (it) { return formatText(it); }],
      [tx('cmp_r_lang'), function (it) { return esc(langText(it)); }, function (it) { return langText(it); }],
      [tx('cmp_r_spec'), function (it) { return chipsOf(specLabels(it)); }, function (it) { return specLabels(it).slice().sort().join('|'); }],
      [tx('cmp_r_serv'), function (it) { return '<ul class="ax-ul">' + it.services.map(function (s) { return '<li>' + esc(L(s)) + '</li>'; }).join('') + '</ul>'; }, function (it) { return it.services.map(function (s) { return L(s); }).sort().join('|'); }],
      [tx('cmp_r_trust'), function (it) { return trustHtml(it); }, function (it) { return it.trust + (it.checkedOn || ''); }]
    ];
    var th = items.map(function (it) {
      return '<th scope="col"><div class="ax-cth"><button type="button" class="ax-open ax-link" data-open-from-cmp="' + esc(it.id) + '">' + esc(L(it.name)) + '</button>' +
        '<button type="button" class="ax-ib ax-sm" data-cmp-rm="' + esc(it.id) + '" aria-label="' + esc(tx('cmp_remove') + ': ' + L(it.name)) + '">' + icon('x') + '</button></div></th>';
    }).join('');
    var body = rows.map(function (r) {
      var keys = items.map(r[2]), same = keys.every(function (k) { return k === keys[0]; });
      if (diffOnly && same) return '';
      return '<tr' + (same ? '' : ' class="ax-diff"') + '><th scope="row">' + esc(r[0]) + '</th>' + items.map(function (it) { return '<td>' + r[1](it) + '</td>'; }).join('') + '</tr>';
    }).join('');
    if (!body) body = '<tr><td colspan="' + (items.length + 1) + '" class="ax-note">—</td></tr>';
    return head + '<div class="ax-sh-b"><label class="ax-check"><input type="checkbox" id="ax-diff"' + (diffOnly ? ' checked' : '') + '> <span>' + esc(tx('cmp_diff')) + '</span></label>' +
      '<div class="ax-tw"><table class="ax-table"><thead><tr><th scope="col"><span class="ax-sr">' + esc(tx('cmp_title')) + '</span></th>' + th + '</tr></thead><tbody>' + body + '</tbody></table></div></div>';
  }
  function renderSheet() {
    if (!sheet) return;
    if (sheet.type === 'detail') {
      var it = byId(sheet.id);
      if (!it) { closeSheet(); return; }
      els.sheet.className = 'ax-sheet'; els.sheet.innerHTML = detailHtml(it);
    } else {
      els.sheet.className = 'ax-sheet ax-wide'; els.sheet.innerHTML = compareHtml();
    }
  }
  function openSheet(s) {
    var first = !sheet;
    if (first) sheetFocus = document.activeElement;
    sheet = s; renderSheet(); syncUrl();
    els.sheetbg.hidden = false; els.main.inert = true; els.main.setAttribute('aria-hidden', 'true');
    els.sheet.scrollTop = 0;
    var t = $('.ax-sh-b', els.sheet); if (t) t.scrollTop = 0;
    var f = $('#ax-sh-t', els.sheet) || els.sheet;
    f.setAttribute('tabindex', '-1'); f.focus({ preventScroll: true });
  }
  function closeSheet() {
    if (!sheet) return;
    sheet = null; syncUrl(); els.sheetbg.hidden = true; els.sheet.innerHTML = '';
    els.main.inert = false; els.main.removeAttribute('aria-hidden');
    if (sheetFocus && document.contains(sheetFocus)) {
      /* re-rendered cards replace the trigger: fall back to the same card button */
      sheetFocus.focus({ preventScroll: true });
    } else { var any = $('.ax-open', els.res); if (any) any.focus({ preventScroll: true }); }
    sheetFocus = null;
  }

  /* -------------------------------------------------------------- actions */
  function toast(msg) {
    els.toast.textContent = msg; els.toast.classList.add('on');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { els.toast.classList.remove('on'); }, 2600);
  }
  function toggleFav(id) {
    var i = favs.indexOf(id), it = byId(id);
    if (i > -1) { favs.splice(i, 1); toast(tx('toast_fav_off')); } else { favs.push(id); toast(tx('toast_fav_on')); }
    saveFavs();
    if (S.fav) { renderAll(); } else { refreshMarks(); renderChips(); if (sheet && sheet.type === 'detail') renderSheetKeepFocus(); }
    void it;
  }
  function toggleCmp(id) {
    var i = cmp.indexOf(id);
    if (i > -1) cmp.splice(i, 1);
    else { if (cmp.length >= MAX_COMPARE) { toast(tx('toast_max')); return; } cmp.push(id); }
    refreshMarks();
    if (sheet) {
      if (sheet.type === 'compare') { renderSheetKeepFocus(); } else { renderSheetKeepFocus(); }
    }
  }
  function renderSheetKeepFocus() {
    var a = document.activeElement, sel = a && a.getAttribute && (a.getAttribute('data-fav') ? '[data-fav="' + a.getAttribute('data-fav') + '"]' : a.getAttribute('data-cmp') ? '[data-cmp="' + a.getAttribute('data-cmp') + '"]' : a.id ? '#' + a.id : null);
    renderSheet();
    if (sel) { var n = $(sel, els.sheet); if (n) n.focus({ preventScroll: true }); }
  }
  function setKind(k, focusTab) {
    S.kind = k; fillSelects(); renderAll();
    if (focusTab) { var t = $('#ax-tab-' + k, els.tabs); if (t) t.focus(); }
  }
  function resetAll() {
    S.q = ''; S.kind = 'all'; S.city = 'all'; S.spec = 'all'; S.mode = ''; S.langf = ''; S.fav = false; S.sort = 'relevance';
    els.q.value = ''; els.sort.value = 'relevance'; fillSelects(); renderAll();
  }
  function load() {
    var id = ++reqId; status = 'loading'; renderAll();
    D.api.fetchAll().then(function (list) {
      if (id !== reqId) return;
      data = list; status = 'ready';
      /* drop saved ids that no longer exist so counts never lie */
      cmp = cmp.filter(function (x) { return byId(x); });
      fillSelects(); renderAll(); openDeepLink();
    }).catch(function () {
      if (id !== reqId) return;
      status = 'error'; renderAll();
    });
  }

  function copyLink(id) {
    var url = location.origin + location.pathname + '?explore=1&id=' + encodeURIComponent(id);
    var fb = $('#ax-copyfb', els.sheet);
    function fail() {
      if (!fb) return;
      fb.hidden = false; fb.innerHTML = '<span>' + esc(tx('copy_fail')) + '</span><input class="ax-input ax-ltr" readonly value="' + esc(url) + '" aria-label="' + esc(tx('copy')) + '">';
      var inp = $('input', fb); if (inp) { inp.focus(); inp.select(); }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { toast(tx('copied')); }, fail);
    } else {
      var ta = document.createElement('textarea'); ta.value = url; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;opacity:0;top:0';
      els.sheet.appendChild(ta); ta.select(); var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      ta.remove(); if (ok) toast(tx('copied')); else fail();
    }
  }

  /* ------------------------------------------------------------ events */
  function bind() {
    var r = els.root;
    $('#ax-form', r).addEventListener('submit', function (e) { e.preventDefault(); clearTimeout(debTimer); S.q = els.q.value; renderAll(); });
    els.q.addEventListener('input', function () {
      els.qx.hidden = !els.q.value; clearTimeout(debTimer);
      debTimer = setTimeout(function () { S.q = els.q.value; renderAll(); }, 160);
    });
    els.qx.addEventListener('click', function () { els.q.value = ''; S.q = ''; renderAll(); els.q.focus(); });
    els.city.addEventListener('change', function () { S.city = els.city.value; renderAll(); });
    els.spec.addEventListener('change', function () { S.spec = els.spec.value; renderAll(); });
    els.sort.addEventListener('change', function () { S.sort = els.sort.value; renderAll(); });
    els.lang.addEventListener('click', toggleLang);
    els.close.addEventListener('click', function () { close(); });

    r.addEventListener('click', function (e) {
      var t = e.target;
      var b;
      if ((b = t.closest('[data-th]'))) { setTheme(b.getAttribute('data-th')); return; }
      if ((b = t.closest('#ax-tabs [data-k]'))) { setKind(b.getAttribute('data-k')); return; }
      if ((b = t.closest('[data-f]'))) {
        var f = b.getAttribute('data-f');
        if (f === 'fav') S.fav = !S.fav; else { var p = f.split(':'); S[p[0]] = (S[p[0]] === p[1]) ? '' : p[1]; }
        renderAll(); return;
      }
      if ((b = t.closest('[data-q]'))) { els.q.value = b.getAttribute('data-q'); S.q = els.q.value; renderAll(); els.q.focus(); return; }
      if ((b = t.closest('[data-fav]'))) { toggleFav(b.getAttribute('data-fav')); return; }
      if ((b = t.closest('[data-cmp]'))) { toggleCmp(b.getAttribute('data-cmp')); return; }
      if ((b = t.closest('[data-cmp-rm]'))) {
        var id = b.getAttribute('data-cmp-rm'), i = cmp.indexOf(id); if (i > -1) cmp.splice(i, 1);
        refreshMarks(); if (sheet && sheet.type === 'compare') renderSheet(); return;
      }
      if ((b = t.closest('[data-open]'))) { openSheet({ type: 'detail', id: b.getAttribute('data-open'), from: null }); return; }
      if ((b = t.closest('[data-open-from-cmp]'))) { openSheet({ type: 'detail', id: b.getAttribute('data-open-from-cmp'), from: 'compare' }); return; }
      if ((b = t.closest('[data-act]'))) {
        var a = b.getAttribute('data-act');
        if (a === 'retry') load();
        else if (a === 'clear' || a === 'browse') { resetAll(); }
        else if (a === 'cmp-clear') { cmp = []; refreshMarks(); if (sheet && sheet.type === 'compare') renderSheet(); }
        else if (a === 'cmp-open') { if (cmp.length >= 2) openSheet({ type: 'compare' }); }
        else if (a === 'sheet-close') closeSheet();
        else if (a === 'to-compare') { openSheet({ type: 'compare' }); }
        else if (a === 'copy') copyLink(b.getAttribute('data-id'));
        else if (a === 'reset') resetAll();
        return;
      }
      if (t === els.sheetbg) closeSheet();
    });
    $('#ax-reset', r).addEventListener('click', resetAll);
    r.addEventListener('change', function (e) {
      if (e.target && e.target.id === 'ax-diff') { diffOnly = e.target.checked; renderSheetKeepFocus(); }
    });
    r.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && sheet) {
        /* keep keyboard focus inside the open dialog (wrap at both ends) */
        var f = $$('button:not([disabled]), input:not([disabled]), select, [href], [tabindex]:not([tabindex="-1"])', els.sheet).filter(function (n) { return n.offsetParent !== null; });
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
      var tab = e.target.closest && e.target.closest('#ax-tabs [role=tab]');
      if (tab && (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'Home' || e.key === 'End')) {
        var tabs = $$('[role=tab]', els.tabs), i = tabs.indexOf(tab), rtl = lang() === 'ar';
        var step = e.key === 'ArrowRight' ? (rtl ? -1 : 1) : e.key === 'ArrowLeft' ? (rtl ? 1 : -1) : 0;
        var n = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (i + step + tabs.length) % tabs.length;
        e.preventDefault(); setKind(tabs[n].getAttribute('data-k'), true);
      }
    });
    if (mqDark) {
      var h = function () { if (theme === 'system') applyTheme(); };
      if (mqDark.addEventListener) mqDark.addEventListener('change', h); else if (mqDark.addListener) mqDark.addListener(h);
    }
    window.addEventListener('popstate', function () {
      if (!opened || STANDALONE) return;
      if (sheet) { closeSheet(); history.pushState({ adamExplore: 1 }, ''); return; }
      pushed = false; close(true);
    });
    new MutationObserver(function () { if (built) { applyStatic(); renderAll(); } }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    window.addEventListener('storage', function (e) {
      if (e.key === LS_THEME) { theme = getThemePref(); applyTheme(); }
      if (e.key === LS_FAV) { loadFavs(); if (built) renderAll(); }
    });
  }

  function toggleLang() {
    var next = lang() === 'ar' ? 'en' : 'ar';
    var appBtn = !STANDALONE && document.getElementById('lang-btn');
    if (appBtn) { appBtn.click(); return; }       /* the app owns language: let it switch and persist */
    store('set', LS_LANG, next);
    document.documentElement.lang = next; document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  }

  /* ------------------------------------------------------------- url state */
  var URLK = { q: 'q', kind: 'k', city: 'city', spec: 'spec', mode: 'mode', langf: 'lang', sort: 'sort' };
  function readUrl() {
    var p;
    try { p = new URLSearchParams(location.search); } catch (e) { return; }
    var q = p.get('q'); if (q) S.q = q.slice(0, 100);
    var k = p.get('k'); if (k && (k === 'all' || D.KINDS.indexOf(k) > -1)) S.kind = k;
    var c = p.get('city'); if (c && (c === 'online' || D.CITIES[c])) S.city = c;
    var sp = p.get('spec'); if (sp && D.SPECIALTIES[sp]) S.spec = sp;
    var m = p.get('mode'); if (m === 'online' || m === 'inperson') S.mode = m;
    var l = p.get('lang'); if (l === 'ar' || l === 'en') { /* language is handled by the shell */ }
    var lf = p.get('lf'); if (lf === 'ar' || lf === 'en') S.langf = lf;
    if (p.get('fav') === '1') S.fav = true;
    var so = p.get('sort'); if (so === 'name') S.sort = 'name';
  }
  function syncUrl() {
    if (!STANDALONE || !window.history.replaceState) return;
    var p = new URLSearchParams(location.search), keep = p.get('lang');
    var np = new URLSearchParams();
    if (keep) np.set('lang', keep);
    if (S.q) np.set('q', S.q); if (S.kind !== 'all') np.set('k', S.kind); if (S.city !== 'all') np.set('city', S.city);
    if (S.spec !== 'all') np.set('spec', S.spec); if (S.mode) np.set('mode', S.mode); if (S.langf) np.set('lf', S.langf);
    if (S.fav) np.set('fav', '1'); if (S.sort !== 'relevance') np.set('sort', S.sort);
    if (sheet && sheet.type === 'detail') np.set('id', sheet.id);
    var s = np.toString();
    history.replaceState(history.state, '', location.pathname + (s ? '?' + s : '') + location.hash);
  }
  var deepDone = false, deepId = null;
  function openDeepLink() {
    if (deepDone) return; deepDone = true;
    if (deepId && byId(deepId)) openSheet({ type: 'detail', id: deepId, from: null });
  }

  /* ------------------------------------------------------- open / close */
  function setInert(on) {
    if (on) {
      inertList = [];
      Array.prototype.forEach.call(document.body.children, function (n) {
        if (n === els.root || n.tagName === 'SCRIPT' || n.tagName === 'STYLE' || n.hasAttribute('inert')) return;
        n.setAttribute('inert', ''); inertList.push(n);
      });
    } else {
      inertList.forEach(function (n) { n.removeAttribute('inert'); }); inertList = [];
    }
  }
  function open(opts) {
    build();
    if (opened) return;
    opened = true;
    lastFocus = document.activeElement;
    theme = getThemePref();
    loadFavs();
    try { deepId = new URLSearchParams(location.search).get('id'); } catch (e) { deepId = null; }
    if (STANDALONE) readUrl();
    els.root.hidden = false;
    if (!STANDALONE) { setInert(true); document.documentElement.classList.add('ax-lock'); history.pushState({ adamExplore: 1 }, ''); pushed = true; }
    applyTheme(); applyStatic();
    els.q.value = S.q;
    renderAll();
    if (status !== 'ready') load(); else openDeepLink();
    if (!STANDALONE || (opts && opts.focus)) setTimeout(function () { var h = $('#ax-h1', els.root); if (h) h.focus({ preventScroll: true }); }, 30);
  }
  function close(fromPop) {
    if (!opened || STANDALONE) return;
    if (sheet) closeSheet();
    opened = false;
    els.root.hidden = true; setInert(false); document.documentElement.classList.remove('ax-lock');
    if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) { } }
    if (lastFocus && document.contains(lastFocus)) { try { lastFocus.focus({ preventScroll: true }); } catch (e) { } }
  }

  /* ------------------------------------------------- entry card in the app */
  function entryHtml() {
    return '<button type="button" class="axe-card" aria-label="' + esc(tx('open_explore')) + '">' +
      '<span class="axe-ic">' + icon('compass') + '</span><span class="axe-tx"><b>' + esc(tx('entry_t')) + '</b><small>' + esc(tx('entry_p')) + '</small></span><span class="axe-go">' + icon('arrow-left', 'ax-flip ax-rev') + '</span></button>';
  }
  function placeEntry() {
    if (STANDALONE) return;
    var home = document.getElementById('client-home');
    if (!home) return;
    var e = document.getElementById('adam-explore-entry');
    if (!e) {
      e = document.createElement('section'); e.id = 'adam-explore-entry'; e.className = 'axe';
      var v2 = document.getElementById('adam-v2');
      if (v2 && v2.parentNode === home) home.insertBefore(e, v2.nextSibling); else home.insertBefore(e, home.firstChild);
      e.addEventListener('click', function (ev) { if (ev.target.closest('.axe-card')) open(); });
    }
    e.innerHTML = entryHtml();
  }
  function watchEntry() {
    if (STANDALONE) return;
    placeEntry();
    var mo = new MutationObserver(function () {
      var home = document.getElementById('client-home');
      if (home && !document.getElementById('adam-explore-entry')) placeEntry();
    });
    mo.observe(document.body, { childList: true, subtree: true });
    new MutationObserver(placeEntry).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  /* ------------------------------------------------------------------ boot */
  window.adamExplore = {
    open: open, close: close,
    /* test hooks - read only snapshots, no data is exposed that the screen does not show */
    _state: function () { return { S: JSON.parse(JSON.stringify(S)), favs: favs.slice(), cmp: cmp.slice(), status: status, sheet: sheet && JSON.parse(JSON.stringify(sheet)) }; }
  };

  function boot() {
    if (STANDALONE) {
      var p; try { p = new URLSearchParams(location.search); } catch (e) { p = null; }
      var forced = p && p.get('lang');
      var l = (forced === 'ar' || forced === 'en') ? forced : (store('get', LS_LANG) === 'en' ? 'en' : 'ar');
      document.documentElement.lang = l; document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
      if (p && p.get('xerr')) window.__adamExploreFail = parseInt(p.get('xerr'), 10) || 1;
      if (p && p.get('slow')) window.__adamExploreDelay = parseInt(p.get('slow'), 10) || 2000;
      var th = p && p.get('theme'); if (th === 'dark' || th === 'light' || th === 'system') store('set', LS_THEME, th);
      open({ focus: false });
    } else {
      watchEntry();
      var q; try { q = new URLSearchParams(location.search); } catch (e) { q = null; }
      if (q && q.get('explore') === '1') open();
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
