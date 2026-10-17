/*
 * ADAM Progress analytics (Phase 4, beta only, standalone prototype page analytics.html)
 *
 * A client's progress screen built around QUESTIONS ("Is my body composition improving?"), not loose numbers.
 * Fixes the V4/V5 defect where the date-range control did nothing: here the range recomputes every KPI, answer,
 * chart and table, with a visible "from - to" summary, validation for custom dates and an empty state.
 *
 * What is real and what is not:
 *  - The screen, the maths (changes, adherence, answers) and the SVG charts are real front-end code.
 *  - Data is SAMPLE data generated in the browser (adam-analytics-data.js). Nothing is read from Firebase.
 *  - A real backend must scope data to the signed-in user (or to a coach's own clients); the "view as" menu is a prototype aid only.
 *
 * Time direction on charts: oldest -> newest runs in the reading direction. In Arabic (RTL) the time axis is therefore mirrored
 * (oldest on the right) and the value axis sits on the right. Numbers and dates stay left-to-right. Tables always list oldest first.
 * Change MIRROR_TIME_IN_RTL below to false to keep time left-to-right in Arabic as well.
 *
 * Icons: Tabler Icons 3.49.0 (outline), MIT, Copyright (c) 2020-2026 Pawel Kuna.
 */
(function () {
  'use strict';
  var D = window.ADAM_ANALYTICS_DATA;
  if (!D || window.adamAnalytics) return;
  var MIRROR_TIME_IN_RTL = true;
  var LS_LANG = 'adam-lang', LS_THEME = 'adam-theme';
  var IC = {"chart-line": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M4 19l16 0\" /> <path d=\"M4 15l4 -6l4 2l4 -5l4 4\" />", "scale": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M7 20l10 0\" /> <path d=\"M6 6l6 -1l6 1\" /> <path d=\"M12 3l0 17\" /> <path d=\"M9 12l-3 -6l-3 6a3 3 0 0 0 6 0\" /> <path d=\"M21 12l-3 -6l-3 6a3 3 0 0 0 6 0\" />", "barbell": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M2 12h1\" /> <path d=\"M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2\" /> <path d=\"M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1\" /> <path d=\"M9 12h6\" /> <path d=\"M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1\" /> <path d=\"M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2\" /> <path d=\"M22 12h-1\" />", "heartbeat": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M19.5 13.572l-7.5 7.428l-2.896 -2.868m-6.117 -8.104a5 5 0 0 1 9.013 -3.022a5 5 0 1 1 7.5 6.572\" /> <path d=\"M3 13h2l2 3l2 -6l1 3h3\" />", "moon": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008\" />", "sun": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0\" /> <path d=\"M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7\" />", "device-desktop": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10\" /> <path d=\"M7 20h10\" /> <path d=\"M9 16v4\" /> <path d=\"M15 16v4\" />", "table": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14\" /> <path d=\"M3 10h18\" /> <path d=\"M10 3v18\" />", "download": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2\" /> <path d=\"M7 11l5 5l5 -5\" /> <path d=\"M12 4l0 12\" />", "calendar": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12\" /> <path d=\"M16 3v4\" /> <path d=\"M8 3v4\" /> <path d=\"M4 11h16\" /> <path d=\"M11 15h1\" /> <path d=\"M12 15v3\" />", "info-circle": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0\" /> <path d=\"M12 9h.01\" /> <path d=\"M11 12h1v4h1\" />", "alert-triangle": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M12 9v4\" /> <path d=\"M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0\" /> <path d=\"M12 16h.01\" />", "arrow-up-right": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M17 7l-10 10\" /> <path d=\"M8 7l9 0l0 9\" />", "arrow-down-right": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M7 7l10 10\" /> <path d=\"M17 8l0 9l-9 0\" />", "minus": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M5 12l14 0\" />", "chevron-down": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M6 9l6 6l6 -6\" />", "circle-check": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /> <path d=\"M9 12l2 2l4 -4\" />", "salad": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M4 11h16a1 1 0 0 1 1 1v.5c0 1.5 -2.517 5.573 -4 6.5v1a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-1c-1.687 -1.054 -4 -5 -4 -6.5v-.5a1 1 0 0 1 1 -1\" /> <path d=\"M18.5 11c.351 -1.017 .426 -2.236 .5 -3.714v-1.286h-2.256c-2.83 0 -4.616 .804 -5.64 2.076\" /> <path d=\"M5.255 11.008a12.204 12.204 0 0 1 -.255 -2.008v-1h1.755c.98 0 1.801 .124 2.479 .35\" /> <path d=\"M8 8l1 -4l4 2.5\" /> <path d=\"M13 11v-.5a2.5 2.5 0 1 0 -5 0v.5\" />", "bed": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M5 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M22 17v-3h-20\" /> <path d=\"M2 8v9\" /> <path d=\"M12 14h10v-2a3 3 0 0 0 -3 -3h-7v5\" />", "trophy": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M8 21l8 0\" /> <path d=\"M12 17l0 4\" /> <path d=\"M7 4l10 0\" /> <path d=\"M17 4v8a5 5 0 0 1 -10 0v-8\" /> <path d=\"M3 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M17 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" />", "x": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M18 6l-12 12\" /> <path d=\"M6 6l12 12\" />"};
  function icon(name, cls) {
    return '<svg class="axi ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (IC[name] || '') + '</svg>';
  }

  var TX = {
    ar: {
      title: 'تقدّمي', h1: 'تقدّمي', lead: 'أسئلة بسيطة وإجاباتها من بياناتك. اختار الفترة وشوف الإجابة تتغير.',
      sample: 'بيانات تجريبية — الأشخاص والأرقام مخترعة ومتولّدة في المتصفح. مفيش اتصال بأي سيرفر.',
      switch_t: 'تجربة فقط: اختار مين تشوف الشاشة بدالُه', switch_p: 'في التطبيق الحقيقي العميل بيشوف بياناته هو بس، والسيرفر هو اللي بيضمن ده.',
      rng_h: 'الفترة', r4w: '4 أسابيع', r12w: '12 أسبوع', r6m: '6 شهور', r1y: 'سنة', rcustom: 'مخصّصة', r_from: 'من', r_to: 'إلى', r_apply: 'طبّق',
      r_sum: 'من', r_sum_to: 'إلى', days_n: 'يوم', prev_p: 'الفترة السابقة', prev_none: 'مفيش بيانات كفاية للفترة السابقة',
      e_bad: 'اكتب تاريخ صالح في الخانتين.', e_order: 'تاريخ البداية لازم يكون قبل النهاية.', e_future: 'النهاية مينفعش تكون في المستقبل.', e_span_min: 'الفترة لازم تكون 7 أيام على الأقل.', e_span_max: 'الفترة أقصاها 400 يوم.',
      kpi_h: 'الصورة العامة', k_weight: 'الوزن', k_fat: 'دهون الجسم', k_sess: 'الحصص المنفّذة', k_squat: 'قوة السكوات (تقدير 1RM)',
      k_nodata: 'مفيش قراءات كفاية', readings_n: 'عدد القراءات: %n', reading_1: 'قراءة واحدة', need3: 'محتاج 3 قراءات على الأقل في الفترة دي.',
      up: 'زاد', down: 'نزل', same: 'ثابت تقريبًا', from_to: 'من', of: 'من',
      good: 'ماشي كويس', flat: 'ثابت', attention: 'محتاج انتباه', nodata: 'بيانات غير كافية', mixed: 'نتيجة مختلطة',
      q_comp: 'هل تركيب جسمي بيتحسّن؟', q_cons: 'هل أنا منتظم في التمرين؟', q_str: 'هل بقيت أقوى؟', q_nut: 'هل ماشي على خطة الأكل؟', q_rec: 'هل بتعافى كويس؟',
      how: 'إزاي وصلنا للإجابة', show_table: 'اعرض جدول البيانات', hide_table: 'اخفي جدول البيانات', dl: 'نزّل البيانات (CSV)',
      c_date: 'التاريخ', c_value: 'القيمة', c_change: 'التغيير عن القراءة السابقة', c_done: 'اتنفّذ', c_planned: 'المخطط', c_pct: 'النسبة', c_days: 'أيام مسجّلة', c_first: 'أول قراءة', c_none: '—',
      ch_weight: 'الوزن (كجم)', ch_fat: 'دهون الجسم (%)', ch_muscle: 'الكتلة العضلية (كجم)', ch_sess: 'الحصص أسبوعيًا', ch_squat: 'تقدير 1RM في السكوات (كجم)', ch_nut: 'أيام تسجيل الأكل أسبوعيًا (من 7)', ch_sleep: 'متوسط النوم (ساعات)', ch_hr: 'نبض الراحة (نبضة/دقيقة)',
      u_kg: 'كجم', u_pct: '%', u_h: 'س', u_bpm: 'ن/د', pts: 'نقطة', chart_kb: 'استخدم الأسهم يمين ويسار للتنقل بين القراءات.', chart_of: 'رسم بياني', summary_none: 'مفيش قراءات في الفترة دي.',
      chart_sum: 'من %a إلى %b: %n قراءة، آخر قيمة %v %u.',
      a_nodata: 'القراءات في الفترة دي (%n) مش كفاية — محتاجين %m على الأقل. جرّب فترة أطول.',
      a_comp_good: 'أيوه — دهون الجسم نزلت %f نقطة والعضل %m.', a_comp_mixed: 'نتيجة مختلطة — الدهون نزلت %f نقطة لكن العضل نزل %m كجم كمان.', a_comp_flat: 'لسه مش واضح — الدهون ثابتة في حدود نص نقطة، وده قريب من فرق القياس نفسه.', a_comp_up: 'مش دلوقتي — الدهون زادت %f نقطة.',
      mus_up: 'زاد %m كجم', mus_same: 'ثابت تقريبًا', mus_down: 'نزل %m كجم',
      a_comp_note: 'أجهزة التحليل بتختلف قراءاتها حسب الترطيب والوقت، فالفروق الصغيرة (أقل من نقطة) مش بالضرورة حقيقية.',
      a_cons_good: 'أيوه — نفّذت %d حصة من %p مخططة (%r%).', a_cons_mid: 'غالبًا — نفّذت %d حصة من %p مخططة (%r%).', a_cons_low: 'لسه — نفّذت %d حصة بس من %p مخططة (%r%).',
      a_cons_weeks: 'أسابيع حققت الخطة كاملة: %w من %t.',
      a_str_good: 'أيوه — تقدير قوة السكوات زاد %c كجم (%r%).', a_str_flat: 'ثابت تقريبًا — التغيير %c كجم (%r%).', a_str_down: 'نزل شوية — التغيير %c كجم (%r%). ممكن يكون إرهاق أو تغيير في الأحمال.',
      a_nut_good: 'أيوه — سجّلت أكلك %d يوم من %t (%r%).', a_nut_mid: 'جزئيًا — سجّلت أكلك %d يوم من %t (%r%).', a_nut_low: 'لسه — سجّلت أكلك %d يوم بس من %t (%r%).',
      a_rec_good: 'كويس — متوسط نومك %s ساعة.', a_rec_mid: 'متوسط — نومك %s ساعة في المتوسط، ومعظم الناس بتحتاج 7 ساعات أو أكتر.', a_rec_low: 'محتاج انتباه — متوسط نومك %s ساعة بس.',
      a_rec_hr_down: 'نبض الراحة نزل %b نبضة.', a_rec_hr_up: 'نبض الراحة زاد %b نبضة.', a_rec_hr_same: 'نبض الراحة ثابت.',
      m_comp: 'بنقارن أول قراءة وآخر قراءة في الفترة. تقدّم "حقيقي" عندنا يعني تغيّر نص نقطة دهون أو أكتر.', m_cons: 'بنجمع الحصص المنفّذة ونقسمها على المخطط في كل أسبوع داخل الفترة. 85% فأكتر = ممتاز، 60–84% = غالبًا، أقل = لسه.',
      m_str: 'بنقارن أول وآخر تقدير 1RM (محسوب من الأوزان والتكرارات). تغيّر 3% أو أكتر نعتبره واضح.', m_nut: 'عدد الأيام اللي سجّلت فيها أكلك ÷ (7 × عدد الأسابيع). 80% فأكتر = ممتاز، 50–79% = جزئيًا.', m_rec: 'متوسط النوم الأسبوعي في الفترة. نبض الراحة بنقارن فيه أول وآخر قراءة.',
      data_note: 'الأرقام دي توضيح مش تشخيص. لو عندك قلق صحي كلّم الأخصائي بتاعك.',
      load_err_t: 'ماقدرناش نحمّل بياناتك', load_err_p: 'جرّب تاني.', retry: 'جرّب تاني', empty_t: 'مفيش بيانات في الفترة دي', empty_p: 'جرّب فترة أطول، أو سجّل قراءات جديدة.',
      th_dark: 'داكن', th_light: 'فاتح', th_system: 'حسب الجهاز', theme_group: 'المظهر', lang_btn: 'تغيير اللغة', lang_to: 'EN', range_label: 'اختيار الفترة', loading: 'جاري التحميل',
      months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      toast_dl: 'تم تنزيل الملف'
    },
    en: {
      title: 'My progress', h1: 'My progress', lead: 'Simple questions, answered from your own data. Change the period and watch the answers change.',
      sample: 'Sample data — people and numbers are invented and generated in the browser. Nothing is sent to any server.',
      switch_t: 'Prototype only: pick whose screen to view', switch_p: 'In the real app a client sees only their own data, and the server guarantees that.',
      rng_h: 'Period', r4w: '4 weeks', r12w: '12 weeks', r6m: '6 months', r1y: '1 year', rcustom: 'Custom', r_from: 'From', r_to: 'To', r_apply: 'Apply',
      r_sum: 'From', r_sum_to: 'to', days_n: 'days', prev_p: 'Previous period', prev_none: 'Not enough data for the previous period',
      e_bad: 'Enter a valid date in both fields.', e_order: 'The start date must be before the end date.', e_future: 'The end date cannot be in the future.', e_span_min: 'The period must be at least 7 days.', e_span_max: 'The period can be at most 400 days.',
      kpi_h: 'The big picture', k_weight: 'Weight', k_fat: 'Body fat', k_sess: 'Sessions completed', k_squat: 'Squat strength (est. 1RM)',
      k_nodata: 'Not enough readings', readings_n: '%n readings', reading_1: '1 reading', need3: 'At least 3 readings are needed in this period.',
      up: 'up', down: 'down', same: 'about the same', from_to: 'from', of: 'of',
      good: 'On track', flat: 'Steady', attention: 'Needs attention', nodata: 'Not enough data', mixed: 'Mixed result',
      q_comp: 'Is my body composition improving?', q_cons: 'Am I training consistently?', q_str: 'Am I getting stronger?', q_nut: 'Am I following my nutrition plan?', q_rec: 'Am I recovering well?',
      how: 'How we worked this out', show_table: 'Show data table', hide_table: 'Hide data table', dl: 'Download data (CSV)',
      c_date: 'Date', c_value: 'Value', c_change: 'Change since previous reading', c_done: 'Done', c_planned: 'Planned', c_pct: 'Rate', c_days: 'Days logged', c_first: 'First reading', c_none: '—',
      ch_weight: 'Weight (kg)', ch_fat: 'Body fat (%)', ch_muscle: 'Muscle mass (kg)', ch_sess: 'Sessions per week', ch_squat: 'Squat estimated 1RM (kg)', ch_nut: 'Days with food logged per week (of 7)', ch_sleep: 'Average sleep (hours)', ch_hr: 'Resting heart rate (bpm)',
      u_kg: 'kg', u_pct: '%', u_h: 'h', u_bpm: 'bpm', pts: 'points', chart_kb: 'Use the left and right arrow keys to move between readings.', chart_of: 'chart', summary_none: 'No readings in this period.',
      chart_sum: 'From %a to %b: %n readings, latest value %v %u.',
      a_nodata: 'There are only %n readings in this period — at least %m are needed. Try a longer period.',
      a_comp_good: 'Yes — body fat is down %f points and muscle %m.', a_comp_mixed: 'Mixed — body fat is down %f points but muscle is also down %m kg.', a_comp_flat: 'Not clearly yet — body fat is within half a point, which is about the size of measurement noise.', a_comp_up: 'Not at the moment — body fat is up %f points.',
      mus_up: 'is up %m kg', mus_same: 'is about the same', mus_down: 'is down %m kg',
      a_comp_note: 'Body-composition scales vary with hydration and time of day, so differences under one point are not necessarily real.',
      a_cons_good: 'Yes — you completed %d of %p planned sessions (%r%).', a_cons_mid: 'Mostly — you completed %d of %p planned sessions (%r%).', a_cons_low: 'Not yet — you completed only %d of %p planned sessions (%r%).',
      a_cons_weeks: 'Weeks where you hit the full plan: %w of %t.',
      a_str_good: 'Yes — your estimated squat strength is up %c kg (%r%).', a_str_flat: 'About the same — change %c kg (%r%).', a_str_down: 'A little lower — change %c kg (%r%). It can be fatigue or a change in loading.',
      a_nut_good: 'Yes — you logged food on %d of %t days (%r%).', a_nut_mid: 'Partly — you logged food on %d of %t days (%r%).', a_nut_low: 'Not yet — you logged food on only %d of %t days (%r%).',
      a_rec_good: 'Good — you sleep %s hours on average.', a_rec_mid: 'Fair — you sleep %s hours on average; most adults need 7 or more.', a_rec_low: 'Needs attention — you sleep only %s hours on average.',
      a_rec_hr_down: 'Resting heart rate is down %b bpm.', a_rec_hr_up: 'Resting heart rate is up %b bpm.', a_rec_hr_same: 'Resting heart rate is steady.',
      m_comp: 'We compare the first and last reading in the period. A real change here means half a point of body fat or more.', m_cons: 'Completed sessions divided by planned sessions in each week of the period. 85% or more = yes, 60–84% = mostly, below = not yet.',
      m_str: 'We compare the first and last estimated 1RM (worked out from weights and reps). A change of 3% or more counts as clear.', m_nut: 'Days with food logged ÷ (7 × number of weeks). 80% or more = yes, 50–79% = partly.', m_rec: 'Weekly average sleep in the period. For resting heart rate we compare the first and last reading.',
      data_note: 'These figures illustrate, they do not diagnose. If you have a health concern, talk to your specialist.',
      load_err_t: 'We could not load your data', load_err_p: 'Try again.', retry: 'Try again', empty_t: 'No data in this period', empty_p: 'Try a longer period, or log new readings.',
      th_dark: 'Dark', th_light: 'Light', th_system: 'Use device settings', theme_group: 'Appearance', lang_btn: 'Change language', lang_to: 'ع', range_label: 'Choose period', loading: 'Loading',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      toast_dl: 'File downloaded'
    }
  };

  /* --------------------------------------------------------------- helpers */
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function lang() { return document.documentElement.lang === 'en' ? 'en' : 'ar'; }
  function rtl() { return lang() === 'ar'; }
  function tx(k) { var l = TX[lang()]; return l[k] != null ? l[k] : (TX.ar[k] != null ? TX.ar[k] : k); }
  function fill(s, o) { return String(s).replace(/%([a-z])/g, function (m, k) { return o[k] != null ? o[k] : m; }); }
  function num(n) { return '<bdi class="axn">' + String(n) + '</bdi>'; }
  var memStore = {}, storageOk = true;
  function store(op, key, val) {
    try { return op === 'get' ? localStorage.getItem(key) : localStorage.setItem(key, val); }
    catch (e) { if (op === 'set') { storageOk = false; memStore[key] = val; } else if (key in memStore) return memStore[key]; return null; }
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parse(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s); return new Date(+m[1], +m[2] - 1, +m[3]); }
  function today() { var f = window.__adamAnalyticsToday; return /^\d{4}-\d{2}-\d{2}$/.test(f || '') ? f : iso(new Date()); }
  function addDays(s, n) { var d = parse(s); d.setDate(d.getDate() + n); return iso(d); }
  function diffDays(a, b) { return Math.round((parse(b) - parse(a)) / 86400000); }
  function validIso(s) { return /^\d{4}-\d{2}-\d{2}$/.test(s || '') && iso(parse(s)) === s; }
  function fmtDate(s, short) { var d = parse(s); return d.getDate() + ' ' + tx('months')[d.getMonth()] + (short ? '' : ' ' + d.getFullYear()); }
  function fmtDateH(s, short) { return '<bdi class="axn">' + esc(fmtDate(s, short)) + '</bdi>'; }
  function r1(x) { return Math.round(x * 10) / 10; }
  function sgn(x, dec) { var v = dec == null ? r1(x) : x.toFixed(dec); return (x > 0 ? '+' : x < 0 ? '−' : '') + Math.abs(+v); }
  function sgnH(x, dec) { return '<bdi class="axn">' + esc(sgn(x, dec)) + '</bdi>'; }

  /* ---------------------------------------------------------------- state */
  var data = null, personId = null, range = { kind: '12w', from: null, to: null }, rangeErr = '', status = 'idle';
  var focusSel = null, tables = {}, theme = 'dark', built = false, els = {}, toastTimer = null, CH = {};
  var mqDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var PRESET_DAYS = { '4w': 28, '12w': 84, '6m': 183, '1y': 365 };

  function computeRange() {
    var t = today();
    if (range.kind !== 'custom') { range.to = t; range.from = addDays(t, -(PRESET_DAYS[range.kind] - 1)); }
  }
  function inR(s, from, to) { return s >= from && s <= to; }
  function slice(arr, from, to) { return (arr || []).filter(function (p) { return inR(p.d, from, to); }); }
  function prevRange() { var span = diffDays(range.from, range.to) + 1; return { from: addDays(range.from, -span), to: addDays(range.from, -1) }; }

  /* ------------------------------------------------------------ the maths */
  function change(pts) { if (pts.length < 2) return null; var a = pts[0].v, b = pts[pts.length - 1].v; return { from: a, to: b, d: b - a, pct: a ? (b - a) / a * 100 : 0 }; }
  function adherence(rows) {
    var done = 0, planned = 0, full = 0;
    rows.forEach(function (r) { done += r.done; planned += r.planned; if (r.done >= r.planned) full++; });
    return { done: done, planned: planned, pct: planned ? Math.round(done / planned * 100) : 0, full: full, weeks: rows.length };
  }
  function summaryFor(series, from, to) {
    var s = {};
    s.weight = slice(series.weight, from, to); s.fat = slice(series.fat, from, to); s.muscle = slice(series.muscle, from, to);
    s.workouts = slice(series.workouts, from, to); s.nutrition = slice(series.nutrition, from, to); s.squat = slice(series.squat, from, to);
    s.sleep = slice(series.sleep, from, to); s.hr = slice(series.hr, from, to);
    return s;
  }
  function kpis() {
    var cur = summaryFor(data, range.from, range.to), pr = prevRange(), prev = summaryFor(data, pr.from, pr.to);
    function one(id, key, unit, dec, kind) {
      var pts = cur[key], c = pts.length >= 3 ? change(pts) : null, pc = prev[key].length >= 3 ? change(prev[key]) : null;
      return { id: id, n: pts.length, last: pts.length ? pts[pts.length - 1].v : null, change: c, prevChange: pc, unit: unit, dec: dec, kind: kind };
    }
    var out = [one('weight', 'weight', 'u_kg', 1, 'neutral'), one('fat', 'fat', 'u_pct', 1, 'lower'), null, one('squat', 'squat', 'u_kg', 1, 'higher')];
    var a = adherence(cur.workouts), ap = adherence(prev.workouts);
    out[2] = { id: 'sess', n: cur.workouts.length, last: cur.workouts.length >= 3 ? a.pct : null, adh: a, prevAdh: prev.workouts.length >= 3 ? ap : null, unit: 'u_pct', dec: 0, kind: 'higher' };
    return out;
  }
  function insights() {
    var cur = summaryFor(data, range.from, range.to), out = [];
    /* body composition */
    (function () {
      var o = { id: 'comp', q: 'q_comp', method: 'm_comp', charts: [{ id: 'fat', key: 'fat', unit: 'u_pct', title: 'ch_fat', dec: 1 }, { id: 'muscle', key: 'muscle', unit: 'u_kg', title: 'ch_muscle', dec: 1 }] };
      var f = cur.fat, m = cur.muscle;
      if (f.length < 3) { o.state = 'nodata'; o.text = fill(tx('a_nodata'), { n: f.length, m: 3 }); }
      else {
        var cf = change(f), cm = m.length >= 2 ? change(m) : { d: 0 }, fd = Math.abs(r1(cf.d)), md = Math.abs(r1(cm.d));
        var mtxt = cm.d > 0.3 ? fill(tx('mus_up'), { m: md }) : cm.d < -0.3 ? fill(tx('mus_down'), { m: md }) : tx('mus_same');
        if (cf.d <= -0.5 && cm.d >= -0.3) { o.state = 'good'; o.text = fill(tx('a_comp_good'), { f: fd, m: mtxt }); }
        else if (cf.d <= -0.5) { o.state = 'mixed'; o.text = fill(tx('a_comp_mixed'), { f: fd, m: md }); }
        else if (cf.d >= 0.5) { o.state = 'attention'; o.text = fill(tx('a_comp_up'), { f: fd }); }
        else { o.state = 'flat'; o.text = tx('a_comp_flat'); }
        o.note = tx('a_comp_note');
      }
      out.push(o);
    })();
    /* consistency */
    (function () {
      var o = { id: 'cons', q: 'q_cons', method: 'm_cons', charts: [{ id: 'sess', key: 'workouts', kind: 'bars', unit: 'u_pct', title: 'ch_sess', dec: 0 }] }, rows = cur.workouts;
      if (rows.length < 3) { o.state = 'nodata'; o.text = fill(tx('a_nodata'), { n: rows.length, m: 3 }); }
      else {
        var a = adherence(rows); o.adh = a;
        var k = a.pct >= 85 ? 'good' : a.pct >= 60 ? 'cons_mid' : 'low';
        o.state = a.pct >= 85 ? 'good' : a.pct >= 60 ? 'flat' : 'attention';
        o.text = fill(tx('a_cons_' + (a.pct >= 85 ? 'good' : a.pct >= 60 ? 'mid' : 'low')), { d: a.done, p: a.planned, r: a.pct });
        o.note = fill(tx('a_cons_weeks'), { w: a.full, t: a.weeks }); void k;
      }
      out.push(o);
    })();
    /* strength */
    (function () {
      var o = { id: 'str', q: 'q_str', method: 'm_str', charts: [{ id: 'squat', key: 'squat', unit: 'u_kg', title: 'ch_squat', dec: 1 }] }, s = cur.squat;
      if (s.length < 3) { o.state = 'nodata'; o.text = fill(tx('a_nodata'), { n: s.length, m: 3 }); }
      else {
        var c = change(s), r = r1(c.pct), cc = sgn(c.d);
        o.state = c.pct >= 3 ? 'good' : c.pct <= -3 ? 'attention' : 'flat';
        o.text = fill(tx(c.pct >= 3 ? 'a_str_good' : c.pct <= -3 ? 'a_str_down' : 'a_str_flat'), { c: cc, r: sgn(r) });
      }
      out.push(o);
    })();
    /* nutrition */
    (function () {
      var o = { id: 'nut', q: 'q_nut', method: 'm_nut', charts: [{ id: 'nut', key: 'nutrition', kind: 'bars7', unit: 'u_pct', title: 'ch_nut', dec: 0 }] }, rows = cur.nutrition;
      if (rows.length < 3) { o.state = 'nodata'; o.text = fill(tx('a_nodata'), { n: rows.length, m: 3 }); }
      else {
        var d = 0; rows.forEach(function (r) { d += r.days; }); var t = rows.length * 7, p = Math.round(d / t * 100);
        o.state = p >= 80 ? 'good' : p >= 50 ? 'flat' : 'attention';
        o.text = fill(tx('a_nut_' + (p >= 80 ? 'good' : p >= 50 ? 'mid' : 'low')), { d: d, t: t, r: p });
      }
      out.push(o);
    })();
    /* recovery */
    (function () {
      var o = { id: 'rec', q: 'q_rec', method: 'm_rec', charts: [{ id: 'sleep', key: 'sleep', unit: 'u_h', title: 'ch_sleep', dec: 1 }, { id: 'hr', key: 'hr', unit: 'u_bpm', title: 'ch_hr', dec: 0 }] }, s = cur.sleep;
      if (s.length < 3) { o.state = 'nodata'; o.text = fill(tx('a_nodata'), { n: s.length, m: 3 }); }
      else {
        var sum = 0; s.forEach(function (p) { sum += p.v; }); var avg = r1(sum / s.length);
        o.state = avg >= 7 ? 'good' : avg >= 6 ? 'flat' : 'attention';
        var t = fill(tx('a_rec_' + (avg >= 7 ? 'good' : avg >= 6 ? 'mid' : 'low')), { s: avg });
        if (cur.hr.length >= 3) { var h = change(cur.hr), b = Math.abs(Math.round(h.d)); t += ' ' + (h.d <= -2 ? fill(tx('a_rec_hr_down'), { b: b }) : h.d >= 2 ? fill(tx('a_rec_hr_up'), { b: b }) : tx('a_rec_hr_same')); }
        o.text = t;
      }
      out.push(o);
    })();
    return out;
  }

  /* --------------------------------------------------------------- charts */
  var W = 640, H = 260, PT = 20, PB = 36, AXW = 50, EDGE = 16;
  function sizeCharts(n) { var cw = els.body ? els.body.clientWidth : 640; W = (n > 1 && cw >= 1000) ? Math.floor((cw - 80) / 2) : Math.floor(cw - 40); W = Math.max(300, Math.min(720, W)); H = W >= 480 ? 260 : 230; }
  function niceTicks(min, max, n) {
    if (max === min) { max = min + 1; }
    var span = max - min, step = Math.pow(10, Math.floor(Math.log(span / n) / Math.LN10)), err = span / n / step;
    step *= err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1;
    var lo = Math.floor(min / step) * step, hi = Math.ceil(max / step) * step, t = [];
    for (var v = lo; v <= hi + step / 2; v += step) t.push(Math.round(v * 1000) / 1000);
    return t;
  }
  function chartPoints(def) {
    var pts = slice(data[def.key], range.from, range.to).slice().sort(function (a, b) { return a.d < b.d ? -1 : a.d > b.d ? 1 : 0; });
    return pts.map(function (p) {
      if (def.kind === 'bars') return { d: p.d, v: p.done, planned: p.planned };
      if (def.kind === 'bars7') return { d: p.d, v: p.days, planned: 7 };
      return { d: p.d, v: p.v };
    });
  }
  function fmtV(v, dec) { return dec ? (Math.round(v * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(dec) : String(Math.round(v)); }
  function pctOf(p) { return p.planned ? Math.round(p.v / p.planned * 100) : 0; }

  function chartHtml(def) {
    var pts = chartPoints(def), id = def.id, title = tx(def.title), unit = tx(def.unit);
    var isBars = def.kind === 'bars' || def.kind === 'bars7', mirror = rtl() && MIRROR_TIME_IN_RTL;
    var h = '<figure class="axa-fig" data-fig="' + id + '"><figcaption class="axa-fc" id="axa-fc-' + id + '">' + esc(title) + '</figcaption>';
    if (!pts.length) { CH[id] = null; return h + '<p class="ax-note axa-none">' + esc(tx('summary_none')) + '</p></figure>'; }
    var plotL = mirror ? EDGE : AXW, plotR = mirror ? W - AXW : W - EDGE, plotT = PT, plotB = H - PB, plotW = plotR - plotL, plotH = plotB - plotT;
    var span = Math.max(1, diffDays(range.from, range.to));
    function xOf(d) { var f = clampN(diffDays(range.from, d) / span, 0, 1); return mirror ? plotR - f * plotW : plotL + f * plotW; }
    var lo, hi;
    if (isBars) { lo = 0; hi = Math.max.apply(null, pts.map(function (p) { return Math.max(p.v, p.planned); })); }
    else { var vs = pts.map(function (p) { return p.v; }); lo = Math.min.apply(null, vs); hi = Math.max.apply(null, vs); var pad = (hi - lo) * 0.15 || Math.max(1, Math.abs(hi) * 0.02); lo -= pad; hi += pad; }
    var ticks = niceTicks(lo, hi, 4); lo = ticks[0]; hi = ticks[ticks.length - 1];
    function yOf(v) { return plotB - (v - lo) / (hi - lo) * plotH; }
    var s = '<svg class="axa-svg" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">';
    ticks.forEach(function (t) {
      var y = yOf(t);
      s += '<line class="axa-grid" x1="' + plotL + '" x2="' + plotR + '" y1="' + y.toFixed(1) + '" y2="' + y.toFixed(1) + '"/>';
      s += '<text class="axa-tick" x="' + (mirror ? plotR + 8 : plotL - 8) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="' + (mirror ? 'start' : 'end') + '">' + esc(fmtV(t, def.dec && (t % 1) ? def.dec : 0)) + '</text>';
    });
    var yearLabel = span > 300;
    (W >= 480 ? [0, 0.25, 0.5, 0.75, 1] : [0, 0.5, 1]).forEach(function (f) {
      var d = addDays(range.from, Math.round(f * span)), x = xOf(d);
      var anc = f === 0 ? (mirror ? 'end' : 'start') : f === 1 ? (mirror ? 'start' : 'end') : 'middle';
      s += '<text class="axa-tick" x="' + (f === 0 || f === 1 ? (anc === 'middle' ? x : x + (anc === 'start' ? -4 : 4)) : x).toFixed(1) + '" y="' + (H - 12) + '" text-anchor="' + anc + '">' + esc(fmtDate(d, !yearLabel)) + '</text>';
    });
    var plotted = [];
    if (isBars) {
      var bw = Math.max(5, Math.min(26, plotW * 7 / span * 0.62));
      pts.forEach(function (p, i) {
        var x = xOf(p.d), y = yOf(p.v), y0 = yOf(0), yp = yOf(p.planned);
        s += '<rect class="axa-plan" x="' + (x - bw / 2).toFixed(1) + '" y="' + yp.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + (y0 - yp).toFixed(1) + '" rx="3"/>';
        s += '<rect class="axa-bar" x="' + (x - bw / 2).toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.max(0, y0 - y).toFixed(1) + '" rx="3"/>';
        plotted.push({ x: x, y: y, i: i });
      });
    } else {
      var path = '';
      pts.forEach(function (p, i) { var x = xOf(p.d), y = yOf(p.v); path += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); plotted.push({ x: x, y: y, i: i }); });
      if (pts.length > 1) s += '<path class="axa-line" d="' + path + '"/>';
      plotted.forEach(function (q) { s += '<circle class="axa-dot" cx="' + q.x.toFixed(1) + '" cy="' + q.y.toFixed(1) + '" r="4.5"/>'; });
      var fi = plotted[0], la = plotted[plotted.length - 1];
      s += '<text class="axa-vl" x="' + fi.x.toFixed(1) + '" y="' + (fi.y - 11).toFixed(1) + '" text-anchor="middle">' + esc(fmtV(pts[0].v, def.dec)) + '</text>';
      if (plotted.length > 1) s += '<text class="axa-vl" x="' + la.x.toFixed(1) + '" y="' + (la.y - 11).toFixed(1) + '" text-anchor="middle">' + esc(fmtV(pts[pts.length - 1].v, def.dec)) + '</text>';
    }
    s += '<line class="axa-guide" x1="0" x2="0" y1="' + plotT + '" y2="' + plotB + '" hidden/><circle class="axa-ring" r="8" cx="0" cy="0" hidden/></svg>';
    var order = plotted.slice().sort(function (a, b) { return a.x - b.x; }).map(function (q) { return q.i; });
    CH[id] = { def: def, pts: pts, xy: plotted, order: order, plotT: plotT, plotB: plotB, active: -1 };
    var last = pts[pts.length - 1];
    var sum = fill(tx('chart_sum'), { a: fmtDate(pts[0].d), b: fmtDate(last.d), n: pts.length, v: isBars ? last.v + ' ' + tx('of') + ' ' + last.planned : fmtV(last.v, def.dec), u: isBars ? '' : unit });
    h += '<div class="axa-ch" tabindex="0" role="group" aria-roledescription="' + esc(tx('chart_of')) + '" aria-label="' + esc(title) + '" aria-describedby="axa-sum-' + id + ' axa-kb-' + id + '" data-chart="' + id + '">' + s + '</div>';
    h += '<p class="ax-sr" id="axa-sum-' + id + '">' + esc(sum) + '</p><p class="ax-sr" id="axa-kb-' + id + '">' + esc(tx('chart_kb')) + '</p><p class="axa-read" id="axa-read-' + id + '" role="status" aria-live="polite">' + esc(sum) + '</p>';
    var open = !!tables[id];
    h += '<button type="button" class="ax-btn axa-tgl" data-act="table" data-id="' + id + '" aria-expanded="' + open + '" aria-controls="axa-tbl-' + id + '">' + icon('table') + '<span>' + esc(tx(open ? 'hide_table' : 'show_table')) + '</span></button>';
    h += '<div id="axa-tbl-' + id + '" class="ax-tw axa-tw"' + (open ? '' : ' hidden') + '>' + tableHtml(def, pts, unit) + '</div></figure>';
    return h;
  }
  function clampN(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function tableHtml(def, pts, unit) {
    var isBars = def.kind === 'bars', is7 = def.kind === 'bars7';
    var t = '<table class="ax-table axa-table"><caption class="ax-sr">' + esc(tx(def.title)) + '</caption><thead><tr><th scope="col">' + esc(tx('c_date')) + '</th>';
    if (isBars) t += '<th scope="col">' + esc(tx('c_done')) + '</th><th scope="col">' + esc(tx('c_planned')) + '</th><th scope="col">' + esc(tx('c_pct')) + '</th>';
    else if (is7) t += '<th scope="col">' + esc(tx('c_days')) + '</th><th scope="col">' + esc(tx('c_pct')) + '</th>';
    else t += '<th scope="col">' + esc(tx('c_value')) + ' (' + esc(unit) + ')</th><th scope="col">' + esc(tx('c_change')) + '</th>';
    t += '</tr></thead><tbody>';
    pts.forEach(function (p, i) {
      t += '<tr><th scope="row">' + fmtDateH(p.d) + '</th>';
      if (isBars) t += '<td>' + num(p.v) + '</td><td>' + num(p.planned) + '</td><td>' + num(pctOf(p) + '%') + '</td>';
      else if (is7) t += '<td>' + num(p.v) + '</td><td>' + num(Math.round(p.v / 7 * 100) + '%') + '</td>';
      else t += '<td>' + num(fmtV(p.v, def.dec)) + '</td><td>' + (i ? sgnH(p.v - pts[i - 1].v, def.dec) : esc(tx('c_first'))) + '</td>';
      t += '</tr>';
    });
    return t + '</tbody></table>';
  }
  function readoutText(c, i) {
    var p = c.pts[i], def = c.def, kind = def.kind;
    if (kind === 'bars') return fmtDate(p.d) + ': ' + p.v + ' ' + tx('of') + ' ' + p.planned + ' (' + pctOf(p) + '%)';
    if (kind === 'bars7') return fmtDate(p.d) + ': ' + p.v + ' ' + tx('of') + ' 7';
    var t = fmtDate(p.d) + ': ' + fmtV(p.v, def.dec) + ' ' + tx(def.unit);
    if (i) t += ' (' + sgn(p.v - c.pts[i - 1].v, def.dec) + ')';
    return t;
  }
  function setActive(id, i) {
    var c = CH[id], root = els.body; if (!c) return;
    c.active = i; var q = c.xy[i], svg = $('[data-chart="' + id + '"] svg', root);
    var g = $('.axa-guide', svg), r = $('.axa-ring', svg);
    g.setAttribute('x1', q.x.toFixed(1)); g.setAttribute('x2', q.x.toFixed(1)); g.removeAttribute('hidden');
    r.setAttribute('cx', q.x.toFixed(1)); r.setAttribute('cy', q.y.toFixed(1)); r.removeAttribute('hidden');
    var rd = $('#axa-read-' + id, root); if (rd) rd.textContent = readoutText(c, i);
  }
  function nearest(c, px) { var best = 0, bd = 1e9; c.xy.forEach(function (q, i) { var d = Math.abs(q.x - px); if (d < bd) { bd = d; best = i; } }); return best; }

  /* ------------------------------------------------------------ rendering */
  function stateBadge(s) {
    var ic = s === 'good' ? 'circle-check' : s === 'flat' ? 'minus' : s === 'nodata' ? 'info-circle' : 'alert-triangle';
    return '<span class="axa-st ' + s + '">' + icon(ic) + '<span>' + esc(tx(s)) + '</span></span>';
  }
  function kpiHtml(k) {
    var label = tx('k_' + k.id), ic = { weight: 'scale', fat: 'heartbeat', sess: 'barbell', squat: 'trophy' }[k.id];
    var h = '<li class="axa-kpi" data-kpi="' + k.id + '"><div class="axa-kl">' + icon(ic) + '<span>' + esc(label) + '</span></div>';
    if (k.last == null) return h + '<div class="axa-kv axa-kn">' + esc(tx('c_none')) + '</div><p class="axa-kd">' + esc(tx('k_nodata')) + '</p><p class="axa-kp">' + esc(tx('need3')) + '</p></li>';
    var unit = tx(k.unit), val = k.id === 'sess' ? k.last : fmtV(k.last, k.dec);
    h += '<div class="axa-kv">' + num(val) + '<span class="axa-ku">' + esc(unit) + '</span></div>';
    if (k.id === 'sess') {
      var sc = k.last >= 85 ? 'good' : k.last >= 60 ? 'flat' : 'attention';
      h += '<p class="axa-kd ' + sc + '">' + icon(sc === 'good' ? 'circle-check' : sc === 'flat' ? 'minus' : 'alert-triangle') + '<span>' + num(k.adh.done) + ' ' + esc(tx('of')) + ' ' + num(k.adh.planned) + '</span></p>';
      h += '<p class="axa-kp">' + esc(tx('prev_p')) + ': ' + (k.prevAdh ? num(k.prevAdh.pct + '%') : esc(tx('prev_none'))) + '</p>';
    } else {
      var c = k.change, dir = !c ? 0 : ((k.id === 'squat' ? Math.abs(c.pct) < 3 : Math.abs(c.d) < (k.id === 'fat' ? 0.5 : 0.3)) ? 0 : c.d > 0 ? 1 : -1), sent = 'flat';
      if (k.kind === 'lower') sent = dir < 0 ? 'good' : dir > 0 ? 'attention' : 'flat'; else if (k.kind === 'higher') sent = dir > 0 ? 'good' : dir < 0 ? 'attention' : 'flat'; else sent = 'flat';
      var ic2 = dir > 0 ? 'arrow-up-right' : dir < 0 ? 'arrow-down-right' : 'minus';
      h += '<p class="axa-kd ' + sent + '">' + icon(ic2) + '<span>' + esc(tx(dir > 0 ? 'up' : dir < 0 ? 'down' : 'same')) + ' ' + (dir ? num(Math.abs(r1(c.d))) + ' ' + esc(unit) : '') + '</span></p>';
      h += '<p class="axa-kp">' + esc(tx('prev_p')) + ': ' + (k.prevChange ? sgnH(k.prevChange.d) + ' ' + esc(unit) : esc(tx('prev_none'))) + '</p>';
    }
    return h + '<p class="axa-kn2">' + fill(esc(tx(k.n === 1 ? 'reading_1' : 'readings_n')), { n: num(k.n) }) + '</p></li>';
  }
  function rangeHtml() {
    var h = '<section class="axa-range" aria-labelledby="axa-rh"><h2 class="axt-gh" id="axa-rh">' + icon('calendar') + esc(tx('rng_h')) + '</h2><div class="axa-chips" role="group" aria-label="' + esc(tx('range_label')) + '">';
    ['4w', '12w', '6m', '1y', 'custom'].forEach(function (k) { h += '<button type="button" class="ax-chip" id="axa-r-' + k + '" data-range="' + k + '" aria-pressed="' + (range.kind === k) + '">' + esc(tx(k === 'custom' ? 'rcustom' : 'r' + k)) + '</button>'; });
    h += '</div>';
    if (range.kind === 'custom') {
      h += '<div class="axt-row axa-cust"><div><label class="axt-lab" for="axa-from">' + esc(tx('r_from')) + '</label><input id="axa-from" class="ax-input axt-in2 axt-date" type="date" max="' + today() + '" value="' + esc(range.from || '') + '" aria-describedby="axa-rerr"></div>' +
        '<div><label class="axt-lab" for="axa-to">' + esc(tx('r_to')) + '</label><input id="axa-to" class="ax-input axt-in2 axt-date" type="date" max="' + today() + '" value="' + esc(range.to || '') + '" aria-describedby="axa-rerr"></div></div><div class="axb-bar"><button type="button" class="ax-btn ax-primary" data-act="apply">' + esc(tx('r_apply')) + '</button></div>';
    }
    h += '<p class="axt-err" id="axa-rerr" role="alert">' + esc(rangeErr) + '</p>';
    h += '<p class="axa-sum" id="axa-sum">' + esc(tx('r_sum')) + ' ' + fmtDateH(range.from) + ' ' + esc(tx('r_sum_to')) + ' ' + fmtDateH(range.to) + ' <span class="axa-days">(' + num(diffDays(range.from, range.to) + 1) + ' ' + esc(tx('days_n')) + ')</span></p>';
    h += '<div class="axb-bar"><button type="button" class="ax-btn" data-act="csv">' + icon('download') + '<span>' + esc(tx('dl')) + '</span></button></div></section>';
    return h;
  }
  function renderAll() {
    if (!built) return;
    var keep = els.scroll.scrollTop;
    CH = {};
    var h = '<p class="ax-sample" role="note">' + icon('info-circle') + '<span>' + esc(tx('sample')) + '</span></p>';
    h += '<div class="axt-switch"><label class="axt-swl"><span class="axt-swt">' + esc(tx('switch_t')) + '</span><span class="ax-sw"><select id="axa-as" class="ax-mini">' + D.PEOPLE.map(function (p) { return '<option value="' + esc(p.id) + '"' + (p.id === personId ? ' selected' : '') + '>' + esc(p.name[lang()]) + '</option>'; }).join('') + '</select>' + icon('chevron-down', 'ax-caret') + '</span></label><p class="ax-note">' + esc(tx('switch_p')) + '</p></div>';
    h += '<section class="ax-hero"><h1 id="axa-h1" tabindex="-1">' + esc(tx('h1')) + '</h1><p class="ax-lead">' + esc(tx('lead')) + '</p></section>';
    if (status === 'loading') h += '<div class="ax-state" role="status">' + icon('chart-line', 'ax-big') + '<h2>' + esc(tx('loading')) + '…</h2></div>';
    else if (status === 'error') h += '<div class="ax-state" role="alert">' + icon('alert-triangle', 'ax-big') + '<h2>' + esc(tx('load_err_t')) + '</h2><p>' + esc(tx('load_err_p')) + '</p><button type="button" class="ax-btn ax-primary" data-act="retry">' + esc(tx('retry')) + '</button></div>';
    else if (data) {
      h += rangeHtml();
      var cur = summaryFor(data, range.from, range.to), any = Object.keys(cur).some(function (k) { return cur[k].length; });
      if (!any) h += '<div class="ax-state">' + icon('chart-line', 'ax-big') + '<h2>' + esc(tx('empty_t')) + '</h2><p>' + esc(tx('empty_p')) + '</p></div>';
      else {
        h += '<section aria-labelledby="axa-kh"><h2 class="axt-gh" id="axa-kh">' + esc(tx('kpi_h')) + '</h2><ul class="axa-kpis">' + kpis().map(kpiHtml).join('') + '</ul></section>';
        insights().forEach(function (o) {
          h += '<section class="axa-q ' + o.state + '" data-q="' + o.id + '" aria-labelledby="axa-q-' + o.id + '"><div class="axa-qh"><h2 id="axa-q-' + o.id + '">' + esc(tx(o.q)) + '</h2>' + stateBadge(o.state) + '</div>';
          h += '<p class="axa-ans">' + esc(o.text) + '</p>' + (o.note ? '<p class="ax-note">' + esc(o.note) + '</p>' : '');
          if (o.state !== 'nodata') { sizeCharts(o.charts.length); h += '<div class="axa-figs">' + o.charts.map(chartHtml).join('') + '</div>'; }
          h += '<details class="axa-how"><summary>' + esc(tx('how')) + '</summary><p>' + esc(tx(o.method)) + '</p></details></section>';
        });
        h += '<p class="ax-note">' + esc(tx('data_note')) + '</p>';
      }
    }
    els.body.innerHTML = h; els.scroll.scrollTop = keep;
    if (focusSel) { var fn = $(focusSel); if (fn) fn.focus({ preventScroll: true }); if (status !== 'loading') focusSel = null; }
  }

  /* ---------------------------------------------------------------- shell */
  function build() {
    if (built) return; built = true;
    var root = document.createElement('div'); root.className = 'ax axa'; root.id = 'adam-analytics';
    root.innerHTML = '<div class="ax-main" id="axa-main"><header class="ax-top"><div class="ax-brand" data-i="title"></div><div class="ax-ctrl"><div class="ax-seg" role="group" data-ia="theme_group">' +
      '<button type="button" data-th="dark" data-ia="th_dark">' + icon('moon') + '</button><button type="button" data-th="light" data-ia="th_light">' + icon('sun') + '</button><button type="button" data-th="system" data-ia="th_system">' + icon('device-desktop') + '</button></div>' +
      '<button type="button" class="ax-lang" id="axa-lang" data-ia="lang_btn"></button></div></header><div class="ax-scroll" id="axa-scroll"><div class="ax-wrap" id="axa-body"></div></div></div><div class="ax-toast" id="axa-toast" role="status" aria-live="polite"></div>';
    document.body.appendChild(root);
    els.root = root; els.body = $('#axa-body', root); els.scroll = $('#axa-scroll', root); els.toast = $('#axa-toast', root); els.lang = $('#axa-lang', root);
    bind();
  }
  function applyStatic() {
    var r = els.root;
    $$('[data-i]', r).forEach(function (n) { n.textContent = tx(n.getAttribute('data-i')); });
    $$('[data-ia]', r).forEach(function (n) { n.setAttribute('aria-label', tx(n.getAttribute('data-ia'))); });
    els.lang.textContent = tx('lang_to');
    $$('[data-th]', r).forEach(function (b) { b.setAttribute('title', tx('th_' + b.getAttribute('data-th'))); });
    r.setAttribute('lang', lang()); r.setAttribute('dir', rtl() ? 'rtl' : 'ltr'); document.title = tx('title') + ' — ADAM';
  }
  function getThemePref() { var t = store('get', LS_THEME); return (t === 'light' || t === 'dark' || t === 'system') ? t : 'dark'; }
  function applyTheme() {
    var r = theme === 'system' ? ((mqDark && !mqDark.matches) ? 'light' : 'dark') : theme;
    els.root.setAttribute('data-theme', r); els.root.style.colorScheme = r;
    $$('[data-th]', els.root).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-th') === theme)); });
  }
  function toast(msg) { els.toast.textContent = msg; els.toast.classList.add('on'); clearTimeout(toastTimer); toastTimer = setTimeout(function () { els.toast.classList.remove('on'); }, 2600); }

  /* --------------------------------------------------------------- actions */
  function validateCustom(from, to) {
    if (!validIso(from) || !validIso(to)) return 'e_bad';
    if (from > to) return 'e_order';
    if (to > today()) return 'e_future';
    var n = diffDays(from, to) + 1;
    if (n < 7) return 'e_span_min';
    if (n > 400) return 'e_span_max';
    return '';
  }
  function setRange(kind, from, to) {
    if (kind === 'custom') {
      if (from == null) { from = range.from; to = range.to; }
      var e = validateCustom(from, to);
      if (e) { rangeErr = tx(e); range.kind = 'custom'; renderAll(); var f = $('#axa-from'); if (f) { f.setAttribute('aria-invalid', 'true'); } return false; }
      range = { kind: 'custom', from: from, to: to };
    } else { range = { kind: kind, from: null, to: null }; computeRange(); }
    rangeErr = ''; return true;
  }
  function csv() {
    var rows = ['metric,date,value,planned'];
    ['weight', 'fat', 'muscle', 'squat', 'sleep', 'hr'].forEach(function (k) { slice(data[k], range.from, range.to).forEach(function (p) { rows.push(k + ',' + p.d + ',' + p.v + ','); }); });
    slice(data.workouts, range.from, range.to).forEach(function (p) { rows.push('sessions,' + p.d + ',' + p.done + ',' + p.planned); });
    slice(data.nutrition, range.from, range.to).forEach(function (p) { rows.push('nutrition_days_logged,' + p.d + ',' + p.days + ',7'); });
    return { name: 'adam-progress-' + personId.replace(/^u-client-/, '') + '-' + range.from + '_' + range.to + '.csv', content: rows.join('\n') + '\n' };
  }
  function downloadCsv() {
    var f = csv(), blob = new Blob(['﻿' + f.content], { type: 'text/csv;charset=utf-8' }), url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = f.name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 4000); toast(tx('toast_dl'));
  }
  function load() {
    status = 'loading'; data = null; renderAll();
    var q = qp(), delay = q && q.get('slow') ? parseInt(q.get('slow'), 10) || 900 : 0, fail = q && q.get('xerr');
    setTimeout(function () {
      D.api.load(personId, today()).then(function (d) { if (fail) throw new Error('sample failure'); data = d; status = 'ready'; renderAll(); })
        .catch(function () { status = 'error'; renderAll(); });
    }, delay);
  }
  function qp() { try { return new URLSearchParams(location.search); } catch (e) { return null; } }

  function bind() {
    var r = els.root;
    r.addEventListener('click', function (e) {
      var t = e.target, b;
      if ((b = t.closest('[data-th]'))) { theme = b.getAttribute('data-th'); store('set', LS_THEME, theme); applyTheme(); return; }
      if (t.closest('#axa-lang')) { var n = lang() === 'ar' ? 'en' : 'ar'; store('set', LS_LANG, n); document.documentElement.lang = n; document.documentElement.dir = n === 'ar' ? 'rtl' : 'ltr'; return; }
      if ((b = t.closest('[data-range]'))) {
        var k = b.getAttribute('data-range'); if (k === 'custom') { if (range.kind !== 'custom') { range = { kind: 'custom', from: range.from, to: range.to }; } rangeErr = ''; } else setRange(k);
        renderAll(); var nb = $('#axa-r-' + k); if (nb) nb.focus({ preventScroll: true }); return;
      }
      if ((b = t.closest('[data-act]'))) {
        var a = b.getAttribute('data-act');
        if (a === 'apply') { var ok = setRange('custom', $('#axa-from').value, $('#axa-to').value); if (ok) { renderAll(); var ab = $('[data-act="apply"]'); if (ab) ab.focus({ preventScroll: true }); } else { var f2 = $('#axa-from'); if (f2 && !validIso(f2.value)) f2.focus(); else { var t2 = $('#axa-to'); if (t2) t2.focus(); } } }
        else if (a === 'csv') downloadCsv();
        else if (a === 'retry') load();
        else if (a === 'table') { var id = b.getAttribute('data-id'); tables[id] = !tables[id]; var pane = $('#axa-tbl-' + id); if (pane) pane.hidden = !tables[id]; b.setAttribute('aria-expanded', String(!!tables[id])); $('span', b).textContent = tx(tables[id] ? 'hide_table' : 'show_table'); }
        return;
      }
      var ch = t.closest('.axa-ch');
      if (ch) { var id2 = ch.getAttribute('data-chart'), c = CH[id2]; if (c) { var svg = $('svg', ch), rc = svg.getBoundingClientRect(); setActive(id2, nearest(c, (e.clientX - rc.left) / rc.width * W)); ch.focus({ preventScroll: true }); } }
    });
    r.addEventListener('pointermove', function (e) {
      var ch = e.target.closest && e.target.closest('.axa-ch'); if (!ch || e.pointerType === 'touch') return;
      var id = ch.getAttribute('data-chart'), c = CH[id]; if (!c) return; var rc = $('svg', ch).getBoundingClientRect();
      var i = nearest(c, (e.clientX - rc.left) / rc.width * W); if (i !== c.active) setActive(id, i);
    });
    r.addEventListener('change', function (e) {
      if (e.target.id === 'axa-as') { personId = e.target.value; tables = {}; focusSel = '#axa-as'; try { var u = new URL(location.href); u.searchParams.set('person', personId); history.replaceState(history.state, '', u.pathname + u.search); } catch (er) { } load(); }
    });
    r.addEventListener('keydown', function (e) {
      var ch = e.target.closest && e.target.closest('.axa-ch');
      if (ch && /^(ArrowLeft|ArrowRight|Home|End)$/.test(e.key)) {
        var id = ch.getAttribute('data-chart'), c = CH[id]; if (!c) return; e.preventDefault();
        var pos = c.active < 0 ? -1 : c.order.indexOf(c.active), n = c.order.length, np;
        if (e.key === 'Home') np = 0; else if (e.key === 'End') np = n - 1; else { var step = e.key === 'ArrowRight' ? 1 : -1; np = pos < 0 ? (step > 0 ? 0 : n - 1) : clampN(pos + step, 0, n - 1); }
        setActive(id, c.order[np]); return;
      }
      if (e.key === 'Enter' && (e.target.id === 'axa-from' || e.target.id === 'axa-to')) { e.preventDefault(); var ap = $('[data-act="apply"]'); if (ap) ap.click(); }
    });
    if (mqDark) { var h = function () { if (theme === 'system') applyTheme(); }; if (mqDark.addEventListener) mqDark.addEventListener('change', h); else if (mqDark.addListener) mqDark.addListener(h); }
    new MutationObserver(function () { if (built) { applyStatic(); renderAll(); } }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    var rz = null, lastW = 0; window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(function () { var w = els.body.clientWidth; if (built && Math.abs(w - lastW) > 8 && data) { lastW = w; renderAll(); } }, 150); });
    window.addEventListener('storage', function (e) { if (e.key === LS_THEME) { theme = getThemePref(); applyTheme(); } });
  }

  window.adamAnalytics = {
    _state: function () { return { person: personId, range: JSON.parse(JSON.stringify(range)), status: status, today: today(), mirror: rtl() && MIRROR_TIME_IN_RTL }; },
    _setRange: function (k, f, t) { var ok = setRange(k, f, t); renderAll(); return ok; }, _kpis: function () { return data ? kpis() : null; }, _insights: function () { return data ? insights() : null; }, _csv: function () { return data ? csv() : null; },
    _data: function () { return data ? JSON.parse(JSON.stringify(data)) : null; },
    _chart: function (id) { var c = CH[id]; return c ? { n: c.pts.length, xs: c.xy.map(function (q) { return q.x; }), dates: c.pts.map(function (p) { return p.d; }) } : null; }
  };

  function boot() {
    var q = qp(), fl = q && q.get('lang'), l = (fl === 'ar' || fl === 'en') ? fl : (store('get', LS_LANG) === 'en' ? 'en' : 'ar');
    document.documentElement.lang = l; document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    if (q && /^\d{4}-\d{2}-\d{2}$/.test(q.get('today') || '')) window.__adamAnalyticsToday = q.get('today');
    var th = q && q.get('theme'); if (th === 'dark' || th === 'light' || th === 'system') store('set', LS_THEME, th);
    build(); theme = getThemePref(); applyTheme(); applyStatic();
    personId = (q && q.get('person') && D.PEOPLE.some(function (p) { return p.id === q.get('person'); }) && q.get('person')) || D.PEOPLE[0].id;
    var rk = q && q.get('range');
    if (rk && PRESET_DAYS[rk]) range.kind = rk;
    computeRange();
    if (q && validIso(q.get('from')) && validIso(q.get('to'))) { range = { kind: 'custom', from: q.get('from'), to: q.get('to') }; }
    load();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
