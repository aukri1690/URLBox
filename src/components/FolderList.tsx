"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Flex, Group, Card, Popover, Portal, Box, SimpleGrid, Text,} from "@chakra-ui/react";
import { BsFolderFill } from "react-icons/bs";

const LS_KEYS = { FOLDERS: "app.folders" } as const;

type Folder = { id: string; name: string; color?: string };

const DEFAULT_COLOR = "green";

const PALETTE: string[] = [
    "darkred",
    "hotpink",
    "blueviolet",
    "yellow",
    "coral",
    "orange",
    "lightgreen",
    "lime",
    "green",
    "cyan",
    "blue",
    "darkblue",
];

const genId = () =>
    `fld_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const loadFolders = (): Folder[] => {
    try {
        const raw = localStorage.getItem(LS_KEYS.FOLDERS);
        if (!raw) return [];
        const parsed: Folder[] = JSON.parse(raw);
        return parsed.map((f) => ({ ...f, color: f.color ?? DEFAULT_COLOR }));
    } catch {
        return [];
    }
};

const saveFolders = (next: Folder[]) => {
    try {
        localStorage.setItem(LS_KEYS.FOLDERS, JSON.stringify(next));
    } catch { }
};

const FolderList = () => {
    const [folders, setFolders] = useState<Folder[]>([]);
    const router = useRouter();

    useEffect(() => {
        const init = loadFolders();
        setFolders(init);
        if (init.length) saveFolders(init);
    }, []);

    const persist = useCallback((updater: (prev: Folder[]) => Folder[]) => {
        setFolders((prev) => {
            const next = updater(prev);
            saveFolders(next);
            return next;
        });
    }, []);

    const onCreate = useCallback((e: Event) => {
        const evt = e as CustomEvent<{ name: string }>;
        const name = evt.detail?.name?.trim();
        if (!name) return;
        persist((prev) => [...prev, { id: genId(), name, color: DEFAULT_COLOR }]);
    }, [persist]);

    useEffect(() => {
        window.addEventListener("folder:create", onCreate as EventListener);
        return () =>
            window.removeEventListener("folder:create", onCreate as EventListener);
    }, [onCreate]);

    const updateColor = useCallback(
        (index: number, color: string) => {
            persist((prev) => {
                const next = [...prev];
                next[index] = { ...next[index], color };
                return next;
            });
        },
        [persist]
    );

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
                                    <Box
                                        onClick={(e) => e.stopPropagation()}
                                        cursor="pointer"
                                        lineHeight={0}
                                        aria-label="フォルダ色を変更"
                                    >
                                        <BsFolderFill
                                            color={folder.color ?? DEFAULT_COLOR}
                                            size="2em"
                                        />
                                    </Box>
                                </Popover.Trigger>
                                <Portal>
                                    <Popover.Positioner>
                                        <Popover.Content
                                            onClick={(e) => e.stopPropagation()}
                                            w="120px"
                                            h="150px"
                                        >
                                            <Popover.Arrow />
                                            <Popover.Body>
                                                <SimpleGrid columns={3} gap={1}>
                                                    {PALETTE.map((c) => (
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
                            <Text fontSize="2xl" fontWeight="bold" >
                                {folder.name}
                            </Text>
                        </Flex>
                    </Card.Root>
                </Group>
            ))}
        </Flex>
    );
};

export default FolderList;