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
        padding: 70,
        height: '110vh',
        width: 270,
        margin: '30px auto',
        color: "#ffffff"
    },
    paper1: {
        borderRadius: '7vh',
        padding: 70,
        height: '110vh',
        width: 270,
        margin: '30px auto'
    },
    large: {
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
    box: {
        backgroundColor: "#1946bb",
        padding: 60,
        margin: '5px auto',
    },
    tab: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));