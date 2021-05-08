import React from 'react'
import { logout } from '../redux/userSlice'
import { useDispatch } from "react-redux"
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { useStyles } from '../assets/useStyles'
import { obtenerDatos } from '../services/getUser'

const Perfil = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const cerrarS = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

    //let data = await obtenerDatos()
    //console.log(data)


    return (
        <>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Este es mi perfil
                    </Typography>
                    <Button color="inherit" onClick={(e) => cerrarS(e)}>cerrar sesión</Button>
                </Toolbar>
            </AppBar>

        </>
    )
}

export default Perfil
