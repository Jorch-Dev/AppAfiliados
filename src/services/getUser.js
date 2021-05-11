import { urlApi } from './urlApi'
import React from 'react'
import Axios from 'axios'

export function getId(){
    let id = localStorage.getItem("Id")
    console.log(id)
    return id
}

export function obtenerDatos(id) {
    
    let url = `${urlApi}v1/afiliados/${id}`
    console.log(id)
    console.log(url)

    const result = Axios.get(url)
    const data = result.data
    console.log(data)
    localStorage.setItem("datos", JSON.stringify(data))
}


