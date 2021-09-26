import { Box, Flex, Wrap, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setLocation } from "../features/user/user-slice";
import { AlarmService } from "../services/alarm-service";
import { useLocationsQuery, useMachinesQuery, WashstationLocation } from "../services/washstation-service";
import { Machine } from "./Machine";
import { OpenSource } from "./OpenSource";
import { ThemeSelector } from "./ThemeSelector";
import Sound from 'react-sound';
import alarm from '../assets/alarm.mp3';

export const Dashboard = () => {
    const dispatch = useAppDispatch();

    const location_id = useAppSelector((state) => state.user.location_id);
    const { data: machines = [] } = useMachinesQuery(location_id != undefined ? location_id : -1, {
        pollingInterval: 500,
    });

    const { data: locations = [] } = useLocationsQuery();

    let currentLocation: WashstationLocation | undefined;
    if (location_id != null) {
        currentLocation = locations.find(v => v.id == location_id);
    }

    const [running, setRunning] = useState(false);

    // I'm certain this is bad practice, feel free to make a PR about this but...
    // Since this gets reloaded every time the machine query responds:
    AlarmService.update(machines);

    function locationChanged(e: any) {
        dispatch(setLocation(e.target.value));
    }

    function toggleRunning() {
        AlarmService.updateRunning(!running);
        setRunning(!running);
    }

    return (
        <Box>
            <Sound
                url={alarm}
                playStatus={AlarmService.alarmTriggered ? 'PLAYING' : 'STOPPED'}
            />
            <Flex minHeight="100vh" minWidth="full" justifyContent="center" align="center">
                <Box>
                    <Box
                        borderWidth={1}
                        borderRadius={4}
                        px={6}
                        width="full"
                        maxWidth="650px"
                        textAlign="center"
                        boxShadow="lg"

                        py={5}
                    >
                        <Flex align="center" justifyContent="center">
                            <Select onChange={locationChanged} flex={5} placeholder={!!currentLocation ? currentLocation.name : "Not Set"}>
                                {locations.map((location) => (
                                    <option value={location.id}>{location.name}</option>
                                ))}
                            </Select>
                            <Box flex={1} />
                            <Button flex={3} textAlign="center" onClick={toggleRunning}>{running ? 'Stop' : 'Start'}</Button>
                            <Text flex={3} textAlign="center" color={running ? '#0a8a64' : 'red'}>{running ? 'Running' : 'Stopped'}</Text>
                        </Flex>
                        <Flex minWidth="full" justifyContent="center" my={5}>
                            <Box height={0.25} width="90%" bg="teal" />
                        </Flex>
                        <Wrap>
                            {machines.map((machine) => (
                                <Machine machine={machine} px={4} />
                            ))}
                        </Wrap>
                    </Box>
                    <OpenSource />
                </Box>
                <Box pos="absolute" top="0" left="0">
                    <ThemeSelector />
                </Box>
            </Flex>
        </Box>
    );
}