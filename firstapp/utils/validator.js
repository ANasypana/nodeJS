const Ajv = require('ajv');
const ValidationError = require('./errors/validationError');

const validator = schema => (req, res, next) => {
  const ajv = new Ajv({ allErrors: true, jsonPointers: true });
  const validate = ajv.compile(schema);
  const valid = validate(req.body);

  if (valid) {
    return next();
  }

  const errors = validate.errors.map(({ message, keyword }) => keyword === 'pattern' ?
    'property \'password\' must contain not less than 6 symbols, including upper case, lower case, digits and special symbols' :
    message
  ).join('; ');

  next(new ValidationError(errors, 400));

};

module.exports = validator;
