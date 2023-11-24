import React from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { Container, Divider, Grid } from "@mui/material";

import DNAButton, { DNAButtonType } from "../DNAButton";
import DNATitleLabel from "../DNATitleLabel";
import DNABasePanel from "./DNABasePanel";

function DNAFilterPanel(props) {
  const { children, text, urltonew, noconfig } = props;
  let navigate = useNavigate();

  const handleNew = () => {
    navigate(`/${urltonew}`);
  };

  return (
    <DNABasePanel {...props}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8} container justifyContent={'flex-start'} alignItems={'center'}>
          <DNATitleLabel text={text} />
          <Divider variant="middle" />
        </Grid>
        <Grid item xs={12} md={4} container justifyContent={'flex-end'} alignItems={'center'}>
          <DNAButton type={DNAButtonType.NEW} onClick={handleNew} />
        </Grid>
      </Grid>
      <Divider variant='middle' />
      <Container>
        {children}
      </Container>
    </DNABasePanel>
  );
}

DNAFilterPanel.defaultPros = {
  noconfig: false
};

DNAFilterPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  text: PropTypes.string.isRequired,
  urltonew: PropTypes.string.isRequired,
  noconfig: PropTypes.bool
}

export default DNAFilterPanel;