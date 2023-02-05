<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login to Dashboard</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="user" prepend-icon="mdi-email" name="email" label="Email" type="text" />
                  <v-text-field id="password" v-model="password" prepend-icon="mdi-lock" name="password"
                    label="Password" type="password" />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="loginMethod" :loading="loginLoading" :disabled="loginLoading"
                  class="ma-2">
                  Login
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon light>mdi-cached</v-icon>
                    </span>
                  </template>
                </v-btn>
              </v-card-actions>
              <v-col cols="12">
                <v-alert v-if="alert.show" border="left" dense text :type="alert.type">
                  {{ alert.text }}
                </v-alert>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SimpleVueValidator from 'simple-vue-validator'
import { login } from '@/services/auth'
const Validator = SimpleVueValidator.Validator
export default {
  name: 'Login',
  mixins: [SimpleVueValidator.mixin],
  data() {
    return {
      user: '',
      password: '',
      alert: {
        show: false,
        type: 'error',
        msg: '',
      },
      loginLoading: false
    }
  },
  validators: {
    user: function (value) {
      return Validator.value(value).required().minLength(4)
    },
    password: function (value) {
      return Validator.value(value).required().minLength(2)
    },
  },
  methods: {
    loginMethod: function () {
      if (!this.validation.hasError()) {
        const payload = { email: this.user, password: this.password }
        this.alert.show = false
        this.alert.text = ""
        this.loginLoading = true
        login(payload).then((res) => {
          const response = res.data
          console.log('response', response)
          this.$store.dispatch('loginUser', response)
          this.loginLoading = false
        }).catch(err => {

          console.log('22', err)
          this.loginLoading = false
          this.alert.show = true
          this.alert.text = err.response?.data?.error?.toString()
        })
      }
    },
  },
}
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
