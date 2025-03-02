<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate></CategoryCreate>
        <CategoryEdit></CategoryEdit>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/Categories/CategoryCreate.vue";
import CategoryEdit from "@/components/Categories/CategoryEdit.vue";
export default {
  components: {
    CategoryCreate,
    CategoryEdit,
  },
  name: "categoriesView",
};
</script>
