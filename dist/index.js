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
const express_1 = __importDefault(require("express"));
const userSchema = require("./db/model/models");
const resultSchema = require("./db/model/models");
const app = (0, express_1.default)();
const db = require("./db/index");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, dob, gender, aadhar_number, address, photo_path, Number, Date_of_issue, Class_of_Vehicles, Issued_by, Fee_paid, Signature_path, } = req.body;
    const userData = yield userSchema.create({
        name,
        dob,
        gender,
        aadhar_number,
        address,
        photo_path,
    });
    const resultData = yield resultSchema.create({
        Number,
        Date_of_issue,
        Class_of_Vehicles,
        Issued_by,
        Fee_paid,
        Signature_path,
    });
    res.status(200);
}));
app.get("all-users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield userSchema.find({}).toArray();
    res.status(200).send({
        users: allUsers,
    });
}));
app.listen(3000, () => {
    console.log("server is listening");
});
