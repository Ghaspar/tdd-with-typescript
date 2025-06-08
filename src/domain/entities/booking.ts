import { Property } from './property';
import { User } from './user';
import { DateRange } from '../value_objects/dateRange';

export class Booking {
    private readonly id: string;
    private readonly property: Property;
    private readonly user: User;
    private readonly dateRange: DateRange;
    private readonly numberOfGuests: number;
    private readonly status: 'CONFIRMED' | 'CANCELLED' = 'CONFIRMED';
    private TotalPrice: number;
    
    constructor(
        id: string,
        property: Property, 
        user: User, 
        dateRange: DateRange, 
        numberOfGuests: number
    ) {

        if (numberOfGuests <= 0) {
            throw new Error('O número de hóspedes deve ser maior que zero');
        }

        property.validateMaxGuests(numberOfGuests);

        if (!property.isAvailable(dateRange)) {
            throw new Error('A propriedade já está reservada para as datas selecionadas');
        }

        this.id = id;
        this.property = property;
        this.user = user;
        this.dateRange = dateRange;
        this.numberOfGuests = numberOfGuests;
        this.TotalPrice = property.calculateTotalPrice(dateRange);
        this.status = 'CONFIRMED';

        property.addBooking(this);

    }

    getId(): string {
        return this.id;
    }

    getProperty(): Property { 
        return this.property;
    }

    getUser(): User { 
        return this.user;
    }

    getDateRange(): DateRange { 
        return this.dateRange;
    }

    getNumberOfGuests(): number {
        return this.numberOfGuests;
    }

    // TODO: Poderia apenas criar um teste no booking
    getStatus(): 'CONFIRMED' | 'CANCELLED' {
        return this.status;
    }

    getTotalPrice(): number {
        return this.TotalPrice;
    }

}