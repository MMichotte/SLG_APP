"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_dto_1 = require("./create-user.dto");
class UpdateUserDTO extends mapped_types_1.PartialType(create_user_dto_1.CreateUserDTO) {
}
exports.UpdateUserDTO = UpdateUserDTO;
//# sourceMappingURL=update-user.dto.js.map