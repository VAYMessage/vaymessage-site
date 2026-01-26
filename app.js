// Reveal animations
const obs = new IntersectionObserver(e=>{
  e.forEach(x=>x.isIntersecting && x.target.classList.add("show"))
},{threshold:0.15});

document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));

// Load updates
fetch("updates.json")
  .then(r=>r.json())
  .then(data=>{
    const box=document.getElementById("updatesList");
    data.updates.forEach(u=>{
      box.innerHTML+=`
        <div class="glass reveal">
          <b>${u.version}</b> • <span>${u.date}</span>
          <p>${u.text}</p>
        </div>`;
    });
  });
