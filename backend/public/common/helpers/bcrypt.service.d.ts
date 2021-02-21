export declare class BcryptService {
    hashPassword(password: any): Promise<any>;
    comparePassword(enteredPassword: string, dbPassword: string): Promise<any>;
}
