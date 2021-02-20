import axios from "axios"
import { GET_ERRORS } from "./types"

export const addProjectTask = (backlog_id, project_task, history) => async dispatch => {
    try{
        await axios.post(`/api/backlog/${backlog_id}`, project_task)
        history.push(`/projectBoard/${backlog_id}`)
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    } catch (err) {
        console.log("FOUND some error!!")
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}