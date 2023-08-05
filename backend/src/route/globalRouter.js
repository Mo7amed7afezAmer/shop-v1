const express = require("express");
const crudOperations = require("../services/crudOperations");
const router = express.Router();

// Import middleware
const auth = require("../middleware/auth")
const { admin } = require("../middleware/roles")

/*
    =============================================================
    -- crud operation [ get - add - update - delete] on router --
    =============================================================
*/

// 1. get
router.get("/", [ auth, admin ], async function (req, res) {
    try {
        res.json(await crudOperations.getALL("clinic"));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
});

// 2. add
router.post("/add", [ auth, admin ], async function (req, res) {
    try {
        res.json(await crudOperations.createtObject("clinic", ["name", "start_time", "end_time"], req.body.name, req.body.stime, req.body.etime));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
});

// 3. update
router.put("/update/:doctorId", [ auth, admin ], async function (req, res, next) {
    try {
        res.json(await crudOperations.customUpdateClinic(req.body.cname, req.body.cstart, req.body.cend, req.body.clinicId, req.params.doctorId));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
});

// 4. delete
router.delete("/delete/:id", [ auth, admin ], async function (req, res) {
    try {
        res.json(await crudOperations.deleteObject("clinic", req.params.id));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
});

module.exports = router;
