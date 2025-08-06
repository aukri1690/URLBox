"use client"

import { Box } from "@chakra-ui/react"
import Folder from "@/components/FolderComponents"
import { ColorModeButton } from "@/components/ui/color-mode"
import MakeFolderButton from "@/components/MakeFolderButton"

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
            <MakeFolderButton />
            <ColorModeButton />
        </Box>
        <Folder />
        </>
    )
}

export default Home;