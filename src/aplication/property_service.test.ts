import { PropertyService } from './property_service';
import { FakePropertyRepository } from '../infrastructure/repositories/fake_property_repository';
import { Property } from '../domain/entities/property';

describe('PropertyService', () => {

    let propertyService = PropertyService;
    let fakePropertyRepository: FakePropertyRepository;

    beforeEach(() => {
        fakePropertyRepository = new FakePropertyRepository();
        propertyService = new PropertyService(fakePropertyRepository);
    });

    it('Deve retornar null quando o id buscado for inválido', async () => {
        const property = await PropertyService.findPropertyById("999");
        expect(property).toBeNull();
    });
});