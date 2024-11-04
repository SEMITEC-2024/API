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

const getLessonLevels = async (req, res) => {
    try {
        const result = await db.pool.query(
          'SELECT * FROM "Typing-Game-DB".get_level()'
        );
        res.json(result.rows);
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "Error al obtener los niveles de dificultad", error: error });
      }
}


const createLesson = async (req, res) => {
    try {
        const {
            level_id,
            teacher_id,
            content,
            iterations,
            max_time,
            max_mistakes,
            name,
            description,
            shared
        } = req.body;
        const sql =
          'SELECT * from "Typing-Game-DB".insert_lesson($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const values = [
            level_id,
            teacher_id,
            content,
            iterations,
            max_time,
            max_mistakes,
            name,
            description,
            1,
            shared 
          ];
        const result = await db.pool.query(sql, values);
        res.json(result.rows);
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "Error al crear la lección", error: error });
      }
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

const getAverageMetricsTeacher = (req, res) => {
    const sql = 'CALL get_average_metrics(?)'
    db.query(sql, [req.query.user_id], (error, result) => {
        if (error) {
            res.status(300).json({message: error})
        }
        res.json(result[0][0])
    })
}

const getAccuracyHistory = (req, res) => {
    const sql = 'CALL get_last_metrics(?)'
    db.query(sql, [req.teacher_id], (error, result) => {
        if (error) {
            res.status(300).json({message: error})
        }
        res.json(result[0])
    })
}

const getNextLesson = (req, res) => {
    const sql = 'CALL get_last_lesson(?)'
    db.query(sql, [req.teacher_id], (error, result) => {
        if (error) {
            res.status(300).json({ message: error})
        }
        res.json(result[0][0])
    })
}

//Lexemas opt
const getLexemes = async (req, res) => {
    try {
      const result = await db.pool.query(
        'SELECT * FROM "Typing-Game-DB".get_lexeme_all()'
      );
      res.json(result.rows);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error al obtener los lexemas opcionales", error: error });
    }
};

const getTotalLessonsPublic = async (req, res) => {
    try {
        const result = await db.pool.query(
            'SELECT COUNT(*) AS total_lessons FROM "Typing-Game-DB".lesson WHERE shared = B\'1\''
        );
        const totalLessons = result.rows[0].total_lessons;
        res.json({ total: parseInt(totalLessons, 10) });  // Devuelve el total como un número
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Error al obtener el total de lecciones",
                error: error
            });
        }
    };

  const getLessonsPublicPerPage  = async (req, res) => {
    const { var_page_number , var_page_size } = req.body;
    try {
        if (!var_page_number || !var_page_size) {
            return res.status(400).json({ message: "Los parámetros de paginación son requeridos." });
        }
        if (isNaN(var_page_number) || isNaN(var_page_size) || var_page_number < 1 || var_page_size < 1) {
            return res.status(400).json({ message: "Los parámetros de paginación son inválidos." });
        }
        const result = await db.pool.query(
            'SELECT * from "Typing-Game-DB".get_lessons_public_per_page($1, $2)',
            [var_page_number, var_page_size]
        );

        res.json(result.rows);
    } catch (error) {
      console.log(error);
      res
      .status(500)
      .json({ message: "Error al obtener las lecciones", error: error });
    }
  };

module.exports = {
    getLessons,
    getLesson,
    saveLessonMetrics,
    createLesson,
    getLessonLevels,
    getAverageMetrics,
    getAccuracyHistory,
    getNextLesson,
    getAverageMetricsTeacher,
    getLexemes,
    getTotalLessonsPublic,
    getLessonsPublicPerPage
}