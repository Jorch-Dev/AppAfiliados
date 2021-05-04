import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1)
        }
    },
    avatar: {
        backgroundColor: '#fc7700'
    },
    paper: {
        borderRadius: '5',
        padding: 70,
        height: '85vh',
        width: 280,
        margin: '20px auto',
        marginRight: '30vh'
    },
    appBar: {
        backgroundColor: '#4b73f0'
    }

}));