<template>
  <v-container v-if="(userType == 'Admin' || userType == 'Moderator')">

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

  <v-container
    id="user-profile"
    fluid
    tag="section"
    v-else-if=" userType == 'User' "
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
              Edit Profile
            </div>

            <div class="text-text-subtitle-1 font-weight-light">
              Complete your profile
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="2"
                >
                  <v-text-field
                    label="ID"
                    v-model="userDetail.id"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                >
                   <v-select v-model="userDetail.title" :items="titles"  label="Title*" />
                </v-col>

                <v-col
                  cols="12"
                  md="7"
                >
                  <v-text-field
                    label="Email Address"
                    class="purple-input"
                    v-model="userDetail.email"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="First Name"
                    v-model="userDetail.firstName"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Last Name"
                    v-model="userDetail.lastName"
                    class="purple-input"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Company Address"
                    v-model="userDetail.company_address"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Company Name"
                    v-model="userDetail.company_name"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Mobile Number"
                    v-model="userDetail.mobile_number"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select v-model="userDetail.role" :items="roles" disabled label="Role*" />
                </v-col>

               

                <v-col
                  cols="12"
                  class="text-right"
                >
                 <v-alert v-if="alert.show" border="left" dense text :type="alert.type">
              {{ alert.text }}
            </v-alert>
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="updateUser"
                  >
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
        style="margin-top:20px"
      >
        <base-material-card
          class="v-card-profile"
          :avatar="apiURL + userDetail.company_logo"
        >
          <v-card-text class="text-center">
            <h6 class="text-h4 mb-1 grey--text">
              {{userDetail.role}}
            </h6>

            <h4 class="text-h3 font-weight-light mb-3 black--text">
              {{userDetail.firstName}} {{userDetail.lastName}}
            </h4>

            <v-file-input
            :rules="rules"
            accept="image/*"
            placeholder="Update profile image"
            variant="underlined"
            v-model="file" 
            prepend-icon="mdi-camera"
            label="Profile image"
          ></v-file-input>

            <v-btn
              color="success"
              rounded
              @click="onUpload"
              class="mr-0"
            >
              Update Image
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
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
  updateUser,
  get_customer_data_in_csv,
  enableUserApi,uploadImage,
  disableUserApi, deleteUserApi

} from "@/services/users";

export default {
  components: { userForm, DateFilter },
  data() {
    return {
      userType: JSON.parse(localStorage.getItem('user')).role,
      apiURL: process.env.VUE_APP_API + "/",
      rules: [
        value => {
          return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
        },
      ],
      userFormOpen: false,
      usersStatus: "all",
      timeStatus: "all",
      loadFile: false,
      showLoadFile: false,
      csvfile: null,
      load: false,
      showLoad: false,
      alert: {
        show: false,
        text: '',
        type: 'success',
      },
      titles: [
        "Mr", "Mrs"
      ],
      roles: [
        "User", "Admin", "Moderator"
      ],
      file: null,
      userDetail: {
        id: JSON.parse(localStorage.getItem('user')).id || '',
        title: JSON.parse(localStorage.getItem('user')).title || '',
        firstName: JSON.parse(localStorage.getItem('user')).firstName || '',
        lastName: JSON.parse(localStorage.getItem('user')).lastName || '',
        email: JSON.parse(localStorage.getItem('user')).email || '',
        role: JSON.parse(localStorage.getItem('user')).role || '',
        company_address: JSON.parse(localStorage.getItem('user')).company_address || '',
        company_name: JSON.parse(localStorage.getItem('user')).company_name || '',
        mobile_number: JSON.parse(localStorage.getItem('user')).mobile_number || '',
        company_logo: JSON.parse(localStorage.getItem('user')).company_logo || '',
      },
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
  },
  async mounted() {
    // let code = this.$route?.query?.partner_code;

    // this.Partner_selected =
    //   code !== null || code !== undefined ? { Partner_code: code } : null;
    // this.Partner_list.push(code && this.Partner_selected);
    // const date = new Date();
    // if (!localStorage.getItem("filterDate")) {
    //   this.initDate.push(`${date.getFullYear()}-${date.getMonth() + 1}-01`);
    //   this.initDate.push(
    //     `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    //   );
    // } else {
    //   let datearr = localStorage.getItem("filterDate").split(",");
    //   this.initDate.push(
    //     datearr[0]
    //   );
    //   this.initDate.push(
    //     datearr[1]
    //   );
    //   this.dateFilter = [new Date(datearr[0]), new Date(datearr[1])]
    // }
    // this.getUsersData();
    // this.getUsersTimeStats();
  },
  methods: {
    disableUser(userId) {
      console.log('disabling user', userId);
      disableUserApi(userId).then(res => {
        this.getUsersData()
      })
    },
    onUpload() {
      console.log(this.file)
      let formData = new FormData();

      formData.append("file", this.file);
      uploadImage(formData).then(res => {
        console.log("🚀 ~ file: Users.vue:436 ~ uploadImage ~ res:", res.data)
        let userInfo = JSON.parse(localStorage.getItem('user'))
        userInfo['company_logo'] = res.data.path
        localStorage.setItem('user',JSON.stringify(userInfo));
        updateUser(this.userDetail.id, {company_logo:res.data.path}).then(res => {
          window.location.reload();
      }).catch(err => {
          window.location.reload();
      })
       
        
      })

    },
    updateUser() {

      updateUser(this.userDetail.id, this.userDetail).then(res => {
          this.alert.show = true
          this.alert.type = 'success'
          this.alert.text = 'Profile updated!'
      }).catch(err => {
          console.log(err.response.data.error)
          this.alert.show = true
          this.alert.type = 'error'
          this.alert.text = err.response.data.error.toString()
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
