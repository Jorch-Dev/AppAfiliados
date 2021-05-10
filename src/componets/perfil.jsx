import React, { useState } from 'react'
import { logout } from '../redux/userSlice'
import { useDispatch } from "react-redux"
import { AppBar, Toolbar, Button, Typography, Container, Avatar, Box, Grid, Tabs, Tab, TextField } from '@material-ui/core';
import { useStyles } from '../assets/useStyles'
import { obtenerDatos } from '../services/getUser'
import Dropzone from 'react-dropzone';
import { Alert } from '@material-ui/lab'


export function Perfil() {
    localStorage.setItem("Id", '66')
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [photo, setPhoto] = useState([])
    const [succes, setSucces] = useState(null)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const dispatch = useDispatch()
    const cerrarS = (e) => {
        e.preventDefault()
        localStorage.clear();
        dispatch(logout())
    }

    obtenerDatos()
    const data = JSON.parse(localStorage.getItem("datos"))
    console.log(data)
    let date = (new Date(data.createdAt)).toString();

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


    return (
        <React.Fragment>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Roca Funnels
                    </Typography>
                    <Button color="inherit" onClick={(e) => cerrarS(e)}>cerrar sesión</Button>
                </Toolbar>
            </AppBar>

            <Box color="text.primary" className={classes.box}>
                <Container maxWidth="md">
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Avatar alt="Remy Sharp" src={data.urlImagen} className={classes.large} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h3" style={{ color: '#ffffff' }}>
                                {data.nombre} {data.apellidoPaterno} {data.apellidoMaterno}
                            </Typography>
                            <hr></hr>
                            <Typography variant="h8" style={{ color: '#ffffff' }}>
                                Afiliado desde:  {date}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>

                            <Typography variant="h8" style={{ color: '#ffffff' }}>
                                Teléfono: {data.telefono}
                            </Typography>
                            <hr></hr>
                            <Typography variant="h8" style={{ color: '#ffffff' }}>
                                Correo Electrónico: {data.email}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Container maxWidth="sm">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Información Personal" {...a11yProps(0)} />
                    <Tab label="Editar Información" {...a11yProps(1)} />
                    {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                id="standard-name-input"
                                disabled
                                label="Nombre"
                                type="text"
                                autoComplete="current-name"
                                value={data.nombre}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
                                id="standard-apellidoP-input"
                                label="Apellido Paterno"
                                type="text"
                                autoComplete="current-apellidosP"
                                value={data.apellidoPaterno}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
                                className={classes.imput}
                                id="standard-apellidoM-input"
                                label="Apellido Materno"
                                type="text"
                                autoComplete="current-apellidosM"
                                value={data.apellidoMaterno}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
                                id="standard-phone-input"
                                label="Telefono"
                                type="text"
                                autoComplete="current-phone"
                                value={data.telefono}
                                helperText="10 digitos"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
                                id="standard-email-input"
                                label="Correo Electrónico"
                                type="email"
                                autoComplete="current-email"
                                value={data.email}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
                                id="standard-enlace-input"
                                label="Enlace de afiliado"
                                type="email"
                                autoComplete="current-enlace"
                                value={data.enlace}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                id="standard-name-input"
                                required
                                label="Nombre"
                                type="text"
                                autoComplete="current-name"
                                value={data.nombre}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="standard-apellidoP-input"
                                label="Apellido Paterno"
                                type="text"
                                autoComplete="current-apellidosP"
                                value={data.apellidoPaterno}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                className={classes.imput}
                                id="standard-apellidoM-input"
                                label="Apellido Materno"
                                type="text"
                                autoComplete="current-apellidosM"
                                value={data.apellidoMaterno}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="standard-phone-input"
                                label="Telefono"
                                type="text"
                                autoComplete="current-phone"
                                value={data.telefono}
                                helperText="10 digitos"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="standard-email-input"
                                label="Correo Electrónico"
                                type="email"
                                autoComplete="current-email"
                                value={data.email}
                            />
                        </Grid>
                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid align='center'>
                            <Button style={{ backgroundColor: "#fc7700", color: '#ffffff' }} type="submit" variant="contained" size="large" >Actualizar</Button>
                            {
                                succes != null ? (
                                    <Alert severity="success">{succes}!</Alert>
                                ) : (
                                    <></>
                                )
                            }
                        </Grid>
                    </Grid>
                </TabPanel>

            </Container>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Roca Funnels
                    </Typography>
                </Toolbar>
            </AppBar>


        </React.Fragment>
    )
}


