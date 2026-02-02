const generateBtn = document.getElementById("generateBtn");
const lineCountSelect = document.getElementById("lineCount");
const result = document.getElementById("result");

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

generateBtn.addEventListener("click", () => {
  renderLines(Number(lineCountSelect.value));
});

renderLines(Number(lineCountSelect.value));
