import { CreateBookingDTO } from './dtos/create_booking_dto';
import { BookingService } from './booking_service';
import { FakeBookingRepository } from '../infrastructure/repositories/fake_booking_repository';
import { Booking } from '../domain/entities/booking';
import { PropertyService } from './property_service';
import { UserService } from './user_service';

jest.mock('./property_service');
jest.mock('./user_service');

describe('BookingService', () => {

    let bookingService: BookingService;
    let fakeBookingRepository: FakeBookingRepository;

    let mockPropertyService: jest.Mocked<PropertyService>;
    let mockUserService: jest.Mocked<UserService>;

    beforeEach(() => {
        const mockPropertyRepository = {} as any;
        const mockUserRepository = {} as any;

        mockPropertyService = new PropertyService(
            mockPropertyRepository
        ) as jest.Mocked<PropertyService>;

        mockUserService = new UserService(
            mockUserRepository
        ) as jest.Mocked<UserService>;

        fakeBookingRepository = new FakeBookingRepository();

        bookingService = new BookingService(
            fakeBookingRepository,
            mockPropertyService,
            mockUserService
        );
    });

    it('Deve criar uma reserva com sucesso usando repositório fake', async() => {

        const mockProperty = {
            getId: jest.fn().mockReturnValue('1'),
            isAvailable: jest.fn().mockReturnValue(true),
            validateMaxGuests: jest.fn().mockReturnValue(5),
            calculateTotalPrice: jest.fn().mockReturnValue(800),
            addBooking: jest.fn().mockReturnValue('CONFIRMED')
        } as any;

        const mockUser = {
            getId: jest.fn().mockReturnValue('1')
        } as any;

        mockPropertyService.findById.mockResolvedValue(mockProperty);
        mockUserService.findUserById.mockResolvedValue(mockUser);

        const bookingDTO: CreateBookingDTO = {
            propertyId: '1',
            userId: '123',
            startDate: new Date('2024-05-01'),
            endDate: new Date('2024-05-05'),
            guestCount: 2
        }

        const result = await bookingService.createBooking(bookingDTO);

        expect(result).toBeInstanceOf(Booking);
        expect(result.getStatus()).toBe('CONFIRMED');
        expect(result.getTotalPrice()).toBe(800);

        const savedBooking = await fakeBookingRepository.findById(result.getId());

        expect(savedBooking).not.toBeNull();
        expect(savedBooking?.getId()).toBe(result.getId());
    });

    it('Deve lançar um erro quando a propriedade não for encontrada', async() => {

        mockPropertyService.findById.mockResolvedValue(null);

        const bookingDTO: CreateBookingDTO = {
            propertyId: '1',
            userId: '123',
            startDate: new Date('2024-05-01'),
            endDate: new Date('2024-05-05'),
            guestCount: 2
        }

        await expect(bookingService.createBooking(bookingDTO)).rejects.toThrow('Propriedade não encontrada');
    });

    it('Deve lançar um erro quando um usuário não for encontrado', async() => {

        const mockProperty = {
            getId: jest.fn().mockReturnValue('1'),
        } as any;

        mockPropertyService.findById.mockResolvedValue(mockProperty);
        mockUserService.findUserById.mockResolvedValue(null);

        const bookingDTO: CreateBookingDTO = {
            propertyId: '1',
            userId: '123',
            startDate: new Date('2024-05-01'),
            endDate: new Date('2024-05-05'),
            guestCount: 2
        }

        await expect(bookingService.createBooking(bookingDTO)).rejects.toThrow('Usuário não encontrado');
    });

    it('Deve lançar um erro ao tentar criar reserva para um periodo já reservado', async() => {

        const mockProperty = {
            getId: jest.fn().mockReturnValue('1'),
            isAvailable: jest.fn().mockReturnValue(true),
            validateMaxGuests: jest.fn().mockReturnValue(5),
            calculateTotalPrice: jest.fn().mockReturnValue(800),
            addBooking: jest.fn().mockReturnValue('CONFIRMED')
        } as any;

        const mockUser = {
            getId: jest.fn().mockReturnValue('1')
        } as any;

        mockPropertyService.findById.mockResolvedValue(mockProperty);
        mockUserService.findUserById.mockResolvedValue(mockUser);

        const bookingDTO: CreateBookingDTO = {
            propertyId: '1',
            userId: '123',
            startDate: new Date('2024-05-01'),
            endDate: new Date('2024-05-05'),
            guestCount: 2
        }

        const result = await bookingService.createBooking(bookingDTO);

        mockProperty.isAvailable.mockReturnValue(false);
        mockProperty.addBooking.mockImplementationOnce(() => {
            throw new Error('A propriedade já está reservada para as datas selecionadas');
        });

        await expect(bookingService.createBooking(bookingDTO)).rejects.toThrow('A propriedade já está reservada para as datas selecionadas'); 
    });

    it('Deve cancelar uma reserva existente usando o repositório fake', async() => {

        const mockProperty = {
            getId: jest.fn().mockReturnValue('1'),
            isAvailable: jest.fn().mockReturnValue(true),
            validateMaxGuests: jest.fn().mockReturnValue(5),
            calculateTotalPrice: jest.fn().mockReturnValue(800),
            addBooking: jest.fn().mockReturnValue('CONFIRMED'),
        } as any;

        const mockUser = {
            getId: jest.fn().mockReturnValue('1')
        } as any;

        mockPropertyService.findById.mockResolvedValue(mockProperty);
        mockUserService.findUserById.mockResolvedValue(mockUser);

        const bookingDTO: CreateBookingDTO = {
            propertyId: '1',
            userId: '123',
            startDate: new Date('2024-05-01'),
            endDate: new Date('2024-05-05'),
            guestCount: 2
        }


        const booking = await bookingService.createBooking(bookingDTO);

        const spyFindById = jest.spyOn(fakeBookingRepository, 'findById');

        await bookingService.cancelBooking(booking.getId());

        const cancelledBooking = await fakeBookingRepository.findById(booking.getId());
        
        expect(cancelledBooking.getStatus()).toBe('CANCELLED');
        expect(spyFindById).toHaveBeenCalledWith(booking.getId());
        expect(spyFindById).toHaveBeenCalledTimes(2);

        spyFindById.mockRestore();

    });

});