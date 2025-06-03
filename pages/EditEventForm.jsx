
import React, { useEffect, useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Select, Stack,
  Textarea, Heading, Spinner
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const EditEventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, setEvents, categories, users, currentUser } = useAppContext();

  const eventId = Number(id);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (events.length && users.length && categories.length && currentUser) {
      console.log("Zoek event ID:", eventId);
      console.log("Beschikbare event IDs:", events.map(evt => evt?.id));
      const found = events.find(evt => evt && Number(evt.id) === eventId);
      console.log("Gevonden event:", found);
      if (found) setFormData(found);
      setLoading(false);
    }
  }, [events, users, categories, currentUser, eventId]);

  if (loading) {
    return <Box><Spinner /> Gegevens worden geladen...</Box>;
  }

  if (!formData) {
    return <Box>Event met ID {id} niet gevonden.</Box>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "categoryIds" ? [parseInt(value)] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEvent = { ...formData, id: eventId };

    try {
      const res = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEvent)
      });

      if (!res.ok) throw new Error("Fout bij opslaan");

      const updated = await res.json();
      const updatedEvents = events.map((evt) =>
        Number(evt.id) === updated.id ? updated : evt
      );
      setEvents(updatedEvents);
      navigate(`/events/${eventId}`);
    } catch (error) {
      console.error("Fout bij updaten event:", error);
    }
  };

  return (
    <Box maxW="2xl" mx="auto">
      <Heading size="lg" mb={6}>Bewerk Event</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Titel</FormLabel>
            <Input name="title" value={formData.title} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Beschrijving</FormLabel>
            <Textarea name="description" value={formData.description} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Afbeelding</FormLabel>
            <Input name="image" value={formData.image} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Datum</FormLabel>
            <Input type="date" name="date" value={formData.date} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Locatie</FormLabel>
            <Input name="location" value={formData.location} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Categorie</FormLabel>
            <Select name="categoryIds" value={formData.categoryIds[0] || ''} onChange={handleChange}>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Ingediend door</FormLabel>
            <Select name="createdBy" value={formData.createdBy} onChange={handleChange}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" colorScheme="teal">Opslaan</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EditEventForm;
