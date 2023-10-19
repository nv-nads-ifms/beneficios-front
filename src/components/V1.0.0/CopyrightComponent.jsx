import React from "react";
import { Typography } from "@mui/material";
import { Copyright } from "@mui/icons-material";
import DNALink from "./DNALink";

export default function CopyrightComponent(props) {

    return (
        <React.Fragment>
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                <Copyright fontSize="6" /> Copyright  {new Date().getFullYear()}
                <br />
                <DNALink color="inherit" href="https://ifms.edu.br/">
                    IFMS {new Date().getFullYear()}.
                </DNALink>
                <br />
                Todos os direitos reservados
            </Typography>
        </React.Fragment>
    );
} 