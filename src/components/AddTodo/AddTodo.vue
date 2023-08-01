<template>
  <v-btn color="primary" prepend-icon="mdi-plus" @click="dialog = true">
    Add todo
  </v-btn>
  <v-dialog v-model="dialog" width="480">
    <NewTodoForm @close="dialog = false" />
  </v-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import NewTodoForm from '@/components/AddTodo/NewTodoForm.vue';

const dialog = ref(false);
</script>
