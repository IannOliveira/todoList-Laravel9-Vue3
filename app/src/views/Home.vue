<template>
  <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div class="text-gray-500 font-medium">
        Lista de tarefas
      </div>
    </div>

    <form
        class="flex items-center px-4 bg-gray-300 h-15 rounded-sm mb-3"
        @submit.stop.prevent="createTodo"
    >
      <input
          v-model="newTodo"
          placeholder="Digite o nome da sua lista ..."
          ref="label"
          type="text"
          class="bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal pr-3"
      >

      <button
          type="submit"
          class="text-blue-700 text-xs font-semibold focus:outline-none"
      >
        ADICIONAR
      </button>
    </form>

      <div
          v-if="spinner.get_todos"
          class="text-center"
      >
        <img
            src="@/assets/img/spinner.svg"
            alt=""
            class="inline-block w-5 h-5"
        >
      </div>

      <TodoCard
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @afterDeleting="afterDeleting"
      />

  </div>
</template>

<script>
    import TodoCard from "@/components/Todos/TodoCard.vue";
    import axios from "axios";

    export default {
      name: 'Home',

      components: {
          TodoCard,
      },

      data() {
          return {
            newTodo: '',
            todos: [],
            spinner: {
              get_todos: false,
            }
          };
      },

      mounted() {
        this.$refs.label.focus();
      },

      created() {
          this.getTodos();
      },

      methods: {
        getTodos() {
          this.spinner.get_todos = true;
          axios.get('v1/todos').then((response) => {
            this.todos = response.data.data.map((o) => ({
              ...o,
                  state: 'show',
            }));
          }).finally(() => {
            this.spinner.get_todos = false;
          });
        },

        createTodo() {
          if(!this.newTodo){
            return ;
          }

          const payload = {
            label: this.newTodo,
          };

          axios.post('v1/todos', payload).then((response) => {
            this.todos.unshift({...response.data.data, state: 'show'});
            this.newTodo = '';
          });
        },

        afterDeleting(todo) {
          const idx = this.todos.findIndex(o => o.id === todo.id);
          this.todos.splice(idx, 1);
        },

      },
    };
</script>