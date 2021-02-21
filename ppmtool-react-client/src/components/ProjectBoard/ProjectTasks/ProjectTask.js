import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { deleteProjectTask } from "./../../../actions/backlogActions"

class ProjectTask extends Component {

    onDeleteClick(backlog_id, pt_id){
        this.props.deleteProjectTask(backlog_id, pt_id)
    }

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
                    <Link to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`} className="btn btn-primary">
                        View / Update
                    </Link>

                    <button 
                        className="btn btn-danger ml-4" 
                        onClick={this.onDeleteClick.bind(this, projectTask.projectIdentifier, projectTask.projectSequence )}>
                        Delete
                    </button>
                </div>
            </div>                   
        )
    }
}

ProjectTask.propTypes = {
    deleteProjectTask: PropTypes.func.isRequired
}


export default connect( null, { deleteProjectTask })(ProjectTask)
