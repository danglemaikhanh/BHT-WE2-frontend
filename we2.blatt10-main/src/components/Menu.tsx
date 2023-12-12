import React from "react";
import { Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LoginDialog from "./LoginDialog";
import { removeJWT } from "../JWTManager";
import { useLoginContext } from "../LoginContext";

export default function Header() {
    const [showLogin, setShowLogin] = React.useState(false);
    const { loginInfo, setLoginInfo } = useLoginContext();
    const handleClose = () => { setShowLogin(false) };
    const handleShow = () => { setShowLogin(true) };
    const onLogout = (e: React.FormEvent) => {
        e.preventDefault();
        setLoginInfo(null);
        removeJWT();
        window.location.href = "/";
    }
    return (
        <React.Fragment>
          <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                WE2-Shopping-App
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarColor03"
                aria-controls="navbarColor03"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav me-auto">
                  {loginInfo && ( // Anzeige bei eingeloggtem Benutzer
                    <><LinkContainer to="/shopper">
                    <Nav.Link>
                      <button type="button" className="btn btn-outline-primary">
                        <h6>Shopper</h6>
                      </button>
                    </Nav.Link>
                  </LinkContainer><LinkContainer to="/prefs">
                      <Nav.Link>
                        <button type="button" className="btn btn-outline-secondary">
                          <h6>Preference</h6>
                        </button>
                      </Nav.Link>
                    </LinkContainer><LinkContainer to="/admin">
                      <Nav.Link>
                        <button type="button" className="btn btn-outline-warning">
                          <h6>Admin</h6>
                        </button>
                      </Nav.Link>
                    </LinkContainer></>
                  )}
                </ul>
                <div className="d-flex">
                  <ul className="navbar-nav ml-auto">
                    {!loginInfo ? ( // Login
                      <React.Fragment>
                        <Nav.Link onClick={handleShow}>
                          <button type="button" className="btn btn-outline-success">
                            <h6>Login</h6>
                          </button>
                        </Nav.Link>
                      </React.Fragment>
                    ) : (
                      // Logout
                      <Nav.Link onClick={onLogout}>
                      <button type="button" className="btn btn-outline-danger">
                        <h6>Logout</h6>
                      </button>
                    </Nav.Link>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          <LoginDialog show={showLogin} close={handleClose} />
        </React.Fragment>
      );
}