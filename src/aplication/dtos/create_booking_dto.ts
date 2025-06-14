export interface CreateBookingDTO {
    propertyId: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    guestCount: number;
}