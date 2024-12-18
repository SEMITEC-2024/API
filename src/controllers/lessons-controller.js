const db = require("../database/connection");

// get lesson by id
const getLesson = async (req, res) => {
  const sql = 'SELECT * FROM "Typing-Game-DB".get_lesson($1)';
  try {
    const result = await db.pool.query(sql, [req.query.lesson_id]);
    res.json(result.rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ mesage: "Error al obtener la lección", error: error });
  }
};

const saveLessonMetrics = async (req, res) => {
  const sql =
    'SELECT * FROM "Typing-Game-DB".insert_student_metrics($1, $2, $3, $4, $5, $6, $7, $8)';
  const { lesson_id, time_taken, mistakes, accuracy_rate, ppm, is_completed } =
  req.body;
    const date = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Costa_Rica' });
  try {
    const result = await db.pool.query(sql, [
      lesson_id,
      req.teacher_id,
      time_taken,
      mistakes,
      accuracy_rate,
      ppm,
      is_completed,
      date,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al guardar las métricas", error: error });
  }
};

const getLessonLevels = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_level()'
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los niveles de dificultad",
      error: error,
    });
  }
};

const createLesson = async (req, res) => {
  try {
    const {
      level_id,
      content,
      iterations,
      max_time,
      max_mistakes,
      name,
      description,
      shared,
    } = req.body;
    const sql =
      'SELECT * from "Typing-Game-DB".insert_lesson($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    const values = [
      level_id,
      req.teacher_id,
      content,
      iterations,
      max_time,
      max_mistakes,
      name,
      description,
      1,
      shared,
    ];
    const result = await db.pool.query(sql, values);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al crear la lección", error: error });
  }
};

const assignLesson = async (req, res) => {
  try {
    const { lesson_id, students_ids } = req.body;
    // Ensure students_ids is an array of integers
    if (!Array.isArray(students_ids) || !students_ids.every(Number.isInteger)) {
      return res.status(400).json({ message: "Debe ser un arreglo numérico" });
    }
    const sql = 'SELECT * from "Typing-Game-DB".assign_lesson($1, $2)';
    const values = [lesson_id, students_ids];
    const result = await db.pool.query(sql, values);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al asignar la lección", error: error });
  }
};

const createAssignLesson = async (req, res) => {
  try {
    const {
      level_id,
      content,
      iterations,
      max_time,
      max_mistakes,
      name,
      description,
      shared,
      students_ids,
    } = req.body;

    if (!Array.isArray(students_ids) || !students_ids.every(Number.isInteger)) {
      return res.status(400).json({ message: "Debe ser un arreglo numérico" });
    }

    const sql =
      'SELECT * from "Typing-Game-DB".create_and_assign_lesson($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
    const values = [
      level_id,
      req.teacher_id,
      content,
      iterations,
      max_time,
      max_mistakes,
      name,
      description,
      1,
      shared,
      students_ids,
    ];
    const result = await db.pool.query(sql, values);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al crear y asignar la lección", error: error });
  }
};

const getAverageMetrics = async (req, res) => {
  const sql = 'SELECT * FROM "Typing-Game-DB".get_lesson_metrics_student($1)';
  try {
    const result = await db.pool.query(sql, [req.teacher_id]);
    res.json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las métricas", error: error });
  }
};

const getAverageMetricsFromTeacher = async (req, res) => {
  const sql = 'SELECT * FROM "Typing-Game-DB".get_lesson_metrics_student($1)';
  try {
    const result = await db.pool.query(sql, [req.body.student_id]);
    res.json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las métricas", error: error });
  }
};

const getAccuracyHistory = (req, res) => {
  const sql = "CALL get_last_metrics(?)";
  db.query(sql, [req.teacher_id], (error, result) => {
    if (error) {
      res.status(300).json({ message: error });
    }
    res.json(result[0]);
  });
};

const getNextLesson = async (req, res) => {
  try {
    const sql = 'SELECT * FROM "Typing-Game-DB".get_lessons_next_default($1)';
    const result = await db.pool.query(sql, [req.teacher_id]);
    res.json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la lección", error: error });
  }
};

