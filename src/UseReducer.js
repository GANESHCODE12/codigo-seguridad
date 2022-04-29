import React from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
    //La variable actualizadora por convención se denomina dispatch
    const [state, dispatch] = React.useReducer(reducer, initialState);

    //Actualizadores del estado
    const onConfirm = () => dispatch({ type: actionTypes.confirm });
    const onError = () => dispatch({ type: actionTypes.error });
    const onCheck = () => dispatch({ type: actionTypes.check });
    const onDelete = () => dispatch({ type: actionTypes.delete });
    const onReset = () => dispatch({ type: actionTypes.reset });

    //También se puede pasar el parametro como event.target.value,
    // se usa destructuración para no ocupar tantas lineas de código
    const onWrite = ({target: { value }}) => {
        dispatch({ type: actionTypes.write, payload: value });
    }
    

    React.useEffect(() => {
        if (!!state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
                    //Llamado de los actualizadores del estado
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
                    onChange={onWrite}
                />
                <button
                    onClick={onCheck}>
                Comprobar
                </button>
            </div>
        );
    } else if ((!!state.confirmed && !state.deleted)) {
        return (
            <React.Fragment>
                <p>
                    Estas seguro que deseas eliminar el registro?
                </p>

                <button
                    onClick={onDelete}>
                    Si, eliminar
                </button>
                <button onClick={onReset}>
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
                <button onClick={onReset}>
                    Resetear, volver atrás
                </button>
            </React.Fragment>
        );
    }
}

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'Error',
    write: 'WRITE',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET',
};

const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.write]: {
        ...state,
        value: payload
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true,
    },
    [actionTypes.reset]: {
        ...state,
        deleted: false,
        confirmed: false,
        value: '',
    },
})

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return {
            ...state,
        }
    }
}

export { UseReducer };