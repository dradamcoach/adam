/*
 * ADAM — قوالب جلسات لكل رياضة على حدة (تحمل، مائية، قوة، ألعاب قوى، جمباز، شتوية، أخرى)
 * + قوالب حسب نوع التمرين + جلسات دريلز.
 * Per-sport session templates (endurance, water, strength, athletics, gymnastic,
 * winter, other) plus training-type templates and drill sessions.
 *
 * phase: 'off'    = خارج الموسم / أساس        (قوة عامة + قاعدة هوائية)
 *        'pre'    = قبل الموسم / تطوير        (قدرة وشغل خاص بالرياضة)
 *        'in'     = أثناء الموسم / قمة وصيانة (حجم قليل، تعب قليل)
 *        'type'   = قالب حسب نوع التمرين (sport: '', group: 'none')
 *        'drills' = جلسة مبنية من مكتبة الدريلز (sport: '', group: 'none')
 * Non-seasonal sports (walking, bodybuilding, calisthenics, yoga, pilates,
 * climbing, skating, parkour) read off/pre/in as foundation / progression /
 * peak & maintenance.
 *
 * Every exercise references an existing library item by libId
 * (EXERCISE_INDEX / EXERCISE_LIBRARY / DRILLS_LIBRARY). Validate with:
 *   node tools/check-templates-b.js
 */

