import React from 'react';
import { isAuthenticated } from './api/services/auth';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Autenticacao from './paginas/Autenticacao/Autenticacao';
import Home from './paginas/Home/Home';
import Pagina404 from './paginas/Home/Pagina404';
import Menus from './paginas/Home/Menus';
import UsuarioListagem from './paginas/Usuario/UsuarioListagem';
import UsuarioCadastro from './paginas/Usuario/UsuarioCadastro';
import PerfilListagem from './paginas/Perfil/PerfilListagem';
import PerfilCadastro from './paginas/Perfil/PerfilCadastro';
import BeneficioListagem from './paginas/Beneficio/BeneficioListagem';
import BeneficioCadastro from './paginas/Beneficio/BeneficioCadastro';
import CondicaoDeTrabalhoListagem from './paginas/CondicaoDeTrabalho/CondicaoDeTrabalhoListagem';
import CondicaoDeTrabalhoCadastro from './paginas/CondicaoDeTrabalho/CondicaoDeTrabalhoCadastro';
import ProgramaDeGovernoListagem from './paginas/ProgramaDeGoverno/ProgramaDeGovernoListagem';
import ProgramaDeGovernoCadastro from './paginas/ProgramaDeGoverno/ProgramaDeGovernoCadastro';
import ContatoListagem from './paginas/Contato/ContatoListagem';
import ContatoCadastro from './paginas/Contato/ContatoCadastro';
import OrgaoExpedidorListagem from './paginas/OrgaoExpedidor/OrgaoExpedidorListagem';
import OrgaoExpedidorCadastro from './paginas/OrgaoExpedidor/OrgaoExpedidorCadastro';
import ParentescoListagem from './paginas/Parentesco/ParentescoListagem';
import ParentescoCadastro from './paginas/Parentesco/ParentescoCadastro';
import DocumentoListagem from './paginas/Documento/DocumentoListagem';
import DocumentoCadastro from './paginas/Documento/DocumentoCadastro';
import EscolaridadeListagem from './paginas/Escolaridade/EscolaridadeListagem';
import EscolaridadeCadastro from './paginas/Escolaridade/EscolaridadeCadastro';
import CondicaoDeMoradiaListagem from './paginas/CondicaoDeMoradia/CondicaoDeMoradiaListagem';
import CondicaoDeMoradiaCadastro from './paginas/CondicaoDeMoradia/CondicaoDeMoradiaCadastro';

