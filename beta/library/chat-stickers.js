/*
 * استيكرات ADAM + قايمة الإيموجي بتاعة الشات
 * ============================================
 * الاستيكرات مرسومة هنا بالكود (SVG) — مفيش صور بتتحمّل، فالشات
 * بيفضل خفيف. الرسالة بتتحفظ بـ id الاستيكر بس، والكلمة اللي عليه
 * بتتكتب بلغة اللي بيقرا (العميل العربي يشوف «عاش!» والإنجليزي «Beast!»)
 */

const C = {
  green: ['#3df08a', '#12b85a'],
  amber: ['#ffc94a', '#ff9500'],
  red: ['#ff7a7f', '#e8363d'],
  blue: ['#5cc2ff', '#1f7ae0'],
  violet: ['#b58cff', '#7141e0'],
  teal: ['#4fe3d2', '#0ea5a0'],
  night: ['#4a5fa8', '#1d2a5c'],
  pink: ['#ff8cc6', '#e64b95']
};

/* كل أيقونة مرسومة في مساحة ١٢٠×١٢٠ وسطها تقريبًا عند (٦٠، ٥٠) */
const ART = {
  flex: '<path d="M30 64h46" stroke="#fff" stroke-width="20" stroke-linecap="round"/><ellipse cx="49" cy="53" rx="17" ry="13" fill="#fff"/><path d="M77 64l-4-28" stroke="#fff" stroke-width="18" stroke-linecap="round"/><circle cx="72" cy="28" r="12" fill="#fff"/><path d="M60 61c4-3 8-4 12-3" stroke="#12b85a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M65 24h11M65 30h11" stroke="#12b85a" stroke-width="2.6" stroke-linecap="round"/>',
  fire: '<path d="M60 18c4 12 18 20 18 38a18 18 0 0 1-36 0c0-8 4-13 8-17 0 6 3 10 7 11-2-12 1-24 3-32z" fill="#fff"/><path d="M60 50c3 6 9 9 9 16a9 9 0 0 1-18 0c0-5 4-9 9-16z" fill="#ffb020"/>',
  check: '<path d="M36 52l15 15 33-33" stroke="#fff" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  trophy: '<path d="M42 22h36v14c0 12-8 21-18 21s-18-9-18-21z" fill="#fff"/><path d="M42 28H31c0 11 5 17 13 18M78 28h11c0 11-5 17-13 18" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="55" y="56" width="10" height="10" fill="#fff"/><rect x="45" y="66" width="30" height="8" rx="3" fill="#fff"/><path d="M60 29l2.6 5.4 5.9.8-4.3 4.1 1 5.8L60 42.3l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z" fill="#ff9500"/>',
  drop: '<path d="M60 16c11 14 22 26 22 40a22 22 0 0 1-44 0c0-14 11-26 22-40z" fill="#fff"/><path d="M50 58a10 10 0 0 0 10 10" stroke="#1f7ae0" stroke-width="4" fill="none" stroke-linecap="round"/>',
  moon: '<path d="M68 20a28 28 0 1 0 22 42A24 24 0 0 1 68 20z" fill="#fff"/><path d="M78 26h9l-9 10h9M90 40h6l-6 7h6" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  dumbbell: '<g transform="rotate(-24 60 48)"><rect x="24" y="36" width="9" height="24" rx="3" fill="#fff"/><rect x="34" y="31" width="9" height="34" rx="3" fill="#fff"/><rect x="77" y="31" width="9" height="34" rx="3" fill="#fff"/><rect x="87" y="36" width="9" height="24" rx="3" fill="#fff"/><rect x="43" y="44" width="34" height="8" rx="3" fill="#fff"/></g>',
  medal: '<path d="M44 14h12l8 20H52zM76 14H64l-8 20h12z" fill="#fff" opacity=".85"/><circle cx="60" cy="52" r="20" fill="#fff"/><circle cx="60" cy="52" r="13" fill="none" stroke="#ff9500" stroke-width="3"/><text x="60" y="58" text-anchor="middle" font-family="Cairo, Arial, sans-serif" font-weight="800" font-size="15" fill="#ff9500">PR</text>',
  heart: '<path d="M60 76S30 58 30 38a15 15 0 0 1 30-4 15 15 0 0 1 30 4c0 20-30 38-30 38z" fill="#fff"/><path d="M42 36a7 7 0 0 1 8-5" stroke="#e8363d" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".5"/>',
  clock: '<circle cx="60" cy="48" r="28" fill="#fff"/><path d="M60 32v17l11 7" stroke="#7141e0" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  burst: '<path d="M60 16l7 18 19-6-9 17 17 10-19 4 3 20-18-10-18 10 3-20-19-4 17-10-9-17 19 6z" fill="#fff"/><circle cx="60" cy="47" r="8" fill="#e64b95"/>',
  sun: '<circle cx="60" cy="48" r="15" fill="#fff"/><g stroke="#fff" stroke-width="5" stroke-linecap="round"><line x1="60" y1="18" x2="60" y2="25"/><line x1="60" y1="71" x2="60" y2="78"/><line x1="30" y1="48" x2="37" y2="48"/><line x1="83" y1="48" x2="90" y2="48"/><line x1="39" y1="27" x2="44" y2="32"/><line x1="76" y1="64" x2="81" y2="69"/><line x1="81" y1="27" x2="76" y2="32"/><line x1="44" y1="64" x2="39" y2="69"/></g>',
  target: '<circle cx="60" cy="48" r="28" fill="#fff"/><circle cx="60" cy="48" r="18" fill="none" stroke="#e8363d" stroke-width="5"/><circle cx="60" cy="48" r="7" fill="#e8363d"/><path d="M60 48l24-24M78 22h8v8" stroke="#0b1f14" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  rest: '<circle cx="60" cy="48" r="28" fill="#fff"/><rect x="49" y="35" width="8" height="26" rx="3" fill="#0ea5a0"/><rect x="63" y="35" width="8" height="26" rx="3" fill="#0ea5a0"/>',
  apple: '<path d="M60 36c-6-5-24-4-24 16 0 14 10 26 17 26 3 0 4-2 7-2s4 2 7 2c7 0 17-12 17-26 0-20-18-21-24-16z" fill="#fff"/><path d="M60 36c0-6 2-12 8-15" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M64 26c5-6 13-6 15-3-3 5-10 7-15 3z" fill="#fff"/>',
  up: '<path d="M28 68l20-20 12 12 26-28" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M72 28h16v16" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  help: '<circle cx="60" cy="48" r="28" fill="#fff"/><path d="M50 40a10 10 0 1 1 14 9c-3 2-4 4-4 7" stroke="#1d2a5c" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="60" cy="65" r="3.8" fill="#1d2a5c"/>'
};

