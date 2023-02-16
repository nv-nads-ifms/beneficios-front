import React from 'react'
import { fichaStyles } from '../../components/UI/GlobalStyle';
import { Checkbox, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import PerfilService from '../../services/PerfilService';

export default function CheckboxPerfil(props) {
    const { values, callback, read } = props;
    const classes = fichaStyles();
    const [perfis, setPerfis] = React.useState([]);

    React.useEffect(() => {
        PerfilService.getListaPerfis()
            .then(r => setPerfis(r.data))
    }, [setPerfis]);

    const handleToggle = (value) => () => {
        const currentIndex = values.map(p => p.id).indexOf(value.id);

        if (currentIndex === -1) {
            values.push(value);
        } else {
            values.splice(currentIndex, 1);
        }
        
        callback(values);
    };

    return (
        <List
            className={classes.list}
            dense
            component="div"
            role="list"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Perfis de Acesso
                </ListSubheader>
            }
        >
            {perfis.map((value) => {
                const labelId = `transfer-list-all-item-${value.id}-label`;

                return (
                    <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
                        <ListItemIcon>
                            <Checkbox
                                checked={values.map(obj => obj.id).indexOf(value.id) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                disabled={!read}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value.nome} />
                    </ListItem>
                );
            })}
            <ListItem />
        </List>
    )


}