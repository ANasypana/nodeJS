const createUserSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 3,
    },
    lastName: {
      type: 'string',
      minLength: 3,
    },
    nickname: {
      type: 'string',
      minLength: 3,
      maxLength: 16,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[\\w!@#\\$%\\^&-\\*]{6,}$',
      message: {
        required: 'should have required property password',
        pattern: 'Password must contain not less than 6 symbols, including upper case, lower case, digits and special symbols'
      },
    },
    birthday: {
      type: 'string',
      format: 'date',
    },
  },
  required: ['name', 'lastName', 'nickname', 'email', 'password', 'birthday'],
  additionalProperties: false,
};

module.exports = createUserSchema;