export const STICKERS = [
  { id: 'beast', art: 'flex', color: 'green', ar: 'عاش!', en: 'Beast!' },
  { id: 'fire', art: 'fire', color: 'red', ar: 'مولّع', en: 'On fire' },
  { id: 'done', art: 'check', color: 'green', ar: 'تمام', en: 'Done' },
  { id: 'champ', art: 'trophy', color: 'amber', ar: 'بطل', en: 'Champ' },
  { id: 'pr', art: 'medal', color: 'amber', ar: 'رقم جديد', en: 'New PR' },
  { id: 'train', art: 'dumbbell', color: 'violet', ar: 'يلا تمرين', en: 'Let\'s train' },
  { id: 'water', art: 'drop', color: 'blue', ar: 'اشرب مية', en: 'Hydrate' },
  { id: 'eat', art: 'apple', color: 'red', ar: 'كُل صح', en: 'Eat clean' },
  { id: 'sleep', art: 'moon', color: 'night', ar: 'نام بدري', en: 'Sleep early' },
  { id: 'rest', art: 'rest', color: 'teal', ar: 'يوم راحة', en: 'Rest day' },
  { id: 'focus', art: 'target', color: 'red', ar: 'ركّز', en: 'Focus' },
  { id: 'up', art: 'up', color: 'teal', ar: 'بتتقدّم', en: 'Leveling up' },
  { id: 'bravo', art: 'burst', color: 'pink', ar: 'برافو', en: 'Bravo' },
  { id: 'love', art: 'heart', color: 'pink', ar: 'من القلب', en: 'Love it' },
  { id: 'morning', art: 'sun', color: 'amber', ar: 'صباح الفل', en: 'Good morning' },
  { id: 'wait', art: 'clock', color: 'violet', ar: 'مستنيك', en: 'Waiting' },
  { id: 'help', art: 'help', color: 'night', ar: 'محتاج مساعدة؟', en: 'Need help?' }
];

