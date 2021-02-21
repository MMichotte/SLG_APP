"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
let BcryptService = class BcryptService {
    async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
    async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
};
BcryptService = __decorate([
    common_1.Injectable()
], BcryptService);
exports.BcryptService = BcryptService;
//# sourceMappingURL=bcrypt.service.js.map