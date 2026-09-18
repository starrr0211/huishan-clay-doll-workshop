const STORAGE_KEY = "huishan-clay-workshop";
const WORKS_STORAGE_KEY = "huishan-clay-workshop-saved-works";
const DRYING_DURATION = 5000;
const KNEADING_FRAMES = [
  "揉泥/0.png",
  "揉泥/1.png",
  "揉泥/2.png",
  "揉泥/3.png",
  "揉泥/4.png",
  "揉泥/5.png",
  "揉泥/6.png",
];
const STORY_PAGES = [
  {
    image: "书.png",
    kicker: "绘本封面",
    title: "来自惠山的泥人",
    text: "<p>江南惠山脚下，泥土经过一双双巧手，变成了笑意盈盈的大阿福。</p><blockquote>翻开绘本，听泥土讲述自己的故事。</blockquote>",
  },
  {
    image: "揉泥/1.png",
    kicker: "第一章 · 一捧泥土",
    title: "揉出细腻与柔韧",
    text: "<p>做泥人先要揉泥。反复按压、推揉，把空气赶出去，让泥料细腻柔软。</p><p>这一步看似简单，却决定了泥人能否牢固成形。</p>",
  },
  {
    image: "泥人晒干 - 副本.png",
    kicker: "第二章 · 模印成形",
    title: "从模具里诞生",
    text: "<p>泥料填进模具，轻轻压实，再经过脱模和修整，大阿福的笑脸渐渐清晰。</p><p>晾干之后，它便拥有了承载色彩的身体。</p>",
  },
  {
    image: "新建文件夹/衣服.png",
    kicker: "第三章 · 彩绘点睛",
    title: "一笔一色皆是祝福",
    text: "<p>鲜亮的衣裳、怀中的吉祥物和喜庆纹样，让大阿福有了独一无二的神采。</p><blockquote>一双巧手，捏出美好；一尊泥人，守护平安。</blockquote>",
  },
];
const STORY_PAGE_NUMBERS = ["壹", "贰", "叁", "肆"];
const storyImagePreloads = new Map();

function preloadStoryImage(pageIndex) {
  const page = STORY_PAGES[pageIndex];
  if (!page || storyImagePreloads.has(page.image)) return;
  const preload = new Image();
  preload.decoding = "async";
  preload.src = page.image;
  storyImagePreloads.set(page.image, preload);
}

const stages = [
  {
    name: "揉泥",
    image: KNEADING_FRAMES[0],
    doneImage: KNEADING_FRAMES[6],
    task: "反复揉捏泥团，让泥料变得细腻、柔软、无气泡。",
    tip: "揉泥时用力均匀，直到泥料表面光滑不粘手。",
    hint: "按住鼠标开始揉泥吧！",
    action: "按住拖动",
  },
  {
    name: "翻模",
    image: "正面面膜具.png",
    task: "请将泥坯放入模具，并让模具的定位线对齐。",
    tip: "先让泥土填满正面模具，再对齐背面模具。",
    hint: "拖动泥土，使泥填满正面模具",
    action: "拖动对齐",
  },
  {
    name: "脱模与修整",
    image: "修整.png",
    doneImage: "泥人.png",
    task: "刚脱模的大阿福边缘还有溢出的泥料，请先选择刮刀。",
    tip: "刮刀要贴着外轮廓移动，避免碰到泥人的细节。",
    hint: "选择左侧刮刀后，沿橙色提示线按住滑动",
    action: "开始修整",
  },
  {
    name: "晾干",
    image: "泥人.png",
    doneImage: "泥人晒干.png",
    task: "让成型的泥人慢慢晾干，等待颜色和纹样登场。",
    tip: "自然晾干能让泥人的形体更稳定，耐心也是工艺的一部分。",
    hint: "点击“开始晾干”，等待光尘落下",
    action: "开始晾干",
  },
  {
    name: "上色",
    image: "泥人晒干.png",
    task: "依次选择脸部、衣服、怀抱物、裤子和鞋子，再将对应颜料拖到正确部位。",
    tip: "按住右侧颜料块拖动；放错位置时不会上色，可以重新尝试。",
    hint: "先选部位，再把对应颜料拖到泥人轮廓上",
    action: "拖动上色",
  },
];

const paintParts = {
  head: {
    label: "脸部",
    variants: [{ color: "#efb9a9", colorLabel: "肤色", asset: "新建文件夹/脸带手.png" }],
  },
  clothes: {
    label: "衣服",
    variants: [
      { color: "#315f9f", colorLabel: "靛蓝色", asset: "新建文件夹/衣服.png" },
      { color: "#f2aa18", colorLabel: "黄色", asset: "新建文件夹/衣服橙色.png" },
      { color: "#ef7fa5", colorLabel: "粉色", asset: "新建文件夹/衣服粉色.png" },
    ],
  },
  fish: {
    label: "怀抱物",
    variants: [{ color: "#25a879", colorLabel: "绿色", asset: "新建文件夹/怀抱物1.png" }],
  },
  pants: {
    label: "裤子和鞋子",
    variants: [
      { color: "#e63c33", colorLabel: "红色", asset: "新建文件夹/裤子1.png" },
      { color: "#171717", colorLabel: "黑色", asset: "新建文件夹/黑色裤子.png" },
      { color: "#a8d6c2", colorLabel: "绿色", asset: "新建文件夹/绿色裤子.png" },
    ],
  },
};

const paintPatterns = [
  { label: "团花纹", color: "#d95a70", asset: "新建文件夹/新建文件夹/花纹1.png" },
  { label: "团鹤纹", color: "#4b8eaa", asset: "新建文件夹/新建文件夹/团鹤纹路1.png" },
  { label: "寿字纹", color: "#d9a018", asset: "新建文件夹/新建文件夹/寿纹1.png" },
];

const CLOTHES_MASK_ASSET = "新建文件夹/衣服部分.png";

const defaultState = {
  stage: 0,
  progress: [0, 0, 0, 0, 0],
  color: "#b6533f",
  pattern: "如意纹",
  prop: "平安结",
  eyes: false,
  moldPlaced: false,
  clayFilled: false,
  moldFill: { up: 0, right: 0, down: 0, left: 0 },
  backMoldAligned: false,
  moldMisses: 0,
  trimTool: "",
  trimZones: { top: 0, right: 0, bottom: 0, left: 0 },
  trimMisses: 0,
  dryingStartedAt: 0,
  dryingDone: false,
  selectedPaintPart: "head",
  paintSelections: {
    head: "新建文件夹/脸带手.png",
    clothes: "新建文件夹/衣服.png",
    fish: "新建文件夹/怀抱物1.png",
    pants: "新建文件夹/裤子1.png",
  },
  paintAreas: { head: "", clothes: "", fish: "", pants: "" },
  paintPattern: "",
  clothesColor: "#315f9f",
};

let state = loadState();
let history = [];
let savedWorks = loadSavedWorks();
let toastTimer;
let dryingTimer;
let paintAssetsReady = false;
let paintAssetsPromise = null;
const paintHitMasks = {};
const paintPreparedAssets = {};
let clothesMaskPixels = null;
let clothesMaskWidth = 0;
let clothesMaskHeight = 0;
let clothesTintUrl = "";

const $ = (selector) => document.querySelector(selector);
const stepList = $("#stepList");
const introScreen = $("#introScreen");
const homeScene = $("#homeScene");
const workshopShell = $("#workshopShell");
const storybookView = $("#storybookView");
const stageImage = $("#stageImage");
const kneadingBlendImage = $("#kneadingBlendImage");
const stageArea = $("#stageArea");
const figureWrap = $("#figureWrap");
const gestureCursor = $("#gestureCursor");
const paintWash = $("#paintWash");
const figurePattern = $("#figurePattern");
const figureProp = $("#figureProp");
const eyePoint = $("#eyePoint");
const figureShadow = $(".figure-shadow");
const moldGame = $("#moldGame");
const moldTargetOutline = $("#moldTargetOutline");
const clayPiece = $("#clayPiece");
const backMoldPiece = $("#backMoldPiece");
const clayFillSurface = $("#clayFillSurface");
const claySpreadRect = $("#claySpreadRect");
const fillDirections = $("#fillDirections");
const magnetHint = $("#magnetHint");
const moldPhaseBadge = $("#moldPhaseBadge");
const trimGame = $("#trimGame");
const trimFigure = $("#trimFigure");
const trimGuide = $("#trimGuide");
const trimRoughImage = $("#trimRoughImage");
const trimCleanImage = $(".trim-image-clean");
const trimBladeCursor = $("#trimBladeCursor");
const trimPhaseBadge = $("#trimPhaseBadge");
const scraperTool = $("#scraperTool");
const kneadingProgress = $("#kneadingProgress");
const kneadingProgressText = $("#kneadingProgressText");
const kneadingBar = $("#kneadingBar");
const dryingProgress = $("#dryingProgress");
const dryingCountdown = $("#dryingCountdown");
const dryingBar = $("#dryingBar");
const paintAssetLayers = $("#paintAssetLayers");
let storyPageIndex = 0;
let storyTurning = false;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return structuredClone(defaultState);
    const savedProgress = Array.isArray(saved.progress) ? saved.progress : [];
    const loaded = {
      ...structuredClone(defaultState),
      ...saved,
      progress: defaultState.progress.map((fallback, index) => Number.isFinite(savedProgress[index]) ? savedProgress[index] : fallback),
    };
    for (let index = 0; index < loaded.stage; index += 1) loaded.progress[index] = 100;
    if (saved.moldFill === undefined) {
      loaded.moldPlaced = false;
      loaded.clayFilled = false;
      loaded.backMoldAligned = false;
      loaded.progress[1] = 0;
    }
    if (saved.trimZones === undefined) loaded.progress[2] = 0;
    if (saved.dryingStartedAt === undefined) {
      loaded.dryingDone = loaded.progress[3] >= 100;
      loaded.dryingStartedAt = loaded.dryingDone ? Date.now() - DRYING_DURATION : 0;
      if (!loaded.dryingDone) loaded.progress[3] = 0;
    }
    if (saved.paintAreas === undefined) loaded.progress[4] = 0;
    return loaded;
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState(showMessage = false) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (showMessage) showToast("进度已保存到这台设备");
}

