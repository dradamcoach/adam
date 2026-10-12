/*
 * ADAM — أيقونات الأغذية (SVG أصلية) + تفاصيل كل صنف
 * كل الأيقونات مرسومة بالكود (مفيش صور من النت). الأرقام اللي مش في المكتبة
 * (ألياف / سكر / صوديوم / مؤشر جلايسيمي / فيتامينات / طريقة التحضير / أنسب وقت)
 * تقديرية حسب نوع الصنف — راجعها مع أخصائي التغذية قبل ما تتنشر للعملاء.
 */

const SH = '<ellipse cx="60" cy="110" rx="34" ry="4.5" fill="#000" opacity=".28"/>';
const HL = (d) => '<path d="' + d + '" stroke="#fff" stroke-opacity=".5" stroke-width="4" fill="none" stroke-linecap="round"/>';
const STEAM = '<path d="M48 16c-3-4 3-6 0-11M62 16c-3-4 3-6 0-11M76 16c-3-4 3-6 0-11" stroke="#b9c8d8" stroke-opacity=".75" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
const BOWL = (c) => '<path d="M14 64h92c0 28-20 44-46 44S14 92 14 64z" fill="' + c + '"/><path d="M20 70c8 14 22 20 40 20s32-6 40-20" stroke="#fff" stroke-opacity=".18" stroke-width="3" fill="none"/>';

