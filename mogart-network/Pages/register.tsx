import React, { useState } from 'react';

function Register() {

  const initialFormData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Define error types
  type FormErrors = {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate the form
  const validateForm = () => {
    const newErrors: FormErrors = {};  // <-- Specifying the type here
    if (!formData.username) {
      newErrors.username = 'Username is required.';
    }
    if (!formData.email) {
      newErrors.email = 'Email address is required.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle registration process
  const handleRegister = () => {
    if (validateForm()) {
      // Registration process can be done here.
      // For instance, you can send the registration info to an API.

      // On successful registration, you can redirect the user to another page.
      alert('Registration successful!');
      setFormData(initialFormData); // Reset the form
      setErrors({});
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div style={{ color: 'red' }}>
        {errors.username && <div>{errors.username}</div>}
        {errors.email && <div>{errors.email}</div>}
        {errors.password && <div>{errors.password}</div>}
        {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
      </div>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Email Address"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
