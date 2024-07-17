document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.getElementById("posts-container");
  const newPostForm = document.getElementById("new-post-form");
  const postContentInput = document.getElementById("post-content");

  let posts = [];

  newPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = postContentInput.value.trim();
    if (content) {
      const newPost = {
        id: Date.now(),
        content: content,
        likes: 0,
        comments: [],
      };
      posts.push(newPost);
      postContentInput.value = "";
      renderPosts();
    }
  });

  function renderPosts() {
    postsContainer.innerHTML = "";
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post";
      postElement.innerHTML = `
          <h3>Post</h3>
          <p>${post.content}</p>
          <button class="like-btn">Like (${post.likes})</button>
          <button class="comment-btn">Comment</button>
          <div class="comments">
            <h4>Comments</h4>
            <div class="comments-list"></div>
            <form class="comment-form">
              <input type="text" placeholder="Write a comment...">
              <button type="submit">Comment</button>
            </form>
          </div>
        `;

      const likeBtn = postElement.querySelector(".like-btn");
      likeBtn.addEventListener("click", () => {
        post.likes++;
        renderPosts();
      });

      const commentForm = postElement.querySelector(".comment-form");
      const commentsList = postElement.querySelector(".comments-list");

      commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const commentInput = commentForm.querySelector("input");
        const comment = commentInput.value.trim();
        if (comment) {
          post.comments.push(comment);
          commentInput.value = "";
          renderComments(post, commentsList);
        }
      });

      renderComments(post, commentsList);
      postsContainer.appendChild(postElement);
    });
  }

  function renderComments(post, commentsList) {
    commentsList.innerHTML = "";
    post.comments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.className = "comment";
      commentElement.textContent = comment;
      commentsList.appendChild(commentElement);
    });
  }
});
