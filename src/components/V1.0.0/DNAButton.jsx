import React from "react";
import PropTypes from 'prop-types';
import { Button } from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

export const DNAButtonType = {
  SAVE: 'Salvar',
  EDIT: 'Alterar',
  DELETE: 'Excluir',
  BACK: 'Voltar',
  NEW: 'Cadastrar',
  ADD: 'Adicionar',
  SEARCH: 'Buscar',
  LOGIN: 'ENTRAR',
  LOGOUT: 'Sair',
  NEXT: 'Proximo',
  CLOSE: 'Fechar',
  DEFAULT: '',
}

DNAButton.propTypes = {
  type: PropTypes.string,
};

const getButtonConfig = (type) => {
  const buttonConfig = { icon: null, color: 'primary', text: type }
  switch (type) {
    case DNAButtonType.SAVE:
      buttonConfig.icon = <SaveIcon />;
      buttonConfig.color = 'success';
      break;
    case DNAButtonType.EDIT:
      buttonConfig.icon = <EditIcon />;
      break;
    case DNAButtonType.DELETE:
      buttonConfig.icon = <DeleteIcon />;
      buttonConfig.color = 'error';
      break;
    case DNAButtonType.BACK:
      buttonConfig.icon = <ArrowBackIcon />;
      break;
    case DNAButtonType.NEW:
      buttonConfig.color = 'info';
      buttonConfig.icon = <AddIcon />;
      break;
    case DNAButtonType.ADD:
      buttonConfig.icon = <AddIcon />;
      break;
    case DNAButtonType.SEARCH:
      buttonConfig.icon = <SearchIcon />;
      break;
    case DNAButtonType.LOGIN:
      buttonConfig.icon = <LoginIcon />;
      break;
    case DNAButtonType.LOGOUT:
      buttonConfig.icon = <LogoutIcon />;
      break;
    case DNAButtonType.NEXT:
      buttonConfig.icon = <ArrowForwardIcon />
      break;
    case DNAButtonType.CLOSE:
      buttonConfig.icon = <MeetingRoomIcon />;
      break;
    default:

  }
  return buttonConfig;
};

export default function DNAButton(props) {
  const { type, caption } = props;
  const [buttonConfig, setButtonConfig] = React.useState({});

  React.useEffect(() => {
    setButtonConfig(getButtonConfig(type));
  }, [type]);

  return (
    <Button
      variant={type === DNAButtonType.NEW ? "text" : "contained"}
      size="small"
      startIcon={buttonConfig.icon}
      color={buttonConfig.color}
      {...props}
    >
      {caption == null ? buttonConfig.text : caption}
    </Button>
  );
}
