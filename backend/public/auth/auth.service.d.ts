import { BcryptService } from '../common/helpers/bcrypt.service';
import { User } from '../models/users/entities/user.entity';
import { UsersService } from '../models/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { JwtTokenService } from 'src/common/helpers/jwt-token.service';
export declare class AuthService {
    private readonly userService;
    private readonly bcryptService;
    private readonly jwtService;
    constructor(userService: UsersService, bcryptService: BcryptService, jwtService: JwtTokenService);
    validateUser(userCredentials: LoginDTO): Promise<any>;
    login(user: User): Promise<string>;
}
