import { Repository } from "typeorm/repository/Repository";
import { UserEntity } from "../persistence/entities/user_entity";
import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user_repository";

export class TypeORMUserRepository implements UserRepository {
    private readonly repository: Repository<UserEntity>;

    constructor(repository: Repository<UserEntity>) {
        this.repository = repository;
    }
    
    
    async saveUser(user: User): Promise<void> {
        const entity = new UserEntity();
        entity.id = user.getId();
        entity.name = user.getName();

        await this.repository.save(entity);
    }
    findUserById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    
}