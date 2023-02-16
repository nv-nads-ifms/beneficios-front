import React from 'react';
import clsx from 'clsx';
import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));

export default function ExpandMoreIconButton(props) {
    const { tooltip, label, expanded, callback, ...others } = props;
    const classes = useStyles();
    
    const handleExpandClick = () => {
        callback(!expanded);
    };

    return (
        <Tooltip title={tooltip != null ? tooltip : "Expandir visualização"}>
            <IconButton
                {...others}
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="Mostar mais"
            >
                <ExpandMoreIcon />
                {label}
            </IconButton>
        </Tooltip>
    );
}