import { ref } from 'vue';

export function usePagination() {
  const page = ref(1);
  const limit = ref(10);

  const handlePageChange = (value: number) => {
    page.value = value;
  };

  return { page, limit, handlePageChange };
}
