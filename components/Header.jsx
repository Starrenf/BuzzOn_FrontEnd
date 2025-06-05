import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Button,
  HStack,
  VStack,
  useDisclosure,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Stack
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const MenuLinks = ({ isVertical = false, onNavigate }) => {
    const Wrapper = isVertical ? VStack : HStack;
    return (
      <Wrapper spacing={4} align={isVertical ? 'start' : 'center'}>
        <Button as={Link} to="/" variant="ghost" colorScheme="whiteAlpha" onClick={onNavigate}>Home</Button>
        <Button as={Link} to="/events" variant="ghost" colorScheme="whiteAlpha" onClick={onNavigate}>Alle events</Button>
        {user && (
          <>
            <Button as={Link} to="/events/add" variant="ghost" colorScheme="whiteAlpha" onClick={onNavigate}>Event toevoegen</Button>
            <Button as={Link} to="/mijn-events" variant="ghost" colorScheme="whiteAlpha" onClick={onNavigate}>Mijn events</Button>
          </>
        )}
        {user?.role === "admin" && (
          <Button as={Link} to="/admin/events" variant="ghost" colorScheme="whiteAlpha" onClick={onNavigate}>Moderatie</Button>
        )}
        <Button as={Link} to="/about" variant="ghost" colorScheme="whiteAlpha" onClick={onNavigate}>Over ons</Button>
        <Button as={Link} to="/contact" variant="ghost" colorScheme="whiteAlpha" onClick={onNavigate}>Contact</Button>
      </Wrapper>
    );
  };

  return (
    <Box bg="teal.600" color="white" px={4} py={3} position="fixed" top={0} width="100%" zIndex={10} boxShadow="md">
      <Flex align="center" justify="space-between" wrap="wrap">
        <Heading size="md">
          <Link to="/">BuzzOn!</Link>
        </Heading>

        {isMobile ? (
          <>
            <IconButton
              icon={<HamburgerIcon />}
              variant="outline"
              colorScheme="whiteAlpha"
              aria-label="Open menu"
              onClick={onOpen}
              ml="auto"
            />
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bg="teal.700" color="white">
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody>
                  <Stack spacing={6}>
                    <MenuLinks isVertical={true} onNavigate={onClose} />
                    <Box>
                      {user ? (
                        <VStack align="start">
                          <Text>Welkom, {user.name}</Text>
                          <Button onClick={() => { handleLogout(); onClose(); }} size="sm" variant="outline" colorScheme="whiteAlpha">Logout</Button>
                        </VStack>
                      ) : (
                        <VStack align="start">
                          <Button as={Link} to="/login" size="sm" variant="outline" colorScheme="whiteAlpha" onClick={onClose}>Login</Button>
                          <Button as={Link} to="/register" size="sm" variant="outline" colorScheme="whiteAlpha" onClick={onClose}>Register</Button>
                        </VStack>
                      )}
                    </Box>
                  </Stack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <Flex align="center" justify="flex-end" gap={6} wrap="wrap">
            <MenuLinks />
            {user ? (
              <HStack spacing={3} ml={4}>
                <Text fontSize="sm">Welkom, {user.name}</Text>
                <Button onClick={handleLogout} size="sm" variant="outline" colorScheme="whiteAlpha">Logout</Button>
              </HStack>
            ) : (
              <HStack spacing={3} ml={4}>
                <Button as={Link} to="/login" size="sm" variant="outline" colorScheme="whiteAlpha">Login</Button>
                <Button as={Link} to="/register" size="sm" variant="outline" colorScheme="whiteAlpha">Register</Button>
              </HStack>
            )}
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
