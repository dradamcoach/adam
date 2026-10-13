/*
 * ADAM — بيوميكانيك أي تمرين في المكتبة (بيتحسب من بيانات التمرين نفسه)
 * exerciseBiomech(ex) => { pattern, topic, muscle, chain, action, plane, resist, hard, loads }
 * كل نص [عربي, إنجليزي]. القواعد محافظة: لو مش متأكدين من حاجة مش بنكتبها.
 * ex = عنصر من مكتبة التمارين (الأساسية أو exercises-index بعد expandIndexRow).
 */
import { BIOMECH } from './biomech.js';
import { BIOMECH_MUSCLES } from './biomech-muscles.js';

const TOPIC_BY_PATTERN = {
  squat: 'squat', hinge: 'hinge', lunge: 'lunge', horizontal_push: 'hpush', vertical_push: 'vpush',
  horizontal_pull: 'hpull', vertical_pull: 'vpull', jump: 'jump', sprint: 'run', locomotion: 'run', gait: 'run',
  throw: 'throw', rotation: 'throw', anti_extension: 'core', anti_rotation: 'core', anti_lateral: 'core', flexion: 'core', carry: 'core', crawl: 'core'
};

export const PATTERN_NAMES = {
  squat: ['سكوات', 'Squat'], hinge: ['ثني من الحوض', 'Hip hinge'], lunge: ['لانچ / رجل واحدة', 'Lunge / single leg'],
  horizontal_push: ['دفع لقدام', 'Horizontal push'], vertical_push: ['دفع لفوق', 'Vertical push'],
  horizontal_pull: ['سحب لجسمك', 'Horizontal pull'], vertical_pull: ['سحب من فوق', 'Vertical pull'],
  jump: ['نط', 'Jump'], sprint: ['جري سريع', 'Sprint'], locomotion: ['حركة وتنقّل', 'Locomotion'], gait: ['مشي وجري', 'Gait'],
  throw: ['رمي', 'Throw'], rotation: ['لف', 'Rotation'], anti_extension: ['ضد التقوّس', 'Anti-extension'],
  anti_rotation: ['ضد اللف', 'Anti-rotation'], anti_lateral: ['ضد الميل لجنب', 'Anti-lateral flexion'], flexion: ['ثني الجذع', 'Trunk flexion'],
  carry: ['شيل ومشي', 'Carry'], crawl: ['زحف', 'Crawl'], isolation: ['عزل عضلة', 'Isolation'], balance: ['اتزان', 'Balance'],
  mobility: ['مرونة وحركة', 'Mobility'], stretch: ['إطالة', 'Stretch']
};

const MUSCLE_BY_KEY = {
  chest: 'pec_major', shoulders: 'deltoid', lats: 'lats', 'middle back': 'rhomboid', traps: 'trapezius', biceps: 'biceps',
  triceps: 'triceps', forearms: 'forearm_flex', abdominals: 'rectus_abd', 'lower back': 'erectors', glutes: 'glute_max',
  abductors: 'glute_med', adductors: 'adductors', quadriceps: 'vasti', hamstrings: 'hamstrings', calves: 'gastroc', neck: 'neck'
};

