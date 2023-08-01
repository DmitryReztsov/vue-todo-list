<template>
  <v-form v-model="rules.isFormValid" @submit.prevent="handleSubmit">
    <v-card>
      <v-card-title>
        <span class="text-h5"> Новая заметка </span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="form.title"
          :rules="rules.stringRules"
          label="Текст"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.userId"
          :rules="rules.idRules"
          label="ID пользователя"
          required
          type="number"
        ></v-text-field>
        <v-checkbox
          v-model="form.completed"
          color="blue"
          hide-details
          label="Выполнено"
        ></v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="flat" @click="emit('close')"> Закрыть</v-btn>
        <v-btn
          :disabled="!rules.isFormValid"
          :loading="store.loading"
          color="green"
          type="submit"
          variant="flat"
        >
          Создать
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useTodosStore } from '@/store/todos/todos';

const store = useTodosStore();

const form = ref({
  title: '',
  userId: 0,
  completed: false,
});

const rules = ref({
  isFormValid: false,
  stringRules: [
    (value) => {
      if (value) return true;
      return 'Обязательное поле';
    },
    (value) => {
      if (value?.length > 5) return true;
      return 'Длина заголовка - не менее 5 символов';
    },
  ],
  idRules: [
    (value) => {
      if (value >= 1) return true;
      return 'Id должен быть более 0';
    },
  ],
});

const handleSubmit = async () => {
  await store.fetchAddTodo(form.value);
  emit('close');
};

const emit = defineEmits<{
  close: [];
}>();
</script>
