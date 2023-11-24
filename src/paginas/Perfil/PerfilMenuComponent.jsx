import React from 'react';

import {
    Box,
    Card, CardHeader, Checkbox, Divider, Grid, List, ListItem, ListItemIcon,
    ListItemText, makeStyles, Typography
} from '@material-ui/core';
import ArrowForwardButton from '../../components/CustomButtons/ArrowForwardButton';
import ArrowBackButton from '../../components/CustomButtons/ArrowBackButton';
import PerfilSwitchPermissionComponent from './PerfilSwitchPermissionComponent';
import DNADataGrid from '../../components/V1.0.0/DNADataGrid';
import { useGridApiRef } from '@mui/x-data-grid';
import { intersection, not, union } from '../../api/utils/util';

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: 320,
        height: 350,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    paper: {
        width: "100%",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
}));

function getColumns(changeStatusFunction) {
    return [
        {
            field: 'nome',
            headerName: 'Nome',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'ler',
            headerName: 'Ler',
            width: 100,
            renderCell: (params) => (
                <PerfilSwitchPermissionComponent
                    onChangeStatus={changeStatusFunction}
                    checked={params.row.ler}
                    rowId={params.row.id}
                    name="ler" />
            )
        },
        {
            field: 'escrever',
            headerName: 'Escrever',
            width: 100,
            renderCell: (params) => (
                <PerfilSwitchPermissionComponent
                    onChangeStatus={changeStatusFunction}
                    checked={params.row.escrever}
                    rowId={params.row.id}
                    name="escrever" />
            )
        },
        {
            field: 'remover',
            headerName: 'Remover',
            width: 100,
            renderCell: (params) => (
                <PerfilSwitchPermissionComponent
                    onChangeStatus={changeStatusFunction}
                    checked={params.row.remover}
                    rowId={params.row.id}
                    name="remover" />
            )
        },
    ];
}

function toMenu(perfilMenu) {
    return {
        id: perfilMenu.id,
        nome: perfilMenu.nome,
        remotePath: perfilMenu.remotePath,
        tipo: perfilMenu.tipo,
        disponivel: true,
    };
}

function toPerfilMenu(menu) {
    return {
        ler: true,
        escrever: true,
        remover: true,
        id: menu.id,
        nome: menu.nome,
        remotePath: menu.remotePath,
        tipo: menu.tipo,
    };
}

export default function PerfilMenuComponent(props) {
    const { rows, setRows, menus } = props;
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [menuItens, setMenuItens] = React.useState([]);

    const apiRef = useGridApiRef();

    React.useEffect(() => {
        if (Array.isArray(menus) && Array.isArray(rows)) {
            setMenuItens(not(menus, rows));
        }
    }, [menus, rows]);

    const leftChecked = intersection(checked, menuItens);
    const rightChecked = intersection(checked, rows);

    const changeStatusFunction = (event, rowId) => {
        let data = [...rows];
        let t = event.target;
        let pm = data.find(row => row.id === rowId);
        pm[t.name] = t.checked;

        setRows(data);
    };

    const handleToggle = React.useCallback((value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    }, [checked]);

    const numberOfChecked = React.useCallback((items) => intersection(checked, items).length, [checked]);

    const handleToggleAll = React.useCallback((items) => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    }, [checked, numberOfChecked]);

    React.useEffect(() => {
        const handleRowClick = (
            params,  // GridRowSelectionCheckboxParams
            event,   // MuiEvent<React.ChangeEvent<HTMLElement>>
            details, // GridCallbackDetails
        ) => {
            const item = rows.find(r => r.id === params.id);
            handleToggle(item);
        }

        // The `subscribeEvent` method will automatically unsubscribe in the cleanup function of the `useEffect`.
        return apiRef.current.subscribeEvent('rowSelectionCheckboxChange', handleRowClick);
    }, [apiRef, rows, handleToggle]);

    React.useEffect(() => {
        const handleRowClick = (
            params,  // GridRowSelectionCheckboxParams
            event,   // MuiEvent<React.ChangeEvent<HTMLElement>>
            details, // GridCallbackDetails
        ) => {
            handleToggleAll(rows);
        }

        // The `subscribeEvent` method will automatically unsubscribe in the cleanup function of the `useEffect`.
        return apiRef.current.subscribeEvent('headerSelectionCheckboxChange', handleRowClick);
    }, [apiRef, rows, handleToggleAll]);

    const handleCheckedRight = () => {
        let leftMenus = leftChecked.map(menu => toPerfilMenu(menu));

        setRows(rows.concat(leftMenus));
        setMenuItens(not(menuItens, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        let rightRows = rightChecked.map(row => toMenu(row));
        setMenuItens(menuItens.concat(rightRows));
        setRows(not(rows, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    function CheckComponent(props) {
        const { items } = props;
        return (
            <Checkbox
                onClick={() => handleToggleAll(items)}
                checked={numberOfChecked(items) === items.length && items.length !== 0}
                indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                disabled={items.length === 0}
                inputProps={{ 'aria-label': 'todos os itens selecionados' }}
            />
        );
    }
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} container direction='row' justifyContent='center'>
                <Typography variant='h6'>
                    Menus do Perfil
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardHeader
                        className={classes.cardHeader}
                        avatar={<CheckComponent items={menuItens} />}
                        title="Opções de Menus"
                        subheader={`${numberOfChecked(menuItens)}/${menuItens.length} selecionados`}
                    />
                    <Divider />
                    <List className={classes.list} dense component="div" role="list">
                        {menuItens.map((value) => {
                            const labelId = `transfer-list-all-item-${value.id}-label`;

                            return (
                                <ListItem key={value.id} role="listitem" button onClick={() => handleToggle(value)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={checked.indexOf(value) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value.nome} />
                                </ListItem>
                            );
                        })}
                        <ListItem />
                    </List>
                </Card>
            </Grid>
            <Grid item xs={12} md={1} container direction='row' alignContent='center'>
                <Grid container direction="column" alignItems="center">
                    <ArrowForwardButton type="button" onClickEvent={handleCheckedRight} />
                    <ArrowBackButton type="button" onClickEvent={handleCheckedLeft} />
                </Grid>
            </Grid>
            <Grid item xs={12} md={7}>
                <Box sx={{ height: 410 }}>
                    <DNADataGrid
                        rows={rows}
                        columns={getColumns(changeStatusFunction)}
                        checkboxSelection
                        apiRef={apiRef}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}
