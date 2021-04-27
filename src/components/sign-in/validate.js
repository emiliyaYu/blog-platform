const validate = {
    validateLoginEmail: {
        required: {
            value: true,
            message: "Can't be empty."
        },
        pattern: {
            value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
            message: 'Invalid email.'
        }
    },
    validatePassword: {
        required: {
            value: true,
            message: "Can't be empty."
        },
    }
}
export default validate;