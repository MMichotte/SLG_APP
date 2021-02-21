"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const local_strategy_1 = require("./strategies/local.strategy");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const users_module_1 = require("../models/users/users.module");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_service_1 = require("../common/helpers/bcrypt.service");
const jwt_token_service_1 = require("../common/helpers/jwt-token.service");
const env_1 = require("../config/env");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule,
            users_module_1.UsersModule,
            jwt_1.JwtModule.register({
                secret: env_1.default.JWT_PRIVATE_KEY,
                signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            bcrypt_service_1.BcryptService,
            jwt_token_service_1.JwtTokenService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map