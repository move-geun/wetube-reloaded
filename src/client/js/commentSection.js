const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");
const dataset = document.getElementById("fullScreen");

const addComment = (text) => {
  const videoComments = document.querySelector(".commentLine ul");
  const newCommnets = document.createElement("li");
  newCommnets.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-user";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  newCommnets.appendChild(icon);
  newCommnets.appendChild(span);
  videoComments.prepend(newCommnets);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const text = textarea.value;
  const videoId = dataset.dataset.id;
  if (text === "") {
    return;
  }
  const { status } = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  if (status === 201) {
    addComment(text);
  }
};

form.addEventListener("submit", handleSubmit);
