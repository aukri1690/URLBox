import { Flex, Group, Card, Editable } from "@chakra-ui/react";
import { BsFolderFill } from "react-icons/bs";
import { useState, useEffect } from "react";

const FolderList = () => {
    const [folders, setFolders] = useState<string[]>([]);

    useEffect(() => {
        const handler = (e: Event) => {
            const evt = e as CustomEvent<{ name: string }>;
            const name = evt.detail?.name;
            if (typeof name === "string" && name.trim()) {
                setFolders(prev => [...prev, name]);
            }
        };

        window.addEventListener("folder:create", handler as EventListener);
        return () => window.removeEventListener("folder:create", handler as EventListener);
    }, []);

    return (
        <Flex align="center" justify="center" flexDir="column" mt={10} >
            {folders.map((name, idx) => (
                <Group
                    key={`${name}-${idx}`}
                    w={{ base: "70%", md: "30%" }}
                    attached
                    maxW="sm"  
                    mt={10}   
                >
                    <Card.Root size="lg" variant="outline" w="100%" p={6}>
                        <Flex justify="flex-start" align="center" gap={5}>
                            <BsFolderFill color="green" size="2em" />
                            <Editable.Root defaultValue={name} textAlign="start">
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