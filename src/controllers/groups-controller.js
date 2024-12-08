const db = require("../database/connection");

//Number of groups that a teacher has
const getGroupTeacherCount = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_group_teacher_count($1)',
      [req.teacher_id]
    );
    res.json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener la cantidad de grupos",
        error: error,
      });
  }
};

//Groups by teacher with pagination
const getTeacherGroupsPerPage = async (req, res) => {
  const { var_group_by, var_group_dir, var_page_number, var_page_size } = req.body;
  try {
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_group_teacher_per_page($1, $2, $3, $4, $5)',
      [req.teacher_id, var_group_by, var_group_dir, var_page_number, var_page_size]
    );
    console.log(result);
    res.json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener la información de los grupos del profesor",
        error: error,
      });
  }
};

//Number of groups that a student has
const getGroupStudentCount = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_group_student_count($1)',
      [req.teacher_id]
    );
    res.json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener la cantidad de grupos",
        error: error,
      });
  }
};

//Groups by student with pagination
const getStudentGroupsPerPage = async (req, res) => {
  const { var_group_by, var_group_dir, var_page_number, var_page_size } = req.body;
  try {
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_group_student_per_page($1, $2, $3, $4, $5)',
      [req.teacher_id, var_group_by, var_group_dir, var_page_number, var_page_size]
    );
    res.json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener la información de los grupos del estudiante",
        error: error,
      });
  }
};

//Number of students that a group has
const getGroupStudentsCount = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_group_students_count($1)',
      [req.query.var_group_id]
    );
    res.json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener la cantidad de grupos",
        error: error,
      });
  }
};


//Group's students with pagination
const getGroupStudents = async (req, res) => {
  const { var_group_id, var_page_number, var_page_size } = req.body;
  try {
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_group_students_per_page($1, $2, $3)',
      [var_group_id, var_page_number, var_page_size]
    );
    res.json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los estudiantes del grupo",
        error: error,
      });
  }
};

//Number of students that the filter return
const getFilteredGroupStudentsCount = async (req, res) => {
  const { var_name ,var_institution_id, var_group_id } = req.body;
  try {
      const result = await db.pool.query(
          `SELECT * FROM "Typing-Game-DB".get_students_by_name_and_institution_count($1, $2, $3)`,
          [var_name ,var_institution_id, var_group_id]
      );
      res.json(result.rows);
  } catch (error) {
      res.status(500).json({
          message: "Error al obtener la cantidad de estudiantes filtrados por institución y nombre",
          error: error.message
      });
  }
};
//a list of students with pagination
const getFilteredGroupStudents = async (req, res) => {
  const { var_name ,var_institution_id, var_group_id, var_page_number, var_page_size } = req.body;
  try {
      const result = await db.pool.query(
          `SELECT * FROM "Typing-Game-DB".get_students_by_name_and_institution_per_page($1, $2, $3, $4, $5)`,
          [var_name ,var_institution_id, var_group_id, var_page_number, var_page_size]
      );
      res.json(result.rows);
  } catch (error) {
      res.status(500).json({
          message: "Error al obtener los estudiantes filtrados por institución y nombre",
          error: error.message
      });
  }
};
// add a student to a group
const addStudent = async (req, res) => {
  const { var_group_id ,var_user_id} = req.body;
  try {
      const result = await db.pool.query(
          `SELECT * FROM "Typing-Game-DB".insert_student_in_group($1, $2)`,
          [var_group_id ,var_user_id]
      );
      res.json(result.rows);
  } catch (error) {
      res.status(500).json({
          message: "Error al insertar el estudiante en el grupo",
          error: error.message
      });
  }
};

// crear grupo
const createGroup = async (req, res) => {
  const { var_group_name } = req.body;
  try {
    const result = await db.pool.query('SELECT * FROM "Typing-Game-DB".insert_group_class($1, $2)',
      [req.teacher_id, var_group_name]
    );    
    res.json(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const joinGroup = async (req, res) => {
  const { var_group_code } = req.body;
  try {
    const result = await db.pool.query('SELECT * FROM "Typing-Game-DB".insert_student_in_group_student($1, $2)',
      [var_group_code, req.teacher_id]);
    res.json(result.rows)
  } catch (error) {
    console.log(error);
  }
};

const getRecentActivity = async (req, res) => {
  try {
    const result = await db.pool.query('SELECT * FROM "Typing-Game-DB".get_latest_student_activity($1)',
      [req.teacher_id]);
    res.json(result.rows)
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener las actividades recientes",
        error: error,
      });
  }
};

const deleteStudentFromGroup = async (req, res) => {
  const { var_group_id, var_student_user_id } = req.body;

  // Use teacher_id (userId) from req if var_student_user_id is not provided
  const studentUserId = var_student_user_id || req.teacher_id;

  try {
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".delete_student_from_group($1, $2)',
      [var_group_id, studentUserId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el estudiante",
      error: error,
    });
  }
};


module.exports = {
  getGroupStudents,
  getGroupStudentsCount,
  getFilteredGroupStudentsCount,
  getFilteredGroupStudents,
  addStudent,
  createGroup,
  joinGroup,
  getGroupTeacherCount,
  getTeacherGroupsPerPage,
  getGroupStudentCount,
  getStudentGroupsPerPage,
  getRecentActivity,
  deleteStudentFromGroup
};
