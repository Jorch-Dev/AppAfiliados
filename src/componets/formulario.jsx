import React, { useState } from 'react'
import { useStyles } from '../assets/useStyles'
import { AppBar, Toolbar, Container, Button, TextField, Avatar, Grid, Paper } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import { Alert } from '@material-ui/lab'
import Dropzone from 'react-dropzone';
import addUser, { errores } from '../services/addUser'
import Logo from '../assets/images/roca.png'

export function Formulario() {
    const [nombre, setNombre] = useState("")
    const [apellidoP, setApellidoP] = useState("")
    const [apellidoM, setApellidoM] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [photo, setPhoto] = useState([])

    const [succes, setSucces] = useState(null)
    const [alfanumerico, setAlfanumerico] = useState(null)
    const [apellidoPError, setApellidoPError] = useState(null)
    const [apellidoMError, setApellidoMError] = useState(null)
    const [errorEmail, seterrorEmail] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [phoneError, setPhoneerror] = useState(null)
    const [errorSVDR, setErrorSVDR] = useState(null)

    const classes = useStyles();

    const registrar = async (e) => {
        e.preventDefault()

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
        //const image = document.getElementById("standard-photo-input").files[0]
        const objUser = {
            name: nombre,
            apellidoPaterno: apellidoP,
            apellidoMaterno: apellidoM,
            pasword: password,
            telefono: phone,
            email: email,
            image: photo
        }
        console.log(objUser)
        await addUser(objUser)

        let msgError = await errores()
        if (msgError != null) {
            setErrorSVDR(msgError)
            return
        }
        console.log(errorSVDR)

        setNombre("")
        setApellidoP("")
        setApellidoM("")
        setPassword("")
        setPhone("")
        setEmail("")
        setPhoto([])
        setErrorSVDR(null)

        localStorage.clear();
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
        setErrorSVDR(null)
        localStorage.clear();
    }
    const escribirEmail = (e) => {
        setEmail(e.target.value)
        seterrorEmail(null)
        setErrorSVDR(null)
        localStorage.clear();
    }

    return (
        <React.Fragment>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <h3>Roca Funnel</h3>
                </Toolbar>
            </AppBar>
            <Container className={classes.contenedor}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper elevation={20} className={classes.paper} style={{ backgroundColor: "#4b73f0" }}>
                            <Grid align='center'>
                                <img src={Logo} width="50" height="50" />
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={20} className={classes.paper}>
                            <Grid align='center'>
                                <Avatar style={{ backgroundColor: "#fc7700" }}><PersonAdd /></Avatar>
                            </Grid>
                            {
                                errorSVDR != null ? (
                                    <Alert severity="error">{errorSVDR}!</Alert>) : (<></>)
                            }
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
                                <Dropzone onDrop={files => setPhoto(files)}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div className="container">
                                            <div
                                                {...getRootProps({
                                                    className: 'dropzone',
                                                    accept: 'image/jpeg, image/png',
                                                    onDrop: event => event.stopPropagation()
                                                })}
                                            >
                                                <input {...getInputProps()} />
                                                <p>Arrastra y suelta aqui tu imagen de perfil o clic para seleccionar</p>
                                            </div>
                                        </div>
                                    )}
                                </Dropzone>
                                <Grid align='center'>
                                    <Button style={{ backgroundColor: "#fc7700", color: '#ffffff' }} type="submit" variant="contained" size="large" >Registrarse</Button>
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
                </Grid>
            </Container>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <h3>Roca Funnel</h3>
                </Toolbar>
            </AppBar>

        </React.Fragment >
    )
}
