import React, { useState } from 'react';

const initialFormData = {
  username: '',
  password: '',
};

function SignIn() {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = () => {
    // Actual sign-in logic can be implemented here. Like checking username and password.
    // For instance, an API call can be used.

    // Example: (Simulated sign-in)
    if (formData.username === 'user' && formData.password === 'password') {
      // Successful sign-in
      alert('Successful Sign-In');
      setError(null);
      setFormData(initialFormData); // Clear the form
    } else {
      setError('Incorrect username or password');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default SignIn;