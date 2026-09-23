/*
 * ADAM — قوالب أيام تمرين إضافية (SPORT_TEMPLATES_EXTRA).
 * نفس شكل SPORT_TEMPLATES في sports.js، مع libId لكل تمرين من مكتبة التمارين.
 * مسودة جاهزة للمدرب — راجعها وعدّلها حسب العميل.
 */
export const SPORT_TEMPLATES_EXTRA = [
  {
    id: 'tpl_x_fullbody_beginner_a',
    group: 'none',
    ar: 'مبتدئ — جسم كامل (يوم A)',
    en: 'Beginner — Full body (Day A)',
    note: {
      ar: 'لأول شهرين في الجيم، يتبادل مع يوم B. زوّد الوزن خطوة صغيرة لما تكمّل كل المجموعات بأداء نظيف.',
      en: 'For the first two months in the gym, alternating with Day B. Add a small amount of load once every set is completed with clean form.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_marching_in_place', en: 'Marching in Place', sets: 1, reps: '2min' },
        { libId: 'ex_arm_circles', en: 'Arm Circles', sets: 2, reps: '15' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 2, reps: '10' }
      ],
      main:        [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 3, reps: '10', rest: '90s', rpe: '6-7' },
        { libId: 'ex_dumbbell_bench_press', en: 'Dumbbell Bench Press', sets: 3, reps: '10', rest: '90s', rpe: '6-7' },
        { libId: 'ex_lat_pulldown', en: 'Lat Pulldown', sets: 3, reps: '10-12', rest: '90s' },
        { libId: 'wg_dumbbell_romanian_deadlift', en: 'Dumbbell Romanian Deadlift', sets: 3, reps: '10', rest: '90s' },
        { libId: 'ex_plank', en: 'Plank', sets: 3, reps: '30s', rest: '60s' }
      ],
      cardio:      [
        { libId: 'ex_stationary_bike', en: 'Bicycling, Stationary', sets: 1, reps: '10min' }
      ],
      mobility:    [
        { libId: 'ex_cat_cow', en: 'Cat-Cow', sets: 2, reps: '8' }
      ],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_fullbody_beginner_b',
    group: 'none',
    ar: 'مبتدئ — جسم كامل (يوم B)',
    en: 'Beginner — Full body (Day B)',
    note: {
      ar: 'اليوم التاني لبرنامج المبتدئ، بحركات مختلفة عن يوم A عشان يغطي الجسم كله. لما الضغط المائل يبقى سهل انزل لضغط عادي.',
      en: 'The second day of the beginner plan, with different movements from Day A to cover the whole body. Once incline push-ups feel easy, move to regular push-ups.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_jog_in_place', en: 'Jog in Place', sets: 1, reps: '2min' },
        { libId: 'wg_scapular_push_up', en: 'Scapular Push-up', sets: 2, reps: '10' },
        { libId: 'ex_ankle_circles', en: 'Ankle Circles', sets: 2, reps: '10' }
      ],
      main:        [
        { libId: 'ex_leg_press', en: 'Leg Press', sets: 3, reps: '12', rest: '90s', rpe: '6-7' },
        { libId: 'wg_incline_push_up', en: 'Incline Push-up', sets: 3, reps: '8-12', rest: '60s' },
        { libId: 'ex_seated_cable_row', en: 'Seated Cable Row', sets: 3, reps: '12', rest: '90s' },
        { libId: 'ex_glute_bridge', en: 'Glute Bridge', sets: 3, reps: '12', rest: '60s' },
        { libId: 'ex_dumbbell_shoulder_press', en: 'Dumbbell Shoulder Press', sets: 3, reps: '10', rest: '90s' },
        { libId: 'ex_dead_bug', en: 'Dead Bug', sets: 3, reps: '8', rest: '45s' }
      ],
      cardio:      [
        { libId: 'wg_treadmill_incline_walk', en: 'Treadmill Incline Walk', sets: 1, reps: '12min' }
      ],
      mobility:    [
        { libId: 'ad_open_book', en: 'Open Book', sets: 2, reps: '8' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_fullbody_intermediate',
    group: 'none',
    ar: 'متوسط — جسم كامل',
    en: 'Intermediate — Full body',
    note: {
      ar: 'لمتدرب عنده سنة تمرين تقريبًا وبيتمرن ٣ أيام في الأسبوع. زوّد الأوزان أسبوعيًا مع الحفاظ على RPE من ٧ لـ ٨.',
      en: 'For a trainee with about a year of training on three days a week. Add load weekly while keeping effort around RPE 7-8.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_walking_knee_hug', en: 'Walking Knee Hug', sets: 1, reps: '10' },
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 2, reps: '5' },
        { libId: 'ad_banded_diagonal_pull_apart', en: 'Banded Diagonal Pull-Apart', sets: 2, reps: '15' }
      ],
      main:        [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 4, reps: '6-8', rest: '150s', rpe: '7-8' },
        { libId: 'ex_incline_dumbbell_press', en: 'Incline Dumbbell Press', sets: 3, reps: '8-10', rest: '90s', rpe: '8' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8', rest: '120s', rpe: '7-8' },
        { libId: 'wg_chest_supported_row', en: 'Chest-Supported Row', sets: 3, reps: '10', rest: '90s' },
        { libId: 'ex_walking_lunge', en: 'Walking Lunge', sets: 2, reps: '12', rest: '90s' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 3, reps: '10', rest: '60s' }
      ],
      cardio:      [
        { libId: 'ex_rowing_machine', en: 'Rowing Machine', sets: 1, reps: '8min' }
      ],
      mobility:    [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 2, reps: '8' }
      ],
      flexibility: [
        { libId: 'ex_quad_stretch', en: 'Quad Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_upper_hypertrophy_a',
    group: 'none',
    ar: 'تضخيم علوي/سفلي — علوي A',
    en: 'Upper/Lower hypertrophy — Upper A',
    note: {
      ar: 'يوم علوي بحجم عالي لبناء العضل، بيتكرر مرتين في الأسبوع مع يوم سفلي. زوّد عدة واحدة كل أسبوع لحد آخر الرينج وبعدين زوّد الوزن.',
      en: 'A high-volume upper day for muscle growth, run twice a week alongside a lower day. Add a rep each week to the top of the range, then increase the load.'
    },
    sections: {
      warmup:      [
        { libId: 'ex_arm_circles', en: 'Arm Circles', sets: 2, reps: '15' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' },
        { libId: 'wg_scapular_push_up', en: 'Scapular Push-up', sets: 2, reps: '10' }
      ],
      main:        [
        { libId: 'ex_incline_barbell_bench_press', en: 'Incline Barbell Bench Press', sets: 4, reps: '8-10', rest: '120s', rpe: '8', tempo: '3-0-1-0' },
        { libId: 'ex_lat_pulldown', en: 'Lat Pulldown', sets: 4, reps: '10-12', rest: '90s', rpe: '8' },
        { libId: 'ex_dumbbell_shoulder_press', en: 'Dumbbell Shoulder Press', sets: 3, reps: '10-12', rest: '90s' },
        { libId: 'ex_seated_cable_row', en: 'Seated Cable Row', sets: 3, reps: '10-12', rest: '90s' },
        { libId: 'ex_lateral_raise', en: 'Lateral Raise', sets: 3, reps: '15', rest: '45s', rpe: '9' },
        { libId: 'ex_hammer_curl', en: 'Hammer Curl', sets: 3, reps: '12', rest: '60s' },
        { libId: 'ek_triceps_pushdown_with_rope_and_cable', en: 'Rope Triceps Pushdown', sets: 3, reps: '12', rest: '60s' }
      ],
      cardio:      [],
      mobility:    [
        { libId: 'ad_thread_the_needle', en: 'Thread the Needle', sets: 2, reps: '8' }
      ],
      flexibility: [
        { libId: 'wg_doorway_chest_stretch', en: 'Doorway Chest Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_lower_hypertrophy_a',
    group: 'none',
    ar: 'تضخيم علوي/سفلي — سفلي A',
    en: 'Upper/Lower hypertrophy — Lower A',
    note: {
      ar: 'يوم سفلي بحجم عالي للأفخاذ والخلفية والسمانة. زوّد الوزن لما تكمل أعلى الرينج في كل المجموعات، وخلي آخر مجموعة قريبة من الفشل.',
      en: 'A high-volume lower day for quads, hamstrings and calves. Add load when you hit the top of the range on every set, keeping the last set close to failure.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5' },
        { libId: 'ad_knee_to_wall_ankle_mobilization', en: 'Knee-to-Wall Ankle Mobilization', sets: 2, reps: '10' },
        { libId: 'wg_banded_lateral_walk', en: 'Banded Lateral Walk', sets: 2, reps: '12' }
      ],
      main:        [
        { libId: 'wg_hack_squat', en: 'Hack Squat', sets: 4, reps: '8-10', rest: '120s', rpe: '8', tempo: '3-1-1-0' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8-10', rest: '120s', rpe: '8' },
        { libId: 'ex_bulgarian_split_squat', en: 'Bulgarian Split Squat', sets: 3, reps: '10', rest: '90s' },
        { libId: 'ex_leg_extension', en: 'Leg Extension', sets: 3, reps: '12-15', rest: '60s', rpe: '9' },
        { libId: 'ek_seated_leg_curl', en: 'Seated Leg Curl', sets: 3, reps: '12', rest: '60s', rpe: '9' },
        { libId: 'ex_standing_calf_raise_machine', en: 'Standing Machine Calf Raise', sets: 4, reps: '12-15', rest: '60s', tempo: '2-2-1-0' },
        { libId: 'wg_cable_crunch', en: 'Cable Crunch', sets: 3, reps: '15', rest: '45s' }
      ],
      cardio:      [],
      mobility:    [
        { libId: 'ad_couch_stretch', en: 'Couch Stretch', sets: 2, reps: '45s' }
      ],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_ppl_push_advanced',
    group: 'none',
    ar: 'دفع/سحب/رجل متقدم — يوم الدفع',
    en: 'Advanced PPL — Push day',
    note: {
      ar: 'لمتدرب متقدم: بنش تقيل في الأول وبعدين حجم للصدر والكتف والترايسبس. اشتغل بموجات أسبوعية وخفّف كل ٤ لـ ٦ أسابيع.',
      en: 'For advanced lifters: heavy bench first, then volume for chest, shoulders and triceps. Run weekly waves and deload every 4-6 weeks.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_shoulder_cars', en: 'Shoulder CARs', sets: 1, reps: '5' },
        { libId: 'wg_scapular_push_up', en: 'Scapular Push-up', sets: 2, reps: '10' },
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 2, reps: '10' }
      ],
      main:        [
        { libId: 'ex_barbell_bench_press', en: 'Barbell Bench Press', sets: 5, reps: '3-5', rest: '180s', load: '80-85%', rpe: '8-9' },
        { libId: 'ex_incline_dumbbell_press', en: 'Incline Dumbbell Press', sets: 3, reps: '8-10', rest: '120s', rpe: '8' },
        { libId: 'ex_overhead_barbell_press', en: 'Overhead Barbell Press', sets: 3, reps: '6-8', rest: '120s', rpe: '8' },
        { libId: 'wg_weighted_dip', en: 'Weighted Dip', sets: 3, reps: '8', rest: '120s' },
        { libId: 'wg_cable_lateral_raise', en: 'Cable Lateral Raise', sets: 4, reps: '12-15', rest: '45s', rpe: '9' },
        { libId: 'ek_triceps_pushdown_with_rope_and_cable', en: 'Rope Triceps Pushdown', sets: 3, reps: '12', rest: '60s' },
        { libId: 'ex_overhead_triceps_extension', en: 'Overhead Triceps Extension', sets: 3, reps: '12', rest: '60s' }
      ],
      cardio:      [],
      mobility:    [],
      flexibility: [
        { libId: 'wg_doorway_chest_stretch', en: 'Doorway Chest Stretch', sets: 2, reps: '30s' },
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_ppl_pull_advanced',
    group: 'none',
    ar: 'دفع/سحب/رجل متقدم — يوم السحب',
    en: 'Advanced PPL — Pull day',
    note: {
      ar: 'ديدلفت تقيل وعقلة بوزن إضافي وبعدها حجم للظهر والبايسبس. قلّل مجموعات الديدلفت لو الضهر لسه مرهق من يوم الرجل.',
      en: 'Heavy deadlifts and weighted pull-ups, then back and biceps volume. Cut deadlift sets if the lower back is still fatigued from leg day.'
    },
    sections: {
      warmup:      [
        { libId: 'ex_thoracic_rotation', en: 'Thoracic Rotation', sets: 2, reps: '8' },
        { libId: 'ad_prone_w_raise', en: 'Prone W Raise', sets: 2, reps: '10' },
        { libId: 'ad_banded_diagonal_pull_apart', en: 'Banded Diagonal Pull-Apart', sets: 2, reps: '15' }
      ],
      main:        [
        { libId: 'ex_deadlift', en: 'Deadlift', sets: 4, reps: '3-5', rest: '180s', load: '80-85%', rpe: '8' },
        { libId: 'wg_weighted_pull_up', en: 'Weighted Pull-up', sets: 4, reps: '5-6', rest: '120s', rpe: '8' },
        { libId: 'wg_pendlay_row', en: 'Pendlay Row', sets: 3, reps: '6-8', rest: '120s' },
        { libId: 'wg_single_arm_cable_row', en: 'Single-Arm Cable Row', sets: 3, reps: '10-12', rest: '60s' },
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 3, reps: '15', rest: '45s' },
        { libId: 'ek_alternating_incline_curl_with_dumbbell', en: 'Alternating Incline Dumbbell Curl', sets: 3, reps: '10', rest: '60s' },
        { libId: 'ek_hammer_curls_with_rope_and_cable', en: 'Cable Rope Hammer Curl', sets: 3, reps: '12', rest: '60s' }
      ],
      cardio:      [],
      mobility:    [
        { libId: 'ad_foam_roller_thoracic_extension', en: 'Foam Roller Thoracic Extension', sets: 1, reps: '60s' }
      ],
      flexibility: [
        { libId: 'ex_childs_pose', en: 'Child\'s Pose', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_ppl_legs_advanced',
    group: 'none',
    ar: 'دفع/سحب/رجل متقدم — يوم الرجل',
    en: 'Advanced PPL — Legs day',
    note: {
      ar: 'سكوات تقيل وبعده حجم للأفخاذ والخلفية والسمانة. زوّد وزن السكوات ٢٫٥ كجم لما تكمل كل المجموعات عند RPE 8 أو أقل.',
      en: 'Heavy squats followed by volume for quads, hamstrings and calves. Add 2.5 kg to the squat once all sets land at RPE 8 or below.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 2, reps: '6' },
        { libId: 'ad_banded_ankle_dorsiflexion_mobilization', en: 'Banded Ankle Dorsiflexion Mobilization', sets: 2, reps: '10' },
        { libId: 'ad_walking_hip_opener', en: 'Walking Hip Opener', sets: 1, reps: '10' }
      ],
      main:        [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 5, reps: '3-5', rest: '180s', load: '80-85%', rpe: '8-9' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 4, reps: '6-8', rest: '120s', rpe: '8' },
        { libId: 'ex_leg_press', en: 'Leg Press', sets: 3, reps: '10-12', rest: '120s' },
        { libId: 'wg_front_foot_elevated_split_squat', en: 'Front-Foot Elevated Split Squat', sets: 3, reps: '8', rest: '90s' },
        { libId: 'ek_lying_leg_curl_machine', en: 'Lying Leg Curl', sets: 3, reps: '10-12', rest: '60s' },
        { libId: 'ek_seated_calf_raise_using_machine', en: 'Seated Machine Calf Raise', sets: 4, reps: '12-15', rest: '45s' },
        { libId: 'ex_hanging_leg_raise', en: 'Hanging Leg Raise', sets: 3, reps: '10-12', rest: '60s' }
      ],
      cardio:      [],
      mobility:    [
        { libId: 'ad_couch_stretch', en: 'Couch Stretch', sets: 2, reps: '45s' }
      ],
      flexibility: [
        { libId: 'ad_pigeon_stretch', en: 'Pigeon Stretch', sets: 2, reps: '45s' }
      ]
    }
  },
  {
    id: 'tpl_x_home_dumbbells',
    group: 'none',
    ar: 'في البيت — دمبل بس',
    en: 'At home — Dumbbells only',
    note: {
      ar: 'لو معاك جوز دمبل بس في البيت. البنش ممكن يتعمل على الأرض لو مفيش بنش، وزوّد العدات قبل ما تزود الوزن.',
      en: 'For training at home with just a pair of dumbbells. Press from the floor if there is no bench, and add reps before adding weight.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_jog_in_place', en: 'Jog in Place', sets: 1, reps: '2min' },
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '6' },
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 1, reps: '5' }
      ],
      main:        [
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 4, reps: '10-12', rest: '90s' },
        { libId: 'wg_dumbbell_romanian_deadlift', en: 'Dumbbell Romanian Deadlift', sets: 3, reps: '10', rest: '90s' },
        { libId: 'ex_dumbbell_bench_press', en: 'Dumbbell Bench Press', sets: 3, reps: '10', rest: '90s' },
        { libId: 'ex_one_arm_dumbbell_row', en: 'One-Arm Dumbbell Row', sets: 3, reps: '10', rest: '60s' },
        { libId: 'wg_standing_dumbbell_press', en: 'Standing Dumbbell Press', sets: 3, reps: '10', rest: '90s' },
        { libId: 'ek_rear_lunges_with_dumbbell', en: 'Dumbbell Reverse Lunge', sets: 3, reps: '10', rest: '60s' },
        { libId: 'ad_suitcase_hold', en: 'Suitcase Hold', sets: 3, reps: '30s', rest: '45s' }
      ],
      cardio:      [
        { libId: 'wg_jumping_jack', en: 'Jumping Jack', sets: 4, reps: '40s', rest: '20s' }
      ],
      mobility:    [
        { libId: 'ad_supine_spinal_twist', en: 'Supine Spinal Twist', sets: 2, reps: '30s' }
      ],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_travel_bands',
    group: 'none',
    ar: 'سفر — أستك مقاومة بس',
    en: 'Travel — Resistance bands only',
    note: {
      ar: 'للسفر أو الفندق بأستك مقاومة في الشنطة، للحفاظ على المستوى مش لرفعه. صعّب بأستك أتقل أو بتثبيت ثانيتين في آخر الحركة.',
      en: 'For travel or a hotel room with bands in the bag, to maintain rather than build. Progress with a heavier band or a two-second hold at the end range.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_step_jacks', en: 'Step Jacks', sets: 1, reps: '60s' },
        { libId: 'ad_cross_body_arm_swings', en: 'Cross-Body Arm Swings', sets: 1, reps: '15' },
        { libId: 'wg_banded_lateral_walk', en: 'Banded Lateral Walk', sets: 2, reps: '12' }
      ],
      main:        [
        { libId: 'ek_squats_with_exercise_bands', en: 'Band Squat', sets: 3, reps: '15', rest: '60s' },
        { libId: 'wg_banded_row', en: 'Banded Row', sets: 3, reps: '15', rest: '60s' },
        { libId: 'ek_crossover_with_bands', en: 'Band Chest Fly', sets: 3, reps: '15', rest: '60s' },
        { libId: 'wg_banded_lat_pulldown', en: 'Banded Lat Pulldown', sets: 3, reps: '15', rest: '60s' },
        { libId: 'wg_banded_glute_bridge', en: 'Banded Glute Bridge', sets: 3, reps: '15', rest: '45s' },
        { libId: 'ek_back_flys_with_exercise_band', en: 'Band Reverse Fly', sets: 3, reps: '15', rest: '45s' },
        { libId: 'wg_banded_pallof_press', en: 'Banded Pallof Press', sets: 3, reps: '10', rest: '45s' }
      ],
      cardio:      [
        { libId: 'wg_seal_jack', en: 'Seal Jack', sets: 4, reps: '40s', rest: '20s' }
      ],
      mobility:    [
        { libId: 'ad_open_book', en: 'Open Book', sets: 2, reps: '8' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_kettlebell_fullbody',
    group: 'none',
    ar: 'كيتل بل — جسم كامل',
    en: 'Kettlebell — Full body',
    note: {
      ar: 'يوم كامل بكيتل بل واحد أو اتنين، مناسب للجيم الصغير أو البيت. اتقن السوينج والكلين الأول، وبعدين كبّر الكيتل.',
      en: 'A full session with one or two kettlebells, suited to a small gym or home. Master the swing and clean first, then move up a bell size.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_deep_squat_hold', en: 'Deep Squat Hold', sets: 2, reps: '30s' },
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5' },
        { libId: 'ad_shoulder_cars', en: 'Shoulder CARs', sets: 1, reps: '5' }
      ],
      main:        [
        { libId: 'ex_kettlebell_swing', en: 'Kettlebell Swing', sets: 5, reps: '15', rest: '60s' },
        { libId: 'ad_kettlebell_clean', en: 'Kettlebell Clean', sets: 4, reps: '6', rest: '60s' },
        { libId: 'ex_goblet_squat', en: 'Goblet Squat', sets: 4, reps: '10', rest: '90s' },
        { libId: 'wg_kettlebell_romanian_deadlift', en: 'Kettlebell Romanian Deadlift', sets: 3, reps: '10', rest: '60s' },
        { libId: 'ad_turkish_get_up', en: 'Turkish Get-Up', sets: 3, reps: '2', rest: '90s' },
        { libId: 'ad_renegade_row', en: 'Renegade Row', sets: 3, reps: '8', rest: '60s' }
      ],
      cardio:      [
        { libId: 'ad_front_rack_kettlebell_carry', en: 'Front-Rack Kettlebell Carry', sets: 3, reps: '40m', rest: '60s' }
      ],
      mobility:    [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 2, reps: '8' }
      ],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_strength_5x5',
    group: 'none',
    ar: 'قوة — نظام 5×5',
    en: 'Strength — 5x5 style',
    note: {
      ar: 'نظام قوة كلاسيكي للمتدرب اللي بيبدأ يرفع تقيل، ٣ أيام في الأسبوع. زوّد ٢٫٥ كجم كل حصة طالما كملت الخمس مجموعات.',
      en: 'A classic strength format for lifters starting to train heavy, three days a week. Add 2.5 kg each session as long as all five sets are completed.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5' },
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 2, reps: '4' },
        { libId: 'ad_banded_diagonal_pull_apart', en: 'Banded Diagonal Pull-Apart', sets: 2, reps: '15' }
      ],
      main:        [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 5, reps: '5', rest: '180s', rpe: '7-8' },
        { libId: 'ex_barbell_bench_press', en: 'Barbell Bench Press', sets: 5, reps: '5', rest: '180s', rpe: '7-8' },
        { libId: 'wg_barbell_row', en: 'Barbell Row', sets: 5, reps: '5', rest: '120s', rpe: '7-8' },
        { libId: 'ek_hyperextensions', en: 'Back Extension', sets: 2, reps: '10', rest: '90s' },
        { libId: 'ex_ab_wheel_rollout', en: 'Ab Wheel Rollout', sets: 3, reps: '8', rest: '60s' }
      ],
      cardio:      [],
      mobility:    [
        { libId: 'ad_couch_stretch', en: 'Couch Stretch', sets: 2, reps: '30s' }
      ],
      flexibility: [
        { libId: 'ex_childs_pose', en: 'Child\'s Pose', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_glute_focus',
    group: 'none',
    ar: 'يوم تركيز على المؤخرة',
    en: 'Glute-focus day',
    note: {
      ar: 'يوم كامل لتقوية وتكبير عضلات المؤخرة، مرة أو مرتين في الأسبوع. زوّد وزن الهيب ثرست تدريجيًا وحافظ على ثانية ثبات فوق.',
      en: 'A full session to build glute strength and size, once or twice a week. Progress hip-thrust load gradually and keep a one-second squeeze at the top.'
    },
    sections: {
      warmup:      [
        { libId: 'wg_banded_lateral_walk', en: 'Banded Lateral Walk', sets: 2, reps: '12' },
        { libId: 'ad_prone_hip_extension', en: 'Prone Hip Extension', sets: 2, reps: '10' },
        { libId: 'wg_banded_monster_walk', en: 'Banded Monster Walk', sets: 2, reps: '10' }
      ],
      main:        [
        { libId: 'ex_hip_thrust', en: 'Hip Thrust', sets: 4, reps: '8-10', rest: '120s', rpe: '8', tempo: '2-0-1-1' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 3, reps: '8-10', rest: '120s' },
        { libId: 'wg_deficit_reverse_lunge', en: 'Deficit Reverse Lunge', sets: 3, reps: '10', rest: '90s' },
        { libId: 'wg_glute_focused_back_extension', en: 'Glute-Focused Back Extension', sets: 3, reps: '12-15', rest: '60s' },
        { libId: 'wg_cable_standing_hip_abduction', en: 'Cable Standing Hip Abduction', sets: 3, reps: '15', rest: '45s' },
        { libId: 'ek_one_legged_cable_kickback', en: 'Cable Glute Kickback', sets: 3, reps: '12-15', rest: '45s' },
        { libId: 'wg_frog_pump', en: 'Frog Pump', sets: 2, reps: '20', rest: '45s' }
      ],
      cardio:      [
        { libId: 'wg_treadmill_incline_walk', en: 'Treadmill Incline Walk', sets: 1, reps: '15min' }
      ],
      mobility:    [
        { libId: 'ad_pigeon_stretch', en: 'Pigeon Stretch', sets: 2, reps: '45s' }
      ],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_arms_shoulders',
    group: 'none',
    ar: 'يوم دراع وكتف',
    en: 'Arms & shoulders day',
    note: {
      ar: 'يوم إضافي للدراع والكتف لمتدرب عايز يركز عليهم. ابدأ بالحركات المركبة، وفي عزل الكتف والدراع خلي آخر مجموعة قريبة من الفشل.',
      en: 'An extra arms and shoulders day for trainees who want to bring them up. Start with the compound press, and take the last isolation sets close to failure.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_shoulder_cars', en: 'Shoulder CARs', sets: 1, reps: '5' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' },
        { libId: 'ex_arm_circles', en: 'Arm Circles', sets: 2, reps: '15' }
      ],
      main:        [
        { libId: 'ex_arnold_press', en: 'Arnold Press', sets: 3, reps: '10', rest: '90s', rpe: '8' },
        { libId: 'ex_lateral_raise', en: 'Lateral Raise', sets: 4, reps: '12-15', rest: '45s', rpe: '9' },
        { libId: 'wg_reverse_pec_deck', en: 'Reverse Pec Deck', sets: 3, reps: '15', rest: '45s' },
        { libId: 'ek_ez_bar_curl_with_barbell', en: 'EZ-Bar Curl', sets: 3, reps: '10', rest: '60s' },
        { libId: 'ex_skull_crusher', en: 'Skull Crusher', sets: 3, reps: '10', rest: '60s' },
        { libId: 'ek_incline_biceps_curl_with_dumbbell', en: 'Incline Dumbbell Curl', sets: 3, reps: '12', rest: '60s' },
        { libId: 'ek_triceps_pushdown_with_rope_and_cable', en: 'Rope Triceps Pushdown', sets: 3, reps: '12-15', rest: '60s' }
      ],
      cardio:      [],
      mobility:    [
        { libId: 'ad_wall_slides', en: 'Wall Slides', sets: 2, reps: '10' }
      ],
      flexibility: [
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_hyrox_simulation',
    group: 'none',
    ar: 'هايروكس — محاكاة سباق',
    en: 'HYROX — Race simulation',
    note: {
      ar: 'صيغة مختصرة للسباق: ١ كم جري قبل كل محطة من الست محطات. اعملها كل ٣ لـ ٤ أسابيع قبل السباق وسجّل الزمن الكلي عشان تقارن.',
      en: 'A shortened race format: a 1 km run before each of the six stations. Run it every 3-4 weeks before the race and log the total time to compare.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_walking_hip_opener', en: 'Walking Hip Opener', sets: 1, reps: '10' },
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '6' }
      ],
      main:        [
        { libId: 'dr_hyrox_ski', en: 'HYROX 1: SkiErg 1000m', sets: 1, reps: '1000m' },
        { libId: 'dr_hyrox_sled_push', en: 'HYROX 2: Sled Push 50m', sets: 1, reps: '50m' },
        { libId: 'dr_hyrox_burpee_bj', en: 'HYROX 4: Burpee Broad Jump 80m', sets: 1, reps: '80m' },
        { libId: 'dr_hyrox_row', en: 'HYROX 5: Row 1000m', sets: 1, reps: '1000m' },
        { libId: 'dr_hyrox_lunges', en: 'HYROX 7: Sandbag Lunges 100m', sets: 1, reps: '100m' },
        { libId: 'dr_hyrox_wallballs', en: 'HYROX 8: 100 Wall Balls', sets: 1, reps: '100' }
      ],
      cardio:      [
        { libId: 'dr_hyrox_run', en: 'HYROX: 1km run between stations', sets: 6, reps: '1000m', rest: '0s', rpe: '8' }
      ],
      mobility:    [
        { libId: 'ad_couch_stretch', en: 'Couch Stretch', sets: 2, reps: '45s' }
      ],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_tactical_test_prep',
    group: 'none',
    ar: 'تحضير لاختبارات الشرطة والكليات العسكرية',
    en: 'Police / military academy test prep',
    note: {
      ar: 'لمتقدمي كليات الشرطة والكليات العسكرية: تدريب على بنود الاختبار نفسها بالزمن. اختبر نفسك كل أسبوعين وقارن بالمطلوب.',
      en: 'For police and military academy applicants: practise the actual test items against the clock. Retest every two weeks and compare with the required standard.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_jog_in_place', en: 'Jog in Place', sets: 1, reps: '3min' },
        { libId: 'ad_walking_knee_hug', en: 'Walking Knee Hug', sets: 1, reps: '10' },
        { libId: 'ad_carioca', en: 'Carioca', sets: 2, reps: '20m' }
      ],
      main:        [
        { libId: 'ad_timed_push_up_test_practice', en: 'Timed Push-up Test Practice', sets: 3, reps: '60s', rest: '120s' },
        { libId: 'ad_timed_sit_up_test_practice', en: 'Timed Sit-up Test Practice', sets: 3, reps: '60s', rest: '120s' },
        { libId: 'ad_pull_up_ladder', en: 'Pull-up Ladder', sets: 3, reps: '1-5', rest: '120s' },
        { libId: 'ad_4x10_m_shuttle_run_test_practice', en: '4x10 m Shuttle Run Test Practice', sets: 4, reps: '4x10m', rest: '120s' },
        { libId: 'ad_broad_jump', en: 'Broad Jump', sets: 3, reps: '5', rest: '90s' }
      ],
      cardio:      [
        { libId: 'ad_2_4_km_run_pacing', en: '2.4 km Run Pacing', sets: 1, reps: '2400m' }
      ],
      mobility:    [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s' },
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_military_circuit',
    group: 'none',
    ar: 'دائرة عسكرية',
    en: 'Military circuit',
    note: {
      ar: 'دائرة بوزن الجسم وحمل وسحب بأسلوب التدريب العسكري، ٤ جولات. ارتاح بس بعد آخر تمرين في الجولة، وزوّد جولة لما تخلص الأربعة بسهولة.',
      en: 'A military-style circuit of bodyweight work, carries and drags, four rounds. Rest only after the last exercise of each round, and add a round when four feel comfortable.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_step_jacks', en: 'Step Jacks', sets: 1, reps: '60s' },
        { libId: 'ad_walking_lunge_with_twist', en: 'Walking Lunge with Twist', sets: 1, reps: '10' },
        { libId: 'ad_cross_body_arm_swings', en: 'Cross-Body Arm Swings', sets: 1, reps: '15' }
      ],
      main:        [
        { libId: 'ex_pushup', en: 'Push-up', sets: 4, reps: '15', rest: '15s' },
        { libId: 'ad_sandbag_shoulder_carry', en: 'Sandbag Shoulder Carry', sets: 4, reps: '40m', rest: '15s' },
        { libId: 'ad_leopard_crawl', en: 'Leopard Crawl', sets: 4, reps: '20m', rest: '15s' },
        { libId: 'ex_bodyweight_squat', en: 'Bodyweight Squat', sets: 4, reps: '20', rest: '15s' },
        { libId: 'ad_partner_rescue_drag', en: 'Partner Rescue Drag', sets: 4, reps: '20m', rest: '15s' },
        { libId: 'ex_mountain_climbers', en: 'Mountain Climbers', sets: 4, reps: '30s', rest: '120s' }
      ],
      cardio:      [
        { libId: 'ad_ruck_march', en: 'Ruck March', sets: 1, reps: '20min' }
      ],
      mobility:    [],
      flexibility: [
        { libId: 'ex_quad_stretch', en: 'Quad Stretch', sets: 2, reps: '30s' },
        { libId: 'ex_childs_pose', en: 'Child\'s Pose', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_metcon',
    group: 'none',
    ar: 'تكييف أيضي (Metcon)',
    en: 'Metabolic conditioning (Metcon)',
    note: {
      ar: 'حصة قصيرة وشديدة لرفع اللياقة القلبية وحرق السعرات، ٥ جولات بدون راحة بين التمارين. قلّل الراحة بين الجولات مع الوقت.',
      en: 'A short, hard session to build conditioning and burn calories: five rounds with no rest between exercises. Shorten the rest between rounds over time.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_jog_in_place', en: 'Jog in Place', sets: 1, reps: '2min' },
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '5' },
        { libId: 'ad_walking_hip_opener', en: 'Walking Hip Opener', sets: 1, reps: '10' }
      ],
      main:        [
        { libId: 'dr_thruster', en: 'Thruster', sets: 5, reps: '10', rest: '0s' },
        { libId: 'ad_battle_rope_alternating_waves', en: 'Battle Rope Alternating Waves', sets: 5, reps: '30s', rest: '0s' },
        { libId: 'ex_box_jump', en: 'Box Jump', sets: 5, reps: '8', rest: '0s' },
        { libId: 'dr_burpee', en: 'Burpee', sets: 5, reps: '10', rest: '0s' },
        { libId: 'ex_medicine_ball_slam', en: 'Medicine Ball Slam', sets: 5, reps: '12', rest: '90s' }
      ],
      cardio:      [
        { libId: 'ad_steady_state_row', en: 'Steady-State Row', sets: 1, reps: '8min', rpe: '4' }
      ],
      mobility:    [],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 2, reps: '30s' },
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_mobility_core_recovery',
    group: 'none',
    ar: 'مرونة وجذع — يوم استشفاء',
    en: 'Mobility & core — Recovery day',
    note: {
      ar: 'يوم خفيف بين أيام التمرين التقيلة لتحسين مدى الحركة وثبات الجذع. خليه مريح ومتحكم، وزوّد مدة الثبات بدل الصعوبة.',
      en: 'A light day between hard sessions to improve range of motion and trunk control. Keep it easy and controlled, and extend hold times rather than difficulty.'
    },
    sections: {
      warmup:      [
        { libId: 'wg_cat_cow_stretch', en: 'Cat-Cow Stretch', sets: 2, reps: '8' },
        { libId: 'ad_quadruped_rock_back', en: 'Quadruped Rock Back', sets: 2, reps: '10' }
      ],
      main:        [
        { libId: 'ex_dead_bug', en: 'Dead Bug', sets: 3, reps: '10', rest: '45s' },
        { libId: 'ex_bird_dog', en: 'Bird Dog', sets: 3, reps: '10', rest: '45s' },
        { libId: 'ad_mcgill_curl_up', en: 'McGill Curl-Up', sets: 3, reps: '5', rest: '45s', tempo: '10s hold' },
        { libId: 'ex_side_plank', en: 'Side Plank', sets: 3, reps: '30s', rest: '45s' },
        { libId: 'wg_pallof_press', en: 'Pallof Press', sets: 3, reps: '10', rest: '45s' },
        { libId: 'ad_suitcase_hold', en: 'Suitcase Hold', sets: 3, reps: '30s', rest: '45s' }
      ],
      cardio:      [
        { libId: 'ad_brisk_walk', en: 'Brisk Walk', sets: 1, reps: '20min' }
      ],
      mobility:    [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 2, reps: '8' },
        { libId: 'ad_open_book', en: 'Open Book', sets: 2, reps: '8' }
      ],
      flexibility: [
        { libId: 'ad_supine_spinal_twist', en: 'Supine Spinal Twist', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_deload',
    group: 'none',
    ar: 'أسبوع تخفيف (Deload)',
    en: 'Deload day',
    note: {
      ar: 'نفس الحركات الأساسية بنص الحجم ووزن أخف، كل ٤ لـ ٨ أسابيع أو لما الأداء يقف. الهدف تعافي وأداء نظيف، مش إرهاق.',
      en: 'The main lifts at half the volume and lighter loads, every 4-8 weeks or when performance stalls. The goal is recovery and crisp technique, not fatigue.'
    },
    sections: {
      warmup:      [
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 1, reps: '5' },
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5' },
        { libId: 'ad_shoulder_cars', en: 'Shoulder CARs', sets: 1, reps: '5' }
      ],
      main:        [
        { libId: 'ex_barbell_back_squat', en: 'Barbell Back Squat', sets: 2, reps: '5', rest: '120s', load: '60%', rpe: '5-6' },
        { libId: 'ex_barbell_bench_press', en: 'Barbell Bench Press', sets: 2, reps: '5', rest: '120s', load: '60%', rpe: '5-6' },
        { libId: 'ex_romanian_deadlift', en: 'Romanian Deadlift', sets: 2, reps: '8', rest: '90s', rpe: '5' },
        { libId: 'ex_lat_pulldown', en: 'Lat Pulldown', sets: 2, reps: '10', rest: '90s', rpe: '6' },
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 2, reps: '15', rest: '45s' }
      ],
      cardio:      [
        { libId: 'wg_elliptical', en: 'Elliptical', sets: 1, reps: '15min' }
      ],
      mobility:    [],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 2, reps: '30s' },
        { libId: 'ex_childs_pose', en: 'Child\'s Pose', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_team_speed_agility',
    group: 'team',
    ar: 'الرياضات الجماعية — يوم سرعة ورشاقة',
    en: 'Team sports — Speed & agility day',
    note: {
      ar: 'تسارع وسرعة قصوى وتغيير اتجاه للاعبي الكورة والسلة واليد، وهم مرتاحين في أول الحصة. راحة كاملة بين التكرارات عشان الجودة.',
      en: 'Acceleration, top speed and change of direction for football, basketball and handball players, done fresh at the start of a session. Take full rest between reps to keep quality high.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_b_skip', en: 'B-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_carioca', en: 'Carioca', sets: 2, reps: '20m' },
        { libId: 'ad_walking_hamstring_scoop', en: 'Walking Hamstring Scoop', sets: 1, reps: '10' }
      ],
      main:        [
        { libId: 'ad_wall_drive', en: 'Wall Drive', sets: 3, reps: '5', rest: '60s' },
        { libId: 'ad_falling_start', en: 'Falling Start', sets: 4, reps: '10m', rest: '90s' },
        { libId: 'ad_flying_sprint', en: 'Flying Sprint', sets: 3, reps: '20m', rest: '180s' },
        { libId: 'ad_45_degree_cut', en: '45-Degree Cut', sets: 4, reps: '4', rest: '90s' },
        { libId: 'dr_cone_5_10_5', en: '5-10-5 Pro Agility (cones)', sets: 4, reps: '1', rest: '120s' },
        { libId: 'ad_reaction_start_sprint', en: 'Reaction Start Sprint', sets: 4, reps: '10m', rest: '90s' }
      ],
      cardio:      [],
      mobility:    [],
      flexibility: [
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s' },
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_team_contrast_power',
    group: 'team',
    ar: 'الرياضات الجماعية — قدرة انفجارية بالتباين',
    en: 'Team sports — Contrast power day',
    note: {
      ar: 'رفعة تقيلة يليها قفز فورًا لتحويل القوة لسرعة على الملعب، للاعب عنده قاعدة قوة كويسة. بعيد عن يوم الماتش بـ ٤٨ ساعة على الأقل.',
      en: 'A heavy lift paired immediately with a jump to turn strength into on-field speed, for players with a solid strength base. Keep it at least 48 hours from match day.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_walking_knee_hug', en: 'Walking Knee Hug', sets: 1, reps: '10' },
        { libId: 'ad_walking_quad_pull', en: 'Walking Quad Pull', sets: 1, reps: '10' },
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5' }
      ],
      main:        [
        { libId: 'ad_back_squat_to_jump_squat_contrast', en: 'Back Squat to Jump Squat Contrast', sets: 4, reps: '3+5', rest: '180s', load: '80%' },
        { libId: 'ad_trap_bar_deadlift_to_broad_jump_contrast', en: 'Trap Bar Deadlift to Broad Jump Contrast', sets: 3, reps: '3+3', rest: '180s' },
        { libId: 'ad_hang_power_clean', en: 'Hang Power Clean', sets: 4, reps: '3', rest: '120s' },
        { libId: 'ad_lateral_bound_and_stick', en: 'Lateral Bound and Stick', sets: 3, reps: '5', rest: '90s' },
        { libId: 'ad_single_leg_forward_hop_and_stick', en: 'Single-Leg Forward Hop and Stick', sets: 3, reps: '5', rest: '60s' },
        { libId: 'ex_nordic_hamstring_curl', en: 'Nordic Hamstring Curl', sets: 3, reps: '5', rest: '90s' }
      ],
      cardio:      [],
      mobility:    [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 2, reps: '8' }
      ],
      flexibility: [
        { libId: 'ex_adductor_stretch', en: 'Adductor Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_combat_fight_conditioning',
    group: 'combat',
    ar: 'الرياضات القتالية — لياقة الجولات',
    en: 'Combat sports — Fight-round conditioning',
    note: {
      ar: 'تكييف بنفس زمن الجولة والراحة للملاكمة والكيك بوكسينج والـ MMA. قرّب زمن الشغل من زمن الجولة الحقيقي كل ما تقرب من النزال.',
      en: 'Conditioning matched to round and rest times for boxing, kickboxing and MMA. Move work periods closer to real round length as the fight gets nearer.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_shadow_boxing', en: 'Shadow Boxing', sets: 2, reps: '2min' },
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5' },
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 1, reps: '5' }
      ],
      main:        [
        { libId: 'ad_shadow_boxing_rounds', en: 'Shadow Boxing Rounds', sets: 3, reps: '3min', rest: '60s' },
        { libId: 'ad_battle_rope_slams', en: 'Battle Rope Slams', sets: 5, reps: '30s', rest: '30s' },
        { libId: 'wg_sprawl', en: 'Sprawl', sets: 5, reps: '10', rest: '30s' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 4, reps: '6', rest: '60s' },
        { libId: 'ad_sled_push_sprints', en: 'Sled Push Sprints', sets: 5, reps: '20m', rest: '60s' },
        { libId: 'ek_static_neck_flexion_and_extension', en: 'Isometric Neck Flexion and Extension', sets: 3, reps: '20s', rest: '45s' }
      ],
      cardio:      [
        { libId: 'ad_air_bike_calorie_sprints', en: 'Air Bike Calorie Sprints', sets: 8, reps: '15s', rest: '45s' }
      ],
      mobility:    [],
      flexibility: [
        { libId: 'ex_neck_stretch', en: 'Neck Stretch', sets: 2, reps: '30s' },
        { libId: 'ad_pigeon_stretch', en: 'Pigeon Stretch', sets: 2, reps: '45s' }
      ]
    }
  },
  {
    id: 'tpl_x_combat_grappling_strength',
    group: 'combat',
    ar: 'المصارعة والجودو — قوة وقبضة',
    en: 'Grappling — Strength & grip',
    note: {
      ar: 'قوة عامة وقبضة ورقبة للمصارعة والجودو والجوجيتسو. زوّد الحمل في الحمل والشيل تدريجيًا، وقلّل الحجم في أسبوع البطولة.',
      en: 'Full-body strength, grip and neck work for wrestling, judo and jiu-jitsu. Build carry loads gradually and cut volume in tournament week.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_neck_cars', en: 'Neck CARs', sets: 1, reps: '5' },
        { libId: 'wg_crab_walk', en: 'Crab Walk', sets: 2, reps: '10m' },
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 2, reps: '6' }
      ],
      main:        [
        { libId: 'ek_zecher_squats', en: 'Zercher Squat', sets: 4, reps: '5', rest: '150s', rpe: '8' },
        { libId: 'wg_towel_pull_up', en: 'Towel Pull-up', sets: 4, reps: '5-8', rest: '120s' },
        { libId: 'wg_pendlay_row', en: 'Pendlay Row', sets: 4, reps: '6', rest: '120s' },
        { libId: 'ad_sandbag_bear_hug_carry', en: 'Sandbag Bear-Hug Carry', sets: 4, reps: '30m', rest: '90s' },
        { libId: 'ad_turkish_get_up', en: 'Turkish Get-Up', sets: 3, reps: '2', rest: '90s' },
        { libId: 'ek_static_neck_side_flexion', en: 'Isometric Neck Side Flexion', sets: 3, reps: '20s', rest: '45s' },
        { libId: 'wg_dead_hang', en: 'Dead Hang', sets: 3, reps: '45s', rest: '60s' }
      ],
      cardio:      [],
      mobility:    [
        { libId: 'ad_bretzel_stretch', en: 'Bretzel Stretch', sets: 2, reps: '30s' }
      ],
      flexibility: [
        { libId: 'ex_neck_stretch', en: 'Neck Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_racket_rotation_armcare',
    group: 'racket',
    ar: 'رياضات المضرب — قوة الدوران وحماية الكتف',
    en: 'Racket sports — Rotational power & arm care',
    note: {
      ar: 'قدرة دورانية للضربة مع حماية الكتف والكوع للتنس والبادل والاسكواش. مناسب مرة في الأسبوع طول السنة، وزوّد وزن الكرة الطبية ببطء.',
      en: 'Rotational power for the stroke plus shoulder and elbow care for tennis, padel and squash. Suits once a week all year; increase medicine-ball weight slowly.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_shoulder_cars', en: 'Shoulder CARs', sets: 1, reps: '5' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' },
        { libId: 'ad_open_book', en: 'Open Book', sets: 2, reps: '8' }
      ],
      main:        [
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 4, reps: '6', rest: '90s' },
        { libId: 'ad_landmine_rotation', en: 'Landmine Rotation', sets: 3, reps: '8', rest: '60s' },
        { libId: 'ad_split_step_to_lunge_reaction', en: 'Split-Step to Lunge Reaction', sets: 4, reps: '6', rest: '60s' },
        { libId: 'wg_half_kneeling_pallof_press', en: 'Half-Kneeling Pallof Press', sets: 3, reps: '10', rest: '45s' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 3, reps: '15', rest: '45s' },
        { libId: 'ad_eccentric_wrist_extension', en: 'Eccentric Wrist Extension', sets: 3, reps: '15', rest: '45s', tempo: '4-0-1-0' }
      ],
      cardio:      [],
      mobility:    [
        { libId: 'ad_sleeper_stretch', en: 'Sleeper Stretch', sets: 2, reps: '30s' }
      ],
      flexibility: [
        { libId: 'ex_shoulder_stretch', en: 'Cross-Body Shoulder Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_endurance_runner_strength',
    group: 'endurance',
    ar: 'الجري — يوم قوة للعدّائين',
    en: 'Running — Runner strength day',
    note: {
      ar: 'قوة رجل واحدة وسمانة ووتر أكيليس لتحسين كفاءة الجري وتقليل الإصابات، مرتين في الأسبوع. خليه بعد جري سهل مش قبل تمرين سرعة.',
      en: 'Single-leg, calf and Achilles strength to improve running economy and cut injury risk, twice a week. Place it after an easy run, not before a speed session.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_knee_to_wall_ankle_mobilization', en: 'Knee-to-Wall Ankle Mobilization', sets: 2, reps: '10' },
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_mini_band_standing_march', en: 'Mini-Band Standing March', sets: 2, reps: '10' }
      ],
      main:        [
        { libId: 'wg_trap_bar_deadlift', en: 'Trap Bar Deadlift', sets: 3, reps: '5', rest: '120s', rpe: '7-8' },
        { libId: 'ek_step_ups_with_dumbbells', en: 'Dumbbell Step-Up', sets: 3, reps: '8', rest: '90s' },
        { libId: 'ex_single_leg_rdl', en: 'Single-Leg Romanian Deadlift', sets: 3, reps: '8', rest: '60s' },
        { libId: 'ad_bent_knee_soleus_raise', en: 'Bent-Knee Soleus Raise', sets: 3, reps: '15', rest: '60s', tempo: '2-1-2-0' },
        { libId: 'ad_pogo_hop', en: 'Pogo Hop', sets: 3, reps: '20', rest: '60s' },
        { libId: 'wg_side_plank_hip_dip', en: 'Side Plank Hip Dip', sets: 3, reps: '10', rest: '45s' }
      ],
      cardio:      [
        { libId: 'ad_strides', en: 'Strides', sets: 6, reps: '80m', rest: '60s' }
      ],
      mobility:    [],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 2, reps: '30s' },
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_endurance_cyclist_strength',
    group: 'endurance',
    ar: 'الدراجات — يوم قوة لراكبي الدراجات',
    en: 'Cycling — Cyclist strength day',
    note: {
      ar: 'قوة رجلين وخلفية مع شغل على الضهر والوضعية لراكبي الدراجات. أتقل في خارج الموسم، ومجموعتين بس في الموسم للمحافظة.',
      en: 'Leg and posterior-chain strength plus back and posture work for cyclists. Go heavier in the off-season and drop to two sets in-season to maintain.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5' },
        { libId: 'ad_foam_roller_thoracic_extension', en: 'Foam Roller Thoracic Extension', sets: 1, reps: '60s' },
        { libId: 'ad_prone_hip_extension', en: 'Prone Hip Extension', sets: 2, reps: '10' }
      ],
      main:        [
        { libId: 'ek_squat_to_bench_with_barbell', en: 'Barbell Box Squat', sets: 4, reps: '5', rest: '150s', rpe: '8' },
        { libId: 'wg_kettlebell_romanian_deadlift', en: 'Kettlebell Romanian Deadlift', sets: 3, reps: '8', rest: '90s' },
        { libId: 'wg_split_squat', en: 'Dumbbell Split Squat', sets: 3, reps: '8', rest: '90s' },
        { libId: 'ek_hyperextensions', en: 'Back Extension', sets: 3, reps: '12', rest: '60s' },
        { libId: 'ad_stir_the_pot', en: 'Stir the Pot', sets: 3, reps: '8', rest: '45s' },
        { libId: 'ex_face_pull', en: 'Face Pull', sets: 3, reps: '15', rest: '45s' }
      ],
      cardio:      [
        { libId: 'ad_bike_cadence_drills', en: 'Bike Cadence Drills', sets: 1, reps: '15min' }
      ],
      mobility:    [
        { libId: 'ad_couch_stretch', en: 'Couch Stretch', sets: 2, reps: '45s' }
      ],
      flexibility: [
        { libId: 'wg_doorway_chest_stretch', en: 'Doorway Chest Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_athletics_sprint_speed',
    group: 'athletics',
    ar: 'العدو — تسارع وسرعة قصوى',
    en: 'Sprinting — Acceleration & max velocity',
    note: {
      ar: 'حصة سرعة لعدّائي ١٠٠ و٢٠٠م: تسارع بالزلاجة وبعدين جري الحواجز الصغيرة والسرعة الطائرة. راحة كاملة، ووقّف لما السرعة تقل.',
      en: 'A speed session for 100 m and 200 m sprinters: resisted acceleration, then wicket runs and flying sprints. Take full recovery and stop when speed drops.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_a_skip', en: 'A-Skip', sets: 2, reps: '20m' },
        { libId: 'ad_b_skip', en: 'B-Skip', sets: 2, reps: '20m' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 2, reps: '10' },
        { libId: 'ad_walking_hamstring_scoop', en: 'Walking Hamstring Scoop', sets: 1, reps: '10' }
      ],
      main:        [
        { libId: 'ad_wall_drive', en: 'Wall Drive', sets: 3, reps: '5', rest: '60s' },
        { libId: 'ad_power_skip', en: 'Power Skip', sets: 3, reps: '20m', rest: '90s' },
        { libId: 'ad_sled_resisted_sprint', en: 'Sled-Resisted Sprint', sets: 4, reps: '20m', rest: '180s', load: '10-15% BW' },
        { libId: 'ad_wicket_run', en: 'Wicket Run', sets: 4, reps: '30m', rest: '180s' },
        { libId: 'ad_flying_sprint', en: 'Flying Sprint', sets: 3, reps: '20m', rest: '240s' }
      ],
      cardio:      [],
      mobility:    [],
      flexibility: [
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 2, reps: '30s' },
        { libId: 'ex_hip_flexor_stretch', en: 'Hip Flexor Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_athletics_throws_power',
    group: 'athletics',
    ar: 'الرمي — قدرة لرماة الجلة والرمح',
    en: 'Throws — Power for shot put & javelin',
    note: {
      ar: 'رفعات أولمبية ورمي كرة طبية لنقل القوة من الرجلين للدراع. تكرارات قليلة وسريعة، وقلّل الحجم قبل المنافسة.',
      en: 'Olympic lifts and medicine-ball throws to transfer force from legs to arm. Keep reps low and fast, and cut volume before competition.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_shoulder_cars', en: 'Shoulder CARs', sets: 1, reps: '5' },
        { libId: 'wg_worlds_greatest_stretch', en: 'World\'s Greatest Stretch', sets: 2, reps: '4' },
        { libId: 'ad_cross_body_arm_swings', en: 'Cross-Body Arm Swings', sets: 1, reps: '15' }
      ],
      main:        [
        { libId: 'ad_power_clean', en: 'Power Clean', sets: 5, reps: '3', rest: '150s', load: '75-80%' },
        { libId: 'ex_front_squat', en: 'Front Squat', sets: 4, reps: '4', rest: '180s', rpe: '8' },
        { libId: 'wg_push_press', en: 'Push Press', sets: 4, reps: '3', rest: '120s' },
        { libId: 'ad_medicine_ball_overhead_backward_throw', en: 'Medicine Ball Overhead Backward Throw', sets: 4, reps: '5', rest: '90s' },
        { libId: 'ad_medicine_ball_rotational_throw', en: 'Medicine Ball Rotational Throw', sets: 4, reps: '5', rest: '90s' },
        { libId: 'wg_landmine_press', en: 'Landmine Press', sets: 3, reps: '6', rest: '90s' }
      ],
      cardio:      [],
      mobility:    [
        { libId: 'ad_sleeper_stretch', en: 'Sleeper Stretch', sets: 2, reps: '30s' }
      ],
      flexibility: [
        { libId: 'ad_bretzel_stretch', en: 'Bretzel Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_water_swimmer_shoulder',
    group: 'water',
    ar: 'السباحة — صحة الكتف والجذع',
    en: 'Swimming — Shoulder health & core',
    note: {
      ar: 'وقاية من كتف السبّاح بتقوية لوح الكتف والدوران الخارجي مع جذع ثابت. خليه ٢ لـ ٣ مرات في الأسبوع بأوزان خفيفة وتحكم كامل.',
      en: 'Swimmer\'s-shoulder prevention through scapular and external-rotation strength with a stable trunk. Do it 2-3 times a week with light loads and full control.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_band_pass_through', en: 'Band Pass-Through', sets: 2, reps: '10' },
        { libId: 'ad_band_no_money', en: 'Band No-Money', sets: 2, reps: '15' },
        { libId: 'wg_scapular_push_up', en: 'Scapular Push-up', sets: 2, reps: '10' }
      ],
      main:        [
        { libId: 'wg_straight_arm_pulldown', en: 'Straight-Arm Pulldown', sets: 3, reps: '12', rest: '60s' },
        { libId: 'ad_side_lying_external_rotation', en: 'Side-Lying External Rotation', sets: 3, reps: '15', rest: '45s' },
        { libId: 'wg_prone_y_raise', en: 'Prone Y Raise', sets: 3, reps: '10', rest: '45s' },
        { libId: 'ad_serratus_wall_slide', en: 'Serratus Wall Slide', sets: 3, reps: '10', rest: '45s' },
        { libId: 'ad_body_saw', en: 'Body Saw', sets: 3, reps: '8', rest: '60s' },
        { libId: 'wg_hollow_rock', en: 'Hollow Rock', sets: 3, reps: '20s', rest: '45s' }
      ],
      cardio:      [
        { libId: 'ad_freestyle_kick_sets', en: 'Freestyle Kick Sets', sets: 6, reps: '50m', rest: '20s' }
      ],
      mobility:    [
        { libId: 'ad_foam_roller_thoracic_extension', en: 'Foam Roller Thoracic Extension', sets: 1, reps: '60s' }
      ],
      flexibility: [
        { libId: 'wg_doorway_chest_stretch', en: 'Doorway Chest Stretch', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_strength_strongman_events',
    group: 'strength',
    ar: 'سترونجمان — يوم فعاليات',
    en: 'Strongman — Event day',
    note: {
      ar: 'تدريب فعاليات السترونجمان بأدوات الجيم: ضغط فوق الراس، رفع جزئي، حمل وسحب. ابدأ بأوزان خفيفة للتكنيك وزوّد المسافة أو الوزن أسبوعيًا.',
      en: 'Strongman event training with gym equipment: overhead pressing, partial pulls, carries and drags. Start light for technique and add distance or load each week.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_hip_cars', en: 'Hip CARs', sets: 1, reps: '5' },
        { libId: 'wg_inchworm', en: 'Inchworm', sets: 1, reps: '6' },
        { libId: 'ad_banded_diagonal_pull_apart', en: 'Banded Diagonal Pull-Apart', sets: 2, reps: '15' }
      ],
      main:        [
        { libId: 'wg_push_press', en: 'Push Press', sets: 5, reps: '3', rest: '150s', rpe: '8' },
        { libId: 'wg_rack_pull', en: 'Rack Pull', sets: 4, reps: '3', rest: '180s', rpe: '8' },
        { libId: 'ex_farmers_carry', en: 'Farmer\'s Carry', sets: 4, reps: '30m', rest: '120s' },
        { libId: 'ad_sandbag_shoulder_carry', en: 'Sandbag Shoulder Carry', sets: 4, reps: '30m', rest: '120s' },
        { libId: 'ek_one_arm_side_deadlift_with_barbell', en: 'One-Arm Barbell Suitcase Deadlift', sets: 3, reps: '5', rest: '90s' },
        { libId: 'dr_sled_drag', en: 'Sled Drag for Distance', sets: 4, reps: '20m', rest: '90s' }
      ],
      cardio:      [],
      mobility:    [
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 2, reps: '8' }
      ],
      flexibility: [
        { libId: 'ex_childs_pose', en: 'Child\'s Pose', sets: 2, reps: '30s' }
      ]
    }
  },
  {
    id: 'tpl_x_other_climbing_strength',
    group: 'other',
    ar: 'التسلق — قوة الشد والقبضة',
    en: 'Climbing — Pulling & grip strength',
    note: {
      ar: 'قوة سحب وقبضة للمتسلقين مع شغل عكسي للدفع وحماية الكوع. زوّد مدة التعليق أو الوزن الإضافي ببطء، وارتاح يوم بين الحصص.',
      en: 'Pulling and grip strength for climbers, with opposing pushing work and elbow care. Add hang time or extra load slowly, and leave a day between sessions.'
    },
    sections: {
      warmup:      [
        { libId: 'ad_shoulder_cars', en: 'Shoulder CARs', sets: 1, reps: '5' },
        { libId: 'wg_scapular_push_up', en: 'Scapular Push-up', sets: 2, reps: '10' },
        { libId: 'ad_90_90_hip_switches', en: '90/90 Hip Switches', sets: 2, reps: '6' }
      ],
      main:        [
        { libId: 'wg_dead_hang', en: 'Dead Hang', sets: 5, reps: '10s', rest: '120s' },
        { libId: 'wg_weighted_pull_up', en: 'Weighted Pull-up', sets: 4, reps: '4-6', rest: '150s', rpe: '8' },
        { libId: 'wg_towel_pull_up', en: 'Towel Pull-up', sets: 3, reps: '5', rest: '120s' },
        { libId: 'ex_hanging_leg_raise', en: 'Hanging Leg Raise', sets: 3, reps: '8', rest: '60s' },
        { libId: 'ex_pushup', en: 'Push-up', sets: 3, reps: '12-15', rest: '60s' },
        { libId: 'ad_eccentric_wrist_extension', en: 'Eccentric Wrist Extension', sets: 3, reps: '15', rest: '45s', tempo: '4-0-1-0' }
      ],
      cardio:      [],
      mobility:    [
        { libId: 'wg_butterfly_stretch', en: 'Butterfly Stretch', sets: 2, reps: '30s' }
      ],
      flexibility: [
        { libId: 'wg_doorway_chest_stretch', en: 'Doorway Chest Stretch', sets: 2, reps: '30s' }
      ]
    }
  }
];
