import React from "react";

import { objectContext } from "../../contexts/objectContext";
import { DNAStatus, emptyBaseObject } from "../../api/utils/constants";
import DNAFormDialog from "../../components/V1.0.0/dialog/DNAFormDialog";
import { Grid, TextField } from "@mui/material";
import { handleChangeInputComponent } from "../../api/utils/util";
import DNAAutocomplete from "../../components/V1.0.0/DNAAutocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import dayjs from "dayjs";

const emptyFuncionario = {
    ...emptyBaseObject,
    unidadeAtendimento: null,
    funcao: null,
    nome: "",
    nascimento: dayjs(),
    email: "",
    sexo: "FEMININO",
};

function FuncionarioForm(props) {
    const {
        datacontrol,
        on_change_datacontrol,
        data_source_url,
        id_value,
        open,
        on_close_func,
    } = props;

    const [funcionario, setFuncionario] = React.useState(emptyFuncionario);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(
            event,
            newValue,
            setFuncionario,
            funcionario
        );
    };

    const handleDatePickerChange = (newValue, component) => {
        setFuncionario({
            ...funcionario,
            nascimento: newValue["$d"],
        });
    };

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    };

    return (
        <objectContext.Provider
            value={{
                object: funcionario,
                setObject: setFuncionario,
                emptyObject: emptyFuncionario,
            }}
        >
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Dados do Funcionário"}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            value={funcionario.email}
                            label={"Digite o email do Funcionário"}
                            variant="outlined"
                            fullWidth
                            disabled={datacontrol === DNAStatus.VIEW}
                            onChange={(event) =>
                                handleChange(
                                    event,
                                    (funcionario.email = event.target.value)
                                )
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="nome"
                            value={funcionario.nome}
                            label={"Digite o nome do Funcionário"}
                            variant="outlined"
                            fullWidth
                            disabled={datacontrol === DNAStatus.VIEW}
                            onChange={(event) => {
                                handleChange(
                                    event,
                                    (funcionario.nome = event.target.value)
                                );
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DNAAutocomplete
                            id="unidadeAtendimento"
                            path="unidades-de-atendimento"
                            input_label="<< Selecione uma Unidade de Atendimento >>"
                            value={funcionario.unidadeAtendimento}
                            disabled={datacontrol === DNAStatus.VIEW}
                            onChange={(event, value) =>
                                handleChange(
                                    event,
                                    (funcionario.unidadeAtendimento = value)
                                )
                            }
                            isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                            }
                            getOptionLabel={(option) => option.nome}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DNAAutocomplete
                            id="funcao"
                            path="funcoes"
                            input_label="<< Selecione uma Função >>"
                            value={funcionario.funcao}
                            disabled={datacontrol === DNAStatus.VIEW}
                            onChange={(event, value) =>
                                handleChange(
                                    event,
                                    (funcionario.funcao = value)
                                )
                            }
                            isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                            }
                            getOptionLabel={(option) => option.nome}
                        />
                    </Grid>
                    <Grid item xs={12} display={"flex"}>
                        <Grid item xs={12}>
                            <DatePicker
                                label="Data de Nascimento"
                                value={dayjs(funcionario.nascimento)}
                                disabled={datacontrol === DNAStatus.VIEW}
                                onChange={(newValue) => {
                                    handleDatePickerChange(
                                        (funcionario.nascimento = newValue)
                                    );
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">
                                    Sexo
                                </FormLabel>
                                <RadioGroup
                                    disabled={datacontrol === DNAStatus.VIEW}
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="FEMININO"
                                    name="radio-buttons-group"
                                    value={funcionario.sexo}
                                    onChange={(event) =>
                                        handleChange(
                                            event,
                                            (funcionario.sexo =
                                                event.target.value)
                                        )
                                    }
                                >
                                    <FormControlLabel
                                        value="FEMININO"
                                        control={<Radio />}
                                        label="Feminino"
                                        disabled={
                                            datacontrol === DNAStatus.VIEW
                                        }
                                    />
                                    <FormControlLabel
                                        value="MASCULINO"
                                        control={<Radio />}
                                        label="Masculino"
                                        disabled={
                                            datacontrol === DNAStatus.VIEW
                                        }
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </DNAFormDialog>
        </objectContext.Provider>
    );
}

export default FuncionarioForm;
