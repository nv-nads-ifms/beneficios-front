import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export const fichaStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    messages: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    textField: {
        marginRight: theme.spacing(1),
        width: 350,
    },
    paper: {
        margin: theme.spacing(1),
        padding: theme.spacing(3),
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export const listaStyles = makeStyles((theme) => ({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    }
}));
