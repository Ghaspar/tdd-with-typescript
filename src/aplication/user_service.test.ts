import { UserService } from "./user_service";
import { FakeUserRepository } from "../infrastructure/repositories/fake_user_repository";
import { User } from "../domain/entities/user";

describe('UserService',() => {

    let userService: UserService;
    let fakeUserRepository: FakeUserRepository;

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        userService = new UserService(fakeUserRepository);
    });

    it('Deve retornar null quando o id buscado for inválido', async () => {
        const user = await userService.findUserById("999");
        expect(user).toBeNull();
    });

    it('Deve retornar um usuário quando um id válido for fornecido', async () => {
        const user = await userService.findUserById("1");
        expect(user).not.toBeNull();
        expect(user?.getId()).toBe("1");
        expect(user?.getName()).toBe("John Doe");
    });

    it('Deve salvar um novo usuário com sucesso usando um repositório fake e buscando novamente', async () => {
        const newUser = new User("3", "Test user");

        await fakeUserRepository.saveUser(newUser);

        const user = await userService.findUserById("3");

        expect(user).not.toBeNull();
        expect(user?.getId()).toBe("3");
        expect(user?.getName()).toBe("Test user");
    });

});

