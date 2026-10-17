/*
 * ADAM+ — حركات وروتينات إطالة إضافية. نفس شكل STRETCH_MOVES / STRETCH_ROUTINES.
 * sides: true = بتتعمل على الجانبين. hold = ثواني الثبات.
 * الإطالة المفروض تبقى شد خفيف من غير وجع. لو حسيت بوجع حاد أو تنميل وقّف واستشر مختص.
 */
export const STRETCH_MOVES_EXTRA = {
  neckRotate: { sides: true, ar: 'لفّة الرقبة', en: 'Neck rotation', area: { ar: 'رقبة', en: 'Neck' },
    cue: { ar: 'لف راسك براحة ناحية كتفك لحد ما تحس بشد خفيف من غير ما تشيل كتفك.', en: 'Turn your head slowly toward your shoulder until you feel a light stretch, keeping your shoulders down.' } },
  sideBend: { sides: true, ar: 'ميل الجذع وانت واقف', en: 'Standing side bend', area: { ar: 'جنب الجسم', en: 'Obliques' },
    cue: { ar: 'ارفع دراع فوق راسك وميّل جسمك للجنب التاني. حافظ على صدرك مفتوح.', en: 'Raise one arm overhead and lean to the other side, keeping your chest open.' } },
  lat: { sides: true, ar: 'تمدد عضلة الظهر الجانبية', en: 'Lat stretch', area: { ar: 'لاتس', en: 'Lats' },
    cue: { ar: 'امسك حاجة ثابتة بإيد واحدة، وبعّد وركك ورا وانزل بصدرك لتحت لحد ما تحس بشد في جنب الضهر.', en: 'Hold something sturdy with one hand, push your hips back and sink your chest down until you feel a pull along the side of your back.' } },
  threadNeedle: { sides: true, ar: 'مرور الإبرة (تدوير الصدر)', en: 'Thread the needle', area: { ar: 'ضهر علوي', en: 'Upper back' },
    cue: { ar: 'على أربع: مرّر دراعك تحت الدراع التاني وريّح كتفك على الأرض وانت بتلف صدرك.', en: 'On all fours: slide one arm under the other and rest your shoulder on the floor as you rotate your chest.' } },
  kneesChest: { ar: 'الركب للصدر', en: 'Knees to chest', area: { ar: 'أسفل الضهر', en: 'Lower back' },
    cue: { ar: 'نايم على ضهرك: اسحب ركبك ناحية صدرك بإيديك ونفّس براحة.', en: 'Lying on your back: hug your knees toward your chest and breathe slowly.' } },
  cobra: { ar: 'وضعية الكوبرا الخفيفة', en: 'Gentle cobra', area: { ar: 'بطن وصدر', en: 'Abs and chest' },
    cue: { ar: 'نايم على بطنك وإيديك جنب صدرك: ارفع صدرك براحة وسيب حوضك على الأرض. لو حسيت ضغط على الضهر قلّل الارتفاع.', en: 'Lie face down with hands by your chest: lift your chest gently, hips on the floor. Reduce the height if you feel pressure in your back.' } },
  downDog: { ar: 'الكلب المقلوب', en: 'Downward dog', area: { ar: 'سلسلة خلفية', en: 'Back chain' },
    cue: { ar: 'ارفع حوضك لفوق وخلي جسمك حرف V مقلوب. ضهرك مفرود وكعوبك ناحية الأرض (مش لازم تلمسها).', en: 'Lift your hips to form an inverted V. Keep your back long and heels reaching toward the floor (they do not need to touch).' } },
  seatedFold: { ar: 'انحناء قاعد للأمام', en: 'Seated forward fold', area: { ar: 'فخذ خلفي وضهر', en: 'Hamstrings and back' },
    cue: { ar: 'اقعد ورجليك مفرودة وميّل من الحوض لقدام وضهرك طويل. ممكن تثني ركبك شوية لو مشدود.', en: 'Sit with legs extended and hinge forward from the hips with a long back. Soften your knees if tight.' } },
  frog: { ar: 'الضفدع (باطن الفخذ)', en: 'Frog stretch', area: { ar: 'باطن الفخذ', en: 'Adductors' },
    cue: { ar: 'على أربع: افتح ركبك للجنب وارجع بحوضك لورا براحة. اتسند على كوعك لو محتاج.', en: 'On all fours: widen your knees and sit your hips back gently. Rest on your forearms if needed.' } },
  pigeon: { sides: true, ar: 'وضعية الحمامة', en: 'Pigeon pose', area: { ar: 'مؤخرة وحوض', en: 'Glutes and hips' },
    cue: { ar: 'رجل مثنية قدامك والتانية مفرودة ورا. انزل بصدرك لقدام براحة. لو الركبة بتوجعك استخدم "رقم 4" بدلها.', en: 'Bend one leg in front, extend the other behind, and fold forward gently. If your knee hurts use the figure-4 instead.' } },
  hip9090: { sides: true, ar: 'الحوض 90/90', en: '90/90 hip stretch', area: { ar: 'حوض', en: 'Hips' },
    cue: { ar: 'اقعد برجل مثنية قدامك 90° والتانية على الجنب 90°، واعتدل بصدرك ثم ميّل لقدام براحة.', en: 'Sit with one leg bent 90° in front and the other 90° to the side, sit tall, then lean forward gently.' } },
  soleus: { sides: true, ar: 'تمدد السمانة العميقة', en: 'Bent-knee calf stretch', area: { ar: 'سمانة', en: 'Calves' },
    cue: { ar: 'زي تمدد السمانة بس اثني الركبة الخلفية شوية وخلي الكعب على الأرض.', en: 'Like the wall calf stretch but bend the back knee slightly, keeping the heel down.' } },
  ankle: { sides: true, ar: 'دوران الكاحل', en: 'Ankle circles', area: { ar: 'كاحل', en: 'Ankles' },
    cue: { ar: 'ارفع رجلك وارسم دوايره بالكاحل ببطء في الاتجاهين.', en: 'Lift one foot and draw slow circles with the ankle in both directions.' } },
  forearmExt: { sides: true, ar: 'تمدد ظهر الساعد', en: 'Forearm extensor stretch', area: { ar: 'ساعد', en: 'Forearm' },
    cue: { ar: 'مدّ دراعك قدامك وكف إيدك لتحت واسحب ضهر إيدك ناحيتك براحة.', en: 'Extend your arm, palm down, and gently pull the back of your hand toward you.' } },
  itBand: { sides: true, ar: 'تمدد جنب الفخذ', en: 'Standing IT-band stretch', area: { ar: 'جنب الفخذ', en: 'Outer thigh' },
    cue: { ar: 'اعبر رجلك ورا الرجل التانية وميّل بجسمك بعيد عنها لحد ما تحس بشد في جنب الفخذ.', en: 'Cross one leg behind the other and lean away until you feel a stretch along the outer thigh.' } }
};

