import { IconButton } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { AiOutlineLogout } from "react-icons/ai";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/user/user-slice";

export const LogoutButton = () => {
    const dispatch = useAppDispatch();

    function onLogout() {
        dispatch(logout());
    }

    return (
        <Flex>
            <IconButton 
                aria-label="Logout"
                onClick={onLogout}
                variant="ghost"
                icon={<AiOutlineLogout/>}
            />
        </Flex>
    );
}