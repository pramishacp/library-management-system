const Joi = require("joi");

const schema = Joi.object({
    id: Joi.string().guid({
        version: ["uuidv4", "uuidv5"],
    })
});

module.exports = function(req, res, next) {
    const { error } = schema.validate({ id: req.params.id });
    if (error) { return res.status(404).send("Invalid ID."); }

    next();
};