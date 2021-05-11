import React, { useState, useEffect } from 'react'
import { logout } from '../redux/userSlice'
import { useDispatch } from "react-redux"
import { AppBar, Toolbar, Button, Typography, Container, Avatar, Box, Grid, Tabs, Tab, TextField } from '@material-ui/core';
import { useStyles } from '../assets/useStyles'
import { obtenerDatos, getId } from '../services/getUser'
import { useDropzone } from 'react-dropzone';
import { Alert } from '@material-ui/lab'


export function Perfil() {
    let id = getId()
    console.log(id)
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [succes, setSucces] = useState(null)
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
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
    //#endregion

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

    obtenerDatos(id)
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
                        RocaFunnels
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
                                Correo electrónico: {data.email}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Container maxWidth="sm">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Información Personal" {...a11yProps(0)} />
                    <Tab label="Editar Información" {...a11yProps(1)} />
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
                                id="standard-apellidoPaterno-input"
                                label="Apellido paterno"
                                type="text"
                                autoComplete="current-apellidoPaterno"
                                value={data.apellidoPaterno}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
                                className={classes.imput}
                                id="standard-apellidoMaterno-input"
                                label="Apellido materno"
                                type="text"
                                autoComplete="current-apellidoMaterno"
                                value={data.apellidoMaterno}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
                                id="standard-phone-input"
                                label="Teléfono"
                                type="text"
                                autoComplete="current-phone"
                                value={data.telefono}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
                                id="standard-email-input"
                                label="Correo electrónico"
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
                                label="Apellido paterno"
                                type="text"
                                autoComplete="current-apellidosP"
                                value={data.apellidoPaterno}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                className={classes.imput}
                                id="standard-apellidoM-input"
                                label="Apellido materno"
                                type="text"
                                autoComplete="current-apellidosM"
                                value={data.apellidoMaterno}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="standard-phone-input"
                                label="Teléfono"
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
                                label="Correo electrónico"
                                type="email"
                                autoComplete="current-email"
                                value={data.email}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <section className="container">
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                    <p>Arrastra y suelta tu avatar aquí o clic para seleccionar</p>
                                </div>
                                <aside style={thumbsContainer}>
                                    {thumbs}
                                </aside>
                            </section>
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
                        RocaFunnels
                    </Typography>
                </Toolbar>
            </AppBar>


        </React.Fragment>
    )
}


