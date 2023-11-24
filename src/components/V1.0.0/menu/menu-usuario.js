import React from 'react';
import {
    AssignmentInd, BarChart, EventNote, HowToReg, LinearScale, LocationCity, Person,
    QuestionAnswer, Quiz, School, Science, Send, Star
} from '@mui/icons-material';
import { TipoMembro } from '../../api/utils/constants';

function getMenuUsuario(diretorio) {
    return [
        {
            caption: 'Localização', 
            submenus: [
                {
                    caption: "Cidade",
                    url: `evento/${diretorio}/cidade`,
                    icon: <LocationCity />,
                },
            ],
        },
        {
            caption: "Questionários",
            submenus: [
                {
                    caption: "Escalas de avaliação",
                    url: `evento/${diretorio}/escala-avaliacao`,
                    icon: <LinearScale />,
                },
                {
                    caption: "Perguntas",
                    url: `evento/${diretorio}/pergunta`,
                    icon: <QuestionAnswer />,
                },
                {
                    caption: "Questionários",
                    url: `evento/${diretorio}/questionario`,
                    icon: <Quiz />,
                },
            ],
        },
        {
            caption: "Inscrições",
            submenus: [
                {
                    caption: "Avaliadores",
                    url: `evento/${diretorio}/avaliador`,
                    icon: <AssignmentInd />,
                },
                {
                    caption: "Inscrição de Avaliadores",
                    url: `evento/${diretorio}/inscricao-avaliacao`,
                    icon: <HowToReg />,
                },
            ],
        },
        {
            caption: "Evento",
            submenus: [
                {
                    caption: "Convites a avaliadorers",
                    url: `evento/${diretorio}/convite`,
                    icon: <Send />,
                },
                {
                    caption: "Cronograma",
                    url: `evento/${diretorio}/cronograma`,
                    icon: <EventNote />,
                },
                {
                    caption: "Painel",
                    url: `evento/${diretorio}/painel`,
                    icon: <BarChart />,
                },
                {
                    caption: "Ranking",
                    url: `evento/${diretorio}/ranking`,
                    icon: <Star />,
                },
            ],
        },
        {
            caption: "Projeto",
            submenus: [
                {
                    caption: "Avaliações",
                    url: `evento/${diretorio}/avaliacao`,
                    icon: <AssignmentInd />,
                },
                {
                    caption: "Coorientadores",
                    url: `evento/${diretorio}/membro-instituicao/${TipoMembro.COORIENTADOR}`,
                    icon: <Person />,
                },
                {
                    caption: "Estudantes",
                    url: `evento/${diretorio}/membro-instituicao/${TipoMembro.ESTUDANTE}`,
                    icon: <Person />,
                },
                {
                    caption: "Instituições",
                    url: `evento/${diretorio}/instituicao`,
                    icon: <School />,
                },
                {
                    caption: "Orientadores",
                    url: `evento/${diretorio}/orientador`,
                    icon: <Person />,
                },
                {
                    caption: "Projetos",
                    url: `evento/${diretorio}/projeto`,
                    icon: <Science />,
                },
            ],
        },
    ];
}

export default getMenuUsuario;