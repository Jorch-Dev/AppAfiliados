import React from 'react'
import { urlApi, urlImg } from './urlApi'
import Axios from 'axios'

export default async function addUser(obj) {

    let url = urlApi + "v1/afiliados";
    let urlCloud = urlImg
     console.log(obj.image[0])
    let formData = new FormData();
    formData.append("file", obj.image[0]);
    formData.append("upload_preset", `plantilla-afiliado`);

            Axios.post(urlCloud, formData)
            .then(response => {
                console.log(response.data);
                    Axios.post(url, {
                        "nombre": obj.name,
                        "apellidoPaterno": obj.apellidoPaterno,
                        "apellidoMaterno": obj.apellidoMaterno,            
                        "telefono": obj.telefono,
                        "email": obj.email,
                        "password": obj.pasword,
                        "enlace":`/${obj.telefono}`,
                        "urlImagen": response.data.secure_url
                    }).then(response => {
                        console.log(response.data);
                        if (response.status === 201) {
                            localStorage.setItem("Id", `${response.data.afiliado.id}`)
                            localStorage.setItem("Enlace", `${response.data.afiliado.enlace}`)
                            localStorage.setItem("Token", `${response.data.token}`) 
                        }              
                    })
                    .catch(function (error)  {
                        if (error.response.status === 400) {
                            localStorage.setItem("Error", JSON.stringify(`${error.response.data.error.msg} ${error.response.data.error.campo}`))
                        } 
                    })
                    
            })
            .catch(error => {
                console.log("Error: " + error)
            })
        }      

export async function errores() {
    return await localStorage.getItem("Error")  
}