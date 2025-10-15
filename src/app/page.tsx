"use client"

import { Box } from "@chakra-ui/react"
import Folder from "@/components/FolderList"
import { ColorModeButton } from "@/components/ui/color-mode"
import NewFolder from "@/components/NewFolder"

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
            <NewFolder />
            <ColorModeButton />
        </Box>
        <Folder />
        </>
    )
}

export default Home;