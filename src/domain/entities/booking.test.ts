import { Property } from './property';
import { User } from './user';
import { DateRange } from '../value_objects/dateRange';
import { Booking } from './booking';

describe('Booking Entity', () => {

    it('Deve criar uma instância de Booking com os atributos', () => {

        // TODO: Fazendo de modo aclopado, ideal era usar uma interface
        // TODO: Utilizar talvez um pattern test data builder

        const property = new Property( "1", "Casa", "Descrição", 4, 100 );
        const user = new User ("1", "Lucas Gaspar");
        const validDateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-25'));


        const bokking = new Booking("1", property, user, validDateRange, 2);

        expect(bokking.getId()).toBe("1");
        expect(bokking.getProperty()).toEqual(property);
        expect(bokking.getUser()).toEqual(user);
        expect(bokking.getDateRange()).toEqual(validDateRange);
        expect(bokking.getNumberOfGuests()).toBe(2);
        
    });


});