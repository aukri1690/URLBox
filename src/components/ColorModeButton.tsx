import React from 'react'
import { Box } from "@chakra-ui/react"
import { ColorModeButton } from "@/components/ui/color-mode"

const Home = () => {
    return (
        <Box
            position="fixed"
            top={0}
            right={0}
            p={4}   
            zIndex="tooltip"
        >
            <ColorModeButton />
        </Box>
    )
}

export default Home;