import React, { useState, useEffect } from 'react'
import { useStyles } from '../assets/useStyles'
import { AppBar, Toolbar, Container, Button, TextField, Avatar, Grid, Paper, Typography, Box, Tabs, Tab } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import { Alert, TimelineSeparator } from '@material-ui/lab'
import { useDropzone } from 'react-dropzone';
import addUser, { errores } from '../services/addUser'
import LogIn from '../componets/logIn'
import { login } from '../redux/userSlice'
import { useDispatch } from "react-redux"

export function Formulario() {
    const dispatch = useDispatch();
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
    //#region tabs
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
    //#endregion

    //#region Dropzone
    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16
    };

    const thumb = {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box'
    };

    const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    };

    const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
    };
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
    //#endregion

    const registrar = (e) => {
        e.preventDefault()
        //#region Registrar
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
        console.log(files)
        const objUser = {
            name: nombre,
            apellidoPaterno: apellidoP,
            apellidoMaterno: apellidoM,
            pasword: password,
            telefono: phone,
            email: email,
            image: files
        }
        console.log(objUser)
        addUser(objUser)

        function erroresServidor() {
            let msgError = errores()
            if (msgError != null) {
                setErrorSVDR(msgError)
            }
            console.log(errorSVDR)
            return
        }


        setNombre("")
        setApellidoP("")
        setApellidoM("")
        setPassword("")
        setPhone("")
        setEmail("")
        setPhoto([])
        setErrorSVDR(null)

        localStorage.clear();
        dispatch(
            login({
                name: nombre,
                apellidoPaterno: apellidoP,
                apellidoMaterno: apellidoM,
                pasword: password,
                telefono: phone,
                email: email,
                loggedIn: true,
            })
        )
        //#endregion 

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
                    <Typography variant="h6">
                        RocaFunnels
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md">
                <Grid container className={classes.contenedor} spacing={2}>
                    <Grid item xs={6}>
                        <Box color="text.primary" className={classes.box1}>
                            <Grid>
                                <h1 style={{ color: '#ffffff' }}>ROCA!!!</h1>
                            </Grid>
                            <Grid>
                                <p style={{ color: '#ffffff' }}>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</p>
                            </Grid>
                            <Grid>
                                <p style={{ color: '#ffffff' }}>"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."</p>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={6} className={classes.gridTab}>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Login" {...a11yProps(0)} />
                            <Tab label="Registro" {...a11yProps(1)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <Grid container spacing={3}>
                                <Paper elevation={20} className={classes.paper}>
                                    <LogIn />
                                </Paper>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Grid container spacing={3}>
                                <Paper elevation={20} className={classes.paper1}>
                                    <Grid item xs={12} align='center'>
                                        <Avatar style={{ backgroundColor: "#4b73f0" }}><PersonAdd /></Avatar>
                                    </Grid>
                                    <Grid item xs={12} align='center'>
                                        <Typography variant="h3" style={{ color: "#4b73f0" }}>
                                            REGISTRO
                                </Typography>
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
                                            style={{ color: '#4b73f0' }}
                                        />
                                        {
                                            alfanumerico != null ?
                                                (<Alert severity="error">{alfanumerico}!</Alert>)
                                                : (<></>)
                                        }
                                        <TextField
                                            required
                                            id="standard-apellidoP-input"
                                            label="Apellido paterno"
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
                                            label="Apellido materno"
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
                                            label="Teléfono"
                                            type="text"
                                            autoComplete="current-phone"
                                            onChange={(e) => { escribirPhone(e) }}
                                            value={phone}
                                            helperText="10 dígitos"
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
                                        <section className="container">
                                            <div {...getRootProps({ className: 'dropzone' })}>
                                                <input {...getInputProps()} />
                                                <p>Arrastra y suelta tu avatar aquí o clic para seleccionar</p>
                                            </div>
                                            <aside style={thumbsContainer}>
                                                {thumbs}
                                            </aside>
                                        </section>
                                        <div align='center'>
                                            <Button style={{ backgroundColor: "#fc7700", color: '#ffffff' }} type="submit" variant="contained" size="large" >Regístrate</Button>
                                            {
                                                succes != null ? (
                                                    <Alert severity="success">{succes}!</Alert>
                                                ) : (
                                                    <></>
                                                )
                                            }
                                        </div>
                                    </form>
                                </Paper>
                            </Grid>
                        </TabPanel>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment >
    )
}
