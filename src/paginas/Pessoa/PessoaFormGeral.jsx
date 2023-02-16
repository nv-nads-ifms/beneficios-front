import {
    Card, CardActionArea, CardActions, CardMedia, FormControl, FormControlLabel,
    FormLabel, Grid, Radio, RadioGroup
} from "@material-ui/core";
import React from "react";
import { Sexo } from "../../api/utils/constants";
import CustomAutoComplete from "../../components/CustomFields/CustomAutoComplete";
import CustomTextField from "../../components/CustomFields/CustomTextField";
import ImageIconButton from "../../components/CustomIconButtons/ImageIconButton";
import PhotoIconButton from "../../components/CustomIconButtons/PhotoIconButton";
import EscolaridadeService from "../../services/EscolaridadeService";
import ContatosComponent from "./contatos/ContatosComponent";
import DocumentosComponent from "./documentos/DocumentosComponent";
import WebcamCapture from "../../components/Webcam/WebcamCapture";
import noImageAvailable from "../../img/noImageAvailable.png";

export default function PessoaFromGeral(props) {
    const { pessoa, disabled, callback } = props;
    const [imagePreview, setImagePreview] = React.useState(null);
    const inputRefFile = React.useRef(null);
    const [openWebcam, setOpenWebCam] = React.useState(false);

    React.useEffect(() => {
        setImagePreview(noImageAvailable);
        if (pessoa != null && pessoa.foto != null) {
            if (pessoa.foto instanceof File) {
                setImagePreview(URL.createObjectURL(pessoa.foto));
            } else {
                setImagePreview(pessoa.foto);
            }
        }
    }, [pessoa]);

    const onChange = (event, newValue) => {
        let t = event.target;
        let value = newValue != null ? newValue : t.value;
        const fieldname = t.id.split('-')[0];

        setValue(value, fieldname);
    };

    const handleUploadClick = event => {
        let file = event.target.files[0];
        setValue(file, "foto");
    };

    const setValue = (value, fieldname) => {
        callback({
            ...pessoa,
            [fieldname]: value,
        });
    }

    const handleImageClick = (e) => {
        inputRefFile.current.click();
    }

    const handleCapturarImagem = () => {
        setOpenWebCam(true);
    }

    const handCloseWebcam = () => {
        setOpenWebCam(false);
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={imagePreview}
                                title="Foto da pessoa"
                            />
                        </CardActionArea>
                        <CardActions>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="upload-profile-image"
                                type="file"
                                ref={inputRefFile}
                                onChange={handleUploadClick}
                                disabled={disabled}
                            />
                            <label htmlFor="upload-profile-image">
                                <ImageIconButton
                                    disabled={disabled}
                                    tooltip="Selecionar imagem do computador"
                                    onClick={handleImageClick} />
                            </label>
                            <PhotoIconButton
                                disabled={disabled}
                                tooltip="Capturar imagem da câmera"
                                onClick={handleCapturarImagem} />
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={10}>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <CustomTextField
                                id="nome"
                                label="Nome da pessoa"
                                value={pessoa.nome}
                                placeholder={"<< Digite o nome da Pessoa >>"}
                                autoFocus={true}
                                disabled={disabled}
                                onChangeHandler={onChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <CustomTextField
                                id="id"
                                label="Id."
                                value={pessoa.id}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomAutoComplete
                                id="escolaridadeDto"
                                value={pessoa.escolaridadeDto}
                                retrieveDataFunction={EscolaridadeService.getListaEscolaridades}
                                label="Escolaridade"
                                placeholder="Selecione uma Escolaridade"
                                disabled={disabled}
                                onChangeHandler={(event, newValue) => onChange(event, newValue)}
                                getOptionSelected={(option, value) => option.id === value.id}
                                getOptionLabel={(option) => option.descricao}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                id="nascimento"
                                label="Data de Nascimento"
                                value={pessoa.nascimento}
                                type="date"
                                disabled={disabled}
                                onChangeHandler={onChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Sexo</FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="sexo"
                                    name="sexo"
                                    value={pessoa.sexo}
                                    onChange={onChange}>
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
                        documentos={pessoa.documentos}
                        disabled={disabled}
                        callback={(value) => setValue(value, "documentos")} />
                </Grid>
                <Grid item xs={6}>
                    <ContatosComponent
                        contatos={pessoa.contatos}
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