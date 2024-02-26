import React from 'react';


import SaveButton from "../CustomButtons/SaveButton";
import CloseButton from "../CustomButtons/CloseButton";
import { fichaStyles } from "../UI/GlobalStyle";
import CustomAlert from '../CustomAlert/CustomAlert';
import { closeMessageAlert, emptyMessageAlert } from '../../api/utils/customMessages';
import { Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogForms(props) {
    const { children, open, onClose, messageAlert, onSave, title } = props;
    const classes = fichaStyles();
    const [messageObj, setMessageObj] = React.useState(emptyMessageAlert);
    React.useEffect(() => {
        if (messageAlert != null) {
            setMessageObj(messageAlert);
        } else {
            setMessageObj(emptyMessageAlert);
        }
    }, [messageAlert]);

    const handleClose = () => {
        setMessageObj(emptyMessageAlert);
        onClose();
    }

    return (
        <Dialog
            {...props}
            fullWidth={true}
            TransitionComponent={Transition}
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            {children != null && (
                <DialogContent>
                    {children}
                </DialogContent>
            )}
            <DialogActions>
                {onSave != null && (
                    <SaveButton
                        type="button"
                        onClick={onSave}
                        className={classes.button} />
                )}
                <CloseButton
                    type="button"
                    onClick={handleClose}
                    className={classes.button} />
            </DialogActions>
            <CustomAlert
                open={messageObj.open}
                setOpen={(value) => closeMessageAlert(setMessageObj)}
                requestMessage={messageObj.requestMessage}
                messageType={messageObj.messageType} />
        </Dialog>
    );
}