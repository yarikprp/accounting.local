<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          class="validate"
          v-model.trim="state.email"
          :class="{ invalid: v$.email.$dirty && v$.email.$error }"
        />
        <label for="email">Email</label>
        <small
          v-if="v$.email.$dirty && v$.email.$error"
          class="helper-text invalid"
        >
          Некорректный email
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model.trim="state.password"
          :class="{ invalid: v$.password.$dirty && v$.password.$error }"
        />
        <label for="password">Пароль</label>
        <small
          v-if="v$.password.$dirty && v$.password.$error"
          class="helper-text invalid"
        >
          Пароль должен содержать минимум {{ minPasswordLength }} символов
        </small>
      </div>
    </div>
    <div class="card-action">
      <button class="btn waves-effect waves-light auth-submit" type="submit">
        Войти
        <i class="material-icons right">send</i>
      </button>
      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";
import { computed, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router"; // Здесь импортируем useRoute и useRouter
import { useToast } from "vue-toastification";

export default {
  name: "loginView",
  setup() {
    const state = reactive({
      email: "",
      password: "",
    });

    const minPasswordLength = 6;
    const router = useRouter();
    const route = useRoute(); // Правильный способ использовать route
    const toast = useToast();

    const rules = computed(() => ({
      email: { required, email },
      password: { required, minLength: minLength(minPasswordLength) },
    }));

    const v$ = useVuelidate(rules, state);

    const submitHandler = () => {
      v$.value.$touch();
      if (v$.value.$invalid) {
        toast.error("Пожалуйста, исправьте ошибки в форме");
        return;
      }

      const formData = {
        email: state.email,
        password: state.password,
      };

      console.log(formData);
      toast.success("Вы успешно вошли в систему!");
      router.push("/");
    };

    onMounted(() => {
      if (route.query.message === "logout") {
        toast.success("Вы успешно вышли из системы!");
      }
    });

    return {
      state,
      v$,
      submitHandler,
      minPasswordLength,
    };
  },
};
</script>
