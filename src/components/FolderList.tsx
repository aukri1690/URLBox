"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Flex, Group, Card, Popover, Portal, Box, SimpleGrid, Text, } from "@chakra-ui/react";
import { BsFolderFill } from "react-icons/bs";
import { FaRegPenToSquare } from "react-icons/fa6";
import { LuTrash2 } from "react-icons/lu";

const LOCAL_STORAGE_KEYS = { FOLDERS: "app.folders" } as const;

type Folder = { id: string; name: string; color?: string };

const DEFAULT_COLOR = "white";

const PALETTE: string[] = [
    "white",
    'red',
    'hotpink',
    'coral',
    'orange',
    'yellow',
    'lightgreen',
    'lime',
    'green',
    'cyan',
    'blue',
    'blueviolet',
];

const generateId = () => String(Math.floor(Math.random() * 10000)).padStart(4, '0');

const loadFolders = (): Folder[] => {
    try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.FOLDERS);
        if (!raw) return [];
        const parsed: Folder[] = JSON.parse(raw);
        return parsed.map((f) => ({ ...f, color: f.color ?? DEFAULT_COLOR }));
    } catch {
        console.error('フォルダの読み込みに失敗しました。')
        return [];
        // ユーザーに通知する処理を実装予定。
    }
};

const saveFolders = (next: Folder[]) => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.FOLDERS, JSON.stringify(next));
    } catch {
        console.error('フォルダの保存に失敗しました。')
        // ユーザーに通知する処理を実装予定。
    }
};

const FolderList = () => {
    const [folders, setFolders] = useState<Folder[]>([]);
    const router = useRouter();

    useEffect(() => {
        const existingFolders = loadFolders();
        setFolders(existingFolders);
        if (existingFolders.length !== 0) {
            saveFolders(existingFolders);
        }
    }, []);

    const persist = useCallback((updater: (prev: Folder[]) => Folder[]) => {
        setFolders((prev) => {
            const next = updater(prev);
            saveFolders(next);
            return next;
        });
    }, []);

    const changeName = useCallback((index: number) => {
        const newName = prompt("新しいフォルダ名を入力してください");
        if (!newName || !newName.trim()) return;
        persist((prev) => {
            const next = [...prev];
            next[index] = { ...next[index], name: newName.trim() };
            return next;
        });
    }, [persist]);

    const deleteFolder = useCallback((index: number) => {
        if (!window.confirm("このフォルダを削除しますか？")) return;
        persist((prev) => {
            const next = [...prev];
            next.splice(index, 1);
            return next;
        });
    }, [persist]);

    const onCreate = useCallback((e: Event) => {
        const event = e as CustomEvent<{ name: string }>;
        const name = event.detail?.name?.trim();
        if (!name) return;
        persist((prev) => [...prev, { id: generateId(), name, color: DEFAULT_COLOR }]);
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

    if (folders.length === 0) return null;

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
                            <Box ml='auto'>
                                <FaRegPenToSquare
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        changeName(idx);
                                    }} />
                            </Box>
                            <Box>
                                <LuTrash2
                                    color='red'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteFolder(idx);
                                    }} />
                            </Box>
                        </Flex>
                    </Card.Root>
                </Group>
            ))}
        </Flex>
    );
};

export default FolderList;