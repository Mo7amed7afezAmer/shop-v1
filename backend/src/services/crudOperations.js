// Import dependecies
const jwt = require("jsonwebtoken");
const db = require("./db");
const { langs } = require("./langs");

/*
    ======================
    -- services methods --
    ======================
*/

// isLogin
async function isLogin(table, name, pass) {
    try {

        // variables
        let sql = `SELECT * FROM ${table} WHERE name = ? AND password = ?`;

        // execute query on db, get user
        let user = await db.execute(sql, [name, pass]);
        
        // Check if the user is not there in db return error
        if (!user[0].length > 0) return {
            ok: false,
            error: `invalid name or password`
        }
        console.log(user[0]);
        // Create token
        const token = jwt.sign({
            id: user[0].id,
            roles: user[0],
        }, "jwtPrivateKey", { expiresIn: "7d" });

        // return user to client
        return {
            ok: true,
            token: token,
            profileInfo: user[0]
        };

    } catch(err) {
        return err.message;
    }

}

// check the data
async function checkData(table, col, val) {
    try {
        // variables
        let sql = `SELECT * from ${table} WHERE ${ col } = ?`;
        let rows = await db.execute(sql, [ val ]);
        if (rows[0].length > 0) {
            return {
                ok: true,
                message: langs("checkMessage", rows[0].length)
            }
        } else {
            return {
                ok: false,
                error: langs("checkError", rows[0].length)
            }
        }

    } catch(err) {
        return err.message;
    }
}

/*
    ===============================================================
    -- crud operation [ get - add - update - delete] on Database --
    ===============================================================
*/

// 1. Get all
async function getALL(table) {
    try {
        
        // Variables
        let sql = `SELECT * FROM ${table} WHERE ?`;

        // Execute query on DB
        let rows = await db.execute(sql, [1]);

        // Check if doctors are not there in db return error
        if (rows[0].length < 1) return {
            ok: false,
            error: `not found doctors`
        }

        return {
            ok: true,
            length: rows[0].length,
            content: rows[0]
        };

    } catch (err) {
        return err.message;
    }
}

// 2. add
async function createtObject(table, [...cols], ...values) {
    try {
         /*
             ------------------------------------
             --- Steps to insert data into DB ---
             ------------------------------------
             a. check the data is exist or is not
             b. validation on server
             c. validation on DB  ==> not exist
             d. insert data into DB
         */
 
         // general settings ******************************
         // to create dynamic sql query
         let newCols = "";
         let placeValue = "";
     
         for (let i = 1; i <= cols.length; i++) {
             newCols = `${newCols} ${cols[i-1]},`;
             placeValue = `${placeValue} ?,`;
         }
         newCols = `(${newCols.slice(0, -1)} )`;            //  (  name, password, email )
         placeValue = `(${placeValue.slice(0, -1)} )`;     //  (?, ?, ?)
 
         // *************************************** end settings
 
         // variables 🚩 ✅
         let sql = `INSERT INTO ${ table } ${ newCols } VALUES ${ placeValue }`;
 
         // a. check the data is exist or is not
         if (values[0] === "" && isNaN(values[0])) {
             return {
                 ok: false,
                 error: langs("checkData", "insert") // msg method
             }
         }
         // b. validation on server
         if (values[0].length < 10 && isNaN(values[0])) {
             return {
                 ok: false,
                 error: langs("checkDataServer")
             }
         }
         // c. validation on DB
         let checkDb = await checkData(table, cols[0], values[0]); // { ok: false, error: '0 row exsit' }
         if (checkDb.ok) return {
             ok: false,
             error: checkDb.message
         }
         // d. insert data into DB
         let rows = await db.execute(sql, values);

         // true 
         if (rows[0].affectedRows > 0) {
             return {
                 ok: true,
                 message: langs("addMessage", rows[0].affectedRows),
             }
         } else {
             return {
                 ok: false,
                 error: langs("addMessage", rows[0].affectedRows)
             }
         }

 
    } catch(err) {
         return err.message;
    }
  }