function loadSavedWorks() {
  try {
    const saved = JSON.parse(localStorage.getItem(WORKS_STORAGE_KEY));
    return Array.isArray(saved) ? saved.filter((work) => work?.thumbnail).slice(0, 12) : [];
  } catch {
    return [];
  }
}

function saveWorks() {
  localStorage.setItem(WORKS_STORAGE_KEY, JSON.stringify(savedWorks));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);
}

function showExperienceView(view) {
  ["#patienceDialog", "#paintErrorDialog", "#completionCard", "#worksHistory"].forEach((selector) => {
    const overlay = $(selector);
    if (overlay) overlay.hidden = true;
  });
  if (view !== "storybook") closeStorybookToc();
  introScreen.hidden = true;
  introScreen.classList.remove("is-leaving");
  homeScene.hidden = view !== "home";
  workshopShell.hidden = view !== "workshop";
  storybookView.hidden = view !== "storybook";
  document.body.dataset.view = view;
  if (view === "workshop" && state.stage === 4) ensurePaintAssets();
}

function enterHomeFromIntro() {
  if (introScreen.classList.contains("is-leaving")) return;
  homeScene.hidden = false;
  document.body.dataset.view = "home";
  introScreen.classList.add("is-leaving");
  window.setTimeout(() => {
    introScreen.hidden = true;
    introScreen.classList.remove("is-leaving");
    $("#openStorybook").focus();
  }, 760);
}

function applyStoryCopy(pageIndex = storyPageIndex) {
  const page = STORY_PAGES[pageIndex];
  $("#storybookKicker").textContent = page.kicker;
  $("#storybookTitle").textContent = page.title;
  $("#storybookText").innerHTML = page.text;
  $("#storybookPageNumber").textContent = STORY_PAGE_NUMBERS[pageIndex];
}

function applyStoryImage(pageIndex = storyPageIndex) {
  const page = STORY_PAGES[pageIndex];
  $("#storybookImage").src = page.image;
  $("#storybookImage").alt = `${page.title}绘本插图`;
}

function applyStoryNavigation() {
  $("#storybookCounter").textContent = `${storyPageIndex + 1} / ${STORY_PAGES.length}`;
  $("#storybookPrev").disabled = storyPageIndex === 0;
  $("#storybookNext").disabled = storyPageIndex === STORY_PAGES.length - 1;
  $("#storybookDots").innerHTML = STORY_PAGES.map((page, index) => (
    `<button class="storybook-toc-item${index === storyPageIndex ? " active" : ""}" data-story-page="${index}" type="button">
      <span>${String(index + 1).padStart(2, "0")}</span><span><small>${page.kicker}</small><b>${page.title}</b></span>
    </button>`
  )).join("");
}

function applyStoryPage() {
  preloadStoryImage(storyPageIndex);
  preloadStoryImage(storyPageIndex + 1);
  applyStoryImage();
  applyStoryCopy();
  applyStoryNavigation();
}

function closeStorybookToc() {
  $("#storybookToc").hidden = true;
  $("#storybookTocButton").setAttribute("aria-expanded", "false");
}

function turnStoryPage(nextPage) {
  if (storyTurning || nextPage === storyPageIndex || nextPage < 0 || nextPage >= STORY_PAGES.length) return;
  storyTurning = true;
  const book = $("#storybookBook");
  const movingForward = nextPage > storyPageIndex;
  const currentPage = STORY_PAGES[storyPageIndex];
  const targetPage = STORY_PAGES[nextPage];
  const leaf = document.createElement("div");
  const copyPage = movingForward ? currentPage : targetPage;
  const artPage = movingForward ? targetPage : currentPage;
  const copyPageIndex = movingForward ? storyPageIndex : nextPage;
  leaf.className = `storybook-leaf ${movingForward ? "turn-forward" : "turn-backward"}`;
  leaf.setAttribute("aria-hidden", "true");
  leaf.innerHTML = `
    <div class="storybook-leaf-face storybook-leaf-front">
      <p>${copyPage.kicker}</p>
      <h2>${copyPage.title}</h2>
      <div class="storybook-leaf-text">${copyPage.text}</div>
      <span class="storybook-page-number">${STORY_PAGE_NUMBERS[copyPageIndex]}</span>
    </div>
    <div class="storybook-leaf-face storybook-leaf-back">
      <img src="${artPage.image}" alt="" />
    </div>`;
  book.append(leaf);
  book.classList.add("turning", movingForward ? "turning-forward" : "turning-backward");
  book.setAttribute("aria-busy", "true");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const turnDuration = reducedMotion ? 120 : 780;
  if (movingForward) applyStoryCopy(nextPage);
  window.setTimeout(() => {
    storyPageIndex = nextPage;
    applyStoryPage();
  }, turnDuration * .48);
  window.setTimeout(() => {
    leaf.remove();
    book.classList.remove("turning", "turning-forward", "turning-backward");
    book.removeAttribute("aria-busy");
    storyTurning = false;
  }, turnDuration + 30);
}

function renderWorksHistory() {
  const grid = $("#worksHistoryGrid");
  if (!savedWorks.length) {
    grid.innerHTML = '<div class="works-history-empty"><span>泥</span><h3>还没有保存的作品</h3><p>完成上色后点击“保存我的作品卡”，大阿福就会出现在这里。</p></div>';
    return;
  }
  grid.innerHTML = savedWorks.map((work) => {
    const date = new Date(work.createdAt);
    const dateLabel = Number.isNaN(date.getTime()) ? "已保存" : date.toLocaleString("zh-CN", {
      year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
    });
    return `<article class="works-history-card">
      <img src="${work.thumbnail}" alt="${escapeHtml(work.name)}的大阿福作品" />
      <div class="works-history-copy">
        <time datetime="${escapeHtml(work.createdAt)}">${escapeHtml(dateLabel)}</time>
        <h3>${escapeHtml(work.name)}</h3>
        <p>${escapeHtml(work.wish)}</p>
        <small>制作者 · ${escapeHtml(work.maker)}</small>
      </div>
    </article>`;
  }).join("");
}

async function drawThumbnailLayer(context, source, width, height) {
  if (!source) return;
  const image = new Image();
  image.src = source;
  await loadPaintImage(image);
  await image.decode?.().catch(() => {});
  context.drawImage(image, 0, 0, width, height);
}

async function createWorkThumbnail() {
  const canvas = document.createElement("canvas");
  canvas.width = 280;
  canvas.height = 350;
  const context = canvas.getContext("2d");
  await drawThumbnailLayer(context, stages[4].image, canvas.width, canvas.height);
  for (const part of Object.keys(paintParts)) {
    const asset = state.paintAreas[part];
    await drawThumbnailLayer(context, paintPreparedAssets[asset], canvas.width, canvas.height);
  }
  await drawThumbnailLayer(context, paintPreparedAssets[state.paintPattern], canvas.width, canvas.height);
  return canvas.toDataURL("image/webp", .82);
}

function snapshot() {
  const serialized = JSON.stringify(state);
  if (history.at(-1) === serialized) return;
  history.push(serialized);
  if (history.length > 20) history.shift();
}

function updateState(mutator) {
  const previousStage = state.stage;
  snapshot();
  mutator();
  if (state.stage !== previousStage) history = [];
  saveState();
  render();
}

function restartProject() {
  clearInterval(dryingTimer);
  dryingTimer = null;
  state = structuredClone(defaultState);
  history = [];
  ["#completionCard", "#worksHistory", "#paintErrorDialog", "#patienceDialog"].forEach((selector) => {
    $(selector).hidden = true;
  });
  saveState();
  render();
}

function currentStage() { return stages[state.stage]; }

function getKneadingBlend(progress) {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const framePosition = clampedProgress * (KNEADING_FRAMES.length - 1) / 100;
  const frameIndex = Math.floor(framePosition);
  const nextFrameIndex = Math.min(KNEADING_FRAMES.length - 1, frameIndex + 1);
  return {
    current: KNEADING_FRAMES[frameIndex],
    next: KNEADING_FRAMES[nextFrameIndex],
    mix: nextFrameIndex === frameIndex ? 0 : framePosition - frameIndex,
  };
}

function renderKneadingFrame(progress) {
  const frame = getKneadingBlend(progress);
  if (stageImage.getAttribute("src") !== frame.current) stageImage.src = frame.current;
  if (kneadingBlendImage.getAttribute("src") !== frame.next) kneadingBlendImage.src = frame.next;
  kneadingBlendImage.hidden = false;
  kneadingBlendImage.style.opacity = frame.mix.toFixed(3);
}

function normalizeMoldState() {
  state.moldFill = { ...defaultState.moldFill, ...(state.moldFill || {}) };
  if (state.backMoldAligned) {
    state.moldPlaced = true;
    state.clayFilled = true;
    Object.keys(state.moldFill).forEach((direction) => { state.moldFill[direction] = 100; });
    state.progress[1] = 100;
  } else if (state.clayFilled) {
    state.moldPlaced = true;
    state.progress[1] = 75;
  } else if (state.moldPlaced) {
    const averageFill = Object.values(state.moldFill).reduce((sum, value) => sum + value, 0) / 4;
    state.progress[1] = Math.round(50 + averageFill * .25);
  } else {
    state.progress[1] = 0;
  }
}

function normalizeTrimState() {
  state.trimZones = { ...defaultState.trimZones, ...(state.trimZones || {}) };
  const values = Object.values(state.trimZones).map((value) => Math.max(0, Math.min(100, Number(value) || 0)));
  state.progress[2] = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  if (state.progress[2] >= 99) {
    Object.keys(state.trimZones).forEach((zone) => { state.trimZones[zone] = 100; });
    state.progress[2] = 100;
  }
}

function normalizeDryingState() {
  if (state.dryingDone || state.progress[3] >= 100) {
    state.dryingDone = true;
    state.progress[3] = 100;
    return;
  }
  if (!state.dryingStartedAt) {
    state.progress[3] = 0;
    return;
  }
  const elapsed = Date.now() - state.dryingStartedAt;
  if (elapsed >= DRYING_DURATION) {
    state.dryingDone = true;
    state.progress[3] = 100;
  } else {
    state.progress[3] = Math.min(99, Math.floor(elapsed / DRYING_DURATION * 100));
  }
}

