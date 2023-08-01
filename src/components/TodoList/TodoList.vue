<template>
  <v-container>
    <v-row>
      <v-col v-for="todo in store.todos" :key="todo.id" cols="6">
        <TodoItem :todo="todo" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import TodoItem from '@/components/TodoItem/TodoItem.vue';
import { useTodosStore } from '@/store/todos/todos';

const store = useTodosStore();
</script>

<style lang="scss">
.todo-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  gap: 1rem;
}
</style>
