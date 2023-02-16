import React from "react";

/* validacoes = { campo: {valido: false, texto: ''}} */
function useErros(validacoes) {
    const estadoInicial = criarEstadoInicial(validacoes);
    const [erros, setErros] = React.useState(estadoInicial);

    function validarCampos(target) {
        const novoEstado = { ...estadoInicial };
        if (Array.isArray(target)) {
            target.map((element, key) => {
                const { campo, erro } = element;
                novoEstado[campo] = validacoes[campo](erro);
                return element;
            });
        } else {
            const { campo, erro } = target;
            novoEstado[campo] = validacoes[campo](erro);
        }
        setErros(novoEstado);
    }

    function possoEnviar() {
        for (let campo in erros) {
            if (!erros[campo].valido) {
                return false;
            }
        }
        return true;
    }

    function resetErros() {
        for (let campo in erros) {
            erros[campo].valido = true;
            erros[campo].texto = '';
        }
    }

    return [erros, resetErros, validarCampos, possoEnviar];
}

function criarEstadoInicial(validacoes) {
    const estadoInicial = {};
    for (let campo in validacoes) {
        estadoInicial[campo] = { valido: true, texto: "" };
    }

    return estadoInicial;
}

export default useErros;