/* كل نوع = دالة بترجع جسم الـ SVG (a = اللون الأساسي، b = اللون الثانوي) */
const ART = {
  chicken: (a, b) => SH + '<path d="M70 14c24-3 42 12 40 36-2 20-18 32-36 34L60 96c-5 7-14 9-20 4s-5-14 2-19l14-13C50 44 58 18 70 14z" fill="' + a + '"/><path d="M92 28c10 8 12 22 6 34" stroke="' + b + '" stroke-opacity=".55" stroke-width="5" fill="none" stroke-linecap="round"/><g fill="' + b + '" opacity=".5"><circle cx="82" cy="36" r="2.3"/><circle cx="94" cy="48" r="2"/><circle cx="78" cy="52" r="2"/><circle cx="88" cy="62" r="1.8"/></g>' + HL('M66 22c8-3 16-1 22 4') + '<path d="M44 86l-12 13c-5 0-9-4-9-9 0-5 4-9 9-9z" fill="#f7efe0"/><circle cx="26" cy="100" r="8" fill="#f7efe0"/><circle cx="37" cy="106" r="7" fill="#efe4cf"/>',
  meat: (a, b) => SH + '<path d="M18 52c0-20 22-34 48-34 24 0 40 12 40 30 0 28-24 46-52 46-22 0-36-18-36-42z" fill="' + b + '"/><path d="M26 54c0-16 18-26 40-26 20 0 32 9 32 22 0 22-20 36-44 36-16 0-28-14-28-32z" fill="' + a + '"/><path d="M44 46c6-6 18-8 26-4M40 66c10 6 24 6 34-2" stroke="#fff" stroke-opacity=".35" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="82" cy="40" r="7" fill="#f5ead6"/><circle cx="82" cy="40" r="3" fill="#e6d3b0"/>',
  fish: (a, b) => SH + '<path d="M12 62c18-26 48-32 70-18l22-16c3 14 3 30 0 44L82 88C60 100 30 90 12 62z" fill="' + a + '"/><path d="M30 50c10-8 26-10 38-4" stroke="' + b + '" stroke-opacity=".5" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M40 78c8 4 22 4 32-2" stroke="' + b + '" stroke-opacity=".45" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="28" cy="58" r="4.5" fill="#fff"/><circle cx="27" cy="58" r="2.2" fill="#14202d"/><path d="M58 40v34M68 42v30" stroke="' + b + '" stroke-opacity=".35" stroke-width="2.4"/>',
  egg: (a, b) => SH + '<path d="M56 10c22 0 36 30 36 54 0 22-15 38-36 38S20 86 20 64c0-24 14-54 36-54z" fill="#fff6e4"/><path d="M40 36c4-9 10-15 17-17" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><g transform="translate(66 66)"><ellipse cx="24" cy="30" rx="27" ry="20" fill="#fff" stroke="#e6dcc8" stroke-width="1.5"/><circle cx="24" cy="30" r="10.5" fill="' + a + '"/><circle cx="21" cy="27" r="3.2" fill="#fff" opacity=".8"/></g>',
  bowl: (a, b) => SH + BOWL('#2f4a74') + '<path d="M20 64c4-28 22-42 40-42s36 14 40 42z" fill="' + a + '"/><g fill="' + b + '"><ellipse cx="44" cy="46" rx="5.5" ry="2.6" transform="rotate(-30 44 46)"/><ellipse cx="62" cy="34" rx="5.5" ry="2.6" transform="rotate(25 62 34)"/><ellipse cx="78" cy="48" rx="5.5" ry="2.6" transform="rotate(-12 78 48)"/><ellipse cx="56" cy="54" rx="5.5" ry="2.6" transform="rotate(18 56 54)"/><ellipse cx="38" cy="58" rx="5" ry="2.4"/><ellipse cx="86" cy="58" rx="5" ry="2.4"/></g>' + STEAM,
  pasta: (a, b) => SH + BOWL('#2f4a74') + '<path d="M20 64c4-24 22-36 40-36s36 12 40 36z" fill="' + a + '"/><g fill="none" stroke="' + b + '" stroke-width="3.2" stroke-linecap="round"><path d="M32 56c8-14 22-14 28-4s20 8 26-6"/><path d="M38 62c10-10 20-6 26 0s18 6 22-2"/><path d="M44 46c8-8 18-6 24 0"/></g><circle cx="52" cy="46" r="4" fill="#c9482a"/>' + STEAM,
  bread: (a, b) => SH + '<path d="M14 70c0-22 20-40 46-40s46 18 46 40c0 10-8 16-18 16H32c-10 0-18-6-18-16z" fill="' + a + '"/><path d="M26 66c6-14 18-20 34-20s28 6 34 20" stroke="' + b + '" stroke-opacity=".55" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M44 52l6 14M62 50l5 16M80 52l4 14" stroke="' + b + '" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>' + HL('M24 60c4-10 12-16 22-18'),
  toast: (a, b) => SH + '<path d="M26 32c-8-2-12-12-6-18 6-6 18-2 22 4h36c4-6 16-10 22-4 6 6 2 16-6 18v54c0 5-4 8-9 8H35c-5 0-9-3-9-8z" fill="' + b + '"/><rect x="34" y="38" width="52" height="60" rx="7" fill="' + a + '"/>' + HL('M42 48h20'),
  potato: (a, b) => SH + '<path d="M18 62c0-24 20-42 46-42 24 0 40 14 40 36 0 26-20 44-48 44-22 0-38-16-38-38z" fill="' + a + '"/><g fill="' + b + '" opacity=".6"><circle cx="44" cy="48" r="3"/><circle cx="72" cy="42" r="2.6"/><circle cx="82" cy="66" r="3"/><circle cx="56" cy="78" r="2.6"/><circle cx="36" cy="70" r="2.4"/></g>' + HL('M32 50c4-10 12-16 22-18'),
  beans: (a, b) => SH + BOWL('#6b4a2c') + '<path d="M20 64c4-24 22-34 40-34s36 10 40 34z" fill="' + b + '"/><g fill="' + a + '"><ellipse cx="42" cy="50" rx="6" ry="4" transform="rotate(-25 42 50)"/><ellipse cx="60" cy="42" rx="6" ry="4" transform="rotate(20 60 42)"/><ellipse cx="78" cy="52" rx="6" ry="4" transform="rotate(-10 78 52)"/><ellipse cx="54" cy="58" rx="6" ry="4"/><ellipse cx="34" cy="60" rx="5.5" ry="3.6"/><ellipse cx="88" cy="60" rx="5.5" ry="3.6"/></g>' + STEAM,
  milk: (a, b) => SH + '<path d="M30 18h60l-6 82c0 5-4 8-9 8H45c-5 0-9-3-9-8z" fill="#e9f1fa" stroke="#a9bdd4" stroke-width="3"/><path d="M34 44h52l-2 56c0 3-2 5-5 5H41c-3 0-5-2-5-5z" fill="' + a + '"/><ellipse cx="60" cy="44" rx="26" ry="4.5" fill="#fff" stroke="#a9bdd4" stroke-width="2"/><path d="M44 56v40" stroke="#fff" stroke-opacity=".7" stroke-width="5" stroke-linecap="round"/>',
  yogurt: (a, b) => SH + '<path d="M24 34h72l-8 68c-1 5-5 8-10 8H42c-5 0-9-3-10-8z" fill="#f2f6fb"/><path d="M26 44h68l-1 14H27z" fill="' + b + '"/><ellipse cx="60" cy="34" rx="36" ry="7" fill="' + a + '"/><ellipse cx="60" cy="33" rx="30" ry="4.5" fill="#fff" opacity=".8"/><path d="M62 26c6-8 16-8 20-4" stroke="' + b + '" stroke-width="3" fill="none" stroke-linecap="round"/>',
  cheese: (a, b) => SH + '<path d="M12 74L100 34c4 14 6 30 2 44c-2 8-8 14-16 14H24c-8 0-14-8-12-18z" fill="' + a + '"/><path d="M12 74L100 34l4 12L14 86z" fill="' + b + '" opacity=".5"/><g fill="' + b + '"><circle cx="40" cy="74" r="6"/><circle cx="66" cy="68" r="5"/><circle cx="82" cy="58" r="4"/><circle cx="54" cy="84" r="3.5"/></g>',
  fruit: (a, b) => SH + '<path d="M60 36c-12-10-40-8-44 18-4 26 14 52 34 52 6 0 8-3 10-3s4 3 10 3c20 0 38-26 34-52-4-26-32-28-44-18z" fill="' + a + '"/>' + HL('M30 56c0-10 6-16 14-18') + '<path d="M60 36c0-12 4-20 12-24" stroke="#6a4a1f" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M62 26c10-10 24-8 28 0-10 6-22 6-28 0z" fill="' + b + '"/>',
  banana: () => SH + '<path d="M44 20c-3 34 8 62 58 66-8 14-32 20-52 8C28 80 26 46 44 20z" fill="#e0a512"/><path d="M28 24c3 42 26 68 70 68-6 13-30 18-50 6C22 82 14 52 28 24z" fill="#f6c52a"/><path d="M28 24c-3-7-3-12 1-17 5 3 9 9 9 18z" fill="#6a4a1f"/><path d="M99 90c4 0 7 2 7 5s-3 5-7 4z" fill="#4a3216"/>' + HL('M36 40c4 26 22 44 46 50'),
  grapes: (a, b) => SH + '<g fill="' + a + '"><circle cx="40" cy="48" r="11"/><circle cx="62" cy="46" r="11"/><circle cx="84" cy="50" r="11"/><circle cx="50" cy="68" r="11"/><circle cx="74" cy="68" r="11"/><circle cx="62" cy="88" r="11"/></g><g fill="#fff" opacity=".4"><circle cx="37" cy="44" r="3"/><circle cx="59" cy="42" r="3"/><circle cx="81" cy="46" r="3"/><circle cx="47" cy="64" r="3"/><circle cx="71" cy="64" r="3"/></g><path d="M62 36c0-10 4-16 10-20" stroke="#6a4a1f" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M64 22c8-8 20-6 24 2-9 5-18 5-24-2z" fill="' + b + '"/>',
  melon: (a, b) => SH + '<path d="M10 54h100c0 32-22 54-50 54S10 86 10 54z" fill="' + b + '"/><path d="M16 54h88c0 28-20 46-44 46S16 82 16 54z" fill="' + a + '"/><g fill="#2a1a12"><ellipse cx="42" cy="66" rx="2.4" ry="4" transform="rotate(-20 42 66)"/><ellipse cx="60" cy="74" rx="2.4" ry="4"/><ellipse cx="78" cy="66" rx="2.4" ry="4" transform="rotate(20 78 66)"/><ellipse cx="52" cy="86" rx="2.2" ry="3.6"/><ellipse cx="70" cy="86" rx="2.2" ry="3.6"/></g>',
  leaf: (a, b) => SH + '<path d="M60 104C28 96 12 70 20 40c4-14 14-24 24-24 8 0 12 6 16 6s8-6 16-6c10 0 20 10 24 24 8 30-8 56-40 64z" fill="' + a + '"/><path d="M60 100V34M60 82c-10-4-18-12-22-22M60 70c10-4 16-10 20-18M60 56c-8-2-12-6-14-12" stroke="' + b + '" stroke-opacity=".7" stroke-width="3" fill="none" stroke-linecap="round"/>',
  longveg: (a, b) => SH + '<path d="M22 86L84 24c6-6 16-6 20 0s2 12-4 18L38 104c-6 6-14 6-18 2s-4-14 2-20z" fill="' + a + '"/>' + HL('M40 76L82 34') + '<circle cx="54" cy="68" r="2" fill="' + b + '"/><circle cx="68" cy="52" r="2" fill="' + b + '"/><circle cx="46" cy="84" r="2" fill="' + b + '"/>',
  carrot: (a, b) => SH + '<path d="M26 40c16-16 40-12 54 0L98 96c2 8-4 12-10 10L40 80C26 72 22 54 26 40z" fill="' + a + '" transform="rotate(-18 60 60)"/><path d="M80 34c4-14 14-22 24-22-2 12-10 22-24 22zM74 28c-6-12-16-14-24-12 2 10 12 18 24 12z" fill="' + b + '"/>' + '<path d="M44 58l10 3M52 72l10 3M62 84l8 3" stroke="#fff" stroke-opacity=".45" stroke-width="3" stroke-linecap="round"/>',
  nuts: (a, b) => SH + '<g fill="' + a + '"><ellipse cx="42" cy="64" rx="19" ry="26" transform="rotate(-30 42 64)"/><ellipse cx="76" cy="62" rx="19" ry="26" transform="rotate(25 76 62)"/><ellipse cx="60" cy="84" rx="17" ry="22" transform="rotate(8 60 84)"/></g><g stroke="' + b + '" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"><path d="M34 50c6 10 12 24 12 36"/><path d="M84 48c-6 10-10 24-8 36"/><path d="M60 70v26"/></g>',
  oil: (a, b) => SH + '<path d="M50 10h20v20c10 6 18 16 18 32v36c0 6-4 10-10 10H42c-6 0-10-4-10-10V62c0-16 8-26 18-32z" fill="' + a + '"/><rect x="50" y="6" width="20" height="10" rx="3" fill="' + b + '"/><rect x="38" y="54" width="44" height="30" rx="5" fill="#fff" opacity=".85"/><path d="M60 60c-5 6-6 10-2 14 4 3 9 0 8-5-1-4-4-6-6-9z" fill="' + a + '"/>' + HL('M40 40c0-8 4-12 8-14'),
  avocado: (a, b) => SH + '<path d="M60 8c-14 0-22 18-22 34 0 8-8 12-8 30 0 22 14 38 30 38s30-16 30-38c0-18-8-22-8-30C82 26 74 8 60 8z" fill="' + b + '"/><path d="M60 16c-10 0-17 14-17 28 0 8-8 12-8 28 0 18 11 30 25 30s25-12 25-30c0-16-8-20-8-28 0-14-7-28-17-28z" fill="' + a + '"/><circle cx="60" cy="76" r="14" fill="#7a4a24"/>' + HL('M52 70c2-4 6-6 10-6'),
  stew: (a, b) => SH + BOWL('#3a4d66') + '<path d="M20 64c4-22 22-32 40-32s36 10 40 32z" fill="' + a + '"/><g fill="' + b + '"><circle cx="44" cy="50" r="6"/><circle cx="64" cy="44" r="5"/><circle cx="80" cy="54" r="6"/><circle cx="56" cy="58" r="4.5"/></g><path d="M30 60c10-4 22-4 34 0" stroke="#fff" stroke-opacity=".2" stroke-width="3" fill="none"/>' + STEAM,
  soup: (a, b) => SH + BOWL('#3a4d66') + '<ellipse cx="60" cy="64" rx="42" ry="9" fill="' + a + '"/><ellipse cx="60" cy="62" rx="34" ry="6" fill="' + b + '" opacity=".5"/><circle cx="48" cy="62" r="3.2" fill="' + b + '"/><circle cx="68" cy="64" r="3" fill="' + b + '"/>' + STEAM,
  sandwich: (a, b) => SH + '<path d="M14 58c0-18 20-30 46-30s46 12 46 30z" fill="' + a + '"/><path d="M12 62h96c0 5-4 8-8 8H20c-4 0-8-3-8-8z" fill="' + b + '"/><path d="M14 70h92v8c0 8-8 14-18 14H32c-10 0-18-6-18-14z" fill="' + a + '"/><g fill="#fff" opacity=".6"><ellipse cx="38" cy="42" rx="3" ry="1.8"/><ellipse cx="60" cy="36" rx="3" ry="1.8"/><ellipse cx="82" cy="42" rx="3" ry="1.8"/></g><path d="M18 62c6 4 12-4 18 0s12-4 18 0 12-4 18 0 12-4 18 0" stroke="#5aa845" stroke-width="3.4" fill="none" stroke-linecap="round"/>',
  pizza: (a, b) => SH + '<path d="M14 24c30-14 62-14 92 0L60 104z" fill="' + b + '"/><path d="M20 30c26-10 54-10 80 0L60 96z" fill="' + a + '"/><g fill="#c9482a"><circle cx="46" cy="42" r="6"/><circle cx="72" cy="44" r="6"/><circle cx="60" cy="64" r="6"/></g><circle cx="58" cy="46" r="2.4" fill="#5aa845"/>',
  sweet: (a, b) => SH + '<path d="M14 84L60 28l46 56c0 8-6 14-14 14H28c-8 0-14-6-14-14z" fill="' + a + '"/><path d="M14 84L60 28l46 56" stroke="' + b + '" stroke-width="5" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="M26 70h68" stroke="' + b + '" stroke-opacity=".6" stroke-width="3.4"/><circle cx="60" cy="24" r="6" fill="#d94c3a"/>',
  cup: (a, b) => SH + '<path d="M22 44h64v32c0 16-12 28-32 28S22 92 22 76z" fill="#f4f7fb"/><path d="M26 50h56v24c0 14-10 24-28 24S26 88 26 74z" fill="' + a + '"/><path d="M86 52h8c8 0 12 6 12 12s-4 12-12 12h-8" stroke="#f4f7fb" stroke-width="6" fill="none"/><ellipse cx="54" cy="104" rx="38" ry="4" fill="#dfe8f1"/>' + STEAM.replace(/M48 16/, 'M40 30').replace(/M62 16/, 'M54 30').replace(/M76 16/, 'M68 30').replace(/c-3-4 3-6 0-11/g, 'c-3-4 3-6 0-10'),
  glass: (a, b) => SH + '<path d="M30 24h60l-8 78c0 4-3 7-7 7H45c-4 0-7-3-7-7z" fill="#eaf2fa" opacity=".85" stroke="#a9bdd4" stroke-width="3"/><path d="M34 48h52l-6 54c0 3-2 5-5 5H45c-3 0-5-2-5-5z" fill="' + a + '"/><path d="M66 6l-4 40" stroke="' + b + '" stroke-width="5" stroke-linecap="round"/>' + HL('M44 60v34'),
  bottle: (a, b) => SH + '<path d="M50 8h20v14c8 4 14 10 14 20v58c0 6-4 10-10 10H46c-6 0-10-4-10-10V42c0-10 6-16 14-20z" fill="' + a + '"/><rect x="50" y="4" width="20" height="9" rx="3" fill="' + b + '"/><rect x="38" y="50" width="44" height="34" rx="6" fill="#fff" opacity=".88"/><path d="M46 62h28M46 72h20" stroke="' + a + '" stroke-width="3.5" stroke-linecap="round"/>' + HL('M42 36v14'),
  tub: (a, b) => SH + '<rect x="26" y="26" width="68" height="78" rx="12" fill="' + a + '"/><rect x="22" y="12" width="76" height="18" rx="7" fill="' + b + '"/><rect x="34" y="44" width="52" height="40" rx="7" fill="#fff" opacity=".9"/><path d="M42 58h36M42 68h24" stroke="' + a + '" stroke-width="4" stroke-linecap="round"/>' + HL('M32 38v56'),
  pill: (a, b) => SH + '<g transform="rotate(-35 60 60)"><rect x="14" y="40" width="92" height="40" rx="20" fill="' + b + '"/><path d="M60 40h26a20 20 0 0 1 0 40H60z" fill="' + a + '"/>' + HL('M26 50h28') + '</g>',
  jar: (a, b) => SH + '<rect x="26" y="24" width="68" height="14" rx="5" fill="' + b + '"/><path d="M30 38h60l4 14v44c0 8-6 12-14 12H40c-8 0-14-4-14-12V52z" fill="' + a + '"/><rect x="34" y="58" width="52" height="30" rx="5" fill="#fff" opacity=".85"/><path d="M42 70h36M42 78h24" stroke="' + b + '" stroke-width="3.5" stroke-linecap="round"/>',
  sugar: (a, b) => SH + '<path d="M20 100l10-52h60l10 52z" fill="' + a + '"/><path d="M34 48l4-18h44l4 18z" fill="' + b + '"/><g fill="#fff" opacity=".8"><circle cx="48" cy="70" r="2.4"/><circle cx="64" cy="64" r="2.4"/><circle cx="78" cy="76" r="2.4"/><circle cx="56" cy="86" r="2.4"/></g>',
  plate: (a, b) => SH + '<ellipse cx="60" cy="68" rx="48" ry="30" fill="#e6edf5"/><ellipse cx="60" cy="66" rx="38" ry="22" fill="#fff"/><circle cx="50" cy="62" r="10" fill="' + a + '"/><circle cx="72" cy="64" r="9" fill="' + b + '"/><circle cx="60" cy="74" r="6" fill="#5aa845"/>'
};

