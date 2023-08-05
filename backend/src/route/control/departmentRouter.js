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
        res.json(await crudOperations.getALL("department"));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
});

// 2. add
router.post("/add", [ auth, admin ], async function (req, res) {
    try {
        res.json(await crudOperations.createtObject("department", ["name", "des", "img", "admin_id"], req.body.name, req.body.description, req.body.imagePath, req.adminId));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
});

// 3. update
router.put("/update/:id", [ auth, admin ], async function (req, res, next) {
    try {
        res.json(await crudOperations.updateObject("department", req.params.id, ["name", "des", "img", "admin_id"], req.body.name, req.body.description, req.body.imagePath, req.adminId));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
});

// 4. delete
router.delete("/delete/:id", [ auth, admin ], async function (req, res) {
    try {
        res.json(await crudOperations.deleteObject("department", req.params.id));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
});

module.exports = router;
