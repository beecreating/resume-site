
document.addEventListener("DOMContentLoaded", () => {
  const stats = document.querySelectorAll("#junction-stats .stat");

  stats.forEach((stat, index) => {
    const numberEl = stat.querySelector(".stat-number");
    const target = Number(stat.getAttribute("data-target")) || 0;

    let current = 0;
    const steps = 40;
    const increment = target / steps;

    // pieni viive per stat, että ne tulevat aaltona
    const delay = 300 + index * 250;

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
  });
});
