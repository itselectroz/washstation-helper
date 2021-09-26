import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";

export const ThemeSelector = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex>
            <IconButton 
                aria-label="Theme Selector"
                onClick={toggleColorMode}
                variant="ghost"
                icon={colorMode == 'light' ? <MoonIcon/> : <SunIcon/>}
            />
        </Flex>
    );
}