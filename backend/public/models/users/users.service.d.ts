import { UserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { BcryptService } from 'src/common/helpers/bcrypt.service';
import { SimpleUserDTO } from './dto/simmple-user.dto';
export declare class UsersService {
    private userRepository;
    private readonly bcryptService;
    constructor(userRepository: typeof User, bcryptService: BcryptService);
    findAll(): Promise<UserDTO[]>;
    findOneByEmail(email: string): Promise<User>;
    findOneById(id: number): Promise<User>;
    create(user: CreateUserDTO): Promise<SimpleUserDTO>;
    update(id: number, user: UpdateUserDTO): Promise<string>;
    remove(id: number): Promise<number>;
}
