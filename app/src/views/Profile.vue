<template>
  <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div class="text-gray-500 font-medium">
        Meu perfil
      </div>
    </div>

    <div
        v-if="response.message"
        class="`rounded-sm bg- ${response.color} -100 p-4 mb-4`"
    >
      <h3 class="`text-sm leading-10 bg-gray-300 text-green-600 font-high`">
        {{ response.message }}
      </h3>
    </div>

    <Form
          ref="profileForm"
          @submit="updated"
          :validation-schema="schema"
    >
      <div class="grid grid-cols-2 gap-4">

        <div>
            <label
                for="firstName"
                class="block text-sm text-gray-500 font-medium mb-2"
            >
              Primeiro nome
            </label>

            <Field
                name="firstName"
                id="firstName"
                v-model="firstName"
                type="text"
                placeholder="Digite seu nome"
                class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
            />
          <ErrorMessage name="firstName" class="text-red-600"/>
        </div>

        <div>
          <label
              for="lastName"
              class="block text-sm text-gray-500 font-medium mb-2"
          >
            Sobrenome
          </label>

          <Field
              name="lastName"
              id="lastName"
              v-model="lastName"
              type="text"
              placeholder="Digite seu sobrenome"
              class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
          />
        </div>

        <div>
            <label
                for="email"
                class="block text-sm text-gray-500 font-medium mb-2"
            >
              E-mail
            </label>

            <Field
                name="email"
                id="email"
                v-model="email"
                type="text"
                placeholder="Digite seu e-mail"
                class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
            />
          <ErrorMessage name="email" class="text-red-600"/>
        </div>



        <div>
            <label
                for="password"
                class="block text-sm text-gray-500 font-medium mb-2"
            >
              Senha
            </label>

            <Field
                name="Senha"
                id="password"
                v-model="password"
                type="password"
                placeholder="Digite sua senha"
                class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
            />
        </div>


        <div class="col-span-2 text-right">
          <button
              type="submit"
              :disabled="spinner.update_user"
              class="inline-flex items-center justify-center bg-blue-800 text-blue-200 font-medium text-sm focus:outline-none rounded-sm py-3 px-4 inline-block appearance-none leading-normal"
          >
            <img
                v-if="spinner.update_user"
                src="@/assets/img/spinner.svg"
                alt=""
                class="w-5 h-5 mr-2"
            >
            SALVAR
          </button>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import * as yup from 'yup';
import {Form, Field, ErrorMessage} from "vee-validate";
import {mapState, mapMutations} from "vuex";
import axios from "axios";
import message from "@/utils/message";


export default {
  name: 'Profile',

  components: {
    Form,
    Field,
    ErrorMessage,
  },


  data() {
    const schema = yup.object({
      firstName: yup.string().required("O campo nome é obrigatório."),
      email: yup.string().required("E-mail é um campo obrigatório!").email("Digite um e-mail válido!"),
      password: yup.string(),
    });

    return {
      schema,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      response: {
        message: '',
        color: '',
      },
      spinner: {
        update_user: false,
      },
    };
  },

  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
  
  created() {
    this.firstName = this.user.first_name;
    this.lastName = this.user.last_name;
    this.email = this.user.email;
  },


  methods: {
    ...mapMutations('user', ['STORE_USER']),

    async updated() {
      const validator = await this.$refs.profileForm.validate();
      if (!validator) {
        return;
      }

      const payload = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
      };

      if(this.password) {
        payload.password = this.password;
      }

      this.spinner.update_user = true;

      axios.put('v1/me', payload).then((response) => {
        this.response.message = 'Seus dados foram atualizados com sucesso!';
        this.response.color = 'blue';

        this.STORE_USER(response.data.data);
      }).catch((e) => {
        const errorCode = e?.response?.data?.error || 'ServerError';
        this.response.color = 'red';
        this.response.message = message[errorCode];
      }).finally(() => {
        this.spinner.update_user = false;
      });
    },
  },

};
</script>
