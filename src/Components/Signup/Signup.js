import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
  
    try {
        const firebaseResponse = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvTNkajFcyatpcA2-ZgIImDtbN7Y614Vw ', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, returnSecureToken: true }),
        });
      
        const firebaseData = await firebaseResponse.json();
      
        if (!firebaseResponse.ok) {
          throw new Error(firebaseData.error.message || 'Signup failed');
        }
      
        console.log('User has successfully signed up');

        
      
        const crudResponse = await fetch('https://crudcrud.com/api/e81241ec3fe54f19992e2a6d0f85fd7f/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, firebaseUserId: firebaseData.localId }), 
        });
      
        if (!crudResponse.ok) {
          throw new Error('Failed to store user data');
        }
      
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
        alert('Signup successful!');
      } catch (error) {
        console.error('Error during signup:', error);
        setErrorMessage(error.message || 'Signup failed. Please try again later.');
      }
      
      
  };
  

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
          <p>
        Have an account? <Link to="/login">Login</Link>
      </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
