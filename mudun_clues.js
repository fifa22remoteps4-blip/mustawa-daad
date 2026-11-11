/* مُدُنُ ضاد — القرائن المتحرّكة لمدينة الحروف
   • كل حرف مرسوم بخطّ متّجه (لا بخطّ الجهاز) كي يتحوّل في لقطة واحدة من شكله المنفصل إلى شكله أوّل الكلمة.
   • مدمجة: الشيء مرسوم بشكل الحرف نفسه واسمه يبدأ بالحرف (Shmidman & Ehri 2010). صوتية: صوتٌ يصدره الطفل كل يوم.
   • لا يد ولا إصبع في أي رسم.
   • المشهد: يُكتب الحرف (0–14%) ← يخرج منه الشيء/الصوت (16–60%) ← يعود حرفًا وتظهر الكلمة (66–96%). الدورة 7 ثوانٍ. */
(function () {
  const INK = '#3d2b1f', RED = '#d7263d';
  const B = 140; // السطر

  /* ---------- الحروف: [المنفصل، أوّل الكلمة] بالأوامر نفسها كي يتحوّل الخط ذاته ---------- */
  const BOAT_I = 'M224 98 C230 126 222 140 200 140 L96 140 C80 140 72 130 74 110';
  const BOAT_J = 'M224 98 C230 126 222 140 200 140 L96 140 C80 140 64 140 40 140';
  const HAA_I = 'M212 80 C204 94 176 92 128 90 C94 112 98 176 150 180 C176 182 196 178 212 170';
  const HAA_J = 'M212 80 C204 94 176 92 128 90 C116 104 126 134 150 140 C120 140 80 140 40 140';
  const SEEN_I = 'M236 96 C238 130 226 138 214 132 C206 128 204 112 204 104 C204 128 194 138 180 134 C172 130 170 116 170 104 C172 150 160 168 124 168 C96 168 84 156 84 128';
  const SEEN_J = 'M236 96 C238 130 226 138 214 132 C206 128 204 112 204 104 C204 128 194 138 180 134 C172 130 170 116 170 104 C170 124 166 140 148 140 C120 140 80 140 40 140';
  const SAD_I = 'M168 138 C176 104 246 96 246 118 C246 136 210 140 168 138 C172 150 160 172 124 172 C96 172 84 158 84 130';
  const SAD_J = 'M168 138 C176 104 246 96 246 118 C246 136 210 140 168 138 C160 139 150 140 140 140 C110 140 80 140 40 140';
  const TAA_I = 'M112 140 C120 104 200 96 204 122 C206 140 170 140 112 140 L104 140';
  const TAA_J = 'M112 140 C120 104 200 96 204 122 C206 140 170 140 112 140 L40 140';
  const AIN_I = 'M186 84 C164 68 128 82 134 102 C138 116 160 118 180 112 C130 120 112 140 116 162 C120 182 150 186 192 178';
  const AIN_J = 'M186 84 C164 68 128 82 134 102 C138 116 160 118 180 112 C150 118 142 132 140 140 C120 140 80 140 40 140';
  const FAA_I = 'M200 118 C184 120 178 100 194 92 C210 84 222 104 214 126 C208 140 190 140 160 140 L96 140 C80 140 74 130 76 114';
  const FAA_J = 'M200 118 C184 120 178 100 194 92 C210 84 222 104 214 126 C208 140 190 140 160 140 L96 140 C80 140 60 140 40 140';
  const QAF_I = 'M190 112 C174 114 168 94 184 86 C200 78 212 98 204 120 C198 160 170 176 136 176 C108 176 92 162 94 138';
  const QAF_J = 'M190 112 C174 114 168 94 184 86 C200 78 212 98 204 120 C198 134 186 140 170 140 C140 140 80 140 40 140';
  const NUN_I = 'M200 92 C206 130 190 156 150 156 C110 156 94 132 100 100';
  const NUN_J = 'M196 108 C200 128 194 140 176 140 C150 140 80 140 40 140';
  const YAA_I = 'M196 84 C170 78 160 100 182 110 C214 124 206 156 160 156 C122 156 100 146 96 126';
  const YAA_J = 'M206 110 C206 118 204 124 200 128 C196 134 190 140 176 140 C140 140 80 140 40 140';
  const KAF_I = 'M182 50 L182 132 C182 140 170 140 160 140 L108 140 C96 140 90 132 92 118';
  const KAF_J = 'M182 50 L182 132 C182 140 170 140 160 140 L108 140 C96 140 60 140 40 140';
  const LAM_I = 'M172 40 L172 132 C172 172 110 178 102 140';
  const LAM_J = 'M172 40 L172 128 C172 140 120 140 40 140';
  const MIM_I = 'M176 124 C156 128 146 104 164 96 C182 88 194 112 180 130 C172 140 150 140 136 140 C130 160 130 180 132 196';
  const MIM_J = 'M176 124 C156 128 146 104 164 96 C182 88 194 112 180 130 C172 140 150 140 136 140 C110 140 70 140 40 140';
  const HAH_I = 'M154 92 C196 96 204 142 160 144 C122 146 110 116 132 102 C142 96 160 104 156 124';
  const HAH_J = 'M150 88 C176 100 176 132 150 140 C130 146 126 120 150 118 C140 132 80 140 40 140';
  const DAL = 'M128 70 C150 92 170 114 166 134 C164 142 150 142 110 140';
  const RAA = 'M170 100 C176 130 160 160 112 168';
  const WAW = 'M168 118 C150 122 140 100 156 92 C172 84 184 104 178 126 C172 150 150 166 116 170';
  const ALEF = 'M150 54 L150 140';
  const hamzaD = (x, y, s) => `M${x + 7 * s} ${y - 9 * s} C${x - 3 * s} ${y - 13 * s} ${x - 9 * s} ${y - 3 * s} ${x - 3 * s} ${y + 2 * s} C${x} ${y + 4 * s} ${x + 3 * s} ${y + 4 * s} ${x + 6 * s} ${y + 3 * s} L${x - 9 * s} ${y + 9 * s}`;

  /* نقاط: [x,y] للمنفصل، و[x,y] لأوّل الكلمة */
  const LET = {
    'أ': { I: ALEF, extra: [hamzaD(152, 36, 1.3)], join: false },
    'ب': { I: BOAT_I, J: BOAT_J, dI: [[150, 166]], dJ: [[206, 166]] },
    'ت': { I: BOAT_I, J: BOAT_J, dI: [[138, 112], [162, 112]], dJ: [[196, 112], [218, 112]] },
    'ث': { I: BOAT_I, J: BOAT_J, dI: [[136, 114], [164, 114], [150, 96]], dJ: [[196, 114], [222, 114], [209, 96]] },
    'ج': { I: HAA_I, J: HAA_J, dI: [[156, 140]], dJ: [[150, 162]] },
    'ح': { I: HAA_I, J: HAA_J, dI: [], dJ: [] },
    'خ': { I: HAA_I, J: HAA_J, dI: [[170, 62]], dJ: [[170, 62]] },
    'د': { I: DAL, join: false },
    'ذ': { I: DAL, join: false, dI: [[132, 50]] },
    'ر': { I: RAA, join: false },
    'ز': { I: RAA, join: false, dI: [[166, 72]] },
    'س': { I: SEEN_I, J: SEEN_J, dI: [], dJ: [] },
    'ش': { I: SEEN_I, J: SEEN_J, dI: [[220, 70], [190, 70], [205, 52]], dJ: [[220, 70], [190, 70], [205, 52]] },
    'ص': { I: SAD_I, J: SAD_J, dI: [], dJ: [] },
    'ض': { I: SAD_I, J: SAD_J, dI: [[208, 80]], dJ: [[208, 80]] },
    'ط': { I: TAA_I, J: TAA_J, extra: ['M134 46 L134 132'] },
    'ظ': { I: TAA_I, J: TAA_J, extra: ['M134 46 L134 132'], dI: [[170, 72]], dJ: [[170, 72]] },
    'ع': { I: AIN_I, J: AIN_J, dI: [], dJ: [] },
    'غ': { I: AIN_I, J: AIN_J, dI: [[160, 54]], dJ: [[160, 54]] },
    'ف': { I: FAA_I, J: FAA_J, dI: [[198, 66]], dJ: [[198, 66]] },
    'ق': { I: QAF_I, J: QAF_J, dI: [[178, 62], [200, 62]], dJ: [[178, 62], [200, 62]] },
    'ك': { I: KAF_I, J: KAF_J, extra: [hamzaD(140, 108, .9)], extraJ: ['M182 50 L150 72'] },
    'ل': { I: LAM_I, J: LAM_J },
    'م': { I: MIM_I, J: MIM_J },
    'ن': { I: NUN_I, J: NUN_J, dI: [[150, 84]], dJ: [[196, 88]] },
    'ه': { I: HAH_I, J: HAH_J },
    'و': { I: WAW, join: false },
    'ي': { I: YAA_I, J: YAA_J, dI: [[138, 176], [162, 176]], dJ: [[190, 164], [212, 164]] },
  };
  Object.values(LET).forEach(v => { if (v.join !== false) v.join = true; v.dI = v.dI || []; v.dJ = v.dJ || v.dI; v.extra = v.extra || []; });

  const dot = (x, y, c, cls, extra) => `<path class="${cls || ''}" d="M${x} ${y - 8} L${x + 8} ${y} L${x} ${y + 8} L${x - 8} ${y} Z" fill="${c || INK}" ${extra || ''}/>`;
  const stroke = (d, c, w, cls, extra) => `<path class="${cls || ''}" d="${d}" fill="none" stroke="${c || INK}" stroke-width="${w || 13}" stroke-linecap="round" stroke-linejoin="round" ${extra || ''}/>`;
  /* الحرف المنفصل كاملًا (يُكتب ثم يخفت أثناء القرينة ثم يعود) */
  function letterSVG(L, o) {
    o = o || {};
    const v = LET[L], c = o.color || RED, cls = o.cls == null ? 'cl-write' : o.cls;
    let s = stroke(v.I, c, o.w, cls, 'pathLength="100"');
    v.extra.forEach(d => { s += stroke(d, c, (o.w || 13) * (d.includes('C') && d.length < 90 ? .75 : 1), cls, 'pathLength="100"'); });
    if (!o.noDots) v.dI.forEach(([x, y]) => { s += dot(x, y, c, 'cl-dot'); });
    return s;
  }

  /* ---------- الأدوات المشتركة للرسم ---------- */
  function defs(p) {
    return `<defs>
<radialGradient id="${p}sk" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#ffe5cf"/><stop offset="1" stop-color="#f2b48c"/></radialGradient>
<radialGradient id="${p}y" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#fff0a8"/><stop offset="1" stop-color="#f4b400"/></radialGradient>
<radialGradient id="${p}r" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#ff8b9b"/><stop offset="1" stop-color="#c81d36"/></radialGradient>
<radialGradient id="${p}g" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#9ee49b"/><stop offset="1" stop-color="#2f9e44"/></radialGradient>
<radialGradient id="${p}b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#bfe3ff"/><stop offset="1" stop-color="#3b8fd9"/></radialGradient>
<radialGradient id="${p}w" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e3e6ec"/></radialGradient>
<radialGradient id="${p}br" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#c98f5f"/><stop offset="1" stop-color="#7a4a2a"/></radialGradient>
<radialGradient id="${p}gr" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#e3e7ee"/><stop offset="1" stop-color="#8d96a3"/></radialGradient>
<radialGradient id="${p}o" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#ffc98a"/><stop offset="1" stop-color="#e2731f"/></radialGradient>
<radialGradient id="${p}pk" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#ffd0dc"/><stop offset="1" stop-color="#f07a9a"/></radialGradient>
<radialGradient id="${p}bg" cx=".5" cy=".3" r=".9"><stop offset="0" stop-color="#fffaf1"/><stop offset="1" stop-color="#ffe9cc"/></radialGradient>
<radialGradient id="${p}bgB" cx=".5" cy=".3" r=".9"><stop offset="0" stop-color="#f4faff"/><stop offset="1" stop-color="#d6eafb"/></radialGradient>
<radialGradient id="${p}bgG" cx=".5" cy=".3" r=".9"><stop offset="0" stop-color="#f4fff2"/><stop offset="1" stop-color="#d4f1d1"/></radialGradient>
<radialGradient id="${p}bgP" cx=".5" cy=".3" r=".9"><stop offset="0" stop-color="#fff6f9"/><stop offset="1" stop-color="#fbdbe6"/></radialGradient>
<linearGradient id="${p}bgN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f2a4d"/><stop offset="1" stop-color="#3d4f86"/></linearGradient>
</defs>`;
  }
  const BG = { warm: 'bg', blue: 'bgB', green: 'bgG', pink: 'bgP', night: 'bgN' };
  /* وجه طفل ناعم بلا خطوط */
  function kidFace(p, cx, cy, r, o) {
    o = o || {};
    let s = '';
    if (o.hat) s += `<path d="M${cx - r - 4} ${cy - 2} C${cx - r} ${cy - r - 22} ${cx + r} ${cy - r - 22} ${cx + r + 4} ${cy - 2} Z" fill="${o.hat}"/><circle cx="${cx}" cy="${cy - r - 14}" r="${r * .22}" fill="#fff"/>`;
    s += `<circle cx="${cx - r + 2}" cy="${cy + 4}" r="${r * .22}" fill="url(#${p}sk)"/><circle cx="${cx + r - 2}" cy="${cy + 4}" r="${r * .22}" fill="url(#${p}sk)"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${p}sk)"/>`;
    if (o.hat) s += `<path d="M${cx - r - 2} ${cy - r * .35} C${cx - r * .6} ${cy - r * .75} ${cx + r * .6} ${cy - r * .75} ${cx + r + 2} ${cy - r * .35} L${cx + r + 2} ${cy - r * .55} C${cx + r * .6} ${cy - r * 1.05} ${cx - r * .6} ${cy - r * 1.05} ${cx - r - 2} ${cy - r * .55} Z" fill="#fff" opacity=".9"/>`;
    else s += `<path d="M${cx - r} ${cy - r * .1} C${cx - r} ${cy - r * 1.25} ${cx + r} ${cy - r * 1.25} ${cx + r} ${cy - r * .1} C${cx + r * .7} ${cy - r * .55} ${cx + r * .25} ${cy - r * .7} ${cx} ${cy - r * .5} C${cx - r * .25} ${cy - r * .7} ${cx - r * .7} ${cy - r * .55} ${cx - r} ${cy - r * .1} Z" fill="#6b4226"/>`;
    const ey = cy + r * .05, ex = r * .36;
    if (o.eyes === 'closed') s += `<path d="M${cx - ex - 6} ${ey} q6 5 12 0 M${cx + ex - 6} ${ey} q6 5 12 0" stroke="#3d2b1f" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    else if (o.eyes === 'squeeze') s += `<path d="M${cx - ex - 6} ${ey - 4} l10 4 l-10 4 M${cx + ex + 6} ${ey - 4} l-10 4 l10 4" stroke="#3d2b1f" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    else s += `<ellipse cx="${cx - ex}" cy="${ey + (o.eyes === 'up' ? -4 : 0)}" rx="${r * .09}" ry="${r * .12}" fill="#3d2b1f"/><ellipse cx="${cx + ex}" cy="${ey + (o.eyes === 'up' ? -4 : 0)}" rx="${r * .09}" ry="${r * .12}" fill="#3d2b1f"/><circle cx="${cx - ex + 1.5}" cy="${ey - 2 + (o.eyes === 'up' ? -4 : 0)}" r="${r * .035}" fill="#fff"/><circle cx="${cx + ex + 1.5}" cy="${ey - 2 + (o.eyes === 'up' ? -4 : 0)}" r="${r * .035}" fill="#fff"/>`;
    s += `<ellipse cx="${cx - r * .6}" cy="${cy + r * .35}" rx="${r * .16}" ry="${r * .09}" fill="#ff8a7a" opacity="${o.hot ? .9 : .5}"/><ellipse cx="${cx + r * .6}" cy="${cy + r * .35}" rx="${r * .16}" ry="${r * .09}" fill="#ff8a7a" opacity="${o.hot ? .9 : .5}"/>`;
    const my = cy + r * .5, m = o.mouth;
    if (m === 'o') s += `<ellipse class="${o.mouthCls || ''}" cx="${cx}" cy="${my}" rx="${r * .13}" ry="${r * .16}" fill="#a3203a"/>`;
    else if (m === 'open') s += `<path class="${o.mouthCls || ''}" d="M${cx - r * .28} ${my - 5} Q${cx} ${my + r * .45} ${cx + r * .28} ${my - 5} Z" fill="#a3203a"/><ellipse cx="${cx}" cy="${my + r * .12}" rx="${r * .12}" ry="${r * .06}" fill="#ff8fa3"/>`;
    else if (m === 'chew') s += `<ellipse class="cl-chew" cx="${cx}" cy="${my}" rx="${r * .2}" ry="${r * .1}" fill="#a3203a"/>`;
    else if (m === 'blow') s += `<circle cx="${cx + r * .1}" cy="${my}" r="${r * .1}" fill="#a3203a"/>`;
    else s += `<path d="M${cx - r * .25} ${my - 3} Q${cx} ${my + r * .22} ${cx + r * .25} ${my - 3}" stroke="#3d2b1f" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    return s;
  }
  const bubble = (x, y, w, txt, color, cls) => `<g class="${cls || 'cl-bub'}"><path d="M${x} ${y} h${w} a14 14 0 0 1 14 14 v18 a14 14 0 0 1 -14 14 h-${w - 26} l-12 12 l1 -12 h-3 a14 14 0 0 1 -14 -14 v-18 a14 14 0 0 1 14 -14 Z" fill="#fff" opacity=".97"/><text x="${x + w / 2}" y="${y + 33}" font-size="27" font-family="'Noto Naskh Arabic',serif" font-weight="700" text-anchor="middle" fill="${color || '#e2731f'}">${txt}</text></g>`;
  const word = (txt, night) => `<text class="cl-word" x="150" y="210" font-size="25" font-family="'Noto Naskh Arabic',serif" font-weight="700" text-anchor="middle" fill="${night ? '#fff' : INK}">${txt}</text>`;

  window.CLUE_LIB = { INK, RED, LET, dot, stroke, letterSVG, defs, BG, kidFace, bubble, word, hamzaD };
})();
