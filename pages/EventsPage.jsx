
import React, { useState, useMemo } from "react";
import {
  Box,
  Input,
  SimpleGrid,
  Image,
  Heading,
  Text,
  Tag,
  LinkBox,
  LinkOverlay,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppContext";

const EventsPage = () => {
  const { events } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading] = useState(false);

  const filteredEvents = useMemo(() => {
    return events
      .filter(event => event.approved)
      .filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [events, searchTerm]);

  if (loading) return <Spinner />;

  return (
    <Box p={4}>
      <Input
        placeholder="Zoek evenementen"
        mb={4}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {filteredEvents.map((event) => (
          <LinkBox key={event.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={event.image} alt={event.title} objectFit="cover" height="200px" width="100%" />
            <Box p="6">
              <Heading size="md" mb={2}>
                <LinkOverlay as={Link} to={`/events/${event.id}`}>
                  {event.title}
                </LinkOverlay>
              </Heading>
              <Text>{event.date} – {event.location}</Text>
              <Tag mt={2}>{event.category}</Tag>
            </Box>
          </LinkBox>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default EventsPage;