function normalizePaintState() {
  state.paintAreas = Object.fromEntries(Object.entries(paintParts).map(([part, config]) => {
    const savedAsset = part === "head" && state.paintAreas?.[part] === "新建文件夹/脸部.png"
      ? config.variants[0].asset
      : state.paintAreas?.[part];
    const validAsset = config.variants.some((variant) => variant.asset === savedAsset)
      || (part === "clothes" && savedAsset === CLOTHES_MASK_ASSET);
    return [part, validAsset ? savedAsset : ""];
  }));
  state.paintSelections = Object.fromEntries(Object.entries(paintParts).map(([part, config]) => {
    const savedAsset = part === "head" && state.paintSelections?.[part] === "新建文件夹/脸部.png"
      ? config.variants[0].asset
      : state.paintSelections?.[part];
    return [part, config.variants.some((variant) => variant.asset === savedAsset) ? savedAsset : config.variants[0].asset];
  }));
  if (!paintParts[state.selectedPaintPart]) state.selectedPaintPart = "head";
  if (!paintPatterns.some((pattern) => pattern.asset === state.paintPattern)) state.paintPattern = "";
  if (!/^#[0-9a-f]{6}$/i.test(state.clothesColor || "")) state.clothesColor = defaultState.clothesColor;
  const paintedCount = Object.values(state.paintAreas).filter(Boolean).length;
  state.progress[4] = paintedCount * 20 + (state.paintPattern ? 20 : 0);
}

function getSelectedPaintVariant(part) {
  const config = paintParts[part];
  return config.variants.find((variant) => variant.asset === state.paintSelections[part]) || config.variants[0];
}

function loadPaintImage(image) {
  if (image.complete && image.naturalWidth) return Promise.resolve();
  return new Promise((resolve, reject) => {
    image.addEventListener("load", resolve, { once: true });
    image.addEventListener("error", reject, { once: true });
  });
}

function hexToRgb(color) {
  return {
    red: parseInt(color.slice(1, 3), 16),
    green: parseInt(color.slice(3, 5), 16),
    blue: parseInt(color.slice(5, 7), 16),
  };
}

async function prepareClothesTint(color) {
  if (!clothesMaskPixels) return;
  const canvas = document.createElement("canvas");
  canvas.width = clothesMaskWidth;
  canvas.height = clothesMaskHeight;
  const context = canvas.getContext("2d");
  const pixels = new ImageData(new Uint8ClampedArray(clothesMaskPixels), clothesMaskWidth, clothesMaskHeight);
  const tint = hexToRgb(color);
  for (let pixel = 0; pixel < pixels.data.length; pixel += 4) {
    if (pixels.data[pixel + 3] < 24) continue;
    const luminance = pixels.data[pixel] * .2126 + pixels.data[pixel + 1] * .7152 + pixels.data[pixel + 2] * .0722;
    const shade = Math.max(.2, Math.min(1.22, luminance / 185));
    pixels.data[pixel] = Math.min(255, Math.round(tint.red * shade));
    pixels.data[pixel + 1] = Math.min(255, Math.round(tint.green * shade));
    pixels.data[pixel + 2] = Math.min(255, Math.round(tint.blue * shade));
  }
  context.putImageData(pixels, 0, 0);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("无法生成衣服颜色");
  if (clothesTintUrl) URL.revokeObjectURL(clothesTintUrl);
  clothesTintUrl = URL.createObjectURL(blob);
  paintPreparedAssets[CLOTHES_MASK_ASSET] = clothesTintUrl;
}

async function preparePaintAssets() {
  try {
    const baseImage = new Image();
    baseImage.src = stages[4].image;
    await loadPaintImage(baseImage);
    await baseImage.decode?.().catch(() => {});
    const baseCanvas = document.createElement("canvas");
    baseCanvas.width = baseImage.naturalWidth;
    baseCanvas.height = baseImage.naturalHeight;
    const baseContext = baseCanvas.getContext("2d", { willReadFrequently: true });
    baseContext.drawImage(baseImage, 0, 0);
    const basePixels = baseContext.getImageData(0, 0, baseCanvas.width, baseCanvas.height).data;

    const clothesMaskImage = new Image();
    clothesMaskImage.src = CLOTHES_MASK_ASSET;
    await loadPaintImage(clothesMaskImage);
    await clothesMaskImage.decode?.().catch(() => {});
    if (clothesMaskImage.naturalWidth !== baseCanvas.width || clothesMaskImage.naturalHeight !== baseCanvas.height) {
      throw new Error(`${CLOTHES_MASK_ASSET}与泥人底图尺寸不一致`);
    }
    const clothesMaskCanvas = document.createElement("canvas");
    clothesMaskCanvas.width = clothesMaskImage.naturalWidth;
    clothesMaskCanvas.height = clothesMaskImage.naturalHeight;
    const clothesMaskContext = clothesMaskCanvas.getContext("2d", { willReadFrequently: true });
    clothesMaskContext.drawImage(clothesMaskImage, 0, 0);
    clothesMaskPixels = clothesMaskContext.getImageData(0, 0, clothesMaskCanvas.width, clothesMaskCanvas.height).data;
    clothesMaskWidth = clothesMaskCanvas.width;
    clothesMaskHeight = clothesMaskCanvas.height;

    await Promise.all(Object.entries(paintParts).map(async ([part, config]) => {
      const combinedAlpha = new Uint8ClampedArray(baseCanvas.width * baseCanvas.height);
      for (const variant of config.variants) {
        const image = new Image();
        image.src = variant.asset;
        await loadPaintImage(image);
        await image.decode?.().catch(() => {});

        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        if (canvas.width !== baseCanvas.width || canvas.height !== baseCanvas.height) {
          throw new Error(`${variant.asset}与泥人底图尺寸不一致`);
        }
        const context = canvas.getContext("2d", { willReadFrequently: true });
        context.drawImage(image, 0, 0);
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let pixel = 0, maskIndex = 0; pixel < pixels.data.length; pixel += 4, maskIndex += 1) {
          const difference = Math.max(
            Math.abs(pixels.data[pixel] - basePixels[pixel]),
            Math.abs(pixels.data[pixel + 1] - basePixels[pixel + 1]),
            Math.abs(pixels.data[pixel + 2] - basePixels[pixel + 2]),
          );
          const keep = pixels.data[pixel + 3] >= 24 && basePixels[pixel + 3] >= 24 && difference >= 12;
          if (!keep) pixels.data[pixel + 3] = 0;
          if (keep) combinedAlpha[maskIndex] = 255;
        }
        context.putImageData(pixels, 0, 0);
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
        if (!blob) throw new Error(`无法处理${variant.asset}`);
        paintPreparedAssets[variant.asset] = URL.createObjectURL(blob);
      }
      if (part === "clothes") {
        for (let maskIndex = 0; maskIndex < combinedAlpha.length; maskIndex += 1) {
          if (clothesMaskPixels[maskIndex * 4 + 3] >= 24) combinedAlpha[maskIndex] = 255;
        }
      }
      paintHitMasks[part] = { width: baseCanvas.width, height: baseCanvas.height, alpha: combinedAlpha };
    }));
    await Promise.all(paintPatterns.map(async (pattern) => {
      const image = new Image();
      image.src = pattern.asset;
      await loadPaintImage(image);
      await image.decode?.().catch(() => {});

      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      if (canvas.width !== baseCanvas.width || canvas.height !== baseCanvas.height) {
        throw new Error(`${pattern.asset}与泥人底图尺寸不一致`);
      }
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.drawImage(image, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      for (let pixel = 0; pixel < pixels.data.length; pixel += 4) {
        const difference = Math.max(
          Math.abs(pixels.data[pixel] - basePixels[pixel]),
          Math.abs(pixels.data[pixel + 1] - basePixels[pixel + 1]),
          Math.abs(pixels.data[pixel + 2] - basePixels[pixel + 2]),
        );
        const keep = pixels.data[pixel + 3] >= 24 && basePixels[pixel + 3] >= 24 && difference >= 12;
        if (!keep) pixels.data[pixel + 3] = 0;
      }
      context.putImageData(pixels, 0, 0);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error(`无法处理${pattern.asset}`);
      paintPreparedAssets[pattern.asset] = URL.createObjectURL(blob);
    }));
    await prepareClothesTint(state.clothesColor);
    paintAssetsReady = true;
    paintAssetLayers.classList.add("assets-ready");
    render();
  } catch (error) {
    console.error(error);
    showToast("上色素材加载失败，请刷新页面重试");
  }
}

function ensurePaintAssets() {
  if (paintAssetsReady) return Promise.resolve();
  if (!paintAssetsPromise) {
    paintAssetsPromise = preparePaintAssets().finally(() => {
      if (!paintAssetsReady) paintAssetsPromise = null;
    });
  }
  return paintAssetsPromise;
}

function renderSteps() {
  stepList.innerHTML = stages.map((stage, index) => {
    const completed = index < state.stage || state.progress[index] >= 100;
    const locked = index > state.stage && state.progress[index] < 100;
    return `<li><button type="button" class="step-button ${index === state.stage ? "active" : ""} ${completed ? "completed" : ""}" data-stage="${index}" ${locked ? "disabled" : ""} aria-current="${index === state.stage ? "step" : "false"}"><span class="step-number">${completed ? "✓" : index + 1}</span><span class="step-name">${stage.name}</span></button></li>`;
  }).join("");
}

function renderOptions() {
  const group = $("#optionGroup");
  if (state.stage !== 4) {
    group.innerHTML = "";
    return;
  }
  const paintedCount = Object.values(state.paintAreas).filter(Boolean).length;
  const colorsComplete = paintedCount === 4;
  const appliedPattern = paintPatterns.find((pattern) => pattern.asset === state.paintPattern);
  group.innerHTML = `
    <div class="paint-panel-section paint-overview">
      <div class="paint-panel-title"><span>部位与颜色</span><strong>${paintedCount} / 4</strong></div>
      <div class="paint-direct-list">${Object.entries(paintParts).map(([part, config]) => {
        const appliedAsset = state.paintAreas[part];
        const appliedVariant = config.variants.find((variant) => variant.asset === appliedAsset);
        const appliedLabel = appliedAsset === CLOTHES_MASK_ASSET
          ? `已上色 · 自定义 ${state.clothesColor.toUpperCase()}`
          : appliedVariant ? `已上色 · ${appliedVariant.colorLabel}` : "待上色";
        return `<div class="paint-direct-row ${appliedAsset ? "done" : ""}">
          <div class="paint-direct-label"><b>${config.label}</b><small>${appliedLabel}</small></div>
          ${part === "clothes" ? `<div class="clothes-color-options">
            <div class="paint-direct-colors">${config.variants.map((variant) => {
              const applied = variant.asset === appliedAsset;
              return `<button class="paint-direct-swatch ${applied ? "applied" : ""}" type="button" data-paint-swatch="${part}" data-paint-asset="${variant.asset}" style="--swatch:${variant.color}" aria-label="按住拖动${variant.colorLabel}到${config.label}" ${paintAssetsReady ? "" : "disabled"}><i class="paint-color-dot"></i><span>${variant.colorLabel}</span>${applied ? "<em>✓</em>" : ""}</button>`;
            }).join("")}</div>
            <label class="clothes-palette-control ${appliedAsset === CLOTHES_MASK_ASSET ? "applied" : ""}">
              <input type="color" value="${state.clothesColor}" data-clothes-palette aria-label="选择衣服自定义颜色" ${paintAssetsReady ? "" : "disabled"} />
              <span>自定义颜色</span><em>${state.clothesColor.toUpperCase()}</em>
            </label>
          </div>` : `<div class="paint-direct-colors">${config.variants.map((variant) => `<button class="paint-direct-swatch ${variant.asset === appliedAsset ? "applied" : ""}" type="button" data-paint-swatch="${part}" data-paint-asset="${variant.asset}" style="--swatch:${variant.color}" aria-label="按住拖动${variant.colorLabel}到${config.label}" ${paintAssetsReady ? "" : "disabled"}><i class="paint-color-dot"></i><span>${variant.colorLabel}</span>${variant.asset === appliedAsset ? "<em>✓</em>" : ""}</button>`).join("")}</div>`}
        </div>`;
      }).join("")}</div>
      <div class="paint-pattern-row ${colorsComplete ? "" : "locked"}">
        <div class="paint-direct-label"><b>最后添加纹样</b><small>${appliedPattern ? `已添加 · ${appliedPattern.label}` : colorsComplete ? "请选择一个纹样" : "完成四个部位后解锁"}</small></div>
        <div class="paint-direct-colors">${paintPatterns.map((pattern) => `<button class="paint-direct-swatch paint-pattern-swatch ${pattern.asset === state.paintPattern ? "applied" : ""}" type="button" data-pattern-swatch data-pattern-asset="${pattern.asset}" style="--swatch:${pattern.color}" aria-label="按住拖动${pattern.label}到衣服" ${paintAssetsReady && colorsComplete ? "" : "disabled"}><i class="paint-color-dot"></i><span>${pattern.label}</span>${pattern.asset === state.paintPattern ? "<em>✓</em>" : ""}</button>`).join("")}</div>
      </div>
      <p class="paint-list-help">${!paintAssetsReady ? "正在校准上色素材…" : !colorsComplete ? "衣服可直接选色，其他颜色拖到对应部位" : state.paintPattern ? "纹样已添加，也可以拖动其他纹样进行更换" : "最后将一个纹样拖到衣服区域"}</p>
    </div>`;
}

function getMoldCopy() {
  if (state.backMoldAligned) {
    return {
      task: "翻模完成。\n大阿福的基本形态已经形成。",
      tip: "两片模具定位准确，可以进入脱模与修整了。",
      hint: "泥坯与前后模具均已对齐",
      note: "翻模完成 · 大阿福的轮廓已经形成",
    };
  }
  if (state.clayFilled) {
    return {
      task: "泥土已经填满正面模具。\n接下来对齐背面模具。",
      tip: "让背面模具的定位孔与正面模具重合。",
      hint: "拖动背面模具，靠近定位线后松开",
      note: "第二次对齐 · 合上背面模具",
    };
  }
  if (state.moldPlaced) {
    return {
      task: "按住泥土，分别向上、下、左、右拖动，让泥土填满大阿福轮廓。",
      tip: "泥土只会在模具轮廓内延展，四个方向都填满才算完成。",
      hint: "按住中央泥土，朝尚未完成的箭头方向拉动",
      note: "塑形填模 · 向四个方向拉伸泥土",
    };
  }
  return {
    task: "请将泥坯放入模具，并让模具的定位线对齐。",
    tip: state.moldMisses >= 2 ? "正确位置轮廓已显示，沿虚线慢慢靠近。" : "移动到模具附近时会出现磁吸提示。",
    hint: "操作方式：拖动泥土，使泥填满正面模具",
    note: "第一次对齐 · 将泥坯放入正面模具",
  };
}

function getTrimCopy() {
  if (state.progress[2] >= 100) {
    return {
      task: "修整完成。\n大阿福边缘溢出的泥料已经清除。",
      tip: "外轮廓已经平整，可以进入晾干步骤。",
      hint: "修整完成，可以进入晾干步骤",
      note: "脱模与修整完成 · 外轮廓平整干净",
    };
  }
  if (state.trimTool === "scraper") {
    return {
      task: "按住鼠标，让刮刀沿橙色提示线滑动，修掉外轮廓溢出的泥料。",
      tip: state.trimMisses >= 2 ? "放慢速度，让刮刀始终贴着发光提示线。" : "可从任意一段开始，完成的轮廓会变成浅金色。",
      hint: "沿上、右、下、左四段外轮廓完成修整",
      note: "刮刀已选中 · 按住并沿提示线滑动",
    };
  }
  return {
    task: "刚脱模的大阿福边缘还有溢出的泥料，请先选择刮刀。",
    tip: "选中刮刀后，外轮廓会显示修整提示线。",
    hint: "第一步：点击制作区左侧的“刮刀”",
    note: "修整准备 · 先选择工具",
  };
}

function getDryingCopy() {
  if (state.dryingDone) {
    return {
      task: "晾干完成。\n大阿福的泥坯已经稳定成形。",
      tip: "泥坯已经干燥，可以开始上色了。",
      hint: "晾干完成，可以进入下一步",
      note: "晾干完成 · 准备为大阿福上色",
    };
  }
  return {
    task: "大阿福正在自然晾干，请耐心等待约 5 秒。",
    tip: "制作泥人，只有慢慢来才能做好。",
    hint: "等待倒计时结束后，才能进入下一步",
    note: "自然晾干中 · 请耐心等待",
  };
}

function getPaintCopy() {
  const paintedCount = Object.values(state.paintAreas).filter(Boolean).length;
  const appliedPattern = paintPatterns.find((pattern) => pattern.asset === state.paintPattern);
  if (paintedCount === 4 && appliedPattern) {
    return {
      task: `上色与纹样添加完成。\n大阿福已经装饰上${appliedPattern.label}。`,
      tip: "颜色与纹样已经分别添加到正确区域。",
      hint: "全部制作完成，可以生成作品",
      note: `制作完成 · ${appliedPattern.label}已添加到衣服`,
    };
  }
  if (paintedCount === 4) {
    return {
      task: "四个部位已经完成上色。\n请选择最后的纹样，并将它拖到衣服区域。",
      tip: "纹样只能最后添加，请将纹样拖动到衣服区域内。",
      hint: "团花纹、团鹤纹、寿字纹任选其一",
      note: "最后一步 · 为衣服添加纹样",
    };
  }
  return {
    task: "衣服可以用调色盘自由选色；脸部、怀抱物和裤鞋仍将颜色拖到对应部位。",
    tip: "调色盘只会改变衣服，手部颜色不会变化；四个部位完成后才能添加纹样。",
    hint: `已完成 ${paintedCount} / 4 个上色区域`,
    note: "拖动上色 · 部位和颜色一目了然",
  };
}

function resetMoldPiecePosition(piece, kind) {
  piece.style.left = kind === "clay" ? "12%" : "87%";
  piece.style.top = kind === "clay" ? "70%" : "52%";
  piece.classList.remove("magnetic", "snapped");
}

function renderClayFillVisual() {
  const fill = state.moldFill || defaultState.moldFill;
  const left = 28 + 92 * fill.left / 100;
  const right = 28 + 92 * fill.right / 100;
  const up = 28 + 142 * fill.up / 100;
  const down = 28 + 142 * fill.down / 100;
  claySpreadRect.setAttribute("x", String(150 - left));
  claySpreadRect.setAttribute("y", String(200 - up));
  claySpreadRect.setAttribute("width", String(left + right));
  claySpreadRect.setAttribute("height", String(up + down));
  claySpreadRect.setAttribute("rx", String(Math.max(24, 54 - Object.values(fill).reduce((sum, value) => sum + value, 0) / 12)));
  fillDirections.querySelectorAll("[data-fill-direction]").forEach((arrow) => {
    arrow.classList.toggle("done", fill[arrow.dataset.fillDirection] >= 95);
  });
}

function renderMoldGame() {
  const active = state.stage === 1;
  moldGame.hidden = !active;
  if (!active) return;

  const showBackMold = state.clayFilled && !state.backMoldAligned;
  clayPiece.hidden = state.moldPlaced;
  clayFillSurface.toggleAttribute("hidden", !state.moldPlaced);
  clayFillSurface.classList.toggle("filled", state.clayFilled);
  fillDirections.hidden = !state.moldPlaced || state.clayFilled;
  backMoldPiece.hidden = !(showBackMold || state.backMoldAligned);
  moldTargetOutline.classList.toggle("show", state.moldMisses >= 2 && (!state.moldPlaced || showBackMold) && !state.backMoldAligned);
  moldGame.classList.toggle("completed", state.backMoldAligned);
  moldPhaseBadge.textContent = state.backMoldAligned ? "翻模完成" : state.clayFilled ? "第 3 步 · 对齐背面模具" : state.moldPlaced ? "第 2 步 · 四向拉伸填模" : "第 1 步 · 放入泥坯";
  if (!state.moldPlaced) resetMoldPiecePosition(clayPiece, "clay");
  if (showBackMold) resetMoldPiecePosition(backMoldPiece, "back");
  if (state.backMoldAligned) {
    backMoldPiece.style.left = "50%";
    backMoldPiece.style.top = "52%";
    backMoldPiece.classList.add("snapped");
    backMoldPiece.disabled = true;
  } else {
    backMoldPiece.disabled = false;
  }
  renderClayFillVisual();
}

function renderTrimGame() {
  const active = state.stage === 2;
  trimGame.hidden = !active;
  if (!active) return;

  const progress = state.progress[2];
  const toolReady = state.trimTool === "scraper" && progress < 100;
  trimGame.classList.toggle("tool-ready", toolReady);
  trimGame.classList.toggle("completed", progress >= 100);
  scraperTool.classList.toggle("selected", state.trimTool === "scraper");
  scraperTool.setAttribute("aria-pressed", String(state.trimTool === "scraper"));
  scraperTool.disabled = progress >= 100;
  trimGuide.style.visibility = state.trimTool === "scraper" ? "visible" : "hidden";
  trimRoughImage.style.opacity = String(Math.max(0, 1 - progress / 100));
  trimCleanImage.style.opacity = String(progress / 100);
  trimGuide.querySelectorAll("[data-trim-path]").forEach((path) => {
    path.style.strokeDashoffset = String(100 - state.trimZones[path.dataset.trimPath]);
  });
  trimPhaseBadge.textContent = progress >= 100 ? "修整完成" : toolReady ? `沿提示线修整 · ${progress}%` : "先从工具架选择刮刀";
}

function renderKneadingVisual() {
  const active = state.stage === 0;
  const progress = state.progress[0];
  kneadingProgress.hidden = !active || progress === 0;
  kneadingProgressText.textContent = progress >= 100 ? "已完成" : `${progress}%`;
  kneadingBar.style.width = `${progress}%`;
  kneadingProgress.classList.toggle("done", progress >= 100);
  figureWrap.classList.toggle("kneading", active && progress < 100);
  if (!active || progress >= 100) stageImage.style.cursor = "default";
}

function renderDryingVisual() {
  const active = state.stage === 3;
  dryingProgress.hidden = !active;
  figureWrap.classList.toggle("drying-size", active);
  if (!active) return;

  const progress = state.progress[3];
  const remaining = Math.max(0, DRYING_DURATION - (state.dryingStartedAt ? Date.now() - state.dryingStartedAt : 0));
  dryingBar.style.width = `${progress}%`;
  dryingCountdown.textContent = state.dryingDone ? "已完成" : `${(remaining / 1000).toFixed(1)} 秒`;
  dryingProgress.classList.toggle("done", state.dryingDone);
}

function renderPaintRegions() {
  const active = state.stage === 4;
  paintAssetLayers.hidden = !active;
  paintAssetLayers.classList.toggle("assets-ready", paintAssetsReady);
  figureWrap.classList.toggle("painting-size", active);
  $(".right-panel").classList.toggle("painting-mode", active);
  if (!active) return;

  paintAssetLayers.querySelectorAll("[data-paint-layer]").forEach((layer) => {
    const part = layer.dataset.paintLayer;
    const asset = state.paintAreas[part] || getSelectedPaintVariant(part).asset;
    const preparedAsset = paintPreparedAssets[asset];
    const image = layer.querySelector("img");
    if (preparedAsset && image.src !== preparedAsset) image.src = preparedAsset;
    layer.classList.toggle("visible", Boolean(state.paintAreas[part]));
  });
  const patternLayer = paintAssetLayers.querySelector("[data-paint-pattern-layer]");
  const preparedPattern = paintPreparedAssets[state.paintPattern];
  const patternImage = patternLayer.querySelector("img");
  if (preparedPattern && patternImage.src !== preparedPattern) patternImage.src = preparedPattern;
  patternLayer.classList.toggle("visible", Boolean(state.paintPattern));
}

function ensureDryingTimer() {
  if (state.stage !== 3 || state.dryingDone) {
    clearInterval(dryingTimer);
    dryingTimer = null;
    return;
  }
  if (!state.dryingStartedAt) {
    state.dryingStartedAt = Date.now();
    state.progress[3] = 0;
    saveState();
    renderDryingVisual();
  }
  if (dryingTimer) return;

  dryingTimer = window.setInterval(() => {
    if (state.stage !== 3) {
      clearInterval(dryingTimer);
      dryingTimer = null;
      return;
    }
    normalizeDryingState();
    renderDryingVisual();
    $("#progressBar").style.width = `${state.progress[3]}%`;
    $("#progressText").textContent = `${state.progress[3]}%`;
    $("#stageStatus").textContent = state.dryingDone ? "本步骤已完成" : `晾干中 · 还需 ${dryingCountdown.textContent}`;
    $("#interactionHint").textContent = state.dryingDone ? "晾干完成，可以进入下一步" : `请耐心等待，还需 ${dryingCountdown.textContent}`;
    if (!state.dryingDone) return;

    clearInterval(dryingTimer);
    dryingTimer = null;
    saveState();
    showToast("晾干完成，准备为大阿福上色");
    render();
  }, 100);
}

function render() {
  normalizeMoldState();
  normalizeTrimState();
  normalizeDryingState();
  normalizePaintState();
  const stage = currentStage();
  const progress = state.progress[state.stage];
  const kneadingCopy = state.stage === 0 && progress > 0 ? {
    hint: progress >= 100 ? "揉泥完成，可以进入下一步" : "继续按住泥团来回拖动",
  } : null;
  const moldCopy = state.stage === 1 ? getMoldCopy() : null;
  const trimCopy = state.stage === 2 ? getTrimCopy() : null;
  const dryingCopy = state.stage === 3 ? getDryingCopy() : null;
  const paintCopy = state.stage === 4 ? getPaintCopy() : null;
  const sceneCopy = kneadingCopy || moldCopy || trimCopy || dryingCopy || paintCopy;
  renderSteps();
  $("#stepCounter").textContent = `${state.stage + 1} / ${stages.length}`;
  $("#stepTitle").textContent = stage.name;
  $("#progressBar").style.width = `${progress}%`;
  $("#progressText").textContent = `${progress}%`;
  $("#taskCopy").textContent = sceneCopy?.task || stage.task;
  $("#tipCopy").textContent = sceneCopy?.tip || stage.tip;
  $("#interactionHint").textContent = sceneCopy?.hint || stage.hint;
  $("#stageNote").textContent = sceneCopy?.note || stage.hint;
  $("#stageNote").hidden = state.stage === 3 || (state.stage === 0 && progress > 0);
  $("#stageStatus").textContent = progress >= 100 ? "本步骤已完成" : `${stage.name}进行中`;
  $("#nextButton").textContent = state.stage === stages.length - 1 ? "完成作品 →" : "进入下一步 →";
  $("#nextButton").disabled = [0, 1, 2].includes(state.stage) && progress < 100;
  $("#prevButton").disabled = state.stage === 0;
  $("#undoButton").disabled = history.length === 0;
  if (state.stage === 0) {
    renderKneadingFrame(progress);
  } else {
    kneadingBlendImage.hidden = true;
    kneadingBlendImage.style.opacity = "0";
    stageImage.src = progress >= 100 && stage.doneImage ? stage.doneImage : stage.image;
  }
  stageImage.alt = `${stage.name}阶段的惠山泥人制作素材`;
  stageImage.classList.toggle("portrait-source", state.stage >= 1);
  figureWrap.classList.toggle("active", progress > 0 && progress < 100);
  paintWash.classList.remove("is-on");
  figurePattern.textContent = state.pattern.replace("纹", "");
  figurePattern.classList.remove("is-on");
  figurePattern.style.setProperty("--pattern-color", state.color);
  figureProp.textContent = state.prop === "小灯笼" ? "🏮" : state.prop === "莲花" ? "✿" : "结";
  figureProp.classList.remove("is-on");
  eyePoint.hidden = true;
  figureWrap.hidden = [1, 2].includes(state.stage);
  figureShadow.hidden = [1, 2].includes(state.stage);
  renderMoldGame();
  renderTrimGame();
  renderKneadingVisual();
  renderDryingVisual();
  renderPaintRegions();
  renderOptions();
  ensureDryingTimer();
  if (state.stage === 4 && !workshopShell.hidden) ensurePaintAssets();
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function addDust(x, y, amount = 8) {
  for (let i = 0; i < amount; i += 1) {
    const dot = document.createElement("i");
    dot.className = "dust-dot";
    dot.style.left = `${x + (Math.random() * 24 - 12)}px`;
    dot.style.top = `${y + (Math.random() * 20 - 10)}px`;
    dot.style.setProperty("--dx", `${Math.random() * 80 - 40}px`);
    dot.style.setProperty("--dy", `${Math.random() * -70 - 10}px`);
    $("#clayDust").append(dot);
    dot.addEventListener("animationend", () => dot.remove(), { once: true });
  }
}

function completeCurrentStage() {
  if (state.stage === 0 && state.progress[0] < 100) {
    showToast("请先在泥团上按住鼠标拖动，完成揉泥");
    return;
  }
  if (state.stage === 1 && state.progress[1] < 100) {
    showToast("请先完成泥坯放置和背面模具对齐");
    return;
  }
  if (state.stage === 2 && state.progress[2] < 100) {
    showToast(state.trimTool === "scraper" ? "请沿提示线完成外轮廓修整" : "请先选择刮刀");
    return;
  }
  if (state.stage === 3 && !state.dryingDone) {
    normalizeDryingState();
    if (!state.dryingDone) {
      $("#patienceDialog").hidden = false;
      $("#closePatienceDialog").focus();
      return;
    }
    saveState();
    render();
  }
  if (state.stage === 4 && state.progress[4] < 100) {
    const paintedCount = Object.values(state.paintAreas).filter(Boolean).length;
    showToast(paintedCount < 4 ? "请先完成脸部、衣服、怀抱物和裤鞋上色" : "请最后选择一个纹样并拖到衣服区域");
    return;
  }
  if (state.stage === stages.length - 1) {
    $("#completionImage").src = stageImage.src;
    const completionFigure = $("#completionFigure");
    completionFigure.querySelector(".completion-paint-layers")?.remove();
    const completedPaint = paintAssetLayers.cloneNode(true);
    completedPaint.id = "completionPaintLayers";
    completedPaint.classList.add("completion-paint-layers");
    completedPaint.removeAttribute("hidden");
    completionFigure.append(completedPaint);
    $("#completionCard").hidden = false;
    return;
  }
  updateState(() => { state.stage += 1; });
  showToast(`进入下一步：${currentStage().name}`);
}

function goPrevious() {
  if (state.stage === 0) { showToast("已经是第一步了"); return; }
  updateState(() => { state.stage -= 1; });
}

stepList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-stage]");
  if (!button) return;
  updateState(() => { state.stage = Number(button.dataset.stage); });
});

