const db = require("../database/connection");

// get groups by teacher
const getTeacherGroups = (req, res) => {
    const sql = "CALL get_group_teacher_info(?)";
    //req.teacher_id
    db.query(sql, [req.teacher_id], (error, result) => {
        if (error) throw error;
        res.json(result[0]);
    });
};

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
        .json({ message: "Error al obtener la cantidad de grupos", error: error });
    }
};

//Groups by teacher with pagination
const getTeacherGroupsPerPage = async (req, res) => {
    const {var_page_number , var_page_size } = req.body;
    try {
        const result = await db.pool.query(
            'SELECT * from "Typing-Game-DB".get_group_teacher_per_page($1, $2, $3)',
            [req.teacher_id, var_page_number, var_page_size]
        );
        res.json(result.rows);
    } catch (error) {
      res
      .status(500)
      .json({ message: "Error al obtener la información de los grupos del profesor", error: error });
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
        .json({ message: "Error al obtener la cantidad de grupos", error: error });
    }
};

//Group's students with pagination
const getGroupStudents = async (req, res) => {
    const {var_group_id, var_page_number, var_page_size } = req.body;
    try {
        const result = await db.pool.query(
            'SELECT * from "Typing-Game-DB".get_group_students_per_page($1, $2, $3)',
            [var_group_id, var_page_number, var_page_size]
        );
        res.json(result.rows);
    } catch (error) {
      res
      .status(500)
      .json({ message: "Error al obtener los estudiantes del grupo", error: error });
    }
};

const getStudentGroups = (req, res) => {
    const sql = "CALL get_group_info_by_student(?)";
    db.query(sql, [req.teacher_id], (error, result) => {
        if (error) throw error;
        console.log(result[0])
        res.json(result[0]);
    });
};

// crear grupo
const createGroup = (req, res) => {
    console.log(req.teacher_id, "creando grupo");
    try {
        const sql = "CALL insert_group_class(?, ?, ?)";
        db.query(sql, [1, req.body.name, req.teacher_id], (error, result) => {
            if (error) console.log(error);
            console.log(result[0][0]);
            res.json(result[0][0]);
        });
    } catch (error) {
        console.log(error);
    }
};

const joinGroup = (req, res) => {
    console.log("Join Group")
    try {
        const sql = 'CALL join_group_by_student_code(?, ?)'
        db.query(sql, [req.body.group_code, req.teacher_id], (error, result) => {
            if (error) console.log(error)
                res.json({"message": "hoal"})
        })
    } catch (error) {
        console.log(error)
    }
}

const getGroupInfo = (req, res) => {
    try {
        const sql = 'CALL get_group_info(?)'
        db.query(sql, [req.query.group_id], (error, result) => {
            if (error) {
                res.status(300).json({message: error})
            }
            console.log(result[0])
            res.json(result[0][0])
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getTeacherGroups,
    getGroupStudents,
    getGroupStudentsCount,
    getStudentGroups,
    createGroup,
    joinGroup,
    getGroupInfo,
    getGroupTeacherCount,
    getTeacherGroupsPerPage
};
