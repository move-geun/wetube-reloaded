export const home = (req, res) => res.render("home", { pageTitle: "Home" });
export const see = (req, res) => res.render("see", { pageTitle: "See" });
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const search = (req, res) =>
  res.render("search", { pageTitle: "Search" });
export const upload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const deleteVideo = (req, res) =>
  res.render("remove", { pageTitle: "Delete" });
