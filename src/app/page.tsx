"use client"

import { Box } from "@chakra-ui/react"
import Folder from "@/components/FolderList"
import { ColorModeButton } from "@/components/ui/color-mode"
import CreateNewFolderButton from "@/components/CreateNewFolder"

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
            <CreateNewFolderButton />
            <ColorModeButton />
        </Box>
        <Folder />
        </>
    )
}

export default Home;