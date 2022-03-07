const Joi = require("joi");

const idSchema = Joi.object({
    id: Joi.string().guid({
        version: ["uuidv4", "uuidv5"],
    })
});

const userIdSchema = Joi.object({
    userId: Joi.string().guid({
        version: ["uuidv4", "uuidv5"],
    })
});

module.exports.validateId = function(req, res, next) {
    const { error } = idSchema.validate({ id: req.params.id });
    if (error) { return res.status(404).send("Invalid ID."); }

    next();
};

module.exports.validateUserId = function(req, res, next) {
    const { error } = userIdSchema.validate({ userId: req.params.userId });
    if (error) { return res.status(404).send("Invalid User ID."); }

    next();
};