/* قواعد التوزيع: أول قاعدة بتطابق معرّف الصنف بتكسب */
const RULES = [
  [/^(fish_oil|energy_gel)$/, 'pill', '#f0b64a', '#e0833a'],
  [/^protein_bar$/, 'sweet', '#8a5a2c', '#4a2a14'],
  [/^(taameya)$/, 'potato', '#a86a2a', '#6a3d14'],
  [/(juice|coconut_water|^water$)/, 'glass', '#f4a63a', '#d94c3a'],
  [/^(hummus_sham|lemon_mint|tea_sugar|turkish_coffee)/, 'cup', '#a86a3a'],
  [/^(lentil_soup|foul_nabet|soup_)/, 'soup', '#d98a3a', '#f3e3b8'],
  [/^(pumpkin_seeds|chia|flax|sunflower_seeds|sesame)/, 'nuts', '#c9b27a', '#7a5a2c'],
  [/^(cream_whipping)/, 'yogurt', '#fbf7ee', '#e8a43a'],
  [/^(molokhia_leaves|taro_leaves)/, 'leaf', '#4f9a3a', '#2f7a2c'],
  [/^(chicken_(breast|thigh|whole|wings|pane$|liver)|chicken_grilled|turkey|chicken_pane_dish|fried_chicken|chicken_nuggets|shish_tawook|hamam|crispy_chicken)/, 'chicken', '#e0a24e', '#a45e1e'],
  [/(sinia_frakh|kabsa|freekeh_chicken|shorbet_firakh)/, 'stew', '#d98a3a', '#f3e3b8'],
  [/^(fish_singari|sayadeya)/, 'stew', '#d98a3a', '#f3e3b8'],
  [/^(fish_|cod|salmon|sardine|tuna|shrimp|calamari|feseekh|fish$)/, 'fish', '#7fa6c8', '#3f6a94'],
  [/^(shrimp_breaded)/, 'fish', '#e0a24e', '#a45e1e'],
  [/^(egg_|eggah|shakshouka)/, 'egg', '#ffb81f', '#fff'],
  [/(sausage|luncheon|basterma|sogo2|kofta|kabab|burger_patty|beef_|veal|lamb_|liver|rabbit|kawareh)/, 'meat', '#b8553a', '#e8c7a8'],
  [/^(shawarma|hawawshi|burger_sandwich|cheeseburger|taameya_sandwich|foul_sandwich|crepe|feteer_meat|manakish|sambousek)/, 'sandwich', '#e1b36b', '#c9482a'],
  [/^(pizza|feteer|goulash)/, 'pizza', '#f0b64a', '#d9a35a'],
  [/^(bread_toast|bread_shami|bread_tortilla|semit|croissant)/, 'toast', '#f0d8a8', '#c99a52'],
  [/^(bread_)/, 'bread', '#e0b878', '#a8763a'],
  [/(rice_cakes|popcorn|cornflakes|granola)/, 'bowl', '#f0dca8', '#c99a52'],
  [/^(oats|oat_)/, 'bowl', '#e8dcc0', '#b89a6a'],
  [/(rice_white|rice_koshari|roz_|rice_brown|rice_pudding|couscous|bulgur|freekeh$|quinoa|barley|mujaddara)/, 'bowl', '#f1ece0', '#cfc6b0'],
  [/^(pasta|macaroni|macarona|bechamel)/, 'pasta', '#f1d68a', '#d9b45a'],
  [/(^potato|sweet_potato|yam|taro$|fries|mesa2aa|potato_chips)/, 'potato', '#d9a864', '#8a5a28'],
  [/(lentil|chickpea|fava|foul|white_beans|kidney|lupini|besara|hummus|fasolia|bisella|peas)/, 'beans', '#d8b37a', '#8a5a28'],
  [/^(corn)/, 'fruit', '#f4c542', '#5aa845'],
  [/^(koshari|kolkas|torly|veg_|bamya|moussaka|mahshi|warak|molokhia|sabanekh|kofta_dawood|goulash|fattah|bisella)/, 'stew', '#b8553a', '#f3d38a'],
  [/(soup|shorbet|shorba|foul_nabet|belila|khoshaf)/, 'soup', '#d98a3a', '#f3e3b8'],
  [/(salata|tabbouleh|fattoush|baba)/, 'plate', '#d94c3a', '#5aa845'],
  [/(milk_chocolate|banana_milk|ayran|laban_rayeb|milk_)/, 'milk', '#fbfdff', '#fff'],
  [/(yogurt|labneh|zabadi|mish|eshta|mahalabeya|creme_caramel)/, 'yogurt', '#fbf7ee', '#e8a43a'],
  [/(cheese|jibna)/, 'cheese', '#f6d56a', '#d9b43a'],
  [/^banana/, 'banana'],
  [/(grapes|raisins|mulberry|cherries|strawberry|figs|dried_figs)/, 'grapes', '#7a3d8a', '#5aa845'],
  [/(watermelon|cantaloupe|melon|persimmon)/, 'melon', '#ee5a5a', '#5aa845'],
  [/(orange|tangerine|apricot|peach|mango|guava|pomegranate|apple|pear|plum|kiwi|pineapple|grapefruit|lemon|prickly|dates|prunes|dried_apricot)/, 'fruit', '#f08a2a', '#5aa845'],
  [/^(cucumber|zucchini|green_beans|okra|eggplant|pepper|artichoke|radish|green_onion|turnip)/, 'longveg', '#5aa845', '#2f7a2c'],
  [/^(carrot|pumpkin|beetroot)/, 'carrot', '#ee8a2a', '#4f9a3a'],
  [/^(tomato|onion|garlic|mushroom)/, 'fruit', '#e0483a', '#4f9a3a'],
  [/(lettuce|spinach|arugula|cabbage|cauliflower|broccoli|parsley|coriander|chard|molokhia_leaves|taro_leaves|fava_green)/, 'leaf', '#5aa845', '#2f7a2c'],
  [/(avocado)/, 'avocado', '#9ac24a', '#3f6a2a'],
  [/(oil|ghee|butter$|mayonnaise|toum)/, 'oil', '#e8c24a', '#7a5a1c'],
  [/(almond|walnut|peanut|hazelnut|cashew|pistachio|seeds|sesame|coconut|nuts|lebb|tahina|olives)/, 'nuts', '#c99a62', '#7a5a2c'],
  [/(spread|nutella|halawa|basbousa|konafa|baklava|om_ali|kahk|qatayef|luqmet|chocolate|biscuits|ice_cream|molasses|honey|sugar$)/, 'sweet', '#d9a35a', '#7a4a1c'],
  [/(whey|casein|gainer|plant_protein|creatine|bcaa)/, 'tub', '#2f6fb0', '#16202a'],
  [/(fish_oil|energy_gel|protein_bar)/, 'pill', '#f0b64a', '#e0833a'],
  [/(tea|coffee|nescafe|cappuccino|latte|karkade|yansoon|sahlab|sobia|erk_sous|kharoub|turkish|lemon_mint|tamarind)/, 'cup', '#a86a3a'],
  [/(juice|water|coconut_water)/, 'glass', '#f4a63a', '#d94c3a'],
  [/(soft_drink|energy_drink|sports_drink|hummus_sham)/, 'bottle', '#d94c3a', '#16202a']
];
const CAT_KIND = { protein: ['meat', '#b8553a', '#e8c7a8'], carb: ['bowl', '#f1ece0', '#cfc6b0'], dairy: ['milk', '#fbfdff', '#fff'], fruit: ['fruit', '#f08a2a', '#5aa845'], veg: ['leaf', '#5aa845', '#2f7a2c'], fat: ['nuts', '#c99a62', '#7a5a2c'], dish: ['stew', '#b8553a', '#f3d38a'], drink: ['glass', '#f4a63a', '#d94c3a'], supplement: ['tub', '#2f6fb0', '#16202a'] };
const SUGAR_ID = /^(sugar|honey|molasses)$/;
const TEA_ID = /^(tea_|green_tea|karkade|yansoon)/;

