import {Button,IconButton,Input,Popover,Portal,Group,} from "@chakra-ui/react";
import { TbLinkPlus } from "react-icons/tb";

const AddNewURLCardButton = () => {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <IconButton
                    aria-label="URLを追加"
                    variant="ghost"
                    colorPalette="white"
                    size="lg"
                >
                    <TbLinkPlus />
                </IconButton>
            </Popover.Trigger>
            <Portal>
                <Popover.Positioner>
                    <Popover.Content>
                        <Popover.Arrow />
                        <Popover.Body>
                            <Popover.Title fontWeight="bold" mb={6}>
                                URLを追加する
                            </Popover.Title>
                            <Group attached w="full" maxW="sm">
                            <Input placeholder="URL" size="md" variant="flushed" css={{ "--focus-color": "white" }}/>
                            <Button bg="bg.subtle" variant="ghost" colorPalette="white">追加</Button>
                            </Group>
                        </Popover.Body>
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    );
};

export default AddNewURLCardButton;