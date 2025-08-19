"use client";
import { Button, IconButton, Input, Popover, Portal, Group } from "@chakra-ui/react";
import { TbLinkPlus } from "react-icons/tb";
import { useState } from "react";

type AddNewLinkCardButtonProps = { onAdd?: (url: string) => void };

const AddNewLinkCardButton = ({ onAdd }: AddNewLinkCardButtonProps) => {
    const [url, setUrl] = useState("");

    const handleAdd = () => {
        let v = url.trim();
        if (!v) return;
        if (!/^https?:\/\//i.test(v)) v = `https://${v}`;
        try {
            new URL(v);
            onAdd?.(v);
            window.dispatchEvent(new CustomEvent("link:add", { detail: { url: v } }));
            setUrl("");
        } catch { }
    };

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <IconButton aria-label="URLを追加" variant="ghost" colorPalette="white" size="lg">
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
                                <Input
                                    placeholder="URL"
                                    size="md"
                                    variant="flushed"
                                    css={{ "--focus-color": "white" }}
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                                <Popover.CloseTrigger asChild>
                                    <Button
                                        bg="bg.subtle"
                                        variant="ghost"
                                        colorPalette="white"
                                        onClick={handleAdd}
                                        disabled={!url.trim()}
                                    >
                                        追加
                                    </Button>
                                </Popover.CloseTrigger>
                            </Group>
                        </Popover.Body>
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    );
};

export default AddNewLinkCardButton;