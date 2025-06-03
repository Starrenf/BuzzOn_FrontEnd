
import React from 'react';
import {
  Box, Heading, Stack, Text, Button, Badge
} from '@chakra-ui/react';
import { useAppContext } from '../context/AppContext';

const AdminEventsPage = () => {
  const { events, setEvents, users } = useAppContext();

  const handleApproval = async (eventId, approved) => {
    try {
      const res = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved }),
      });

      if (!res.ok) throw new Error("Fout bij updaten goedkeuring");

      const updatedEvent = await res.json();
      setEvents((prev) =>
        prev.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
      );
    } catch (err) {
      console.error("Fout bij goedkeuren:", err);
    }
  };

  return (
    <Box maxW="4xl" mx="auto">
      <Heading mb={6}>Moderatie van Evenementen</Heading>
      <Stack spacing={4}>
        {events.map((event) => {
          const author = users.find(u => u.id === event.createdBy);
          return (
            <Box key={event.id} p={4} borderWidth="1px" borderRadius="md">
              <Heading size="md">{event.title}</Heading>
              <Text>Door: {author?.name || "Onbekend"}</Text>
              <Text>Datum: {event.date}</Text>
              <Text>Locatie: {event.location}</Text>
              <Badge colorScheme={event.approved ? "green" : "red"}>
                {event.approved ? "Goedgekeurd" : "Niet Goedgekeurd"}
              </Badge>
              <Stack direction="row" mt={3}>
                {!event.approved && (
                  <Button
                    colorScheme="green"
                    onClick={() => handleApproval(event.id, true)}
                  >
                    Goedkeuren
                  </Button>
                )}
                {event.approved && (
                  <Button
                    colorScheme="red"
                    onClick={() => handleApproval(event.id, false)}
                  >
                    Intrekken
                  </Button>
                )}
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default AdminEventsPage;
