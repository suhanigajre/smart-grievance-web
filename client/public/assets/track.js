// track.js

document.addEventListener("DOMContentLoaded", () => {
  const trackBtn = document.getElementById("trackBtn");
  const complaintCard = document.getElementById("complaintCard");
  const statusTracker = document.getElementById("statusTracker");
  const feedbackBox = document.getElementById("feedbackBox");
  const feedbackBtn = document.getElementById("submitFeedback");
  const darkToggle = document.getElementById("darkToggle");
  const logoutBtn = document.getElementById("logoutBtn");
  const complaintInput = document.getElementById("complaintId");
  const currentUserSpan = document.getElementById("currentUser");

  // Sample complaint data
  const complaints = {
    "C123": {
      status: ["Received", "Under Review", "In Progress"],
      currentStep: 2
    },
    "C456": {
      status: ["Received", "Under Review", "Resolved"],
      currentStep: 3
    }
  };

  // Load current user info from localStorage
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser && currentUserSpan) {
    currentUserSpan.textContent = currentUser;
  }

  // Dark mode toggle
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Logout functionality
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    });
  }

  // Tracking logic
  trackBtn.addEventListener("click", () => {
    const id = complaintInput.value.trim();
    if (complaints[id]) {
      complaintCard.style.display = "block";
      statusTracker.style.display = "block";
      feedbackBox.style.display = "block";

      const tracker = document.querySelector(".timeline");
      tracker.innerHTML = "";

      complaints[id].status.forEach((step, index) => {
        const div = document.createElement("div");
        div.classList.add("step");
        div.textContent = step;

        if (index < complaints[id].currentStep) {
          div.classList.add("completed");
        } else if (index === complaints[id].currentStep) {
          div.classList.add("current");
        }

        tracker.appendChild(div);
      });
    } else {
      alert("Complaint ID not found.");
      complaintCard.style.display = "none";
      statusTracker.style.display = "none";
      feedbackBox.style.display = "none";
    }
  });

  // Feedback submission
  feedbackBtn.addEventListener("click", () => {
    const text = document.getElementById("feedbackText").value.trim();
    if (text.length > 0) {
      alert("Feedback submitted. Thank you!");
      document.getElementById("feedbackText").value = "";
    } else {
      alert("Please enter feedback before submitting.");
    }
  });
});