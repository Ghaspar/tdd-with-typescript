import { BookingRepository } from '../../domain/repositories/booking_repository';
import { Booking } from '../../domain/entities/booking';


export class FakeBookingRepository implements BookingRepository {
    private bookings: Booking[] = [];

    async saveBooking(booking: Booking): Promise<void> {
        this.bookings.push(booking);
    }

    async findById(id: string): Promise<any | null> {
        return this.bookings.find((booking) => booking.getId() === id) || null;
    }
}