$("#nextButton").addEventListener("click", completeCurrentStage);
$("#prevButton").addEventListener("click", goPrevious);
$("#closePatienceDialog").addEventListener("click", () => {
  $("#patienceDialog").hidden = true;
  $("#nextButton").focus();
});
introScreen.addEventListener("click", enterHomeFromIntro);
$("#openStorybook").addEventListener("click", () => {
  storyPageIndex = 0;
  applyStoryPage();
  closeStorybookToc();
  showExperienceView("storybook");
});
$("#openWorkshop").addEventListener("click", () => showExperienceView("workshop"));
$("#storybookHome").addEventListener("click", () => {
  closeStorybookToc();
  showExperienceView("home");
});
$("#storybookPrev").addEventListener("click", () => turnStoryPage(storyPageIndex - 1));
$("#storybookNext").addEventListener("click", () => turnStoryPage(storyPageIndex + 1));
$("#storybookTocButton").addEventListener("click", () => {
  const toc = $("#storybookToc");
  toc.hidden = !toc.hidden;
  $("#storybookTocButton").setAttribute("aria-expanded", String(!toc.hidden));
});
$("#storybookDots").addEventListener("click", (event) => {
  const dot = event.target.closest("[data-story-page]");
  if (!dot) return;
  closeStorybookToc();
  turnStoryPage(Number(dot.dataset.storyPage));
});
$("#saveButton").addEventListener("click", () => saveState(true));
$("#worksHistoryButton").addEventListener("click", () => {
  renderWorksHistory();
  $("#worksHistory").hidden = false;
});
$("#closeWorksHistory").addEventListener("click", () => {
  $("#worksHistory").hidden = true;
  $("#worksHistoryButton").focus();
});
$("#resetButton").addEventListener("click", () => {
  if (!window.confirm("确定要清空当前制作进度吗？")) return;
  restartProject();
  showToast("工作台已重置");
});
$("#homeButton").addEventListener("click", () => showExperienceView("home"));
$("#soundButton").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const enabled = button.getAttribute("aria-pressed") !== "true";
  button.setAttribute("aria-pressed", String(enabled));
  showToast(enabled ? "声音提示已开启" : "声音提示已关闭");
});