// 3. update
 async function updateObject(table, id, [...cols], ...values) {
    try {
         /*
             ------------------------------------
             --- Steps to update data into DB ---
             ------------------------------------
             a. check data in DB 
             b. check the data is exist or is not
             c. validation on server
             d. validation on DB  ==> not exist
             e. insert data into DB
         */
 
         // general settings ******************************
         // to create dynamic sql query
         let newCols = "";
 
         for (let i = 0; i < cols.length; i++) {
             newCols = `${newCols} ${cols[i]} = "${values[i]}",`;
         }
         newCols = `${newCols.slice(0, -1)}`;
 
         // *************************************** end settings
 
         // variables 🚩 ✅
         let sql = `UPDATE ${ table } SET ${ newCols } WHERE id = ?`
 
        // a. check check data in DB
        let checkModify = await checkData(table, "id", id);
        if (!checkModify.ok) return checkModify;

        // b. check the data is exist or is not
        if (values[0] === "") {
            return {
                ok: false,
                error: langs("checkData", "insert") // msg method
            }
        }
        // c. validation on server
        if (values[0].length < 10) {
            return {
                ok: false,
                error: langs("checkDataServer")
            }
        }
        // d. validation on DB
        let checkDb = await checkData(table, cols[0], values[0]); // { ok: false, error: '0 row exsit' }
        if (checkDb.ok) return {
            ok: false,
            error: checkDb.message
        }
        // e. insert data into DB
        let rows = await db.execute(sql, [ id ]);
        // true 
        if (rows[0].affectedRows > 0) {
            return {
                ok: true,
                message: langs("addMessage", rows[0].affectedRows),
            }
        } else {
            return {
                ok: false,
                error: langs("addMessage", rows[0].affectedRows)
            }
        }
 
    } catch(err) {
         return err.message;
    }
  }

// 4. delete with id
async function deleteObject(table, id) {
    try {
        /*
           ------------------------------------
           --- Steps to delete data from DB ---
           ------------------------------------
           a. check the data is exist or is not
           b. validation on server
           c. delete data
        */
        
        // variables
        let sql = `DELETE FROM ${ table } WHERE id = ?`;
        // a. check the data is exist or is not
        if (typeof id !== "undefined") {
            // b. validation on server
            if (isNaN(id)) {
                return {
                    ok: false,
                    error: langs("deleteErrorNotNumber") // msg method
                }
            }
            // c. delete data [true - false]
            let rows = await db.execute(sql, [id]);
            if (rows[0].affectedRows > 0) {
                return {
                    ok: true,
                    message: langs("deleteMessage", "", rows[0].affectedRows)  // msg method
                }
            } else {
                return {
                    ok: false,
                    error: langs("deleteMessage")  // msg method
                }
            }

        } else {
            return {
                ok: false,
                error: langs("deleteErrorNotFound") // msg method
            }
        }
        
    } catch(err) {
        return err.message;
    }
}

/*
    ======================================================================
    -- custom crud operation [display part (site - mobile app)] --
    ======================================================================
*/

