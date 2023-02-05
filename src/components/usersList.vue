<template>
  <v-container>
    <v-row justify="space-between">
      <v-col cols="12" class="py-5 px-8">
        <v-row>
          <v-text-field
            label="Search Professionals"
            append-icon="mdi-magnify"
            @change="search"
          />
        </v-row>
      </v-col>
    </v-row>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="users.data"
        :options.sync="tableOptions"
        :loading="loading"
        class="elevation-0"
        :footer-props="{
          'items-per-page-options': tableOptions.rowsPerPageItems,
        }"
      >
        <template v-slot:[`item.first_name`]="{ item }">
          {{ item.first_name }} {{ item.last_name }}
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          {{ getReadableDate(item.createdAt) }}
        </template>
        <template v-slot:[`item.freeCall`]="{ item }">
          <v-chip
            v-if="item.freeCall"
            class="ma-2"
            color="green"
            text-color="white"
          >
            Yes
          </v-chip>
          <v-chip
            v-if="!item.freeCall"
            class="ma-2"
            color="red"
            text-color="white"
          >
            No
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }" v-if="adminType">
          <template v-for="(act, index) in users.actions">
            <v-tooltip :key="index" bottom v-if="!item.freeCall">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="toggleEnableDiasble(item)"
                >
                  mdi-account-check
                </v-icon>
              </template>
              Enable Free Call
            </v-tooltip>
            <v-tooltip :key="index" bottom v-if="item.freeCall">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="toggleEnableDiasble(item)"
                >
                  mdi-account-cancel
                </v-icon>
              </template>
              Disable Free Call
            </v-tooltip>
          </template>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
import {
  getUsers,
  updateProfessionalMetadata1,
} from "@/services/users";
export default {
  data() {
    return {
      adminType : JSON.parse(localStorage.getItem('user')).role === "admin",
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "first_name",
        },
        {
          text: "Free Call Active",
          align: "start",
          sortable: false,
          value: "freeCall",
        },
        {
          text: "Created Date",
          align: "start",
          sortable: false,
          value: "createdAt",
        },
        {
          text: "Action",
          align: "start",
          sortable: false,
          value: "actions",
        },
      ],
      users: {
        data: [],
        actions: ["enable"],
      },
      tableOptions: {
        page: 1,
        itemsPerPage: 10,
        totalItems: 0,
        rowsPerPageItems: [10, 50, 100, 200],
      },
      loading: true,
      searchKeyword: "",
    };
  },
  watch: {
    tableOptions: {
      handler() {
        this.loading = true;
        const _self = this;
        setTimeout(function () {
          _self.getData();
        }, 500);
      },
      deep: true,
    },
  },
  async mounted() {
    this.getData();
  },
  methods: {
    search(keyword) {
      this.searchKeyword = keyword;
      this.loading = true;

      this.getData();
    },
    async getData() {
      const params = {
        search: this.searchKeyword,
        limit: this.tableOptions.itemsPerPage,
        page: this.tableOptions.page,
        freeCall: this.searchKeyword? null :true,
        type: "professional"
      }; // {
      //   status: this.usersStatus === 'all' ? null : this.usersStatus,
      //   search: this.searchKeyword,
      //   limit: this.tableOptions.itemsPerPage,
      //   page: this.tableOptions.page,
      //   type: 'customer',
      // }
      getUsers(params).then((res) => {
        this.users.data = res.data;
        console.log('recieved data', this.users.data);
        this.loading = false;
      });
    },
    toggleEnableDiasble(item){
      const freeCall = item.freeCall === true ? false : true;
      updateProfessionalMetadata1({ freeCall: freeCall , user_id: item.id}).then((res) => {
        this.searchKeyword =""
        this.getData();
      });
    },
    getReadableDate(date) {
      const d = new Date(date);
      return d.toLocaleString();
    },
  },
};
</script>
