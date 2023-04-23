import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Login({setIsLoggedIn}) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Replace 'YOUR_SERVER_PORT' with the actual port number your server is listening on
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 400) {
        setErrorMessage(data.err);
      } else {
        setIsLoggedIn(true);
        navigate('/', { state: { successMessage: 'User logged in successfully!'} });
      }
    } catch (error) {
      setErrorMessage("Error Logging in user. \n" + error);
    }

  };

  return (
    <div>
      <h1>Login Page</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );

}

export default Login;
