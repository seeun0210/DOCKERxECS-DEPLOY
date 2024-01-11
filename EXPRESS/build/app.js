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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = exports.LIST_KEY = void 0;
const express_1 = __importDefault(require("express"));
exports.LIST_KEY = "messages";
const createApp = (client) => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get("/", (request, response) => {
        response.status(200).send("hello from express");
    });
    app.post("/messages", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const { message } = request.body;
        yield client.lPush(exports.LIST_KEY, message);
        response.status(200).send("Message added to list");
    }));
    app.get("/messages", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield client.lRange(exports.LIST_KEY, 0, -1);
        response.status(200).send(messages);
    }));
    return app;
};
exports.createApp = createApp;
