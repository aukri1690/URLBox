"use client"

import { Box, Flex } from "@chakra-ui/react"
import { ColorModeButton } from "@/components/ui/color-mode"
import AddNewLinkCardButton from "@/components/AddNewLinkCard"
import LinkCardList from "@/components/LinkCardList"

const URLS = [
    "https://github.com/",
    "https://talent.supporterz.jp/events/",
    "https://supabase.com/",
];

const Home = () => {
    return (
        <>
            <Box
                position="fixed"
                top={0}
                right={0}
                p={4}
                zIndex="tooltip"
            >
                <AddNewLinkCardButton />
                <ColorModeButton />
            </Box>

            <Flex align="center" justify="center" flexDir="column" mt={10}>
                <LinkCardList urls={URLS} />
            </Flex>
        </>
    )
}

export default Home;