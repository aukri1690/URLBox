"use client"

import { Box } from "@chakra-ui/react"
import { ColorModeButton } from "@/components/ui/color-mode"
import AddNewLinkCardButton from "@/components/AddNewLinkCard"

const Home = () => {
    return(
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
        </>
    )
}

export default Home;