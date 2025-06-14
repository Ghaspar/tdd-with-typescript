import { CreateBookingDTO } from './dtos/create_booking_dto';
import { BookingService } from './booking_service';
import { FakeBookingRepository } from '../infrastructure/repositories/fake_booking_repository';
import { Booking } from '../domain/entities/booking';

describe('BookingService', () => {
    it('Deve criar uma reserva com sucesso usando repositório fake', async() => {
        // arrange
        const bookingDTO: CreateBookingDTO = {
            propertyId: '1',
            userId: '123',
            startDate: new Date('2024-10-01'),
            endDate: new Date('2024-10-05'),
            guestCount: 2
        }
        // act
        const result = await bookingService.createBooking(bookingDTO);

        // assert
        expect(result).toBeInstanceOf(booking);
        expect(result.getGuestCount()).toBe(2);
        expect(result.getTotalPrice()).toBe(800);

        const savedBooking = await fakeBookingRepository.findById(result.getId());

        expect(savedBooking).not.toBeNull();
        expect(savedBooking?.getId()).toBe(result.getId());
    });

});