async function frontGetItemsDepartment(depId) {
    try {
        let sqlDepartment = `SELECT * FROM department WHERE id = ?`
        let sqlItem = `
                    SELECT item.* FROM item
                    INNER JOIN department ON item.dep_id = department.id
                    WHERE department.name = ?`;
        // execute query on DB
        let items = await db.execute(sqlItem, [ depId ]);
        let deps = await db.execute(sqlDepartment, [ depId ]);
        

        if (items[0].length > 0) {
            return {
                ok: true,
                length: items[0].length,
                cat: deps[0],
                items: items[0]
            }
        } else {
            return {
                ok: false,
                error: langs("notFoundData")
            }
        } 
    } catch(err) {
        return err.message;
    }
}
async function frontGetItemsCart(customerId) {
    try {
        let sql = `
            SELECT item.*, cart.*
            FROM cart
            INNER JOIN item ON cart.item_id = item_id
            WHERE cart.user_id = ?
            `;
        // execute query on DB
        let rows = await db.execute(sql, [ customerId ]);

        if (rows[0].length > 0) {
            return {
                ok: true,
                length: rows[0].length,
                content: rows[0]
            }
        } else {
            return {
                ok: false,
                error: langs("notFoundData")
            }
        } 
    } catch(err) {
        return err.message;
    }
}
async function frontGetItem(id) {
    try {
        let sql = `SELECT * FROM item WHERE name = ?`;
        // execute query on DB
        let items = await db.execute(sql, [ id ]);
        

        if (items[0].length > 0) {
            return {
                ok: true,
                length: items[0].length,
                item: items[0]
            }
        } else {
            return {
                ok: false,
                error: langs("notFoundData")
            }
        } 
    } catch(err) {
        return err.message;
    }
}
// cart operations
// 1. Read
async function frontGetCart(id) {
    try {
        let sql = `
                    SELECT cart.item_id, cart.item_quantity, item.name, item.price
                    FROM cart
                    INNER JOIN item ON cart.item_id = item.id
                    WHERE cart.user_id = ?`;
        // execute query on DB
        let items = await db.execute(sql, [ id ]);
        

        if (items[0].length > 0) {
            return {
                ok: true,
                length: items[0].length,
                item: items[0]
            }
        } else {
            return {
                ok: false,
                error: langs("notFoundData")
            }
        } 
    } catch(err) {
        return err.message;
    }
}
// 2. add
async function frontCreateCart(table, [...cols], ...values) {
    try {
         /*
             ------------------------------------
             --- Steps to insert data into DB ---
             ------------------------------------
             a. check the data is exist or is not
             b. validation on server
             c. validation on DB  ==> not exist
             d. insert data into DB
         */
 
         // general settings ******************************
         // to create dynamic sql query
         let newCols = "";
         let placeValue = "";
     
         for (let i = 1; i <= cols.length; i++) {
             newCols = `${newCols} ${cols[i-1]},`;
             placeValue = `${placeValue} ?,`;
         }
         newCols = `(${newCols.slice(0, -1)} )`;            //  (  name, password, email )
         placeValue = `(${placeValue.slice(0, -1)} )`;     //  (?, ?, ?)
 
         // *************************************** end settings
 
         // variables 🚩 ✅
         let sql = `INSERT INTO ${ table } ${ newCols } VALUES ${ placeValue }`;

         // d. insert data into DB
         let rows = await db.execute(sql, values);

         // true 
         if (rows[0].affectedRows > 0) {
             return {
                 ok: true,
                 message: langs("addMessage", rows[0].affectedRows),
             }
         } else {
             return {
                 ok: false,
                 error: langs("addMessage", rows[0].affectedRows)
             }
         }

 
    } catch(err) {
         return err.message;
    }
  }
// 3.update
async function frontUpdateCart(uid, itemId, val) {
    try {
        let sql = `UPDATE cart SET item_quantity = ${ val } WHERE user_id = ? AND item_id = ?`;
        // execute query on DB
        let items = await db.execute(sql, [ uid, itemId ]);
        

        if (items[0].length > 0) {
            return {
                ok: true,
                length: items[0].length,
                item: items[0]
            }
        } else {
            return {
                ok: false,
                error: langs("notFoundData")
            }
        } 
    } catch(err) {
        return err.message;
    }
}
// 2.update


module.exports = {
    isLogin,
    // global
    getALL,
    createtObject,
    updateObject,
    deleteObject,
    // [display part (site - mobile app)]
    frontGetItemsDepartment,
    frontGetItemsCart,
    frontGetItem,
    // cart operation
    frontGetCart,
    frontCreateCart,
    frontUpdateCart,
}
