
import React from "react";
import SimpleTable from "../../../components/CustomTable/SimpleTable";
import ProntuarioHistoricoTableRowComponent from "./ProntuarioHistoricoTableRowComponent";

const columns = [
    { id: 'status', label: 'Status' },
    { id: 'funcionario', label: 'Funcionário' },
    { id: 'emissao', label: 'Emissão' },
    { id: 'observacao', label: 'Observação' },
];

export default function ProntuarioHistoricoListagemComponent(props) {
    const { prontuario } = props;
    const [historicos, setHistoricos] = React.useState([]);

    React.useEffect(() => {
        if (prontuario.historicos.length > 0) {
            setHistoricos(prontuario.historicos);
        } else {
            setHistoricos([]);
        }
    }, [prontuario.historicos]);

    return (
        <SimpleTable
            emptyRows={historicos.length === 0}
            columns={columns}
            notShowActions
        >
            {historicos.map((row, key) => {
                return (
                    <ProntuarioHistoricoTableRowComponent
                        key={"row-" + key}
                        row={row} />
                );
            })}
        </SimpleTable>
    );
}