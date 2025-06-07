import { Property } from './property';
import { DateRange } from '../value_objects/dateRange';


describe('Proberty Entity', () => {
    it('Deve criar uma instrancia de Property com todos os atributos', () => {
        const property = new Property(
            "1",
            "Casa de Praia",
            "Uma bela casa na praia",
            4,
            200);
        expect(property.getId()).toBe("1");
        expect(property.getName()).toBe("Casa de Praia");
        expect(property.getDescription()).toBe("Uma bela casa na praia");
        expect(property.getMaxGuests()).toBe(4);
        expect(property.getBasePricePerNight()).toBe(200);
    });

    it('Deve lançar um erro se o Nome for vazio', () => {
        expect(() => {
            new Property("1", "", "Descrição", 4, 200);
        }).toThrow('O Nome é obrigatório');
    });

    it('Deve lançar um erro se o número de hospedes for zero ou negativo', () => {
        expect(() => {
            new Property("1", "Casa de Praia", "Descrição", 0, 200);
        }).toThrow('O número máximo de hóspedes deve ser maior que zero');
        expect(() => {
            new Property("1", "Casa de Praia", "Descrição", -1, 200);
        }).toThrow('O número máximo de hóspedes deve ser maior que zero');
    });

    it('Deve validar o número máximo de hóspedes', () => {
        const property = new Property("1", "Casa de Praia", "Descrição", 5, 150);
        expect(()=> {   
            property.validateMaxGuests(6);
        }).toThrow('O número máximo de hóspedes excedido. Máximo permitido: 5');
    });

    it('Deve lançar um erro se o ID for vazio', () => {
        expect(() => {
            new Property("", "Casa de Praia", "Uma bela casa na praia", 4, 200);
        }).toThrow('O ID é obrigatório');
    });

    it('Não deve aplicar descontos para estadias menores que 7 noites', () => {
        const property = new Property("1", "Apartamento", "Descrição", 2, 100);
        const dateRange = new DateRange(
            new Date('2024-10-01'),
            new Date('2024-10-05')
        )
        const totalPrice = property.calculateTotalPrice(dateRange);
        expect(totalPrice).toBe(600);
    });
});