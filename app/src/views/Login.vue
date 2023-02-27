<template>

  <div style="height: 300px;">
    <LoginMenu />

    <div
        v-if="response.message"
        class="`rounded-sm bg-${response.color}-100 p-4 mb-4`"
    >
      <h3 class="`text-sm leading-8 bg-gray-300 text-red-600 font-high text-${response.color}-800`">
        {{ response.message }}
      </h3>
    </div>

          <Form @submit="login"
                :validation-schema="schema"
          >
      <div class="grid gap-2">

            <Field name="email"
                   class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
                   type="text"
                   placeholder="Digite seu e-mail"
                   v-model="email"
            />
            <ErrorMessage name="email" class="text-red-600"/>

            <Field name="password"
                   type="password"
                   placeholder="Digite sua senha"
                   class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
                   v-model="password"
            />
            <ErrorMessage name="password" class="text-red-600"/>

        <button
            type="submit"
            :disabled="spinner.login"
            class="flex items-center justify-center bg-blue-600 text-blue-200 font-medium text-sm focus:outline-none rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
        >
          <img
               v-if="spinner.login"
               src="@/assets/img/spinner.svg"
               alt=""
               class="w-5 h-5 mr-2"
          >
          ENTRAR
        </button>

        <div class="my-4 text-center">
          <RouterLink
              :to="{ name: 'forgotPassword' }"
              class="text-sm font-light"
          >
            Esqueci minha senha
          </RouterLink>
        </div>
      </div>
          </Form>
  </div>
</template>



<script>
import LoginMenu from '@/components/Auth/LoginMenu';
import Cookie from "@/service/cookie";
import axios from "axios";
import * as yup from 'yup';
import {Form, Field, ErrorMessage} from "vee-validate";
import message from "@/utils/message";

export default {
  name: 'Login',
  computed: {
    data() {
      return data
    }
  },

  components: {
    LoginMenu,
    Form,
    Field,
    ErrorMessage
  },

  data() {
    const schema = yup.object({
      email: yup.string().required("E-mail é um campo obrigatório!").email("Digite um e-mail válido!"),
      password: yup.string().required("Digite sua senha."),
    });

    return {
      schema,
      email: '',
      password: '',
      response:{
        color: '',
        message: '',
      },
      spinner: {
        login: false,
      },
    };
  },


  methods: {
      login() {


      const payload = {
        email: this.email,
        password: this.password,
      };

      this.resetResponse();

      this.spinner.login = true;

      axios.post('v1/login', payload).then((response) => {
        const token = `${response.data.token_type} ${response.data.access_token}`;
        Cookie.setToken(token);

        this.$store.commit('user/STORE_USER', response.data.data);

        this.$router.push({name: 'index'});
      }).catch((e) =>{
        this.spinner.login = false;

        const errorCode = e?.response?.data?.error || 'ServerError';
        this.response.color = 'red';
        this.response.message = message[errorCode];
      });
    },

    resetResponse() {
        this.response.color = '';
        this.response.message = '';
    },
  },
};
</script>
