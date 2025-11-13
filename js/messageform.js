document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('messageForm');
	const submitBtn = document.getElementById('submitBtn');
	const loading = document.getElementById('loading');
	const successMessage = document.getElementById('successMessage');

	// 表单验证函数
	function validateForm() {
		let isValid = true;

		// 验证姓名
		const name = document.getElementById('name').value.trim();
		if (name.length < 2) {
			showError('nameError', '姓名至少需要2个字符');
			isValid = false;
		} else {
			hideError('nameError');
		}

		// 验证年龄
		const age = parseInt(document.getElementById('age').value);
		if (isNaN(age) || age < 1 || age > 120) {
			showError('ageError', '请输入有效的年龄（1-120）');
			isValid = false;
		} else {
			hideError('ageError');
		}
 
		// 验证性别
		const gender = document.getElementById('gender').value;
			if (!gender) {
				showError('genderError', '请选择您的性别');
				isValid = false;
			} else {
				hideError('genderError');
			}
                
		// 验证手机号码
		const phone = document.getElementById('phone').value.trim();
		const phoneRegex = /^1[3-9]\d{9}$/;
		if (!phoneRegex.test(phone)) {
			showError('phoneError', '请输入有效的手机号码');
			isValid = false;
		} else {
			hideError('phoneError');
		}

		// 验证邮箱
		const email = document.getElementById('email').value.trim();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			showError('emailError', '请输入有效的电子邮箱');
			isValid = false;
		} else {
			hideError('emailError');
		}

		// 验证留言内容
		const message = document.getElementById('message').value.trim();
		if (message.length < 5) {
			showError('messageError', '留言内容至少需要5个字符');
			isValid = false;
		} else {
			hideError('messageError');
		}
	
		return isValid;
	}

	function showError(elementId, message) {
		const errorElement = document.getElementById(elementId);
		errorElement.textContent = message;
		errorElement.style.display = 'block';
	}

	function hideError(elementId) {
		const errorElement = document.getElementById(elementId);
		errorElement.style.display = 'none';
	}

	// 表单提交处理
	form.addEventListener('submit', function(e) {
		if (!validateForm()) {
			e.preventDefault();
			return;
		}

		// 显示加载状态
		submitBtn.disabled = true;
		loading.style.display = 'block';

		// Formspree会自动处理提交，这里只是添加用户体验
		setTimeout(() => {
			successMessage.style.display = 'block';
			form.reset();
			submitBtn.disabled = false;
			loading.style.display = 'none';

			// 5秒后隐藏成功消息
			setTimeout(() => {
				successMessage.style.display = 'none';
			}, 5000);
		}, 1000);
	});
				
	// 实时验证
	const inputs = form.querySelectorAll('input, select, textarea');
	inputs.forEach(input => {
		input.addEventListener('blur', validateForm);
	});
});

