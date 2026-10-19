
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const popup = $("#popup");
let buttonsFound = 0;
let currentFabric = "🎀";

function showPopup(title, message, emoji = "🎀") {
  $("#popupTitle").textContent = title;
  $("#popupMessage").textContent = message;
  $("#popupEmoji").textContent = emoji;
  popup.classList.add("show");
}

function closePopup() {
  popup.classList.remove("show");
}

$("#closePopup").addEventListener("click", closePopup);
$("#popupOK").addEventListener("click", closePopup);

popup.addEventListener("click", (event) => {
  if (event.target === popup) closePopup();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePopup();
});

// NAVIGASI ANTAR HALAMAN
function openPage(pageId) {
  const destination = document.getElementById(pageId);

  if (!destination || !destination.classList.contains("screen")) {
    showPopup("Oopsie!", "page nya ilang :(", "🧵");
    return;
  }

  $$(".screen").forEach((page) => {
    page.classList.remove("active");
  });

  destination.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

$$("[data-page]").forEach((button) => {
  button.addEventListener("click", () => {
    openPage(button.dataset.page);
  });
});

// BUKA RAHASIA BONEKA
$$(".doll").forEach((doll) => {
  doll.addEventListener("click", () => {
    const name = doll.dataset.doll;
    const secret = doll.dataset.secret;

    $("#dollSecret").innerHTML = `
      <span>💖</span>
      <h3>Hello, ${name}!</h3>
      <p>${secret}</p>
      <p>♡ dibuat oleehh cintanya uyaa ♡</p>
    `;

    doll.style.transform = "scale(.95) rotate(3deg)";

    setTimeout(() => {
      doll.style.transform = "";
    }, 200);
  });
});

// PILIH DEKORASI
$$("[data-fabric]").forEach((button) => {
  button.addEventListener("click", () => {
    currentFabric = button.dataset.fabric;
    $("#fabricPreview").textContent = currentFabric;

    const colors = [
      "#f6a5ce",
      "#ffd2df",
      "#b9e8ff",
      "#ffe99a",
      "#c8efad",
      "#dfc9ff"
    ];

    const color = colors[
      $$("[data-fabric]").indexOf(button)
    ];

    $("#fabricPreview").style.backgroundColor = color;

    showPopup(
      "Cute choice!",
      "Your little creation is getting prettier!",
      currentFabric
    );
  });
});

// NAMAI HASIL KARYA
$("#makeBtn").addEventListener("click", () => {
  const input = $("#craftInput").value.trim();
  const name = input || "My Little Creation";

  $("#craftName").textContent = name;
  $("#craftResult").textContent =
    `Finished! ${name} is ready for the dollhouse ${currentFabric}`;

  showPopup(
    "Masterpiece complete!",
    `${name} has been sewn with love. ♡`,
    currentFabric
  );
});

// TAMAN HARTA KARUN
$$(".flower").forEach((flower) => {
  flower.addEventListener("click", () => {
    if (flower.classList.contains("found")) {
      showPopup("yay ketemu!", "dis flower has shared its secret!", "🌼");
      return;
    }

    flower.classList.add("found");
    flower.textContent = "🧵";
    buttonsFound++;

    $("#score").textContent = buttonsFound;

    showPopup(
      "u found harta harta karun",
      `wippie treasure collected: ${buttonsFound}/9`,
      "🪡"
    );

    if (buttonsFound === 9) {
      setTimeout(() => {
        showPopup(
          "Garden complete!",
          "u found the treasure! sewing superstar!",
          "🏆"
        );
      }, 300);
    }
  });
});

// RESET TAMAN
$("#resetGarden").addEventListener("click", () => {
  buttonsFound = 0;
  $("#score").textContent = "0";

  $$(".flower").forEach((flower) => {
    flower.classList.remove("found");
    flower.textContent = ["🌷", "🌼", "🌸", "🌻", "🌺"][
      Math.floor(Math.random() * 5)
    ];
  });

  showPopup("fresh new garden!", "cari harta karun lagiee!", "🌱");
});

// DIARY
$("#saveDiary").addEventListener("click", () => {
  const text = $("#diaryText").value.trim();

  if (!text) {
    showPopup(
      "blank little letter!",
      "tulis ur dream before folding your letter.",
      "💌"
    );
    return;
  }

  $("#diaryResult").textContent =
    "ur letter has been folded with love. ♡";

  showPopup(
    "Letter folded!",
    "ur little words are safe here until you leave this page.",
    "💗"
  );
});

// JAM
function updateClock() {
  const now = new Date();

  $("#clock").textContent =
    "MAGIC TIME: " +
    now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit"
    });
}

updateClock();
setInterval(updateClock, 1000);

