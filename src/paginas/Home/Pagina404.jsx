import React from 'react';
import { Card, CardContent, CardHeader, Link, Typography } from '@material-ui/core';

const Pagina404 = () => {
    return (
        <Card>
            <CardHeader
                title={
                    <Typography variant="h4" gutterBottom>
                        Ops, Essa página não existe!
                    </Typography>
                }
            />
            <CardContent>
                <Typography variant="body1">
                    <Link href="/#/login">
                        Clique aqui para acessar seu login.
                    </Link>
                </Typography>
            </CardContent>
        </Card>
    );
}
export default Pagina404;