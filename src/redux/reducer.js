import axios from 'axios';

const initialState = {
	username: '',
	id: '',
	profilePicture: ''
}

const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const GET_USER = "GET_USER";
export function loginUser(user){
	return {
			type: LOGIN_USER,
			payload: user
	}
}

export function logoutUser(){
	return{
			type: LOGOUT_USER,
			payload: initialState
	}
}
export function getUser(){
	const user = axios.get('/api/user').then(res => res.data)
	return {
		type: GET_USER,
		payload: user
	}
}


export default function reducer(state = initialState, action){
	switch(action.type){
			case LOGIN_USER:
					return {...state, user: action.payload, isLoggedIn: true}
			case LOGOUT_USER:
					return {...state, ...action.payload}
			default:
					return state
	}
}