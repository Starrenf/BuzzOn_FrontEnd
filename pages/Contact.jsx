
import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  VStack,
  Text,
  Flex,
  Alert,
  AlertIcon
} from "@chakra-ui/react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/your-form-id", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setSubmitted(true);
      form.reset();
    }
  };

  return (
    <Flex justify="center" align="center" minH="90vh" bg="teal.50" px={4}>
      <Box
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="2xl"
        maxW="500px"
        w="full"
        textAlign="center"
      >
        <Heading size="lg" mb={4} color="teal.600">
          Contact
        </Heading>

        <Text fontSize="md" mb={6}>
          Heb je een evenement, product of merk dat je graag onder de aandacht wilt brengen via <strong>BuzzOn!</strong>? <br /><br />
          Wij staan open voor samenwerkingen, promotionele acties of gerichte advertenties binnen onze app.
          Laat hieronder je boodschap achter en we nemen snel contact met je op om de mogelijkheden te bespreken.
        </Text>

        {submitted && (
          <Alert status="success" mb={6} borderRadius="md">
            <AlertIcon />
            Je bericht is verzonden! Dank je wel.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Input type="text" name="name" placeholder="Naam" required />
            <Input type="email" name="email" placeholder="E-mailadres" required />
            <Textarea name="message" placeholder="Bericht of voorstel" rows={5} required />
            <Button type="submit" colorScheme="teal" width="full">
              Verstuur
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