const ACTION_BY_PATTERN = {
  squat: [['الكاحل والركبة والحوض بيتثنوا ويتفردوا مع بعض.', 'The ankles, knees and hips bend and straighten together.'], 's'],
  hinge: [['الحوض بيتثني ويتفرد والضهر ثابت، والركبة شبه ثابتة.', 'The hips bend and straighten with a braced back and nearly fixed knees.'], 's'],
  lunge: [['الحوض والركبة والكاحل في الرجل الأمامية أساسًا، مع شغل اتزان.', 'Mainly the hip, knee and ankle of the front leg, with balance demand.'], 's'],
  horizontal_push: [['الكتف بيقرّب الدراع لقدام والكوع بيتفرد.', 'The shoulder brings the arm forward and the elbow straightens.'], 't'],
  vertical_push: [['الكتف بيرفع الدراع لفوق، ولوح الكتف بيلف لفوق، والكوع بيتفرد.', 'The arm lifts overhead, the shoulder blade rotates up and the elbow straightens.'], 's'],
  horizontal_pull: [['لوح الكتف بيرجع لورا، والكتف بيرجّع الدراع، والكوع بيتثني.', 'The shoulder blade pulls back, the arm moves back and the elbow bends.'], 's'],
  vertical_pull: [['الدراع بينزل من فوق لجنب الجسم، ولوح الكتف بينزل، والكوع بيتثني.', 'The arm drives down from overhead, the shoulder blade lowers and the elbow bends.'], 'f'],
  jump: [['الحوض والركبة والكاحل بيتفردوا بسرعة مع بعض، وبيتثنوا في النزول يمتصوا الصدمة.', 'The hips, knees and ankles extend fast together, then bend to absorb the landing.'], 's'],
  sprint: [['حركة متكررة للحوض والركبة والكاحل، والدراعين بيوازنوا.', 'Repeated hip, knee and ankle action, with the arms balancing.'], 's'],
  locomotion: [['حركة متكررة للحوض والركبة والكاحل.', 'Repeated hip, knee and ankle action.'], 's'],
  gait: [['حركة متكررة للحوض والركبة والكاحل.', 'Repeated hip, knee and ankle action.'], 's'],
  throw: [['لف متسلسل: الحوض، بعدين الجذع، بعدين الدراع.', 'Sequential rotation: hips, then trunk, then arm.'], 't'],
  rotation: [['لف الجذع من الحوض ونص الضهر العلوي.', 'Trunk rotation from the hips and upper back.'], 't'],
  anti_extension: [['الجذع بيقاوم إن الضهر يتقوّس، من غير حركة.', 'The trunk resists arching, without moving.'], 'i'],
  anti_rotation: [['الجذع بيقاوم اللف، من غير حركة.', 'The trunk resists twisting, without moving.'], 'i'],
  anti_lateral: [['الجذع بيقاوم الميل لجنب، من غير حركة.', 'The trunk resists bending sideways, without moving.'], 'i'],
  flexion: [['ثني الجذع أو الحوض لقدام.', 'Bending the trunk or hips forward.'], 's'],
  carry: [['الجذع والقبضة بيقاوموا الحمل وانت ماشي.', 'The trunk and grip resist the load while you walk.'], 'f'],
  crawl: [['الكتف والحوض بيشيلوا الجسم، والجذع ثابت.', 'The shoulders and hips carry the body while the trunk stays steady.'], 's']
};

const PLANES = {
  s: ['المستوى الأمامي الخلفي', 'Sagittal plane'], f: ['المستوى الجانبي', 'Frontal plane'],
  t: ['مستوى اللف', 'Transverse plane'], i: ['ثبات من غير حركة', 'Stability without movement']
};

function nameEn(ex) {
  const n = ex && ex.name;
  return String((n && typeof n === 'object' ? n.en : n) || '').toLowerCase();
}

export function inferPattern(ex) {
  if (ex && ex.pattern) return ex.pattern;
  const n = nameEn(ex);
  const cat = (ex && ex.category) || '';
  if (/stretch/.test(n) || cat === 'stretching') return 'stretch';
  if (/hip thrust|glute bridge/.test(n)) return 'hinge';
  if (/deadlift|\brdl\b|good morning|swing|back extension|hyperextension/.test(n)) return 'hinge';
  if (/lunge|split squat|step-?up/.test(n)) return 'lunge';
  if (/squat|leg press|hack/.test(n)) return 'squat';
  if (/overhead press|military|shoulder press|push press|arnold/.test(n)) return 'vertical_push';
  if (/bench press|push-?up|chest press|floor press/.test(n)) return 'horizontal_push';
  if (/pull-?up|chin-?up|pulldown/.test(n)) return 'vertical_pull';
  if (/\brow\b|rows\b/.test(n)) return 'horizontal_pull';
  if (/jump|hop|bound/.test(n)) return 'jump';
  if (/sprint|run|jog/.test(n)) return 'sprint';
  if (/throw|slam|toss/.test(n)) return 'throw';
  if (/plank|dead bug|bird dog|rollout/.test(n)) return 'anti_extension';
  if (/pallof/.test(n)) return 'anti_rotation';
  if (/crunch|sit-?up|leg raise|knee raise/.test(n)) return 'flexion';
  if (/carry|farmer/.test(n)) return 'carry';
  if (cat === 'cardio') return 'locomotion';
  if (cat === 'strength') return 'isolation';
  return '';
}

