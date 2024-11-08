const db = require("../database/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// get user-account type
const getUserType = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_user_type()'
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener los tipos de usuario", error: error });
  }
};

// get all the countries
const getCountries = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_country()'
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener los paises", error: error });
  }
};

// get provinces from country
const getProvinces = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_province($1)',
      [req.query.country_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener las provincias", error: error });
  }
};

// get cantons from province
const getCantons = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_canton($1)',
      [req.query.province_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener los cantones", error: error });
  }
};

// get districts from canton
const getDistricts = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_district($1)',
      [req.query.canton_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener los distritos", error: error });
  }
};

// get institutions from country
const getInstitutions = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_institution($1)',
      [req.query.country_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener las instituciones", error: error });
  }
};

// get educational levels
const getEducationLevels = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_education_level()'
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "Error al obtener los niveles educativos",
        error: error,
      });
  }
};

// create user with the teacher role and save it into the database
const registerTeacher = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const {
      user_type_id,
      institution_id,
      district_id,
      name,
      password,
      email,
      other_signs,
    } = req.body;

    const hash = bcrypt.hashSync(password, salt);

    const sql =
      'SELECT * from "Typing-Game-DB".insert_teacher($1, $2, $3, $4, $5, $6, $7)';
    const values = [
      user_type_id,
      institution_id,
      district_id,
      name,
      hash,
      email,
      other_signs || "not provided",
    ];

    const result = await db.pool.query(sql, values);
    res.json({ message: "Usuario registrado con exito" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al registrar el usuario", error: error });
  }
};

// create user with the student role and save it into the database
const registerStudent = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const {
      user_type_id,
      institution_id,
      district_id,
      name,
      password,
      email,
      other_signs,
      education_level_id,
      date_birth,
    } = req.body;

    const hash = bcrypt.hashSync(password, salt);

    const sql =
      'SELECT * from "Typing-Game-DB".insert_student($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const values = [
      user_type_id,
      institution_id,
      district_id,
      name,
      hash,
      email,
      other_signs || "not provided",
      education_level_id,
      date_birth,
    ];

    const result = await db.pool.query(sql, values);
    res.json({ message: "Usuario registrado con exito" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al registrar el usuario", error: error });
  }
};

// gets the encrypted password from bd and compares it
const login = async (req, res) => {
  const { password, email } = req.body;

  const sql = "SELECT * FROM login($1)";
  try {
    const result = await db.pool.query(sql, [email]);
    let permission = false;
    let message = "Este usuario no se encuentra registrado";
    let token = "";
    let user_type = "";
    console.log(result.rows);
    if (result.rowCount !== 0) {
      const rows = result.rows[0]; // index 0 of the rows result
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
    res.status(401).json({ message: message });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Este usuario no se encuentra registrado",
      error: error,
    });
  }
};

// get the profile information of the user
const getProfileInfo = async (req, res) => {
  const sql = "SELECT * FROM get_user($1)";
  try {
    const result = await db.pool.query(sql, [req.user_id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener la información del usuario",
      error: error,
    });
  }
};

const getProfileInfoTeacher = async (req, res) => {
  console.log(req.query.user_id, "profile");
  try {
    const sql = 'SELECT * FROM "Typing-Game-DB".get_user($1)';
    const result = await db.pool.query(sql, [req.query.user_id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener la información del usuario",
      error: error,
    });
  }
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
  registerTeacher,
  registerStudent,
  login,
  getProfileInfo,
  getUsername,
  getProfileInfoTeacher,
  getDistricts,
  getEducationLevels,
};
