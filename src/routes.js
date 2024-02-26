import React from 'react';
import { isAuthenticated } from './api/services/auth';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Autenticacao from './paginas/Autenticacao/Autenticacao';
import Home from './paginas/Home/Home';
import Pagina404 from './paginas/Home/Pagina404';
import Menus from './paginas/Home/Menus';
import UsuarioCadastro from './paginas/Usuario/UsuarioCadastro';
import BeneficioCadastro from './paginas/Beneficio/BeneficioCadastro';
import CondicaoDeTrabalhoListagem from './paginas/CondicaoDeTrabalho/CondicaoDeTrabalhoListagem';
import CondicaoDeTrabalhoCadastro from './paginas/CondicaoDeTrabalho/CondicaoDeTrabalhoCadastro';
import ProgramaDeGovernoListagem from './paginas/ProgramaDeGoverno/ProgramaDeGovernoListagem';
import ProgramaDeGovernoCadastro from './paginas/ProgramaDeGoverno/ProgramaDeGovernoCadastro';
import ContatoConsulta from './paginas/Contato/ContatoConsulta';
import ContatoCadastro from './paginas/Contato/ContatoCadastro';
import OrgaoExpedidorListagem from './paginas/OrgaoExpedidor/OrgaoExpedidorListagem';
import OrgaoExpedidorCadastro from './paginas/OrgaoExpedidor/OrgaoExpedidorCadastro';
import ParentescoListagem from './paginas/Parentesco/ParentescoListagem';

import DocumentoConsulta from './paginas/Documento/DocumentoConsulta';
import DocumentoCadastro from './paginas/Documento/DocumentoCadastro';
import EscolaridadeListagem from './paginas/Escolaridade/EscolaridadeListagem';
import EscolaridadeCadastro from './paginas/Escolaridade/EscolaridadeCadastro';
import CondicaoDeMoradiaListagem from './paginas/CondicaoDeMoradia/CondicaoDeMoradiaListagem';
import CondicaoDeMoradiaCadastro from './paginas/CondicaoDeMoradia/CondicaoDeMoradiaCadastro';

