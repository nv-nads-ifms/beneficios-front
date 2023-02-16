import React from "react";
import Moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import { userContext } from "../../hooks/userContext";
import ProntuarioService from '../../services/ProntuarioService';
import BaseForm from "../../components/CustomForms/BaseForm";
import ProntuarioFormGeralComponent from "./Components/ProntuarioFormGeralComponent";
import ProntuarioFamiliaListagemComponent from "./ComposicaoFamiliar/ProntuarioFamiliaListagemComponent";
import ProntuarioRendimentoListagemComponent from "./SituacaoEconomica/ProntuarioRendimentoListagemComponent";
import ProntuarioEducacaoListagemComponent from "./SituacaoEducacional/ProntuarioEducacaoListagemComponent";
import { Typography, Grid, AppBar, Tabs, Tab } from "@material-ui/core";
import TabPanel, { a11yProps } from "../../components/CustomTabs/TabPanel";
import GroupIcon from '@material-ui/icons/Group';
import DescriptionIcon from '@material-ui/icons/Description';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SchoolIcon from '@material-ui/icons/School';
import HistoryIcon from '@material-ui/icons/History';
import { emptyProntuario } from "../../models/Prontuario";
import ChipStatus from "../../components/CustomButtons/ChipStatus";
import { Status } from '../../api/utils/constants';
import ProntuarioHistoricoListagemComponent from "./Historico/ProntuarioHistoricoListagemComponent";
import { getMenuPerfilByUrl } from "../../api/utils/menuUtils";
import { saveModalMessage } from "../../api/utils/modalMessages";

export default function ProntuarioCadastro() {
    let history = useHistory();
    const { id, status } = useParams();
    const usuario = React.useContext(userContext);
    const returnURL = "/prontuarios";
    const perfil = getMenuPerfilByUrl(usuario.perfis, returnURL);
    const enabledFields = status != null && status === 'edit';

    const [tabIndex, setTabIndex] = React.useState(0);
    const [prontuario, setProntuario] = React.useState(emptyProntuario);
    const [unidadeAtendimento, setUnidadeAtendimento] = React.useState(usuario.funcionario.unidadeAtendimento);

    React.useEffect(() => {
        if (id > 0) {
            ProntuarioService.getProntuarioById(id)
                .then(r => {
                    setProntuario(r.data);
                    setUnidadeAtendimento(r.data.unidadeAtendimento);
                })
                .catch(() => {
                    history.push('/404');
                });
        } else {
            setProntuario({
                ...emptyProntuario,
                id: id,
                unidadeAtendimento: usuario.funcionario.unidadeAtendimento,
                dependentes: [],
            });

            setUnidadeAtendimento(usuario.funcionario.unidadeAtendimento);
        }
    }, [id, history, usuario]);

    const setFieldValue = (fieldname, value) => {
        setProntuario({
            ...prontuario,
            [fieldname]: value
        });
    }

    const onChange = (event, newValue) => {
        let t = event.target;
        let value = newValue != null ? newValue : t.value;
        const fieldname = t.id.split('-')[0];

        if (t.name === 'status') {
            value = t.checked ? Status.ATIVO : Status.INATIVO;
        }
        setFieldValue(fieldname, value);
    }

    const handlePost = (event) => {
        saveModalMessage(
            () => ProntuarioService.saveProntuario(id, prontuario),
            () => history.push(returnURL)
        );
    }

    return (
        <BaseForm 
            title="Cadastro de Prontuário"
            backButton
            onSave={perfil.escrever && status !== 'view' ? handlePost : null}>
            <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                <Grid item>
                    <Typography gutterBottom variant="subtitle1" color="textPrimary" align="center">
                        Prontuário N.o {prontuario.id}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography gutterBottom variant="subtitle2" color="textSecondary">
                        {unidadeAtendimento.numeroDaUnidade} - {unidadeAtendimento.nome}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography gutterBottom variant="body2" color="textSecondary" align="center">
                        Data de emissão: {Moment(prontuario.emissao).format('DD/MM/Y hh:mm:ss a')}
                    </Typography>
                </Grid>
                <Grid item >
                    <ChipStatus status={prontuario.status} />
                </Grid>
            </Grid>
            <AppBar position="static" color="default">
                <Tabs
                    value={tabIndex}
                    onChange={(event, newValue) => setTabIndex(newValue)}
                    variant="standard"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="tab para controle do prontuário">
                    <Tab label="Geral" icon={<DescriptionIcon />} {...a11yProps(0)} />
                    <Tab label="Composição Familiar" icon={<GroupIcon />} {...a11yProps(1)} />
                    <Tab label="Situação Econômica" icon={<AttachMoneyIcon />} {...a11yProps(2)} />
                    <Tab label="Situação Educacional" icon={<SchoolIcon />} {...a11yProps(3)} />
                    <Tab label="Histórico" icon={<HistoryIcon />} {...a11yProps(4)} />
                </Tabs>
            </AppBar>
            <TabPanel value={tabIndex} index={0}>
                <ProntuarioFormGeralComponent
                    disabled={!enabledFields}
                    prontuario={prontuario}
                    setProntuario={setProntuario}
                    onChange={onChange} />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <ProntuarioFamiliaListagemComponent
                    disabled={!enabledFields}
                    dependentes={prontuario.dependentes}
                    callback={(value) => setFieldValue("dependentes", value)}
                    prontuario={prontuario}
                    setProntuario={setProntuario} />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                <ProntuarioRendimentoListagemComponent
                    prontuario={prontuario} />
            </TabPanel>
            <TabPanel value={tabIndex} index={3}>
                <ProntuarioEducacaoListagemComponent
                    prontuario={prontuario} />
            </TabPanel>
            <TabPanel value={tabIndex} index={4}>
                <ProntuarioHistoricoListagemComponent
                    prontuario={prontuario} />
            </TabPanel>
        </BaseForm>
    );
};