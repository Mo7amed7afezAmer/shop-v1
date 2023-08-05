const express = require("express");
const crudOperations = require("../services/crudOperations");
const router = express.Router();

// Import middleware
const auth = require("../middleware/auth")
const { admin, doctor, user } = require("../middleware/roles")

/*
    =============================================================
    -- crud operation [ get - add - update - delete] on router --
    =============================================================
*/

// 1. get all items in category
router.get("/items-department/:id", async function (req, res) {
    try {
        res.json(await crudOperations.frontGetItemsDepartment(req.params.id));
    } catch (err) {
        return err.message;
    }
});
// get all items in cart [customer]
router.get("/items-cart/:id", async function (req, res) {
    try {
        res.json(await crudOperations.frontGetItemsCart(req.params.id));
    } catch (err) {
        return err.message;
    }
});
// get all category
router.get("/dep", async function (req, res) {
    try {
        res.json(await crudOperations.getALL("department"));
    } catch (err) {
        return err.message;
    }
});
// get all items
router.get("/items", async function (req, res) {
    try {
        res.json(await crudOperations.getALL("item"));
    } catch (err) {
        return err.message;
    }
});
// get item
router.get("/item/:id", async function (req, res) {
    try {
        res.json(await crudOperations.frontGetItem(req.params.id));
    } catch (err) {
        return err.message;
    }
});
// cart routes
// 1. get
router.get("/cart/", [ auth, user ], async function (req, res) {
    try {
        res.json(await crudOperations.frontGetCart(req.userId));
    } catch (err) {
        return err.message;
    }
});
// 2. create
router.post("/add-to-cart/", [ auth, user ], async function (req, res) {
    try {
        res.json(await crudOperations.frontCreateCart("cart", ["user_id", "item_id", "item_quantity"], req.userId, req.body.itemId, req.body.itemQuantity));
    } catch (err) {
        return err.message;
    }
});


module.exports = router;
