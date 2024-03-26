import React from 'react';
import Moment from 'moment';

import { objectContext } from '../../contexts/objectContext';

import { AppBar, Box, Grid, List, ListItem, ListItemText, Tab, Tabs, Typography } from '@mui/material';
import { emptyDocumentoEntrada, emptyItemDocumentoEntrada } from '../../models/DocumentoEntrada';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import { DNAStatus } from '../../api/utils/constants';
import CustomInteger from '../../components/CustomFields/CustomInteger';
import DescriptionIcon from '@material-ui/icons/Description';
import HistoryIcon from '@material-ui/icons/History';
import TabPanel, { a11yProps } from '../../components/CustomTabs/TabPanel';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import DNADataGrid from '../../components/V1.0.0/DNADataGrid';
import UploadButton from '../../components/CustomButtons/UploadButton';
import { saveModalMessage, showErrorMessages } from '../../api/utils/modalMessages';
import DataService from '../../api/services/DataServices';

const columns = [
    {
        field: 'numero',
        headerName: 'Número',
        width: 80
    },
    {
        field: 'unidadeAtendimento',
        headerName: 'Unidade de atendimento',
        width: 180,
        valueGetter: ({ value }) => value.numeroDaUnidade,
    },
    {
        field: 'funcionario',
        headerName: 'Funcionário',
        minWidth: 100,
        flex: 1,
        valueGetter: ({ value }) => value.nome
    },
    {
        field: 'quantidade',
        headerName: 'Quantidade',
        width: 100,
    },
    {
        field: 'emissao',
        headerName: 'Emissão',
        width: 150,
        renderCell: ({ value }) => {
            return (
                Moment(value).format('DD/MM/Y H:mm:ss')
            );
        }
    }
];

export default function DocumentoEntradaConferenciaForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;

    const [tabIndex, setTabIndex] = React.useState(0);
    const [itemEntrada, setItemEntrada] = React.useState(emptyItemDocumentoEntrada);

    const [documentoEntrada, setDocumentoEntrada] = React.useState(emptyDocumentoEntrada);
    const [quantidade, setQuantidade] = React.useState(0);

    const disableFields = React.useMemo(() => {
        return datacontrol === DNAStatus.VIEW;
    }, [datacontrol]);

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    React.useEffect(() => {
        if (itemEntrada != null) {
            setDocumentoEntrada(itemEntrada.documentoEntrada);
            setQuantidade(datacontrol === DNAStatus.VIEW ? 0 : itemEntrada.quantidadePendente);
        } else {
            setDocumentoEntrada(emptyDocumentoEntrada);
            setQuantidade(0);
        }
    }, [itemEntrada, datacontrol]);

    const handlePost = () => {
        if (quantidade <= 0) {
            showErrorMessages([{ campo: "quantidade", erro: "Você deve informar um valor válido para a QUANTIDADE." }])
        } else {
            const dataService = new DataService(`/${data_source_url}/movimento`);
            const movimento = {
                itemEntrada: itemEntrada,
                quantidade: quantidade
            };
            saveModalMessage(
                () => dataService.save(0, movimento),
                () => on_close_func());
        }
    }

    return (
        <objectContext.Provider value={{
            object: itemEntrada,
            setObject: setItemEntrada,
            emptyObject: emptyItemDocumentoEntrada
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Registro de Entrada do Benefício"}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}
                fullWidth
                maxWidth={"lg"}
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
                                primary={<Typography variant="body1" >{itemEntrada.beneficioEventual != null ? itemEntrada.beneficioEventual.nome : ''}</Typography>}
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
                    </List>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <CustomTextField
                                id="quantidade"
                                label="Informe a quantidade a receber"
                                value={quantidade}
                                disabled={disableFields}
                                InputProps={{
                                    inputComponent: CustomInteger,
                                }}
                                onChangeHandler={(e) => setQuantidade(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} container direction={'row'} justifyContent={'flex-end'}>
                            {datacontrol === DNAStatus.EDIT && (
                                <UploadButton
                                    caption="Registrar conferência"
                                    onClick={handlePost}

                                    disabled={disableFields}
                                />
                            )}
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <Box sx={{ height: 250 }}>
                        <DNADataGrid
                            rows={itemEntrada.movimentos}
                            columns={columns}
                        />
                    </Box>
                </TabPanel>
            </DNAFormDialog>
        </objectContext.Provider>
    );
}