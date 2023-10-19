import React from "react";
import PropTypes from "prop-types";
import DNABasePanel from "./DNABasePanel";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
// import { Button, Container, Divider, Grid, Typography } from "@mui/material";

// import DNATitleLabel from "../DNATitleLabel";
// import DNAButton, { DNAButtonType } from "../DNAButton";
// import DNATextfield from "../DNATextfield";

import SearchIcon from "@mui/icons-material/Search";

function DNADialogFilterPanel(props) {
  // const { children, text, handleraction } = props;
  const { children, formtitle, handleloadaction, handleeditnome, handlenome } =
    props;
  //   const { children, formtitle } = props;

  return (
    <DNABasePanel noconfig="true" {...props}>
      <Typography variant="h4">{formtitle}</Typography>
      {/* <Grid container spacing={1}>
                <Grid item xs={12} md={8} container direction={'row'} justifyContent={'flex-start'}>
                    <DNATitleLabel text={text} />
                </Grid>
                <Grid item xs={12} md={4} container direction={'row'} justifyContent={'flex-end'}>
                    <DNAButton
                        type={DNAButtonType.NEW}
                        onClick={handleraction}
                    />
                </Grid>
            </Grid> */}

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid
          item
          xs={12}
          md={10}
          container
          direction={"row"}
          justifyContent={"flex-start"}
        >
          <TextField
            id="nome"
            // value={nome}
            value={handlenome}
            label={"Buscar por nome"}
            variant="outlined"
            fullWidth
            // onChange={(event) => setNome(event.target.value)}
            onChange={(event) => handleeditnome(event.target.value)}
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <Button
            variant="contained"
            endIcon={<SearchIcon />}
            onClick={handleloadaction}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>

      {/* <Divider variant="middle" /> */}
      <Container>{children}</Container>
    </DNABasePanel>
  );
}

DNADialogFilterPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  text: PropTypes.string.isRequired,
  handleraction: PropTypes.func.isRequired,
};

export default DNADialogFilterPanel;
