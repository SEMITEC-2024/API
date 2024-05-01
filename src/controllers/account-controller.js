const db = require("../database/connection");
const bcrypt = require("bcryptjs");

// create user and save it into the database
const createUser = (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const { user_type_id, institution_id, district_id, password, email, name } =
        req.body;

    const hash = bcrypt.hashSync(password, salt);
    const sql = `CALL insert_user(?, ?, ?, ?, ?, ?, ?)`;

    db.query(
        sql,
        [user_type_id, institution_id, district_id, hash, email, name, salt],
        (error) => {
            if (error) throw error;
            res.send("Usuario registrado con exito");
        }
    );
};
module.exports = { createUser };
