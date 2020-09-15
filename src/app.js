const express = require("express");
const cors = require("cors");

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

let repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO
  const likes = 0
  const { title, url, techs } = request.body
  const repoNew = { id: uuid(), title, url, techs, likes }
  repositories.map(r=>console.log(r.techs))
  repositories.push(repoNew)
  return response.json(repoNew)
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  try {
    const { id } = request.params
    const { title, url, techs } = request.body
    const repoUpdate = repositories.find(repoSelect => repoSelect.id === id)
    repoUpdate.title = title
    repoUpdate.url = url
    repoUpdate.techs = techs
    return response.json(repoUpdate)
  } catch (err) {
    return response.status(400).json({ error: `${err}` })
  }

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  try {
    const { id } = request.params
    const firsRepo = 0
    let lastRepo = repositories.length
    let repoSeletedIndex = repositories.findIndex(repoSelect => repoSelect.id === id)
    if (repoSeletedIndex > -1) {
      if (repoSeletedIndex === firsRepo) return response.json(repositories.shift())
      if (repoSeletedIndex === lastRepo) return response.json(repositories.pop())
      if (repoSeletedIndex > firsRepo && repoSeletedIndex < lastRepo) {
        const repoDelete = repositories[repoSeletedIndex]
        const BeforeSelected = repositories.slice(firsRepo, repoSeletedIndex)
        const AfterSelected = repositories.slice(repoSeletedIndex + 1, lastRepo)
        let refreshRepositorie = [...BeforeSelected, ...AfterSelected]
        repositories = refreshRepositorie
        //return response.json(repoDelete)
        return response.status(204).send()
      }
    } else {
      return response.status(400).json({ error: 'Repo not Found' })

    }
  } catch (error) {
    return response.status(400).json({ error })
  }

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  try {
    const { id } = request.params
    let repoSeletedIndex = repositories.findIndex(repoSelect => repoSelect.id === id)
    const repoLike = repositories[repoSeletedIndex]
    repoLike.likes += 1
    return response.json(repoLike)
  } catch (err) {
    return response.status(400).json({ error: `${err}` })
  }
});

module.exports = app;