const COLOR_BY_ID = {
  apple: ['#d94c3a', '#5aa845'], orange: ['#f08a2a', '#5aa845'], tangerine: ['#f29a2a', '#5aa845'], lemon: ['#f2d83a', '#5aa845'], mango: ['#f4a63a', '#5aa845'], peach: ['#f4a07a', '#5aa845'],
  apricot: ['#f4b45a', '#5aa845'], plum: ['#8a3d6a', '#5aa845'], pear: ['#b5c24a', '#5aa845'], kiwi: ['#7ab03a', '#5aa845'], pomegranate: ['#c0392b', '#5aa845'], guava: ['#e8d870', '#5aa845'],
  dates: ['#6a3d1c', '#5aa845'], prunes: ['#4a2a3c', '#5aa845'], strawberry: ['#e0384a', '#5aa845'], cherries: ['#b01a3a', '#5aa845'], tomato: ['#e0483a', '#4f9a3a'], onion: ['#c98ab0', '#4f9a3a'],
  garlic: ['#f1ece0', '#4f9a3a'], mushroom: ['#c9a888', '#8a6a4a'], pineapple: ['#f4c542', '#5aa845'], grapefruit: ['#f08a6a', '#5aa845'], carrot: ['#ee8a2a', '#4f9a3a'], beetroot: ['#8a1a4a', '#4f9a3a'],
  pumpkin: ['#e8872a', '#4f9a3a'], cucumber: ['#4f9a3a', '#2f7a2c'], zucchini: ['#7ab03a', '#2f7a2c'], eggplant: ['#5a2a6a', '#4f9a3a'], okra: ['#6ab03a', '#2f7a2c'], green_beans: ['#6ab03a', '#2f7a2c'],
  pepper_green: ['#4f9a3a', '#2f7a2c'], pepper_colored: ['#e8483a', '#4f9a3a'], watermelon: ['#ee5a5a', '#5aa845'], cantaloupe: ['#f4a85a', '#8fbf5a'], melon_shamam: ['#f4c87a', '#8fbf5a'], persimmon: ['#f08a2a', '#5aa845']
};