let stickerSeq = 0;

export function stickerById(id) {
  return STICKERS.filter(function (s) { return s.id === id; })[0] || null;
}

/* بيرجّع SVG جاهز. اللغة بتحدد الكلمة اللي على الاستيكر */
export function stickerSvg(id, lang) {
  const s = stickerById(id);
  if (!s) return '';
  const col = C[s.color] || C.green;
  const gid = 'stk' + (++stickerSeq);
  const label = String((lang === 'en' ? s.en : s.ar) || '').replace(/[<>&]/g, '');
  const size = label.length > 11 ? 11 : (label.length > 8 ? 12.5 : 14.5);
  const rtl = lang !== 'en';
  return '<svg class="sticker-svg" viewBox="0 0 120 120" role="img" aria-label="' + label + '">'
    + '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1">'
    + '<stop offset="0" stop-color="' + col[0] + '"/><stop offset="1" stop-color="' + col[1] + '"/></linearGradient></defs>'
    /* ظل خفيف + حافة بيضا زي الاستيكر المقصوص */
    + '<circle cx="61" cy="51" r="46" fill="rgba(0,0,0,.18)"/>'
    + '<circle cx="60" cy="49" r="46" fill="#fff"/>'
    + '<circle cx="60" cy="49" r="40" fill="url(#' + gid + ')"/>'
    + '<path d="M30 32a36 36 0 0 1 22-15" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".45"/>'
    + ART[s.art]
    + '<rect x="16" y="86" width="88" height="26" rx="13" fill="#0b1f14" stroke="#fff" stroke-width="3"/>'
    + '<text x="60" y="' + (size > 13 ? 104 : 103) + '" text-anchor="middle"' + (rtl ? ' direction="rtl" unicode-bidi="plaintext"' : '') + ' font-family="Cairo, Arial, sans-serif" font-weight="800" font-size="' + size + '" fill="#fff">' + label + '</text>'
    + '</svg>';
}

/* الإيموجي — مجموعات قليلة ومفيدة بدل كيبورد كامل */
export const EMOJI_GROUPS = [
  { key: 'faces', icon: '😀', list: ['😀', '😁', '😂', '🤣', '😊', '😍', '🥰', '😘', '😎', '🤩', '🥳', '😇', '🙂', '😉', '😌', '🤔', '🤗', '🫡', '😅', '😬', '😴', '🥱', '😮‍💨', '🥵', '🥶', '😤', '😢', '😭', '😡', '🤒', '🤕', '😷'] },
  { key: 'hands', icon: '👍', list: ['👍', '👎', '👏', '🙌', '🙏', '💪', '🤝', '👊', '✊', '🤞', '✌️', '👌', '🤙', '👋', '☝️', '🫶'] },
  { key: 'sport', icon: '🏋️', list: ['🏋️', '🏃', '🚴', '🏊', '🧘', '🤸', '⚽', '🏀', '🎾', '🥊', '🏆', '🥇', '🎯', '⏱️', '🔥', '⚡', '💯', '🚀', '📈', '👟'] },
  { key: 'food', icon: '🥗', list: ['🥗', '🍎', '🍌', '🥑', '🥚', '🍗', '🐟', '🥩', '🍚', '🥛', '💧', '☕', '🍵', '🥤', '🍫', '🍕'] },
  { key: 'hearts', icon: '❤️', list: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '💖', '✨', '⭐', '🌟', '🎉', '✅', '❗', '❓', '💤'] }
];
