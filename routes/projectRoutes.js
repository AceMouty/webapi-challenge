const express = require('express');
const router = express.Router()
const Projects = require('../data/helpers/projectModel')

// READ: Get all projects
router.get("/", (req, res) => {
    Projects.get()
    .then(projects => res.status(200).json({data: projects}))
    .catch(err => res.status(500).json({message: "There was a problem in the server", err: err}))
})

// CREATE: Post a new project
router.post("/", (req, res) => {
    const createProject = req.body
    Projects.insert(createProject)
    .then(newProject => {
        res.status(200).json({data: newProject})
    })
    .catch(err => res.status(500).json({message: "There was a problem in the server", err:err}))
})


module.exports = router;