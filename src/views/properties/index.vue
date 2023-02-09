<template>
  <v-container v-if="(userType == 'Admin' || userType == 'User')">

    <v-row justify="space-between" style="margin-left: 0px;">
      <v-col cols="6" class="mt-3">
        <v-row>
          <v-text-field label="Search Properties" solo append-icon="mdi-magnify" class="mr-3" @change="search"
            style="width: 95px; height: 47px;" />
        </v-row>
      </v-col>
    </v-row>

    <v-card>
      <v-data-table :headers="headers" :items="properties.data" :options.sync="tableOptions" :loading="loading"
        class="elevation-1" :key="listKey" :footer-props="{
          'items-per-page-options': tableOptions.rowsPerPageItems,
        }">

        <template v-slot:[`item.actions`]="{ item }">

          <v-tooltip :key="index" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="mr-2" v-bind="attrs" v-on="on" @click="viewProperty(item.id)">
                mdi-eye
              </v-icon>
            </template>
            View
          </v-tooltip>

          <v-tooltip :key="index" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="mr-2" v-bind="attrs" v-on="on" @click="deleteProperty(item.id)">
                mdi-delete
              </v-icon>
            </template>
            Delete
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>

import {
  getProperties,
  deletePropertyApi,
  getPropertiesAsUser
} from "@/services/admin";
export default {
  data() {
    return {
      userType: JSON.parse(localStorage.getItem('user')).role,
      listKey: 1,
      properties: {},
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "Tenant Name",
          align: "start",
          sortable: false,
          value: "tenant_name",
        },
        {
          text: "Inspector Name",
          align: "start",
          sortable: false,
          value: "inspector_name",
        },
        {
          text: "Inspection Date",
          align: "start",
          sortable: false,
          value: "inspection_date",
        },
        {
          text: "Electricity Meter",
          align: "start",
          sortable: false,
          value: "electricity_meter",
        },
        {
          text: "Gas Meter",
          align: "start",
          sortable: false,
          value: "gas_meter",
        },
        {
          text: "Water Meter",
          align: "start",
          sortable: false,
          value: "water_meter",
        },
        {
          text: "Smoke Alarm",
          align: "start",
          sortable: false,
          value: "smoke_alarm",
        },
        {
          text: "Action",
          align: "start",
          sortable: false,
          value: "actions",
        },
      ],
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
    deleteProperty(id) {
      if (confirm("Are your Sure?")) {
        deletePropertyApi(id).then((res) => {
          this.getData();
        });
      }
    },
    viewProperty(id) {
      this.$router.push({ name: "Property Details", params: { id: id } });
    },

    search(keyword) {
      this.searchKeyword = keyword
      this.getData();
    },
    async getData() {
      this.loading = true;
      const params = {
        search: this.searchKeyword,
        limit: this.tableOptions.itemsPerPage,
        page: this.tableOptions.page,
      };

      if (this.userType == 'Admin') {
        getProperties(params).then((res) => {
          this.properties.data = res.data.rows;
          this.tableOptions.totalItems = res.data.count;
          this.loading = false;
        });
      } else {
        getPropertiesAsUser(JSON.parse(localStorage.getItem('id')), params).then((res) => {
          this.properties.data = res.data.rows;
          this.tableOptions.totalItems = res.data.count;
          this.loading = false;
        });
      }
    },
    getReadableDate(date) {
      const d = new Date(date);
      return d.toLocaleString();
    },
  },
};
</script>