export function foodKind(food) {
  const id = String(food.id || '');
  for (let i = 0; i < RULES.length; i++) {
    if (RULES[i][0].test(id)) {
      const col = COLOR_BY_ID[id];
      return { kind: RULES[i][1], a: col ? col[0] : RULES[i][2], b: col ? col[1] : RULES[i][3] };
    }
  }
  const c = CAT_KIND[food.cat] || ['plate', '#d94c3a', '#5aa845'];
  return { kind: c[0], a: c[1], b: c[2] };
}

export function foodArt(food) {
  const k = foodKind(food);
  let a = k.a, b = k.b;
  if (k.kind === 'cup' && TEA_ID.test(String(food.id))) a = /karkade/.test(food.id) ? '#b01a3a' : /green/.test(food.id) ? '#9ac24a' : '#c98a3a';
  if (SUGAR_ID.test(String(food.id)) && /honey/.test(food.id)) return '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + ART.jar('#e8a43a', '#7a4a1c') + '</svg>';
  if (SUGAR_ID.test(String(food.id)) && /sugar/.test(food.id)) return '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + ART.sugar('#f4f7fb', '#cfd8e3') + '</svg>';
  const fn = ART[k.kind] || ART.plate;
  return '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + fn(a, b) + '</svg>';
}

/* ---------------------------------------------------------------------------
 * تفاصيل حسب النوع — لكل 100 جرام تقريبًا
 * [ألياف جم، سكر جم، صوديوم ملجم، مؤشر جلايسيمي (أو null)، فيتامينات عربي، فيتامينات إنجليزي،
 *  خطوات عربي، خطوات إنجليزي، أنسب وقت عربي، أنسب وقت إنجليزي]
 * ------------------------------------------------------------------------- */
