import { Business } from "./Busines";


export class reservationModel {
    reservationId: number = 0;
    creationDate: Date = new Date();
    modificationDate?: Date = new Date();
    startDate: Date = new Date();
    endDate: Date = new Date();
    startTime: Date = new Date();
    details: string = '';
    status: boolean = false;
    business?: Business;
}