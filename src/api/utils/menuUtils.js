
export const emptyPerfilMenu = {
    escrever: false,
    id: 0,
    ler: false,
    nome: "",
    remotePath: "",
    remover: false,
    tipo: ""
}

export const getMenuPerfilByUrl = (perfis, url) => {
    const l = perfis.map(perfil => ({
        ...perfil,
        menus: perfil.menus.filter(menu => menu.remotePath === url)
    }));
    
    return l[0].menus[0];
}