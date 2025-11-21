document.addEventListener("DOMContentLoaded", () => {
  const schedule = [
    {
      day: "Perjantai 14.11",
      label: "Kickoff ja tiimiytyminen",
      events: [
        { time: "16:00", title: "Ovet auki & ilmoittautuminen alkaa" },
        {
          time: "18:00–19:00",
          title: "Aloitusseremonia & keynote",
        },
        { time: "19:00–21:00", title: "Tiimiytyminen" },
        { time: "23:59", title: "Alustava palautus" },
      ],
    },
    {
      day: "Lauantai 15.11",
      label: "Täysi koodauspäivä",
      events: [
        {
          time: "00:00–23:59",
          title: "Hacking",
          type: "Hacking",
          highlight: true,
        },
      ],
    },
    {
      day: "Sunnuntai 16.11",
      label: "Pitchaukset ja tulokset",
      events: [
        { time: "10:00", title: "Lopullinen palautus" },
        { time: "10:00–14:00", title: "Projektien arviointi" },
        {
          time: "14:30–15:30",
          title: "Voittajien pitchaukset top 5",
        },
        { time: "15:30–16:00", title: "Tuomarien puheenvuoro" },
        { time: "15:30–17:00", title: "Päätösseremonia" },
        { time: "18:00", title: "Tapahtuma sulkeutuu" },
      ],
    },
  ];

  const container = document.getElementById("timeline");
  const prevBtn = document.getElementById("timeline-prev");
  const nextBtn = document.getElementById("timeline-next");
  const stepLabel = document.getElementById("timeline-step");

  if (!container || !prevBtn || !nextBtn || !stepLabel) return;

  // tasainen lista steppejä (päivä + event)
  const steps = [];
  schedule.forEach((dayBlock) => {
    dayBlock.events.forEach((event) => {
      steps.push({
        day: dayBlock.day,
        label: dayBlock.label,
        time: event.time,
        title: event.title,
        type: event.type,
        highlight: event.highlight,
      });
    });
  });

  let currentIndex = 0; // mihin asti on paljastettu

  function updateControls(focusIndex) {
    stepLabel.textContent = `${focusIndex + 1} / ${steps.length}`;
    prevBtn.disabled = focusIndex === 0;
    nextBtn.disabled = focusIndex >= steps.length - 1;
  }

  function appendCard(index) {
    const step = steps[index];

    // jos ei eka, lisää kolmen palluran connector
    if (index > 0) {
      const connector = document.createElement("div");
      connector.className = "timeline-connector";
      connector.innerHTML = "<span></span><span></span><span></span>";
      container.appendChild(connector);
    }

    const card = document.createElement("article");
    card.className = "timeline-card";
    if (step.highlight) {
      card.classList.add("timeline-card--highlight");
    }

    card.innerHTML = `
      <header class="timeline-card_header">
        <h3>${step.day}</h3>
        <small>${step.label}</small>
      </header>
      <div class="timeline-card_body">
        <div class="timeline-card_time">${step.time}</div>
        <div class="timeline-card_title">${step.title}</div>
        ${
          step.type
            ? `<div class="timeline-card_type">${step.type}</div>`
            : ""
        }
      </div>
    `;

    container.appendChild(card);

    // scrollataan uusin kortti näkyviin
    card.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // aloitus: näytä eka card
  appendCard(0);
  updateControls(0);

  // Seuraava: luodaan uusi kortti, jos ei vielä olemassa
  nextBtn.addEventListener("click", () => {
    if (currentIndex >= steps.length - 1) return;
    currentIndex += 1;
    appendCard(currentIndex);
    updateControls(currentIndex);
  });

  // Edellinen: ei poista mitään, vaan scrollaa edelliseen korttiin
  prevBtn.addEventListener("click", () => {
    if (currentIndex <= 0) return;
    currentIndex -= 1;
    const cards = container.querySelectorAll(".timeline-card");
    const targetCard = cards[currentIndex];
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    updateControls(currentIndex);
  });
});
