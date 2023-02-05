<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
  >
    <v-app-bar-nav-icon @click="setDrawer(!drawer)" />
    <!-- <v-btn
      class="mr-3"
      flat
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn> -->

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />

    <!-- <v-text-field
      :label="$t('search')"
      color="secondary"
      hide-details
      style="max-width: 165px;"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field> -->

    <div class="mx-3" />

    <!-- <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/"
    >
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn> -->

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          text
          v-on="on"
        >
          <v-icon>mdi-account</v-icon> <span> Hi, {{ users.firstName + ' ' + users.lastName }} </span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-btn
          color="primary"
          dark
          v-bind="attrs"
          text
          @click="logoutAction()"
        >
        Log Out
        </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  // Components

  // Utilities
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',

    components: {
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      notifications: [
        'Mike John Responded to your email',
        'You have 5 new tasks',
        'You\'re now friends with Andrew',
        'Another Notification',
        'Another one',
      ],
    }),

    computed: {
      ...mapState(['drawer']),
      users () {
        const data = JSON.parse(localStorage.getItem('user'))
        return data
      },
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
      logoutAction () {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.reload()
      },
    },
  }
</script>
