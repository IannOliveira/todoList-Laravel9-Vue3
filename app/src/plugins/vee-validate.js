import { extend, required, email, messages as messagePt } from 'vee-validate';
//import { required, email } from 'vee-validate/dist/rules.umd';
//import { messages as messagePt } from 'vee-validate/dist/locale/pt_BR';
//import {FormValidationResult} from "vee-validate";
//import {ValidationObserver} from "vee-validate";

extend('required', {
    ...required,
    message: messagePt.required,
});

extend('email', {
    ...email,
    message: messagePt.email,
});
