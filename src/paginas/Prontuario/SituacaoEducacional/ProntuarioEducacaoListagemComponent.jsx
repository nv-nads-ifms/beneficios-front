
import React from "react";
import SimpleTable from "../../../components/CustomTable/SimpleTable";
import ProntuarioEducacaoTableRowComponent from "./ProntuarioEducacaoTableRowComponent";

const columns = [
    { id: 'parentesco', label: 'Parentesco' },
    { id: 'nome', label: 'Nome' },
    { id: 'escolaridade', label: 'Escolaridade' },
];

export default function ProntuarioEducacaoListagemComponent(props) {
    const { prontuario } = props;
    const [estudos, setEstudos] = React.useState([]);

    React.useEffect(() => {
        let lista = [];
        if (prontuario.titular.nome !== "" &&
            prontuario.titular.escolaridadeDto != null) {
            lista.push({
                parentesco: "Titular",
                nome: prontuario.titular.nome,
                escolaridade: prontuario.titular.escolaridadeDto.descricao,
            });

            prontuario.dependentes.map((dependente) => {
                lista.push({
                    parentesco: dependente.parentesco.descricao,
                    nome: dependente.pessoa.nome,
                    escolaridade: (dependente.pessoa.escolaridadeDto != null ? 
                        dependente.pessoa.escolaridadeDto.descricao : ''),
                });
                return dependente;
            });
        }
        setEstudos(lista);
    }, [prontuario.dependentes, prontuario.titular.escolaridadeDto.descricao,
    prontuario.titular.nome, prontuario.titular.escolaridadeDto]);

    return (
        <SimpleTable
            emptyRows={estudos.length === 0}
            columns={columns}
            notShowActions
        >
            {estudos.map((row, key) => {
                return (
                    <ProntuarioEducacaoTableRowComponent
                        key={"row-" + key}
                        row={row} />
                );
            })}
        </SimpleTable>
    );
}