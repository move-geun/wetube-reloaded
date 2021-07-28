const fakeUser = {
  userName: "nico",
  loggedIn: false,
};

let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    view: 26,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    view: 26,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    view: 1,
    id: 3,
  },
];

export const home = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
  const id = req.params.id;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const search = (req, res) =>
  res.render("search", { pageTitle: "Search" });
export const upload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const deleteVideo = (req, res) =>
  res.render("remove", { pageTitle: "Delete" });
