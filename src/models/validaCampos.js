function validarCampo(msg) {
    if (msg !== "") {
        return { valido: false, texto: msg };
    }
    return { valido: true, texto: "" };
}

export { validarCampo };