const express = require("express");
const crudOperations = require("../../services/crudOperations");
const router = express.Router();

// Import middleware
const auth = require("../../middleware/auth")
const { admin } = require("../../middleware/roles")

/*
    =============================================================
    -- crud operation [ get - add - update - delete] on router --
    =============================================================
*/

// 1. get
router.get("/", [ auth, admin ], async function (req, res) {
    try {
        res.json(await crudOperations.getALL("cart"));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
});

module.exports = router;