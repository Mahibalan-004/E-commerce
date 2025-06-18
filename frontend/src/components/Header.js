import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Form,
  FormCheck,
} from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [darkMode, setDarkMode] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.className = darkMode ? 'bg-dark text-white' : 'bg-light text-dark';
  }, [darkMode]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <header>
      <Navbar
        bg={darkMode ? 'dark' : 'light'}
        variant={darkMode ? 'dark' : 'light'}
        expand='lg'
        collapseOnSelect
        className='w-100 px-3'
        style={{ margin: 0 }}
      >
        <Container fluid className='px-0'>
          {/* Back Button */}
          <Nav.Link onClick={() => history.goBack()} className='me-3'>
            <i className='fas fa-arrow-left'></i> Back
          </Nav.Link>

          <Navbar.Brand as={Link} to='/'>FN</Navbar.Brand>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox />
            <Nav className='ml-auto align-items-center'>

              {/* Dark/Light toggle */}
              <Form className='me-2'>
                <FormCheck
                  type='switch'
                  id='custom-switch'
                  label={darkMode ? '🌙' : '☀️'}
                  onChange={toggleDarkMode}
                  checked={darkMode}
                />
              </Form>

              {/* Cart */}
              <Nav.Link as={Link} to='/cart'>
                <i className='fas fa-shopping-cart'></i> Cart{' '}
                {cartItems.length > 0 && (
                  <Badge pill bg='success' className='ms-1'>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>

              {/* User */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item as={Link} to='/profile'>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <i className='fas fa-user'></i> Sign In
                </Nav.Link>
              )}

              {/* Admin */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <NavDropdown.Item as={Link} to='/admin/userlist'>
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/productlist'>
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/orderlist'>
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
