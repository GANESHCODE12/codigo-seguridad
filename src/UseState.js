import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });

    //Estados semideclarativos
    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        });
    };

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false,
        });
    };

    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue,
            //error: false,
        });
    };

    const onCheck = () => {
        setState({
            ...state,
            loading: true,
            //error: false,
        });
    };

    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
        });
    };

    const onReset = () => {
        setState({
            ...state,
            deleted: false,
            confirmed:false,
            value: '',
        });
    };

    React.useEffect(() => {
        if (!!state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
                    //Llamado estado Semideclarativo
                    onConfirm();
                } else {
                    onError();
                }
            }, 2000)
        }
    }, [state.loading]);

    if ((!state.deleted && !state.confirmed)) {
        return (
            <div>
                <h2>
                    Eliminar {name}
                </h2>

                <p>
                    Por favor, escribe el código de seguridad.
                </p>

                {(state.error && !state.loading) && (
                    <p>
                        Error: el código es incorrecto
                    </p>
                )}

                {state.loading && (
                    <p>
                        Cargando...
                    </p>
                )}

                <input
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={(event) => {
                        onWrite(event.target.value);                        
                    }}
                />
                <button
                    onClick={() => {
                        onCheck();
                    }}
                >Comprobar</button>
            </div>
        );
    } else if ((!!state.confirmed && !state.deleted)) {
        return (
            <React.Fragment>
                <p>
                    Estas seguro que deseas eliminar el registro?
                </p>

                <button
                    onClick={() => {
                        onDelete();
                    }}
                >
                    Si, eliminar
                </button>
                <button
                    onClick={() => {
                        onReset();
                    }}
                >
                    No, me arrepentí
                </button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>
                    Eliminado con éxito
                </p>
                <button
                    onClick={() => {
                        onReset();
                    }}
                >
                    Resetear, volver atrás
                </button>
            </React.Fragment>
        );
    }
}

export { UseState };