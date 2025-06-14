import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user_repository";

export class FakeUserRepository implements UserRepository {
    private users: User[] = [
        new User("1", "John Doe"),
        new User("2", "Jane Smith")
    ];

    async findUserById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.getId() === id);
        return user || null;
    }

    async saveUser(user: User): Promise<void> {
        this.users.push(user);
    }
}