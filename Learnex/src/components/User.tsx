
import { useAuth } from '../context/AuthContext';
const User = () => {
    const { user } = useAuth();
    console.log(user)
    return (
        <div> hello {user}</div>
    )
}

export default User
