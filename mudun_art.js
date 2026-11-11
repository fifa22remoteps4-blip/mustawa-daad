/* مُدُنُ ضاد — مكتبة الرسوم الموحّدة (SVG مسطّح)
   قواعد الأسلوب: لوحة ألوان واحدة · خط محيط واحد (#2b2d42، 3px) · مقاس واحد 200×140 ·
   شيءٌ واحد واضح في وسط البطاقة · لا نصّ داخل الصورة إلا الحرف المقصود نفسه. */
(function () {
  const O = '#2b2d42';
  const K = {
    skin: '#f6c7a1', skinD: '#e2a57d', hair: '#5b3a29', red: '#ef476f', red2: '#d62839', orange: '#f78c3b', yellow: '#ffd166', gold: '#f4b400',
    green: '#57c271', green2: '#2f9e44', leaf: '#8bd36b', blue: '#4dabf7', blue2: '#1c7ed6', navy: '#1c4e80', brown: '#a0623a', brown2: '#7a4a2a',
    tan: '#e0b07a', purple: '#9b5de5', pink: '#ff8fab', gray: '#adb5bd', gray2: '#868e96', white: '#ffffff', cream: '#fff8ec', teal: '#14a3b8', black: '#2b2d42',
  };
  const BG = { warm: '#fff1dc', sky: '#e3f2fd', green: '#e6f6e6', sea: '#dff4f8', night: '#2f3a5a', pink: '#fde8ef', lav: '#efe9ff', sand: '#fbf0d9' };

  /* ---------- أدوات الرسم ---------- */
  const sw = w => `stroke="${O}" stroke-width="${w == null ? 3 : w}" stroke-linejoin="round" stroke-linecap="round"`;
  const P = (d, f, w) => `<path d="${d}" fill="${f || 'none'}" ${sw(w)}/>`;
  const Pn = (d, f) => `<path d="${d}" fill="${f}"/>`; // بلا محيط (ظلال ولمعات)
  const C = (cx, cy, r, f, w) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${sw(w)}/>`;
  const Cn = (cx, cy, r, f, op) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}"${op ? ` opacity="${op}"` : ''}/>`;
  const E = (cx, cy, rx, ry, f, w) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${sw(w)}/>`;
  const En = (cx, cy, rx, ry, f, op) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}"${op ? ` opacity="${op}"` : ''}/>`;
  const R = (x, y, w, h, rx, f, sw_) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${sw(sw_)}/>`;
  const Rn = (x, y, w, h, rx, f, op) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}"${op ? ` opacity="${op}"` : ''}/>`;
  const L = (x1, y1, x2, y2, c, w) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c || O}" stroke-width="${w || 3}" stroke-linecap="round" fill="none"/>`;
  const shadow = (cx, cy, rx) => En(cx, cy, rx, rx * .16, '#000', .1);
  const shine = (cx, cy, rx, ry) => En(cx, cy, rx, ry, '#fff', .55);
  const AR = `font-family="'Noto Naskh Arabic','Scheherazade New','Segoe UI','Arial',sans-serif" font-weight="700"`;
  const T = (x, y, s, txt, f, extra) => `<text x="${x}" y="${y}" font-size="${s}" ${AR} text-anchor="middle" fill="${f || O}" ${extra || ''}>${txt}</text>`;
  const eyes = (x1, x2, y, r) => `${En(x1, y, r || 3.6, (r || 3.6) * 1.25, O)}${En(x2, y, r || 3.6, (r || 3.6) * 1.25, O)}${Cn(x1 + 1.2, y - 1.6, 1.2, '#fff')}${Cn(x2 + 1.2, y - 1.6, 1.2, '#fff')}`;
  const cheeks = (x1, x2, y) => En(x1, y, 6, 3.6, K.pink, .8) + En(x2, y, 6, 3.6, K.pink, .8);
  const star5 = (cx, cy, r, f, w) => { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; d += (i ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a)).toFixed(1) + ' '; } return P(d + 'Z', f, w); };

  /* وجه طفل موحّد (أمامي) — o: {cx,cy,r,mouth,eyes,girl} */
  function face(o) {
    o = o || {};
    const cx = o.cx || 100, cy = o.cy || 72, r = o.r || 38;
    let s = '';
    if (o.girl) s += P(`M${cx - r - 6} ${cy + 6} C${cx - r - 8} ${cy - r - 20} ${cx + r + 8} ${cy - r - 20} ${cx + r + 6} ${cy + 6} L${cx + r + 2} ${cy + r + 6} L${cx - r - 2} ${cy + r + 6} Z`, K.teal);
    else s += C(cx - r + 1, cy + 4, 8, K.skin) + C(cx + r - 1, cy + 4, 8, K.skin);
    s += C(cx, cy, r, K.skin);
    if (!o.girl) s += P(`M${cx - r} ${cy - 4} C${cx - r} ${cy - r - 10} ${cx + r} ${cy - r - 10} ${cx + r} ${cy - 4} C${cx + r - 10} ${cy - 20} ${cx + 10} ${cy - 26} ${cx} ${cy - 18} C${cx - 10} ${cy - 26} ${cx - r + 10} ${cy - 20} ${cx - r} ${cy - 4} Z`, K.hair);
    else s += P(`M${cx - r + 2} ${cy - 10} C${cx - r + 6} ${cy - r - 4} ${cx + r - 6} ${cy - r - 4} ${cx + r - 2} ${cy - 10}`, 'none', 3);
    const ey = cy + 2;
    if (o.eyes === 'closed') s += P(`M${cx - 20} ${ey} q6 5 12 0`, 'none') + P(`M${cx + 8} ${ey} q6 5 12 0`, 'none');
    else if (o.eyes === 'squeeze') s += P(`M${cx - 20} ${ey - 4} l10 4 l-10 4`, 'none') + P(`M${cx + 20} ${ey - 4} l-10 4 l10 4`, 'none');
    else s += eyes(cx - 14, cx + 14, ey + (o.eyes === 'up' ? -4 : 0));
    s += cheeks(cx - 24, cx + 24, cy + 14);
    const my = cy + 20;
    const m = o.mouth;
    if (m === 'o') s += E(cx, my, 5, 6, K.red2, 2.5);
    else if (m === 'open') s += P(`M${cx - 11} ${my - 4} Q${cx} ${my + 16} ${cx + 11} ${my - 4} Z`, K.red2, 2.5) + En(cx, my + 5, 5, 2.6, K.pink);
    else if (m === 'tongue') s += R(cx - 11, my - 6, 22, 7, 2, '#fff', 2.5) + P(`M${cx - 7} ${my + 1} Q${cx} ${my + 15} ${cx + 7} ${my + 1} Z`, K.pink, 2.5);
    else if (m === 'blow') s += C(cx + 4, my, 4.5, K.red2, 2.5);
    else if (m === 'flat') s += L(cx - 8, my, cx + 8, my, O, 3);
    else s += P(`M${cx - 11} ${my - 3} Q${cx} ${my + 8} ${cx + 11} ${my - 3}`, 'none');
    return s;
  }
  /* يد مضمومة مع إصبع سبّابة قائمة — مركز القبضة (x,y) */
  const fist = (x, y, f) => R(x - 22, y - 16, 44, 36, 14, f || K.skin) + Pn(`M${x - 14} ${y - 6} h28`, 'none') + L(x - 12, y - 4, x + 12, y - 4, K.skinD, 2.5) + L(x - 12, y + 5, x + 12, y + 5, K.skinD, 2.5);

  /* ---------- رسوم القرائن (حرف ← مشهد يشبه شكله أو صوته) ---------- */
  const CLUE = {
    /* الألف: إصبعٌ قائم مستقيم = عصا الألف، وفوق رأسه الهمزة «ء» نفسها، وبجانبه الحرف «أ» بالطول نفسه */
    finger_up: () =>
      R(34, 92, 64, 40, 16, K.skin) + L(44, 104, 88, 104, K.skinD, 2.5) + L(44, 116, 88, 116, K.skinD, 2.5) +
      R(54, 34, 20, 64, 10, K.skin) + En(64, 40, 5, 3, '#fff', .7) +
      T(64, 30, 34, 'ء', K.red2) +
      L(108, 22, 108, 128, '#d0d4dc', 2) +
      T(152, 122, 104, 'أ', K.red2),
    knock: () => R(18, 104, 164, 18, 4, K.tan) + Rn(18, 104, 164, 5, 2, '#fff', .35) +
      P('M70 44 h34 a14 14 0 0 1 14 14 v20 a10 10 0 0 1 -10 10 h-30 a14 14 0 0 1 -14 -14 v-16 a14 14 0 0 1 14 -14 Z', K.skin) +
      P('M118 64 h22 a8 8 0 0 1 8 8 v14 a8 8 0 0 1 -8 8 h-4', K.skin) + L(84, 60, 104, 60, K.skinD, 2.5) +
      P('M150 92 l10 -6 M152 102 l12 0 M150 112 l10 6', 'none', 3) + T(42, 70, 30, 'دَقّ', K.brown2),
    kid_belly: () => R(58, 20, 84, 120, 34, K.orange) + C(100, 30, 26, K.skin) + P('M74 24 C76 2 124 2 126 24 C116 14 104 12 100 18 C96 12 84 14 74 24 Z', K.hair) + eyes(90, 110, 30, 3) +
      P('M92 42 q8 6 16 0', 'none', 2.5) + P('M60 70 C40 80 52 104 82 100', K.skin) + E(84, 98, 14, 10, K.skin) + C(108, 92, 7, O, 0),
    face_tongue: () => face({ mouth: 'tongue' }) + P('M140 104 l14 -6 M142 114 l16 0', 'none', 3),
    face_chin: () => face({ cy: 60, mouth: 'smile' }) + E(80, 112, 20, 13, K.skin) + E(120, 112, 20, 13, K.skin) + L(70, 108, 90, 108, K.skinD, 2) + L(110, 108, 130, 108, K.skinD, 2),
    face_shh: () => face({ mouth: 'flat' }) + R(94, 80, 12, 44, 6, K.skin) + R(88, 112, 26, 24, 10, K.skin) + Cn(150, 50, 4, K.blue2) + Cn(162, 42, 4, K.blue2) + Cn(158, 58, 4, K.blue2),
    face_throat: () => face({ cy: 56, mouth: 'open' }) + R(84, 92, 32, 30, 8, K.skin) + P('M60 122 C64 104 80 100 92 104 l20 0 C120 104 126 112 124 122', K.skin) + L(96, 108, 116, 108, K.skinD, 2),
    blow: () => face({ cx: 70, cy: 70, r: 34, mouth: 'blow' }) + P('M110 70 q10 -4 18 0 M112 80 q10 -2 16 2', 'none', 2.5) +
      R(150, 74, 16, 46, 4, '#fff') + P('M158 74 v-8', 'none', 2.5) + P('M158 66 C150 58 154 46 164 40 C162 50 172 56 166 64 Z', K.orange, 2.5),
    loop: () => P('M130 22 V96 C130 124 74 124 74 96', 'none', 7) + `<path d="M130 22 V96 C130 124 74 124 74 96" stroke="${K.yellow}" stroke-width="3" fill="none" stroke-dasharray="6 7" stroke-linecap="round"/>` +
      R(116, 6, 26, 26, 10, K.skin) + R(124, -2, 10, 16, 5, K.skin) + P('M74 96 l-8 -12 M74 96 l12 -8', 'none', 3),
    plate_egg: () => P('M24 62 Q100 112 176 62 Q100 84 24 62 Z', K.blue) + Pn('M48 70 Q100 96 152 70', '#fff') + P('M100 102 c-12 0 -18 12 -18 20 c0 10 8 14 18 14 c10 0 18 -4 18 -14 c0 -8 -6 -20 -18 -20 Z', '#fff') + shine(94, 112, 3, 5),
    plate_apples: () => P('M24 82 Q100 132 176 82 Q100 104 24 82 Z', K.blue) + C(78, 54, 18, K.red) + P('M78 36 q2 -8 8 -10', 'none', 2.5) + C(122, 54, 18, K.red) + P('M122 36 q2 -8 8 -10', 'none', 2.5) + shine(72, 48, 4, 3) + shine(116, 48, 4, 3),
    bowl_star: () => P('M36 66 Q100 150 164 66 Z', K.orange) + L(36, 66, 164, 66, O, 3) + star5(100, 48, 22, K.yellow),
    snake: () => P('M30 96 c10 -30 20 -30 30 0 c10 30 20 30 30 0 c10 -30 20 -30 30 0 c8 22 18 24 26 6', 'none', 16) + `<path d="M30 96 c10 -30 20 -30 30 0 c10 30 20 30 30 0 c10 -30 20 -30 30 0 c8 22 18 24 26 6" stroke="${K.green}" stroke-width="10" fill="none" stroke-linecap="round"/>` +
      E(160, 98, 14, 11, K.green) + Cn(164, 94, 2.6, O) + P('M174 100 l10 -3 M174 100 l10 4', 'none', 2),
    drum: () => E(84, 96, 48, 14, K.red) + P('M36 96 v18 c0 10 96 10 96 0 v-18', K.red) + E(84, 96, 48, 14, '#fff3e0') + P('M44 104 l14 18 l14 -18 l14 18 l14 -18 l14 18 l12 -16', 'none', 2.5) +
      R(146, 14, 9, 84, 4, K.tan) + C(150, 14, 8, K.brown),
    lollipop: () => R(96, 70, 8, 62, 4, '#fff') + C(100, 52, 32, K.pink) + P('M100 52 m-20 0 a20 20 0 1 1 20 20 a12 12 0 1 1 -10 -12', 'none', 3) + shine(88, 36, 6, 4),
    rose: () => P('M100 70 C100 96 76 104 80 126', 'none', 5) + `<path d="M100 70 C100 96 76 104 80 126" stroke="${K.green2}" stroke-width="3" fill="none"/>` + P('M90 96 c-14 -8 -24 0 -26 6 c10 4 20 2 26 -6 Z', K.green) +
      C(100, 46, 26, K.red) + P('M86 44 c4 -12 24 -12 28 0 c-6 10 -22 10 -28 0', K.red2, 2.5) + P('M94 40 c4 -6 10 -6 12 0', 'none', 2.5),
    car_ramp: () => P('M14 52 L120 52 C150 52 160 88 186 126 L14 126 Z', K.tan) + P('M30 32 h44 l10 14 h12 v10 h-74 Z', K.red) + C(46, 58, 7, O, 0) + C(84, 58, 7, O, 0) + Rn(46, 34, 10, 9, 2, '#fff', .8) + Rn(60, 34, 12, 9, 2, '#fff', .8),
    bee: () => P('M14 70 L110 70 C140 70 150 100 172 128 L14 128 Z', K.tan) + E(78, 46, 24, 17, K.yellow) + P('M70 30 v32 M84 30 v32', 'none', 5) + E(70, 26, 11, 7, '#fff', 2.5) + E(88, 24, 11, 7, '#fff', 2.5) + Cn(98, 42, 3, O),
    whistle: () => C(88, 80, 34, '#c0c6cf') + R(96, 46, 74, 26, 6, '#c0c6cf') + Cn(88, 80, 12, O) + R(150, 50, 12, 8, 2, O, 0) + P('M30 40 c-10 -12 -10 -24 0 -30', 'none', 3) + P('M28 120 c-12 6 -18 0 -20 -10', 'none', 3),
    frog: () => E(100, 92, 54, 32, K.green) + C(70, 54, 18, K.green) + C(130, 54, 18, K.green) + C(70, 52, 10, '#fff', 2.5) + C(130, 52, 10, '#fff', 2.5) + Cn(72, 53, 4.5, O) + Cn(132, 53, 4.5, O) +
      P('M72 94 Q100 112 128 94', 'none') + cheeks(60, 140, 100) + E(56, 120, 18, 7, K.green2) + E(144, 120, 18, 7, K.green2),
    face_hot: () => face({ mouth: 'open', eyes: 'squeeze' }) + P('M144 40 c-6 -10 6 -14 0 -24 M160 46 c-6 -10 6 -14 0 -24', 'none', 3) + P('M30 92 c-10 -12 0 -26 10 -24 c4 10 2 18 -10 24 Z', K.red),
    face_snore: () => face({ eyes: 'closed', mouth: 'o' }) + T(152, 44, 26, 'z', K.blue2, 'font-family="Arial"') + T(170, 26, 32, 'z', K.blue2, 'font-family="Arial"'),
    face_gargle: () => face({ cy: 76, eyes: 'up', mouth: 'o' }) + C(84, 26, 7, K.blue, 2.5) + C(104, 16, 9, K.blue, 2.5) + C(122, 28, 6, K.blue, 2.5),
    face_pant: () => face({ mouth: 'open' }) + P('M146 40 c-4 8 -4 14 0 16 c4 -2 4 -8 0 -16 Z', K.blue) + P('M54 34 c-4 8 -4 14 0 16 c4 -2 4 -8 0 -16 Z', K.blue) + P('M120 108 l20 6 M118 118 l18 10', 'none', 3),
    face_cough: () => face({ cx: 92, mouth: 'open', eyes: 'squeeze' }) + E(140, 96, 18, 14, K.skin) + P('M164 70 l14 -6 M166 84 l16 0 M164 98 l14 6', 'none', 3),
    eye: () => P('M24 72 Q100 4 176 72 Q100 140 24 72 Z', '#fff') + C(100, 72, 28, K.brown) + Cn(100, 72, 13, O) + Cn(108, 64, 6, '#fff') + P('M40 46 l-8 -10 M70 28 l-4 -12 M100 22 v-12 M130 28 l4 -12 M160 46 l8 -10', 'none', 3),
  };

  /* ---------- الأبطال ---------- */
  function heroSVG(girl, pose) {
    const walk = pose === 'walk';
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 120">` + shadow(40, 114, 22);
    s += R(walk ? 22 : 26, 82, 12, 30, 6, K.navy, 2.5) + R(walk ? 46 : 42, 82, 12, 30, 6, K.navy, 2.5);
    s += E(walk ? 26 : 31, 112, 9, 5, O, 0) + E(walk ? 54 : 49, 112, 9, 5, O, 0);
    if (girl) s += P('M22 54 h36 l8 46 h-52 Z', K.purple, 2.5);
    else s += R(20, 52, 40, 38, 14, K.orange, 2.5);
    s += R(10, 56, 12, 30, 6, girl ? K.purple : K.orange, 2.5) + R(58, 56, 12, 30, 6, girl ? K.purple : K.orange, 2.5) + C(16, 88, 6, K.skin, 2.5) + C(64, 88, 6, K.skin, 2.5);
    if (girl) s += P('M16 34 C16 4 64 4 64 34 L62 58 L18 58 Z', K.teal, 2.5);
    s += C(40, 32, 20, K.skin, 2.5);
    if (!girl) s += P('M20 30 C20 6 60 6 60 30 C54 20 46 18 40 22 C34 18 26 20 20 30 Z', K.hair, 2.5);
    else s += P('M22 26 C24 12 56 12 58 26', 'none', 2.5);
    s += eyes(32, 48, 33, 2.8) + En(26, 40, 4, 2.4, K.pink, .9) + En(54, 40, 4, 2.4, K.pink, .9) + P('M34 42 q6 5 12 0', 'none', 2.4);
    return s + '</svg>';
  }

  window.ART_PARTS = { O, K, BG, sw, P, Pn, C, Cn, E, En, R, Rn, L, T, shadow, shine, eyes, cheeks, star5, face, fist, CLUE, heroSVG, AR };
})();
