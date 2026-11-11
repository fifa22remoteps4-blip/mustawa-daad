/* مُدُنُ ضاد — رسوم الكلمات (أسماء محسوسة فقط؛ الأفعال والمعاني المجرّدة تُعرض بلا صورة كي لا تُفهم خطأ) */
(function () {
  const { O, K, BG, P, Pn, C, Cn, E, En, R, Rn, L, T, shadow, shine, eyes, cheeks, star5, face, CLUE, heroSVG } = window.ART_PARTS;

  /* [الخلفية, الرسم] */
  const PIC = {
    /* ===== حيوانات ===== */
    lion: ['warm', () => { let m = ''; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; m += C(100 + 42 * Math.cos(a), 70 + 40 * Math.sin(a), 15, K.orange, 2.5); } return m + C(100, 70, 40, K.orange, 0) + C(100, 72, 32, K.yellow) + C(78, 46, 8, K.yellow) + C(122, 46, 8, K.yellow) + eyes(88, 112, 66) + P('M94 80 h12 l-6 7 Z', K.brown2, 2.5) + P('M100 87 q-7 8 -13 3 M100 87 q7 8 13 3', 'none', 2.5) + cheeks(80, 120, 84); }],
    mouse: ['warm', () => shadow(100, 120, 50) + P('M136 108 C166 112 176 90 160 78', 'none', 3) + E(100, 92, 44, 28, K.gray) + C(66, 58, 18, K.gray) + C(66, 58, 10, K.pink, 0) + C(98, 54, 18, K.gray) + C(98, 54, 10, K.pink, 0) + E(70, 84, 26, 22, K.gray) + eyes(62, 80, 80, 3) + C(48, 92, 5, K.pink, 2.5) + L(40, 88, 26, 84, O, 2) + L(40, 94, 26, 98, O, 2)],
    dog: ['warm', () => C(100, 74, 40, K.tan) + P('M62 52 C50 56 46 96 62 100 C72 94 72 66 68 54 Z', K.brown) + P('M138 52 C150 56 154 96 138 100 C128 94 128 66 132 54 Z', K.brown) + E(100, 90, 20, 15, '#fff3e0') + eyes(86, 114, 70) + E(100, 84, 8, 6, O, 0) + P('M100 90 v6 M92 98 q8 6 16 0', 'none', 2.5) + P('M96 102 q4 10 8 0', K.pink, 2)],
    duck: ['sea', () => shadow(100, 124, 50) + P('M44 86 C44 120 150 124 158 92 C164 70 140 66 126 82 C110 70 60 66 44 86 Z', K.yellow) + C(132, 52, 24, K.yellow) + P('M152 54 l24 4 l-24 8 Z', K.orange, 2.5) + Cn(138, 46, 3.6, O) + P('M66 92 C80 110 108 106 116 92', 'none', 2.5)],
    fox: ['green', () => P('M60 36 L72 74 L46 70 Z', K.orange) + P('M140 36 L128 74 L154 70 Z', K.orange) + P('M48 66 C48 40 152 40 152 66 C152 92 116 118 100 120 C84 118 48 92 48 66 Z', K.orange) + P('M66 84 C80 90 90 104 100 120 C110 104 120 90 134 84 C124 98 112 110 100 120 C88 110 76 98 66 84 Z', '#fff', 2.5) + eyes(82, 118, 72) + E(100, 112, 6, 4.5, O, 0)],
    camel: ['sand', () => shadow(100, 128, 60) + P('M40 72 C44 46 70 40 84 58 C94 40 120 40 128 64 L146 70 L152 40 L166 34 L178 42 L170 50 L162 52 L160 92 C160 100 152 102 146 98 L146 128 L136 128 L134 100 L66 100 L66 128 L56 128 L54 98 C42 94 38 84 40 72 Z', K.tan) + Cn(168, 41, 2.6, O) + P('M84 58 q4 10 0 20', 'none', 2)],
    hen: ['green', () => shadow(100, 126, 46) + P('M60 94 C52 70 70 50 92 56 C96 40 116 36 124 50 C140 56 140 76 132 92 C124 112 76 116 60 94 Z', '#fff') + P('M104 40 c2 -10 8 -12 10 -4 c4 -8 10 -6 10 2', K.red, 2.5) + P('M134 60 l14 4 l-14 6 Z', K.orange, 2.5) + P('M136 72 c4 6 0 12 -6 10', K.red, 2.5) + Cn(124, 56, 3.4, O) + P('M80 82 C90 96 110 94 116 82', 'none', 2.5) + L(90, 112, 90, 126) + L(108, 112, 108, 126)],
    rooster: ['sky', () => shadow(100, 126, 46) + P('M60 76 C40 50 30 30 50 22 C56 40 60 54 70 62', K.green2) + P('M58 72 C34 60 26 40 40 32 C46 50 56 60 66 66', K.blue2) + P('M66 92 C58 66 78 50 98 58 C100 36 124 32 132 50 C146 58 144 78 136 94 C126 114 80 116 66 92 Z', K.orange) + P('M110 34 c2 -12 10 -14 12 -4 c4 -10 12 -8 12 2 c6 -6 12 0 6 8', K.red, 2.5) + P('M142 60 l16 4 l-16 6 Z', K.yellow, 2.5) + P('M144 72 c4 8 0 14 -8 12', K.red, 2.5) + Cn(130, 56, 3.4, O) + L(94, 112, 94, 126) + L(112, 112, 112, 126)],
    whale: ['sea', () => P('M30 88 C30 56 70 44 108 48 C150 52 164 76 160 94 C156 112 120 118 84 116 C56 114 30 108 30 88 Z', K.blue) + P('M160 92 C170 84 184 70 186 60 C176 64 170 70 166 72 C172 62 172 52 168 46 C162 60 160 74 160 92 Z', K.blue) + P('M44 96 C70 110 120 112 154 100', '#e7f5ff', 2.5) + eyes(64, 64, 78, 4) + P('M84 44 c-4 -10 -14 -12 -18 -20 M84 44 c0 -12 2 -18 0 -26 M84 44 c4 -10 14 -12 18 -20', 'none', 3)],
    bear: ['green', () => C(64, 40, 16, K.brown) + C(136, 40, 16, K.brown) + C(64, 40, 8, K.tan, 0) + C(136, 40, 8, K.tan, 0) + C(100, 74, 44, K.brown) + E(100, 92, 22, 17, K.tan) + eyes(82, 118, 66) + E(100, 84, 9, 6.5, O, 0) + P('M92 96 q8 7 16 0', 'none', 2.5)],
    monkey: ['green', () => C(56, 70, 16, K.brown) + C(144, 70, 16, K.brown) + C(56, 70, 9, K.tan, 0) + C(144, 70, 9, K.tan, 0) + C(100, 70, 42, K.brown) + P('M70 66 C70 44 98 44 100 58 C102 44 130 44 130 66 C138 96 116 112 100 112 C84 112 62 96 70 66 Z', K.tan) + eyes(88, 112, 66) + Cn(95, 84, 2.4, O) + Cn(105, 84, 2.4, O) + P('M86 94 q14 10 28 0', 'none', 2.5)],
    giraffe: ['sky', () => shadow(110, 130, 40) + P('M86 128 V96 C86 84 92 80 100 80 L104 40 C104 30 112 26 118 28 L132 34 C138 36 138 44 132 46 L122 46 L118 80 C130 82 136 88 136 98 V128 H126 V104 H96 V128 Z', K.yellow) + L(112, 28, 108, 14) + L(122, 30, 124, 16) + Cn(108, 13, 4, K.brown2) + Cn(124, 15, 4, K.brown2) + Cn(124, 36, 2.6, O) + C(108, 58, 4, K.brown, 0) + C(112, 70, 3.5, K.brown, 0) + C(104, 92, 5, K.brown, 0) + C(122, 98, 5, K.brown, 0) + C(110, 112, 4, K.brown, 0)],
    fish: ['sea', () => P('M40 72 C60 40 120 38 146 72 C120 106 60 104 40 72 Z', K.orange) + P('M146 72 L176 50 L170 72 L176 94 Z', K.orange) + P('M86 46 C96 60 96 84 86 98', 'none', 2.5) + C(64, 66, 7, '#fff', 2.5) + Cn(66, 66, 3.5, O) + P('M100 50 c10 -12 24 -10 30 -2', K.yellow, 2.5)],
    elephant: ['sky', () => shadow(100, 128, 56) + P('M54 74 C54 44 140 40 150 70 L150 128 H134 V104 H86 V128 H70 V104 C60 100 54 90 54 74 Z', K.gray) + P('M66 60 C34 50 30 90 52 98 C62 92 66 80 66 60 Z', '#c4cad2') + P('M56 86 C46 98 40 112 48 126 C56 128 58 124 56 118 C54 108 58 100 66 94', K.gray) + Cn(76, 70, 3.6, O) + P('M60 96 l-6 10', 'none', 2)],
    parrot: ['green', () => P('M118 128 L108 96', 'none', 3) + P('M84 100 C70 72 86 34 112 36 C134 38 138 64 130 88 C124 106 100 116 84 100 Z', K.green) + P('M112 36 C100 34 88 44 88 58 C98 50 112 48 120 54 C122 44 118 38 112 36 Z', K.red) + P('M126 50 C140 52 142 66 132 72 C134 64 132 58 126 56 Z', K.yellow, 2.5) + Cn(116, 52, 3.4, O) + P('M92 78 C100 92 114 96 124 88', '#2f9e44', 2.5) + L(60, 128, 160, 128, K.brown2, 6)],
    cat: ['pink', () => P('M58 50 L66 20 L86 40 Z', K.orange) + P('M142 50 L134 20 L114 40 Z', K.orange) + C(100, 72, 44, K.orange) + P('M64 54 c10 -2 16 6 20 12 M136 54 c-10 -2 -16 6 -20 12', 'none', 2.5) + eyes(84, 116, 72) + P('M96 84 h8 l-4 5 Z', K.pink, 2) + P('M100 89 q-6 7 -12 2 M100 89 q6 7 12 2', 'none', 2.5) + L(70, 86, 46, 82, O, 2) + L(70, 92, 46, 96, O, 2) + L(130, 86, 154, 82, O, 2) + L(130, 92, 154, 96, O, 2)],
    falcon: ['sky', () => P('M60 100 C50 70 70 38 104 38 C130 38 146 58 140 84 C134 110 90 124 60 100 Z', K.brown) + P('M80 104 C84 84 104 74 124 82 C118 104 96 114 80 104 Z', K.tan) + P('M132 52 C150 50 158 60 150 70 C146 64 140 62 134 64 Z', K.yellow) + C(120, 54, 7, '#fff', 2.5) + Cn(122, 54, 3.4, O) + L(90, 120, 90, 132) + L(108, 120, 108, 132)],
    frog: ['green', CLUE.frog],
    bee: ['sky', () => E(100, 76, 40, 28, K.yellow) + P('M86 50 v52 M108 50 v52', 'none', 7) + E(86, 42, 18, 11, '#fff', 2.5) + E(114, 40, 18, 11, '#fff', 2.5) + Cn(126, 70, 4, O) + P('M60 76 l-12 0', 'none', 3)],
    snake: ['green', CLUE.snake],
    ant: ['sand', () => C(60, 82, 16, O, 0) + C(98, 80, 12, O, 0) + C(134, 74, 18, O, 0) + L(90, 88, 80, 108) + L(100, 90, 100, 110) + L(108, 88, 120, 108) + P('M140 58 c4 -14 14 -18 20 -16 M134 58 c-2 -16 6 -24 14 -24', 'none', 3) + Cn(140, 70, 3, '#fff')],

    /* ===== طعام ونبات ===== */
    apple: ['pink', () => P('M100 46 C76 32 46 50 52 86 C58 116 86 124 100 114 C114 124 142 116 148 86 C154 50 124 32 100 46 Z', K.red) + P('M100 46 q2 -18 12 -24', 'none', 3) + P('M106 36 c10 -14 28 -10 30 -4 c-10 10 -24 10 -30 4 Z', K.green, 2.5) + shine(72, 66, 7, 11)],
    dates: ['sand', () => P('M100 20 C96 40 80 52 66 60 M100 20 C104 40 120 52 134 60 M100 20 V60', 'none', 3) + [[66, 70], [100, 66], [134, 70], [82, 98], [118, 98], [100, 124]].map(([x, y]) => E(x, y, 13, 17, K.brown) + shine(x - 4, y - 7, 3, 5)).join('')],
    peach: ['pink', () => C(100, 78, 44, '#ffb38a') + P('M100 36 C86 54 86 98 100 120', 'none', 2.5) + P('M100 36 q-2 -12 6 -18', 'none', 3) + P('M104 30 c12 -12 30 -6 30 0 c-12 8 -24 8 -30 0 Z', K.green, 2.5) + shine(78, 64, 7, 10)],
    watermelon: ['green', () => P('M24 50 A76 76 0 0 0 176 50 Z', K.green2) + P('M34 50 A66 66 0 0 0 166 50 Z', '#fff', 0) + P('M40 50 A60 60 0 0 0 160 50 Z', K.red, 2.5) + L(24, 50, 176, 50) + [[70, 66], [100, 74], [130, 66], [86, 90], [116, 90], [100, 104]].map(([x, y]) => En(x, y, 3, 4.5, O)).join('')],
    pomegranate: ['pink', () => C(100, 80, 44, K.red2) + P('M86 40 l-4 -14 l10 8 l8 -12 l8 12 l10 -8 l-4 14 Z', K.red2, 2.5) + shine(78, 64, 7, 11) + P('M120 104 c6 -6 10 -14 10 -22', 'none', 2.5)],
    banana: ['sand', () => P('M40 56 C50 110 130 130 170 80 C150 96 90 100 62 50 Z', K.yellow) + P('M62 50 l-10 -10 l-8 8 l-4 8', K.brown2, 2.5) + P('M60 64 C80 100 130 110 158 90', 'none', 2)],
    lemon: ['sand', () => P('M40 76 C40 50 70 38 100 38 C130 38 160 50 160 76 C160 102 130 114 100 114 C70 114 40 102 40 76 Z', K.yellow) + P('M40 76 l-12 -4 M160 76 l12 4', 'none', 4) + P('M118 40 c8 -14 26 -16 32 -10 c-8 10 -24 14 -32 10 Z', K.green, 2.5) + shine(78, 60, 12, 6)],
    olive: ['green', () => P('M24 100 C70 80 120 60 176 40', 'none', 4) + [[60, 78, -25], [100, 62, -25], [140, 48, -25]].map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})">${E(x, y - 14, 20, 8, K.green)}</g>`).join('') + E(74, 96, 11, 15, '#556b2f') + E(118, 82, 11, 15, '#556b2f') + E(156, 70, 10, 14, '#556b2f') + shine(70, 90, 3, 5) + shine(114, 76, 3, 5)],
    corn: ['sand', () => P('M100 20 C122 20 130 60 128 96 C126 120 112 128 100 128 C88 128 74 120 72 96 C70 60 78 20 100 20 Z', K.yellow) + P('M84 30 v86 M100 22 v104 M116 30 v86 M76 50 h48 M74 70 h52 M74 90 h52 M78 110 h44', 'none', 1.8) + P('M72 96 C56 80 54 50 62 34 C70 60 80 86 92 128 Z', K.green) + P('M128 96 C144 80 146 50 138 34 C130 60 120 86 108 128 Z', K.green)],
    bread: ['sand', () => shadow(100, 120, 66) + P('M30 96 C24 60 60 44 100 44 C140 44 176 60 170 96 C168 112 32 112 30 96 Z', K.tan) + P('M66 60 l-8 24 M100 54 l-6 28 M134 60 l-8 24', 'none', 3) + shine(70, 56, 14, 4)],
    tree: ['sky', () => shadow(100, 130, 40) + R(90, 80, 20, 50, 4, K.brown) + C(100, 56, 42, K.green) + C(68, 72, 24, K.green) + C(132, 72, 24, K.green) + Cn(84, 44, 8, '#fff', .3)],
    leaf: ['green', () => P('M40 110 C40 50 100 24 164 30 C166 94 110 122 40 110 Z', K.green) + P('M40 110 C80 90 120 60 164 30 M80 92 l-6 -24 M108 70 l-2 -24 M100 80 l26 4', 'none', 2.5)],
    nut: ['sand', () => P('M100 30 C136 30 154 58 150 84 C146 114 120 124 100 124 C80 124 54 114 50 84 C46 58 64 30 100 30 Z', '#c58b4f') + P('M100 30 V124 M70 50 c10 10 10 26 0 36 c10 10 10 22 2 30 M130 50 c-10 10 -10 26 0 36 c-10 10 -10 22 -2 30', 'none', 2.5)],
    strawberry: ['pink', () => P('M100 124 C64 104 46 74 54 56 C62 40 86 44 100 50 C114 44 138 40 146 56 C154 74 136 104 100 124 Z', K.red) + P('M70 46 l12 -12 l8 10 l10 -14 l10 14 l8 -10 l12 12 Z', K.green, 2.5) + [[80, 66], [100, 70], [120, 66], [90, 88], [110, 88], [100, 106]].map(([x, y]) => En(x, y, 2.4, 3.6, K.yellow)).join('')],
    berries: ['lav', () => P('M100 22 C98 34 96 40 92 46', 'none', 3) + P('M100 24 c14 -10 28 -4 30 2 c-10 8 -24 8 -30 -2 Z', K.green, 2.5) + [[84, 60], [104, 58], [74, 80], [94, 80], [114, 78], [84, 100], [104, 100], [94, 118]].map(([x, y]) => C(x, y, 11, K.purple, 2.5) + Cn(x - 3, y - 3, 2.5, '#fff', .6)).join('')],
    fig: ['lav', () => P('M100 30 C108 52 140 64 140 92 C140 116 120 126 100 126 C80 126 60 116 60 92 C60 64 92 52 100 30 Z', '#7b4a8c') + P('M100 30 q-2 -10 4 -16', 'none', 3) + shine(82, 84, 5, 10) + P('M100 96 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0', '#ff8fab', 2)],
    beans: ['green', () => P('M28 96 C40 50 130 30 172 48 C176 64 140 100 28 96 Z', K.green) + [[64, 82], [96, 72], [128, 60]].map(([x, y]) => E(x, y, 15, 11, '#c5e8a5', 2.5)).join('') + P('M172 48 l10 -12', 'none', 3)],
    drop: ['sky', () => P('M100 22 C112 50 140 70 140 94 C140 116 122 128 100 128 C78 128 60 116 60 94 C60 70 88 50 100 22 Z', K.blue) + shine(84, 96, 6, 12)],
    water: ['sky', () => P('M62 36 L72 126 H128 L138 36 Z', '#e7f5ff') + P('M66 70 L72 126 H128 L134 70 Z', K.blue, 0) + L(62, 36, 138, 36) + P('M62 36 L72 126 H128 L138 36', 'none') + L(66, 70, 134, 70, '#fff', 3) + shine(82, 96, 4, 14)],

    /* ===== أدوات وأشياء ===== */
    egg: ['warm', () => shadow(100, 126, 34) + P('M100 22 C128 22 144 70 144 92 C144 116 124 128 100 128 C76 128 56 116 56 92 C56 70 72 22 100 22 Z', '#fff') + shine(84, 64, 7, 14)],
    eggs: ['warm', () => P('M30 92 Q100 140 170 92 Z', K.tan) + L(30, 92, 170, 92) + [[70, 70], [100, 64], [130, 70]].map(([x, y]) => P(`M${x} ${y - 26} C${x + 16} ${y - 26} ${x + 20} ${y + 2} ${x + 20} ${y + 10} C${x + 20} ${y + 24} ${x - 20} ${y + 24} ${x - 20} ${y + 10} C${x - 20} ${y + 2} ${x - 16} ${y - 26} ${x} ${y - 26} Z`, '#fff')).join('')],
    house: ['sky', () => shadow(100, 128, 66) + R(46, 64, 108, 62, 4, K.cream) + P('M34 68 L100 22 L166 68 Z', K.red) + R(88, 88, 24, 38, 3, K.brown) + Cn(106, 108, 2.4, K.yellow) + R(56, 78, 22, 20, 3, K.blue) + R(122, 78, 22, 20, 3, K.blue) + L(67, 78, 67, 98, '#fff', 2) + L(133, 78, 133, 98, '#fff', 2)],
    door: ['warm', () => R(56, 14, 88, 118, 6, K.brown) + R(66, 26, 68, 40, 4, K.brown2, 2.5) + R(66, 74, 68, 46, 4, K.brown2, 2.5) + C(124, 76, 5, K.yellow, 2.5) + L(40, 132, 160, 132, O, 4)],
    crown: ['lav', () => P('M38 104 L30 46 L68 74 L100 30 L132 74 L170 46 L162 104 Z', K.yellow) + R(38, 102, 124, 18, 4, K.gold) + C(100, 30, 7, K.red, 2.5) + C(30, 46, 6, K.blue, 2.5) + C(170, 46, 6, K.blue, 2.5) + C(70, 111, 5, K.red, 2) + C(100, 111, 5, K.green, 2) + C(130, 111, 5, K.red, 2)],
    gold: ['lav', () => P('M40 104 L56 84 H96 L104 104 Z', K.yellow) + P('M98 104 L114 84 H154 L162 104 Z', K.yellow) + P('M70 82 L86 62 H126 L134 82 Z', K.yellow) + Pn('M58 88 h30 l-2 4 h-26 Z', '#fff') + Pn('M88 66 h30 l-2 4 h-26 Z', '#fff') + star5(150, 40, 10, '#fff', 2) + star5(50, 52, 7, '#fff', 2)],
    clock: ['sky', () => C(100, 72, 50, K.white, 4) + C(100, 72, 50, 'none', 0) + C(100, 72, 43, '#fff', 2) + [0, 1, 2, 3].map(i => { const a = i * Math.PI / 2; return L(100 + 36 * Math.cos(a), 72 + 36 * Math.sin(a), 100 + 42 * Math.cos(a), 72 + 42 * Math.sin(a)); }).join('') + L(100, 72, 100, 44, O, 4) + L(100, 72, 122, 82, O, 4) + Cn(100, 72, 4, K.red)],
    candle: ['night', () => R(82, 62, 36, 66, 6, '#fff') + P('M86 62 c0 10 6 12 6 4', '#fff', 2) + L(100, 62, 100, 50) + P('M100 50 C88 40 92 22 100 12 C108 22 112 40 100 50 Z', K.orange, 2.5) + Pn('M100 46 C94 40 96 30 100 24 C104 30 106 40 100 46 Z', K.yellow) + `<circle cx="100" cy="36" r="30" fill="${K.yellow}" opacity=".18"/>`],
    feather: ['sky', () => P('M50 122 C70 84 104 40 150 20 C160 50 140 96 82 112 Z', K.blue) + P('M50 122 L150 20', 'none', 2.5) + P('M80 100 l-12 -8 M98 80 l-12 -10 M116 60 l-10 -10 M92 100 l14 -2 M110 82 l16 -2', 'none', 2)],
    box: ['warm', () => shadow(100, 126, 60) + R(40, 56, 120, 68, 6, K.tan) + R(34, 42, 132, 20, 5, K.brown) + R(92, 60, 16, 20, 3, K.yellow, 2.5) + L(40, 90, 160, 90, K.brown2, 2)],
    shirt: ['sky', () => P('M70 24 L40 36 L22 64 L46 76 L56 62 L56 126 H144 V62 L154 76 L178 64 L160 36 L130 24 C126 36 74 36 70 24 Z', K.blue) + P('M84 30 L100 46 L116 30', 'none', 2.5) + [60, 78, 96].map(y => Cn(100, y, 3, '#fff')).join('')],
    thobe: ['sand', () => P('M74 18 L46 30 L30 66 L52 74 L60 60 L58 130 H142 L140 60 L148 74 L170 66 L154 30 L126 18 C120 30 80 30 74 18 Z', '#fff') + P('M90 22 L100 34 L110 22 M100 34 V70', 'none', 2.5)],
    dress: ['pink', () => P('M80 20 L120 20 L126 54 L160 126 H40 L74 54 Z', K.pink) + P('M74 54 H126', 'none', 3) + C(100, 62, 5, K.yellow, 2) + P('M52 108 Q100 120 148 108', 'none', 2)],
    glasses: ['sky', () => C(64, 76, 28, '#e7f5ff', 4) + C(136, 76, 28, '#e7f5ff', 4) + P('M92 72 Q100 62 108 72', 'none', 4) + L(36, 70, 20, 56, O, 4) + L(164, 70, 180, 56, O, 4) + Pn('M50 66 l14 -10', '#fff') + L(52, 68, 64, 58, '#fff', 3) + L(124, 68, 136, 58, '#fff', 3)],
    envelope: ['sky', () => R(32, 34, 136, 84, 6, '#fff') + P('M32 40 L100 88 L168 40', 'none') + P('M32 116 L82 74 M168 116 L118 74', 'none', 2.5) + C(100, 88, 9, K.red, 2.5)],
    pen: ['warm', () => `<g transform="rotate(-35 100 72)">${R(28, 60, 120, 24, 4, K.yellow)}${R(28, 60, 18, 24, 3, K.pink)}${R(44, 60, 8, 24, 0, K.gray)}${P('M148 60 L176 72 L148 84 Z', K.tan)}${P('M168 68 L176 72 L168 76 Z', O, 0)}${L(52, 72, 148, 72, '#e0a800', 2)}</g>`],
    book: ['warm', () => P('M100 40 C80 28 50 28 30 34 V116 C50 110 80 110 100 122 Z', K.red) + P('M100 40 C120 28 150 28 170 34 V116 C150 110 120 110 100 122 Z', K.red) + P('M100 46 C82 36 58 36 40 40 V108 C58 104 82 104 100 114 Z', '#fff', 2.5) + P('M100 46 C118 36 142 36 160 40 V108 C142 104 118 104 100 114 Z', '#fff', 2.5) + L(100, 46, 100, 114) + P('M52 58 h34 M52 70 h34 M52 82 h28 M114 58 h34 M114 70 h34 M114 82 h28', 'none', 2)],
    books: ['warm', () => shadow(100, 128, 60) + R(46, 100, 108, 22, 4, K.blue) + R(54, 78, 96, 22, 4, K.red) + R(40, 56, 104, 22, 4, K.green) + R(58, 34, 88, 22, 4, K.yellow) + [111, 89, 67, 45].map(y => L(64, y, 140, y, '#fff', 2)).join('')],
    gift: ['pink', () => shadow(100, 128, 56) + R(46, 62, 108, 62, 4, K.red) + R(40, 46, 120, 22, 4, K.red2) + R(92, 46, 16, 78, 0, K.yellow, 2.5) + P('M100 46 C80 20 58 30 70 44 Z', K.yellow, 2.5) + P('M100 46 C120 20 142 30 130 44 Z', K.yellow, 2.5)],
    bucket: ['sky', () => P('M58 50 C58 10 142 10 142 50', 'none', 4) + P('M50 50 L62 126 H138 L150 50 Z', K.gray) + E(100, 50, 50, 11, K.blue) + L(56, 80, 144, 80, '#fff', 2)],
    chair: ['warm', () => R(64, 20, 70, 58, 8, K.brown) + R(76, 32, 46, 34, 4, K.tan, 2) + R(54, 74, 92, 14, 4, K.brown) + R(60, 86, 10, 40, 3, K.brown2) + R(130, 86, 10, 40, 3, K.brown2)],
    cup: ['sky', () => P('M58 36 H130 V100 C130 116 118 124 104 124 H84 C70 124 58 116 58 100 Z', K.teal) + P('M130 52 C154 52 156 92 130 92', 'none', 6) + L(66, 48, 122, 48, '#fff', 3) + P('M82 28 c-6 -8 6 -12 0 -20 M106 28 c-6 -8 6 -12 0 -20', 'none', 2.5)],
    ladder: ['sky', () => R(58, 10, 12, 124, 4, K.tan) + R(130, 10, 12, 124, 4, K.tan) + [26, 52, 78, 104].map(y => R(66, y, 68, 10, 3, K.brown)).join('')],
    glue: ['warm', () => R(70, 50, 60, 76, 12, '#fff') + P('M86 50 L90 26 H110 L114 50 Z', K.orange) + R(94, 10, 12, 18, 4, K.orange) + R(78, 72, 44, 30, 4, K.yellow, 2) + P('M100 10 c0 -4 0 -6 0 -6', 'none', 2)],
    soap: ['sky', () => R(46, 54, 108, 56, 22, K.pink) + C(70, 40, 10, '#fff', 2.5) + C(96, 30, 13, '#fff', 2.5) + C(126, 42, 9, '#fff', 2.5) + shine(78, 70, 16, 5)],
    ball: ['green', () => C(100, 72, 46, '#fff') + P('M100 26 C80 44 80 100 100 118 M54 72 C74 58 126 58 146 72', 'none', 3) + P('M64 44 C90 60 110 60 136 44', K.red, 0)],
    toys: ['lav', () => C(62, 94, 26, K.red) + P('M38 94 h48 M62 70 v48', 'none', 2.5) + R(104, 86, 34, 34, 4, K.yellow) + T(121, 112, 22, 'ب', O) + R(140, 96, 26, 24, 4, K.blue) + C(122, 46, 16, K.tan) + C(108, 32, 7, K.tan) + C(136, 32, 7, K.tan) + Cn(116, 46, 2.4, O) + Cn(128, 46, 2.4, O) + E(122, 54, 6, 4, '#fff3e0', 2)],
    triangle: ['lav', () => P('M100 20 L166 122 H34 Z', K.purple, 4)],
    car: ['sky', () => shadow(100, 124, 70) + P('M24 98 V80 C24 72 30 68 38 66 L56 64 L72 40 C76 36 82 34 88 34 H120 C128 34 132 36 136 40 L154 64 L166 66 C174 68 178 74 178 82 V98 Z', K.red) + P('M80 44 H118 L134 64 H70 Z', '#cfe8ff', 2.5) + L(100, 44, 100, 64) + C(58, 100, 16, O) + C(58, 100, 7, K.gray, 0) + C(144, 100, 16, O) + C(144, 100, 7, K.gray, 0) + R(166, 74, 10, 8, 2, K.yellow, 2)],
    plane: ['sky', () => P('M20 74 C20 66 30 62 40 62 H150 C170 62 184 68 184 74 C184 80 170 86 150 86 H40 C30 86 20 82 20 74 Z', '#fff') + P('M86 64 L60 24 H80 L118 64 Z', K.blue) + P('M86 84 L60 124 H80 L118 84 Z', K.blue) + P('M30 64 L22 40 H36 L50 62 Z', K.red) + [110, 126, 142].map(x => C(x, 72, 4, K.blue, 2)).join('')],
    ship: ['sea', () => P('M30 92 H170 L150 124 H50 Z', K.red) + R(62, 64, 76, 28, 4, '#fff') + R(80, 40, 16, 26, 2, K.orange) + R(104, 40, 16, 26, 2, K.orange) + [74, 98, 122].map(x => C(x, 78, 5, K.blue, 2)).join('') + P('M10 126 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0', 'none', 3)],
    sickbed: ['sky', () => R(24, 86, 152, 16, 4, K.blue) + R(24, 60, 14, 64, 4, K.brown) + R(162, 74, 14, 50, 4, K.brown) + face({ cx: 62, cy: 66, r: 20, eyes: 'closed', mouth: 'flat' }) + P('M76 84 C90 66 150 66 162 86 Z', '#fff') + R(52, 40, 22, 10, 4, K.blue, 2) + R(120, 30, 8, 30, 4, '#fff', 2) + C(124, 60, 6, K.red, 2)],
    drum: ['warm', CLUE.drum],
    whistle: ['sky', CLUE.whistle],
    lollipop: ['pink', CLUE.lollipop],
    rose: ['pink', CLUE.rose],
    hand: ['warm', () => P('M66 128 L60 74 C58 64 70 60 74 70 L78 86 L78 40 C78 30 92 30 92 40 L92 78 L94 30 C94 20 108 20 108 30 L108 78 L112 38 C112 28 126 28 126 38 L124 84 L132 66 C136 56 150 60 146 72 L134 112 C130 124 120 128 110 128 Z', K.skin)],
    eye: ['sky', CLUE.eye],
    ear: ['warm', () => P('M84 22 C126 18 150 46 146 74 C142 98 120 104 118 120 C116 132 98 134 92 124 C88 116 96 110 92 104 C70 96 56 74 60 52 C64 34 72 24 84 22 Z', K.skin) + P('M84 44 C104 36 124 50 120 70 C118 84 106 86 104 96 M88 62 C94 56 106 60 104 70', 'none', 3)],
    face: ['warm', () => face({})],
    head: ['warm', () => face({ cy: 74, r: 46 })],

    /* ===== طبيعة وأماكن ===== */
    sun: ['sky', () => [...Array(12)].map((_, i) => { const a = i * Math.PI / 6; return L(100 + 44 * Math.cos(a), 72 + 44 * Math.sin(a), 100 + 60 * Math.cos(a), 72 + 60 * Math.sin(a), K.orange, 6); }).join('') + C(100, 72, 34, K.yellow) + shine(88, 60, 8, 5)],
    moon: ['night', () => C(100, 70, 44, '#fff3c4') + C(84, 56, 8, '#f2e2a0', 2) + C(118, 84, 11, '#f2e2a0', 2) + C(112, 50, 5, '#f2e2a0', 2) + star5(30, 28, 7, K.yellow, 2) + star5(170, 110, 6, K.yellow, 2)],
    crescent: ['night', () => P('M120 22 C86 30 70 60 76 88 C82 114 110 128 136 122 C104 116 90 92 92 70 C94 46 104 30 120 22 Z', K.yellow) + star5(150, 46, 10, K.yellow, 2) + star5(40, 110, 6, K.yellow, 2)],
    star: ['night', () => star5(100, 74, 54, K.yellow, 3.5) + shine(86, 60, 8, 5)],
    cloud: ['sky', () => P('M50 100 C26 100 26 70 50 68 C50 44 82 34 96 52 C108 30 148 34 148 62 C176 60 178 100 152 100 Z', '#fff', 3.5)],
    clouds: ['sky', () => P('M28 74 C10 74 12 52 30 52 C32 34 56 30 64 44 C74 28 102 32 102 52 C120 52 122 74 104 74 Z', '#fff') + P('M86 118 C68 118 70 96 88 96 C90 78 114 74 122 88 C132 72 160 76 160 96 C178 96 180 118 162 118 Z', '#e9eef5')],
    fire: ['night', () => R(48, 110, 104, 12, 6, K.brown, 2.5) + `<g transform="rotate(14 100 116)">${R(46, 110, 108, 12, 6, K.brown2, 2.5)}</g>` + P('M100 112 C64 110 58 80 72 60 C74 74 82 78 86 74 C80 54 92 32 108 22 C104 40 116 50 122 46 C122 40 120 34 126 30 C146 56 146 108 100 112 Z', K.orange) + P('M100 110 C84 108 82 92 90 82 C94 92 100 92 102 86 C102 76 108 68 114 64 C122 82 124 108 100 110 Z', K.yellow, 0)],
    sea: ['sky', () => Rn(0, 64, 200, 76, 0, K.blue) + P('M0 64 q16 -10 33 0 t33 0 t33 0 t33 0 t33 0 t34 0', 'none', 3) + P('M0 92 q16 -10 33 0 t33 0 t33 0 t33 0 t33 0 t34 0', '#7cc4ff', 3) + P('M0 118 q16 -10 33 0 t33 0 t33 0 t33 0 t33 0 t34 0', '#a5d8ff', 3) + C(160, 30, 14, K.yellow, 2.5)],
    river: ['green', () => P('M70 0 C60 40 130 60 110 100 C100 120 120 140 130 140 H170 C150 120 150 104 158 90 C176 56 104 36 112 0 Z', K.blue) + P('M96 24 q8 -4 14 0 M120 66 q8 -4 14 0 M132 112 q8 -4 14 0', 'none', 2.5) + C(40, 60, 18, K.green) + C(36, 108, 14, K.green) + C(186, 40, 14, K.green)],
    cave: ['sand', () => P('M10 130 C20 70 50 30 100 26 C150 30 180 70 190 130 Z', '#b5a48b') + P('M66 130 C66 92 82 72 100 72 C118 72 134 92 134 130 Z', '#3b3346') + P('M40 70 l14 6 M150 64 l-12 8 M120 40 l10 4', 'none', 2.5)],
    market: ['warm', () => R(30, 60, 140, 66, 4, K.cream) + P('M22 60 L36 30 H164 L178 60 Z', K.red) + [36, 64, 92, 120, 148].map((x, i) => i % 2 ? '' : Pn(`M${x} 30 h28 l6 30 h-28 Z`, '#fff')).join('') + P('M22 60 L36 30 H164 L178 60 Z', 'none') + R(44, 92, 112, 22, 3, K.tan) + C(64, 88, 9, K.red, 2.5) + C(86, 88, 9, K.orange, 2.5) + C(108, 88, 9, K.yellow, 2.5) + C(130, 88, 9, K.green, 2.5) + C(148, 88, 8, K.red, 2.5)],
    garden: ['sky', () => Rn(0, 96, 200, 44, 0, K.leaf) + [20, 44, 68, 92, 116, 140, 164].map(x => R(x, 82, 14, 40, 3, '#fff', 2.5)).join('') + R(14, 92, 172, 7, 2, '#fff', 2.5) + R(150, 40, 10, 50, 3, K.brown) + C(155, 36, 22, K.green) + [[40, 116, K.red], [74, 120, K.yellow], [110, 116, K.pink]].map(([x, y, c]) => L(x, y, x, y + 12, K.green2, 3) + C(x, y, 7, c, 2.5)).join('') + C(40, 30, 12, K.yellow, 2.5)],
    triangle_: ['lav', () => ''],

    /* ===== أشخاص ===== */
    boy: ['sky', () => face({ cy: 70, r: 42 })],
    girl: ['pink', () => face({ cy: 72, r: 40, girl: true })],
    teacher: ['warm', () => R(96, 20, 92, 64, 4, '#2f6b4f') + T(142, 64, 30, 'أ ب', '#fff') + R(24, 78, 66, 56, 20, K.blue) + C(57, 54, 24, K.skin) + P('M33 50 C33 26 81 26 81 50 C76 40 66 38 57 42 C48 38 38 40 33 50 Z', K.hair) + eyes(49, 65, 56, 2.8) + P('M50 66 q7 5 14 0', 'none', 2.4) + P('M84 94 L110 70', 'none', 4) + C(110, 70, 4, K.skin, 2)],
  };
  delete PIC.triangle_;

  /* أشياء صغيرة تسقط على هيكل الحرف (لعبة القرينة) — تستعمل الرسم نفسه بلا خلفية */
  const OBJ = { date: 'dates', egg: 'egg', snow: 'snowball', nut: 'nut', gold: 'gold', olive: 'olive1', peach: 'peach', leaf: 'leaf', frog: 'frog', env: 'envelope', cloud: 'cloud', berry: 'strawberry', drop: 'drop', star: 'star', hand: 'hand' };
  PIC.snowball = ['sky', () => C(100, 72, 46, '#fff', 3.5) + shine(84, 56, 10, 7) + C(116, 90, 5, '#dbe9f6', 0)];
  PIC.olive1 = ['green', () => E(100, 76, 32, 42, '#556b2f') + shine(88, 58, 6, 10) + P('M100 34 q4 -12 14 -16', 'none', 3)];
  PIC.snow = ['sky', () => { let s = ''; for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3, x = 100 + 46 * Math.cos(a), y = 66 + 46 * Math.sin(a); s += L(100, 66, x, y, '#fff', 8) + L(100, 66, x, y, K.blue2, 3); s += L(100 + 30 * Math.cos(a), 66 + 30 * Math.sin(a), 100 + 30 * Math.cos(a) + 12 * Math.cos(a + .9), 66 + 30 * Math.sin(a) + 12 * Math.sin(a + .9), K.blue2, 3) + L(100 + 30 * Math.cos(a), 66 + 30 * Math.sin(a), 100 + 30 * Math.cos(a) + 12 * Math.cos(a - .9), 66 + 30 * Math.sin(a) + 12 * Math.sin(a - .9), K.blue2, 3); } return s + C(100, 66, 7, '#fff', 3) + P('M10 140 C40 116 70 124 100 120 C130 116 160 118 190 140 Z', '#fff'); }];

  /* ---------- خرائط الكلمات ← الصور (بالرسم المجرّد من الحركات) ---------- */
  const strip = w => (w || '').replace(/[ً-ٰٟـ]/g, '').replace(/[إأآ]/g, 'ا').replace(/ى/g, 'ي').replace(/^ال/, '').trim();
  const WORDPIC = {
    'اسد': 'lion', 'فار': 'mouse', 'راس': 'head', 'وجه': 'face', 'بيضة': 'egg', 'بيض': 'eggs', 'بطة': 'duck', 'كلب': 'dog', 'تمر': 'dates', 'تمرة': 'dates', 'تفاحة': 'apple', 'تفاح': 'apple', 'بيت': 'house',
    'ثلج': 'snow', 'ثعلب': 'fox', 'مثلث': 'triangle', 'جمل': 'camel', 'دجاجة': 'hen', 'دجاج': 'hen', 'تاج': 'crown', 'حوت': 'whale', 'بحر': 'sea', 'خبز': 'bread', 'خوخة': 'peach', 'بطيخ': 'watermelon',
    'دب': 'bear', 'وردة': 'rose', 'يد': 'hand', 'ذهب': 'gold', 'ذرة': 'corn', 'اذن': 'ear', 'رمان': 'pomegranate', 'قرد': 'monkey', 'قمر': 'moon', 'زرافة': 'giraffe', 'زيتون': 'olive', 'زيتونة': 'olive1', 'موز': 'banana',
    'سمكة': 'fish', 'سمك': 'fish', 'ساعة': 'clock', 'شمس': 'sun', 'شجرة': 'tree', 'شمعة': 'candle', 'ريش': 'feather', 'ريشة': 'feather', 'صندوق': 'box', 'صقر': 'falcon', 'قميص': 'shirt', 'ضفدع': 'frog', 'مريض': 'sickbed',
    'طائرة': 'plane', 'قطة': 'cat', 'ظرف': 'envelope', 'نظارة': 'glasses', 'عين': 'eye', 'غيمة': 'cloud', 'ببغاء': 'parrot', 'صمغ': 'glue', 'فيل': 'elephant', 'فستان': 'dress', 'سفينة': 'ship', 'قلم': 'pen', 'كتاب': 'book',
    'ليمون': 'lemon', 'نجمة': 'star', 'نار': 'fire', 'هلال': 'crescent', 'هدية': 'gift', 'دلو': 'bucket', 'كرسي': 'chair', 'ديك': 'rooster', 'ثوب': 'thobe', 'باب': 'door', 'ماء': 'water', 'غار': 'cave', 'توت': 'berries',
    'كوب': 'cup', 'فول': 'beans', 'سوق': 'market', 'تين': 'fig', 'سلم': 'ladder', 'معلم': 'teacher', 'سيارة': 'car', 'ولد': 'boy', 'بنت': 'girl', 'حديقة': 'garden', 'كتب': 'books', 'سحب': 'clouds', 'لعب': 'toys', 'نهر': 'river',
    'جوزة': 'nut', 'فراولة': 'strawberry', 'قطرة': 'drop', 'ورقة': 'leaf', 'كرة': 'ball', 'صابون': 'soap', 'نحلة': 'bee', 'افعى': 'snake', 'نملة': 'ant', 'عصفور': 'falcon_',
  };
  delete WORDPIC['عصفور'];
  /* أفعالٌ وأسماء أعلام لا تُصوَّر: «لُعَبُ» تُصوَّر، أمّا «لَعِبَ» فلا — نفرّق بالحركات قبل التجريد */
  const NO_PIC_EXACT = ['لَعِبَ', 'كَتَبَ', 'ذَهَبَ', 'شَرِبَ', 'سَلِمَ', 'نُورُ', 'عُمَرُ'];

  /* ---------- مُخرِجات ---------- */
  const cache = {};
  const enc = s => 'data:image/svg+xml;utf8,' + encodeURIComponent(s);
  /* الأسلوب الناعم المعتمد: لا خطوط محيطة سوداء، وكل لون يصير تدرّجًا ناعمًا من فاتحٍ إلى لونه، مع ظلّ خفيف */
  const hex = c => { const n = parseInt(c.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  const mix = (c, t, k) => '#' + hex(c).map((v, i) => Math.round(v + (t[i] - v) * k).toString(16).padStart(2, '0')).join('');
  function soften(body) {
    const cols = {};
    let s = body
      /* الأشكال المملوءة: نحذف خطّها الأسود */
      .replace(/(<(?:path|circle|ellipse|rect)[^>]*fill="(?!none)[^"]*"[^>]*?) stroke="#2b2d42" stroke-width="[\d.]+" stroke-linejoin="round" stroke-linecap="round"/g, '$1')
      /* خطوط التفاصيل الباقية: لونٌ بنّيّ داكن ناعم بدل الأسود */
      .replace(/stroke="#2b2d42"/g, 'stroke="#5a4636"')
      .replace(/fill="(#[0-9a-fA-F]{6})"/g, (m, c) => { const k = c.toLowerCase(); if (k === '#2b2d42') return 'fill="#4a3a30"'; cols[k] = 1; return `fill="url(#s${k.slice(1)})"`; });
    const defs = Object.keys(cols).map(c => `<radialGradient id="s${c.slice(1)}" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="${mix(c, [255, 255, 255], .42)}"/><stop offset="1" stop-color="${mix(c, [40, 25, 20], .12)}"/></radialGradient>`).join('');
    return `<defs>${defs}<filter id="sd" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#3d2b1f" flood-opacity=".18"/></filter></defs><g filter="url(#sd)">${s}</g>`;
  }
  const SOFTBG = { warm: ['#fffaf1', '#ffe9cc'], sky: ['#f4faff', '#d6eafb'], green: ['#f4fff2', '#d4f1d1'], sea: ['#f0fbff', '#cdeef6'], night: ['#3d4f86', '#1f2a4d'], pink: ['#fff6f9', '#fbdbe6'], lav: ['#f8f5ff', '#e4dcff'], sand: ['#fffbf0', '#f6e6c4'] };
  const card = (bg, body) => { const b = SOFTBG[bg] || SOFTBG.warm; return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140"><defs><radialGradient id="cbg" cx=".5" cy=".3" r=".9"><stop offset="0" stop-color="${b[0]}"/><stop offset="1" stop-color="${b[1]}"/></radialGradient></defs><rect width="200" height="140" rx="18" fill="url(#cbg)"/>${soften(body)}</svg>`; };
  const softSvg = full => { const i = full.indexOf('>') + 1, j = full.lastIndexOf('</svg>'); return full.slice(0, i) + soften(full.slice(i, j)) + '</svg>'; };
  const bare = body => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140">${soften(body)}</svg>`;
  const CLUEBG = { finger_up: 'warm', knock: 'warm', kid_belly: 'sky', blow: 'night', loop: 'lav', plate_egg: 'sky', plate_apples: 'pink', bowl_star: 'night', snake: 'green', drum: 'warm', lollipop: 'pink', rose: 'pink', car_ramp: 'sky', bee: 'sky', whistle: 'sky', frog: 'green', eye: 'sky' };

  function picURL(k) {
    if (cache[k]) return cache[k];
    let s = '';
    if (PIC[k]) s = card(PIC[k][0], PIC[k][1]());
    else if (CLUE[k]) s = card(CLUEBG[k] || (k.startsWith('face_') ? 'warm' : 'sky'), CLUE[k]());
    return (cache[k] = s ? enc(s) : '');
  }
  function objURL(k) { const key = OBJ[k] || k, id = 'obj:' + key; if (cache[id]) return cache[id]; const p = PIC[key]; return (cache[id] = p ? enc(bare(p[1]())) : ''); }
  function wordPic(w) { if (!w || NO_PIC_EXACT.includes(w.trim())) return ''; const k = WORDPIC[strip(w)]; return k && (PIC[k] || CLUE[k]) ? k : ''; }

  /* أيقونة المدينة: بيت مسطّح بلون المدينة وعلى رايته علامتها */
  function cityIcon(color, mark, locked) {
    const c = locked ? '#ced4da' : color;
    const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 130">${En(80, 122, 64, 6, '#000', .1)}` +
      R(24, 56, 112, 64, 6, '#fff') + R(24, 56, 112, 14, 4, c) + P('M16 60 L80 16 L144 60 Z', c) + R(66, 84, 28, 36, 14, locked ? '#adb5bd' : '#5b3a29') +
      R(36, 78, 20, 18, 4, '#cfe8ff', 2.5) + R(104, 78, 20, 18, 4, '#cfe8ff', 2.5) + L(80, 16, 80, -2, O, 3) + P('M80 -2 L106 6 L80 14 Z', '#fff', 2.5) +
      (locked ? R(66, 30, 28, 22, 5, K.gray2) + P('M72 30 v-6 a8 8 0 0 1 16 0 v6', 'none', 3) : '') + '</svg>';
    return enc(softSvg(s.replace('viewBox="0 0 160 130"', 'viewBox="0 -8 160 138"')));
  }

  /* مشاهد «طريق اللافتات» (جانبية 240×120) */
  const rsky = `<rect width="240" height="120" fill="#e3f2fd"/>${Cn(212, 22, 11, K.yellow)}${P('M40 30 C30 30 30 18 40 18 C42 8 58 8 60 16 C70 14 74 30 62 30 Z', '#fff', 2)}`;
  const gr = (a, b) => Rn(a, 88, b - a, 32, 0, K.leaf) + Rn(a, 88, b - a, 4, 0, K.green);
  const flag = x => R(x, 52, 3, 38, 1, K.brown2, 1.5) + P(`M${x + 3} 52 l20 7 l-20 7 Z`, K.red, 2);
  const lane = Rn(0, 95, 240, 11, 0, '#e9e2d0') + `<path d="M4 100.5 H236" stroke="#fff" stroke-width="2" stroke-dasharray="8 8"/>`;
  const RS = {
    road: () => gr(0, 240) + lane + flag(222),
    hole: () => gr(0, 96) + gr(148, 240) + Rn(96, 88, 52, 32, 0, K.brown) + En(122, 93, 25, 8, '#3b2a1e') + flag(222),
    river: () => gr(0, 88) + gr(162, 240) + Rn(88, 90, 74, 30, 0, K.blue) + P('M94 102 q6 -4 12 0 t12 0 t12 0 t12 0 t12 0', 'none', 2) + flag(222),
    light: g => gr(0, 240) + lane + R(118, 44, 5, 50, 1, K.gray2, 1.5) + R(108, 16, 25, 40, 6, '#343a40', 2.5) + Cn(120.5, 27, 7, g ? '#5c2b2b' : '#ff4d4d') + Cn(120.5, 45, 7, g ? '#40c057' : '#24452c') + flag(222),
    door: o => gr(0, 240) + R(100, 34, 140, 56, 0, '#f4c38a', 3) + P('M94 36 L170 8 L246 36 Z', K.orange, 3) + (o ? R(122, 50, 30, 40, 0, '#3b2a1e', 3) : R(122, 50, 30, 40, 3, K.brown, 3) + Cn(146, 72, 2.8, K.yellow)),
    stairs: () => R(0, 60, 74, 60, 0, '#c9c2b5', 3) + P('M74 60 h24 v7 h24 v7 h24 v7 h24 v7 H240 V120 H74 Z', '#dee2e6', 3) + gr(170, 240) + flag(222),
    tree: few => gr(0, 240) + R(114, 54, 12, 36, 2, K.brown, 2.5) + C(120, 44, 26, K.green, 3) + (few ? '' : C(108, 40, 5, K.red, 2) + C(130, 36, 5, K.red, 2) + C(122, 54, 5, K.red, 2)) + C(134, 52, 5, K.red, 2) + flag(222),
    chest: o => gr(0, 240) + R(150, 68, 40, 22, 3, K.brown, 3) + Rn(150, 76, 40, 4, 0, K.yellow) + (o ? P('M150 68 l4 -18 h32 l4 18 Z', K.tan, 3) + C(162, 64, 5, K.yellow, 2) + C(176, 64, 5, K.yellow, 2) : P('M150 68 q20 -18 40 0 Z', K.tan, 3)),
  };

  window.ART = {
    K, BG, picURL, objURL, wordPic, cityIcon,
    has: k => !!(PIC[k] || CLUE[k]),
    keys: () => Object.keys(PIC).concat(Object.keys(CLUE)),
    hero: (girl, pose) => { const id = 'hero:' + (girl ? 'g' : 'b') + (pose || ''); return cache[id] || (cache[id] = enc(softSvg(heroSVG(girl, pose)))); },
    heroSVG,
    road: (k, alt) => { const id = 'road:' + k + (alt ? '+' : ''); return cache[id] || (cache[id] = RS[k] ? enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120">${rsky}${RS[k](alt)}</svg>`) : ''); },
    strip,
  };
  /* واجهة متوافقة مع الكود القديم */
  window.SVGX = {
    road: window.ART.road, hero: () => window.ART.hero(window.__DAAD_GIRL__),
    hasPic: k => !!(PIC[k] || CLUE[k]), pic: picURL, has: k => !!(PIC[k] || CLUE[k]), url: picURL, picKeys: () => window.ART.keys(),
  };
})();
