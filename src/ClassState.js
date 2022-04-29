import React from "react";
import { Loading } from './loading';

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: false,
            loading: false,
        };
    }

    // UNSAFE_componentWillMount() {
    //     console.log("Montando")
    //     Hace validaciones al renderizar por primera vez
    // }

    // componentDidMount() {
    //     console.log("Montado")
    //     Se renderiza cuando se cambia el estado solo una vez
    // }

    //Se renderiza cada vez que modifiquemos el estado la veces que sea necesario
    componentDidUpdate() {
        if(!!this.state.loading) {

            setTimeout(() => {

                if(SECURITY_CODE === this.state.value) {
                    this.setState({error: false, loading: false });
                } else {
                    this.setState({error: true, loading: false});
                }
                
            }, 2000);
        }
    }


    render() {
        return (
            <div> 
                <h2>
                    Eliminar {this.props.name}
                </h2>

                <p>
                    Por favor, escribe el código de seguridad.
                </p>

                {(this.state.error && !this.state.loading) && (
                    <p>
                        Error: el código es incorrecto.
                    </p>
                )}

                {this.state.loading && (
                    <Loading />
                )}

                <input 
                    placeholder="Código de seguridad"
                    value={this.state.value}
                    onChange={(event) => {
                        this.setState({value: event.target.value});
                    }}
                />
                <button
                    onClick={() => 
                        this.setState({ loading: true  })}
                >Comprobar</button>
            </div>
        );
    }
}

export { ClassState };