export const STRETCH_ROUTINES_EXTRA = [
  { id: 'morning5', min: 5, hold: 30, ar: 'إطالة الصبح', en: 'Morning wake-up',
    sub: { ar: '7 حركات · حوالي 5 دقايق', en: '7 moves · about 5 minutes' },
    moves: ['shoulderRoll', 'catcow', 'sideBend', 'kneesChest', 'hipflex', 'calf', 'chest'] },
  { id: 'bed6', min: 6, hold: 40, ar: 'إطالة قبل النوم', en: 'Before-bed wind-down',
    sub: { ar: '7 حركات هادية · حوالي 6 دقايق', en: '7 calm moves · about 6 minutes' },
    moves: ['neck', 'child', 'threadNeedle', 'kneesChest', 'glute', 'butterfly', 'hamstring'] },
  { id: 'back6', min: 6, hold: 35, ar: 'راحة الضهر', en: 'Back relief',
    sub: { ar: '7 حركات · حوالي 6 دقايق', en: '7 moves · about 6 minutes' },
    moves: ['catcow', 'child', 'threadNeedle', 'kneesChest', 'twist', 'glute', 'hipflex'] },
  { id: 'upper7', min: 7, hold: 35, ar: 'إطالة بعد تمرين الجزء العلوي', en: 'After upper-body training',
    sub: { ar: '8 حركات · حوالي 7 دقايق', en: '8 moves · about 7 minutes' },
    moves: ['chest', 'shoulder', 'triceps', 'lat', 'forearmExt', 'wrist', 'neckRotate', 'threadNeedle'] },
  { id: 'lower8', min: 8, hold: 40, ar: 'إطالة بعد تمرين الرجلين', en: 'After lower-body training',
    sub: { ar: '8 حركات · حوالي 8 دقايق', en: '8 moves · about 8 minutes' },
    moves: ['quad', 'hamstring', 'calf', 'soleus', 'hipflex', 'glute', 'frog', 'itBand'] },
  { id: 'hips8', min: 8, hold: 45, ar: 'فتح الحوض', en: 'Hip opener',
    sub: { ar: '7 حركات · حوالي 8 دقايق', en: '7 moves · about 8 minutes' },
    moves: ['hipflex', 'hip9090', 'pigeon', 'frog', 'butterfly', 'glute', 'child'] },
  { id: 'yoga8', min: 8, hold: 40, ar: 'تدفق يوجا خفيف', en: 'Gentle yoga flow',
    sub: { ar: '7 حركات · حوالي 8 دقايق', en: '7 moves · about 8 minutes' },
    moves: ['catcow', 'downDog', 'cobra', 'child', 'hipflex', 'seatedFold', 'twist'] }
];
