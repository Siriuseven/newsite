// ===== 轮播图逻辑 =====
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
	if (index >= totalSlides) index = 0;
	if (index < 0) index = totalSlides - 1;
	currentIndex = index;
	document.querySelector('.slides').style.transform = `translateX(-${index * 100}%)`;
	dots.forEach(dot => dot.classList.remove('active'));
	dots[index].classList.add('active');
}

document.querySelector('.prev').addEventListener('click', () => {
	showSlide(currentIndex - 1);
});

document.querySelector('.next').addEventListener('click', () => {
	showSlide(currentIndex + 1);
});

dots.forEach(dot => {
	dot.addEventListener('click', (e) => {
		showSlide(parseInt(e.target.dataset.index));
	});
});


setInterval(() => {
  showSlide(currentIndex + 1);
}, 5000);