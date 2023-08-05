// Import dependencies
const express = require("express");
const crudOperations = require("../services/crudOperations");

// Create router object
const router = express.Router();

// auth router => admin
router.post("/", async function (req, res, next) {
    try {
        // res.json(await crudOperations.isLogin(req.body.name, req.body.password));
        req.authData = await crudOperations.isLogin("admin", req.body.name, req.body.password);
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
});

// login patient router
router.post("/user", async function (req, res, next) {
    try {
        // res.json(await crudOperations.isLogin(req.body.name, req.body.password));
        req.authData = await crudOperations.isLogin("customer", req.body.name, req.body.password);
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
});
// register patient router
router.post("/user-register", async function (req, res, next) {
    try {
        // res.json(await crudOperations.isLogin(req.body.name, req.body.password));
        req.isRegister = await crudOperations.createtObject("customer", ["name", "password", "email"], req.body.name, req.body.password, req.body.email);
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
}, async function (req, res, next) {
    try {
        if (req.isRegister.ok) {
            req.authData = await crudOperations.isLogin("customer", req.body.name, req.body.password);
        } else {
            req.authData = req.isRegister;
        }
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
});

module.exports = router