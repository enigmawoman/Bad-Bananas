import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  

  return (
    <>
      <Navbar className="bg-white variant-dark expand-lg text-black">
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            BAD BANANAS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/'>
                SEARCH FOR MOVIES
              </Nav.Link>
              {/* if user is logged in show saved movies and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/saved'>
                    See Your WatchList
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>LOGOUT</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>LOGIN/SIGNUP</Nav.Link>
                
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container
         defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link style={{backgroundColor:"#6D4C41", borderWidth:"5px"}} 
                      activeStyle={{backgroundColor:"black"}}
                  eventKey='login'>LOGIN</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link style={{backgroundColor:"#6D4C41", marginLeft:"5px"}}eventKey='signup'>SIGNUP</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
