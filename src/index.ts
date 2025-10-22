import express from "express";
const userSchema = require("./db/model/models");
const resultSchema = require("./db/model/models");

const app = express();

const db = require("./db/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/create-user", async (req, res) => {
  const {
    name,
    dob,
    gender,
    aadhar_number,
    address,
    photo_path,
    Number,
    Date_of_issue,
    Class_of_Vehicles,
    Issued_by,
    Fee_paid,
    Signature_path,
  } = req.body;
  const userData = await userSchema.create({
    name,
    dob,
    gender,
    aadhar_number,
    address,
    photo_path,
  });
  const resultData = await resultSchema.create({
    Number,
    Date_of_issue,
    Class_of_Vehicles,
    Issued_by,
    Fee_paid,
    Signature_path,
  });

  res.status(200);
});

app.get("all-users", async (req, res) => {
  const allUsers = await userSchema.find({}).toArray();
  res.status(200).send({
    users: allUsers,
  });
});

app.listen(3000, () => {
  console.log("server is listening");
});
