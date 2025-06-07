import { dateRange } from './dateRange';

describe('DateRange value object', () => {

    
    it('Deve lançar um erro se a data de termino for antes da data de inicio', () => {
        expect(() => {
            new dateRange(new Date('2024-12-25'), new Date('2024-12-20'));
        }).toThrow('Data de término não pode ser anterior à data de início');
    });

    it('Deve criar um objeto dateRange com datas válidas', () => {
        const startDate = new Date('2024-12-20');
        const endDate = new Date('2024-12-25');
        const validDateRange = new dateRange(startDate, endDate);
        expect(validDateRange.getStartDate()).toEqual(startDate);
        expect(validDateRange.getEndDate()).toEqual(endDate);
    });

    it('Deve calcular o total de noites corretamente', () => {
        const startDate = new Date('2024-12-20');
        const endDate = new Date('2024-12-25');
        const validDateRange = new dateRange(startDate, endDate);

        const totalNights = validDateRange.getTotalNights();
        
        expect(totalNights).toBe(5);
    });

    it('Deve verificar se dois intervalos de dados se sobrepoem', () => {
        // TODO: Teria que criar mais variedades de cenários para garantir esse tipo de teste
        const validdateRange1 = new dateRange(
            new Date('2024-12-20'), 
            new Date('2024-12-25')
        );

        const validdateRange2 = new dateRange(
            new Date('2024-12-22'), 
            new Date('2024-12-27')
        );

        const overlaps = validdateRange1.overlaps(validdateRange2);

        expect(overlaps).toBe(true);

    });

    it('Deve lançar erro se a data de inicio e termino forem iguais', () => {

        const date = new Date('2024-12-20');

        expect(() => {
            new dateRange(date, date);
        }).toThrow('Data de início e término não podem ser iguais');
    });

});