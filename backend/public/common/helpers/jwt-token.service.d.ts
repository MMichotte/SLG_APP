import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/users/entities/user.entity';
export declare class JwtTokenService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateToken(user: User): Promise<string>;
}
