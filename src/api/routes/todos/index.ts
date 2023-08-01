import api from '@/api/api';
import { Todo } from '@/api/routes/todos/types';

export const fetchTodos = (page: number = 1, limit: number = 10) => {
  return api.get(`/todos?_page=${page}_limit=${limit}`);
};

export const fetchAddTodo = (todo: Todo) => {
  return api.post(`/todos`, todo);
};

export const fetchDeleteTodo = (todoId: number) => {
  return api.delete(`/todos/${todoId}`);
};

export const fetchUpdateTodo = (todoId: number, body: Partial<Todo>) => {
  return api.patch(`/todos/${todoId}`, body);
};
