"use client";
import { useEffect, useState } from "react";
import { Box, Image, Text, LinkBox, LinkOverlay, VStack, HStack } from "@chakra-ui/react";

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
        return () => {
            active = false;
        };
    }, [href]);

    if (!meta) return null;

    const title = meta.title || meta.url;
    let host = meta.url;
    try {
        host = new URL(meta.url).host;
    } catch { }

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
                    <Text as="h3" mt={6} fontWeight="bold" lineClamp={1} >
                        <LinkOverlay
                            href={meta.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >{title}
                        </LinkOverlay>
                    </Text>
                </VStack>
                <Box w="40%" h="100%" bg="gray.50">
                    {meta.image ? (
                        <Image
                            src={meta.image}
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            display="block"
                        />
                    ) : null}
                </Box>
            </HStack>
        </LinkBox>
    );
};

const LinkCardList = ({ urls }: { urls: string[] }) => {
    return (
        <VStack mt={10} gap={7} align="center" w="full">
            {urls.map((u) => (
                <LinkCard key={u} href={u} />
            ))}
        </VStack>
    );
}

export default LinkCardList;