import { Box, Button, Flex, FormControl, Heading, Input, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import { TokenPasswordPayload, useTokenMutation, washstationApi } from "../services/washstation-service";
import { OpenSource } from "./OpenSource";
import { ThemeSelector } from "./ThemeSelector";

export const Login = () => {

    const toast = useToast();

    const { push } = useHistory();

    const [formState, setFormState] = React.useState<TokenPasswordPayload>({
        username: '',
        password: '',
        grant_type: 'password'
    });

    const [login, { isLoading }] = useTokenMutation();
    const [fetchProfile] = washstationApi.endpoints.profile.useLazyQuerySubscription();

    const teal = useColorModeValue('teal', 'teal');

    async function onSubmit(e: any) {
        e.preventDefault();

        try {
            const loginResponse = await login(formState).unwrap();

            if (!loginResponse || !loginResponse.access_token) {
                throw new Error();
            }

            fetchProfile();

            push('/');
        }
        catch (e: any) {
            toast({
                status: 'error',
                title: 'Error',
                description: 'Oh no, there was an error!',
                isClosable: true,
            });
        }
    }

    return (
        <Flex minHeight="100vh" minWidth="full" justifyContent="center" align="center">
            <Box>
                <Box
                    borderWidth={1}
                    borderRadius={4}
                    px={6}
                    width="full"
                    maxWidth="500px"
                    textAlign="center"
                    boxShadow="lg"

                    py={5}
                >
                    <form onSubmit={onSubmit}>
                        <Heading>Login with Washstation</Heading>
                        <Text>This is not an official washstation site</Text>
                        <FormControl mt={5}>
                            <Input
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setFormState({ ...formState, username: e.target.value })}
                            />
                        </FormControl>
                        <FormControl mt={3}>
                            <Input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                            />
                        </FormControl>
                        <Button 
                            minWidth="full" 
                            mt={5} 
                            bg={teal} 
                            textColor="white" 
                            type="submit"
                            isLoading={isLoading}
                        >Login</Button>
                    </form>
                </Box>
                <OpenSource/>
            </Box>
            <Box pos="absolute" top="0" left="0">
                <ThemeSelector />
            </Box>
        </Flex>

    );
}