"use client";
import { Flex, Group, Card, Editable } from "@chakra-ui/react";
import { BsFolderFill } from "react-icons/bs";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const LS_KEYS = { FOLDERS: "app.folders" } as const;

type Folder = { id: string; name: string };
const genId = () => `fld_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const FolderList = () => {
    const [folders, setFolders] = useState<Folder[]>([]);
    const router = useRouter();

    useEffect(() => {
        try {
            const raw = localStorage.getItem(LS_KEYS.FOLDERS);
            if (raw) setFolders(JSON.parse(raw));
        } catch { }
    }, []);

    const persist = useCallback((next: Folder[]) => {
        setFolders(next);
        try {
            localStorage.setItem(LS_KEYS.FOLDERS, JSON.stringify(next));
        } catch { }
    }, []);

    useEffect(() => {
        const handler = (e: Event) => {
            const evt = e as CustomEvent<{ name: string }>;
            const name = evt.detail?.name;
            if (typeof name === "string" && name.trim()) {
                const next: Folder[] = [...folders, { id: genId(), name: name.trim() }];
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

    if (!folders.length) return null;

    return (
        <Flex align="center" justify="center" flexDir="column" mt={10}>
            {folders.map((folder, idx) => (
                <Group key={folder.id} w={{ base: "70%", md: "30%" }} attached maxW="sm" mt={10} onClick={() => router.push(`/link/${folder.id}`)}>
                    <Card.Root size="lg" variant="outline" w="100%" p={6}>
                        <Flex justify="flex-start" align="center" gap={5}>
                            <BsFolderFill color="green" size="2em" />
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