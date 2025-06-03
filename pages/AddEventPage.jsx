import React, { useState } from "react";
import {
  Box, Button, FormControl, FormLabel, Input, Select,
  Textarea, Heading, useToast, VStack, Spinner, Text, List, ListItem
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { generateWithGemini } from "../utils/gemini";

export default function AddEventPage() {
  const { categories, setEvents, events, currentUser } = useAppContext();
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    categoryIds: [],
    image: "",
    description: "",
    createdBy: currentUser?.id || 1,
    approved: false
  });

  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "categoryIds" ? [parseInt(value)] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, ...formDataWithoutId } = formData;
    const res = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataWithoutId),
    });
    const newEvent = await res.json();
    setEvents([...events, newEvent]);
    toast({ title: "Event toegevoegd", status: "success", duration: 3000 });
    navigate(`/events/${newEvent.id}`);
  };

  const handleAISuggest = async () => {
    setLoading(true);

    if (!formData.categoryIds[0]) {
      toast({
        title: "Categorie vereist",
        description: "Selecteer eerst een categorie voordat je AI-omschrijvingen genereert.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    const categoryName = categories.find(cat => cat.id === formData.categoryIds[0])?.name || "";
    const prompt = `Geef drie korte, enthousiaste omschrijvingen voor een evenement met de titel "${formData.title}" in de categorie "${categoryName}". Nummer ze als 1., 2., 3.`;
    const result = await generateWithGemini(prompt);
    const raw = result
      .split(/\d\.\s/)
      .map(t => t.trim())
      .filter(s => s && !s.toLowerCase().startsWith("omdat") && !s.toLowerCase().startsWith("categorie:"));
    setSuggestions(raw);
    setLoading(false);
  };

  const handleAIImage = async () => {
    setLoading(true);
    const prompt = `Geef een representatieve stockfoto-URL voor een evenement met de titel "${formData.title}". Geef alleen een link naar een afbeelding.`;
    const result = await generateWithGemini(prompt);
    setFormData((prev) => ({ ...prev, image: result }));
    setLoading(false);
  };

  const applySuggestion = (suggestion) => {
    setFormData(prev => ({ ...prev, description: suggestion }));
    toast({ title: "Omschrijving toegepast", status: "info", duration: 2000 });
  };

  return (
    <Box maxW="lg" mx="auto" mt={10} p={4}>
      <Heading size="lg" mb={6}>Nieuw evenement toevoegen</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Titel</FormLabel>
            <Input name="title" value={formData.title} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Datum</FormLabel>
            <Input type="date" name="date" value={formData.date} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Locatie</FormLabel>
            <Input name="location" value={formData.location} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Categorie</FormLabel>
            <Select name="categoryIds" value={formData.categoryIds[0] || ""} onChange={handleChange}>
              <option value="">Selecteer categorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Afbeelding (URL)</FormLabel>
            <Input name="image" value={formData.image} onChange={handleChange} isDisabled />
            <Button mt={1} size="sm" variant="outline" onClick={handleAIImage} isDisabled={loading}>
              {loading ? <Spinner size="sm" /> : "Genereer afbeelding met AI"}
            </Button>
            <Text fontSize="sm" color="gray.500" mt={1}>
              De afbeelding wordt geplaatst door de beheerder vanwege copyrightoverwegingen.
            </Text>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Omschrijving</FormLabel>
            <Textarea name="description" value={formData.description} onChange={handleChange} minHeight="120px" />
            <Button mt={2} size="sm" colorScheme="teal" onClick={handleAISuggest} isDisabled={loading}>
              {loading ? <Spinner size="sm" /> : "Genereer omschrijvingen met AI"}
            </Button>
            {suggestions.length > 0 && (
              <Box mt={3}>
                <Text fontWeight="medium" mb={1}>Klik op een omschrijving om deze toe te passen:</Text>
                <List spacing={3}>
                  {suggestions.map((s, idx) => (
                    <ListItem key={idx}>
                      <Button
                        size="sm"
                        variant="outline"
                        width="100%"
                        whiteSpace="normal"
                        height="auto"
                        textAlign="left"
                        onClick={() => applySuggestion(s)}
                      >
                        {s}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">Toevoegen</Button>
        </VStack>
      </form>
    </Box>
  );
}
