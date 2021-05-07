import React from 'react'
import { urlApi } from './urlApi'
import Axios from 'axios'

export default async function addUser(obj) {

    let url = urlApi + "v1/afiliados";

        await Axios.post(url, {
            "nombre": obj.name,
            "apellidoPaterno": obj.apellidoPaterno,
            "apellidoMaterno": obj.apellidoMaterno,            
            "telefono": obj.telefono,
            "email": obj.email,
            "password": obj.pasword,
            "enlace":`/${obj.telefono}`,
            "public_id":`${obj.telefono}/avatar`
        }).then(response => {
            console.log(response.data);
            if (response.status === 201) {
                localStorage.setItem("Enlace", `${response.data.afiliado.enlace}`)
                localStorage.setItem("Token", `${response.data.token}`)
    
                let urlCloud = response.data.postImagen.urlCloud;
                console.log(obj.image[0])
                let formData = new FormData();
                formData.append("file", obj.image[0]);
                formData.append("api_key", response.data.postImagen.api_key);
                formData.append("public_id", `${obj.telefono}/avatar`);
                formData.append("timestamp", response.data.postImagen.timestamp);
                formData.append("signature", response.data.postImagen.signature);
    
                Axios.post(urlCloud, formData)
                        .then(response => {
                            console.log(response);
                                
                        })
                        .catch(error => {
                            console.log("Error: " + error)
                        })
                    }
                
        })
        .catch(function (error)  {
            if (error.response.status === 400) {
                localStorage.setItem("Error", JSON.stringify(`${error.response.data.error.msg} ${error.response.data.error.campo}`))
              } 
        })
}

export async function errores() {
    return await localStorage.getItem("Error")  
}