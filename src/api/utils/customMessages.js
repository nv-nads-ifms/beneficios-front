const emptyMessageAlert = {
    open: false,
    requestMessage: '',
    messageType: '',
}

const sendMessageAlert = (type, message, callback) => {
    callback({
        open: true,
        requestMessage: message,
        messageType: type,
    });
}

const closeMessageAlert = (callback) => {
    callback(emptyMessageAlert);
}

export { emptyMessageAlert, sendMessageAlert, closeMessageAlert }