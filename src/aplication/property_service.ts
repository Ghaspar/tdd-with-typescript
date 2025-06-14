import { PropertyRepository } from "../domain/repositories/property_repository";
import { Property } from "../domain/entities/property";


export class PropertyService {
    constructor(
        private readonly propertyRepository: PropertyRepository
    ) {}

    async findById(id: string): Promise<Property | null> {
        return await this.propertyRepository.findById(id);
    }

    // async saveProperty(property: Property): Promise<void> {
    //     await this.propertyRepository.saveProperty(property);
    // }
}