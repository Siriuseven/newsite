let currentIndex = 1; // 从第1张真实图片开始（因为前面有一张克隆的最后一张）
const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides');
const totalSlides = slides.length;
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  slidesContainer.style.transition = "transform 0.5s ease-in-out";
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;

  // 更新小圆点（注意 index 偏移1）
  let dotIndex = (index - 1 + dots.length) % dots.length;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[dotIndex].classList.add('active');
}

// 监听过渡结束事件，用于“无缝跳转”
slidesContainer.addEventListener('transitionend', () => {
  if (currentIndex === 0) {
    slidesContainer.style.transition = "none"; // 瞬间切换
    currentIndex = totalSlides - 2; // 跳到最后一张真实图
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  } else if (currentIndex === totalSlides - 1) {
    slidesContainer.style.transition = "none";
    currentIndex = 1; // 跳到第一张真实图
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
});

// 下一张
document.querySelector('.next').addEventListener('click', () => {
  showSlide(currentIndex + 1);
});

// 上一张
document.querySelector('.prev').addEventListener('click', () => {
  showSlide(currentIndex - 1);
});

// 小圆点点击
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index + 1); // 注意偏移
  });
});

// 初始显示
showSlide(currentIndex);
