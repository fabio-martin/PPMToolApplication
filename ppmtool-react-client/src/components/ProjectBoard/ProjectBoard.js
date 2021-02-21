import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Backlog from './Backlog'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { getBackLog } from "./../../actions/backlogActions"


class ProjectBoard extends Component {

    constructor(){
        super()
        this.state = {
            errors:{}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params
        this.props.getBackLog(id)
    }

    render() {

        const { id } = this.props.match.params
        const { projectTasks } = this.props.backlog
        const { errors } = this.state

        const boardAlgorithm = ( errors, projectTasks ) => {
            if(projectTasks.length < 1){
                if(errors.projectNotFound){
                    return (
                    <div className="alert alert-danger text-center" role="alert">
                       {errors.projectNotFound}
                    </div>)
                } else {
                    return (
                     <div className="alert alert-info text-center" role="alert">
                        No Project Tasks on this board
                     </div>
                    )
                }
            } else {
                return  <Backlog projectTasks={projectTasks}/>
            }        
        }

        let BoardContent = boardAlgorithm(errors, projectTasks)

        return (
        <div className="container">
            <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                <i className="fas fa-plus-circle"> Create Project Task</i>
            </Link>
            <br />
            <hr />
            {BoardContent}
        </div>
        )
    }
}

ProjectBoard.propTypes = { 
    getBackLog:PropTypes.func.isRequired,
    backlog:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
    
}

const mapStateToProps = state => ({ 
    backlog : state.backlog,
    errors: state.errors
})

export default connect(mapStateToProps, { getBackLog })(ProjectBoard);