const D = {
  chicken: [0, 0, 75, null, 'ب3، ب6، فوسفور، سيلينيوم', 'B3, B6, phosphorus, selenium', ['تتبّل بملح وفلفل وليمون وتوم، وساعة في التلاجة لو تقدر.', 'تتشوى أو تتسلق أو تتعمل في الفرن بملعقة زيت صغيرة بس.', 'تتأكد إنها استوت من جوه (مفيش لون وردي)، وتتقدم مع سلطة أو خضار.'], ['Season with salt, pepper, lemon and garlic; rest in the fridge for an hour if possible.', 'Grill, boil or bake with only a teaspoon of oil.', 'Make sure it is cooked through (no pink), then serve with salad or vegetables.'], 'الغدا أو بعد التمرين بساعتين', 'Lunch, or within two hours after training'],
  meat: [0, 0, 80, null, 'ب12، حديد، زنك، ب3', 'B12, iron, zinc, B3', ['تتبّل بالبصل والتوم والبهارات وساعة على الأقل.', 'تتشوى أو تتسوّى على نار هادية وبدون زيت كتير عشان تفضل طرية.', 'ترتاح 5 دقايق قبل التقطيع، وتتاكل مع خضار مش مع نشويات تقيلة.'], ['Marinate with onion, garlic and spices for at least an hour.', 'Grill or cook on gentle heat with little oil to keep it tender.', 'Rest 5 minutes before slicing; serve with vegetables rather than heavy starches.'], 'الغدا، ومش قبل النوم مباشرة', 'Lunch, not right before bed'],
  fish: [0, 0, 90, null, 'د، ب12، يود، أوميجا 3', 'D, B12, iodine, omega-3', ['تتنضف وتتتبّل بليمون وكمون وتوم.', 'تتشوى أو تتعمل في الفرن (يفضّل من غير قلي).', 'تتقدم مع سلطة خضرا وشريحة ليمون.'], ['Clean and season with lemon, cumin and garlic.', 'Grill or bake (frying is best avoided).', 'Serve with a green salad and a lemon wedge.'], 'الغدا أو العشا، مرتين أو تلاتة في الأسبوع', 'Lunch or dinner, two to three times a week'],
  egg: [0, 0.4, 124, null, 'ب12، ب2، كولين، د', 'B12, B2, choline, D', ['تتسلق 8 إلى 10 دقايق للمسلوق المتماسك.', 'أو تتعمل أومليت بقليل زيت مع خضار.', 'تتاكل مع عيش أسمر أو خضار.'], ['Boil 8 to 10 minutes for a firm egg.', 'Or make an omelette with a little oil and vegetables.', 'Eat with whole-grain bread or vegetables.'], 'الفطار', 'Breakfast'],
  bowl: [1.5, 0.3, 5, 70, 'ب1، ب9، مغنيسيوم، حديد', 'B1, B9, magnesium, iron', ['تتغسل كويس وتتنقع 15 دقيقة لو ممكن.', 'تتسلق بضعف الكمية مية وشوية ملح، على نار هادية.', 'ترتاح 5 دقايق مغطّاة وبعدين تتفرط بالشوكة.'], ['Rinse well and soak for 15 minutes if possible.', 'Cook in about double the amount of water with a pinch of salt on low heat.', 'Rest covered for 5 minutes, then fluff with a fork.'], 'قبل التمرين بساعتين، أو الغدا', 'Two hours before training, or lunch'],
  pasta: [2.5, 2, 6, 50, 'ب1، ب3، حديد', 'B1, B3, iron', ['تتسلق في مية مغلية بملح حسب وقت العبوة (فيها لسه صلابة خفيفة).', 'تتصفّى، ويفضل ماتتغسلش.', 'تتخلط بصلصة طماطم أو خضار وقليل زيت.'], ['Boil in salted water according to the packet until slightly firm.', 'Drain; there is no need to rinse.', 'Toss with tomato sauce or vegetables and a little oil.'], 'قبل التمرين أو الغدا', 'Before training or lunch'],
  bread: [3, 1, 400, 70, 'ب1، ب3، حديد', 'B1, B3, iron', ['اختار الأسمر أو البلدي لو متاح.', 'تتسخّن على الطاسة من غير زيت.', 'تتاكل مع بروتين (فول، جبنة، بيض) وخضار.'], ['Choose whole-wheat or baladi when possible.', 'Warm on a dry pan with no oil.', 'Eat with protein (beans, cheese, egg) and vegetables.'], 'الفطار أو قبل التمرين', 'Breakfast or before training'],
  toast: [2.5, 4, 450, 72, 'ب1، ب3، حديد', 'B1, B3, iron', ['اختار توست القمح الكامل لو في.', 'يتحمّص من غير زبدة.', 'يتاكل مع بيض أو جبنة قريش.'], ['Choose whole-wheat toast when available.', 'Toast it without butter.', 'Eat with eggs or cottage cheese.'], 'الفطار', 'Breakfast'],
  potato: [2, 1, 6, 78, 'ج، ب6، بوتاسيوم', 'C, B6, potassium', ['تتغسل وتتقشر (أو سيب القشرة للألياف).', 'تتسلق أو تتعمل في الفرن بقليل زيت وتوابل.', 'تتبرّد شوية قبل الأكل — ده بيزود النشا المقاوم.'], ['Wash and peel (or keep the skin for fibre).', 'Boil or bake with a little oil and spices.', 'Let it cool slightly; it raises resistant starch.'], 'قبل التمرين أو بعده', 'Before or after training'],
  beans: [7, 1.5, 250, 30, 'ب9 (فوليك)، حديد، مغنيسيوم، بوتاسيوم', 'B9 (folate), iron, magnesium, potassium', ['تتنقع من الليل وتتصفّى.', 'تتسلق لحد ما تطرّى تمامًا.', 'تتبّل بليمون وكمون وقليل زيت زيتون.'], ['Soak overnight and drain.', 'Cook until completely tender.', 'Season with lemon, cumin and a little olive oil.'], 'الفطار أو الغدا', 'Breakfast or lunch'],
  milk: [0, 5, 45, 35, 'كالسيوم، ب2، ب12، د', 'Calcium, B2, B12, D', ['يتشرب سادة أو يتضاف على الشوفان.', 'لو تحس بانتفاخ جرّب الخالي من اللاكتوز.', 'اشربه ساقع أو دافي حسب الراحة.'], ['Drink plain or add to oats.', 'If it causes bloating, try lactose-free.', 'Serve cold or warm as you prefer.'], 'الفطار أو بعد التمرين', 'Breakfast or after training'],
  yogurt: [0, 4.5, 50, 35, 'كالسيوم، ب12، بروبيوتيك', 'Calcium, B12, probiotics', ['اختار السادة بدون سكر مضاف.', 'اتضيف فاكهة أو شوفان أو عسل خفيف.', 'يتحفظ في التلاجة ويتاكل ساقع.'], ['Choose plain, with no added sugar.', 'Add fruit, oats or a drizzle of honey.', 'Keep refrigerated and eat chilled.'], 'سناك أو الفطار', 'Snack or breakfast'],
  cheese: [0, 1, 500, null, 'كالسيوم، ب12، فوسفور', 'Calcium, B12, phosphorus', ['اختار الأقل ملح والأقل دسم.', 'اتنقع في مية لو مالحة جدًا.', 'اتاكل مع خضار أو عيش أسمر.'], ['Choose lower-salt, lower-fat options.', 'Soak in water if very salty.', 'Eat with vegetables or whole-grain bread.'], 'الفطار أو العشا', 'Breakfast or dinner'],
  fruit: [2.5, 10, 2, 45, 'ج، بوتاسيوم، مضادات أكسدة', 'C, potassium, antioxidants', ['اتغسل كويس.', 'اتاكل كاملة بقشرها لو يتاكل (الألياف).', 'الأحسن تتاكل كفاكهة مش عصير.'], ['Wash well.', 'Eat whole with the skin when edible (fibre).', 'Prefer whole fruit over juice.'], 'سناك أو قبل التمرين', 'Snack or before training'],
  banana: [2.6, 12, 1, 51, 'ب6، بوتاسيوم، مغنيسيوم، ج', 'B6, potassium, magnesium, C', ['اختار موزة ناضجة لطاقة أسرع.', 'اتاكل لوحدها أو مع زبادي أو شوفان.', 'مناسبة قبل التمرين بنص ساعة.'], ['Pick a ripe banana for faster energy.', 'Eat on its own or with yogurt or oats.', 'Great half an hour before training.'], 'قبل التمرين بنص ساعة', 'Half an hour before training'],
  grapes: [1.5, 15, 3, 55, 'ج، ك، مضادات أكسدة', 'C, K, antioxidants', ['اتغسل وتتنقى.', 'اتاكل بحجم حفنة.', 'ممكن تتبرّد في التلاجة كسناك.'], ['Wash and pick over.', 'Eat about a handful.', 'Chill in the fridge as a snack.'], 'سناك', 'Snack'],
  melon: [0.5, 6, 2, 65, 'ج، أ، ليكوبين، بوتاسيوم', 'C, A, lycopene, potassium', ['اتبرّد واتقطّع شرايح.', 'اتاكل لوحدها أو مع جبنة قريش.', 'مرطّبة وخفيفة في الصيف.'], ['Chill and cut into slices.', 'Eat plain or with cottage cheese.', 'Hydrating and light in summer.'], 'سناك، خصوصًا في الصيف', 'Snack, especially in summer'],
  leaf: [2.5, 1, 30, null, 'ك، أ، ج، ب9', 'K, A, C, B9', ['تتغسل كويس جدًا وتتصفّى.', 'تتقطّع وتتخلط بليمون وزيت زيتون قليل.', 'تتاكل طازة أو تتسوّى سوتيه خفيف.'], ['Wash thoroughly and drain.', 'Chop and toss with lemon and a little olive oil.', 'Eat fresh or lightly sautéed.'], 'مع الغدا والعشا', 'With lunch and dinner'],
  longveg: [2, 3, 10, 15, 'ج، ك، بوتاسيوم', 'C, K, potassium', ['تتغسل وتتقطّع.', 'تتاكل نيّة في سلطة أو تتسوّى على البخار أو في الفرن.', 'تتبّل بقليل ملح وعصير ليمون.'], ['Wash and cut.', 'Eat raw in salad, or steam or roast.', 'Season with a little salt and lemon juice.'], 'مع أي وجبة', 'With any meal'],
  carrot: [2.8, 4.7, 69, 40, 'أ (بيتا كاروتين)، ك، ب6', 'A (beta-carotene), K, B6', ['تتغسل وتتقشر.', 'تتاكل نيّة أو تتسلق أو تتعمل في الفرن.', 'مع قليل دهون الامتصاص أحسن.'], ['Wash and peel.', 'Eat raw, boiled or roasted.', 'A little fat improves absorption.'], 'سناك أو مع الغدا', 'Snack or with lunch'],
  nuts: [8, 3, 5, 15, 'هـ، مغنيسيوم، دهون صحية', 'E, magnesium, healthy fats', ['اختار النيّة غير المملّحة.', 'الحصة حفنة صغيرة بس (30 جم) عشان السعرات عالية.', 'ممكن تتنقع من الليل عشان تتهضم أسهل.'], ['Choose raw, unsalted.', 'A small handful (30 g) is a serving — calories add up fast.', 'Soak overnight for easier digestion.'], 'سناك أو مع الفطار', 'Snack or with breakfast'],
  oil: [0, 0, 0, null, 'هـ، ك، دهون صحية', 'E, K, healthy fats', ['استخدمه بالملعقة مش بالعين.', 'الأحسن على السلطة أو آخر الطبخ.', 'ملعقة صغيرة = حوالي 45 سعر.'], ['Measure by the spoon, not by eye.', 'Best over salad or at the end of cooking.', 'One teaspoon is about 45 kcal.'], 'مع أي وجبة بكمية صغيرة', 'With meals, in small amounts'],
  avocado: [6.7, 0.7, 7, 15, 'هـ، ك، ب9، بوتاسيوم', 'E, K, B9, potassium', ['اختار حبة طرية تتضغط بسهولة.', 'اتقطّع نصين وتتشال النواة.', 'اتاكل بملعقة أو مهروسة على عيش أسمر.'], ['Pick one that yields to gentle pressure.', 'Halve and remove the pit.', 'Eat with a spoon or mashed on whole-grain bread.'], 'الفطار أو السلطة', 'Breakfast or in salad'],
  stew: [3, 2.5, 380, null, 'حديد، ب12، ب6', 'Iron, B12, B6', ['تتحمّر البصلة والتوم في ملعقة زيت.', 'يتضاف الصلصة والبهارات والبروتين وتتسوّى على نار هادية.', 'تتقدم مع رز أو عيش بكمية محسوبة.'], ['Sauté onion and garlic in a spoon of oil.', 'Add sauce, spices and protein and simmer on low heat.', 'Serve with a measured portion of rice or bread.'], 'الغدا', 'Lunch'],
  soup: [2, 2, 450, null, 'أ، ج، حديد', 'A, C, iron', ['تتسلق الخضار أو البقول في مية أو مرقة.', 'تتضرب في الخلاط لو تحب قوام ناعم.', 'تتقدم سخنة مع ليمون.'], ['Boil vegetables or legumes in water or stock.', 'Blend for a smooth texture if you like.', 'Serve hot with lemon.'], 'بداية الغدا أو العشا', 'Start of lunch or dinner'],
  sandwich: [3, 3, 700, 65, 'ب1، ب3، حديد', 'B1, B3, iron', ['اختار عيش أسمر وحشو بروتين.', 'زوّد خضار (خس وطماطم وخيار).', 'قلّل الصوصات الدسمة.'], ['Choose whole-grain bread and a protein filling.', 'Add vegetables (lettuce, tomato, cucumber).', 'Go easy on fatty sauces.'], 'الفطار أو الغدا', 'Breakfast or lunch'],
  pizza: [2.3, 3.8, 600, 60, 'كالسيوم، ب12، حديد', 'Calcium, B12, iron', ['الأحسن تتعمل في البيت بعجينة أسمر وجبنة قليلة الدسم.', 'زوّد الخضار على الوش.', 'شريحة أو اتنين مع سلطة.'], ['Best homemade with wholemeal dough and lower-fat cheese.', 'Load the top with vegetables.', 'One or two slices with a salad.'], 'وجبة حرة مرة في الأسبوع', 'An occasional treat meal'],
  sweet: [1, 30, 120, 70, 'طاقة سريعة (سكر)', 'Quick energy (sugar)', ['حلويات: الحصة صغيرة وبشكل متقطّع.', 'الأحسن بعد وجبة مش لوحدها.', 'ممكن تقلّل السكر لو بتعملها في البيت.'], ['Treat: keep the portion small and occasional.', 'Better after a meal than alone.', 'Reduce the sugar if you make it at home.'], 'وجبة حرة بعد الأكل', 'An occasional treat after a meal'],
  cup: [0, 0, 5, null, 'مضادات أكسدة', 'Antioxidants', ['اتحضّر بمية سخنة (مش مغلية جدًا).', 'اتشرب من غير سكر أو بكمية قليلة.', 'تجنّب الكافيين بعد العصر لو بتنام بصعوبة.'], ['Brew with hot, not boiling, water.', 'Drink unsweetened or with a little sugar.', 'Avoid caffeine in the late afternoon if you sleep poorly.'], 'الصبح أو قبل التمرين بنص ساعة', 'Morning or half an hour before training'],
  glass: [0.3, 9, 2, 50, 'ج، بوتاسيوم', 'C, potassium', ['الأحسن تاكل الفاكهة كاملة.', 'لو عصير: كوباية صغيرة من غير سكر.', 'اشربه ساقع وطازة.'], ['Whole fruit is better than juice.', 'If juice, a small glass with no added sugar.', 'Serve cold and fresh.'], 'بعد التمرين أو سناك', 'After training or as a snack'],
  bottle: [0, 9, 30, 60, 'مفيش (سعرات سكر)', 'None (sugar calories)', ['قلّل المشروبات الغازية والسكرية.', 'المياه أحسن.', 'مشروبات الأملاح للتمرين الطويل بس.'], ['Limit sugary fizzy drinks.', 'Water is better.', 'Electrolyte drinks only for long training.'], 'أثناء التمرين الطويل أو نادرًا', 'During long training or rarely'],
  tub: [0, 2, 150, null, 'بروتين، أحماض أمينية', 'Protein, amino acids', ['اتخلط سكوب مع ميّة أو لبن في الشيكر.', 'اتشرب بعد التمرين بنص ساعة.', 'ماتعتمدش عليه بدل الأكل الطبيعي.'], ['Mix a scoop with water or milk in a shaker.', 'Drink within half an hour after training.', 'It does not replace real food.'], 'بعد التمرين', 'After training'],
  pill: [0, 0, 0, null, 'حسب النوع', 'Depends on the type', ['اتخذ حسب الجرعة المكتوبة.', 'مع وجبة لو بيتحلّ في الدهون.', 'استشر الأخصائي قبل ما تبدأ.'], ['Take as directed on the label.', 'With a meal if fat-soluble.', 'Check with your specialist before starting.'], 'مع وجبة', 'With a meal'],
  plate: [3, 3, 200, null, 'متنوّعة', 'Varied', ['تتغسل المكوّنات كويس.', 'تتقطّع وتتخلط.', 'تتبّل بقليل ليمون وزيت.'], ['Wash the ingredients well.', 'Chop and mix.', 'Dress with a little lemon and oil.'], 'مع الغدا', 'With lunch'],
  jar: [0, 80, 5, 60, 'طاقة سريعة', 'Quick energy', ['ملعقة صغيرة بس.', 'مع زبادي أو شوفان.', 'مش بديل عن الفاكهة.'], ['Just a teaspoon.', 'With yogurt or oats.', 'Not a replacement for fruit.'], 'قبل التمرين بقليل', 'Shortly before training'],
  sugar: [0, 100, 0, 65, 'مفيش', 'None', ['قلّل منه.', 'ملعقة صغيرة = 16 سعر.', 'الأحسن تتعوّد على المشروب بدون سكر.'], ['Cut back.', 'One teaspoon is about 16 kcal.', 'Train yourself to like drinks unsweetened.'], 'بكمية صغيرة', 'In small amounts']
};