//Lexemas opt
const getLexemes = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_lexeme_all()'
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los lexemas opcionales",
      error: error,
    });
  }
};

//Number of public lessons available
const getLessonsPublicCount = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_lessons_public_count($1)', [req.body.var_name]
    );
    const totalLessons = result.rows[0];
    res.json(totalLessons); // Devuelve el total como un número
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener el total de lecciones",
      error: error,
    });
  }
};

const getLessonsTeacherPrivateCount = async (req, res) => {
  console.log(req.teacher_id, req.body.var_name);
  try {
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_lessons_private_by_teacher_count($1, $2)',
      [req.teacher_id, req.body.var_name]
    );
    const totalLessons = result.rows[0];
    res.json(totalLessons); // Devuelve el total como un número
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener el total de lecciones",
      error: error,
    });
  }
};

const getLessonsDefaultCount = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_lessons_default_count($1)', [req.body.var_name]
    );
    const totalLessons = result.rows[0];
    res.json(totalLessons); // Devuelve el total como un número
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener el total de lecciones",
      error: error,
    });
  }
};

const getLessonsStudentAssignedCount = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_lessons_assigned_student_count($1, $2)',
      [req.teacher_id, req.body.var_name]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el total de lecciones",
      error: error,
    });
  }
};

const getStudentLessonsHistoryCount = async (req, res) => {
  try {
    //If the ID comes in the URL, it means a teacher made the request.
    //If the URL has no parameters, it uses the ID from the Head, which belongs to an student
    const userId = req.query.user_id || req.teacher_id; 
    if (!userId) {
      return res.status(400).json({
        message: 'An ID is required' 
      }); 
    }
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_lesson_student_history_count($1)',
      [userId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el total de lecciones realizadas",
      error: error,
    });
  }
}
///api/lessons-history-count?user_id=67890"

const getStudentLessonsHistoryPerPage = async (req, res) => {
  try {
    //If the ID comes in the URL, it means a teacher made the request.
    //If the URL has no parameters, it uses the ID from the Head, which belongs to an student
    const userId = req.query.user_id || req.teacher_id; 
    if (!userId) {
      return res.status(400).json({
        message: 'An ID is required' 
      }); 
    }
    const { var_page_number, var_page_size } = req.body;
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_lesson_student_history_per_page($1, $2, $3)',
      [userId, var_page_number, var_page_size]
    );
    res.json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las lecciones", error: error });
  }
};

const getLessonsStudentAssignedPages = async (req, res) => {
  try {
    const { var_page_number, var_page_size, var_name } = req.body;
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_lessons_assigned_student_per_page($1, $2, $3, $4)',
      [req.teacher_id, var_page_number, var_page_size, var_name]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las lecciones",
      error: error,
    });
  }
};

const getLessonsDefaultPages = async (req, res) => {
  try {
    const { var_page_number, var_page_size, var_name } = req.body;
    result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_lessons_default_per_page($1, $2, $3)',
      [var_page_number, var_page_size, var_name]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las lecciones",
      error: error,
    });
  }
};

const getLessonsPrivateByTeacherPages = async (req, res) => {
  try {
    const { var_page_number, var_page_size, var_name } = req.body;
    console.log(req.teacher_id, var_page_number, var_page_size, "bodies`");
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_lessons_private_by_teacher_per_page($1, $2, $3, $4)',
      [req.teacher_id, var_page_number, var_page_size, var_name]
    );
    res.json(result.rows);
    console.log(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener las lecciones", error: error });
  }
};

