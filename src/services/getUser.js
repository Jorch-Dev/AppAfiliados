import { urlApi } from './urlApi'
import React from 'react'
import Axios from 'axios'

export const obtenerDatos = async () => {
    let id = localStorage.getItem("Id")
    let url = `${urlApi}v1/afiliados/${id}`
    console.log(id)
    console.log(url)

    const result = await Axios.get(url)
    const data = await result.data
    console.log(data)
    localStorage.setItem("datos", JSON.stringify(data))
}
