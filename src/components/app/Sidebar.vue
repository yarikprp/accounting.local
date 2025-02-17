<template>
  <ul class="sidenav app-sidenav open">
    <router-link
      v-for="link in links"
      :key="link.url"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <template #default="{ navigate }">
        <li>
          <a
            href="#"
            class="waves-effect waves-orange pointer"
            @click="navigate"
          >
            {{ link.title }}
          </a>
        </li>
      </template>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "sideBar",
  props: ["value"],
  data: () => ({
    links: [
      { title: "Счет", url: "/", exact: true },
      { title: "История", url: "/history" },
      { title: "Планирование", url: "/planning" },
      { title: "Новая запись", url: "/record" },
      { title: "Категории", url: "/categories" },
    ],
  }),
};
</script>