/* حركة المفصل في تمارين العزل: من العضلة الأساسية واسم التمرين */
function isolationAction(ex) {
  const n = nameEn(ex);
  const m = ((ex && ex.primaryMuscles) || [])[0] || '';
  if (m === 'biceps' || (/curl/.test(n) && m === 'forearms' && !/wrist/.test(n))) return [['الكوع بيتثني.', 'The elbow bends.'], 's'];
  if (m === 'triceps') return [['الكوع بيتفرد.', 'The elbow straightens.'], 's'];
  if (m === 'shoulders') {
    if (/lateral|side raise/.test(n)) return [['الدراع بيترفع لجنب.', 'The arm lifts out to the side.'], 'f'];
    if (/front/.test(n)) return [['الدراع بيترفع لقدام.', 'The arm lifts forward.'], 's'];
    if (/rear|reverse fly|face pull|pull apart/.test(n)) return [['الدراع بيرجع لورا في مستوى الكتف.', 'The arm moves back at shoulder height.'], 't'];
    if (/rotation/.test(n)) return [['الدراع بيلف لبرّه أو لجوه.', 'The arm rotates outward or inward.'], 't'];
    if (/shrug/.test(n)) return [['الكتف بيترفع لفوق.', 'The shoulder lifts upward.'], 'f'];
    return null;
  }
  if (m === 'chest' && /fly|flye|crossover|pec deck|butterfly/.test(n)) return [['الدراع بيقرّب ناحية الصدر والكوع ثابت.', 'The arm moves across towards the chest with a fixed elbow.'], 't'];
  if (m === 'lats' && /pullover|straight-arm|straight arm/.test(n)) return [['الدراع بينزل من فوق والكوع شبه مفرود.', 'The arm moves down from overhead with a nearly straight elbow.'], 's'];
  if (m === 'quadriceps' && /extension|sissy/.test(n)) return [['الركبة بتتفرد.', 'The knee straightens.'], 's'];
  if (m === 'hamstrings' && /curl/.test(n)) return [['الركبة بتتثني.', 'The knee bends.'], 's'];
  if (m === 'calves') return /tibialis|toe raise/.test(n) ? [['مشط الرجل بيترفع لفوق.', 'The front of the foot lifts.'], 's'] : [['الكعب بيترفع والكاحل بيتمد.', 'The heel lifts as the ankle points.'], 's'];
  if (m === 'glutes' || m === 'abductors') {
    if (/abduct|clam|monster|lateral walk|side-lying leg raise|side lying/.test(n)) return [['الفخذ بيتبعد لجنب.', 'The thigh moves out to the side.'], 'f'];
    if (/kickback|bridge|thrust/.test(n)) return [['الحوض بيتفرد (الفخذ بيرجع لورا).', 'The hip extends (the thigh moves back).'], 's'];
    return m === 'abductors' ? [['الفخذ بيتبعد لجنب.', 'The thigh moves out to the side.'], 'f'] : null;
  }
  if (m === 'adductors') return [['الفخذ بيقرّب ناحية الجسم.', 'The thigh moves in towards the body.'], 'f'];
  if (m === 'forearms') return /reverse|extension/.test(n) ? [['الرسغ بيتفرد لورا.', 'The wrist bends back.'], 's'] : [['الرسغ بيتثني.', 'The wrist bends.'], 's'];
  if (m === 'traps' && /shrug/.test(n)) return [['الكتف بيترفع لفوق.', 'The shoulder lifts upward.'], 'f'];
  if (m === 'abdominals') return [['الجذع بيتثني لقدام.', 'The trunk bends forward.'], 's'];
  if (m === 'neck') return [['الرقبة بتشتغل في اتجاه واحد أو ثابتة.', 'The neck works in one direction or holds still.'], 's'];
  return null;
}

