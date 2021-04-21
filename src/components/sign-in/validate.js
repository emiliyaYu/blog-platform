const validate = {
    validateLoginEmail: {
        required: true,
        pattern: {
            value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
            message: 'Invalid email.'
        }
    },
    validatePassword: {
        required: true,
    }
}
export default validate;