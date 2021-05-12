import React from 'react'
import { urlApi } from './urlApi'
import Axios from 'axios'

export default function loginService(obj) {
    let url = `${urlApi}v1/afiliados/login`
    console.log(url)
     Axios.post(url, {
        "email": obj.email,
        "password": obj.pasword
    }).then(response => {
        console.log(response.data);
        if (response.data.token.trim()) {
            localStorage.setItem("Id", `${response.data.afiliado.id}`)
            localStorage.setItem("datos", JSON.stringify(response.data.afiliado))
            localStorage.setItem("Token", `${response.data.token}`) 
        }              
    })
    .catch(function (error)  {
        if (error.response.status === 400) {
            localStorage.setItem("Error", JSON.stringify(`${error.response.data.error.msg} ${error.response.data.error.campo}`))
        } 
    })
}
