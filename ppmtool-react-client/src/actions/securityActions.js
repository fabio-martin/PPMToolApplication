import axios from "axios"
import { GET_ERRORS, SET_CURRENT_USER } from "./types"
import setJWTToken  from "../securityUtils/setJWTToken"
import jwt_decode from "jwt-decode"

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

export const login  = LoginRequest => async dispatch => {
    try {

        // post => Login request
        const res =  await axios.post("/api/users/login", LoginRequest)

        // extract token from res.data 
        const { token } = res.data

        // store the token in the localStorage
        localStorage.setItem("jwtToken", token)

        // set our token in header *** 
        setJWTToken(token)

        // decode the token on react 
        const decoded = jwt_decode(token)

        console.log("Decoded user from token")
        console.log(decoded)
        
        // dispatch to our security reducer 
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        })
        
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
} 