const db = require("../database/connection");

// get the lessons list
const getLessons = (req, res) => {
  const sql = "CALL get_lessons()";
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.json(result[0]);
  });
};

// get lesson by id
const getLesson = (req, res) => {
  const sql = "CALL get_lesson(?)";
  db.query(sql, [req.query.lesson_id], (error, result) => {
    if (error) throw error;
    res.json(result[0][0]);
  });
};

const saveLessonMetrics = (req, res) => {
  console.log(req.body);
  const sql = "CALL insert_student_metrics(?, ?, ?, ?, ?, ?, ?)";
  const { lesson_id, time_taken, mistakes, accuracy_rate, ppm, is_complete } =
    req.body;
  db.query(
    sql,
    [
      lesson_id,
      req.teacher_id,
      time_taken,
      mistakes,
      accuracy_rate,
      ppm,
      is_complete,
    ],
    (error, result) => {
      if (error) {
        res.status(300).json({ message: "something went wrong" });
        console.log(error);
      }
      res.json({ message: "message" });
    }
  );
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

const getAverageMetrics = (req, res) => {
  const sql = "CALL get_average_metrics(?)";
  db.query(sql, [req.teacher_id], (error, result) => {
    if (error) {
      res.status(300).json({ message: error });
    }
    res.json(result[0][0]);
  });
};

const getAverageMetricsTeacher = (req, res) => {
  const sql = "CALL get_average_metrics(?)";
  db.query(sql, [req.query.user_id], (error, result) => {
    if (error) {
      res.status(300).json({ message: error });
    }
    res.json(result[0][0]);
  });
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

const getNextLesson = (req, res) => {
  const sql = "CALL get_last_lesson(?)";
  db.query(sql, [req.teacher_id], (error, result) => {
    if (error) {
      res.status(300).json({ message: error });
    }
    res.json(result[0][0]);
  });
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
      'SELECT * FROM "Typing-Game-DB".get_lessons_public_count()'
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
  try {
    const result = await db.pool.query(
      'SELECT * FROM "Typing-Game-DB".get_lessons_teacher_private_count($1)',
      [req.teacher_id]
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
      'SELECT * FROM "Typing-Game-DB".get_lessons_default_count()'
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
      'SELECT * FROM "Typing-Game-DB".get_lessons_assigned_student_count($1)',
      [req.teacher_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el total de lecciones",
      error: error,
    });
  }
};

const getLessonsStudentAssignedPages = async (req, res) => {
  try {
    const { var_page_number, var_page_size } = req.body;
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_lessons_assigned_student_per_page($1, $2, $3)',
      [req.teacher_id, var_page_number, var_page_size]
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
    const { var_page_number, var_page_size } = req.body;
    result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_lessons_default_per_page($1, $2)',
      [var_page_number, var_page_size]
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
    const { var_page_number, var_page_size } = req.body;
    console.log(req.teacher_id, var_page_number, var_page_size, "bodies`");
    const result = await db.pool.query(
      'SELECT * from "Typing-Game-DB".get_lessons_private_by_teacher_pages($1, $2, $3)',
      [req.teacher_id, var_page_number, var_page_size]
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
  const { var_page_number, var_page_size } = req.body;
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
      'SELECT * from "Typing-Game-DB".get_lessons_public_per_page($1, $2)',
      [var_page_number, var_page_size]
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
      [req.body.lesson_code]
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
}

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
    
}

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
}

module.exports = {
  getLessons,
  getLesson,
  saveLessonMetrics,
  createLesson,
  assignLesson,
  createAssignLesson,
  getLessonLevels,
  getAverageMetrics,
  getAccuracyHistory,
  getNextLesson,
  getAverageMetricsTeacher,
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
  getLessonsNextAssignment,
  getLessonsCountPendingCompletedStudent
};
