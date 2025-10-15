"use client";
import { useCallback } from "react";
import { Box, Flex, HStack } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { ColorModeButton } from "@/components/ui/color-mode";
import NewLinkCard from "@/components/NewLinkCard";
import LinkCardList from "@/components/LinkCardList";
import BackToFolderButton from "@/components/BackToFolder";

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
      <Box position="fixed" top={0} right={0} p={4} zIndex="tooltip" >
        <HStack>
        <BackToFolderButton />
        <NewLinkCard onAdd={handleAddUrl} />
        <ColorModeButton />
        </HStack>
      </Box>
      <Flex align="center" justify="center" flexDir="column" mt={10}>
        <LinkCardList folderId={folderId} />
      </Flex>
    </>
  );
};

export default Home;