// EFEK KAIN BERGERAK SAAT DIKLIK
$("#home").addEventListener("click", (event) => {
  if (event.target.closest("button")) return;

  const patch = $(".title-patch");
  patch.animate(
    [
      { transform: "rotate(-2deg) scale(1)" },
      { transform: "rotate(2deg) scale(1.04)" },
      { transform: "rotate(-2deg) scale(1)" }
    ],
    { duration: 450, easing: "ease-in-out" }
  );
});

// KONFETI BENANG DAN KANCING
function burstConfetti() {
  const decorations = ["🎀", "🧵", "🌸", "💗", "🧶", "🧸", "✂️"];

  for (let i = 0; i < 24; i++) {
    const item = document.createElement("span");

    item.textContent =
      decorations[Math.floor(Math.random() * decorations.length)];

    item.style.position = "fixed";
    item.style.left = Math.random() * 100 + "vw";
    item.style.top = "-40px";
    item.style.zIndex = "200";
    item.style.pointerEvents = "none";
    item.style.fontSize = 20 + Math.random() * 20 + "px";

    document.body.appendChild(item);

    const x = (Math.random() - 0.5) * 250;
    const rotation = Math.random() * 720 - 360;

    const animation = item.animate(
      [
        { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(${x}px, 110vh) rotate(${rotation}deg)`,
          opacity: 0.2
        }
      ],
      {
        duration: 1800 + Math.random() * 1800,
        easing: "ease-in"
      }
    );

    animation.onfinish = () => item.remove();
  }
}

$("#makeBtn").addEventListener("dblclick", burstConfetti);

$("#home").addEventListener("dblclick", (event) => {
  if (event.target.closest("button")) return;
  burstConfetti();
});

/* ==================================
   LITTLE THINGS FACTORY INTERACTIONS
================================== */

// Klik boneka di conveyor yang terus bergerak
document.querySelectorAll(".factory-doll").forEach((doll) => {
  doll.addEventListener("click", () => {
    showPopup(
      "Little factory friend!",
      doll.dataset.factory,
      doll.textContent.trim()
    );
  });
});

// Mesin jahit bergerak ketika tombol ditekan
const machine = document.querySelector(".machine");
const sewButton = document.querySelector("#sewButton");
const sewingEmoji = document.querySelector("#sewingEmoji");
const sewingMessage = document.querySelector("#sewingMessage");

let sewing = false;
let threadIndex = 0;

const threadColors = [
  { emoji: "🎀", color: "#ffacd0" },
  { emoji: "🌸", color: "#ffd6e7" },
  { emoji: "🦋", color: "#a7eaff" },
  { emoji: "🍋", color: "#ffe68a" },
  { emoji: "🍀", color: "#b9ec9c" },
  { emoji: "💜", color: "#d8baff" }
];

sewButton.addEventListener("click", () => {
  if (sewing) return;

  sewing = true;
  machine.classList.add("sewing");
  sewButton.textContent = "SEWING... 🪡";
  sewingMessage.textContent = "Stitch stitch stitch! ✨";

  sewingEmoji.animate(
    [
      { transform: "scale(1) rotate(0deg)" },
      { transform: "scale(1.35) rotate(15deg)" },
      { transform: "scale(.9) rotate(-15deg)" },
      { transform: "scale(1) rotate(0deg)" }
    ],
    { duration: 700, iterations: 3 }
  );

  setTimeout(() => {
    sewing = false;
    machine.classList.remove("sewing");
    sewButton.textContent = "SEW IT! ✨";
    sewingMessage.textContent = "Your little creation is ready! ♡";

    showPopup(
      "Sew magical!",
      "A tiny masterpiece has been made with love!",
      sewingEmoji.textContent
    );

    if (typeof burstConfetti === "function") {
      burstConfetti();
    }
  }, 2100);
});

// Mengganti benang
document.querySelector("#threadButton").addEventListener("click", () => {
  threadIndex = (threadIndex + 1) % threadColors.length;

  const thread = threadColors[threadIndex];

  sewingEmoji.textContent = thread.emoji;
  document.querySelector(".machine-bed").style.backgroundColor =
    thread.color;

  sewingMessage.textContent = "New thread, new little dreams!";

  showPopup("Thread changed!", "Look at your new color!", thread.emoji);
});

// Memilih kain
document.querySelectorAll(".fabric-swatch").forEach((swatch) => {
  swatch.addEventListener("click", () => {
    const color = swatch.dataset.swatch;
    const name = swatch.textContent.replace(/[♡✿☁☆❀]/g, "").trim();

    const box = document.querySelector("#fabricBox");
    box.style.backgroundColor = color;
    document.querySelector("#fabricLabel").textContent =
      name + " FABRIC ♡";

    document.querySelector("#fabricFlower").animate(
      [
        { transform: "scale(.5) rotate(-20deg)" },
        { transform: "scale(1.25) rotate(10deg)" },
        { transform: "scale(1) rotate(0)" }
      ],
      { duration: 450, easing: "ease-out" }
    );

    showPopup(
      "Pretty fabric!",
      `You picked the ${name.toLowerCase()} fabric!`,
      "🧵"
    );
  });
});

// Harapan kecil yang acak
const wishes = [
  "A little surprise will find you soon. 🎀",
  "May your days be filled with tiny flowers. 🌷",
  "Someone is cheering for you today. 💗",
  "Your next dream deserves a chance. ⭐",
  "May you always find magic in little things. 🧸",
  "A soft day and a happy heart await you. ☁️",
  "You are allowed to grow at your own pace. 🌱",
  "Something lovely can begin with one small step. 🦋",
  "May your world stay colorful and kind. 🌈"
];

let previousWish = -1;

document.querySelector("#wishButton").addEventListener("click", () => {
  let index;

  do {
    index = Math.floor(Math.random() * wishes.length);
  } while (index === previousWish && wishes.length > 1);

  previousWish = index;

  const result = document.querySelector("#wishResult");
  result.textContent = wishes[index];

  result.animate(
    [
      { opacity: 0, transform: "translateY(10px) scale(.9)" },
      { opacity: 1, transform: "translateY(0) scale(1)" }
    ],
    { duration: 450 }
  );

  if (typeof burstConfetti === "function") {
    burstConfetti();
  }
});

// Kembali ke bagian awal workshop
document.querySelector("#backToFactory").addEventListener("click", () => {
  document.querySelector(".game").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  showPopup(
    "Welcome back!",
    "The little workshop is always waiting for you!",
    "🎀"
  );
});

/* ୨୧ my tiny dress-up game ୨୧ */

(() => {
  const $ = (id) => document.getElementById(id);

  const wardrobe = {
    hair: [
      { emoji: "🎀", name: "pink ribbon", color: "#b36e54" },
      { emoji: "🌸", name: "flower hair", color: "#e8a3a9" },
      { emoji: "🧸", name: "teddy hair", color: "#986448" },
      { emoji: "💗", name: "sweet curls", color: "#c78268" },
      { emoji: "🦋", name: "butterfly hair", color: "#795caa" },
      { emoji: "🍓", name: "berry hair", color: "#ad504e" },
      { emoji: "☁️", name: "cloud hair", color: "#d8b5c6" },
      { emoji: "👑", name: "princess hair", color: "#d7a447" }
    ],

    dress: [
      { emoji: "👗", name: "pink princess", color: "#ffadd0" },
      { emoji: "👘", name: "sakura kimono", color: "#f3a6cb" },
      { emoji: "🎀", name: "ribbon dress", color: "#d9a5f6" },
      { emoji: "🌷", name: "flower dress", color: "#b9e7a0" },
      { emoji: "🩰", name: "ballerina", color: "#ffd4e8" },
      { emoji: "🧚", name: "fairy dress", color: "#b8eaff" },
      { emoji: "🍓", name: "berry dress", color: "#ff929c" },
      { emoji: "🐑", name: "fluffy dress", color: "#fff0bd" }
    ],

    shoes: [
      { emoji: "👠", name: "princess heels" },
      { emoji: "👢", name: "little boots" },
      { emoji: "🩰", name: "ballet shoes" },
      { emoji: "👟", name: "play shoes" },
      { emoji: "🥿", name: "sweet flats" },
      { emoji: "✨", name: "magic shoes" },
      { emoji: "💗", name: "heart shoes" },
      { emoji: "🌸", name: "flower shoes" }
    ],

    accessory: [
      { emoji: "👜", name: "tiny handbag" },
      { emoji: "🧸", name: "teddy friend" },
      { emoji: "🌷", name: "flower bouquet" },
      { emoji: "💌", name: "love letter" },
      { emoji: "🎀", name: "extra ribbon" },
      { emoji: "🪄", name: "magic wand" },
      { emoji: "🐰", name: "bunny friend" },
      { emoji: "🍓", name: "berry basket" }
    ],

    face: [
      { emoji: "•ᴗ•", name: "happy smile" },
      { emoji: "˶ᵔ ᵕ ᵔ˶", name: "shy smile" },
      { emoji: "◕‿◕", name: "sunny smile" },
      { emoji: "˶˃ ᵕ ˂˶", name: "excited face" },
      { emoji: "♡‿♡", name: "love eyes" },
      { emoji: "•̀ᴗ•́", name: "brave face" },
      { emoji: "ᵕ̈", name: "soft smile" },
      { emoji: "˘͈ᵕ˘͈", name: "sleepy face" }
    ]
  };

  const defaults = {
    hair: 0,
    dress: 0,
    shoes: 0,
    accessory: 0,
    face: 0
  };

  let outfit = { ...defaults };
  let category = "hair";
  let roomColor = "#ffe0ed";

  function renderOptions() {
    const options = $("duOptions");
    options.replaceChildren();

    wardrobe[category].forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "du-option";

      if (outfit[category] === index) {
        button.classList.add("chosen");
      }

      const emoji = document.createElement("span");
      emoji.className = "item-emoji";
      emoji.textContent = item.emoji;

      const label = document.createElement("small");
      label.textContent = item.name;

      button.append(emoji, label);

      button.addEventListener("click", () => {
        outfit[category] = index;
        updateDoll();
        renderOptions();
        updateMood();

        $("duCaption").textContent =
          `${item.name}... so cute! ♡`;

        const doll = $("duDoll");

        doll.animate(
          [
            { transform: "scale(1) rotate(0)" },
            { transform: "scale(1.08) rotate(-3deg)" },
            { transform: "scale(1) rotate(0)" }
          ],
          { duration: 350 }
        );
      });

      options.appendChild(button);
    });
  }

  function updateDoll() {
    const hair = wardrobe.hair[outfit.hair];
    const dress = wardrobe.dress[outfit.dress];
    const shoes = wardrobe.shoes[outfit.shoes];
    const accessory = wardrobe.accessory[outfit.accessory];
    const face = wardrobe.face[outfit.face];

    $("duHair").textContent = hair.emoji;
    $("duHair").style.backgroundColor = hair.color;

    $("duDress").textContent = dress.emoji;
    $("duDress").style.backgroundColor = dress.color;

    $("duShoes").textContent = shoes.emoji;
    $("duAccessory").textContent = accessory.emoji;
    $("duEyes").textContent = face.emoji;

    $("duStage").style.backgroundColor = roomColor;

    $("duCaption").textContent =
      `${hair.name} + ${dress.name} ♡`;
  }

  function updateMood() {
    const moods = [
      "mood: dreamy ☁️",
      "mood: extra sweet 🍓",
      "mood: princess mode 👑",
      "mood: fairy dust 🧚",
      "mood: love love ♡"
    ];

    const randomMood = moods[
      Math.floor(Math.random() * moods.length)
    ];

    $("duMood").textContent = randomMood;
  }

  document.querySelectorAll(".du-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      category = tab.dataset.category;

      document.querySelectorAll(".du-tab").forEach((item) => {
        item.classList.toggle("selected", item === tab);
      });

      renderOptions();
    });
  });

  document.querySelectorAll("[data-room]").forEach((button) => {
    button.addEventListener("click", () => {
      roomColor = button.dataset.room;
      $("duStage").style.backgroundColor = roomColor;

      $("duStage").animate(
        [
          { opacity: 0.6, transform: "scale(.98)" },
          { opacity: 1, transform: "scale(1)" }
        ],
        { duration: 300 }
      );
    });
  });

  $("duRandom").addEventListener("click", () => {
    Object.keys(wardrobe).forEach((key) => {
      outfit[key] = Math.floor(
        Math.random() * wardrobe[key].length
      );
    });

    updateDoll();
    updateMood();
    renderOptions();

    $("duCaption").textContent = "a surprise outfit for you! ୨୧";

    if (typeof burstConfetti === "function") {
      burstConfetti();
    }
  });

  $("duReset").addEventListener("click", () => {
    outfit = { ...defaults };
    roomColor = "#ffe0ed";

    updateDoll();
    renderOptions();
    updateMood();

    $("duResult").classList.remove("visible");
    $("duCaption").textContent =
      "your little dolly is waiting... ♡";
  });

  $("duFinish").addEventListener("click", () => {
    const hair = wardrobe.hair[outfit.hair];
    const dress = wardrobe.dress[outfit.dress];
    const shoes = wardrobe.shoes[outfit.shoes];
    const accessory = wardrobe.accessory[outfit.accessory];
    const face = wardrobe.face[outfit.face];

    const result = $("duResult");
    result.replaceChildren();

    const title = document.createElement("span");
    title.textContent = "୨୧ outfit complete! ୨୧";

    const description = document.createElement("p");
    description.textContent =
      `hair: ${hair.name} ♡ dress: ${dress.name} ♡ ` +
      `shoes: ${shoes.name} ♡ extra: ${accessory.name} ♡ ` +
      `expression: ${face.name}`;

    const note = document.createElement("p");
    note.textContent =
      "your dolly looks adorable! (˶ᵔ ᵕ ᵔ˶)";

    result.append(title, description, note);
    result.classList.add("visible");

    result.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

    if (typeof burstConfetti === "function") {
      burstConfetti();
    }
  });

  updateDoll();
  renderOptions();
})();
