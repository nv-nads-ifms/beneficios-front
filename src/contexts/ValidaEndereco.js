import React from "react";

const ValidaEndereco = React.createContext({
  endereco: semValidacao,
});

function semValidacao(dados) {
  console.log(dados);
  return { valido: true, texto: "" };
}
export default ValidaEndereco;
