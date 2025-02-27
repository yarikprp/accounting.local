<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>

      <div class="input-field">
        <input
          id="email"
          type="text"
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

      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          v-model.trim="state.name"
          :class="{ invalid: v$.name.$dirty && v$.name.$error }"
        />
        <label for="name">Имя</label>
        <small
          v-if="v$.name.$dirty && v$.name.$error"
          class="helper-text invalid"
        >
          Имя должно содержать минимум {{ minNameLength }} символа
        </small>
      </div>

      <p>
        <label>
          <input type="checkbox" v-model="state.agreed" />
          <span :class="{ invalid: v$.agreed.$dirty && v$.agreed.$error }"
            >С правилами согласен</span
          >
        </label>
        <small
          v-if="v$.agreed.$dirty && v$.agreed.$error"
          class="helper-text invalid"
        >
          Вы должны согласиться с правилами
        </small>
      </p>
    </div>

    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { email, required, minLength, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import { getFirebaseErrorMessage } from "@/utils/firebaseErrors";

export default {
  name: "registerView",
  setup() {
    const minPasswordLength = 6;
    const minNameLength = 2;
    const router = useRouter();
    const toast = useToast();
    const store = useStore();

    const state = reactive({
      email: "",
      password: "",
      name: "",
      agreed: false,
    });

    const rules = computed(() => ({
      email: { required, email },
      password: { required, minLength: minLength(minPasswordLength) },
      name: { required, minLength: minLength(minNameLength) },
      agreed: {
        required: helpers.withMessage(
          "Вы должны согласиться с правилами",
          (value) => value === true
        ),
      },
    }));

    const v$ = useVuelidate(rules, state);

    const submitHandler = async () => {
      v$.value.$touch();
      if (v$.value.$invalid) {
        toast.error("Пожалуйста, исправьте ошибки в форме");
        return;
      }

      const formData = {
        email: state.email,
        password: state.password,
        name: state.name,
      };

      try {
        await store.dispatch("register", formData);
        toast.success("Вы успешно зарегистрированы!");
        router.push("/");
      } catch (e) {
        toast.error(getFirebaseErrorMessage(e.code));
      }
    };
    return {
      state,
      v$,
      submitHandler,
      minPasswordLength,
      minNameLength,
    };
  },
};
</script>
