import React from 'react'
import { urlApi } from './urlApi'
import Axios from 'axios'

export default function addUser(obj) {

    let url = urlApi + "v1/afiliados";
    console.log(obj)
    console.log(url)

         Axios.post(url, {
            "nombre": obj.name,
            "apellidoPaterno": obj.apellidoPaterno,
            "apellidoMaterno": obj.apellidoMaterno,            
            "telefono": obj.telefono,
            "email": obj.email,
            "password": obj.pasword,
            "enlace":`/${obj.telefono}`
        })
            .then(response => {
                console.log(response.data);
                if (response.status === 201) {
                    localStorage.setItem("Exito", `Usuario creado con exito, su enlace es ${response.data.enlace}`)
                    //localStorage.setItem("Token", `${response.token}`)
                } else {
                    console.log("Entre en else")
                }
            })
            .catch(error => {
                console.log("Error: " + error)
            })
}

export const constante = () => {
    const result = localStorage.getItem("Exito")
    console.log(result)
    return (result)
}