import Swal from 'sweetalert2';
import './sweetalert2.css';

export const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
    },
    buttonsStyling: true,
});


export const deleteModalMessage = (value, actionperformed, callback) => {
    swalWithBootstrapButtons.fire({
        title: `Certeza que deseja excluir o registro ${value}?`,
        text: "Você não poderá reverter essa operação!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, exclua!',
        cancelButtonText: 'Não. Cancele a operação!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            actionperformed()
                .then((resp) => {
                    if ('status' in resp && resp.status === 400) {
                        swalWithBootstrapButtons.fire(
                            'Ooops!',
                            resp.data.error,
                            'error'
                        );
                    } else {
                        swalWithBootstrapButtons.fire(
                            'Excluído!',
                            `O registro ${value} foi excluído.`,
                            'success'
                        );
                        callback();
                    }
                })
                .catch((error) => {
                    swalWithBootstrapButtons.fire(
                        'Ooops!',
                        `Não foi possível excluir o registro ${value} porque existem dependências relacionadas a ele.`,
                        'error'
                    );
                });

        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                `A operação foi cancelada e o registro ${value} está seguro ;)`,
                'error'
            )
        }
    });
}

export const saveModalMessage = (actionperformed, callback) => {
    const props = {
        title: 'Deseja salvar as alterações?',
        confirmText: 'Salvar',
        denyText: 'Não salvar',
        successResponseText: 'As alterações foram salvas!',
        denyResponseText: 'As informações não foram salvas',
        errorResponseText: `Não foi possível salvar as alterações. Entre em contato com o administrador do sistema informando a seguinte mensagem: `,
    };
    saveModalMessageProps(props, actionperformed, callback);
}

export const importModalMessage = (actionPerformed, callback) => {
    const props = {
        title: 'Confirmar a importação?',
        confirmText: 'Importar',
        denyText: 'Não importar',
        successResponseText: 'A importação foi realizada!',
        denyResponseText: 'A importação não foi realizada',
        errorResponseText: `Não foi possível realizar a importação solicitada. Entre em contato com o administrador do sistema`,
    };
    saveModalMessageProps(props, actionPerformed, callback);
}

export const showErrorMessages = (data) => {
    if (data.hasOwnProperty('data') && Array.isArray(data.data)) {
        data = data.data;
    }

    if (Array.isArray(data) && data.length > 0) {
        let html = "<ul>";
        data.map((err, key) => {
            html += `<li><span><b>Campo:</b> </span> ${err.campo} - <span style='color: red;'>${err.erro}</span></li>`;
            return err;
        });
        html += "</ul>"

        Swal.fire(
            'Alguns campos não foram preenchidos',
            html,
            'info'
        );
        return true;
    } else if ((data.hasOwnProperty('status') && data.status === 400) &&
        (data.hasOwnProperty('data')
            //&& data.data.hasOwnProperty('statusCode') && data.data.statusCode === 'UNAUTHORIZED'
        )) {
        swalWithBootstrapButtons.fire(
            'Ooops!',
            data.data.error,
            'info'
        );
        return true;
    } else if (data.hasOwnProperty('status') && data.status === 400) {
        swalWithBootstrapButtons.fire(
            'Ooops!',
            data.error,
            'info'
        );
        return true;
    }
    return false;
}

export const saveModalMessageProps = (props, executePromise, callback) => {
    const { title, confirmText, denyText,
        successResponseText, denyResponseText, errorResponseText } = props;
    Swal.fire({
        customClass: {
            container: 'my-swal'
        },
        title: title,
        showDenyButton: true,
        confirmButtonText: confirmText,
        denyButtonText: denyText,
    }).then((result) => {
        if (result.isConfirmed) {
            executePromise()
                .then((response) => {
                    const data = response.data;
                    if (!showErrorMessages(data)) {
                        Swal.fire(successResponseText, '', 'success');
                        callback(data);
                    }
                })
                .catch((error) => {
                    swalWithBootstrapButtons.fire('Ooops!', `${errorResponseText} ${error.message}`, 'error');
                });

        } else if (result.isDenied) {
            Swal.fire(denyResponseText, '', 'info')
        }
    });
}

export const addModalMessage = (actionperformed, callback) => {
    const props = {
        title: 'Deseja adicionar o item?',
        confirmText: 'Adicionar',
        denyText: 'Cancelar',
        successResponseText: 'Adição realizada!',
        denyResponseText: 'As informações não foram adicionadas',
        errorResponseText: `Não foi possível adicionar o item. Entre em contato com o administrador do sistema!`,
    };
    saveModalMessageProps(props, actionperformed, callback);
}

export const ativacaoModalMessage = (mensagem, status, actionperformed, callback) => {
    swalWithBootstrapButtons.fire({
        customClass: {
            container: 'my-swal'
        },
        title: mensagem,
        text: "Você não poderá reverter essa operação!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `Sim${status !== '' ? ", " + status : ""}!`,
        cancelButtonText: `Não${status !== '' ? " " + status : ""}!`,
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            actionperformed()
                .then((response) => {
                    const data = response.data;
                    if (!showErrorMessages(data)) {
                        swalWithBootstrapButtons.fire(
                            'Alterado!',
                            `O status ${status} foi modificado.`,
                            'success'
                        );
                        callback(data);
                    }
                })
                .catch((error) => {
                    swalWithBootstrapButtons.fire(
                        'Ooops!',
                        `Não foi possível alterar para o ${status}.`,
                        'error'
                    );
                });

        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                `A operação foi cancelada e o Status foi mantido. ;)`,
                'error'
            )
        }
    });
}

export const ativacaoModalMessageComInput = (mensagem, status, actionperformed, callback) => {
    Swal.fire({
        title: mensagem,
        text: "Você não poderá reverter essa operação!",
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: `Confirmar`,
        cancelButtonText: `Cancelar`,
        showLoaderOnConfirm: true,
        preConfirm: (observacao) => {
            return observacao;
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            actionperformed()
                .then((response) => {
                    const data = response.data;
                    swalWithBootstrapButtons.fire(
                        'Alterado!',
                        `O status ${status} foi modificado.`,
                        'success'
                    );
                    callback(data);
                })
                .catch((error) => {
                    swalWithBootstrapButtons.fire(
                        'Ooops!',
                        `Não foi possível ${status}.`,
                        'error'
                    );
                });

        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                `A operação foi cancelada e o Status foi mantido. ;)`,
                'error'
            )
        }
    });
}