const getLessonsPublicPerPage = async (req, res) => {
  const { var_page_number, var_page_size, var_name } = req.body;
  try {
    if (!var_page_number || !var_page_size) {
      return res
        .status(400)
        .json({ message: "Los parámetros de paginación son requeridos." });
    }
    if (
      isNaN(var_page_number) ||
      isNaN(var_page_size) ||
      var_page_number < 1 ||
      var_page_size < 1
    ) {
      return res
        .status(400)
        .json({ message: "Los parámetros de paginación son inválidos." });
    }
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_lessons_public_per_page($1, $2, $3)',
      [var_page_number, var_page_size, var_name]
    );
    console.log(var_page_number, var_page_size);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener las lecciones", error: error });
  }
};

const getLessonsDefaultbyCode = async (req, res) => {
  try {
    console.log(req.body.lesson_code);
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_lessons_default_by_code($1)',
      [req.body.lesson_code]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener la lección", error: error });
  }
};

const getTeacherCreatedLessonsByCode = async (req, res) => {
  try {
    console.log(req.body, " por aqui");
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_lessons_teacher_created_by_code($1, $2)',
      [req.body.lesson_code, req.teacher_id]
    );
    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener la lección", error: error });
  }
};

const getPublicLessonsByCode = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_lessons_public_any_by_code($1)',
      [getreq.body.lesson_code]
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener la lección", error: error });
  }
};

const getLessonsStudentAssignedByCode = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_lessons_student_assigned_by_code($1, $2)',
      [req.body.lesson_code, req.teacher_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener la lección", error: error });
  }
};

const getLessonsNextAssignment = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_lessons_next_assignment($1)',
      [req.teacher_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener la lección", error: error });
  }
};

const getLessonsCountPendingCompletedStudent = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_lessons_count_pending_completed_student($1, $2)',
      [req.teacher_id, req.body.teacher_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener la lección", error: error });
  }
};

const getPendingLessonCountFromTeacher = async (req, res) => {
    try {
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_lessons_count_pending_completed_student($1, $2)',
      [req.body.student_id, req.teacher_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener la lección", error: error });
  }
}

const getLessonMetricsStudent = async (req,res) => {
  try{
    //If the ID comes in the URL, it means a teacher made the request.
    //If the URL has no parameters, it uses the ID from the Head, which belongs to an student
    const userId = req.query.user_id || req.teacher_id; 
    if (!userId) {
      return res.status(400).json({
        message: 'An ID is required' 
      }); 
    }
    const { lesson_id } = req.body;
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_metrics_student_by_lesson($1, $2)',
      [userId, lesson_id]
    );
    res.json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las estadisticas", error: error });
  }
}

const getPPMAndAccuracy = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_ppm_and_precision($1)',
      [req.teacher_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener la lección", error: error });
  }
};

const getPPMAndAccuracyFromTeacher = async (req, res) => {
   try {
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_ppm_and_precision($1)',
      [req.body.student_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener la lección", error: error });
  } 
}

const getEstudentPendingLessonCount = async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_student_pending_completed_lesson_count($1)',
      [req.teacher_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al obtener la lección", error: error });
  }
}

module.exports = {
  getLesson,
  saveLessonMetrics,
  createLesson,
  assignLesson,
  createAssignLesson,
  getLessonLevels,
  getAverageMetrics,
  getAccuracyHistory,
  getNextLesson,
  getAverageMetricsFromTeacher,
  getLexemes,
  getLessonsPublicCount,
  getLessonsPublicPerPage,
  getLessonsDefaultbyCode,
  getTeacherCreatedLessonsByCode,
  getPublicLessonsByCode,
  getLessonsTeacherPrivateCount,
  getLessonsPrivateByTeacherPages,
  getLessonsDefaultCount,
  getLessonsDefaultPages,
  getLessonsStudentAssignedCount,
  getLessonsStudentAssignedPages,
  getLessonsStudentAssignedByCode,
  getStudentLessonsHistoryCount,
  getStudentLessonsHistoryPerPage,
  getLessonMetricsStudent,
  getLessonsNextAssignment,
  getLessonsCountPendingCompletedStudent,
  getPPMAndAccuracy,
  getPendingLessonCountFromTeacher,
  getPPMAndAccuracyFromTeacher,
  getEstudentPendingLessonCount,
};
