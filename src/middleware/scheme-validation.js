// validates the scheme of the request body

const validateScheme = (scheme) => {
    return (req, res, next) => {
        const { error } = scheme.validate(req.body, { abortEarly: false });


        if (error) {
            return res.status(400).json({
                message: "Parámetros faltantes o inválidos",
                error: error.details.map((error) => ({field: error.path[0], message: error.message})),
            });
        }
        next();
    }
}

module.exports = validateScheme