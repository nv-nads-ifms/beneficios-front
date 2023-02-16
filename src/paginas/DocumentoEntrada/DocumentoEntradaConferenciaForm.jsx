import React from 'react';
import { AppBar, List, ListItem, ListItemText, Tab, Tabs, Typography } from '@material-ui/core';
import { emptyMessageAlert, sendMessageAlert } from '../../api/utils/customMessages';
import DialogForms from '../../components/CustomForms/DialogForms';
import useErros from '../../hooks/useErros';
import { validarCampo } from '../../models/validaCampos';
import DocumentoEntradaService from '../../services/DocumentoEntradaService';
import { emptyDocumentoEntrada, emptyItemDocumentoEntrada } from '../../models/DocumentoEntrada';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import { Message } from '../../api/utils/constants';
import CustomInteger from '../../components/CustomFields/CustomInteger';
import DescriptionIcon from '@material-ui/icons/Description';
import HistoryIcon from '@material-ui/icons/History';
import TabPanel, { a11yProps } from '../../components/CustomTabs/TabPanel';
import MovimentacaoEntradaListagem from './MovimentacaoEntradaListagem';

const emptyErros = {
    quantidade: validarCampo,
};

export default function DocumentoEntradaConferenciaForm(props) {
    const { documentoEntradaId, itemNumero, openModal, onClose, callback, enabled } = props;
    const [messageAlert, setMessageAlert] = React.useState(emptyMessageAlert);
    const [itemEntrada, setItemEntrada] = React.useState(emptyItemDocumentoEntrada);
    const [documentoEntrada, setDocumentoEntrada] = React.useState(emptyDocumentoEntrada);
    const [quantidade, setQuantidade] = React.useState(0);
    const [tabIndex, setTabIndex] = React.useState(0);

    const [erros, validarCampos] = useErros(emptyErros);

    const sendMessage = (type, message) => {
        sendMessageAlert(type, message, setMessageAlert);
    }

    React.useEffect(() => {
        if (documentoEntradaId > 0 && itemNumero > 0) {
            DocumentoEntradaService.getItemEntradaById(documentoEntradaId, itemNumero)
                .then(r => {
                    const data = r.data;
                    setItemEntrada(data);
                    setDocumentoEntrada(data.documentoEntrada);
                    setQuantidade(data.quantidadePendente);
                });
        } else {
            setItemEntrada(emptyItemDocumentoEntrada);
            setDocumentoEntrada(emptyDocumentoEntrada);
            setQuantidade(0);
        }
    }, [documentoEntradaId, itemNumero]);

    const handlePost = (event) => {
        DocumentoEntradaService.saveMovimentoItemEntrada({
            itemEntrada: itemEntrada,
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
                    onClose();
                }
            });
    }
    
    return (
        <DialogForms
            title="Registro de Entrada do Benefício"
            open={openModal}
            maxWidth="md"
            onClose={onClose}
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
                    {documentoEntrada.doacao === false ? (
                        <ListItem>
                            <ListItemText
                                primary={<Typography variant="body1" >{documentoEntrada.processo}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº do Processo</Typography>}
                            />
                            <ListItemText
                                primary={<Typography variant="body1" >{documentoEntrada.ata}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº da Ata</Typography>}
                            />
                            <ListItemText
                                primary={<Typography variant="body1" >{documentoEntrada.pregao}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº do Pregão</Typography>}
                            />
                            <ListItemText
                                primary={<Typography variant="body1" >{documentoEntrada.empenhoContabil}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº do Empenho Contábil</Typography>}
                            />
                            <ListItemText
                                primary={<Typography variant="body1" >{documentoEntrada.contrato}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº do Contrato</Typography>}
                            />
                            <ListItemText
                                primary={<Typography variant="body1" >{documentoEntrada.numeroNotaFiscal}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº da Nota Fiscal</Typography>}
                            />
                        </ListItem>
                    ) : (
                        <ListItem>
                            <ListItemText
                                primary={<Typography variant="body1" >Item de Doação</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Doação</Typography>}
                            />
                        </ListItem>
                    )}

                    <ListItem>
                        <ListItemText
                            primary={<Typography variant="body1" >{documentoEntrada.unidadeAtendimento != null ?
                                documentoEntrada.unidadeAtendimento.nome + "-" +
                                documentoEntrada.unidadeAtendimento.numeroDaUnidade : ''}</Typography>}
                            secondary={<Typography variant="caption" color="textSecondary">Unidade de Atendimento</Typography>}
                        />
                        <ListItemText
                            primary={<Typography variant="body1" >{documentoEntrada.fornecedor != null ? documentoEntrada.fornecedor.nome : ''}</Typography>}
                            secondary={<Typography variant="caption" color="textSecondary">Fornecedor</Typography>}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={<Typography variant="body1" >{itemEntrada.beneficioEventual != null ? itemEntrada.beneficioEventual.descricao : ''}</Typography>}
                            secondary={<Typography variant="caption" color="textSecondary">Benefício a ser conferido</Typography>}
                        />
                        <ListItemText
                            primary={<Typography variant="body1" >{itemEntrada.quantidade}</Typography>}
                            secondary={<Typography variant="caption" color="textSecondary">Qtd. solicitada</Typography>}
                        />
                        <ListItemText
                            primary={<Typography variant="body1" color="primary" style={{ fontWeight: 600 }}>{itemEntrada.quantidadeConferida}</Typography>}
                            secondary={<Typography variant="caption" color="textSecondary">Qtd. recebida</Typography>}
                        />
                        <ListItemText
                            primary={<Typography variant="body1" color="secondary" style={{ fontWeight: 600 }}>{itemEntrada.quantidadePendente}</Typography>}
                            secondary={<Typography variant="caption" color="textSecondary">Saldo restante</Typography>}
                        />
                    </ListItem>
                    <ListItem>
                        <CustomTextField
                            id="quantidade"
                            label="Informe a quantidade a receber"
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
                <MovimentacaoEntradaListagem
                    documentoEntradaId={documentoEntrada.id}
                    numero={itemEntrada.numero}
                />
            </TabPanel>
        </DialogForms>
    );
}