import { Button, IconButton, Input, Popover, Portal, Group } from "@chakra-ui/react";
import { FiFolderPlus } from "react-icons/fi";
import { useState } from "react";

type Props = { onCreateFolder?: (name: string) => void };

const CreateNewFolderButton = ({ onCreateFolder }: Props) => {
    const [folder, setFolder] = useState("");

    const createNewFolder = () => {
        const name = folder.trim();
        if (!name) return;
        onCreateFolder?.(name);
        window.dispatchEvent(
            new CustomEvent("folder:create", { detail: { name } })
        );
        setFolder("");
    };

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <IconButton
                    aria-label="フォルダを作成"
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
                                <Input
                                    value={folder}
                                    onChange={(e) => setFolder(e.target.value)}
                                    placeholder="新規フォルダ名"
                                    size="md"
                                    variant="flushed"
                                    css={{ "--focus-color": "white" }}
                                />
                                <Button
                                    onClick={createNewFolder}
                                    bg="bg.subtle"
                                    variant="ghost"
                                    colorPalette="white"
                                    disabled={!folder.trim()}
                                >
                                    作成
                                </Button>
                            </Group>
                        </Popover.Body>
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    );
};

export default CreateNewFolderButton;