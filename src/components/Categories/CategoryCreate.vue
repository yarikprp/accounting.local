<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitForm">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="state.name"
            @blur="v$.name.$touch"
          />
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="v$.name.$error">
            {{ v$.name.required ? "Введите название" : "Минимум 3 символа" }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="state.limit"
            @blur="v$.limit.$touch"
          />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid" v-if="v$.limit.$error">
            {{
              v$.limit.required ? "Введите лимит" : "Минимальное значение 100"
            }}
          </span>
        </div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
          :disabled="v$.$invalid"
        >
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, minValue, numeric } from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";

export default {
  setup() {
    const state = reactive({
      name: "",
      limit: "",
    });

    const toast = useToast();
    const store = useStore();

    const rules = {
      name: { required, minLength: minLength(3) },
      limit: { required, numeric, minValue: minValue(100) },
    };

    const v$ = useVuelidate(rules, state);

    const submitForm = async () => {
      v$.value.$touch();
      if (v$.value.$invalid) {
        toast.error("Пожалуйста, исправьте ошибки в форме.");
        return;
      }

      toast.success("Категория успешно создана! 🎉");

      await store.dispatch("createCategory", {
        title: state.name,
        limit: state.limit,
      });

      state.name = "";
      state.limit = "";
      v$.value.$reset();
    };

    return { state, v$, submitForm };
  },
};
</script>
