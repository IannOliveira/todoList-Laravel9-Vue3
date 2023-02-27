<template>
  <div style="height: 300px;">
    <LoginMenu />

    <div
        v-if="response.message"
        class="`rounded-sm bg-${response.color}-100 p-4 mb-4`"
    >
      <h3 class="`text-sm leading-10 bg-gray-300 text-green-600 font-high text-${response.color}-500`">
        {{ response.message }}
      </h3>
    </div>

    <Form
          @submit="register()"
          :validation-schema="schema"
          >

      <div class="grid gap-2">
        <div class="flex">

          <div class="w-1/2 mr-2">
              <Field
                  class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
                  v-model="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Digite seu nome"
              />
              <ErrorMessage name="firstName" class="text-red-500 text-sm"/>
          </div>

          <div class="w-1/2  ml-2">
            <Field
                class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
                v-model="lastName"
                name="lastName"
                type="text"
                placeholder="Digite seu sobrenome"
            />
            </div>
          </div>

          <Field
              class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
              name="email"
              v-model="email"
              type="text"
              placeholder="Digite seu e-mail"
          />
          <ErrorMessage name="email" class="text-red-500 text-sm mb-2"/>

          <Field
              name="password"
              v-model="password"
              type="password"
              placeholder="Digite sua senha"
              class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
          />
          <ErrorMessage name="password" class="text-red-500 text-sm mb-2" />

        <button
            type="submit"
            :disabled="spinner.register"
            class="flex items-center justify-center bg-blue-800 text-blue-200 font-medium text-sm focus:outline-none rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
        >
          <img
              v-if="spinner.register"
              src="@/assets/img/spinner.svg"
              alt=""
              class="w-5 h-5 mr-2"
          >
          REGISTRAR
        </button>
      </div>

    </Form>
  </div>
</template>

<script>
import LoginMenu from '@/components/Auth/LoginMenu';
import {Form, Field, ErrorMessage} from "vee-validate";
import * as yup from 'yup';
import axios from "axios";
import message from "@/utils/message";

export default {
  name: 'Register',
  components: {
    LoginMenu,
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    const schema = yup.object({
      firstName: yup.string().required("O campo nome é obrigatório."),
      email: yup.string().required("E-mail é um campo obrigatório!").email("Digite um e-mail válido!"),
      password: yup.string().required("Digite sua senha.")
                            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                                    "Sua senha deve conter pelo menos um caractere maiusculo, um minusculo e um dígito."),
    });

    return {
      schema,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      response: {
        color: '',
        message: '',
      },
      spinner: {
        register: false,
      },
    };
  },

    methods: {
       async register() {

        this.resetResponse();

        const payload ={
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          password: this.password,
        };

        this.spinner.register = true;

        axios.post('v1/register', payload).then(() => {
          this.response.color = 'green';
          this.response.message = 'Seu cadastro foi realizado com sucesso.';

          this.resetForm();

          setTimeout(() => {
            this.response.message = '';
          }, 5000);


        }).catch((e) => {
          const errorCode = e?.response?.data?.error || 'ServerError';
          this.response.color = 'red';
          this.response.message = message[errorCode];
        }).finally(() => {
          this.spinner.register = false;
        });
      },

      resetResponse() {
        this.response.color = '';
        this.response.message = '';
      },

      resetForm() {
         this.firstName = '';
         this.lastName = '';
         this.email = '';
         this.password = '';
         this.schema = '';
      },

    },
};

</script>
