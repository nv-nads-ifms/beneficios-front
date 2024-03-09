import React from 'react';
import Moment from 'moment';
import {
    AppBar,
    Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText,
    Paper, Tab, Tabs, Typography
} from '@mui/material';
import { Sexo } from '../../../api/utils/constants';
import { ccyFormat } from '../../../api/format';
import ContactsIcon from '@material-ui/icons/Contacts';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import ListContatoView from './ListContatoView';
import ListDocumentoView from './ListDocumentoView';
import TabPanel, { a11yProps } from '../../../components/V1.0.0/DNATabPanel';

export default function ListPessoaView(props) {
    const { pessoa, parentesco } = props;
    const [geralTabIndex, setGeralTabIndex] = React.useState(0);

    const [rendimentos, setRendimentos] = React.useState([]);
    const [auxilios, setAuxilios] = React.useState([]);
    const [contatos, setContatos] = React.useState([]);
    const [documentos, setDocumentos] = React.useState([]);

    React.useEffect(() => {
        if (pessoa != null) {
            setRendimentos(pessoa.rendimentos);
            setAuxilios(pessoa.auxilios);
            setContatos(pessoa.contatos);
            setDocumentos(pessoa.documentos);
        }
    }, [pessoa]);

    return (
        <Grid container spacing={1} >
            <Grid item lg={6} md={12}>
                <List dense={true}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar
                                alt={pessoa.nome}
                                src={"data:image/png;base64," + pessoa.foto} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography variant="h6">
                                    {pessoa.nome}
                                </Typography>
                            }
                            secondary={
                                <React.Fragment>
                                    <Typography variant="caption" color="textSecondary" component="p">
                                        {pessoa.sexo === Sexo.MASCULINO ? "Nascido" : "Nascida"}
                                        &nbsp; em {Moment(pessoa.nascimento).format('DD/MM/Y')} -
                                        &nbsp; Tem {pessoa.idade} anos.
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <Grid container spacing={2}>
                            {pessoa.escolaridade != null && (
                                <Grid item xs={6}>
                                    <Typography variant="body2">
                                        {pessoa.escolaridade.nome}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        Escolaridade
                                    </Typography>
                                </Grid>
                            )}
                            {parentesco != null && (
                                <Grid item xs={6}>
                                    <Typography variant="body2">
                                        {parentesco.nome}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        Parentesco
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </ListItem>
                    <ListItem>
                        {rendimentos.length > 0 && (
                            <ListItemText
                                primary="Rendimentos"
                                secondary={
                                    rendimentos.map((obj, index) => (
                                        <Grid container spacing={2} key={index}>
                                            <Grid item xs={6}>
                                                <Typography variant="caption" color="textSecondary">
                                                    {obj.condicaoTrabalho.nome}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="caption" color="textSecondary">
                                                    {ccyFormat(obj.valor)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    ))
                                }
                            />
                        )}
                    </ListItem>
                    <ListItem>
                        {auxilios.length > 0 && (
                            <ListItemText
                                primary="Auxílios"
                                secondary={
                                    auxilios.map((obj, index) => (
                                        <Grid container spacing={2} key={index}>
                                            <Grid item xs={6}>
                                                <Typography variant="caption" color="textSecondary">
                                                    {obj.programaGoverno.descricao}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="caption" color="textSecondary">
                                                    {ccyFormat(obj.valor)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    ))
                                }
                            />
                        )}
                    </ListItem>
                </List >
            </Grid>
            <Grid item lg={6} md={12}>
                <AppBar position="static" color="inherit">
                    <Tabs
                        value={geralTabIndex}
                        onChange={(event, newValue) => setGeralTabIndex(newValue)}
                        variant="standard"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="tab para controle de documentos e contatos">
                        <Tab label="Contatos" icon={<ContactsIcon />} {...a11yProps(0)} />
                        <Tab label="Documentos" icon={<RecentActorsIcon />} {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={geralTabIndex} index={0}>
                    <Paper elevation={2} variant="outlined" style={{ padding: '1em' }}>
                        {contatos.length === 0 && (
                            <Typography variant="caption" color="secondary">
                                Sem registro de contatos
                            </Typography>
                        )}
                        <Grid container spacing={2}>
                            {contatos.map((obj, index) => (
                                <Grid item key={index}>
                                    <ListContatoView contatoPessoa={obj} />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </TabPanel>
                <TabPanel value={geralTabIndex} index={1}>
                    {documentos.length === 0 && (
                        <Typography variant="caption" color="secondary">
                            Sem registro de documentos
                        </Typography>
                    )}
                    <Grid container spacing={2} direction="column">
                        {documentos.map((obj, index) => (
                            <Grid item key={index}>
                                <ListDocumentoView documentoPessoa={obj} />
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
            </Grid>
        </Grid>
    );
}