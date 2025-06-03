import React, { useState } from 'react';
import {
  Box, Input, FormControl, FormLabel, Button, Heading, Text, useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/users?email=${formData.email}`);
      const existing = await res.json();
      if (existing.length > 0) {
        setError("Email is already in use");
        return;
      }

      const create = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: 'user' })
      });

      if (!create.ok) throw new Error("Failed to register");

      toast({ title: "Account created", status: "success", duration: 3000 });
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <Heading mb={4}>Register</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="register-name">Name</FormLabel>
          <Input 
            id="register-name"
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="register-email">Email</FormLabel>
          <Input 
            id="register-email"
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="register-password">Password</FormLabel>
          <Input 
            id="register-password"
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </FormControl>
        {error && <Text color="red.500" mb={3}>{error}</Text>}
        <Button colorScheme="teal" type="submit">Register</Button>
      </form>
    </Box>
  );
};

export default RegisterPage;