export const SPORT_TEMPLATES_SPORTS_B = [
  {
    id: 'tpl_s_running_off',
    sport: 'running',
    group: 'endurance',
    phase: 'off',
    ar: 'جري — خارج الموسم (قوة وقاعدة هوائية)',
    en: 'Running — Off-season (strength & aerobic base)',
    note: {
      ar: 'بناء قوة الرجلين والسمانة وثبات الحوض مع جري هادي طويل يبني القاعدة الهوائية. الجري الهادي لازم تقدر تتكلم فيه، وما تزودش المسافة الأسبوعية أكتر من 10% في المرة.',
      en: 'Build leg, calf and pelvic-stability strength alongside a long easy run for the aerobic base. Easy runs should be conversational, and weekly mileage should rise by no more than about 10% at a time.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '6', rest: '120s', rpe: '7' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_step_up', en: 'Step-Up', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_calf_raise', en: 'Standing Calf Raise', sets: 3, reps: '12', rest: '60s', rpe: '7' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 3, reps: '30s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_zone_2_easy_run', en: 'Zone 2 Easy Run', sets: 1, reps: '40min' }
      ],
      mobility: [
        { libId: 'ad_knee_to_wall_ankle_mobilization', en: 'Knee-to-Wall Ankle Mobilization', sets: 2, reps: '10/side' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_running_pre',
    sport: 'running',
    group: 'endurance',
    phase: 'pre',
    ar: 'جري — قبل الموسم (مرونة القدم وجري عتبة)',
    en: 'Running — Pre-season (reactive strength & threshold)',
    note: {
      ar: 'تحويل القوة لارتداد ومرونة في القدم مع جري عتبة قريب من سرعة السباق. البلايومتركس على أرض ناعمة وبعدد قليل، ووقف لو ظهر وجع في وتر أكيليس.',
      en: 'Turn strength into foot stiffness and elastic return, plus threshold running close to race pace. Keep plyometrics low-volume on a soft surface and stop at any Achilles pain.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_b_skip', en: 'B-Skip', sets: 2, reps: '20m' }
      ],
      main: [
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 3, reps: '20', rest: '60s', rpe: '6' },
        { libId: 'ad_single_leg_forward_hop_and_stick', en: 'Single-Leg Forward Hop and Stick', sets: 3, reps: '5/side', rest: '60s', rpe: '7' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '6/side', rest: '90s', rpe: '8' },
        { libId: 'ad_eccentric_heel_drop', en: 'Eccentric Heel Drop', sets: 3, reps: '12/side', rest: '60s', rpe: '7' },
        { libId: 'ad_strides', en: 'Strides', sets: 6, reps: '80m', rest: '60s', rpe: '7' }
      ],
      cardio: [
        { libId: 'ad_threshold_cruise_intervals', en: 'Threshold Cruise Intervals', sets: 4, reps: '6min', rest: '90s', rpe: '7' }
      ],
      mobility: [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' }
      ],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_running_in',
    sport: 'running',
    group: 'endurance',
    phase: 'in',
    ar: 'جري — أثناء الموسم (صيانة قصيرة)',
    en: 'Running — In-season (short maintenance)',
    note: {
      ar: 'جلسة قصيرة بعد السباق أو التمرين الصعب بيومين تحافظ على القوة والارتداد من غير ما تتقّل الرجل. أوزان متوسطة بعدد قليل، وما تعملهاش قبل سباق بأقل من 48 ساعة.',
      en: 'A short session two days after a race or hard workout that keeps strength and spring without heavy legs. Moderate loads, low volume, and never within 48 hours of a race.'
    },
    sections: {
      warmup: [
        { libId: 'ad_walking_knee_hug', en: 'Walking Knee Hug', sets: 1, reps: '20m' },
        { libId: 'ad_carioca', en: 'Carioca', sets: 1, reps: '20m/side' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '4', rest: '120s', rpe: '6' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 2, reps: '6/side', rest: '90s', rpe: '6' },
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 2, reps: '15', rest: '60s', rpe: '6' },
        { libId: 'ex_calf_raise', en: 'Standing Calf Raise', sets: 2, reps: '12', rest: '60s', rpe: '6' },
        { libId: 'ex_dead_bug', en: 'Dead Bug', sets: 2, reps: '8/side', rest: '45s', rpe: '5' }
      ],
      cardio: [
        { libId: 'ad_strides', en: 'Strides', sets: 4, reps: '100m' }
      ],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 1, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_trail_running_off',
    sport: 'trail_running',
    group: 'endurance',
    phase: 'off',
    ar: 'جري الطرق الوعرة — خارج الموسم (قوة طلوع وثبات كاحل)',
    en: 'Trail running — Off-season (climbing strength & ankle stability)',
    note: {
      ar: 'قوة للطلوع والنزول وثبات الكاحل على الأرض المتقلبة، مع مشي جبلي طويل لبناء القاعدة. خلي الركبة في خط صباع الرجل وأنت طالع على البوكس.',
      en: 'Strength for climbs and descents plus ankle stability for uneven ground, with a long hike for the aerobic base. Keep the knee tracking over the toes on every step-up.'
    },
    sections: {
      warmup: [
        { libId: 'ad_walking_hip_opener', en: 'Walking Hip Opener', sets: 1, reps: '20m' },
        { libId: 'ad_ankle_alphabet', en: 'Ankle Alphabet', sets: 1, reps: '1/side' }
      ],
      main: [
        { libId: 'ex_step_up', en: 'Step-Up', sets: 4, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'wg_deficit_reverse_lunge', en: 'Deficit Reverse Lunge', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 3, reps: '30s/side', rest: '30s', rpe: '5' },
        { libId: 'ad_banded_ankle_eversion', en: 'Banded Ankle Eversion', sets: 2, reps: '15/side', rest: '45s', rpe: '6' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 3, reps: '30s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'wg_hiking', en: 'Hiking', sets: 1, reps: '60-90min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_trail_running_pre',
    sport: 'trail_running',
    group: 'endurance',
    phase: 'pre',
    ar: 'جري الطرق الوعرة — قبل الموسم (طلعات ونزول إكسنتريك)',
    en: 'Trail running — Pre-season (hills & eccentric downhill)',
    note: {
      ar: 'طلعات جري وقوة نزول (إكسنتريك) للفخذ عشان النزلات، وقفزات جانبية لثبات الكاحل. في النزول خلي الخطوة قصيرة وسريعة، ووقف لو ظهر وجع قدام الركبة.',
      en: 'Hill repeats and eccentric quad strength for descents, with lateral hops for ankle stability. Keep downhill steps short and quick, and stop at any pain at the front of the knee.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_single_leg_clock_reach', en: 'Single-Leg Clock Reach', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ad_hill_repeats', en: 'Hill Repeats', sets: 6, reps: '60s', rest: '2min', rpe: '8' },
        { libId: 'wg_step_down', en: 'Step-Down', sets: 3, reps: '8/side', rest: '60s', rpe: '7' },
        { libId: 'ad_single_leg_lateral_hop_and_stick', en: 'Single-Leg Lateral Hop and Stick', sets: 3, reps: '5/side', rest: '60s', rpe: '7' },
        { libId: 'ad_eccentric_heel_drop', en: 'Eccentric Heel Drop', sets: 3, reps: '12/side', rest: '60s', rpe: '7' },
        { libId: 'ex_walking_lunge', en: 'Walking Lunge', sets: 3, reps: '12/side', rest: '90s', rpe: '7' }
      ],
      cardio: [
        { libId: 'ad_progression_run', en: 'Progression Run', sets: 1, reps: '45min' }
      ],
      mobility: [
        { libId: 'ad_knee_to_wall_ankle_mobilization', en: 'Knee-to-Wall Ankle Mobilization', sets: 2, reps: '10/side' }
      ],
      flexibility: [
        { libId: 'ex_quad_stretch', en: 'Quad Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_trail_running_in',
    sport: 'trail_running',
    group: 'endurance',
    phase: 'in',
    ar: 'جري الطرق الوعرة — أثناء الموسم (صيانة بين السباقات)',
    en: 'Trail running — In-season (maintenance between races)',
    note: {
      ar: 'صيانة قصيرة للقوة وثبات الكاحل بين السباقات، بحجم قليل عشان الرجل تفضل فريش. بعد سباق طويل (ألترا) خد 3-4 أيام من غير قوة.',
      en: 'Short strength and ankle-stability maintenance between races, low volume so the legs stay fresh. After a long (ultra) race, skip strength for 3–4 days.'
    },
    sections: {
      warmup: [
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' },
        { libId: 'ad_ankle_alphabet', en: 'Ankle Alphabet', sets: 1, reps: '1/side' }
      ],
      main: [
        { libId: 'ex_step_up', en: 'Step-Up', sets: 2, reps: '6/side', rest: '90s', rpe: '6' },
        { libId: 'wg_step_down', en: 'Step-Down', sets: 2, reps: '6/side', rest: '60s', rpe: '6' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 2, reps: '30s/side', rest: '30s', rpe: '5' },
        { libId: 'ex_calf_raise', en: 'Standing Calf Raise', sets: 2, reps: '12', rest: '60s', rpe: '6' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 2, reps: '10/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_zone_2_easy_run', en: 'Zone 2 Easy Run', sets: 1, reps: '30min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_marathon_off',
    sport: 'marathon',
    group: 'endurance',
    phase: 'off',
    ar: 'ماراثون — خارج الموسم (قوة وحجم جري هادي)',
    en: 'Marathon — Off-season (strength & easy volume)',
    note: {
      ar: 'بناء قوة عامة للرجلين والسمانة العميقة (السوليوس) اللي بتشيل الحمل في الكيلومترات الطويلة، مع جري طويل هادي. زوّد الجري الطويل تدريجي، وما تزودش الحجم والشدة في نفس الأسبوع.',
      en: 'Build general leg strength and deep-calf (soleus) capacity that carries the load over long kilometres, plus a long easy run. Lengthen the long run gradually and never raise volume and intensity in the same week.'
    },
    sections: {
      warmup: [
        { libId: 'ad_walking_knee_hug', en: 'Walking Knee Hug', sets: 1, reps: '20m' },
        { libId: 'ad_butt_kicks', en: 'Butt Kicks', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '6', rest: '120s', rpe: '7' },
        { libId: 'ex_hip_thrust', en: 'Hip Thrust', sets: 3, reps: '10', rest: '90s', rpe: '7' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ad_bent_knee_soleus_raise', en: 'Bent-Knee Soleus Raise', sets: 3, reps: '15/side', rest: '60s', rpe: '7' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 3, reps: '30s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_zone_2_easy_run', en: 'Zone 2 Easy Run', sets: 1, reps: '60min' }
      ],
      mobility: [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' }
      ],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_marathon_pre',
    sport: 'marathon',
    group: 'endurance',
    phase: 'pre',
    ar: 'ماراثون — قبل الموسم (جري عتبة وقوة خاصة)',
    en: 'Marathon — Pre-season (threshold & specific strength)',
    note: {
      ar: 'جري عتبة بسرعة قريبة من سرعة الماراثون أو أسرع شوية، مع قوة ومرونة للسمانة ووتر أكيليس. الجري الطويل هو الأهم في المرحلة دي، فخلي القوة متوسطة وما توصلش للفشل.',
      en: 'Threshold running at or slightly faster than marathon pace, plus calf and Achilles strength and stiffness. The long run is the priority in this block, so keep strength moderate and never to failure.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_walking_hamstring_scoop', en: 'Walking Hamstring Scoop', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'ad_threshold_cruise_intervals', en: 'Threshold Cruise Intervals', sets: 3, reps: '10min', rest: '2min', rpe: '7' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ad_eccentric_heel_drop', en: 'Eccentric Heel Drop', sets: 3, reps: '15/side', rest: '60s', rpe: '7' },
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 3, reps: '20', rest: '60s', rpe: '6' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 3, reps: '10/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_zone_2_easy_run', en: 'Zone 2 Easy Run', sets: 1, reps: '15min' }
      ],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 1, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_marathon_in',
    sport: 'marathon',
    group: 'endurance',
    phase: 'in',
    ar: 'ماراثون — فترة السباقات (صيانة وتهدئة)',
    en: 'Marathon — Race season (maintenance & taper)',
    note: {
      ar: 'جلسة خفيفة جدًا تحافظ على القوة أثناء فترة التهدئة قبل السباق. آخر جلسة قوة تكون قبل السباق بـ 7-10 أيام، وما فيش أوزان تقيلة في أسبوع السباق.',
      en: 'A very light session that keeps strength during the pre-race taper. Do the last strength session 7–10 days before the race and no heavy lifting in race week.'
    },
    sections: {
      warmup: [
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' },
        { libId: 'ad_walking_quad_pull', en: 'Walking Quad Pull', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '8', rest: '90s', rpe: '6' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 2, reps: '6/side', rest: '90s', rpe: '6' },
        { libId: 'ad_isometric_heel_raise_hold', en: 'Isometric Heel Raise Hold', sets: 2, reps: '30s', rest: '45s', rpe: '6' },
        { libId: 'ex_dead_bug', en: 'Dead Bug', sets: 2, reps: '8/side', rest: '45s', rpe: '5' },
        { libId: 'ex_glute_bridge', en: 'Glute Bridge', sets: 2, reps: '12', rest: '45s', rpe: '5' }
      ],
      cardio: [
        { libId: 'ad_strides', en: 'Strides', sets: 4, reps: '80m' }
      ],
      mobility: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 1, reps: '6/side' }
      ],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_cycling_off',
    sport: 'cycling',
    group: 'endurance',
    phase: 'off',
    ar: 'دراجات — خارج الموسم (قوة قصوى وركوب طويل)',
    en: 'Cycling — Off-season (max strength & long ride)',
    note: {
      ar: 'قوة قصوى للرجلين والظهر تزود القدرة على البدال، مع ركوب طويل بشدة هادية. العجلة ما بتقويش العضم، فالأوزان هنا مهمة؛ ابدأ خفيف لو أول مرة ترفع.',
      en: 'Maximal leg and posterior-chain strength to raise pedalling power, plus a long easy ride. Cycling does not load the bones, so lifting matters here; start light if you are new to it.'
    },
    sections: {
      warmup: [
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' },
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_one_arm_dumbbell_row', en: 'One-Arm Dumbbell Row', sets: 3, reps: '10/side', rest: '60s', rpe: '7' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 3, reps: '30s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_steady_state_bike_ride', en: 'Steady-State Bike Ride', sets: 1, reps: '60-90min' }
      ],
      mobility: [
        { libId: 'ad_foam_roller_thoracic_extension', en: 'Foam Roller Thoracic Extension', sets: 1, reps: '10' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_cycling_pre',
    sport: 'cycling',
    group: 'endurance',
    phase: 'pre',
    ar: 'دراجات — قبل الموسم (قدرة انفجارية وسبرنتات)',
    en: 'Cycling — Pre-season (power & sprints)',
    note: {
      ar: 'تحويل القوة لقدرة انفجارية للهجمات والطلعات، مع سبرنتات قصيرة على العجلة. الوثب بعد السكوات على طول بس بأداء نضيف، ولو السرعة وقعت وقف المجموعة.',
      en: 'Convert strength into power for attacks and climbs, with short bike sprints. Jump straight after the squat but only with clean form, and end the set once speed drops.'
    },
    sections: {
      warmup: [
        { libId: 'ad_bike_cadence_drills', en: 'Bike Cadence Drills', sets: 1, reps: '10min' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ad_back_squat_to_jump_squat_contrast', en: 'Back Squat to Jump Squat Contrast', sets: 4, reps: '3+5', rest: '180s', rpe: '8' },
        { libId: 'ad_air_bike_calorie_sprints', en: 'Air Bike Calorie Sprints', sets: 6, reps: '20s', rest: '2min', rpe: '9' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '6/side', rest: '120s', rpe: '8' },
        { libId: 'ex_hip_thrust', en: 'Hip Thrust', sets: 3, reps: '8', rest: '90s', rpe: '7' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 3, reps: '10/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_steady_state_bike_ride', en: 'Steady-State Bike Ride', sets: 1, reps: '30min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_quad_stretch', en: 'Quad Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_cycling_in',
    sport: 'cycling',
    group: 'endurance',
    phase: 'in',
    ar: 'دراجات — أثناء الموسم (صيانة وتقوية الضهر)',
    en: 'Cycling — In-season (maintenance & back care)',
    note: {
      ar: 'صيانة قصيرة للقوة وتقوية للضهر والكتف اللي بيتعبوا من وضع الركوب، بعيد عن أيام السباق. ما تعملهاش قبل سباق أو ركوب صعب بأقل من 48 ساعة.',
      en: 'Short strength maintenance plus upper-back and shoulder work to offset the riding posture, away from race days. Never within 48 hours of a race or hard ride.'
    },
    sections: {
      warmup: [
        { libId: 'ad_bike_cadence_drills', en: 'Bike Cadence Drills', sets: 1, reps: '8min' },
        { libId: 'wg_banded_lateral_walk', en: 'Banded Lateral Walk', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '4', rest: '120s', rpe: '6' },
        { libId: 'ex_step_up', en: 'Step-Up', sets: 2, reps: '6/side', rest: '90s', rpe: '6' },
        { libId: 'ex_hip_thrust', en: 'Hip Thrust', sets: 2, reps: '8', rest: '90s', rpe: '6' },
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 2, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ex_dead_bug', en: 'Dead Bug', sets: 2, reps: '8/side', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_foam_roller_thoracic_extension', en: 'Foam Roller Thoracic Extension', sets: 1, reps: '10' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_triathlon_off',
    sport: 'triathlon',
    group: 'endurance',
    phase: 'off',
    ar: 'ترايثلون — خارج الموسم (قوة عامة وسباحة تقنية)',
    en: 'Triathlon — Off-season (general strength & technique swim)',
    note: {
      ar: 'قوة عامة للرجلين والظهر وسحب للدراعين يخدم السباحة، مع سباحة هادية للتقنية والقاعدة الهوائية. وزّع الحمل على الرياضات التلاتة وما تحطش الجلسة دي قبل جري طويل.',
      en: 'General leg and back strength plus pulling work that carries over to swimming, with an easy technique swim. Balance load across all three sports and do not place this session before a long run.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 2, reps: '10' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 3, reps: '6', rest: '120s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 3, reps: '6-8', rest: '90s', rpe: '7' },
        { libId: 'ex_step_up', en: 'Step-Up', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_band_external_rotation', en: 'Band External Rotation', sets: 2, reps: '15/side', rest: '45s', rpe: '6' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 2, reps: '30s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_easy_freestyle_swim', en: 'Easy Freestyle Swim', sets: 1, reps: '30min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_triathlon_pre',
    sport: 'triathlon',
    group: 'endurance',
    phase: 'pre',
    ar: 'ترايثلون — قبل الموسم (قوة خاصة وتمرين بريك)',
    en: 'Triathlon — Pre-season (specific strength & brick)',
    note: {
      ar: 'قوة خاصة للجري والسحب في السباحة، وبعدها تمرين "بريك" (عجلة وبعدها جري على طول) عشان الرجل تتعود على التحويل. أول كيلو جري بعد العجلة خليه أهدى من سرعتك.',
      en: 'Run- and swim-specific strength, then a brick (bike straight into a run) so the legs adapt to the transition. Run the first kilometre off the bike slightly slower than goal pace.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '12' }
      ],
      main: [
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'wg_straight_arm_pulldown', en: 'Straight-Arm Pulldown', sets: 3, reps: '12', rest: '60s', rpe: '7' },
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 3, reps: '15', rest: '60s', rpe: '6' },
        { libId: 'ad_eccentric_heel_drop', en: 'Eccentric Heel Drop', sets: 3, reps: '12/side', rest: '60s', rpe: '7' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 3, reps: '10/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'wg_cycling', en: 'Cycling', sets: 1, reps: '40min' },
        { libId: 'wg_running', en: 'Running', sets: 1, reps: '15min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_triathlon_in',
    sport: 'triathlon',
    group: 'endurance',
    phase: 'in',
    ar: 'ترايثلون — أثناء الموسم (صيانة وحماية الكتف)',
    en: 'Triathlon — In-season (maintenance & shoulder care)',
    note: {
      ar: 'صيانة قصيرة للقوة وحماية الكتف أثناء موسم السباقات، مع سباحة استشفاء خفيفة. وقّف الأوزان قبل السباق بأسبوع.',
      en: 'Short strength maintenance and shoulder care during race season, with an easy recovery swim. Stop lifting a week before the race.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '8', rest: '90s', rpe: '6' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 2, reps: '6/side', rest: '90s', rpe: '6' },
        { libId: 'ek_body_row', en: 'Inverted Row', sets: 2, reps: '8', rest: '60s', rpe: '6' },
        { libId: 'ex_band_external_rotation', en: 'Band External Rotation', sets: 2, reps: '15/side', rest: '45s', rpe: '5' },
        { libId: 'ex_dead_bug', en: 'Dead Bug', sets: 2, reps: '8/side', rest: '45s', rpe: '5' }
      ],
      cardio: [
        { libId: 'ad_easy_freestyle_swim', en: 'Easy Freestyle Swim', sets: 1, reps: '20min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_rowing_off',
    sport: 'rowing',
    group: 'endurance',
    phase: 'off',
    ar: 'تجديف — خارج الموسم (قوة قصوى وتجديف طويل)',
    en: 'Rowing — Off-season (max strength & steady row)',
    note: {
      ar: 'قوة قصوى للرجلين والظهر (حوالي 60% من الضربة من الرجلين) مع تجديف طويل هادي بمعدل ضربات منخفض. خلي الضهر محايد في الديدلفت والتجديف، والتعب في أسفل الضهر إشارة إنك توقف.',
      en: 'Maximal leg and back strength (roughly 60% of the stroke comes from the legs) plus a long, low-rate steady row. Keep a neutral spine on deadlifts and rows; low-back fatigue is the signal to stop.'
    },
    sections: {
      warmup: [
        { libId: 'ex_rowing_machine', en: 'Rowing Machine', sets: 1, reps: '5min' },
        { libId: 'ad_hip_hinge_dowel_drill', en: 'Hip Hinge Dowel Drill', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_deadlift', en: 'Deadlift', sets: 4, reps: '5', rest: '150s', rpe: '7' },
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 3, reps: '6', rest: '120s', rpe: '7' },
        { libId: 'ex_bent_over_row', en: 'Bent Over Barbell Row', sets: 3, reps: '8', rest: '90s', rpe: '7' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 3, reps: '6-8', rest: '90s', rpe: '7' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 3, reps: '30s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_steady_state_row', en: 'Steady-State Row', sets: 1, reps: '45-60min' }
      ],
      mobility: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 1, reps: '6/side' }
      ],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_rowing_pre',
    sport: 'rowing',
    group: 'endurance',
    phase: 'pre',
    ar: 'تجديف — قبل الموسم (قدرة وإنترفال إرجومتر)',
    en: 'Rowing — Pre-season (power & erg intervals)',
    note: {
      ar: 'تحويل القوة لقدرة انفجارية لبداية السباق، مع إنترفال على الإرجومتر قريب من شدة السباق. في الكلين والتجديف الانفجاري السرعة أهم من الوزن.',
      en: 'Convert strength into power for the race start, with erg intervals close to race intensity. On cleans and explosive rows, bar speed matters more than load.'
    },
    sections: {
      warmup: [
        { libId: 'ex_rowing_machine', en: 'Rowing Machine', sets: 1, reps: '5min' },
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ad_power_clean', en: 'Power Clean', sets: 4, reps: '3', rest: '150s', rpe: '7' },
        { libId: 'ad_trap_bar_jump', en: 'Trap Bar Jump', sets: 4, reps: '3', rest: '120s', rpe: '7' },
        { libId: 'wg_pendlay_row', en: 'Pendlay Row', sets: 4, reps: '5', rest: '120s', rpe: '8' },
        { libId: 'ad_medicine_ball_scoop_toss', en: 'Medicine Ball Scoop Toss', sets: 3, reps: '5', rest: '60s', rpe: '7' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 3, reps: '10/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_rowing_pyramid_intervals', en: 'Rowing Pyramid Intervals', sets: 1, reps: '1-2-3-4-3-2-1min', rest: '1min', rpe: '8' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_rowing_in',
    sport: 'rowing',
    group: 'endurance',
    phase: 'in',
    ar: 'تجديف — أثناء الموسم (صيانة وضهر علوي)',
    en: 'Rowing — In-season (maintenance & upper back)',
    note: {
      ar: 'صيانة للقوة وتقوية للضهر العلوي بعيد عن السباق، مع تجديف خفيف. الضلوع وأسفل الضهر أكتر أماكن بتتعب في التجديف، فلو في وجع خفّف الحمل على طول.',
      en: 'Strength maintenance and upper-back work away from races, with an easy row. Ribs and low back are the common overload sites in rowing, so reduce load at the first sign of pain.'
    },
    sections: {
      warmup: [
        { libId: 'ex_rowing_machine', en: 'Rowing Machine', sets: 1, reps: '5min' },
        { libId: 'ad_hip_hinge_dowel_drill', en: 'Hip Hinge Dowel Drill', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '4', rest: '120s', rpe: '6' },
        { libId: 'wg_chest_supported_row', en: 'Chest-Supported Row', sets: 3, reps: '8', rest: '90s', rpe: '6' },
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 2, reps: '5', rest: '120s', rpe: '6' },
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 2, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ex_dead_bug', en: 'Dead Bug', sets: 2, reps: '8/side', rest: '45s', rpe: '5' }
      ],
      cardio: [
        { libId: 'ad_steady_state_row', en: 'Steady-State Row', sets: 1, reps: '20min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_walking_off',
    sport: 'walking',
    group: 'endurance',
    phase: 'off',
    ar: 'مشي — أساس (قوة ومشي سريع)',
    en: 'Walking — Foundation (strength & brisk walking)',
    note: {
      ar: 'أساس قوة للرجلين والسمانة وثبات الجذع يخلي المشي أسهل وأطول، مع مشي سريع نص ساعة. المشي السريع يعني تنهج شوية لكن تقدر تتكلم.',
      en: 'A strength base for the legs, calves and trunk that makes walking easier and longer, with 30 minutes of brisk walking. Brisk means slightly breathless but still able to talk.'
    },
    sections: {
      warmup: [
        { libId: 'ad_marching_in_place', en: 'Marching in Place', sets: 1, reps: '2min' },
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '10', rest: '90s', rpe: '6' },
        { libId: 'ex_step_up', en: 'Step-Up', sets: 3, reps: '8/side', rest: '60s', rpe: '6' },
        { libId: 'ex_glute_bridge', en: 'Glute Bridge', sets: 3, reps: '12', rest: '60s', rpe: '6' },
        { libId: 'ex_calf_raise', en: 'Standing Calf Raise', sets: 3, reps: '12', rest: '60s', rpe: '6' },
        { libId: 'ex_bird_dog', en: 'Bird Dog', sets: 2, reps: '8/side', rest: '45s', rpe: '5' }
      ],
      cardio: [
        { libId: 'ad_brisk_walk', en: 'Brisk Walk', sets: 1, reps: '30min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_walking_pre',
    sport: 'walking',
    group: 'endurance',
    phase: 'pre',
    ar: 'مشي — تطوير (مشي على ميل وقوة أكتر)',
    en: 'Walking — Progression (incline walking & more strength)',
    note: {
      ar: 'زيادة الشدة بمشي على ميل وقوة أكتر للفخذ وقصبة الرجل عشان الطلعات والمسافات الأطول. زوّد الميل أو السرعة، واحد بس في المرة مش الاتنين.',
      en: 'Raise intensity with incline walking and more thigh and shin strength for hills and longer distances. Increase incline or speed, one at a time, never both.'
    },
    sections: {
      warmup: [
        { libId: 'ad_walking_knee_hug', en: 'Walking Knee Hug', sets: 1, reps: '20m' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_step_up', en: 'Step-Up', sets: 3, reps: '10/side', rest: '60s', rpe: '7' },
        { libId: 'ex_reverse_lunge', en: 'Reverse Lunge', sets: 3, reps: '8/side', rest: '60s', rpe: '7' },
        { libId: 'wg_dumbbell_romanian_deadlift', en: 'Dumbbell Romanian Deadlift', sets: 3, reps: '10', rest: '90s', rpe: '7' },
        { libId: 'ad_tibialis_raise', en: 'Tibialis Raise', sets: 3, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ex_farmers_carry', en: 'Farmer\'s Carry', sets: 3, reps: '30m', rest: '60s', rpe: '6' }
      ],
      cardio: [
        { libId: 'wg_treadmill_incline_walk', en: 'Treadmill Incline Walk', sets: 1, reps: '30min' }
      ],
      mobility: [
        { libId: 'ad_knee_to_wall_ankle_mobilization', en: 'Knee-to-Wall Ankle Mobilization', sets: 1, reps: '10/side' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_walking_in',
    sport: 'walking',
    group: 'endurance',
    phase: 'in',
    ar: 'مشي — قمة وصيانة (صيانة ومشي طويل)',
    en: 'Walking — Peak & maintenance (maintenance & long hike)',
    note: {
      ar: 'صيانة للقوة والتوازن مع مشي طويل أو هايكنج أسبوعي كهدف. البس جزمة مريحة وثابتة، ولو ظهر وجع في الركبة أو القدم قلّل المسافة.',
      en: 'Maintain strength and balance with a weekly long walk or hike as the goal. Wear supportive, comfortable shoes and cut the distance if knee or foot pain appears.'
    },
    sections: {
      warmup: [
        { libId: 'ad_brisk_walk', en: 'Brisk Walk', sets: 1, reps: '5min' },
        { libId: 'ex_arm_circles', en: 'Arm Circles', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '10', rest: '60s', rpe: '6' },
        { libId: 'ex_step_up', en: 'Step-Up', sets: 2, reps: '8/side', rest: '60s', rpe: '6' },
        { libId: 'ad_suitcase_hold', en: 'Suitcase Hold', sets: 2, reps: '30s/side', rest: '45s', rpe: '6' },
        { libId: 'ex_calf_raise', en: 'Standing Calf Raise', sets: 2, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 2, reps: '30s/side', rest: '30s', rpe: '5' }
      ],
      cardio: [
        { libId: 'wg_hiking', en: 'Hiking', sets: 1, reps: '60-90min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_swimming_off',
    sport: 'swimming',
    group: 'water',
    phase: 'off',
    ar: 'سباحة — خارج الموسم (قوة على الأرض وحماية الكتف)',
    en: 'Swimming — Off-season (dryland strength & shoulder care)',
    note: {
      ar: 'قوة عامة على الأرض (دراي لاند) للسحب والرجلين والجذع، مع تقوية الروتيتور كاف لحماية الكتف. ما تعملش ضغط فوق الراس تقيل، وأي وجع قدام الكتف وقّف التمرين.',
      en: 'General dryland strength for pulling, legs and trunk, plus rotator-cuff work to protect the shoulder. Avoid heavy overhead pressing and stop at any pain at the front of the shoulder.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 2, reps: '10' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '12' }
      ],
      main: [
        { libId: 'ex_pullup', en: 'Pull-up', sets: 4, reps: '6-8', rest: '90s', rpe: '7' },
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 3, reps: '6', rest: '120s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'wg_straight_arm_pulldown', en: 'Straight-Arm Pulldown', sets: 3, reps: '12', rest: '60s', rpe: '7' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 2, reps: '12/side', rest: '45s', rpe: '6' },
        { libId: 'ex_hollow_body_hold', en: 'Hollow Body Hold', sets: 3, reps: '30s', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_easy_freestyle_swim', en: 'Easy Freestyle Swim', sets: 1, reps: '30min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_swimming_pre',
    sport: 'swimming',
    group: 'water',
    phase: 'pre',
    ar: 'سباحة — قبل الموسم (قدرة للبداية والدوران)',
    en: 'Swimming — Pre-season (start & turn power)',
    note: {
      ar: 'قدرة انفجارية للبداية والدورانات، وسحب خاص بالسباحة، وكيك سيتس بسرعة. الوثب على أرض ناعمة وبعدد قليل عشان يفضل سريع.',
      en: 'Explosive power for starts and turns, swim-specific pulling and fast kick sets. Keep jumps low-volume on a soft surface so every rep stays fast.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' },
        { libId: 'ad_prone_w_raise', en: 'Prone W Raise', sets: 2, reps: '10' }
      ],
      main: [
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 4, reps: '3', rest: '90s', rpe: '7' },
        { libId: 'ad_broad_jump', en: 'Broad Jump', sets: 3, reps: '3', rest: '90s', rpe: '7' },
        { libId: 'wg_straight_arm_pulldown', en: 'Straight-Arm Pulldown', sets: 3, reps: '10', rest: '60s', rpe: '7' },
        { libId: 'ad_medicine_ball_soccer_throw', en: 'Medicine Ball Soccer Throw', sets: 3, reps: '6', rest: '60s', rpe: '7' },
        { libId: 'ex_ab_wheel_rollout', en: 'Ab Wheel Rollout', sets: 3, reps: '8', rest: '60s', rpe: '7' }
      ],
      cardio: [
        { libId: 'ad_freestyle_kick_sets', en: 'Freestyle Kick Sets', sets: 6, reps: '50m', rest: '20s', rpe: '8' }
      ],
      mobility: [
        { libId: 'ad_thread_the_needle', en: 'Thread the Needle', sets: 1, reps: '6/side' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_swimming_in',
    sport: 'swimming',
    group: 'water',
    phase: 'in',
    ar: 'سباحة — أثناء الموسم (صيانة قصيرة)',
    en: 'Swimming — In-season (short maintenance)',
    note: {
      ar: 'صيانة قصيرة للقوة والوثب وحماية الكتف في فترة البطولات، لأن حجم المية عالي أصلًا. ما تعملهاش قبل سباق بأقل من يومين.',
      en: 'Short maintenance of strength, jumping and shoulder care during the competition period, since pool volume is already high. Never within two days of a race.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '12' }
      ],
      main: [
        { libId: 'ex_pullup', en: 'Pull-up', sets: 3, reps: '5', rest: '90s', rpe: '6' },
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '8', rest: '90s', rpe: '6' },
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 3, reps: '3', rest: '60s', rpe: '6' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 2, reps: '12/side', rest: '45s', rpe: '5' },
        { libId: 'ex_dead_bug', en: 'Dead Bug', sets: 2, reps: '8/side', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_thread_the_needle', en: 'Thread the Needle', sets: 1, reps: '6/side' }
      ],
      flexibility: [
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_water_polo_off',
    sport: 'water_polo',
    group: 'water',
    phase: 'off',
    ar: 'كرة ماء — خارج الموسم (قوة عامة وضامة)',
    en: 'Water polo — Off-season (general strength & adductors)',
    note: {
      ar: 'قوة عامة للرجلين والسحب والدفع، وتقوية الضامة للدوس في المية (إيج بيتر)، وحماية الكتف للرمي. في البنش ما تنزلش الدمبل تحت مستوى الصدر بزيادة.',
      en: 'General leg, pulling and pressing strength, adductor work for the eggbeater kick, and shoulder care for throwing. On the bench, do not lower the dumbbells far below chest level.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 2, reps: '10' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 3, reps: '6-8', rest: '90s', rpe: '7' },
        { libId: 'ex_dumbbell_bench_press', en: 'Dumbbell Bench Press', sets: 3, reps: '8', rest: '90s', rpe: '7' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 3, reps: '20s/side', rest: '60s', rpe: '7' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 2, reps: '12/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_easy_freestyle_swim', en: 'Easy Freestyle Swim', sets: 1, reps: '30min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_water_polo_pre',
    sport: 'water_polo',
    group: 'water',
    phase: 'pre',
    ar: 'كرة ماء — قبل الموسم (رمي ودوران وسبرنت مية)',
    en: 'Water polo — Pre-season (throwing, rotation & water sprints)',
    note: {
      ar: 'قدرة انفجارية للرمي والدوران والطلوع من المية، مع سبرنتات رجلين في المية. رمي الكرة الطبية بتحكم في الكتف، والعدد قليل عشان السرعة.',
      en: 'Explosive power for throwing, rotating and lifting out of the water, plus in-water kick sprints. Control the shoulder on medicine-ball throws and keep reps low to stay fast.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '12' },
        { libId: 'ad_cross_body_arm_swings', en: 'Cross-Body Arm Swings', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 4, reps: '5/side', rest: '60s', rpe: '7' },
        { libId: 'ad_medicine_ball_soccer_throw', en: 'Medicine Ball Soccer Throw', sets: 3, reps: '6', rest: '60s', rpe: '7' },
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 4, reps: '3', rest: '90s', rpe: '7' },
        { libId: 'wg_landmine_press', en: 'Landmine Press', sets: 3, reps: '8/side', rest: '60s', rpe: '7' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 3, reps: '20s/side', rest: '60s', rpe: '7' }
      ],
      cardio: [
        { libId: 'ad_freestyle_kick_sets', en: 'Freestyle Kick Sets', sets: 8, reps: '25m', rest: '20s', rpe: '8' }
      ],
      mobility: [
        { libId: 'ad_sleeper_stretch', en: 'Sleeper Stretch', sets: 1, reps: '30s/side' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_water_polo_in',
    sport: 'water_polo',
    group: 'water',
    phase: 'in',
    ar: 'كرة ماء — أثناء الموسم (صيانة بين الماتشات)',
    en: 'Water polo — In-season (maintenance between matches)',
    note: {
      ar: 'صيانة قصيرة للقوة والرمي وحماية الكتف والضامة بين الماتشات. ما فيش شغل للفشل، والجلسة بعد الماتش بيومين.',
      en: 'Short maintenance of strength, throwing, shoulder and adductor health between matches. Nothing to failure; schedule it two days after a match.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '12' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '4', rest: '120s', rpe: '6' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 2, reps: '5', rest: '90s', rpe: '6' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 2, reps: '4/side', rest: '60s', rpe: '6' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 2, reps: '12/side', rest: '45s', rpe: '5' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 2, reps: '15s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_sleeper_stretch', en: 'Sleeper Stretch', sets: 1, reps: '30s/side' }
      ],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_diving_off',
    sport: 'diving',
    group: 'water',
    phase: 'off',
    ar: 'غطس — خارج الموسم (قوة وجسم مشدود)',
    en: 'Diving — Off-season (strength & body tension)',
    note: {
      ar: 'قوة عامة للرجلين والكتف فوق الراس، وجسم مشدود (هولو) للدخول المستقيم في المية. الضغط فوق الراس بضهر محايد من غير تقويس.',
      en: 'General leg and overhead shoulder strength, plus hollow-body tension for a straight water entry. Press overhead with a neutral spine and no arching.'
    },
    sections: {
      warmup: [
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '5' },
        { libId: 'ad_shoulder_cars', en: 'Shoulder CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 4, reps: '5', rest: '150s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'ex_overhead_barbell_press', en: 'Overhead Barbell Press', sets: 3, reps: '6', rest: '120s', rpe: '7' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 3, reps: '6-8', rest: '90s', rpe: '7' },
        { libId: 'ex_hollow_body_hold', en: 'Hollow Body Hold', sets: 3, reps: '30s', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_wall_slides', en: 'Wall Slides', sets: 2, reps: '10' }
      ],
      flexibility: [
        { libId: 'wg_seated_forward_fold', en: 'Seated Forward Fold', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_s_diving_pre',
    sport: 'diving',
    group: 'water',
    phase: 'pre',
    ar: 'غطس — قبل الموسم (قفز انفجاري وتكوير)',
    en: 'Diving — Pre-season (explosive jumps & tuck/pike)',
    note: {
      ar: 'قدرة انفجارية للطلوع من اللوح والمنصة، ووضعيات تكوير وبايك بسرعة. قفزة العمق من صندوق واطي والهبوط ناعم على مشط القدم.',
      en: 'Explosive take-off power for springboard and platform, with fast tuck and pike positions. Depth jumps from a low box with soft landings on the balls of the feet.'
    },
    sections: {
      warmup: [
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 2, reps: '15' },
        { libId: 'ad_shoulder_cars', en: 'Shoulder CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 5, reps: '3', rest: '90s', rpe: '8' },
        { libId: 'ad_depth_jump', en: 'Depth Jump', sets: 3, reps: '3', rest: '120s', rpe: '8' },
        { libId: 'ad_tuck_jump', en: 'Tuck Jump', sets: 3, reps: '4', rest: '90s', rpe: '7' },
        { libId: 'wg_hollow_rock', en: 'Hollow Rock', sets: 3, reps: '15', rest: '45s', rpe: '7' },
        { libId: 'wg_v_up', en: 'V-Up', sets: 3, reps: '10', rest: '45s', rpe: '7' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_wall_slides', en: 'Wall Slides', sets: 1, reps: '10' }
      ],
      flexibility: [
        { libId: 'wg_seated_forward_fold', en: 'Seated Forward Fold', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_s_diving_in',
    sport: 'diving',
    group: 'water',
    phase: 'in',
    ar: 'غطس — أثناء الموسم (صيانة الوثب والثبات)',
    en: 'Diving — In-season (jump & stability maintenance)',
    note: {
      ar: 'صيانة قصيرة للوثب والقوة وثبات الكتف في موسم البطولات. حجم قليل عشان الرجل تفضل سريعة على اللوح.',
      en: 'Short maintenance of jumping, strength and shoulder stability during competition season. Low volume so the legs stay quick on the board.'
    },
    sections: {
      warmup: [
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 1, reps: '15' },
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '5' }
      ],
      main: [
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 3, reps: '3', rest: '90s', rpe: '6' },
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 2, reps: '4', rest: '120s', rpe: '6' },
        { libId: 'ex_hollow_body_hold', en: 'Hollow Body Hold', sets: 2, reps: '20s', rest: '45s', rpe: '6' },
        { libId: 'wg_prone_y_raise', en: 'Prone Y Raise', sets: 2, reps: '10', rest: '45s', rpe: '5' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 2, reps: '20s/side', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_wall_slides', en: 'Wall Slides', sets: 1, reps: '10' }
      ],
      flexibility: [
        { libId: 'wg_seated_forward_fold', en: 'Seated Forward Fold', sets: 1, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_s_surfing_off',
    sport: 'surfing',
    group: 'water',
    phase: 'off',
    ar: 'ركوب الأمواج — خارج الموسم (قوة جدف ووقوف)',
    en: 'Surfing — Off-season (paddle & pop-up strength)',
    note: {
      ar: 'قوة عامة للجدف والوقوف على اللوح، وسباحة لبناء تحمل الجدف، وحماية الكتف. خلي الكتف لتحت وبعيد عن الودن في كل تمارين الشد.',
      en: 'General strength for paddling and standing up, swimming for paddle endurance, and shoulder care. Keep the shoulders down and away from the ears on every pull.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 2, reps: '10' },
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '10', rest: '90s', rpe: '7' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 3, reps: '6-8', rest: '90s', rpe: '7' },
        { libId: 'ex_pushup', en: 'Push-up', sets: 3, reps: '10-15', rest: '60s', rpe: '7' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 2, reps: '12/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_easy_freestyle_swim', en: 'Easy Freestyle Swim', sets: 1, reps: '30min' }
      ],
      mobility: [
        { libId: 'ad_deep_squat_hold', en: 'Deep Squat Hold', sets: 2, reps: '30s' }
      ],
      flexibility: [
        { libId: 'ad_prone_press_up', en: 'Prone Press-Up', sets: 2, reps: '10' }
      ]
    }
  },
  {
    id: 'tpl_s_surfing_pre',
    sport: 'surfing',
    group: 'water',
    phase: 'pre',
    ar: 'ركوب الأمواج — قبل الموسم (وقوف سريع ودوران وتوازن)',
    en: 'Surfing — Pre-season (fast pop-up, rotation & balance)',
    note: {
      ar: 'قدرة انفجارية للوقوف السريع على اللوح، ودوران الجذع للمناورات، وتوازن على رجل واحدة، مع سبرنتات سباحة زي الجدف ورا الموجة. الضغط الانفجاري على أرض طرية وبأداء نضيف.',
      en: 'Explosive power for a fast pop-up, trunk rotation for manoeuvres and single-leg balance, with swim sprints that mimic paddling for a wave. Do explosive push-ups on a soft surface with clean form.'
    },
    sections: {
      warmup: [
        { libId: 'ad_prone_w_raise', en: 'Prone W Raise', sets: 2, reps: '10' },
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '5' }
      ],
      main: [
        { libId: 'wg_explosive_push_up', en: 'Explosive Push-up', sets: 4, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'wg_skater_hop', en: 'Skater Hop', sets: 3, reps: '6/side', rest: '60s', rpe: '7' },
        { libId: 'ad_landmine_rotation', en: 'Landmine Rotation', sets: 3, reps: '8/side', rest: '60s', rpe: '7' },
        { libId: 'wg_cossack_squat', en: 'Cossack Squat', sets: 3, reps: '6/side', rest: '60s', rpe: '7' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 3, reps: '30s/side', rest: '30s', rpe: '6' }
      ],
      cardio: [
        { libId: 'wg_swimming', en: 'Swimming', sets: 8, reps: '50m', rest: '20s', rpe: '8' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ad_pigeon_stretch', en: 'Pigeon Stretch', sets: 1, reps: '45s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_surfing_in',
    sport: 'surfing',
    group: 'water',
    phase: 'in',
    ar: 'ركوب الأمواج — أثناء الموسم (صيانة خفيفة)',
    en: 'Surfing — In-season (light maintenance)',
    note: {
      ar: 'صيانة خفيفة للقوة والتوازن وحماية الكتف في أيام البحر الكتير. لو جدفت كتير الأسبوع ده قلّل تمارين السحب.',
      en: 'Light maintenance of strength, balance and shoulder health during heavy surf weeks. If you paddled a lot this week, cut back the pulling work.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' },
        { libId: 'ad_prone_w_raise', en: 'Prone W Raise', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '8', rest: '60s', rpe: '6' },
        { libId: 'ek_body_row', en: 'Inverted Row', sets: 2, reps: '8', rest: '60s', rpe: '6' },
        { libId: 'wg_explosive_push_up', en: 'Explosive Push-up', sets: 2, reps: '4', rest: '60s', rpe: '6' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 2, reps: '30s/side', rest: '30s', rpe: '5' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 2, reps: '12/side', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_deep_squat_hold', en: 'Deep Squat Hold', sets: 1, reps: '30s' }
      ],
      flexibility: [
        { libId: 'ad_prone_press_up', en: 'Prone Press-Up', sets: 1, reps: '10' }
      ]
    }
  },
  {
    id: 'tpl_s_bodybuilding_off',
    sport: 'bodybuilding',
    group: 'strength',
    phase: 'off',
    ar: 'كمال أجسام — أساس (تضخيم للجسم كله)',
    en: 'Bodybuilding — Foundation (full-body hypertrophy)',
    note: {
      ar: 'أساس تضخيم للجسم كله بحركات أساسية ومدى حركة كامل، يتكرر 3 مرات في الأسبوع. سيب 1-2 تكرار في الخزان وركّز على الأداء قبل الوزن.',
      en: 'A full-body hypertrophy base with compound lifts through a full range of motion, three times a week. Leave 1–2 reps in reserve and put form before load.'
    },
    sections: {
      warmup: [
        { libId: 'ex_arm_circles', en: 'Arm Circles', sets: 1, reps: '15' },
        { libId: 'wg_scapular_push_up', en: 'Scapular Push-up', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 3, reps: '8-10', rest: '120s', rpe: '7' },
        { libId: 'ex_incline_dumbbell_press', en: 'Incline Dumbbell Press', sets: 3, reps: '8-10', rest: '90s', rpe: '8' },
        { libId: 'ex_lat_pulldown', en: 'Lat Pulldown', sets: 3, reps: '10-12', rest: '90s', rpe: '8' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '10', rest: '90s', rpe: '7' },
        { libId: 'ex_lateral_raise', en: 'Lateral Raise', sets: 3, reps: '12-15', rest: '60s', rpe: '8' },
        { libId: 'ex_hammer_curl', en: 'Hammer Curl', sets: 2, reps: '12', rest: '60s', rpe: '8' },
        { libId: 'ex_triceps_pushdown', en: 'Triceps Pushdown', sets: 2, reps: '12', rest: '60s', rpe: '8' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_bodybuilding_pre',
    sport: 'bodybuilding',
    group: 'strength',
    phase: 'pre',
    ar: 'كمال أجسام — تطوير (صدر وضهر بحجم أعلى)',
    en: 'Bodybuilding — Progression (chest & back volume)',
    note: {
      ar: 'زيادة الحجم التدريبي للصدر والضهر في يوم واحد، والأوزان بتزيد تدريجي كل أسبوع. آخر مجموعة في تمارين العزل ممكن توصل قريب من الفشل، لكن الحركات المركبة لأ.',
      en: 'Higher chest and back volume in one session, with loads rising a little each week. The last set of isolation work may go close to failure, compound lifts never.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' },
        { libId: 'wg_scapular_push_up', en: 'Scapular Push-up', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_incline_barbell_bench_press', en: 'Incline Barbell Bench Press', sets: 4, reps: '6-8', rest: '120s', rpe: '8' },
        { libId: 'wg_chest_supported_row', en: 'Chest-Supported Row', sets: 4, reps: '8-10', rest: '90s', rpe: '8' },
        { libId: 'ex_dumbbell_bench_press', en: 'Dumbbell Bench Press', sets: 3, reps: '10', rest: '90s', rpe: '8' },
        { libId: 'ek_wide_grip_lat_pull_down', en: 'Wide-Grip Lat Pulldown', sets: 3, reps: '10-12', rest: '90s', rpe: '8' },
        { libId: 'wg_cable_fly', en: 'Cable Fly', sets: 3, reps: '12-15', rest: '60s', rpe: '9' },
        { libId: 'wg_straight_arm_pulldown', en: 'Straight-Arm Pulldown', sets: 3, reps: '12-15', rest: '60s', rpe: '9' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'wg_doorway_chest_stretch', en: 'Doorway Chest Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_bodybuilding_in',
    sport: 'bodybuilding',
    group: 'strength',
    phase: 'in',
    ar: 'كمال أجسام — قمة وصيانة (رجل بحجم أقل وشدة عالية)',
    en: 'Bodybuilding — Peak & maintenance (legs, lower volume, high effort)',
    note: {
      ar: 'في فترة التنشيف أو الصيانة حافظ على الأوزان التقيلة وقلّل عدد المجموعات، وركّز على التحكم في النزول. مع السعرات القليلة خلي بالك من الدوخة، وما تعملش تكرارات إجبارية في السكوات.',
      en: 'During a cut or maintenance phase keep loads heavy, trim the number of sets and control every lowering phase. On low calories watch for dizziness and never do forced reps on squats.'
    },
    sections: {
      warmup: [
        { libId: 'wg_banded_lateral_walk', en: 'Banded Lateral Walk', sets: 1, reps: '10/side' },
        { libId: 'ex_bodyweight_squat', en: 'Bodyweight Squat', sets: 1, reps: '15' }
      ],
      main: [
        { libId: 'wg_hack_squat', en: 'Hack Squat', sets: 3, reps: '8-10', rest: '120s', rpe: '8' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8-10', rest: '120s', rpe: '8' },
        { libId: 'ex_leg_extension', en: 'Leg Extension', sets: 3, reps: '12-15', rest: '60s', rpe: '9' },
        { libId: 'ek_lying_leg_curl_machine', en: 'Lying Leg Curl', sets: 3, reps: '10-12', rest: '60s', rpe: '9' },
        { libId: 'ex_walking_lunge', en: 'Walking Lunge', sets: 2, reps: '10/side', rest: '90s', rpe: '8' },
        { libId: 'ek_seated_calf_raise_using_machine', en: 'Seated Machine Calf Raise', sets: 3, reps: '12-15', rest: '45s', rpe: '9' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_quad_stretch', en: 'Quad Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_powerlifting_off',
    sport: 'powerlifting',
    group: 'strength',
    phase: 'off',
    ar: 'باورليفتنج — خارج الموسم (حجم وتكنيك)',
    en: 'Powerlifting — Off-season (volume & technique)',
    note: {
      ar: 'بناء حجم عضلي وحجم تدريبي للرفعات التلاتة بتكرارات أعلى وأوزان متوسطة (65-75%). ركّز على تكنيك ثابت في كل تكرار، والحزام للمجموعات التقيلة بس.',
      en: 'Build muscle and work capacity for the three lifts with higher reps at moderate loads (65–75%). Keep technique identical on every rep and save the belt for heavy sets.'
    },
    sections: {
      warmup: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '8' },
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '8', rest: '150s', rpe: '7' },
        { libId: 'ex_barbell_bench_press', en: 'Barbell Bench Press', sets: 4, reps: '8', rest: '150s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '10', rest: '120s', rpe: '7' },
        { libId: 'ex_bent_over_row', en: 'Bent Over Barbell Row', sets: 3, reps: '10', rest: '90s', rpe: '7' },
        { libId: 'ex_close_grip_bench_press', en: 'Close-Grip Bench Press', sets: 3, reps: '10', rest: '90s', rpe: '7' },
        { libId: 'ad_suitcase_hold', en: 'Suitcase Hold', sets: 3, reps: '30s/side', rest: '60s', rpe: '7' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_powerlifting_pre',
    sport: 'powerlifting',
    group: 'strength',
    phase: 'pre',
    ar: 'باورليفتنج — قبل الموسم (بلوك قوة)',
    en: 'Powerlifting — Pre-season (strength block)',
    note: {
      ar: 'بلوك قوة قبل البطولة بأوزان 80-87% وتكرارات قليلة، ومساعدات مركزة على نقط الضعف. سيب 1-2 تكرار احتياطي، ومعاك سبوتر في البنش والسكوات.',
      en: 'A pre-meet strength block at 80–87% for low reps, with accessories aimed at weak points. Leave 1–2 reps in reserve and always use a spotter on bench and squat.'
    },
    sections: {
      warmup: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 1, reps: '8' },
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 5, reps: '3', rest: '180s', rpe: '8' },
        { libId: 'ex_barbell_bench_press', en: 'Barbell Bench Press', sets: 5, reps: '3', rest: '180s', rpe: '8' },
        { libId: 'ex_deadlift', en: 'Deadlift', sets: 3, reps: '3', rest: '180s', rpe: '8' },
        { libId: 'wg_pendlay_row', en: 'Pendlay Row', sets: 3, reps: '6', rest: '120s', rpe: '7' },
        { libId: 'ex_close_grip_bench_press', en: 'Close-Grip Bench Press', sets: 3, reps: '5', rest: '120s', rpe: '7' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 1, reps: '6/side' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_powerlifting_in',
    sport: 'powerlifting',
    group: 'strength',
    phase: 'in',
    ar: 'باورليفتنج — تجهيز البطولة (سينجلز تقيلة)',
    en: 'Powerlifting — Meet peaking (heavy singles)',
    note: {
      ar: 'سينجلز تقيلة (90-95%) بحجم قليل جدًا عشان تتعود على الوزن التقيل وتوصل البطولة فريش. آخر جلسة تقيلة قبل البطولة بـ 7-10 أيام، وما فيش محاولات رقم قياسي في التمرين.',
      en: 'Heavy singles (90–95%) at very low volume to get used to heavy weights and arrive at the meet fresh. The last heavy session is 7–10 days out, and no max attempts in training.'
    },
    sections: {
      warmup: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 1, reps: '5' },
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 3, reps: '1-2', rest: '240s', rpe: '8' },
        { libId: 'ex_barbell_bench_press', en: 'Barbell Bench Press', sets: 3, reps: '1-2', rest: '240s', rpe: '8' },
        { libId: 'ex_deadlift', en: 'Deadlift', sets: 2, reps: '1', rest: '300s', rpe: '8' },
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 2, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ex_plank', en: 'Plank', sets: 2, reps: '30s', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_weightlifting_off',
    sport: 'weightlifting',
    group: 'strength',
    phase: 'off',
    ar: 'رفع أثقال أولمبي — خارج الموسم (قاعدة قوة وتكنيك)',
    en: 'Olympic weightlifting — Off-season (strength base & technique)',
    note: {
      ar: 'قاعدة قوة عامة (سكوات وسحب وضغط فوق الراس) مع تمارين تكنيك خفيفة للخطف. الأوفرهيد سكوات بوزن خفيف لحد ما المرونة تسمح بالوضع الكامل.',
      en: 'A general strength base (squat, pull, overhead press) with light snatch technique work. Keep overhead squats light until mobility allows the full position.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 2, reps: '10' },
        { libId: 'ad_deep_squat_hold', en: 'Deep Squat Hold', sets: 1, reps: '60s' }
      ],
      main: [
        { libId: 'ad_muscle_snatch', en: 'Muscle Snatch', sets: 3, reps: '5', rest: '90s', rpe: '6' },
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ek_overhead_squat_with_barbell', en: 'Barbell Overhead Squat', sets: 3, reps: '5', rest: '120s', rpe: '6' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'wg_push_press', en: 'Push Press', sets: 3, reps: '6', rest: '120s', rpe: '7' },
        { libId: 'ek_hyperextensions', en: 'Back Extension', sets: 3, reps: '12', rest: '60s', rpe: '6' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ad_couch_stretch', en: 'Couch Stretch', sets: 1, reps: '45s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_weightlifting_pre',
    sport: 'weightlifting',
    group: 'strength',
    phase: 'pre',
    ar: 'رفع أثقال أولمبي — قبل الموسم (رفعات أولمبية وسرعة)',
    en: 'Olympic weightlifting — Pre-season (Olympic lifts & speed)',
    note: {
      ar: 'شغل خاص بالرفعات الأولمبية بتكرارات قليلة وسرعة عالية، مع فرونت سكوات وسحب تقيل. أي تكرار الشكل فيه باظ وقفه ونزّل الوزن، والرمي على منصة وبأوزان مطاط.',
      en: 'Competition-lift work at low reps and high speed, with front squats and heavy pulls. End the set on any rep where position breaks, and only drop bumper plates on a platform.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' },
        { libId: 'ad_muscle_snatch', en: 'Muscle Snatch', sets: 2, reps: '5' }
      ],
      main: [
        { libId: 'ad_power_snatch', en: 'Power Snatch', sets: 5, reps: '2', rest: '120s', rpe: '7' },
        { libId: 'ad_power_clean', en: 'Power Clean', sets: 5, reps: '2', rest: '120s', rpe: '7' },
        { libId: 'ad_split_jerk', en: 'Split Jerk', sets: 4, reps: '2', rest: '120s', rpe: '7' },
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 4, reps: '3', rest: '180s', rpe: '8' },
        { libId: 'ad_clean_pull', en: 'Clean Pull', sets: 3, reps: '3', rest: '120s', rpe: '8' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_knee_to_wall_ankle_mobilization', en: 'Knee-to-Wall Ankle Mobilization', sets: 1, reps: '10/side' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_weightlifting_in',
    sport: 'weightlifting',
    group: 'strength',
    phase: 'in',
    ar: 'رفع أثقال أولمبي — أثناء الموسم (سينجلز سريعة)',
    en: 'Olympic weightlifting — In-season (fast singles)',
    note: {
      ar: 'سينجلز سريعة قريبة من أوزان البطولة وحجم قليل عشان تفضل فريش وتلقط التوقيت. آخر يومين قبل البطولة خفاف جدًا، وما تجربش وزن جديد في أسبوع البطولة.',
      en: 'Fast singles near competition weights at low volume to stay fresh and sharp on timing. The final two days before the meet are very light, and no new weights in meet week.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' },
        { libId: 'ad_muscle_snatch', en: 'Muscle Snatch', sets: 2, reps: '3' }
      ],
      main: [
        { libId: 'ad_power_snatch', en: 'Power Snatch', sets: 4, reps: '1', rest: '150s', rpe: '8' },
        { libId: 'ad_power_clean', en: 'Power Clean', sets: 4, reps: '1', rest: '150s', rpe: '8' },
        { libId: 'ad_split_jerk', en: 'Split Jerk', sets: 3, reps: '1', rest: '150s', rpe: '8' },
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 3, reps: '2', rest: '180s', rpe: '7' },
        { libId: 'ex_plank', en: 'Plank', sets: 2, reps: '30s', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_deep_squat_hold', en: 'Deep Squat Hold', sets: 1, reps: '60s' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_crossfit_off',
    sport: 'crossfit',
    group: 'strength',
    phase: 'off',
    ar: 'كروسفت — خارج الموسم (قوة وتكنيك وحركات سترِكت)',
    en: 'CrossFit — Off-season (strength, technique & strict work)',
    note: {
      ar: 'بناء القوة الأساسية والتكنيك وحركات الجمباز الـ "سترِكت" مع كارديو هادي، قبل كثافة الـ WODs. الجودة قبل السرعة، وما فيش كيبينج قبل ما تعمل سترِكت نضيف.',
      en: 'Build base strength, technique and strict gymnastics with easy cardio before WOD intensity ramps up. Quality before speed, and no kipping until strict reps are solid.'
    },
    sections: {
      warmup: [
        { libId: 'ex_rowing_machine', en: 'Rowing Machine', sets: 1, reps: '5min' },
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '5', rest: '150s', rpe: '7' },
        { libId: 'wg_push_press', en: 'Push Press', sets: 4, reps: '5', rest: '120s', rpe: '7' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 4, reps: '6-8', rest: '90s', rpe: '8' },
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 4, reps: '3', rest: '120s', rpe: '7' },
        { libId: 'ex_hollow_body_hold', en: 'Hollow Body Hold', sets: 3, reps: '30s', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_skierg_steady_state', en: 'SkiErg Steady State', sets: 1, reps: '20min' }
      ],
      mobility: [
        { libId: 'ad_couch_stretch', en: 'Couch Stretch', sets: 1, reps: '45s/side' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_crossfit_pre',
    sport: 'crossfit',
    group: 'strength',
    phase: 'pre',
    ar: 'كروسفت — قبل الموسم (تجهيز للمنافسة)',
    en: 'CrossFit — Pre-season (competition prep)',
    note: {
      ar: 'تحويل القوة لشغل خاص بالمنافسة بحركات جمباز وكرة وعدد عالي، وبعدها EMOM. في التعب حافظ على شكل الضهر، وقلّل العدد بدل ما تبوّظ الحركة.',
      en: 'Turn strength into competition-style work with gymnastics, wall balls and higher reps, then an EMOM. Under fatigue keep your back position and cut reps rather than let the movement break down.'
    },
    sections: {
      warmup: [
        { libId: 'ad_jump_rope_basic_bounce', en: 'Jump Rope Basic Bounce', sets: 1, reps: '2min' },
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '5' }
      ],
      main: [
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 4, reps: '3', rest: '150s', rpe: '8' },
        { libId: 'dr_thruster', en: 'Thruster', sets: 3, reps: '10', rest: '90s', rpe: '8' },
        { libId: 'dr_toes_to_bar', en: 'Toes-to-Bar', sets: 3, reps: '10', rest: '90s', rpe: '8' },
        { libId: 'dr_wall_ball', en: 'Wall Ball Shot', sets: 3, reps: '15', rest: '60s', rpe: '8' },
        { libId: 'dr_double_under', en: 'Double Under', sets: 3, reps: '30', rest: '60s', rpe: '7' }
      ],
      cardio: [
        { libId: 'dr_emom', en: 'EMOM (Every Minute On the Minute)', sets: 1, reps: '12min', rest: '0s', rpe: '8' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_crossfit_in',
    sport: 'crossfit',
    group: 'strength',
    phase: 'in',
    ar: 'كروسفت — أثناء الموسم (صيانة أسابيع المنافسات)',
    en: 'CrossFit — In-season (competition-week maintenance)',
    note: {
      ar: 'صيانة للقوة والسرعة بحجم قليل في أسابيع المنافسات، ومتكون حادة بس قصيرة. ما تجربش أوزان جديدة قبل المنافسة، والنوم والأكل أهم من أي WOD زيادة.',
      en: 'Low-volume strength and speed maintenance during competition weeks, with a short, sharp metcon. Do not test new weights before the event; sleep and food matter more than an extra WOD.'
    },
    sections: {
      warmup: [
        { libId: 'ex_rowing_machine', en: 'Rowing Machine', sets: 1, reps: '5min' },
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 3, reps: '2', rest: '150s', rpe: '7' },
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 3, reps: '2', rest: '120s', rpe: '7' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 2, reps: '5', rest: '90s', rpe: '6' },
        { libId: 'dr_burpee', en: 'Burpee', sets: 2, reps: '10', rest: '60s', rpe: '7' },
        { libId: 'ex_hollow_body_hold', en: 'Hollow Body Hold', sets: 2, reps: '20s', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'dr_rower_intervals', en: 'Rower 500m Intervals', sets: 3, reps: '500m', rest: '2min', rpe: '8' }
      ],
      mobility: [
        { libId: 'ad_couch_stretch', en: 'Couch Stretch', sets: 1, reps: '45s/side' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_strongman_off',
    sport: 'strongman',
    group: 'strength',
    phase: 'off',
    ar: 'سترونجمان — خارج الموسم (قاعدة قوة بالبار)',
    en: 'Strongman — Off-season (barbell strength base)',
    note: {
      ar: 'قاعدة قوة عامة بالبار (سحب وسكوات وضغط فوق الراس) قبل ما تبدأ أدوات المنافسة. الحزام للمجموعات التقيلة، وخلي الضهر محايد في كل رفعة من الأرض.',
      en: 'A general barbell strength base (pull, squat, overhead press) before the event implements come in. Belt for heavy sets only, and a neutral spine on every lift from the floor.'
    },
    sections: {
      warmup: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 1, reps: '8' },
        { libId: 'ad_hip_hinge_dowel_drill', en: 'Hip Hinge Dowel Drill', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_deadlift', en: 'Deadlift', sets: 4, reps: '5', rest: '180s', rpe: '7' },
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 3, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'wg_overhead_press', en: 'Overhead Press', sets: 4, reps: '6', rest: '120s', rpe: '7' },
        { libId: 'wg_barbell_row', en: 'Barbell Row', sets: 3, reps: '8', rest: '90s', rpe: '7' },
        { libId: 'ex_farmers_carry', en: 'Farmer\'s Carry', sets: 3, reps: '30m', rest: '90s', rpe: '7' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_strongman_pre',
    sport: 'strongman',
    group: 'strength',
    phase: 'pre',
    ar: 'سترونجمان — قبل الموسم (أحداث المنافسة)',
    en: 'Strongman — Pre-season (event training)',
    note: {
      ar: 'تحويل القوة لأحداث المنافسة: ضغط فوق الراس، وحمل ساندبج، وزق زلاجة، وفارمرز على مسافة. اعمل الأحداث بترتيب البطولة، ووقّف لو القبضة أو الضهر فلتوا.',
      en: 'Convert strength into events: overhead pressing, sandbag carry, sled push and farmers carry for distance. Run the events in meet order and stop if grip or back position is lost.'
    },
    sections: {
      warmup: [
        { libId: 'ad_hip_hinge_dowel_drill', en: 'Hip Hinge Dowel Drill', sets: 1, reps: '10' },
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'wg_push_press', en: 'Push Press', sets: 4, reps: '3', rest: '150s', rpe: '8' },
        { libId: 'ek_zecher_squats', en: 'Zercher Squat', sets: 3, reps: '5', rest: '150s', rpe: '8' },
        { libId: 'ad_sandbag_bear_hug_carry', en: 'Sandbag Bear-Hug Carry', sets: 4, reps: '30m', rest: '120s', rpe: '8' },
        { libId: 'ad_sled_push_sprints', en: 'Sled Push Sprints', sets: 4, reps: '20m', rest: '120s', rpe: '8' },
        { libId: 'ex_farmers_carry', en: 'Farmer\'s Carry', sets: 4, reps: '30m', rest: '120s', rpe: '8' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 1, reps: '6/side' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_strongman_in',
    sport: 'strongman',
    group: 'strength',
    phase: 'in',
    ar: 'سترونجمان — أثناء الموسم (تمرين فتح قبل البطولة)',
    en: 'Strongman — In-season (pre-meet opener session)',
    note: {
      ar: 'تمرين فتح قبل البطولة بأوزان متوسطة وسرعة عالية، يحافظ على الإحساس بالأدوات من غير تعب. آخر حمل تقيل قبل البطولة بحوالي 10 أيام.',
      en: 'An opener session before the meet with moderate loads moved fast, keeping the feel of the implements without fatigue. The last heavy session is about 10 days out.'
    },
    sections: {
      warmup: [
        { libId: 'ad_hip_hinge_dowel_drill', en: 'Hip Hinge Dowel Drill', sets: 1, reps: '10' },
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '2', rest: '180s', rpe: '7' },
        { libId: 'wg_push_press', en: 'Push Press', sets: 3, reps: '2', rest: '150s', rpe: '7' },
        { libId: 'ex_farmers_carry', en: 'Farmer\'s Carry', sets: 2, reps: '20m', rest: '120s', rpe: '7' },
        { libId: 'ad_sandbag_shoulder_carry', en: 'Sandbag Shoulder Carry', sets: 2, reps: '20m', rest: '120s', rpe: '7' },
        { libId: 'ad_suitcase_hold', en: 'Suitcase Hold', sets: 2, reps: '30s/side', rest: '60s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_calisthenics_off',
    sport: 'calisthenics',
    group: 'strength',
    phase: 'off',
    ar: 'كاليسثينكس — أساس (سحب وضغط وهولو)',
    en: 'Calisthenics — Foundation (pull, push & hollow)',
    note: {
      ar: 'أساس قوة وزن الجسم (سحب وضغط ودبس وهولو) قبل المهارات. النزول البطيء في العقلة 3-5 ثواني، والكتف متسحب لتحت في كل حركة.',
      en: 'A bodyweight strength base (pull, push, dip, hollow) before skills. Take 3–5 seconds on pull-up negatives and keep the shoulders pulled down on every rep.'
    },
    sections: {
      warmup: [
        { libId: 'wg_scapular_pull_up', en: 'Scapular Pull-up', sets: 2, reps: '8' },
        { libId: 'wg_scapular_push_up', en: 'Scapular Push-up', sets: 2, reps: '10' }
      ],
      main: [
        { libId: 'wg_negative_pull_up', en: 'Negative Pull-up', sets: 3, reps: '4-5', rest: '120s', rpe: '8' },
        { libId: 'ex_pushup', en: 'Push-up', sets: 3, reps: '10-15', rest: '90s', rpe: '7' },
        { libId: 'ek_body_row', en: 'Inverted Row', sets: 3, reps: '8-12', rest: '90s', rpe: '7' },
        { libId: 'wg_dip', en: 'Dip', sets: 3, reps: '5-8', rest: '90s', rpe: '8' },
        { libId: 'wg_assisted_pistol_squat', en: 'Assisted Pistol Squat', sets: 3, reps: '5/side', rest: '60s', rpe: '7' },
        { libId: 'ex_hollow_body_hold', en: 'Hollow Body Hold', sets: 3, reps: '20-30s', rest: '45s', rpe: '7' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'wg_doorway_chest_stretch', en: 'Doorway Chest Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_calisthenics_pre',
    sport: 'calisthenics',
    group: 'strength',
    phase: 'pre',
    ar: 'كاليسثينكس — تطوير (طريق المهارات)',
    en: 'Calisthenics — Progression (toward skills)',
    note: {
      ar: 'تطوير نحو المهارات: عقلة أكتر، وضغط أحادي (آرتشر)، وإل سيت، وبايك لتجهيز الوقوف على الإيدين. انتقل للمستوى الأصعب لما تكمّل كل المجموعات بشكل نضيف.',
      en: 'Progress toward skills: more pull-ups, archer push-ups, L-sit and pike work to prepare for handstands. Move to the harder level once every set is completed cleanly.'
    },
    sections: {
      warmup: [
        { libId: 'wg_scapular_pull_up', en: 'Scapular Pull-up', sets: 2, reps: '8' },
        { libId: 'ad_wall_slides', en: 'Wall Slides', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_pullup', en: 'Pull-up', sets: 4, reps: '5-8', rest: '120s', rpe: '8' },
        { libId: 'wg_archer_push_up', en: 'Archer Push-up', sets: 3, reps: '5/side', rest: '90s', rpe: '8' },
        { libId: 'wg_l_sit_hold', en: 'L-Sit Hold', sets: 4, reps: '10-15s', rest: '60s', rpe: '8' },
        { libId: 'wg_feet_elevated_pike_push_up', en: 'Feet-Elevated Pike Push-up', sets: 3, reps: '6-8', rest: '90s', rpe: '8' },
        { libId: 'wg_shrimp_squat', en: 'Shrimp Squat', sets: 3, reps: '5/side', rest: '90s', rpe: '8' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'wg_seated_forward_fold', en: 'Seated Forward Fold', sets: 1, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_s_calisthenics_in',
    sport: 'calisthenics',
    group: 'strength',
    phase: 'in',
    ar: 'كاليسثينكس — قمة وصيانة (مستوى متقدم)',
    en: 'Calisthenics — Peak & maintenance (advanced level)',
    note: {
      ar: 'مستوى متقدم: هاندستاند بوش أب على الحيطة، وعقلة ودبس بوزن زيادة، ودراجون فلاج، وبيستول. الرسغ لازم يكون متسخن كويس قبل الهاندستاند، والوزن الزيادة بخطوات صغيرة.',
      en: 'Advanced level: wall handstand push-ups, weighted pull-ups and dips, dragon flags and pistols. Warm the wrists thoroughly before handstands and add external load in small steps.'
    },
    sections: {
      warmup: [
        { libId: 'ad_wall_slides', en: 'Wall Slides', sets: 1, reps: '10' },
        { libId: 'wg_active_hang', en: 'Active Hang', sets: 1, reps: '20s' }
      ],
      main: [
        { libId: 'wg_wall_handstand_push_up', en: 'Wall Handstand Push-up', sets: 4, reps: '3-5', rest: '120s', rpe: '8' },
        { libId: 'wg_weighted_pull_up', en: 'Weighted Pull-up', sets: 4, reps: '3-5', rest: '150s', rpe: '8' },
        { libId: 'wg_l_sit_pull_up', en: 'L-Sit Pull-up', sets: 3, reps: '4-6', rest: '120s', rpe: '8' },
        { libId: 'wg_weighted_dip', en: 'Weighted Dip', sets: 3, reps: '5', rest: '120s', rpe: '8' },
        { libId: 'wg_dragon_flag', en: 'Dragon Flag', sets: 3, reps: '4-6', rest: '90s', rpe: '8' },
        { libId: 'dr_pistol_squat', en: 'Pistol Squat', sets: 3, reps: '5/side', rest: '90s', rpe: '7' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'wg_seated_forward_fold', en: 'Seated Forward Fold', sets: 1, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_s_sprint_off',
    sport: 'sprint',
    group: 'athletics',
    phase: 'off',
    ar: 'عدو سريع — خارج الموسم (قوة وعضلة خلفية)',
    en: 'Sprinting — Off-season (strength & hamstrings)',
    note: {
      ar: 'بناء قوة عامة وعضلة خلفية قوية (نوردك) كأساس للسرعة، مع سبرنتات طلوع تعلّم وضعية الدفع. الطلعات قصيرة وبراحة كاملة، مش لياقة.',
      en: 'Build general strength and robust hamstrings (Nordics) as the base for speed, with hill sprints that teach the drive position. Keep hills short with full recovery; this is not conditioning.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_walking_hamstring_scoop', en: 'Walking Hamstring Scoop', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '5', rest: '150s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 3, reps: '5', rest: '120s', rpe: '8' },
        { libId: 'ex_hip_thrust', en: 'Hip Thrust', sets: 3, reps: '8', rest: '90s', rpe: '7' },
        { libId: 'ad_hill_sprint', en: 'Hill Sprint', sets: 6, reps: '30m', rest: '2min', rpe: '8' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 1, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_sprint_pre',
    sport: 'sprint',
    group: 'athletics',
    phase: 'pre',
    ar: 'عدو سريع — قبل الموسم (تسارع وقدرة)',
    en: 'Sprinting — Pre-season (acceleration & power)',
    note: {
      ar: 'تحويل القوة لتسارع: كلين، وبدايات، وسبرنت بزلاجة خفيفة، ووثب متبادل. راحة كاملة بين التكرارات عشان كل واحد يبقى بأقصى سرعة، ووقّف لو حسيت شد في الخلفية.',
      en: 'Turn strength into acceleration: cleans, starts, light sled sprints and bounding. Take full rest so every rep is maximal, and stop at any hamstring tightness.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_b_skip', en: 'B-Skip', sets: 2, reps: '20m' }
      ],
      main: [
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 4, reps: '3', rest: '150s', rpe: '7' },
        { libId: 'ad_falling_start', en: 'Falling Start', sets: 4, reps: '15m', rest: '120s', rpe: '8' },
        { libId: 'ad_sled_resisted_sprint', en: 'Sled-Resisted Sprint', sets: 4, reps: '20m', rest: '150s', rpe: '8' },
        { libId: 'ad_alternate_leg_bound', en: 'Alternate-Leg Bound', sets: 3, reps: '20m', rest: '120s', rpe: '8' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 2, reps: '5', rest: '90s', rpe: '8' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_sprint_in',
    sport: 'sprint',
    group: 'athletics',
    phase: 'in',
    ar: 'عدو سريع — أثناء الموسم (سرعة قصوى وصيانة)',
    en: 'Sprinting — In-season (max velocity & maintenance)',
    note: {
      ar: 'صيانة للسرعة القصوى بسبرنت طاير قليل العدد، مع قوة خفيفة وسريعة. الجلسة قبل السباق بـ 3-4 أيام على الأقل، وأي شد في الخلفية وقّف على طول.',
      en: 'Maintain top speed with a few flying sprints plus light, fast strength work. Keep it at least 3–4 days before a race and stop immediately at any hamstring tightness.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 1, reps: '20m' },
        { libId: 'ad_walking_quad_pull', en: 'Walking Quad Pull', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'ad_flying_sprint', en: 'Flying Sprint', sets: 4, reps: '20m', rest: '3min', rpe: '9' },
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 3, reps: '2', rest: '120s', rpe: '7' },
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 3, reps: '3', rest: '90s', rpe: '7' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 2, reps: '4', rest: '90s', rpe: '7' },
        { libId: 'ex_dead_bug', en: 'Dead Bug', sets: 2, reps: '8/side', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_middle_dist_off',
    sport: 'middle_dist',
    group: 'athletics',
    phase: 'off',
    ar: 'مسافات متوسطة — خارج الموسم (قوة وحجم هوائي)',
    en: 'Middle distance — Off-season (strength & aerobic volume)',
    note: {
      ar: 'بناء قوة عامة وحجم جري هادي كبير يشيل شغل الشدة بعدين. معظم الجري في المرحلة دي هادي، والقوة من غير فشل عضلي.',
      en: 'Build general strength and a large volume of easy running to support later intensity. Most running in this phase is easy, and strength work stays short of failure.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 1, reps: '20m' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 3, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_step_up', en: 'Step-Up', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ad_bent_knee_soleus_raise', en: 'Bent-Knee Soleus Raise', sets: 3, reps: '15/side', rest: '60s', rpe: '7' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 3, reps: '30s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_zone_2_easy_run', en: 'Zone 2 Easy Run', sets: 1, reps: '45min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_middle_dist_pre',
    sport: 'middle_dist',
    group: 'athletics',
    phase: 'pre',
    ar: 'مسافات متوسطة — قبل الموسم (تكرارات سرعة سباق)',
    en: 'Middle distance — Pre-season (race-pace repeats)',
    note: {
      ar: 'شغل خاص بالسباق: تكرارات 400م بسرعة سباق 1500م تقريبًا، مع ارتداد للقدم وقوة أحادية. الـ 400 بإيقاع ثابت، وآخر تكرار بنفس سرعة أول واحد.',
      en: 'Race-specific work: 400 m repeats at roughly 1500 m race pace, plus foot stiffness and single-leg strength. Run the 400s evenly, with the last rep matching the first.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_b_skip', en: 'B-Skip', sets: 2, reps: '20m' }
      ],
      main: [
        { libId: 'ad_400_m_repeats', en: '400 m Repeats', sets: 8, reps: '400m', rest: '90s', rpe: '8' },
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 3, reps: '20', rest: '60s', rpe: '6' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '6/side', rest: '120s', rpe: '8' },
        { libId: 'ad_eccentric_heel_drop', en: 'Eccentric Heel Drop', sets: 3, reps: '12/side', rest: '60s', rpe: '7' },
        { libId: 'ad_power_skip', en: 'Power Skip', sets: 3, reps: '20m', rest: '90s', rpe: '7' }
      ],
      cardio: [
        { libId: 'ad_zone_2_easy_run', en: 'Zone 2 Easy Run', sets: 1, reps: '15min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_middle_dist_in',
    sport: 'middle_dist',
    group: 'athletics',
    phase: 'in',
    ar: 'مسافات متوسطة — أثناء الموسم (صيانة بين السباقات)',
    en: 'Middle distance — In-season (maintenance between races)',
    note: {
      ar: 'صيانة قصيرة للقوة والسرعة (سترايدز) بين السباقات من غير تعب. تتعمل بعد السباق بيومين وقبل السباق الجاي بتلات أيام على الأقل.',
      en: 'Short strength and speed (strides) maintenance between races without adding fatigue. Schedule it two days after a race and at least three days before the next.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 1, reps: '20m' },
        { libId: 'ad_carioca', en: 'Carioca', sets: 1, reps: '20m/side' }
      ],
      main: [
        { libId: 'ad_strides', en: 'Strides', sets: 6, reps: '100m', rest: '60s', rpe: '7' },
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '6', rest: '90s', rpe: '6' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 2, reps: '6/side', rest: '90s', rpe: '6' },
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 2, reps: '15', rest: '60s', rpe: '6' },
        { libId: 'ex_dead_bug', en: 'Dead Bug', sets: 2, reps: '8/side', rest: '45s', rpe: '5' }
      ],
      cardio: [
        { libId: 'ad_zone_2_easy_run', en: 'Zone 2 Easy Run', sets: 1, reps: '20min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_long_jump_off',
    sport: 'long_jump',
    group: 'athletics',
    phase: 'off',
    ar: 'وثب طويل — خارج الموسم (قاعدة قوة وأوتار)',
    en: 'Long jump — Off-season (strength & tendon base)',
    note: {
      ar: 'قاعدة قوة للرجلين والخلفية، مع قفز خفيف (بوجو) يقوّي الأوتار قبل الشغل الانفجاري. خلي الوثب قليل وعلى أرض طرية في المرحلة دي.',
      en: 'A leg and posterior-chain strength base with light pogo hops to prepare the tendons for explosive work. Keep jumping low-volume and on a soft surface in this phase.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_walking_hip_opener', en: 'Walking Hip Opener', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '5', rest: '150s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '6/side', rest: '90s', rpe: '7' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 3, reps: '5', rest: '120s', rpe: '8' },
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 3, reps: '20', rest: '60s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_knee_to_wall_ankle_mobilization', en: 'Knee-to-Wall Ankle Mobilization', sets: 1, reps: '10/side' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_long_jump_pre',
    sport: 'long_jump',
    group: 'athletics',
    phase: 'pre',
    ar: 'وثب طويل — قبل الموسم (ارتقاء وتسارع)',
    en: 'Long jump — Pre-season (take-off power & approach speed)',
    note: {
      ar: 'قدرة انفجارية للارتقاء (كلين، وثب متبادل، وقفز من العمق) مع تسارع زي الاقتراب. عدد لمسات القفز قليل وبأعلى جودة، والهبوط على الرجلين بثبات.',
      en: 'Explosive take-off power (cleans, bounding, depth jumps) with acceleration that mirrors the approach. Keep ground contacts low and high-quality, landing stable on both feet.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_b_skip', en: 'B-Skip', sets: 2, reps: '20m' }
      ],
      main: [
        { libId: 'ad_power_clean', en: 'Power Clean', sets: 4, reps: '3', rest: '150s', rpe: '7' },
        { libId: 'ad_alternate_leg_bound', en: 'Alternate-Leg Bound', sets: 4, reps: '20m', rest: '120s', rpe: '8' },
        { libId: 'ad_single_leg_forward_hop_and_stick', en: 'Single-Leg Forward Hop and Stick', sets: 3, reps: '4/side', rest: '90s', rpe: '7' },
        { libId: 'ad_depth_jump', en: 'Depth Jump', sets: 3, reps: '4', rest: '120s', rpe: '8' },
        { libId: 'dr_sprint_accel', en: '20m Acceleration Sprints', sets: 4, reps: '20m', rest: '120s', rpe: '9' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_quad_stretch', en: 'Quad Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_long_jump_in',
    sport: 'long_jump',
    group: 'athletics',
    phase: 'in',
    ar: 'وثب طويل — أثناء الموسم (صيانة السرعة والانفجار)',
    en: 'Long jump — In-season (speed & power maintenance)',
    note: {
      ar: 'صيانة للسرعة والانفجار بحجم قليل قبل المسابقات. ما فيش قفز من العمق في أسبوع المسابقة.',
      en: 'Low-volume maintenance of speed and power before competitions. No depth jumps in competition week.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 1, reps: '20m' },
        { libId: 'ad_power_skip', en: 'Power Skip', sets: 2, reps: '20m' }
      ],
      main: [
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 3, reps: '3', rest: '90s', rpe: '7' },
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 3, reps: '2', rest: '120s', rpe: '7' },
        { libId: 'ad_flying_sprint', en: 'Flying Sprint', sets: 3, reps: '20m', rest: '3min', rpe: '9' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 2, reps: '4', rest: '90s', rpe: '7' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 2, reps: '20s/side', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_high_jump_off',
    sport: 'high_jump',
    group: 'athletics',
    phase: 'off',
    ar: 'وثب عالي — خارج الموسم (قوة وثبات كاحل)',
    en: 'High jump — Off-season (strength & ankle stability)',
    note: {
      ar: 'قوة عامة للرجلين وثبات الكاحل (رجل الارتقاء) وجسم مشدود، كأساس للقفز. تقوية الكاحل مهمة لأن الارتقاء على رجل واحدة وفي منحنى.',
      en: 'General leg strength, take-off ankle stability and body tension as the base for jumping. Ankle work matters because take-off is on one leg at the end of a curve.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_walking_hip_opener', en: 'Walking Hip Opener', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '5', rest: '150s', rpe: '7' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_step_up', en: 'Step-Up', sets: 3, reps: '6/side', rest: '90s', rpe: '7' },
        { libId: 'ex_calf_raise', en: 'Standing Calf Raise', sets: 3, reps: '12', rest: '60s', rpe: '7' },
        { libId: 'ad_banded_ankle_eversion', en: 'Banded Ankle Eversion', sets: 2, reps: '15/side', rest: '45s', rpe: '6' },
        { libId: 'ex_hollow_body_hold', en: 'Hollow Body Hold', sets: 3, reps: '30s', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_prone_press_up', en: 'Prone Press-Up', sets: 1, reps: '10' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_high_jump_pre',
    sport: 'high_jump',
    group: 'athletics',
    phase: 'pre',
    ar: 'وثب عالي — قبل الموسم (قفز أحادي وانفجار)',
    en: 'High jump — Pre-season (single-leg power)',
    note: {
      ar: 'قدرة انفجارية لرجل الارتقاء (قفز من العمق وقفز أحادي) مع قفزات جانبية تخدم الاقتراب المنحني. الهبوط ناعم وثابت، وعدد اللمسات قليل عشان الجودة.',
      en: 'Explosive power for the take-off leg (depth jumps, single-leg hops) with lateral hops for the curved approach. Land softly and stably, and keep contacts low for quality.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_power_skip', en: 'Power Skip', sets: 2, reps: '20m' }
      ],
      main: [
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 4, reps: '3', rest: '150s', rpe: '7' },
        { libId: 'ad_depth_jump', en: 'Depth Jump', sets: 3, reps: '4', rest: '120s', rpe: '8' },
        { libId: 'ad_single_leg_lateral_hop_and_stick', en: 'Single-Leg Lateral Hop and Stick', sets: 3, reps: '4/side', rest: '90s', rpe: '7' },
        { libId: 'ad_single_leg_pogo_hop', en: 'Single-Leg Pogo Hop', sets: 3, reps: '10/side', rest: '60s', rpe: '7' },
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 3, reps: '3', rest: '90s', rpe: '8' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_prone_press_up', en: 'Prone Press-Up', sets: 1, reps: '10' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_high_jump_in',
    sport: 'high_jump',
    group: 'athletics',
    phase: 'in',
    ar: 'وثب عالي — أثناء الموسم (صيانة سريعة)',
    en: 'High jump — In-season (quick maintenance)',
    note: {
      ar: 'صيانة سريعة للانفجار وقوة خفيفة في موسم المسابقات بحجم قليل. آخر جلسة قفز قبل المسابقة بـ 3-4 أيام.',
      en: 'Quick, low-volume maintenance of power and light strength during competition season. The last jumping session is 3–4 days before competing.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 1, reps: '20m' },
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 2, reps: '10' }
      ],
      main: [
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 3, reps: '3', rest: '90s', rpe: '7' },
        { libId: 'ek_speed_squats_with_barbell', en: 'Barbell Speed Squat', sets: 3, reps: '3', rest: '120s', rpe: '6' },
        { libId: 'ad_single_leg_forward_hop_and_stick', en: 'Single-Leg Forward Hop and Stick', sets: 2, reps: '3/side', rest: '90s', rpe: '6' },
        { libId: 'ex_calf_raise', en: 'Standing Calf Raise', sets: 2, reps: '10', rest: '60s', rpe: '6' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 2, reps: '20s/side', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_prone_press_up', en: 'Prone Press-Up', sets: 1, reps: '10' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_shot_put_off',
    sport: 'shot_put',
    group: 'athletics',
    phase: 'off',
    ar: 'دفع الجلة — خارج الموسم (قوة قصوى ودوران)',
    en: 'Shot put — Off-season (max strength & rotation)',
    note: {
      ar: 'قوة قصوى عامة للجسم كله (سكوات وبنش وضغط) مع دوران الجذع، كأساس للرمي. الأوزان تقيلة بس بأداء نضيف، والرسغ مشدود في البنش.',
      en: 'Maximal full-body strength (squat, bench, press) plus trunk rotation as the base for throwing. Heavy loads, clean reps, and a stacked wrist on the bench.'
    },
    sections: {
      warmup: [
        { libId: 'ex_arm_circles', en: 'Arm Circles', sets: 1, reps: '10' },
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '5', rest: '150s', rpe: '7' },
        { libId: 'ex_barbell_bench_press', en: 'Barbell Bench Press', sets: 4, reps: '5', rest: '150s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'ex_bent_over_row', en: 'Bent Over Barbell Row', sets: 3, reps: '8', rest: '90s', rpe: '7' },
        { libId: 'ex_overhead_barbell_press', en: 'Overhead Barbell Press', sets: 3, reps: '6', rest: '120s', rpe: '7' },
        { libId: 'ad_landmine_rotation', en: 'Landmine Rotation', sets: 3, reps: '8/side', rest: '60s', rpe: '7' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_shot_put_pre',
    sport: 'shot_put',
    group: 'athletics',
    phase: 'pre',
    ar: 'دفع الجلة — قبل الموسم (سرعة الرمي)',
    en: 'Shot put — Pre-season (throwing speed)',
    note: {
      ar: 'تحويل القوة لسرعة رمي: كلين، ودفع انفجاري بالكونتراست، ورمي كرة طبية دوراني وورا الراس. كل رمية بأقصى سرعة وبراحة كفاية، ووقّف لو في وجع في الرسغ أو الكوع.',
      en: 'Convert strength into throwing speed: cleans, contrast pressing, and rotational and overhead-backward medicine-ball throws. Every throw at full speed with enough rest; stop at any wrist or elbow pain.'
    },
    sections: {
      warmup: [
        { libId: 'ex_arm_circles', en: 'Arm Circles', sets: 1, reps: '10' },
        { libId: 'ad_medicine_ball_chest_pass', en: 'Medicine Ball Chest Pass', sets: 2, reps: '5' }
      ],
      main: [
        { libId: 'ad_power_clean', en: 'Power Clean', sets: 4, reps: '3', rest: '150s', rpe: '7' },
        { libId: 'ad_bench_press_to_plyo_push_up_contrast', en: 'Bench Press to Plyo Push-up Contrast', sets: 4, reps: '3+3', rest: '180s', rpe: '8' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 4, reps: '4/side', rest: '90s', rpe: '8' },
        { libId: 'ad_medicine_ball_overhead_backward_throw', en: 'Medicine Ball Overhead Backward Throw', sets: 3, reps: '4', rest: '90s', rpe: '8' },
        { libId: 'wg_push_press', en: 'Push Press', sets: 3, reps: '3', rest: '150s', rpe: '8' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_shot_put_in',
    sport: 'shot_put',
    group: 'athletics',
    phase: 'in',
    ar: 'دفع الجلة — أثناء الموسم (صيانة القوة والسرعة)',
    en: 'Shot put — In-season (strength & speed maintenance)',
    note: {
      ar: 'صيانة للقوة والسرعة بتكرارات قليلة جدًا في موسم المسابقات. تقيلة بس قصيرة، وبعيد عن يوم المسابقة بـ 3 أيام على الأقل.',
      en: 'Maintain strength and speed with very low reps during competition season. Heavy but brief, and at least three days away from competition day.'
    },
    sections: {
      warmup: [
        { libId: 'ex_arm_circles', en: 'Arm Circles', sets: 1, reps: '10' },
        { libId: 'ad_medicine_ball_chest_pass', en: 'Medicine Ball Chest Pass', sets: 1, reps: '5' }
      ],
      main: [
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 3, reps: '2', rest: '120s', rpe: '7' },
        { libId: 'ex_barbell_bench_press', en: 'Barbell Bench Press', sets: 3, reps: '2', rest: '150s', rpe: '7' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 3, reps: '3/side', rest: '90s', rpe: '7' },
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 3, reps: '3', rest: '60s', rpe: '6' },
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 2, reps: '15', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_javelin_off',
    sport: 'javelin',
    group: 'athletics',
    phase: 'off',
    ar: 'رمي الرمح — خارج الموسم (قوة وحماية الكتف)',
    en: 'Javelin — Off-season (strength & shoulder care)',
    note: {
      ar: 'قوة عامة للرجلين والظهر، وضغط لاندماين آمن للكتف، وتقوية الروتيتور كاف وثبات الجذع كأساس للرمي. الكتف بيشيل حمل عالي في الرمح، فتقوية الروتيتور كاف أساسية مش اختيارية.',
      en: 'General leg and back strength, shoulder-friendly landmine pressing, rotator-cuff and trunk stability as the base for throwing. The javelin shoulder takes huge loads, so cuff work is essential, not optional.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 2, reps: '10' },
        { libId: 'ad_cross_body_arm_swings', en: 'Cross-Body Arm Swings', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '5', rest: '150s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 3, reps: '6-8', rest: '90s', rpe: '7' },
        { libId: 'wg_landmine_press', en: 'Landmine Press', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 3, reps: '12/side', rest: '45s', rpe: '6' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 3, reps: '10/side', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 1, reps: '6/side' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_javelin_pre',
    sport: 'javelin',
    group: 'athletics',
    phase: 'pre',
    ar: 'رمي الرمح — قبل الموسم (اقتراب ورجل تثبيت ورمي)',
    en: 'Javelin — Pre-season (approach, block leg & throws)',
    note: {
      ar: 'قدرة انفجارية للاقتراب ورجل التثبيت، ورمي كرة طبية فوق الراس ودوراني يحاكي الرمية. الكرة الطبية خفيفة (2-3 كيلو) عشان السرعة، ووقّف لو في وجع في الكوع.',
      en: 'Explosive power for the approach and block leg, with overhead and rotational medicine-ball throws that mimic the release. Use a light ball (2–3 kg) for speed and stop at any elbow pain.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '12' },
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 4, reps: '3', rest: '150s', rpe: '7' },
        { libId: 'ad_medicine_ball_soccer_throw', en: 'Medicine Ball Soccer Throw', sets: 4, reps: '5', rest: '90s', rpe: '8' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 3, reps: '4/side', rest: '90s', rpe: '8' },
        { libId: 'ad_lateral_bound_and_stick', en: 'Lateral Bound and Stick', sets: 3, reps: '4/side', rest: '90s', rpe: '7' },
        { libId: 'dr_sprint_accel', en: '20m Acceleration Sprints', sets: 4, reps: '20m', rest: '120s', rpe: '8' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_sleeper_stretch', en: 'Sleeper Stretch', sets: 1, reps: '30s/side' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_javelin_in',
    sport: 'javelin',
    group: 'athletics',
    phase: 'in',
    ar: 'رمي الرمح — أثناء الموسم (صيانة وحماية الكوع والكتف)',
    en: 'Javelin — In-season (maintenance & arm care)',
    note: {
      ar: 'صيانة للسرعة وحماية الكتف والكوع بحجم قليل في موسم المسابقات. عدد الرميات في الأسبوع هو اللي بيحدد الحمل، فخلي الجلسة دي خفيفة.',
      en: 'Low-volume maintenance of speed plus shoulder and elbow care during competition season. Weekly throw count drives the load, so keep this session light.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '12' }
      ],
      main: [
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 3, reps: '2', rest: '120s', rpe: '7' },
        { libId: 'ad_medicine_ball_soccer_throw', en: 'Medicine Ball Soccer Throw', sets: 3, reps: '4', rest: '90s', rpe: '7' },
        { libId: 'ek_speed_squats_with_barbell', en: 'Barbell Speed Squat', sets: 3, reps: '3', rest: '120s', rpe: '6' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 2, reps: '12/side', rest: '45s', rpe: '5' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 2, reps: '10/side', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_sleeper_stretch', en: 'Sleeper Stretch', sets: 1, reps: '30s/side' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_hurdles_off',
    sport: 'hurdles',
    group: 'athletics',
    phase: 'off',
    ar: 'حواجز — خارج الموسم (قوة ومرونة ورك)',
    en: 'Hurdles — Off-season (strength & hip mobility)',
    note: {
      ar: 'قوة عامة للخلفية وعضلات الحوض (رافع الفخذ والضامة) اللي بتشتغل في كل حاجز، مع مرونة ورك. مشي فوق الحواجز بتحكم قبل أي جري.',
      en: 'General posterior-chain and hip strength (hip flexors and adductors) used over every hurdle, plus hip mobility. Walk the hurdles under control before any running.'
    },
    sections: {
      warmup: [
        { libId: 'dr_hurdle_walkover', en: 'Hurdle Walkovers', sets: 2, reps: '6' },
        { libId: 'ad_walking_hip_opener', en: 'Walking Hip Opener', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '5', rest: '150s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 3, reps: '5', rest: '120s', rpe: '8' },
        { libId: 'ad_supine_banded_psoas_march', en: 'Supine Banded Psoas March', sets: 3, reps: '10/side', rest: '45s', rpe: '6' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 3, reps: '20s/side', rest: '60s', rpe: '7' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 2, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_hurdles_pre',
    sport: 'hurdles',
    group: 'athletics',
    phase: 'pre',
    ar: 'حواجز — قبل الموسم (إيقاع وسرعة بين الحواجز)',
    en: 'Hurdles — Pre-season (rhythm & speed)',
    note: {
      ar: 'إيقاع وسرعة بين الحواجز (ويكتس)، وقفز حواجز، وتسارع وكلين للقدرة. ابدأ بحواجز واطية ومسافات أقصر، وبعد إحماء كامل بس.',
      en: 'Rhythm and speed between barriers (wickets), hurdle hops, acceleration and cleans for power. Start with low hurdles and shorter spacing, and only after a full warm-up.'
    },
    sections: {
      warmup: [
        { libId: 'dr_hurdle_walkover', en: 'Hurdle Walkovers', sets: 2, reps: '6' },
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' }
      ],
      main: [
        { libId: 'ad_wicket_run', en: 'Wicket Run', sets: 4, reps: '30m', rest: '120s', rpe: '8' },
        { libId: 'dr_hurdle_hops', en: 'Two-foot Hurdle Hops', sets: 3, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 4, reps: '3', rest: '150s', rpe: '7' },
        { libId: 'dr_sprint_accel', en: '20m Acceleration Sprints', sets: 4, reps: '20m', rest: '120s', rpe: '9' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 2, reps: '5', rest: '90s', rpe: '8' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_hurdles_in',
    sport: 'hurdles',
    group: 'athletics',
    phase: 'in',
    ar: 'حواجز — أثناء الموسم (صيانة الإيقاع والسرعة)',
    en: 'Hurdles — In-season (rhythm & speed maintenance)',
    note: {
      ar: 'صيانة للإيقاع والسرعة القصوى بحجم قليل قبل السباقات. سيب 3-4 أيام بين الجلسة دي والسباق.',
      en: 'Low-volume maintenance of rhythm and top speed before races. Leave 3–4 days between this session and the race.'
    },
    sections: {
      warmup: [
        { libId: 'dr_hurdle_walkover', en: 'Hurdle Walkovers', sets: 1, reps: '6' },
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'ad_wicket_run', en: 'Wicket Run', sets: 3, reps: '30m', rest: '150s', rpe: '8' },
        { libId: 'ad_flying_sprint', en: 'Flying Sprint', sets: 3, reps: '20m', rest: '3min', rpe: '9' },
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 3, reps: '3', rest: '60s', rpe: '6' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 2, reps: '4', rest: '90s', rpe: '7' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 2, reps: '15s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 1, reps: '8/side' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_gymnastics_off',
    sport: 'gymnastics',
    group: 'gymnastic',
    phase: 'off',
    ar: 'جمباز — خارج الموسم (قوة أساسية وهولو وآرش)',
    en: 'Gymnastics — Off-season (base strength, hollow & arch)',
    note: {
      ar: 'قوة عامة للسحب والضغط والرجلين، مع هولو وآرش (سوبرمان) كأساس لكل المهارات. سخّن الرسغ كويس لأنه بيشيل وزن الجسم في معظم الحركات.',
      en: 'General pulling, pushing and leg strength, with hollow and arch (superman) holds as the base for every skill. Warm up the wrists well, since they carry bodyweight in most elements.'
    },
    sections: {
      warmup: [
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '5' },
        { libId: 'ad_wall_slides', en: 'Wall Slides', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_pullup', en: 'Pull-up', sets: 4, reps: '6-8', rest: '90s', rpe: '7' },
        { libId: 'wg_dip', en: 'Dip', sets: 3, reps: '8', rest: '90s', rpe: '7' },
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 3, reps: '6', rest: '120s', rpe: '7' },
        { libId: 'ex_hollow_body_hold', en: 'Hollow Body Hold', sets: 3, reps: '30s', rest: '45s', rpe: '7' },
        { libId: 'wg_superman_hold', en: 'Superman Hold', sets: 3, reps: '20s', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      flexibility: [
        { libId: 'wg_seated_forward_fold', en: 'Seated Forward Fold', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_s_gymnastics_pre',
    sport: 'gymnastics',
    group: 'gymnastic',
    phase: 'pre',
    ar: 'جمباز — قبل الموسم (قوة المهارات والقفز)',
    en: 'Gymnastics — Pre-season (skill strength & jumping)',
    note: {
      ar: 'قوة خاصة بالمهارات: وقوف على الإيدين على الحيطة، وإل سيت، وضغط فوق الراس، وقفز انفجاري للأرضي وحصان القفز. الهبوط من القفز ناعم على مشط القدم وبركبة مثنية.',
      en: 'Skill-specific strength: wall handstand work, L-sits, overhead pressing, and explosive jumps for floor and vault. Land softly on the balls of the feet with bent knees.'
    },
    sections: {
      warmup: [
        { libId: 'ad_wrist_active_range_of_motion', en: 'Wrist Active Range of Motion', sets: 1, reps: '10' },
        { libId: 'wg_hollow_rock', en: 'Hollow Rock', sets: 2, reps: '10' }
      ],
      main: [
        { libId: 'wg_wall_walk', en: 'Wall Walk', sets: 3, reps: '3', rest: '90s', rpe: '7' },
        { libId: 'wg_l_sit_hold', en: 'L-Sit Hold', sets: 4, reps: '10-15s', rest: '60s', rpe: '8' },
        { libId: 'ad_depth_jump', en: 'Depth Jump', sets: 3, reps: '3', rest: '120s', rpe: '8' },
        { libId: 'wg_feet_elevated_pike_push_up', en: 'Feet-Elevated Pike Push-up', sets: 3, reps: '6-8', rest: '90s', rpe: '8' },
        { libId: 'wg_dragon_flag', en: 'Dragon Flag', sets: 3, reps: '5', rest: '90s', rpe: '8' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'wg_seated_forward_fold', en: 'Seated Forward Fold', sets: 1, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_s_gymnastics_in',
    sport: 'gymnastics',
    group: 'gymnastic',
    phase: 'in',
    ar: 'جمباز — أثناء الموسم (صيانة بجانب الروتين)',
    en: 'Gymnastics — In-season (maintenance alongside routines)',
    note: {
      ar: 'صيانة قصيرة للقوة الأساسية والقفز والتوازن بجانب تدريب المهارات في موسم البطولات. الحجم قليل عشان الجسم يفضل فريش للروتين.',
      en: 'Short maintenance of base strength, jumping and balance alongside skill training in competition season. Keep volume low so the body stays fresh for routines.'
    },
    sections: {
      warmup: [
        { libId: 'ad_wrist_active_range_of_motion', en: 'Wrist Active Range of Motion', sets: 1, reps: '10' },
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '5' }
      ],
      main: [
        { libId: 'wg_l_sit_hold', en: 'L-Sit Hold', sets: 3, reps: '10s', rest: '60s', rpe: '7' },
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 3, reps: '3', rest: '60s', rpe: '6' },
        { libId: 'ex_hollow_body_hold', en: 'Hollow Body Hold', sets: 2, reps: '20s', rest: '45s', rpe: '6' },
        { libId: 'wg_scapular_pull_up', en: 'Scapular Pull-up', sets: 2, reps: '8', rest: '45s', rpe: '5' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 2, reps: '30s/side', rest: '30s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_bretzel_stretch', en: 'Bretzel Stretch', sets: 1, reps: '30s/side' }
      ],
      flexibility: [
        { libId: 'wg_seated_forward_fold', en: 'Seated Forward Fold', sets: 1, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_s_yoga_off',
    sport: 'yoga',
    group: 'gymnastic',
    phase: 'off',
    ar: 'يوجا — أساس (ثبات وتنفس)',
    en: 'Yoga — Foundation (stability & breathing)',
    note: {
      ar: 'أساس ثبات للجذع والكتف والحوض، مع تنفس بطيء من المناخير في كل وضع. ادخل الوضع لحد إحساس شد مريح، مش ألم.',
      en: 'A stability base for the trunk, shoulders and pelvis, with slow nasal breathing in every position. Go only to a comfortable stretch, never to pain.'
    },
    sections: {
      warmup: [
        { libId: 'ex_cat_cow', en: 'Cat-Cow', sets: 2, reps: '8' },
        { libId: 'ad_quadruped_rock_back', en: 'Quadruped Rock Back', sets: 1, reps: '8' }
      ],
      main: [
        { libId: 'wg_bear_plank', en: 'Bear Plank', sets: 3, reps: '20s', rest: '45s', rpe: '5' },
        { libId: 'ex_glute_bridge', en: 'Glute Bridge', sets: 3, reps: '12', rest: '45s', rpe: '5' },
        { libId: 'ex_bird_dog', en: 'Bird Dog', sets: 3, reps: '8/side', rest: '45s', rpe: '5' },
        { libId: 'ad_kneeling_side_plank', en: 'Kneeling Side Plank', sets: 2, reps: '20s/side', rest: '45s', rpe: '5' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 2, reps: '30s/side', rest: '30s', rpe: '4' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_deep_squat_hold', en: 'Deep Squat Hold', sets: 2, reps: '30s' }
      ],
      flexibility: [
        { libId: 'ex_childs_pose', en: 'Child\'s Pose', sets: 2, reps: '45s' }
      ]
    }
  },
  {
    id: 'tpl_s_yoga_pre',
    sport: 'yoga',
    group: 'gymnastic',
    phase: 'pre',
    ar: 'يوجا — تطوير (قوة في المدى الكامل)',
    en: 'Yoga — Progression (strength through full range)',
    note: {
      ar: 'تطوير القوة في المدى الكامل: هندو بوش أب (زي تحية الشمس)، وتوازن على رجل، وكوساك سكوات، وتركيش جت أب. حافظ على نفس ثابت، ولو النفس اتقطع يبقى الوضع أصعب من مستواك دلوقتي.',
      en: 'Build strength through full range: Hindu push-ups (sun-salutation style), single-leg balance, Cossack squats and Turkish get-ups. Keep the breath steady; if it breaks, the position is beyond your current level.'
    },
    sections: {
      warmup: [
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 2, reps: '5' },
        { libId: 'ex_cat_cow', en: 'Cat-Cow', sets: 1, reps: '8' }
      ],
      main: [
        { libId: 'wg_hindu_push_up', en: 'Hindu Push-up', sets: 3, reps: '6-8', rest: '60s', rpe: '6' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 3, reps: '30s/side', rest: '45s', rpe: '6' },
        { libId: 'wg_hip_airplane', en: 'Hip Airplane', sets: 3, reps: '5/side', rest: '45s', rpe: '6' },
        { libId: 'wg_cossack_squat', en: 'Cossack Squat', sets: 3, reps: '6/side', rest: '45s', rpe: '6' },
        { libId: 'ad_turkish_get_up', en: 'Turkish Get-Up', sets: 2, reps: '2/side', rest: '60s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 1, reps: '5/side' }
      ],
      flexibility: [
        { libId: 'ad_pigeon_stretch', en: 'Pigeon Stretch', sets: 2, reps: '45s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_yoga_in',
    sport: 'yoga',
    group: 'gymnastic',
    phase: 'in',
    ar: 'يوجا — قمة وصيانة (مستوى متقدم)',
    en: 'Yoga — Peak & maintenance (advanced practice)',
    note: {
      ar: 'مستوى متقدم يحافظ على القوة والمرونة: سايد بلانك نجمة، وبايك بوش أب لتجهيز الوقوف على الراس، وتوازن متحرك. ما تعملش وقوف على الراس أو ضغط على الرقبة من غير مدرب وكتف قوي.',
      en: 'An advanced level that maintains strength and flexibility: star side planks, pike push-ups to prepare for inversions and dynamic balance. Do not load the neck in headstands without a coach and strong shoulders.'
    },
    sections: {
      warmup: [
        { libId: 'ex_cat_cow', en: 'Cat-Cow', sets: 1, reps: '8' },
        { libId: 'ad_open_book', en: 'Open Book', sets: 1, reps: '6/side' }
      ],
      main: [
        { libId: 'ad_star_side_plank', en: 'Star Side Plank', sets: 3, reps: '15s/side', rest: '45s', rpe: '7' },
        { libId: 'wg_pike_push_up', en: 'Pike Push-up', sets: 3, reps: '6', rest: '60s', rpe: '7' },
        { libId: 'ex_hollow_body_hold', en: 'Hollow Body Hold', sets: 3, reps: '30s', rest: '45s', rpe: '7' },
        { libId: 'wg_hip_airplane', en: 'Hip Airplane', sets: 2, reps: '5/side', rest: '45s', rpe: '6' },
        { libId: 'ad_single_leg_clock_reach', en: 'Single-Leg Clock Reach', sets: 2, reps: '5/side', rest: '30s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_bretzel_stretch', en: 'Bretzel Stretch', sets: 1, reps: '45s/side' }
      ],
      flexibility: [
        { libId: 'wg_seated_forward_fold', en: 'Seated Forward Fold', sets: 2, reps: '60s' }
      ]
    }
  },
  {
    id: 'tpl_s_pilates_off',
    sport: 'pilates',
    group: 'gymnastic',
    phase: 'off',
    ar: 'بيلاتس — أساس (تحكم في الجذع)',
    en: 'Pilates — Foundation (core control)',
    note: {
      ar: 'أساس تحكم في الجذع والحوض (الوضع المحايد) مع تنفس جانبي في الضلوع. الحركة بطيئة ومتحكم فيها، وأسفل الضهر ما يرفعش عن الأرض في الديد بج.',
      en: 'A foundation of trunk and pelvic control (neutral spine) with lateral rib breathing. Move slowly with control, and keep the low back on the floor during dead bugs.'
    },
    sections: {
      warmup: [
        { libId: 'ad_supine_pelvic_tilt', en: 'Supine Pelvic Tilt', sets: 2, reps: '10' },
        { libId: 'ex_cat_cow', en: 'Cat-Cow', sets: 1, reps: '8' }
      ],
      main: [
        { libId: 'ex_dead_bug', en: 'Dead Bug', sets: 3, reps: '8/side', rest: '45s', rpe: '5' },
        { libId: 'ex_glute_bridge', en: 'Glute Bridge', sets: 3, reps: '12', rest: '45s', rpe: '5' },
        { libId: 'wg_side_lying_leg_raise', en: 'Side-Lying Leg Raise', sets: 2, reps: '12/side', rest: '30s', rpe: '5' },
        { libId: 'ex_bird_dog', en: 'Bird Dog', sets: 3, reps: '8/side', rest: '45s', rpe: '5' },
        { libId: 'ad_mcgill_curl_up', en: 'McGill Curl-Up', sets: 3, reps: '8', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_supine_spinal_twist', en: 'Supine Spinal Twist', sets: 1, reps: '30s/side' }
      ],
      flexibility: [
        { libId: 'ex_childs_pose', en: 'Child\'s Pose', sets: 1, reps: '45s' }
      ]
    }
  },
  {
    id: 'tpl_s_pilates_pre',
    sport: 'pilates',
    group: 'gymnastic',
    phase: 'pre',
    ar: 'بيلاتس — تطوير (مستوى أصعب)',
    en: 'Pilates — Progression (harder progressions)',
    note: {
      ar: 'تطوير بمستوى أصعب: هولو، ومارش على الكوبري، وسايد بلانك متحرك، وسوبرمان زي حركة "السباحة" في البيلاتس. خلي الضهر محايد والرقبة مرتاحة طول الوقت.',
      en: 'Harder progressions: hollow holds, bridge marches, side-plank dips and supermans like the Pilates "swimming". Keep a neutral spine and a relaxed neck throughout.'
    },
    sections: {
      warmup: [
        { libId: 'ad_supine_pelvic_tilt', en: 'Supine Pelvic Tilt', sets: 1, reps: '10' },
        { libId: 'wg_cat_cow_stretch', en: 'Cat-Cow Stretch', sets: 1, reps: '8' }
      ],
      main: [
        { libId: 'ex_hollow_body_hold', en: 'Hollow Body Hold', sets: 3, reps: '20s', rest: '45s', rpe: '6' },
        { libId: 'wg_glute_bridge_march', en: 'Glute Bridge March', sets: 3, reps: '8/side', rest: '45s', rpe: '6' },
        { libId: 'wg_side_plank_hip_dip', en: 'Side Plank Hip Dip', sets: 3, reps: '10/side', rest: '45s', rpe: '6' },
        { libId: 'ex_superman', en: 'Superman', sets: 3, reps: '10', rest: '45s', rpe: '6' },
        { libId: 'wg_toe_touch', en: 'Toe Touch', sets: 3, reps: '10', rest: '45s', rpe: '6' },
        { libId: 'wg_clamshell', en: 'Clamshell', sets: 2, reps: '15/side', rest: '30s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_supine_spinal_twist', en: 'Supine Spinal Twist', sets: 1, reps: '30s/side' }
      ],
      flexibility: [
        { libId: 'wg_seated_forward_fold', en: 'Seated Forward Fold', sets: 1, reps: '45s' }
      ]
    }
  },
  {
    id: 'tpl_s_pilates_in',
    sport: 'pilates',
    group: 'gymnastic',
    phase: 'in',
    ar: 'بيلاتس — قمة وصيانة (مستوى متقدم)',
    en: 'Pilates — Peak & maintenance (advanced level)',
    note: {
      ar: 'مستوى متقدم: تيزر (V-Up)، وبادي سو، وبايك على الكورة لقوة الجذع الكاملة. لو أسفل الضهر اتقوّس أو الرقبة شدّت، ارجع للمستوى الأسهل.',
      en: 'Advanced level: teaser (V-up), body saw and stability-ball pike for full trunk strength. If the low back arches or the neck strains, return to the easier level.'
    },
    sections: {
      warmup: [
        { libId: 'wg_cat_cow_stretch', en: 'Cat-Cow Stretch', sets: 1, reps: '8' },
        { libId: 'ad_supine_pelvic_tilt', en: 'Supine Pelvic Tilt', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'wg_v_up', en: 'V-Up', sets: 3, reps: '8', rest: '45s', rpe: '7' },
        { libId: 'ad_body_saw', en: 'Body Saw', sets: 3, reps: '8', rest: '45s', rpe: '7' },
        { libId: 'ad_stability_ball_pike', en: 'Stability Ball Pike', sets: 3, reps: '8', rest: '60s', rpe: '7' },
        { libId: 'wg_side_lying_hip_abduction', en: 'Side-Lying Hip Abduction', sets: 2, reps: '15/side', rest: '30s', rpe: '6' },
        { libId: 'wg_hip_airplane', en: 'Hip Airplane', sets: 2, reps: '5/side', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_thread_the_needle', en: 'Thread the Needle', sets: 1, reps: '6/side' }
      ],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_dance_off',
    sport: 'dance',
    group: 'gymnastic',
    phase: 'off',
    ar: 'رقص — أساس (قوة وحماية من الإصابات)',
    en: 'Dance — Foundation (strength & injury resilience)',
    note: {
      ar: 'أساس قوة للرجلين والسمانة والحوض يحمي من إصابات القفز والدوران، وجذع ثابت للتحكم. السمانة الأحادية من وضع عالي على المشط وبتحكم في النزول.',
      en: 'A strength base for legs, calves and hips that protects against jump and turn injuries, plus a stable trunk for control. Do single-leg calf raises to full height with a slow lowering.'
    },
    sections: {
      warmup: [
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' },
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '10', rest: '90s', rpe: '6' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 3, reps: '8/side', rest: '60s', rpe: '6' },
        { libId: 'wg_single_leg_calf_raise', en: 'Single-Leg Calf Raise', sets: 3, reps: '12/side', rest: '45s', rpe: '7' },
        { libId: 'wg_side_lying_hip_abduction', en: 'Side-Lying Hip Abduction', sets: 2, reps: '15/side', rest: '30s', rpe: '6' },
        { libId: 'ex_dead_bug', en: 'Dead Bug', sets: 3, reps: '8/side', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 1, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'wg_butterfly_stretch', en: 'Butterfly Stretch', sets: 1, reps: '45s' }
      ]
    }
  },
  {
    id: 'tpl_s_dance_pre',
    sport: 'dance',
    group: 'gymnastic',
    phase: 'pre',
    ar: 'رقص — تجهيز للعروض (قفز وهبوط وتحمل)',
    en: 'Dance — Pre-performance (jumps, landings & stamina)',
    note: {
      ar: 'تجهيز للعروض: قفز وهبوط متحكم فيه، وتوازن أحادي، وقوة رفع الرجل، مع تحمل بالحبل زي طول الرقصة. الهبوط دايمًا من المشط للكعب والركبة في خط الصباع.',
      en: 'Performance prep: controlled jumps and landings, single-leg balance and leg-lift strength, with jump-rope stamina matching piece length. Always land toe-to-heel with the knee over the toes.'
    },
    sections: {
      warmup: [
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 2, reps: '15' },
        { libId: 'ad_walking_hip_opener', en: 'Walking Hip Opener', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'wg_jump_squat', en: 'Jump Squat', sets: 3, reps: '6', rest: '90s', rpe: '7' },
        { libId: 'ad_single_leg_forward_hop_and_stick', en: 'Single-Leg Forward Hop and Stick', sets: 3, reps: '4/side', rest: '60s', rpe: '7' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 3, reps: '30s/side', rest: '30s', rpe: '6' },
        { libId: 'wg_skater_squat', en: 'Skater Squat', sets: 3, reps: '6/side', rest: '60s', rpe: '7' },
        { libId: 'ad_supine_banded_psoas_march', en: 'Supine Banded Psoas March', sets: 2, reps: '10/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'dr_jump_rope_intervals', en: 'Jump Rope Intervals', sets: 5, reps: '1min', rest: '30s', rpe: '7' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_dance_in',
    sport: 'dance',
    group: 'gymnastic',
    phase: 'in',
    ar: 'رقص — فترة العروض (صيانة خفيفة)',
    en: 'Dance — Performance season (light maintenance)',
    note: {
      ar: 'صيانة قصيرة للقوة والتوازن في فترة العروض والبروفات الكتير. خفيفة جدًا يوم العرض أو اليوم اللي قبله.',
      en: 'Short strength and balance maintenance during performance runs with heavy rehearsal loads. Keep it very light on show day or the day before.'
    },
    sections: {
      warmup: [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' },
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '8', rest: '60s', rpe: '6' },
        { libId: 'wg_single_leg_calf_raise', en: 'Single-Leg Calf Raise', sets: 2, reps: '12/side', rest: '45s', rpe: '6' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 2, reps: '30s/side', rest: '30s', rpe: '5' },
        { libId: 'ex_dead_bug', en: 'Dead Bug', sets: 2, reps: '8/side', rest: '45s', rpe: '5' },
        { libId: 'wg_clamshell', en: 'Clamshell', sets: 2, reps: '15/side', rest: '30s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 1, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_cheerleading_off',
    sport: 'cheerleading',
    group: 'gymnastic',
    phase: 'off',
    ar: 'تشجيع استعراضي — خارج الموسم (قوة للرفعات)',
    en: 'Cheerleading — Off-season (strength for stunts)',
    note: {
      ar: 'قوة عامة للرجلين والضغط فوق الراس (لرفع الطيارين)، وجسم مشدود. الضغط فوق الراس بضلوع لتحت وضهر محايد.',
      en: 'General leg and overhead strength for lifting flyers, plus full-body tension. Press overhead with ribs down and a neutral spine.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' },
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '5' }
      ],
      main: [
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 3, reps: '6', rest: '120s', rpe: '7' },
        { libId: 'wg_push_press', en: 'Push Press', sets: 3, reps: '6', rest: '120s', rpe: '7' },
        { libId: 'ek_body_row', en: 'Inverted Row', sets: 3, reps: '8-10', rest: '90s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'ex_hollow_body_hold', en: 'Hollow Body Hold', sets: 3, reps: '30s', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_wall_slides', en: 'Wall Slides', sets: 1, reps: '10' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_cheerleading_pre',
    sport: 'cheerleading',
    group: 'gymnastic',
    phase: 'pre',
    ar: 'تشجيع استعراضي — قبل الموسم (قفز ورفعات ولياقة روتين)',
    en: 'Cheerleading — Pre-season (jumps, stunts & routine fitness)',
    note: {
      ar: 'قدرة انفجارية للقفزات والرفعات، وثبات الكتف تحت الوزن فوق الراس، ولياقة قصيرة عالية زي طول الروتين. في الرفعات الجماعية لازم سبوتر دايمًا.',
      en: 'Explosive power for jumps and stunts, shoulder stability under overhead load, and short high-intensity conditioning matching routine length. Group stunts always need a spotter.'
    },
    sections: {
      warmup: [
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 2, reps: '15' },
        { libId: 'ad_wrist_active_range_of_motion', en: 'Wrist Active Range of Motion', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'wg_push_press', en: 'Push Press', sets: 4, reps: '3', rest: '150s', rpe: '8' },
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 4, reps: '3', rest: '90s', rpe: '8' },
        { libId: 'ad_tuck_jump', en: 'Tuck Jump', sets: 3, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'ad_overhead_carry', en: 'Overhead Carry', sets: 3, reps: '20m', rest: '60s', rpe: '7' },
        { libId: 'wg_v_up', en: 'V-Up', sets: 3, reps: '10', rest: '45s', rpe: '7' }
      ],
      cardio: [
        { libId: 'dr_tabata', en: 'Tabata (20/10 × 8)', sets: 1, reps: '8x20s/10s', rpe: '9' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_cheerleading_in',
    sport: 'cheerleading',
    group: 'gymnastic',
    phase: 'in',
    ar: 'تشجيع استعراضي — أثناء الموسم (صيانة بين البطولات)',
    en: 'Cheerleading — In-season (maintenance between competitions)',
    note: {
      ar: 'صيانة قصيرة للقوة والقفز وثبات الكتف بين البطولات. قلّل الحجم لو أسبوع البطولة فيه بروفات كتير.',
      en: 'Short maintenance of strength, jumping and shoulder stability between competitions. Cut volume further if competition week is full of rehearsals.'
    },
    sections: {
      warmup: [
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 1, reps: '15' },
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'wg_push_press', en: 'Push Press', sets: 3, reps: '2', rest: '120s', rpe: '7' },
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 3, reps: '3', rest: '60s', rpe: '6' },
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '8', rest: '60s', rpe: '6' },
        { libId: 'ad_overhead_carry', en: 'Overhead Carry', sets: 2, reps: '20m', rest: '60s', rpe: '6' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 2, reps: '20s/side', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_wall_slides', en: 'Wall Slides', sets: 1, reps: '10' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_skiing_off',
    sport: 'skiing',
    group: 'winter',
    phase: 'off',
    ar: 'تزلج على الجليد — خارج الموسم (قوة فخذ وقاعدة هوائية)',
    en: 'Skiing — Off-season (quad strength & aerobic base)',
    note: {
      ar: 'قوة عامة للفخذ والحوض ومقاومة ثابتة (وول سيت) زي وضع التزلج، مع قاعدة هوائية على العجلة. الركبة في خط الصباع في كل الحركات عشان الرباط الصليبي.',
      en: 'General quad and hip strength with isometric holds (wall sit) that mimic the ski stance, plus an aerobic base on the bike. Keep knees over toes on every rep to protect the ACL.'
    },
    sections: {
      warmup: [
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' },
        { libId: 'wg_banded_lateral_walk', en: 'Banded Lateral Walk', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'ex_wall_sit', en: 'Wall Sit', sets: 3, reps: '45s', rest: '60s', rpe: '7' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 3, reps: '30s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_steady_state_bike_ride', en: 'Steady-State Bike Ride', sets: 1, reps: '40min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_quad_stretch', en: 'Quad Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_skiing_pre',
    sport: 'skiing',
    group: 'winter',
    phase: 'pre',
    ar: 'تزلج على الجليد — قبل الموسم (قدرة جانبية وثبات هبوط)',
    en: 'Skiing — Pre-season (lateral power & landing control)',
    note: {
      ar: 'قدرة جانبية وثبات في الهبوط زي اللفات على الجليد، مع إنترفال على السكي إرج. ثبّت الهبوط ثانيتين وما تسيبش الركبة تدخل لجوه.',
      en: 'Lateral power and landing control that mirror turns on snow, with SkiErg intervals. Stick each landing for two seconds and never let the knee cave in.'
    },
    sections: {
      warmup: [
        { libId: 'wg_banded_lateral_walk', en: 'Banded Lateral Walk', sets: 1, reps: '10/side' },
        { libId: 'ad_carioca', en: 'Carioca', sets: 1, reps: '20m/side' }
      ],
      main: [
        { libId: 'wg_skater_hop', en: 'Skater Hop', sets: 4, reps: '6/side', rest: '60s', rpe: '8' },
        { libId: 'dr_hurdle_lateral', en: 'Lateral Hurdle Hops', sets: 3, reps: '6', rest: '90s', rpe: '7' },
        { libId: 'ad_lateral_bound_and_stick', en: 'Lateral Bound and Stick', sets: 3, reps: '4/side', rest: '90s', rpe: '7' },
        { libId: 'wg_cossack_squat', en: 'Cossack Squat', sets: 3, reps: '6/side', rest: '60s', rpe: '7' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 3, reps: '10/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_skierg_sprint_intervals', en: 'SkiErg Sprint Intervals', sets: 6, reps: '30s', rest: '90s', rpe: '8' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_skiing_in',
    sport: 'skiing',
    group: 'winter',
    phase: 'in',
    ar: 'تزلج على الجليد — أثناء الموسم (صيانة أيام التزلج)',
    en: 'Skiing — In-season (on-snow maintenance)',
    note: {
      ar: 'صيانة قصيرة للقوة والثبات في أيام التزلج، عشان الرجل ما تتعبش على الجبل. لو اتزحلقت كذا يوم ورا بعض، خليها في يوم الراحة أو قلّل الحجم للنص.',
      en: 'Short strength and stability maintenance during ski days so the legs do not fade on the mountain. After several consecutive ski days, do it on the rest day or halve the volume.'
    },
    sections: {
      warmup: [
        { libId: 'wg_banded_lateral_walk', en: 'Banded Lateral Walk', sets: 1, reps: '10/side' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '8', rest: '90s', rpe: '6' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 2, reps: '6/side', rest: '60s', rpe: '6' },
        { libId: 'wg_skater_hop', en: 'Skater Hop', sets: 2, reps: '5/side', rest: '60s', rpe: '6' },
        { libId: 'ex_wall_sit', en: 'Wall Sit', sets: 2, reps: '30s', rest: '45s', rpe: '6' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 2, reps: '10/side', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' }
      ],
      flexibility: [
        { libId: 'ex_quad_stretch', en: 'Quad Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_ice_skating_off',
    sport: 'ice_skating',
    group: 'winter',
    phase: 'off',
    ar: 'تزحلق على الجليد — خارج الموسم (قوة أحادية وضامة)',
    en: 'Ice skating — Off-season (single-leg strength & adductors)',
    note: {
      ar: 'قوة أحادية للرجلين وتقوية الضامة (أكتر مكان بيتصاب في التزحلق) مع توازن على رجل. ابدأ الكوبنهاجن من الركبة لو صعبة.',
      en: 'Single-leg strength and adductor work (the most commonly injured area in skating) plus single-leg balance. Start Copenhagen planks from the knee if the full lever is too hard.'
    },
    sections: {
      warmup: [
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' },
        { libId: 'wg_banded_lateral_walk', en: 'Banded Lateral Walk', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 3, reps: '6', rest: '120s', rpe: '7' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_lateral_lunge', en: 'Lateral Lunge', sets: 3, reps: '8/side', rest: '60s', rpe: '7' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 3, reps: '20s/side', rest: '60s', rpe: '7' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 3, reps: '30s/side', rest: '30s', rpe: '5' }
      ],
      cardio: [
        { libId: 'ad_steady_state_bike_ride', en: 'Steady-State Bike Ride', sets: 1, reps: '30min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_ice_skating_pre',
    sport: 'ice_skating',
    group: 'winter',
    phase: 'pre',
    ar: 'تزحلق على الجليد — قبل الموسم (قفز بدوران وهبوط أحادي)',
    en: 'Ice skating — Pre-season (rotational jumps & single-leg landings)',
    note: {
      ar: 'قدرة انفجارية جانبية وقفز ودوران وثبات هبوط على رجل واحدة، مع تحمل قصير زي البرنامج. الهبوط على رجل واحدة وثبّت ثانيتين قبل التكرار اللي بعده.',
      en: 'Lateral power, jumping and rotation, and single-leg landing control, with short conditioning matching programme length. Land on one leg and hold for two seconds before the next rep.'
    },
    sections: {
      warmup: [
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' },
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 2, reps: '15' }
      ],
      main: [
        { libId: 'wg_skater_hop', en: 'Skater Hop', sets: 4, reps: '6/side', rest: '60s', rpe: '8' },
        { libId: 'ad_tuck_jump', en: 'Tuck Jump', sets: 3, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 3, reps: '5/side', rest: '60s', rpe: '7' },
        { libId: 'ad_single_leg_lateral_hop_and_stick', en: 'Single-Leg Lateral Hop and Stick', sets: 3, reps: '4/side', rest: '60s', rpe: '7' },
        { libId: 'wg_hip_airplane', en: 'Hip Airplane', sets: 2, reps: '5/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'dr_jump_rope_intervals', en: 'Jump Rope Intervals', sets: 5, reps: '1min', rest: '30s', rpe: '7' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_ice_skating_in',
    sport: 'ice_skating',
    group: 'winter',
    phase: 'in',
    ar: 'تزحلق على الجليد — أثناء الموسم (صيانة جنب ساعات الجليد)',
    en: 'Ice skating — In-season (maintenance alongside ice time)',
    note: {
      ar: 'صيانة قصيرة للقوة والضامة والتوازن جنب ساعات الجليد في الموسم. قبل المسابقة بيومين ما فيش قفز برا الجليد.',
      en: 'Short maintenance of strength, adductors and balance alongside in-season ice time. No off-ice jumping in the two days before a competition.'
    },
    sections: {
      warmup: [
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' },
        { libId: 'wg_banded_lateral_walk', en: 'Banded Lateral Walk', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '8', rest: '60s', rpe: '6' },
        { libId: 'wg_skater_squat', en: 'Skater Squat', sets: 2, reps: '5/side', rest: '60s', rpe: '6' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 2, reps: '15s/side', rest: '45s', rpe: '6' },
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 2, reps: '3', rest: '60s', rpe: '6' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 2, reps: '30s/side', rest: '30s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 1, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_golf_off',
    sport: 'golf',
    group: 'other',
    phase: 'off',
    ar: 'جولف — خارج الموسم (قوة ومقاومة دوران)',
    en: 'Golf — Off-season (strength & anti-rotation)',
    note: {
      ar: 'قوة عامة ومقاومة دوران الجذع (بالوف) وحركة في الضهر العلوي والحوض كأساس للضربة. أسفل الضهر ثابت، والدوران ييجي من الورك والصدر.',
      en: 'General strength, anti-rotation core work (Pallof) and upper-back and hip mobility as the base for the swing. Keep the low back stable and let rotation come from the hips and thoracic spine.'
    },
    sections: {
      warmup: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 1, reps: '6/side' },
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '6', rest: '120s', rpe: '7' },
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '8', rest: '90s', rpe: '7' },
        { libId: 'ex_one_arm_dumbbell_row', en: 'One-Arm Dumbbell Row', sets: 3, reps: '10/side', rest: '60s', rpe: '7' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 3, reps: '10/side', rest: '45s', rpe: '6' },
        { libId: 'ex_band_external_rotation', en: 'Band External Rotation', sets: 2, reps: '15/side', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_thread_the_needle', en: 'Thread the Needle', sets: 1, reps: '6/side' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_golf_pre',
    sport: 'golf',
    group: 'other',
    phase: 'pre',
    ar: 'جولف — قبل الموسم (سرعة المضرب)',
    en: 'Golf — Pre-season (club-head speed)',
    note: {
      ar: 'تحويل القوة لسرعة المضرب: رمي دوراني بالكرة الطبية، ولاندماين، وقفز للقوة الأرضية. كل رمية بأقصى سرعة، وعدد قليل عشان الجودة.',
      en: 'Turn strength into club-head speed: rotational medicine-ball throws, landmine rotations and jumps for ground force. Every throw at maximal speed, low reps for quality.'
    },
    sections: {
      warmup: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 1, reps: '6/side' },
        { libId: 'ad_cross_body_arm_swings', en: 'Cross-Body Arm Swings', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 4, reps: '5/side', rest: '90s', rpe: '8' },
        { libId: 'ad_landmine_rotation', en: 'Landmine Rotation', sets: 3, reps: '8/side', rest: '60s', rpe: '7' },
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 3, reps: '3', rest: '90s', rpe: '7' },
        { libId: 'ad_half_kneeling_cable_lift', en: 'Half-Kneeling Cable Lift', sets: 3, reps: '8/side', rest: '60s', rpe: '7' },
        { libId: 'wg_hip_airplane', en: 'Hip Airplane', sets: 2, reps: '5/side', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 1, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_golf_in',
    sport: 'golf',
    group: 'other',
    phase: 'in',
    ar: 'جولف — أثناء الموسم (صيانة أثناء البطولات)',
    en: 'Golf — In-season (tournament-season maintenance)',
    note: {
      ar: 'صيانة قصيرة للقوة وسرعة الدوران وصحة الكتف والضهر أثناء موسم البطولات. خليها بعيد عن يوم البطولة بيومين.',
      en: 'Short maintenance of strength, rotational speed and shoulder and back health during tournament season. Keep it at least two days away from a tournament round.'
    },
    sections: {
      warmup: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 1, reps: '6/side' },
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '8', rest: '60s', rpe: '6' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 2, reps: '4/side', rest: '60s', rpe: '6' },
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 2, reps: '15', rest: '45s', rpe: '5' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 2, reps: '10/side', rest: '45s', rpe: '5' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 2, reps: '6/side', rest: '60s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_thread_the_needle', en: 'Thread the Needle', sets: 1, reps: '6/side' }
      ],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_climbing_off',
    sport: 'climbing',
    group: 'other',
    phase: 'off',
    ar: 'تسلق — أساس (سحب وتعليق وتوازن الكتف)',
    en: 'Climbing — Foundation (pulling, hangs & shoulder balance)',
    note: {
      ar: 'أساس قوة سحب وتعليق، مع تمارين دفع وروتيتور كاف لتوازن الكتف. الأصابع بتتقوى أبطأ من العضل، فما تعملش تعليق على حواف صغيرة في المرحلة دي.',
      en: 'A base of pulling and hanging strength with pushing and rotator-cuff work to balance the shoulder. Fingers adapt more slowly than muscle, so avoid small-edge hangs in this phase.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' },
        { libId: 'wg_scapular_pull_up', en: 'Scapular Pull-up', sets: 2, reps: '8' }
      ],
      main: [
        { libId: 'ex_pullup', en: 'Pull-up', sets: 4, reps: '5-8', rest: '120s', rpe: '7' },
        { libId: 'wg_dead_hang', en: 'Dead Hang', sets: 3, reps: '20-30s', rest: '60s', rpe: '6' },
        { libId: 'ex_pushup', en: 'Push-up', sets: 3, reps: '12', rest: '60s', rpe: '6' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 2, reps: '12/side', rest: '45s', rpe: '5' },
        { libId: 'ex_hanging_leg_raise', en: 'Hanging Leg Raise', sets: 3, reps: '8', rest: '60s', rpe: '7' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_wall_slides', en: 'Wall Slides', sets: 1, reps: '10' }
      ],
      flexibility: [
        { libId: 'wg_doorway_chest_stretch', en: 'Doorway Chest Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_climbing_pre',
    sport: 'climbing',
    group: 'other',
    phase: 'pre',
    ar: 'تسلق — تطوير (سحب أقصى وقبضة)',
    en: 'Climbing — Progression (max pulling & grip)',
    note: {
      ar: 'تطوير قوة السحب القصوى والقبضة (بالفوطة) والجذع للأوفرهانج. أي وجع في الأصابع أو الكوع وقّف التمرين، والوزن الزيادة بخطوات صغيرة.',
      en: 'Develop maximal pulling, towel-grip strength and trunk strength for overhangs. Stop at any finger or elbow pain and add external load in small steps.'
    },
    sections: {
      warmup: [
        { libId: 'wg_scapular_pull_up', en: 'Scapular Pull-up', sets: 2, reps: '8' },
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'wg_weighted_pull_up', en: 'Weighted Pull-up', sets: 4, reps: '3-5', rest: '150s', rpe: '8' },
        { libId: 'wg_l_sit_pull_up', en: 'L-Sit Pull-up', sets: 3, reps: '5', rest: '90s', rpe: '8' },
        { libId: 'wg_towel_pull_up', en: 'Towel Pull-up', sets: 3, reps: '3-5', rest: '120s', rpe: '8' },
        { libId: 'ad_knees_to_elbows', en: 'Knees-to-Elbows', sets: 3, reps: '8', rest: '60s', rpe: '7' },
        { libId: 'wg_dip', en: 'Dip', sets: 3, reps: '8', rest: '90s', rpe: '7' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_climbing_in',
    sport: 'climbing',
    group: 'other',
    phase: 'in',
    ar: 'تسلق — قمة وصيانة (صيانة مع التسلق الكتير)',
    en: 'Climbing — Peak & maintenance (maintenance with high climbing volume)',
    note: {
      ar: 'صيانة قصيرة للسحب وتوازن الكتف في أيام التسلق الكتير أو قبل مشروع صعب. لو تسلقت يومين ورا بعض، خليها في يوم الراحة أو شيل السحب.',
      en: 'Short maintenance of pulling and shoulder balance during heavy climbing weeks or before a hard project. After two consecutive climbing days, do it on the rest day or drop the pulling.'
    },
    sections: {
      warmup: [
        { libId: 'wg_scapular_pull_up', en: 'Scapular Pull-up', sets: 1, reps: '8' },
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_pullup', en: 'Pull-up', sets: 3, reps: '4', rest: '120s', rpe: '7' },
        { libId: 'wg_active_hang', en: 'Active Hang', sets: 2, reps: '20s', rest: '60s', rpe: '6' },
        { libId: 'ex_pushup', en: 'Push-up', sets: 2, reps: '12', rest: '60s', rpe: '6' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 2, reps: '12/side', rest: '45s', rpe: '5' },
        { libId: 'wg_hollow_rock', en: 'Hollow Rock', sets: 2, reps: '12', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_wall_slides', en: 'Wall Slides', sets: 1, reps: '10' }
      ],
      flexibility: [
        { libId: 'wg_doorway_chest_stretch', en: 'Doorway Chest Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_equestrian_off',
    sport: 'equestrian',
    group: 'other',
    phase: 'off',
    ar: 'فروسية — خارج الموسم (قوة وضامة وثبات جذع)',
    en: 'Equestrian — Off-season (strength, adductors & trunk)',
    note: {
      ar: 'قوة عامة للرجلين والضامة (مسكة الحصان) وثبات الجذع عشان وضع الركوب، مع قاعدة هوائية. الضهر محايد والحوض ثابت في كل تمارين الجذع.',
      en: 'General leg and adductor strength (for the grip on the horse) and trunk stability for the riding position, with an aerobic base. Keep a neutral spine and a still pelvis on every core drill.'
    },
    sections: {
      warmup: [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' },
        { libId: 'ex_cat_cow', en: 'Cat-Cow', sets: 1, reps: '8' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '10', rest: '90s', rpe: '6' },
        { libId: 'wg_dumbbell_romanian_deadlift', en: 'Dumbbell Romanian Deadlift', sets: 3, reps: '10', rest: '90s', rpe: '7' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 3, reps: '20s/side', rest: '60s', rpe: '7' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 3, reps: '10/side', rest: '45s', rpe: '6' },
        { libId: 'ex_bird_dog', en: 'Bird Dog', sets: 3, reps: '8/side', rest: '45s', rpe: '5' }
      ],
      cardio: [
        { libId: 'ex_stationary_cycling', en: 'Stationary Cycling', sets: 1, reps: '20min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_equestrian_pre',
    sport: 'equestrian',
    group: 'other',
    phase: 'pre',
    ar: 'فروسية — قبل الموسم (ثبات خاص بالركوب)',
    en: 'Equestrian — Pre-season (riding-specific stability)',
    note: {
      ar: 'قوة ثابتة خاصة بالركوب: وضع النص وقوف (وول سيت)، وضغط الضامة، وتوازن، ومقاومة دوران الجذع. ركّز على نفس منتظم وأنت ماسك الوضع.',
      en: 'Riding-specific isometric strength: two-point position (wall sit), adductor squeezes, balance and anti-rotation core work. Keep breathing steadily while holding each position.'
    },
    sections: {
      warmup: [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' },
        { libId: 'ad_open_book', en: 'Open Book', sets: 1, reps: '6/side' }
      ],
      main: [
        { libId: 'ex_wall_sit', en: 'Wall Sit', sets: 3, reps: '45s', rest: '60s', rpe: '7' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 3, reps: '30s/side', rest: '30s', rpe: '6' },
        { libId: 'ad_supine_adductor_ball_squeeze', en: 'Supine Adductor Ball Squeeze', sets: 3, reps: '10x5s', rest: '45s', rpe: '6' },
        { libId: 'wg_half_kneeling_pallof_press', en: 'Half-Kneeling Pallof Press', sets: 3, reps: '10/side', rest: '45s', rpe: '6' },
        { libId: 'ex_step_up', en: 'Step-Up', sets: 3, reps: '8/side', rest: '60s', rpe: '7' }
      ],
      cardio: [
        { libId: 'ad_steady_state_row', en: 'Steady-State Row', sets: 1, reps: '15min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_equestrian_in',
    sport: 'equestrian',
    group: 'other',
    phase: 'in',
    ar: 'فروسية — أثناء الموسم (صيانة أثناء المسابقات)',
    en: 'Equestrian — In-season (competition-season maintenance)',
    note: {
      ar: 'صيانة قصيرة للقوة وثبات الجذع أثناء موسم المسابقات. خفيفة عشان الرجلين تفضل فريش على الحصان.',
      en: 'Short maintenance of strength and trunk stability during competition season. Keep it light so the legs stay fresh in the saddle.'
    },
    sections: {
      warmup: [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' },
        { libId: 'ex_cat_cow', en: 'Cat-Cow', sets: 1, reps: '8' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '8', rest: '60s', rpe: '6' },
        { libId: 'ex_wall_sit', en: 'Wall Sit', sets: 2, reps: '30s', rest: '45s', rpe: '6' },
        { libId: 'ex_bird_dog', en: 'Bird Dog', sets: 2, reps: '8/side', rest: '45s', rpe: '5' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 2, reps: '20s/side', rest: '45s', rpe: '5' },
        { libId: 'ad_supine_adductor_ball_squeeze', en: 'Supine Adductor Ball Squeeze', sets: 2, reps: '10x5s', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 1, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_archery_off',
    sport: 'archery',
    group: 'other',
    phase: 'off',
    ar: 'رماية بالسهام — خارج الموسم (ضهر وكتف متوازن)',
    en: 'Archery — Off-season (balanced back & shoulders)',
    note: {
      ar: 'قوة ضهر وكتف متوازنة (شد ودفع) وثبات جذع ورجلين عشان وقفة ثابتة. جنب الشد بيتعب أكتر، فاشتغل على الجنبين بنفس العدد.',
      en: 'Balanced back and shoulder strength (pull and push) plus trunk and leg stability for a steady stance. The drawing side works harder in the sport, so train both sides equally.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '12' }
      ],
      main: [
        { libId: 'ex_one_arm_dumbbell_row', en: 'One-Arm Dumbbell Row', sets: 3, reps: '10/side', rest: '60s', rpe: '7' },
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 3, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ex_pushup', en: 'Push-up', sets: 3, reps: '10-12', rest: '60s', rpe: '6' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 2, reps: '12/side', rest: '45s', rpe: '5' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 3, reps: '10/side', rest: '45s', rpe: '6' },
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '10', rest: '60s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 1, reps: '6/side' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_archery_pre',
    sport: 'archery',
    group: 'other',
    phase: 'pre',
    ar: 'رماية بالسهام — قبل الموسم (تحمل ثابت للكتف)',
    en: 'Archery — Pre-season (isometric shoulder endurance)',
    note: {
      ar: 'تحمل ثابت للكتف والضهر (مسكات أيزومتريك) زي لحظة التصويب، وثبات وقفة. امسك 3 ثواني في آخر الشد، والكتف لتحت بعيد عن الودن.',
      en: 'Isometric shoulder and back endurance like the aiming hold, plus stance stability. Pause 3 seconds at the end of each pull and keep the shoulders down away from the ears.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '12' },
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ad_isometric_shoulder_external_rotation', en: 'Isometric Shoulder External Rotation', sets: 3, reps: '5x10s', rest: '45s', rpe: '6' },
        { libId: 'wg_single_arm_cable_row', en: 'Single-Arm Cable Row', sets: 3, reps: '10/side', rest: '60s', rpe: '7' },
        { libId: 'ad_suitcase_hold', en: 'Suitcase Hold', sets: 3, reps: '30s/side', rest: '60s', rpe: '6' },
        { libId: 'ex_rear_delt_fly', en: 'Rear Delt Fly', sets: 3, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ad_tandem_stance_hold', en: 'Tandem Stance Hold', sets: 3, reps: '30s', rest: '30s', rpe: '4' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_thread_the_needle', en: 'Thread the Needle', sets: 1, reps: '6/side' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_archery_in',
    sport: 'archery',
    group: 'other',
    phase: 'in',
    ar: 'رماية بالسهام — أثناء الموسم (صيانة صحة الكتف)',
    en: 'Archery — In-season (shoulder-health maintenance)',
    note: {
      ar: 'صيانة قصيرة لصحة الكتف والضهر بين أيام الرمي الكتير. خليها بعيد عن يوم المسابقة، وما فيش تعب للكتف قبلها.',
      en: 'Short shoulder and back health maintenance between high-volume shooting days. Keep it away from competition day with no shoulder fatigue beforehand.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '12' }
      ],
      main: [
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 2, reps: '15', rest: '45s', rpe: '5' },
        { libId: 'wg_single_arm_cable_row', en: 'Single-Arm Cable Row', sets: 2, reps: '10/side', rest: '60s', rpe: '6' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 2, reps: '12/side', rest: '45s', rpe: '5' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 2, reps: '20s/side', rest: '45s', rpe: '5' },
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '8', rest: '60s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 1, reps: '6/side' }
      ],
      flexibility: [
        { libId: 'ad_levator_scapulae_stretch', en: 'Levator Scapulae Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_shooting_off',
    sport: 'shooting',
    group: 'other',
    phase: 'off',
    ar: 'رماية — خارج الموسم (ثبات وقفة وكارديو هادي)',
    en: 'Shooting — Off-season (stance stability & easy cardio)',
    note: {
      ar: 'قوة عامة للجذع والضهر العلوي والكتف لثبات الوقفة وشيل السلاح، مع كارديو هادي يقلل نبض الراحة. وقفة ثابتة ورقبة محايدة من غير ميل زيادة.',
      en: 'General trunk, upper-back and shoulder strength for a stable stance and holding the firearm, with easy cardio to lower resting heart rate. Keep a steady stance and a neutral neck.'
    },
    sections: {
      warmup: [
        { libId: 'ad_chin_tuck', en: 'Chin Tuck', sets: 1, reps: '10' },
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '10', rest: '60s', rpe: '6' },
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 3, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ex_one_arm_dumbbell_row', en: 'One-Arm Dumbbell Row', sets: 3, reps: '10/side', rest: '60s', rpe: '6' },
        { libId: 'ex_plank', en: 'Plank', sets: 3, reps: '30s', rest: '45s', rpe: '6' },
        { libId: 'ad_tandem_stance_hold', en: 'Tandem Stance Hold', sets: 3, reps: '30s', rest: '30s', rpe: '4' },
        { libId: 'ex_farmers_carry', en: 'Farmer\'s Carry', sets: 3, reps: '30m', rest: '60s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_brisk_walk', en: 'Brisk Walk', sets: 1, reps: '20min' }
      ],
      mobility: [],
      flexibility: []
    }
  },
  {
    id: 'tpl_s_shooting_pre',
    sport: 'shooting',
    group: 'other',
    phase: 'pre',
    ar: 'رماية — قبل الموسم (مسكات ثبات وتنفس)',
    en: 'Shooting — Pre-season (stability holds & breathing)',
    note: {
      ar: 'ثبات خاص بالرماية: مسكات للجذع والكتف، وتوازن، وقبضة متحكم فيها، مع كارديو هادي. اشتغل على النفس البطيء وأنت ماسك الوضع زي لحظة الضرب.',
      en: 'Shooting-specific stability: trunk and shoulder holds, balance and controlled grip work, with easy cardio. Practise slow breathing while holding each position, as at the moment of the shot.'
    },
    sections: {
      warmup: [
        { libId: 'ad_chin_tuck', en: 'Chin Tuck', sets: 1, reps: '10' },
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '3/direction' }
      ],
      main: [
        { libId: 'ad_suitcase_hold', en: 'Suitcase Hold', sets: 3, reps: '30s/side', rest: '60s', rpe: '6' },
        { libId: 'wg_cable_pallof_hold', en: 'Cable Pallof Hold', sets: 3, reps: '20s/side', rest: '45s', rpe: '6' },
        { libId: 'ad_tandem_stance_hold', en: 'Tandem Stance Hold', sets: 3, reps: '30s', rest: '30s', rpe: '4' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 3, reps: '30s/side', rest: '30s', rpe: '5' },
        { libId: 'ad_grip_squeeze', en: 'Grip Squeeze', sets: 3, reps: '10x5s', rest: '45s', rpe: '5' }
      ],
      cardio: [
        { libId: 'ad_steady_state_bike_ride', en: 'Steady-State Bike Ride', sets: 1, reps: '20min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ad_levator_scapulae_stretch', en: 'Levator Scapulae Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_shooting_in',
    sport: 'shooting',
    group: 'other',
    phase: 'in',
    ar: 'رماية — أثناء الموسم (صيانة خفيفة)',
    en: 'Shooting — In-season (light maintenance)',
    note: {
      ar: 'صيانة خفيفة لثبات الجذع والرقبة والكتف بعيد عن المسابقة. خليها قصيرة وما تتعبش الدراع يوم قبل المسابقة.',
      en: 'Light maintenance of trunk, neck and shoulder stability away from competition. Keep it short and do not fatigue the arms the day before competing.'
    },
    sections: {
      warmup: [
        { libId: 'ad_chin_tuck', en: 'Chin Tuck', sets: 1, reps: '10' },
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 2, reps: '15', rest: '45s', rpe: '5' },
        { libId: 'ex_plank', en: 'Plank', sets: 2, reps: '30s', rest: '45s', rpe: '5' },
        { libId: 'ad_tandem_stance_hold', en: 'Tandem Stance Hold', sets: 2, reps: '30s', rest: '30s', rpe: '4' },
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '8', rest: '60s', rpe: '5' },
        { libId: 'ad_deep_neck_flexor_head_lift', en: 'Deep Neck Flexor Head Lift', sets: 2, reps: '8', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_thread_the_needle', en: 'Thread the Needle', sets: 1, reps: '6/side' }
      ],
      flexibility: [
        { libId: 'ad_levator_scapulae_stretch', en: 'Levator Scapulae Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_skating_off',
    sport: 'skating',
    group: 'other',
    phase: 'off',
    ar: 'تزلج بعجل — أساس (قوة وثبات كاحل)',
    en: 'Skateboarding — Foundation (strength & ankle stability)',
    note: {
      ar: 'أساس قوة للرجلين وثبات الكاحل والتوازن اللي كل حركة على البورد محتاجاه. الكاحل أكتر مكان بيتصاب فتقويته أساسية، والبس الحماية دايمًا على البورد.',
      en: 'A strength base for the legs plus the ankle stability and balance every board move depends on. The ankle is the most injured area, so strengthen it and always wear protective gear on the board.'
    },
    sections: {
      warmup: [
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '10', rest: '60s', rpe: '6' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 3, reps: '8/side', rest: '60s', rpe: '6' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 3, reps: '30s/side', rest: '30s', rpe: '5' },
        { libId: 'ad_banded_ankle_eversion', en: 'Banded Ankle Eversion', sets: 2, reps: '15/side', rest: '45s', rpe: '5' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 3, reps: '30s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_knee_to_wall_ankle_mobilization', en: 'Knee-to-Wall Ankle Mobilization', sets: 1, reps: '10/side' }
      ],
      flexibility: [
        { libId: 'ex_quad_stretch', en: 'Quad Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_skating_pre',
    sport: 'skating',
    group: 'other',
    phase: 'pre',
    ar: 'تزلج بعجل — تطوير (قفز وهبوط ودوران)',
    en: 'Skateboarding — Progression (pop, landings & rotation)',
    note: {
      ar: 'تطوير القفز (أولي) والهبوط الناعم من ارتفاع، ودوران الجذع للّفات. اتعلّم تمتص الهبوط بالركبة والورك، وابدأ من ارتفاع واطي.',
      en: 'Develop pop (ollie), soft landings from height and trunk rotation for spins. Learn to absorb landings through knees and hips, starting from a low height.'
    },
    sections: {
      warmup: [
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 2, reps: '15' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ad_tuck_jump', en: 'Tuck Jump', sets: 3, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'ad_single_leg_lateral_hop_and_stick', en: 'Single-Leg Lateral Hop and Stick', sets: 3, reps: '4/side', rest: '60s', rpe: '7' },
        { libId: 'ad_depth_drop', en: 'Depth Drop', sets: 3, reps: '4', rest: '90s', rpe: '6' },
        { libId: 'wg_cossack_squat', en: 'Cossack Squat', sets: 3, reps: '6/side', rest: '60s', rpe: '7' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 3, reps: '5/side', rest: '60s', rpe: '7' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_knee_to_wall_ankle_mobilization', en: 'Knee-to-Wall Ankle Mobilization', sets: 1, reps: '10/side' }
      ],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_skating_in',
    sport: 'skating',
    group: 'other',
    phase: 'in',
    ar: 'تزلج بعجل — قمة وصيانة (صيانة الكاحل والهبوط)',
    en: 'Skateboarding — Peak & maintenance (ankle & landing maintenance)',
    note: {
      ar: 'صيانة قصيرة لثبات الكاحل والهبوط والتوازن في أيام السكيت الكتير. لو عندك التواء قديم في الكاحل، خلي الجلسة دي 3 مرات في الأسبوع.',
      en: 'Short maintenance of ankle stability, landings and balance during heavy skating weeks. With a previous ankle sprain, run this session three times a week.'
    },
    sections: {
      warmup: [
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' },
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 1, reps: '15' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '8', rest: '60s', rpe: '6' },
        { libId: 'ad_depth_drop', en: 'Depth Drop', sets: 2, reps: '3', rest: '60s', rpe: '5' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 2, reps: '30s/side', rest: '30s', rpe: '5' },
        { libId: 'ad_banded_ankle_eversion', en: 'Banded Ankle Eversion', sets: 2, reps: '15/side', rest: '45s', rpe: '5' },
        { libId: 'ex_dead_bug', en: 'Dead Bug', sets: 2, reps: '8/side', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_knee_to_wall_ankle_mobilization', en: 'Knee-to-Wall Ankle Mobilization', sets: 1, reps: '10/side' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_parkour_off',
    sport: 'parkour',
    group: 'other',
    phase: 'off',
    ar: 'باركور — أساس (قوة وزن الجسم وهبوط)',
    en: 'Parkour — Foundation (bodyweight strength & landings)',
    note: {
      ar: 'أساس قوة وزن الجسم والتعليق، وتعلّم الهبوط الناعم (ديبث دروب) قبل أي قفز من ارتفاع. الهبوط على المشط والنزول بالركبة والورك من غير صوت.',
      en: 'A base of bodyweight and hanging strength, and learning soft landings (depth drops) before any jumps from height. Land on the balls of the feet and absorb through knees and hips, silently.'
    },
    sections: {
      warmup: [
        { libId: 'wg_bear_crawl', en: 'Bear Crawl', sets: 2, reps: '10m' },
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '10', rest: '90s', rpe: '6' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 3, reps: '5-8', rest: '90s', rpe: '7' },
        { libId: 'ex_pushup', en: 'Push-up', sets: 3, reps: '10-15', rest: '60s', rpe: '6' },
        { libId: 'ad_depth_drop', en: 'Depth Drop', sets: 3, reps: '4', rest: '60s', rpe: '6' },
        { libId: 'ex_hollow_body_hold', en: 'Hollow Body Hold', sets: 3, reps: '30s', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_deep_squat_hold', en: 'Deep Squat Hold', sets: 1, reps: '60s' }
      ],
      flexibility: [
        { libId: 'wg_seated_forward_fold', en: 'Seated Forward Fold', sets: 1, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_s_parkour_pre',
    sport: 'parkour',
    group: 'other',
    phase: 'pre',
    ar: 'باركور — تطوير (قفز دقيق وفولت وحيطة)',
    en: 'Parkour — Progression (precision, vaults & wall climbs)',
    note: {
      ar: 'تطوير المهارات: قفز دقيق، وفولت، وطلوع حيطة، وقفز من العمق. كل مهارة تتعلم على ارتفاع واطي وعلى أرض آمنة قبل ما تنقلها للشارع.',
      en: 'Skill progressions: precision jumps, vaults, wall climbs and depth jumps. Learn every skill low and on safe ground before taking it to the street.'
    },
    sections: {
      warmup: [
        { libId: 'wg_bear_crawl', en: 'Bear Crawl', sets: 1, reps: '10m' },
        { libId: 'ad_lateral_bear_crawl', en: 'Lateral Bear Crawl', sets: 1, reps: '10m/side' }
      ],
      main: [
        { libId: 'ad_broad_jump', en: 'Broad Jump', sets: 4, reps: '3', rest: '90s', rpe: '8' },
        { libId: 'ad_speed_vault', en: 'Speed Vault', sets: 3, reps: '5/side', rest: '60s', rpe: '7' },
        { libId: 'ad_wall_climb_technique', en: 'Wall Climb Technique', sets: 3, reps: '3', rest: '90s', rpe: '8' },
        { libId: 'ad_depth_jump', en: 'Depth Jump', sets: 3, reps: '3', rest: '120s', rpe: '8' },
        { libId: 'ad_single_leg_forward_hop_and_stick', en: 'Single-Leg Forward Hop and Stick', sets: 3, reps: '4/side', rest: '60s', rpe: '7' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_knee_to_wall_ankle_mobilization', en: 'Knee-to-Wall Ankle Mobilization', sets: 1, reps: '10/side' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_parkour_in',
    sport: 'parkour',
    group: 'other',
    phase: 'in',
    ar: 'باركور — قمة وصيانة (صيانة القوة والهبوط)',
    en: 'Parkour — Peak & maintenance (strength & landing maintenance)',
    note: {
      ar: 'صيانة قصيرة للقوة والهبوط بين أيام التدريب في الشارع. الهبوط العالي بيتعب الأوتار، فعدّ الهبوطات في الأسبوع وما تزودهاش فجأة.',
      en: 'Short strength and landing maintenance between street sessions. High drops load the tendons, so count weekly landings and never spike them.'
    },
    sections: {
      warmup: [
        { libId: 'wg_bear_crawl', en: 'Bear Crawl', sets: 1, reps: '10m' },
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ad_broad_jump', en: 'Broad Jump', sets: 3, reps: '3', rest: '90s', rpe: '7' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 2, reps: '5', rest: '90s', rpe: '6' },
        { libId: 'ad_depth_drop', en: 'Depth Drop', sets: 2, reps: '3', rest: '60s', rpe: '5' },
        { libId: 'wg_cossack_squat', en: 'Cossack Squat', sets: 2, reps: '6/side', rest: '60s', rpe: '6' },
        { libId: 'ex_hollow_body_hold', en: 'Hollow Body Hold', sets: 2, reps: '20s', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_deep_squat_hold', en: 'Deep Squat Hold', sets: 1, reps: '60s' }
      ],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_t_strength_beginner',
    sport: '',
    group: 'none',
    phase: 'type',
    ar: 'قوة — مبتدئ',
    en: 'Strength — Beginner',
    note: {
      ar: 'أول برنامج قوة: حركات أساسية بتكرارات قليلة وأوزان متوسطة عشان تتعلم الأداء قبل الوزن. زوّد الوزن خطوة صغيرة بس لما كل المجموعات تكمل بأداء نضيف.',
      en: 'A first strength programme: basic lifts for low reps at moderate loads to learn technique before load. Add a small amount of weight only once every set is completed with clean form.'
    },
    sections: {
      warmup: [
        { libId: 'ad_marching_in_place', en: 'Marching in Place', sets: 1, reps: '2min' },
        { libId: 'ex_arm_circles', en: 'Arm Circles', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '8', rest: '90s', rpe: '6' },
        { libId: 'ex_dumbbell_bench_press', en: 'Dumbbell Bench Press', sets: 3, reps: '8', rest: '90s', rpe: '6' },
        { libId: 'ex_seated_cable_row', en: 'Seated Cable Row', sets: 3, reps: '10', rest: '90s', rpe: '6' },
        { libId: 'wg_dumbbell_romanian_deadlift', en: 'Dumbbell Romanian Deadlift', sets: 3, reps: '8', rest: '90s', rpe: '6' },
        { libId: 'ex_farmers_carry', en: 'Farmer\'s Carry', sets: 2, reps: '20m', rest: '60s', rpe: '6' },
        { libId: 'ex_plank', en: 'Plank', sets: 2, reps: '30s', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_t_strength_intermediate',
    sport: '',
    group: 'none',
    phase: 'type',
    ar: 'قوة — متوسط',
    en: 'Strength — Intermediate',
    note: {
      ar: 'قوة لمستوى متوسط: رفعات أساسية تقيلة بتكرارات 3-6 وراحة كاملة. سيب 1-2 تكرار في الخزان، ومعاك سبوتر في البنش والسكوات التقيل.',
      en: 'Intermediate strength: heavy compound lifts for 3–6 reps with full rest. Leave 1–2 reps in reserve and use a spotter on heavy bench and squat.'
    },
    sections: {
      warmup: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 1, reps: '8' },
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '5', rest: '180s', rpe: '8' },
        { libId: 'ex_barbell_bench_press', en: 'Barbell Bench Press', sets: 4, reps: '5', rest: '180s', rpe: '8' },
        { libId: 'ex_deadlift', en: 'Deadlift', sets: 3, reps: '3', rest: '180s', rpe: '8' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 3, reps: '6', rest: '120s', rpe: '8' },
        { libId: 'wg_overhead_press', en: 'Overhead Press', sets: 3, reps: '6', rest: '120s', rpe: '7' },
        { libId: 'ad_suitcase_hold', en: 'Suitcase Hold', sets: 2, reps: '30s/side', rest: '60s', rpe: '7' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_t_hypertrophy_upper',
    sport: '',
    group: 'none',
    phase: 'type',
    ar: 'تضخيم — جزء علوي',
    en: 'Hypertrophy — Upper body',
    note: {
      ar: 'تضخيم للجزء العلوي بتكرارات 8-15 وحجم عالي. تحكم في النزول 2-3 ثواني، وآخر مجموعة في تمارين العزل ممكن توصل قريب من الفشل.',
      en: 'Upper-body hypertrophy with 8–15 reps and high volume. Control each lowering for 2–3 seconds; the last set of isolation work may go close to failure.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' },
        { libId: 'wg_scapular_push_up', en: 'Scapular Push-up', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_incline_dumbbell_press', en: 'Incline Dumbbell Press', sets: 4, reps: '8-10', rest: '90s', rpe: '8' },
        { libId: 'wg_chest_supported_row', en: 'Chest-Supported Row', sets: 4, reps: '10', rest: '90s', rpe: '8' },
        { libId: 'ex_dumbbell_shoulder_press', en: 'Dumbbell Shoulder Press', sets: 3, reps: '10', rest: '90s', rpe: '8' },
        { libId: 'ex_lat_pulldown', en: 'Lat Pulldown', sets: 3, reps: '10-12', rest: '90s', rpe: '8' },
        { libId: 'ex_lateral_raise', en: 'Lateral Raise', sets: 3, reps: '12-15', rest: '60s', rpe: '9' },
        { libId: 'ek_ez_bar_curl_with_barbell', en: 'EZ-Bar Curl', sets: 2, reps: '12', rest: '60s', rpe: '9' },
        { libId: 'ek_triceps_pushdown_with_rope_and_cable', en: 'Rope Triceps Pushdown', sets: 2, reps: '12', rest: '60s', rpe: '9' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'wg_doorway_chest_stretch', en: 'Doorway Chest Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_t_hypertrophy_lower',
    sport: '',
    group: 'none',
    phase: 'type',
    ar: 'تضخيم — رجل',
    en: 'Hypertrophy — Lower body',
    note: {
      ar: 'تضخيم للرجل والمؤخرة بحجم عالي وتكرارات 8-15. الضهر محايد في السكوات والـ RDL، والتكرارات الأخيرة بأداء نضيف مش بمرجحة.',
      en: 'Lower-body and glute hypertrophy with high volume and 8–15 reps. Keep a neutral spine on squats and RDLs, and finish the last reps cleanly without swinging.'
    },
    sections: {
      warmup: [
        { libId: 'wg_banded_lateral_walk', en: 'Banded Lateral Walk', sets: 1, reps: '10/side' },
        { libId: 'ex_bodyweight_squat', en: 'Bodyweight Squat', sets: 1, reps: '15' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '8', rest: '150s', rpe: '8' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '10', rest: '120s', rpe: '8' },
        { libId: 'ex_leg_press', en: 'Leg Press', sets: 3, reps: '12', rest: '90s', rpe: '8' },
        { libId: 'ex_hip_thrust', en: 'Hip Thrust', sets: 3, reps: '10', rest: '90s', rpe: '8' },
        { libId: 'ek_lying_leg_curl_machine', en: 'Lying Leg Curl', sets: 3, reps: '12', rest: '60s', rpe: '9' },
        { libId: 'ex_calf_raise', en: 'Standing Calf Raise', sets: 3, reps: '15', rest: '45s', rpe: '9' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_quad_stretch', en: 'Quad Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_t_power_plyo',
    sport: '',
    group: 'none',
    phase: 'type',
    ar: 'قدرة انفجارية وبلايومتركس',
    en: 'Power & plyometrics',
    note: {
      ar: 'قدرة انفجارية بالبلايومتركس والرمي والكلين، بعدد قليل وسرعة قصوى. البلايومتركس في أول الجلسة وأنت فريش، والهبوط ناعم والركبة في خط الصباع.',
      en: 'Explosive power through plyometrics, throws and cleans, low reps at maximal speed. Do plyometrics early while fresh, landing softly with knees over toes.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 2, reps: '15' }
      ],
      main: [
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 4, reps: '3', rest: '90s', rpe: '8' },
        { libId: 'ad_broad_jump', en: 'Broad Jump', sets: 3, reps: '3', rest: '90s', rpe: '8' },
        { libId: 'ad_lateral_bound_and_stick', en: 'Lateral Bound and Stick', sets: 3, reps: '4/side', rest: '90s', rpe: '7' },
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 4, reps: '3', rest: '150s', rpe: '7' },
        { libId: 'ad_medicine_ball_chest_pass', en: 'Medicine Ball Chest Pass', sets: 3, reps: '5', rest: '60s', rpe: '7' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 3, reps: '5/side', rest: '60s', rpe: '7' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_t_hiit',
    sport: '',
    group: 'none',
    phase: 'type',
    ar: 'HIIT — إنترفال عالي الشدة',
    en: 'HIIT — High-intensity intervals',
    note: {
      ar: 'إنترفال عالي الشدة: 40 ثانية شغل و20 راحة لكل حركة كسيركت، وبعدها سبرنتات على الأير بايك. مش للمبتدئين، ولا لأي حد عنده مشكلة في القلب أو ضغط مش متظبط من غير إذن دكتور.',
      en: 'High-intensity intervals: 40 seconds work and 20 seconds rest per movement as a circuit, then air-bike sprints. Not for beginners, or for anyone with a heart condition or uncontrolled blood pressure without medical clearance.'
    },
    sections: {
      warmup: [
        { libId: 'ad_jog_in_place', en: 'Jog in Place', sets: 1, reps: '2min' },
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '5' }
      ],
      main: [
        { libId: 'ex_burpees', en: 'Burpees', sets: 4, reps: '40s', rest: '20s', rpe: '9' },
        { libId: 'ex_kettlebell_swing', en: 'Kettlebell Swing', sets: 4, reps: '40s', rest: '20s', rpe: '8' },
        { libId: 'ex_mountain_climbers', en: 'Mountain Climbers', sets: 4, reps: '40s', rest: '20s', rpe: '9' },
        { libId: 'wg_jump_squat', en: 'Jump Squat', sets: 4, reps: '40s', rest: '20s', rpe: '8' },
        { libId: 'ex_battle_ropes', en: 'Battle Ropes', sets: 4, reps: '40s', rest: '90s', rpe: '9' }
      ],
      cardio: [
        { libId: 'ad_air_bike_calorie_sprints', en: 'Air Bike Calorie Sprints', sets: 5, reps: '20s', rest: '40s', rpe: '9' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_t_aerobic_circuit',
    sport: '',
    group: 'none',
    phase: 'type',
    ar: 'سيركت تحمل هوائي',
    en: 'Aerobic endurance circuit',
    note: {
      ar: 'سيركت هوائي بشدة متوسطة (تقدر تتكلم بجمل قصيرة) لمدة 30-40 دقيقة، يحسّن التحمل ويحرق سعرات. اتنقل بين المحطات من غير راحة طويلة، وخلي النفس منتظم ومتحكم فيه.',
      en: 'A moderate-intensity aerobic circuit (able to speak in short sentences) for 30–40 minutes to build endurance and burn calories. Move between stations without long breaks and keep breathing steady and controlled.'
    },
    sections: {
      warmup: [
        { libId: 'ad_step_jacks', en: 'Step Jacks', sets: 1, reps: '1min' },
        { libId: 'ex_arm_circles', en: 'Arm Circles', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_rowing_machine', en: 'Rowing Machine', sets: 3, reps: '3min', rest: '30s', rpe: '6' },
        { libId: 'ex_step_up', en: 'Step-Up', sets: 3, reps: '12/side', rest: '30s', rpe: '6' },
        { libId: 'ex_stationary_cycling', en: 'Stationary Cycling', sets: 3, reps: '3min', rest: '30s', rpe: '6' },
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '15', rest: '30s', rpe: '6' },
        { libId: 'ad_jump_rope_basic_bounce', en: 'Jump Rope Basic Bounce', sets: 3, reps: '2min', rest: '30s', rpe: '6' },
        { libId: 'ex_farmers_carry', en: 'Farmer\'s Carry', sets: 3, reps: '40m', rest: '60s', rpe: '6' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_t_speed_agility',
    sport: '',
    group: 'none',
    phase: 'type',
    ar: 'سرعة ورشاقة (أقماع وسلم)',
    en: 'Speed & agility (cones & ladder)',
    note: {
      ar: 'سرعة ورشاقة بالسلم والأقماع: رجلين سريعة، وتغيير اتجاه، وتسارع، ورد فعل. كل تكرار بأقصى جودة وبراحة كاملة، ووقّف لما السرعة تقل.',
      en: 'Speed and agility with ladder and cones: fast feet, change of direction, acceleration and reaction. Every rep at top quality with full rest; stop once speed drops.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_carioca', en: 'Carioca', sets: 1, reps: '20m/side' }
      ],
      main: [
        { libId: 'ad_agility_ladder_icky_shuffle', en: 'Agility Ladder — Icky Shuffle', sets: 3, reps: '2 lengths', rest: '45s', rpe: '6' },
        { libId: 'dr_ladder_lateral', en: 'Agility Ladder — Lateral Shuffle', sets: 3, reps: '2 lengths', rest: '45s', rpe: '6' },
        { libId: 'dr_cone_5_10_5', en: '5-10-5 Pro Agility (cones)', sets: 4, reps: '1', rest: '90s', rpe: '8' },
        { libId: 'dr_cone_t_drill', en: 'T-Drill (cones)', sets: 4, reps: '1', rest: '90s', rpe: '8' },
        { libId: 'dr_sprint_accel', en: '20m Acceleration Sprints', sets: 5, reps: '20m', rest: '90s', rpe: '9' },
        { libId: 'ad_reaction_start_sprint', en: 'Reaction Start Sprint', sets: 4, reps: '10m', rest: '60s', rpe: '8' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_t_mobility_recovery',
    sport: '',
    group: 'none',
    phase: 'type',
    ar: 'حركة واستشفاء',
    en: 'Mobility & recovery',
    note: {
      ar: 'جلسة حركة واستشفاء خفيفة ليوم الراحة أو بعد يوم صعب، تحسّن مدى الحركة وتقلل التيبّس. كل حركة لحد شد مريح بس مع نفس بطيء، من غير ألم.',
      en: 'A light mobility and recovery session for rest days or after a hard day, improving range of motion and reducing stiffness. Move only to a comfortable stretch with slow breathing, never into pain.'
    },
    sections: {
      warmup: [
        { libId: 'ad_marching_in_place', en: 'Marching in Place', sets: 1, reps: '2min' },
        { libId: 'ex_cat_cow', en: 'Cat-Cow', sets: 1, reps: '8' }
      ],
      main: [
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 2, reps: '5/side', rest: '30s', rpe: '3' },
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 2, reps: '8/side', rest: '30s', rpe: '3' },
        { libId: 'ad_open_book', en: 'Open Book', sets: 2, reps: '8/side', rest: '30s', rpe: '3' },
        { libId: 'ad_knee_to_wall_ankle_mobilization', en: 'Knee-to-Wall Ankle Mobilization', sets: 2, reps: '10/side', rest: '30s', rpe: '3' },
        { libId: 'ad_foam_roller_thoracic_extension', en: 'Foam Roller Thoracic Extension', sets: 2, reps: '10', rest: '30s', rpe: '3' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ad_couch_stretch', en: 'Couch Stretch', sets: 1, reps: '45s/side' },
        { libId: 'ex_childs_pose', en: 'Child\'s Pose', sets: 1, reps: '60s' }
      ]
    }
  },
  {
    id: 'tpl_t_core_stability',
    sport: '',
    group: 'none',
    phase: 'type',
    ar: 'ثبات الجذع',
    en: 'Core stability',
    note: {
      ar: 'ثبات الجذع ومقاومة الحركة (تقويس ودوران وميل) بدل الكرانشات الكتير، يحمي الضهر ويحسّن نقل القوة. أسفل الضهر محايد والنفس مستمر، ما تكتمش نفسك.',
      en: 'Trunk stability that resists extension, rotation and side-bending instead of endless crunches, protecting the back and improving force transfer. Keep the low back neutral and keep breathing; never hold your breath.'
    },
    sections: {
      warmup: [
        { libId: 'ad_supine_pelvic_tilt', en: 'Supine Pelvic Tilt', sets: 1, reps: '10' },
        { libId: 'ex_cat_cow', en: 'Cat-Cow', sets: 1, reps: '8' }
      ],
      main: [
        { libId: 'ex_dead_bug', en: 'Dead Bug', sets: 3, reps: '8/side', rest: '45s', rpe: '6' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 3, reps: '10/side', rest: '45s', rpe: '6' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 3, reps: '30s/side', rest: '45s', rpe: '6' },
        { libId: 'ex_bird_dog', en: 'Bird Dog', sets: 3, reps: '8/side', rest: '45s', rpe: '6' },
        { libId: 'ad_suitcase_hold', en: 'Suitcase Hold', sets: 3, reps: '30s/side', rest: '60s', rpe: '7' },
        { libId: 'ad_stir_the_pot', en: 'Stir the Pot', sets: 3, reps: '8/side', rest: '60s', rpe: '7' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_childs_pose', en: 'Child\'s Pose', sets: 1, reps: '45s' }
      ]
    }
  },
  {
    id: 'tpl_t_bodyweight_home',
    sport: '',
    group: 'none',
    phase: 'type',
    ar: 'وزن الجسم في البيت',
    en: 'Bodyweight at home',
    note: {
      ar: 'جسم كامل في البيت من غير أدوات، ينفع 3 مرات في الأسبوع. لو بقى سهل زوّد التكرارات أو بطّأ النزول، وفي تجديف الباب امسك حلق الباب كويس واتأكد إنه ثابت.',
      en: 'A full-body session at home with no equipment, suitable three times a week. When it gets easy add reps or slow the lowering, and for doorway rows hold a sturdy frame firmly.'
    },
    sections: {
      warmup: [
        { libId: 'ad_jog_in_place', en: 'Jog in Place', sets: 1, reps: '2min' },
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '5' }
      ],
      main: [
        { libId: 'ex_bodyweight_squat', en: 'Bodyweight Squat', sets: 3, reps: '15-20', rest: '60s', rpe: '7' },
        { libId: 'ex_pushup', en: 'Push-up', sets: 3, reps: '8-15', rest: '60s', rpe: '7' },
        { libId: 'wg_doorway_row', en: 'Doorway Row', sets: 3, reps: '10-12', rest: '60s', rpe: '7' },
        { libId: 'ex_reverse_lunge', en: 'Reverse Lunge', sets: 3, reps: '10/side', rest: '60s', rpe: '7' },
        { libId: 'wg_single_leg_glute_bridge', en: 'Single-Leg Glute Bridge', sets: 3, reps: '10/side', rest: '45s', rpe: '7' },
        { libId: 'ex_plank', en: 'Plank', sets: 3, reps: '30-45s', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'wg_jumping_jack', en: 'Jumping Jack', sets: 3, reps: '45s', rest: '15s', rpe: '7' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_t_older_adults',
    sport: '',
    group: 'none',
    phase: 'type',
    ar: 'كبار السن — قوة وظيفية',
    en: 'Older adults — Functional strength',
    note: {
      ar: 'قوة وظيفية لكبار السن: القيام من الكرسي، وطلوع السلم، والشيل، والتوازن، عشان الاستقلالية وتقليل الوقوع. خلي جنبك حيطة أو كرسي تسند عليه في تمارين التوازن، وما تكتمش نفسك وأنت بتشيل.',
      en: 'Functional strength for older adults: sit-to-stand, stair climbing, carrying and balance for independence and fall prevention. Keep a wall or chair within reach for balance work and never hold your breath while lifting.'
    },
    sections: {
      warmup: [
        { libId: 'ad_seated_marching', en: 'Seated Marching', sets: 1, reps: '1min' },
        { libId: 'ex_arm_circles', en: 'Arm Circles', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_bodyweight_squat', en: 'Bodyweight Squat', sets: 3, reps: '8-10 (to chair)', rest: '90s', rpe: '5' },
        { libId: 'wg_wall_push_up', en: 'Wall Push-up', sets: 3, reps: '10', rest: '60s', rpe: '5' },
        { libId: 'wg_banded_row', en: 'Banded Row', sets: 3, reps: '12', rest: '60s', rpe: '5' },
        { libId: 'ex_step_up', en: 'Step-Up', sets: 2, reps: '8/side', rest: '60s', rpe: '5' },
        { libId: 'ex_farmers_carry', en: 'Farmer\'s Carry', sets: 2, reps: '20m', rest: '60s', rpe: '5' },
        { libId: 'ad_tandem_stance_hold', en: 'Tandem Stance Hold', sets: 3, reps: '20-30s', rest: '30s', rpe: '4' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_t_return_break',
    sport: '',
    group: 'none',
    phase: 'type',
    ar: 'رجوع للتمرين بعد انقطاع',
    en: 'Return to training after a break',
    note: {
      ar: 'رجوع للتمرين بعد انقطاع: حجم وشدة قليلين (حوالي نص اللي كنت بتعمله) أول أسبوعين، وبعدين زوّد تدريجي. ما تحاولش ترجع لأوزانك القديمة في أول أسبوع عشان تتجنب الإصابة والتكسير الزيادة.',
      en: 'Returning after a break: low volume and intensity (about half of what you used to do) for the first two weeks, then build gradually. Do not chase your old weights in week one, to avoid injury and excessive soreness.'
    },
    sections: {
      warmup: [
        { libId: 'ad_marching_in_place', en: 'Marching in Place', sets: 1, reps: '2min' },
        { libId: 'ex_cat_cow', en: 'Cat-Cow', sets: 1, reps: '8' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '10', rest: '90s', rpe: '5' },
        { libId: 'wg_incline_push_up', en: 'Incline Push-up', sets: 2, reps: '10', rest: '60s', rpe: '5' },
        { libId: 'ex_seated_cable_row', en: 'Seated Cable Row', sets: 2, reps: '12', rest: '60s', rpe: '5' },
        { libId: 'ex_glute_bridge', en: 'Glute Bridge', sets: 2, reps: '12', rest: '60s', rpe: '5' },
        { libId: 'ex_bird_dog', en: 'Bird Dog', sets: 2, reps: '8/side', rest: '45s', rpe: '4' }
      ],
      cardio: [
        { libId: 'ex_stationary_bike', en: 'Bicycling, Stationary', sets: 1, reps: '10-15min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_t_pregnancy',
    sport: '',
    group: 'none',
    phase: 'type',
    ar: 'حمل — جلسة عامة آمنة (بعد موافقة الدكتور)',
    en: 'Pregnancy — Safe general session (doctor clearance required)',
    note: {
      ar: 'جلسة عامة آمنة للحامل بشدة خفيفة لمتوسطة (تقدري تتكلمي بسهولة)، ولازم موافقة الدكتور المتابع قبل ما تبدئي. بعد أول 3 شهور ابعدي عن النوم على الضهر، ووقفي فورًا لو حصل نزيف أو دوخة أو ألم.',
      en: 'A general pregnancy-safe session at light-to-moderate effort (able to talk easily), and it requires clearance from the treating doctor before starting. After the first trimester avoid lying flat on the back, and stop immediately with any bleeding, dizziness or pain.'
    },
    sections: {
      warmup: [
        { libId: 'ad_marching_in_place', en: 'Marching in Place', sets: 1, reps: '3min' },
        { libId: 'ex_arm_circles', en: 'Arm Circles', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '10', rest: '90s', rpe: '5' },
        { libId: 'wg_incline_push_up', en: 'Incline Push-up', sets: 2, reps: '10', rest: '60s', rpe: '5' },
        { libId: 'wg_banded_row', en: 'Banded Row', sets: 2, reps: '12', rest: '60s', rpe: '5' },
        { libId: 'wg_side_lying_hip_abduction', en: 'Side-Lying Hip Abduction', sets: 2, reps: '12/side', rest: '45s', rpe: '5' },
        { libId: 'ex_bird_dog', en: 'Bird Dog', sets: 2, reps: '6/side', rest: '45s', rpe: '4' }
      ],
      cardio: [
        { libId: 'ad_brisk_walk', en: 'Brisk Walk', sets: 1, reps: '15-20min' }
      ],
      mobility: [
        { libId: 'ex_cat_cow', en: 'Cat-Cow', sets: 1, reps: '8' }
      ],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_d_wod1',
    sport: '',
    group: 'none',
    phase: 'drills',
    ar: 'WOD كروسفت — ثراستر ورينج رو (21-15-9)',
    en: 'CrossFit-style WOD — Thrusters & ring rows (21-15-9)',
    note: {
      ar: 'جزئين: 21-15-9 ثراستر ورينج رو على الوقت، وبعد 3 دقايق راحة 3 جولات وول بول وبوكس جامب وكيتلبل سوينج. اختار وزن تقدر تكمّل بيه من غير ما الضهر يتقوّس، وانزل من البوكس خطوة مش قفزة.',
      en: 'Two parts: 21-15-9 thrusters and ring rows for time, then after 3 minutes rest, 3 rounds of wall balls, box jumps and kettlebell swings. Pick a load you can finish without your back rounding, and step down from the box rather than jumping.'
    },
    sections: {
      warmup: [
        { libId: 'ex_rowing_machine', en: 'Rowing Machine', sets: 1, reps: '5min' },
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'dr_thruster', en: 'Thruster', sets: 3, reps: '21-15-9', rest: '0s', rpe: '9' },
        { libId: 'dr_ring_row', en: 'Ring Row', sets: 3, reps: '21-15-9', rest: '3min', rpe: '8' },
        { libId: 'dr_wall_ball', en: 'Wall Ball Shot', sets: 3, reps: '15', rest: '0s', rpe: '8' },
        { libId: 'dr_box_jump', en: 'Box Jump', sets: 3, reps: '10', rest: '0s', rpe: '8' },
        { libId: 'dr_kb_swing', en: 'Kettlebell Swing', sets: 3, reps: '15', rest: '90s', rpe: '8' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_couch_stretch', en: 'Couch Stretch', sets: 1, reps: '45s/side' }
      ],
      flexibility: [
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_d_wod2',
    sport: '',
    group: 'none',
    phase: 'drills',
    ar: 'WOD دمبل — جولات وتاباتا',
    en: 'CrossFit-style WOD — Dumbbell rounds & Tabata',
    note: {
      ar: '4 جولات على الوقت (ديفل برس، مان ميكر، بيربي، دبل أندر) وبعدها تاباتا 4 دقايق. في الديفل برس اطلع بالدمبل بقوة الورك مش بالضهر، ولو الدبل أندر لسه صعب اعمل 80 نطة عادية بداله.',
      en: 'Four rounds for time (devil press, man maker, burpee, double-unders), then a 4-minute Tabata. Drive the devil press with the hips, not the back, and swap double-unders for 80 single skips if they are not there yet.'
    },
    sections: {
      warmup: [
        { libId: 'ad_jog_in_place', en: 'Jog in Place', sets: 1, reps: '2min' },
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '5' }
      ],
      main: [
        { libId: 'dr_devil_press', en: 'Devil Press', sets: 4, reps: '8', rest: '0s', rpe: '8' },
        { libId: 'dr_man_maker', en: 'Man Maker', sets: 4, reps: '5', rest: '0s', rpe: '8' },
        { libId: 'dr_burpee', en: 'Burpee', sets: 4, reps: '10', rest: '0s', rpe: '8' },
        { libId: 'dr_double_under', en: 'Double Under', sets: 4, reps: '40', rest: '90s', rpe: '7' }
      ],
      cardio: [
        { libId: 'dr_tabata', en: 'Tabata (20/10 × 8)', sets: 1, reps: '8x20s/10s', rpe: '9' }
      ],
      mobility: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_d_gym_skills',
    sport: '',
    group: 'none',
    phase: 'drills',
    ar: 'مهارات جمباز كروسفت',
    en: 'CrossFit gymnastics skills',
    note: {
      ar: 'جلسة مهارات مش لياقة: تكرارات قليلة بجودة عالية لحركات الجمباز في الكروسفت مع راحة كاملة. الهاندستاند بوش أب على حيطة وتحت راسك مخدة، ولو لسه صعب اعمل بايك بوش أب بداله.',
      en: 'A skill session, not conditioning: low reps of CrossFit gymnastics movements at high quality with full rest. Do handstand push-ups against a wall with a mat under the head, and use pike push-ups if they are not there yet.'
    },
    sections: {
      warmup: [
        { libId: 'wg_scapular_pull_up', en: 'Scapular Pull-up', sets: 2, reps: '8' },
        { libId: 'ad_wrist_active_range_of_motion', en: 'Wrist Active Range of Motion', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'wg_wall_walk', en: 'Wall Walk', sets: 3, reps: '2', rest: '90s', rpe: '7' },
        { libId: 'dr_hspu', en: 'Handstand Push-up', sets: 4, reps: '3-5', rest: '120s', rpe: '8' },
        { libId: 'dr_toes_to_bar', en: 'Toes-to-Bar', sets: 4, reps: '5-8', rest: '90s', rpe: '7' },
        { libId: 'dr_pistol_squat', en: 'Pistol Squat', sets: 3, reps: '4/side', rest: '90s', rpe: '7' },
        { libId: 'dr_double_under', en: 'Double Under', sets: 5, reps: '30s', rest: '60s', rpe: '6' },
        { libId: 'dr_ring_row', en: 'Ring Row', sets: 3, reps: '10', rest: '60s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 1, reps: '10' }
      ],
      flexibility: []
    }
  },
  {
    id: 'tpl_d_conditioning',
    sport: '',
    group: 'none',
    phase: 'drills',
    ar: 'سيركت لياقة (أير بايك وحبال وزلاجة)',
    en: 'Conditioning circuit (air bike, ropes & sled)',
    note: {
      ar: 'سيركت 4 جولات من غير راحة بين المحطات و2 دقيقة بين الجولات، لرفع اللياقة اللاهوائية. في الفارمرز الكتف لتحت والجذع مشدود، وقلّل الوزن لو القبضة فلتت.',
      en: 'A 4-round circuit with no rest between stations and 2 minutes between rounds to build anaerobic conditioning. On farmers carries keep the shoulders down and trunk braced, and drop the load if grip fails.'
    },
    sections: {
      warmup: [
        { libId: 'ad_jump_rope_basic_bounce', en: 'Jump Rope Basic Bounce', sets: 1, reps: '2min' },
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '5' }
      ],
      main: [
        { libId: 'dr_assault_bike_intervals', en: 'Assault Bike Intervals', sets: 4, reps: '30s', rest: '0s', rpe: '9' },
        { libId: 'dr_battle_ropes', en: 'Battle Ropes', sets: 4, reps: '30s', rest: '0s', rpe: '8' },
        { libId: 'dr_sled_drag', en: 'Sled Drag for Distance', sets: 4, reps: '20m', rest: '0s', rpe: '8' },
        { libId: 'dr_wall_ball_conditioning', en: 'Wall Ball Conditioning', sets: 4, reps: '15', rest: '0s', rpe: '8' },
        { libId: 'dr_farmers_carry_cond', en: 'Farmers Carry for Distance', sets: 4, reps: '40m', rest: '2min', rpe: '7' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_couch_stretch', en: 'Couch Stretch', sets: 1, reps: '45s/side' }
      ],
      flexibility: [
        { libId: 'ex_quad_stretch', en: 'Quad Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_d_hyrox_compromised',
    sport: '',
    group: 'none',
    phase: 'drills',
    ar: 'هايروكس — جري بعد محطات تقيلة',
    en: 'HYROX — Compromised running (sled & carries)',
    note: {
      ar: 'تعوّد على الجري برجلين تقيلة: 1 كم جري قبل كل محطة من الأربع (زق زلاجة، سحب زلاجة، فارمرز، لانجز). خلي أول 200م بعد كل محطة أهدى شوية لحد ما النفس يرجع، والضهر محايد في سحب الزلاجة.',
      en: 'Practise running on heavy legs: a 1 km run before each of four stations (sled push, sled pull, farmers carry, lunges). Ease the first 200 m after each station until breathing settles, and keep a neutral back on the sled pull.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '5' }
      ],
      main: [
        { libId: 'dr_hyrox_sled_push', en: 'HYROX 2: Sled Push 50m', sets: 1, reps: '50m', rest: '0s', rpe: '8' },
        { libId: 'dr_hyrox_sled_pull', en: 'HYROX 3: Sled Pull 50m', sets: 1, reps: '50m', rest: '0s', rpe: '8' },
        { libId: 'dr_hyrox_farmers', en: 'HYROX 6: Farmers Carry 200m', sets: 1, reps: '200m', rest: '0s', rpe: '8' },
        { libId: 'dr_hyrox_lunges', en: 'HYROX 7: Sandbag Lunges 100m', sets: 1, reps: '100m', rest: '0s', rpe: '8' }
      ],
      cardio: [
        { libId: 'dr_hyrox_run', en: 'HYROX: 1km run between stations', sets: 4, reps: '1000m', rest: '0s', rpe: '8' }
      ],
      mobility: [
        { libId: 'ad_couch_stretch', en: 'Couch Stretch', sets: 1, reps: '45s/side' }
      ],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_d_agility_cones',
    sport: '',
    group: 'none',
    phase: 'drills',
    ar: 'رشاقة بالأقماع والحواجز ورد الفعل',
    en: 'Agility — Cones, hurdles & reaction',
    note: {
      ar: 'جلسة رشاقة: قفز جانبي فوق الحواجز، وتغيير اتجاه بالأقماع، ورد فعل للألوان، وسبرنت بالباراشوت. كل تكرار بأقصى سرعة وبراحة كاملة، ولو بدأت تتزحلق في اللفات اهدى وركّز على الأداء.',
      en: 'An agility session: lateral hurdle hops, cone change-of-direction, coloured-disc reaction and parachute sprints. Every rep at full speed with full rest; if you start slipping on cuts, slow down and focus on technique.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 1, reps: '20m' },
        { libId: 'dr_ladder_icky', en: 'Agility Ladder — In-In-Out-Out', sets: 2, reps: '2 lengths' }
      ],
      main: [
        { libId: 'dr_hurdle_lateral', en: 'Lateral Hurdle Hops', sets: 3, reps: '6', rest: '60s', rpe: '7' },
        { libId: 'dr_cone_zigzag', en: 'Zig-zag Cone Run', sets: 4, reps: '1', rest: '60s', rpe: '8' },
        { libId: 'dr_cone_box', en: 'Box Drill (4 cones)', sets: 4, reps: '1', rest: '60s', rpe: '8' },
        { libId: 'dr_discs_react', en: 'Coloured Disc Reaction Drill', sets: 4, reps: '6', rest: '60s', rpe: '8' },
        { libId: 'dr_shuttle_run', en: 'Shuttle Run', sets: 3, reps: '1', rest: '90s', rpe: '8' },
        { libId: 'dr_parachute_sprint', en: 'Parachute Sprint', sets: 4, reps: '20m', rest: '90s', rpe: '9' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  }
];
