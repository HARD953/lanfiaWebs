import { Navigate, Outlet, useLocation} from 'react-router-dom';


const ProtectedRoute = ({ isAllowed, redirectPath = '/sign_in', children,  }) => {
  const location = useLocation()

    if (!isAllowed) {
      return <Navigate to={redirectPath} state={{from:location}} replace />;
    }
  
    return children ? children : <Outlet />;
  };

export default ProtectedRoute;