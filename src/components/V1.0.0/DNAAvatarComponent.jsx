import React from "react";

import { Block, Cancel, Check, DoNotDisturbOn, PendingActions } from "@mui/icons-material";

import { Avatar } from "@mui/material";
import { green, orange, pink, yellow } from "@mui/material/colors";
import { StatusType } from "../../api/utils/constants";

export default function AvatarComponent(params) {
    const { status } = params;
    var component = {};
    switch (status) {
        case StatusType.RETIRADO:
        case StatusType.ATIVO:
            component = { color: green[500], icon: <Check /> };
            break;
        case StatusType.CANCELADO:
            component = { color: pink[500], icon: <Cancel /> };
            break;
        case StatusType.INATIVO:
            component = { color: pink[500], icon: <Block /> };
            break;
        case StatusType.PENDENTE:
            component = { color: orange[500], icon: <PendingActions /> };
            break;

        default:
            component = { color: yellow[500], icon: <DoNotDisturbOn /> };
            break;
    }
    return (
        <Avatar sx={{ bgcolor: component.color }}>
            {component.icon}
        </Avatar>
    );
}