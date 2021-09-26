import { Machine } from "./washstation-service";

export class AlarmService {

    public static running: boolean = false;
    public static alarmTriggered: boolean = false;

    public static async update(machines: Machine[]): Promise<void> {
        if(this.running)
            this.alarmTriggered = machines.some((v) => v.isAvailable);
        else
            this.alarmTriggered = false;
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