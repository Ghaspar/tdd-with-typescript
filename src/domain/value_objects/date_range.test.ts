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

});