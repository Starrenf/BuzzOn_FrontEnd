// MijnEventsPage.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Button,
  Spinner
} from "@chakra-ui/react";
import { useAuth } from "../src/AuthContext";
import { useAppContext } from "../src/AppContext";
import { Link } from "react-router-dom";

export default function MijnEventsPage() {
  const { user } = useAuth();
  const { events } = useAppContext();
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const filtered = events.filter((e) => e.submittedBy === user.id); //  <---  CORRECTED: userId to submittedBy
      setMyEvents(filtered);
      setLoading(false);
    }
  }, [user, events]);

  if (!user) {
    return (
      <Box p={6}>
        <Heading size="md" mb={4}>Niet ingelogd</Heading>
        <Text>Log in om jouw evenementen te bekijken.</Text>
        <Button as={Link} to="/login" mt={4} colorScheme="teal">Naar login</Button>
      </Box>
    );
  }

  if (loading) return <Spinner size="lg" />;

  return (
    <Box p={6}>
      <Heading size="lg" mb={6}>Mijn evenementen</Heading>
      {myEvents.length === 0 ? (
        <Text>Je hebt nog geen evenementen toegevoegd.</Text>
      ) : (
        <SimpleGrid columns={[1, 2]} spacing={6}>
          {myEvents.map((event) => (
            <Box key={event.id} borderWidth="1px" borderRadius="md" overflow="hidden" p={4}>
              <Image src={event.image} alt={event.title} objectFit="cover" w="100%" h="180px" mb={4} />
              <Heading size="md" mb={2}>{event.title}</Heading>
              <Text fontSize="sm">{event.date} – {event.location}</Text>
              <Text noOfLines={2} mt={2}>{event.description}</Text>
              <Button as={Link} to={`/events/${event.id}`} mt={3} size="sm" colorScheme="teal">
                Bekijk
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
