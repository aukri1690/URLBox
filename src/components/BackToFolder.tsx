" use client "
import { IconButton } from "@chakra-ui/react";
import { LuFolderInput } from "react-icons/lu";
import { useRouter } from "next/navigation";

const BackToFolderButton = () => {
  const router = useRouter();
  return(
    <IconButton variant='ghost' onClick={() => router.push("/")}>
    <LuFolderInput />
    </IconButton>
  )
};

export default BackToFolderButton;