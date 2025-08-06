import { Flex, Group, Card, Editable } from "@chakra-ui/react";
import { BsFolderFill } from "react-icons/bs";

const Folder = () => {
    return (
        <Flex align="center" justify="center" flexDir="column" gap={5}>
            <Group w={{ base: "70%", md: "30%" }} attached maxW="sm" mt={10}>
                <Card.Root size="lg" variant="outline" w="100%" p={6}>
                    <Flex justify="flex-start" align="center" gap={5}>
                        <BsFolderFill color="green" size="2em" />
                        <Editable.Root defaultValue="三軒茶屋" textAlign="start">
                            <Editable.Preview fontSize="2xl" fontWeight="bold" />
                            <Editable.Input fontSize="2xl" fontWeight="bold" />
                        </Editable.Root>
                    </Flex>
                </Card.Root>
            </Group>
        </Flex>
    );
};

export default Folder;