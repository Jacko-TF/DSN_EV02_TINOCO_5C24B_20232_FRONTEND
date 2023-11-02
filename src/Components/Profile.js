import React, {useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import env from "react-dotenv";

export const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [message, setMessage] = useState(null);

  const domain = env.REACT_APP_API_URL;

  useEffect(() => {
    const getPublicURL = async () => {
  
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/`,
            scope: "read:messages",
          },
        });

        const publicURL = `http://${domain}/api/private`;
  
        const metadataResponse = await fetch(publicURL, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const { message }  = await metadataResponse.json();
  
        setMessage(message)

      } catch (e) {
        console.log(e.message);
      }
    };
  
    getPublicURL();
  }, [getAccessTokenSilently, user?.sub]);
  
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    
      <div className="col col-md-5">
        {isAuthenticated && (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{message}</p>
          </div>
        )}{!isAuthenticated && (
          <div>
            <h2>Logueate</h2>
          </div>
        )}
      </div>
    );
};