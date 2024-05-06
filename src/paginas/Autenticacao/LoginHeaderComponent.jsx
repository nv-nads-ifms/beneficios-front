import React from 'react';
import { Avatar, Box, Container, ListItemText, Paper, Typography } from '@mui/material';

import dneLogo from '../../assets/img/logo_ifms_nv.png';
import DNATitleLabel from '../../components/V1.0.0/DNATitleLabel';
import CopyrightComponent from '../../components/V1.0.0/CopyrightComponent';

export default function LogoHeaderComponent(props) {
    const { children } = props;
    const titulo = "Sistema de Gestão de Benefícios Eventuais";
    const apelido = "SGBE";

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper
                sx={{
                    p: 2,
                    borderRadius: 5
                }}
            >
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, width: 80, height: 80 }} src={dneLogo} />
                    <ListItemText
                        primary={
                            <DNATitleLabel text={apelido} />
                        }
                        secondary={
                            <Typography variant='inherit' textAlign={'center'}>
                                {titulo}
                            </Typography>
                        }
                    />
                    <Box sx={{
                        mt: 4,
                    }}>
                        {children}
                    </Box>
                </Box>
            </Paper>

            <CopyrightComponent sx={{ mt: 4, mb: 4 }} />
        </Container>
    );
}