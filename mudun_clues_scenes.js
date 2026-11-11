/* مُدُنُ ضاد — مشاهد القرائن الثمانية والعشرين + بطاقات الوصل (لقطة واحدة) */
(function () {
  const { INK, RED, LET, dot, stroke, letterSVG, defs, BG, kidFace, bubble, word, hamzaD } = window.CLUE_LIB;
  const g = (cls, inner, extra) => `<g class="${cls}" ${extra || ''}>${inner}</g>`;
  const ghost = d => `<path class="cl-ghost" d="${d}" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-dasharray="3 8"/>`;
  const fillOf = (d, f) => `<path d="${d}" fill="${f}"/>`;

  /* ---------- الحركات المشتركة (دورة 7 ثوانٍ) ---------- */
  const CSS = `
.clue-svg{display:block;width:100%;height:auto}
.clue-svg *{transform-box:fill-box;transform-origin:center}
.clue-svg .cl-write{stroke-dasharray:100 104;animation:clWrite 7s ease-in-out infinite}
.clue-svg .cl-write-late{stroke-dasharray:100 104;animation:clWriteLate 7s ease-in-out infinite}
.clue-svg .cl-dot{animation:clDot 7s ease-in-out infinite}
.clue-svg .cl-dot-late{animation:clDotLate 7s ease-in-out infinite}
.clue-svg .cl-obj{animation:clObj 7s ease-in-out infinite}
.clue-svg .cl-stay{animation:clStay 7s ease-in-out infinite}
.clue-svg .cl-ghost{animation:clGhost 7s ease-in-out infinite;opacity:0}
.clue-svg .cl-bub{animation:clBub 7s ease-in-out infinite;transform-origin:30% 100%}
.clue-svg .cl-word{animation:clWord 7s ease-in-out infinite;opacity:0}
.clue-svg .cl-pop1{animation:clPop1 7s ease-in-out infinite}
.clue-svg .cl-pop2{animation:clPop2 7s ease-in-out infinite}
.clue-svg .cl-pop3{animation:clPop3 7s ease-in-out infinite}
.clue-svg .cl-drop{animation:clDrop 7s ease-in-out infinite}
.clue-svg .cl-blink{animation:clBlink 2.6s ease-in-out infinite}
.clue-svg .cl-bounce{animation:clBounce .7s ease-in-out infinite}
.clue-svg .cl-shake{animation:clShake .3s linear infinite}
.clue-svg .cl-chew{animation:clChew .45s ease-in-out infinite}
.clue-svg .cl-wing{animation:clWing .12s linear infinite;transform-origin:50% 100%}
.clue-svg .cl-rise{animation:clRise 1.6s ease-out infinite}
.clue-svg .cl-rise2{animation:clRise 1.6s ease-out .55s infinite}
.clue-svg .cl-puff{animation:clPuff 1.4s ease-out infinite}
.clue-svg .cl-puff2{animation:clPuff 1.4s ease-out .7s infinite}
.clue-svg .cl-fog{animation:clFog 7s ease-in-out infinite}
.clue-svg .cl-travel{animation:clTravel 7s ease-in-out infinite;offset-rotate:0deg}
.clue-svg .cl-fly{animation:clFly 7s ease-in-out infinite}
.clue-svg .cl-tobubble{animation:clToDot 7s ease-in-out infinite}
.clue-svg .cl-drum{animation:clDrum .5s ease-in-out infinite;transform-origin:50% 100%}
@keyframes clWrite{0%{stroke-dashoffset:102;opacity:1}14%{stroke-dashoffset:0;opacity:1}22%{opacity:1}30%,58%{opacity:.16}68%,100%{stroke-dashoffset:0;opacity:1}}
@keyframes clWriteLate{0%,40%{stroke-dashoffset:102;opacity:1}58%,100%{stroke-dashoffset:0;opacity:1}}
@keyframes clDot{0%,10%{opacity:0;transform:scale(.2)}15%,22%{opacity:1;transform:scale(1)}30%,58%{opacity:.16}68%,100%{opacity:1;transform:scale(1)}}
@keyframes clDotLate{0%,56%{opacity:0;transform:scale(.2)}62%,100%{opacity:1;transform:scale(1)}}
@keyframes clObj{0%,16%{opacity:0;transform:scale(.6)}28%,58%{opacity:1;transform:scale(1)}68%,100%{opacity:0;transform:scale(.95)}}
@keyframes clStay{0%,12%{opacity:0;transform:scale(.7)}22%,94%{opacity:1;transform:scale(1)}100%{opacity:0}}
@keyframes clGhost{0%,30%{opacity:0}38%,56%{opacity:.85}62%,100%{opacity:0}}
@keyframes clBub{0%,22%{opacity:0;transform:scale(.4)}30%,56%{opacity:1;transform:scale(1)}62%,100%{opacity:0;transform:scale(.9)}}
@keyframes clWord{0%,66%{opacity:0;transform:translateY(6px)}74%,94%{opacity:1;transform:translateY(0)}100%{opacity:0}}
@keyframes clPop1{0%,20%{opacity:0;transform:scale(0)}25%,58%{opacity:1;transform:scale(1)}68%,100%{opacity:0}}
@keyframes clPop2{0%,30%{opacity:0;transform:scale(0)}35%,58%{opacity:1;transform:scale(1)}68%,100%{opacity:0}}
@keyframes clPop3{0%,40%{opacity:0;transform:scale(0)}45%,58%{opacity:1;transform:scale(1)}68%,100%{opacity:0}}
@keyframes clDrop{0%,18%{opacity:0;transform:translateY(-70px)}28%{opacity:1;transform:translateY(4px)}32%,58%{opacity:1;transform:translateY(0)}68%,100%{opacity:0;transform:translateY(0)}}
@keyframes clBlink{0%,42%,50%,100%{transform:scaleY(1)}46%{transform:scaleY(.08)}}
@keyframes clBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes clShake{0%,100%{transform:rotate(0)}25%{transform:rotate(-4deg)}75%{transform:rotate(4deg)}}
@keyframes clChew{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.35)}}
@keyframes clWing{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.5)}}
@keyframes clRise{0%{opacity:0;transform:translateY(0) scale(.6)}20%{opacity:1}100%{opacity:0;transform:translateY(-46px) scale(1.1)}}
@keyframes clPuff{0%{opacity:0;transform:translateX(0) scale(.5)}25%{opacity:.9}100%{opacity:0;transform:translateX(-60px) scale(1.4)}}
@keyframes clFog{0%,16%{opacity:0;transform:scale(.3)}40%,94%{opacity:.92;transform:scale(1)}100%{opacity:0}}
@keyframes clTravel{0%,18%{offset-distance:0%;opacity:0}22%{opacity:1}50%,58%{offset-distance:100%;opacity:1}66%,100%{offset-distance:100%;opacity:0}}
@keyframes clFly{0%,14%{opacity:0;transform:translate(-120px,40px)}20%{opacity:1;transform:translate(-90px,-10px)}30%{transform:translate(-50px,26px)}40%{transform:translate(-14px,-12px)}46%,58%{opacity:1;transform:translate(0,0)}66%,100%{opacity:0;transform:translate(0,0) scale(.3)}}
@keyframes clToDot{0%,22%{opacity:0;transform:translate(var(--fx),var(--fy)) scale(.4)}30%{opacity:1}46%,58%{opacity:1;transform:translate(0,0) scale(1)}66%,100%{opacity:0;transform:translate(0,0) scale(.5)}}
@keyframes clDrum{0%,100%{transform:rotate(0)}50%{transform:rotate(-14deg)}}
.clue-join{display:block;width:100%;height:auto}
@media (prefers-reduced-motion:reduce){.clue-svg *{animation-duration:0s!important}}
`;

  /* ---------- المشاهد ---------- */
  const S = {};
  /* أ — أرنب واقف مستقيم كالألف، أذنه المثنيّة هي الهمزة */
  S['أ'] = p => ({ bg: 'green', w: 'أَرْنَب', body: letterSVG('أ') + g('cl-obj',
    `<ellipse cx="150" cy="182" rx="40" ry="6" fill="#000" opacity=".08"/>` +
    `<ellipse cx="138" cy="176" rx="14" ry="8" fill="url(#${p}w)"/><ellipse cx="162" cy="176" rx="14" ry="8" fill="url(#${p}w)"/>` +
    `<rect x="126" y="86" width="48" height="92" rx="24" fill="url(#${p}w)"/><ellipse cx="150" cy="140" rx="15" ry="26" fill="#fff"/>` +
    `<path d="M150 66 C140 40 136 20 146 14 C156 12 160 40 154 64 Z" fill="url(#${p}w)"/><path d="M149 58 C144 40 143 26 147 22 C151 22 152 40 151 58 Z" fill="#ffc2d1"/>` +
    `<path d="M156 66 C164 50 182 40 186 50 C190 60 174 68 160 72 Z" fill="url(#${p}w)"/><path d="M162 64 C170 54 180 50 182 54 C182 60 172 64 164 68 Z" fill="#ffc2d1"/>` +
    `<circle cx="150" cy="82" r="24" fill="url(#${p}w)"/>` +
    `<ellipse cx="141" cy="80" rx="3" ry="4" fill="${INK}"/><ellipse cx="159" cy="80" rx="3" ry="4" fill="${INK}"/><ellipse cx="150" cy="90" rx="4" ry="3" fill="#ff8fa3"/>` +
    `<ellipse cx="136" cy="92" rx="5" ry="3" fill="#ff8a7a" opacity=".45"/><ellipse cx="164" cy="92" rx="5" ry="3" fill="#ff8a7a" opacity=".45"/>`) + ghost('M150 70 L150 176') });

  /* ب — بطّة ظهرها الباء، وتحتها بيضة */
  S['ب'] = p => ({ bg: 'blue', w: 'بَطَّة', body: letterSVG('ب') + g('cl-obj',
    `<path d="M40 176 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#7cc4ff" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    `<path d="M224 98 C230 126 222 140 200 140 L96 140 C80 140 72 130 74 110 C100 124 196 120 224 98 Z" fill="url(#${p}y)"/>` +
    `<path d="M120 122 C140 110 176 112 186 128 C164 134 136 134 120 122 Z" fill="#f4b400" opacity=".7"/>` +
    `<circle cx="226" cy="84" r="20" fill="url(#${p}y)"/><path d="M242 82 L264 88 L242 94 Z" fill="#f78c3b"/><ellipse cx="232" cy="78" rx="3.5" ry="4.5" fill="${INK}"/><circle cx="233" cy="76.5" r="1.3" fill="#fff"/>` +
    `<ellipse cx="150" cy="166" rx="12" ry="15" fill="url(#${p}w)"/>`) + ghost(LET['ب'].I) });

  /* ت — صحن وفوقه تفاحتان */
  const apple = (p, x, y) => `<path d="M${x} ${y - 9} C${x - 9} ${y - 16} ${x - 18} ${y - 8} ${x - 16} ${y + 2} C${x - 14} ${y + 13} ${x - 5} ${y + 16} ${x} ${y + 12} C${x + 5} ${y + 16} ${x + 14} ${y + 13} ${x + 16} ${y + 2} C${x + 18} ${y - 8} ${x + 9} ${y - 16} ${x} ${y - 9} Z" fill="url(#${p}r)"/><path d="M${x} ${y - 9} q1 -7 5 -10" stroke="#7a4a2a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M${x + 3} ${y - 15} c5 -6 13 -4 14 -1 c-5 5 -11 4 -14 1 Z" fill="#57c271"/><ellipse cx="${x - 7}" cy="${y - 2}" rx="3" ry="5" fill="#fff" opacity=".5"/>`;
  const plate = p => `<path d="M224 98 C230 126 222 140 200 140 L96 140 C80 140 72 130 74 110 C110 126 190 124 224 98 Z" fill="url(#${p}b)"/><path d="M94 128 C130 136 190 134 212 120" stroke="#fff" stroke-width="3" fill="none" opacity=".7" stroke-linecap="round"/>`;
  S['ت'] = p => ({ bg: 'pink', w: 'تُفَّاحَة', body: letterSVG('ت') + g('cl-obj', plate(p)) + g('cl-drop', apple(p, 138, 106)) + g('cl-drop', apple(p, 162, 106), 'style="animation-delay:.15s"') + ghost(LET['ت'].I) });
  /* ث — الصحن وثلاث كرات تُعَدّ */
  const ball = (p, x, y, c) => `<circle cx="${x}" cy="${y}" r="11" fill="url(#${p}${c})"/><ellipse cx="${x - 4}" cy="${y - 4}" rx="3" ry="2" fill="#fff" opacity=".6"/>`;
  const num = (x, y, t) => `<text x="${x}" y="${y}" font-size="16" font-family="'Noto Naskh Arabic',serif" font-weight="700" text-anchor="middle" fill="${INK}">${t}</text>`;
  S['ث'] = p => ({ bg: 'warm', w: 'ثَلَاثَة', body: letterSVG('ث') + g('cl-obj', plate(p)) +
    g('cl-pop1', ball(p, 136, 114, 'r') + num(118, 92, '١')) + g('cl-pop2', ball(p, 164, 114, 'y') + num(182, 92, '٢')) + g('cl-pop3', ball(p, 150, 92, 'g') + num(150, 70, '٣')) + ghost(LET['ث'].I) });
  /* ن — هلال وفوقه نجمة */
  const star = (cx, cy, r, f) => { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; d += (i ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a)).toFixed(1) + ' '; } return `<path d="${d}Z" fill="${f}" stroke="${f}" stroke-width="2" stroke-linejoin="round"/>`; };
  S['ن'] = p => ({ bg: 'night', night: 1, w: 'نَجْمَة', body: letterSVG('ن', { color: '#ffd166' }) + g('cl-obj',
    `<path d="M204 88 C212 132 192 162 150 162 C108 162 88 132 96 96 C112 134 192 138 204 88 Z" fill="url(#${p}y)"/>`) +
    g('cl-drop', star(150, 82, 17, '#fff3b0')) + star(60, 40, 5, '#fff') + star(250, 54, 4, '#fff') + star(232, 170, 3, '#fff') + ghost(LET['ن'].I) });
  /* ي — «يَمْ يَمْ» وحبّتان تسقطان تحت */
  S['ي'] = p => ({ bg: 'warm', w: 'يَمْ يَمْ', body: letterSVG('ي') + g('cl-stay', kidFace(p, 58, 84, 32, { mouth: 'chew' }) +
    `<ellipse cx="58" cy="146" rx="34" ry="8" fill="url(#${p}w)"/><path d="M34 140 q24 -22 48 0 Z" fill="url(#${p}o)"/>`) +
    bubble(176, 14, 92, 'يَمْ يَمْ', '#e2731f') +
    `<g class="cl-tobubble" style="--fx:-70px;--fy:-50px"><circle cx="138" cy="176" r="8" fill="url(#${p}o)"/></g><g class="cl-tobubble" style="--fx:-94px;--fy:-50px;animation-delay:.2s"><circle cx="162" cy="176" r="8" fill="url(#${p}o)"/></g>` });
  /* ج — جمل، والقِربة هي النقطة */
  S['ج'] = p => ({ bg: 'warm', w: 'جَمَل', body: letterSVG('ج') + g('cl-obj',
    `<ellipse cx="156" cy="206" rx="56" ry="5" fill="#000" opacity=".08"/>` +
    [122, 138, 176, 192].map(x => `<rect x="${x - 5}" y="166" width="10" height="38" rx="5" fill="#c58b4f"/>`).join('') +
    `<ellipse cx="158" cy="160" rx="50" ry="24" fill="url(#${p}o)"/><path d="M128 144 C130 110 172 108 176 142 Z" fill="url(#${p}o)"/>` +
    `<path d="M200 152 C214 140 214 110 210 92" stroke="#e8954a" stroke-width="18" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="220" cy="86" rx="20" ry="13" fill="url(#${p}o)"/><ellipse cx="208" cy="74" rx="4" ry="7" fill="#c26a24"/><circle cx="222" cy="82" r="3" fill="${INK}"/><path d="M236 92 q4 2 6 -1" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/>` +
    `<path d="M108 160 q-10 4 -12 14" stroke="#c26a24" stroke-width="4" fill="none" stroke-linecap="round"/>` +
    `<circle cx="156" cy="140" r="12" fill="url(#${p}br)"/><path d="M150 130 q6 -6 12 0" stroke="#5a3520" stroke-width="2.5" fill="none"/>`) + ghost(LET['ج'].I) });
  /* ح — بخار النفَس على زجاج النافذة يتّخذ شكل الحاء */
  S['ح'] = p => ({ bg: 'blue', w: 'حَحَح', body:
    `<rect x="18" y="10" width="216" height="196" rx="16" fill="#cfe8fb"/><rect x="18" y="10" width="216" height="196" rx="16" fill="none" stroke="#fff" stroke-width="8"/><path d="M126 10 V206 M18 108 H234" stroke="#fff" stroke-width="6"/>` +
    `<path d="M30 30 l30 -14 M40 46 l40 -20" stroke="#fff" stroke-width="5" opacity=".6" stroke-linecap="round"/>` +
    g('cl-fog', `<ellipse cx="152" cy="132" rx="78" ry="64" fill="#fff" opacity=".9"/><ellipse cx="120" cy="104" rx="40" ry="30" fill="#fff"/><ellipse cx="186" cy="150" rx="38" ry="30" fill="#fff"/>`) +
    stroke(LET['ح'].I, RED, 13, 'cl-write-late', 'pathLength="100"') +
    g('cl-stay', kidFace(p, 262, 176, 30, { mouth: 'o', hat: '#e2731f' }) + `<rect x="236" y="198" width="52" height="14" rx="7" fill="#57c271"/>`) +
    g('cl-puff', `<circle cx="236" cy="186" r="9" fill="#fff" opacity=".9"/>`) + g('cl-puff2', `<circle cx="236" cy="182" r="7" fill="#fff" opacity=".9"/>`) +
    bubble(176, 18, 88, 'حَحَح', '#1c7ed6') });
  /* خ — النائم يشخر، وفقاعة النوم هي النقطة */
  S['خ'] = p => ({ bg: 'blue', w: 'خَخَخ', body: letterSVG('خ', { noDots: true }) +
    g('cl-stay', `<ellipse cx="52" cy="186" rx="46" ry="16" fill="url(#${p}w)"/>` + kidFace(p, 56, 160, 28, { eyes: 'closed', mouth: 'o' }) + `<path d="M8 206 C20 186 92 182 110 206 Z" fill="url(#${p}b)"/>`) +
    bubble(10, 16, 88, 'خخخخ', '#1c7ed6') +
    `<g class="cl-tobubble" style="--fx:-104px;--fy:96px"><circle cx="170" cy="62" r="13" fill="#e7f5ff" stroke="#74c0fc" stroke-width="3"/><ellipse cx="165" cy="57" rx="4" ry="3" fill="#fff"/></g>` +
    dot(170, 62, RED, 'cl-dot-late') });
  /* د — دبدوب جالس: ظهره المائل ورجلاه الممدودتان */
  const bear = p => `<ellipse cx="140" cy="152" rx="46" ry="6" fill="#000" opacity=".08"/>` +
    `<path d="M128 70 C150 92 170 114 166 134" stroke="url(#${p}br)" stroke-width="40" fill="none" stroke-linecap="round"/>` +
    `<path d="M164 138 C150 142 130 142 110 140" stroke="#a0623a" stroke-width="24" fill="none" stroke-linecap="round"/><circle cx="108" cy="140" r="13" fill="#c98f5f"/><circle cx="108" cy="140" r="7" fill="#f3d2b0"/>` +
    `<ellipse cx="156" cy="112" rx="13" ry="18" fill="#f3d2b0" opacity=".85"/>` +
    `<circle cx="108" cy="42" r="10" fill="url(#${p}br)"/><circle cx="142" cy="40" r="10" fill="url(#${p}br)"/><circle cx="108" cy="42" r="5" fill="#f3d2b0"/><circle cx="142" cy="40" r="5" fill="#f3d2b0"/>` +
    `<circle cx="125" cy="60" r="24" fill="url(#${p}br)"/><ellipse cx="125" cy="70" rx="12" ry="9" fill="#f3d2b0"/><ellipse cx="125" cy="66" rx="4" ry="3" fill="${INK}"/>` +
    `<ellipse cx="116" cy="56" rx="3" ry="4" fill="${INK}"/><ellipse cx="134" cy="56" rx="3" ry="4" fill="${INK}"/><path d="M120 74 q5 4 10 0" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  S['د'] = p => ({ bg: 'warm', w: 'دُبّ', body: letterSVG('د') + g('cl-obj', bear(p)) + ghost(LET['د'].I) });
  /* ذ — الدبّ نفسه وعلى رأسه ذبابة هي النقطة */
  const fly = `<ellipse class="cl-wing" cx="124" cy="36" rx="9" ry="6" fill="#e7f5ff" opacity=".95"/><ellipse class="cl-wing" cx="140" cy="36" rx="9" ry="6" fill="#e7f5ff" opacity=".95"/><ellipse cx="132" cy="48" rx="10" ry="7" fill="#495057"/><circle cx="140" cy="46" r="4" fill="#c92a2a"/>`;
  S['ذ'] = p => ({ bg: 'warm', w: 'ذُبَابَة', body: letterSVG('ذ') + g('cl-obj', bear(p)) + g('cl-fly', fly) + ghost(LET['ذ'].I) });
  /* ر — سيارة لعبة تنزل منحدر الراء «رررر» */
  const ramp = p => `<path d="M170 100 C176 130 160 160 112 168 L104 206 L276 206 L276 132 C262 104 210 92 170 100 Z" fill="url(#${p}g)"/><path d="M170 100 C176 130 160 160 112 168" stroke="#2f9e44" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  const car = `<g class="cl-travel" style="offset-path:path('M170 92 C176 122 160 152 112 160')"><g transform="translate(-20,-22)"><path d="M0 16 C0 8 6 6 12 6 L16 0 H30 L36 6 C42 6 42 10 42 16 Z" fill="#ef476f"/><rect x="16" y="2" width="12" height="6" rx="2" fill="#cfe8ff"/><circle cx="10" cy="18" r="5" fill="${INK}"/><circle cx="32" cy="18" r="5" fill="${INK}"/></g></g>`;
  S['ر'] = p => ({ bg: 'blue', w: 'رَرْرَر', body: g('cl-stay', ramp(p)) + letterSVG('ر') + car + bubble(18, 18, 92, 'رررر', '#ef476f') });
  /* ز — نحلة «ززز» تجلس فوق المنحدر فتصير نقطته */
  const bee = p => `<ellipse class="cl-wing" cx="156" cy="56" rx="11" ry="8" fill="#e7f5ff" opacity=".95"/><ellipse class="cl-wing" cx="174" cy="54" rx="11" ry="8" fill="#e7f5ff" opacity=".95"/><ellipse cx="166" cy="72" rx="20" ry="14" fill="url(#${p}y)"/><path d="M158 60 v24 M170 59 v26" stroke="#4a3426" stroke-width="5" stroke-linecap="round"/><circle cx="181" cy="69" r="3" fill="${INK}"/>`;
  S['ز'] = p => ({ bg: 'blue', w: 'زَيْتُون', body: g('cl-stay', ramp(p)) + letterSVG('ز', { noDots: true }) + g('cl-fly', bee(p)) + dot(166, 72, RED, 'cl-dot-late') + bubble(18, 18, 96, 'ززززز', '#e2731f') });
  /* س — ابتسامة بثلاث أسنان هي أسنان السين */
  /* ثلاث أسنان لطيفة مبتسمة واقفة على اللثة — هي أسنان السين */
  const tooth = (p, x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-15 -14 C-15 -26 -4 -26 0 -21 C4 -26 15 -26 15 -14 C15 0 12 14 8 20 C5 24 2 20 0 12 C-2 20 -5 24 -8 20 C-12 14 -15 0 -15 -14 Z" fill="url(#${p}w)"/><ellipse cx="-5" cy="-8" rx="2.2" ry="3" fill="${INK}"/><ellipse cx="5" cy="-8" rx="2.2" ry="3" fill="${INK}"/><path d="M-4 -1 q4 4 8 0" stroke="${INK}" stroke-width="1.8" fill="none" stroke-linecap="round"/><ellipse cx="-9" cy="-3" rx="3" ry="1.8" fill="#ff8a7a" opacity=".5"/><ellipse cx="9" cy="-3" rx="3" ry="1.8" fill="#ff8a7a" opacity=".5"/></g>`;
  S['س'] = p => ({ bg: 'blue', w: 'سِنّ', body: letterSVG('س') + g('cl-obj',
    `<path d="M${LET['س'].I.slice(1)}" stroke="#ff9fb4" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="translate(0 14)"/>` +
    tooth(p, 232, 92, 1.45) + tooth(p, 200, 96, 1.4) + tooth(p, 168, 98, 1.35)) + ghost(LET['س'].I) });
  /* ش — شجيرة رأسها ثلاث قِبَب، وثمراتها الثلاث هي النقاط */
  S['ش'] = p => ({ bg: 'green', w: 'شَجَرَة', body: letterSVG('ش', { noDots: true }) + g('cl-obj',
    `<path d="M170 104 C172 150 160 168 124 168 C96 168 84 156 84 128 C110 140 150 132 170 104 Z" fill="url(#${p}br)"/>` +
    `<circle cx="224" cy="104" r="22" fill="url(#${p}g)"/><circle cx="192" cy="106" r="22" fill="url(#${p}g)"/><circle cx="164" cy="110" r="18" fill="url(#${p}g)"/><circle cx="208" cy="92" r="20" fill="url(#${p}g)"/>`) +
    [[220, 70], [190, 70], [205, 52]].map(([x, y], i) => `<g class="cl-drop" style="animation-delay:${i * .12}s"><circle cx="${x}" cy="${y}" r="9" fill="url(#${p}r)"/><path d="M${x} ${y - 9} q2 -5 5 -6" stroke="#2f9e44" stroke-width="2.5" fill="none"/></g>`).join('') +
    LET['ش'].dI.map(([x, y]) => dot(x, y, RED, 'cl-dot-late')).join('') + ghost(LET['ش'].I) });
  /* ص — صفّارة: حلقتها رأس الصاد، وحبلها ذيلها */
  S['ص'] = p => ({ bg: 'blue', w: 'صَفَّارَة', body: letterSVG('ص') + g('cl-obj',
    `<path d="M168 138 C176 104 246 96 246 118 C246 136 210 140 168 138 Z" fill="url(#${p}gr)"/><rect x="236" y="106" width="44" height="20" rx="6" fill="url(#${p}gr)"/><rect x="196" y="108" width="20" height="8" rx="3" fill="#495057"/>` +
    `<path d="M168 138 C172 150 160 172 124 172 C96 172 84 158 84 130" stroke="#ef476f" stroke-width="6" fill="none" stroke-linecap="round"/>` +
    `<path d="M206 98 l-4 -16 M218 96 l2 -18 M230 98 l8 -14" stroke="#1c7ed6" stroke-width="3.5" stroke-linecap="round" class="cl-shake"/>`) + bubble(18, 18, 100, 'صِيييي', '#1c7ed6') + ghost(LET['ص'].I) });
  /* ض — ضفدع: جسمه حلقة الضاد، رجله ذيلها، عينه النقطة */
  S['ض'] = p => ({ bg: 'green', w: 'ضِفْدَع', body: letterSVG('ض', { noDots: true }) + g('cl-obj',
    `<path d="M168 138 C172 150 160 172 124 172 C96 172 84 158 84 130" stroke="#3fae55" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M84 132 l-10 -10 M84 132 l-12 2 M84 132 l-4 -14" stroke="#3fae55" stroke-width="6" stroke-linecap="round"/>` +
    `<circle cx="232" cy="92" r="11" fill="url(#${p}g)"/><circle cx="232" cy="91" r="6" fill="#fff"/><circle cx="233" cy="91" r="3" fill="${INK}"/>` +
    `<path d="M166 138 C164 104 214 92 240 104 C252 112 252 132 238 138 C214 146 184 146 166 138 Z" fill="url(#${p}g)"/>` +
    `<ellipse cx="204" cy="132" rx="26" ry="9" fill="#c9f2c0"/><path d="M212 116 Q232 128 248 116" stroke="#1f6f30" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="240" cy="124" rx="5" ry="3" fill="#ff8a7a" opacity=".55"/><path d="M196 140 q-4 8 -12 8 h18 q-2 -6 -6 -8 Z" fill="#3fae55"/>` +
    `<circle cx="208" cy="86" r="14" fill="url(#${p}g)"/><circle cx="208" cy="85" r="8.5" fill="#fff"/><circle class="cl-blink" cx="209" cy="85" r="4.5" fill="${INK}"/>`) + dot(208, 80, RED, 'cl-dot-late') + ghost(LET['ض'].I) });
  /* ط — طبل وعصاه قائمة «طُمْ طُمْ» */
  const drum = p => `<path d="M112 140 C120 104 200 96 204 122 C206 140 170 140 112 140 Z" fill="url(#${p}r)"/><path d="M122 132 l12 -18 l12 18 l12 -18 l12 18 l12 -18 l12 16" stroke="#fff3d6" stroke-width="3" fill="none" stroke-linejoin="round"/>` +
    `<g class="cl-drum"><rect x="128" y="42" width="12" height="92" rx="6" fill="url(#${p}br)"/><circle cx="134" cy="44" r="10" fill="#f3d2b0"/></g>`;
  S['ط'] = p => ({ bg: 'warm', w: 'طَبْل', body: letterSVG('ط') + g('cl-obj', drum(p)) + bubble(176, 18, 96, 'طُمْ طُمْ', '#d7263d') + ghost(LET['ط'].I) });
  S['ظ'] = p => ({ bg: 'warm', w: 'ظَرْف', body: letterSVG('ظ', { noDots: true }) + g('cl-obj', drum(p)) +
    g('cl-drop', `<rect x="152" y="58" width="36" height="26" rx="4" fill="url(#${p}w)"/><path d="M152 60 L170 74 L188 60" stroke="#adb5bd" stroke-width="2.5" fill="none"/><circle cx="170" cy="74" r="5" fill="#d7263d"/>`) + dot(170, 72, RED, 'cl-dot-late') + ghost(LET['ظ'].I) });
  /* ع — رأس العين يصير عينًا ترمش */
  S['ع'] = p => ({ bg: 'blue', w: 'عَيْن', body: letterSVG('ع') + g('cl-obj',
    `<path d="M120 98 C140 70 180 70 198 98 C180 126 140 126 120 98 Z" fill="#fff"/><g class="cl-blink"><circle cx="160" cy="98" r="15" fill="url(#${p}br)"/><circle cx="160" cy="98" r="7" fill="${INK}"/><circle cx="164" cy="94" r="3" fill="#fff"/></g>` +
    `<path d="M126 84 l-8 -8 M142 76 l-4 -11 M160 73 v-12 M178 76 l4 -11 M193 84 l8 -8" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`) + ghost(LET['ع'].I) });
  /* غ — غرغرة بعد غسل الأسنان «غغغ»، وفقاعة هي النقطة */
  S['غ'] = p => ({ bg: 'blue', w: 'غَرْغَرَة', body: letterSVG('غ', { noDots: true }) +
    g('cl-stay', kidFace(p, 62, 150, 34, { eyes: 'up', mouth: 'o' })) +
    g('cl-rise', `<circle cx="58" cy="112" r="7" fill="#e7f5ff" stroke="#74c0fc" stroke-width="2.5"/>`) + g('cl-rise2', `<circle cx="70" cy="110" r="5" fill="#e7f5ff" stroke="#74c0fc" stroke-width="2.5"/>`) +
    `<g class="cl-tobubble" style="--fx:-98px;--fy:60px"><circle cx="160" cy="54" r="12" fill="#e7f5ff" stroke="#74c0fc" stroke-width="3"/><ellipse cx="156" cy="50" rx="3.5" ry="2.5" fill="#fff"/></g>` +
    dot(160, 54, RED, 'cl-dot-late') + bubble(176, 150, 96, 'غغغغ', '#1c7ed6') });
  /* ف — فيل: رأسه رأس الفاء، خرطومه ذيلها، وعلى رأسه كرة هي النقطة */
  S['ف'] = p => ({ bg: 'blue', w: 'فِيل', body: letterSVG('ف', { noDots: true }) + g('cl-obj',
    `<ellipse cx="232" cy="110" rx="22" ry="28" fill="#c4cad2"/><ellipse cx="234" cy="110" rx="13" ry="18" fill="#ffc2d1" opacity=".7"/>` +
    `<path d="M214 126 C208 140 190 140 160 140 L96 140 C80 140 74 130 76 114" stroke="url(#${p}gr)" stroke-width="20" fill="none" stroke-linecap="round"/>` +
    `<circle cx="202" cy="106" r="26" fill="url(#${p}gr)"/><circle cx="194" cy="100" r="4" fill="${INK}"/><circle cx="195.5" cy="98.5" r="1.3" fill="#fff"/>` +
    `<path d="M186 120 q-6 6 -14 4" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>`) +
    `<g class="cl-drop"><g class="cl-bounce"><circle cx="198" cy="66" r="11" fill="url(#${p}r)"/><path d="M188 66 h20" stroke="#fff" stroke-width="2.5"/></g></g>` + dot(198, 66, RED, 'cl-dot-late') + ghost(LET['ف'].I) });
  /* ق — قطّة: رأسها حلقة القاف، أذناها النقطتان، ذيلها الحوض */
  S['ق'] = p => ({ bg: 'pink', w: 'قِطَّة', body: letterSVG('ق', { noDots: true }) + g('cl-obj',
    `<path d="M204 120 C198 160 170 176 136 176 C108 176 92 162 94 138" stroke="url(#${p}o)" stroke-width="16" fill="none" stroke-linecap="round"/>` +
    `<path d="M120 172 l4 -10 M146 176 l2 -12 M174 168 l-2 -12" stroke="#c2611a" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M172 96 L178 58 L192 84 Z" fill="url(#${p}o)"/><path d="M196 84 L200 58 L212 96 Z" fill="url(#${p}o)"/><path d="M176 86 L179 68 L186 82 Z" fill="#ffc2d1"/><path d="M200 82 L201 68 L207 88 Z" fill="#ffc2d1"/>` +
    `<circle cx="192" cy="104" r="24" fill="url(#${p}o)"/><ellipse cx="184" cy="100" rx="3" ry="4" fill="${INK}"/><ellipse cx="200" cy="100" rx="3" ry="4" fill="${INK}"/><path d="M189 109 h6 l-3 3 Z" fill="#d6336c"/>` +
    `<path d="M178 112 l-16 -2 M178 116 l-16 4 M206 112 l16 -2 M206 116 l16 4" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`) +
    LET['ق'].dI.map(([x, y]) => dot(x, y, RED, 'cl-dot-late')).join('') + ghost(LET['ق'].I) });
  /* ك — كرسي من الجانب: الظهر عمود الكاف، المقعد قاعدتها، والوسادة الشرطة الصغيرة */
  S['ك'] = p => ({ bg: 'warm', w: 'كُرْسِيّ', body: letterSVG('ك') + g('cl-obj',
    `<ellipse cx="146" cy="196" rx="54" ry="5" fill="#000" opacity=".08"/>` +
    `<rect x="104" y="140" width="10" height="54" rx="4" fill="#7a4a2a"/><rect x="170" y="140" width="10" height="54" rx="4" fill="#7a4a2a"/>` +
    `<path d="M182 50 L182 132" stroke="#8a5a33" stroke-width="18" stroke-linecap="round"/><circle cx="182" cy="48" r="11" fill="#a0623a"/><path d="M182 136 L108 140 C96 140 90 132 92 118" stroke="url(#${p}br)" stroke-width="16" fill="none" stroke-linecap="round"/>` +
    `<path d="M114 126 C114 110 168 110 168 126 C168 132 114 132 114 126 Z" fill="url(#${p}pk)"/>`) + ghost(LET['ك'].I) });
  /* ل — «لا لا لا» ونوتة موسيقية بشكل اللام */
  S['ل'] = p => ({ bg: 'pink', w: 'لا لا لا', body: g('cl-stay', kidFace(p, 54, 92, 32, { mouth: 'open' })) + letterSVG('ل') +
    g('cl-obj', `<path d="M172 40 L172 132 C172 172 110 178 102 140" stroke="#9b5de5" stroke-width="13" fill="none" stroke-linecap="round"/><ellipse cx="128" cy="162" rx="22" ry="15" transform="rotate(-18 128 162)" fill="#9b5de5"/><path d="M172 42 C188 50 200 60 194 82" stroke="#9b5de5" stroke-width="9" fill="none" stroke-linecap="round"/>`) +
    g('cl-rise', `<text x="92" y="70" font-size="26" fill="#9b5de5">♪</text>`) + g('cl-rise2', `<text x="74" y="56" font-size="22" fill="#f78c3b">♫</text>`) +
    bubble(180, 150, 92, 'لا لا لا', '#9b5de5') });
  /* م — مصّاصة: رأسها الدائرة وعصاها ذيل الميم */
  S['م'] = p => ({ bg: 'pink', w: 'مَصَّاصَة', body: letterSVG('م') + g('cl-obj',
    `<path d="M180 130 C172 140 150 140 136 140 C130 160 130 180 132 196" stroke="url(#${p}w)" stroke-width="10" fill="none" stroke-linecap="round"/>` +
    `<circle cx="168" cy="110" r="26" fill="url(#${p}pk)"/><path d="M168 110 m-14 0 a14 14 0 1 1 14 14 a8 8 0 1 1 -7 -8" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>`) +
    bubble(18, 18, 84, 'مممم', '#d6336c') + ghost(LET['م'].I) });
  /* هـ — طفل يلهث بعد الركض «هه هه» */
  S['ه'] = p => ({ bg: 'warm', w: 'هَهْ هَهْ', body: letterSVG('ه') + g('cl-stay', kidFace(p, 62, 132, 36, { mouth: 'open', hot: true }) +
    `<path class="cl-bounce" d="M30 92 c-5 9 -5 15 0 17 c5 -2 5 -8 0 -17 Z" fill="#74c0fc"/><path class="cl-bounce" d="M98 96 c-4 8 -4 13 0 15 c4 -2 4 -7 0 -15 Z" fill="#74c0fc"/>`) +
    bubble(176, 18, 92, 'هَهْ هَهْ', '#e2731f') });
  /* و — رأس الواو يتفتّح وردةً وذيلها ساق */
  S['و'] = p => ({ bg: 'pink', w: 'وَرْدَة', body: letterSVG('و') + g('cl-obj',
    `<path d="M178 126 C172 150 150 166 116 170" stroke="#2f9e44" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M150 158 C148 142 168 136 178 142 C172 156 160 162 150 158 Z" fill="url(#${p}g)"/>` +
    `<path d="M136 104 C130 84 146 72 160 78 C164 68 182 68 186 80 C200 76 206 92 196 104 Z" fill="#b3172d"/><path d="M148 96 C150 84 178 82 180 96 C172 90 156 90 148 96 Z" fill="#8e1023"/>` +
    `<path d="M132 98 C130 126 148 140 164 140 C180 140 198 126 196 98 C184 112 144 112 132 98 Z" fill="url(#${p}r)"/><ellipse cx="146" cy="116" rx="4" ry="8" fill="#fff" opacity=".35" transform="rotate(-25 146 116)"/>`) + ghost(LET['و'].I) });

  /* ---------- بطاقة القرينة كاملة ---------- */
  let seq = 0;
  /* opts.noLetter: المشهد وحده بلا الحرف ولا الكلمة (لألعاب «من صاحب القرينة؟» كي لا يُكشف الجواب) */
  function card(L, opts) {
    opts = opts || {};
    const p = 'q' + (++seq) + '_', sc = S[L](p);
    const bgId = BG[sc.bg] || 'bg';
    let body = sc.body;
    if (opts.noLetter) body = body.replace(/<path class="cl-(write|write-late|dot|dot-late|ghost)"[^>]*\/>/g, '').replace(/class="cl-obj"/g, 'class="cl-stay"');
    return `<svg class="clue-svg" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">${defs(p)}<rect width="300" height="220" rx="22" fill="url(#${p}${bgId})"/>${body}${opts.noLetter ? '' : word(sc.w, sc.night)}</svg>`;
  }

  /* ---------- بطاقة الوصل: الخطّ نفسه يتحوّل في لقطة واحدة ---------- */
  const endOf = d => { const n = d.trim().split(/[\s,]+/).filter(x => /^-?[\d.]+$/.test(x)); return [+n[n.length - 2], +n[n.length - 1]]; };
  function joinCard(L) {
    const v = LET[L];
    const KT = '0;.22;.52;.86;1', SPL = '.4 0 .2 1;.4 0 .2 1;.4 0 .2 1;.4 0 .2 1';
    let s = `<svg class="clue-join" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="220" rx="22" fill="#f4faff"/>`;
    if (!v.join) {
      s += letterSVG(L, { cls: '', color: '#1c4e80' }) + stroke('M34 62 L34 140', '#adb5bd', 13) +
        `<path d="M58 140 H${L === 'أ' ? 130 : 96}" stroke="#adb5bd" stroke-width="4" stroke-dasharray="4 8" stroke-linecap="round"/>` +
        `<text x="150" y="208" font-size="20" font-family="'Noto Naskh Arabic',serif" font-weight="700" text-anchor="middle" fill="${INK}">لا يمدّ يده لِمَن بعده</text></svg>`;
      return s;
    }
    const [ix, iy] = endOf(v.I), [jx, jy] = endOf(v.J);
    s += `<path d="${v.I}" fill="none" stroke="#1c4e80" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"><animate attributeName="d" dur="6s" repeatCount="indefinite" calcMode="spline" keyTimes="${KT}" keySplines="${SPL}" values="${v.I};${v.I};${v.J};${v.J};${v.I}"/></path>`;
    (v.extra || []).forEach(d => { s += `<path d="${d}" fill="none" stroke="#1c4e80" stroke-width="${L === 'ك' ? 10 : 13}" stroke-linecap="round" stroke-linejoin="round"${L === 'ك' ? ` ><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;.3;.45;.86;1" values="1;1;0;0;1"/></path>` : '/>'}`; });
    (v.extraJ || []).forEach(d => { s += `<path d="${d}" fill="none" stroke="#1c4e80" stroke-width="12" stroke-linecap="round" opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;.3;.45;.86;1" values="0;0;1;1;0"/></path>`; });
    v.dI.forEach(([x, y], k) => { const [x2, y2] = v.dJ[k] || [x, y]; s += `<g>${dot(x, y, '#1c4e80')}<animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" calcMode="spline" keyTimes="${KT}" keySplines="${SPL}" values="0 0;0 0;${x2 - x} ${y2 - y};${x2 - x} ${y2 - y};0 0"/></g>`; });
    /* اليد: قفّاز مستدير صغير يركب طرف الخط ثم يمسك بالألف */
    s += `<circle r="9" fill="#f08a24" cx="${ix}" cy="${iy}"><animate attributeName="cx" dur="6s" repeatCount="indefinite" calcMode="spline" keyTimes="${KT}" keySplines="${SPL}" values="${ix};${ix};${jx};${jx};${ix}"/><animate attributeName="cy" dur="6s" repeatCount="indefinite" calcMode="spline" keyTimes="${KT}" keySplines="${SPL}" values="${iy};${iy};${jy};${jy};${iy}"/><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;.2;.26;.5;.6;1" values="0;0;1;1;0;0"/></circle>`;
    s += `<path d="M34 62 L34 140" stroke="#1c4e80" stroke-width="13" stroke-linecap="round" opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;.45;.55;.86;.92;1" values="0;0;1;1;0;0"/></path>`;
    s += `<text x="150" y="208" font-size="20" font-family="'Noto Naskh Arabic',serif" font-weight="700" text-anchor="middle" fill="${INK}"><tspan>وحدَه… ثم يمدّ يده لِمَن بعده</tspan></text></svg>`;
    return s;
  }

  const INFO = {
    'أ': ['مدمجة', 'أرنبٌ واقفٌ مستقيم كعصا الألف، وأذنه المثنيّة فوق رأسه هي الهمزة', 'أَ… أَرْنَب'],
    'ب': ['مدمجة', 'بطّةٌ ظهرها منحنٍ كالباء، وتحتها بيضةٌ واحدة هي النقطة', 'بَ… بَطَّة'],
    'ت': ['مدمجة', 'صحنٌ منحنٍ كالتاء، وفوقه تفاحتان هما النقطتان', 'تُ… تُفَّاحَة'],
    'ث': ['مدمجة', 'الصحن نفسه وفوقه ثلاث كرات نعدّها: واحد، اثنان، ثلاثة', 'ثَ… ثَلَاثَة'],
    'ج': ['مدمجة', 'جملٌ رأسه أعلى الجيم وبطنه حوضها، والقِربة على جنبه هي النقطة', 'جَ… جَمَل'],
    'ح': ['صوتية', 'طفلٌ بردان ينفخ على زجاج النافذة «حَحَح» فيتكوّن البخار بشكل الحاء', 'حَحَح'],
    'خ': ['صوتية', 'طفلٌ نائم يشخر «خخخ»، وفقاعة النوم تطير فتصير النقطة', 'خَخَخ'],
    'د': ['مدمجة', 'دبدوبٌ جالس: ظهره المائل ورجلاه الممدودتان شكل الدال', 'دُ… دُبّ'],
    'ذ': ['مدمجة', 'الدبّ نفسه، وتحطّ على رأسه ذبابة هي النقطة', 'ذُ… ذُبَابَة'],
    'ر': ['صوتية', 'سيارة لعبة تنزل منحدرًا بشكل الراء «رررر»', 'رررر'],
    'ز': ['صوتية', 'نحلةٌ تطير «ززز» ثم تجلس فوق المنحدر نفسه فتصير نقطته', 'زززز'],
    'س': ['مدمجة', 'ثلاث أسنان صغيرة مبتسمة واقفة على اللثة، هي أسنان السين الثلاث', 'سِ… سِنّ'],
    'ش': ['مدمجة', 'شُجيرة رأسها ثلاث قِبَب كأسنان السين، وثمراتها الثلاث هي النقاط', 'شَ… شَجَرَة'],
    'ص': ['مدمجة', 'صفّارة الملعب: حلقتها رأس الصاد، وحبلها ذيلها «صِيييي»', 'صَ… صَفَّارَة'],
    'ض': ['مدمجة', 'ضفدعٌ: جسمه حلقة الضاد، ورجله ذيلها، وعينه البارزة النقطة', 'ضِ… ضِفْدَع'],
    'ط': ['مدمجة', 'طبلٌ وعصاه واقفة فوقه «طُمْ طُمْ»', 'طَ… طَبْل'],
    'ظ': ['مدمجة', 'الطبل نفسه، ويسقط فوقه ظرفُ رسالة هو النقطة', 'ظَ… ظَرْف'],
    'ع': ['مدمجة', 'رأس العين يصير عينًا ترمش', 'عَ… عَيْن'],
    'غ': ['صوتية', 'طفلٌ يغرغر بعد غسل أسنانه «غغغ»، وفقاعةٌ تطير فتصير النقطة', 'غغغ'],
    'ف': ['مدمجة', 'فيلٌ رأسه رأس الفاء وخرطومه ذيلها، وعلى رأسه كرة هي النقطة', 'فِ… فِيل'],
    'ق': ['مدمجة', 'قطّةٌ رأسها حلقة القاف، وأذناها النقطتان، وذيلها الحوض', 'قِ… قِطَّة'],
    'ك': ['مدمجة', 'كرسيٌّ من الجانب: الظهر عمود الكاف، والمقعد قاعدتها، والوسادة الشرطة الصغيرة', 'كُ… كُرْسِيّ'],
    'ل': ['صوتية', 'طفلٌ يغنّي «لا لا لا» ونوتةٌ موسيقية بشكل اللام', 'لا لا لا'],
    'م': ['مدمجة', 'مصّاصة: رأسها الدائرة وعصاها ذيل الميم «مممم»', 'مَ… مَصَّاصَة'],
    'ن': ['مدمجة', 'هلالٌ مقوّس كالنون، وتسقط فوقه نجمة هي النقطة', 'نَ… نَجْمَة'],
    'ه': ['صوتية', 'طفلٌ ركض كثيرًا فيلهث «هَهْ هَهْ»', 'هَهْ هَهْ'],
    'و': ['مدمجة', 'رأس الواو يتفتّح وردةً، وذيلها ساقٌ خضراء', 'وَ… وَرْدَة'],
    'ي': ['صوتية', 'طفلٌ يأكل «يَمْ يَمْ»، وتسقط حبّتان فتصيران النقطتين تحت الياء', 'يَمْ يَمْ'],
  };

  window.CLUES = {
    css: CSS, card, joinCard, letters: Object.keys(S), info: L => INFO[L], joins: L => !!(LET[L] && LET[L].join),
    inject() { if (document.getElementById('clues-css')) return; const st = document.createElement('style'); st.id = 'clues-css'; st.textContent = CSS; document.head.appendChild(st); },
  };
})();
