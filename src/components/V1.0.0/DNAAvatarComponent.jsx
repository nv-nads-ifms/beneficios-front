import React from "react";

import { Block, Check, DoNotDisturbOn } from "@mui/icons-material";

import { Avatar } from "@mui/material";
import { green, pink, yellow } from "@mui/material/colors";
import { StatusType } from "../../api/utils/constants";

export default function AvatarComponent(params) {
    const { status } = params;
    var component = {};
    switch (status) {
        case StatusType.ATIVO:
            component = { color: green[500], icon: <Check /> };
            break;
        case StatusType.INATIVO:
            component = { color: pink[500], icon: <Block /> };
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