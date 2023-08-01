import { defineStore } from 'pinia';

import {
  fetchAddTodo,
  fetchDeleteTodo,
  fetchTodos,
  fetchUpdateTodo,
} from '@/api/routes/todos';
import { Todo } from '@/api/routes/todos/types';
import { TodosStore } from '@/store/todos/types';

export const useTodosStore = defineStore('todos', {
  state: (): TodosStore => ({
    todos: [],
    total: 0,
    loading: false,
  }),
  actions: {
    changeTitle(todoId: number, title: string) {
      const todoIndex = this.todos.findIndex(({ id }) => id === todoId);
      this.todos[todoIndex].title = title;
    },
    addTodo(todo: Todo) {
      this.todos = [todo, ...this.todos];
    },
    deleteTodo(todoId: number) {
      this.todos = this.todos.filter(({ id }) => id !== todoId);
    },
    setCompleteTodo(todoId: number, completed: boolean) {
      const todoIndex = this.todos.findIndex(({ id }) => id === todoId);
      this.todos[todoIndex].completed = completed;
    },
    async fetchTodos(page: number = 1, limit: number = 10) {
      try {
        this.loading = true;
        const response = await fetchTodos(page, limit);
        this.todos = response.data;
        this.total = response.headers['x-total-count'];
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async fetchAddTodo(todo: Todo) {
      try {
        this.loading = true;
        const newTodo = {
          ...todo,
          id:
            this.todos.reduce((sum, cur) => (sum < cur.id ? cur.id : sum), 1) +
            1,
        };
        await fetchAddTodo(newTodo);
        this.addTodo(newTodo);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async fetchDeleteTodo(todoId: number) {
      try {
        this.loading = true;
        await fetchDeleteTodo(todoId);
        this.deleteTodo(todoId);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async fetchToggleCompleteTodo(todoId: number) {
      try {
        this.loading = true;
        const nextCompleted = !this.todos.find(({ id }) => id === todoId)
          .completed;
        await fetchUpdateTodo(todoId, {
          completed: nextCompleted,
        });
        this.setCompleteTodo(todoId, nextCompleted);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async fetchChangeTitle(todoId: number, title: string) {
      try {
        this.loading = true;
        await fetchUpdateTodo(todoId, {
          title,
        });
        this.changeTitle(todoId, title);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
