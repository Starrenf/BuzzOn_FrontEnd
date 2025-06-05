import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  SimpleGrid
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { motion } from "framer-motion";

const MotionImage = motion(Image);

export default function HomePage() {
  const { events } = useAppContext();
  const [greeting, setGreeting] = useState("Welkom bij BuzzOn! 🎉");

  useEffect(() => {
    // Eventueel later: audio of AI-integratie toevoegen
    // const audio = new Audio("/sounds/chime.mp3");
    // audio.play();
  }, []);

  return (
    <Box textAlign="center" px={4} py={10}>
      <MotionImage
        src="/images/BuzzOn_logo.png"
        alt="BuzzOn logo"
        borderRadius="full"
        boxSize="120px"
        objectFit="cover"
        mx="auto"
        mb={4}
        shadow="md"
        bg="white"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <Heading as="h1" size="2xl" mb={4} color="teal.600">
        BuzzOn!
      </Heading>

      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0, 1] }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Text
          fontSize="2xl"
          fontWeight="extrabold"
          color="orange.400"
          mb={6}
          textShadow="0 1px 1px rgba(0,0,0,0.3)"
          bgGradient="linear(to-r, yellow.200, orange.300, pink.300)"
          bgClip="text"
        >
          {greeting}
        </Text>
      </motion.div>

      <Text fontSize="lg" mb={6}>
        Ontdek en beheer evenementen in jouw omgeving. Voeg je eigen evenementen toe en blijf op de hoogte van wat er speelt.
      </Text>
      <Button as={Link} to="/events" colorScheme="teal" size="lg" mb={10}>
        Bekijk alle evenementen
      </Button>

      <Heading as="h2" size="lg" mb={6}>
        Aankomende evenementen
      </Heading>
      <SimpleGrid columns={[1, 2]} spacing={6}>
        {events?.slice(0, 2).map((event) => (
          <Box
            key={event.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
          >
            <Image
              src={event.image}
              alt={event.title}
              objectFit="cover"
              height="180px"
              width="100%"
              mb={4}
            />
            <Heading size="md" mb={2}>
              {event.title}
            </Heading>
            <Text fontSize="sm" mb={2}>
              {event.date} – {event.location}
            </Text>
            <Text noOfLines={2}>{event.description}</Text>
            <Button as={Link} to={`/events/${event.id}`} mt={4} colorScheme="teal">
              Bekijk
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
