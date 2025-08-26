const container = document.getElementById('advantageContainer');
        
        // 默认状态 - 无特殊类
        function setDefaultState() {
            container.className = 'advantage-container';
        }
        
        // 悬停第二张图(B)时的状态
        function setHoverBState() {
            container.className = 'advantage-container hover-b';
        }
        
        // 悬停第三张图(C)时的状态
        function setHoverCState() {
            container.className = 'advantage-container hover-c';
        }
        
        // 设置默认状态
        setDefaultState();
        
        // 获取图片元素
        const items = document.querySelectorAll('.advantage-item');
        const itemB = items[1]; // 第二张图(B)
        const itemC = items[2]; // 第三张图(C)
        
        // 添加事件监听器
        itemB.addEventListener('mouseenter', setHoverBState);
        itemC.addEventListener('mouseenter', setHoverCState);
        
        // 鼠标离开图片时回到默认状态
        itemB.addEventListener('mouseleave', function() {
            // 检查鼠标是否在容器内但离开了B图
            setTimeout(() => {
                if (!itemB.matches(':hover') && !itemC.matches(':hover')) {
                    setDefaultState();
                }
            }, 10);
        });
        
        itemC.addEventListener('mouseleave', function() {
            // 检查鼠标是否在容器内但离开了C图
            setTimeout(() => {
                if (!itemB.matches(':hover') && !itemC.matches(':hover')) {
                    setDefaultState();
                }
            }, 10);
        });
        
        // 鼠标离开整个容器时回到默认状态
        container.addEventListener('mouseleave', setDefaultState);
        
        // 鼠标进入容器时，如果没有悬停在特定图片上，保持默认状态
        container.addEventListener('mouseenter', function(e) {
            if (e.target === container) {
                setDefaultState();
            }
        });