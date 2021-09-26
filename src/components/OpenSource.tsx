import { Box, Flex, Link, Text } from "@chakra-ui/layout";
import { AiOutlineGithub } from "react-icons/ai";

export const OpenSource = () => (
    <Box mt={5} minWidth="full">
        <Flex minWidth="full" justifyContent="center">
            <Link href="https://www.github.com/itselectroz/washstation-helper" isExternal>
                <Flex align="center">
                    <Text pr={2}>This project is open source</Text>
                    <AiOutlineGithub />
                </Flex>
            </Link>
        </Flex>
    </Box>
);