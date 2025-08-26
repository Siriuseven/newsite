// const container = document.querySelector('.history');
// const img = container.querySelector('img');

// let isDragging = false;
// let startX, scrollLeft;

// // 鼠标按下事件
// img.addEventListener('mousedown', (e) => {
//     isDragging = true;
//     startX = e.pageX - container.offsetLeft;
//     scrollLeft = container.scrollLeft;
// });

// // 鼠标移动事件
// img.addEventListener('mousemove', (e) => {
//     if (!isDragging) return;
//     e.preventDefault();
//     const x = e.pageX - container.offsetLeft;
//     const walk = (x - startX) * 2; // 拖动速度系数
//     container.scrollLeft = scrollLeft - walk;
// });

// // 鼠标松开事件
// img.addEventListener('mouseup', () => {
//     isDragging = false;
// });

// // 鼠标移出容器事件
// img.addEventListener('mouseleave', () => {
//     isDragging = false;
// });

// // 触摸设备支持
// img.addEventListener('touchstart', (e) => {
//     isDragging = true;
//     startX = e.touches[0].pageX - container.offsetLeft;
//     scrollLeft = container.scrollLeft;
// });

// img.addEventListener('touchmove', (e) => {
//     if (!isDragging) return;
//     e.preventDefault();
//     const x = e.touches[0].pageX - container.offsetLeft;
//     const walk = (x - startX) * 2;
//     container.scrollLeft = scrollLeft - walk;
// });

// img.addEventListener('touchend', () => {
//     isDragging = false;
// });

document.getElementById('draggable').addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('text/plain', this.id);
});

document.addEventListener('dragover', function(e) {
    e.preventDefault();
});

document.addEventListener('drop', function(e) {
    e.preventDefault();
    var id = e.dataTransfer.getData('text');
    var draggable = document.getElementById(id);
    draggable.style.position = 'absolute';
    draggable.style.top = e.clientY + 'px';
    draggable.style.left = e.clientX + 'px';
});