import { expect, test } from 'vitest';

import TodoItem from '@/components/TodoItem/TodoItem.vue';
import { useTodosStore } from '@/store/todos/todos.ts';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';


const mockTodo = {
  userId: 1,
  id: 1,
  title: 'delectus aut autem',
  completed: false,
};

test('renders a todo', async () => {
  const wrapper = mount(TodoItem, {
    props: {
      todo: mockTodo,
    },
    global: {
      plugins: [createTestingPinia()],
    },
  });

  const todoStore = useTodosStore();

  const todoItem = wrapper.get('[data-test="todo-item"]');

  expect(todoItem.text()).toBeTruthy();
});
