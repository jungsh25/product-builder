const generateBtn = document.getElementById("generateBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const lineCountSelect = document.getElementById("lineCount");
const result = document.getElementById("result");
const THEME_KEY = "lotto-theme";

const pickOneLine = () => {
  const picks = new Set();
  while (picks.size < 6) {
    picks.add(Math.floor(Math.random() * 45) + 1);
  }
  return [...picks].sort((a, b) => a - b);
};

const colorClassByNumber = (n) => {
  if (n <= 10) return "range-1";
  if (n <= 20) return "range-2";
  if (n <= 30) return "range-3";
  if (n <= 40) return "range-4";
  return "range-5";
};

const renderLines = (lineCount) => {
  const lines = Array.from({ length: lineCount }, pickOneLine);
  result.innerHTML = "";

  lines.forEach((numbers, index) => {
    const lineEl = document.createElement("article");
    lineEl.className = "line";
    lineEl.style.animationDelay = `${index * 80}ms`;

    const label = document.createElement("strong");
    label.textContent = `Line ${index + 1}`;

    const numbersWrap = document.createElement("div");
    numbersWrap.className = "numbers";

    numbers.forEach((number) => {
      const ball = document.createElement("span");
      ball.className = `ball ${colorClassByNumber(number)}`;
      ball.textContent = String(number);
      numbersWrap.appendChild(ball);
    });

    lineEl.append(label, numbersWrap);
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

generateBtn.addEventListener("click", () => {
  renderLines(Number(lineCountSelect.value));
});

applyTheme(getPreferredTheme());
renderLines(Number(lineCountSelect.value));