$("#exportButton").addEventListener("click", () => {
  const data = {
    title: "我的大阿福",
    paintAreas: state.paintAreas,
    progress: state.progress,
    exportedAt: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "我的大阿福-制作记录.json";
  link.click();
  URL.revokeObjectURL(link.href);
  showToast("制作记录已导出");
});

$("#undoButton").addEventListener("click", () => {
  if (!history.length) { showToast("当前步骤暂无可撤销操作"); return; }
  const previousState = JSON.parse(history.pop());
  if (previousState.stage !== state.stage) {
    history = [];
    render();
    showToast("当前步骤暂无可撤销操作");
    return;
  }
  state = previousState;
  saveState();
  render();
  showToast(`已撤销“${currentStage().name}”中的上一步操作`);
});

$("#redoButton").addEventListener("click", () => {
  restartProject();
  showToast("已重新开始制作，从第一步“揉泥”开始");
});

let paintDrag = null;

function rawPaintMaskHit(part, clientX, clientY) {
  const mask = paintHitMasks[part];
  if (!mask) return false;
  const rect = figureWrap.getBoundingClientRect();
  const x = (clientX - rect.left) / rect.width;
  const y = (clientY - rect.top) / rect.height;
  if (x < 0 || x > 1 || y < 0 || y > 1) return false;

  const sourceX = Math.round(x * (mask.width - 1));
  const sourceY = Math.round(y * (mask.height - 1));
  const radius = Math.max(2, Math.round(mask.width / 220));
  for (let offsetY = -radius; offsetY <= radius; offsetY += 2) {
    for (let offsetX = -radius; offsetX <= radius; offsetX += 2) {
      const sampleX = sourceX + offsetX;
      const sampleY = sourceY + offsetY;
      if (sampleX < 0 || sampleX >= mask.width || sampleY < 0 || sampleY >= mask.height) continue;
      if (mask.alpha[sampleY * mask.width + sampleX] > 32) return true;
    }
  }
  return false;
}

function paintPartAt(x, y, preferredPart) {
  if (preferredPart && rawPaintMaskHit(preferredPart, x, y)) return preferredPart;
  return Object.keys(paintParts).find((part) => rawPaintMaskHit(part, x, y)) || "";
}

function clearPaintDragPreview() {
  paintAssetLayers.querySelectorAll(".drag-preview").forEach((layer) => layer.classList.remove("drag-preview"));
}

function movePaintGhost(event) {
  if (!paintDrag) return;
  if (Math.hypot(event.clientX - paintDrag.startX, event.clientY - paintDrag.startY) >= 8) {
    paintDrag.moved = true;
    paintDrag.ghost.classList.add("active");
  }
  paintDrag.ghost.style.left = `${event.clientX}px`;
  paintDrag.ghost.style.top = `${event.clientY}px`;
  const targetPart = paintPartAt(event.clientX, event.clientY, paintDrag.part);
  paintDrag.ghost.classList.toggle("valid", targetPart === paintDrag.part);
  paintDrag.ghost.classList.toggle("invalid", Boolean(targetPart) && targetPart !== paintDrag.part);
}

function showPaintError(part, droppedPart, colorLabel) {
  const source = paintParts[part];
  const target = droppedPart ? paintParts[droppedPart]?.label : "泥人轮廓外";
  $("#paintErrorCopy").textContent = target
    ? `“${colorLabel}”不能放在“${target}”。请把它拖到“${source.label}”区域。`
    : `没有找到上色区域，请把“${colorLabel}”拖到“${source.label}”轮廓内。`;
  $("#paintErrorDialog").hidden = false;
  $("#closePaintErrorDialog").focus();
}

function showPatternError() {
  $("#paintErrorCopy").textContent = "请将纹样添加到衣服处。";
  $("#paintErrorDialog").hidden = false;
  $("#closePaintErrorDialog").focus();
}

async function endPaintDrag(event, canceled = false) {
  if (!paintDrag || event.pointerId !== paintDrag.pointerId) return;
  const { kind, part, variant, ghost, button, startX, startY, moved } = paintDrag;
  const wasDragged = moved || Math.hypot(event.clientX - startX, event.clientY - startY) >= 8;
  const targetPart = wasDragged ? paintPartAt(event.clientX, event.clientY, part) : "";
  paintDrag = null;
  clearPaintDragPreview();
  button.classList.remove("dragging");
  ghost.remove();
  document.body.classList.remove("paint-dragging");
  if (canceled || !wasDragged) { renderPaintRegions(); return; }
  if (targetPart === part) {
    if (kind === "pattern") {
      updateState(() => { state.paintPattern = variant.asset; });
      showToast(`${variant.label}已添加到衣服，制作完成`);
      return;
    }
    updateState(() => {
      state.selectedPaintPart = part;
      state.paintSelections[part] = variant.asset;
      state.paintAreas[part] = variant.asset;
    });
    showToast(`${paintParts[part].label}已换成${variant.colorLabel}，其他部位颜色继续保留`);
    return;
  }
  renderPaintRegions();
  if (kind === "pattern") showPatternError();
  else showPaintError(part, targetPart, variant.colorLabel);
}

$("#optionGroup").addEventListener("change", async (event) => {
  const picker = event.target.closest("[data-clothes-palette]");
  if (!picker || picker.disabled || !paintAssetsReady || state.stage !== 4) return;
  const color = picker.value.toLowerCase();
  picker.disabled = true;
  try {
    await prepareClothesTint(color);
    updateState(() => {
      state.clothesColor = color;
      state.selectedPaintPart = "clothes";
      state.paintAreas.clothes = CLOTHES_MASK_ASSET;
    });
    showToast("衣服颜色已更换，手部颜色保持不变");
  } catch (error) {
    console.error(error);
    picker.disabled = false;
    showToast("衣服颜色生成失败，请重新选择");
  }
});

$("#optionGroup").addEventListener("pointerdown", (event) => {
  const button = event.target.closest("[data-paint-swatch], [data-pattern-swatch]");
  if (!button || button.disabled || !paintAssetsReady || state.stage !== 4 || paintDrag) return;
  const isPattern = button.hasAttribute("data-pattern-swatch");
  const kind = isPattern ? "pattern" : "color";
  const part = isPattern ? "clothes" : button.dataset.paintSwatch;
  const variant = isPattern
    ? paintPatterns.find((item) => item.asset === button.dataset.patternAsset)
    : paintParts[part]?.variants.find((item) => item.asset === button.dataset.paintAsset);
  if (!variant) return;
  const ghost = document.createElement("div");
  ghost.className = "paint-drag-ghost";
  ghost.style.setProperty("--swatch", variant.color);
  ghost.innerHTML = `<i></i><span>${isPattern ? variant.label : variant.colorLabel}</span>`;
  document.body.append(ghost);
  paintDrag = {
    kind,
    part,
    variant,
    pointerId: event.pointerId,
    ghost,
    button,
    startX: event.clientX,
    startY: event.clientY,
    moved: false,
  };
  const layer = paintAssetLayers.querySelector(isPattern ? "[data-paint-pattern-layer]" : `[data-paint-layer="${part}"]`);
  const image = layer?.querySelector("img");
  const previewAsset = variant.asset;
  if (image && paintPreparedAssets[previewAsset]) image.src = paintPreparedAssets[previewAsset];
  layer?.classList.add("drag-preview");
  button.classList.add("dragging");
  document.body.classList.add("paint-dragging");
  button.setPointerCapture?.(event.pointerId);
  movePaintGhost(event);
  event.preventDefault();
});

document.addEventListener("pointermove", (event) => {
  if (!paintDrag || event.pointerId !== paintDrag.pointerId) return;
  movePaintGhost(event);
});
document.addEventListener("pointerup", (event) => endPaintDrag(event));
document.addEventListener("pointercancel", (event) => endPaintDrag(event, true));

$("#closePaintErrorDialog").addEventListener("click", () => {
  $("#paintErrorDialog").hidden = true;
  $("[data-paint-swatch], [data-pattern-swatch]")?.focus();
});

scraperTool.addEventListener("click", () => {
  if (state.stage !== 2 || state.progress[2] >= 100 || state.trimTool === "scraper") return;
  updateState(() => { state.trimTool = "scraper"; });
  showToast("刮刀已选中，请沿橙色提示线滑动");
});

let moldDrag = null;
let moldTransitioning = false;

function setMoldFeedback(visible, magnetic = false) {
  magnetHint.classList.toggle("show", visible);
  moldTargetOutline.classList.toggle("magnetic", magnetic);
  if (moldDrag?.piece) moldDrag.piece.classList.toggle("magnetic", visible);
}

function beginMoldDrag(event, kind) {
  if (state.stage !== 1 || moldTransitioning) return;
  const piece = kind === "clay" ? clayPiece : backMoldPiece;
  const pieceRect = piece.getBoundingClientRect();
  const gameRect = moldGame.getBoundingClientRect();
  moldDrag = {
    piece,
    kind,
    pointerId: event.pointerId,
    offsetX: event.clientX - (pieceRect.left + pieceRect.width / 2),
    offsetY: event.clientY - (pieceRect.top + pieceRect.height / 2),
    snapped: false,
  };
  piece.style.left = `${pieceRect.left + pieceRect.width / 2 - gameRect.left}px`;
  piece.style.top = `${pieceRect.top + pieceRect.height / 2 - gameRect.top}px`;
  piece.classList.add("dragging");
  piece.setPointerCapture(event.pointerId);
  event.preventDefault();
}

function moveMoldPiece(event) {
  if (!moldDrag || event.pointerId !== moldDrag.pointerId) return;
  const gameRect = moldGame.getBoundingClientRect();
  const targetRect = $("#frontMold").getBoundingClientRect();
  const pieceRect = moldDrag.piece.getBoundingClientRect();
  const targetX = targetRect.left + targetRect.width / 2 - gameRect.left;
  const targetY = targetRect.top + targetRect.height / 2 - gameRect.top;
  const x = Math.max(pieceRect.width / 2, Math.min(gameRect.width - pieceRect.width / 2, event.clientX - gameRect.left - moldDrag.offsetX));
  const y = Math.max(pieceRect.height / 2, Math.min(gameRect.height - pieceRect.height / 2, event.clientY - gameRect.top - moldDrag.offsetY));
  const distance = Math.hypot(x - targetX, y - targetY);
  const snapDistance = Math.min(targetRect.width, targetRect.height) * .22;
  const magnetDistance = Math.min(targetRect.width, targetRect.height) * .48;

  if (distance <= snapDistance) {
    moldDrag.piece.style.left = `${targetX}px`;
    moldDrag.piece.style.top = `${targetY}px`;
    moldDrag.snapped = true;
    setMoldFeedback(true, true);
  } else {
    moldDrag.piece.style.left = `${x}px`;
    moldDrag.piece.style.top = `${y}px`;
    moldDrag.snapped = false;
    setMoldFeedback(distance <= magnetDistance, false);
  }
}

function finishMoldPlacement(kind, piece) {
  moldTransitioning = true;
  snapshot();
  if (kind === "clay") {
    state.moldPlaced = true;
    state.clayFilled = false;
    state.moldFill = { ...defaultState.moldFill };
    state.progress[1] = 50;
    showToast("泥坯已到位，继续向四个方向拉伸填满轮廓");
  } else {
    state.backMoldAligned = true;
    state.progress[1] = 100;
    showToast("翻模完成，大阿福的基本形态已经形成");
  }
  saveState();
  piece.classList.add("snapped");
  const gameRect = moldGame.getBoundingClientRect();
  addDust(gameRect.left + gameRect.width / 2 - stageArea.getBoundingClientRect().left, gameRect.height / 2, 12);
  window.setTimeout(() => {
    moldTransitioning = false;
    render();
  }, 300);
}

function rejectMoldPlacement(kind, piece) {
  snapshot();
  state.moldMisses += 1;
  saveState();
  resetMoldPiecePosition(piece, kind);
  piece.classList.add("is-bouncing");
  moldTargetOutline.classList.toggle("show", state.moldMisses >= 2);
  $("#tipCopy").textContent = state.moldMisses >= 2 ? "正确位置轮廓已显示，沿虚线慢慢靠近。" : "移动到模具附近时会出现磁吸提示。";
  showToast("再调整一下位置");
  window.setTimeout(() => piece.classList.remove("is-bouncing"), 430);
}

function endMoldDrag(event) {
  if (!moldDrag || event.pointerId !== moldDrag.pointerId) return;
  const { kind, piece, snapped } = moldDrag;
  piece.classList.remove("dragging", "magnetic");
  setMoldFeedback(false, false);
  moldDrag = null;
  if (snapped) finishMoldPlacement(kind, piece);
  else rejectMoldPlacement(kind, piece);
}

clayPiece.addEventListener("pointerdown", (event) => beginMoldDrag(event, "clay"));
backMoldPiece.addEventListener("pointerdown", (event) => beginMoldDrag(event, "back"));
[clayPiece, backMoldPiece].forEach((piece) => {
  piece.addEventListener("pointermove", moveMoldPiece);
  piece.addEventListener("pointerup", endMoldDrag);
  piece.addEventListener("pointercancel", endMoldDrag);
});

let clayFillDrag = null;

function updateFillProgressDisplay() {
  normalizeMoldState();
  const progress = state.progress[1];
  $("#progressBar").style.width = `${progress}%`;
  $("#progressText").textContent = `${progress}%`;
  $("#stageStatus").textContent = `翻模进行中 · 填模 ${Math.max(0, Math.round((progress - 50) * 4))}%`;
}

clayFillSurface.addEventListener("pointerdown", (event) => {
  if (state.stage !== 1 || !state.moldPlaced || state.clayFilled || moldTransitioning) return;
  snapshot();
  clayFillDrag = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
  clayFillSurface.setPointerCapture(event.pointerId);
  event.preventDefault();
});

clayFillSurface.addEventListener("pointermove", (event) => {
  if (!clayFillDrag || event.pointerId !== clayFillDrag.pointerId) return;
  const dx = event.clientX - clayFillDrag.x;
  const dy = event.clientY - clayFillDrag.y;
  if (Math.hypot(dx, dy) < 3) return;
  const rect = clayFillSurface.getBoundingClientRect();
  let direction;
  let gain;
  if (Math.abs(dx) >= Math.abs(dy)) {
    direction = dx >= 0 ? "right" : "left";
    gain = Math.abs(dx) / rect.width * 175;
  } else {
    direction = dy >= 0 ? "down" : "up";
    gain = Math.abs(dy) / rect.height * 210;
  }
  state.moldFill[direction] = Math.min(100, state.moldFill[direction] + gain);
  clayFillDrag.x = event.clientX;
  clayFillDrag.y = event.clientY;
  clayFillDrag.moved = true;
  renderClayFillVisual();
  updateFillProgressDisplay();
});

function endClayFill(event) {
  if (!clayFillDrag || event.pointerId !== clayFillDrag.pointerId) return;
  const moved = clayFillDrag.moved;
  clayFillDrag = null;
  const complete = Object.values(state.moldFill).every((value) => value >= 95);
  if (complete) {
    Object.keys(state.moldFill).forEach((direction) => { state.moldFill[direction] = 100; });
    state.clayFilled = true;
    state.progress[1] = 75;
    showToast("正面模具已经填满，接下来对齐背面模具");
    addDust(stageArea.clientWidth / 2, stageArea.clientHeight / 2, 14);
  } else if (moved) {
    const labels = { up: "上", right: "右", down: "下", left: "左" };
    const unfinished = Object.entries(state.moldFill).filter(([, value]) => value < 95).map(([direction]) => labels[direction]);
    showToast(`继续向${unfinished.join("、")}拉伸泥土`);
  }
  saveState();
  render();
}

clayFillSurface.addEventListener("pointerup", endClayFill);
clayFillSurface.addEventListener("pointercancel", endClayFill);

let trimDrag = null;
let trimPathSamples = null;

function buildTrimPathSamples() {
  trimPathSamples = {};
  trimGuide.querySelectorAll("[data-trim-path]").forEach((path) => {
    const length = path.getTotalLength();
    trimPathSamples[path.dataset.trimPath] = Array.from({ length: 51 }, (_, index) => {
      const point = path.getPointAtLength(length * index / 50);
      return { x: point.x, y: point.y };
    });
  });
}

function trimPoint(event) {
  const rect = trimGuide.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * 1000 / rect.width,
    y: (event.clientY - rect.top) * 1240 / rect.height,
    localX: event.clientX - rect.left,
    localY: event.clientY - rect.top,
  };
}

