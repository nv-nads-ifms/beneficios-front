import {
    Apartment, Category, EventSeat, LocationCity, Person, School,
    Task, TipsAndUpdates
} from "@mui/icons-material";

const menuAdmin = [
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
                caption: "Sedes",
                url: "sede",
                icon: <Apartment />,
            },
            {
                caption: "Usuários",
                url: "usuario",
                icon: <Person />,
            },
        ],
    },
    {
        caption: "Projetos",
        submenus: [
            {
                caption: "Áreas do conhecimento",
                url: "area-conhecimento",
                icon: <TipsAndUpdates />,
            },
            {
                caption: "Categorias de perguntas",
                url: "categoria",
                icon: <Category />,
            },
        ],
    },
    {
        caption: "Eventos",
        submenus: [
            {
                caption: "Atividades de eventos",
                url: "atividade",
                icon: <Task />,
            },
            {
                caption: "Níveis de ensino",
                url: "nivel-ensino",
                icon: <School />,
            },
            {
                caption: "Tipos de eventos",
                url: "tipo-evento",
                icon: <EventSeat />,
            },
        ],
    },

];

export default menuAdmin;