import React from "react";

import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useGlobalCtx } from "../../CtxAndProvider/CtxAndProvider";
import { useEffect } from "react";

const Header = () => {
  const { isAuthenticated, user, loading, logoutUser } = useGlobalCtx();
  // const { name } = user;

  useEffect(() => {}, [isAuthenticated]);

  return (
    <div>
      <Navbar bg="light" expand="md">
        <Container>
          <NavLink to="/" className="navbar-brand">
            Logo
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {isAuthenticated === true ? (
                <>
                  {user === null ? (
                    <>Loading...</>
                  ) : (
                    <>
                      <NavLink to="/profile" className="nav-link">
                        {user.name}
                      </NavLink>
                    </>
                  )}
                  <NavLink
                    onClick={logoutUser}
                    to="/login"
                    className="nav-link"
                  >
                    Logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
