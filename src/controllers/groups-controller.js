const db = require('../database/connection')

// get groups by teacher
const getTeacherGroups = (req, res) => {
    const sql = 'CALL get_group_teacher_info(?)'
    db.query(sql, [req.query.teacher_id], (error, result) => {
        if (error) throw error;
        res.json(result[0])
    })
}

const getStudentsGroup = (req, res) => {
    const sql = 'CALL students_group(?)'
    db.query(sql,[req.query.group_id], (error, result) => {
        if (error) throw error;
        res.json(result[0])
    })
 }

const getStudentGroups = (req, res) =>  {
    const sql = 'CALL get_group_info_by_student(?)'
    db.query(sql, [req.query.student_id], (error, result) => {
        if (error) throw error;
        res.json(result[0])
    })
 }

module.exports = { getTeacherGroups, getStudentsGroup, getStudentGroups }