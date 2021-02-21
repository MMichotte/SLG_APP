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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("./dto/user.dto");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const simmple_user_dto_1 = require("./dto/simmple-user.dto");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_roles_enum_1 = require("./constants/user-roles.enum");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAll() {
        return await this.usersService.findAll();
    }
    async create(user) {
        const existingUser = await this.usersService.findOneByEmail(user.email);
        if (existingUser)
            throw new common_1.HttpException('Email already taken', common_1.HttpStatus.UNAUTHORIZED);
        return await this.usersService.create(user);
    }
    async update(id, user) {
        return await this.usersService.update(+id, user);
    }
    async remove(id) {
        const user = await this.usersService.findOneById(+id);
        if (user == undefined)
            throw new common_1.NotFoundException;
        if (user.role === user_roles_enum_1.EUserRoles.DEV)
            throw new common_1.HttpException('You are not allowed to delete a `dev` user!', common_1.HttpStatus.UNAUTHORIZED);
        await this.usersService.remove(+id);
        return [];
    }
};
__decorate([
    common_1.Get(),
    roles_decorator_1.Roles(user_roles_enum_1.EUserRoles.ADMIN),
    swagger_1.ApiResponse({
        status: 200,
        type: user_dto_1.UserDTO,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiResponse({
        status: 201,
        type: simmple_user_dto_1.SimpleUserDTO,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    common_1.Patch(':id'),
    swagger_1.ApiResponse({
        status: 200,
        type: simmple_user_dto_1.SimpleUserDTO,
    }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    common_1.Controller('users'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiTags('users'),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map