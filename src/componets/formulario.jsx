import React, { useState } from 'react'
import { useStyles } from '../assets/useStyles'
import imagen from '../assets/images/roca.png'
import { AppBar, Toolbar, Container, Button, TextField, Divider, Typography, Grid, Paper, ScopedCssBaseline } from '@material-ui/core';

export const Formulario = () => {
    const [nombre, setNombre] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)
    const [lista, setLista] = useState([])
    const classes = useStyles();

    const registrar = (e) => {
        e.preventDefault()
        console.log(nombre)
        console.log(apellidos)
        console.log(password)
        console.log(phone)
        console.log(email)
        if (!nombre.trim()) {
            setError('El campo nombre no puede estar vacio')
            return
        }
        if (!apellidos.trim()) {
            setError('El campo apellidos no puede estar vacio')
            return
        }
        if (!password.trim()) {
            setError('El campo password no puede estar vacio')
            return
        }
        if (!phone.trim()) {
            setError('El campo telefono no puede estar vacio')
            return
        }
        if (!email.trim()) {
            setError('El campo correo electrónico no puede estar vacio')
            return
        }
        const objNombre = {
            name: nombre,
            apellidos: apellidos,
            pasword: password,
            telefono: phone,
            email: email
        }
        setLista([objNombre])
        console.log(lista)
        setNombre("")
        setApellidos("")
        setPassword("")
        setPhone("")
        setEmail("")

    }

    const escribirNombre = (e) => {
        setNombre(e.target.value)
        setError(null)
    }
    const escribirApellidos = (e) => {
        setApellidos(e.target.value)
        setError(null)
    }
    const escribirPassword = (e) => {
        setPassword(e.target.value)
        setError(null)
    }
    const escribirPhone = (e) => {
        setPhone(e.target.value)
        setError(null)
    }
    const escribirEmail = (e) => {
        setEmail(e.target.value)
        setError(null)
    }

    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <h3>Roca Funnel</h3>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md">
                <Grid container spacing={3} >
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <p>
                                <img className={classes.image} src={imagen} />
                            </p>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            {/* <Typography component="div" style={{ backgroundColor: '#ffffff', height: '50vh' }}> */}
                            <Divider />
                            <form className={classes.root} onSubmit={(e) => registrar(e)} noValidate autoComplete="off">
                                <div>
                                    <TextField
                                        className={classes.imput}
                                        requerid={true}
                                        id="standard-name-input"
                                        label="Nombre"
                                        type="text"
                                        autoComplete="current-name"
                                        onChange={(e) => { escribirNombre(e) }}
                                        value={nombre}
                                    />
                                    {
                                        error != null ? (
                                            <span className="alert alert-danger">{error}</span>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    <TextField
                                        className={classes.imput}
                                        requerid={true}
                                        id="standard-apellidos-input"
                                        label="Apellidos"
                                        type="text"
                                        autoComplete="current-apellidos"
                                        onChange={(e) => { escribirApellidos(e) }}
                                        value={apellidos}
                                    />
                                    {
                                        error != null ? (
                                            <span className="alert alert-danger">{error}</span>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    <TextField
                                        className={classes.imput}
                                        requerid={true}
                                        id="standard-password-input"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={(e) => { escribirPassword(e) }}
                                        value={password}
                                    />
                                    {
                                        error != null ? (
                                            <span className="alert alert-danger">{error}</span>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    <TextField
                                        className={classes.imput}
                                        requerid={true}
                                        id="standard-phone-input"
                                        label="Telefono"
                                        type="text"
                                        autoComplete="current-phone"
                                        onChange={(e) => { escribirPhone(e) }}
                                        value={phone}
                                    />
                                    {
                                        error != null ? (
                                            <span className="alert alert-danger">{error}</span>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    <TextField
                                        className={classes.imput}
                                        requerid={true}
                                        id="standard-email-input"
                                        label="Correo Electrónico"
                                        type="text"
                                        autoComplete="current-email"
                                        onChange={(e) => { escribirEmail(e) }}
                                        value={email}
                                    />
                                    {
                                        error != null ? (
                                            <span className="alert alert-danger">{error}</span>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    <Button type="submit" variant="contained" color="primary">Registrarse</Button>
                                </div>

                                <Divider />
                            </form>
                            {/* </Typography> */}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <AppBar position="static">
                <Toolbar>
                    <h3>Roca Funnel</h3>
                </Toolbar>
            </AppBar>

        </React.Fragment>
    )
}
