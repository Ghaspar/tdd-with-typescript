import { Booking } from '../entities/booking';

export interface BookingRepository {
    saveBooking(booking: Booking): Promise<void>;
    findById(id: string): Promise<Booking | null>;
}