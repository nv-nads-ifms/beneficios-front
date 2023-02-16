import React from 'react';
import Grid from '@material-ui/core/Grid';
import CondicaoMoradia from './CondicaoMoradia';
import { fichaStyles } from '../UI/GlobalStyle';

export default function MoradiaComponent() {
    const classes = fichaStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xc={12}>
                        <CondicaoMoradia />
                    </Grid>
                </Grid>
            </div>
        </main>
    );
}