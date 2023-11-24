import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Divider } from "@mui/material";

import DNAButton, { DNAButtonType } from "../DNAButton";
import DNATitleLabel from "../DNATitleLabel";
import { DNAStatus } from "../../api/utils/constants";
import { deleteModalMessage, saveModalMessage, swalWithBootstrapButtons } from "../../api/utils/modalMessages";
import DataService from "../../api/services/DataServices";
import DNABasePanel from "./DNABasePanel";

export default function DNAFormPanel(props) {
  const {
    children,
    text, path, status, objectfilefieldname,
    object, setobject, emptyobject,
    edit_func } = props;
  const { id } = useParams();
  const dataService = new DataService(`/${path}`);

  let navigate = useNavigate();

  const [buttonStatus, setButtonStatus] = React.useState(false);
  React.useEffect(() => {
    setButtonStatus(status === DNAStatus.VIEW);
  }, [status]);

  const loadData = async () => {
    if (id === '0') {
      setobject(emptyobject);
    } else {
      const response = await dataService.getById(id);
      if (response.hasOwnProperty('status') && response.status === 404) {
        swalWithBootstrapButtons.fire('Ooops!', `Dados não encontrados!`, 'error');
        navigate("/");
      } else {
        setobject(response.data);
      }
    }
  };

  React.useEffect(() => {
    loadData();
  }, [id]);

  const handleSave = () => {
    saveModalMessage(
      () => {
        if (objectfilefieldname) {
          return dataService.saveWithFile(id, object, objectfilefieldname);
        }
        return dataService.save(id, object);
      },
      () => navigate(`/${path}`))
  };

  const handleDelete = () => {
    deleteModalMessage(object.nome,
      () => dataService.delete(id),
      () => navigate(`/${path}`));
  };

  return (
    <DNABasePanel>
      <DNATitleLabel text={text} />
      <Divider variant="middle" />
      <Box sx={{ p: 1, m: 1 }}>{children}</Box>
      <Divider variant="middle" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          p: 0,
          my: 1
        }}
      >
        <DNAButton sx={{ mr: 1, }} type={DNAButtonType.BACK} disabled={false} onClick={(e) => navigate(`/${path}`)} />
        <DNAButton sx={{ mr: 1 }} type={DNAButtonType.DELETE} disabled={!buttonStatus} onClick={handleDelete}
        />
        <DNAButton sx={{ mr: 1 }} type={DNAButtonType.EDIT} disabled={!buttonStatus} onClick={edit_func} />
        <DNAButton sx={{ mr: 1 }} type={DNAButtonType.SAVE} disabled={buttonStatus} onClick={handleSave} />
      </Box>
    </DNABasePanel>
  );
}
