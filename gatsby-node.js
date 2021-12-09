const path = require("path");

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/movie/)) {
    createPage({
      path: "/movie/*",
      matchPath: "/movie/:id",
      component: path.resolve(`src/templates/movie-template.js`),
    });
  }
};
