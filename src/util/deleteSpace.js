module.exports = (techs) => {
  return techs.split(",").map((repo) => repo.trim());
};
