import { useContext } from 'react';
import { UserContext } from '../App';
import { Navigate } from 'react-router-dom';

const Editor = () => {
    const {
        userAuth: { access_token },
        setUserAuth,
    } = useContext(UserContext);

    return <div>{access_token === null ? <Navigate to="/signin" /> : <h1>Hello Publisher</h1>}</div>;
};

export default Editor;
