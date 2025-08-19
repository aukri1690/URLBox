"use client";
import { useCallback, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import AddNewLinkCardButton from "@/components/AddNewLinkCard";
import LinkCardList from "@/components/LinkCardList";

const Home = () => {
  const [urls, setUrl] = useState<string[]>([]);

  const handleAddUrl = useCallback((u: string) => {
    setUrl((prev) => (prev.includes(u) ? prev : [u, ...prev]));
  }, []);

  return (
    <>
      <Box position="fixed" top={0} right={0} p={4} zIndex="tooltip">
        <AddNewLinkCardButton onAdd={handleAddUrl} />
        <ColorModeButton />
      </Box>
      <Flex align="center" justify="center" flexDir="column" mt={10}>
        <LinkCardList urls={urls} />
      </Flex>
    </>
  );
};

export default Home;