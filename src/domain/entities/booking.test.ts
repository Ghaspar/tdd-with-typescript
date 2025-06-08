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

    it('Deve lançar o erro se o número hóspedes for zero ou negativo', () => {
        const property = new Property( "1", "Casa", "Descrição", 4, 100 );
        const user = new User ("1", "Lucas Gaspar");
        const validDateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-25'));

        expect(() => {
            new Booking("1", property, user, validDateRange, 0);
        }).toThrow('O número de hóspedes deve ser maior que zero');
    });

    it('Deve lançar o erro ao tentar reservar com número de hóspedes acima do máximo permitido', () => {
        const property = new Property( "1", "Casa", "Descrição", 4, 100 );
        const user = new User ("1", "Lucas Gaspar");
        const validDateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-25'));

        expect(() => {
            new Booking("1", property, user, validDateRange, 5);
        }).toThrow('O número máximo de hóspedes excedido. Máximo permitido: 4');
    });

    it('Deve calcular o preço total com desconto,', () => {
        // ARRANGE
        const property = new Property( "1", "Casa", "Descrição", 4, 300 );
        const user = new User ("1", "Lucas Gaspar");
        const validDateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-30'));

        // ACT
        const booking = new Booking("1", property, user, validDateRange, 4);

        // ASSERT
        expect(booking.getTotalPrice()).toBe(300 * 10 * 0.9); 

    });

    it('Não deve realizar o agendamento quando uma propriedade não estiver disponível,', () => {
        // ARRANGE
        const property = new Property( "1", "Casa", "Descrição", 4, 300 );
        const user = new User ("1", "Lucas Gaspar");
        const validDateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-30'));
        
        const booking = new Booking("1", property, user, validDateRange, 4);
        
        const validDateRange2 = new DateRange(new Date('2024-12-21'), new Date('2024-12-31'));
        
        // ACT

        // ASSERT
        expect(() =>{
            new Booking("2", property, user, validDateRange2, 4);
            }).toThrow('A propriedade já está reservada para as datas selecionadas');

    });

});