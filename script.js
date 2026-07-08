// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
document.addEventListener('mousemove', e => {
  cursor.style.left = (e.clientX - 5) + 'px';
  cursor.style.top = (e.clientY - 5) + 'px';
  ring.style.left = (e.clientX - 18) + 'px';
  ring.style.top = (e.clientY - 18) + 'px';
});

// Live sensor terminal
const LINES = [
  { d: 0,    c: 't-system', t: '[INIT]     Connexion ESP32 établie — bergerie_01' },
  { d: 700,  c: 't-ok',     t: '[14:22:03] temp=27.6°C  hum=61%  amm=480ppm' },
  { d: 1300, c: 't-ok',     t: '[14:22:33] water=72%  tds=320ppm  ec=0.64' },
  { d: 1900, c: 't-ok',     t: '[14:23:03] temp=27.9°C  hum=62%  amm=482ppm' },
  { d: 2500, c: 't-warn',   t: '[14:23:33] ⚠  water=28% — seuil critique: 30%' },
  { d: 3100, c: 't-ok',     t: '[14:24:03] temp=28.2°C  hum=61%  amm=488ppm' },
  { d: 3700, c: 't-alert',  t: '[14:24:33] 🔴 ALERTE: water=18% < seuil 20%' },
  { d: 4100, c: 't-system', t: '[FIREBASE]  Push notification → tel éleveur' },
  { d: 4600, c: 't-arabic', t: 'مستوى الماء منخفض — راجع الخزان' },
  { d: 5300, c: 't-ok',     t: "[14:26:11] ✓  Éleveur a ouvert l'application" },
  { d: 5900, c: 't-system', t: '[CMD]      Reçu: pump=ON' },
  { d: 6500, c: 't-ok',     t: '[14:29:01] ✓  Pompe activée — niveau monte' },
  { d: 7300, c: 't-ok',     t: '[14:35:00] water=45% — situation stable ✓' },
  { d: 8100, c: 't-system', t: 'Prochain cycle dans 30 secondes...' },
];

function runTerminal() {
  const tb = document.getElementById('terminal');
  tb.innerHTML = '';
  LINES.forEach(l => setTimeout(() => {
    const el = document.createElement('div');
    el.className = 't-line';
    if (l.c === 't-arabic') {
      el.style.direction = 'rtl';
      el.innerHTML = `<span class="${l.c}">${l.t}</span>`;
    } else {
      el.innerHTML = `<span class="t-time">›</span><span class="${l.c}">${l.t}</span>`;
    }
    tb.appendChild(el);
    tb.scrollTop = tb.scrollHeight;
  }, l.d));
}
runTerminal();
setInterval(runTerminal, 12000);

// Story nav scroll spy
const navItems = document.querySelectorAll('.story-nav-item');
document.querySelectorAll('.chapter').forEach(c => {
  new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) {
      navItems.forEach(n => n.classList.remove('active'));
      const a = document.querySelector(`.story-nav-item[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  }), { threshold: .4 }).observe(c);
});

// Market bars animate on scroll
document.querySelectorAll('.mb-fill').forEach(f => {
  const w = f.dataset.w;
  f.style.width = '0';
  new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) setTimeout(() => { f.style.width = w + '%'; }, 100);
  }), { threshold: .5 }).observe(f);
});
