
import React from "react";

import { objectContext } from "../../../contexts/objectContext";
import { Box, ListItemText } from "@mui/material";
import DNADataGrid from "../../../components/V1.0.0/DNADataGrid";

const columns = [
    {
        field: 'nome',
        headerName: 'Nome',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => (
            <ListItemText
                primary={params.value}
                secondary={params.row.parentesco}
            />
        )
    },
    {
        field: 'escolaridade',
        headerName: 'Escolaridade',
        minWidth: 150,
        flex: 1
    },
];

export default function ProntuarioEducacaoListagemComponent() {
    const { object } = React.useContext(objectContext);

    const [estudos, setEstudos] = React.useState([]);

    React.useEffect(() => {
        let lista = [];
        if (object.titular.nome !== "" &&
            object.titular.escolaridade != null) {
            lista.push({
                id: object.titular.id,
                parentesco: "Titular",
                nome: object.titular.nome,
                escolaridade: object.titular.escolaridade.nome,
            });

            object.dependentes.map((dependente) => {
                lista.push({
                    id: dependente.pessoa.id,
                    parentesco: dependente.parentesco.descricao,
                    nome: dependente.pessoa.nome,
                    escolaridade: (dependente.pessoa.escolaridade != null ?
                        dependente.pessoa.escolaridade.nome : ''),
                });
                return dependente;
            });
        }
        setEstudos(lista);
    }, [object]);

    return (
        <Box sx={{ height: 250 }}>
            <DNADataGrid
                rows={estudos}
                columns={columns}
            />
        </Box>
    );
}