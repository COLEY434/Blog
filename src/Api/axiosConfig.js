import axios from 'axios'

if(process.env.NODE_ENV === "production"){
    console.log(process.env.NODE_ENV)
}
export const instance = axios.create({
    baseURL: 'https://localhost:44318/api'
})