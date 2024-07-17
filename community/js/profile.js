document.addEventListener("DOMContentLoaded", () => {
  const profileForm = document.getElementById("profile-form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const bioInput = document.getElementById("bio");

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const bio = bioInput.value.trim();

    if (username && email && bio) {
      alert("Profile updated successfully!");
      // Here you can add code to save the updated profile information
    } else {
      alert("Please fill in all fields.");
    }
  });
});