import AtendimentoListagem from './paginas/Atendimento/AtendimentoListagem';
import FuncaoListagem from './paginas/Funcao/FuncaoListagem';
import FuncaoCadastro from './paginas/Funcao/FuncaoCadastro';
import FuncionarioListagem from './paginas/Funcionario/FuncionarioListagem';
import FuncionarioCadastro from './paginas/Funcionario/FuncionarioCadastro';
import MoradiaComponent from './components/Moradia/MoradiaComponent';
import TipoUnidadeDeAtendimentoCadastro from './paginas/TipoUnidadeDeAtendimento/TipoUnidadeDeAtendimentoCadastro';
import TipoUnidadeDeAtendimentoListagem from './paginas/TipoUnidadeDeAtendimento/TipoUnidadeDeAtendimentoListagem';
import UnidadeAtendimentoListagem from './paginas/UnidadeAtendimento/UnidadeAtendimentoListagem';
import UnidadeAtendimentoCadastro from './paginas/UnidadeAtendimento/UnidadeAtendimentoCadastro';
import TipoMoradiaListagem from './paginas/TipoMoradia/TipoMoradiaListagem';
import TipoMoradiaCadastro from './paginas/TipoMoradia/TipoMoradiaCadastro';
import GrupoSocioeducativoListagem from './paginas/GrupoSocioeducativo/GrupoSocioeducativoListagem';
import GrupoSocioeducativoCadastro from './paginas/GrupoSocioeducativo/GrupoSocioeducativoCadastro';
import ContaUsuario from './paginas/ContaUsuario/ContaUsuario';
import EsqueceuSenha from './paginas/Autenticacao/EsqueceuSenha';
import AvisoSenha from './paginas/Autenticacao/AvisoSenha';
import AlterarSenha from './paginas/ContaUsuario/AlterarSenha';
import AlterarSenhaEsquecida from './paginas/Autenticacao/AlterarSenhaEsquecida';
import AvisoSenhaAlterada from './paginas/Autenticacao/AvisoSenhaAlterada';
import ProntuarioListagem from './paginas/Prontuario/ProntuarioListagem';
import ProntuarioCadastro from './paginas/Prontuario/ProntuarioCadastro';
import PessoaListagem from './paginas/Pessoa/PessoaListagem';
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
import CidadeListagem from './paginas/Cidade/CidadeListagem';
import CidadeForm from './paginas/Cidade/CidadeForm';
import PaisConsulta from './paginas/Pais/PaisConsulta';
import UfConsulta from './paginas/Uf/UfConsulta';
import BairroConsulta from './paginas/Bairro/BairroConsuta';
import LogradouroConsulta from './paginas/Logradouro/LogradouroConsulta';

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
                <PrivateRoute path='/contato' component={ContatoListagem} />
                <PrivateRoute path='/contato-ficha/:id/:status' component={ContatoCadastro} />
                <PrivateRoute path='/orgaos-expedidores' component={OrgaoExpedidorListagem} />
                <PrivateRoute path='/orgaos-expedidores-ficha/:id/:status' component={OrgaoExpedidorCadastro} />
                <PrivateRoute path='/parentescos' component={ParentescoListagem} />
                <PrivateRoute path='/parentescos-ficha/:id/:status' component={ParentescoCadastro} />
                <PrivateRoute path='/documentos' component={DocumentoListagem} />
                <PrivateRoute path='/documentos-ficha/:id/:status' component={DocumentoCadastro} />
                <PrivateRoute path='/escolaridades' component={EscolaridadeListagem} />
                <PrivateRoute path='/escolaridades-ficha/:id/:status' component={EscolaridadeCadastro} />
                <PrivateRoute path='/condicoes-de-moradia' component={CondicaoDeMoradiaListagem} />
                <PrivateRoute path='/condicoes-de-moradia-ficha/:id/:status' component={CondicaoDeMoradiaCadastro} />
                <PrivateRoute path='/tipos-de-moradia' component={TipoMoradiaListagem} />
                <PrivateRoute path='/tipos-de-moradia-ficha/:id/:status' component={TipoMoradiaCadastro} />
                <PrivateRoute path='/grupo-socioeducativo' component={GrupoSocioeducativoListagem} />
                <PrivateRoute path='/grupo-socioeducativo-ficha/:id/:status' component={GrupoSocioeducativoCadastro} />

                {/* Localização */}
                <PrivateRoute path='/cidades' component={CidadeListagem} />
                <PrivateRoute path='/cidades-ficha/:id/:status' component={CidadeForm} />
                <PrivateRoute path='/pais' component={PaisConsulta} />
                <PrivateRoute path='/uf' component={UfConsulta} />
                <PrivateRoute path='/bairro' component={BairroConsulta} />
                <PrivateRoute path='/logradouro' component={LogradouroConsulta} />
                

                {/* Telas de Administração */}
                <PrivateRoute path='/funcoes' component={FuncaoListagem} />
                <PrivateRoute path='/funcao-ficha/:id/:status' component={FuncaoCadastro} />
                <PrivateRoute path='/tipos-de-unidades-atendimento' component={TipoUnidadeDeAtendimentoListagem} />
                <PrivateRoute path='/tipos-de-unidades-atendimento-ficha/:id/:status' component={TipoUnidadeDeAtendimentoCadastro} />
                <PrivateRoute path='/funcionarios' component={FuncionarioListagem} />
                <PrivateRoute path='/funcionario-ficha/:id/:status' component={FuncionarioCadastro} />
                <PrivateRoute path='/unidades-de-atendimento' component={UnidadeAtendimentoListagem} />
                <PrivateRoute path='/unidade-de-atendimento-ficha/:id/:status' component={UnidadeAtendimentoCadastro} />

                <PrivateRoute path="/usuarios" component={UsuarioListagem} />
                <PrivateRoute path='/usuarios-ficha/:id/:status' component={UsuarioCadastro} />
                <PrivateRoute path='/conta-usuario' component={ContaUsuario} />

                <PrivateRoute path="/perfis" component={PerfilListagem} />
                <PrivateRoute path='/perfis-ficha/:id/:status' component={PerfilCadastro} />
                <PrivateRoute path='/alterar-senha' component={AlterarSenha} />
                <PrivateRoute path="/config-moradia" component={MoradiaComponent} />

                {/* Telas do prontuario */}
                <PrivateRoute path="/pessoas" component={PessoaListagem} />
                <PrivateRoute path="/analise-prontuario" component={ProntuarioAnaliseListagem} />
                <PrivateRoute path='/prontuarios' component={ProntuarioListagem} />
                <PrivateRoute path='/prontuarios-ficha/:id/:status' component={ProntuarioCadastro} />


                {/* Telas de atendimento */}
                <PrivateRoute path='/atendimento' component={AtendimentoListagem} />
                <PrivateRoute path='/analise-atendimento' component={AnaliseListagem} />
                <PrivateRoute path='/analise-atendimento-ficha/:id/:status' component={AnaliseCadastro} />


                {/* Controle do estoque */}
                <PrivateRoute path="/beneficios-eventuais" component={BeneficioListagem} />
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