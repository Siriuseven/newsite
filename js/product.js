document.addEventListener('DOMContentLoaded', function() {
    const imageSections = document.querySelectorAll('.prodImg-section');
    
    imageSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            // 移除所有 expanded 类
            imageSections.forEach(s => s.classList.remove('expanded'));
            // 给当前悬停的添加 expanded 类
            this.classList.add('expanded');
        });
        
        section.addEventListener('mouseleave', function() {
            // 鼠标离开时移除所有 expanded 类，让 CSS hover 处理
            imageSections.forEach(s => s.classList.remove('expanded'));
        });
        
        // 为按钮添加点击事件
        const btn = section.querySelector('.prodBTN');
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const title = section.querySelector('.prodTitle').textContent;
            alert(`点击了 "${prodTitle}" 的按钮！`);
            // 这里可以添加实际的跳转逻辑
        });
    });
    
    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Tab 键导航支持
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('prodImg-section')) {
                focusedElement.classList.add('expanded');
            }
        }
    });
    
    // 移除键盘焦点时的 expanded 类
    document.addEventListener('blur', function(e) {
        if (e.target.classList.contains('prodImg-section')) {
            setTimeout(() => {
                e.target.classList.remove('expanded');
            }, 100);
        }
    }, true);
});

// 可选：添加触摸设备支持
if ('ontouchstart' in window) {
    const imageSections = document.querySelectorAll('.prodImg-section');
    
    imageSections.forEach(section => {
        section.addEventListener('touchstart', function() {
            // 移除所有 expanded 类
            imageSections.forEach(s => s.classList.remove('expanded'));
            // 给当前触摸的添加 expanded 类
            this.classList.add('expanded');
        });
        
        section.addEventListener('touchend', function() {
            // 延迟移除 expanded 类，让用户能看到效果
            setTimeout(() => {
                this.classList.remove('expanded');
            }, 2000);
        });
    });
}