function nearestTrimZone(point) {
  if (!trimPathSamples) buildTrimPathSamples();
  let nearest = { zone: "", distance: Infinity };
  Object.entries(trimPathSamples).forEach(([zone, samples]) => {
    samples.forEach((sample) => {
      const distance = Math.hypot(point.x - sample.x, point.y - sample.y);
      if (distance < nearest.distance) nearest = { zone, distance };
    });
  });
  return nearest;
}

function updateTrimProgressDisplay() {
  normalizeTrimState();
  renderTrimGame();
  const progress = state.progress[2];
  $("#progressBar").style.width = `${progress}%`;
  $("#progressText").textContent = `${progress}%`;
  $("#stageStatus").textContent = `脱模与修整进行中 · ${progress}%`;
}

trimGuide.addEventListener("pointerdown", (event) => {
  if (state.stage !== 2 || state.progress[2] >= 100) return;
  if (state.trimTool !== "scraper") {
    showToast("请先从左侧工具架选择刮刀");
    return;
  }
  snapshot();
  const point = trimPoint(event);
  trimDrag = { pointerId: event.pointerId, lastPoint: point, validDistance: 0, missed: false };
  trimGuide.setPointerCapture(event.pointerId);
  trimGame.classList.add("is-trimming");
  trimBladeCursor.style.left = `${point.localX}px`;
  trimBladeCursor.style.top = `${point.localY}px`;
  event.preventDefault();
});