import AtendimentoListagem from './paginas/Atendimento/AtendimentoListagem';
import FuncionarioListagem from './paginas/Funcionario/FuncionarioListagem';
import FuncionarioCadastro from './paginas/Funcionario/FuncionarioCadastro';
import MoradiaComponent from './components/Moradia/MoradiaComponent';
import TipoUnidadeDeAtendimentoCadastro from './paginas/TipoUnidadeDeAtendimento/TipoUnidadeDeAtendimentoCadastro';
import TipoUnidadeDeAtendimentoListagem from './paginas/TipoUnidadeDeAtendimento/TipoUnidadeDeAtendimentoListagem';
import TipoMoradiaCadastro from './paginas/TipoMoradia/TipoMoradiaCadastro';
import GrupoSocioeducativoListagem from './paginas/GrupoSocioeducativo/GrupoSocioeducativoListagem';
import GrupoSocioeducativoCadastro from './paginas/GrupoSocioeducativo/GrupoSocioeducativoCadastro';
import ContaUsuario from './paginas/ContaUsuario/ContaUsuario';
import EsqueceuSenha from './paginas/Autenticacao/EsqueceuSenha';
import AvisoSenha from './paginas/Autenticacao/AvisoSenha';
import AlterarSenha from './paginas/ContaUsuario/AlterarSenha';
import AlterarSenhaEsquecida from './paginas/Autenticacao/AlterarSenhaEsquecida';
import AvisoSenhaAlterada from './paginas/Autenticacao/AvisoSenhaAlterada';
import ProntuarioAnaliseListagem from './paginas/Prontuario/Analise/ProntuarioAnaliseListagem';
import AnaliseListagem from './paginas/Analise/AnaliseListagem';
import AnaliseCadastro from './paginas/Analise/AnaliseCadastro';
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
                <PrivateRoute path='/condicoes-de-trabalho' component={CondicaoDeTrabalhoListagem} />
                <PrivateRoute path='/condicoes-de-trabalho-ficha/:id/:status' component={CondicaoDeTrabalhoCadastro} />
                <PrivateRoute path='/programas-de-governo' component={ProgramaDeGovernoListagem} />
                <PrivateRoute path='/programas-de-governo-ficha/:id/:status' component={ProgramaDeGovernoCadastro} />
                <PrivateRoute path='/contato' component={ContatoConsulta} />
                <PrivateRoute path='/contato-ficha/:id/:status' component={ContatoCadastro} />
                <PrivateRoute path='/orgaos-expedidores' component={OrgaoExpedidorListagem} />
                <PrivateRoute path='/orgaos-expedidores-ficha/:id/:status' component={OrgaoExpedidorCadastro} />
                <PrivateRoute path='/parentescos' component={ParentescoListagem} />
                
                <PrivateRoute path='/documentos' component={DocumentoConsulta} />
                <PrivateRoute path='/documentos-ficha/:id/:status' component={DocumentoCadastro} />
                <PrivateRoute path='/escolaridades' component={EscolaridadeListagem} />
                <PrivateRoute path='/escolaridades-ficha/:id/:status' component={EscolaridadeCadastro} />
                <PrivateRoute path='/condicoes-de-moradia' component={CondicaoDeMoradiaListagem} />
                <PrivateRoute path='/condicoes-de-moradia-ficha/:id/:status' component={CondicaoDeMoradiaCadastro} />
                <PrivateRoute path='/tipos-de-moradia' component={TipoMoradiaConsulta} />
                <PrivateRoute path='/tipos-de-moradia-ficha/:id/:status' component={TipoMoradiaCadastro} />
                <PrivateRoute path='/grupo-socioeducativo' component={GrupoSocioeducativoListagem} />
                <PrivateRoute path='/grupo-socioeducativo-ficha/:id/:status' component={GrupoSocioeducativoCadastro} />

                {/* Localização */}
                <PrivateRoute path='/cidades' component={CidadeConsulta} />
                
                <PrivateRoute path='/pais' component={PaisConsulta} />
                <PrivateRoute path='/uf' component={UfConsulta} />
                <PrivateRoute path='/bairro' component={BairroConsulta} />
                <PrivateRoute path='/logradouro' component={LogradouroConsulta} />
                

                {/* Telas de Administração */}
                <PrivateRoute path='/funcoes' component={FuncaoConsulta} />
                <PrivateRoute path='/tipos-de-unidades-atendimento' component={TipoUnidadeDeAtendimentoListagem} />
                <PrivateRoute path='/tipos-de-unidades-atendimento-ficha/:id/:status' component={TipoUnidadeDeAtendimentoCadastro} />
                <PrivateRoute path='/funcionarios' component={FuncionarioListagem} />
                <PrivateRoute path='/funcionario-ficha/:id/:status' component={FuncionarioCadastro} />
                <PrivateRoute path='/unidades-de-atendimento' component={UnidadeAtendimentoConsulta} />

                <PrivateRoute path="/usuarios" component={UsuarioConsulta} />
                <PrivateRoute path='/usuarios-ficha/:id/:status' component={UsuarioCadastro} />
                <PrivateRoute path='/conta-usuario' component={ContaUsuario} />

                <PrivateRoute path="/perfis" component={PerfilConsulta} />
                <PrivateRoute path='/alterar-senha' component={AlterarSenha} />
                <PrivateRoute path="/config-moradia" component={MoradiaComponent} />

                {/* Telas do prontuario */}
                <PrivateRoute path="/pessoas" component={PessoaConsulta} />
                <PrivateRoute path="/analise-prontuario" component={ProntuarioAnaliseListagem} />
                <PrivateRoute path='/prontuarios' component={ProntuarioConsulta} />

                {/* Telas de atendimento */}
                <PrivateRoute path='/atendimento' component={AtendimentoListagem} />
                <PrivateRoute path='/analise-atendimento' component={AnaliseListagem} />
                <PrivateRoute path='/analise-atendimento-ficha/:id/:status' component={AnaliseCadastro} />


                {/* Controle do estoque */}
                <PrivateRoute path="/beneficios-eventuais" component={BeneficioConsulta} />
                <PrivateRoute path='/beneficios-eventuais-ficha/:id/:status' component={BeneficioCadastro} />

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