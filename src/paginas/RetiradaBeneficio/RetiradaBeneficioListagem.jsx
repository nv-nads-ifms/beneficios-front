import React from 'react';
import { Navigate } from 'react-router-dom';
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, } from '@mui/material';
import CustomTable from '../../components/CustomTable/CustomTable';
import RetiradaBeneficioTableRow from './RetiradaBeneficioTableRow';
import BaseForm from '../../components/CustomForms/BaseForm';
import FieldPessoaComponent from '../Pessoa/FieldPessoaComponent';
import { emptyPessoa } from '../../models/Pessoa';
import { emptyData, Status } from '../../api/utils/constants';
import ItemAnaliseService from '../../services/ItemAnaliseService';
import { userContext } from '../../hooks/userContext';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';

const columnsNames = [
    { id: 'status', label: 'Status' },
    { id: 'origem', label: 'Origem' },
    { id: 'pessoa', label: 'Assistido' },
    { id: 'emissao', label: 'Emissão' },
    { id: 'beneficio', label: 'Benefício Eventual' },
    { id: 'quantidade', label: 'Quantidade' },
];

const getRequestParams = (pessoa, status, page, pageSize) => {
    let params = {};
    if (page) {
        params["page"] = page;
    }
    if (pageSize) {
        params["size"] = pageSize;
    }
    if (pessoa != null && pessoa.id !== undefined) {
        params["pessoaId"] = pessoa.id;
    }
    if (status !== Status.TODOS) {
        params["status"] = status;
    }

    return params;
};

export default function RetiradaBeneficioListagem() {
    const usuario = React.useContext(userContext);
    const perfil = getMenuPerfilByUrl(usuario.perfis, '/retirada-de-beneficio');

    const [pessoa, setPessoa] = React.useState(emptyPessoa);
    const [status, setStatus] = React.useState(Status.TODOS);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [data, setData] = React.useState(emptyData);
    const [dataFetched, setDataFetched] = React.useState(false);

    React.useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(pessoa, status, page, rowsPerPage);
        ItemAnaliseService.getItens(params)
            .then((resp) => {
                setDataFetched(true);
                setData(resp.data);
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            });
    }, [pessoa, status, setRowsPerPage, setPage, page, rowsPerPage]);
    
    const handleAction = (id, itemId, action) => {
        <Navigate to={`/retirada-de-beneficio-ficha/${id}/${itemId}/${action}`} />;
    }

    return (
        <BaseForm title="Registro da retirada de benefício eventual">
            <Grid container spacing={3} direction="row" alignItems="center" alignContent="flex-end" >
                <Grid item xs={12}>
                    <FieldPessoaComponent
                        id="pessoa"
                        name="pessoa"
                        pessoa={pessoa}
                        callback={setPessoa}
                        onlySearch />
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Status do Atendimento</FormLabel>
                        <RadioGroup
                            row
                            defaultValue={Status.TODOS}
                            aria-label="status"
                            name="status"
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}>
                            <FormControlLabel value={Status.TODOS} control={<Radio color="primary" />} label="Todos" />
                            <FormControlLabel value={Status.PENDENTE} control={<Radio color="primary" />} label="Pendente (a retirar)" />
                            <FormControlLabel value={Status.RETIRADO} control={<Radio color="primary" />} label="Retirado" />
                            <FormControlLabel value={Status.CANCELADO} control={<Radio color="primary" />} label="Cancelado" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
            <CustomTable
                data={data}
                columns={columnsNames}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                dataFetched={dataFetched}
            >
                {data.content.map((row, key) => {
                    return (
                        <RetiradaBeneficioTableRow
                            key={"row-" + key}
                            row={row}
                            onView={perfil.ler ? (row) => handleAction(row.id, row.analiseId, 'view') : null} 
                            onEdit={perfil.escrever ? (row) => handleAction(row.id, row.analiseId, 'edit') : null} 
                            />
                    );
                })}
            </CustomTable>
        </BaseForm>
    );
}