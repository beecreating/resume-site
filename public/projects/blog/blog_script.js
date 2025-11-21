const stats = document.querySelectorAll(".stat");

stats.forEach(stat => {
  const update = () => {
    const target = +stat.getAttribute("data-target");
    const current = +stat.innerText;
    const increment = target / 40;

    if (current < target) {
      stat.innerText = `${Math.ceil(current + increment)}`;
      setTimeout(update, 40);
    } else {
      stat.innerText = target;
    }
  };

  setTimeout(() => {
    stat.classList.add("active");
    update();
  }, 300);
});
