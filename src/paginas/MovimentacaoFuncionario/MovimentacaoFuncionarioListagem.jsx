import React from 'react';
import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

import { useHistory } from 'react-router-dom';
import MovimentacaoFuncionarioService from '../../services/MovimentacaoFuncionarioService';
import AutoLoadTable from '../../components/CustomTable/AutoLoadTable';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    }
}));

const columnsNames = [
    // { id: 'nome do atributo', 
    //     label: 'Descricao do atributo', 
    //     minWidth: <tamanho minimo da coluna>,
    //     align: 'alinhamento' },
    {id: 'nome', label: 'Nome'},
    {id: 'nascimento', label: 'Nascimento', align: 'center'},
    {id: 'funcao', label: 'Função'},
    {id: 'email', label: 'E-mail'}
];

function MovimentacaoFuncionarioListagem() {
    let history = useHistory();
    const classes = useStyles();

    const handleEdit = (idValue) => {
        history.push(`/funcionario-ficha/${idValue}`);
    }

    const handleClick = (event) => {
        history.push('/funcionario-ficha/0');
    }

    return (
        <Container className={classes.content} component="article" maxWidth="lg">
            <div className={classes.toolbar} />
            <Typography variant="h3" component="h1" align="center">Listagem de Funcionários</Typography>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                name="btAdicionar"
                startIcon={<AddIcon />}
                onClick={(event) => handleClick(event)}
            >
                Criar Novo Funcionário
            </Button>

            <AutoLoadTable
                retrieveDataFunction={MovimentacaoFuncionarioService.getMovimentacaoFuncionarios}
                columns={columnsNames}
                idColumnName={'id'}
                handleEdit={handleEdit}
                handleRemove={MovimentacaoFuncionarioService.deleteMovimentacaoFuncionario}
            />
        </Container>

    );
}

export default MovimentacaoFuncionarioListagem;