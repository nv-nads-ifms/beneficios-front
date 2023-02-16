import React from 'react';
import { Container, Grid, Typography } from "@material-ui/core";
import { fichaStyles } from '../../components/UI/GlobalStyle';
import CustomAlert from '../CustomAlert/CustomAlert';
import { closeMessageAlert, emptyMessageAlert } from '../../api/utils/customMessages';
import SaveButton from '../CustomButtons/SaveButton';
import BackButton from '../CustomButtons/BackButton';

export default function BaseForm(props) {
    const { children, title, messageAlert, backButton, disabled,
        onSave } = props;
    const classes = fichaStyles();

    const [messageObj, setMessageObj] = React.useState(emptyMessageAlert);

    React.useEffect(() => {
        if (messageAlert != null) {
            setMessageObj(messageAlert);
        } else {
            setMessageObj(emptyMessageAlert);
        }
    }, [messageAlert]);

    return (
        <Container component="article" maxWidth="xl">
            <Typography gutterBottom variant="h4" component="h2" align="center"
                style={{ minHeight: '7vh' }}>{title}</Typography>
            {children}
            <Grid container spacing={0} direction="column" alignItems="flex-end">
                <Grid item xs>
                    {onSave != null && (
                        <SaveButton type="button" className={classes.button} onClick={onSave} disabled={disabled} />
                    )}
                    {backButton != null && (
                        <BackButton className={classes.button} />
                    )}
                </Grid>
            </Grid>
            <CustomAlert
                open={messageObj.open}
                setOpen={(value) => closeMessageAlert(setMessageObj)}
                requestMessage={messageObj.requestMessage}
                messageType={messageObj.messageType} />
        </Container>
    );
}