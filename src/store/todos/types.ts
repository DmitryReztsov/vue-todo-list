import { Todo } from '@/api/routes/todos/types';

export interface TodosStore {
  todos: Todo[];
  total: number;
  loading: boolean;
}
