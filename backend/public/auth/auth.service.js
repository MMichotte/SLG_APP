"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_service_1 = require("../common/helpers/bcrypt.service");
const common_1 = require("@nestjs/common");
const users_service_1 = require("../models/users/users.service");
const jwt_token_service_1 = require("../common/helpers/jwt-token.service");
let AuthService = class AuthService {
    constructor(userService, bcryptService, jwtService) {
        this.userService = userService;
        this.bcryptService = bcryptService;
        this.jwtService = jwtService;
    }
    async validateUser(userCredentials) {
        const user = await this.userService.findOneByEmail(userCredentials.email);
        if (!user) {
            return null;
        }
        const match = await this.bcryptService.comparePassword(userCredentials.password, user.password);
        if (!match) {
            return null;
        }
        const _a = user['dataValues'], { password } = _a, result = __rest(_a, ["password"]);
        return result;
    }
    async login(user) {
        const token = await this.jwtService.generateToken(user);
        return token;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        bcrypt_service_1.BcryptService,
        jwt_token_service_1.JwtTokenService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map