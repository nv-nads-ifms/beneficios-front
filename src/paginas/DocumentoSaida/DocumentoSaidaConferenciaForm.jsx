import React from 'react';
import Moment from 'moment';

import { objectContext } from '../../contexts/objectContext';
import { AppBar, Box, Grid, List, ListItem, ListItemText, Tab, Tabs, Typography } from '@mui/material';
import { emptyDocumentoSaida, emptyItemDocumentoSaida } from '../../models/DocumentoSaida';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import { DNAStatus } from '../../api/utils/constants';
import CustomInteger from '../../components/CustomFields/CustomInteger';
import DescriptionIcon from '@material-ui/icons/Description';
import HistoryIcon from '@material-ui/icons/History';
import TabPanel, { a11yProps } from '../../components/CustomTabs/TabPanel';
import { saveModalMessage, showErrorMessages } from '../../api/utils/modalMessages';
import DataService from '../../api/services/DataServices';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import UploadButton from '../../components/CustomButtons/UploadButton';
import DNADataGrid from '../../components/V1.0.0/DNADataGrid';

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
        headerName: 'Responsável',
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
        renderCell: (params) => {
            const { value } = params;
            return (
                Moment(value).format('DD/MM/Y H:mm:ss')
            );
        }
    }
];

export default function DocumentoSaidaConferenciaForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;

    const [tabIndex, setTabIndex] = React.useState(0);
    const [itemSaida, setItemSaida] = React.useState(emptyItemDocumentoSaida);

    const [documentoSaida, setDocumentoSaida] = React.useState(emptyDocumentoSaida);
    const [quantidade, setQuantidade] = React.useState(0);

    const disableFields = React.useMemo(() => {
        return datacontrol === DNAStatus.VIEW;
    }, [datacontrol]);

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    React.useEffect(() => {
        if (itemSaida != null) {
            setDocumentoSaida(itemSaida.documentoSaida);
            setQuantidade(datacontrol === DNAStatus.VIEW ? 0 : itemSaida.quantidadePendente);
        } else {
            setDocumentoSaida(emptyDocumentoSaida);
            setQuantidade(0);
        }
    }, [itemSaida, datacontrol]);

    const handlePost = () => {
        if (quantidade <= 0) {
            showErrorMessages([{ campo: "quantidade", erro: "Você deve informar um valor válido para a QUANTIDADE." }])
        } else {
            const dataService = new DataService(`/${data_source_url}/movimento`);
            const movimento = {
                itemSaida: itemSaida,
                quantidade: quantidade
            };
            saveModalMessage(
                () => dataService.save(0, movimento),
                () => on_close_func());
        }
    }

    return (
        <objectContext.Provider value={{
            object: itemSaida,
            setObject: setItemSaida,
            emptyObject: emptyItemDocumentoSaida
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Registro de Saída do Benefício"}
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
                        aria-label="tab para controle do documento de saída">
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
                                primary={<Typography variant="body1" >{itemSaida.beneficioEventual != null ? itemSaida.beneficioEventual.nome : ''}</Typography>}
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
                            getRowId={(row) => row.numero}
                            rows={itemSaida.movimentos}
                            columns={columns}
                        />
                    </Box>
                </TabPanel>
            </DNAFormDialog>
        </objectContext.Provider>
    );
}