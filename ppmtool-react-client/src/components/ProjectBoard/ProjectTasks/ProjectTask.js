import React, { Component } from 'react'
import { Link } from "react-router-dom"

class ProjectTask extends Component {
    render() {

        const { projectTask } = this.props

        let priorityString; 
        let priorityClass;

        switch(projectTask.priority){
            case 1:
                priorityClass = "bg-danger text-light"
                priorityString = "HIGH"
                break;
            case 2:
                priorityClass = "bg-warning text-light"
                priorityString = "Medium"
                break;
            case 3:
                priorityClass = "bg-info text-light"
                priorityString = "INFO"
                break;
            default:
                break;
        }


        // if(projectTask.priority === 1){
        //     priorityClass = "bg-danger text-light"
        //     priorityString = "HIGH"
        // }

        // if(projectTask.priority === 2){
        //     priorityClass = "bg-warning text-light"
        //     priorityString = "Medium"
        // }

        // if(projectTask.priority === 3){
        //     priorityClass = "bg-info text-light"
        //     priorityString = "INFO"
        // }


        return (
            <div className="card mb-1 bg-light">
                <div className={`card-header text-primary ${priorityClass}`}>
                    ID: {projectTask.projectSequence}   Priority: {priorityString}
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title">{projectTask.summary}</h5>
                    <p className="card-text text-truncate ">
                        {projectTask.acceptanceCriteria}
                    </p>
                    <a href="#" className="btn btn-primary">
                        View / Update
                    </a>

                    <button className="btn btn-danger ml-4">
                        Delete
                    </button>
                </div>
            </div>                   
        )
    }
}

export default ProjectTask
