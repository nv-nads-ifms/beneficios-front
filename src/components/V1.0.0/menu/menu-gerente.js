import { Event, LocationCity, Person } from "@mui/icons-material";

const menuGerente = [
    {
        caption: 'Localização', 
        submenus: [
            {
                caption: "Cidade",
                url: `cidade`,
                icon: <LocationCity />,
            },
        ],
    },
    {
        caption: 'Controle de acesso', 
        submenus: [
            {
                caption: "Usuários",
                url: `usuario`,
                icon: <Person />,
            },
        ],
    },
    {
        caption: 'Eventos', 
        submenus: [
            {
                caption: "Eventos",
                url: `evento`,
                icon: <Event />,
            },
        ],
    },
];

export default menuGerente;