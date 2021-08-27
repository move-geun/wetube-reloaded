const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");
const dataset = document.getElementById("fullScreen");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".commentLine ul");
  const newCommnets = document.createElement("li");
  newCommnets.dataset.id = id;
  newCommnets.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-user";
  const span = document.createElement("span");
  const span2 = document.createElement("span");
  span.innerText = ` ${text}`;
  span2.innerText = "❌";
  newCommnets.appendChild(icon);
  newCommnets.appendChild(span);
  newCommnets.appendChild(span2);
  videoComments.prepend(newCommnets);
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

form.addEventListener("submit", handleSubmit);
