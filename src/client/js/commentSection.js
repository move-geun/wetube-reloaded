const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");
const dataset = document.getElementById("fullScreen");
const deleteBtn = document.querySelectorAll(".deleteBtn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".commentLine ul");
  const newCommnets = document.createElement("li");
  newCommnets.dataset.id = id;
  newCommnets.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-user";
  const span = document.createElement("span");
  const span2 = document.createElement("span");
  span2.className = "deleteBtn";
  span.innerText = ` ${text}`;
  span2.innerText = "❌";
  newCommnets.appendChild(icon);
  newCommnets.appendChild(span);
  newCommnets.appendChild(span2);
  videoComments.prepend(newCommnets);

  if (span2) {
    span2.addEventListener("click", deletecomment);
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const text = textarea.value;
  const videoId = dataset.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const mentDelete = (event) => {
  const videoComments = document.querySelector(".commentLine ul");
  console.log(videoComments);
  const commentList = event.target.parentNode;
  console.log(commentList);
  videoComments.removeChild(commentList);
};

const deletecomment = async (event) => {
  const comment = event.target.parentElement;
  const commentId = comment.dataset.id;
  const response = await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId }),
  });
  if (response.status === 201) {
    comment.remove();
  }
};

form.addEventListener("submit", handleSubmit);
deleteBtn.forEach((item) => {
  item.addEventListener("click", deletecomment);
});
