"use client";
import { Button, IconButton, Input, Popover, Portal, Group } from "@chakra-ui/react";
import { TbLinkPlus } from "react-icons/tb";
import { useState } from "react";

type AddNewLinkCardButtonProps = { onAdd?: (url: string) => void };

const NewLinkCard= ({ onAdd }: AddNewLinkCardButtonProps) => {
    const [url, setUrl] = useState("");

    const addNewLinkCard= () => {
        let normalizedUrl = url.trim();
        if (!normalizedUrl) return;
        if (!/^https?:\/\//i.test(normalizedUrl)) normalizedUrl = `https://${normalizedUrl}`;
        try {
            new URL(normalizedUrl);
            onAdd?.(normalizedUrl);
            window.dispatchEvent(new CustomEvent("link:add", { detail: { url: normalizedUrl } }));
            setUrl("");
        } catch {
            console.error('入力されたURLは不適切です：', url);
        }
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
                                        onClick={addNewLinkCard}
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

export default NewLinkCard;