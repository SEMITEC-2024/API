const db = require("../database/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// get user-account type
const getUserType = (req, res) => {
    const sql = "CALL get_user_type()";
    db.query(sql, (error, result, fields) => {
        if (error) throw error;
        res.json(result[0]);
    });
};

// get countries
const getCountries = (req, res) => {
    const sql = "CALL get_country()";
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result[0]);
    });
};

// get provinces from country
const getProvinces = (req, res) => {
    const sql = "CALL get_province(?)";
    db.query(sql, [req.query.country_id], (error, result) => {
        if (error) throw error;
        res.json(result[0]);
    });
};

// get cantons from province
const getCantons = (req, res) => {
    const sql = "CALL get_cantons(?)";
    db.query(sql, [req.query.province_id], (error, result) => {
        if (error) throw error;
        res.json(result[0]);
    });
};

// get institutions from country
const getInstitutions = (req, res) => {
    const sql = "CALL get_institution(?)";
    db.query(sql, [req.query.country_id], (error, result) => {
        if (error) throw error;
        res.json(result[0]);
    });
};

// create user and save it into the database
const createUser = (req, res) => {
    try {
            console.log(req.body)

        const salt = bcrypt.genSaltSync(10);
        const { user_type_id, institution_id, district_id, password, email, name } =
            req.body;

        const hash = bcrypt.hashSync(password, salt);
        const sql = `CALL insert_user(?, ?, ?, ?, ?, ?, ?)`;

        db.query(
            sql,
            [user_type_id, institution_id, district_id, hash, email, name, salt],
            (error) => {
                if (error) {
                    console.log(error)
                };
                res.json({ message: "Usuario registrado con exito"});
            }
        );
    } catch (error) {
        console.log(error);
    }
};

// gets the encrypted password from bd and compares it
const login = (req, res) => {
    const { password, email } = req.body;
    const sql = "CALL login(?)";
    db.query(sql, [email], (error, result) => {
        if (error) throw error;
        let permission = false;
        let message = "Este usuario no se encuentra registrado";
        let token = "";
        let user_type = "";
        if (result[0].length !== 0) {
            const rows = result[0][0];
            permission = bcrypt.compareSync(password, rows.password);
            if (permission === true) {
                user_type = rows.user_type_name;
                message = "Usuario autenticado con éxito";
                token = jwt.sign(
                    {
                        user_id: `${rows.user_id}`,
                        user_type_id: `${rows.user_type_id}`,
                        username: `${rows.username}`,
                        user_type_name: `${rows.user_type_name}`,
                    },
                    process.env.TOKEN_KEY
                );
                res.set("Access-Control-Expose-Headers", "*");
                return res.header("auth-token", token).json({
                    permission: `${permission}`,
                    message: `${message}`,
                    user_type_name: `${user_type}`,
                });
            }
            message = "Contraseña incorrecta";
            return res.status(401).json({
                permission: `${permission}`,
                message: `${message}`,
                user_type_name: `${user_type}`,
            });
        }
    });
};

const getProfileInfo = (req, res) => {
    console.log(req.teacher_id, 'profile');
    const sql = "CALL get_user(?)";
    db.query(sql, [req.teacher_id], (error, result) => {
        if (error) throw error;
        res.json(result[0][0]);
    });
};

const getProfileInfoTeacher = (req, res) => {
    console.log(req.query.user_id, 'profile');
    const sql = "CALL get_user(?)";
    db.query(sql, [req.query.user_id], (error, result) => {
        if (error) throw error;
        res.json(result[0][0]);
    });
};

const getUsername = (req, res) => {
    res.json({ username: req.username });
};

module.exports = {
    getUserType,
    getCountries,
    getProvinces,
    getCantons,
    getInstitutions,
    createUser,
    login,
    getProfileInfo,
    getUsername,
    getProfileInfoTeacher,
};
