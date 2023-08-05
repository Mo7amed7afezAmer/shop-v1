function getData(table, [...cols], ...values) {
   // UPDATE `doctor` SET `id` = NULL, `name` = 'ADAddaFfF afWqw', `password` = 'DWqe', `specialist` = 'asdasdfe3t34tfadfgjasf', `clinic_id` = '4' WHERE `doctor`.`id` = 30;
   let sql = `UPDATE ${ table } SET`;

    let newCols = "";

    for (let i = 0; i < cols.length; i++) {
        newCols = `${newCols} ${cols[i]} = "${values[i]}",`;
    }
    newCols = `${newCols.slice(0, -1)}`;

    sql = `UPDATE ${ table } SET${ newCols } WHERE id = ?`

    return sql
}

// console.log(getData("doctor", ["name", "password", "email"], "mo7amed", "101", "mo7amed@gmail.com"));
console.log(getData("doctor", ["name"], "mo7amed"));

/* ========== clinic ================= */
// custom fetch clinic data
async function customFetchClinic(pstatus) {
    try {

        let sql = ``;
        if (pstatus === "1") {
            // available
            sql = `SELECT * FROM clinic WHERE end_time > TIME(NOW())`;
        } else if (pstatus === "0") {
            // not available
            sql = `SELECT * FROM clinic WHERE end_time < TIME(NOW())`;
            resetDoctorStatus();
        } else {
            sql = `SELECT * FROM clinic WHERE ?`;
        }
        
        // execute query
        let rows = await db.execute(sql, [ pstatus ])
        if (rows[0].length > 0) {
            return {
                ok: true,
                length: rows[0].length,
                content: rows[0]
            }
        } else {
            return {
                ok: false,
                error: `not data found`
            }
        } 
    } catch(err) {
        return err.message;
    }
}
// get not available doctor in one clinic
async function customGetNotAvailable(id) {
    try {
        let sql = `SELECT * FROM doctor WHERE clinic_id = ?`
        // execute query on DB
        let rows = await db.execute(sql, [ id ]);
        if (rows[0].length > 0) {
            return {
                ok: true,
                length: rows[0].length,
                content: rows[0]
            }
        } else {
            return {
                ok: false,
                error: `not data found`
            }
        } 
    } catch(err) {
        return err.message;
    }
}
// update clinic status 
async function simpleUpdate(table, newValue, id) {
    try {
        
        // variables
        let sql = `UPDATE ${ table } SET doctor_status = ${ newValue } WHERE id = ?`;
        
        // a. check data in DB
        let checkModify = await checkData(table, "id", id);
        if (!checkModify.ok) return checkModify;

        
        // b. update data from DB
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
// important update (join)
async function customUpdateClinic(cname, stime, etime, clinicId, doctorId) {
    try {
        
        // variables
        let sql = `
                    UPDATE clinic
                    INNER JOIN doctor ON doctor.clinic_id = clinic.id
                    SET clinic.name = "${ cname }", clinic.start_time = "${ stime }", clinic.end_time = "${ etime }", doctor.d_available = ${ clinicId } 
                    WHERE doctor.id = ?
                    `;

        
        // update data from DB
        let rows = await db.execute(sql, [ doctorId ]);
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

/* ************* media display *************** */
// get available all clinics
async function getClinicForDisplay() {
    try {
        let sql = `
                SELECT clinic.*, doctor.name AS d_name, doctor.specialist, MIN(ticket.ticket_status) AS lowerValue
                FROM doctor
                INNER JOIN clinic ON clinic.id = doctor.clinic_id
                INNER JOIN ticket ON ticket.clinic_id = clinic.id
                WHERE clinic.end_time > TIME(NOW()) AND doctor.specialist != "admin" AND ticket.ticket_status != 0
                GROUP BY clinic.name`;
        deleteTickets();
        // execute query on DB
        let rows = await db.execute(sql);

        if (rows[0].length > 0) {
            return {
                ok: true,
                length: rows[0].length,
                content: rows[0]
            }
        } else {
            return {
                ok: false,
                error: `not data found`
            }
        } 
    } catch(err) {
        return err.message;
    }
}
// get available all clinics
async function getMaxticketNumber(clinicId) {
    try {
        let sql = `
            SELECT MAX(ticket_status) AS higherValue FROM ticket
            WHERE clinic_id = ?`;
        // execute query on DB
        let rows = await db.execute(sql, [ clinicId ]);

        if (rows[0].length > 0) {
            return {
                ok: true,
                content: rows[0]
            }
        } else {
            return {
                ok: false,
                error: `not data found`
            }
        } 
    } catch(err) {
        return err.message;
    }
}
async function updatePatientForDisplay() {
    try {
        let sql = `
            SELECT MIN(ticket_status) AS lowerValue, clinic_id FROM ticket
            WHERE ticket_status != 0`;
        // execute query on DB
        let rows = await db.execute(sql);

        if (rows[0].length > 0) {
            return {
                ok: true,
                content: rows[0]
            }
        } else {
            return {
                ok: false,
                error: `not data found`
            }
        } 
    } catch(err) {
        return err.message;
    }
}



// Patient methods
// custom fetch patient data
async function customFetchPatient(pstatus, pdate, pclinic) {
    try {
        let sql = ``;
        let rows = "";
        if (pstatus === "" && pdate === "" && pclinic === "") {

            sql = `SELECT * FROM patient WHERE ?`;
            // execute query on DB
            rows = await db.execute(sql, [ 11 ]);

        } else if (pstatus !== "" && pdate === "" && pclinic === "") {

            sql = `
                    SELECT patient.name FROM patient
                    INNER JOIN ticket ON patient.id = ticket.patient_id
                    WHERE ?`;
            // execute query on DB
            rows = await db.execute(sql, [ 101 ]);

        } else if (pstatus !== "" && pdate !== "" && pclinic === "") {

            sql = `
                    SELECT patient.name FROM patient
                    INNER JOIN ticket ON patient.id = ticket.patient_id
                    WHERE patient.register_date = ?`;
            // execute query on DB
            rows = await db.execute(sql, [ pdate ]);

        } else if (pstatus !== "" && pdate === "" && pclinic !== "") {

            sql = `
                    SELECT patient.name FROM patient
                    INNER JOIN ticket ON patient.id = ticket.patient_id
                    WHERE ticket.clinic_id = ?`;
            // execute query on DB
            rows = await db.execute(sql, [ pclinic ]);

        } else if (pstatus !== "" && pdate !== "" && pclinic !== "") {

            sql = `
                    SELECT patient.name FROM patient
                    INNER JOIN ticket ON patient.id = ticket.patient_id
                    WHERE patient.register_date = ? AND ticket.clinic_id = ?`;
            // execute query on DB
            rows = await db.execute(sql, [ pclinic, pstatus ]);

        } else if (pstatus === "" && pdate !== "" && pclinic === "") {

            sql = `
                    SELECT patient.name FROM patient
                    WHERE patient.register_date = ?`;
            // execute query on DB
            rows = await db.execute(sql, [ pclinic, pstatus ]);

        } else {
            sql = `
                    SELECT patient.name FROM patient
                    INNER JOIN ticket ON patient.id = ticket.patient_id
                    WHERE patient.register_date = ? AND ticket.clinic_id = ?`;
            // execute query on DB
            rows = await db.execute(sql, [ pclinic, pstatus ]);
        }
        
        if (rows[0].length > 0) {
            return {
                ok: true,
                length: rows[0].length,
                content: rows[0]
            }
        } else {
            return {
                ok: false,
                error: `not data found`
            }
        } 
    } catch(err) {
        return err.message;
    }
}

// control doctor on patient
// get all patient belongs this doctor
async function con_getPatient(clinicId) {
    try {
        let sql = `
            SELECT patient.*, ticket.ticket_status AS ticket_number FROM patient
            INNER JOIN ticket ON patient.id = ticket.patient_id
            WHERE ticket.clinic_id = ?
            ORDER BY ticket.ticket_status ASC
            `;
        // execute query on DB
        let rows = await db.execute(sql, [ clinicId ]);

        if (rows[0].length > 0) {
            return {
                ok: true,
                length: rows[0].length,
                content: rows[0]
            }
        } else {
            return {
                ok: false,
                error: `not data found`
            }
        } 
    } catch(err) {
        return err.message;
    }
}
// update patient ticket
async function con_updatePatientTicket(tstatus, patientId) {
    try {
        
        // variables
        let sql = `
                    UPDATE ticket
                    INNER JOIN patient ON patient.id = ticket.patient_id
                    SET ticket.ticket_status = "${ tstatus }"
                    WHERE patient.id = ?
                `;

        // update data from DB
        let rows = await db.execute(sql, [ patientId ]);
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


// test ===================
// getClinicForDisplay()
// .then(
//     (resolve) => console.log(resolve),
//     (rej) => console.log(rej)
// );