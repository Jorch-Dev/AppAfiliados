import React, {useState} from 'react'


export function FileImage() {
    const [photo, setPhoto] = useState([])
    
    const foto = document.getElementById("standard-photo-input");
    console.log(foto)
    setPhoto({ foto })
    console.log(photo)
}
