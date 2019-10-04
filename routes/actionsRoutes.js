const express = require('express');
const router = express.Router();

// Bring in the actions schema
const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');

// READ: get all the actions for all projects
router.get("/", (req, res) => {
    Actions.get(req.project_id)
    .then(actions => res.status(200).json({data: actions}))
    .catch(err => res.status(500).json({message: "There was a problem in the server", err: err}))
})

// READ: get all acitons for a single project
router.get("/:project_id", (req, res) => {
    const projectID = req.params.project_id;
    
    Projects.getProjectActions(projectID)
    .then(actions =>{
        if(actions.length > 0) {
            res.status(200).json({data: actions})
        } else {
            res.status(400).json({message: "That project doesnt exist"})
        }
        
    })
    .catch(err => res.status(500).json({message: "The server was unable to process the request"}))
})

// CREATE: create a new action for a project
router.post("/", (req, res) => {
    // check we are supplied a project_id and also a description
    if(!req.body.project_id || !req.body.description){
        res.status(400).json({message: "Be sure to have a project_id and also a description for the action"})
    }

    // check that the project id exists
    Projects.get(req.body.project_id)
    .then(project => {
        console.log(project)
        if (project){
            Actions.insert(req.body)
            .then(newAction => res.status(201).json({data: newAction}))
            .catch(err => res.status(500).json({message: "The server had a issue creating the action"}))
        } else {
            res.status(404).json({message: "The project with that ID does not exist"})
        }
    })

})

// DELETE: delet an action
router.delete("/", (req, res) => {
    // check that we have a action and project ID
    if(!req.body.id || !req.body.project_id){
        res.status(400).json({message: "Please provide a project id along with a action id"})
    }

    // Find if the project passed in exists
    Projects.get(req.body.project_id)
    .then(project => {
        if(project){
            // Try to match a action id that is passed to us
            project.actions.forEach( obj => {
                if(obj.id === req.body.id){
                    Projects.remove(obj.id)
                    .catch(err => res.status(500).json({message: "There was a problem with the server"}))
                    res.status(200).json({data: obj, message: "Action deleted"})
                }
            });
            // If no match send a res
            res.status(400).json({message: "A action with that ID does not exist"})
        } else {
            res.status(400).json({message: "A project with this ID does not exist"})
        }
    })
})

module.exports = router