const OVERRIDE = {
  chicken_pane: [1, 0, 480, null], fries: [3, 0.5, 250, 75], fried_chicken: [0.5, 0, 600, null], chicken_nuggets: [1, 1, 550, null], crispy_chicken_sandwich: [2, 4, 800, 65],
  basterma: [0, 0, 1800, null], luncheon: [0, 2, 1200, null], sausage_beef: [0, 1, 900, null], feseekh: [0, 0, 5000, null], tuna_can_note: [0, 0, 350, null], fish_tuna_can: [0, 0, 320, null],
  oats: [10, 1, 6, 55], rice_brown: [1.8, 0.4, 5, 55], bread_brown: [6, 3, 450, 55], lentils: [8, 1.8, 2, 30], fava_beans: [5, 1, 200, 40], chickpeas: [7.6, 4.8, 7, 28], quinoa: [2.8, 0.9, 7, 53],
  koshari: [4, 2, 450, 60], koshari_plain: [4, 2, 350, 60], molokhia: [3.5, 1, 350, null], foul_oil: [5, 1, 420, 40], taameya: [6, 1, 500, null],
  yogurt_greek: [0, 4, 36, 35], cheese_qarish: [0, 3, 400, 30], cheese_cream: [0, 3, 350, null], cottage_cheese: [0, 3, 350, 30], whole_milk: [0, 5, 44, 31],
  sweet_potato: [3, 4.2, 55, 63], yam_colocasia: [3, 4.2, 55, 63], watermelon: [0.4, 6, 1, 72], dates: [7, 66, 2, 42], honey: [0, 82, 4, 58], sugar: [0, 100, 1, 65],
  nuts_almond: [12, 4, 1, 15], almonds: [12.5, 4.4, 1, 15], olive_oil: [0, 0, 2, null], soft_drink: [0, 10.6, 10, 63], water: [0, 0, 5, 0], banana: [2.6, 12, 1, 51], apple: [2.4, 10, 1, 36]
};

