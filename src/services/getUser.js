import { urlApi } from './urlApi'
import React from 'react'
import Axios from 'axios'

export const obtenerDatos = async () => {
    let id = localStorage.getItem("Id")

    const result = await Axios.get(`${urlApi}v1/afiliados/${id}`)
    const data = await result.data
    console.log(data)
    return data
}
