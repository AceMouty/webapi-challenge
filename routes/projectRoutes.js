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


module.exports = router;