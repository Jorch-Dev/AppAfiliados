import React, { useState } from 'react'
import Logo from '../assets/images/roca.png'
import { Button, TextField, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import { useStyles } from '../assets/useStyles'
import loginService from '../services/loginService'
import { login } from '../redux/userSlice'
import { useDispatch } from "react-redux"

export default function LogIn() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [errorEmail, seterrorEmail] = useState(null)
    const [passwordError, setPasswordError] = useState(null)

    const escribirPassword = (e) => {
        setPassword(e.target.value)
        setPasswordError(null)
    }
    const escribirEmail = (e) => {
        setEmail(e.target.value)
        seterrorEmail(null)
        localStorage.clear();
    }

    const acceder = (e) => {
        e.preventDefault()
        if (!password.trim()) {
            setPassword('El campo Password no puede estar vacio')
            return
        }
        if (!email.trim()) {
            seterrorEmail('El campo Correo Electrónico no puede estar vacio')
            return
        }
        const objUser = {
            email: email,
            pasword: password
        }
        console.log(objUser)
        loginService(objUser)

        const data = JSON.parse(localStorage.getItem("datos"))
        console.log(data)
        dispatch(
            login({
                name: data.afiliado.nombre,
                apellidoPaterno: data.afiliado.apellidoPaterno,
                apellidoMaterno: data.afiliado.apellidoMaterno,
                pasword: data.afiliado.password,
                telefono: data.afiliado.telefono,
                email: data.afiliado.email,
                loggedIn: true,
            })
        )
        setPassword("")
        setEmail("")
    }

    return (
        <>
            <Grid item xs={12} align='center'>
                <img src={Logo} width="50" height="50" />
            </Grid>
            <Grid item xs={12} align='center'>
                <h2 style={{ color: "#ffffff" }}>LOGIN</h2>
            </Grid>
            <form className={classes.root} onSubmit={(e) => acceder(e)} >
                <TextField
                    id="standard-user-input"
                    required
                    label="Usuario"
                    type="text"
                    autoComplete="current-user"
                    onChange={(e) => { escribirEmail(e) }}
                    value={email}
                />
                {
                    errorEmail != null ? (
                        <Alert severity="error">{errorEmail}!</Alert>) : (<></>)
                }
                <TextField
                    required
                    id="standard-passw0rd-input"
                    label="Password"
                    type="password"
                    autoComplete="current-passw0rd"
                    inputProps={{ maxLength: 8 }}
                    onChange={(e) => { escribirPassword(e) }}
                    value={password}
                />
                {
                    passwordError != null ? (
                        <Alert severity="error">{errorEmail}!</Alert>) : (<></>)
                }
                <Button style={{ backgroundColor: "#fc7700", color: '#ffffff' }} type="submit" variant="contained" size="large" >iniciar sesión</Button>
            </form>
        </>
    )
}
