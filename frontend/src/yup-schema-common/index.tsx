import * as yup from "yup";

export const email = yup.string().required().email().label('Email Address');
export const password = yup
    .string()
    .required()
    .min(8)
    .max(100)
    .matches(/[0-9]/g, 'Password must contain at least 1 number')
    .matches(/[a-z]/g, 'Password must contain at least 1 lowercase letter')
    .matches(/[A-Z]/g, 'Password must contain at least 1 uppercase letter')
    .matches(/[!@#$%^&*]/g, 'Password must contain at least one of the special characters !@#$%^&*')
    .label("Password");

export default {
    email,
    password
}