document.addEventListener("DOMContentLoaded", () => {
  const groupList = document.getElementById("group-list");
  const groupName = document.getElementById("group-name");
  const postPopupBtn = document.getElementById("post-popup-btn");
  const postBtn = document.getElementById("post-btn");
  const postText = document.getElementById("post-text");
  const postImage = document.getElementById("post-image");
  const postsContainer = document.getElementById("posts-container");
  const loginBtn = document.getElementById("login-btn");
  const loginModal = document.getElementById("login-modal");
  const closeBtn = document.getElementsByClassName("close-btn")[0];

  let currentGroup = "cottagecore";
  const posts = {
    cottagecore: [],
    denims: [],
    beauty: [],
    skincare: [],
    "fashion-opinions": [],
    "desi-fashion": [],
  };

  groupList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      currentGroup = e.target.dataset.group;
      groupName.textContent = e.target.textContent;
      displayPosts();
    }
  });

  postPopupBtn.addEventListener("click", () => {
    const postModal = new bootstrap.Modal(
      document.getElementById("post-modal")
    );
    postModal.show();
  });

  postBtn.addEventListener("click", () => {
    const text = postText.value;
    const image = postImage.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const post = {
        text,
        image: reader.result,
        likes: 0,
        bookmarks: 0,
      };
      posts[currentGroup].push(post);
      displayPosts();
    };
    if (image) {
      reader.readAsDataURL(image);
    } else {
      const post = {
        text,
        image: null,
        likes: 0,
        bookmarks: 0,
      };
      posts[currentGroup].push(post);
      displayPosts();
    }
    postText.value = "";
    postImage.value = "";
  });

  function displayPosts() {
    postsContainer.innerHTML = "";
    posts[currentGroup].forEach((post, index) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.innerHTML = `
                <p>${post.text}</p>
                ${
                  post.image
                    ? `<img src="${post.image}" class="post-image">`
                    : ""
                }
                <div class="actions">
                    <div class="icons">
                        <i class="far fa-heart" data-index="${index}" data-type="like"></i> <span>${
        post.likes
      }</span>
                        <i class="far fa-bookmark" data-index="${index}" data-type="bookmark"></i> <span>${
        post.bookmarks
      }</span>
                    </div>
                    <div class="comment-section">
                        <textarea class="comment-text" placeholder="Add a comment..."></textarea>
                        <button class="comment-btn">Comment</button>
                    </div>
                </div>
            `;
      postsContainer.appendChild(postElement);
    });

    document.querySelectorAll(".fa-heart").forEach((icon) => {
      icon.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        posts[currentGroup][index].likes++;
        displayPosts();
      });
    });

    document.querySelectorAll(".fa-bookmark").forEach((icon) => {
      icon.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        posts[currentGroup][index].bookmarks++;
        displayPosts();
      });
    });
  }

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
  };
  firebase.initializeApp(firebaseConfig);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loginBtn.style.display = "none";
      const userInfo = document.querySelector(".user-info");
      userInfo.innerHTML = `
                <img src="${user.photoURL}" alt="Profile Picture" class="profile-pic">
                <span class="username">${user.displayName}</span>
                <span class="status">Elite</span>
            `;
    } else {
      loginBtn.style.display = "block";
    }
  });

  loginBtn.addEventListener("click", () => {
    loginModal.style.display = "block";
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    const uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      tosUrl: "<your-tos-url>",
      privacyPolicyUrl: "<your-privacy-policy-url>",
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  });

  closeBtn.onclick = function () {
    loginModal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == loginModal) {
      loginModal.style.display = "none";
    }
  };
});
