<template>
  <v-navigation-drawer id="core-navigation-drawer" v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'" :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl" :src="require(`@/assets/${barImage}`)" mobile-breakpoint="960" app width="260"
    v-bind="$attrs">
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, ${barColor}`" v-bind="props" />
    </template>

    <v-divider class="mb-1" />

    <v-list dense nav>
      <v-list-item>
        <v-list-item-content>
          <a href="/">
            <v-list-item-title class="text-h4" v-text="profile.title" /></a>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav>
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group v-if="item.children" :key="`group-${i}`" :item="item">
          <!--  -->
        </base-item-group>

        <base-item v-else :key="`item-${i}`" :item="item" />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState } from "vuex";

const userType = JSON.parse(localStorage.getItem('user')).role;


// ...((JSON.parse(localStorage.getItem('user')).role == "moderator" ||
//     JSON.parse(localStorage.getItem('user')).role == "admin") ? [{
//   icon: "mdi-account-group",
//   title: "Users",
//   to: "/users",
// }]: [])


export default {
  name: "DashboardCoreDrawer",

  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    items: [
      ...((userType == "Moderator" ||
        userType == "Admin") ? [{
          icon: "mdi-account-group",
          title: "Users",
          to: "/users",
        }] : []),
      // {
      //   icon: "mdi-account-group",
      //   title: "Users",
      //   to: "/users",
      // },
      // {
      //   icon: "mdi-view-dashboard",
      //   title: "Partnership",
      //   to: "/partnership",
      //   group:'/partnership',
      //   children: []
      // },
      // {
      //   icon: "mdi-account-group",
      //   title: "Users",
      //   to: "/customers",
      // },
      // {
      //   icon: "mdi-account-box",
      //   title: "Users",
      //   to: "/professionals",
      // },
      // {
      //   icon: "mdi-calendar-account",
      //   title: "Bookings",
      //   to: "/callRequests",
      // },
      //(userType == 'Admin' || userType == 'User')
      // {
      //   icon: "mdi-home-analytics",
      //   title: "Properties",
      //   to: "/properties",
      // },

      ...((userType == "Admin" ||
        userType == "User") ? [{
          icon: "mdi-home-analytics",
          title: "Properties",
          to: "/properties",
        }] : []),
      // {
      //   icon: "mdi-cash",
      //   title: "Transactions",
      //   to: "/transactions",
      // },
      // {
      //   icon: "mdi-factory",
      //   title: "Industries",
      //   to: "/industries",
      // },
      // {
      //   icon: "mdi-castle",
      //   title: "Companies",
      //   to: "/companies",
      // },
      // {
      //   icon: "mdi-castle",
      //   title: "Schools",
      //   to: "/schools",
      // },
      // {
      //   icon: "mdi-file-word-box",
      //   title: "Web Pages",
      //   to: "/web-pages",
      // },
      // {
      //   icon: "mdi-ribbon",
      //   title: "VIP Codes",
      //   to: "/vipCodes",
      // },
      // {
      //   icon: "mdi-code-array",
      //   title: "Referral Codes",
      //   to: "/inviteCodes",
      // },
      //  {
      //   icon: "mdi-code-array",
      //   title: "Reviews",
      //   to: "/reviews",
      // },
      // {
      //   icon: "mdi-weight",
      //   title: "Discount Codes",
      //   to: "/discount",
      // },
      // {
      //   icon: "mdi-wallet-giftcard",
      //   title: "Gift Cards",
      //   to: "/giftcard",
      // },
      // {
      //   icon: 'mdi-view-dashboard',
      //   title: 'Transactions',
      //   to: '/transactions',
      // },
      // {
      //   icon: 'mdi-account',
      //   title: 'user',
      //   to: '/pages/user',
      // },
      // {
      //   title: 'Free Call',
      //   icon: 'mdi-clipboard-outline',
      //   to: '/free-call',
      // },
      // {
      //   title: 'Events',
      //   icon: 'mdi-calendar-clock',
      //   to: '/events',
      // },
      // {
      //   title: 'typography',
      //   icon: 'mdi-format-font',
      //   to: '/components/typography',
      // },
      // {
      //   title: 'icons',
      //   icon: 'mdi-chart-bubble',
      //   to: '/components/icons',
      // },
      // {
      //   title: 'google',
      //   icon: 'mdi-map-marker',
      //   to: '/maps/google-maps',
      // },
      // {
      //   title: 'notifications',
      //   icon: 'mdi-bell',
      //   to: '/components/notifications',
      // },
    ],
  }),

  computed: {
    ...mapState(["barColor", "barImage"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
    computedItems() {
      // let efcCodes = process.env.VUE_APP_EFC_CODES.split(',')
      // let childs = []
      // efcCodes.map(code => {
      //   childs.push(
      //     {
      //       icon: "mdi-view-dashboard",
      //       title: code,
      //       to: "?partner_code=" + code,
      //     },
      //   )
      // })
      // this.items[1].children = childs
      return this.items.map(this.mapItem);
    },
    profile() {
      return {
        avatar: true,
        title: this.$t("avatar"),
      };
    },
  },

  methods: {
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title),
      };
    },
  },
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
