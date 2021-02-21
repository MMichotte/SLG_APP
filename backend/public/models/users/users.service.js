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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const user_dto_1 = require("./dto/user.dto");
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const user_roles_enum_1 = require("./constants/user-roles.enum");
const bcrypt_service_1 = require("../../common/helpers/bcrypt.service");
let UsersService = class UsersService {
    constructor(userRepository, bcryptService) {
        this.userRepository = userRepository;
        this.bcryptService = bcryptService;
    }
    async findAll() {
        const users = await this.userRepository.findAll();
        const noDevUsers = users.filter((user) => { return user.role !== user_roles_enum_1.EUserRoles.DEV; });
        return class_transformer_1.plainToClass(user_dto_1.UserDTO, noDevUsers);
    }
    async findOneByEmail(email) {
        return await this.userRepository.findOne({ where: { email } });
    }
    async findOneById(id) {
        return await this.userRepository.findOne({ where: { id } });
    }
    async create(user) {
        user.password = await this.bcryptService.hashPassword(user.password);
        const createdUser = await this.userRepository.create(user);
        return { id: createdUser.id };
    }
    async update(id, user) {
        return `This action updates a #${id} user`;
    }
    async remove(id) {
        return await this.userRepository.destroy({ where: { id } });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('USERS_REPOSITORY')),
    __metadata("design:paramtypes", [Object, bcrypt_service_1.BcryptService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map