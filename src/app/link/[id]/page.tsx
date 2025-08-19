"use client";
import { useCallback } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { ColorModeButton } from "@/components/ui/color-mode";
import AddNewLinkCardButton from "@/components/AddNewLinkCard";
import LinkCardList from "@/components/LinkCardList";

const Home = () => {
  const params = useParams<{ id: string }>();
  const folderId = String(params.id);

  const handleAddUrl = useCallback(
    (u: string) => {
      window.dispatchEvent(
        new CustomEvent("link:add", { detail: { url: u, folderId } })
      );
    },
    [folderId]
  );

  return (
    <>
      <Box position="fixed" top={0} right={0} p={4} zIndex="tooltip">
        <AddNewLinkCardButton onAdd={handleAddUrl} />
        <ColorModeButton />
      </Box>
      <Flex align="center" justify="center" flexDir="column" mt={10}>
        <LinkCardList folderId={folderId} />
      </Flex>
    </>
  );
};

export default Home;