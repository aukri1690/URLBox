import {Button,IconButton,Input,Popover,Portal,Group,} from "@chakra-ui/react";
import { FiFolderPlus } from "react-icons/fi";

const MakeFolderButton = () => {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <IconButton
                    aria-label="フォルダーを作成"
                    variant="ghost"
                    colorPalette="white"
                    size="md"
                >
                    <FiFolderPlus />
                </IconButton>
            </Popover.Trigger>

            <Portal>
                <Popover.Positioner>
                    <Popover.Content>
                        <Popover.Arrow />
                        <Popover.Body>
                            <Popover.Title fontWeight="bold" mb={6}>
                                新規フォルダを作成する
                            </Popover.Title>
                            <Group attached w="full" maxW="sm">
                            <Input placeholder="新規フォルダ名" size="md" variant="outline"/>
                            <Button bg="bg.subtle" variant="outline" colorPalette="green">作成</Button>
                            </Group>
                        </Popover.Body>
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    );
};

export default MakeFolderButton;