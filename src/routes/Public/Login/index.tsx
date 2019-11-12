import React, {FunctionComponent, useState} from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {requestToken} from "../../../services";
import {SetJwtAction, SET_JWT} from "../../../actions/setJWT";
import "./index.scss"

interface Props {
    destinationURL?: string;
}

const Login: FunctionComponent<Props> = (props) => {

    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState<{name: string, password: string}>({name: "", password: ""});
    const [error, setError] = useState<{err?: Error, msg: string}>({err: undefined, msg: ""});

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/admin" } };


    const login = (credentials: FormData) => {
            requestToken(credentials)
            .then( (auth) => {
                dispatch<SetJwtAction>({
                    type: SET_JWT,
                    payload: {jwt: auth.token},
                });
                history.replace(from);
            })
            .catch( (err: Error) => {
                setError({err, msg: err.message})
            })
    };


    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials( {...credentials, [event.target.name]: event.target.value} )
    }

    const handleSubmit = () => {
        const form = new FormData();
        form.append("name", credentials.name);
        form.append("password", credentials.password);
        login(form);
    }

    return (
        <div className="form-wrapper" data-error={error.err ? true : false}>
            <form>
                <div>
                    <label>
                        Username:
                        <input type="string" placeholder="username" name="name" value={credentials.name} onChange={handleInput}></input>
                    </label>
                </div>

                <div>
                    <label>
                        Pasword:
                        <input type="password" placeholder="password" name="password" value={credentials.password} onChange={handleInput}></input>
                    </label>
                </div>

                <div>
                    <input type="button" value="Login" onClick={handleSubmit}></input>
                </div>
            </form>
        </div>
    )
}

export default Login;
