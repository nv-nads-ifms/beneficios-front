import React from "react";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import { useParams, useHistory } from 'react-router-dom';
import { emptyDocumentoEntrada } from "../../models/DocumentoEntrada";
import DocumentoEntradaService from "../../services/DocumentoEntradaService";
import BaseForm from "../../components/CustomForms/BaseForm";
import ListAltIcon from '@material-ui/icons/ListAlt';
import DescriptionIcon from '@material-ui/icons/Description';
import TabPanel, { a11yProps } from "../../components/CustomTabs/TabPanel";
import DocumentoEntradaForm from "./DocumentoEntradaForm";
import ItemDocumentoEntradaForm from "./ItemDocumentoEntradaForm";
import { userContext } from "../../hooks/userContext";
import { getMenuPerfilByUrl } from "../../api/utils/menuUtils";
import { saveModalMessage } from "../../api/utils/modalMessages";

export default function DocumentoEntradaCadastro() {
    let history = useHistory();
    const { id, status } = useParams();
    const usuario = React.useContext(userContext);
    const returnURL = "/documento-entrada";
    const perfil = getMenuPerfilByUrl(usuario.perfis, returnURL);
    const enabledFields = status != null && status === 'edit';

    const [tabIndex, setTabIndex] = React.useState(0);

    const [documentoEntrada, setDocumentoEntrada] = React.useState(emptyDocumentoEntrada);

    React.useEffect(() => {
        if (id > 0) {
            DocumentoEntradaService.getDocumentoEntradaById(id)
                .then(r => {
                    setDocumentoEntrada(r.data);
                })
                .catch(() => {
                    history.push('/404');
                });
        } else {
            setDocumentoEntrada({
                ...emptyDocumentoEntrada,
                itens: [],
            });
            return;
        }
    }, [id, history]);

    const handlePost = (event) => {
        saveModalMessage(
            () => DocumentoEntradaService.saveDocumentoEntrada(documentoEntrada, id),
            () => history.push(returnURL)
        );
    };

    const setItens = (values) => {
        setDocumentoEntrada({
            ...documentoEntrada,
            itens: values,
        })
    }

    return (
        <BaseForm
            title="Cadastro de Documento de Entrada"
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
                    <Tab label="Itens de entrada" icon={<ListAltIcon />} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={tabIndex} index={0}>
                <DocumentoEntradaForm
                    value={documentoEntrada}
                    disabled={!enabledFields}
                    callback={setDocumentoEntrada}
                />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <ItemDocumentoEntradaForm
                    disabled={!enabledFields}
                    value={documentoEntrada}
                    callback={setItens}
                />
            </TabPanel>
        </BaseForm>
    );
}