import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1)
        }
    },
    contenedor: {
        padding: theme.spacing(2),
    },
    appBar: {
        backgroundColor: '#1946bb'
    },
    paper: {
        borderRadius: '5vh',
        padding: 70,
        height: '100vh',
        width: 270,
        margin: '30px auto',
    }


}));