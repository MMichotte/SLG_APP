import { UserDTO } from './dto/user.dto';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { SimpleUserDTO } from './dto/simmple-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<UserDTO[]>;
    create(user: CreateUserDTO): Promise<SimpleUserDTO>;
    update(id: string, user: UpdateUserDTO): Promise<string>;
    remove(id: string): Promise<any[]>;
}