trimGuide.addEventListener("pointermove", (event) => {
  if (!trimDrag || event.pointerId !== trimDrag.pointerId) return;
  const point = trimPoint(event);
  trimBladeCursor.style.left = `${point.localX}px`;
  trimBladeCursor.style.top = `${point.localY}px`;
  const stepDistance = Math.hypot(point.x - trimDrag.lastPoint.x, point.y - trimDrag.lastPoint.y);
  trimDrag.lastPoint = point;
  if (stepDistance < 2 || stepDistance > 130) return;

  const nearest = nearestTrimZone(point);
  if (nearest.distance > 78) {
    trimDrag.missed = true;
    return;
  }

  const gain = stepDistance / 3.4;
  state.trimZones[nearest.zone] = Math.min(100, state.trimZones[nearest.zone] + gain);
  trimDrag.validDistance += stepDistance;
  updateTrimProgressDisplay();
  if (Math.random() > .72) {
    const stageRect = stageArea.getBoundingClientRect();
    addDust(event.clientX - stageRect.left, event.clientY - stageRect.top, 2);
  }
});

function endTrimDrag(event) {
  if (!trimDrag || event.pointerId !== trimDrag.pointerId) return;
  const validDistance = trimDrag.validDistance;
  const missed = trimDrag.missed;
  trimDrag = null;
  trimGame.classList.remove("is-trimming");
  normalizeTrimState();
  if (state.progress[2] >= 100) {
    showToast("修整完成，溢出的泥料已经清除");
    addDust(stageArea.clientWidth / 2, stageArea.clientHeight / 2, 16);
  } else if (validDistance < 18 || missed) {
    state.trimMisses += 1;
    showToast("请贴着提示线慢慢滑动");
  } else {
    const labels = { top: "上方", right: "右侧", bottom: "下方", left: "左侧" };
    const unfinished = Object.entries(state.trimZones).filter(([, value]) => value < 99).map(([zone]) => labels[zone]);
    showToast(`继续修整${unfinished.join("、")}`);
  }
  saveState();
  render();
}

