const generateBtn = document.getElementById("generateBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const languageToggleBtn = document.getElementById("languageToggleBtn");
const moodSelect = document.getElementById("mood");
const spiceLevelSelect = document.getElementById("spiceLevel");
const result = document.getElementById("result");
const partnerForm = document.getElementById("partnerForm");
const partnerStatus = document.getElementById("partnerStatus");

const THEME_KEY = "dinner-theme";
const LANGUAGE_KEY = "dinner-language";

const menuPool = [
  { name: { en: "Kimchi Fried Rice", ko: "김치볶음밥" }, mood: ["quick", "comfort"], spice: "medium", tag: { en: "Korean", ko: "한식" }, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80" },
  { name: { en: "Creamy Mushroom Pasta", ko: "크림 버섯 파스타" }, mood: ["comfort"], spice: "mild", tag: { en: "Italian", ko: "이탈리안" }, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80" },
  { name: { en: "Chicken Caesar Wrap", ko: "치킨 시저 랩" }, mood: ["quick", "fresh"], spice: "mild", tag: { en: "American", ko: "아메리칸" }, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80" },
  { name: { en: "Thai Basil Chicken", ko: "타이 바질 치킨" }, mood: ["quick", "hearty"], spice: "hot", tag: { en: "Thai", ko: "태국식" }, image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&w=1200&q=80" },
  { name: { en: "Salmon Poke Bowl", ko: "연어 포케 볼" }, mood: ["fresh"], spice: "mild", tag: { en: "Hawaiian", ko: "하와이안" }, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80" },
  { name: { en: "Mala Tofu Stir Fry", ko: "마라 두부 볶음" }, mood: ["hearty"], spice: "hot", tag: { en: "Chinese", ko: "중식" }, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80" },
  { name: { en: "Beef Taco Plate", ko: "비프 타코 플레이트" }, mood: ["quick", "hearty"], spice: "medium", tag: { en: "Mexican", ko: "멕시칸" }, image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=1200&q=80" },
  { name: { en: "Tomato Shakshuka", ko: "토마토 샥슈카" }, mood: ["comfort", "fresh"], spice: "medium", tag: { en: "Middle Eastern", ko: "중동식" }, image: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?auto=format&fit=crop&w=1200&q=80" },
  { name: { en: "Teriyaki Chicken Rice Bowl", ko: "데리야키 치킨 덮밥" }, mood: ["quick", "comfort"], spice: "mild", tag: { en: "Japanese", ko: "일식" }, image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=1200&q=80" },
  { name: { en: "Spicy Pork Bulgogi", ko: "매콤 돼지불고기" }, mood: ["hearty", "comfort"], spice: "hot", tag: { en: "Korean", ko: "한식" }, image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80" },
  { name: { en: "Shrimp Avocado Salad", ko: "새우 아보카도 샐러드" }, mood: ["fresh"], spice: "mild", tag: { en: "Fusion", ko: "퓨전" }, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80" },
  { name: { en: "Butter Chicken Curry", ko: "버터 치킨 커리" }, mood: ["comfort", "hearty"], spice: "medium", tag: { en: "Indian", ko: "인도식" }, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80" }
];

const textByLang = {
  en: {
    title: "Dinner Menu Recommender",
    eyebrow: "DINNER DECIDER",
    heading: "What Should We Eat Tonight?",
    subtitle: "Generate tasty dinner ideas by mood and spice level.",
    moodLabel: "Mood",
    spiceLabel: "Spice",
    generateBtn: "Recommend Menu",
    themeDark: "Dark Mode",
    themeLight: "White Mode",
    languageToggle: "한국어",
    resultLabel: "Recommended dinner menus",
    pick: "Pick",
    noResultTitle: "Oops",
    noResult1: "No menu found",
    noResult2: "Try Any mood/spice",
    spiceWord: "spice",
    partnerHeading: "Partnership Inquiry",
    partnerSubtitle: "Send us a short note and we will get back to you.",
    partnerName: "Name",
    partnerCompany: "Company",
    partnerEmail: "Email",
    partnerMessage: "Message",
    partnerSubmit: "Send Inquiry",
    partnerSending: "Sending...",
    partnerSuccess: "Thanks. Your inquiry was sent.",
    partnerError: "Failed to send. Please try again.",
    commentsHeading: "Comments",
    moodOptions: {
      any: "Any",
      quick: "Quick",
      comfort: "Comfort",
      fresh: "Fresh",
      hearty: "Hearty"
    },
    spiceOptions: {
      any: "Any",
      mild: "Mild",
      medium: "Medium",
      hot: "Hot"
    }
  },
  ko: {
    title: "저녁 메뉴 추천기",
    eyebrow: "DINNER DECIDER",
    heading: "오늘 저녁 뭐 먹지?",
    subtitle: "기분과 맵기 취향으로 저녁 메뉴를 추천해드려요.",
    moodLabel: "분위기",
    spiceLabel: "맵기",
    generateBtn: "메뉴 추천받기",
    themeDark: "다크 모드",
    themeLight: "화이트 모드",
    languageToggle: "English",
    resultLabel: "추천 저녁 메뉴",
    pick: "추천",
    noResultTitle: "앗",
    noResult1: "조건에 맞는 메뉴가 없어요",
    noResult2: "분위기/맵기를 전체로 바꿔보세요",
    spiceWord: "맵기",
    partnerHeading: "제휴 문의",
    partnerSubtitle: "간단히 남겨주시면 빠르게 회신드릴게요.",
    partnerName: "이름",
    partnerCompany: "회사명",
    partnerEmail: "이메일",
    partnerMessage: "문의 내용",
    partnerSubmit: "문의 보내기",
    partnerSending: "전송 중...",
    partnerSuccess: "문의가 정상적으로 접수되었습니다.",
    partnerError: "전송에 실패했어요. 다시 시도해주세요.",
    commentsHeading: "댓글",
    moodOptions: {
      any: "전체",
      quick: "간단하게",
      comfort: "편안하게",
      fresh: "가볍게",
      hearty: "든든하게"
    },
    spiceOptions: {
      any: "전체",
      mild: "순한맛",
      medium: "보통맛",
      hot: "매운맛"
    }
  }
};

let currentLanguage = localStorage.getItem(LANGUAGE_KEY) === "ko" ? "ko" : "en";

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

const updateSelectOptions = () => {
  const t = textByLang[currentLanguage];
  [...moodSelect.options].forEach((option) => {
    option.textContent = t.moodOptions[option.value];
  });
  [...spiceLevelSelect.options].forEach((option) => {
    option.textContent = t.spiceOptions[option.value];
  });
};

const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme) => {
  const t = textByLang[currentLanguage];
  document.body.setAttribute("data-theme", theme);
  themeToggleBtn.textContent = theme === "dark" ? t.themeLight : t.themeDark;
};

const applyLanguage = () => {
  const t = textByLang[currentLanguage];
  const theme = document.body.getAttribute("data-theme") || getPreferredTheme();

  document.documentElement.lang = currentLanguage === "ko" ? "ko" : "en";
  document.title = t.title;
  document.querySelector(".eyebrow").textContent = t.eyebrow;
  document.querySelector("h1").textContent = t.heading;
  document.querySelector(".subtitle").textContent = t.subtitle;
  document.querySelector("label[for='mood']").textContent = t.moodLabel;
  document.querySelector("label[for='spiceLevel']").textContent = t.spiceLabel;
  generateBtn.textContent = t.generateBtn;
  languageToggleBtn.textContent = t.languageToggle;
  result.setAttribute("aria-label", t.resultLabel);
  document.getElementById("partnerHeading").textContent = t.partnerHeading;
  document.getElementById("partnerSubtitle").textContent = t.partnerSubtitle;
  document.getElementById("partnerNameLabel").textContent = t.partnerName;
  document.getElementById("partnerCompanyLabel").textContent = t.partnerCompany;
  document.getElementById("partnerEmailLabel").textContent = t.partnerEmail;
  document.getElementById("partnerMessageLabel").textContent = t.partnerMessage;
  document.getElementById("partnerSubmitBtn").textContent = t.partnerSubmit;
  document.getElementById("commentsHeading").textContent = t.commentsHeading;

  updateSelectOptions();
  applyTheme(theme);
};

const renderMenus = () => {
  const t = textByLang[currentLanguage];
  const mood = moodSelect.value;
  const spice = spiceLevelSelect.value;
  const filtered = filterMenus(mood, spice);
  const recommendation = shuffle(filtered)[0];

  result.innerHTML = "";

  if (!recommendation) {
    result.innerHTML = `<article class="line"><strong>${t.noResultTitle}</strong><div class="numbers"><span class="ball range-4">${t.noResult1}</span><span class="ball range-5">${t.noResult2}</span></div></article>`;
    return;
  }

  const lineEl = document.createElement("article");
  lineEl.className = "line";

  const label = document.createElement("strong");
  label.textContent = `${t.pick} 1`;

  const image = document.createElement("img");
  image.className = "menu-image";
  image.src = recommendation.image;
  image.alt = recommendation.name[currentLanguage];
  image.loading = "lazy";

  const badges = document.createElement("div");
  badges.className = "numbers";

  const main = document.createElement("span");
  main.className = `ball ${mapSpiceClass(recommendation.spice)}`;
  main.textContent = recommendation.name[currentLanguage];

  const tag = document.createElement("span");
  tag.className = "ball range-4";
  tag.textContent = recommendation.tag[currentLanguage];

  const spiceBadge = document.createElement("span");
  spiceBadge.className = "ball range-5";
  spiceBadge.textContent = `${t.spiceOptions[recommendation.spice]} ${t.spiceWord}`;

  badges.append(main, tag, spiceBadge);
  lineEl.append(label, image, badges);
  result.appendChild(lineEl);
};

themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.body.getAttribute("data-theme") || "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, nextTheme);
  applyTheme(nextTheme);
});

languageToggleBtn.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "ko" : "en";
  localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  applyLanguage();
  renderMenus();
});

generateBtn.addEventListener("click", renderMenus);

partnerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const t = textByLang[currentLanguage];
  const submitBtn = document.getElementById("partnerSubmitBtn");
  submitBtn.disabled = true;
  partnerStatus.textContent = t.partnerSending;

  try {
    const response = await fetch(partnerForm.action, {
      method: "POST",
      body: new FormData(partnerForm),
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error("Request failed");
    partnerForm.reset();
    partnerStatus.textContent = t.partnerSuccess;
  } catch (error) {
    partnerStatus.textContent = t.partnerError;
  } finally {
    submitBtn.disabled = false;
  }
});

applyTheme(getPreferredTheme());
applyLanguage();
renderMenus();
