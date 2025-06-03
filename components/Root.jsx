import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

import Footer from './Footer';
import Header from './Header';

const marquee = keyframes`
  0%   { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const Root = () => {
  return (
    <Box
      minHeight="100vh"
      bgImage="url('/images/BuzzOn-bg.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Box bg="rgba(255, 255, 255, 0.85)" minHeight="100vh">
        <Header />

        {/* Reclamebanner met schuivende tekst */}
        <Box
          bg="yellow.100"
          position="fixed"
          top="64px"
          width="100%"
          overflow="hidden"
          whiteSpace="nowrap"
          borderBottom="1px solid #ccc"
          zIndex="9"
          height="40px"
          display="flex"
          alignItems="center"
        >
          <Text
            fontWeight="bold"
            px={4}
            animation={`${marquee} 12s linear infinite`}
            minWidth="100%"
            display="inline-block"
          >
            🎯 Reclameplek — Hier je reclameboodschap of afbeelding?  Neem contact op! 🎉
          </Text>
        </Box>

        <Box as="main" flex="1" p={4} pt="120px" pb="80px" display="flex" flexDirection="column">
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};

export default Root;
