<template>

  <Form
      ref="todoUpdateForm"
      @submit="onSave"
      :validation-schema="schema"
  >

  <div class="flex items-center bg-gray-300 rounded-sm px-4 h-15 mb-2">

    <Field
        name="localLabel"
        v-model="localLabel"
        ref="label"
        type="text"
        placeholder="Digite o nome da sua lista ..."
        class="bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal"
    />
    <ErrorMessage name="localLabel" class="text-red-500 text-sm mb-2"/>

    <div class="flex items-center ml-auto">
      <a
          href=""
          class="text-xs text-gray-900 mr-2 focus:outline-none"
          @click.stop.prevent="onCancel()"
      >
        Cancelar
      </a>

      <button
          type="submit"
          class="bg-blue-700 text-blue-100 text-xs font-semibold px-2.5 py-1 rounded focus:outline-none"
      >
        OK
      </button>
      </div>
    </div>
  </Form>
</template>


<script>
import {Form, Field, ErrorMessage} from "vee-validate";
import * as yup from 'yup';
import axios from "axios";




export default {
  name: 'TodoCardUpdate',

  components:{
    Form, Field, ErrorMessage
  },

  props: {
    todo: {
      type: Object,
      default: () => ({}),
    },
  },



  data(){
    const schema = yup.object({
      localLabel: yup.string().required("Esse campo não pode ser vazio!"),
    });
    return {
      schema,
      localLabel: this.todo.label,
    };
  },

  methods: {
    onCancel(){
      this.$emit('cancel');
    },

    onSave(){
      const validator = this.$refs.todoUpdateForm.validate();
      if(!validator) {
        return ;
      }

      const payload = {
        label: this.localLabel,
      }

      axios.put(`v1/todos/${this.todo.id}`, payload).then(() => {
        this.todo.label = this.localLabel;
        this.onCancel();
      })
    },

  },

};
</script>