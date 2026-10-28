/* مُدُنُ ضاد — رسوم القرائن بأسلوب كرتوني ناعم ولطيف (SVG) */
(function () {
  const S = '#3b2a3a', SK = '#ffd9b8', SK2 = '#f2b48c', HR = '#7a4a24';
  const st = (w) => `stroke="${S}" stroke-width="${w || 4}" stroke-linejoin="round" stroke-linecap="round"`;
  const bg = (a, b) => `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="200" height="140" rx="20" fill="url(#g)"/>`;
  const SKY = ['#dff3ff', '#bfe6ff'], ROOM = ['#fff6e5', '#ffe6c2'], MINT = ['#e9fbf0', '#c9f2d8'], PINK = ['#fff0f5', '#ffd6e6'], LAV = ['#f3efff', '#ddd3ff'];
  const ground = c => `<path d="M0 118 Q100 108 200 118 L200 140 L0 140 Z" fill="${c || '#a9e08e'}"/>`;

  function face(o) {
    o = o || {};
    const cx = o.cx || 100, cy = o.cy || 70, r = o.r || 42;
    let s = '';
    s += `<circle cx="${cx - r}" cy="${cy + 4}" r="9" fill="${SK}" ${st()}/><circle cx="${cx + r}" cy="${cy + 4}" r="9" fill="${SK}" ${st()}/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${SK}" ${st()}/>`;
    s += `<path d="M${cx - r} ${cy - 2} C${cx - r - 2} ${cy - r - 6} ${cx + r + 2} ${cy - r - 6} ${cx + r} ${cy - 2} C${cx + r - 10} ${cy - 22} ${cx + 12} ${cy - 30} ${cx - 2} ${cy - 20} C${cx - 14} ${cy - 30} ${cx - r + 8} ${cy - 22} ${cx - r} ${cy - 2} Z" fill="${HR}" ${st()}/>`;
    const ey = cy + 4, ex = [cx - 16, cx + 16];
    if (o.eyes === 'closed') s += ex.map(x => `<path d="M${x - 7} ${ey - 1} Q${x} ${ey + 6} ${x + 7} ${ey - 1}" fill="none" ${st()}/>`).join('');
    else if (o.eyes === 'squeeze') s += `<path d="M${ex[0] - 7} ${ey - 5} L${ex[0] + 6} ${ey} L${ex[0] - 7} ${ey + 5}" fill="none" ${st()}/><path d="M${ex[1] + 7} ${ey - 5} L${ex[1] - 6} ${ey} L${ex[1] + 7} ${ey + 5}" fill="none" ${st()}/>`;
    else { const dy = o.eyes === 'up' ? -5 : 0; s += ex.map(x => `<ellipse cx="${x}" cy="${ey + dy}" rx="6" ry="8" fill="#2b1d2a"/><circle cx="${x + 2.5}" cy="${ey + dy - 3.5}" r="2.6" fill="#fff"/>`).join(''); }
    s += `<ellipse cx="${cx - 26}" cy="${cy + 17}" rx="8" ry="5" fill="#ff9fb4" opacity="${o.hot ? 1 : .7}"/><ellipse cx="${cx + 26}" cy="${cy + 17}" rx="8" ry="5" fill="#ff9fb4" opacity="${o.hot ? 1 : .7}"/>`;
    const my = cy + 23;
    if (o.mouth === 'o') s += `<ellipse cx="${cx}" cy="${my}" rx="5.5" ry="6.5" fill="#c9465a" ${st(3)}/>`;
    else if (o.mouth === 'open') s += `<path d="M${cx - 12} ${my - 5} Q${cx} ${my + 18} ${cx + 12} ${my - 5} Z" fill="#c9465a" ${st(3.5)}/><ellipse cx="${cx}" cy="${my + 5}" rx="5.5" ry="3" fill="#ff8fa3"/>`;
    else if (o.mouth === 'tongue') s += `<path d="M${cx - 13} ${my - 4} Q${cx} ${my + 4} ${cx + 13} ${my - 4}" fill="none" ${st()}/><path d="M${cx - 7} ${my} Q${cx} ${my + 17} ${cx + 7} ${my} Z" fill="#ff8fa3" ${st(3)}/><path d="M${cx} ${my + 2} v6" stroke="#e0607a" stroke-width="2"/>`;
    else if (o.mouth === 'blow') s += `<circle cx="${cx + 6}" cy="${my}" r="5" fill="#c9465a" ${st(3)}/>`;
    else if (o.mouth === 'frown') s += `<path d="M${cx - 12} ${my + 4} Q${cx} ${my - 8} ${cx + 12} ${my + 4}" fill="none" ${st()}/>`;
    else if (o.mouth === 'flat') s += `<path d="M${cx - 10} ${my} H${cx + 10}" ${st()}/>`;
    else if (o.mouth === 'wavy') s += `<path d="M${cx - 12} ${my} q4 -5 8 0 t8 0 t8 0" fill="none" ${st(3)}/>`;
    else s += `<path d="M${cx - 12} ${my - 4} Q${cx} ${my + 8} ${cx + 12} ${my - 4}" fill="none" ${st()}/>`;
    if (o.brows === 'angry') s += `<path d="M${cx - 26} ${cy - 10} L${cx - 8} ${cy - 3} M${cx + 26} ${cy - 10} L${cx + 8} ${cy - 3}" ${st(4)}/>`;
    if (o.brows === 'sad' || o.brows === 'up') s += `<path d="M${cx - 24} ${cy - 4} L${cx - 8} ${cy - 11} M${cx + 24} ${cy - 4} L${cx + 8} ${cy - 11}" ${st(3.5)}/>`;
    return s;
  }
  const hand = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(w, h) / 2}" fill="${SK}" ${st()}/>`;
  const fingers = (x, y, n, gap, len) => Array.from({ length: n }, (_, i) => `<path d="M${x + i * gap} ${y} v${len}" stroke="${SK2}" stroke-width="2.5" stroke-linecap="round"/>`).join('');
  const sparkle = (x, y, c) => `<path d="M${x} ${y - 8} v16 M${x - 8} ${y} h16" stroke="${c || '#ffc93c'}" stroke-width="4" stroke-linecap="round"/>`;
  const apple = (x, y) => `<circle cx="${x}" cy="${y}" r="15" fill="#ff5a5a" ${st()}/><path d="M${x} ${y - 15} q2 -8 6 -10" fill="none" ${st(3)}/><ellipse cx="${x + 9}" cy="${y - 20}" rx="6" ry="3.5" fill="#6cc55a" ${st(2.5)}/><ellipse cx="${x - 6}" cy="${y - 5}" rx="4" ry="3" fill="#fff" opacity=".7"/>`;
  const plate = (y) => `<path d="M24 ${y} Q100 ${y + 54} 176 ${y} Q100 ${y + 28} 24 ${y} Z" fill="#8ec9ff" ${st()}/><path d="M48 ${y + 12} Q100 ${y + 34} 152 ${y + 12}" fill="none" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/>`;

  const SC = {
    finger_up: () => bg(...ROOM) + hand(84, 26, 32, 86) + `<rect x="66" y="78" width="68" height="50" rx="22" fill="${SK}" ${st()}/>` + fingers(80, 92, 3, 14, 12) + `<circle cx="100" cy="24" r="11" fill="#ff922b" ${st()}/>` + sparkle(140, 30) + sparkle(58, 40),
    knock: () => bg(...ROOM) + `<rect x="118" y="12" width="66" height="122" rx="10" fill="#c98a4e" ${st()}/><rect x="128" y="24" width="46" height="40" rx="6" fill="#b37336"/><rect x="128" y="74" width="46" height="48" rx="6" fill="#b37336"/><circle cx="170" cy="70" r="5" fill="#ffd43b" ${st(2.5)}/>` +
      `<circle cx="74" cy="72" r="24" fill="${SK}" ${st()}/><path d="M90 58 q14 2 14 16 q0 12 -12 14" fill="${SK}" ${st()}/>` + fingers(64, 60, 3, 9, 12) + `<path d="M104 52 q8 10 0 20 M110 46 q12 16 0 32" fill="none" stroke="#4dabf7" stroke-width="4" stroke-linecap="round"/>`,
    car_ramp: () => bg(...SKY) + `<path d="M14 34 C92 34 116 116 190 122 L190 140 L14 140 Z" fill="#a9e08e" ${st()}/>` +
      `<g transform="translate(92 70) rotate(34)"><rect x="-30" y="-20" width="60" height="26" rx="10" fill="#ff6b6b" ${st()}/><path d="M-16 -20 q4 -16 16 -16 q12 0 16 16 Z" fill="#ff8787" ${st()}/><rect x="-8" y="-30" width="14" height="10" rx="3" fill="#d0ebff"/><circle cx="-16" cy="8" r="8" fill="#495057" ${st(3)}/><circle cx="16" cy="8" r="8" fill="#495057" ${st(3)}/></g>`,
    bee: () => bg(...SKY) + `<ellipse cx="80" cy="44" rx="20" ry="14" fill="#e7f5ff" ${st(3)} opacity=".95"/><ellipse cx="118" cy="40" rx="20" ry="14" fill="#e7f5ff" ${st(3)} opacity=".95"/>` +
      `<ellipse cx="100" cy="82" rx="46" ry="34" fill="#ffd43b" ${st()}/><path d="M76 52 q-6 30 0 60 M100 48 q-6 34 0 68" fill="none" stroke="#3b2a3a" stroke-width="10"/>` +
      `<circle cx="128" cy="76" r="6" fill="#2b1d2a"/><circle cx="130" cy="73" r="2" fill="#fff"/><path d="M118 92 q10 8 20 0" fill="none" ${st(3)}/><ellipse cx="140" cy="86" rx="5" ry="3" fill="#ff9fb4"/><path d="M54 82 l-12 0" ${st()}/><path d="M124 50 q6 -18 18 -20 M132 54 q14 -12 24 -8" fill="none" ${st(3)}/>`,
    plate_egg: () => bg(...ROOM) + `<ellipse cx="100" cy="70" rx="24" ry="30" fill="#fffaf0" ${st()}/><ellipse cx="91" cy="58" rx="6" ry="9" fill="#fff"/>` + plate(88),
    plate_apples: () => bg(...ROOM) + apple(76, 80) + apple(124, 80) + plate(88),
    face_tongue: () => bg(...LAV) + face({ mouth: 'tongue' }),
    bowl_star: () => bg(...LAV) + `<path d="M30 66 Q30 128 100 128 Q170 128 170 66 Z" fill="#74c0fc" ${st()}/><ellipse cx="100" cy="66" rx="70" ry="10" fill="#a5d8ff" ${st()}/>` +
      `<path d="M100 18 L110 42 L136 44 L116 60 L123 86 L100 72 L77 86 L84 60 L64 44 L90 42 Z" fill="#ffd43b" ${st()}/><circle cx="94" cy="54" r="2.5" fill="#2b1d2a"/><circle cx="106" cy="54" r="2.5" fill="#2b1d2a"/><path d="M95 62 q5 4 10 0" fill="none" ${st(2.5)}/>`,
    face_chin: () => bg(...PINK) + face({ cy: 58 }) + `<ellipse cx="74" cy="116" rx="26" ry="16" fill="${SK}" ${st()}/><ellipse cx="126" cy="116" rx="26" ry="16" fill="${SK}" ${st()}/>` + fingers(60, 106, 3, 9, 10) + fingers(118, 106, 3, 9, 10),
    snake: () => bg(...MINT) + ground() + `<path d="M26 104 C50 64 70 134 98 98 S146 60 164 88" fill="none" stroke="${S}" stroke-width="26" stroke-linecap="round"/><path d="M26 104 C50 64 70 134 98 98 S146 60 164 88" fill="none" stroke="#69db7c" stroke-width="18" stroke-linecap="round"/>` +
      `<circle cx="168" cy="82" r="20" fill="#69db7c" ${st()}/><circle cx="162" cy="76" r="5" fill="#2b1d2a"/><circle cx="176" cy="76" r="5" fill="#2b1d2a"/><circle cx="163" cy="74" r="1.8" fill="#fff"/><circle cx="177" cy="74" r="1.8" fill="#fff"/><path d="M160 90 q8 6 16 0" fill="none" ${st(3)}/><path d="M186 86 l10 -2 m-10 2 l10 6" stroke="#ff6b6b" stroke-width="3" stroke-linecap="round"/>`,
    face_shh: () => bg(...LAV) + face({ eyes: 'closed', mouth: 'o' }) + `<ellipse cx="100" cy="128" rx="20" ry="15" fill="${SK}" ${st()}/><rect x="94" y="80" width="12" height="44" rx="6" fill="${SK}" ${st()}/>` + fingers(92, 120, 3, 8, 8) +
      `<path d="M148 80 q10 6 0 12 M158 74 q14 12 0 24 M168 68 q18 18 0 36" fill="none" stroke="#748ffc" stroke-width="4" stroke-linecap="round"/>`,
    whistle: () => bg(...SKY) + `<rect x="104" y="58" width="74" height="30" rx="10" fill="#ced4da" ${st()}/><circle cx="84" cy="86" r="36" fill="#dee2e6" ${st()}/><circle cx="84" cy="86" r="13" fill="#868e96" ${st(3)}/><circle cx="46" cy="70" r="9" fill="none" ${st()}/>` +
      `<path d="M150 38 q10 -10 22 -6 M146 26 q16 -16 34 -8" fill="none" stroke="#4dabf7" stroke-width="4" stroke-linecap="round"/>`,
    frog: () => bg(...MINT) + ground() + `<ellipse cx="100" cy="92" rx="56" ry="36" fill="#69db7c" ${st()}/><circle cx="74" cy="56" r="18" fill="#69db7c" ${st()}/><circle cx="126" cy="56" r="18" fill="#69db7c" ${st()}/>` +
      `<circle cx="74" cy="56" r="9" fill="#2b1d2a"/><circle cx="126" cy="56" r="9" fill="#2b1d2a"/><circle cx="77" cy="53" r="3" fill="#fff"/><circle cx="129" cy="53" r="3" fill="#fff"/><path d="M78 94 q22 18 44 0" fill="none" ${st()}/><ellipse cx="64" cy="94" rx="8" ry="5" fill="#ff9fb4" opacity=".8"/><ellipse cx="136" cy="94" rx="8" ry="5" fill="#ff9fb4" opacity=".8"/>`,
    drum: () => bg(...ROOM) + `<rect x="52" y="74" width="96" height="48" fill="#ff6b6b" ${st()}/><ellipse cx="100" cy="122" rx="48" ry="12" fill="#e03131" ${st()}/><ellipse cx="100" cy="74" rx="48" ry="12" fill="#fff4e6" ${st()}/>` +
      `<path d="M58 86 L72 112 L86 86 L100 112 L114 86 L128 112 L142 86" fill="none" stroke="#ffd43b" stroke-width="4" stroke-linejoin="round"/><rect x="95" y="10" width="10" height="58" rx="5" fill="#c98a4e" ${st(3)}/><circle cx="100" cy="12" r="9" fill="#fff4e6" ${st(3)}/>`,
    face_hot: () => bg('#fff4e6', '#ffd8a8') + face({ mouth: 'open', hot: true, cy: 76 }) + `<path d="M76 24 q-8 -8 0 -16 M100 20 q-8 -8 0 -16 M124 24 q-8 -8 0 -16" fill="none" stroke="#adb5bd" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M158 112 q8 -22 26 -26 q-4 18 -26 26 Z" fill="#fa5252" ${st(3)}/><path d="M182 86 q2 -6 6 -8" fill="none" stroke="#2f9e44" stroke-width="4" stroke-linecap="round"/>`,
    face_snore: () => bg('#e7f0ff', '#cdddff') + `<rect x="34" y="70" width="132" height="54" rx="20" fill="#fff" ${st()}/>` + face({ eyes: 'closed', mouth: 'o', cy: 66 }) + `<rect x="20" y="106" width="160" height="34" rx="12" fill="#748ffc" ${st()}/>` +
      `<text x="150" y="40" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#5c7cfa">Z</text><text x="172" y="22" font-family="Arial Black,Arial,sans-serif" font-size="18" font-weight="900" fill="#5c7cfa">z</text>`,
    face_throat: () => bg(...ROOM) + `<rect x="86" y="92" width="28" height="30" fill="${SK}" ${st()}/><path d="M40 140 Q46 112 100 116 Q154 112 160 140 Z" fill="#74c0fc" ${st()}/>` + face({ mouth: 'open', cy: 56, r: 38 }) +
      `<rect x="62" y="100" width="56" height="20" rx="10" fill="${SK}" ${st()}/>` + fingers(74, 104, 4, 9, 12) + `<path d="M126 104 q10 -4 14 -12 M128 114 q14 0 22 -6" fill="none" stroke="#4dabf7" stroke-width="4" stroke-linecap="round"/>`,
    kid_belly: () => bg(...MINT) + ground() + `<rect x="68" y="66" width="64" height="58" rx="22" fill="#74c0fc" ${st()}/><circle cx="104" cy="98" r="7" fill="#2b1d2a"/>` + face({ cy: 40, r: 28 }) +
      `<ellipse cx="88" cy="98" rx="16" ry="11" fill="${SK}" ${st()}/>` + fingers(80, 92, 3, 7, 10),
    blow: () => bg(...LAV) + face({ cx: 76, cy: 70, mouth: 'blow', eyes: 'closed' }) + `<path d="M118 84 h20 M120 96 h24 M118 108 h18" stroke="#74c0fc" stroke-width="4" stroke-linecap="round"/>` +
      `<rect x="152" y="80" width="22" height="50" rx="6" fill="#fff4e6" ${st()}/><path d="M163 80 v-8" ${st(3)}/><path d="M164 72 q18 -10 10 -30 q-4 14 -14 18 q-6 6 4 12 Z" fill="#ffa94d" ${st(3)}/>`,
    face_gargle: () => bg(...SKY) + face({ eyes: 'up', mouth: 'o', cy: 80 }) + [[90, 34, 8], [112, 22, 6], [104, 44, 5], [124, 40, 7], [84, 18, 5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#d0ebff" ${st(3)}/>`).join(''),
    face_pant: () => bg('#fff4e6', '#ffe3e3') + face({ mouth: 'open', hot: true }) + `<path d="M44 34 q-6 10 0 14 q6 -4 0 -14 Z M156 30 q-6 10 0 14 q6 -4 0 -14 Z M162 56 q-5 8 0 11 q5 -3 0 -11 Z" fill="#74c0fc" ${st(2.5)}/>` +
      `<path d="M20 70 h16 M16 84 h18 M164 84 h18 M166 98 h16" stroke="#adb5bd" stroke-width="4" stroke-linecap="round"/>`,
    face_cough: () => bg(...ROOM) + face({ eyes: 'squeeze', mouth: 'open' }) + `<circle cx="104" cy="104" r="16" fill="${SK}" ${st()}/>` + fingers(97, 96, 3, 7, 10) +
      `<circle cx="140" cy="96" r="8" fill="#e9ecef" ${st(3)}/><circle cx="156" cy="84" r="10" fill="#e9ecef" ${st(3)}/><circle cx="174" cy="72" r="7" fill="#e9ecef" ${st(3)}/>`,
    loop: () => bg(...MINT) + `<path d="M76 18 L76 92 C76 132 132 132 132 92" fill="none" stroke="#4dabf7" stroke-width="10" stroke-linecap="round" stroke-dasharray="1 16"/><path d="M76 18 L76 92 C76 132 132 132 132 92" fill="none" stroke="#1c7ed6" stroke-width="6" stroke-linecap="round"/><path d="M120 98 L132 84 L144 98" fill="none" stroke="#1c7ed6" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<g transform="translate(150 44) rotate(30)"><rect x="-6" y="-26" width="12" height="44" rx="3" fill="#ffd43b" ${st(3)}/><path d="M-6 18 L0 30 L6 18 Z" fill="#f4c8a0" ${st(3)}/></g>`,
    lollipop: () => bg(...PINK) + `<rect x="95" y="88" width="10" height="48" rx="5" fill="#fff" ${st(3)}/><circle cx="100" cy="58" r="40" fill="#ff8cc6" ${st()}/>` +
      `<path d="M100 58 m0 -6 a6 6 0 1 1 -6 6 a12 12 0 1 1 12 12 a18 18 0 1 1 -18 -18 a24 24 0 1 1 24 24 a30 30 0 1 1 -30 -30" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`,
    eye: () => bg(...SKY) + `<path d="M24 70 Q100 8 176 70 Q100 132 24 70 Z" fill="#fff" ${st()}/><circle cx="100" cy="70" r="28" fill="#4dabf7" ${st(3)}/><circle cx="100" cy="70" r="13" fill="#2b1d2a"/><circle cx="108" cy="62" r="6" fill="#fff"/>` +
      `<path d="M52 44 l-8 -12 M76 32 l-4 -14 M100 28 v-14 M124 32 l4 -14 M148 44 l8 -12" ${st()}/>`,
    rose: () => bg(...PINK) + ground('#b2f2bb') + `<path d="M100 70 Q96 100 100 132" fill="none" stroke="#2f9e44" stroke-width="7" stroke-linecap="round"/><ellipse cx="80" cy="104" rx="16" ry="8" fill="#51cf66" ${st(3)} transform="rotate(-25 80 104)"/><ellipse cx="120" cy="112" rx="16" ry="8" fill="#51cf66" ${st(3)} transform="rotate(25 120 112)"/>` +
      `<circle cx="100" cy="50" r="28" fill="#ff6b8b" ${st()}/><path d="M86 52 q14 -16 28 0 q-14 14 -28 0 Z M92 42 q8 -8 16 0" fill="#ff8fab" ${st(3)}/>`,
    face: () => bg(...ROOM) + face({}),
  };

  /* صور الكلمات: 224×144 بأسلوب كرتوني ناعم */
  const E = (x, y, r) => { r = r || 4; return `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.25}" fill="#2b1d2a"/><circle cx="${x + r * .4}" cy="${y - r * .5}" r="${r * .42}" fill="#fff"/>`; };
  const CH = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="3.6" fill="#ff9fb4" opacity=".85"/>`;
  const SM = (x, y, w) => `<path d="M${x - w} ${y} Q${x} ${y + w * .9} ${x + w} ${y}" fill="none" ${st(3)}/>`;
  const lg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="224" height="144" fill="url(#${id})"/>`;
  const PBG = {
    out: lg('pb', '#e3f4ff', '#c8e9ff') + `<path d="M0 122 Q112 110 224 122 V144 H0 Z" fill="#b2f2bb"/>`,
    room: lg('pb', '#fff8ea', '#ffeacb') + `<rect y="124" width="224" height="20" fill="#f5d9ae"/>`,
    sea: lg('pb', '#e3f4ff', '#c8e9ff') + `<path d="M0 100 Q28 94 56 100 T112 100 T168 100 T224 100 V144 H0 Z" fill="#74c0fc"/><path d="M10 118 q12 -5 24 0 t24 0 M120 128 q12 -5 24 0 t24 0" fill="none" stroke="#d0ebff" stroke-width="3" stroke-linecap="round"/>`,
    night: lg('pb', '#34428a', '#1c2552') + [[30, 24], [190, 30], [60, 110], [200, 112], [176, 70], [36, 72]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#fff" opacity=".8"/>`).join(''),
    desert: lg('pb', '#e3f4ff', '#ffe9c2') + `<path d="M0 120 Q60 106 120 118 T224 114 V144 H0 Z" fill="#ffd98a"/>`,
    snow: lg('pb', '#e7f5ff', '#d0ebff') + `<path d="M0 118 Q112 106 224 118 V144 H0 Z" fill="#fff"/>`,
  };
  const PCAT = { duck: 'sea', whale: 'sea', fish: 'sea', ship: 'sea', sea: 'sea', moon: 'night', crescent: 'night', star: 'night', camel: 'desert', snow: 'snow',
    lion: 'out', hen: 'out', dog: 'out', fox: 'out', rooster: 'out', bear: 'out', monkey: 'out', giraffe: 'out', elephant: 'out', frog: 'out', tree: 'out', rose: 'out', sun: 'out', cloud: 'out', plane: 'out', parrot: 'out', olive: 'out', bird: 'out', cat: 'out', mouse: 'out' };
  const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k * 2 * Math.PI / n)).join('');
  const PIC = {
    lion: () => ring(12, a => `<circle cx="${112 + 42 * Math.cos(a)}" cy="${72 + 42 * Math.sin(a)}" r="15" fill="#f08c00" ${st(3)}/>`) + `<circle cx="112" cy="72" r="44" fill="#f08c00"/>` +
      `<circle cx="88" cy="46" r="9" fill="#ffd43b" ${st(3)}/><circle cx="136" cy="46" r="9" fill="#ffd43b" ${st(3)}/><circle cx="112" cy="74" r="32" fill="#ffd43b" ${st()}/>` +
      E(100, 68, 4.5) + E(124, 68, 4.5) + `<path d="M106 80 h12 l-6 7 Z" fill="#8d5524"/><path d="M112 87 q-5 6 -11 2 M112 87 q5 6 11 2" fill="none" ${st(3)}/>` + CH(92, 84) + CH(132, 84),
    mouse: () => `<path d="M160 100 C190 104 198 80 186 66" fill="none" stroke="#868e96" stroke-width="5" stroke-linecap="round"/><ellipse cx="124" cy="96" rx="42" ry="26" fill="#adb5bd" ${st()}/>` +
      `<circle cx="70" cy="50" r="15" fill="#ced4da" ${st(3)}/><circle cx="70" cy="50" r="8" fill="#ffc9d6"/><circle cx="100" cy="46" r="15" fill="#ced4da" ${st(3)}/><circle cx="100" cy="46" r="8" fill="#ffc9d6"/>` +
      `<circle cx="84" cy="76" r="25" fill="#ced4da" ${st()}/>` + E(78, 72, 3.8) + E(96, 72, 3.8) + `<circle cx="70" cy="86" r="4.5" fill="#ff8fab"/>` + CH(98, 86) + `<path d="M60 84 h-16 M60 90 l-14 4" ${st(2)}/>`,
    face: () => face({ cx: 112, cy: 76, r: 44 }),
    egg: () => `<ellipse cx="112" cy="126" rx="34" ry="6" fill="#000" opacity=".1"/><ellipse cx="112" cy="80" rx="33" ry="43" fill="#fffaf0" ${st()}/><ellipse cx="100" cy="62" rx="8" ry="12" fill="#fff"/>`,
    duck: () => `<path d="M160 90 l18 -12 l-4 18 Z" fill="#ffd43b" ${st(3)}/><ellipse cx="122" cy="96" rx="46" ry="25" fill="#ffd43b" ${st()}/><ellipse cx="128" cy="92" rx="20" ry="11" fill="#fcc419" ${st(3)}/>` +
      `<circle cx="86" cy="62" r="22" fill="#ffd43b" ${st()}/><path d="M66 62 q-16 2 -18 9 q9 6 20 0 Z" fill="#ff922b" ${st(3)}/>` + E(88, 57, 4) + CH(97, 70),
    dog: () => `<circle cx="112" cy="74" r="38" fill="#e8b27c" ${st()}/><ellipse cx="78" cy="72" rx="13" ry="28" fill="#8d5524" ${st(3)} transform="rotate(15 78 72)"/><ellipse cx="146" cy="72" rx="13" ry="28" fill="#8d5524" ${st(3)} transform="rotate(-15 146 72)"/>` +
      E(99, 66, 4.5) + E(125, 66, 4.5) + `<ellipse cx="112" cy="92" rx="20" ry="14" fill="#f8dcbc" ${st(3)}/><ellipse cx="112" cy="84" rx="7" ry="5" fill="#2b1d2a"/><path d="M108 97 q4 12 8 0 Z" fill="#ff8fa3" ${st(2.5)}/><path d="M112 89 v6 M103 95 q9 6 18 0" fill="none" ${st(2.5)}/>` + CH(90, 86) + CH(134, 86),
    dates: () => `<ellipse cx="112" cy="114" rx="72" ry="14" fill="#e9ecef" ${st()}/>` +
      [[84, 98, -30], [140, 98, 30], [112, 96, 0], [98, 76, -12], [126, 76, 12]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="21" fill="#8d4b2a" ${st(3)} transform="rotate(${r} ${x} ${y})"/><ellipse cx="${x - 3}" cy="${y - 8}" rx="3" ry="6" fill="#fff" opacity=".35" transform="rotate(${r} ${x} ${y})"/>`).join(''),
    apple: () => `<path d="M112 50 C86 34 60 56 66 88 C72 118 98 128 112 118 C126 128 152 118 158 88 C164 56 138 34 112 50 Z" fill="#ff5a5a" ${st()}/><path d="M112 50 q2 -14 8 -20" fill="none" stroke="#8d5524" stroke-width="5" stroke-linecap="round"/>` +
      `<ellipse cx="132" cy="34" rx="13" ry="6.5" fill="#69db7c" ${st(3)} transform="rotate(-20 132 34)"/><ellipse cx="88" cy="72" rx="7" ry="12" fill="#fff" opacity=".55"/>`,
    house: () => `<rect x="138" y="32" width="13" height="24" fill="#c92a2a" ${st(3)}/><rect x="66" y="64" width="92" height="58" fill="#ffe066" ${st()}/><path d="M54 68 L112 24 L170 68 Z" fill="#ff6b6b" ${st()}/>` +
      `<rect x="100" y="88" width="24" height="34" rx="4" fill="#c98a4e" ${st(3)}/><circle cx="118" cy="106" r="2.5" fill="#2b1d2a"/><rect x="74" y="78" width="18" height="18" fill="#a5d8ff" ${st(3)}/><rect x="132" y="78" width="18" height="18" fill="#a5d8ff" ${st(3)}/>`,
    snow: () => `<circle cx="112" cy="100" r="26" fill="#fff" ${st()}/><circle cx="112" cy="58" r="19" fill="#fff" ${st()}/><path d="M95 72 h34 v8 h-34 Z M122 78 v16 h8 v-16" fill="#ff6b6b" ${st(3)}/>` +
      `<circle cx="105" cy="54" r="2.6" fill="#2b1d2a"/><circle cx="119" cy="54" r="2.6" fill="#2b1d2a"/><path d="M112 59 l15 3 l-15 3 Z" fill="#ff922b"/><path d="M106 66 q6 4 12 0" fill="none" ${st(2.5)}/><circle cx="112" cy="94" r="2.6" fill="#2b1d2a"/><circle cx="112" cy="106" r="2.6" fill="#2b1d2a"/>` +
      [[52, 30], [170, 40], [64, 76], [182, 84], [150, 18], [40, 104]].map(([x, y]) => `<path d="M${x} ${y - 6} v12 M${x - 6} ${y} h12 M${x - 4} ${y - 4} l8 8 M${x + 4} ${y - 4} l-8 8" stroke="#74c0fc" stroke-width="2.4" stroke-linecap="round"/>`).join(''),
    fox: () => `<path d="M140 104 q46 -4 50 -48 q-18 12 -30 12 q-24 18 -20 36 Z" fill="#ff922b" ${st(3)}/><path d="M182 62 q8 -4 8 -6 q-6 10 -14 10 Z" fill="#fff"/><ellipse cx="124" cy="106" rx="30" ry="17" fill="#ff922b" ${st(3)}/>` +
      `<path d="M70 52 L82 22 L100 44 Q112 40 124 44 L142 22 L154 52 Q160 84 112 100 Q64 84 70 52 Z" fill="#ff922b" ${st()}/><path d="M80 32 L84 46 L92 42 Z M144 32 L140 46 L132 42 Z" fill="#ffc9d6"/>` +
      `<path d="M74 66 Q92 92 112 98 Q98 76 74 66 Z M150 66 Q132 92 112 98 Q126 76 150 66 Z" fill="#fff"/>` + E(100, 62, 4) + E(124, 62, 4) + `<circle cx="112" cy="86" r="5" fill="#2b1d2a"/>`,
    triangle: () => `<path d="M112 22 L174 120 L50 120 Z" fill="#69db7c" stroke="${S}" stroke-width="5" stroke-linejoin="round"/>` + E(100, 84, 4) + E(124, 84, 4) + SM(112, 98, 9) + CH(92, 100) + CH(132, 100),
    camel: () => [70, 84, 118, 132].map(x => `<rect x="${x}" y="96" width="9" height="28" rx="4" fill="#d9a066" ${st(2.5)}/>`).join('') +
      `<path d="M58 92 Q62 70 86 72 Q100 42 118 66 Q134 68 142 82 L146 94 Q140 106 120 106 L76 106 Q58 106 58 92 Z" fill="#e8b27c" ${st()}/>` +
      `<path d="M136 86 Q152 72 154 50 L168 50 Q168 78 150 96 Z" fill="#e8b27c" ${st(3)}/><ellipse cx="166" cy="48" rx="16" ry="11" fill="#e8b27c" ${st(3)}/>` + E(166, 44, 3) + `<path d="M176 52 q4 2 6 0" fill="none" ${st(2)}/><path d="M58 90 q-8 6 -6 14" fill="none" ${st(3)}/>`,
    rooster: () => [['#40c057', -40], ['#228be6', -20], ['#fab005', 0]].map(([c, r]) => `<ellipse cx="70" cy="70" rx="12" ry="30" fill="${c}" ${st(3)} transform="rotate(${r} 84 96)"/>`).join('') +
      `<path d="M104 118 v8 l-6 4 M104 126 l6 4 M124 118 v8 l-6 4 M124 126 l6 4" fill="none" stroke="#f59f00" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="114" cy="94" rx="34" ry="27" fill="#f76707" ${st()}/><ellipse cx="108" cy="96" rx="18" ry="12" fill="#d9480f" ${st(3)}/>` +
      `<path d="M126 52 q4 -12 10 -4 q4 -12 10 -2 q6 -10 10 2 Z" fill="#fa5252" ${st(3)}/><circle cx="140" cy="62" r="18" fill="#f76707" ${st()}/><path d="M156 60 l14 4 l-14 5 Z" fill="#fab005" ${st(2.5)}/><path d="M152 72 q6 12 -2 14 q-6 -6 2 -14 Z" fill="#fa5252" ${st(2.5)}/>` + E(144, 58, 3.4),
    hen: () => `<path d="M64 84 q-14 -18 -4 -34 q10 14 18 22 Z" fill="#fff4e6" ${st(3)}/><path d="M104 118 v8 l-6 4 M104 126 l6 4 M124 118 v8 l-6 4 M124 126 l6 4" fill="none" stroke="#f59f00" stroke-width="3.5" stroke-linecap="round"/>` +
      `<ellipse cx="112" cy="94" rx="36" ry="28" fill="#fff4e6" ${st()}/><ellipse cx="106" cy="96" rx="18" ry="12" fill="#ffe8cc" ${st(3)}/>` +
      `<path d="M132 52 q4 -8 8 -2 q4 -8 8 0 Z" fill="#fa5252" ${st(2.5)}/><circle cx="140" cy="64" r="18" fill="#fff4e6" ${st()}/><path d="M156 62 l12 4 l-12 5 Z" fill="#fab005" ${st(2.5)}/><path d="M152 74 q4 8 -2 10 q-4 -4 2 -10 Z" fill="#fa5252" ${st(2)}/>` + E(144, 60, 3.4) + CH(134, 72),
    crown: () => `<path d="M60 104 L64 50 L90 76 L112 36 L134 76 L160 50 L164 104 Z" fill="#ffd43b" ${st()}/><rect x="58" y="98" width="108" height="18" rx="4" fill="#fab005" ${st()}/>` +
      `<circle cx="64" cy="48" r="6" fill="#ff6b6b" ${st(2.5)}/><circle cx="112" cy="34" r="7" fill="#4dabf7" ${st(2.5)}/><circle cx="160" cy="48" r="6" fill="#ff6b6b" ${st(2.5)}/><circle cx="86" cy="107" r="5" fill="#40c057"/><circle cx="112" cy="107" r="5" fill="#ff6b6b"/><circle cx="138" cy="107" r="5" fill="#4dabf7"/>`,
    whale: () => `<path d="M96 48 q-4 -16 -14 -22 M96 48 v-26 M96 48 q4 -16 14 -22" fill="none" stroke="#74c0fc" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M38 86 Q42 52 96 52 Q150 52 162 80 L186 64 Q192 80 184 92 Q192 104 186 116 L162 102 Q150 120 96 120 Q42 120 38 86 Z" fill="#4dabf7" ${st()}/><path d="M46 98 Q96 124 152 106 Q100 114 46 98 Z" fill="#d0ebff"/>` + E(70, 80, 4.5) + `<path d="M58 96 q14 8 28 2" fill="none" ${st(3)}/>` + CH(80, 92),
    sea: () => `<circle cx="178" cy="34" r="16" fill="#ffd43b" ${st(3)}/><path d="M20 84 q20 -24 40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#1c7ed6" stroke-width="5" stroke-linecap="round"/><path d="M8 66 q14 -14 28 0" fill="none" stroke="#4dabf7" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M120 42 q6 -6 12 0 q6 -6 12 0 M70 30 q5 -5 10 0 q5 -5 10 0" fill="none" ${st(2.5)}/>`,
    bread: () => `<ellipse cx="112" cy="118" rx="70" ry="10" fill="#c98a4e" ${st(3)}/><path d="M50 102 Q48 60 112 56 Q176 60 174 102 Q172 116 112 116 Q52 116 50 102 Z" fill="#e8a34c" ${st()}/>` +
      `<path d="M80 70 l10 22 M104 64 l10 24 M128 64 l10 24 M150 72 l8 18" stroke="#b8742a" stroke-width="4" stroke-linecap="round"/><ellipse cx="88" cy="72" rx="16" ry="5" fill="#fff" opacity=".3"/>`,
    peach: () => `<path d="M112 48 C80 34 60 64 66 92 C72 120 100 126 112 116 C124 126 152 120 158 92 C164 64 144 34 112 48 Z" fill="#ffb37a" ${st()}/><ellipse cx="132" cy="90" rx="18" ry="20" fill="#ff8787" opacity=".55"/>` +
      `<path d="M112 52 Q104 84 112 114" fill="none" stroke="#e8590c" stroke-width="2.5" opacity=".6"/><path d="M112 48 q0 -10 4 -16" fill="none" stroke="#8d5524" stroke-width="4" stroke-linecap="round"/><ellipse cx="128" cy="32" rx="13" ry="6" fill="#69db7c" ${st(3)} transform="rotate(-18 128 32)"/>`,
    watermelon: () => `<path d="M40 64 A72 72 0 0 0 184 64 Z" fill="#51cf66" ${st()}/><path d="M50 64 A62 62 0 0 0 174 64 Z" fill="#f1f3f5"/><path d="M56 64 A56 56 0 0 0 168 64 Z" fill="#ff6b6b"/>` +
      [[84, 78], [104, 92], [126, 84], [146, 76], [112, 74], [96, 104], [130, 104]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="5" fill="#2b1d2a"/>`).join('') + `<path d="M40 64 H184" ${st()}/>`,
    bear: () => `<circle cx="80" cy="44" r="14" fill="#a9714b" ${st(3)}/><circle cx="80" cy="44" r="7" fill="#e0b48a"/><circle cx="144" cy="44" r="14" fill="#a9714b" ${st(3)}/><circle cx="144" cy="44" r="7" fill="#e0b48a"/>` +
      `<circle cx="112" cy="76" r="38" fill="#a9714b" ${st()}/>` + E(98, 68, 4.5) + E(126, 68, 4.5) + `<ellipse cx="112" cy="92" rx="18" ry="13" fill="#e0b48a" ${st(3)}/><ellipse cx="112" cy="86" rx="7" ry="5" fill="#2b1d2a"/><path d="M112 90 v5 M105 97 q7 5 14 0" fill="none" ${st(2.5)}/>` + CH(90, 86) + CH(134, 86),
    rose: () => `<path d="M112 70 Q108 100 112 130" fill="none" stroke="#2f9e44" stroke-width="7" stroke-linecap="round"/><ellipse cx="92" cy="104" rx="16" ry="8" fill="#51cf66" ${st(3)} transform="rotate(-25 92 104)"/><ellipse cx="132" cy="112" rx="16" ry="8" fill="#51cf66" ${st(3)} transform="rotate(25 132 112)"/>` +
      `<circle cx="112" cy="50" r="29" fill="#ff6b8b" ${st()}/><path d="M97 52 q15 -17 30 0 q-15 15 -30 0 Z M104 42 q8 -8 16 0" fill="#ff8fab" ${st(3)}/>`,
    hand: () => [[86, 34], [99, 24], [112, 22], [125, 28]].map(([x, y]) => `<rect x="${x}" y="${y}" width="13" height="58" rx="6.5" fill="${SK}" ${st(3)}/>`).join('') +
      `<rect x="66" y="74" width="14" height="40" rx="7" fill="${SK}" ${st(3)} transform="rotate(-40 73 94)"/><rect x="82" y="62" width="58" height="58" rx="24" fill="${SK}" ${st()}/><path d="M96 70 v8 M110 70 v8 M124 70 v8" stroke="${SK2}" stroke-width="2.5" stroke-linecap="round"/>`,
    gold: () => `<path d="M60 102 L74 78 L140 78 L154 102 Z" fill="#ffd43b" ${st()}/><path d="M74 78 L82 66 L132 66 L140 78 Z" fill="#ffe066" ${st(3)}/>` +
      `<ellipse cx="160" cy="112" rx="20" ry="7" fill="#fab005" ${st(3)}/><ellipse cx="160" cy="104" rx="20" ry="7" fill="#fcc419" ${st(3)}/><ellipse cx="160" cy="96" rx="20" ry="7" fill="#ffd43b" ${st(3)}/>` + sparkle(64, 52) + sparkle(150, 52) + sparkle(110, 44, '#fff'),
    corn: () => `<ellipse cx="112" cy="70" rx="22" ry="46" fill="#ffd43b" ${st()}/>` + [0, 1, 2, 3, 4, 5, 6].map(r => [-1, 0, 1].map(c => `<ellipse cx="${112 + c * 12}" cy="${36 + r * 11}" rx="5" ry="4.4" fill="#fab005"/>`).join('')).join('') +
      `<path d="M112 128 Q72 104 82 56 Q94 96 112 120 Z" fill="#69db7c" ${st(3)}/><path d="M112 128 Q152 104 142 56 Q130 96 112 120 Z" fill="#51cf66" ${st(3)}/>`,
    ear: () => `<path d="M100 28 C142 20 162 54 152 86 C146 106 128 104 124 120 C120 132 98 134 94 120 C90 108 104 102 104 92 C88 86 74 64 82 44 C86 34 92 30 100 28 Z" fill="${SK}" ${st()}/>` +
      `<path d="M104 50 C126 42 142 62 134 82 C130 90 118 88 116 98" fill="none" stroke="${SK2}" stroke-width="5" stroke-linecap="round"/>`,
    pomegranate: () => `<circle cx="112" cy="82" r="40" fill="#e03131" ${st()}/><path d="M98 46 L102 30 L108 40 L112 28 L116 40 L122 30 L126 46 Z" fill="#c92a2a" ${st(3)}/><ellipse cx="94" cy="70" rx="8" ry="12" fill="#fff" opacity=".4"/>`,
    monkey: () => `<circle cx="72" cy="70" r="14" fill="#a9714b" ${st(3)}/><circle cx="72" cy="70" r="7" fill="#f3d2a8"/><circle cx="152" cy="70" r="14" fill="#a9714b" ${st(3)}/><circle cx="152" cy="70" r="7" fill="#f3d2a8"/>` +
      `<circle cx="112" cy="70" r="38" fill="#a9714b" ${st()}/><path d="M112 58 C98 44 78 56 86 76 C78 96 94 106 112 104 C130 106 146 96 138 76 C146 56 126 44 112 58 Z" fill="#f3d2a8" ${st(3)}/>` +
      E(100, 68, 4) + E(124, 68, 4) + `<circle cx="108" cy="84" r="1.8" fill="#2b1d2a"/><circle cx="116" cy="84" r="1.8" fill="#2b1d2a"/><path d="M100 92 q12 10 24 0" fill="none" ${st(3)}/>`,
    moon: () => `<circle cx="112" cy="72" r="40" fill="#ffe066" ${st()}/><circle cx="128" cy="56" r="7" fill="#fcc419"/><circle cx="96" cy="94" r="5" fill="#fcc419"/><path d="M96 70 q6 5 12 0 M118 70 q6 5 12 0" fill="none" ${st(3)}/>` + SM(112, 84, 8) + CH(92, 82) + CH(134, 82),
    giraffe: () => `<rect x="76" y="104" width="8" height="24" fill="#ffd43b" ${st(2.5)}/><rect x="110" y="104" width="8" height="24" fill="#ffd43b" ${st(2.5)}/><ellipse cx="96" cy="104" rx="32" ry="16" fill="#ffd43b" ${st()}/>` +
      `<path d="M106 98 L128 40 L142 44 L122 102 Z" fill="#ffd43b" ${st(3)}/><path d="M138 26 v-10 M150 26 v-10" ${st(3)}/><circle cx="138" cy="15" r="3.5" fill="#8d5524"/><circle cx="150" cy="15" r="3.5" fill="#8d5524"/>` +
      `<ellipse cx="148" cy="34" rx="20" ry="12" fill="#ffd43b" ${st(3)}/>` + E(146, 30, 3.4) + `<circle cx="162" cy="36" r="1.8" fill="#2b1d2a"/>` +
      [[86, 100], [104, 108], [120, 72], [128, 56], [114, 88], [72, 108]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="4" fill="#e8590c" opacity=".8"/>`).join(''),
    olive: () => `<path d="M40 104 Q112 64 186 46" fill="none" stroke="#8d5524" stroke-width="5" stroke-linecap="round"/>` +
      [[70, 82, -40], [104, 60, -60], [140, 56, -10], [168, 40, -40], [120, 82, 20]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="15" ry="6" fill="#74b816" ${st(2.5)} transform="rotate(${r} ${x} ${y})"/>`).join('') +
      [[86, 98, '#5c940d'], [122, 100, '#343a40'], [152, 74, '#5c940d']].map(([x, y, c]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="12" fill="${c}" ${st(2.5)}/><ellipse cx="${x - 3}" cy="${y - 4}" rx="2.5" ry="4" fill="#fff" opacity=".45"/>`).join(''),
    banana: () => [[0, 0], [16, -8], [30, -14]].map(([dx, dy]) => `<path d="M${64 + dx} ${56 + dy} Q${72 + dx} ${118 + dy} ${150 + dx} ${110 + dy} Q${160 + dx} ${106 + dy} ${154 + dx} ${100 + dy} Q${98 + dx} ${102 + dy} ${82 + dx} ${54 + dy} Z" fill="#ffe066" ${st(3)}/>`).join('') +
      `<rect x="64" y="34" width="14" height="18" rx="4" fill="#8d5524" ${st(2.5)} transform="rotate(-15 71 43)"/>`,
    fish: () => `<path d="M144 76 L180 52 L176 100 Z" fill="#ff922b" ${st()}/><path d="M92 50 q16 -16 34 2 Z" fill="#ff922b" ${st(3)}/><ellipse cx="104" cy="76" rx="46" ry="29" fill="#ff922b" ${st()}/>` +
      `<path d="M112 52 q-8 24 0 48 M128 56 q-6 20 0 40" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/>` + E(80, 70, 5) + SM(76, 86, 6) + `<circle cx="44" cy="52" r="5" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="34" cy="36" r="3.5" fill="none" stroke="#fff" stroke-width="2.5"/>`,
    clock: () => `<circle cx="112" cy="74" r="50" fill="#ff6b6b" ${st()}/><circle cx="112" cy="74" r="40" fill="#fff" ${st(3)}/>` +
      ring(12, a => `<path d="M${112 + 34 * Math.cos(a)} ${74 + 34 * Math.sin(a)} L${112 + 38 * Math.cos(a)} ${74 + 38 * Math.sin(a)}" ${st(3)}/>`) + `<path d="M112 74 V46 M112 74 L132 84" ${st(5)}/><circle cx="112" cy="74" r="4" fill="${S}"/>`,
    sun: () => ring(12, a => `<path d="M${112 + 44 * Math.cos(a)} ${70 + 44 * Math.sin(a)} L${112 + 58 * Math.cos(a)} ${70 + 58 * Math.sin(a)}" stroke="#fab005" stroke-width="6" stroke-linecap="round"/>`) +
      `<circle cx="112" cy="70" r="34" fill="#ffd43b" ${st()}/><path d="M96 66 q6 -6 12 0 M116 66 q6 -6 12 0" fill="none" ${st(3)}/>` + SM(112, 80, 9) + CH(92, 80) + CH(132, 80),
    tree: () => `<rect x="104" y="74" width="16" height="50" fill="#8d5524" ${st()}/><path d="M66 82 a26 26 0 0 1 16 -46 a32 32 0 0 1 60 0 a26 26 0 0 1 16 46 Z" fill="#51cf66" ${st()}/><ellipse cx="96" cy="48" rx="10" ry="6" fill="#fff" opacity=".3"/>`,
    candle: () => `<circle cx="112" cy="40" r="26" fill="#fff3bf" opacity=".7"/><ellipse cx="112" cy="122" rx="42" ry="8" fill="#adb5bd" ${st(3)}/><rect x="96" y="56" width="32" height="64" rx="5" fill="#fff4e6" ${st()}/>` +
      `<path d="M104 56 v12 q0 6 4 6 q4 0 4 -6 v-12" fill="#fff4e6" ${st(2.5)}/><path d="M112 56 v-8" ${st(3)}/><path d="M112 22 Q126 40 112 50 Q98 40 112 22 Z" fill="#ffa94d" ${st(2.5)}/><path d="M112 34 Q118 42 112 47 Q106 42 112 34 Z" fill="#ffe066"/>`,
    feather: () => `<path d="M152 22 C112 38 74 80 68 122 C100 106 142 70 152 22 Z" fill="#74c0fc" ${st()}/><path d="M152 22 Q112 70 68 122" fill="none" stroke="#1c7ed6" stroke-width="3.5" stroke-linecap="round"/>` +
      `<path d="M130 50 l-14 -4 M118 66 l-16 -2 M104 84 l-16 0 M124 60 l6 12 M110 78 l6 12" stroke="#1c7ed6" stroke-width="2.5" stroke-linecap="round"/>`,
    box: () => `<path d="M68 62 L92 44 L178 44 L154 62 Z" fill="#f4c38a" ${st()}/><path d="M154 62 L178 44 L178 102 L154 122 Z" fill="#c98a4e" ${st()}/><rect x="68" y="62" width="86" height="60" fill="#e0a96d" ${st()}/>` +
      `<path d="M68 82 H154 M68 102 H154" stroke="#b37336" stroke-width="3"/><circle cx="111" cy="92" r="4" fill="#8d5524"/>`,
    bird: () => `<path d="M40 112 H190" stroke="#8d5524" stroke-width="7" stroke-linecap="round"/><path d="M98 108 l-4 8 M104 108 l0 8 M120 108 l0 8 M126 108 l4 8" stroke="#fab005" stroke-width="3.5" stroke-linecap="round"/>` +
      `<ellipse cx="112" cy="80" rx="28" ry="34" fill="#a9714b" ${st()}/><ellipse cx="112" cy="88" rx="16" ry="22" fill="#f3d2a8"/><path d="M84 74 q-8 26 10 40 q4 -20 -10 -40 Z M140 74 q8 26 -10 40 q-4 -20 10 -40 Z" fill="#8d5524" ${st(2.5)}/>` +
      `<circle cx="112" cy="46" r="21" fill="#a9714b" ${st()}/><path d="M106 52 q6 -4 12 0 q-2 12 -6 14 q-2 -6 -6 -14 Z" fill="#fab005" ${st(2.5)}/><circle cx="102" cy="42" r="6" fill="#ffd43b"/>` + E(102, 42, 3.4) + `<circle cx="122" cy="42" r="6" fill="#ffd43b"/>` + E(122, 42, 3.4),
    shirt: () => `<path d="M86 32 L60 44 L46 72 L68 82 L76 68 L76 122 L148 122 L148 68 L156 82 L178 72 L164 44 L138 32 Q112 46 86 32 Z" fill="#4dabf7" ${st()}/>` +
      `<path d="M86 32 L112 52 L100 62 Z M138 32 L112 52 L124 62 Z" fill="#fff" ${st(2.5)}/><path d="M112 52 V120" stroke="#1c7ed6" stroke-width="2"/><circle cx="112" cy="70" r="3" fill="#fff" ${st(1.5)}/><circle cx="112" cy="88" r="3" fill="#fff" ${st(1.5)}/><circle cx="112" cy="106" r="3" fill="#fff" ${st(1.5)}/>`,
    frog: () => `<g transform="translate(12 6)"><ellipse cx="100" cy="92" rx="56" ry="36" fill="#69db7c" ${st()}/><circle cx="74" cy="56" r="18" fill="#69db7c" ${st()}/><circle cx="126" cy="56" r="18" fill="#69db7c" ${st()}/>` +
      `<circle cx="74" cy="56" r="9" fill="#2b1d2a"/><circle cx="126" cy="56" r="9" fill="#2b1d2a"/><circle cx="77" cy="53" r="3" fill="#fff"/><circle cx="129" cy="53" r="3" fill="#fff"/><path d="M78 94 q22 18 44 0" fill="none" ${st()}/>` + CH(64, 94) + CH(136, 94) + `</g>`,
    sickbed: () => `<rect x="34" y="50" width="12" height="76" rx="4" fill="#c98a4e" ${st(3)}/><rect x="40" y="96" width="150" height="16" rx="4" fill="#fff" ${st(3)}/><rect x="184" y="84" width="10" height="42" rx="4" fill="#c98a4e" ${st(3)}/>` +
      `<ellipse cx="74" cy="90" rx="26" ry="10" fill="#fff" ${st(3)}/><circle cx="76" cy="76" r="18" fill="${SK}" ${st(3)}/><path d="M58 72 Q60 54 78 56 Q94 58 94 72 Q86 64 76 66 Q66 64 58 72 Z" fill="${HR}" ${st(2.5)}/>` +
      `<rect x="62" y="58" width="26" height="8" rx="3" fill="#74c0fc" ${st(2)}/><path d="M68 78 q3 3 6 0 M80 78 q3 3 6 0" fill="none" ${st(2.2)}/><path d="M76 86 l16 6" stroke="#ff6b6b" stroke-width="3" stroke-linecap="round"/>` + CH(66, 84) +
      `<rect x="92" y="78" width="96" height="30" rx="12" fill="#74c0fc" ${st()}/><path d="M112 82 v22 M140 82 v22 M168 82 v22" stroke="#a5d8ff" stroke-width="3"/>`,
    plane: () => `<path d="M48 72 L36 46 L52 46 L68 66 Z" fill="#ff6b6b" ${st(3)}/><path d="M104 70 L86 42 L102 42 L130 68 Z" fill="#4dabf7" ${st(3)}/>` +
      `<path d="M40 76 Q50 62 150 64 Q186 66 188 76 Q186 88 150 88 L50 88 Q40 86 40 76 Z" fill="#fff" ${st()}/><path d="M100 82 L72 116 L94 116 L132 84 Z" fill="#4dabf7" ${st(3)}/>` +
      [76, 92, 108, 124, 140].map(x => `<circle cx="${x}" cy="74" r="4" fill="#74c0fc"/>`).join('') + `<path d="M170 68 q10 2 14 8 h-14 Z" fill="#74c0fc"/>`,
    cat: () => `<path d="M80 50 L84 20 L106 42 Z M144 50 L140 20 L118 42 Z" fill="#ffa94d" ${st()}/><path d="M86 42 L87 30 L98 40 Z M138 42 L137 30 L126 40 Z" fill="#ffc9d6"/>` +
      `<circle cx="112" cy="74" r="38" fill="#ffa94d" ${st()}/><path d="M104 40 v10 M112 38 v12 M120 40 v10" stroke="#e8590c" stroke-width="3.5" stroke-linecap="round"/>` + E(98, 70, 5) + E(126, 70, 5) +
      `<path d="M108 84 h8 l-4 5 Z" fill="#ff8fab"/><path d="M112 89 q-4 6 -9 3 M112 89 q4 6 9 3" fill="none" ${st(2.5)}/><path d="M92 88 h-24 M92 94 l-22 6 M132 88 h24 M132 94 l22 6" ${st(2)}/>` + CH(88, 82) + CH(136, 82),
    envelope: () => `<rect x="54" y="42" width="116" height="76" rx="7" fill="#fff4e6" ${st()}/><path d="M54 116 L102 78 M170 116 L122 78" ${st(3)}/><path d="M56 46 L112 90 L168 46" fill="#ffe8cc" ${st()}/><path d="M112 82 c-6 -8 -16 -2 -10 6 l10 9 l10 -9 c6 -8 -4 -14 -10 -6 Z" fill="#ff6b6b" ${st(2)}/>`,
    glasses: () => `<path d="M56 68 L36 60 M168 68 L188 60" ${st(4)}/><circle cx="82" cy="76" r="26" fill="#e7f5ff" stroke="${S}" stroke-width="5"/><circle cx="142" cy="76" r="26" fill="#e7f5ff" stroke="${S}" stroke-width="5"/>` +
      `<path d="M108 72 Q112 62 116 72" fill="none" stroke="${S}" stroke-width="5" stroke-linecap="round"/><path d="M70 66 l10 -6 M130 66 l10 -6" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`,
    eye: () => `<g transform="translate(12 4)"><path d="M24 70 Q100 8 176 70 Q100 132 24 70 Z" fill="#fff" ${st()}/><circle cx="100" cy="70" r="28" fill="#4dabf7" ${st(3)}/><circle cx="100" cy="70" r="13" fill="#2b1d2a"/><circle cx="108" cy="62" r="6" fill="#fff"/>` +
      `<path d="M52 44 l-8 -12 M76 32 l-4 -14 M100 28 v-14 M124 32 l4 -14 M148 44 l8 -12" ${st()}/></g>`,
    cloud: () => `<path d="M56 104 a24 24 0 0 1 8 -46 a32 32 0 0 1 60 -12 a28 28 0 0 1 42 24 a20 20 0 0 1 2 34 Z" fill="#fff" ${st()}/>` + E(100, 80, 4.5) + E(128, 80, 4.5) + SM(114, 92, 8) + CH(88, 92) + CH(140, 92),
    parrot: () => `<path d="M40 112 H190" stroke="#8d5524" stroke-width="7" stroke-linecap="round"/><path d="M118 104 q-4 20 -18 30 q20 -2 28 -24 Z" fill="#228be6" ${st(2.5)}/><path d="M126 102 q4 22 -6 34 q18 -6 18 -30 Z" fill="#fa5252" ${st(2.5)}/>` +
      `<ellipse cx="116" cy="82" rx="24" ry="30" fill="#40c057" ${st()}/><ellipse cx="124" cy="84" rx="13" ry="22" fill="#fa5252" ${st(3)} transform="rotate(-12 124 84)"/>` +
      `<circle cx="104" cy="50" r="22" fill="#40c057" ${st()}/><path d="M84 46 q-16 2 -14 20 q6 -8 16 -8 Z" fill="#ffd43b" ${st(2.5)}/><circle cx="100" cy="46" r="7" fill="#fff" ${st(2)}/>` + E(100, 46, 3.2),
    jug: () => `<rect x="86" y="56" width="52" height="66" rx="12" fill="#fff" ${st()}/><path d="M98 56 L106 30 L118 30 L126 56 Z" fill="#ff922b" ${st(3)}/><path d="M108 30 l4 -10 l4 10" fill="#ff922b" ${st(2.5)}/>` +
      `<rect x="94" y="76" width="36" height="28" rx="5" fill="#ffd43b" ${st(2.5)}/><path d="M112 82 q8 10 0 16 q-8 -6 0 -16 Z" fill="#fff" ${st(2)}/><path d="M138 70 q10 4 6 16 q-4 4 -6 0" fill="#fff" ${st(2.5)}/>`,
    elephant: () => `<rect x="104" y="104" width="12" height="22" rx="5" fill="#adb5bd" ${st(2.5)}/><rect x="146" y="104" width="12" height="22" rx="5" fill="#adb5bd" ${st(2.5)}/><path d="M168 92 q12 4 10 18" fill="none" ${st(3)}/>` +
      `<ellipse cx="132" cy="94" rx="40" ry="26" fill="#adb5bd" ${st()}/><circle cx="82" cy="70" r="28" fill="#adb5bd" ${st()}/><path d="M60 78 Q46 104 56 120 Q64 124 68 116 Q62 104 74 88 Z" fill="#adb5bd" ${st(3)}/>` +
      `<ellipse cx="104" cy="70" rx="18" ry="26" fill="#ced4da" ${st(3)}/>` + E(76, 64, 4) + CH(70, 78) + `<path d="M68 90 q-6 6 -4 12" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`,
    dress: () => `<path d="M94 22 v14 M130 22 v14" stroke="#f783ac" stroke-width="5" stroke-linecap="round"/><path d="M92 34 L132 34 L128 60 Q160 108 168 124 L56 124 Q64 108 96 60 Z" fill="#f783ac" ${st()}/>` +
      `<rect x="94" y="56" width="36" height="8" fill="#fff" ${st(2.5)}/><path d="M112 60 l-10 -6 v12 Z M112 60 l10 -6 v12 Z" fill="#ffd43b" ${st(2)}/>` + [[90, 86], [130, 92], [108, 104], [80, 112], [146, 114], [120, 78]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#fff"/>`).join(''),
    ship: () => `<path d="M112 26 V92" ${st(4)}/><path d="M112 22 l18 6 l-18 6 Z" fill="#ff6b6b" ${st(2)}/><path d="M116 34 L116 86 L162 86 Z" fill="#fff" ${st(3)}/><path d="M108 40 L108 86 L70 86 Z" fill="#fff4e6" ${st(3)}/>` +
      `<path d="M38 92 L186 92 L166 122 L58 122 Z" fill="#c98a4e" ${st()}/>` + [80, 112, 144].map(x => `<circle cx="${x}" cy="106" r="5" fill="#d0ebff" ${st(2)}/>`).join(''),
    pen: () => `<g transform="rotate(-28 112 76)"><rect x="40" y="64" width="16" height="24" rx="4" fill="#ff8fab" ${st(3)}/><rect x="54" y="64" width="12" height="24" fill="#adb5bd" ${st(3)}/><rect x="64" y="64" width="96" height="24" fill="#ffd43b" ${st(3)}/>` +
      `<path d="M64 72 H160 M64 80 H160" stroke="#fab005" stroke-width="2"/><path d="M160 64 L190 76 L160 88 Z" fill="#f4c8a0" ${st(3)}/><path d="M180 72 L190 76 L180 80 Z" fill="#2b1d2a"/></g>`,
    book: () => `<path d="M112 122 Q80 110 44 118 L44 50 Q80 42 112 54 Q144 42 180 50 L180 118 Q144 110 112 122 Z" fill="#4dabf7" ${st()}/>` +
      `<path d="M112 52 Q84 38 52 46 L52 112 Q84 104 112 116 Z" fill="#fff" ${st(3)}/><path d="M112 52 Q140 38 172 46 L172 112 Q140 104 112 116 Z" fill="#fff" ${st(3)}/>` +
      [62, 74, 86, 98].map(y => `<path d="M62 ${y} q20 -4 40 2 M122 ${y + 2} q20 -6 40 -2" fill="none" stroke="#ced4da" stroke-width="3" stroke-linecap="round"/>`).join(''),
    lemon: () => `<path d="M58 80 Q60 46 112 44 Q164 46 166 80 Q164 112 112 114 Q60 112 58 80 Z" fill="#ffe066" ${st()}/><path d="M58 80 l-8 -2 l8 -4 M166 80 l8 2 l-8 4" fill="#ffe066" ${st(2.5)}/>` +
      `<ellipse cx="128" cy="38" rx="13" ry="6" fill="#69db7c" ${st(3)} transform="rotate(-18 128 38)"/><ellipse cx="88" cy="68" rx="12" ry="6" fill="#fff" opacity=".5"/>`,
    star: () => `<path d="${(() => { let d = ''; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 22 : 50; d += (k ? 'L' : 'M') + (112 + r * Math.cos(a)).toFixed(1) + ' ' + (76 + r * Math.sin(a)).toFixed(1) + ' '; } return d + 'Z'; })()}" fill="#ffd43b" ${st()}/>` +
      E(102, 74, 3.6) + E(122, 74, 3.6) + SM(112, 86, 6) + CH(96, 86) + CH(128, 86),
    fire: () => `<rect x="62" y="110" width="100" height="14" rx="7" fill="#8d5524" ${st(3)} transform="rotate(-10 112 117)"/><rect x="62" y="110" width="100" height="14" rx="7" fill="#a0673f" ${st(3)} transform="rotate(10 112 117)"/>` +
      `<path d="M112 22 Q140 56 136 80 Q150 70 146 54 Q170 82 156 106 Q142 120 112 120 Q82 120 68 106 Q54 82 78 54 Q74 70 88 80 Q84 56 112 22 Z" fill="#ff922b" ${st()}/><path d="M112 62 Q132 86 126 104 Q120 114 112 114 Q102 114 98 104 Q92 88 112 62 Z" fill="#ffd43b"/>`,
    crescent: () => `<defs><clipPath id="cc"><circle cx="112" cy="72" r="46"/></clipPath><mask id="cm"><rect width="224" height="144" fill="#fff"/><circle cx="138" cy="58" r="40" fill="#000"/></mask></defs>` +
      `<circle cx="112" cy="72" r="46" fill="#ffe066" ${st()} mask="url(#cm)"/><circle cx="138" cy="58" r="40" fill="none" ${st()} clip-path="url(#cc)"/>` + sparkle(170, 100, '#ffe066') + sparkle(176, 40, '#fff'),
    gift: () => `<rect x="66" y="64" width="92" height="58" fill="#ff6b6b" ${st()}/><rect x="60" y="50" width="104" height="18" fill="#fa5252" ${st()}/><rect x="104" y="50" width="16" height="72" fill="#ffd43b" ${st(3)}/>` +
      `<ellipse cx="98" cy="40" rx="16" ry="9" fill="#ffd43b" ${st(3)} transform="rotate(-25 98 40)"/><ellipse cx="126" cy="40" rx="16" ry="9" fill="#ffd43b" ${st(3)} transform="rotate(25 126 40)"/><circle cx="112" cy="48" r="6" fill="#fab005" ${st(2.5)}/>`,
    bucket: () => `<path d="M72 58 Q112 6 152 58" fill="none" ${st(4)}/><path d="M74 58 L150 58 L140 122 L84 122 Z" fill="#74c0fc" ${st()}/><ellipse cx="112" cy="58" rx="38" ry="9" fill="#4dabf7" ${st(3)}/>` +
      `<path d="M78 82 H146 M81 102 H143" stroke="#1c7ed6" stroke-width="3"/>`,
    chair: () => `<rect x="78" y="84" width="10" height="40" rx="3" fill="#a0673f" ${st(3)}/><rect x="136" y="84" width="10" height="40" rx="3" fill="#a0673f" ${st(3)}/>` +
      `<rect x="80" y="18" width="64" height="54" rx="8" fill="#e0a96d" ${st()}/><rect x="92" y="30" width="10" height="32" rx="4" fill="#c98a4e"/><rect x="122" y="30" width="10" height="32" rx="4" fill="#c98a4e"/><rect x="70" y="70" width="84" height="16" rx="5" fill="#c98a4e" ${st()}/>`,
  };

  /* ---------- صور المحادثة: الأسرة، الألعاب، الحيوانات، المشاعر، الجسم، الملابس، الغرفة، الحقيبة، الطقس، الحديقة ---------- */
  const person = o => {
    o = o || {}; const cx = o.cx || 112, sc = o.child ? .78 : 1, top = o.child ? 46 : 30, hr = o.hair || 'short', skin = SK;
    const hc = /grey/.test(hr) ? '#ced4da' : hr === 'long' ? '#5c3a1e' : HR, R = 24 * sc, cy = top + R;
    let s = `<rect x="${cx - 30 * sc}" y="${cy + R - 4}" width="${60 * sc}" height="${70 * sc}" rx="${22 * sc}" fill="${o.shirt || '#4dabf7'}" ${st()}/>`;
    if (/hijab/.test(hr)) s += `<path d="M${cx - R - 8} ${cy + R + 10} Q${cx - R - 10} ${cy - R - 10} ${cx} ${cy - R - 8} Q${cx + R + 10} ${cy - R - 10} ${cx + R + 8} ${cy + R + 10} Z" fill="${/grey/.test(hr) ? '#adb5bd' : (o.hij || '#e64980')}" ${st()}/>`;
    if (hr === 'long') s += `<path d="M${cx - R - 4} ${cy + R + 6} Q${cx - R - 8} ${cy - R} ${cx} ${cy - R - 4} Q${cx + R + 8} ${cy - R} ${cx + R + 4} ${cy + R + 6} Z" fill="${hc}" ${st(3)}/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${skin}" ${st()}/>`;
    if (hr === 'short' || hr === 'grey') s += `<path d="M${cx - R} ${cy - 2} C${cx - R} ${cy - R - 8} ${cx + R} ${cy - R - 8} ${cx + R} ${cy - 2} C${cx + R - 8} ${cy - 14} ${cx + 6} ${cy - 18} ${cx} ${cy - 12} C${cx - 8} ${cy - 18} ${cx - R + 6} ${cy - 14} ${cx - R} ${cy - 2} Z" fill="${hc}" ${st(3)}/>`;
    if (hr === 'baby') s += `<path d="M${cx - 4} ${cy - R + 2} q4 -10 8 -2" fill="none" ${st(3)}/>`;
    s += E(cx - 9 * sc, cy + 2, 3.2) + E(cx + 9 * sc, cy + 2, 3.2) + CH(cx - 15 * sc, cy + 10) + CH(cx + 15 * sc, cy + 10) + SM(cx, cy + 11, 6 * sc);
    if (o.beard) s += `<path d="M${cx - R + 4} ${cy + 6} Q${cx} ${cy + R + 14} ${cx + R - 4} ${cy + 6} Q${cx} ${cy + R} ${cx - R + 4} ${cy + 6} Z" fill="${/grey/.test(hr) ? '#dee2e6' : HR}" ${st(2.5)}/>` + SM(cx, cy + 10, 5);
    if (o.glasses) s += `<circle cx="${cx - 9}" cy="${cy + 2}" r="7" fill="none" ${st(2.5)}/><circle cx="${cx + 9}" cy="${cy + 2}" r="7" fill="none" ${st(2.5)}/>`;
    return s;
  };
  const feel = k => {
    const F = { happy: { eyes: 'open' }, sad: { mouth: 'frown', brows: 'sad' }, angry: { mouth: 'flat', brows: 'angry', hot: true }, scared: { mouth: 'o', brows: 'up' },
      tired: { eyes: 'closed', mouth: 'flat' }, hungry: { mouth: 'open' }, thirsty: { mouth: 'tongue' }, shy: { eyes: 'closed', mouth: 'wavy', hot: true } }[k] || {};
    let s = face(Object.assign({ cx: 112, cy: 76, r: 42 }, F));
    if (k === 'sad') s += `<path d="M90 86 q-4 8 0 12 q4 -4 0 -12 Z" fill="#74c0fc" ${st(2)}/>`;
    if (k === 'scared') s += `<path d="M150 50 q-4 8 0 12 q4 -4 0 -12 Z" fill="#74c0fc" ${st(2)}/>`;
    if (k === 'tired') s += `<text x="150" y="40" font-family="Arial Black,Arial" font-size="22" font-weight="900" fill="#5c7cfa">Z</text>`;
    if (k === 'hungry') s += `<ellipse cx="180" cy="110" rx="26" ry="8" fill="#fff" ${st(3)}/><path d="M178 106 q-6 -10 2 -16" fill="none" stroke="#adb5bd" stroke-width="3"/>`;
    if (k === 'thirsty') s += `<path d="M178 70 h22 l-3 40 h-16 Z" fill="#d0ebff" ${st(3)}/>`;
    if (k === 'happy') s += sparkle(44, 40) + sparkle(184, 44);
    return s;
  };
  const PARTS = { head: [112, 40, 24], eye: [104, 40, 8], ear: [88, 42, 8], nose: [112, 46, 6], mouth: [112, 54, 8], hand: [68, 96, 12], leg: [124, 124, 14], belly: [112, 86, 16] };
  const bodyPic = p => {
    const [x, y, r] = PARTS[p] || PARTS.head;
    return `<rect x="96" y="104" width="12" height="32" rx="6" fill="#3b5bdb" ${st(3)}/><rect x="116" y="104" width="12" height="32" rx="6" fill="#3b5bdb" ${st(3)}/>` +
      `<rect x="62" y="72" width="14" height="34" rx="7" fill="${SK}" ${st(3)} transform="rotate(20 69 72)"/><rect x="148" y="72" width="14" height="34" rx="7" fill="${SK}" ${st(3)} transform="rotate(-20 155 72)"/>` +
      `<rect x="84" y="64" width="56" height="48" rx="18" fill="#ff922b" ${st()}/>` +
      `<circle cx="88" cy="42" r="6" fill="${SK}" ${st(2.5)}/><circle cx="136" cy="42" r="6" fill="${SK}" ${st(2.5)}/><circle cx="112" cy="40" r="24" fill="${SK}" ${st()}/>` +
      `<path d="M88 38 C88 14 136 14 136 38 C128 28 118 26 112 30 C106 26 96 28 88 38 Z" fill="${HR}" ${st(2.5)}/>` + E(104, 40, 2.8) + E(120, 40, 2.8) + `<path d="M112 44 v4" ${st(2.5)}/>` + SM(112, 52, 6) +
      `<circle cx="${x}" cy="${y}" r="${r + 8}" fill="none" stroke="#fab005" stroke-width="5" stroke-dasharray="6 5"/>`;
  };
  const swatch = c => `<path d="M64 74 C56 40 96 26 120 36 C150 22 180 50 166 76 C182 104 146 124 118 112 C90 128 52 112 64 74 Z" fill="${c}" ${st()}/><ellipse cx="96" cy="58" rx="12" ry="7" fill="#fff" opacity=".35"/>`;
  const countPic = n => { const cols = Math.min(5, n), rows = Math.ceil(n / 5); let s = ''; for (let k = 0; k < n; k++) { const r = Math.floor(k / 5), c = k % 5, w = (Math.min(5, n - r * 5) - 1) * 32; s += `<circle cx="${112 - w / 2 + c * 32}" cy="${72 - (rows - 1) * 18 + r * 36}" r="13" fill="#ff6b6b" ${st(3)}/>`; } return s; };
  const box3 = (x, y) => `<path d="M${x} ${y} l14 -10 h52 l-14 10 Z" fill="#f4c38a" ${st(3)}/><path d="M${x + 52} ${y} l14 -10 v40 l-14 10 Z" fill="#c98a4e" ${st(3)}/><rect x="${x}" y="${y}" width="52" height="40" fill="#e0a96d" ${st(3)}/>`;
  const ball = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r || 12}" fill="#ff6b6b" ${st(3)}/><path d="M${x - (r || 12)} ${y} q${r || 12} 8 ${2 * (r || 12)} 0" fill="none" stroke="#fff" stroke-width="2.5"/>`;
  const PREP = { in: () => box3(86, 80) + `<circle cx="112" cy="78" r="12" fill="#ff6b6b" ${st(3)}/><path d="M86 80 l14 -10 h52 l-14 10" fill="none" ${st(3)}/>`, on: () => box3(86, 84) + ball(118, 62, 13), under: () => `<rect x="62" y="56" width="100" height="10" rx="3" fill="#c98a4e" ${st(3)}/><rect x="68" y="66" width="8" height="54" fill="#a0673f" ${st(2.5)}/><rect x="148" y="66" width="8" height="54" fill="#a0673f" ${st(2.5)}/>` + ball(112, 106, 13),
    beside: () => box3(70, 80) + ball(162, 108, 13), front: () => box3(80, 70) + ball(112, 112, 15), behind: () => ball(140, 62, 13) + box3(80, 74) };
  Object.assign(PCAT, { rabbit: 'out', horse: 'out', cow: 'out', sheep: 'out', kite: 'out', bike: 'out', rain: 'out', wind: 'out', hot: 'out', cold: 'snow', swing: 'out', slide: 'out', shop: 'out', seller: 'out' });
  Object.assign(PIC, {
    father: () => person({ beard: true, shirt: '#4dabf7' }), mother: () => person({ hair: 'hijab', shirt: '#f783ac' }), brother: () => person({ child: true, shirt: '#40c057' }),
    sister: () => person({ child: true, hair: 'long', shirt: '#ffd43b' }), grandpa: () => person({ hair: 'grey', beard: true, glasses: true, shirt: '#868e96' }), grandma: () => person({ hair: 'greyhijab', glasses: true, shirt: '#be4bdb' }),
    baby: () => person({ child: true, hair: 'baby', shirt: '#ffc9d6' }), boy: () => person({ child: true, shirt: '#ff922b' }), girl: () => person({ child: true, hair: 'hijab', hij: '#7950f2', shirt: '#4dabf7' }),
    seller: () => `<rect x="40" y="96" width="144" height="30" fill="#e0a96d" ${st(3)}/>` + person({ shirt: '#20c997', beard: true }) + `<circle cx="70" cy="90" r="8" fill="#ff5a5a" ${st(2)}/><circle cx="154" cy="90" r="8" fill="#ffd43b" ${st(2)}/>`,
    rabbit: () => `<ellipse cx="98" cy="34" rx="9" ry="26" fill="#f1f3f5" ${st(3)}/><ellipse cx="126" cy="34" rx="9" ry="26" fill="#f1f3f5" ${st(3)}/><ellipse cx="98" cy="36" rx="4" ry="18" fill="#ffc9d6"/><ellipse cx="126" cy="36" rx="4" ry="18" fill="#ffc9d6"/>` +
      `<ellipse cx="112" cy="104" rx="34" ry="22" fill="#f1f3f5" ${st()}/><circle cx="112" cy="72" r="26" fill="#f1f3f5" ${st()}/>` + E(102, 70, 3.6) + E(122, 70, 3.6) + `<path d="M108 80 h8 l-4 4 Z" fill="#ff8fab"/>` + CH(96, 82) + CH(128, 82),
    horse: () => [80, 96, 136, 152].map(x => `<rect x="${x}" y="96" width="9" height="30" rx="4" fill="#a9714b" ${st(2.5)}/>`).join('') + `<ellipse cx="118" cy="92" rx="46" ry="22" fill="#c98a4e" ${st()}/>` +
      `<path d="M70 92 Q58 60 64 36 L84 40 Q86 70 96 84 Z" fill="#c98a4e" ${st(3)}/><ellipse cx="66" cy="38" rx="14" ry="20" fill="#c98a4e" ${st(3)} transform="rotate(30 66 38)"/><path d="M70 26 l2 -10 l6 10" fill="#c98a4e" ${st(2.5)}/>` +
      `<path d="M78 30 q16 10 18 50" fill="none" stroke="#5c3a1e" stroke-width="7" stroke-linecap="round"/>` + E(70, 34, 3) + `<path d="M164 86 q14 10 6 30" fill="none" stroke="#5c3a1e" stroke-width="6" stroke-linecap="round"/>`,
    cow: () => [84, 100, 134, 150].map(x => `<rect x="${x}" y="96" width="9" height="28" rx="4" fill="#f8f9fa" ${st(2.5)}/>`).join('') + `<ellipse cx="122" cy="88" rx="44" ry="24" fill="#f8f9fa" ${st()}/><ellipse cx="130" cy="82" rx="12" ry="9" fill="#343a40"/><ellipse cx="106" cy="96" rx="9" ry="6" fill="#343a40"/>` +
      `<path d="M58 54 l-10 -10 M86 54 l10 -10" ${st(4)}/><ellipse cx="72" cy="70" rx="22" ry="20" fill="#f8f9fa" ${st()}/><ellipse cx="72" cy="84" rx="16" ry="10" fill="#ffc9d6" ${st(3)}/>` + E(64, 66, 3) + E(80, 66, 3) + `<circle cx="66" cy="84" r="2" fill="#2b1d2a"/><circle cx="78" cy="84" r="2" fill="#2b1d2a"/>`,
    sheep: () => [92, 132].map(x => `<rect x="${x}" y="100" width="9" height="24" rx="4" fill="#495057" ${st(2.5)}/>`).join('') + ring(10, a => `<circle cx="${120 + 34 * Math.cos(a)}" cy="${86 + 20 * Math.sin(a)}" r="13" fill="#fff" ${st(2.5)}/>`) + `<ellipse cx="120" cy="86" rx="34" ry="20" fill="#fff"/>` +
      `<ellipse cx="78" cy="78" rx="16" ry="20" fill="#495057" ${st(3)}/>` + `<ellipse cx="72" cy="74" rx="3" ry="3.8" fill="#fff"/><ellipse cx="84" cy="74" rx="3" ry="3.8" fill="#fff"/>`,
    ball: () => `<circle cx="112" cy="74" r="42" fill="#fff" ${st()}/><path d="M112 52 l18 13 l-7 21 h-22 l-7 -21 Z" fill="#2b1d2a"/><path d="M112 32 v20 M130 65 l20 -8 M123 86 l12 18 M101 86 l-12 18 M94 65 l-20 -8" ${st(3)}/>`,
    doll: () => person({ child: true, hair: 'long', shirt: '#f783ac' }) + `<path d="M80 40 l-10 -8 l4 14 Z M144 40 l10 -8 l-4 14 Z" fill="#ff6b6b" ${st(2)}/>`,
    toycar: () => `<path d="M48 96 Q50 70 80 68 L100 48 L150 48 L170 70 Q190 72 188 96 Z" fill="#ff6b6b" ${st()}/><path d="M104 54 h20 v16 h-34 Z M130 54 h16 l14 16 h-30 Z" fill="#d0ebff" ${st(2.5)}/>` +
      `<circle cx="80" cy="100" r="15" fill="#495057" ${st(3)}/><circle cx="80" cy="100" r="6" fill="#ced4da"/><circle cx="156" cy="100" r="15" fill="#495057" ${st(3)}/><circle cx="156" cy="100" r="6" fill="#ced4da"/>`,
    blocks: () => [[64, 84, '#ff6b6b', 'أ'], [108, 84, '#4dabf7', 'ب'], [86, 40, '#ffd43b', 'ت']].map(([x, y, c, l]) => `<rect x="${x}" y="${y}" width="44" height="44" rx="5" fill="${c}" ${st()}/><text x="${x + 22}" y="${y + 33}" text-anchor="middle" font-family="Arial" font-size="28" font-weight="700" fill="#fff">${l}</text>`).join(''),
    kite: () => `<path d="M112 16 L150 56 L112 96 L74 56 Z" fill="#ff6b6b" ${st()}/><path d="M112 16 V96 M74 56 H150" ${st(2.5)}/><path d="M112 96 q-10 14 4 22 q14 8 2 22" fill="none" ${st(2.5)}/><path d="M108 108 l-8 -4 l2 8 Z M118 124 l8 -4 l-2 8 Z" fill="#ffd43b" ${st(2)}/>`,
    bike: () => `<circle cx="70" cy="96" r="26" fill="none" stroke="${S}" stroke-width="5"/><circle cx="154" cy="96" r="26" fill="none" stroke="${S}" stroke-width="5"/><path d="M70 96 L98 60 L140 60 L154 96 M98 60 L112 96 L140 60 M112 96 H70 M92 50 h14 M140 60 l-6 -14 h14" fill="none" stroke="#4dabf7" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`,
    glass: () => `<path d="M84 34 L140 34 L132 120 L92 120 Z" fill="#e7f5ff" ${st()}/><path d="M88 62 L136 62 L132 116 L92 116 Z" fill="#74c0fc"/><path d="M98 70 v34" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/>`,
    milk: () => `<path d="M88 46 L112 26 L136 46 V120 H88 Z" fill="#fff" ${st()}/><path d="M88 46 H136" ${st(3)}/><rect x="88" y="70" width="48" height="30" fill="#4dabf7"/><path d="M102 86 q10 -12 20 0" fill="none" stroke="#fff" stroke-width="3"/>`,
    juice: () => `<path d="M84 40 L140 40 L132 120 L92 120 Z" fill="#fff" ${st()}/><path d="M87 58 L137 58 L132 116 L92 116 Z" fill="#ffa94d"/><path d="M124 40 L134 14" stroke="#ff6b6b" stroke-width="6" stroke-linecap="round"/><circle cx="140" cy="44" r="14" fill="#ffd43b" ${st(3)}/>`,
    rice: () => `<path d="M58 70 Q60 124 112 124 Q164 124 166 70 Z" fill="#fff" ${st()}/><ellipse cx="112" cy="70" rx="54" ry="10" fill="#f8f9fa" ${st(3)}/>` + [[90, 58], [104, 50], [120, 52], [134, 58], [112, 60], [98, 64], [126, 64]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="3" fill="#fff" ${st(1.5)}/>`).join('') + `<path d="M150 30 l-20 36" stroke="#c98a4e" stroke-width="5" stroke-linecap="round"/>`,
    plate: () => `<ellipse cx="112" cy="84" rx="66" ry="30" fill="#fff" ${st()}/><ellipse cx="112" cy="84" rx="44" ry="18" fill="#f1f3f5" ${st(2)}/><path d="M36 44 v60 M180 44 v60 M174 44 v20 q6 8 12 0 v-20" ${st(4)}/>`,
    shoe: () => `<path d="M48 96 Q50 64 78 62 L98 62 Q104 82 130 86 L176 92 Q186 98 182 112 H48 Z" fill="#ff6b6b" ${st()}/><path d="M48 104 H182" ${st(3)}/><path d="M84 70 l14 6 M88 78 l14 6" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
    hat: () => `<ellipse cx="112" cy="100" rx="70" ry="16" fill="#4dabf7" ${st()}/><path d="M74 100 Q72 44 112 42 Q152 44 150 100 Z" fill="#4dabf7" ${st()}/><path d="M74 86 Q112 96 150 86" fill="none" stroke="#ffd43b" stroke-width="7"/>`,
    coat: () => `<path d="M84 26 L58 40 L44 116 L72 120 L76 74 L76 128 L148 128 L148 74 L152 120 L180 116 L166 40 L140 26 L112 52 Z" fill="#a9714b" ${st()}/><path d="M112 52 V128" ${st(2.5)}/>` + [70, 88, 106].map(y => `<circle cx="120" cy="${y}" r="3.5" fill="#ffd43b" ${st(1.5)}/>`).join(''),
    socks: () => [[80, '#ff6b6b'], [130, '#4dabf7']].map(([x, c]) => `<path d="M${x - 12} 24 h26 v62 q0 10 10 14 l14 6 q6 12 -6 16 l-34 -6 q-12 -4 -10 -18 Z" fill="${c}" ${st(3)}/><path d="M${x - 12} 36 h26" stroke="#fff" stroke-width="4"/>`).join(''),
    pants: () => `<path d="M76 22 H148 L156 126 H120 L112 62 L104 126 H68 Z" fill="#3b5bdb" ${st()}/><path d="M76 34 H148" ${st(3)}/>`,
    bed: () => `<rect x="36" y="56" width="14" height="70" rx="4" fill="#c98a4e" ${st(3)}/><rect x="174" y="80" width="14" height="46" rx="4" fill="#c98a4e" ${st(3)}/><rect x="40" y="88" width="144" height="22" rx="5" fill="#fff" ${st(3)}/>` +
      `<ellipse cx="74" cy="84" rx="22" ry="10" fill="#fff" ${st(3)}/><rect x="96" y="78" width="88" height="22" rx="10" fill="#748ffc" ${st()}/>`,
    door: () => `<rect x="76" y="16" width="72" height="112" rx="6" fill="#c98a4e" ${st()}/><rect x="86" y="28" width="52" height="38" rx="4" fill="#b37336"/><rect x="86" y="74" width="52" height="44" rx="4" fill="#b37336"/><circle cx="138" cy="72" r="5" fill="#ffd43b" ${st(2.5)}/>`,
    window: () => `<rect x="62" y="24" width="100" height="96" rx="6" fill="#bfe6ff" ${st()}/><path d="M112 24 V120 M62 72 H162" ${st(4)}/><circle cx="136" cy="46" r="10" fill="#ffd43b"/><path d="M50 22 q14 50 0 100 h16 q-6 -50 0 -100 Z M174 22 q-14 50 0 100 h-16 q6 -50 0 -100 Z" fill="#ff8787" ${st(2.5)}/>`,
    table: () => `<rect x="42" y="56" width="140" height="14" rx="4" fill="#c98a4e" ${st()}/><rect x="54" y="70" width="10" height="56" fill="#a0673f" ${st(2.5)}/><rect x="160" y="70" width="10" height="56" fill="#a0673f" ${st(2.5)}/>`,
    lamp: () => `<ellipse cx="112" cy="124" rx="32" ry="7" fill="#868e96" ${st(3)}/><rect x="108" y="64" width="8" height="60" fill="#868e96" ${st(2.5)}/><path d="M80 66 L92 24 H132 L144 66 Z" fill="#ffe066" ${st()}/><circle cx="112" cy="74" r="20" fill="#fff3bf" opacity=".6"/>`,
    soap: () => `<rect x="70" y="66" width="84" height="46" rx="16" fill="#f783ac" ${st()}/><ellipse cx="96" cy="80" rx="12" ry="5" fill="#fff" opacity=".5"/>` + [[70, 48, 10], [96, 36, 8], [140, 42, 12], [160, 64, 7], [118, 26, 6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#e7f5ff" ${st(2)}/>`).join(''),
    notebook: () => `<rect x="70" y="20" width="88" height="108" rx="6" fill="#20c997" ${st()}/><rect x="70" y="20" width="16" height="108" fill="#12b886" ${st(3)}/><rect x="98" y="40" width="46" height="24" rx="3" fill="#fff" ${st(2.5)}/>`,
    eraser: () => `<g transform="rotate(-20 112 76)"><rect x="60" y="56" width="104" height="40" rx="8" fill="#ff8fab" ${st()}/><rect x="60" y="56" width="40" height="40" rx="8" fill="#4dabf7" ${st()}/></g>`,
    scissors: () => `<circle cx="70" cy="98" r="18" fill="none" stroke="#ff6b6b" stroke-width="8"/><circle cx="70" cy="50" r="18" fill="none" stroke="#ff6b6b" stroke-width="8"/><path d="M86 88 L178 44 M86 60 L178 104" stroke="#adb5bd" stroke-width="9" stroke-linecap="round"/><circle cx="118" cy="74" r="5" fill="${S}"/>`,
    crayons: () => [['#ff6b6b', 60], ['#ffd43b', 86], ['#40c057', 112], ['#4dabf7', 138], ['#be4bdb', 164]].map(([c, x]) => `<rect x="${x - 9}" y="44" width="18" height="74" rx="3" fill="${c}" ${st(2.5)}/><path d="M${x - 9} 44 L${x} 24 L${x + 9} 44 Z" fill="${c}" ${st(2.5)}/>`).join(''),
    bag: () => `<path d="M88 44 Q88 22 112 22 Q136 22 136 44" fill="none" ${st(5)}/><rect x="64" y="40" width="96" height="88" rx="18" fill="#4dabf7" ${st()}/><rect x="80" y="84" width="64" height="32" rx="8" fill="#74c0fc" ${st(3)}/><path d="M80 94 H144" ${st(2.5)}/>`,
    ruler: () => `<g transform="rotate(-15 112 76)"><rect x="34" y="58" width="156" height="32" rx="4" fill="#ffd43b" ${st()}/>` + Array.from({ length: 13 }, (_, k) => `<path d="M${46 + k * 11} 58 v${k % 2 ? 9 : 15}" ${st(2)}/>`).join('') + `</g>`,
    rain: () => `<path d="M60 76 a22 22 0 0 1 8 -42 a30 30 0 0 1 56 -10 a26 26 0 0 1 40 22 a18 18 0 0 1 0 30 Z" fill="#adb5bd" ${st()}/>` + [[74, 92], [100, 100], [126, 92], [152, 100], [88, 116], [140, 118]].map(([x, y]) => `<path d="M${x} ${y} q-6 10 0 14 q6 -4 0 -14 Z" fill="#4dabf7" ${st(2)}/>`).join(''),
    wind: () => `<path d="M30 52 H130 q24 0 20 -20 q-4 -14 -18 -8 M30 78 H170 q22 0 20 20 q-4 16 -20 8 M40 104 H120 q16 0 14 14" fill="none" stroke="#74c0fc" stroke-width="7" stroke-linecap="round"/>`,
    hot: () => ring(10, a => `<path d="M${84 + 30 * Math.cos(a)} ${64 + 30 * Math.sin(a)} L${84 + 40 * Math.cos(a)} ${64 + 40 * Math.sin(a)}" stroke="#fab005" stroke-width="5" stroke-linecap="round"/>`) + `<circle cx="84" cy="64" r="24" fill="#ffd43b" ${st()}/>` +
      `<rect x="146" y="24" width="18" height="78" rx="9" fill="#fff" ${st()}/><circle cx="155" cy="108" r="14" fill="#fa5252" ${st()}/><rect x="151" y="40" width="8" height="66" fill="#fa5252"/>`,
    cold: () => [[60, 40], [100, 30], [150, 36], [180, 64], [44, 80]].map(([x, y]) => `<path d="M${x} ${y - 8} v16 M${x - 8} ${y} h16 M${x - 6} ${y - 6} l12 12 M${x + 6} ${y - 6} l-12 12" stroke="#4dabf7" stroke-width="3" stroke-linecap="round"/>`).join('') +
      `<rect x="104" y="44" width="18" height="70" rx="9" fill="#fff" ${st()}/><circle cx="113" cy="114" r="14" fill="#4dabf7" ${st()}/><rect x="109" y="90" width="8" height="22" fill="#4dabf7"/>`,
    swing: () => `<path d="M40 128 L70 20 L154 20 L184 128" fill="none" stroke="#c98a4e" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M96 20 V96 M128 20 V96" stroke="#868e96" stroke-width="3"/><rect x="88" y="94" width="48" height="10" rx="3" fill="#ff6b6b" ${st(3)}/>`,
    slide: () => `<path d="M44 128 V40 M70 128 V40 M44 60 H70 M44 84 H70 M44 108 H70" stroke="#4dabf7" stroke-width="6" stroke-linecap="round"/><rect x="38" y="32" width="38" height="12" rx="3" fill="#ffd43b" ${st(3)}/><path d="M76 38 Q120 46 140 100 Q150 124 186 124 V132 Q140 134 128 106 Q110 56 76 50 Z" fill="#ff6b6b" ${st(3)}/>`,
    shop: () => `<rect x="44" y="56" width="136" height="68" fill="#fff4e6" ${st()}/><path d="M36 58 L52 28 H172 L188 58 Z" fill="#ff6b6b" ${st()}/><path d="M60 28 L56 58 M84 28 L84 58 M112 28 V58 M140 28 L140 58 M164 28 L168 58" stroke="#fff" stroke-width="7"/>` +
      `<rect x="62" y="74" width="40" height="50" fill="#c98a4e" ${st(3)}/><rect x="116" y="72" width="50" height="30" fill="#bfe6ff" ${st(3)}/>`,
    cup: () => `<path d="M76 46 H140 L134 112 Q132 120 124 120 H92 Q84 120 82 112 Z" fill="#fff" ${st()}/><path d="M140 60 q24 0 20 24 q-4 18 -24 12" fill="none" ${st(5)}/><path d="M100 36 q-6 -10 0 -18 M116 36 q-6 -10 0 -18" fill="none" stroke="#adb5bd" stroke-width="3" stroke-linecap="round"/>`,
  });
  ['happy', 'sad', 'angry', 'scared', 'tired', 'hungry', 'thirsty', 'shy'].forEach(k => { PIC['feel_' + k] = () => feel(k); });
  Object.keys(PARTS).forEach(k => { PIC['body_' + k] = () => bodyPic(k); });
  [['red', '#fa5252'], ['blue', '#339af0'], ['green', '#40c057'], ['yellow', '#fcc419'], ['white', '#ffffff'], ['black', '#343a40'], ['orange', '#ff922b'], ['brown', '#a9714b'], ['pink', '#f783ac'], ['purple', '#9c36b5']].forEach(([k, c]) => { PIC['color_' + k] = () => swatch(c); });
  for (let n = 1; n <= 10; n++) PIC['n' + n] = () => countPic(n);
  Object.keys(PREP).forEach(k => { PIC['prep_' + k] = PREP[k]; });
  PIC.circle = () => `<circle cx="112" cy="74" r="46" fill="#4dabf7" stroke="${S}" stroke-width="5"/>`;
  PIC.square = () => `<rect x="68" y="30" width="88" height="88" rx="6" fill="#ffd43b" stroke="${S}" stroke-width="5"/>`;

  /* طريق اللافتات: مشاهد جانبية 240×120 والبطل منفصل فوقها */
  const rsky = `<defs><linearGradient id="rs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#eef9ff"/></linearGradient></defs><rect width="240" height="120" fill="url(#rs)"/><circle cx="212" cy="20" r="10" fill="#ffd43b"/><ellipse cx="52" cy="22" rx="18" ry="7" fill="#fff"/><ellipse cx="66" cy="17" rx="12" ry="7" fill="#fff"/><ellipse cx="150" cy="30" rx="14" ry="5" fill="#fff"/>`;
  const gr = (a, b) => `<rect x="${a}" y="88" width="${b - a}" height="32" fill="#a9e08e"/><rect x="${a}" y="88" width="${b - a}" height="5" fill="#8fd16f"/>`;
  const flag = x => `<rect x="${x}" y="52" width="3" height="38" fill="#6b4f3a"/><path d="M${x + 3} 52 l20 7 l-20 7 Z" fill="#ff6b6b" ${st(2)}/>`;
  const lane = `<rect x="0" y="95" width="240" height="11" fill="#e3ddd0"/><path d="M4 100.5 H236" stroke="#fff" stroke-width="2" stroke-dasharray="8 8"/>`;
  const bush = (x) => `<path d="M${x - 15} 89 a7 7 0 0 1 4 -11 a9 9 0 0 1 17 -3 a7 7 0 0 1 9 14 Z" fill="#69db7c" ${st(2)}/>`;
  const RS = {
    road: () => gr(0, 240) + lane + bush(70) + bush(150) + flag(222),
    hole: () => gr(0, 96) + gr(148, 240) + `<rect x="96" y="88" width="52" height="32" fill="#a0673f"/><ellipse cx="122" cy="93" rx="25" ry="8" fill="#3b2a1e"/>` + flag(222),
    river: () => gr(0, 88) + gr(162, 240) + `<rect x="88" y="90" width="74" height="30" fill="#4dabf7"/><path d="M94 100 q6 -4 12 0 t12 0 t12 0 t12 0 t12 0 M98 112 q6 -4 12 0 t12 0 t12 0 t12 0" fill="none" stroke="#e7f5ff" stroke-width="2.5" stroke-linecap="round"/>` + flag(222),
    light: g => gr(0, 240) + lane + `<path d="M140 95 h8 v11 h-8 Z M154 95 h8 v11 h-8 Z M168 95 h8 v11 h-8 Z" fill="#fff"/><rect x="118" y="44" width="5" height="50" fill="#868e96"/><rect x="108" y="16" width="25" height="40" rx="6" fill="#343a40" ${st(2.5)}/>` +
      `<circle cx="120.5" cy="27" r="7" fill="${g ? '#5c2b2b' : '#ff4d4d'}"/><circle cx="120.5" cy="45" r="7" fill="${g ? '#40c057' : '#24452c'}"/>` + flag(222),
    door: o => gr(0, 240) + `<rect x="100" y="34" width="140" height="56" fill="#f4c38a" ${st(3)}/><path d="M94 36 L170 8 L246 36 Z" fill="#e8590c" ${st(3)}/><rect x="190" y="48" width="22" height="18" fill="#d0ebff" ${st(2.5)}/>` +
      (o ? `<rect x="122" y="50" width="30" height="40" fill="#3b2a1e" ${st(3)}/><path d="M122 50 l-12 4 v38 l12 -2 Z" fill="#b37336" ${st(2.5)}/>` : `<rect x="122" y="50" width="30" height="40" rx="3" fill="#b37336" ${st(3)}/><circle cx="146" cy="72" r="2.8" fill="#ffd43b"/>`),
    stairs: () => `<rect x="0" y="60" width="74" height="60" fill="#c9c2b5" ${st(3)}/><rect x="0" y="60" width="74" height="5" fill="#a9e08e"/>` +
      `<path d="M74 60 h24 v7 h24 v7 h24 v7 h24 v7 H240 V120 H74 Z" fill="#dee2e6" ${st(3)}/>` + gr(170, 240) + flag(222),
    tree: few => gr(0, 240) + `<rect x="114" y="54" width="12" height="36" fill="#8d5524" ${st(2.5)}/><circle cx="120" cy="44" r="26" fill="#51cf66" ${st(3)}/>` +
      (few ? '' : `<circle cx="108" cy="40" r="5" fill="#ff4d4d" ${st(2)}/><circle cx="130" cy="36" r="5" fill="#ff4d4d" ${st(2)}/><circle cx="122" cy="54" r="5" fill="#ff4d4d" ${st(2)}/>`) + `<circle cx="134" cy="52" r="5" fill="#ff4d4d" ${st(2)}/>` + flag(222),
    chest: o => gr(0, 240) + `<rect x="150" y="68" width="40" height="22" rx="3" fill="#b37336" ${st(3)}/><rect x="150" y="76" width="40" height="4" fill="#ffd43b"/>` +
      (o ? `<path d="M150 68 l4 -18 h32 l4 18 Z" fill="#c98a4e" ${st(3)}/><circle cx="160" cy="66" r="5" fill="#ffd43b" ${st(2)}/><circle cx="172" cy="64" r="5" fill="#ffd43b" ${st(2)}/><circle cx="182" cy="67" r="5" fill="#ffd43b" ${st(2)}/>`
        : `<path d="M150 68 q20 -18 40 0 Z" fill="#c98a4e" ${st(3)}/><rect x="166" y="64" width="8" height="10" rx="2" fill="#ffd43b" ${st(2)}/>`),
  };
  const HERO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 92"><ellipse cx="30" cy="88" rx="16" ry="3" fill="#000" opacity=".15"/>` +
    `<rect x="19" y="64" width="9" height="22" rx="4.5" fill="#3b5bdb" ${st(2.5)}/><rect x="32" y="64" width="9" height="22" rx="4.5" fill="#3b5bdb" ${st(2.5)}/>` +
    `<rect x="9" y="44" width="9" height="20" rx="4.5" fill="${SK}" ${st(2.5)}/><rect x="42" y="44" width="9" height="20" rx="4.5" fill="${SK}" ${st(2.5)}/><rect x="15" y="40" width="30" height="30" rx="12" fill="#ff922b" ${st(2.5)}/>` +
    `<circle cx="30" cy="24" r="16" fill="${SK}" ${st(2.5)}/><path d="M14 22 C14 4 46 4 46 22 C40 14 34 12 30 16 C26 12 20 14 14 22 Z" fill="${HR}" ${st(2.5)}/>` +
    `<ellipse cx="24" cy="26" rx="2.6" ry="3.4" fill="#2b1d2a"/><ellipse cx="36" cy="26" rx="2.6" ry="3.4" fill="#2b1d2a"/><circle cx="25" cy="24.6" r="1" fill="#fff"/><circle cx="37" cy="24.6" r="1" fill="#fff"/>` +
    `<ellipse cx="19" cy="31" rx="3.4" ry="2.2" fill="#ff9fb4"/><ellipse cx="41" cy="31" rx="3.4" ry="2.2" fill="#ff9fb4"/><path d="M25 33 q5 5 10 0" fill="none" ${st(2.2)}/></svg>`;

  const cache = {};
  const enc = s => 'data:image/svg+xml;utf8,' + encodeURIComponent(s);
  window.SVGX = {
    road: (k, alt) => { const id = 'road:' + k + (alt ? '+' : ''); return cache[id] || (cache[id] = RS[k] ? enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120">${rsky}${RS[k](alt)}</svg>`) : ''); },
    hero: () => cache.hero || (cache.hero = enc(HERO)),
    hasPic: k => !!PIC[k],
    pic: k => { const id = 'pic:' + k; return cache[id] || (cache[id] = PIC[k] ? enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224 144">${PBG[PCAT[k] || 'room']}${PIC[k]()}</svg>`) : ''); },
    picKeys: () => Object.keys(PIC),
    has: k => !!SC[k],
    svg: k => SC[k] ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140">${SC[k]()}</svg>` : '',
    url: k => cache[k] || (cache[k] = SC[k] ? 'data:image/svg+xml;utf8,' + encodeURIComponent(window.SVGX.svg(k)) : ''),
  };
})();
