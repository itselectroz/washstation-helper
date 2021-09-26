import { Machine } from "./washstation-service";

export class AlarmService {

    public static running: boolean = false;
    public static alarmTriggered: boolean = false;

    public static async update(machines: Machine[]): Promise<void> {
        machines.forEach((machine) => {
            if(machine.isAvailable && this.alarmTriggered) {
                this.triggerAlarm();
            }
        });
    }
    
    public static updateRunning(running: boolean) { 
        this.running = running;
        if(this.running && this.alarmTriggered) {
            this.stopAlarm();
        }
    }

    public static triggerAlarm(): void {
        this.alarmTriggered = true;
    }

    public static stopAlarm(): void {
        this.alarmTriggered = false;
    }
}