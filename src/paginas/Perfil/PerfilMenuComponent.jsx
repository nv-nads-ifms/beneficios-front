import React from 'react';

import {
    Card, CardHeader, Checkbox, Divider, Grid, List, ListItem, ListItemIcon,
    ListItemText, makeStyles, Paper
} from '@material-ui/core';
import SimpleTable from '../../components/CustomTable/SimpleTable';
import PerfilMenuTableRow from './PerfilMenuTableRow';
import ArrowForwardButton from '../../components/CustomButtons/ArrowForwardButton';
import ArrowBackButton from '../../components/CustomButtons/ArrowBackButton';

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

const columnsNames = [
    { id: 'nome', label: 'Nome' },
    { id: 'ler', label: 'Ler' },
    { id: 'escrever', label: 'Escrever' },
    { id: 'remover', label: 'Remover' },
];

function not(a, b) {
    return a.filter((value) => b.map(obj => obj.id).indexOf(value.id) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.map(obj => obj.id).indexOf(value.id) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
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
    const [menuItens, setMenuItens] = React.useState(not(menus, rows));

    const idColumnName = 'id';

    const leftChecked = intersection(checked, menuItens);
    const rightChecked = intersection(checked, rows);

    const changeStatusFunction = (event, rowId) => {
        let data = [...rows];
        let t = event.target;
        let pm = data.find(row => row.id === rowId);
        pm[t.name] = t.checked;

        setRows(data);
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };
    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

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
                onClick={handleToggleAll(items)}
                checked={numberOfChecked(items) === items.length && items.length !== 0}
                indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                disabled={items.length === 0}
                inputProps={{ 'aria-label': 'todos os itens selecionados' }}
            />
        );
    }

    return (
        <Paper className={classes.paper} elevation={1}>
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item>
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
                                    <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
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
                <Grid item >
                    <Grid container direction="column" alignItems="center">
                        <ArrowForwardButton type="button" onClickEvent={handleCheckedRight} />
                        <ArrowBackButton type="button" onClickEvent={handleCheckedLeft} />
                    </Grid>
                </Grid>
                <Grid item>
                    <SimpleTable
                        data={rows}
                        columns={columnsNames}
                        checkComponent={<CheckComponent items={rows} />}
                        titleCheckComponent="Menus adicionados"
                        subTitleCheckComponent={`${numberOfChecked(rows)}/${rows.length} selecionados`}
                        notShowActions
                    >
                        {rows.map((row, key) => {
                            return (
                                <PerfilMenuTableRow
                                    key={"row-key-" + key}
                                    checkedList={checked}
                                    row={row}
                                    handleToggle={handleToggle(row)}
                                    onChangeStatus={changeStatusFunction}
                                    idColumnName={idColumnName} />
                            );
                        })}
                    </SimpleTable>
                </Grid>
            </Grid>
        </Paper>
    );
}
