import { AppBar, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { useParams, useHistory } from 'react-router-dom';
import { emptyDocumentoSaida } from "../../models/DocumentoSaida";
import DocumentoSaidaService from "../../services/DocumentoSaidaService";
import BaseForm from "../../components/CustomForms/BaseForm";
import ListAltIcon from '@material-ui/icons/ListAlt';
import DescriptionIcon from '@material-ui/icons/Description';
import TabPanel, { a11yProps } from "../../components/CustomTabs/TabPanel";
import DocumentoSaidaForm from "./DocumentoSaidaForm";
import ItemDocumentoSaidaForm from "./ItemDocumentoSaidaForm";
import { userContext } from "../../hooks/userContext";
import { getMenuPerfilByUrl } from "../../api/utils/menuUtils";
import { saveModalMessage } from "../../api/utils/modalMessages";

export default function DocumentoSaidaCadastro() {
    let history = useHistory();
    const { id, status } = useParams();
    const usuario = React.useContext(userContext);
    const returnURL = "/documento-saida";
    const perfil = getMenuPerfilByUrl(usuario.perfis, returnURL);
    const enabledFields = status != null && status === 'edit';

    const [tabIndex, setTabIndex] = React.useState(0);

    const [documentoSaida, setDocumentoSaida] = React.useState(emptyDocumentoSaida);

    React.useEffect(() => {
        if (id > 0) {
            DocumentoSaidaService.getDocumentoSaidaById(id)
                .then(r => {
                    setDocumentoSaida(r.data);
                })
                .catch(() => {
                    history.push('/404');
                });
        } else {
            setDocumentoSaida({
                ...emptyDocumentoSaida,
                itens: [],
            });
            return;
        }
    }, [id, history]);

    const handlePost = (event) => {
        saveModalMessage(
            () => DocumentoSaidaService.saveDocumentoSaida(documentoSaida, id),
            () => history.push(returnURL)
        );
    };

    const setItens = (values) => {
        setDocumentoSaida({
            ...documentoSaida,
            itens: values,
        })
    }

    return (
        <BaseForm
            title="Cadastro de Documento de Saida"
            backButton
            onSave={perfil.escrever && status !== 'view' ? handlePost : null}>
            <AppBar position="static" color="default">
                <Tabs
                    value={tabIndex}
                    onChange={(event, newValue) => setTabIndex(newValue)}
                    variant="standard"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="tab para controle do documento">
                    <Tab label="Dados do documento" icon={<DescriptionIcon />} {...a11yProps(0)} />
                    <Tab label="Itens de saída" icon={<ListAltIcon />} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={tabIndex} index={0}>
                <DocumentoSaidaForm
                    value={documentoSaida}
                    disabled={!enabledFields}
                    callback={setDocumentoSaida}
                />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <ItemDocumentoSaidaForm
                    value={documentoSaida}
                    callback={setItens}
                    disabled={!enabledFields}
                />
            </TabPanel>
        </BaseForm>
    );
}