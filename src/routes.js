import React from 'react';
import { isAuthenticated } from './api/services/auth';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

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
import FornecedorListagem from './paginas/Fornecedor/FornecedorListagem';
import FornecedorCadastro from './paginas/Fornecedor/FornecedorCadastro';
import DocumentoEntradaListagem from './paginas/DocumentoEntrada/DocumentoEntradaListagem';
import DocumentoEntradaCadastro from './paginas/DocumentoEntrada/DocumentoEntradaCadastro';
import DocumentoEntradaConferencia from './paginas/DocumentoEntrada/DocumentoEntradaConferencia';
import DocumentoSaidaListagem from './paginas/DocumentoSaida/DocumentoSaidaListagem';
import DocumentoSaidaCadastro from './paginas/DocumentoSaida/DocumentoSaidaCadastro';
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

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <React.Fragment>
                    <Menus>
                        <Component {...props} />
                    </Menus>
                </React.Fragment>
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )
        }
    />
)

const Routes = () => {    
    return (
        <BrowserRouter>
            <Switch>
                {/* <Route exact path="/" component={Autenticacao} /> */}
                <Route path="/login" component={Autenticacao} />
                <Route path="/esqueceu-senha" component={EsqueceuSenha} />
                <Route path="/aviso-senha" component={AvisoSenha} />
                <Route path='/alterar-senha-esquecida/:token' component={AlterarSenhaEsquecida} />
                <Route path='/aviso-senha-alterada' component={AvisoSenhaAlterada} />

                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path='/condicoes-de-trabalho' component={CondicaoDeTrabalhoConsulta} />
                <PrivateRoute path='/programas-de-governo' component={ProgramaDeGovernoConsulta} />
                <PrivateRoute path='/contatos' component={ContatoConsulta} />
                <PrivateRoute path='/orgaos-expedidores' component={OrgaoExpedidorConsulta} />
                <PrivateRoute path='/parentescos' component={ParentescoListagem} />
                
                <PrivateRoute path='/documentos' component={DocumentoConsulta} />
                <PrivateRoute path='/escolaridades' component={EscolaridadeConsulta} />
                <PrivateRoute path='/condicoes-de-moradia' component={CondicaoDeMoradiaConsulta} />
                
                <PrivateRoute path='/tipos-de-moradia' component={TipoMoradiaConsulta} />
                <PrivateRoute path='/grupo-socioeducativo' component={GrupoSocioeducativoConsulta} />

                {/* Localização */}
                <PrivateRoute path='/cidades' component={CidadeConsulta} />
                
                <PrivateRoute path='/pais' component={PaisConsulta} />
                <PrivateRoute path='/ufs' component={UfConsulta} />
                <PrivateRoute path='/bairros' component={BairroConsulta} />
                <PrivateRoute path='/logradouros' component={LogradouroConsulta} />
                <PrivateRoute path='/tipos-de-logradouros' component={TipoLogradouroConsulta} />
                

                {/* Telas de Administração */}
                <PrivateRoute path='/funcoes' component={FuncaoConsulta} />
                <PrivateRoute path='/tipos-de-unidades-atendimento' component={TipoUnidadeDeAtendimentoConsulta} />
                <PrivateRoute path='/funcionarios' component={FuncionarioConsulta} />
                
                <PrivateRoute path='/unidades-de-atendimento' component={UnidadeAtendimentoConsulta} />
                <PrivateRoute path='/menus' component={MenuSistemaConsulta} />

                <PrivateRoute path="/usuarios" component={UsuarioConsulta} />
        
                <PrivateRoute path='/conta-usuario' component={ContaUsuario} />

                <PrivateRoute path="/perfis" component={PerfilConsulta} />
                <PrivateRoute path='/alterar-senha' component={AlterarSenha} />

                {/* Telas do prontuario */}
                <PrivateRoute path="/pessoas" component={PessoaConsulta} />
                <PrivateRoute path='/prontuarios' component={ProntuarioConsulta} />

                {/* Telas de atendimento */}
                <PrivateRoute path='/atendimentos' component={AtendimentoConsulta} />


                {/* Controle do estoque */}
                <PrivateRoute path="/beneficios-eventuais" component={BeneficioConsulta} />

                <PrivateRoute path='/retirada-de-beneficio' component={RetiradaBeneficioListagem} />
                <PrivateRoute path='/retirada-de-beneficio-ficha/:itemId/:id/:status' component={RetiradaBeneficioView} />
                <PrivateRoute path='/fornecedores' component={FornecedorListagem} />
                <PrivateRoute path='/fornecedores-ficha/:id/:status' component={FornecedorCadastro} />

                <PrivateRoute path='/documento-entrada' component={DocumentoEntradaListagem} />
                <PrivateRoute path='/documento-entrada-ficha/:id/:status' component={DocumentoEntradaCadastro} />
                <PrivateRoute path='/documento-entrada-conferencia' component={DocumentoEntradaConferencia} />

                <PrivateRoute path='/documento-saida' component={DocumentoSaidaListagem} />
                <PrivateRoute path='/documento-saida-ficha/:id/:status' component={DocumentoSaidaCadastro} />
                <PrivateRoute path='/documento-saida-conferencia' component={DocumentoSaidaConferencia} />

                <Route path="*" component={Pagina404} />

            </Switch>
            {/* </div>} */}
        </BrowserRouter>
    );
}

export default Routes;