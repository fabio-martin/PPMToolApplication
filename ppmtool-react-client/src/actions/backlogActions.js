import axios from "axios"
import { GET_ERRORS, GET_BACKLOG } from "./types"

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

export const getBackLog = (backlog_id) => async dispatch => {
    try{
        const res = await axios.get(`/api/backlog/${backlog_id}`)

        console.log(res.data)
        
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}