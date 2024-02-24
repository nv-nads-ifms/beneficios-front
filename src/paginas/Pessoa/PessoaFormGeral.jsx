import React from "react";
import { Sexo } from "../../api/utils/constants";
import ContatosComponent from "./contatos/ContatosComponent";
import DocumentosComponent from "./documentos/DocumentosComponent";
import WebcamCapture from "../../components/Webcam/WebcamCapture";
import noImageAvailable from "../../img/noImageAvailable.png";
import DNAAutocomplete from "../../components/V1.0.0/DNAAutocomplete";
import { objectContext } from "../../contexts/objectContext";
import DNAImageUpload from "../../components/V1.0.0/DNAImageUpload";
import { handleChangeInputComponent, setFieldValue } from "../../api/utils/util";
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function PessoaFromGeral(props) {
    const { disabled } = props;

    const { object, setObject } = React.useContext(objectContext);

    const [imagePreview, setImagePreview] = React.useState(null);
    const [openWebcam, setOpenWebCam] = React.useState(false);

    React.useEffect(() => {
        setImagePreview(noImageAvailable);
        if (object != null && object.foto != null) {
            if (object.foto instanceof File) {
                setImagePreview(URL.createObjectURL(object.foto));
            } else {
                setImagePreview(object.foto);
            }
        }
    }, [object]);

    const idadeMinima = React.useMemo(() => {
        return dayjs().subtract(18, 'year');
    }, []);

    const handleChange = (e, newValue, fieldname) => {
        handleChangeInputComponent(e, newValue, setObject, object, fieldname);
    }

    const handleOnWebcamChange = (value) => {
        setValue(value, 'foto');
    }

    const setValue = (value, fieldname) => {
        setObject({
            ...object,
            [fieldname]: value,
        });
    }

    const handCloseWebcam = () => {
        setOpenWebCam(false);
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} md={2}>
                    <DNAImageUpload
                        tooltip="Clique aqui para selecionar sua foto"
                        image={imagePreview}
                        disabled={disabled}
                        onChange={handleChange}
                        webcam
                        onWebcamChange={handleOnWebcamChange} />
                </Grid>
                <Grid item md={10} xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <TextField
                                id="nome"
                                fullWidth
                                label="Nome da pessoa"
                                value={object.nome}
                                variant='outlined'
                                placeholder={"<< Digite o nome da Pessoa >>"}
                                autoFocus={true}
                                disabled={disabled}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="id"
                                label="Id."
                                value={object.id}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DNAAutocomplete
                                id="escolaridade"
                                path="escolaridades"
                                input_label="<< Selecione uma Escolaridade >>"
                                value={object.escolaridade}
                                disabled={disabled}
                                onChange={handleChange}
                                isOptionEqualToValue={(option, value) =>
                                    option.id === value.id
                                }
                                getOptionLabel={(option) => option.nome}
                                input_modal={true}
                                input_modal_title={"Cadastrar um novo nível de escolaridade"}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DatePicker
                                label='Data de Nascimento'
                                value={dayjs(object.nascimento)}
                                maxDate={idadeMinima}
                                // disableFuture
                                disabled={disabled}
                                format='DD/MM/YYYY'
                                onChange={(newValue) => setFieldValue('nascimento', newValue["$d"], setObject, object)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Sexo</FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="sexo"
                                    name="sexo"
                                    value={object.sexo}
                                    onChange={handleChange}>
                                    <FormControlLabel
                                        disabled={disabled} value={Sexo.FEMININO} control={<Radio id="sexo" color="primary" />} label="Feminino" />
                                    <FormControlLabel
                                        disabled={disabled} value={Sexo.MASCULINO} control={<Radio id="sexo" color="primary" />} label="Masculino" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <DocumentosComponent
                        documentos={object.documentos}
                        disabled={disabled}
                        callback={(value) => setValue(value, "documentos")} />
                </Grid>
                <Grid item xs={6}>
                    <ContatosComponent
                        contatos={object.contatos}
                        disabled={disabled}
                        callback={(value) => setValue(value, "contatos")} />
                </Grid>
            </Grid>

            <WebcamCapture
                openModal={openWebcam}
                onClose={handCloseWebcam}
                callback={(value) => setValue(value, "foto")}
            />
        </div>
    );
}