/* مُدُنُ ضاد — محرّك رسوم البكسل (شخصيات، أنسجة على طراز ماينكرافت، مبانٍ، مشاهد الكلمات) */
(function () {
  const PX = (window.PX = {});
  const O = '#2a1d24';
  PX.O = O;

  /* ---------------- الشخصيات (12×16) ---------------- */
  const KID_D = [
    "...oooooo...",
    "..ohhhhhho..",
    ".ohhhhhhhho.",
    ".ohhhhhhhho.",
    ".ohssssssho.",
    ".ossessesso.",
    ".osssmmssso.",
    "..osssssso..",
    "..oTttttTo..",
    ".oTttttttTo.",
    "osTttttttTso",
    "osTttttttTso",
    ".oppppppppo.",
    "..oppooppo..",
    "..offooffo..",
    "...oo..oo..."];
  const KID_D_B = KID_D.slice(0, 13).concat(["..oppooppo..", "..oppooffo..", "..offo.oo..."]);
  const KID_U = KID_D.slice(0, 4).concat([".ohhhhhhhho.", ".ohhhhhhhho.", ".ohhhhhhhho.", "..ohhhhhho.."], KID_D.slice(8));
  const KID_U_B = KID_U.slice(0, 13).concat(KID_D_B.slice(13));
  const KID_S = [
    "...ooooo....",
    "..ohhhhho...",
    ".ohhhhhhho..",
    ".ohhhhhhho..",
    ".ohhhsssso..",
    ".ohhssseso..",
    ".ohssssssso.",
    "..ossssmso..",
    "...oTttTo...",
    "..oTttttTo..",
    "..oTttttTo..",
    "..oTtttsso..",
    "..oppppppo..",
    "...oppppo...",
    "...offfffo..",
    "...oooooo..."];
  const KID_S_B = KID_S.slice(0, 12).concat(["..oppppppo..", "..oppo.oppo.", ".offo...offo", "..oo.....oo."]);
  const SIT = KID_S.slice(0, 12).concat(["..oppppppppo", "..oppppppppo", "........opo.", "........offo"]);
  /* ركوع (16×14) ووجهه إلى اليمين */
  const RUKU = [
    "................",
    "...........oooo.",
    "..ooooooooohhhho",
    ".oTtttttttthhhho",
    ".oTttttttttohsso",
    ".oTtttttttTosseo",
    ".oppTTTTTTsossmo",
    ".oppo....s..ooo.",
    ".oppo...s.......",
    ".oppo..s........",
    ".oppo...........",
    ".oppo...........",
    ".offfo..........",
    "..ooo..........."];
  /* سجود (17×9) */
  const SUJUD = [
    "...ooooo..........",
    "..oppppppo........",
    "..opppppTTo.......",
    "..oppppoTttTo.....",
    "..oppppo.oTttTooo.",
    "..oppppo..oTtohhho",
    "..oppppo...oohhhho",
    "offfpppo..sssohsso",
    "offfoooo..sss.osso",
    ".ooo......ooo.ooo."];

  const setC = (rows, r, c, ch) => { if (!rows[r]) return; const a = rows[r].split(''); if (c >= 0 && c < a.length) a[c] = ch; rows[r] = a.join(''); };
  function styleRows(base, dir, style) {
    const rows = base.slice();
    if (style === 'long') {
      for (let r = 4; r <= 9; r++) {
        if (dir === 's') { setC(rows, r, 0, 'o'); setC(rows, r, 1, 'h'); if (r >= 8) setC(rows, r, 2, 'h'); }
        else { setC(rows, r, 0, 'o'); setC(rows, r, 1, 'h'); setC(rows, r, 10, 'h'); setC(rows, r, 11, 'o'); }
      }
      if (dir !== 'u') { setC(rows, 1, dir === 's' ? 3 : 8, 'b'); setC(rows, 1, dir === 's' ? 4 : 9, 'b'); setC(rows, 0, dir === 's' ? 3 : 9, 'b'); }
    }
    if (style === 'hijab') {
      for (let r = 4; r <= 7; r++) {
        if (dir === 's') { setC(rows, r, 1, 'h'); setC(rows, r, 0, 'o'); }
        else { setC(rows, r, 1, 'h'); setC(rows, r, 10, 'h'); setC(rows, r, 0, 'o'); setC(rows, r, 11, 'o'); }
      }
      if (dir === 'd') { rows[7] = ".ohsssssshho"; rows[8] = ".ohhhhhhhhho"; }
      if (dir === 'u') { rows[7] = ".ohhhhhhhhho"; rows[8] = ".ohhhhhhhhho"; }
      if (dir === 's') { rows[7] = ".ohhssssmso."; rows[8] = ".ohhhhhhhho."; }
    }
    if (style === 'cap') {
      for (let r = 0; r <= 2; r++) rows[r] = rows[r].replace(/h/g, 'c');
      if (dir === 'd') rows[3] = "occcccccccco";
      if (dir === 's') rows[3] = ".occcccccccc";
      if (dir === 'u') rows[3] = ".occcccccco.";
    }
    return rows;
  }
  PX.charPal = function (def) {
    return Object.assign({ o: O, e: '#1b1420', w: '#ffffff', m: '#b4434f', s: '#f1c39b', h: '#3b2416', t: '#4f9ad8', T: '#3576b0', p: '#3b4466', f: '#2b2b33', b: '#ff5fa2', c: '#2e3b8f' }, (def && def.pal) || {});
  };
  PX.HEROES = {
    boy: { style: 'short', pal: { t: '#4f9ad8', T: '#3576b0' } },
    girl: { style: 'hijab', pal: { h: '#7b4bb7', t: '#f48fb1', T: '#d9608c', p: '#5b3f8c' } },
  };

  /* ---------------- الرسم ---------------- */
  PX.draw = function (g, rows, pal, x, y, flip) {
    for (let r = 0; r < rows.length; r++) {
      const row = rows[r];
      for (let c = 0; c < row.length; c++) {
        const ch = row[c]; if (ch === '.' || ch === ' ') continue;
        const col = pal[ch]; if (!col) continue;
        g.fillStyle = col;
        g.fillRect(flip ? x + (row.length - 1 - c) : x + c, y + r, 1, 1);
      }
    }
  };
  PX.kid = function (g, def, pose, x, y, flip) {
    let rows;
    const st = def.style;
    switch (pose) {
      case 'd': rows = styleRows(KID_D, 'd', st); break;
      case 'd1': rows = styleRows(KID_D_B, 'd', st); break;
      case 'u': rows = styleRows(KID_U, 'u', st); break;
      case 'u1': rows = styleRows(KID_U_B, 'u', st); break;
      case 's': rows = styleRows(KID_S, 's', st); break;
      case 's1': rows = styleRows(KID_S_B, 's', st); break;
      case 'sit': rows = styleRows(SIT, 's', st); break;
      case 'ruku': rows = RUKU; break;
      case 'sujud': rows = SUJUD; break;
      default: rows = styleRows(KID_D, 'd', st);
    }
    PX.draw(g, rows, PX.charPal(def), x, y, flip);
  };

  /* ---------------- أدوات ---------------- */
  function rnd(a, b, s) { const n = Math.sin(a * 127.1 + b * 311.7 + (s || 0) * 74.7) * 43758.5453; return n - Math.floor(n); }
  PX.rnd = rnd;
  function mk(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); g.imageSmoothingEnabled = false; return [c, g]; }
  PX.mk = mk;
  const R = (g, x, y, w, h, c) => { g.fillStyle = c; g.fillRect(x, y, w, h); };
  PX.R = R;
  function speckle(g, x, y, w, h, cols, dens, seed) {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
      const v = rnd(x + i, y + j, seed || 1);
      if (v < dens) { g.fillStyle = cols[Math.floor(rnd(i + x, j + y, (seed || 1) + 5) * cols.length)]; g.fillRect(x + i, y + j, 1, 1); }
    }
  }

  /* ---------------- أنسجة ماينكرافت (16×16) ---------------- */
  const TEX = {
    grass(g, X, Y, s) { R(g, X, Y, 16, 16, '#6aa84f'); speckle(g, X, Y, 16, 16, ['#5b9442', '#7cbd5e', '#4f8a3a', '#86c46a'], .32, s); },
    flowers(g, X, Y, s) {
      TEX.grass(g, X, Y, s);
      const cols = ['#e04545', '#f2d23c', '#ffffff', '#b28dff', '#ff8fc7'];
      for (let k = 0; k < 2; k++) {
        const fx = X + 2 + Math.floor(rnd(X, Y, k + 11) * 11), fy = Y + 3 + Math.floor(rnd(Y, X, k + 13) * 9), c = cols[Math.floor(rnd(fx, fy, 3) * cols.length)];
        R(g, fx, fy + 2, 1, 2, '#3d7a2c'); R(g, fx - 1, fy, 3, 1, c); R(g, fx, fy - 1, 1, 3, c); R(g, fx, fy, 1, 1, '#f6d365');
      }
    },
    path(g, X, Y, s) { R(g, X, Y, 16, 16, '#b08a50'); speckle(g, X, Y, 16, 16, ['#9a7442', '#c19c62', '#8d6a3c', '#a68048'], .45, s); },
    stone(g, X, Y) {
      R(g, X, Y, 16, 16, '#8f8f8f');
      for (let row = 0; row < 2; row++) {
        const y0 = Y + row * 8; R(g, X, y0 + 7, 16, 1, '#6a6a6a');
        const off = row % 2 ? 0 : 8; R(g, X + off, y0, 1, 7, '#6a6a6a'); if (off === 8) R(g, X, y0, 1, 7, '#6a6a6a');
        R(g, X + (off ? 1 : 1), y0, off ? 6 : 15, 1, '#a8a8a8');
      }
      speckle(g, X, Y, 16, 16, ['#828282', '#9a9a9a'], .15, 4);
    },
    cobble(g, X, Y, s) {
      R(g, X, Y, 16, 16, '#7d7d7d');
      for (let k = 0; k < 7; k++) { const bx = X + Math.floor(rnd(X, Y, k + s) * 12), by = Y + Math.floor(rnd(Y, X, k + s + 3) * 12), w = 3 + Math.floor(rnd(k, s, 9) * 3); R(g, bx, by, w, 3, k % 2 ? '#9b9b9b' : '#6b6b6b'); R(g, bx, by + 3, w, 1, '#555555'); }
    },
    planks(g, X, Y) {
      R(g, X, Y, 16, 16, '#b8894f');
      for (let r = 0; r < 4; r++) { R(g, X, Y + r * 4 + 3, 16, 1, '#8f6534'); R(g, X + ((r * 7) % 16), Y + r * 4, 1, 3, '#8f6534'); R(g, X, Y + r * 4, 16, 1, '#c99d63'); }
      speckle(g, X, Y, 16, 16, ['#a87b45'], .1, 6);
    },
    dark(g, X, Y) {
      R(g, X, Y, 16, 16, '#5d3d20');
      for (let r = 0; r < 4; r++) { R(g, X, Y + r * 4 + 3, 16, 1, '#432a15'); R(g, X + ((r * 5 + 3) % 16), Y + r * 4, 1, 3, '#432a15'); R(g, X, Y + r * 4, 16, 1, '#6e4a29'); }
    },
    bricks(g, X, Y) {
      R(g, X, Y, 16, 16, '#9a4a38');
      for (let r = 0; r < 4; r++) { const y0 = Y + r * 4; R(g, X, y0 + 3, 16, 1, '#b3a79c'); const off = r % 2 ? 4 : 0; for (let i = off; i < 16; i += 8) R(g, X + i, y0, 1, 3, '#b3a79c'); R(g, X, y0, 16, 1, '#ab5642'); }
    },
    water(g, X, Y, s) { R(g, X, Y, 16, 16, '#3c6fe0'); speckle(g, X, Y, 16, 16, ['#2f5cc4', '#4d7fe9'], .3, s); R(g, X + 2 + (s % 5), Y + 4, 5, 1, '#8fb5ff'); R(g, X + 8, Y + 11, 4, 1, '#8fb5ff'); },
    leaves(g, X, Y, s) { R(g, X, Y, 16, 16, '#3f8a2e'); speckle(g, X, Y, 16, 16, ['#2f6b22', '#57a83e', '#285a1c', '#4b9a35'], .55, s); },
    farm(g, X, Y, s) { R(g, X, Y, 16, 16, '#5e3d22'); for (let r = 0; r < 4; r++) R(g, X, Y + r * 4 + 2, 16, 1, '#4a2f19'); speckle(g, X, Y, 16, 16, ['#6e4a2b'], .2, s); },
    wool(g, X, Y, s, col) { R(g, X, Y, 16, 16, col); speckle(g, X, Y, 16, 16, ['rgba(0,0,0,.12)', 'rgba(255,255,255,.12)'], .35, s); },
    sand(g, X, Y, s) { R(g, X, Y, 16, 16, '#e3d29a'); speckle(g, X, Y, 16, 16, ['#d4c084', '#efe0ad'], .35, s); },
  };
  PX.TEX = TEX;
  function fillTex(g, kind, x, y, w, h, extra) {
    g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip();
    for (let j = 0; j < h; j += 16) for (let i = 0; i < w; i += 16) TEX[kind](g, x + i, y + j, ((x + i) * 7 + (y + j) * 13) % 97, extra);
    g.restore();
  }
  PX.fillTex = fillTex;
  PX.texURL = function (kind, extra) { const [c, g] = mk(16, 16); TEX[kind](g, 0, 0, 7, extra); return c.toDataURL(); };

  /* ---------------- عناصر صغيرة ---------------- */
  function door(g, x, y, open) {
    R(g, x - 1, y - 1, 12, 19, O);
    if (open) { R(g, x, y, 10, 18, '#1d1a1f'); R(g, x + 10, y, 3, 18, '#7c4a1e'); return; }
    R(g, x, y, 10, 18, '#8a5a2b'); R(g, x, y + 8, 10, 1, '#6b4320'); R(g, x + 4, y, 1, 18, '#6b4320');
    R(g, x + 1, y + 1, 3, 6, '#3a2a1c'); R(g, x + 6, y + 1, 3, 6, '#3a2a1c'); R(g, x + 7, y + 11, 2, 2, '#c9c9c9');
  }
  function win(g, x, y, w, h) { R(g, x - 1, y - 1, w + 2, h + 2, O); R(g, x, y, w, h, '#bfe6f5'); R(g, x + Math.floor(w / 2), y, 1, h, '#ffffff'); R(g, x, y + Math.floor(h / 2), w, 1, '#ffffff'); R(g, x + 1, y + 1, 2, 1, '#ffffff'); }
  function outline(g, x, y, w, h) { R(g, x, y, w, 1, O); R(g, x, y + h - 1, w, 1, O); R(g, x, y, 1, h, O); R(g, x + w - 1, y, 1, h, O); }
  PX.outline = outline;

  /* شجرة بلوط (3×3 بلاطات: تاج 48×32 وجذع) */
  PX.tree = function (g, tx, ty) {
    const X = tx * 16, Y = ty * 16;
    R(g, X + 2, Y + 14, 12, 3, 'rgba(0,0,0,.22)');
    R(g, X + 5, Y + 2, 6, 14, '#6b4f2a'); R(g, X + 6, Y + 2, 1, 14, '#56401f'); R(g, X + 9, Y + 4, 1, 10, '#7e5e33'); outline(g, X + 4, Y + 1, 8, 16);
    const cx = X - 14, cy = Y - 26;
    R(g, cx - 1, cy - 1, 46, 34, O);
    fillTex(g, 'leaves', cx, cy, 44, 32);
    R(g, cx, cy, 44, 2, '#5fb244'); R(g, cx, cy + 30, 44, 2, '#245419');
  };

  /* ---------------- المباني ---------------- */
  function facade(g, b, o) {
    const X = b.x * 16, Y = b.y * 16, W = b.w * 16, H = b.h * 16, rh = Math.round(H * (o.roofK || .42));
    R(g, X + 3, Y + H, W - 2, 4, 'rgba(0,0,0,.2)');
    fillTex(g, o.roof, X - 3, Y, W + 6, rh);
    R(g, X - 3, Y + rh - 3, W + 6, 3, o.eave || '#3a2a1c'); outline(g, X - 4, Y - 1, W + 8, rh + 1);
    fillTex(g, o.wall, X, Y + rh, W, H - rh);
    fillTex(g, 'cobble', X, Y + H - 5, W, 5);
    outline(g, X - 1, Y + rh - 1, W + 2, H - rh + 2);
    const dx = b.door * 16 + 3; door(g, dx, Y + H - 18, o.open);
    (o.windows || [[X + 8, Y + rh + 8], [X + W - 20, Y + rh + 8]]).forEach(([wx, wy]) => { if (Math.abs(wx - dx) > 14) win(g, wx, wy, 12, 10); });
  }
  const BUILD = {
    letters(g, b) { facade(g, b, { roof: 'bricks', wall: 'planks', eave: '#5e2b1f' }); },
    tower(g, b) {
      const X = b.x * 16, Y = b.y * 16, W = b.w * 16, H = b.h * 16;
      R(g, X + 3, Y + H, W - 2, 4, 'rgba(0,0,0,.2)');
      fillTex(g, 'stone', X, Y + 6, W, H - 6); outline(g, X - 1, Y + 5, W + 2, H - 4);
      for (let i = 0; i < W; i += 12) { fillTex(g, 'stone', X + i, Y, 7, 7); outline(g, X + i - 1, Y - 1, 9, 8); }
      R(g, X + W / 2 - 6, Y + 14, 12, 18, '#5b2a8c'); R(g, X + W / 2 - 6, Y + 32, 4, 3, '#5b2a8c'); R(g, X + W / 2 + 2, Y + 32, 4, 3, '#5b2a8c'); R(g, X + W / 2 - 2, Y + 20, 4, 4, '#f6d365');
      win(g, X + 8, Y + 40, 10, 12); win(g, X + W - 18, Y + 40, 10, 12);
      fillTex(g, 'cobble', X, Y + H - 5, W, 5);
      door(g, b.door * 16 + 3, Y + H - 18);
    },
    plaza(g, b) {
      const X = b.x * 16, Y = b.y * 16, W = b.w * 16, H = b.h * 16;
      fillTex(g, 'stone', X, Y, W, H);
      const bw = Math.min(W, H) - 26, bx = X + (W - bw) / 2, by = Y + 8, cell = bw / 3;
      R(g, bx + cell - 1, by, 3, bw, '#4a4a4a'); R(g, bx + 2 * cell - 1, by, 3, bw, '#4a4a4a');
      R(g, bx, by + cell - 1, bw, 3, '#4a4a4a'); R(g, bx, by + 2 * cell - 1, bw, 3, '#4a4a4a');
      const mark = (cx, cy, k) => {
        const s = cell - 10, x0 = bx + cx * cell + 5, y0 = by + cy * cell + 5;
        if (k === 'x') for (let i = 0; i < s; i++) { R(g, x0 + i, y0 + i, 3, 3, '#e8505b'); R(g, x0 + s - i - 1, y0 + i, 3, 3, '#e8505b'); }
        else { R(g, x0 + 2, y0, s - 4, 3, '#16a3b6'); R(g, x0 + 2, y0 + s - 1, s - 4, 3, '#16a3b6'); R(g, x0, y0 + 2, 3, s - 4, '#16a3b6'); R(g, x0 + s - 1, y0 + 2, 3, s - 4, '#16a3b6'); }
      };
      mark(0, 0, 'x'); mark(1, 1, 'o'); mark(2, 0, 'o'); mark(2, 2, 'x');
      for (let i = 0; i < W; i += 16) { if (Math.abs(X + i + 8 - (b.door * 16 + 8)) < 20) continue; R(g, X + i + 6, Y + H - 12, 4, 12, '#8a5a2b'); outline(g, X + i + 5, Y + H - 13, 6, 14); }
      R(g, X, Y + H - 9, W, 2, '#8a5a2b');
    },
    market(g, b) {
      facade(g, b, { roof: 'dark', wall: 'planks', roofK: .3, windows: [] });
      const X = b.x * 16, Y = b.y * 16, W = b.w * 16, H = b.h * 16, ay = Y + Math.round(H * .3) + 4;
      const cols = ['#d63c3c', '#2f7fd6', '#e0b52c'];
      for (let s = 0; s < 3; s++) {
        const sx = X + 4 + s * ((W - 8) / 3), sw = (W - 8) / 3 - 4;
        for (let i = 0; i < sw; i += 4) R(g, sx + i, ay, 4, 7, (i / 4) % 2 ? '#ffffff' : cols[s]);
        R(g, sx, ay + 7, sw, 1, O);
        const cy = ay + 16; R(g, sx + 2, cy, sw - 4, 8, '#8a5a2b'); R(g, sx + 2, cy + 3, sw - 4, 1, '#3a2a1c'); R(g, sx + sw / 2 - 1, cy + 2, 3, 3, '#f6d365'); outline(g, sx + 1, cy - 1, sw - 2, 10);
      }
    },
    theater(g, b) {
      facade(g, b, { roof: 'dark', wall: 'dark', eave: '#c99a2e', windows: [] });
      const X = b.x * 16, Y = b.y * 16, W = b.w * 16, H = b.h * 16, top = Y + Math.round(H * .42) + 3;
      for (let i = 0; i < W - 12; i += 4) R(g, X + 6 + i, top, 3, H - (top - Y) - 24, i % 8 ? '#b0202a' : '#d33a3a');
      R(g, X + 4, top - 2, W - 8, 2, '#e8b923');
      for (let i = 0; i < W; i += 8) R(g, X + i + 3, Y + 4, 2, 2, '#ffe066');
    },
    castle(g, b) {
      const X = b.x * 16, Y = b.y * 16, W = b.w * 16, H = b.h * 16;
      fillTex(g, 'cobble', X, Y + 8, W, H - 8); outline(g, X - 1, Y + 7, W + 2, H - 6);
      for (let i = 0; i < W; i += 14) { fillTex(g, 'cobble', X + i, Y, 8, 9); outline(g, X + i - 1, Y - 1, 10, 9); }
      const gx = b.door * 16 - 6; R(g, gx - 1, Y + H - 34, 46, 34, O); R(g, gx, Y + H - 33, 44, 33, '#1d1a1f'); R(g, gx + 4, Y + H - 37, 36, 4, '#1d1a1f');
      for (let i = 0; i < 44; i += 6) R(g, gx + i + 2, Y + H - 33, 2, 20, '#5a5a5a');
      R(g, X + 14, Y + 14, 10, 16, b.flag || '#e05a6a'); R(g, X + W - 24, Y + 14, 10, 16, b.flag || '#e05a6a');
      outline(g, X + 13, Y + 13, 12, 18); outline(g, X + W - 25, Y + 13, 12, 18);
    },
    gate(g, b) {
      const X = b.x * 16, Y = b.y * 16, W = b.w * 16;
      fillTex(g, 'cobble', X, Y, 12, 30); outline(g, X - 1, Y - 1, 14, 32);
      fillTex(g, 'cobble', X + W - 12, Y, 12, 30); outline(g, X + W - 13, Y - 1, 14, 32);
      fillTex(g, 'dark', X - 2, Y - 6, W + 4, 7); outline(g, X - 3, Y - 7, W + 6, 9);
      R(g, X + 3, Y + 4, 6, 6, '#ffd166'); R(g, X + W - 9, Y + 4, 6, 6, '#ffd166');
    },
    pond() {},
  };
  PX.BUILD = BUILD;

  /* ---------------- رسم المدينة (الطبقة الثابتة) ---------------- */
  PX.paintCity = function (L) {
    const [c, g] = mk(L.w * 16, L.h * 16);
    for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
      const t = L.ground[y][x], X = x * 16, Y = y * 16, s = (x * 31 + y * 17) % 89;
      if (t === 'p') TEX.path(g, X, Y, s);
      else if (t === 'w') TEX.water(g, X, Y, s);
      else if (t === 'f') TEX.flowers(g, X, Y, s);
      else if (t === 'd') TEX.farm(g, X, Y, s);
      else if (t === 'a') TEX.sand(g, X, Y, s);
      else TEX.grass(g, X, Y, s);
    }
    for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
      if (L.ground[y][x] === 'p') {
        const up = y > 0 ? L.ground[y - 1][x] : 'p';
        if (up !== 'p') R(g, x * 16, y * 16, 16, 2, '#7e5e33');
      }
      if (L.ground[y][x] === 'w') {
        const up = y > 0 ? L.ground[y - 1][x] : 'w';
        if (up !== 'w') R(g, x * 16, y * 16, 16, 2, '#2a4fa8');
      }
    }
    L.buildings.forEach(b => BUILD[b.kind] && BUILD[b.kind](g, b));
    L.trees.slice().sort((a, b) => a[1] - b[1]).forEach(([tx, ty]) => PX.tree(g, tx, ty));
    return c;
  };

  /* ---------------- أيقونات واجهة ---------------- */
  PX.castleIcon = function (col, locked) {
    const [c, g] = mk(40, 34);
    fillTex(g, locked ? 'cobble' : 'stone', 4, 10, 32, 24); outline(g, 3, 9, 34, 26);
    for (let i = 0; i < 4; i++) { fillTex(g, locked ? 'cobble' : 'stone', 4 + i * 9, 4, 5, 7); outline(g, 3 + i * 9, 3, 7, 8); }
    R(g, 15, 21, 10, 13, '#1d1a1f'); outline(g, 14, 20, 12, 15);
    R(g, 19, 0, 1, 10, '#5a3a20'); R(g, 20, 0, 9, 6, locked ? '#8a8a8a' : col); outline(g, 19, -1, 11, 8);
    if (locked) { R(g, 16, 25, 8, 6, '#c9a227'); R(g, 17, 22, 6, 4, '#c9a227'); R(g, 18, 23, 4, 2, '#1d1a1f'); R(g, 19, 27, 2, 2, '#1d1a1f'); }
    return c.toDataURL();
  };
  PX.heroURL = function (def, pose) { const [c, g] = mk(12, 16); PX.kid(g, def, pose || 'd', 0, 0, false); return c.toDataURL(); };

  /* ---------------- مشاهد الكلمات والقصة (56×36) ---------------- */
  const SW = 56, SH = 36;
  function indoor(g) {
    fillTex(g, 'planks', 0, 0, SW, 27);
    R(g, 0, 0, SW, 27, 'rgba(255,245,220,.35)');
    fillTex(g, 'dark', 0, 27, SW, 9); R(g, 0, 27, SW, 1, '#2f1e10');
  }
  function outdoor(g, groundY) {
    const gy = groundY || 28;
    R(g, 0, 0, SW, gy, '#9ad7ff'); R(g, 0, 0, SW, 6, '#86ccf6');
    R(g, 6, 5, 9, 2, '#ffffff'); R(g, 8, 4, 5, 1, '#ffffff'); R(g, 38, 8, 11, 2, '#ffffff'); R(g, 41, 7, 6, 1, '#ffffff');
    R(g, gy > 20 ? 48 : 46, 2, 5, 5, '#ffe066');
    R(g, 0, gy, SW, 2, '#6aa84f'); speckle(g, 0, gy, SW, 2, ['#5b9442', '#86c46a'], .4, 3);
    R(g, 0, gy + 2, SW, SH - gy - 2, '#8a6240'); speckle(g, 0, gy + 2, SW, SH - gy - 2, ['#6e4c30', '#a07450'], .35, 5);
  }
  const shadow = (g, x, y, w) => R(g, x, y, w, 1, 'rgba(0,0,0,.25)');
  function chair(g, x, y) { R(g, x, y, 2, 14, '#7c4a1e'); R(g, x, y + 9, 11, 2, '#8a5a2b'); R(g, x + 9, y + 11, 2, 7, '#7c4a1e'); R(g, x + 1, y + 11, 1, 7, '#7c4a1e'); }
  function table(g, x, y, w) { R(g, x, y, w, 2, '#a87b46'); R(g, x, y + 2, w, 1, '#6b4320'); R(g, x + 1, y + 3, 2, 27 - y + 6, '#7c4a1e'); R(g, x + w - 3, y + 3, 2, 27 - y + 6, '#7c4a1e'); }
  function bookOpen(g, x, y) { R(g, x - 1, y - 1, 12, 7, '#a83232'); R(g, x, y, 5, 5, '#ffffff'); R(g, x + 5, y, 5, 5, '#f4f1e6'); R(g, x + 5, y, 1, 5, '#c9c2b0'); for (let i = 1; i < 5; i += 2) { R(g, x + 1, y + i, 3, 1, '#9aa0a6'); R(g, x + 6, y + i, 3, 1, '#9aa0a6'); } }
  function apple(g, x, y, bite) { R(g, x, y + 1, 5, 4, '#d63131'); R(g, x + 1, y, 3, 1, '#d63131'); R(g, x + 1, y + 1, 1, 1, '#ff7b7b'); R(g, x + 2, y - 2, 1, 2, '#5a3a20'); R(g, x + 3, y - 2, 2, 1, '#3d9a2c'); if (bite) { R(g, x + 3, y + 1, 2, 2, '#f7e9d0'); R(g, x + 4, y + 3, 1, 1, '#f7e9d0'); } }
  function bookshelf(g, x, y, w, h) {
    fillTex(g, 'planks', x, y, w, h);
    const cols = ['#c0392b', '#2e86c1', '#27ae60', '#f1c40f', '#8e44ad', '#e67e22'];
    for (let r = 0; r < Math.floor(h / 8); r++) { const yy = y + r * 8 + 1; R(g, x, yy + 6, w, 1, '#6b4320'); for (let i = 1; i < w - 1; i += 2) R(g, x + i, yy + (rnd(i, r, 2) > .5 ? 1 : 0), 1, 6 - (rnd(i, r, 2) > .5 ? 1 : 0), cols[Math.floor(rnd(i, r, 8) * cols.length)]); }
    outline(g, x - 1, y - 1, w + 2, h + 2);
  }
  function speed(g, x, y) { R(g, x, y, 6, 1, '#ffffff'); R(g, x - 2, y + 4, 7, 1, '#ffffff'); R(g, x + 1, y + 8, 5, 1, '#ffffff'); }
  function school(g, x, y) {
    fillTex(g, 'bricks', x, y + 4, 14, 12); outline(g, x - 1, y + 3, 16, 14); R(g, x - 1, y + 2, 16, 2, '#3a2a1c');
    R(g, x + 5, y + 10, 4, 6, '#5a3a20'); R(g, x + 2, y + 6, 3, 3, '#bfe6f5'); R(g, x + 9, y + 6, 3, 3, '#bfe6f5');
    R(g, x + 7, y - 6, 1, 9, '#3a2a1c'); R(g, x + 8, y - 6, 5, 3, '#2fa36b');
  }

  const SCENES = {
    katab(g, H) {
      indoor(g); chair(g, 9, 13); PX.kid(g, H, 'sit', 11, 11);
      table(g, 22, 21, 26);
      R(g, 27, 18, 11, 3, '#ffffff'); R(g, 28, 19, 7, 1, '#6b7280'); R(g, 28, 20, 4, 1, '#6b7280'); R(g, 27, 21, 11, 0, O);
      R(g, 22, 16, 1, 1, '#2b2b33'); R(g, 23, 15, 1, 1, '#f2c94c'); R(g, 24, 14, 1, 1, '#f2c94c'); R(g, 25, 13, 1, 1, '#f2c94c'); R(g, 26, 12, 1, 1, '#e88');
      R(g, 41, 14, 3, 7, '#a0a0a0'); R(g, 40, 12, 5, 2, '#ffe066'); R(g, 39, 20, 7, 1, '#6b4320');
    },
    qara(g, H) {
      indoor(g); bookshelf(g, 4, 5, 18, 22);
      PX.kid(g, H, 'd', 30, 11); shadow(g, 30, 27, 12);
      bookOpen(g, 31, 19);
    },
    rasam(g, H) {
      outdoor(g); PX.kid(g, H, 's', 12, 12); shadow(g, 12, 28, 11);
      R(g, 31, 18, 1, 10, '#7c4a1e'); R(g, 43, 18, 1, 10, '#7c4a1e'); R(g, 37, 16, 1, 12, '#6b4320');
      R(g, 29, 6, 17, 13, O); R(g, 30, 7, 15, 11, '#ffffff');
      R(g, 31, 8, 3, 3, '#f2c94c'); R(g, 30, 15, 15, 3, '#6aa84f'); R(g, 38, 11, 1, 4, '#7c4a1e'); R(g, 36, 9, 5, 3, '#3f8a2e');
      R(g, 22, 22, 1, 1, '#7c4a1e'); R(g, 23, 21, 1, 1, '#7c4a1e'); R(g, 24, 20, 1, 1, '#7c4a1e'); R(g, 25, 19, 2, 1, '#e04545');
    },
    zaraa(g, H) {
      outdoor(g); PX.kid(g, H, 's', 10, 12); shadow(g, 10, 28, 11);
      R(g, 26, 28, 26, 2, '#5e3d22'); for (let i = 0; i < 26; i += 4) R(g, 26 + i, 28, 1, 2, '#4a2f19');
      const sprout = (x, h) => { R(g, x, 28 - h, 1, h, '#3d9a2c'); R(g, x - 2, 28 - h, 2, 1, '#5fb244'); R(g, x + 1, 27 - h, 2, 1, '#5fb244'); };
      sprout(32, 3); sprout(40, 5); sprout(48, 7);
      R(g, 19, 19, 6, 5, '#8fa3b8'); R(g, 19, 19, 6, 1, '#b8c7d6'); R(g, 25, 20, 3, 1, '#8fa3b8'); R(g, 28, 21, 1, 1, '#8fa3b8'); R(g, 20, 17, 3, 2, '#6b7d90');
      R(g, 30, 22, 1, 1, '#4d9ff0'); R(g, 31, 24, 1, 1, '#4d9ff0'); R(g, 30, 26, 1, 1, '#4d9ff0'); R(g, 32, 25, 1, 1, '#8fc4ff');
    },
    akal(g, H) {
      indoor(g); PX.kid(g, H, 'd', 22, 9);
      table(g, 12, 22, 34);
      R(g, 31, 13, 3, 2, '#f1c39b'); apple(g, 33, 10, true);
      R(g, 15, 20, 11, 2, '#e6e6e6'); R(g, 16, 21, 9, 1, '#c9c9c9'); apple(g, 18, 15, false);
    },
    jalas(g, H) {
      outdoor(g);
      R(g, 47, 14, 4, 14, '#6b4f2a'); R(g, 48, 14, 1, 14, '#56401f'); outline(g, 46, 13, 6, 15);
      R(g, 39, 2, 18, 14, O); fillTex(g, 'leaves', 40, 3, 16, 12); R(g, 40, 3, 16, 1, '#5fb244');
      R(g, 22, 22, 22, 2, '#a87b46'); R(g, 22, 18, 22, 2, '#a87b46'); R(g, 22, 24, 22, 1, '#6b4320'); R(g, 23, 25, 2, 3, '#7c4a1e'); R(g, 41, 25, 2, 3, '#7c4a1e'); R(g, 22, 18, 1, 6, '#7c4a1e'); R(g, 43, 18, 1, 6, '#7c4a1e');
      PX.kid(g, H, 'sit', 25, 8);
    },
    thahab(g, H) {
      outdoor(g, 26); R(g, 0, 28, SW, 5, '#7a7a7a'); for (let i = 2; i < SW; i += 8) R(g, i, 30, 4, 1, '#f4f1e6'); R(g, 0, 28, SW, 1, '#5a5a5a');
      school(g, 38, 10);
      PX.kid(g, H, 's1', 12, 12);
      for (let i = 0; i < 3; i++) R(g, 4 + i * 3, 27 - (i % 2), 2, 1, '#8a6240');
      R(g, 26, 16, 6, 1, '#f2c94c'); R(g, 30, 15, 1, 3, '#f2c94c'); R(g, 31, 16, 1, 1, '#f2c94c');
    },
    fatah(g, H) {
      indoor(g); R(g, 29, 6, 14, 22, O); R(g, 30, 7, 12, 20, '#ffe9a8'); R(g, 30, 7, 12, 20, 'rgba(255,200,80,.35)');
      R(g, 42, 7, 4, 20, '#8a5a2b'); R(g, 43, 15, 1, 2, '#c9c9c9'); R(g, 42, 6, 4, 1, O);
      for (let i = 0; i < 4; i++) R(g, 31 + i * 3, 27 + 0, 2, 1, 'rgba(255,220,120,.6)');
      PX.kid(g, H, 's', 14, 11); R(g, 24, 21, 4, 1, '#f1c39b');
      R(g, 24, 16, 3, 1, '#d4a514'); R(g, 26, 15, 1, 3, '#d4a514');
    },
    ghasal(g, H) {
      R(g, 0, 0, SW, 27, '#d8eef6'); for (let x = 0; x < SW; x += 8) R(g, x, 0, 1, 27, '#bcdbe8'); for (let y = 0; y < 27; y += 8) R(g, 0, y, SW, 1, '#bcdbe8');
      fillTex(g, 'stone', 0, 27, SW, 9);
      PX.kid(g, H, 'd', 22, 8);
      R(g, 16, 20, 26, 5, '#f4f4f4'); R(g, 16, 20, 26, 1, '#ffffff'); outline(g, 15, 19, 28, 7); R(g, 27, 25, 4, 6, '#d0d0d0');
      R(g, 34, 9, 2, 5, '#9aa0a6'); R(g, 29, 9, 6, 2, '#9aa0a6'); R(g, 29, 11, 2, 1, '#9aa0a6');
      R(g, 29, 12, 1, 6, '#5aa7f0'); R(g, 30, 13, 1, 4, '#8fc4ff');
      R(g, 25, 17, 4, 2, '#f1c39b'); R(g, 31, 17, 4, 2, '#f1c39b');
      [[24, 14], [33, 14], [27, 15], [36, 17], [22, 16]].forEach(([x, y]) => { R(g, x, y, 2, 2, '#ffffff'); R(g, x, y, 1, 1, '#cfe9ff'); });
    },
    tabakh(g, H) {
      indoor(g);
      fillTex(g, 'cobble', 30, 13, 16, 15); outline(g, 29, 12, 18, 16); R(g, 33, 20, 10, 6, '#1d1a1f');
      R(g, 34, 23, 2, 3, '#ff8a1f'); R(g, 37, 22, 2, 4, '#ffb21f'); R(g, 40, 23, 2, 3, '#ff8a1f'); R(g, 36, 24, 1, 2, '#ffe066');
      R(g, 31, 7, 14, 6, '#2b2b33'); R(g, 30, 7, 16, 1, '#3d3d47'); R(g, 32, 7, 12, 1, '#e8913a');
      [[34, 4], [35, 3], [38, 5], [39, 2], [41, 4], [36, 1]].forEach(([x, y]) => R(g, x, y, 1, 1, '#ffffff'));
      PX.kid(g, H, 's', 12, 11); R(g, 22, 19, 1, 1, '#7c4a1e'); R(g, 23, 18, 1, 1, '#7c4a1e'); R(g, 24, 17, 1, 1, '#7c4a1e'); R(g, 25, 16, 1, 1, '#7c4a1e'); R(g, 26, 15, 1, 1, '#7c4a1e'); R(g, 27, 14, 1, 1, '#7c4a1e'); R(g, 28, 12, 2, 2, '#7c4a1e');
      R(g, 12, 9, 9, 3, '#ffffff'); R(g, 13, 7, 7, 2, '#ffffff'); outline(g, 12, 7, 9, 5);
    },
    sabah(g, H) {
      outdoor(g, 18);
      fillTex(g, 'water', 0, 18, SW, 18); R(g, 0, 18, SW, 1, '#8fb5ff');
      PX.draw(g, ["...ooooo....", "..ohhhhho...", ".ohhhhhhho..", ".ohhhhhhho..", ".ohhhsssso..", ".ohhssseso..", ".ohssssssso.", "..ossssmso.."], PX.charPal(H), 20, 12, false);
      R(g, 31, 11, 2, 2, '#f1c39b'); R(g, 33, 10, 2, 2, '#f1c39b'); R(g, 35, 11, 2, 2, '#f1c39b'); R(g, 36, 13, 2, 2, '#f1c39b');
      R(g, 14, 19, 2, 1, '#ffffff'); R(g, 12, 18, 1, 1, '#ffffff'); R(g, 38, 16, 1, 1, '#ffffff'); R(g, 40, 17, 2, 1, '#ffffff'); R(g, 17, 20, 18, 1, '#cfe2ff');
    },
    qafaz(g, H) {
      outdoor(g);
      R(g, 30, 17, 12, 11, '#d9b23a'); for (let i = 0; i < 11; i += 3) R(g, 30, 17 + i, 12, 1, '#b8922a'); R(g, 30, 21, 12, 2, '#8a5a2b'); outline(g, 29, 16, 14, 12);
      PX.kid(g, H, 's1', 20, 1); shadow(g, 21, 28, 10);
      R(g, 14, 12, 4, 1, '#ffffff'); R(g, 13, 15, 5, 1, '#ffffff'); R(g, 15, 18, 3, 1, '#ffffff');
    },
    /* مشاهد القصة */
    s_qaad(g, H) {
      indoor(g); bookshelf(g, 34, 4, 18, 23);
      chair(g, 10, 13); PX.kid(g, H, 'sit', 12, 11);
      bookOpen(g, 21, 18);
    },
    s_akal(g, H) {
      indoor(g); PX.kid(g, H, 'd', 18, 9);
      table(g, 8, 22, 30); R(g, 22, 20, 11, 2, '#e6e6e6'); R(g, 26, 18, 2, 3, '#e8d9b0'); R(g, 26, 17, 1, 1, '#5a3a20');
      R(g, 34, 3, 16, 12, O); R(g, 35, 4, 14, 10, '#ffffff'); R(g, 34, 15, 3, 2, O); R(g, 35, 14, 2, 2, '#ffffff');
      R(g, 38, 6, 3, 2, '#e04545'); R(g, 43, 6, 3, 2, '#e04545'); R(g, 38, 8, 8, 2, '#e04545'); R(g, 39, 10, 6, 1, '#e04545'); R(g, 40, 11, 4, 1, '#e04545'); R(g, 41, 12, 2, 1, '#e04545'); R(g, 39, 7, 1, 1, '#ff9a9a');
    },
    s_rakad(g, H) {
      outdoor(g, 26); R(g, 0, 28, SW, 5, '#7a7a7a'); for (let i = 2; i < SW; i += 8) R(g, i, 30, 4, 1, '#f4f1e6'); R(g, 0, 28, SW, 1, '#5a5a5a');
      school(g, 42, 10); PX.kid(g, H, 's1', 22, 12);
      speed(g, 12, 15); R(g, 13, 26, 3, 2, '#d8d0c0'); R(g, 9, 27, 2, 1, '#d8d0c0');
    },
    s_sajad(g, H) {
      R(g, 0, 0, SW, 27, '#f3ead6'); for (let x = 0; x < SW; x += 8) R(g, x, 0, 1, 27, '#e6dcc4');
      R(g, 22, 3, 12, 16, '#2f8a5b'); R(g, 24, 1, 8, 2, '#2f8a5b'); R(g, 25, 5, 6, 12, '#bfe6c9'); outline(g, 21, 2, 14, 18);
      R(g, 0, 27, SW, 9, '#c8b48a'); R(g, 2, 27, 52, 3, '#2f8a5b'); R(g, 2, 27, 52, 1, '#e8c547'); R(g, 2, 29, 52, 1, '#e8c547');
      PX.kid(g, H, 'ruku', 4, 14);
      PX.kid(g, H, 'sujud', 32, 18);
    },
  };
  PX.SCENES = SCENES;
  const sceneCache = {};
  PX.sceneURL = function (key, hero) {
    const H = PX.HEROES[hero] || PX.HEROES.boy, k = key + ':' + (hero || 'boy');
    if (sceneCache[k]) return sceneCache[k];
    const [c, g] = mk(SW, SH);
    try { SCENES[key](g, H); } catch (e) { R(g, 0, 0, SW, SH, '#f8d7da'); }
    outline(g, 0, 0, SW, SH);
    return (sceneCache[k] = c.toDataURL());
  };
  PX.SCENE_W = SW; PX.SCENE_H = SH;

  /* ---------------- أشياء النقاط (قرائن الحروف) 9×9 ---------------- */
  const ROUND = ["...ooo...", "..oaaao..", ".oaLaaao.", ".oaaaaao.", ".oaaaaao.", ".oaaaaDo.", "..oaaDo..", "...ooo...", "........."];
  const OVAL = ["...ooo...", "..oaaao..", ".oaLaaao.", ".oaaaaao.", ".oaaaaao.", ".oaaaaao.", ".oaaaaDo.", "..oaaDo..", "...ooo..."];
  const OBJ = {
    date: [OVAL, { a: '#8b4a1f', L: '#c27a3e', D: '#5e2f12' }],
    egg: [OVAL, { a: '#fff4dc', L: '#ffffff', D: '#e2cfa8' }],
    snow: [ROUND, { a: '#eef6ff', L: '#ffffff', D: '#bcd4f0' }],
    nut: [ROUND, { a: '#a8743a', L: '#cf9a5c', D: '#6e4720' }],
    gold: [["........", "..oooo..", ".oaLaao.", "oaLaaaDo", "oaaaaaDo", ".oaaDDo.", "..oooo..", "........"], { a: '#f2c12e', L: '#fff1a8', D: '#b88a10' }],
    olive: [["....g....", "...gg....", "..ooo....", ".oaLao...", ".oaaao...", ".oaaDo...", "..oDo....", "...o.....", "........."], { a: '#5f7f2a', L: '#8fb04c', D: '#3c5418', g: '#3d9a2c' }],
    peach: [["....gg...", "...ooo...", "..oaaao..", ".oaLaaao.", ".oaaaaao.", ".oaaaaDo.", "..oaaDo..", "...ooo...", "........."], { a: '#ff9f6b', L: '#ffd0b0', D: '#e0704a', g: '#3d9a2c' }],
    leaf: [[".......o.", "....oooa.", "..ooaaao.", ".oaaLaao.", ".oaLaao..", "oaLaao...", "oLaoo....", "oo.......", "........."], { a: '#3d9a2c', L: '#7cc95e', D: '#256b1a' }],
    frog: [["..o...o..", ".owo.owo.", ".oeo.oeo.", "oaaaaaaao", "oaLaaaaao", "oammmmmao", ".oaaaaao.", "oa.ooo.ao", "oo.....oo"], { a: '#4caf3a', L: '#8fd66a', w: '#ffffff', e: '#1b1420', m: '#2e7d22' }],
    env: [["ooooooooo", "oLwwwwwLo", "owLwwwLwo", "owwLwLwwo", "owwwLwwwo", "owwwwwwwo", "ooooooooo", ".........", "........."], { w: '#ffffff', L: '#c9b48a' }],
    cloud: [["...ooo...", "..owwwoo.", ".owwwwwwo", "owwwwwwwo", "owwwwwwLo", ".oLLLLLo.", "..ooooo..", ".........", "........."], { w: '#ffffff', L: '#c9d9ea' }],
    berry: [["..gggg...", ".gogogg..", ".oaaaao..", "oaLawaao.", "oawaaaDo.", ".oaawDo..", "..oaDo...", "...oo....", "........."], { a: '#e23b3b', L: '#ff8a8a', D: '#a51f1f', w: '#ffe9a0', g: '#3d9a2c' }],
    drop: [["....o....", "...oao...", "...oao...", "..oaLao..", ".oaLaaao.", ".oaaaaao.", ".oaaaaDo.", "..oaaDo..", "...ooo..."], { a: '#3b8be0', L: '#9fd0ff', D: '#1f5fa8' }],
    star: [["....o....", "...oao...", "ooooaoooo", "oaaaLaaao", ".oaaaaao.", "..oaaao..", ".oaaoaao.", ".oao.oao.", ".oo...oo."], { a: '#ffd23f', L: '#fff3b0' }],
    hand: [[".o.o.o...", "oso s o..".replace(/ /g, 's'), "osososo..", "osssssoo.", "osssssoso", "osssssso.", ".osssso..", "..oooo...", "........."], { s: '#f1c39b' }],
  };
  PX.OBJ = OBJ;

  /* ---------------- مكتبة الأشياء (24×24) بإطار تلقائي ---------------- */
  function autoOutline(c) {
    const g = c.getContext('2d'), w = c.width, h = c.height, d = g.getImageData(0, 0, w, h).data, out = [];
    const a = (x, y) => x >= 0 && y >= 0 && x < w && y < h && d[(y * w + x) * 4 + 3] > 40;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (!a(x, y) && (a(x - 1, y) || a(x + 1, y) || a(x, y - 1) || a(x, y + 1))) out.push([x, y]);
    g.fillStyle = O; out.forEach(([x, y]) => g.fillRect(x, y, 1, 1));
  }
  const IC = {};
  function T(g) {
    return {
      r: (x, y, w, h, c) => R(g, x, y, w, h, c),
      p: (x, y, c) => R(g, x, y, 1, 1, c),
      clearEll: (cx, cy, rx, ry) => { for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) if ((x * x) / (rx * rx + .5) + (y * y) / (ry * ry + .5) <= 1) g.clearRect(cx + x, cy + y, 1, 1); },
      clear: (cx, cy, r) => { for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r + r * .6) g.clearRect(cx + x, cy + y, 1, 1); },
      disk: (cx, cy, r, c) => { for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r + r * .6) R(g, cx + x, cy + y, 1, 1, c); },
      ell: (cx, cy, rx, ry, c) => { for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) if ((x * x) / (rx * rx + .5) + (y * y) / (ry * ry + .5) <= 1) R(g, cx + x, cy + y, 1, 1, c); },
      line: (x0, y0, x1, y1, c) => { const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1; for (let i = 0; i <= n; i++) R(g, Math.round(x0 + (x1 - x0) * i / n), Math.round(y0 + (y1 - y0) * i / n), 1, 1, c); },
      tri: (x0, y0, x1, y1, x2, y2, c) => { const minY = Math.min(y0, y1, y2), maxY = Math.max(y0, y1, y2); for (let y = minY; y <= maxY; y++) { const xs = []; [[x0, y0, x1, y1], [x1, y1, x2, y2], [x2, y2, x0, y0]].forEach(([a, b, cc, dd]) => { if ((y >= b && y <= dd) || (y >= dd && y <= b)) { if (dd === b) xs.push(a, cc); else xs.push(a + (cc - a) * (y - b) / (dd - b)); } }); if (xs.length) R(g, Math.round(Math.min(...xs)), y, Math.round(Math.max(...xs)) - Math.round(Math.min(...xs)) + 1, 1, c); } },
    };
  }
  const I = (name, fn) => { IC[name] = fn; };
  /* — طبيعة وسماء — */
  I('sun', t => { for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; t.line(12 + Math.round(Math.cos(a) * 7), 12 + Math.round(Math.sin(a) * 7), 12 + Math.round(Math.cos(a) * 11), 12 + Math.round(Math.sin(a) * 11), '#ffb703'); } t.disk(12, 12, 6, '#ffd23f'); t.disk(10, 10, 2, '#fff3b0'); });
  I('moon', t => { t.disk(12, 12, 8, '#ffe066'); t.disk(16, 9, 7, 'rgba(0,0,0,0)'); const g = t; });
  I('star', t => { t.tri(12, 2, 4, 20, 20, 20, '#ffd23f'); t.tri(12, 22, 3, 8, 21, 8, '#ffd23f'); t.disk(12, 12, 3, '#fff3b0'); });
  I('cloud', t => { t.disk(8, 14, 5, '#ffffff'); t.disk(14, 11, 6, '#ffffff'); t.disk(18, 15, 4, '#ffffff'); t.r(5, 15, 16, 4, '#ffffff'); t.r(5, 18, 16, 1, '#c9d9ea'); });
  I('clouds', t => { t.disk(6, 8, 4, '#ffffff'); t.disk(11, 6, 4, '#ffffff'); t.r(3, 9, 12, 3, '#ffffff'); t.disk(14, 16, 4, '#eef2f7'); t.disk(19, 14, 4, '#eef2f7'); t.r(11, 17, 12, 3, '#eef2f7'); });
  I('rain', t => { IC.cloud(t); [[7, 21], [12, 22], [17, 21]].forEach(([x, y]) => t.r(x, y, 1, 2, '#3b8be0')); });
  I('snow', t => { t.line(12, 2, 12, 22, '#bfe3ff'); t.line(3, 7, 21, 17, '#bfe3ff'); t.line(3, 17, 21, 7, '#bfe3ff'); t.disk(12, 12, 2, '#ffffff'); [[12, 4], [12, 20], [5, 8], [19, 16], [5, 16], [19, 8]].forEach(([x, y]) => t.disk(x, y, 1, '#ffffff')); });
  I('sea', t => { t.r(0, 10, 24, 14, '#3c6fe0'); for (let x = 0; x < 24; x += 6) { t.disk(x + 3, 10, 3, '#5a8cf0'); t.p(x + 2, 8, '#ffffff'); } t.r(0, 16, 24, 1, '#8fb5ff'); t.r(4, 20, 6, 1, '#8fb5ff'); });
  I('tree', t => { t.r(10, 14, 4, 9, '#7a5230'); t.disk(12, 9, 8, '#3f8a2e'); t.disk(9, 7, 3, '#57a83e'); t.disk(15, 11, 2, '#2f6b22'); });
  I('rose', t => { t.line(12, 12, 12, 23, '#3d9a2c'); t.ell(15, 17, 3, 1, '#3d9a2c'); t.disk(12, 8, 5, '#d63c4a'); t.disk(11, 7, 2, '#f06573'); t.line(9, 9, 15, 9, '#a5202e'); });
  I('mountain', t => { t.tri(12, 3, 1, 22, 23, 22, '#8a8f99'); t.tri(12, 3, 8, 10, 16, 10, '#ffffff'); t.tri(17, 9, 11, 22, 23, 22, '#6e737c'); });
  I('island', t => { t.r(0, 17, 24, 7, '#3c6fe0'); t.ell(12, 17, 9, 3, '#e3d29a'); t.line(13, 16, 15, 6, '#7a5230'); t.ell(15, 6, 6, 2, '#3d9a2c'); t.line(15, 6, 20, 10, '#3d9a2c'); t.line(15, 6, 10, 10, '#3d9a2c'); });
  I('fire', t => { t.tri(12, 2, 4, 20, 20, 20, '#ff6b1f'); t.disk(12, 17, 7, '#ff6b1f'); t.tri(12, 9, 8, 21, 16, 21, '#ffd23f'); t.disk(12, 18, 4, '#ffd23f'); t.r(5, 21, 14, 2, '#7a5230'); });
  I('drop', t => { t.tri(12, 2, 6, 14, 18, 14, '#3b8be0'); t.disk(12, 15, 6, '#3b8be0'); t.disk(10, 14, 2, '#9fd0ff'); });
  /* — طعام — */
  I('banana', t => { for (let i = 0; i < 14; i++) { const x = 4 + i, y = Math.round(14 + Math.sin(i / 13 * Math.PI) * -7); t.r(x, y, 2, 4, '#ffd23f'); } t.r(3, 13, 2, 2, '#6b4f2a'); t.r(18, 13, 2, 2, '#6b4f2a'); });
  I('bread', t => { t.ell(12, 14, 10, 6, '#d99a4e'); t.ell(12, 12, 9, 4, '#e8b56b'); [7, 11, 15].forEach(x => t.line(x, 10, x + 2, 15, '#b8782f')); });
  I('apple', t => { t.disk(12, 14, 8, '#d63131'); t.disk(9, 11, 2, '#ff8a8a'); t.r(12, 3, 1, 5, '#6b4f2a'); t.ell(15, 5, 3, 1, '#3d9a2c'); });
  I('pomegranate', t => { t.disk(12, 14, 8, '#b5202e'); t.disk(9, 11, 2, '#e85a66'); t.r(10, 4, 5, 3, '#8a1622'); t.p(10, 3, '#8a1622'); t.p(14, 3, '#8a1622'); });
  I('watermelon', t => { t.ell(12, 13, 11, 8, '#2f8a3b'); t.ell(12, 13, 9, 6, '#5fb244'); for (let x = 4; x < 21; x += 4) t.line(x, 7, x + 1, 19, '#1f6b2a'); });
  I('dates', t => { [[7, 13], [13, 10], [16, 16], [10, 18]].forEach(([x, y]) => { t.ell(x, y, 3, 4, '#8b4a1f'); t.p(x - 1, y - 2, '#c27a3e'); }); });
  I('berries', t => { [[8, 10], [14, 9], [11, 15], [17, 15], [6, 16]].forEach(([x, y]) => { t.disk(x, y, 3, '#5b2a8c'); t.p(x - 1, y - 1, '#a07ad6'); }); t.line(11, 3, 13, 7, '#3d9a2c'); });
  I('fig', t => { t.tri(12, 4, 6, 14, 18, 14, '#6d3b7a'); t.disk(12, 15, 7, '#6d3b7a'); t.disk(10, 13, 2, '#a066b0'); t.r(11, 2, 2, 3, '#3d9a2c'); });
  I('beans', t => { t.ell(12, 18, 10, 4, '#e6e6e6'); [[7, 15], [12, 14], [17, 15], [10, 17], [15, 17]].forEach(([x, y]) => t.ell(x, y, 2, 1, '#8a5a2b')); });
  I('cup', t => { t.r(6, 6, 11, 15, '#e6f4ff'); t.r(7, 9, 9, 11, '#ffffff'); t.r(17, 9, 3, 1, '#e6f4ff'); t.r(19, 9, 1, 7, '#e6f4ff'); t.r(17, 15, 3, 1, '#e6f4ff'); t.r(7, 7, 9, 1, '#c7dff0'); });
  I('plate', t => { t.ell(12, 17, 11, 4, '#e6e6e6'); t.ell(12, 16, 8, 2, '#ffffff'); t.disk(9, 12, 3, '#d63131'); t.ell(15, 13, 3, 2, '#e8b56b'); });
  I('pot', t => { t.r(4, 10, 16, 10, '#3d3d47'); t.r(2, 10, 20, 2, '#55556a'); t.r(5, 9, 14, 1, '#e8913a'); [[8, 4], [12, 2], [16, 5], [10, 6]].forEach(([x, y]) => t.r(x, y, 1, 2, '#ffffff')); t.r(6, 21, 12, 2, '#ff6b1f'); });
  I('juice', t => { t.r(7, 5, 10, 17, '#ffb21f'); t.r(7, 5, 10, 3, '#ffe1a0'); t.r(13, 1, 2, 6, '#e8505b'); t.r(8, 10, 2, 8, '#ffd27a'); });
  /* — حيوانات — */
  I('dog', t => { t.ell(11, 15, 7, 4, '#c9935a'); t.disk(18, 10, 4, '#c9935a'); t.r(20, 7, 2, 5, '#8a5a2b'); t.p(19, 9, '#1b1420'); t.p(22, 11, '#1b1420'); [5, 9, 13, 16].forEach(x => t.r(x, 18, 2, 4, '#c9935a')); t.line(4, 13, 2, 9, '#c9935a'); });
  I('cat', t => { t.ell(11, 16, 7, 4, '#9aa0a6'); t.disk(17, 10, 4, '#9aa0a6'); t.tri(14, 7, 15, 3, 17, 7, '#9aa0a6'); t.tri(18, 7, 20, 3, 21, 8, '#9aa0a6'); t.p(16, 10, '#2f8a3b'); t.p(19, 10, '#2f8a3b'); [6, 10, 13, 16].forEach(x => t.r(x, 19, 2, 3, '#9aa0a6')); t.line(4, 15, 2, 9, '#9aa0a6'); });
  I('mouse', t => { t.ell(11, 16, 7, 4, '#a7a7b0'); t.disk(17, 14, 3, '#a7a7b0'); t.disk(16, 10, 2, '#f2a7b8'); t.p(19, 13, '#1b1420'); t.line(4, 16, 1, 12, '#f2a7b8'); });
  I('horse', t => { t.ell(11, 13, 8, 4, '#8a5a2b'); t.r(17, 4, 4, 9, '#8a5a2b'); t.r(19, 4, 4, 4, '#8a5a2b'); t.r(16, 4, 2, 7, '#3a2a1c'); t.p(21, 5, '#1b1420'); [5, 8, 14, 17].forEach(x => t.r(x, 16, 2, 7, '#8a5a2b')); t.line(3, 11, 1, 18, '#3a2a1c'); });
  I('elephant', t => { t.ell(11, 13, 9, 6, '#9aa0a6'); t.disk(18, 10, 4, '#9aa0a6'); t.r(20, 12, 2, 9, '#9aa0a6'); t.ell(14, 10, 3, 4, '#868c93'); t.p(19, 9, '#1b1420'); [5, 9, 13].forEach(x => t.r(x, 17, 3, 6, '#9aa0a6')); });
  I('rooster', t => { t.ell(11, 15, 6, 5, '#e8e1d4'); t.disk(16, 8, 3, '#e8e1d4'); t.r(15, 3, 3, 3, '#d63131'); t.tri(19, 8, 22, 9, 19, 10, '#ffb21f'); t.p(16, 7, '#1b1420'); t.tri(5, 8, 2, 18, 8, 16, '#2f8a3b'); t.r(10, 20, 1, 3, '#ffb21f'); t.r(13, 20, 1, 3, '#ffb21f'); });
  I('duck', t => { t.ell(11, 16, 8, 5, '#ffd23f'); t.disk(16, 8, 4, '#ffd23f'); t.tri(19, 8, 23, 9, 19, 10, '#ff8a1f'); t.p(16, 7, '#1b1420'); t.ell(9, 16, 4, 2, '#f2c12e'); });
  I('owl', t => { t.ell(12, 13, 8, 9, '#8a5a2b'); t.disk(9, 10, 3, '#ffffff'); t.disk(15, 10, 3, '#ffffff'); t.p(9, 10, '#1b1420'); t.p(15, 10, '#1b1420'); t.tri(11, 13, 13, 13, 12, 15, '#ffb21f'); t.ell(12, 18, 5, 3, '#c9a067'); t.tri(5, 3, 7, 6, 8, 4, '#8a5a2b'); t.tri(19, 3, 17, 6, 16, 4, '#8a5a2b'); });
  I('whale', t => { t.ell(11, 14, 10, 6, '#2f6fb0'); t.ell(11, 17, 8, 3, '#bfe3ff'); t.tri(20, 11, 23, 7, 23, 15, '#2f6fb0'); t.p(5, 12, '#1b1420'); t.line(9, 7, 9, 3, '#9fd0ff'); t.line(9, 4, 7, 2, '#9fd0ff'); t.line(9, 4, 11, 2, '#9fd0ff'); });
  I('worm', t => { for (let i = 0; i < 16; i++) t.disk(4 + i, 15 + Math.round(Math.sin(i / 2.5) * 3), 2, '#f29bb0'); t.p(20, 13, '#1b1420'); });
  I('lion', t => { t.disk(12, 11, 9, '#c2741f'); t.disk(12, 12, 6, '#f2b24c'); t.p(10, 11, '#1b1420'); t.p(14, 11, '#1b1420'); t.r(11, 14, 3, 2, '#6b3a12'); });
  I('fish', t => { t.ell(11, 12, 8, 5, '#ff8a3d'); t.tri(18, 12, 23, 7, 23, 17, '#ff8a3d'); t.p(6, 11, '#1b1420'); t.line(10, 8, 10, 16, '#e0661f'); });
  I('giraffe', t => { t.r(13, 2, 3, 13, '#f2c14e'); t.r(15, 2, 4, 3, '#f2c14e'); t.ell(10, 16, 7, 3, '#f2c14e'); [5, 8, 12, 15].forEach(x => t.r(x, 18, 2, 5, '#f2c14e')); [[14, 6], [13, 10], [8, 15], [12, 16]].forEach(([x, y]) => t.r(x, y, 2, 2, '#b8782f')); t.p(17, 3, '#1b1420'); });
  I('bird', t => { t.ell(11, 13, 7, 5, '#3b8be0'); t.disk(16, 9, 3, '#3b8be0'); t.tri(18, 9, 22, 10, 18, 11, '#ffb21f'); t.p(16, 8, '#1b1420'); t.tri(6, 11, 12, 11, 8, 16, '#2f6fb0'); });
  /* — أشياء — */
  I('house', t => { t.tri(12, 2, 1, 11, 23, 11, '#b5452f'); t.r(4, 11, 16, 11, '#e8d3a8'); t.r(10, 15, 4, 7, '#7a4a20'); t.r(5, 13, 4, 4, '#9fd8ff'); t.r(15, 13, 4, 4, '#9fd8ff'); });
  I('door', t => { t.r(5, 1, 14, 22, '#8a5a2b'); t.r(7, 3, 4, 8, '#6b4320'); t.r(13, 3, 4, 8, '#6b4320'); t.r(7, 13, 4, 8, '#6b4320'); t.r(13, 13, 4, 8, '#6b4320'); t.r(15, 12, 2, 2, '#ffd23f'); });
  I('crown', t => { t.tri(3, 8, 3, 20, 9, 20, '#ffd23f'); t.r(3, 12, 18, 9, '#ffd23f'); t.tri(12, 4, 7, 14, 17, 14, '#ffd23f'); t.tri(21, 8, 15, 20, 21, 20, '#ffd23f'); [[6, 16], [12, 15], [18, 16]].forEach(([x, y]) => t.r(x, y, 2, 2, '#e8505b')); });
  I('books', t => { t.r(3, 4, 5, 18, '#d63c3c'); t.r(9, 6, 5, 16, '#2f7fd6'); t.r(15, 3, 5, 19, '#3c8527'); [5, 11, 17].forEach(x => t.r(x - 1, 8, 3, 1, '#ffd23f')); });
  I('book', t => { t.r(2, 5, 20, 15, '#a83232'); t.r(3, 6, 8, 12, '#ffffff'); t.r(13, 6, 8, 12, '#f4f1e6'); [8, 11, 14].forEach(y => { t.r(4, y, 6, 1, '#9aa0a6'); t.r(14, y, 6, 1, '#9aa0a6'); }); });
  I('pen', t => { t.line(5, 19, 18, 6, '#2f7fd6'); t.line(6, 19, 19, 6, '#2f7fd6'); t.line(5, 18, 18, 5, '#5aa0f0'); t.r(18, 4, 2, 2, '#e8505b'); t.r(4, 19, 2, 2, '#1b1420'); });
  I('toys', t => { t.disk(9, 9, 4, '#c9935a'); t.disk(6, 5, 2, '#c9935a'); t.disk(12, 5, 2, '#c9935a'); t.ell(9, 17, 5, 5, '#c9935a'); t.p(8, 8, '#1b1420'); t.p(11, 8, '#1b1420'); t.r(15, 13, 7, 7, '#e8505b'); t.r(16, 14, 5, 5, '#ffd23f'); });
  I('ball', t => { t.disk(12, 12, 9, '#ffffff'); t.disk(12, 12, 3, '#1b1420'); [[6, 7], [18, 7], [5, 15], [19, 15], [12, 20]].forEach(([x, y]) => t.disk(x, y, 1, '#1b1420')); });
  I('city', t => { t.r(1, 8, 7, 15, '#7d8cc4'); t.r(8, 3, 7, 20, '#5b6aa8'); t.r(15, 10, 8, 13, '#8a9bd6'); for (let y = 6; y < 22; y += 3) { t.r(10, y, 1, 1, '#ffe066'); t.r(12, y, 1, 1, '#ffe066'); } for (let y = 11; y < 22; y += 3) { t.r(3, y, 1, 1, '#ffe066'); t.r(18, y, 1, 1, '#ffe066'); } });
  I('ship', t => { t.tri(2, 15, 22, 15, 18, 21, '#8a5a2b'); t.r(2, 15, 20, 2, '#8a5a2b'); t.r(11, 2, 1, 13, '#5a3a20'); t.tri(12, 3, 12, 13, 20, 13, '#ffffff'); t.tri(11, 5, 11, 13, 5, 13, '#f4f1e6'); });
  I('ear', t => { t.ell(12, 12, 7, 10, '#f1c39b'); t.ell(13, 12, 4, 7, '#e0a57a'); t.ell(14, 13, 2, 4, '#f1c39b'); });
  I('eye', t => { t.ell(12, 12, 10, 6, '#ffffff'); t.disk(12, 12, 4, '#2f7fd6'); t.disk(12, 12, 2, '#1b1420'); t.p(11, 10, '#ffffff'); });
  I('heart', t => { t.disk(8, 9, 5, '#e8505b'); t.disk(16, 9, 5, '#e8505b'); t.tri(3, 11, 21, 11, 12, 21, '#e8505b'); t.disk(7, 7, 1, '#ff9aa2'); });
  I('newspaper', t => { t.r(3, 3, 18, 18, '#f4f1e6'); t.r(5, 5, 14, 3, '#3f3f3f'); [10, 13, 16].forEach(y => { t.r(5, y, 6, 1, '#9aa0a6'); t.r(13, y, 6, 1, '#9aa0a6'); }); t.r(13, 9, 6, 3, '#9aa0a6'); });
  I('rooms', t => { t.tri(12, 1, 1, 8, 23, 8, '#b5452f'); t.r(2, 8, 20, 15, '#e8d3a8'); t.r(12, 8, 1, 15, '#8a5a2b'); t.r(2, 15, 20, 1, '#8a5a2b'); t.r(4, 10, 5, 4, '#9fd8ff'); t.r(15, 17, 4, 6, '#7a4a20'); t.r(4, 18, 6, 3, '#d63c3c'); t.r(15, 10, 5, 3, '#3c8527'); });
  I('bed', t => { t.r(2, 13, 20, 6, '#c9a067'); t.r(2, 9, 3, 13, '#8a5a2b'); t.r(19, 12, 3, 10, '#8a5a2b'); t.r(5, 11, 5, 3, '#ffffff'); t.r(9, 12, 10, 3, '#4f9ad8'); });
  I('sickbed', t => { IC.bed(t); t.disk(8, 9, 3, '#f1c39b'); t.r(5, 6, 6, 2, '#3b2416'); t.r(12, 4, 1, 6, '#e8505b'); t.r(12, 3, 1, 1, '#ffffff'); });
  I('bus', t => { t.r(1, 5, 22, 14, '#ffb21f'); t.r(1, 5, 22, 2, '#e0901a'); [3, 8, 13].forEach(x => t.r(x, 8, 4, 4, '#9fd8ff')); t.r(18, 8, 4, 8, '#9fd8ff'); t.disk(5, 10, 1, '#f1c39b'); t.disk(6, 20, 2, '#2b2b33'); t.disk(17, 20, 2, '#2b2b33'); });
  I('car', t => { t.r(2, 11, 20, 7, '#e8505b'); t.r(6, 6, 12, 6, '#e8505b'); t.r(7, 7, 4, 4, '#9fd8ff'); t.r(13, 7, 4, 4, '#9fd8ff'); t.disk(7, 19, 3, '#2b2b33'); t.disk(17, 19, 3, '#2b2b33'); t.r(20, 13, 2, 2, '#ffe066'); });
  I('bike', t => { t.disk(6, 16, 5, '#2b2b33'); t.disk(6, 16, 3, 'rgba(0,0,0,0)'); t.disk(18, 16, 5, '#2b2b33'); t.line(6, 16, 11, 9, '#2f8a3b'); t.line(11, 9, 18, 16, '#2f8a3b'); t.line(6, 16, 13, 16, '#2f8a3b'); t.line(11, 9, 17, 9, '#2f8a3b'); t.r(9, 7, 4, 2, '#1b1420'); t.line(17, 9, 18, 5, '#2f8a3b'); });
  I('glasses', t => { t.disk(7, 12, 5, '#bfe6f5'); t.disk(17, 12, 5, '#bfe6f5'); t.r(11, 11, 2, 1, '#1b1420'); t.line(2, 10, 0, 8, '#1b1420'); t.line(22, 10, 23, 8, '#1b1420'); });
  I('knife', t => { t.r(3, 10, 13, 4, '#d0d4da'); t.line(3, 13, 15, 13, '#9aa0a6'); t.r(16, 9, 7, 6, '#6b4320'); t.tri(3, 10, 0, 12, 3, 13, '#d0d4da'); });
  I('ladder', t => { t.r(5, 1, 2, 22, '#a87b46'); t.r(17, 1, 2, 22, '#a87b46'); for (let y = 3; y < 22; y += 5) t.r(7, y, 10, 2, '#c99d63'); });
  I('shirt', t => { t.r(6, 6, 12, 16, '#4f9ad8'); t.tri(6, 6, 1, 11, 6, 13, '#4f9ad8'); t.tri(18, 6, 23, 11, 18, 13, '#4f9ad8'); t.tri(9, 6, 15, 6, 12, 9, '#ffffff'); });
  I('bell', t => { t.tri(12, 3, 4, 18, 20, 18, '#ffd23f'); t.disk(12, 9, 5, '#ffd23f'); t.r(3, 18, 18, 2, '#e0b52c'); t.disk(12, 21, 2, '#b8860b'); });
  I('bulb', t => { t.disk(12, 9, 7, '#fff3b0'); t.disk(12, 9, 5, '#ffe066'); t.r(9, 15, 6, 5, '#9aa0a6'); t.r(9, 17, 6, 1, '#6b6b6b'); [[12, 0], [3, 3], [21, 3]].forEach(([x, y]) => t.r(x, y, 1, 2, '#ffd23f')); });
  I('hammer', t => { t.line(7, 21, 15, 9, '#8a5a2b'); t.line(8, 21, 16, 9, '#8a5a2b'); t.r(11, 4, 10, 5, '#6b6b6b'); t.r(11, 4, 10, 1, '#9aa0a6'); });
  I('soap', t => { t.r(4, 13, 14, 7, '#f29bb0'); t.r(5, 13, 12, 2, '#ffc4d1'); [[18, 8], [13, 6], [20, 13], [8, 8]].forEach(([x, y]) => t.disk(x, y, 2, '#cfe9ff')); });
  I('jug', t => { t.r(6, 7, 10, 13, '#2f7fd6'); t.r(16, 9, 3, 1, '#2f7fd6'); t.r(18, 9, 1, 6, '#2f7fd6'); t.tri(6, 7, 2, 4, 6, 10, '#2f7fd6'); t.line(2, 5, 1, 18, '#9fd0ff'); t.r(5, 7, 12, 1, '#5aa0f0'); });
  I('sprout', t => { t.r(2, 18, 20, 5, '#6e4a2b'); t.r(11, 8, 2, 10, '#3d9a2c'); t.ell(7, 9, 4, 2, '#5fb244'); t.ell(17, 7, 4, 2, '#5fb244'); });
  I('wheat', t => { [7, 12, 17].forEach(x => { t.r(x, 9, 1, 14, '#c9a227'); for (let y = 2; y < 10; y += 2) { t.r(x - 1, y, 1, 2, '#e8c547'); t.r(x + 1, y, 1, 2, '#e8c547'); } }); });
  I('broom', t => { t.line(18, 1, 11, 14, '#8a5a2b'); t.line(19, 1, 12, 14, '#8a5a2b'); t.tri(10, 13, 4, 22, 16, 22, '#e8c547'); t.r(8, 14, 6, 2, '#b8860b'); });
  I('beads', t => { for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; t.disk(12 + Math.round(Math.cos(a) * 8), 10 + Math.round(Math.sin(a) * 7), 1, '#2f8a5b'); } t.line(12, 17, 12, 22, '#2f8a5b'); t.disk(12, 22, 1, '#e8c547'); });
  I('clock', t => { t.disk(12, 12, 10, '#ffffff'); t.disk(12, 12, 9, '#f4f1e6'); t.line(12, 12, 12, 5, '#1b1420'); t.line(12, 12, 17, 12, '#1b1420'); [[12, 3], [21, 12], [12, 21], [3, 12]].forEach(([x, y]) => t.p(x, y, '#e8505b')); });
  I('medal', t => { t.tri(6, 1, 11, 1, 11, 11, '#e8505b'); t.tri(18, 1, 13, 1, 13, 11, '#2f7fd6'); t.disk(12, 15, 7, '#ffd23f'); t.disk(12, 15, 4, '#ffb703'); t.p(11, 13, '#fff3b0'); });
  I('market', t => { for (let x = 1; x < 23; x += 4) t.r(x, 3, 4, 6, (x / 4 | 0) % 2 ? '#ffffff' : '#d63c3c'); t.r(2, 9, 20, 2, '#8a5a2b'); t.r(3, 11, 2, 11, '#8a5a2b'); t.r(19, 11, 2, 11, '#8a5a2b'); t.r(5, 15, 14, 5, '#a87b46'); [[7, 14, '#d63131'], [11, 14, '#ffd23f'], [15, 14, '#3d9a2c']].forEach(([x, y, c]) => t.disk(x, y, 2, c)); });
  I('feather', t => { t.line(5, 21, 18, 3, '#9aa0a6'); for (let i = 0; i < 12; i++) { t.line(7 + i, 18 - i * 1.4, 12 + i, 18 - i * 1.4 + 2, '#e6e6e6'); t.line(7 + i, 18 - i * 1.4, 5 + i, 14 - i * 1.4, '#ffffff'); } });
  I('mug', t => IC.cup(t));
  I('teacher', t => { t.r(1, 2, 14, 10, '#2f6b4f'); t.r(1, 2, 14, 1, '#8a5a2b'); t.r(3, 5, 7, 1, '#ffffff'); t.r(3, 8, 5, 1, '#ffffff'); t.disk(18, 8, 3, '#f1c39b'); t.r(15, 5, 7, 2, '#3b2416'); t.r(15, 12, 7, 9, '#2f7fd6'); t.line(15, 13, 11, 9, '#f1c39b'); t.r(16, 21, 2, 3, '#3b4466'); t.r(19, 21, 2, 3, '#3b4466'); });
  I('baker', t => { t.r(14, 1, 8, 5, '#ffffff'); t.disk(18, 9, 3, '#f1c39b'); t.r(14, 12, 8, 9, '#ffffff'); t.ell(7, 17, 6, 4, '#d99a4e'); t.ell(7, 16, 5, 2, '#e8b56b'); });
  /* — رسوم كلمات مدينة الحروف — */
  I('egg', t => { t.ell(12, 13, 7, 9, '#fff4dc'); t.ell(10, 9, 2, 3, '#ffffff'); t.ell(14, 17, 4, 3, '#efe2c4'); });
  I('crescent', t => { t.disk(12, 12, 9, '#ffe066'); t.clear(16, 9, 8); });
  I('moon', t => { t.disk(12, 12, 9, '#ffe066'); t.clear(16, 9, 8); });
  I('fox', t => { t.ell(10, 16, 7, 4, '#e0701f'); t.disk(17, 10, 4, '#e0701f'); t.tri(14, 7, 15, 2, 17, 7, '#e0701f'); t.tri(18, 7, 21, 3, 21, 9, '#e0701f'); t.tri(20, 11, 23, 12, 20, 13, '#ffffff'); t.p(17, 9, '#1b1420'); t.ell(3, 13, 3, 5, '#e0701f'); t.p(2, 9, '#ffffff'); [6, 9, 12, 15].forEach(x => t.r(x, 19, 2, 3, '#7a3a10')); });
  I('triangle', t => { t.tri(12, 2, 2, 21, 22, 21, '#2f7fd6'); t.tri(12, 8, 7, 18, 17, 18, '#9fd0ff'); });
  I('camel', t => { t.ell(10, 13, 8, 4, '#d9a95a'); t.disk(8, 9, 3, '#d9a95a'); t.disk(13, 9, 3, '#d9a95a'); t.r(17, 6, 3, 8, '#d9a95a'); t.r(18, 4, 5, 3, '#d9a95a'); t.p(20, 5, '#1b1420'); [4, 7, 12, 15].forEach(x => t.r(x, 16, 2, 7, '#c08a40')); });
  I('peach', t => { t.disk(12, 14, 8, '#ff9f6b'); t.disk(9, 11, 3, '#ffd0b0'); t.line(12, 7, 12, 18, '#e0704a'); t.ell(15, 5, 3, 1, '#3d9a2c'); });
  I('bear', t => { t.disk(12, 13, 9, '#8a5a2b'); t.disk(5, 5, 3, '#8a5a2b'); t.disk(19, 5, 3, '#8a5a2b'); t.ell(12, 16, 4, 3, '#c9935a'); t.r(11, 14, 3, 2, '#1b1420'); t.p(8, 11, '#1b1420'); t.p(16, 11, '#1b1420'); });
  I('wolf', t => { t.ell(10, 16, 7, 4, '#7d7d8a'); t.disk(17, 10, 4, '#7d7d8a'); t.tri(14, 7, 15, 1, 17, 7, '#7d7d8a'); t.tri(18, 7, 21, 2, 21, 9, '#7d7d8a'); t.tri(20, 11, 23, 12, 20, 13, '#d0d0d8'); t.p(17, 9, '#ffd23f'); t.line(3, 14, 1, 9, '#7d7d8a'); [6, 9, 12, 15].forEach(x => t.r(x, 19, 2, 3, '#5d5d6a')); });
  I('gold', t => { [[3, 15], [12, 15], [7, 9]].forEach(([x, y]) => { t.r(x, y, 9, 6, '#f2c12e'); t.r(x, y, 9, 1, '#fff1a8'); t.r(x + 1, y + 5, 8, 1, '#b88a10'); }); });
  I('corn', t => { t.ell(12, 11, 4, 9, '#ffd23f'); for (let y = 4; y < 19; y += 3) t.r(9, y, 7, 1, '#e0b52c'); t.tri(12, 22, 4, 8, 9, 20, '#3d9a2c'); t.tri(12, 22, 20, 8, 15, 20, '#3d9a2c'); });
  I('monkey', t => { t.disk(12, 10, 7, '#8a5a2b'); t.disk(4, 10, 3, '#8a5a2b'); t.disk(20, 10, 3, '#8a5a2b'); t.ell(12, 12, 4, 4, '#e8c6a0'); t.p(10, 9, '#1b1420'); t.p(14, 9, '#1b1420'); t.r(11, 13, 3, 1, '#6b3a12'); t.ell(12, 20, 5, 3, '#8a5a2b'); });
  I('olive', t => { t.line(3, 6, 21, 6, '#6b4f2a'); [[6, 11], [12, 13], [18, 10]].forEach(([x, y]) => { t.ell(x, y, 2, 3, '#5f7f2a'); t.p(x - 1, y - 2, '#8fb04c'); }); t.ell(9, 4, 3, 1, '#3d9a2c'); t.ell(16, 4, 3, 1, '#3d9a2c'); });
  I('box', t => { t.r(3, 9, 18, 13, '#a87b46'); t.r(2, 6, 20, 4, '#8a5a2b'); t.r(10, 6, 4, 16, '#d9b23a'); t.r(11, 11, 2, 3, '#6b4320'); });
  I('frog', t => { t.ell(12, 15, 9, 6, '#4caf3a'); t.disk(7, 8, 3, '#4caf3a'); t.disk(17, 8, 3, '#4caf3a'); t.disk(7, 8, 1, '#1b1420'); t.disk(17, 8, 1, '#1b1420'); t.line(7, 16, 17, 16, '#2e7d22'); t.ell(12, 18, 5, 2, '#8fd66a'); });
  I('plane', t => { t.ell(12, 12, 10, 3, '#e6eef7'); t.tri(10, 12, 16, 12, 9, 22, '#c9d9ea'); t.tri(10, 12, 16, 12, 9, 2, '#c9d9ea'); t.tri(21, 12, 23, 6, 23, 12, '#e8505b'); [6, 9, 12].forEach(x => t.p(x, 11, '#2f7fd6')); });
  I('envelope', t => { t.r(2, 6, 20, 13, '#ffffff'); t.line(2, 6, 12, 13, '#c9b48a'); t.line(22, 6, 12, 13, '#c9b48a'); t.r(16, 8, 4, 3, '#e8505b'); });
  I('candle', t => { t.r(8, 9, 8, 13, '#f4f1e6'); t.r(8, 9, 8, 1, '#ffffff'); t.r(11, 6, 1, 3, '#1b1420'); t.tri(11, 0, 9, 5, 14, 5, '#ffb21f'); t.p(11, 4, '#ffe066'); t.r(6, 21, 12, 2, '#b8860b'); });
  I('lemon', t => { t.ell(12, 13, 9, 7, '#f2e23c'); t.tri(2, 13, 4, 11, 4, 15, '#f2e23c'); t.tri(22, 13, 20, 11, 20, 15, '#f2e23c'); t.ell(10, 10, 3, 1, '#fff7a8'); t.ell(15, 5, 3, 1, '#3d9a2c'); });
  I('gift', t => { t.r(3, 9, 18, 13, '#e8505b'); t.r(2, 7, 20, 4, '#ff7a85'); t.r(11, 7, 3, 15, '#ffd23f'); t.ell(9, 5, 3, 2, '#ffd23f'); t.ell(15, 5, 3, 2, '#ffd23f'); });
  I('face', t => { t.disk(12, 12, 10, '#f1c39b'); t.r(3, 3, 18, 5, '#3b2416'); t.p(8, 11, '#1b1420'); t.p(15, 11, '#1b1420'); t.r(9, 16, 6, 1, '#b4434f'); t.r(10, 17, 4, 1, '#b4434f'); });
  I('bucket', t => { t.tri(4, 8, 20, 8, 17, 22, '#8fa3b8'); t.tri(4, 8, 7, 22, 17, 22, '#8fa3b8'); t.r(4, 8, 17, 2, '#b8c7d6'); t.r(5, 9, 15, 2, '#3c6fe0'); t.line(4, 8, 12, 2, '#6b7d90'); t.line(20, 8, 12, 2, '#6b7d90'); });
  I('hand', t => { t.r(6, 10, 12, 12, '#f1c39b'); [6, 9, 12, 15].forEach(x => t.r(x, 2 + (x === 6 || x === 15 ? 3 : 0), 3, 9, '#f1c39b')); t.r(17, 12, 5, 3, '#f1c39b'); t.line(9, 14, 9, 20, '#e0a57a'); });
  I('chair', t => { t.r(5, 2, 3, 20, '#8a5a2b'); t.r(5, 2, 13, 3, '#a87b46'); t.r(5, 12, 14, 3, '#a87b46'); t.r(16, 12, 3, 10, '#8a5a2b'); t.r(10, 5, 1, 7, '#8a5a2b'); t.r(14, 5, 1, 7, '#8a5a2b'); });
  I('stick', t => { t.line(6, 22, 16, 3, '#8a5a2b'); t.line(7, 22, 17, 3, '#8a5a2b'); t.line(16, 3, 20, 3, '#8a5a2b'); t.line(20, 3, 21, 6, '#8a5a2b'); });
  I('parrot', t => { t.ell(11, 13, 6, 7, '#2f8a3b'); t.disk(14, 7, 4, '#2f8a3b'); t.tri(17, 6, 21, 8, 17, 10, '#ffb21f'); t.p(15, 6, '#1b1420'); t.disk(13, 9, 1, '#e8505b'); t.tri(7, 16, 4, 23, 10, 21, '#e8505b'); });
  I('dress', t => { t.r(9, 3, 6, 6, '#d6336c'); t.tri(9, 9, 2, 22, 22, 22, '#d6336c'); t.tri(15, 9, 2, 22, 22, 22, '#d6336c'); t.r(8, 9, 8, 2, '#ffd23f'); });
  /* — مشاهد القرائن: الصوت والحركة — */
  const SKIN = '#f1c39b', HAIR = '#3b2416', INK = '#1b1420', LIP = '#8a2a3a';
  function faceT(t, o) {
    o = o || {};
    const cx = 12, cy = o.cy || 12;
    t.disk(cx, cy, 9, SKIN);
    t.r(cx - 8, cy - 9, 16, 4, HAIR); t.r(cx - 9, cy - 7, 3, 5, HAIR); t.r(cx + 6, cy - 7, 3, 5, HAIR);
    if (o.eyes === 'closed') { t.r(cx - 5, cy - 1, 3, 1, INK); t.r(cx + 2, cy - 1, 3, 1, INK); }
    else if (o.eyes === 'up') { t.r(cx - 5, cy - 3, 2, 2, INK); t.r(cx + 3, cy - 3, 2, 2, INK); }
    else { t.r(cx - 5, cy - 2, 2, 2, INK); t.r(cx + 3, cy - 2, 2, 2, INK); }
    t.r(cx - 7, cy + 1, 2, 1, '#f29b9b'); t.r(cx + 5, cy + 1, 2, 1, '#f29b9b');
    const m = o.mouth || 'smile', my = cy + 4;
    if (m === 'open') t.ell(cx, my, 3, 2, LIP);
    else if (m === 'o') t.disk(cx, my, 2, LIP);
    else if (m === 'tongue') { t.r(cx - 4, my - 1, 9, 1, '#ffffff'); t.r(cx - 2, my, 5, 3, '#e8738a'); t.r(cx - 1, my + 3, 3, 1, '#e8738a'); t.r(cx, my + 1, 1, 2, '#c95a70'); }
    else if (m === 'flat') t.r(cx - 2, my, 5, 1, LIP);
    else { t.r(cx - 3, my, 7, 1, LIP); t.p(cx - 4, my - 1, LIP); t.p(cx + 4, my - 1, LIP); }
  }
  I('finger_up', t => { t.r(7, 13, 10, 9, SKIN); t.r(10, 3, 4, 11, SKIN); t.r(10, 3, 4, 2, '#ffe0c8'); t.r(7, 15, 10, 1, '#e0a57a'); t.disk(12, 2, 2, '#c2410c'); });
  I('knock', t => { t.r(14, 1, 9, 22, '#8a5a2b'); t.r(16, 3, 5, 7, '#6b4320'); t.r(16, 13, 5, 7, '#6b4320'); t.r(2, 9, 8, 8, SKIN); t.r(9, 9, 3, 3, SKIN); t.r(10, 12, 2, 3, SKIN); [11, 14, 17].forEach(y => t.r(12, y - 4, 1, 1, '#ffffff')); });
  I('car_ramp', t => { for (let i = 0; i < 18; i++) t.r(3 + i, Math.round(4 + Math.pow(i / 17, 2) * 16), 2, 24, '#a87b46'); t.r(9, 6, 9, 4, '#e8505b'); t.r(11, 4, 5, 3, '#e8505b'); t.r(12, 5, 3, 1, '#9fd8ff'); t.disk(11, 11, 1, '#2b2b33'); t.disk(16, 11, 1, '#2b2b33'); });
  I('bee', t => { t.ell(12, 14, 8, 6, '#ffd23f'); [9, 13, 17].forEach(x => t.r(x, 9, 2, 11, INK)); t.ell(9, 6, 4, 3, '#e6f6ff'); t.ell(15, 6, 4, 3, '#e6f6ff'); t.p(4, 13, INK); t.tri(20, 13, 23, 14, 20, 15, INK); });
  const plate = (t, cy) => { t.ell(12, cy, 11, 5, '#5aa0f0'); t.clearEll(12, cy - 3, 10, 5); t.r(3, cy + 1, 18, 1, '#9fd0ff'); };
  I('plate_egg', t => { plate(t, 7); t.ell(12, 18, 5, 5, '#fff4dc'); t.ell(11, 16, 2, 2, '#ffffff'); t.ell(14, 20, 2, 1, '#e8d6b0'); });
  I('plate_apples', t => { t.disk(7, 6, 4, '#d63131'); t.disk(17, 6, 4, '#d63131'); t.r(7, 1, 1, 2, '#6b4f2a'); t.r(17, 1, 1, 2, '#6b4f2a'); t.ell(8, 1, 1, 0, '#3d9a2c'); t.p(6, 5, '#ff8a8a'); t.p(16, 5, '#ff8a8a'); plate(t, 17); });
  I('bowl_star', t => { t.tri(12, 1, 8, 9, 16, 9, '#ffd23f'); t.tri(12, 11, 7, 4, 17, 4, '#ffd23f'); for (let x = 2; x < 22; x++) { const y = Math.round(22 - Math.sqrt(Math.max(0, 100 - (x - 12) * (x - 12)))); t.r(x, y, 1, 3, '#2f7fd6'); } });
  I('snake', t => { for (let i = 0; i < 18; i++) { const x = 2 + i, y = 14 + Math.round(Math.sin(i / 2.4) * 4); t.r(x, y, 2, 4, '#3c8527'); t.p(x, y + 1, '#7cc95e'); } t.disk(20, 12, 3, '#3c8527'); t.p(21, 11, INK); t.r(23, 13, 1, 1, '#e8505b'); t.p(23, 12, '#e8505b'); });
  I('face_tongue', t => faceT(t, { mouth: 'tongue' }));
  I('face_shh', t => { faceT(t, { mouth: 'o', eyes: 'closed' }); t.r(10, 11, 4, 13, '#d99a6c'); t.r(10, 11, 4, 2, '#f6d0ac'); t.r(9, 11, 1, 13, '#8a5a3a'); t.r(14, 11, 1, 13, '#8a5a3a'); [[17, 13], [19, 15], [17, 17]].forEach(([x, y]) => t.r(x, y, 3, 1, '#2f7fd6')); });
  I('face_hot', t => { faceT(t, { mouth: 'open', cy: 14 }); [[8, 1], [12, 0], [16, 2]].forEach(([x, y]) => { t.r(x, y + 1, 1, 2, '#c9d9ea'); t.r(x + 1, y + 3, 1, 1, '#c9d9ea'); }); t.r(5, 14, 2, 2, '#ff5a5a'); t.r(17, 14, 2, 2, '#ff5a5a'); });
  I('face_snore', t => { faceT(t, { mouth: 'open', eyes: 'closed', cy: 13 }); t.r(17, 0, 4, 1, '#2f7fd6'); t.p(19, 1, '#2f7fd6'); t.p(18, 2, '#2f7fd6'); t.r(17, 3, 4, 1, '#2f7fd6'); });
  I('face_cough', t => { faceT(t, { mouth: 'open', eyes: 'closed' }); t.r(9, 15, 7, 6, SKIN); t.r(9, 17, 7, 1, '#e0a57a'); t.disk(20, 17, 2, '#d8dde3'); t.disk(22, 13, 1, '#d8dde3'); });
  I('face_pant', t => { faceT(t, { mouth: 'tongue' }); t.r(3, 6, 1, 3, '#5aa7f0'); t.r(20, 5, 1, 3, '#5aa7f0'); t.r(21, 10, 1, 2, '#5aa7f0'); });
  I('face_gargle', t => { faceT(t, { mouth: 'o', eyes: 'up', cy: 14 }); [[9, 3], [13, 1], [15, 5], [11, 6]].forEach(([x, y]) => t.disk(x, y, 1, '#9fd0ff')); });
  I('face_throat', t => { faceT(t, { mouth: 'open', cy: 9 }); t.r(9, 18, 6, 4, SKIN); t.r(3, 21, 18, 3, '#4f9ad8'); t.r(3, 17, 9, 4, '#d99a6c'); [5, 7, 9].forEach(x => t.r(x, 17, 1, 4, '#a8704a')); t.r(12, 18, 2, 2, '#d99a6c'); t.r(16, 15, 1, 2, '#2f7fd6'); t.r(18, 16, 1, 2, '#2f7fd6'); });
  I('face_chin', t => { faceT(t, { mouth: 'smile', cy: 10 }); t.r(3, 18, 8, 5, SKIN); t.r(13, 18, 8, 5, SKIN); t.r(3, 18, 8, 1, '#e0a57a'); t.r(13, 18, 8, 1, '#e0a57a'); });
  I('kid_belly', t => { t.disk(12, 5, 4, SKIN); t.r(8, 1, 8, 2, HAIR); t.r(7, 10, 10, 9, '#4f9ad8'); t.r(9, 19, 2, 4, '#3b4466'); t.r(13, 19, 2, 4, '#3b4466'); t.r(4, 13, 6, 3, SKIN); t.disk(13, 15, 1, INK); });
  I('blow', t => { t.disk(8, 11, 7, SKIN); t.r(2, 4, 12, 3, HAIR); t.p(9, 9, INK); t.disk(13, 14, 2, '#f29b9b'); t.disk(15, 13, 1, LIP); [[17, 11], [18, 13], [17, 15]].forEach(([x, y]) => t.r(x, y, 2, 1, '#9fd0ff')); t.r(20, 14, 3, 9, '#f4f1e6'); t.tri(22, 8, 21, 13, 23, 13, '#ffb21f'); });
  I('whistle', t => { t.disk(9, 14, 7, '#c9d0d8'); t.disk(9, 14, 3, '#7d8a99'); t.r(13, 9, 9, 5, '#c9d0d8'); t.r(18, 7, 3, 2, '#7d8a99'); [[2, 4], [5, 2], [9, 3]].forEach(([x, y]) => t.line(x, y + 3, x + 1, y, '#2f7fd6')); });
  I('drum', t => { t.ell(12, 13, 9, 3, '#f4f1e6'); t.r(3, 13, 19, 9, '#d63c3c'); t.ell(12, 22, 9, 2, '#a52a2a'); for (let x = 4; x < 21; x += 4) t.line(x, 14, x + 2, 21, '#ffd23f'); t.r(11, 0, 2, 12, '#8a5a2b'); t.disk(12, 0, 1, '#f4f1e6'); });
  I('lollipop', t => { t.disk(12, 8, 7, '#ff6fa8'); t.disk(12, 8, 4, '#ffffff'); t.disk(12, 8, 2, '#ff6fa8'); t.r(11, 15, 2, 9, '#f4f1e6'); });
  I('loop', t => { t.line(8, 1, 8, 15, '#2f7fd6'); t.line(9, 1, 9, 15, '#2f7fd6'); for (let i = 0; i <= 20; i++) { const a = Math.PI * i / 20; t.r(Math.round(13 - Math.cos(a) * 5), Math.round(15 + Math.sin(a) * 5), 2, 2, '#2f7fd6'); } t.tri(17, 13, 19, 9, 21, 13, '#2f7fd6'); });
  PX.IC = IC;
  const icCache = {};
  PX.iconCanvas = function (name) {
    if (icCache[name]) return icCache[name];
    const [c, g] = mk(24, 24); const fn = IC[name];
    if (fn) { fn(T(g)); autoOutline(c); }
    return (icCache[name] = c);
  };
  PX.iconURL = n => PX.iconCanvas(n).toDataURL();

  /* مؤثرات صغيرة فوق الشخصية */
  const FX = {
    motion: (g, x, y) => { R(g, x - 6, y + 6, 4, 1, '#ffffff'); R(g, x - 7, y + 9, 5, 1, '#ffffff'); R(g, x - 5, y + 12, 3, 1, '#ffffff'); },
    joy: (g, x, y) => { [[x - 3, y - 2, '#ffd23f'], [x + 12, y - 3, '#ff8fc7'], [x + 5, y - 7, '#ffd23f']].forEach(([a, b, c]) => { R(g, a, b + 1, 3, 1, c); R(g, a + 1, b, 1, 3, c); }); },
    sound: (g, x, y) => { for (let i = 0; i < 3; i++) { R(g, x + 14 + i * 3, y + 3 - i, 1, 4 + i * 2, '#2f7fd6'); } },
    laugh: (g, x, y) => { R(g, x + 12, y - 8, 12, 8, O); R(g, x + 13, y - 7, 10, 6, '#ffffff'); R(g, x + 15, y - 5, 2, 1, '#1b1420'); R(g, x + 19, y - 5, 2, 1, '#1b1420'); R(g, x + 15, y - 3, 6, 1, '#e8505b'); },
    sweat: (g, x, y) => { R(g, x - 2, y + 2, 1, 2, '#5aa7f0'); R(g, x + 13, y + 1, 1, 2, '#5aa7f0'); R(g, x + 14, y + 5, 1, 2, '#5aa7f0'); },
    tear: (g, x, y) => { R(g, x + 9, y + 7, 1, 3, '#5aa7f0'); },
    anger: (g, x, y) => { const c = '#e03131'; R(g, x + 12, y - 2, 1, 2, c); R(g, x + 13, y - 3, 2, 1, c); R(g, x + 15, y - 2, 1, 2, c); R(g, x + 13, y, 2, 1, c); R(g, x + 3, y - 5, 1, 3, '#ffffff'); R(g, x + 7, y - 6, 1, 3, '#ffffff'); },
    idea: (g, x, y) => { R(g, x + 3, y - 9, 6, 6, O); R(g, x + 4, y - 8, 4, 4, '#ffe066'); R(g, x + 5, y - 3, 2, 2, '#9aa0a6'); },
    zzz: (g, x, y) => { R(g, x + 12, y - 6, 4, 1, '#ffffff'); R(g, x + 14, y - 5, 1, 1, '#ffffff'); R(g, x + 13, y - 4, 1, 1, '#ffffff'); R(g, x + 12, y - 3, 4, 1, '#ffffff'); R(g, x + 17, y - 10, 3, 1, '#ffffff'); R(g, x + 18, y - 9, 1, 1, '#ffffff'); R(g, x + 17, y - 8, 3, 1, '#ffffff'); },
    talk: (g, x, y) => { R(g, x + 12, y - 7, 11, 7, O); R(g, x + 13, y - 6, 9, 5, '#ffffff'); R(g, x + 12, y, 2, 2, O); R(g, x + 15, y - 4, 1, 1, '#1b1420'); R(g, x + 17, y - 4, 1, 1, '#1b1420'); R(g, x + 19, y - 4, 1, 1, '#1b1420'); },
    call: (g, x, y) => { R(g, x + 12, y + 4, 3, 3, '#e8505b'); R(g, x + 15, y + 3, 2, 5, '#e8505b'); for (let i = 0; i < 3; i++) R(g, x + 19 + i * 2, y + 2 - i, 1, 6 + i * 2, '#e8505b'); },
    love: (g, x, y) => { R(g, x + 12, y - 6, 2, 2, '#e8505b'); R(g, x + 15, y - 6, 2, 2, '#e8505b'); R(g, x + 12, y - 4, 5, 2, '#e8505b'); R(g, x + 13, y - 2, 3, 1, '#e8505b'); R(g, x + 14, y - 1, 1, 1, '#e8505b'); },
  };
  PX.FX = FX;

  /* مشهد عام: خلفية + شخصية + شيء + مؤثر */
  function bgOf(g, bg) {
    if (bg === 'room') indoor(g);
    else if (bg === 'night') { R(g, 0, 0, SW, 28, '#1f2a5a'); [[6, 4], [20, 8], [33, 3], [45, 9], [51, 5], [12, 12]].forEach(([x, y]) => R(g, x, y, 1, 1, '#ffffff')); R(g, 0, 28, SW, 8, '#2f4a2a'); }
    else if (bg === 'sea') { outdoor(g, 20); fillTex(g, 'water', 0, 22, SW, 14); }
    else if (bg === 'mosque') { R(g, 0, 0, SW, 27, '#f3ead6'); R(g, 22, 3, 12, 16, '#2f8a5b'); R(g, 25, 5, 6, 12, '#bfe6c9'); R(g, 0, 27, SW, 9, '#c8b48a'); R(g, 2, 27, 52, 3, '#2f8a5b'); }
    else outdoor(g);
  }
  PX.composeURL = function (spec, heroName) {
    const H = PX.HEROES[heroName] || PX.HEROES.boy;
    const key = JSON.stringify(spec) + heroName;
    if (sceneCache[key]) return sceneCache[key];
    const [c, g] = mk(SW, SH);
    bgOf(g, spec.bg);
    const gy = spec.bg === 'room' ? 27 : spec.bg === 'sea' ? 22 : 28;
    if (spec.k) {
      const kx = spec.o ? 8 : 22, ky = gy - 16 + (spec.k === 'sit' ? 0 : 0);
      if (spec.k !== 'sit') R(g, kx + 1, gy, 10, 1, 'rgba(0,0,0,.25)');
      PX.kid(g, H, spec.k, kx, ky, false);
      if (spec.fx && FX[spec.fx]) FX[spec.fx](g, kx, ky);
    }
    if (spec.o) {
      const ic = PX.iconCanvas(spec.o), s = spec.k ? 1 : (spec.big === false ? 1 : 1), w = 24 * s;
      const x = spec.k ? 28 : Math.round((SW - w) / 2), y = spec.oy !== undefined ? spec.oy : gy - w + 2;
      g.drawImage(ic, x, y, w, w);
      if (spec.o2) g.drawImage(PX.iconCanvas(spec.o2), x - 26, y, 24, 24);
    }
    if (!spec.k && spec.fx && FX[spec.fx]) FX[spec.fx](g, 16, 10);
    outline(g, 0, 0, SW, SH);
    return (sceneCache[key] = c.toDataURL());
  };
  PX.picURL = function (spec, hero) { return typeof spec === 'string' ? PX.sceneURL(spec, hero) : PX.composeURL(spec, hero); };
  PX.objURL = function (k) {
    const o = OBJ[k]; if (!o) return '';
    const rows = o[0], w = Math.max(...rows.map(r => r.length));
    const [c, g] = mk(w, rows.length);
    PX.draw(g, rows, Object.assign({ o: O }, o[1]), 0, 0, false);
    return c.toDataURL();
  };
})();
