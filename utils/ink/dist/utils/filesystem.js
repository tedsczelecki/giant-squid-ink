"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServerlessService = exports.updatePackageJsonName = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var yaml_1 = __importDefault(require("yaml"));
var updatePackageJsonName = function (_a) {
    var name = _a.name, path = _a.path, scope = _a.scope;
    return __awaiter(void 0, void 0, void 0, function () {
        var packageJsonFilepath, newPackage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    packageJsonFilepath = (0, path_1.join)(path, "package.json");
                    newPackage = require(packageJsonFilepath);
                    newPackage.name = "".concat(scope ? "".concat(scope, "/") : "").concat(name);
                    return [4 /*yield*/, fs_1.promises.writeFile(packageJsonFilepath, JSON.stringify(newPackage, null, 2), "utf-8")];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.updatePackageJsonName = updatePackageJsonName;
var updateServerlessService = function (_a) {
    var name = _a.name, path = _a.path;
    return __awaiter(void 0, void 0, void 0, function () {
        var slsFilepath, sls, yml;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    slsFilepath = (0, path_1.join)(path, "serverless.yml");
                    return [4 /*yield*/, fs_1.promises.readFile(slsFilepath, "utf8")];
                case 1:
                    sls = _b.sent();
                    yml = yaml_1.default.parse(sls);
                    yml.service = name;
                    return [4 /*yield*/, fs_1.promises.writeFile(slsFilepath, yaml_1.default.stringify(yml))];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.updateServerlessService = updateServerlessService;
