<template>
  <div>
    <h3 class="py-2 mb-8 text-gray-500 text-lg font-medium text-center">
      Recuperar senha
    </h3>

    <div
        v-if="response.message"
        class="`rounded-sm bg-${response.color}-100 p-4 mb-4`"
    >
      <h3 class="`text-sm leading-10 bg-gray-300 text-green-600 font-high text-${response.color}-500`">
        {{ response.message }}
      </h3>
    </div>

    <Form ref="resetPassswordForm"
           @submit="resetPassword()"
           :validation-schema="schema"
    >

      <div class="grid gap-2">

          <Field
              name="email"
              v-model="email"
              type="email"
              placeholder="Digite seu e-mail"
              class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
          />
        <ErrorMessage name="email" class="text-red-600"/>

          <Field
              name="password"
              v-model="password"
              type="password"
              placeholder="Digite sua senha"
              class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
          />
          <ErrorMessage name="password" class="text-red-600"/>


        <button
            type="submit"
            :disabled="spinner.reset_password"
            class="flex items-center justify-center bg-blue-800 text-blue-200 font-medium text-sm focus:outline-none rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
        >
          <img
              v-if="spinner.reset_password"
              src="@/assets/img/spinner.svg"
              alt=""
              class="w-5 h-5 mr-2"
          >
          ALETRAR SENHA
        </button>

        <div class="my-4 text-center">
          <RouterLink
              :to="{ name: 'login' }"
              class="text-sm font-light"
          >
            Login
          </RouterLink>
        </div>

      </div>
    </Form>
  </div>
</template>

<script>
import {Form, Field, ErrorMessage} from "vee-validate";
import * as yup from "yup";
import axios from "axios";
import message from "@/utils/message";
//import axios from "axios";

export default {

  name: 'ResetPassword',

  components:{
    Field,
    Form,
    ErrorMessage,
  },

  data() {
    const schema = yup.object({
      email: yup.string().required("E-mail é um campo obrigatório.").email("Digite um e-mail válido!"),
      password: yup.string().required("Digite sua senha.")
          .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
              "Digite uma senha válida!"),
    });

    return {
      schema,
      email: '',
      password: '',
      token: '',
      response: {
        color: '',
        message: '',
      },
      spinner: {
        reset_password: false,
      },
    };
  },

    beforeRouteEnter(to, from, next) {
     if(!to?.query?.token){
       next({name: 'login'});
     }

      next();
    },

    created() {
    this.token = this.$route?.query?.token || '';
    },

  methods: {
      async resetPassword() {
        const validator = await this.$refs.resetPassswordForm.validate();
        if(!validator) {
          return;
        }

        this.resetResponse();

        const payload = {
          email: this.email,
          password: this.password,
          token: this.token,
        };

        this.spinner.reset_password = true;

        axios.post('v1/reset-password', payload).then(() => {
          this.response.color = 'green';
          this.response.message = 'Senha alterada com sucesso!';

          this.resetForm();
        }).catch((e) => {
          const errorCode = e?.response?.data?.error || 'ServerError';
          this.response.color = 'red';
          this.response.message = message[errorCode];
        }).finally(() =>{
          this.spinner.reset_password = false;
        });
      },

    resetResponse() {
      this.response.color = '';
      this.response.message = '';
    },

    resetForm() {
      this.email = '';
      this.password = '';
      this.token = '';
      this.schema = '';
    },

    },
  };
</script>
