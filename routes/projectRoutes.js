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
        res.status(201).json({data: newProject})
    })
    .catch(err => res.status(500).json({message: "There was a problem in the server", err:err}))
})

// UPDATE: update an already existing project
router.put("/", (req, res) => {
    const porjectID = req.body.id;
    const changes = req.body;
    Projects.update(porjectID, changes)
    .then(update => res.status(200).json({data: update}))
    .catch(res.status(500).json({message: "There was a problem in the server"}))
})

// DELETE: delete a project
router.delete("/", (req, res) => {
    const porjectID = req.body.id;
    Projects.get(porjectID)
    .then(project => {
        console.log(project)
        if(project){
            Projects.remove(project.id)
            .catch(err => res.status(500).json({message: "There was an issue removing the project from the server"}))
            res.status(200).json({data: project})
        } else {
            res.status(404).json({message: "The project with that ID does not exist"})
        }
    })
    
})

module.exports = router;