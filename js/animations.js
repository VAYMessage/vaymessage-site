// reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('active');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// background motion
const bg = document.querySelector('.background');
if (bg) {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / innerWidth - 0.5) * 30;
    const y = (e.clientY / innerHeight - 0.5) * 30;
    bg.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
  });
}

// emergency mode
const emergencyBtn = document.getElementById('emergencyBtn');

if (emergencyBtn) {
  emergencyBtn.onclick = () => {
    document.body.classList.toggle('emergency');
    localStorage.setItem(
      'vay_emergency',
      document.body.classList.contains('emergency')
    );
  };
}

if (localStorage.getItem('vay_emergency') === 'true') {
  document.body.classList.add('emergency');
}
// VAY AI
const aiBtn = document.querySelector('.vay-ai-btn');
const aiPanel = document.querySelector('.vay-ai-panel');

if (aiBtn && aiPanel) {
  aiBtn.onclick = () => {
    aiPanel.classList.toggle('active');
  };
}
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('active');
  });
});

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