const FREE = ['barbell', 'dumbbell', 'kettlebells', 'plate', 'e-z curl bar', 'medicine ball', 'sandbag', 'weight vest'];

function resistance(ex, pattern) {
  const e = (ex && ex.equipment) || '';
  if (FREE.indexOf(e) !== -1) return ['الوزن بيشد لتحت دايمًا، فالصعوبة بتزيد كل ما الوزن يبعد أفقيًا عن المفصل.', 'The weight always pulls straight down, so it gets harder the further it is horizontally from the joint.'];
  if (e === 'cable') return ['الكابل بيشد في اتجاهه هو، وأصعب نقطة لما الكابل يبقى عمودي على الجزء اللي بيتحرك. غيّر ارتفاع البكرة عشان تختار مكان الصعوبة.', 'The cable pulls along its own line, and it is hardest when the cable is perpendicular to the moving limb. Change the pulley height to choose where it is hardest.'];
  if (e === 'bands' || e === 'mini band') return ['الأستك بيتقل كل ما يتمط، فالحركة بتبقى أصعب في آخرها.', 'The band gets heavier as it stretches, so the movement is hardest at the end.'];
  if (e === 'machine' || e === 'smith machine') return ['الجهاز بيحدد مسار الحركة، فبتحتاج اتزان أقل وتقدر تركّز على العضلة. منحنى الصعوبة بيعتمد على تصميم الجهاز.', 'The machine sets the path, so you need less balance and can focus on the muscle. The resistance curve depends on the machine design.'];
  if (e === 'body only' || e === 'pullup bar' || e === 'wall' || e === 'bench' || e === 'box' || e === 'step') {
    if (pattern === 'jump' || pattern === 'sprint') return ['وزن جسمك هو المقاومة، والصعوبة جاية من السرعة وقوة الصدمة.', 'Your body weight is the resistance; the challenge comes from speed and impact.'];
    return ['وزن جسمك هو المقاومة. صعّبها بتغيير زاوية الجسم، أو رجل/إيد واحدة، أو نزول أبطأ.', 'Your body weight is the resistance. Make it harder by changing body angle, using one limb, or lowering more slowly.'];
  }
  return null;
}

function hardPoint(ex, pattern) {
  const n0 = nameEn(ex);
  const e0 = (ex && ex.equipment) || '';
  if (/hip thrust|glute bridge/.test(n0)) return ['فوق، لما الحوض يتفرد على الآخر.', 'At the top, with the hips fully extended.'];
  if (/back extension|hyperextension/.test(n0)) return ['فوق، لما الجذع يبقى موازي للأرض.', 'At the top, when the trunk is parallel to the floor.'];
  if (/step-?up|leg press|hack|swing|good morning|sissy/.test(n0) || e0 === 'machine' || e0 === 'smith machine') {
    if (pattern !== 'isolation') return null;
  }
  const topic = TOPIC_BY_PATTERN[pattern];
  if (topic && pattern !== 'isolation') {
    const t = BIOMECH.topics.find((x) => x.id === topic);
    if (t && t.hard && ['squat', 'hinge', 'lunge', 'hpush', 'vpush', 'hpull', 'vpull'].indexOf(topic) !== -1) return t.hard;
  }
  if (pattern !== 'isolation') return null;
  const e = (ex && ex.equipment) || '';
  const n = nameEn(ex);
  const pm = ((ex && ex.primaryMuscles) || [])[0] || '';
  if (/shrug|calf|raise.*toe|tibialis/.test(n) || ['calves', 'abdominals', 'neck', 'traps', 'lower back'].indexOf(pm) !== -1) return null;
  if (FREE.indexOf(e) !== -1 || e === 'body only') {
    if (/hip thrust|glute bridge/.test(n)) return ['فوق، لما الحوض يتفرد على الآخر.', 'At the top, with the hips fully extended.'];
    if (/preacher/.test(n)) return ['تحت، قرب ما الكوع يتفرد (العضلة مشدودة).', 'Near the bottom, as the elbow straightens (muscle stretched).'];
    if (/fly|flye/.test(n)) return ['تحت، والدراعين مفتوحين على الآخر.', 'At the bottom, with the arms wide.'];
    return ['لما الجزء اللي بيتحرك (الدراع أو الساعد أو الرجل) يبقى موازي للأرض، لأن الوزن هنا في أبعد مسافة أفقية عن المفصل.', 'When the moving limb (arm, forearm or leg) is parallel to the floor, because the weight is then furthest horizontally from the joint.'];
  }
  if (e === 'cable') return ['لما الكابل يبقى عمودي على الجزء اللي بيتحرك.', 'When the cable is perpendicular to the moving limb.'];
  if (e === 'bands' || e === 'mini band') return ['آخر الحركة، لما الأستك يتمط على الآخر.', 'At the end, when the band is most stretched.'];
  return null;
}

