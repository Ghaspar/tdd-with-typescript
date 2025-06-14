import { Property } from "../../domain/entities/property";
import { PropertyRepository } from "../../domain/repositories/property_repository";

export class FakePropertyRepository implements PropertyRepository{
     private properties: Property[] = [
            new Property("1", "Casa de Praia", "Descrição", 1, 200),
            new Property("2", "Apartamento no centro", "Descrição", 1, 200)
        ];
    
        async findById(id: string): Promise<Property | null> {
            const property = this.properties.find(property => property.getId() === id);
            return property || null;
        }
    
        async saveProperty(user: Property): Promise<void> {
            this.properties.push(user);
        }

}