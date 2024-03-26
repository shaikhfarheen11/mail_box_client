import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Signup from './Signup';


global.fetch = jest.fn();

describe('Signup API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns success message for valid signup', async () => {

    fetch.mockResolvedValueOnce({
      json: async () => ({ localId: 'userId123' }),
      status: 200,
      ok: true,
    });
    fetch.mockResolvedValueOnce({
      status: 200,
      ok: true,
    });
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    const response = await handleSubmit(userData);
    expect(response).toEqual('Signup successful!');
  });

describe('Signup API', () => {
  test('returns success message for valid signup', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ localId: 'userId123' }), 
      status: 200, 
      ok: true,
    });
    
    fetch.mockResolvedValueOnce({
      status: 200,
      ok: true,
    });

    const userData = {
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    const response = await handleSubmit(userData);
    expect(response).toEqual('Signup successful!');
  });

  test('returns error message for invalid signup with empty fields', async () => {
  
    const userData = {
      email: '',
      password: '',
      confirmPassword: '',
    };

    const response = await handleSubmit(userData);
    expect(response).toEqual('Please fill in all fields');
  });

  test('returns error message for invalid signup with passwords that do not match', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password456',
    };
    const response = await handleSubmit(userData);

    expect(response).toEqual('Passwords do not match');
  });
});
});

const handleSubmit = async (userData) => {
  const { email, password, confirmPassword } = userData;

  if (!email || !password || !confirmPassword) {
    return 'Please fill in all fields';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }

  try {
    // Mocking Firebase response
    const firebaseResponse = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=mockKey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });

    const crudResponse = await fetch('https://crudcrud.com/api/e81241ec3fe54f19992e2a6d0f85fd7f/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, firebaseUserId: firebaseResponse.localId }), 
    });

    if (firebaseResponse.ok && crudResponse.ok) {
      return 'Signup successful!';
    } else {
      throw new Error('Failed to signup');
    }
  } catch (error) {
    console.error('Error during signup:', error);
    return 'Signup failed. Please try again later.';
  }
};


describe('Signup Component', () => {
  test('renders the Signup form', () => {
    const { getByLabelText, getByText } = render(<Signup />);
    
    expect(getByLabelText('Email address')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
  });

  test('displays error message for empty fields on form submission', async () => {
    const { getByText } = render(<Signup />);
    fireEvent.click(getByText('Sign Up'));

    await waitFor(() => {
      expect(getByText('Please fill in all fields')).toBeInTheDocument();
    });
  });

  test('displays error message for passwords that do not match', async () => {
    const { getByLabelText, getByText } = render(<Signup />);
    fireEvent.change(getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password123' } });
    fireEvent.click(getByText('Sign Up'));

    await waitFor(() => {
      expect(getByText('Passwords do not match')).toBeInTheDocument();
    });
  });
});