const ALL = {};
export function foodDetails(food, isEn) {
  const k = foodKind(food);
  let kind = k.kind;
  const id = String(food.id || '');
  if (kind === 'bowl' && /^(cornflakes|granola|rice_cakes|popcorn)/.test(id)) kind = 'bread';
  if (kind === 'sweet' && /^(honey|molasses)$/.test(id)) kind = 'jar';
  if (kind === 'sweet' && id === 'sugar') kind = 'sugar';
  const row = D[kind] || D.plate;
  const ov = OVERRIDE[id];
  const fiber = ov ? ov[0] : row[0], sugar = ov ? ov[1] : row[1], sodium = ov ? ov[2] : row[2], gi = ov ? ov[3] : row[3];
  const fried = /fried|fries|pane|nuggets|crispy|chips|taameya|qatayef|luqmet/.test(id);
  const steps = (isEn ? row[7] : row[6]).slice();
  if (fried) steps.unshift(isEn ? 'Fried: keep it occasional, or bake or air-fry for a lighter version.' : 'مقلي: خلّيه نادر، أو اعمله في الفرن أو الإير فراير عشان يبقى أخف.');
  return {
    kind: kind,
    fiber: fiber, sugar: sugar, sodium: sodium, gi: gi,
    vit: isEn ? row[5] : row[4],
    steps: steps,
    when: isEn ? row[9] : row[8]
  };
}
void ALL;
