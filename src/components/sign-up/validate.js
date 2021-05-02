const validate = {
    validateUsername: {
        required: {
            value: true,
            message: "Can't be empty."
        },
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
        required: {
            value: true,
            message: "Can't be empty."
        },
    }
}
export default validate;
