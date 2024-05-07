import React from 'react';
import { isAuthenticated } from './api/services/auth';

import { BrowserRouter, Route, Routes, useLocation, Navigate, Outlet } from 'react-router-dom';

import Autenticacao from './paginas/Autenticacao/Autenticacao';
import Home from './paginas/Home/Home';
import Pagina404 from './paginas/Home/Pagina404';
import Menus from './paginas/Home/Menus';
import ContatoConsulta from './paginas/Contato/ContatoConsulta';
import ParentescoListagem from './paginas/Parentesco/ParentescoListagem';
import DocumentoConsulta from './paginas/Documento/DocumentoConsulta';
import ContaUsuario from './paginas/ContaUsuario/ContaUsuario';
import EsqueceuSenha from './paginas/Autenticacao/EsqueceuSenha';
import AvisoSenha from './paginas/Autenticacao/AvisoSenha';
import AlterarSenha from './paginas/ContaUsuario/AlterarSenha';
import AlterarSenhaEsquecida from './paginas/Autenticacao/AlterarSenhaEsquecida';
import AvisoSenhaAlterada from './paginas/Autenticacao/AvisoSenhaAlterada';
import RetiradaBeneficioListagem from './paginas/RetiradaBeneficio/RetiradaBeneficioListagem';
import RetiradaBeneficioView from './paginas/RetiradaBeneficio/RetiradaBeneficioView';
import DocumentoEntradaConferencia from './paginas/DocumentoEntrada/DocumentoEntradaConferencia';
import DocumentoSaidaConferencia from './paginas/DocumentoSaida/DocumentoSaidaConferencia';
import CidadeConsulta from './paginas/Cidade/CidadeConsulta';
import PaisConsulta from './paginas/Pais/PaisConsulta';
import UfConsulta from './paginas/Uf/UfConsulta';
import BairroConsulta from './paginas/Bairro/BairroConsuta';
import LogradouroConsulta from './paginas/Logradouro/LogradouroConsulta';
import PerfilConsulta from './paginas/Perfil/PerfilConsulta';

import FuncaoConsulta from './paginas/Funcao/FuncaoConsulta';
import UnidadeAtendimentoConsulta from './paginas/UnidadeAtendimento/UnidadeAtendimentoConsulta';
import BeneficioConsulta from './paginas/Beneficio/BeneficioConsulta';
import UsuarioConsulta from './paginas/Usuario/UsuarioConsulta';
import TipoMoradiaConsulta from './paginas/TipoMoradia/TipoMoradiaConsulta';
import PessoaConsulta from './paginas/Pessoa/PessoaConsulta';
import ProntuarioConsulta from './paginas/Prontuario/ProntuarioConsulta';
import AtendimentoConsulta from './paginas/Atendimento/AtendimentoConsulta';
import MenuSistemaConsulta from './paginas/MenuSistema/MenuSistemaConsulta';
import TipoLogradouroConsulta from './paginas/TipoLogradouro/TipoLogradouroConsulta';
import FuncionarioConsulta from './paginas/Funcionario/FuncionarioConsulta';
import TipoUnidadeDeAtendimentoConsulta from './paginas/TipoUnidadeDeAtendimento/TipoUnidadeDeAtendimentoConsulta';
import ProgramaDeGovernoConsulta from './paginas/ProgramaDeGoverno/ProgramaDeGovernoConsulta';
import OrgaoExpedidorConsulta from './paginas/OrgaoExpedidor/OrgaoExpedidorConsulta';
import GrupoSocioeducativoConsulta from './paginas/GrupoSocioeducativo/GrupoSocioeducativoConsulta';
import CondicaoDeMoradiaConsulta from './paginas/CondicaoDeMoradia/CondicaoDeMoradiaConsulta';
import EscolaridadeConsulta from './paginas/Escolaridade/EscolaridadeConsulta';
import CondicaoDeTrabalhoConsulta from './paginas/CondicaoDeTrabalho/CondicaoDeTrabalhoConsulta';
import FornecedorConsulta from './paginas/Fornecedor/FornecedorConsulta';
import DocumentoEntradaConsulta from './paginas/DocumentoEntrada/DocumentoEntradaConsulta';
import DocumentoSaidaConsulta from './paginas/DocumentoSaida/DocumentoSaidaConsulta';
import VerificaPass from './paginas/Autenticacao/VerificaPass';

