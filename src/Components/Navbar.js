import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();

    const { logout } = useAuth0();

    return (
        <header className="border-bottom lh-1 py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-4 text-center">
              {isAuthenticated &&(
                <a className="blog-header-logo text-body-emphasis text-decoration-none">Bienvenido {user.name}</a>
              )}
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              {isAuthenticated &&(
                <a className="btn btn-sm btn-outline-secondary" onClick={() => logout({ returnTo: window.location.origin })}>
                Logout
              </a>
              )}{!isAuthenticated&&(
                <a  className="btn btn-sm btn-outline-secondary" onClick={() => loginWithRedirect()}>
                  Login
                </a>
              )}
            </div>
          </div>
        </header>
        );
}; 