trimGuide.addEventListener("pointerup", endTrimDrag);
trimGuide.addEventListener("pointercancel", endTrimDrag);

const clayHitCanvas = document.createElement("canvas");
const clayHitContext = clayHitCanvas.getContext("2d", { willReadFrequently: true });
let clayHitSource = "";
const KNEADING_PIXELS_PER_PERCENT = 12;
let kneadingDrag = null;

function updateGestureCursor(event) {
  const rect = stageArea.getBoundingClientRect();
  gestureCursor.style.left = `${event.clientX - rect.left}px`;
  gestureCursor.style.top = `${event.clientY - rect.top}px`;
}

function isClayPoint(event) {
  if (state.stage !== 0 || state.progress[0] >= 100) return false;
  const rect = stageImage.getBoundingClientRect();
  if (!rect.width || !rect.height) return false;
  const imageRatio = stageImage.naturalWidth && stageImage.naturalHeight
    ? stageImage.naturalWidth / stageImage.naturalHeight
    : 1;
  const boxRatio = rect.width / rect.height;
  const drawnWidth = imageRatio > boxRatio ? rect.width : rect.height * imageRatio;
  const drawnHeight = imageRatio > boxRatio ? rect.width / imageRatio : rect.height;
  const offsetX = (rect.width - drawnWidth) / 2;
  const offsetY = (rect.height - drawnHeight) / 2;
  const localX = event.clientX - rect.left - offsetX;
  const localY = event.clientY - rect.top - offsetY;
  if (localX < 0 || localY < 0 || localX >= drawnWidth || localY >= drawnHeight) return false;
  if (kneadingDrag) return true;
  if (!stageImage.complete || !stageImage.naturalWidth) return false;
  if (clayHitSource !== stageImage.currentSrc) {
    clayHitCanvas.width = stageImage.naturalWidth;
    clayHitCanvas.height = stageImage.naturalHeight;
    clayHitContext.clearRect(0, 0, clayHitCanvas.width, clayHitCanvas.height);
    clayHitContext.drawImage(stageImage, 0, 0);
    clayHitSource = stageImage.currentSrc;
  }
  const pixelX = Math.min(stageImage.naturalWidth - 1, Math.floor(localX / drawnWidth * stageImage.naturalWidth));
  const pixelY = Math.min(stageImage.naturalHeight - 1, Math.floor(localY / drawnHeight * stageImage.naturalHeight));
  const pixel = clayHitContext.getImageData(pixelX, pixelY, 1, 1).data;
  return pixel[3] >= 32 && Math.max(pixel[0], pixel[1], pixel[2]) > 8;
}

function updateKneadingProgress() {
  const progress = state.progress[0];
  $("#progressBar").style.width = `${progress}%`;
  $("#progressText").textContent = `${progress}%`;
  $("#stageStatus").textContent = progress >= 100 ? "本步骤已完成" : `揉泥进行中 · ${progress}%`;
  $("#interactionHint").textContent = progress >= 100 ? "揉泥完成，可以进入下一步" : "继续按住泥团来回拖动";
  $("#stageNote").hidden = progress > 0;
  $("#nextButton").disabled = progress < 100;
  renderKneadingFrame(progress);
  figureWrap.classList.toggle("active", progress > 0 && progress < 100);
  renderKneadingVisual();
}

stageImage.addEventListener("pointerdown", (event) => {
  if (state.stage !== 0 || state.progress[0] >= 100 || !isClayPoint(event)) return;
  snapshot();
  kneadingDrag = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, travel: 0 };
  stageArea.classList.add("clay-hovering");
  figureWrap.classList.add("is-kneading");
  stageImage.setPointerCapture(event.pointerId);
  updateGestureCursor(event);
  event.preventDefault();
});

stageImage.addEventListener("pointermove", (event) => {
  if (state.stage !== 0) return;
  updateGestureCursor(event);
  const overClay = isClayPoint(event);
  stageImage.style.cursor = overClay ? "none" : "default";
  stageArea.classList.toggle("clay-hovering", overClay || Boolean(kneadingDrag));
  if (!kneadingDrag || kneadingDrag.pointerId !== event.pointerId || !overClay) return;
  const distance = Math.hypot(event.clientX - kneadingDrag.x, event.clientY - kneadingDrag.y);
  kneadingDrag.x = event.clientX;
  kneadingDrag.y = event.clientY;
  kneadingDrag.travel += distance;
  const increase = Math.floor(kneadingDrag.travel / KNEADING_PIXELS_PER_PERCENT);
  if (!increase) return;
  kneadingDrag.travel %= KNEADING_PIXELS_PER_PERCENT;
  const previousProgress = state.progress[0];
  state.progress[0] = Math.min(100, previousProgress + increase);
  updateKneadingProgress();
  const rect = stageArea.getBoundingClientRect();
  addDust(event.clientX - rect.left, event.clientY - rect.top, Math.min(3, increase));
  if (previousProgress < 100 && state.progress[0] >= 100) {
    showToast("揉泥完成，可以进入下一步了");
    endKneading(event);
  }
});

function endKneading(event) {
  if (!kneadingDrag || kneadingDrag.pointerId !== event.pointerId) return;
  kneadingDrag = null;
  stageArea.classList.remove("clay-hovering");
  figureWrap.classList.remove("is-kneading");
  saveState();
  render();
}

stageImage.addEventListener("pointerup", endKneading);
stageImage.addEventListener("pointercancel", endKneading);
stageImage.addEventListener("pointerleave", () => {
  if (!kneadingDrag) {
    stageArea.classList.remove("clay-hovering");
    stageImage.style.cursor = "default";
  }
});
stageImage.addEventListener("dragstart", (event) => event.preventDefault());

$("#closeCompletion").addEventListener("click", () => { $("#completionCard").hidden = true; });
$("#finishButton").addEventListener("click", async () => {
  const button = $("#finishButton");
  button.disabled = true;
  button.textContent = "正在保存作品…";
  try {
    const work = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: $("#workName").value.trim() || "我的大阿福",
      wish: $("#workWish").value.trim() || "愿平安喜乐，岁岁常欢。",
      maker: $("#makerName").value.trim() || "泥人学徒",
      createdAt: new Date().toISOString(),
      thumbnail: await createWorkThumbnail(),
    };
    savedWorks.unshift(work);
    savedWorks = savedWorks.slice(0, 12);
    saveWorks();
    saveState();
    showToast("作品卡已保存，可在“作品记录”中查看");
    $("#completionCard").hidden = true;
  } catch (error) {
    console.error(error);
    showToast("作品保存失败，请稍后重试");
  } finally {
    button.disabled = false;
    button.textContent = "保存我的作品卡";
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !storybookView.hidden) {
    if (!$("#storybookToc").hidden) {
      closeStorybookToc();
      $("#storybookTocButton").focus();
      return;
    }
    showExperienceView("home");
    return;
  }
  if (!storybookView.hidden) {
    if (event.key === "ArrowRight") $("#storybookNext").click();
    if (event.key === "ArrowLeft") $("#storybookPrev").click();
    return;
  }
  if (workshopShell.hidden) return;
  if (event.key === "Escape" && !$("#worksHistory").hidden) {
    $("#worksHistory").hidden = true;
    return;
  }
  if (event.key === "ArrowRight") completeCurrentStage();
  if (event.key === "ArrowLeft") goPrevious();
  if (event.key.toLowerCase() === "s") saveState(true);
});

render();
