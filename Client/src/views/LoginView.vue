<script setup>
import { ref } from 'vue';

const form = ref({
  email: '',
  password: '',
  remember: false,
});

const rules = {
  required: (value) => !!value || 'Required.',
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Invalid e-mail.';
  },
};

const visible = ref(false);

const isLoading = ref(false);

function submit() {
  let isValid = true;

  if (form.value.email === '') {
    isValid = false;
  }

  if (!form.value.password) {
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    alert(JSON.stringify(form.value));
  }, 3000);
}
</script>

<template>
  <div class="logincontent">
    <v-card class="pa-4 mx-auto" width="300">
      <div class="title">
        <v-card-title class="text-center">Log in Here</v-card-title>
      </div>
      <v-card-item>
        <v-form @submit.prevent="submit">
          <v-text-field
            variant="solo"
            prepend-inner-icon="mdi-email"
            v-model="form.email"
            :rules="[rules.required, rules.email]"
            label="Email"
            bg-color="#6CB694"
          >
          </v-text-field>

          <v-text-field
            bg-color="#F8D040"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            variant="solo"
            prepend-inner-icon="mdi-lock"
            v-model="form.password"
            :rules="[rules.required]"
            label="Password"
            @click:append-inner="visible = !visible"
          ></v-text-field>
          <v-checkbox
            v-model="form.remember"
            color="red"
            label="Remember me"
            hide-details
          ></v-checkbox>
          <v-btn color="#DB4A2B" class="mt-2 mb-2" type="submit" block>
            <v-progress-circular
              v-if="isLoading"
              color="white"
              indeterminate
              size="small"
            ></v-progress-circular>
            <span v-else>Log in</span>
          </v-btn>
          <v-card-action>
            <v-card-text class="text-center">
              <a
                class="text-blue text-decoration-none"
                href="/register"
                rel="noopener noreferrer"
                target="_blank"
              >
                Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
              </a>
            </v-card-text>
          </v-card-action>
        </v-form>
      </v-card-item>
    </v-card>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ultra&family=Work+Sans:wght@400;700&display=swap');

.logincontent {
  padding: 100px 0 150px 0;
  font-family: 'Work Sans', sans-serif;
}

.title {
  font-family: 'Ultra', serif;
}
</style>
