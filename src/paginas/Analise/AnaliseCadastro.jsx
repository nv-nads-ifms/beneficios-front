import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
    AppBar, Tabs, Tab
} from '@material-ui/core';
import { Status } from '../../api/utils/constants';
import ItemAnaliseListagem from './ItemAnalise/ItemAnaliseListagem';
import TabPanel, { a11yProps } from '../../components/CustomTabs/TabPanel';
import AnaliseService from '../../services/AnaliseService';
import BaseForm from '../../components/CustomForms/BaseForm';
import { emptyAtendimento, initAtendimento } from '../../models/Atendimento';
import AnaliseSolicitacaoView from './Views/AnaliseSolicitacaoView';
import AnaliseFormulario from './AnaliseFormulario';
import { emptyAnalise } from '../../models/Analise';
import { emptyUnidadeAtendimento } from '../../models/UnidadeAtendimento';
import { saveModalMessage } from '../../api/utils/modalMessages';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import { userContext } from '../../hooks/userContext';

export default function AnaliseCadastro() {
    let history = useHistory();
    const { id, status } = useParams();
    const usuario = React.useContext(userContext);
    const returnURL = "/analise-atendimento";
    const perfil = getMenuPerfilByUrl(usuario.perfis, returnURL);

    const [atendimento, setAtendimento] = React.useState(emptyAtendimento);
    const [analise, setAnalise] = React.useState(emptyAnalise);
    const [tabIndex, setTabIndex] = React.useState(0);

    React.useEffect(() => {
        if (id > 0) {
            initAtendimento(id, (value) => {
                setAtendimento(value);
                if (value.analise == null) {
                    setAnalise({
                        ...emptyAnalise,
                        itens: [],
                    });
                } else {
                    setAnalise(value.analise);
                }
            });
        } else {
            setAtendimento({
                ...emptyAtendimento,
                analise: {
                    ...emptyAnalise,
                    itens: [],
                }
            });
            setAnalise({
                ...emptyAnalise,
                itens: [],
            });
        }
    }, [id]);

    const handlePost = (event) => {
        saveModalMessage(
            () => AnaliseService.saveAnalise(analise, atendimento),
            () => history.push(returnURL)
        );
    }

    const onChange = (event, newValue) => {
        let t = event.target;
        let valor = newValue != null ? newValue : t.value;
        const fieldname = t.name;

        if (t.type === "checkbox") {
            valor = t.checked;
        } else if (t.type === "file") {
            let file = t.files[0];
            valor = {
                id: '',
                fileName: file.name,
                documentType: file.type,
                documentFormt: file.type,
                file: file,
            };
        }

        if (t.name === 'autorizacao') {
            valor = t.checked ? Status.AUTORIZADO : Status.NEGADO;
        }

        setAnalise({
            ...analise,
            [fieldname]: valor,
        })

        setAtendimento({
            ...atendimento,
            analise: analise,
        });
    }

    const setItens = (value) => {
        setAnalise({
            ...analise,
            itens: value,
        })
        setAtendimento({
            ...atendimento,
            analise: {
                ...analise,
                itens: value,
            },
        });
    }

    const disableComponents = perfil.escrever && status === 'view' &&
        [Status.AUTORIZADO, Status.NEGADO].includes(atendimento.status);

    return (
        <BaseForm
            title="Registro de Análise da Solicitação de Atendimento"
            backButton
            onSave={!disableComponents ? handlePost : null}
            disabled={disableComponents}
        >
            <AppBar position="static" color="default">
                <Tabs
                    value={tabIndex}
                    onChange={(event, newValue) => setTabIndex(newValue)}
                    variant="standard"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="tab para controle de perfis">
                    <Tab label="Dados da Solicitação" {...a11yProps(0)} />
                    <Tab label="Registro da Análise" {...a11yProps(1)} />
                    <Tab label="Lançamento dos Benefícos" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={tabIndex} index={0}>
                <AnaliseSolicitacaoView
                    atendimento={atendimento}
                    callback={setAtendimento} />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <AnaliseFormulario
                    value={analise}
                    onChange={onChange}
                    disabled={disableComponents}
                />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                <ItemAnaliseListagem
                    value={atendimento.analise}
                    unidadeAtendimento={atendimento.prontuario != null ? atendimento.prontuario.unidadeAtendimento : emptyUnidadeAtendimento}
                    callback={setItens}
                    disabled={disableComponents} />
            </TabPanel>
        </BaseForm>
    );
}