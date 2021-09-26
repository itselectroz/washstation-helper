import { Flex, Text } from "@chakra-ui/layout";
import { MdLocalLaundryService } from 'react-icons/md';
import { Machine as MachineType } from "../services/washstation-service";

export type MachineProps = {
    machine: MachineType;
    [x: string]: any;
}

export const Machine = ({ machine, ...rest }: MachineProps) => {
    // const greenColour = useColorModeValue('teal', '')
    return (
        <Flex justifyContent='center' {...rest}>
            <Flex direction="column" align="center">
                <MdLocalLaundryService size={75} color="teal" />
                <Text maxWidth="100px" isTruncated>{machine.name}</Text>
                <Text color={machine.isAvailable ? '#0a8a64' : 'red'}>{machine.isAvailable ? 'Available' : 'Busy'}</Text>
                {!machine.isAvailable && machine.isBusy &&
                    <Text>{Math.floor(machine.secLeft / 60).toString().padStart(2, '0')}:{(machine.secLeft % 60).toString().padStart(2, '0')}</Text>}
            </Flex>
        </Flex>
    );
}