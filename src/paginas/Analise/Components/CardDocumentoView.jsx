import React from "react";
import Moment from 'moment';
import { Avatar, Card, CardContent, CardHeader, Grid, Tooltip, Typography } from "@material-ui/core";
import { extractCapitalizeLetters } from "../../../api/utils/stringUtils";

export default function CardDocumentoView(props) {
    const { documentoPessoa } = props;
    const documento = documentoPessoa.documentoDto;
    const orgao = documentoPessoa.orgaoExpedidorDto;

    return (
        <Card raised style={{ width: '420px' }}>
            <CardHeader
                avatar={
                    <Tooltip title={documento.descricao}>
                        <Avatar>
                            {extractCapitalizeLetters(documento.descricao)}
                        </Avatar>
                    </Tooltip>
                }
                disableTypography={true}
                title={
                    <Typography variant="h6">
                        {documentoPessoa.numero}
                    </Typography>
                }
                subheader={
                    <Typography variant="caption" color="textSecondary">
                        Número do documento
                    </Typography>
                }
            />
            <CardContent>
                <Grid container spacing={5}>
                    {orgao != null && (
                        <Grid item>
                            <Typography variant="body2">
                                {orgao.descricao}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                Órgão Expedidor
                            </Typography>
                        </Grid>
                    )}

                    <Grid item>
                        <Typography variant="body2">
                            {Moment(documentoPessoa.emissao).format('DD/MM/Y')}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            Data de emissão
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}