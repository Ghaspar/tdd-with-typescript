import { PropertyService } from './property_service';
import { FakePropertyRepository } from '../infrastructure/repositories/fake_property_repository';
import { Property } from '../domain/entities/property';

describe('PropertyService', () => {

    let propertyService: PropertyService;
    let fakePropertyRepository: FakePropertyRepository;

    beforeEach(() => {
        fakePropertyRepository = new FakePropertyRepository();
        propertyService = new PropertyService(fakePropertyRepository);
    });

    it('Deve retornar null quando o id buscado for inválido', async () => {
        const property = await propertyService.findById("999");
        expect(property).toBeNull();
    });

    it('Deve retornar uma propriedade quando um id válido for fornecido', async () => {
        const property = await propertyService.findById("1");
        expect(property).not.toBeNull();
        expect(property?.getId()).toBe("1");
        expect(property?.getName()).toBe("Casa de Praia");
    });

     it('Deve salvar um novo usuário com sucesso usando um repositório fake e buscando novamente', async () => {
            const newProperty = new Property ("1", "Casa de Praia", "Descrição", 1, 200);

            await fakePropertyRepository.saveProperty(newProperty);

            const user = await propertyService.findById("1");
    
            expect(user).not.toBeNull();
            expect(user?.getId()).toBe("1");
            expect(user?.getName()).toBe("Casa de Praia");
            expect(user?.getDescription()).toBe("Descrição");
            expect(user?.getMaxGuests()).toBe(1);
            expect(user?.getBasePricePerNight()).toBe(200);
        });
});