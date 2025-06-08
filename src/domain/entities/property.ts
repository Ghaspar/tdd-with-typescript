import { DateRange } from '../value_objects/dateRange';
import { Booking } from './booking';
export class Property {

    private readonly bookings: Booking[] = [];

    constructor(
        private readonly id: string,
        private readonly name: string,
        private readonly description: string,
        private readonly maxGuests: number,
        private readonly basePricePerNight: number,
    ) {
        if (!id) {
            throw new Error('O ID é obrigatório');
        }
        if (!name) {
            throw new Error('O Nome é obrigatório');
        }
        // if (!description) {
        //     throw new Error('A Descrição é obrigatória');
        // }
        if (maxGuests <= 0) {
            throw new Error('O número máximo de hóspedes deve ser maior que zero');
        }
        // if (basePricePerNight <= 0) {
        //     throw new Error('O preço base por noite deve ser maior que zero');
        // }
    }

    getId(): string {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    getDescription(): string {
        return this.description;
    }
    getMaxGuests(): number {
        return this.maxGuests;
    }
    getBasePricePerNight(): number {
        return this.basePricePerNight;
    }

    validateMaxGuests(guests: number): void {
        if (guests > this.maxGuests) {
            throw new Error(`O número máximo de hóspedes excedido. Máximo permitido: ${this.maxGuests}`);
        }
    }
    calculateTotalPrice(dateRange: DateRange): number {
        const totalNights = dateRange.getTotalNights();
        let totalPrice = totalNights * this.basePricePerNight;

        if (totalNights >= 7) {
            totalPrice *= 0.9;
        }

        return totalPrice;
    }

    isAvailable(dateRange: DateRange): boolean {
        
        return !this.bookings.some(booking =>
            booking.getStatus() === 'CONFIRMED' &&
            booking.getDateRange().overlaps(dateRange)
        );
    }

    addBooking(booking: Booking): void {
       this.bookings.push(booking);
    }

    getBookings(): Booking[] {
        return [...this.bookings];
    }
}