document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.getElementById("junction-stats");
  const stats = document.querySelectorAll("#junction-stats .stat");

  if (!statsSection || !stats.length) return;

  let started = false;

  function startStatAnimation(stat, index) {
    const numberEl = stat.querySelector(".stat-number");
    const target = Number(stat.getAttribute("data-target")) || 0;

    let current = 0;
    const steps = 120; // enemmän steppejä → hitaampi ja smoothimpi
    const increment = target / steps;

    // isompi viive aaltoon (drama)
    const delay = 400 + index * 300;

    setTimeout(() => {
      stat.classList.add("active");

      const update = () => {
        if (current < target) {
          current += increment;
          numberEl.textContent = Math.ceil(current);
          requestAnimationFrame(update);
        } else {
          numberEl.textContent = target.toLocaleString("fi-FI");
        }
      };

      update();
    }, delay);
  }

  // Käynnistä animaatiot vasta, kun lukija klikkaa stats-osiota
  statsSection.addEventListener("click", () => {
    if (started) return; // vain kerran
    started = true;

    stats.forEach((stat, index) => {
      startStatAnimation(stat, index);
    });
  });
});