const ProtectedRoute = ({ isAllowed, redirectPath = "/login", children }) => {
    const location = useLocation();

    if (!isAllowed) {
        return <Navigate to={redirectPath} replace state={{ from: location }} />;
    }

    if (children) {
        return children;
    }

    return (
        <Menus><Outlet /></Menus>
    );
};

const Rotas = () => {
    return (
        <BrowserRouter basename="/beneficios">
            <Routes>
                {/* <Route exact path="/" element={<Autenticacao /> } /> */}
                <Route path="/login" element={<Autenticacao />} />
                <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
                <Route path="/aviso-senha" element={<AvisoSenha />} />
                <Route path='/alterar-senha-esquecida/:token' element={<AlterarSenhaEsquecida />} />
                <Route path='/aviso-senha-alterada' element={<AvisoSenhaAlterada />} />
                <Route path="/verifica-pass" element={<VerificaPass />} />
                
                {/* Rotas que exigem autenticação */}
                <Route element={<ProtectedRoute isAllowed={isAuthenticated()} />}>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path='/condicoes-de-trabalho' element={<CondicaoDeTrabalhoConsulta />} />
                    <Route path='/programas-de-governo' element={<ProgramaDeGovernoConsulta />} />
                    <Route path='/contatos' element={<ContatoConsulta />} />
                    <Route path='/orgaos-expedidores' element={<OrgaoExpedidorConsulta />} />
                    <Route path='/parentescos' element={<ParentescoListagem />} />

                    <Route path='/documentos' element={<DocumentoConsulta />} />
                    <Route path='/escolaridades' element={<EscolaridadeConsulta />} />
                    <Route path='/condicoes-de-moradia' element={<CondicaoDeMoradiaConsulta />} />

                    <Route path='/tipos-de-moradia' element={<TipoMoradiaConsulta />} />
                    <Route path='/grupo-socioeducativo' element={<GrupoSocioeducativoConsulta />} />

                    {/* Localização */}
                    <Route path='/cidades' element={<CidadeConsulta />} />

                    <Route path='/pais' element={<PaisConsulta />} />
                    <Route path='/ufs' element={<UfConsulta />} />
                    <Route path='/bairros' element={<BairroConsulta />} />
                    <Route path='/logradouros' element={<LogradouroConsulta />} />
                    <Route path='/tipos-de-logradouros' element={<TipoLogradouroConsulta />} />


                    {/* Telas de Administração */}
                    <Route path='/funcoes' element={<FuncaoConsulta />} />
                    <Route path='/tipos-de-unidades-atendimento' element={<TipoUnidadeDeAtendimentoConsulta />} />
                    <Route path='/funcionarios' element={<FuncionarioConsulta />} />

                    <Route path='/unidades-de-atendimento' element={<UnidadeAtendimentoConsulta />} />
                    <Route path='/menus' element={<MenuSistemaConsulta />} />

                    <Route path="/usuarios" element={<UsuarioConsulta />} />

                    <Route path='/conta-usuario' element={<ContaUsuario />} />

                    <Route path="/perfis" element={<PerfilConsulta />} />
                    <Route path='/alterar-senha' element={<AlterarSenha />} />

                    {/* Telas do prontuario */}
                    <Route path="/pessoas" element={<PessoaConsulta />} />
                    <Route path='/prontuarios' element={<ProntuarioConsulta />} />

                    {/* Telas de atendimento */}
                    <Route path='/atendimentos' element={<AtendimentoConsulta />} />


                    {/* Controle do estoque */}
                    <Route path="/beneficios-eventuais" element={<BeneficioConsulta />} />

                    <Route path='/retirada-de-beneficio' element={<RetiradaBeneficioListagem />} />
                    <Route path='/retirada-de-beneficio-ficha/:itemId/:id/:status' element={<RetiradaBeneficioView />} />
                    <Route path='/fornecedores' element={<FornecedorConsulta />} />

                    <Route path='/documento-entrada' element={<DocumentoEntradaConsulta />} />
                    <Route path='/documento-entrada-conferencia' element={<DocumentoEntradaConferencia />} />

                    <Route path='/documento-saida' element={<DocumentoSaidaConsulta />} />
                    <Route path='/documento-saida-conferencia' element={<DocumentoSaidaConferencia />} />
                </Route>

                <Route path="*" element={<Pagina404 />} />

            </Routes>
            {/* </div>} */}
        </BrowserRouter>
    );
}

export default Rotas;