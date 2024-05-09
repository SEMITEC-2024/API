const db = require('../database/connection')

// get groups by teacher
const getTeacherGroups = (req, res) => {
    const sql = 'CALL get_group_teacher_info(?)'
    db.query(sql, [req.query.teacher_id], (error, result) => {
        if (error) throw error;
        res.json(result[0])
    })
}

module.exports = { getTeacherGroups }