function chain(ex, pattern) {
  const n = nameEn(ex);
  if (/push-?up|pull-?up|chin-?up|\bdips?\b|plank|inverted row|leg press|crawl/.test(n)) return 'closed';
  if (['squat', 'hinge', 'lunge', 'jump', 'sprint', 'locomotion', 'gait', 'crawl', 'carry', 'anti_extension', 'anti_lateral'].indexOf(pattern) !== -1) return 'closed';
  if (pattern === 'isolation' || pattern === 'horizontal_pull' || pattern === 'vertical_push' || pattern === 'horizontal_push') return 'open';
  return '';
}

export const CHAIN_NAMES = { open: ['سلسلة مفتوحة', 'Open chain'], closed: ['سلسلة مقفولة', 'Closed chain'] };

export function exerciseBiomech(ex) {
  if (!ex || ex._rehab) return null;
  const pattern = inferPattern(ex);
  if (!pattern || pattern === 'stretch' || pattern === 'mobility') return null;
  const act = ACTION_BY_PATTERN[pattern] || (pattern === 'isolation' ? isolationAction(ex) : null);
  const key = ((ex.primaryMuscles || [])[0]) || '';
  let muscle = MUSCLE_BY_KEY[key] || '';
  if (key === 'calves' && /seated|bent-knee|soleus/.test(nameEn(ex))) muscle = 'soleus';
  if (key === 'calves' && /tibialis|toe raise/.test(nameEn(ex))) muscle = 'tib_ant';
  const loads = [];
  BIOMECH_MUSCLES.forEach((m) => {
    if ((m.exL || []).indexOf(ex.id) !== -1) loads.push({ muscle: m.id, t: m.t, how: 'long' });
    if ((m.exS || []).indexOf(ex.id) !== -1) loads.push({ muscle: m.id, t: m.t, how: 'short' });
  });
  let plane = act ? PLANES[act[1]] : null;
  if (pattern === 'vertical_pull' && /chin|underhand|neutral|close|pulldown.*v-bar/.test(nameEn(ex))) plane = PLANES.s;
  const out = {
    pattern,
    patternName: PATTERN_NAMES[pattern] || null,
    topic: TOPIC_BY_PATTERN[pattern] || '',
    muscle,
    muscleName: (BIOMECH_MUSCLES.find((m) => m.id === muscle) || {}).t || null,
    chain: chain(ex, pattern),
    action: act ? act[0] : null,
    plane,
    resist: resistance(ex, pattern),
    hard: hardPoint(ex, pattern),
    loads
  };
  if (!out.action && !out.resist && !out.hard && !out.topic && !out.muscle) return null;
  return out;
}

/* صفحة الحركة في مكتبة البيوميكانيك بتعرض كل التمارين اللي من النمط ده */
export function topicOf(ex) {
  return TOPIC_BY_PATTERN[inferPattern(ex)] || '';
}
