import { CreateBookingDTO } from "./dtos/create_booking_dto";
import { Booking } from "../domain/entities/booking";
import { BookingRepository } from "../domain/repositories/booking_repository";
import { PropertyService } from "./property_service";
import { UserService } from "./user_service";
import { DateRange } from "../domain/value_objects/dateRange";
import { v4 as uuidv4 } from "uuid";

export class BookingService {
    
    constructor(
        private readonly bookingRepository: BookingRepository, 
        private readonly propertyService: PropertyService,
        private readonly userService: UserService
    )
    {}

    async createBooking(createBookingDTO: CreateBookingDTO): Promise<Booking> {
        const property = await this.propertyService.findById(createBookingDTO.propertyId);
        if (!property) {
            throw new Error('Propriedade não encontrada');
        }

        const guestCount = await this.userService.findUserById(createBookingDTO.userId);
        if (!guestCount) {
            throw new Error('Usuário não encontrado');
        }

        const dateRange = new DateRange(createBookingDTO.startDate, createBookingDTO.endDate); // precisar refatorar para desacoplar

        const newBooking = new Booking(
            uuidv4(), 
            property,
            guestCount,
            dateRange,
            createBookingDTO.guestCount
        );

        await this.bookingRepository.saveBooking(newBooking);
        return newBooking;
    }
    
}