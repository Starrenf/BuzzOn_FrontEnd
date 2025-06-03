import { Box, Image, Heading, Text, Flex } from "@chakra-ui/react";

export default function OverOns() {
  return (
    <Box maxW="800px" mx="auto" mt={10} p={4}>
      <Heading mb={6} textAlign="center">Over ons</Heading>
      <Flex direction={["column", "row"]} align="center" gap={8}>
        <Image
          src="/images/Frank_ogen.jpg"
          alt="Frank"
          borderRadius="full"
          boxSize="180px"
          objectFit="cover"
          shadow="md"
        />
        <Box>
          <Text fontSize="lg">
            Mijn naam is Frank, initiatiefnemer van BuzzOn! Vanuit mijn passie
            voor technologie en evenementen heb ik deze app opgezet zodat
            iedereen makkelijk leuke lokale activiteiten kan vinden en delen.
            Samen maken we er iets moois van!          
          </Text><br />
          <Text>
          BuzzOn! is jouw centrale platform om evenementen te organiseren, te ontdekken en te delen met de wereld. Of je nu een buurtfeest plant, een concert organiseert of een workshop aanbiedt, BuzzOn! helpt je om je publiek te bereiken.
        </Text><br />
        <Text>
          Ons doel is om mensen samen te brengen en evenementen toegankelijk te maken voor iedereen. Ontdek wat er speelt in jouw buurt, voeg je eigen events toe, en blijf op de hoogte!
        </Text>
        </Box>
      </Flex>
    </Box>
  );
}
