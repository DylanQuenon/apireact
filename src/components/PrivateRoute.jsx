import { Navigate} from'react-router-dom'
const PrivateRoute = (props) => {
    return props.isAuthenticated ? (
        props.children
    ):(
        <Navigate to="/login" replace={true} />
    )
}
 
export default PrivateRoute;