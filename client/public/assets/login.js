document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const toggleDark = document.getElementById('darkToggle');

  // Auto-focus first input
  emailInput.focus();

  // 🌙 Dark Mode Toggle
  toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleDark.textContent = document.body.classList.contains('dark-mode') ? '☀ Light Mode' : '🌙 Dark Mode';
  });

  // 👁 Show/Hide Password
  const toggleBtn = document.createElement('span');
  toggleBtn.textContent = '👁';
  toggleBtn.style.cursor = 'pointer';
  toggleBtn.style.marginLeft = '8px';
  passwordInput.parentNode.insertBefore(toggleBtn, passwordInput.nextSibling);

  toggleBtn.addEventListener('click', () => {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    toggleBtn.textContent = passwordInput.type === 'password' ? '👁' : '🙈';
  });

  // Press "Enter" to submit from any field
  [emailInput, passwordInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        form.dispatchEvent(new Event('submit'));
      }
    });
  });

  // ✅ Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === '' || password === '') {
      showToast('⚠ Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      showToast('🔐 Password must be at least 6 characters.');
      return;
    }

    // 🕐 Show loader
    const loginButton = form.querySelector('button[type="submit"]');
    loginButton.disabled = true;
    loginButton.textContent = 'Logging in...';

    setTimeout(() => {
      sessionStorage.setItem('loggedInUser', email);
      showToast(`✅ Welcome, ${email.split('@')[0]}!`);
      loginButton.textContent = 'Login';
      loginButton.disabled = false;
      form.reset();

      // 🔁 Redirect to home.html
      window.location.href = "home.html";
    }, 2000);
  });

  // 🔔 Toast Message Function
  function showToast(message) {
    let toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('visible');
    }, 10);
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
});