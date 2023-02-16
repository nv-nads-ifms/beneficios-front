import React from "react";

const ValidaMoradia = React.createContext({
  descricao: semValidacao,
});

function semValidacao(dados) {
  return { valido: true, texto: "" };
}

export default ValidaMoradia;
