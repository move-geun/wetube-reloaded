const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");
const dataset = document.getElementById("fullScreen");

const handleSubmit = (event) => {
  event.preventDefault();
  const text = textarea.value;
  const videoId = dataset.dataset.id;
  fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    body: { text },
  });
};

form.addEventListener("submit", handleSubmit);
