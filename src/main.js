// src/main.js
import { helpRequests } from "./data/helpRequest.js";
import { askForm } from "./data/askForm.js";
import { profileData } from "./data/profileData.js";

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".tab-section");

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;

      tabs.forEach((t) => t.classList.remove("text-blue-600"));
      btn.classList.add("text-blue-600");

      sections.forEach((section) => {
        section.classList.toggle("hidden", section.id !== target);
      });

      if (target === "requests") renderHelpRequests();
      if (target === "ask") renderAskForm();
      if (target === "profile") renderProfile();
    });
  });

  // Show home tab on load
  document.querySelector('[data-target="home"]').click();
});

// ------------------------ Help Requests ------------------------

function getBadgeColor(level) {
  return {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-green-100 text-green-700"
  }[level];
}

function getSubjectColor(subject) {
  return {
    Mathematics: "bg-blue-100 text-blue-800",
    Biology: "bg-green-100 text-green-800",
    Physics: "bg-purple-100 text-purple-800",
    "Computer Science": "bg-orange-100 text-orange-800"
  }[subject];
}

function renderHelpRequests() {
  const container = document.getElementById("requests-list");
  container.innerHTML = "";

  helpRequests.forEach((req) => {
    const el = document.createElement("div");
    el.className = "bg-white p-4 rounded-lg shadow flex justify-between items-start";

    el.innerHTML = `
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-sm font-medium px-2 py-0.5 rounded ${getSubjectColor(req.subject)}">${req.subject}</span>
          <span class="text-xs text-gray-500">Posted ${req.posted}</span>
        </div>
        <h3 class="text-md font-semibold text-gray-900">${req.title}</h3>
        <p class="text-sm text-gray-600 mt-1">${req.description}</p>
        <span class="inline-flex mt-2 text-xs px-2 py-0.5 rounded font-medium ${getBadgeColor(req.urgency)}">
          ${req.urgency} Urgency
        </span>
      </div>
      <button class="ml-4 mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded">Help Now</button>
    `;

    container.appendChild(el);
  });
}

// ------------------------ Ask Form ------------------------

function renderAskForm() {
  const form = document.getElementById("ask-form");
  form.innerHTML = `
    <input type="text" value="${askForm.title}" class="w-full border rounded px-3 py-2 text-sm" />
    <select class="w-full border rounded px-3 py-2 text-sm">
      <option ${askForm.subject === "Computer Science" ? "selected" : ""}>Computer Science</option>
      <option ${askForm.subject === "Mathematics" ? "selected" : ""}>Mathematics</option>
      <option ${askForm.subject === "Biology" ? "selected" : ""}>Biology</option>
      <option ${askForm.subject === "Physics" ? "selected" : ""}>Physics</option>
    </select>
    <textarea class="w-full border rounded px-3 py-2 text-sm h-28">${askForm.description}</textarea>
    <div class="border-2 border-dashed rounded px-4 py-6 text-center text-sm text-gray-500">
      📁 Uploaded: ${askForm.file}
      <p class="text-xs text-gray-400">PDF, PNG, JPG or DOCX (MAX. 10MB)</p>
    </div>
    <div class="flex items-center gap-4 text-sm">
      <label><input type="radio" name="type" ${askForm.help_type === "Written Answer" ? "checked" : ""} /> Written Answer</label>
      <label><input type="radio" name="type" ${askForm.help_type === "Live Help Session" ? "checked" : ""} /> Live Help Session</label>
    </div>
    <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit Question</button>
  `;
}

// ------------------------ Profile ------------------------

function renderProfile() {
  const card = document.getElementById("profile-card");

  const badge = (text, color) => `<span class="${color} px-2 py-1 rounded text-xs">${text}</span>`;

  const skills = profileData.expertise.map(skill => badge(skill, "bg-blue-100 text-blue-800")).join(" ");
  const achievementIcons = {
    "Top Helper": "🌟",
    "Perfect Rating": "✅",
    "Community Leader": "👥",
    "Mentor Status": "🎓"
  };
  
  const achievements = profileData.achievements.map(ach => `
    <div class="bg-white border rounded-lg shadow-sm flex items-center gap-3 px-4 py-3">
      <span class="text-2xl">${achievementIcons[ach]}</span>
      <span class="text-sm font-medium text-gray-700">${ach}</span>
    </div>
  `).join("");
  

  const recent = profileData.recent_activity.map(item => `
    <div class="bg-gray-50 rounded p-3 shadow-sm mb-2">
      <p class="font-medium">${item.title}</p>
      <p class="text-sm text-gray-600">${item.description}</p>
      <div class="text-sm text-gray-500 mt-1">${item.time} • ⭐⭐⭐⭐⭐</div>
    </div>
  `).join("");

  card.innerHTML = `
    <div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-24 relative">
      <img src="./assets/alex.jpg" alt="Alex Johnson" class="w-20 h-20 rounded-full border-4 border-white absolute -bottom-10 left-6 object-cover" />
    </div>
    <div class="pt-16 px-6 pb-8">
      <h2 class="text-xl font-semibold">${profileData.name}</h2>
      <p class="text-gray-500 text-sm mb-4">${profileData.role}</p>
      <p class="text-sm text-gray-700 mb-4">${profileData.bio}</p>

      <div class="grid sm:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 class="text-sm font-medium mb-2">Stats</h3>
          <p class="text-sm">Questions Answered: <strong>${profileData.stats.answered}</strong></p>
          <p class="text-sm">Average Rating: ⭐ ${profileData.stats.rating.toFixed(1)}</p>
          <p class="text-sm">Response Time: ${profileData.stats.response_time}</p>
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">Expertise</h3>
          <div class="flex flex-wrap gap-2">${skills}</div>
        </div>
      </div>

      <h3 class="text-sm font-medium mb-2">Achievements</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-6">${achievements}</div>

      <h3 class="text-sm font-medium mb-2">Recent Activity</h3>
      <div>${recent}</div>
    </div>
  `;
}
