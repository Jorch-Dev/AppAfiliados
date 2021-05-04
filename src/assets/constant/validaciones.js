import React from 'react'

export const campoAlfa = (usuario) => {
    //debugger
    const usr = usuario;
    const expregUsr = /^[a-zA-Z]+$/i;
    const result = true;
    
    if (usr != "") {
        if (!expregUsr.test(usr)) {
            result = false
        }
    }
    return result
}

export const validoEmail = (email) => {
    const result = true;
    const regext = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
            if (!regext.exec(email)) {
                result = false
                return;
            }
   return result;
}
