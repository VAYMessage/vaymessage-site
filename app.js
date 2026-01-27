const reveals = document.querySelectorAll(".reveal");

function reveal() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
}

reveals.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(40px)";
  el.style.transition = "all .8s ease";
});

window.addEventListener("scroll", reveal);
reveal();
