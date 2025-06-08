import { User } from './user';


describe ('User Entites', () => {
    it('Deve criar uma instância de User com ID e Nome', () => {
        const user = new User ("1", "João Silva");
        expect(user.getId()).toBe("1");
        expect(user.getName()).toBe("João Silva");
    });

    it('Deve lançar um erro se o nome for vazio', () => {
        expect(() => {
            new User("1", "");
        }).toThrow('O Nome é obrigatório');
    });

    it('Deve lançar um erro se o ID for vazio', () => {
        expect(() => {
            new User("", "João");
        }).toThrow('O ID é obrigatório');
    });
    

});