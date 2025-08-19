"use client";
import { Flex, Group, Card, Editable, Popover, Portal, Box, SimpleGrid } from "@chakra-ui/react";
import { BsFolderFill } from "react-icons/bs";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const LS_KEYS = { FOLDERS: "app.folders" } as const;

type Folder = { id: string; name: string; color?: string };
const genId = () => `fld_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
const DEFAULT_COLOR = "green";

const FolderList = () => {
    const [folders, setFolders] = useState<Folder[]>([]);
    const router = useRouter();

    useEffect(() => {
        try {
            const raw = localStorage.getItem(LS_KEYS.FOLDERS);
            if (raw) {
                const parsed: Folder[] = JSON.parse(raw);
                const withColor = parsed.map((f) => ({ ...f, color: f.color ?? DEFAULT_COLOR }));
                setFolders(withColor);
                localStorage.setItem(LS_KEYS.FOLDERS, JSON.stringify(withColor));
            }
        } catch { }
    }, []);

    const persist = useCallback((next: Folder[]) => {
        setFolders(next);
        try {
            localStorage.setItem(LS_KEYS.FOLDERS, JSON.stringify(next));
        } catch { }
    }, []);

    // フォルダ作成イベント
    useEffect(() => {
        const handler = (e: Event) => {
            const evt = e as CustomEvent<{ name: string }>;
            const name = evt.detail?.name;
            if (typeof name === "string" && name.trim()) {
                const next: Folder[] = [
                    ...folders,
                    { id: genId(), name: name.trim(), color: DEFAULT_COLOR },
                ];
                persist(next);
            }
        };
        window.addEventListener("folder:create", handler as EventListener);
        return () => window.removeEventListener("folder:create", handler as EventListener);
    }, [folders, persist]);

    const updateName = (index: number, name: string) => {
        const next = folders.slice();
        next[index] = { ...next[index], name };
        persist(next);
    };

    const updateColor = (index: number, color: string) => {
        const next = folders.slice();
        next[index] = { ...next[index], color };
        persist(next);
    };

    if (!folders.length) return null;

    return (
        <Flex align="center" justify="center" flexDir="column" mt={10}>
            {folders.map((folder, idx) => (
                <Group
                    key={folder.id}
                    w={{ base: "70%", md: "30%" }}
                    attached
                    maxW="sm"
                    mt={10}
                    onClick={() => router.push(`/link/${folder.id}`)}
                    style={{ cursor: "pointer" }}
                >
                    <Card.Root size="lg" variant="outline" w="100%" p={6}>
                        <Flex justify="flex-start" align="center" gap={5}>
                            <Popover.Root>
                                <Popover.Trigger asChild>
                                    <Box onClick={(e) => e.stopPropagation()} cursor="pointer" lineHeight={0} aria-label="フォルダ色を変更">
                                        <BsFolderFill color={folder.color ?? DEFAULT_COLOR} size="2em" />
                                    </Box>
                                </Popover.Trigger>
                                <Portal>
                                    <Popover.Positioner>
                                        <Popover.Content onClick={(e) => e.stopPropagation()} w="120px" h="150px">
                                            <Popover.Arrow />
                                            <Popover.Body>
                                                <SimpleGrid columns={3} gap={1}>
                                                    {["darkred", "hotpink", "blueviolet", "yellow", "coral", "orange", "lightgreen", "lime", "green", "cyan", "blue", "darkblue",].map((c) => (
                                                        <Box
                                                            key={c}
                                                            w="24px"
                                                            h="24px"
                                                            borderRadius="md"
                                                            bg={c}
                                                            border="1px solid rgba(0,0,0,0.15)"
                                                            cursor="pointer"
                                                            onClick={() => updateColor(idx, c)}
                                                            title={c}
                                                        />
                                                    ))}
                                                </SimpleGrid>
                                            </Popover.Body>
                                        </Popover.Content>
                                    </Popover.Positioner>
                                </Portal>
                            </Popover.Root>

                            <Editable.Root
                                value={folder.name}
                                onValueChange={(v) => updateName(idx, v.value)}
                                textAlign="start"
                            >
                                <Editable.Preview fontSize="2xl" fontWeight="bold" />
                                <Editable.Input fontSize="2xl" fontWeight="bold" />
                            </Editable.Root>
                        </Flex>
                    </Card.Root>
                </Group>
            ))}
        </Flex>
    );
};

export default FolderList;