import React from 'react';
import { AppBar, List, ListItem, ListItemText, Tab, Tabs, Typography } from '@material-ui/core';
import { emptyMessageAlert, sendMessageAlert } from '../../api/utils/customMessages';
import DialogForms from '../../components/CustomForms/DialogForms';
import useErros from '../../hooks/useErros';
import { validarCampo } from '../../models/validaCampos';
import DocumentoSaidaService from '../../services/DocumentoSaidaService';
import { emptyDocumentoSaida, emptyItemDocumentoSaida } from '../../models/DocumentoSaida';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import { Message } from '../../api/utils/constants';
import CustomInteger from '../../components/CustomFields/CustomInteger';
import DescriptionIcon from '@material-ui/icons/Description';
import HistoryIcon from '@material-ui/icons/History';
import TabPanel, { a11yProps } from '../../components/CustomTabs/TabPanel';
import MovimentacaoSaidaListagem from './MovimentacaoSaidaListagem';

const emptyErros = {
    quantidade: validarCampo,
};

export default function DocumentoSaidaConferenciaForm(props) {
    const { documentoSaidaId, itemNumero, openModal, onClose, callback, enabled } = props;
    const [messageAlert, setMessageAlert] = React.useState(emptyMessageAlert);
    const [itemSaida, setItemSaida] = React.useState(emptyItemDocumentoSaida);
    const [documentoSaida, setDocumentoSaida] = React.useState(emptyDocumentoSaida);
    const [quantidade, setQuantidade] = React.useState(0);
    const [tabIndex, setTabIndex] = React.useState(0);

    const [erros, validarCampos] = useErros(emptyErros);

    const sendMessage = (type, message) => {
        sendMessageAlert(type, message, setMessageAlert);
    }

    React.useEffect(() => {
        if (documentoSaidaId > 0 && itemNumero > 0) {
            DocumentoSaidaService.getItemSaidaById(documentoSaidaId, itemNumero)
                .then(r => r.data)
                .then(data => {
                    setItemSaida(data);
                    setDocumentoSaida(data.documentoSaida);
                    setQuantidade(data.quantidadePendente);
                });
        } else {
            setItemSaida(emptyItemDocumentoSaida);
            setDocumentoSaida(emptyDocumentoSaida);
            setQuantidade(0);
        }
    }, [documentoSaidaId, itemNumero]);

    const handleClose = () => {
        setQuantidade(0);
        onClose();
    }

    const handlePost = (event) => {
        DocumentoSaidaService.saveMovimentoItemSaida({
            itemSaida: itemSaida,
            quantidade: quantidade,
        })
            .then(r => {
                const data = r.data;
                if ('status' in data && data.status === 400) {
                    sendMessage(Message.WARNING, data.message);
                } else if (Array.isArray(data)) {
                    validarCampos(data);
                    sendMessage(Message.WARNING, "Alguns campos não foram informados!");
                } else {
                    callback(data);
                    handleClose();
                }
            });
    }
    
    return (
        <DialogForms
            title="Registro de Saida do Benefício"
            open={openModal}
            maxWidth="md"
            onClose={handleClose}
            onSave={handlePost}
            messageAlert={messageAlert}
        >
            <AppBar position="static" color="default">
                <Tabs
                    value={tabIndex}
                    onChange={(event, newValue) => setTabIndex(newValue)}
                    variant="standard"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="tab para controle do prontuário">
                    <Tab label="Registro" icon={<DescriptionIcon />} {...a11yProps(0)} />
                    <Tab label="Histórico de Movimentações" icon={<HistoryIcon />} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={tabIndex} index={0}>
                <List>
                    <ListItem>
                        <ListItemText
                            primary={<Typography variant="body1" >{documentoSaida.unidadeAtendimento != null ?
                                documentoSaida.unidadeAtendimento.nome + "-" +
                                documentoSaida.unidadeAtendimento.numeroDaUnidade : ''}</Typography>}
                            secondary={<Typography variant="caption" color="textSecondary">Origem</Typography>}
                        />
                        <ListItemText
                            primary={<Typography variant="body1" >{itemSaida.unidadeAtendimento != null ?
                                itemSaida.unidadeAtendimento.nome + "-" +
                                itemSaida.unidadeAtendimento.numeroDaUnidade : ''}</Typography>}
                            secondary={<Typography variant="caption" color="textSecondary">Destino</Typography>}
                        />
                        <ListItemText
                            primary={<Typography variant="body1" >{itemSaida.status}</Typography>}
                            secondary={<Typography variant="caption" color="textSecondary">Status</Typography>}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={<Typography variant="body1" >{itemSaida.beneficioEventual != null ? itemSaida.beneficioEventual.descricao : ''}</Typography>}
                            secondary={<Typography variant="caption" color="textSecondary">Benefício a ser conferido</Typography>}
                        />
                        <ListItemText
                            primary={<Typography variant="body1" >{itemSaida.quantidade}</Typography>}
                            secondary={<Typography variant="caption" color="textSecondary">Qtd. solicitada</Typography>}
                        />
                        <ListItemText
                            primary={<Typography variant="body1" color="primary" style={{ fontWeight: 600 }}>{itemSaida.quantidadeConferida}</Typography>}
                            secondary={<Typography variant="caption" color="textSecondary">Qtd. recebida</Typography>}
                        />
                        <ListItemText
                            primary={<Typography variant="body1" color="secondary" style={{ fontWeight: 600 }}>{itemSaida.quantidadePendente}</Typography>}
                            secondary={<Typography variant="caption" color="textSecondary">Saldo restante</Typography>}
                        />
                    </ListItem>
                    <ListItem>
                        <CustomTextField
                            id="quantidade"
                            label="Informe a quantidade a enviar"
                            value={quantidade}
                            error={erros.quantidade}
                            disabled={!enabled}
                            InputProps={{
                                inputComponent: CustomInteger,
                            }}
                            onChangeHandler={(e) => setQuantidade(e.target.value)} />
                    </ListItem>
                </List>
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <MovimentacaoSaidaListagem
                    documentoSaidaId={documentoSaida.id}
                    numero={itemSaida.numero}
                />
            </TabPanel>
        </DialogForms>
    );
}