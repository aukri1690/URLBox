"use client"

import { Box } from "@chakra-ui/react"
import { ColorModeButton } from "@/components/ui/color-mode"
import AddNewURLCardButton from "@/components/AddNewURLCard"

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
            <AddNewURLCardButton />
            <ColorModeButton />
        </Box>
        </>
    )
}

export default Home;