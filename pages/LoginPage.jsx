import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Box, Input, FormControl, FormLabel, Button, Heading, Text, useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success) {
      toast({ title: "Login successful", status: "success", duration: 3000 });
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <Heading mb={4}>Login</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="login-email">Email</FormLabel>
          <Input 
            id="login-email"
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="login-password">Password</FormLabel>
          <Input 
            id="login-password"
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </FormControl>
        {error && <Text color="red.500" mb={3}>{error}</Text>}
        <Button colorScheme="teal" type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default LoginPage;