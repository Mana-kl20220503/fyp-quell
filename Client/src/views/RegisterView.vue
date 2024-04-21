<script setup>
import { ref } from 'vue';

const form = ref({
  first: '',
  last: '',
  email: '',
  password: '',
  terms: false,
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

  if (form.value.first === '') {
    isValid = false;
  }

  if (form.value.last === '') {
    isValid = false;
  }

  if (form.value.email === '') {
    isValid = false;
  }

  if (form.value.password === '') {
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
  <div class="signupcontent">
    <v-card class="mx-auto" max-width="344">
      <div class="title">
        <v-card-title class="text-center">User Registration</v-card-title>
      </div>
      <v-card-item>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="form.first"
            color="primary"
            label="First name"
            variant="solo"
            :rules="[rules.required]"
          ></v-text-field>

          <v-text-field
            v-model="form.last"
            color="primary"
            label="Last name"
            variant="solo"
            :rules="[rules.required]"
          ></v-text-field>

          <v-text-field
            v-model="form.email"
            color="primary"
            label="Email"
            variant="solo"
            prepend-inner-icon="mdi-email-outline"
            :rules="[rules.required, rules.email]"
          ></v-text-field>

          <v-text-field
            v-model="form.password"
            color="primary"
            label="Password"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="solo"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            :rules="[rules.required]"
            @click:append-inner="visible = !visible"
          ></v-text-field>

          <v-checkbox
            v-model="form.terms"
            color="red"
            label="I agree to site terms and conditions"
          ></v-checkbox>

          <v-divider></v-divider>

          <v-btn color="teal-lighten-1" class="mt-2 mb-2" type="submit" block>
            <v-progress-circular
              v-if="isLoading"
              color="white"
              indeterminate
              size="small"
            ></v-progress-circular>
            <span v-else>Complete Registration</span>
          </v-btn>
        </v-form>
      </v-card-item>
    </v-card>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ultra&family=Work+Sans:wght@400;700&display=swap');

.signupcontent {
  padding: 50px 0 100px 0;
  font-family: 'Work Sans', sans-serif;
}

.title {
  font-family: 'Ultra', serif;
}
</style>
