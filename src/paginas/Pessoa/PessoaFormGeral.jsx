import React from "react";
import { Sexo } from "../../api/utils/constants";
import CustomTextField from "../../components/CustomFields/CustomTextField";
import ContatosComponent from "./contatos/ContatosComponent";
import DocumentosComponent from "./documentos/DocumentosComponent";
import WebcamCapture from "../../components/Webcam/WebcamCapture";
import noImageAvailable from "../../img/noImageAvailable.png";
import DNAAutocomplete from "../../components/V1.0.0/DNAAutocomplete";
import { objectContext } from "../../contexts/objectContext";
import DNAImageUpload from "../../components/V1.0.0/DNAImageUpload";
import { dataURLtoFile, handleChangeInputComponent } from "../../api/utils/util";
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from "@mui/material";

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

    const handleChange = (e, newValue) => {
        handleChangeInputComponent(e, newValue, setObject, object);
    }

    const handleOnWebcamChange = (value) => {
        // const file = dataURLtoFile(value, 'foto_pessoa.png');
        // let image = {
        //     id: '',
        //     nome: file.name,
        //     tipo: file.type,
        //     data: file,
        // };

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
                            <CustomTextField
                                id="nome"
                                label="Nome da pessoa"
                                value={object.nome}
                                placeholder={"<< Digite o nome da Pessoa >>"}
                                autoFocus={true}
                                disabled={disabled}
                                onChangeHandler={handleChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <CustomTextField
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
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                id="nascimento"
                                label="Data de Nascimento"
                                value={object.nascimento}
                                type="date"
                                disabled={disabled}
                                onChangeHandler={handleChange} />
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