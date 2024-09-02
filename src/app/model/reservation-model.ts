import { Business } from './Busines';

export class reservationModel {
    reservationId: number = 0;
    creationDate: Date = new Date();
    modificationDate?: Date = new Date();
    startDate: Date = new Date();
    endDate: Date = new Date();
    startTime: Date | null = null; // Permitir null aquí
    details: string = '';
    status: number = 0;
    business?: Business;

    constructor(init?: Partial<reservationModel>) {
        Object.assign(this, init);
    }
}