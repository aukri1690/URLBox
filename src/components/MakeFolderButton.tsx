import { IconButton } from "@chakra-ui/react"
import { FiFolderPlus } from "react-icons/fi";

const MakeFolderButton = () => {
    return (
        <IconButton aria-label="Search database" variant="ghost" colorPalette="purple" >
            <FiFolderPlus/>
        </IconButton>
    )
}

export default MakeFolderButton;