<template>
  <v-container>

    <v-row justify="space-between" style="margin-top: 20px; margin-left: 0px; ">
      <v-col cols="6">
        <v-row>
          <v-text-field label="Search Customers" solo append-icon="mdi-magnify" @change="search" />

          <v-btn color="primary" @click="userFormOpen = true" style="width: 95px; height: 47px; margin-left: 5px">
            <v-icon small> mdi-plus </v-icon>
            Add New
          </v-btn>
        </v-row>
      </v-col>
    </v-row>

    <v-card>
      <v-data-table :headers="headers" :items="users.data" :options.sync="tableOptions" :loading="loading"
        class="elevation-1" :footer-props="{
          'items-per-page-options': tableOptions.rowsPerPageItems,
        }">
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip :key="index" bottom v-if="item.status">
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="mr-2" v-bind="attrs" v-on="on" @click="disableUser(item.id)">
                mdi-account-check
              </v-icon>
            </template>
            Disapprove
          </v-tooltip>
          <v-tooltip :key="index" bottom v-if="!item.status">
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="mr-2" v-bind="attrs" v-on="on" @click="enableUser(item.id)">
                mdi-account-cancel

              </v-icon>
            </template>
            Approve
          </v-tooltip>
          <!-- <v-tooltip :key="index" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="mr-2" v-bind="attrs" v-on="on" @click="goToProfile(item.id)">
                mdi-eye
              </v-icon>
            </template>
            View
          </v-tooltip> -->
          <v-tooltip :key="index" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="mr-2" v-bind="attrs" v-on="on" @click="editUserFunction(item)">
                mdi-account-edit
              </v-icon>
            </template>
            Edit
          </v-tooltip>
          <v-tooltip :key="index" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="mr-2" v-bind="attrs" v-on="on" @click="deleteUser(item)">
                mdi-delete
              </v-icon>
            </template>
            Delete
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>

    <user-form :open="userFormOpen" user-type="customer" @close="userModalClose" :isCreate="isCreate"
      :prefilledData="editUser" />
  </v-container>
</template>
<script>
import userForm from "@/components/userForm";
import Vue from "vue";
import JsonCSV from "vue-json-csv";

Vue.component("downloadCsv", JsonCSV);
import DateFilter from "@/components/dateFilter";
import {
  getUsers,
  deleteUser,
  getUsersStats,
  get_customer_data_in_csv,
  enableUserApi,
  disableUserApi, deleteUserApi

} from "@/services/users";
export default {
  components: { userForm, DateFilter },
  data() {
    return {
      adminType: JSON.parse(localStorage.getItem("user")).role === "admin",
      retainUsers: [],
      userFormOpen: false,
      usersStatus: "all",
      timeStatus: "all",
      loadFile: false,
      showLoadFile: false,
      csvfile: null,
      load: false,
      showLoad: false,
      stats: null,
      json_data: null,
      isCreate: true,
      editUser: {},
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "First Name",
          align: "start",
          sortable: false,
          value: "firstName",
        },
        {
          text: "Last Name",
          align: "start",
          sortable: false,
          value: "lastName",
        },
        {
          text: "Email",
          align: "start",
          sortable: false,
          value: "email",
        },
        {
          text: "Role",
          align: "start",
          sortable: false,
          value: "role",
        },
        {
          text: "Registration Date",
          align: "start",
          sortable: false,
          value: "created",
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
        actions: ["edit", "view", "delete", "toggle-approve"], //users action
      },
      tableOptions: {
        page: 1,
        itemsPerPage: 10,
        totalItems: 0,
        rowsPerPageItems: [10, 50, 100, 200],
      },
      loading: true,
      searchKeyword: "",
      dateFilter: null,
      initDate: [],
      Partner_selected: null,
      Partner_list: [{ Partner_code: "fin" }, { Partner_code: "test" }],
      downloadType_selected: null,
      downloadType_list: [
        { downloadType: "All" },
        { downloadType: "Selected" },
      ],
    };
  },
  watch: {
    tableOptions: {
      handler() {
        this.loading = true;
        const _self = this;
        setTimeout(function () {
          _self.getUsersData();
        }, 500);
      },
      deep: true,
    },

    // Partner_selected: {
    //   handler() {
    //     this.loading = true;
    //     const _self = this;
    //     setTimeout(function () {
    //       _self.getUsersData();
    //     }, 500);
    //   },
    //   deep: true,
    // },
    usersStatus() {
      this.loading = true;
      this.getUsersData();
    },
    timeStatus() {
      this.getUsersTimeStats();
    },
  },
  async mounted() {
    // let code = this.$route?.query?.partner_code;

    // this.Partner_selected =
    //   code !== null || code !== undefined ? { Partner_code: code } : null;
    // this.Partner_list.push(code && this.Partner_selected);
    const date = new Date();
    if (!localStorage.getItem("filterDate")) {
      this.initDate.push(`${date.getFullYear()}-${date.getMonth() + 1}-01`);
      this.initDate.push(
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      );
    } else {
      let datearr = localStorage.getItem("filterDate").split(",");
      this.initDate.push(
        datearr[0]
      );
      this.initDate.push(
        datearr[1]
      );
      this.dateFilter = [new Date(datearr[0]), new Date(datearr[1])]
    }
    this.getUsersData();
    this.getUsersTimeStats();
  },
  methods: {
    disableUser(userId) {
      console.log('disabling user', userId);
      disableUserApi(userId).then(res => {
        this.getUsersData()
      })
    },
    enableUser(userId) {
      console.log('enabling user', userId);
      this.getUsersData()
      enableUserApi(userId).then(res => {
        this.getUsersData()
      })
    },
    editUserFunction(user) {
      console.log('opening edit model', user);
      this.editUser = user;
      this.isCreate = false;
      this.userFormOpen = true;
    },


    search(keyword) {
      this.searchKeyword = keyword;
      this.getUsersData();
    },
    userModalClose() {
      this.editUser = {}
      this.isCreate = true;
      this.userFormOpen = false;
      this.getUsersData();
    },
    deleteUser(item) {
      if (confirm("Are your Sure?")) {
        deleteUserApi(item.id).then((res) => {
          this.getUsersData();
        });
      }
    },
    async getUsersData() {
      this.loading = true;
      const params = {
        search: this.searchKeyword,
        limit: this.searchKeyword ? 30 : this.tableOptions.itemsPerPage,
        page: this.tableOptions.page,
      };
      // this.csvfile = `${process.env.VUE_APP_API}/get_customer_data_in_csv?search=${params.search}&limit=${params.limit}&page=1&type=customer&date=${params.date}&status=${params.status}`;
      getUsers(params).then((res) => {
        this.users.data = res.data.rows;
        this.tableOptions.totalItems = res.data.count;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
.border {
  border: 2px dashed orange;
}

.v-input__control,
.v-input__slot,
.v-select__slot,
.v-label {
  color: blue !important;
}
</style>
