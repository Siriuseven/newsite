// ========== 动态加载 header 和 footer ==========
function loadPartials() {
  return new Promise((resolve) => {
    let loaded = 0;

    // 加载 header
    fetch("components/header.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("header").innerHTML = data;
        loaded++;
        if (loaded === 2) resolve();
      });

    // 加载 footer
    fetch("components/footer.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("footer").innerHTML = data;
        loaded++;
        if (loaded === 2) resolve();
      });
  });
}


// ========== 语言切换 ==========
// ========== 递归翻译函数 ==========
function applyTranslations(translations) {
	for (const key in translations) {
		const value = translations[key];
		if (typeof value === "object") {
			// 如果是嵌套对象，递归处理
			applyTranslations(value);
		} 
		else {
			const element = document.getElementById(key);
			if (element) {
				element.textContent = value;
			}
		}
	}
}

// ========== 设置语言 ==========
let currentLang = localStorage.getItem("userLanguage") || "zh";

function setLanguage(lang) {
	fetch(`translations/${lang}.json`)
		.then(res => res.json())
        .then(data => {
			applyTranslations(data); // 遍历整个 JSON
			localStorage.setItem("userLanguage", lang);
			currentLang = lang;
			updateLangButtons();
		})
		.catch(err => console.error("语言加载失败:", err));
}

// ========== 更新语言切换按钮样式 ==========
function updateLangButtons() {
	const buttons = document.querySelectorAll(".lang-switch button");
	buttons.forEach(btn => {
		const lang = btn.getAttribute("data-lang");
		if (lang === currentLang) {
			btn.classList.add("active");
		} 
		else {
			btn.classList.remove("active");
		}
	});
}

// ========== 绑定语言切换事件 ==========
function bindLangSwitch() {
	const langButtons = document.querySelectorAll(".lang-switch button");
	langButtons.forEach(button => {
		button.addEventListener("click", () => {
			const lang = button.getAttribute("data-lang");
			setLanguage(lang);
		});
	});
}




// ========== 初始化 ==========
document.addEventListener("DOMContentLoaded", () => {
	loadPartials().then(() => {
		// header/footer 加载完成后再绑定按钮和设置语言
		bindLangSwitch();
		// loadComponent("header", "components/header.html");
		// loadComponent("footer", "components/footer.html");
		setLanguage(currentLang);
		
		// 移动端菜单展开
		const menuToggle = document.querySelector('.mobile-menu-toggle');
		const navbar = document.querySelector('.navbar');
		if (menuToggle && navbar) {
		    // 确保元素存在
		    menuToggle.addEventListener('click', () => {
		        navbar.classList.toggle('menu-open');
		    });
		    // 点击菜单外区域关闭菜单
		    document.addEventListener('click', (e) => {
				if (!navbar.contains(e.target)) {
					navbar.classList.remove('menu-open');
		        }
		    });
		} 
		else {
			console.error("未能找到 .mobile-menu-toggle 或 .navbar 元素");
		}
		
		// 移动端子菜单展开逻辑
		const submenuLinks = document.querySelectorAll(".nav-menu .has-submenu > a");
		submenuLinks.forEach(link => {
		    link.addEventListener("click", (e) => {
		        const parentLi = link.parentElement;
		        const isMobile = window.innerWidth <= 768;
		
		        if (isMobile) {
		            // if (!parentLi.classList.contains("active")) {
		            //     e.preventDefault(); // 阻止第一次跳转
		            //     parentLi.classList.add("active");
		            // } else {
		            //     // 第二次点击才允许跳转
		            //     parentLi.classList.remove("active");
		            // }
					e.preventDefault(); // 阻止跳转
					
					// 如果当前菜单已经展开 → 收起
					if (parentLi.classList.contains("active")) {
						parentLi.classList.remove("active");
					} 
					else {
					// 收起所有其他子菜单
					document.querySelectorAll(".nav-menu .has-submenu.active")
					    .forEach(li => li.classList.remove("active"));
					
					 // 展开当前菜单
					parentLi.classList.add("active");
					}
		        }
		    });
		});
		
		// 🌐语言切换按钮展开
		const langToggle = document.querySelector(".lang-toggle");
		const langSwitch = document.querySelector(".lang-switch");
		if (langToggle && langSwitch) {
			langToggle.addEventListener("click", (e) => {
				e.stopPropagation(); // 防止冒泡到 document
				langSwitch.classList.toggle("open");
			});
			// 点击外部关闭语言菜单
			document.addEventListener("click", () => {
				langSwitch.classList.remove("open");
			});
		}
		
	});
});

