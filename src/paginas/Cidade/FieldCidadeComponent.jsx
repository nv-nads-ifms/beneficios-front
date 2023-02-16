import React from "react";
import { Divider, Paper, InputBase, makeStyles, FormControl, FormHelperText } from "@material-ui/core";
import { fichaStyles } from "../../components/UI/GlobalStyle";
import SearchIconButton from "../../components/CustomIconButtons/SearchIconButton";
import CidadeListagemModal from "./CidadeListagemModal";
import CidadeCadastro from "./CidadeCadastro";
import ClearIconButton from "../../components/CustomIconButtons/ClearIconButton";
import { cidadeToText, emptyCidade } from "../../models/Cidade";
import AddIconButton from "../../components/CustomIconButtons/AddIconButton";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
}));

export default function FieldCidadeComponent(props) {
    const { cidade, callback, error, onlySearch } = props;
    const inputClasses = useStyles();
    const classes = fichaStyles();
    const [openConsulta, setOpenConsulta] = React.useState(false);
    const [openCadastro, setOpenCadastro] = React.useState(false);

    const handleShowConsulta = () => {
        setOpenConsulta(true);
    };

    const handleCloseConsulta = () => {
        setOpenConsulta(false);
    };

    const handleShowCadastro = () => {
        setOpenCadastro(true);
    };

    const handleCloseCadastro = () => {
        setOpenCadastro(false);
    };

    return (
        <div>
            <Paper elevation={1} square={true} variant="outlined" component="form" className={inputClasses.root} >
                <FormControl fullWidth>
                    <InputBase
                        fullWidth={true}
                        value={cidade != null && cidade !== emptyCidade ? cidadeToText(cidade) : ""}
                        readOnly={true}
                        className={classes.input}
                        error={error != null ? !error.valido : false}
                        placeholder="Selecione uma Cidade"
                        inputProps={{ 'aria-label': 'busca por Nome' }}
                    />
                    <FormHelperText id="component-helper-text">{error != null ? error.texto : ''}</FormHelperText>
                </FormControl>

                <Divider className={classes.divider} orientation="vertical" />
                {(onlySearch != null || cidade == null || cidade === emptyCidade) && (
                    <SearchIconButton
                        tooltip="Buscar por uma Cidade"
                        onClick={handleShowConsulta} />
                )}
                {onlySearch == null && (
                    (cidade == null || cidade === emptyCidade) ? (
                        <AddIconButton
                            tooltip="Adicionar uma Cidade"
                            onClick={handleShowCadastro} />
                    ) : (
                        <React.Fragment>
                            <ClearIconButton
                                tooltip="Limpar Cidade"
                                onClick={() => callback(null)} />
                        </React.Fragment>
                    )
                )}
            </Paper>

            <CidadeCadastro
                id={cidade != null ? cidade.id : 0}
                openModal={openCadastro}
                onClose={handleCloseCadastro}
                callback={callback}
            />

            <CidadeListagemModal
                openModal={openConsulta}
                onClose={handleCloseConsulta}
                response={callback}
            />
        </div>
    );
}