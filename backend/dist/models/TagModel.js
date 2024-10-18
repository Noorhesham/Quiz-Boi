"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tagSchema = new mongoose_1.default.Schema({
    tag: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        required: true
    }
});
const Tag = mongoose_1.default.model('Tag', tagSchema);
exports.default = Tag;
//# sourceMappingURL=TagModel.js.map