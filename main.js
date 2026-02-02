const generateBtn = document.getElementById("generateBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const moodSelect = document.getElementById("mood");
const spiceLevelSelect = document.getElementById("spiceLevel");
const result = document.getElementById("result");
const THEME_KEY = "dinner-theme";

const menuPool = [
  { name: "Kimchi Fried Rice", mood: ["quick", "comfort"], spice: "medium", tag: "Korean" },
  { name: "Creamy Mushroom Pasta", mood: ["comfort"], spice: "mild", tag: "Italian" },
  { name: "Chicken Caesar Wrap", mood: ["quick", "fresh"], spice: "mild", tag: "American" },
  { name: "Thai Basil Chicken", mood: ["quick", "hearty"], spice: "hot", tag: "Thai" },
  { name: "Salmon Poke Bowl", mood: ["fresh"], spice: "mild", tag: "Hawaiian" },
  { name: "Mala Tofu Stir Fry", mood: ["hearty"], spice: "hot", tag: "Chinese" },
  { name: "Beef Taco Plate", mood: ["quick", "hearty"], spice: "medium", tag: "Mexican" },
  { name: "Tomato Shakshuka", mood: ["comfort", "fresh"], spice: "medium", tag: "Middle Eastern" },
  { name: "Teriyaki Chicken Rice Bowl", mood: ["quick", "comfort"], spice: "mild", tag: "Japanese" },
  { name: "Spicy Pork Bulgogi", mood: ["hearty", "comfort"], spice: "hot", tag: "Korean" },
  { name: "Shrimp Avocado Salad", mood: ["fresh"], spice: "mild", tag: "Fusion" },
  { name: "Butter Chicken Curry", mood: ["comfort", "hearty"], spice: "medium", tag: "Indian" }
];

const shuffle = (arr) => {
  const copied = [...arr];
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
};

const mapSpiceClass = (spice) => {
  if (spice === "mild") return "range-2";
  if (spice === "medium") return "range-3";
  return "range-1";
};

const filterMenus = (mood, spice) =>
  menuPool.filter((menu) => {
    const moodMatch = mood === "any" || menu.mood.includes(mood);
    const spiceMatch = spice === "any" || menu.spice === spice;
    return moodMatch && spiceMatch;
  });

const renderMenus = () => {
  const mood = moodSelect.value;
  const spice = spiceLevelSelect.value;
  const filtered = filterMenus(mood, spice);
  const recommendations = shuffle(filtered).slice(0, 3);

  result.innerHTML = "";

  if (!recommendations.length) {
    result.innerHTML =
      '<article class="line"><strong>Oops</strong><div class="numbers"><span class="ball range-4">No menu found</span><span class="ball range-5">Try Any mood/spice</span></div></article>';
    return;
  }

  recommendations.forEach((menu, index) => {
    const lineEl = document.createElement("article");
    lineEl.className = "line";
    lineEl.style.animationDelay = `${index * 80}ms`;

    const label = document.createElement("strong");
    label.textContent = `Pick ${index + 1}`;

    const badges = document.createElement("div");
    badges.className = "numbers";

    const main = document.createElement("span");
    main.className = `ball ${mapSpiceClass(menu.spice)}`;
    main.textContent = menu.name;

    const tag = document.createElement("span");
    tag.className = "ball range-4";
    tag.textContent = menu.tag;

    const spiceBadge = document.createElement("span");
    spiceBadge.className = "ball range-5";
    spiceBadge.textContent = `${menu.spice} spice`;

    badges.append(main, tag, spiceBadge);
    lineEl.append(label, badges);
    result.appendChild(lineEl);
  });
};

const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme) => {
  document.body.setAttribute("data-theme", theme);
  themeToggleBtn.textContent = theme === "dark" ? "White Mode" : "Dark Mode";
};

themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.body.getAttribute("data-theme") || "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, nextTheme);
  applyTheme(nextTheme);
});

generateBtn.addEventListener("click", renderMenus);

applyTheme(getPreferredTheme());
renderMenus();
