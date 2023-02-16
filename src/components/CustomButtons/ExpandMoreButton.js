import React from 'react'; 
import { Button, makeStyles } from "@material-ui/core";
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    expand: {
      transform: 'rotate(0deg)',
    //   marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));

export default function ExpandMoreButton(props) {
    const { label, tooltip, expanded, callback, ...others } = props;
    const classes = useStyles();
    
    const handleExpandClick = () => {
        callback(!expanded);
    };
    return (
        <Button
            {...others}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Mostar mais"
            variant="contained"
            color="primary"
            name="btAdicionar"
            startIcon={<ExpandMoreIcon
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })} />}
        >
            {label}
        </Button>
    );
}