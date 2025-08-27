"use client";
import { useEffect, useRef, useState } from "react";
import { Box, Image, Text, LinkBox, LinkOverlay, VStack, HStack } from "@chakra-ui/react";

const LS_KEYS = { LINKS: "app.links" } as const;

export type LinkMeta = {
    url: string;
    title: string;
    image?: string;
};

const LinkCard = ({ href }: { href: string }) => {
    const [meta, setMeta] = useState<LinkMeta | null>(null);

    useEffect(() => {
        let active = true;
        fetch(`/api/unfurl?url=${encodeURIComponent(href)}`)
            .then((r) => r.json())
            .then((d) => active && setMeta(d))
            .catch(() => { });
        return () => {
            active = false;
        };
    }, [href]);

    if (!meta) return null;

    const title = meta.title || meta.url;

    return (
        <LinkBox
            as="article"
            borderWidth="1px"
            rounded="md"
            overflow="hidden"
            h="100px"
            w={{ base: "70%", md: "30%" }}
        >
            <HStack align="stretch" h="100%">
                <VStack align="start" h="100%" p={3} w="65%">
                    <Text as="h3" mt={6} fontWeight="bold" lineClamp={1}>
                        <LinkOverlay href={meta.url} target="_blank" rel="noopener noreferrer">
                            {title}
                        </LinkOverlay>
                    </Text>
                </VStack>
                <Box w="40%" h="100%" bg="gray.50">
                    {meta.image ? (
                        <Image src={meta.image} w="100%" h="100%" objectFit="cover" display="block" />
                    ) : null}
                </Box>
            </HStack>
        </LinkBox>
    );
};

type Props = {
    urls?: string[];
    folderId?: string;
};

const LinkCardList = ({ urls, folderId }: Props) => {
    const [items, setItems] = useState<string[]>([]);
    const [mounted, setMounted] = useState(false);
    const firstPersistSkip = useRef(true);
    const storageKey = folderId ? `${LS_KEYS.LINKS}:${folderId}` : LS_KEYS.LINKS;

    useEffect(() => {
        setMounted(true);
        try {
            if (urls && urls.length > 0) {
                setItems(urls);
            } else {
                const raw = localStorage.getItem(storageKey);
                setItems(raw ? JSON.parse(raw) : []);
            }
        } catch {
            setItems([]);
        }
        firstPersistSkip.current = true;
    }, [storageKey, urls]);

    useEffect(() => {
        const handler = (e: Event) => {
            const evt = e as CustomEvent<{ url: string; folderId?: string }>;
            const url = evt.detail?.url;
            const evFolderId = evt.detail?.folderId;
            if (!url || !url.trim()) return;
            if (folderId && evFolderId !== folderId) return;
            setItems((prev) => [...prev, url]);
        };
        window.addEventListener("link:add", handler as EventListener);
        return () => window.removeEventListener("link:add", handler as EventListener);
    }, [folderId]);

    useEffect(() => {
        if (!mounted) return;
        if (firstPersistSkip.current) {
            firstPersistSkip.current = false;
            return;
        }
        try {
            localStorage.setItem(storageKey, JSON.stringify(items));
        } catch { }
    }, [items, mounted, storageKey]);

    if (!mounted || items.length === 0) return null;

    return (
        <VStack mt={10} gap={7} align="center" w="full">
            {items.map((u) => (
                <LinkCard key={u} href={u} />
            ))}
        </VStack>
    );
};

export default LinkCardList;