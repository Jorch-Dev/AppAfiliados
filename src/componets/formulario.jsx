import React, { useState } from 'react'
import { useStyles } from '../assets/useStyles'
import { AppBar, Toolbar, Container, Button, TextField, Avatar, Grid, Paper } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import { Alert } from '@material-ui/lab'
import addUser, { constante } from '../services/addUser'

export const Formulario = () => {
    const [nombre, setNombre] = useState("")
    const [apellidoP, setApellidoP] = useState("")
    const [apellidoM, setApellidoM] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [succes, setSucces] = useState(null)
    const [alfanumerico, setAlfanumerico] = useState(null)
    const [apellidoPError, setApellidoPError] = useState(null)
    const [apellidoMError, setApellidoMError] = useState(null)
    const [errorEmail, seterrorEmail] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [phoneError, setPhoneerror] = useState(null)
    const classes = useStyles();

    const registrar = (e) => {
        e.preventDefault()

        const objUser = {
            name: nombre,
            apellidoPaterno: apellidoP,
            apellidoMaterno: apellidoM,
            pasword: password,
            telefono: phone,
            email: email
        }
        if (!nombre.trim()) {
            setAlfanumerico('El campo Nombre no puede estar vacio')
            return
        }
        if (!apellidoP.trim()) {
            setApellidoPError('El campo Apellido Paterno no puede estar vacio')
            return
        }
        if (!password.trim()) {
            setApellidoMError('El campo Password no puede estar vacio')
            return
        }
        if (!phone.trim()) {
            setPhoneerror('El campo Telefono no puede estar vacio')
            return
        }
        if (!email.trim()) {
            seterrorEmail('El campo Correo Electrónico no puede estar vacio')
            return
        }
        //------------Validaciones
        const expregUsr = /^[A-Z]+$/i;
        if (!expregUsr.test(nombre)) {
            setAlfanumerico("El campo solo acepta letras [a-z-A-Z]")
            return;
        }
        if (!expregUsr.test(apellidoP)) {
            setApellidoPError("El campo solo acepta letras [a-z-A-Z]")
            return;
        }
        var expreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_;$@$¡!%*¿?&#+<>/])[-_;A-Za-z\d$@$¡!%*¿?&#+<>/]{8}/;
        if (!expreg.test(password)) {
            setPasswordError("La contraseña no tiene el formato correcto");
            return;
        }
        if (phone.replace(/\D+/g, "").length !== 10) {
            setPhoneerror("El campo telefono solo acepta 10 caracteres de tipo número")
            return
        }
        const regext = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
        if (!regext.exec(email)) {
            seterrorEmail("El formato del correo electrónico es incorrecto")
            return;
        }

        addUser(objUser)
        setNombre("")
        setApellidoP("")
        setApellidoM("")
        setPassword("")
        setPhone("")
        setEmail("")
        //const result = constante()
        //setSucces(result)
        //console.log(succes)

    }

    const escribirNombre = (e) => {
        setNombre(e.target.value)
        setAlfanumerico(null)
    }
    const escribirApellidoP = (e) => {
        setApellidoP(e.target.value)
        setApellidoPError(null)
    }
    const escribirApellidoM = (e) => {
        const expregUsr = /^[A-Z]+$/i;
        if (!expregUsr.test(e.target.value)) {
            setApellidoMError("El campo solo acepta letras [a-z-A-Z]")
            return;
        }
        setApellidoM(e.target.value)
        setApellidoMError(null)
    }
    const escribirPassword = (e) => {
        setPassword(e.target.value)
        setPasswordError(null)
    }
    const escribirPhone = (e) => {
        setPhone(e.target.value)
        setPhoneerror(null)
    }
    const escribirEmail = (e) => {
        setEmail(e.target.value)
        seterrorEmail(null)
    }

    return (
        <React.Fragment>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <h3>Roca Funnel</h3>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid >
                    <Paper elevation={10} className={classes.paper}>
                        <Grid align='center'>
                            <Avatar className={classes.avatar}><PersonAdd /></Avatar>
                        </Grid>
                        <form className={classes.root} onSubmit={(e) => registrar(e)}>
                            <TextField
                                id="standard-name-input"
                                required
                                label="Nombre"
                                type="text"
                                autoComplete="current-name"
                                onChange={(e) => { escribirNombre(e) }}
                                value={nombre}
                            />
                            {
                                alfanumerico != null ?
                                    (<Alert severity="error">{alfanumerico}!</Alert>)
                                    : (<></>)
                            }
                            <TextField
                                required
                                id="standard-apellidoP-input"
                                label="Apellido Paterno"
                                type="text"
                                autoComplete="current-apellidosP"
                                onChange={(e) => { escribirApellidoP(e) }}
                                value={apellidoP}
                            />
                            {
                                apellidoPError != null ?
                                    (<Alert severity="error">{apellidoPError}!</Alert>)
                                    : (<></>)
                            }
                            <TextField
                                className={classes.imput}
                                id="standard-apellidoM-input"
                                label="Apellido Materno"
                                type="text"
                                autoComplete="current-apellidosM"
                                onChange={(e) => { escribirApellidoM(e) }}
                                value={apellidoM}
                            />
                            {
                                apellidoMError != null ?
                                    (<Alert severity="error">{apellidoMError}!</Alert>)
                                    : (<></>)
                            }
                            <TextField
                                required
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                onChange={(e) => { escribirPassword(e) }}
                                value={password}
                                inputProps={{ maxLength: 8 }}
                                helperText="Debe contener mínimo 8 posiciones considerando al menos una mayúscula, un carácter especial y un número"
                            />
                            {
                                passwordError != null ?
                                    (<Alert severity="error">{passwordError}!</Alert>)
                                    : (<></>)
                            }
                            <TextField
                                required
                                id="standard-phone-input"
                                label="Telefono"
                                type="text"
                                autoComplete="current-phone"
                                onChange={(e) => { escribirPhone(e) }}
                                value={phone}
                                helperText="10 digitos"
                                inputProps={{ maxLength: 10 }}
                            />
                            {
                                phoneError != null ?
                                    (<Alert severity="error">{phoneError}!</Alert>)
                                    : (<></>)
                            }
                            <TextField
                                required
                                id="standard-email-input"
                                label="Correo Electrónico"
                                type="email"
                                autoComplete="current-email"
                                onChange={(e) => { escribirEmail(e) }}
                                value={email}
                            />
                            {
                                errorEmail != null ? (
                                    <Alert severity="error">{errorEmail}!</Alert>) : (<></>)
                            }
                            <Grid align='center'>
                                <Button type="submit" variant="contained" color="primary" size="large" disableElevation>Registrarse</Button>
                                {
                                    succes != null ? (
                                        <Alert severity="success">{succes}!</Alert>
                                    ) : (
                                        <></>
                                    )
                                }
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Container>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <h3>Roca Funnel</h3>
                </Toolbar>
            </AppBar>

        </React.Fragment>
    )
}
