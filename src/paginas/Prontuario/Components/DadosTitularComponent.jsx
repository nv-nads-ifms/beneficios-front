import { Grid } from "@material-ui/core";
import MoradiasComponent from "../../Pessoa/moradia/MoradiasComponent";
import DocumentosComponent from "../../Pessoa/documentos/DocumentosComponent";
import ContatosComponent from "../../Pessoa/contatos/ContatosComponent";
import React from "react";
import { emptyPessoa } from "../../../models/Pessoa";

export default function DadosTitularComponent(props) {
    const { value } = props;
    const [pessoa, setPessoa] = React.useState(emptyPessoa);

    React.useEffect(() => {
        if (value != null) {
            setPessoa(value);
        } else {
            setPessoa(emptyPessoa);
        }
    }, [value]);
    
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <MoradiasComponent disabled={true} moradias={pessoa.moradias} />
            </Grid>
            <Grid item xs={12} lg={6}>
                <DocumentosComponent disabled={true} documentos={pessoa.documentos} />
            </Grid>
            <Grid item xs={12} lg={6}>
                <ContatosComponent disabled={true} contatos={pessoa.contatos} />
            </Grid>
        </Grid>
    );
}