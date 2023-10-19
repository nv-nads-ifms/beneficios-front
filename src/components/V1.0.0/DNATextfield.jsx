import React from "react";
import PropTypes from 'prop-types';

import { InputAdornment, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";

function DNATextfield(props) {
  const { search, edit } = props;

  return (
    <TextField
      InputProps={{
        startAdornment:
          search && (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        endAdornment:
          edit && (
            <InputAdornment position="end">
              <EditIcon />
            </InputAdornment>
          )
      }}
      
      {...props}
    />
  );
}

DNATextfield.defaultPros = {
  search: "false",
  edit: "false"
};

DNATextfield.propTypes = {
  search: PropTypes.string, 
  edit: PropTypes.string
}

export default DNATextfield;