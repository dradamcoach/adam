/*
 * ADAM — قوالب جلسات لكل رياضة على حدة (جماعية، مضرب، قتالية)
 * Per-sport session templates by season phase: team, racket and combat sports.
 *
 * phase: 'off'     = خارج الموسم  (قوة عامة/تضخيم + قاعدة هوائية)
 *        'pre'     = قبل الموسم   (قوة -> قدرة انفجارية + لياقة خاصة بالرياضة)
 *        'in'      = أثناء الموسم (صيانة قصيرة، تعب قليل، بعد الماتش بيوم أو اتنين)
 *        'prevent' = وقاية من الإصابات الشائعة في الرياضة
 *
 * Every exercise references an existing library item by libId
 * (EXERCISE_INDEX / EXERCISE_LIBRARY / DRILLS_LIBRARY). Validate with:
 *   node tools/check-templates.js library/templates-sports-a.js
 */

export const SPORT_TEMPLATES_SPORTS_A = [
  {
    id: 'tpl_s_football_off',
    sport: 'football',
    group: 'team',
    phase: 'off',
    ar: 'كرة قدم — خارج الموسم (قوة وقاعدة هوائية)',
    en: 'Football — Off-season (strength & aerobic base)',
    note: {
      ar: 'بناء قوة عامة للرجلين والظهر مع قاعدة هوائية هادية تجهّزك لشغل السرعة بعدين. خلي الضهر محايد في السكوات والـ RDL وما توصلش للفشل العضلي.',
      en: 'Build general leg and posterior-chain strength plus an easy aerobic base to support later speed work. Keep a neutral spine on squats and RDLs and stop short of failure.'
    },
    sections: {
      warmup: [
        { libId: 'ad_walking_hip_opener', en: 'Walking Hip Opener', sets: 1, reps: '20m' },
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 3, reps: '6-8', rest: '90s', rpe: '8' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 3, reps: '20s/side', rest: '60s', rpe: '7' }
      ],
      cardio: [
        { libId: 'ad_zone_2_easy_run', en: 'Zone 2 Easy Run', sets: 1, reps: '30min' }
      ],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 2, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_football_pre',
    sport: 'football',
    group: 'team',
    phase: 'pre',
    ar: 'كرة قدم — قبل الموسم (قوة وسرعة)',
    en: 'Football — Pre-season (strength & speed)',
    note: {
      ar: 'تحويل القوة لانفجارية وسرعة وتغيير اتجاه، مع لياقة سبرنتات متكررة زي الماتش. السبرنت بعد إحماء كامل بس، ووقف لو حسيت شد في العضلة الخلفية.',
      en: 'Convert strength into power, acceleration and change of direction, with repeated-sprint conditioning that mirrors match play. Sprint only after a full warm-up and stop at any hamstring tightness.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_walking_hamstring_scoop', en: 'Walking Hamstring Scoop', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 4, reps: '3', rest: '150s', rpe: '7' },
        { libId: 'ad_trap_bar_deadlift_to_broad_jump_contrast', en: 'Trap Bar Deadlift to Broad Jump Contrast', sets: 4, reps: '3+3', rest: '180s', rpe: '8' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 3, reps: '5', rest: '120s', rpe: '8' },
        { libId: 'dr_sprint_accel', en: '20m Acceleration Sprints', sets: 6, reps: '20m', rest: '90s', rpe: '9' },
        { libId: 'ad_45_degree_cut', en: '45-Degree Cut', sets: 4, reps: '4/side', rest: '90s', rpe: '7' }
      ],
      cardio: [
        { libId: 'ex_interval_running', en: 'Interval Running', sets: 2, reps: '8x15s/15s', rest: '3min', rpe: '8' }
      ],
      mobility: [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' }
      ],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_football_in',
    sport: 'football',
    group: 'team',
    phase: 'in',
    ar: 'كرة قدم — أثناء الموسم (صيانة قصيرة)',
    en: 'Football — In-season (short maintenance)',
    note: {
      ar: 'جلسة قصيرة بعد الماتش بيومين تحافظ على القوة والعضلة الخلفية من غير ما تتعبك قبل الماتش الجاي. أوزان تقيلة نسبيًا بعدد قليل، وما فيش شغل للفشل.',
      en: 'A short session 1–2 days after a match that keeps strength and hamstring capacity without adding fatigue before the next game. Heavy-ish loads, very low volume, never to failure.'
    },
    sections: {
      warmup: [
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 2, reps: '10/side' },
        { libId: 'wg_banded_lateral_walk', en: 'Banded Lateral Walk', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '3', rest: '120s', rpe: '6' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 2, reps: '4', rest: '90s', rpe: '7' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 2, reps: '15s/side', rest: '60s', rpe: '6' },
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 3, reps: '3', rest: '60s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_steady_state_bike_ride', en: 'Steady-State Bike Ride', sets: 1, reps: '10min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_football_prevent',
    sport: 'football',
    group: 'team',
    phase: 'prevent',
    ar: 'كرة قدم — وقاية من الإصابات (عضلة خلفية وضامة ورباط صليبي)',
    en: 'Football — Injury prevention (hamstring, groin, ACL)',
    note: {
      ar: 'برنامج على طريقة FIFA 11+: نوردك للعضلة الخلفية، كوبنهاجن للضامة، وتحكم في الركبة والهبوط. خلي الركبة على خط صباع الرجل وما تدخلش لجوه في الهبوط.',
      en: 'A FIFA 11+ style routine: Nordics for the hamstrings, Copenhagen work for the groin, and knee and landing control. Keep the knee tracking over the toes and never let it cave inward on landing.'
    },
    sections: {
      warmup: [
        { libId: 'ad_walking_hip_opener', en: 'Walking Hip Opener', sets: 2, reps: '20m' },
        { libId: 'ad_carioca', en: 'Carioca', sets: 2, reps: '20m' }
      ],
      main: [
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 3, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 3, reps: '20s/side', rest: '60s', rpe: '7' },
        { libId: 'wg_step_down', en: 'Step-Down', sets: 3, reps: '8/side', rest: '60s', rpe: '6' },
        { libId: 'ad_single_leg_forward_hop_and_stick', en: 'Single-Leg Forward Hop and Stick', sets: 3, reps: '5/side', rest: '60s', rpe: '6' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 2, reps: '30s/side', rest: '30s', rpe: '5' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 2, reps: '30s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_basketball_off',
    sport: 'basketball',
    group: 'team',
    phase: 'off',
    ar: 'كرة سلة — خارج الموسم (قوة وقاعدة هوائية)',
    en: 'Basketball — Off-season (strength & aerobic base)',
    note: {
      ar: 'قوة عامة للرجل الواحدة والجذع والكتف، والكارديو على العجلة عشان تريّح المفاصل من الخبط. كمّل كل مجموعة بتكنيك نضيف من غير ما الركبة تميل لجوه.',
      en: 'General single-leg, trunk and shoulder strength, with cardio on the bike to spare the joints from impact. Finish every set with clean technique and no knee cave.'
    },
    sections: {
      warmup: [
        { libId: 'ex_jump_rope', en: 'Jump Rope', sets: 2, reps: '60s' },
        { libId: 'ad_walking_lunge_with_twist', en: 'Walking Lunge with Twist', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_one_arm_dumbbell_row', en: 'One-Arm Dumbbell Row', sets: 3, reps: '10/side', rest: '90s', rpe: '7' },
        { libId: 'wg_landmine_press', en: 'Landmine Press', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'wg_single_leg_calf_raise', en: 'Single-Leg Calf Raise', sets: 3, reps: '12/side', rest: '60s', rpe: '8' }
      ],
      cardio: [
        { libId: 'ad_steady_state_bike_ride', en: 'Steady-State Bike Ride', sets: 1, reps: '30min' }
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
    id: 'tpl_s_basketball_pre',
    sport: 'basketball',
    group: 'team',
    phase: 'pre',
    ar: 'كرة سلة — قبل الموسم (نط وقوة انفجارية)',
    en: 'Basketball — Pre-season (jump & power)',
    note: {
      ar: 'تطوير النط الرأسي والخطوة الجانبية والتسارع، مع لياقة متقطعة بطول الملعب. اهبط على الرجلين بهدوء والركبة على خط الصباع، وقلّل النط لو في ألم تحت الرضفة.',
      en: 'Develop vertical jump, lateral push-off and acceleration, with court-length intermittent conditioning. Land softly with knees over toes, and cut jump volume if there is pain below the kneecap.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 2, reps: '15' }
      ],
      main: [
        { libId: 'ad_trap_bar_jump', en: 'Trap Bar Jump', sets: 4, reps: '4', rest: '120s', rpe: '7' },
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '4', rest: '180s', rpe: '8' },
        { libId: 'ad_depth_jump', en: 'Depth Jump', sets: 3, reps: '4', rest: '120s', rpe: '8' },
        { libId: 'ad_lateral_bound_and_stick', en: 'Lateral Bound and Stick', sets: 3, reps: '4/side', rest: '90s', rpe: '7' },
        { libId: 'ad_shuffle_to_sprint', en: 'Shuffle-to-Sprint', sets: 6, reps: '5m+10m', rest: '60s', rpe: '8' }
      ],
      cardio: [
        { libId: 'ex_shuttle_run', en: 'Shuttle Run', sets: 6, reps: '30s', rest: '60s', rpe: '8' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_basketball_in',
    sport: 'basketball',
    group: 'team',
    phase: 'in',
    ar: 'كرة سلة — أثناء الموسم (صيانة قصيرة)',
    en: 'Basketball — In-season (short maintenance)',
    note: {
      ar: 'جلسة قصيرة تحافظ على القوة والنط من غير حِمل زيادة على الركبة، لأن الماتشات والتمرين فيهم نط كتير أصلًا. خليها بعد الماتش بيوم أو اتنين ووقف قبل التعب.',
      en: 'A short session to keep strength and jump ability without adding knee load, since games and practice already involve a lot of jumping. Do it 1–2 days after a game and stop well before fatigue.'
    },
    sections: {
      warmup: [
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 2, reps: '10' },
        { libId: 'wg_banded_lateral_walk', en: 'Banded Lateral Walk', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '3', rest: '120s', rpe: '6' },
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 3, reps: '3', rest: '60s', rpe: '6' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 2, reps: '6/side', rest: '60s', rpe: '6' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 2, reps: '20s/side', rest: '45s', rpe: '6' }
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
    id: 'tpl_s_basketball_prevent',
    sport: 'basketball',
    group: 'team',
    phase: 'prevent',
    ar: 'كرة سلة — وقاية من الإصابات (هبوط وكاحل وركبة وكتف)',
    en: 'Basketball — Injury prevention (landing, ankle, knee, shoulder)',
    note: {
      ar: 'تعليم الهبوط الصح، ثبات الكاحل، تحميل وتر الرضفة، وتقوية الكتف. أي ألم حاد أثناء التمرين يعني توقف وتقييم من المختص.',
      en: 'Teaches landing mechanics, ankle stability, patellar-tendon loading and shoulder strength. Any sharp pain during the session means stop and get it assessed by a professional.'
    },
    sections: {
      warmup: [
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' },
        { libId: 'wg_banded_lateral_walk', en: 'Banded Lateral Walk', sets: 2, reps: '10/side' }
      ],
      main: [
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 3, reps: '30s/side', rest: '30s', rpe: '5' },
        { libId: 'ad_depth_drop', en: 'Depth Drop', sets: 3, reps: '5', rest: '60s', rpe: '6' },
        { libId: 'ad_single_leg_lateral_hop_and_stick', en: 'Single-Leg Lateral Hop and Stick', sets: 3, reps: '5/side', rest: '60s', rpe: '6' },
        { libId: 'ad_spanish_squat', en: 'Spanish Squat', sets: 3, reps: '30s', rest: '60s', rpe: '7' },
        { libId: 'ad_banded_ankle_eversion', en: 'Banded Ankle Eversion', sets: 2, reps: '15/side', rest: '45s', rpe: '6' },
        { libId: 'ex_band_external_rotation', en: 'Band External Rotation', sets: 2, reps: '15', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_handball_off',
    sport: 'handball',
    group: 'team',
    phase: 'off',
    ar: 'كرة يد — خارج الموسم (قوة وقاعدة هوائية)',
    en: 'Handball — Off-season (strength & aerobic base)',
    note: {
      ar: 'قوة عامة للرجلين والجزء العلوي مع توازن بين الدفع والسحب لحماية كتف الرمي. حافظ على لوحي الكتف مشدودين لورا في البنش والتجديف.',
      en: 'General lower- and upper-body strength with a push/pull balance that protects the throwing shoulder. Keep the shoulder blades set back on presses and rows.'
    },
    sections: {
      warmup: [
        { libId: 'ad_cross_body_arm_swings', en: 'Cross-Body Arm Swings', sets: 1, reps: '15' },
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'ex_barbell_bench_press', en: 'Barbell Bench Press', sets: 3, reps: '6-8', rest: '120s', rpe: '7' },
        { libId: 'ex_seated_cable_row', en: 'Seated Cable Row', sets: 3, reps: '10', rest: '90s', rpe: '7' },
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 3, reps: '15', rest: '60s', rpe: '7' }
      ],
      cardio: [
        { libId: 'ad_steady_state_row', en: 'Steady-State Row', sets: 1, reps: '25min' }
      ],
      mobility: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 2, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_handball_pre',
    sport: 'handball',
    group: 'team',
    phase: 'pre',
    ar: 'كرة يد — قبل الموسم (رمي وقفز وانفجار)',
    en: 'Handball — Pre-season (throw, jump & power)',
    note: {
      ar: 'قوة انفجارية للرمي من فوق الراس والدوران والقفز، مع سبرنتات قصيرة متقطعة. ابدأ رميات الكرة الطبية بوزن خفيف وزوّد تدريجي عشان الكتف.',
      en: 'Power for overhead throwing, rotation and jumping, plus short intermittent sprints. Start medicine-ball throws light and progress gradually to protect the shoulder.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' }
      ],
      main: [
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 4, reps: '3', rest: '150s', rpe: '7' },
        { libId: 'ad_medicine_ball_soccer_throw', en: 'Medicine Ball Soccer Throw', sets: 4, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 3, reps: '6/side', rest: '90s', rpe: '7' },
        { libId: 'ad_lateral_bound_and_stick', en: 'Lateral Bound and Stick', sets: 3, reps: '5/side', rest: '90s', rpe: '7' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '5/side', rest: '120s', rpe: '8' }
      ],
      cardio: [
        { libId: 'ex_sprint_intervals', en: 'Sprint Intervals', sets: 8, reps: '20s', rest: '40s', rpe: '8' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_handball_in',
    sport: 'handball',
    group: 'team',
    phase: 'in',
    ar: 'كرة يد — أثناء الموسم (صيانة قصيرة)',
    en: 'Handball — In-season (short maintenance)',
    note: {
      ar: 'جلسة قصيرة للحفاظ على قوة الرجلين والكتف والضامة بين الماتشات. حجم قليل وشدة متوسطة، وما تعملش رمي كتير في نفس اليوم.',
      en: 'A short session to maintain leg, shoulder and groin strength between matches. Low volume, moderate intensity, and avoid extra throwing volume on the same day.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '15' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 3, reps: '3', rest: '120s', rpe: '6' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 2, reps: '6/side', rest: '60s', rpe: '6' },
        { libId: 'ad_medicine_ball_chest_pass', en: 'Medicine Ball Chest Pass', sets: 3, reps: '5', rest: '60s', rpe: '6' },
        { libId: 'ex_band_external_rotation', en: 'Band External Rotation', sets: 2, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 2, reps: '15s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_handball_prevent',
    sport: 'handball',
    group: 'team',
    phase: 'prevent',
    ar: 'كرة يد — وقاية من الإصابات (كتف الرمي وركبة)',
    en: 'Handball — Injury prevention (throwing shoulder & knee)',
    note: {
      ar: 'تقوية الكفة المدوّرة ولوح الكتف لكتف الرمي، مع عضلة خلفية وتحكم في الهبوط للركبة. التمارين دي تتعمل بتحكم وبطء، مش بوزن تقيل.',
      en: 'Rotator-cuff and scapular work for the throwing shoulder, plus hamstring strength and landing control for the knee. Move slowly and with control, not with heavy load.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' },
        { libId: 'ad_walking_hip_opener', en: 'Walking Hip Opener', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 3, reps: '12/side', rest: '45s', rpe: '6' },
        { libId: 'wg_prone_y_raise', en: 'Prone Y Raise', sets: 3, reps: '10', rest: '45s', rpe: '6' },
        { libId: 'ad_serratus_wall_slide', en: 'Serratus Wall Slide', sets: 2, reps: '10', rest: '45s', rpe: '5' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 3, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'ad_single_leg_forward_hop_and_stick', en: 'Single-Leg Forward Hop and Stick', sets: 3, reps: '4/side', rest: '60s', rpe: '6' },
        { libId: 'wg_step_down', en: 'Step-Down', sets: 2, reps: '8/side', rest: '60s', rpe: '6' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ad_towel_shoulder_internal_rotation_stretch', en: 'Towel Shoulder Internal Rotation Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_s_volleyball_off',
    sport: 'volleyball',
    group: 'team',
    phase: 'off',
    ar: 'كرة طائرة — خارج الموسم (قوة وقاعدة هوائية)',
    en: 'Volleyball — Off-season (strength & aerobic base)',
    note: {
      ar: 'بناء قوة الرجلين والأرداف والسمانة كأساس للنط، مع تقوية الظهر والكتف. الكارديو على العجلة عشان تقلل الخبط على الركبة.',
      en: 'Build leg, glute and calf strength as the base for jumping, plus back and shoulder strength. Cardio is on the bike to limit knee impact.'
    },
    sections: {
      warmup: [
        { libId: 'ex_jump_rope', en: 'Jump Rope', sets: 2, reps: '60s' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '15' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_hip_thrust', en: 'Hip Thrust', sets: 3, reps: '10', rest: '90s', rpe: '7' },
        { libId: 'ex_step_up', en: 'Step-Up', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 3, reps: '6-8', rest: '90s', rpe: '8' },
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 3, reps: '15', rest: '60s', rpe: '7' },
        { libId: 'ex_calf_raise', en: 'Standing Calf Raise', sets: 3, reps: '12', rest: '60s', rpe: '8' }
      ],
      cardio: [
        { libId: 'ad_steady_state_bike_ride', en: 'Steady-State Bike Ride', sets: 1, reps: '25min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_quad_stretch', en: 'Quad Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_volleyball_pre',
    sport: 'volleyball',
    group: 'team',
    phase: 'pre',
    ar: 'كرة طائرة — قبل الموسم (نط وضرب ساحق)',
    en: 'Volleyball — Pre-season (jump & spike power)',
    note: {
      ar: 'تحويل القوة لنط رأسي وقوة ضرب من فوق الراس، مع لياقة حركة قصيرة في الملعب. عدد النطات في الأسبوع محسوب، فما تزودش لو الركبة بتوجع.',
      en: 'Convert strength into vertical jump and overhead hitting power, with short on-court movement conditioning. Weekly jump count matters, so do not add volume if the knee is sore.'
    },
    sections: {
      warmup: [
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 2, reps: '15' },
        { libId: 'ad_shoulder_cars', en: 'Shoulder CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 4, reps: '3', rest: '150s', rpe: '7' },
        { libId: 'ad_back_squat_to_jump_squat_contrast', en: 'Back Squat to Jump Squat Contrast', sets: 4, reps: '3+3', rest: '180s', rpe: '8' },
        { libId: 'ad_depth_jump', en: 'Depth Jump', sets: 3, reps: '4', rest: '120s', rpe: '8' },
        { libId: 'ad_medicine_ball_overhead_backward_throw', en: 'Medicine Ball Overhead Backward Throw', sets: 3, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'ad_medicine_ball_soccer_throw', en: 'Medicine Ball Soccer Throw', sets: 3, reps: '6', rest: '90s', rpe: '7' }
      ],
      cardio: [
        { libId: 'dr_cone_t_drill', en: 'T-Drill (cones)', sets: 6, reps: '1', rest: '45s', rpe: '8' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_volleyball_in',
    sport: 'volleyball',
    group: 'team',
    phase: 'in',
    ar: 'كرة طائرة — أثناء الموسم (صيانة قصيرة)',
    en: 'Volleyball — In-season (short maintenance)',
    note: {
      ar: 'صيانة للقوة ووتر الرضفة والكتف من غير نط زيادة، لأن الملعب فيه نط كفاية. شغل الأيزومتري للركبة بيتعمل بشدة مريحة من غير ألم.',
      en: 'Maintains strength, patellar tendon and shoulder health without extra jumps, since court work already has plenty. Knee isometrics should feel comfortable and pain-free.'
    },
    sections: {
      warmup: [
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 1, reps: '10' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '15' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '3', rest: '120s', rpe: '6' },
        { libId: 'ad_spanish_squat', en: 'Spanish Squat', sets: 3, reps: '30s', rest: '60s', rpe: '6' },
        { libId: 'ex_band_external_rotation', en: 'Band External Rotation', sets: 2, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'wg_prone_y_raise', en: 'Prone Y Raise', sets: 2, reps: '10', rest: '45s', rpe: '6' }
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
    id: 'tpl_s_volleyball_prevent',
    sport: 'volleyball',
    group: 'team',
    phase: 'prevent',
    ar: 'كرة طائرة — وقاية من الإصابات (هبوط وكاحل وركبة وكتف)',
    en: 'Volleyball — Injury prevention (landing, ankle, knee, shoulder)',
    note: {
      ar: 'بيستهدف أشهر إصابات الطائرة: التواء الكاحل، ركبة النطاط، وكتف الضرب. اهبط على الرجلين الاتنين بهدوء، وأي ألم حاد في الكتف يوقف التمرين.',
      en: 'Targets the most common volleyball injuries: ankle sprains, jumper\'s knee and the hitting shoulder. Land softly on both feet, and stop at any sharp shoulder pain.'
    },
    sections: {
      warmup: [
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' }
      ],
      main: [
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 3, reps: '30s/side', rest: '30s', rpe: '5' },
        { libId: 'ad_depth_drop', en: 'Depth Drop', sets: 3, reps: '5', rest: '60s', rpe: '6' },
        { libId: 'ad_banded_ankle_eversion', en: 'Banded Ankle Eversion', sets: 2, reps: '15/side', rest: '45s', rpe: '6' },
        { libId: 'ad_spanish_squat', en: 'Spanish Squat', sets: 3, reps: '45s', rest: '60s', rpe: '7' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 3, reps: '12/side', rest: '45s', rpe: '6' },
        { libId: 'ad_serratus_wall_slide', en: 'Serratus Wall Slide', sets: 2, reps: '10', rest: '45s', rpe: '5' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ad_sleeper_stretch', en: 'Sleeper Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_rugby_off',
    sport: 'rugby',
    group: 'team',
    phase: 'off',
    ar: 'رجبي — خارج الموسم (قوة وتضخيم وقاعدة هوائية)',
    en: 'Rugby — Off-season (strength, size & aerobic base)',
    note: {
      ar: 'بناء قوة وكتلة عضلية للالتحام، مع تقوية الرقبة وجري تيمبو للقاعدة الهوائية. شغل الرقبة بمقاومة خفيفة ومن غير حركات مفاجئة.',
      en: 'Build strength and muscle mass for contact, with neck strengthening and tempo runs for the aerobic base. Neck work uses light resistance and no sudden movements.'
    },
    sections: {
      warmup: [
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '6' },
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '5', rest: '180s', rpe: '8' },
        { libId: 'ex_barbell_bench_press', en: 'Barbell Bench Press', sets: 4, reps: '6', rest: '150s', rpe: '8' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'ex_bent_over_row', en: 'Bent Over Barbell Row', sets: 4, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'ek_static_neck_flexion_and_extension', en: 'Isometric Neck Flexion and Extension', sets: 3, reps: '20s', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'dr_tempo_run', en: 'Tempo Run', sets: 8, reps: '100m', rest: '45s', rpe: '6' }
      ],
      mobility: [
        { libId: 'ad_thread_the_needle', en: 'Thread the Needle', sets: 2, reps: '6/side' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_rugby_pre',
    sport: 'rugby',
    group: 'team',
    phase: 'pre',
    ar: 'رجبي — قبل الموسم (قوة انفجارية ولياقة التحام)',
    en: 'Rugby — Pre-season (power & contact conditioning)',
    note: {
      ar: 'تحويل القوة لقدرة انفجارية في الجزء العلوي والسفلي، مع سبرنت بمقاومة ولياقة دفع متكرر زي الالتحام. التكنيك في الكلين أهم من الوزن.',
      en: 'Convert strength into upper- and lower-body power, with resisted sprints and repeated-push conditioning that mimics contact. Clean technique matters more than load.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ad_power_clean', en: 'Power Clean', sets: 5, reps: '3', rest: '180s', rpe: '8' },
        { libId: 'ad_back_squat_to_jump_squat_contrast', en: 'Back Squat to Jump Squat Contrast', sets: 4, reps: '3+3', rest: '180s', rpe: '8' },
        { libId: 'ad_bench_press_to_plyo_push_up_contrast', en: 'Bench Press to Plyo Push-up Contrast', sets: 4, reps: '3+4', rest: '180s', rpe: '8' },
        { libId: 'ad_sled_resisted_sprint', en: 'Sled-Resisted Sprint', sets: 5, reps: '15m', rest: '120s', rpe: '8' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 3, reps: '5', rest: '90s', rpe: '8' }
      ],
      cardio: [
        { libId: 'ad_sled_push_sprints', en: 'Sled Push Sprints', sets: 6, reps: '20m', rest: '60s', rpe: '9' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_rugby_in',
    sport: 'rugby',
    group: 'team',
    phase: 'in',
    ar: 'رجبي — أثناء الموسم (صيانة قصيرة)',
    en: 'Rugby — In-season (short maintenance)',
    note: {
      ar: 'جلسة قصيرة تحافظ على القوة العامة والرقبة بعد الماتش بيوم أو اتنين. أوزان تقيلة بعدد قليل جدًا، وسيبها لو في كدمات أو ألم من الالتحامات.',
      en: 'A short session 1–2 days after a match to keep maximal strength and neck strength. Heavy loads at very low volume; skip it if contact bruising or pain is present.'
    },
    sections: {
      warmup: [
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5/side' },
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 1, reps: '4/side' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '3', rest: '150s', rpe: '7' },
        { libId: 'ex_barbell_bench_press', en: 'Barbell Bench Press', sets: 3, reps: '3', rest: '150s', rpe: '7' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 3, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'ek_static_neck_side_flexion', en: 'Isometric Neck Side Flexion', sets: 2, reps: '15s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_steady_state_bike_ride', en: 'Steady-State Bike Ride', sets: 1, reps: '10min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_neck_stretch', en: 'Neck Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_rugby_prevent',
    sport: 'rugby',
    group: 'team',
    phase: 'prevent',
    ar: 'رجبي — وقاية من الإصابات (رقبة وكتف وعضلة خلفية وضامة)',
    en: 'Rugby — Injury prevention (neck, shoulder, hamstring, groin)',
    note: {
      ar: 'تقوية الرقبة والكتف لتحمل الالتحام، مع نوردك وكوبنهاجن للعضلة الخلفية والضامة. تمارين الرقبة ثابتة ومن غير ألم، وأي أعراض ارتجاج تستدعي تقييم طبي.',
      en: 'Neck and shoulder strengthening for contact, plus Nordics and Copenhagen work for the hamstrings and groin. Neck work is isometric and pain-free; any concussion symptoms need medical assessment.'
    },
    sections: {
      warmup: [
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5/side' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' }
      ],
      main: [
        { libId: 'ek_static_neck_flexion_and_extension', en: 'Isometric Neck Flexion and Extension', sets: 3, reps: '15s', rest: '45s', rpe: '6' },
        { libId: 'ek_static_neck_side_flexion', en: 'Isometric Neck Side Flexion', sets: 3, reps: '15s/side', rest: '45s', rpe: '6' },
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 3, reps: '15', rest: '60s', rpe: '6' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 3, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 3, reps: '20s/side', rest: '60s', rpe: '7' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_baseball_off',
    sport: 'baseball',
    group: 'team',
    phase: 'off',
    ar: 'بيسبول — خارج الموسم (قوة وقاعدة هوائية)',
    en: 'Baseball — Off-season (strength & aerobic base)',
    note: {
      ar: 'قوة عامة للرجلين والجذع وتوازن بين الدفع والسحب لكتف الرمي، مع كارديو خفيف للاستشفاء. بلاش ضغط فوق الراس بالبار، واللاندماين أأمن للكتف.',
      en: 'General leg and trunk strength with a push/pull balance for the throwing shoulder, plus easy cardio for recovery. Avoid barbell overhead pressing; the landmine press is kinder to the shoulder.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' },
        { libId: 'ad_walking_lunge_with_twist', en: 'Walking Lunge with Twist', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 4, reps: '5', rest: '150s', rpe: '7' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_one_arm_dumbbell_row', en: 'One-Arm Dumbbell Row', sets: 3, reps: '10/side', rest: '90s', rpe: '7' },
        { libId: 'wg_landmine_press', en: 'Landmine Press', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 3, reps: '10/side', rest: '60s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_steady_state_bike_ride', en: 'Steady-State Bike Ride', sets: 1, reps: '25min' }
      ],
      mobility: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 2, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_baseball_pre',
    sport: 'baseball',
    group: 'team',
    phase: 'pre',
    ar: 'بيسبول — قبل الموسم (قوة دوران وسرعة)',
    en: 'Baseball — Pre-season (rotational power & speed)',
    note: {
      ar: 'قوة دوران للضرب والرمي وتسارع قصير للجري بين القواعد، مع لياقة سبرنت قصيرة جدًا. الرميات بتبدأ من الرجلين والوسط، مش من الدراع.',
      en: 'Rotational power for hitting and throwing plus short acceleration for base running, with very short sprint conditioning. Throws start from the legs and hips, not the arm.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '15' },
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' }
      ],
      main: [
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 4, reps: '5/side', rest: '90s', rpe: '7' },
        { libId: 'ad_medicine_ball_scoop_toss', en: 'Medicine Ball Scoop Toss', sets: 3, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'ad_trap_bar_jump', en: 'Trap Bar Jump', sets: 4, reps: '4', rest: '120s', rpe: '7' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '5/side', rest: '120s', rpe: '8' },
        { libId: 'ad_falling_start', en: 'Falling Start', sets: 6, reps: '15m', rest: '90s', rpe: '9' }
      ],
      cardio: [
        { libId: 'ad_air_bike_calorie_sprints', en: 'Air Bike Calorie Sprints', sets: 6, reps: '10s', rest: '50s', rpe: '9' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ad_towel_shoulder_internal_rotation_stretch', en: 'Towel Shoulder Internal Rotation Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_s_baseball_in',
    sport: 'baseball',
    group: 'team',
    phase: 'in',
    ar: 'بيسبول — أثناء الموسم (صيانة قصيرة)',
    en: 'Baseball — In-season (short maintenance)',
    note: {
      ar: 'صيانة قصيرة للقوة والدوران والكفة المدوّرة والساعد بين الماتشات. للرامي خليها بعد يوم الرمي بيوم مش قبله.',
      en: 'Short maintenance of strength, rotation, rotator cuff and forearm between games. Pitchers should do it the day after throwing, not the day before.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '15' },
        { libId: 'ad_shoulder_cars', en: 'Shoulder CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '3', rest: '120s', rpe: '6' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 3, reps: '4/side', rest: '60s', rpe: '6' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 2, reps: '12/side', rest: '45s', rpe: '6' },
        { libId: 'wg_wrist_curl', en: 'Barbell Wrist Curl', sets: 2, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 2, reps: '20s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_baseball_prevent',
    sport: 'baseball',
    group: 'team',
    phase: 'prevent',
    ar: 'بيسبول — وقاية من الإصابات (كتف وكوع الرمي)',
    en: 'Baseball — Injury prevention (throwing shoulder & elbow)',
    note: {
      ar: 'تقوية الكفة المدوّرة ولوح الكتف وعضلات الساعد اللي بتحمي الكوع، مع عضلة خلفية للسبرنت. أوزان خفيفة جدًا وحركة بطيئة، وأي ألم في الكوع الداخلي يستدعي تقييم.',
      en: 'Rotator-cuff, scapular and forearm-flexor work to protect the elbow, plus hamstrings for sprinting. Very light loads and slow reps; any inner-elbow pain needs assessment.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' },
        { libId: 'ex_arm_circles', en: 'Arm Circles', sets: 1, reps: '15' }
      ],
      main: [
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 3, reps: '12/side', rest: '45s', rpe: '6' },
        { libId: 'wg_prone_y_raise', en: 'Prone Y Raise', sets: 3, reps: '10', rest: '45s', rpe: '6' },
        { libId: 'wg_prone_t_raise', en: 'Prone T Raise', sets: 3, reps: '10', rest: '45s', rpe: '6' },
        { libId: 'ad_serratus_wall_slide', en: 'Serratus Wall Slide', sets: 2, reps: '10', rest: '45s', rpe: '5' },
        { libId: 'wg_wrist_curl', en: 'Barbell Wrist Curl', sets: 2, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 2, reps: '5', rest: '90s', rpe: '7' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ad_towel_shoulder_internal_rotation_stretch', en: 'Towel Shoulder Internal Rotation Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_s_hockey_off',
    sport: 'hockey',
    group: 'team',
    phase: 'off',
    ar: 'هوكي — خارج الموسم (قوة وقاعدة هوائية)',
    en: 'Hockey — Off-season (strength & aerobic base)',
    note: {
      ar: 'قوة الرجلين في الاتجاهات كلها وتقوية الضامة والظهر، مع عجلة للقاعدة الهوائية بنفس زاوية الوقفة. الاندفاع الجانبي بتحكم والركبة على خط الصباع.',
      en: 'Multi-directional leg strength, groin and back strengthening, with bike work for the aerobic base in a similar hip angle to play. Control lateral lunges with the knee over the toes.'
    },
    sections: {
      warmup: [
        { libId: 'ad_walking_hip_opener', en: 'Walking Hip Opener', sets: 1, reps: '20m' },
        { libId: 'wg_banded_lateral_walk', en: 'Banded Lateral Walk', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'wg_dumbbell_lateral_lunge', en: 'Dumbbell Lateral Lunge', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 3, reps: '6-8', rest: '90s', rpe: '8' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 3, reps: '20s/side', rest: '60s', rpe: '7' }
      ],
      cardio: [
        { libId: 'ad_steady_state_bike_ride', en: 'Steady-State Bike Ride', sets: 1, reps: '30min' }
      ],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 2, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_hockey_pre',
    sport: 'hockey',
    group: 'team',
    phase: 'pre',
    ar: 'هوكي — قبل الموسم (دفع جانبي وقوة تسديد)',
    en: 'Hockey — Pre-season (lateral power & shot power)',
    note: {
      ar: 'قوة انفجارية جانبية للتزحلق أو الجري، قوة دوران للتسديد، ولياقة بنفس طول النوبة في الماتش. اثبت ثانيتين في كل هبوط جانبي قبل اللي بعده.',
      en: 'Lateral power for skating or running, rotational power for shooting, and conditioning matched to shift length. Hold each lateral landing for two seconds before the next rep.'
    },
    sections: {
      warmup: [
        { libId: 'ad_carioca', en: 'Carioca', sets: 2, reps: '20m' },
        { libId: 'wg_skater_hop', en: 'Skater Hop', sets: 2, reps: '6/side' }
      ],
      main: [
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 4, reps: '3', rest: '150s', rpe: '7' },
        { libId: 'ad_lateral_bound_and_stick', en: 'Lateral Bound and Stick', sets: 4, reps: '5/side', rest: '90s', rpe: '8' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 4, reps: '5/side', rest: '120s', rpe: '8' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 3, reps: '6/side', rest: '90s', rpe: '7' },
        { libId: 'ad_lateral_sled_drag', en: 'Lateral Sled Drag', sets: 4, reps: '20m', rest: '90s', rpe: '8' }
      ],
      cardio: [
        { libId: 'ad_air_bike_calorie_sprints', en: 'Air Bike Calorie Sprints', sets: 6, reps: '40s', rest: '120s', rpe: '9' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_hockey_in',
    sport: 'hockey',
    group: 'team',
    phase: 'in',
    ar: 'هوكي — أثناء الموسم (صيانة قصيرة)',
    en: 'Hockey — In-season (short maintenance)',
    note: {
      ar: 'صيانة قصيرة للقوة والضامة والنط بعد الماتش بيوم أو اتنين. حجم قليل ووقف قبل ما تحس بتعب في الرجلين.',
      en: 'Short maintenance of strength, groin capacity and jump ability 1–2 days after a game. Low volume; stop before the legs feel tired.'
    },
    sections: {
      warmup: [
        { libId: 'wg_banded_lateral_walk', en: 'Banded Lateral Walk', sets: 1, reps: '10/side' },
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '3', rest: '120s', rpe: '6' },
        { libId: 'ex_lateral_lunge', en: 'Lateral Lunge', sets: 2, reps: '6/side', rest: '60s', rpe: '6' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 2, reps: '15s/side', rest: '45s', rpe: '6' },
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 3, reps: '3', rest: '60s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_steady_state_bike_ride', en: 'Steady-State Bike Ride', sets: 1, reps: '10min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_hockey_prevent',
    sport: 'hockey',
    group: 'team',
    phase: 'prevent',
    ar: 'هوكي — وقاية من الإصابات (ضامة وحوض وأسفل الظهر)',
    en: 'Hockey — Injury prevention (groin, hip, lower back)',
    note: {
      ar: 'بيركز على الضامة ومفصل الحوض وثبات أسفل الظهر، وده أكتر مكان بيتعب من وقفة الهوكي المنحنية. حركات بطيئة ومن غير ألم في الفخذ من جوه.',
      en: 'Focuses on the adductors, hip joint and lower-back stability, which take the most strain from the bent hockey posture. Move slowly and keep the inner thigh pain-free.'
    },
    sections: {
      warmup: [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' },
        { libId: 'wg_banded_monster_walk', en: 'Banded Monster Walk', sets: 2, reps: '10m' }
      ],
      main: [
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 3, reps: '20s/side', rest: '60s', rpe: '7' },
        { libId: 'ad_supine_adductor_ball_squeeze', en: 'Supine Adductor Ball Squeeze', sets: 3, reps: '10x5s', rest: '45s', rpe: '6' },
        { libId: 'wg_hip_airplane', en: 'Hip Airplane', sets: 2, reps: '5/side', rest: '60s', rpe: '6' },
        { libId: 'ex_bird_dog', en: 'Bird Dog', sets: 3, reps: '8/side', rest: '45s', rpe: '5' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 3, reps: '30s/side', rest: '45s', rpe: '6' },
        { libId: 'wg_side_lying_hip_abduction', en: 'Side-Lying Hip Abduction', sets: 2, reps: '15/side', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' },
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_futsal_off',
    sport: 'futsal',
    group: 'team',
    phase: 'off',
    ar: 'خماسي — خارج الموسم (قوة وقاعدة هوائية)',
    en: 'Futsal — Off-season (strength & aerobic base)',
    note: {
      ar: 'قوة للرجلين في الاتجاهات كلها وتقوية السمانة والضامة، مع جري هادي للقاعدة الهوائية. الملعب الصغير فيه لف كتير، فالتركيز على الاتجاه الجانبي مهم.',
      en: 'Multi-directional leg strength with calf and groin work, plus easy running for the aerobic base. The small court means constant turning, so lateral strength matters.'
    },
    sections: {
      warmup: [
        { libId: 'ad_carioca', en: 'Carioca', sets: 1, reps: '20m' },
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'wg_dumbbell_lateral_lunge', en: 'Dumbbell Lateral Lunge', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'wg_single_leg_calf_raise', en: 'Single-Leg Calf Raise', sets: 3, reps: '12/side', rest: '60s', rpe: '8' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 3, reps: '20s/side', rest: '60s', rpe: '7' }
      ],
      cardio: [
        { libId: 'ad_zone_2_easy_run', en: 'Zone 2 Easy Run', sets: 1, reps: '25min' }
      ],
      mobility: [
        { libId: 'ad_knee_to_wall_ankle_mobilization', en: 'Knee-to-Wall Ankle Mobilization', sets: 2, reps: '10/side' }
      ],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_futsal_pre',
    sport: 'futsal',
    group: 'team',
    phase: 'pre',
    ar: 'خماسي — قبل الموسم (سرعة ورد فعل ولف)',
    en: 'Futsal — Pre-season (speed, reaction & turning)',
    note: {
      ar: 'تسارع قصير، رد فعل، ولف 180 درجة مع لياقة سبرنتات متكررة زي الماتش. خفّض وسطك قبل اللفة ووقف بالرجل الخارجية من غير ما الركبة تدخل لجوه.',
      en: 'Short acceleration, reaction and 180-degree turns, with repeated-sprint conditioning like match play. Lower your hips before the turn and brake on the outside leg without knee cave.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_agility_ladder_icky_shuffle', en: 'Agility Ladder — Icky Shuffle', sets: 2, reps: '2 lengths' }
      ],
      main: [
        { libId: 'ad_trap_bar_deadlift_to_broad_jump_contrast', en: 'Trap Bar Deadlift to Broad Jump Contrast', sets: 4, reps: '3+3', rest: '180s', rpe: '8' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 3, reps: '5', rest: '120s', rpe: '8' },
        { libId: 'ad_180_degree_cut', en: '180-Degree Cut', sets: 4, reps: '3/side', rest: '90s', rpe: '8' },
        { libId: 'ad_reaction_start_sprint', en: 'Reaction Start Sprint', sets: 6, reps: '10m', rest: '60s', rpe: '9' },
        { libId: 'ad_single_leg_lateral_hop_and_stick', en: 'Single-Leg Lateral Hop and Stick', sets: 3, reps: '5/side', rest: '60s', rpe: '7' }
      ],
      cardio: [
        { libId: 'dr_shuttle_run', en: 'Shuttle Run', sets: 3, reps: '6x20m', rest: '3min', rpe: '8' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_futsal_in',
    sport: 'futsal',
    group: 'team',
    phase: 'in',
    ar: 'خماسي — أثناء الموسم (صيانة قصيرة)',
    en: 'Futsal — In-season (short maintenance)',
    note: {
      ar: 'جلسة قصيرة تحافظ على القوة والعضلة الخلفية والضامة بين الماتشات. ما فيش لف أو سبرنت زيادة، الملعب كفاية.',
      en: 'A short session to keep strength, hamstrings and groin capacity between matches. No extra cutting or sprinting; the court provides enough.'
    },
    sections: {
      warmup: [
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 2, reps: '10/side' },
        { libId: 'ad_mini_band_standing_march', en: 'Mini-Band Standing March', sets: 1, reps: '20' }
      ],
      main: [
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 3, reps: '3', rest: '120s', rpe: '6' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 2, reps: '4', rest: '90s', rpe: '7' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 2, reps: '15s/side', rest: '45s', rpe: '6' },
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 3, reps: '3', rest: '60s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_knee_to_wall_ankle_mobilization', en: 'Knee-to-Wall Ankle Mobilization', sets: 1, reps: '10/side' }
      ],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_futsal_prevent',
    sport: 'futsal',
    group: 'team',
    phase: 'prevent',
    ar: 'خماسي — وقاية من الإصابات (كاحل وضامة وعضلة خلفية)',
    en: 'Futsal — Injury prevention (ankle, groin, hamstring)',
    note: {
      ar: 'على طريقة FIFA 11+ مع تركيز زيادة على الكاحل والضامة بسبب الأرضية الصلبة واللف الكتير. اثبت في كل هبوط والركبة على خط الصباع.',
      en: 'FIFA 11+ style with extra ankle and groin work because of hard courts and frequent turning. Stick every landing with the knee over the toes.'
    },
    sections: {
      warmup: [
        { libId: 'ad_carioca', en: 'Carioca', sets: 1, reps: '20m' },
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ad_banded_ankle_eversion', en: 'Banded Ankle Eversion', sets: 2, reps: '15/side', rest: '45s', rpe: '6' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 3, reps: '30s/side', rest: '30s', rpe: '5' },
        { libId: 'ad_short_lever_copenhagen_plank', en: 'Short-Lever Copenhagen Plank', sets: 3, reps: '20s/side', rest: '60s', rpe: '6' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 3, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'ad_single_leg_lateral_hop_and_stick', en: 'Single-Leg Lateral Hop and Stick', sets: 3, reps: '5/side', rest: '60s', rpe: '6' },
        { libId: 'ad_supine_adductor_ball_squeeze', en: 'Supine Adductor Ball Squeeze', sets: 2, reps: '10x5s', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_tennis_off',
    sport: 'tennis',
    group: 'racket',
    phase: 'off',
    ar: 'تنس — خارج الموسم (قوة وقاعدة هوائية)',
    en: 'Tennis — Off-season (strength & aerobic base)',
    note: {
      ar: 'قوة عامة للرجلين والجذع وتوازن بين الدفع والسحب للكتف، مع قاعدة هوائية تساعدك تستشفى بين النقاط. تمرين الدوران من الوسط مش من الضهر.',
      en: 'General leg and trunk strength with a push/pull balance for the shoulder, plus an aerobic base to recover between points. Rotate from the hips, not the lower back.'
    },
    sections: {
      warmup: [
        { libId: 'ad_cross_body_arm_swings', en: 'Cross-Body Arm Swings', sets: 1, reps: '15' },
        { libId: 'ad_walking_lunge_with_twist', en: 'Walking Lunge with Twist', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_one_arm_dumbbell_row', en: 'One-Arm Dumbbell Row', sets: 3, reps: '10/side', rest: '90s', rpe: '7' },
        { libId: 'wg_landmine_press', en: 'Landmine Press', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'wg_cable_woodchop', en: 'Cable Woodchop', sets: 3, reps: '10/side', rest: '60s', rpe: '7' }
      ],
      cardio: [
        { libId: 'ad_zone_2_easy_run', en: 'Zone 2 Easy Run', sets: 1, reps: '30min' }
      ],
      mobility: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 2, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_tennis_pre',
    sport: 'tennis',
    group: 'racket',
    phase: 'pre',
    ar: 'تنس — قبل الموسم (دوران وحركة قدمين)',
    en: 'Tennis — Pre-season (rotation & footwork)',
    note: {
      ar: 'قوة دوران للضربات والإرسال، خطوة جانبية وسبليت ستيب سريعة، ولياقة بنفس توقيت النقطة والراحة. ابدأ الرميات بكرة خفيفة وزوّد السرعة مش الوزن.',
      en: 'Rotational power for groundstrokes and serve, fast split-step and lateral movement, and conditioning matched to point and rest times. Start throws with a light ball and progress speed, not load.'
    },
    sections: {
      warmup: [
        { libId: 'ad_carioca', en: 'Carioca', sets: 1, reps: '20m' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '15' }
      ],
      main: [
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 4, reps: '6/side', rest: '90s', rpe: '7' },
        { libId: 'ad_medicine_ball_soccer_throw', en: 'Medicine Ball Soccer Throw', sets: 3, reps: '6', rest: '90s', rpe: '7' },
        { libId: 'ad_split_step_to_lunge_reaction', en: 'Split-Step to Lunge Reaction', sets: 4, reps: '6', rest: '60s', rpe: '7' },
        { libId: 'ad_lateral_bound_and_stick', en: 'Lateral Bound and Stick', sets: 3, reps: '5/side', rest: '90s', rpe: '7' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 4, reps: '5/side', rest: '120s', rpe: '8' }
      ],
      cardio: [
        { libId: 'ex_sprint_intervals', en: 'Sprint Intervals', sets: 3, reps: '6x10s/20s', rest: '2min', rpe: '8' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_tennis_in',
    sport: 'tennis',
    group: 'racket',
    phase: 'in',
    ar: 'تنس — أثناء الموسم (صيانة قصيرة)',
    en: 'Tennis — In-season (short maintenance)',
    note: {
      ar: 'صيانة قصيرة للرجلين والكتف والساعد بين البطولات. خليها في يوم مافيهوش ماتش، وقلّل الرميات لو الكتف مرهق.',
      en: 'Short maintenance for legs, shoulder and forearm between tournaments. Schedule it on a non-match day and cut throws if the shoulder feels tired.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '15' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '6', rest: '90s', rpe: '6' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 2, reps: '6/side', rest: '60s', rpe: '6' },
        { libId: 'ex_band_external_rotation', en: 'Band External Rotation', sets: 2, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ad_eccentric_wrist_extension', en: 'Eccentric Wrist Extension', sets: 2, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 2, reps: '4/side', rest: '60s', rpe: '6' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ad_towel_shoulder_internal_rotation_stretch', en: 'Towel Shoulder Internal Rotation Stretch', sets: 1, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_s_tennis_prevent',
    sport: 'tennis',
    group: 'racket',
    phase: 'prevent',
    ar: 'تنس — وقاية من الإصابات (كتف وكوع التنس وكاحل)',
    en: 'Tennis — Injury prevention (shoulder, tennis elbow, ankle)',
    note: {
      ar: 'تقوية الكفة المدوّرة ولوح الكتف، وتمارين لامركزية لعضلات الساعد اللي بتتعب في كوع التنس، وثبات للكاحل. أوزان خفيفة وحركة بطيئة، وأي ألم مستمر محتاج تقييم.',
      en: 'Rotator-cuff and scapular strengthening, eccentric forearm work for the muscles involved in tennis elbow, and ankle stability. Light loads, slow reps; persistent pain needs assessment.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' },
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 3, reps: '12/side', rest: '45s', rpe: '6' },
        { libId: 'wg_prone_y_raise', en: 'Prone Y Raise', sets: 3, reps: '10', rest: '45s', rpe: '6' },
        { libId: 'ad_serratus_wall_slide', en: 'Serratus Wall Slide', sets: 2, reps: '10', rest: '45s', rpe: '5' },
        { libId: 'ad_eccentric_wrist_extension', en: 'Eccentric Wrist Extension', sets: 3, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ad_flexible_bar_eccentric_wrist_twist', en: 'Flexible Bar Eccentric Wrist Twist', sets: 3, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 2, reps: '30s/side', rest: '30s', rpe: '5' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ad_sleeper_stretch', en: 'Sleeper Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_table_tennis_off',
    sport: 'table_tennis',
    group: 'racket',
    phase: 'off',
    ar: 'تنس طاولة — خارج الموسم (قوة وقاعدة هوائية)',
    en: 'Table tennis — Off-season (strength & aerobic base)',
    note: {
      ar: 'قوة للرجلين في وقفة واطية وثبات للجذع ضد الدوران، مع قاعدة هوائية خفيفة. حافظ على ضهر مستقيم في الوقفة الواطية بدل ما تنحني من الوسط.',
      en: 'Leg strength for the low ready stance and anti-rotation trunk stability, plus a light aerobic base. Keep a straight back in the low stance instead of bending from the waist.'
    },
    sections: {
      warmup: [
        { libId: 'ad_cross_body_arm_swings', en: 'Cross-Body Arm Swings', sets: 1, reps: '15' },
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 4, reps: '10', rest: '90s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '10', rest: '90s', rpe: '7' },
        { libId: 'wg_dumbbell_lateral_lunge', en: 'Dumbbell Lateral Lunge', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_seated_cable_row', en: 'Seated Cable Row', sets: 3, reps: '12', rest: '60s', rpe: '7' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 3, reps: '10/side', rest: '60s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_steady_state_bike_ride', en: 'Steady-State Bike Ride', sets: 1, reps: '25min' }
      ],
      mobility: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 2, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_table_tennis_pre',
    sport: 'table_tennis',
    group: 'racket',
    phase: 'pre',
    ar: 'تنس طاولة — قبل الموسم (سرعة قدمين ورد فعل)',
    en: 'Table tennis — Pre-season (fast feet & reaction)',
    note: {
      ar: 'خطوات جانبية سريعة، رد فعل، وقوة دوران للضربة، مع لياقة نط حبل متقطعة. السرعة هنا في الخطوة القصيرة، فخليك على مشط الرجل والركبة مثنية.',
      en: 'Quick lateral steps, reaction and rotational power for the stroke, with interval rope-skipping conditioning. Speed here is in short steps, so stay on the balls of the feet with soft knees.'
    },
    sections: {
      warmup: [
        { libId: 'wg_fast_feet', en: 'Fast Feet', sets: 2, reps: '15s' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '15' }
      ],
      main: [
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 4, reps: '6/side', rest: '90s', rpe: '7' },
        { libId: 'ad_lateral_bound_and_stick', en: 'Lateral Bound and Stick', sets: 3, reps: '5/side', rest: '90s', rpe: '7' },
        { libId: 'ad_agility_ladder_icky_shuffle', en: 'Agility Ladder — Icky Shuffle', sets: 4, reps: '2 lengths', rest: '45s', rpe: '7' },
        { libId: 'ad_mirror_drill', en: 'Mirror Drill', sets: 5, reps: '10s', rest: '40s', rpe: '8' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '6/side', rest: '90s', rpe: '8' }
      ],
      cardio: [
        { libId: 'dr_jump_rope_intervals', en: 'Jump Rope Intervals', sets: 8, reps: '30s', rest: '30s', rpe: '7' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_table_tennis_in',
    sport: 'table_tennis',
    group: 'racket',
    phase: 'in',
    ar: 'تنس طاولة — أثناء الموسم (صيانة قصيرة)',
    en: 'Table tennis — In-season (short maintenance)',
    note: {
      ar: 'صيانة قصيرة للرجلين والجذع والكتف والساعد بين البطولات. شدة متوسطة وحجم قليل عشان ما تأثرش على لمسة الكورة.',
      en: 'Short maintenance for legs, trunk, shoulder and forearm between tournaments. Moderate intensity and low volume so it does not affect touch at the table.'
    },
    sections: {
      warmup: [
        { libId: 'wg_fast_feet', en: 'Fast Feet', sets: 1, reps: '15s' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '15' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '8', rest: '90s', rpe: '6' },
        { libId: 'ex_band_external_rotation', en: 'Band External Rotation', sets: 2, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 2, reps: '10/side', rest: '45s', rpe: '6' },
        { libId: 'ad_eccentric_wrist_extension', en: 'Eccentric Wrist Extension', sets: 2, reps: '15', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 1, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_table_tennis_prevent',
    sport: 'table_tennis',
    group: 'racket',
    phase: 'prevent',
    ar: 'تنس طاولة — وقاية من الإصابات (كتف ورسغ وأسفل الظهر)',
    en: 'Table tennis — Injury prevention (shoulder, wrist, lower back)',
    note: {
      ar: 'تقوية الكتف والساعد وثبات أسفل الظهر والركبة، لأن الوقفة الواطية والضربات المتكررة بتحمّل عليهم. حركة بطيئة من غير ألم، ووقف لو في تنميل في الإيد.',
      en: 'Strengthens the shoulder, forearm, lower back and knee, which take load from the low stance and repeated strokes. Slow, pain-free reps; stop if there is numbness in the hand.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' },
        { libId: 'wg_cat_cow_stretch', en: 'Cat-Cow Stretch', sets: 1, reps: '8' }
      ],
      main: [
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 3, reps: '12/side', rest: '45s', rpe: '6' },
        { libId: 'wg_prone_t_raise', en: 'Prone T Raise', sets: 3, reps: '10', rest: '45s', rpe: '6' },
        { libId: 'ad_eccentric_wrist_extension', en: 'Eccentric Wrist Extension', sets: 3, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ex_bird_dog', en: 'Bird Dog', sets: 3, reps: '8/side', rest: '45s', rpe: '5' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 2, reps: '30s/side', rest: '45s', rpe: '6' },
        { libId: 'wg_step_down', en: 'Step-Down', sets: 2, reps: '8/side', rest: '60s', rpe: '6' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ad_supine_spinal_twist', en: 'Supine Spinal Twist', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_squash_off',
    sport: 'squash',
    group: 'racket',
    phase: 'off',
    ar: 'اسكواش — خارج الموسم (قوة وقاعدة هوائية)',
    en: 'Squash — Off-season (strength & aerobic base)',
    note: {
      ar: 'قوة للاندفاع العميق والسمانة، مع قاعدة هوائية قوية لأن الاسكواش من أعلى الرياضات في الطلب الهوائي. الركبة الأمامية ما تعديش الصباع كتير في الاندفاع.',
      en: 'Strength for deep lunging and the calves, plus a big aerobic base because squash is among the most aerobically demanding racket sports. Keep the front knee from drifting far past the toes when lunging.'
    },
    sections: {
      warmup: [
        { libId: 'ad_walking_lunge_with_twist', en: 'Walking Lunge with Twist', sets: 1, reps: '20m' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_walking_lunge', en: 'Walking Lunge', sets: 3, reps: '10/side', rest: '90s', rpe: '7' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 3, reps: '6-8', rest: '90s', rpe: '8' },
        { libId: 'wg_single_leg_calf_raise', en: 'Single-Leg Calf Raise', sets: 3, reps: '12/side', rest: '60s', rpe: '8' }
      ],
      cardio: [
        { libId: 'ad_steady_state_row', en: 'Steady-State Row', sets: 1, reps: '30min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_squash_pre',
    sport: 'squash',
    group: 'racket',
    phase: 'pre',
    ar: 'اسكواش — قبل الموسم (انفجار ولياقة رالي)',
    en: 'Squash — Pre-season (power & rally conditioning)',
    note: {
      ar: 'قوة انفجارية للاندفاع والدوران، مع لياقة حركة في أركان الملعب بنفس طول الرالي. خد راحة كاملة بين مجموعات الكلين عشان التكنيك يفضل نضيف.',
      en: 'Power for lunging and rotation, with court-corner movement conditioning matched to rally length. Take full rest between clean sets so technique stays sharp.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 1, reps: '20m' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '15' }
      ],
      main: [
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 4, reps: '3', rest: '150s', rpe: '7' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 3, reps: '6/side', rest: '90s', rpe: '7' },
        { libId: 'ad_split_step_to_lunge_reaction', en: 'Split-Step to Lunge Reaction', sets: 4, reps: '6', rest: '60s', rpe: '8' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '5/side', rest: '120s', rpe: '8' }
      ],
      cardio: [
        { libId: 'dr_cone_box', en: 'Box Drill (4 cones)', sets: 8, reps: '20s', rest: '20s', rpe: '8' }
      ],
      mobility: [
        { libId: 'ad_knee_to_wall_ankle_mobilization', en: 'Knee-to-Wall Ankle Mobilization', sets: 2, reps: '10/side' }
      ],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_squash_in',
    sport: 'squash',
    group: 'racket',
    phase: 'in',
    ar: 'اسكواش — أثناء الموسم (صيانة قصيرة)',
    en: 'Squash — In-season (short maintenance)',
    note: {
      ar: 'صيانة قصيرة للرجلين والسمانة والكتف بين الماتشات، مع عجلة خفيفة للاستشفاء. ما تزودش حجم الرجلين قبل بطولة.',
      en: 'Short maintenance for legs, calves and shoulder between matches, plus an easy bike flush. Do not add leg volume before a tournament.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '15' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '6', rest: '90s', rpe: '6' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 2, reps: '6/side', rest: '60s', rpe: '6' },
        { libId: 'wg_single_leg_calf_raise', en: 'Single-Leg Calf Raise', sets: 2, reps: '10/side', rest: '60s', rpe: '7' },
        { libId: 'ex_band_external_rotation', en: 'Band External Rotation', sets: 2, reps: '15', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_steady_state_bike_ride', en: 'Steady-State Bike Ride', sets: 1, reps: '10min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_squash_prevent',
    sport: 'squash',
    group: 'racket',
    phase: 'prevent',
    ar: 'اسكواش — وقاية من الإصابات (وتر أكيلس وركبة وظهر)',
    en: 'Squash — Injury prevention (Achilles, knee, back)',
    note: {
      ar: 'تحميل تدريجي لوتر أكيلس والسمانة، أيزومتري لوتر الرضفة، وثبات للظهر والكتف والساعد. أي ألم في الوتر بيزيد تاني يوم معناه قلّل الحمل.',
      en: 'Progressive loading for the Achilles and calf, patellar-tendon isometrics, and back, shoulder and forearm stability. Tendon pain that is worse the next morning means reduce the load.'
    },
    sections: {
      warmup: [
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' }
      ],
      main: [
        { libId: 'ad_eccentric_heel_drop', en: 'Eccentric Heel Drop', sets: 3, reps: '12/side', rest: '60s', rpe: '6' },
        { libId: 'ad_bent_knee_soleus_raise', en: 'Bent-Knee Soleus Raise', sets: 3, reps: '15/side', rest: '45s', rpe: '7' },
        { libId: 'ad_spanish_squat', en: 'Spanish Squat', sets: 3, reps: '30s', rest: '60s', rpe: '6' },
        { libId: 'ex_bird_dog', en: 'Bird Dog', sets: 2, reps: '8/side', rest: '45s', rpe: '5' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 2, reps: '12/side', rest: '45s', rpe: '6' },
        { libId: 'ad_eccentric_wrist_extension', en: 'Eccentric Wrist Extension', sets: 2, reps: '15', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ad_bent_knee_soleus_stretch', en: 'Bent-Knee Soleus Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_badminton_off',
    sport: 'badminton',
    group: 'racket',
    phase: 'off',
    ar: 'ريشة طائرة — خارج الموسم (قوة وقاعدة هوائية)',
    en: 'Badminton — Off-season (strength & aerobic base)',
    note: {
      ar: 'قوة للرجلين والاندفاع وتقوية الظهر والكتف للضربة الساحقة، مع قاعدة هوائية. كمّل كل مجموعة بتحكم في النزول، مش بسرعة.',
      en: 'Leg and lunge strength with back and shoulder work for the smash, plus an aerobic base. Control the lowering phase of every rep rather than rushing.'
    },
    sections: {
      warmup: [
        { libId: 'ex_jump_rope', en: 'Jump Rope', sets: 2, reps: '60s' },
        { libId: 'ad_cross_body_arm_swings', en: 'Cross-Body Arm Swings', sets: 1, reps: '15' }
      ],
      main: [
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_reverse_lunge', en: 'Reverse Lunge', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_lat_pulldown', en: 'Lat Pulldown', sets: 3, reps: '10', rest: '90s', rpe: '7' },
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 3, reps: '15', rest: '60s', rpe: '7' }
      ],
      cardio: [
        { libId: 'ad_zone_2_easy_run', en: 'Zone 2 Easy Run', sets: 1, reps: '25min' }
      ],
      mobility: [
        { libId: 'ad_shoulder_cars', en: 'Shoulder CARs', sets: 1, reps: '5/side' }
      ],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_badminton_pre',
    sport: 'badminton',
    group: 'racket',
    phase: 'pre',
    ar: 'ريشة طائرة — قبل الموسم (نط وسرعة ورد فعل)',
    en: 'Badminton — Pre-season (jump, speed & reaction)',
    note: {
      ar: 'نط للضربة الساحقة، سبليت ستيب واندفاع سريع، ولياقة رد فعل متقطعة. اهبط بهدوء من النط، والسمانة والكاحل لازم يكونوا مسخنين كويس.',
      en: 'Jump power for the smash, fast split-step and lunge, and intermittent reaction conditioning. Land softly from jumps, and make sure calves and ankles are fully warmed up.'
    },
    sections: {
      warmup: [
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 2, reps: '15' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '15' }
      ],
      main: [
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 4, reps: '4', rest: '90s', rpe: '7' },
        { libId: 'ad_split_step_to_lunge_reaction', en: 'Split-Step to Lunge Reaction', sets: 4, reps: '6', rest: '60s', rpe: '8' },
        { libId: 'ad_lateral_bound_and_stick', en: 'Lateral Bound and Stick', sets: 3, reps: '5/side', rest: '90s', rpe: '7' },
        { libId: 'ad_medicine_ball_soccer_throw', en: 'Medicine Ball Soccer Throw', sets: 3, reps: '6', rest: '90s', rpe: '7' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '5/side', rest: '120s', rpe: '8' }
      ],
      cardio: [
        { libId: 'dr_discs_react', en: 'Coloured Disc Reaction Drill', sets: 8, reps: '15s', rest: '20s', rpe: '8' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_badminton_in',
    sport: 'badminton',
    group: 'racket',
    phase: 'in',
    ar: 'ريشة طائرة — أثناء الموسم (صيانة قصيرة)',
    en: 'Badminton — In-season (short maintenance)',
    note: {
      ar: 'صيانة قصيرة للرجلين والسمانة والكتف والنط بين البطولات. حجم نط قليل جدًا لأن الملعب فيه نط كفاية.',
      en: 'Short maintenance for legs, calves, shoulder and jump ability between tournaments. Keep jump volume very low since court play supplies plenty.'
    },
    sections: {
      warmup: [
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 1, reps: '10' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '15' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '6', rest: '90s', rpe: '6' },
        { libId: 'wg_single_leg_calf_raise', en: 'Single-Leg Calf Raise', sets: 2, reps: '10/side', rest: '60s', rpe: '7' },
        { libId: 'ex_band_external_rotation', en: 'Band External Rotation', sets: 2, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 2, reps: '3', rest: '60s', rpe: '6' }
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
    id: 'tpl_s_badminton_prevent',
    sport: 'badminton',
    group: 'racket',
    phase: 'prevent',
    ar: 'ريشة طائرة — وقاية من الإصابات (أكيلس وكاحل وكتف)',
    en: 'Badminton — Injury prevention (Achilles, ankle, shoulder)',
    note: {
      ar: 'تقوية وتر أكيلس والكاحل للاندفاع والنط، وتقوية الكفة المدوّرة للضربات فوق الراس. أوزان خفيفة وتحكم كامل في الهبوط.',
      en: 'Strengthens the Achilles and ankle for lunging and jumping, and the rotator cuff for overhead shots. Light loads and full control on every landing.'
    },
    sections: {
      warmup: [
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' }
      ],
      main: [
        { libId: 'ad_eccentric_heel_drop', en: 'Eccentric Heel Drop', sets: 3, reps: '12/side', rest: '60s', rpe: '6' },
        { libId: 'ad_banded_ankle_eversion', en: 'Banded Ankle Eversion', sets: 2, reps: '15/side', rest: '45s', rpe: '6' },
        { libId: 'ad_single_leg_forward_hop_and_stick', en: 'Single-Leg Forward Hop and Stick', sets: 3, reps: '4/side', rest: '60s', rpe: '6' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 3, reps: '12/side', rest: '45s', rpe: '6' },
        { libId: 'wg_prone_y_raise', en: 'Prone Y Raise', sets: 2, reps: '10', rest: '45s', rpe: '6' },
        { libId: 'ad_spanish_squat', en: 'Spanish Squat', sets: 2, reps: '30s', rest: '60s', rpe: '6' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ad_sleeper_stretch', en: 'Sleeper Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_padel_off',
    sport: 'padel',
    group: 'racket',
    phase: 'off',
    ar: 'بادل — خارج الموسم (قوة وقاعدة هوائية)',
    en: 'Padel — Off-season (strength & aerobic base)',
    note: {
      ar: 'قوة عامة للرجلين في الاتجاهات كلها وثبات للجذع وقوة ظهر، مع قاعدة هوائية على العجلة. البادل فيه وقفة واطية كتير، فخلي الضهر محايد.',
      en: 'General multi-directional leg strength, trunk stability and back strength, with an aerobic base on the bike. Padel involves a lot of low stance, so keep the spine neutral.'
    },
    sections: {
      warmup: [
        { libId: 'ad_carioca', en: 'Carioca', sets: 1, reps: '20m' },
        { libId: 'ad_cross_body_arm_swings', en: 'Cross-Body Arm Swings', sets: 1, reps: '15' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 4, reps: '5', rest: '150s', rpe: '7' },
        { libId: 'ex_lateral_lunge', en: 'Lateral Lunge', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_step_up', en: 'Step-Up', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_seated_cable_row', en: 'Seated Cable Row', sets: 3, reps: '10', rest: '90s', rpe: '7' },
        { libId: 'wg_half_kneeling_pallof_press', en: 'Half-Kneeling Pallof Press', sets: 3, reps: '10/side', rest: '60s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_steady_state_bike_ride', en: 'Steady-State Bike Ride', sets: 1, reps: '30min' }
      ],
      mobility: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 2, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_padel_pre',
    sport: 'padel',
    group: 'racket',
    phase: 'pre',
    ar: 'بادل — قبل الموسم (دوران وحركة جانبية)',
    en: 'Padel — Pre-season (rotation & lateral movement)',
    note: {
      ar: 'قوة دوران للضربات والسماش، خطوة جانبية سريعة، ولياقة تغيير اتجاه قصيرة. في الرميات الدوران يبدأ من الرجلين والوسط والدراع آخر حاجة.',
      en: 'Rotational power for groundstrokes and smashes, quick lateral steps, and short change-of-direction conditioning. In throws, rotation starts from the legs and hips, with the arm last.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '15' },
        { libId: 'wg_lateral_shuffle', en: 'Lateral Shuffle', sets: 2, reps: '20s' }
      ],
      main: [
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 4, reps: '6/side', rest: '90s', rpe: '7' },
        { libId: 'ad_medicine_ball_soccer_throw', en: 'Medicine Ball Soccer Throw', sets: 3, reps: '6', rest: '90s', rpe: '7' },
        { libId: 'ad_split_step_to_lunge_reaction', en: 'Split-Step to Lunge Reaction', sets: 4, reps: '6', rest: '60s', rpe: '7' },
        { libId: 'ad_lateral_bound_and_stick', en: 'Lateral Bound and Stick', sets: 3, reps: '5/side', rest: '90s', rpe: '7' },
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 3, reps: '4', rest: '150s', rpe: '8' }
      ],
      cardio: [
        { libId: 'dr_cone_5_10_5', en: '5-10-5 Pro Agility (cones)', sets: 8, reps: '1', rest: '40s', rpe: '8' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_padel_in',
    sport: 'padel',
    group: 'racket',
    phase: 'in',
    ar: 'بادل — أثناء الموسم (صيانة قصيرة)',
    en: 'Padel — In-season (short maintenance)',
    note: {
      ar: 'صيانة قصيرة للرجلين والكتف والساعد والسمانة بين الماتشات. خليها في يوم مافيهوش لعب، وحجمها صغير.',
      en: 'Short maintenance for legs, shoulder, forearm and calves between matches. Do it on a non-playing day and keep the volume small.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '15' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '6', rest: '90s', rpe: '6' },
        { libId: 'ex_band_external_rotation', en: 'Band External Rotation', sets: 2, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ad_eccentric_wrist_extension', en: 'Eccentric Wrist Extension', sets: 2, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'wg_single_leg_calf_raise', en: 'Single-Leg Calf Raise', sets: 2, reps: '10/side', rest: '60s', rpe: '7' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 1, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_padel_prevent',
    sport: 'padel',
    group: 'racket',
    phase: 'prevent',
    ar: 'بادل — وقاية من الإصابات (كوع وكتف وسمانة)',
    en: 'Padel — Injury prevention (elbow, shoulder, calf)',
    note: {
      ar: 'تمارين لامركزية وأيزومتري لعضلات الساعد اللي بتتعب في الكوع، تقوية الكتف، وتحميل للسمانة ووتر أكيلس. أوزان خفيفة، والألم المستمر في الكوع محتاج تقييم.',
      en: 'Eccentric and isometric forearm work for the muscles that get irritated at the elbow, shoulder strengthening, and calf and Achilles loading. Light loads; persistent elbow pain needs assessment.'
    },
    sections: {
      warmup: [
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' },
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ad_eccentric_wrist_extension', en: 'Eccentric Wrist Extension', sets: 3, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ad_isometric_wrist_extension', en: 'Isometric Wrist Extension', sets: 3, reps: '30s', rest: '45s', rpe: '6' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 3, reps: '12/side', rest: '45s', rpe: '6' },
        { libId: 'ad_serratus_wall_slide', en: 'Serratus Wall Slide', sets: 2, reps: '10', rest: '45s', rpe: '5' },
        { libId: 'ad_eccentric_heel_drop', en: 'Eccentric Heel Drop', sets: 3, reps: '12/side', rest: '60s', rpe: '6' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 2, reps: '30s/side', rest: '30s', rpe: '5' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_boxing_off',
    sport: 'boxing',
    group: 'combat',
    phase: 'off',
    ar: 'ملاكمة — خارج الموسم (قوة وقاعدة هوائية)',
    en: 'Boxing — Off-season (strength & aerobic base)',
    note: {
      ar: 'بناء قوة عامة وتقوية الرقبة، مع جري هوائي طويل كأساس لتحمل الجولات. شغل الرقبة بمقاومة خفيفة ومن غير حركات مفاجئة.',
      en: 'Build general strength and neck strength, with longer aerobic roadwork as the base for round endurance. Neck work uses light resistance and no sudden movements.'
    },
    sections: {
      warmup: [
        { libId: 'ex_jump_rope', en: 'Jump Rope', sets: 2, reps: '2min' },
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 4, reps: '5', rest: '150s', rpe: '7' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_dumbbell_bench_press', en: 'Dumbbell Bench Press', sets: 3, reps: '8', rest: '90s', rpe: '7' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 3, reps: '6-8', rest: '90s', rpe: '8' },
        { libId: 'ek_static_neck_flexion_and_extension', en: 'Isometric Neck Flexion and Extension', sets: 3, reps: '20s', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_zone_2_easy_run', en: 'Zone 2 Easy Run', sets: 1, reps: '35min' }
      ],
      mobility: [
        { libId: 'ad_thread_the_needle', en: 'Thread the Needle', sets: 2, reps: '6/side' }
      ],
      flexibility: [
        { libId: 'wg_doorway_chest_stretch', en: 'Doorway Chest Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_s_boxing_pre',
    sport: 'boxing',
    group: 'combat',
    phase: 'pre',
    ar: 'ملاكمة — قبل النزال (قوة لكمة ولياقة جولات)',
    en: 'Boxing — Fight camp (punch power & round conditioning)',
    note: {
      ar: 'قوة انفجارية للكمة من الرجلين والدوران، مع لياقة جولات بنفس زمن الجولة والراحة. الرمي بسرعة قصوى ووزن خفيف، ووقف المجموعة لو السرعة قلّت.',
      en: 'Punch power driven from the legs and rotation, with round conditioning matched to round and rest times. Throw at max speed with a light ball and end the set when speed drops.'
    },
    sections: {
      warmup: [
        { libId: 'ad_shadow_boxing', en: 'Shadow Boxing', sets: 2, reps: '2min' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '15' }
      ],
      main: [
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 4, reps: '5/side', rest: '90s', rpe: '7' },
        { libId: 'ad_medicine_ball_chest_pass', en: 'Medicine Ball Chest Pass', sets: 4, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'ad_trap_bar_jump', en: 'Trap Bar Jump', sets: 4, reps: '4', rest: '120s', rpe: '7' },
        { libId: 'wg_landmine_press', en: 'Landmine Press', sets: 3, reps: '6/side', rest: '90s', rpe: '8' },
        { libId: 'ek_static_neck_side_flexion', en: 'Isometric Neck Side Flexion', sets: 3, reps: '20s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_shadow_boxing_rounds', en: 'Shadow Boxing Rounds', sets: 4, reps: '3min', rest: '60s', rpe: '8' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_neck_stretch', en: 'Neck Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_boxing_in',
    sport: 'boxing',
    group: 'combat',
    phase: 'in',
    ar: 'ملاكمة — فترة المنافسات (صيانة قصيرة)',
    en: 'Boxing — Competition phase (short maintenance)',
    note: {
      ar: 'صيانة قصيرة للقوة والرقبة والسرعة بين النزالات أو بعد يومين من السبارينج التقيل. حجم قليل، والهدف تحافظ مش تبني.',
      en: 'Short maintenance of strength, neck and speed between bouts or 1–2 days after hard sparring. Low volume; the goal is to maintain, not build.'
    },
    sections: {
      warmup: [
        { libId: 'ex_jump_rope', en: 'Jump Rope', sets: 1, reps: '3min' },
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '3', rest: '120s', rpe: '6' },
        { libId: 'ad_medicine_ball_chest_pass', en: 'Medicine Ball Chest Pass', sets: 3, reps: '4', rest: '60s', rpe: '6' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 2, reps: '5', rest: '90s', rpe: '6' },
        { libId: 'ek_static_neck_flexion_and_extension', en: 'Isometric Neck Flexion and Extension', sets: 2, reps: '15s', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 1, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_neck_stretch', en: 'Neck Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_boxing_prevent',
    sport: 'boxing',
    group: 'combat',
    phase: 'prevent',
    ar: 'ملاكمة — وقاية من الإصابات (رقبة وكتف ورسغ)',
    en: 'Boxing — Injury prevention (neck, shoulder, wrist)',
    note: {
      ar: 'تقوية الرقبة العميقة والكتف والرسغ والقبضة، مع جولات ظل خفيفة للياقة. شغل الرقبة من غير ألم، وأي أعراض ارتجاج بعد السبارينج تستدعي تقييم طبي.',
      en: 'Deep neck, shoulder, wrist and grip strengthening, with easy shadow rounds for conditioning. Keep neck work pain-free; any concussion symptoms after sparring need medical assessment.'
    },
    sections: {
      warmup: [
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5/side' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' }
      ],
      main: [
        { libId: 'ad_deep_neck_flexor_head_lift', en: 'Deep Neck Flexor Head Lift', sets: 3, reps: '10', rest: '45s', rpe: '5' },
        { libId: 'ad_cervical_rotation_isometric', en: 'Cervical Rotation Isometric', sets: 2, reps: '10s/side', rest: '30s', rpe: '5' },
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 3, reps: '15', rest: '60s', rpe: '6' },
        { libId: 'ad_serratus_wall_slide', en: 'Serratus Wall Slide', sets: 2, reps: '10', rest: '45s', rpe: '5' },
        { libId: 'ad_grip_squeeze', en: 'Grip Squeeze', sets: 3, reps: '20', rest: '30s', rpe: '6' },
        { libId: 'ad_isometric_wrist_extension', en: 'Isometric Wrist Extension', sets: 2, reps: '30s', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_shadow_boxing_rounds', en: 'Shadow Boxing Rounds', sets: 3, reps: '2min', rest: '60s', rpe: '6' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_neck_stretch', en: 'Neck Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_kickboxing_off',
    sport: 'kickboxing',
    group: 'combat',
    phase: 'off',
    ar: 'كيك بوكسينج — خارج الموسم (قوة وقاعدة هوائية)',
    en: 'Kickboxing — Off-season (strength & aerobic base)',
    note: {
      ar: 'قوة عامة للرجلين والجزء العلوي وتقوية الضامة للركلات، مع قاعدة هوائية. خلي مرونة الحوض جزء ثابت من كل جلسة.',
      en: 'General lower- and upper-body strength plus groin strength for kicking, with an aerobic base. Make hip mobility a fixed part of every session.'
    },
    sections: {
      warmup: [
        { libId: 'ex_jump_rope', en: 'Jump Rope', sets: 2, reps: '2min' },
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'ex_one_arm_dumbbell_row', en: 'One-Arm Dumbbell Row', sets: 3, reps: '10/side', rest: '90s', rpe: '7' },
        { libId: 'wg_standing_dumbbell_press', en: 'Standing Dumbbell Press', sets: 3, reps: '8', rest: '90s', rpe: '7' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 3, reps: '20s/side', rest: '60s', rpe: '7' }
      ],
      cardio: [
        { libId: 'ad_zone_2_easy_run', en: 'Zone 2 Easy Run', sets: 1, reps: '30min' }
      ],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 2, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ad_pigeon_stretch', en: 'Pigeon Stretch', sets: 2, reps: '45s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_kickboxing_pre',
    sport: 'kickboxing',
    group: 'combat',
    phase: 'pre',
    ar: 'كيك بوكسينج — قبل النزال (قوة ركلة ولياقة جولات)',
    en: 'Kickboxing — Fight camp (kick power & round conditioning)',
    note: {
      ar: 'قوة انفجارية وثبات على رجل واحدة للركلات، قوة دوران للكمات، ولياقة جولات متقطعة. اثبت في كل هبوط على رجل واحدة قبل التكرار الجاي.',
      en: 'Explosive power and single-leg stability for kicks, rotational power for punches, and interval round conditioning. Stick each single-leg landing before the next rep.'
    },
    sections: {
      warmup: [
        { libId: 'ad_shadow_boxing', en: 'Shadow Boxing', sets: 2, reps: '2min' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 4, reps: '3', rest: '150s', rpe: '7' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 4, reps: '5/side', rest: '90s', rpe: '7' },
        { libId: 'ad_lateral_bound_and_stick', en: 'Lateral Bound and Stick', sets: 3, reps: '5/side', rest: '90s', rpe: '7' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '5/side', rest: '120s', rpe: '8' },
        { libId: 'wg_hip_airplane', en: 'Hip Airplane', sets: 2, reps: '5/side', rest: '60s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_battle_rope_alternating_waves', en: 'Battle Rope Alternating Waves', sets: 6, reps: '30s', rest: '30s', rpe: '8' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_kickboxing_in',
    sport: 'kickboxing',
    group: 'combat',
    phase: 'in',
    ar: 'كيك بوكسينج — فترة المنافسات (صيانة قصيرة)',
    en: 'Kickboxing — Competition phase (short maintenance)',
    note: {
      ar: 'صيانة قصيرة للقوة والدوران والضامة والرقبة بين النزالات. حجم قليل وشدة متوسطة عشان تفضل فريش للسبارينج.',
      en: 'Short maintenance of strength, rotation, groin and neck between bouts. Low volume at moderate intensity so you stay fresh for sparring.'
    },
    sections: {
      warmup: [
        { libId: 'ex_jump_rope', en: 'Jump Rope', sets: 1, reps: '3min' },
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '3', rest: '120s', rpe: '6' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 3, reps: '4/side', rest: '60s', rpe: '6' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 2, reps: '15s/side', rest: '45s', rpe: '6' },
        { libId: 'ek_static_neck_side_flexion', en: 'Isometric Neck Side Flexion', sets: 2, reps: '15s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 1, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ad_pigeon_stretch', en: 'Pigeon Stretch', sets: 1, reps: '45s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_kickboxing_prevent',
    sport: 'kickboxing',
    group: 'combat',
    phase: 'prevent',
    ar: 'كيك بوكسينج — وقاية من الإصابات (ضامة وقصبة ورقبة وكتف)',
    en: 'Kickboxing — Injury prevention (groin, shin, neck, shoulder)',
    note: {
      ar: 'تقوية الضامة وأبعاد الحوض لحماية الفخذ في الركلات، عضلة القصبة الأمامية، والرقبة والكتف، مع جولات ظل خفيفة. كل الحركات بتحكم ومن غير ألم.',
      en: 'Groin and hip-abductor strength to protect the hip when kicking, tibialis work for the shin, plus neck and shoulder, finished with easy shadow rounds. All reps controlled and pain-free.'
    },
    sections: {
      warmup: [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' },
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 3, reps: '20s/side', rest: '60s', rpe: '7' },
        { libId: 'wg_side_lying_hip_abduction', en: 'Side-Lying Hip Abduction', sets: 2, reps: '15/side', rest: '45s', rpe: '6' },
        { libId: 'ad_tibialis_raise', en: 'Tibialis Raise', sets: 3, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ek_static_neck_flexion_and_extension', en: 'Isometric Neck Flexion and Extension', sets: 3, reps: '15s', rest: '45s', rpe: '6' },
        { libId: 'ek_static_neck_side_flexion', en: 'Isometric Neck Side Flexion', sets: 2, reps: '15s/side', rest: '45s', rpe: '6' },
        { libId: 'ex_band_external_rotation', en: 'Band External Rotation', sets: 2, reps: '15', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_shadow_boxing_rounds', en: 'Shadow Boxing Rounds', sets: 3, reps: '2min', rest: '60s', rpe: '6' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_mma_off',
    sport: 'mma',
    group: 'combat',
    phase: 'off',
    ar: 'MMA — خارج الموسم (قوة وتضخيم وقاعدة هوائية)',
    en: 'MMA — Off-season (strength, size & aerobic base)',
    note: {
      ar: 'بناء قوة قصوى وكتلة عضلية للجرابلينج والضرب، مع تقوية الرقبة وقاعدة هوائية على الرو. التكنيك قبل الوزن، ووقف قبل الفشل العضلي.',
      en: 'Build maximal strength and muscle for grappling and striking, with neck strengthening and an aerobic base on the rower. Technique before load, and stop short of failure.'
    },
    sections: {
      warmup: [
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '6' },
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '5', rest: '180s', rpe: '8' },
        { libId: 'ex_barbell_bench_press', en: 'Barbell Bench Press', sets: 3, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 4, reps: '6', rest: '120s', rpe: '8' },
        { libId: 'ek_static_neck_flexion_and_extension', en: 'Isometric Neck Flexion and Extension', sets: 3, reps: '20s', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_steady_state_row', en: 'Steady-State Row', sets: 1, reps: '30min' }
      ],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 2, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_mma_pre',
    sport: 'mma',
    group: 'combat',
    phase: 'pre',
    ar: 'MMA — قبل النزال (قوة انفجارية ولياقة جولات)',
    en: 'MMA — Fight camp (power & round conditioning)',
    note: {
      ar: 'قوة انفجارية للضرب والإسقاط، قوة حمل وقبضة للكلينش، ولياقة بنفس زمن الجولة 5 دقايق. خلي شغل البار قبل السبارينج بفترة كافية أو في يوم منفصل.',
      en: 'Power for strikes and takedowns, carrying and grip strength for the clinch, and conditioning matched to 5-minute rounds. Keep barbell work well away from sparring or on a separate day.'
    },
    sections: {
      warmup: [
        { libId: 'ad_shadow_boxing', en: 'Shadow Boxing', sets: 2, reps: '2min' },
        { libId: 'wg_bear_crawl', en: 'Bear Crawl', sets: 2, reps: '10m' }
      ],
      main: [
        { libId: 'ad_power_clean', en: 'Power Clean', sets: 4, reps: '3', rest: '180s', rpe: '8' },
        { libId: 'ad_trap_bar_deadlift_to_broad_jump_contrast', en: 'Trap Bar Deadlift to Broad Jump Contrast', sets: 3, reps: '3+3', rest: '180s', rpe: '8' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 3, reps: '5/side', rest: '90s', rpe: '7' },
        { libId: 'ad_sandbag_bear_hug_carry', en: 'Sandbag Bear-Hug Carry', sets: 4, reps: '30m', rest: '90s', rpe: '8' },
        { libId: 'ek_static_neck_side_flexion', en: 'Isometric Neck Side Flexion', sets: 3, reps: '20s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_bodyweight_emom_circuit', en: 'Bodyweight EMOM Circuit', sets: 3, reps: '5min', rest: '60s', rpe: '8' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_neck_stretch', en: 'Neck Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_mma_in',
    sport: 'mma',
    group: 'combat',
    phase: 'in',
    ar: 'MMA — فترة المنافسات (صيانة قصيرة)',
    en: 'MMA — Competition phase (short maintenance)',
    note: {
      ar: 'صيانة قصيرة للقوة والسحب والرقبة بين النزالات أو بعد يومين من السبارينج. حجم قليل جدًا والهدف تفضل فريش.',
      en: 'Short maintenance of strength, pulling and neck between fights or 1–2 days after sparring. Very low volume; the goal is to stay fresh.'
    },
    sections: {
      warmup: [
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5/side' },
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 1, reps: '4/side' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '3', rest: '120s', rpe: '6' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 2, reps: '5', rest: '90s', rpe: '6' },
        { libId: 'ad_medicine_ball_chest_pass', en: 'Medicine Ball Chest Pass', sets: 3, reps: '4', rest: '60s', rpe: '6' },
        { libId: 'ek_static_neck_flexion_and_extension', en: 'Isometric Neck Flexion and Extension', sets: 2, reps: '15s', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_thread_the_needle', en: 'Thread the Needle', sets: 1, reps: '6/side' }
      ],
      flexibility: [
        { libId: 'ad_pigeon_stretch', en: 'Pigeon Stretch', sets: 1, reps: '45s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_mma_prevent',
    sport: 'mma',
    group: 'combat',
    phase: 'prevent',
    ar: 'MMA — وقاية من الإصابات (رقبة وكتف وحوض وظهر)',
    en: 'MMA — Injury prevention (neck, shoulder, hip, back)',
    note: {
      ar: 'تقوية الرقبة والكتف والضامة وثبات الحوض وأسفل الظهر، مع جولات ظل خفيفة للياقة. شغل الرقبة من غير ألم، وأي أعراض ارتجاج تستدعي تقييم طبي.',
      en: 'Neck, shoulder, groin, hip and lower-back strengthening, with easy shadow rounds for conditioning. Keep neck work pain-free; any concussion symptoms need medical assessment.'
    },
    sections: {
      warmup: [
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5/side' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' }
      ],
      main: [
        { libId: 'ad_deep_neck_flexor_head_lift', en: 'Deep Neck Flexor Head Lift', sets: 3, reps: '10', rest: '45s', rpe: '5' },
        { libId: 'ek_static_neck_side_flexion', en: 'Isometric Neck Side Flexion', sets: 3, reps: '15s/side', rest: '45s', rpe: '6' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 2, reps: '12/side', rest: '45s', rpe: '6' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 2, reps: '20s/side', rest: '60s', rpe: '6' },
        { libId: 'wg_hip_airplane', en: 'Hip Airplane', sets: 2, reps: '5/side', rest: '60s', rpe: '6' },
        { libId: 'ex_bird_dog', en: 'Bird Dog', sets: 2, reps: '8/side', rest: '45s', rpe: '5' }
      ],
      cardio: [
        { libId: 'ad_shadow_boxing_rounds', en: 'Shadow Boxing Rounds', sets: 3, reps: '3min', rest: '60s', rpe: '6' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ad_pigeon_stretch', en: 'Pigeon Stretch', sets: 2, reps: '45s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_judo_off',
    sport: 'judo',
    group: 'combat',
    phase: 'off',
    ar: 'جودو — خارج الموسم (قوة وقبضة وقاعدة هوائية)',
    en: 'Judo — Off-season (strength, grip & aerobic base)',
    note: {
      ar: 'بناء قوة قصوى للرفع والسحب مع قبضة قوية للجي، وقاعدة هوائية على الرو. في الديدلفت الضهر محايد والبار قريب من الجسم.',
      en: 'Build maximal lifting and pulling strength with a strong gi grip, plus an aerobic base on the rower. On deadlifts keep a neutral back and the bar close.'
    },
    sections: {
      warmup: [
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '6' },
        { libId: 'ad_shoulder_cars', en: 'Shoulder CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_deadlift', en: 'Deadlift', sets: 4, reps: '5', rest: '180s', rpe: '8' },
        { libId: 'wg_towel_pull_up', en: 'Towel Pull-up', sets: 3, reps: '5', rest: '120s', rpe: '8' },
        { libId: 'ex_bent_over_row', en: 'Bent Over Barbell Row', sets: 3, reps: '8', rest: '90s', rpe: '7' },
        { libId: 'ex_farmers_carry', en: 'Farmer\'s Carry', sets: 3, reps: '30m', rest: '90s', rpe: '7' }
      ],
      cardio: [
        { libId: 'ad_steady_state_row', en: 'Steady-State Row', sets: 1, reps: '30min' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_judo_pre',
    sport: 'judo',
    group: 'combat',
    phase: 'pre',
    ar: 'جودو — قبل البطولة (قوة رمي ولياقة نزال)',
    en: 'Judo — Pre-competition (throwing power & match conditioning)',
    note: {
      ar: 'قوة انفجارية لمد الحوض والدوران في الرميات، سحب بالقبضة، ولياقة متقطعة بنفس إيقاع النزال. رمي الكرة الطبية لورا في مساحة فاضية وأمان كامل.',
      en: 'Explosive hip extension and rotation for throws, grip-based pulling, and interval conditioning matched to match rhythm. Do backward medicine-ball throws in a clear, safe space.'
    },
    sections: {
      warmup: [
        { libId: 'wg_bear_crawl', en: 'Bear Crawl', sets: 2, reps: '10m' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 1, reps: '15' }
      ],
      main: [
        { libId: 'ad_power_clean', en: 'Power Clean', sets: 4, reps: '3', rest: '180s', rpe: '8' },
        { libId: 'ad_medicine_ball_overhead_backward_throw', en: 'Medicine Ball Overhead Backward Throw', sets: 4, reps: '4', rest: '90s', rpe: '7' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 3, reps: '5/side', rest: '90s', rpe: '7' },
        { libId: 'wg_towel_pull_up', en: 'Towel Pull-up', sets: 3, reps: '5', rest: '120s', rpe: '8' },
        { libId: 'ad_sandbag_bear_hug_carry', en: 'Sandbag Bear-Hug Carry', sets: 3, reps: '30m', rest: '90s', rpe: '8' }
      ],
      cardio: [
        { libId: 'ad_rowing_sprints', en: 'Rowing Sprints', sets: 6, reps: '30s', rest: '30s', rpe: '9' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_judo_in',
    sport: 'judo',
    group: 'combat',
    phase: 'in',
    ar: 'جودو — فترة البطولات (صيانة قصيرة)',
    en: 'Judo — Competition phase (short maintenance)',
    note: {
      ar: 'صيانة قصيرة للقوة والقبضة والرقبة بين البطولات. حجم قليل عشان ما تأثرش على الرندوري.',
      en: 'Short maintenance of strength, grip and neck between competitions. Low volume so it does not affect randori.'
    },
    sections: {
      warmup: [
        { libId: 'ad_shoulder_cars', en: 'Shoulder CARs', sets: 1, reps: '5/side' },
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 1, reps: '4/side' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '3', rest: '120s', rpe: '6' },
        { libId: 'wg_towel_pull_up', en: 'Towel Pull-up', sets: 2, reps: '4', rest: '90s', rpe: '7' },
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 2, reps: '6', rest: '90s', rpe: '6' },
        { libId: 'ek_static_neck_flexion_and_extension', en: 'Isometric Neck Flexion and Extension', sets: 2, reps: '15s', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 1, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_judo_prevent',
    sport: 'judo',
    group: 'combat',
    phase: 'prevent',
    ar: 'جودو — وقاية من الإصابات (رقبة وكتف وركبة)',
    en: 'Judo — Injury prevention (neck, shoulder, knee)',
    note: {
      ar: 'تقوية الرقبة لتحمل السقطات، الكتف ولوحه، والتحكم في الركبة، مع جولات لياقة خفيفة. اتعلم السقوط الصح (أوكيمي) قبل أي شغل رمي كتير.',
      en: 'Neck strengthening for breakfalls, shoulder and scapular work, and knee control, with easy conditioning rounds. Master correct breakfalls (ukemi) before any high-volume throwing.'
    },
    sections: {
      warmup: [
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5/side' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' }
      ],
      main: [
        { libId: 'ek_static_neck_flexion_and_extension', en: 'Isometric Neck Flexion and Extension', sets: 3, reps: '15s', rest: '45s', rpe: '6' },
        { libId: 'ek_static_neck_side_flexion', en: 'Isometric Neck Side Flexion', sets: 2, reps: '15s/side', rest: '45s', rpe: '6' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 3, reps: '12/side', rest: '45s', rpe: '6' },
        { libId: 'ad_serratus_wall_slide', en: 'Serratus Wall Slide', sets: 2, reps: '10', rest: '45s', rpe: '5' },
        { libId: 'wg_step_down', en: 'Step-Down', sets: 2, reps: '8/side', rest: '60s', rpe: '6' },
        { libId: 'wg_dead_hang', en: 'Dead Hang', sets: 3, reps: '30s', rest: '60s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_bodyweight_emom_circuit', en: 'Bodyweight EMOM Circuit', sets: 2, reps: '4min', rest: '90s', rpe: '6' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_karate_off',
    sport: 'karate',
    group: 'combat',
    phase: 'off',
    ar: 'كاراتيه — خارج الموسم (قوة وقاعدة هوائية)',
    en: 'Karate — Off-season (strength & aerobic base)',
    note: {
      ar: 'قوة عامة للرجلين والجزء العلوي، مع مرونة وقوة في مدى حركة الحوض للوقفات والركلات. الكوساك سكوات بعمق مريح بس، من غير ما تجبر المفصل.',
      en: 'General lower- and upper-body strength with hip strength through range for stances and kicks. Take Cossack squats only to a comfortable depth without forcing the joint.'
    },
    sections: {
      warmup: [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_dumbbell_bench_press', en: 'Dumbbell Bench Press', sets: 3, reps: '8', rest: '90s', rpe: '7' },
        { libId: 'ex_one_arm_dumbbell_row', en: 'One-Arm Dumbbell Row', sets: 3, reps: '10/side', rest: '90s', rpe: '7' },
        { libId: 'wg_cossack_squat', en: 'Cossack Squat', sets: 3, reps: '6/side', rest: '60s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_zone_2_easy_run', en: 'Zone 2 Easy Run', sets: 1, reps: '30min' }
      ],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 2, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_karate_pre',
    sport: 'karate',
    group: 'combat',
    phase: 'pre',
    ar: 'كاراتيه — قبل البطولة (سرعة وانفجار)',
    en: 'Karate — Pre-competition (speed & explosiveness)',
    note: {
      ar: 'سرعة الدخول والانفجار في اللكمة والركلة، مع لياقة عالية الشدة قصيرة زي الكوميتيه. كل تكرار بأقصى سرعة، ووقف لما السرعة تقل.',
      en: 'Explosive entry speed for punches and kicks, with short high-intensity conditioning like kumite. Every rep at max speed; stop when speed drops.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ad_lateral_bound_and_stick', en: 'Lateral Bound and Stick', sets: 3, reps: '5/side', rest: '90s', rpe: '7' },
        { libId: 'ad_medicine_ball_chest_pass', en: 'Medicine Ball Chest Pass', sets: 4, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 3, reps: '5/side', rest: '90s', rpe: '7' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '5/side', rest: '120s', rpe: '8' },
        { libId: 'ad_reaction_start_sprint', en: 'Reaction Start Sprint', sets: 6, reps: '5m', rest: '60s', rpe: '8' }
      ],
      cardio: [
        { libId: 'dr_tabata', en: 'Tabata (20/10 × 8)', sets: 2, reps: '4min', rest: '2min', rpe: '9' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_karate_in',
    sport: 'karate',
    group: 'combat',
    phase: 'in',
    ar: 'كاراتيه — فترة البطولات (صيانة قصيرة)',
    en: 'Karate — Competition phase (short maintenance)',
    note: {
      ar: 'صيانة قصيرة للقوة والنط والضامة بين البطولات. حجم قليل عشان تفضل سريع وفريش.',
      en: 'Short maintenance of strength, jump ability and groin between competitions. Low volume so you stay fast and fresh.'
    },
    sections: {
      warmup: [
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' },
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '6', rest: '90s', rpe: '6' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 2, reps: '6/side', rest: '60s', rpe: '6' },
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 3, reps: '3', rest: '60s', rpe: '6' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 2, reps: '15s/side', rest: '45s', rpe: '6' }
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
    id: 'tpl_s_karate_prevent',
    sport: 'karate',
    group: 'combat',
    phase: 'prevent',
    ar: 'كاراتيه — وقاية من الإصابات (ضامة وعضلة خلفية وكاحل)',
    en: 'Karate — Injury prevention (groin, hamstring, ankle)',
    note: {
      ar: 'تقوية الضامة والعضلة الخلفية وثبات الحوض والكاحل لحماية الركلات العالية والوقفات، مع جولات ظل خفيفة. ما تعملش ركلات عالية من غير إحماء كامل.',
      en: 'Groin, hamstring, hip and ankle stability to protect high kicks and stances, finished with easy shadow rounds. Never throw high kicks without a full warm-up.'
    },
    sections: {
      warmup: [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' },
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 3, reps: '20s/side', rest: '60s', rpe: '7' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 3, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'wg_hip_airplane', en: 'Hip Airplane', sets: 2, reps: '5/side', rest: '60s', rpe: '6' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 3, reps: '30s/side', rest: '30s', rpe: '5' },
        { libId: 'wg_side_lying_hip_abduction', en: 'Side-Lying Hip Abduction', sets: 2, reps: '15/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_shadow_boxing_rounds', en: 'Shadow Boxing Rounds', sets: 3, reps: '2min', rest: '60s', rpe: '6' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_taekwondo_off',
    sport: 'taekwondo',
    group: 'combat',
    phase: 'off',
    ar: 'تايكوندو — خارج الموسم (قوة وقاعدة هوائية)',
    en: 'Taekwondo — Off-season (strength & aerobic base)',
    note: {
      ar: 'قوة عامة للرجلين والعضلة الخلفية وقوة رفع الرجل للركلات العالية، مع قاعدة هوائية. رفع الرجلين بتحكم من غير مرجحة.',
      en: 'General leg and hamstring strength plus hip-flexor strength for high kicks, with an aerobic base. Raise the legs under control without swinging.'
    },
    sections: {
      warmup: [
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' },
        { libId: 'ad_walking_hip_opener', en: 'Walking Hip Opener', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'ex_step_up', en: 'Step-Up', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_hanging_leg_raise', en: 'Hanging Leg Raise', sets: 3, reps: '10', rest: '60s', rpe: '7' },
        { libId: 'ex_pullup', en: 'Pull-up', sets: 3, reps: '6-8', rest: '90s', rpe: '8' }
      ],
      cardio: [
        { libId: 'ad_zone_2_easy_run', en: 'Zone 2 Easy Run', sets: 1, reps: '30min' }
      ],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 2, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_taekwondo_pre',
    sport: 'taekwondo',
    group: 'combat',
    phase: 'pre',
    ar: 'تايكوندو — قبل البطولة (ركلة انفجارية ولياقة جولات)',
    en: 'Taekwondo — Pre-competition (kick power & round conditioning)',
    note: {
      ar: 'قوة انفجارية وارتداد سريع على مشط الرجل للركلات، مع لياقة جولات قصيرة متقطعة. النط الارتدادي بكعب مرفوع وركبة شبه مفرودة وهبوط هادي.',
      en: 'Explosive power and quick bounce off the forefoot for kicking, with short interval round conditioning. Pogo on the balls of the feet with near-straight knees and quiet landings.'
    },
    sections: {
      warmup: [
        { libId: 'ex_jump_rope', en: 'Jump Rope', sets: 2, reps: '60s' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 4, reps: '3', rest: '150s', rpe: '7' },
        { libId: 'ad_lateral_bound_and_stick', en: 'Lateral Bound and Stick', sets: 3, reps: '5/side', rest: '90s', rpe: '7' },
        { libId: 'ad_single_leg_pogo_hop', en: 'Single-Leg Pogo Hop', sets: 3, reps: '10/side', rest: '60s', rpe: '7' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 3, reps: '5/side', rest: '90s', rpe: '7' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '5/side', rest: '120s', rpe: '8' }
      ],
      cardio: [
        { libId: 'ad_jump_rope_high_knees', en: 'Jump Rope High Knees', sets: 6, reps: '30s', rest: '30s', rpe: '8' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_taekwondo_in',
    sport: 'taekwondo',
    group: 'combat',
    phase: 'in',
    ar: 'تايكوندو — فترة البطولات (صيانة قصيرة)',
    en: 'Taekwondo — Competition phase (short maintenance)',
    note: {
      ar: 'صيانة قصيرة للقوة والارتداد والضامة بين البطولات. حجم قليل وبدون تعب في الرجلين.',
      en: 'Short maintenance of strength, reactive bounce and groin between competitions. Low volume and no leg fatigue.'
    },
    sections: {
      warmup: [
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' },
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '6', rest: '90s', rpe: '6' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 2, reps: '6/side', rest: '60s', rpe: '6' },
        { libId: 'ad_single_leg_pogo_hop', en: 'Single-Leg Pogo Hop', sets: 2, reps: '8/side', rest: '60s', rpe: '6' },
        { libId: 'ex_copenhagen_plank', en: 'Copenhagen Plank', sets: 2, reps: '15s/side', rest: '45s', rpe: '6' }
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
    id: 'tpl_s_taekwondo_prevent',
    sport: 'taekwondo',
    group: 'combat',
    phase: 'prevent',
    ar: 'تايكوندو — وقاية من الإصابات (كاحل وعضلة خلفية وضامة ورقبة)',
    en: 'Taekwondo — Injury prevention (ankle, hamstring, groin, neck)',
    note: {
      ar: 'ثبات الكاحل والقدم، تقوية العضلة الخلفية والضامة للركلات العالية، ورقبة لتحمل الضربات. شغل الرقبة ثابت ومن غير ألم.',
      en: 'Ankle and foot stability, hamstring and groin strength for high kicks, and neck strength to tolerate impacts. Neck work is isometric and pain-free.'
    },
    sections: {
      warmup: [
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' },
        { libId: 'ad_walking_hip_opener', en: 'Walking Hip Opener', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'ad_banded_ankle_eversion', en: 'Banded Ankle Eversion', sets: 3, reps: '15/side', rest: '45s', rpe: '6' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 3, reps: '30s/side', rest: '30s', rpe: '5' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 3, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'ad_short_lever_copenhagen_plank', en: 'Short-Lever Copenhagen Plank', sets: 3, reps: '20s/side', rest: '60s', rpe: '6' },
        { libId: 'ad_short_foot_exercise', en: 'Short Foot Exercise', sets: 2, reps: '10', rest: '30s', rpe: '5' },
        { libId: 'ek_static_neck_flexion_and_extension', en: 'Isometric Neck Flexion and Extension', sets: 2, reps: '15s', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_wrestling_off',
    sport: 'wrestling',
    group: 'combat',
    phase: 'off',
    ar: 'مصارعة — خارج الموسم (قوة وتضخيم وقاعدة هوائية)',
    en: 'Wrestling — Off-season (strength, size & aerobic base)',
    note: {
      ar: 'بناء قوة قصوى في الجسم كله مع قبضة ورقبة قوية، وقاعدة هوائية على العجلة. الديدلفت بضهر محايد، والرقبة بمقاومة خفيفة بس.',
      en: 'Build full-body maximal strength with strong grip and neck, plus an aerobic base on the bike. Deadlift with a neutral back and keep neck resistance light.'
    },
    sections: {
      warmup: [
        { libId: 'wg_bear_crawl', en: 'Bear Crawl', sets: 2, reps: '10m' },
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '5', rest: '180s', rpe: '8' },
        { libId: 'ex_deadlift', en: 'Deadlift', sets: 3, reps: '5', rest: '180s', rpe: '8' },
        { libId: 'ex_bent_over_row', en: 'Bent Over Barbell Row', sets: 3, reps: '8', rest: '120s', rpe: '7' },
        { libId: 'wg_towel_pull_up', en: 'Towel Pull-up', sets: 3, reps: '5', rest: '120s', rpe: '8' },
        { libId: 'ek_static_neck_flexion_and_extension', en: 'Isometric Neck Flexion and Extension', sets: 3, reps: '20s', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_steady_state_bike_ride', en: 'Steady-State Bike Ride', sets: 1, reps: '30min' }
      ],
      mobility: [
        { libId: 'ad_thread_the_needle', en: 'Thread the Needle', sets: 2, reps: '6/side' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_wrestling_pre',
    sport: 'wrestling',
    group: 'combat',
    phase: 'pre',
    ar: 'مصارعة — قبل البطولة (قوة انفجارية ولياقة نزال)',
    en: 'Wrestling — Pre-competition (power & match conditioning)',
    note: {
      ar: 'قوة انفجارية للهجوم على الرجل والرفع، حمل ودفع زي الاشتباك، ولياقة دفع متكرر عالية الشدة. التكنيك في الكلين والرفع أهم من الوزن.',
      en: 'Explosive power for shots and lifts, carries and pushes that mimic hand-fighting, and repeated high-intensity push conditioning. Technique on cleans and carries matters more than load.'
    },
    sections: {
      warmup: [
        { libId: 'wg_bear_crawl', en: 'Bear Crawl', sets: 2, reps: '10m' },
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ad_power_clean', en: 'Power Clean', sets: 4, reps: '3', rest: '180s', rpe: '8' },
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 4, reps: '4', rest: '180s', rpe: '8' },
        { libId: 'ad_medicine_ball_scoop_toss', en: 'Medicine Ball Scoop Toss', sets: 4, reps: '5', rest: '90s', rpe: '7' },
        { libId: 'ad_sandbag_bear_hug_carry', en: 'Sandbag Bear-Hug Carry', sets: 4, reps: '30m', rest: '90s', rpe: '8' },
        { libId: 'ek_static_neck_side_flexion', en: 'Isometric Neck Side Flexion', sets: 3, reps: '20s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_sled_push_sprints', en: 'Sled Push Sprints', sets: 6, reps: '15m', rest: '45s', rpe: '9' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_neck_stretch', en: 'Neck Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_wrestling_in',
    sport: 'wrestling',
    group: 'combat',
    phase: 'in',
    ar: 'مصارعة — فترة البطولات (صيانة قصيرة)',
    en: 'Wrestling — Competition phase (short maintenance)',
    note: {
      ar: 'صيانة قصيرة للقوة والقبضة والرقبة بين البطولات. حجم قليل، وانتبه إنها ما تأثرش على الوزن أو الاستشفاء.',
      en: 'Short maintenance of strength, grip and neck between competitions. Low volume, and make sure it does not interfere with weight management or recovery.'
    },
    sections: {
      warmup: [
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5/side' },
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 1, reps: '4/side' }
      ],
      main: [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '3', rest: '120s', rpe: '6' },
        { libId: 'wg_towel_pull_up', en: 'Towel Pull-up', sets: 2, reps: '4', rest: '90s', rpe: '7' },
        { libId: 'ek_static_neck_flexion_and_extension', en: 'Isometric Neck Flexion and Extension', sets: 2, reps: '15s', rest: '45s', rpe: '6' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 2, reps: '20s/side', rest: '45s', rpe: '6' }
      ],
      cardio: [],
      mobility: [
        { libId: 'ad_open_book', en: 'Open Book', sets: 1, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 1, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_wrestling_prevent',
    sport: 'wrestling',
    group: 'combat',
    phase: 'prevent',
    ar: 'مصارعة — وقاية من الإصابات (رقبة وكتف وركبة وظهر)',
    en: 'Wrestling — Injury prevention (neck, shoulder, knee, back)',
    note: {
      ar: 'تقوية الرقبة العميقة والكتف، التحكم في الركبة، وثبات أسفل الظهر، مع لياقة خفيفة. شغل الرقبة من غير ألم، وأي تنميل في الدراع يستدعي تقييم.',
      en: 'Deep neck and shoulder strengthening, knee control and lower-back stability, with light conditioning. Keep neck work pain-free; any arm numbness needs assessment.'
    },
    sections: {
      warmup: [
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5/side' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' }
      ],
      main: [
        { libId: 'ad_deep_neck_flexor_head_lift', en: 'Deep Neck Flexor Head Lift', sets: 3, reps: '10', rest: '45s', rpe: '5' },
        { libId: 'ek_static_neck_side_flexion', en: 'Isometric Neck Side Flexion', sets: 3, reps: '15s/side', rest: '45s', rpe: '6' },
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 3, reps: '15', rest: '60s', rpe: '6' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 2, reps: '12/side', rest: '45s', rpe: '6' },
        { libId: 'wg_step_down', en: 'Step-Down', sets: 2, reps: '8/side', rest: '60s', rpe: '6' },
        { libId: 'ad_mcgill_curl_up', en: 'McGill Curl-Up', sets: 2, reps: '8', rest: '45s', rpe: '5' }
      ],
      cardio: [
        { libId: 'ad_bodyweight_emom_circuit', en: 'Bodyweight EMOM Circuit', sets: 2, reps: '3min', rest: '90s', rpe: '6' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_neck_stretch', en: 'Neck Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_fencing_off',
    sport: 'fencing',
    group: 'combat',
    phase: 'off',
    ar: 'مبارزة — خارج الموسم (قوة متوازنة وقاعدة هوائية)',
    en: 'Fencing — Off-season (balanced strength & aerobic base)',
    note: {
      ar: 'قوة للرجلين على الناحيتين عشان تعوّض عدم التماثل في وقفة المبارزة، مع ثبات جذع وقاعدة هوائية. اشتغل على الرجل الضعيفة الأول وبنفس العدد.',
      en: 'Strength on both sides to offset the asymmetry of the fencing stance, plus trunk stability and an aerobic base. Train the weaker side first with matching reps.'
    },
    sections: {
      warmup: [
        { libId: 'ex_jump_rope', en: 'Jump Rope', sets: 2, reps: '60s' },
        { libId: 'ad_walking_hip_opener', en: 'Walking Hip Opener', sets: 1, reps: '20m' }
      ],
      main: [
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 4, reps: '6', rest: '150s', rpe: '7' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 3, reps: '8/side', rest: '90s', rpe: '7' },
        { libId: 'ex_one_arm_dumbbell_row', en: 'One-Arm Dumbbell Row', sets: 3, reps: '10/side', rest: '90s', rpe: '7' },
        { libId: 'ad_suitcase_hold', en: 'Suitcase Hold', sets: 3, reps: '30s/side', rest: '60s', rpe: '6' }
      ],
      cardio: [
        { libId: 'ad_zone_2_easy_run', en: 'Zone 2 Easy Run', sets: 1, reps: '25min' }
      ],
      mobility: [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 2, reps: '8/side' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_fencing_pre',
    sport: 'fencing',
    group: 'combat',
    phase: 'pre',
    ar: 'مبارزة — قبل البطولة (سرعة اندفاع ورد فعل)',
    en: 'Fencing — Pre-competition (lunge speed & reaction)',
    note: {
      ar: 'سرعة الاندفاع ورد الفعل والقوة على رجل واحدة، مع لياقة قصيرة جدًا عالية الشدة زي الهجمات. كل تكرار بأقصى سرعة والراحة كاملة.',
      en: 'Lunge speed, reaction and single-leg power, with very short high-intensity conditioning like attacks. Every rep at max speed with full rest.'
    },
    sections: {
      warmup: [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'wg_fast_feet', en: 'Fast Feet', sets: 2, reps: '15s' }
      ],
      main: [
        { libId: 'ad_countermovement_jump', en: 'Countermovement Jump', sets: 4, reps: '4', rest: '90s', rpe: '7' },
        { libId: 'ad_single_leg_forward_hop_and_stick', en: 'Single-Leg Forward Hop and Stick', sets: 3, reps: '5/side', rest: '60s', rpe: '7' },
        { libId: 'ad_split_step_to_lunge_reaction', en: 'Split-Step to Lunge Reaction', sets: 4, reps: '6', rest: '60s', rpe: '8' },
        { libId: 'ad_reaction_start_sprint', en: 'Reaction Start Sprint', sets: 6, reps: '5m', rest: '60s', rpe: '8' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '5/side', rest: '120s', rpe: '8' }
      ],
      cardio: [
        { libId: 'ad_air_bike_calorie_sprints', en: 'Air Bike Calorie Sprints', sets: 8, reps: '10s', rest: '20s', rpe: '9' }
      ],
      mobility: [],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  },
  {
    id: 'tpl_s_fencing_in',
    sport: 'fencing',
    group: 'combat',
    phase: 'in',
    ar: 'مبارزة — فترة البطولات (صيانة قصيرة)',
    en: 'Fencing — Competition phase (short maintenance)',
    note: {
      ar: 'صيانة قصيرة للقوة على الناحيتين والجذع والساعد بين البطولات. حجم قليل عشان ما تأثرش على السرعة.',
      en: 'Short maintenance of two-sided strength, trunk and forearm between competitions. Low volume so it does not blunt speed.'
    },
    sections: {
      warmup: [
        { libId: 'wg_fast_feet', en: 'Fast Feet', sets: 1, reps: '15s' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10/side' }
      ],
      main: [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '6', rest: '90s', rpe: '6' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 2, reps: '6/side', rest: '60s', rpe: '6' },
        { libId: 'ad_suitcase_hold', en: 'Suitcase Hold', sets: 2, reps: '30s/side', rest: '45s', rpe: '6' },
        { libId: 'ad_eccentric_wrist_extension', en: 'Eccentric Wrist Extension', sets: 2, reps: '15', rest: '45s', rpe: '6' }
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
    id: 'tpl_s_fencing_prevent',
    sport: 'fencing',
    group: 'combat',
    phase: 'prevent',
    ar: 'مبارزة — وقاية من الإصابات (ركبة وأكيلس وحوض ورسغ)',
    en: 'Fencing — Injury prevention (knee, Achilles, hip, wrist)',
    note: {
      ar: 'تحميل وتر الرضفة وأكيلس للاندفاع المتكرر، ثبات الحوض والجذع، وتقوية الساعد لليد المسلحة. أي ألم في الوتر بيزيد تاني يوم معناه قلّل الحمل.',
      en: 'Patellar-tendon and Achilles loading for repeated lunging, hip and trunk stability, and forearm strength for the weapon hand. Tendon pain that is worse the next morning means reduce the load.'
    },
    sections: {
      warmup: [
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 1, reps: '10/side' },
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5/side' }
      ],
      main: [
        { libId: 'ad_eccentric_heel_drop', en: 'Eccentric Heel Drop', sets: 3, reps: '12/side', rest: '60s', rpe: '6' },
        { libId: 'ad_spanish_squat', en: 'Spanish Squat', sets: 3, reps: '30s', rest: '60s', rpe: '6' },
        { libId: 'wg_hip_airplane', en: 'Hip Airplane', sets: 2, reps: '5/side', rest: '60s', rpe: '6' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 2, reps: '30s/side', rest: '45s', rpe: '6' },
        { libId: 'ad_eccentric_wrist_extension', en: 'Eccentric Wrist Extension', sets: 2, reps: '15', rest: '45s', rpe: '6' },
        { libId: 'ad_single_leg_balance_progression', en: 'Single-Leg Balance Progression', sets: 2, reps: '30s/side', rest: '30s', rpe: '5' }
      ],
      cardio: [],
      mobility: [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s/side' }
      ]
    }
  }
];
