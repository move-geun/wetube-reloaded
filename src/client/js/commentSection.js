const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");
const dataset = document.getElementById("fullScreen");

const handleSubmit = (event) => {
  event.preventDefault();
  const text = textarea.value;
  const videoId = dataset.dataset.id;
  if (text === "") {
    return;
  }
  fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
};

form.addEventListener("submit", handleSubmit);
