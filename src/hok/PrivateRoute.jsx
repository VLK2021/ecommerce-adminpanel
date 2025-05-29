import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const accessToken = useSelector((state) => state.auth.accessToken);

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export {PrivateRoute};
