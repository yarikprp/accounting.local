<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>
      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill :rates="currency?.rates" />
      <HomeCurrency />
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/Home/HomeBill.vue";
import HomeCurrency from "@/components/Home/HomeCurrency.vue";
import Loader from "@/components/app/Loader.vue";

export default {
  name: "homeView",
  components: {
    HomeBill,
    HomeCurrency,
    Loader,
  },
  data: () => ({
    loading: true,
    currency: {},
  }),
  async mounted() {
    await this.$store.dispatch("fetchCurrency");
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>
