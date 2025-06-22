import { UserEntity } from '../persistence/entities/user_entity';
import { User } from '../../domain/entities/user';
import { DataSource, Repository } from 'typeorm';
import { TypeORMUserRepository } from './typeorm_user_repository';

describe('TypeORMUserRepository',  () => {

    let dataSource: DataSource;
    let userRepository: TypeORMUserRepository;
    let repository: Repository<UserEntity>;

    beforeAll(async() => {

        dataSource = new DataSource({
            type: 'sqlite',
            database: ':memory:',
            synchronize: true,
            entities: [UserEntity],
            dropSchema: true,
            logging: false,
        });

        await dataSource.initialize();
        repository = dataSource.getRepository(UserEntity);
        userRepository = new TypeORMUserRepository(repository);

    });


    afterAll(async () => {
        await dataSource.destroy();
    });


    it('Deve salvar um usuário com sucesso', async () => {
        const user = new User(
            "1",
            "John Doe"
        );
        await userRepository.saveUser(user);

        const savedUser = await repository.findOne({where: {id:"1"}});

        expect(savedUser).toBeDefined();
        expect(savedUser?.id).toBe('1');
    });
});