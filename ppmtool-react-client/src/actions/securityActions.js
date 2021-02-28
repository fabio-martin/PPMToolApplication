import axios from "axios"
import { GET_ERRORS } from "./types"

export const createNewUser  = (newUser, history) => async dispatch => {
    try {

        console.log(newUser)

        await axios.post("/api/users/register", newUser)
        history.push("/login")
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
        
    } catch (err) {

        console.log("ERRORS")
        console.log(err.response.data)

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
} 