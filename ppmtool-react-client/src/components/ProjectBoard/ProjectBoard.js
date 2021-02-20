import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Backlog from './Backlog'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { getBackLog } from "./../../actions/backlogActions"


class ProjectBoard extends Component {

    // constructor(){
    //     super()

    //     this.state = {
    //         errors:{}
    //     }
    // }

    componentDidMount(){
        const { id } = this.props.match.params
        this.props.getBackLog(id)
    }

    render() {

        const { id } = this.props.match.params

        const { projectTasks } = this.props.backlog

        return (
        <div className="container">
            <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                <i className="fas fa-plus-circle"> Create Project Task</i>
            </Link>
            <br />
            <hr />
            <Backlog projectTasks={projectTasks}/>
        </div>
        )
    }
}

ProjectBoard.propTypes = { 
    getBackLog:PropTypes.func.isRequired,
    backlog:PropTypes.object.isRequired
}

const mapStateToProps = state => ({ 
    backlog : state.backlogReducer
})

export default connect(mapStateToProps, { getBackLog })(ProjectBoard);