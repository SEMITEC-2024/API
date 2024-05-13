const jwt = require("jsonwebtoken");

const teacherGroupsAuth = (req, res, next) => {
    const token = req.headers["auth-token"];
    if (token) {
        try {
            jwt.verify(token, process.env.TOKEN_KEY, (error, decoded) => {
                if (error) {
                    res.status(401).json({
                        message: "Unauthorized",
                        error: error,
                    });
                } else if (decoded.user_type_name === 'Tutor') {
                    req.teacher_id = decoded.user_id;
                    req.username = decoded.username;
                    next();
                } else {
                    res.status(401).json({message: 'Unauthorized'})
                }
            });
        } catch (error) {
            res.status(401).json({
                message: "Sin autorizacion",
            });
        }
    }
};

const studentAuth = (req, res, next) => {
    const token = req.headers["auth-token"];
    if (token) {
        try {
            jwt.verify(token, process.env.TOKEN_KEY, (error, decoded) => {
                if (error) {
                    res.status(401).json({
                        message: "Unauthorized",
                        error: error,
                    });
                } else if (decoded.user_type_name === "Estudiante") {
                    req.teacher_id = decoded.user_id;
                    req.username = decoded.username;
                    next();
                } else {
                    res.status(401).json({message: 'Unauthorized'})
                }
            });
        } catch (error) {
            res.status(401).json({
                message: "Sin autorizacion",
            });
        }
    }
};

module.exports = { teacherGroupsAuth, studentAuth };
