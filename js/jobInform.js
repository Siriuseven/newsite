// ======================
    // 1. 给每个 data-row 动态添加 odd / even 类（解决斑马纹问题）
    // ======================
    const dataRows = document.querySelectorAll('.data-row');
    dataRows.forEach((row, index) => {
      if (index % 2 === 0) {
        row.classList.add('data-row-odd');  // 第1、3、5... -> 奇数行
      } else {
        row.classList.add('data-row-even'); // 第2、4、6... -> 偶数行
      }
    });

    // ======================
    // 2. 点击 data-row 展开/折叠对应的 detail-row（你原来的功能）
    // ======================
    dataRows.forEach(row => {
      row.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const detailRow = document.getElementById(targetId);
        if (detailRow) {
          if (detailRow.style.display === 'none' || !detailRow.style.display) {
            detailRow.style.display = 'table-row';
          } else {
            detailRow.style.display = 'none';
          }
        }
      });
    });