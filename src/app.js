const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const newRepo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(newRepo);

  return res.json(newRepo);
});

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0) {
    return res.status(400).json({ message: "Id does not exist" });
  }

  const likes = repositories[repoIndex].likes;

  const newRepo = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[repoIndex] = newRepo;

  return res.json(newRepo);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0) {
    return res.status(400).json({ message: "Id does not exist" });
  }

  repositories.splice(repoIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0) {
    return res.status(400).json({ message: "Id does not exist" });
  }

  repositories[repoIndex].likes += 1;

  return res.json(repositories[repoIndex]);
});

module.exports = app;
