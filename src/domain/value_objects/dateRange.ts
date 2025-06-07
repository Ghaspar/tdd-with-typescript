export class dateRange{
    
    private readonly startDate: Date;
    private readonly endDate: Date;

    constructor(startDate: Date, endDate: Date) {
        if (endDate < startDate) {
            throw new Error('Data de término não pode ser anterior à data de início');
        }

        this.startDate = startDate;
        this.endDate = endDate;
    }

    getStartDate(): Date {
        return this.startDate;
    }
    getEndDate(): Date {    
        return this.endDate;
    }

    getTotalNights(): number {
        const diffTime = this.endDate.getTime() - this.startDate.getTime();

        return Math.ceil(diffTime / (1000 * 3600 * 24));
    }
}