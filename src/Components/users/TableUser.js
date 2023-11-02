import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import env from "react-dotenv";

export const TableUser = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [users, setUsers] = useState([]);

    const domain = env.REACT_APP_API_URL;

    const getUsers = async () => {
        try {
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: `https://${domain}/`
                },
            });

            const publicURL = `http://${domain}/user/listar`;

            const response = await fetch(publicURL, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                throw new Error('Erro na requisição');
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getUsers();
    }, [getAccessTokenSilently, user?.sub]);

    const eliminarUsuario = async (id) => {
        try {
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: `https://${domain}/`
                },
            });

            const response = await fetch(`http://${domain}/user/eliminar`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                console.log(`Usuario eliminado correctamente`);
                getUsers(); // Actualiza la lista de usuarios después de eliminar
            } else {
                console.error(`Error al eliminar usuario con ID`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        isAuthenticated && (
            <div className="col col-md-7">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">USERNAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">PASSWORD</th>
                            <th scope="col">ADDRESS</th>
                            <th scope="col" colSpan={2}>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>{user.address}</td>
                                <td><button className="btn btn-outline-warning">EDITAR</button></td>
                                <td><button className="btn btn-outline-danger" onClick={() => eliminarUsuario(user._id)}>ELIMINAR</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    );
}
