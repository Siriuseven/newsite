document.addEventListener('DOMContentLoaded', function() {
  // 获取所有 class 为 imgShow 的元素
  const imgShows = document.querySelectorAll('.imgShow');

  imgShows.forEach(function(imgShow) {
    let isDragging = false;
    let startX;
    let scrollLeft;

    // 鼠标按下
    imgShow.addEventListener('mousedown', (e) => {
      isDragging = true;
      imgShow.classList.add('active');
      startX = e.pageX - imgShow.offsetLeft;
      scrollLeft = imgShow.scrollLeft;
      e.preventDefault(); // 防止文本选中
    });

    // 鼠标移动
    imgShow.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - imgShow.offsetLeft;
      const walk = (x - startX) * 2; // 可调，控制拖动灵敏度
      imgShow.scrollLeft = scrollLeft - walk;
    });

    // 鼠标释放
    imgShow.addEventListener('mouseup', () => {
      isDragging = false;
      imgShow.classList.remove('active');
    });

    // 鼠标离开元素区域
    imgShow.addEventListener('mouseleave', () => {
      isDragging = false;
      imgShow.classList.remove('active');
    });

    // 触摸设备支持（手机、平板）
    imgShow.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].pageX - imgShow.offsetLeft;
      scrollLeft = imgShow.scrollLeft;
    }, { passive: false });

    imgShow.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.touches[0].pageX - imgShow.offsetLeft;
      const walk = (x - startX) * 2;
      imgShow.scrollLeft = scrollLeft - walk;
    });

    imgShow.addEventListener('touchend', () => {
      isDragging = false;
    });
  });
});