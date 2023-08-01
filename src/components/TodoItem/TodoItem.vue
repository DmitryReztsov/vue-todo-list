<template>
  <v-card data-test="todo-item">
    <v-card-title v-if="!isEdit">
      {{ todo.title }}
    </v-card-title>
    <v-text-field
      v-if="isEdit"
      v-model="todo.title"
      :autofocus="true"
      :clearable="true"
      hide-details="auto"
    ></v-text-field>
    <v-card-actions>
      <v-checkbox
        v-model="todo.completed"
        :disabled="store.loading"
        color="blue"
        hide-details
        label="Выполнено"
        @click="store.fetchToggleCompleteTodo(todo.id)"
      >
      </v-checkbox>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="store.loading || !todo.title"
        color="green"
        variant="flat"
        @click="handleClickSave"
      >
        {{ isEdit ? 'Сохранить' : 'Изменить' }}
      </v-btn>
      <v-btn
        :disabled="store.loading"
        color="red"
        variant="flat"
        @click="handleClickDelete"
      >
        {{ isEdit ? 'Отменить' : 'Удалить' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { Todo } from '@/api/routes/todos/types';
import { useTodosStore } from '@/store/todos/todos';

const props = defineProps<{ todo: Todo }>();

const store = useTodosStore();

const isEdit = ref(false);
let lastTitleValue = '';

const toggleEdit = () => {
  if (!isEdit.value) {
    lastTitleValue = props.todo.title;
  }
  isEdit.value = !isEdit.value;
};

const handleClickSave = async () => {
  if (isEdit.value) {
    await store.fetchChangeTitle(props.todo.id, props.todo.title);
  }
  toggleEdit();
};

const handleClickDelete = async () => {
  if (isEdit.value) {
    store.changeTitle(props.todo.id, lastTitleValue);
    toggleEdit();
  } else {
    await store.fetchDeleteTodo(props.todo.id);
  }
};
</script>

<style lang="scss"></style>
