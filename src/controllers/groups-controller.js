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

const getStudentsGroup = (req, res) => {
    const sql = "CALL students_group(?)";
    db.query(sql, [2], (error, result) => {
        if (error) throw error;
        res.json(result[0]);
    }); 
};

const getStudentGroups = (req, res) => {
    console.log(req.teacher_id)
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

module.exports = {
    getTeacherGroups,
    getStudentsGroup,
    getStudentGroups,
    createGroup,
    joinGroup,
};
