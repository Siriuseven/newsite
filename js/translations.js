// 定义多语言包
const langPack = {
  zh: {
    mainpage: "首页",
    hCI1: "企业介绍",
    hCI2: "企业介绍",
    hEQ: "企业资质",
    hCC: "企业文化",
    hEP: "平野环保",
    hPC1: "产品中心",
    hb: "电池产品",
    hc: "充电机产品",
    he: "储能柜产品",
    hCU1: "联系我们",
    hCU2: "联系方式",
    hMB: "留言板",
    hJU: "加入我们",
    hCR: "校园招聘",
    hSR: "社会招聘",
	companyintro: "上海平野环保科技有限公司是一家集研发制造和贸易于一身的上海市级高科技企业。上海平野基于精细制造的理念，致力于高品质产品和零部件的制造和销售。主营产品为电动产业车辆专用的环保清洁能源系统，包括锂离子电池、钠离子电池和多功能充电机产品。"
  },
  en: {
    mainpage: "mainpage",
    hCI1: "Company Introduction",
    hCI2: "Company Introduction",
    hEQ: "Enterprise Qualifications",
    hCC: "Corporate Culture",
    hEP: "Hirano Environmental Protection",
    hPC1: "Product Center",
    hb: "Battery",
    hc: "Chargers",
    he: "Energy Storage",
    hCU1: "Contact Us",
    hCU2: "Contact Information",
    hMB: "Message Board",
    hJU: "Join Us",
    hCR: "Campus Recruitment",
    hSR: "Social Recruitment",
	companyintro:"Shanghai Plain Environmental Protection Technology Co., Ltd. is a Shanghai-level high-tech enterprise integrating R&D, manufacturing and trade.Based on the concept of fine manufacturing, Shanghai Plain is committed to the manufacture and sales of high-quality products and components.The main products are environmentally friendly and clean energy systems for electric industrial vehicles, including lithium-ion batteries, sodium-ion batteries and multi-functional charger products."
  }
  // 日语 (ja) 暂未提供，可后续添加
};

// 当前语言，默认为浏览器语言或中文
let currentLang = localStorage.getItem('userLanguage') || 'zh';

// 初始化页面语言
function initLanguage() {
  const savedLang = localStorage.getItem('userLanguage');
  if (savedLang && langPack[savedLang]) {
    currentLang = savedLang;
  }
  setLanguage(currentLang);
  updateLangButtons();
}

// 设置页面语言
function setLanguage(lang) {
  if (!langPack[lang]) {
    console.warn(`语言包 "${lang}" 不存在，使用默认语言。`);
    return;
  }

  const translations = langPack[lang];

  // 遍历该语言包中的所有 key
  for (const key in translations) {
    const element = document.getElementById(key);
    if (element) {
      element.textContent = translations[key];
    }
  }

  // 保存当前语言到本地存储
  localStorage.setItem('userLanguage', lang);
  currentLang = lang;
}

// 更新语言切换按钮的激活状态
function updateLangButtons() {
  const buttons = document.querySelectorAll('.lang-switch button');
  buttons.forEach(btn => {
    const lang = btn.getAttribute('data-lang');
    if (lang === currentLang) {
      btn.classList.add('active'); // 可选：为当前语言按钮添加样式
    } else {
      btn.classList.remove('active');
    }
  });
}

// 监听语言切换按钮点击
document.addEventListener('DOMContentLoaded', () => {
  const langButtons = document.querySelectorAll('.lang-switch button');

  langButtons.forEach(button => {
    button.addEventListener('click', () => {
      const lang = button.getAttribute('data-lang');
      if (lang && langPack[lang]) {
        setLanguage(lang);
        updateLangButtons();
      } else {
        console.warn(`未找到语言包: ${lang}`);
      }
    });
  });

  // 初始化页面语言
  initLanguage();
});