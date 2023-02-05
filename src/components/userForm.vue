<template>
  <v-row justify="end">
    <v-dialog v-model="open" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isCreate? "Create": "Edit" }} User</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="2">
                <v-select v-model="user.role" :items="roles" item-text="label" item-value="value" label="Role*" />
              </v-col>
              <v-col cols="2">
                <v-select v-model="user.title" :items="titles" item-text="label" item-value="value" label="Title*" />
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="user.firstName" label="First Name*" hint="First name of user" persistent-hint
                  required />
              </v-col>

              <v-col cols="4">
                <v-text-field v-model="user.lastName" label="Last Name*" hint="Last name of user" persistent-hint
                  required />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="user.email" label="Email*" hint="Email of user" required />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="user.password" label="Password*" hint="Password for authentication"
                  type="password" required />
              </v-col>
            </v-row>
            <v-alert v-if="alert.show" border="left" dense text :type="alert.type">
              {{ alert.text }}
            </v-alert>
          </v-container>
          <small>*Indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="close">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveUser">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { createUser, updateUser } from '@/services/users'
export default {
  name: 'UserForm',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      required: true,
    },
    prefilledData: {
      type: Object,
      required: false,
      default: function () {
        return {}
      },
    },
    isCreate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // usersType: 'all',
      titles: [
        "Mr", "Mrs"
      ],
      roles: [
        "User", "Admin"
      ],
      search: '',
      dialog: false,
      user: {
        id: this.prefilledData.id || '',
        title: this.prefilledData.title || '',
        firstName: this.prefilledData.firstName || '',
        lastName: this.prefilledData.lastName || '',
        email: this.prefilledData.email || '',
        role: this.prefilledData.role || '',
        password: '',
        confirmPassword: '',
      },
      alert: {
        show: false,
        text: '',
        type: 'success',
      },
    }
  },
  watch: {
    prefilledData(val) {
      // Be sure to validate default values
      // if (val !== '') {
      //   this.selectPackage = val
      // }
      this.user = val
    }
  },
  mounted() {
    if (!this.isCreate) {

      console.log('editing..');
    }
    console.log('editing....', this.prefilledData, !this.isCreate);
    if (Object.entries(this.prefilledData).length !== 0) {
      console.log('editing', this.prefilledData);
      this.user = JSON.parse(JSON.stringify(this.prefilledData))
    }
  },
  methods: {
    close() {
      this.user = {};
      console.log('closing modal', "$emit('close')");
      this.isCreate = true
      this.$emit('close')
    },
    saveUser() {
      this.user.confirmPassword = this.user.password
      console.log('creating user', this.user);
      this.isCreate ?
        createUser(this.user).then(res => {
          this.alert.show = true
          this.alert.type = 'success'
          this.alert.text = 'User Created!'
          this.$emit('close')
        }).catch(err => {
          console.log(err.response.data.error)
          this.alert.show = true
          this.alert.type = 'error'
          this.alert.text = err.response.data.error.toString()
        }) :
        updateUser(this.user.id, this.user).then(res => {
          this.alert.show = true
          this.alert.type = 'success'
          this.alert.text = 'User Created!'
          this.$emit('close')
        }).catch(err => {
          console.log(err.response.data.error)
          this.alert.show = true
          this.alert.type = 'error'
          this.alert.text = err.response.data.error.toString()
        })
    },
  },
}
</script>
