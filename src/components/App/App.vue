<template>
  <div class="app">
    <h1 :class="'text-h2 pa-4'">Todo app</h1>
    <AddTodo />
    <TodoList />
    <v-pagination
      v-if="store.total"
      v-model="page"
      :length="Math.ceil(store.total / limit)"
      total-visible="7"
      @update:model-value="handlePageChange"
    ></v-pagination>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUpdated } from 'vue';

import AddTodo from '@/components/AddTodo/AddTodo.vue';
import TodoList from '@/components/TodoList/TodoList.vue';
import { usePagination } from '@/hooks/usePagination';
import { useTodosStore } from '@/store/todos/todos';

const store = useTodosStore();

const { page, limit, handlePageChange } = usePagination();

onMounted(() => {
  store.fetchTodos(page.value, limit.value);
});

onUpdated(() => {
  store.fetchTodos(page.value, limit.value);
});
</script>

<style lang="scss">
.app {
  text-align: center;
}
</style>
