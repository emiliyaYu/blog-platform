
const validate = {
    validateUsername: {
        required: true,
        maxLength : {
            value: 20,
            message: 'Username must contain from 3 to 20 characters.'
        } ,
        minLength: {
            value: 3,
            message: 'Username must contain from 3 to 20 characters.'
        }
    },
    validateEmail: {
        required: true,
        pattern: {
            value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
            message: 'Invalid email.'
        }
    },
    validatePassword: {
        required: true,
        maxLength: {
            value: 40,
            message: 'Password must contain from 8 to 40 characters.'
        },
        minLength: {
            value: 8,
            message: 'Password must contain from 8 to 40 characters.'
        }
    },
    validatePersonalInfo : {
        required: true
    }
}
export default validate;


