import React from 'react';
import { Box, Heading, Text, Image, Stack, Spinner, Button, useToast } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { events, setEvents, users, categories, currentUser } = useAppContext();
  const eventId = Number(id);

  if (!events.length || !users.length || !categories.length) {
    return <Box><Spinner /> Gegevens worden geladen...</Box>;
  }

  const event = events.find(evt => evt && Number(evt.id) === eventId);
  if (!event) return <Box>Event niet gevonden.</Box>;

  const author = users.find(u => Number(u.id) === Number(event.createdBy));
  const categoryNames = (event.categoryIds || []).map(id => {
    const cat = categories.find(c => Number(c.id) === Number(id));
    return cat ? cat.name : 'Onbekend';
  });

  const magBewerken = !!currentUser && (currentUser.role === "admin" || Number(currentUser.id) === Number(event.createdBy));

  const handleDelete = async () => {
    toast({
      title: "Niet toegestaan",
      description: "Je bent niet gemachtigd om dit event te verwijderen.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    return;
  };

  return (
    <Box maxW="3xl" mx="auto">
      <Heading mb={4}>{event.title}</Heading>
      <Image src={event.image} alt={event.title} mb={4} />
      <Text fontWeight="bold">Datum:</Text>
      <Text mb={2}>{event.date}</Text>
      <Text fontWeight="bold">Locatie:</Text>
      <Text mb={2}>{event.location}</Text>
      <Text fontWeight="bold">Categorieën:</Text>
      <Text mb={2}>{categoryNames.join(', ')}</Text>
      <Text fontWeight="bold">Beschrijving:</Text>
      <Text mb={2}>{event.description}</Text>
      <Text fontWeight="bold">Aangemaakt door:</Text>
      <Text mb={4}>{author?.name || 'Onbekend'}</Text>

      {currentUser && magBewerken && (
        <Stack direction="row" spacing={4}>
          <Button colorScheme="teal" onClick={() => navigate(`/events/edit/${eventId}`)}>
            Bewerk dit event
          </Button>
          <Button colorScheme="red" onClick={handleDelete}>
            Verwijder dit event
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default EventPage;

