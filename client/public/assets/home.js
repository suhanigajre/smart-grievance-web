// Typing effect for hero section
const heroText = document.querySelector(".hero h2");
const fullText = "Welcome to Grievance Tracker Portal";
let index = 0;

function typeWriter() {
  if (index < fullText.length) {
    heroText.textContent += fullText.charAt(index);
    index++;
    setTimeout(typeWriter, 50);
  }
}

// Back to top button logic
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Tooltip for nav links
document.querySelectorAll("nav a").forEach((link) => {
  link.setAttribute("title", `Go to ${link.textContent}`);
});

// Card click feedback
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.add("clicked");
    setTimeout(() => card.classList.remove("clicked"), 200);
  });
});

// Dark mode toggle with localStorage
const darkToggle = document.getElementById("darkToggle");

function applyDarkMode(mode) {
  if (mode === "dark") {
    document.body.classList.add("dark-mode");
    darkToggle.textContent = "☀️ Light Mode";
  } else {
    document.body.classList.remove("dark-mode");
    darkToggle.textContent = "🌙 Dark Mode";
  }
}

darkToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("mode", isDark ? "dark" : "light");
  darkToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// On load: apply dark mode + animations
window.onload = () => {
  // Apply saved dark mode
  applyDarkMode(localStorage.getItem("mode") || "light");

  // Typing effect
  heroText.textContent = "";
  typeWriter();

  // Animate cards
  document.querySelectorAll(".card").forEach((card, i) => {
    setTimeout(() => {
      card.classList.add("show");
    }, i * 150);
  });
};
