import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FormControlLabel, Grid, Paper, Switch, Typography } from '@material-ui/core';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import BaseForm from '../../components/CustomForms/BaseForm';
import BeneficioService from "../../services/BeneficioService";
import SimpleTable from '../../components/CustomTable/SimpleTable';
import BeneficioEstoqueTableRow from './BeneficioEstoqueTableRow';
import { userContext } from '../../hooks/userContext';
import { emptyUnidadeAtendimento } from '../../models/UnidadeAtendimento';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import { saveModalMessage } from '../../api/utils/modalMessages';

const columnsNames = [
    { id: 'unidadeAtendimento', label: 'Unidade de Atendimento' },
    { id: 'quantidade', label: 'Quantidade disponível' },
];

const emptyBeneficio = {
    descricao: '',
    outraConcessao: false,
    estoque: [],
}

export default function BeneficioCadastro() {
    const { id, status } = useParams();
    const usuario = useContext(userContext);
    const returnURL = "/beneficios-eventuais";
    const perfil = getMenuPerfilByUrl(usuario.perfis, returnURL);
    const enabledFields = status != null && status === 'edit';

    const [unidadeAtendimento, setUnidadeAtendimento] = React.useState(emptyUnidadeAtendimento);
    
    let history = useHistory();
    const [beneficio, setBeneficio] = React.useState(emptyBeneficio);

    React.useEffect(() => {
        if (usuario != null) {
            setUnidadeAtendimento(usuario.funcionario.unidadeAtendimento);
        } else {
            setUnidadeAtendimento(emptyUnidadeAtendimento);
        }
    }, [usuario]);

    React.useEffect(() => {
        if (id > 0) {
            BeneficioService.getBeneficiosById(id)
                .then(r => {
                    const data = r.data;
                    setBeneficio(data);
                })
                .catch(() => {
                    history.push('/404');
                });
        } else {
            setBeneficio(emptyBeneficio);
        }
    }, [id, unidadeAtendimento.id, unidadeAtendimento.matriz, history]);

    const onChange = (event) => {
        const t = event.target;
        const fieldname = t.id.split('-')[0];
        let value = t.value;
        if (t.type === "checkbox") {
            value = t.checked;
        }

        setFieldValue(fieldname, value);
    }

    const setFieldValue = (fieldname, value) => {
        setBeneficio({
            ...beneficio,
            [fieldname]: value,
        });
    }

    const handlePost = (event) => {
        saveModalMessage(
            () => BeneficioService.saveBeneficio(id, beneficio),
            () => history.push(returnURL)
        );
    }

    return (
        <BaseForm
            title="Cadastro de Benefício Eventual"
            backButton
            onSave={perfil.escrever && status !== 'view' ? handlePost : null}>
            <Grid container spacing={1} direction="column">
                <Grid item xs={12}>
                    <CustomTextField
                        id="descricao"
                        label="Descrição"
                        value={beneficio.descricao}
                        placeholder="Digite a descrição do Benefício Eventual"
                        autoFocus={true}
                        onChangeHandler={onChange}
                        disabled={!enabledFields}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={beneficio.outraConcessao}
                                onChange={onChange}
                                name="outraConcessao"
                                id="outraConcessao"
                                color="primary"
                                size="medium"
                                disabled={!enabledFields}
                            />
                        }
                        label={"Benefício referente a outro tipo de concessão"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Paper square={true} variant="outlined">
                        <Typography variant="h6" align="center">
                            Estoque atual
                        </Typography>
                        <SimpleTable
                            data={beneficio.estoque}
                            columns={columnsNames}
                            notShowActions
                            emptyRows={beneficio.estoque.length}
                        >
                            {beneficio.estoque.map((row, key) => {
                                return (
                                    <BeneficioEstoqueTableRow
                                        key={"row-key-" + key}
                                        row={row} />
                                );
                            })}
                        </SimpleTable>
                    </Paper>
                </Grid>
            </Grid>
        </BaseForm>
    );
}