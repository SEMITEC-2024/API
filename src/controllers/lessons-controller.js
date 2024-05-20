const db = require('../database/connection')

// get the lessons list
const getLessons = (req, res) => {
    const sql = 'CALL get_lessons()'
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result[0])
    });
}

// get lesson by id
const getLesson = (req, res)  => {
    const sql = 'CALL get_lesson(?)'
    db.query(sql, [req.query.lesson_id], (error, result) => {
        if (error) throw error;
        res.json(result[0][0])
    })
}

const saveLessonMetrics = (req, res) => {
    console.log(req.body)
    const sql = 'CALL insert_student_metrics(?, ?, ?, ?, ?, ?, ?)'
    const { lesson_id, time_taken, mistakes, accuracy_rate, ppm, is_complete } = req.body
    db.query(sql, [lesson_id, req.teacher_id, time_taken, mistakes, accuracy_rate, ppm, is_complete], (error, result) => {
        if (error) {
            res.status(300).json({message: "something went wrong"})
            console.log(error);}
        res.json({"message": "message"})
    })

}
const getLessonLevels = (req, res) => {
    const sql = 'CALL get_leve()'
    db.query(sql, (error, result) => {
        if (error) {
            res.status(300).json({message: error})
        }
        res.json(result[0])
    })
}

const createLesson = (req, res) => {
    const sql = 'CALL create_lesson(?, ?, ?, ?, ?, ?)'
    const { level_id, words, min_time, min_mistakes, name, description } = req.body;
    db.query(sql,[level_id, words, min_time, min_mistakes, name, description], (error) => {
        if (error) {
            res.status(300).json({message: error})
        }
        res.json({message: "Leccion creada con exito"})
    })
}

const getAverageMetrics = (req, res) => {
    const sql = 'CALL get_average_metrics(?)'
    db.query(sql, [req.teacher_id], (error, result) => {
        if (error) {
            res.status(300).json({message: error})
        }
        res.json(result[0][0])
    })
}

module.exports = {
    getLessons,
    getLesson,
    saveLessonMetrics,
    createLesson,
    getLessonLevels,
    getAverageMetrics,
}