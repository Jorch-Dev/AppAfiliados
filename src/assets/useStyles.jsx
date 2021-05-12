import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1)
        }
    },
    contenedor: {
        margin: '30px auto'
    },
    appBar: {
        backgroundColor: '#1946bb'
    },
    paper: {
        '--color-1': '#4b73f0',
        '--color-2': '#ffffff',
        background: `
      linear-gradient(
        170deg,
        var(--color-1),
        var(--color-2) 80%
      )
    `,
        borderRadius: '7vh',
        padding: 50,
        height: '80vh',
        width: 270,
        color: "#ffffff"
    },
    paper1: {
        borderRadius: '7vh',
        padding: 50,
        height: '110vh',
        width: 270
    },
    large: {
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
    box: {
        backgroundColor: "#1946bb",
        padding: 60,
        margin: '5px auto'
    },
    box1: {
        backgroundColor: "#1946bb",
        padding: 60,
        margin: '5px auto',
        height: '110vh',
        borderRadius: '5vh',
    },
    tab: {
        backgroundColor: theme.palette.background.paper
    },
    gridTab: {
        margin: '5px auto'
    }
}));