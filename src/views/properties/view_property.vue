<template>
  <v-container>
    <v-row justify="space-between">
      <v-col class="mt-4" cols="8"> </v-col>
      <v-progress-circular :width="3" color="green" :indeterminate="load" v-if="showLoad"
        class="mt-5"></v-progress-circular>
    </v-row>
    <v-row>
      <v-col cols="12">
        <base-material-card color="primary">
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">Property Details</div>
          </template>
          <template>
            <v-form>

              <v-row class="no-gutters py-2" style="margin-bottom: 25px">
                <v-col md="12">
                  <v-card style="margin-right: 5px; margin-left: 5px;">
                    <v-card-title class="text-h4">
                      Main Image
                    </v-card-title>
                    <v-img :src="apiURL + this.propertyDetails.main_img" height="800"
                      lazy-src="https://picsum.photos/id/11/10/6" contain class="grey darken-4"></v-img>
                  </v-card>
                </v-col>
                <v-col md="2">
                  <h5>ID :</h5>
                  <v-text-field v-model="propertyDetails.id" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="5">
                  <h5>Tenant Name :</h5>
                  <v-text-field v-model="propertyDetails.tenant_name" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="5">
                  <h5>Inspector Name :</h5>
                  <v-text-field v-model="propertyDetails.inspector_name" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="2">
                  <h5>Electricity Meter :</h5>
                  <v-text-field v-model="propertyDetails.electricity_meter" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="2">
                  <h5>Electricity Meter Reading:</h5>
                  <v-text-field v-model="propertyDetails.electricity_meter_reading" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="2">
                  <h5>Gas Meter :</h5>
                  <v-text-field v-model="propertyDetails.gas_meter" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="2">
                  <h5>Gas Meter Reading:</h5>
                  <v-text-field v-model="propertyDetails.gas_meter_reading" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="2">
                  <h5>Water Meter :</h5>
                  <v-text-field v-model="propertyDetails.water_meter" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="2">
                  <h5>Water Meter Reading:</h5>
                  <v-text-field v-model="propertyDetails.water_meter_reading" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>


                <v-col cols="4">
                  <v-card style="margin-right: 5px; margin-left: 5px;">
                    <v-card-title class="text-h4">
                      Electricity Meter Image
                    </v-card-title>
                    <v-img :src="apiURL + propertyDetails.electricity_meter_img" height="250" contain
                      class="grey darken-4"></v-img>
                  </v-card>
                </v-col>

                <v-col cols="4">
                  <v-card style="margin-right: 5px;">
                    <v-card-title class="text-h4">
                      Gas Meter Image
                    </v-card-title>
                    <v-img :src="apiURL + propertyDetails.gas_meter_img" height="250" contain
                      class="grey darken-4"></v-img>
                  </v-card>
                </v-col>

                <v-col cols="4">
                  <v-card style="margin-left: 5px;">
                    <v-card-title class="text-h4">
                      Water Meter Image
                    </v-card-title>
                    <v-img :src="apiURL + propertyDetails.water_meter_img" height="250" contain
                      class="grey darken-4"></v-img>
                  </v-card>
                </v-col>


                <v-col md="4">
                  <h5>Smoke Alarm :</h5>
                  <v-text-field v-model="propertyDetails.smoke_alarm" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="4">
                  <v-card style="margin-right: 5px;">
                    <h5>Smoke Alarm Fron Image :</h5>
                    <v-img :src="apiURL + propertyDetails.smoke_alarm_front_img" height="250" contain
                      class="grey darken-4"></v-img>
                  </v-card>
                </v-col>
                <v-col md="4">
                  <v-card style="margin-left: 5px;">
                    <h5>Smoke Alarm Back Image:</h5>
                    <v-img :src="apiURL + propertyDetails.smoke_alarm_back_img" height="250" contain
                      class="grey darken-4"></v-img>
                  </v-card>
                </v-col>

                <v-col md="4">
                  <h5>Co-Alarm :</h5>
                  <v-text-field v-model="propertyDetails.co_alarm" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="4">
                  <v-card style="margin-right: 5px;">
                    <h5>Co-Alarm Fron Image :</h5>
                    <v-img :src="apiURL + propertyDetails.co_alarm_front_img" height="250" contain
                      class="grey darken-4"></v-img>
                  </v-card>
                </v-col>
                <v-col md="4">
                  <v-card style="margin-left: 5px;">
                    <h5>Co-Alarm Back Image:</h5>
                    <v-img :src="apiURL + propertyDetails.co_alarm_back_img" height="250" contain
                      class="grey darken-4"></v-img>
                  </v-card>
                </v-col>

                <v-col md="6">
                  <h5>Heating System :</h5>
                  <v-text-field v-model="propertyDetails.heating_system" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="6">
                  <v-card style="margin-left: 5px;">
                    <h5>Heating System Image:</h5>
                    <v-img :src="apiURL + propertyDetails.heating_system_img" height="250" contain
                      class="grey darken-4"></v-img>
                  </v-card>
                </v-col>

                <v-col md="6">
                  <h5>Advised To Tenant :</h5>
                  <v-text-field v-model="propertyDetails.advised_tenant_to" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="6">
                  <h5>Contractor Instruction :</h5>
                  <v-text-field v-model="propertyDetails.contractor_instructed" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="6">
                  <h5>Request To Landlord :</h5>
                  <v-text-field v-model="propertyDetails.asked_landlord_to" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="6">
                  <h5>Final Remarks :</h5>
                  <v-text-field v-model="propertyDetails.final_remarks" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>


                <v-col md="6">
                  <v-card style="margin-left: 5px;">
                    <h5>Inspector Signature :</h5>
                    <v-img :src="'data:image/png;base64,' + propertyDetails.signature_inspector" height="250" contain
                      class="grey darken-4"></v-img>
                  </v-card>
                </v-col>
                <v-col md="6">
                  <v-card style="margin-left: 5px;">
                    <h5>Tenant Signature:</h5>
                    <v-img :src="'data:image/png;base64,' + propertyDetails.signature_tenant" height="250" contain
                      class="grey darken-4"></v-img>
                  </v-card>
                </v-col>

                <v-col md="6">
                  <h5>Types :</h5>
                  <v-text-field v-model="propertyDetails.types" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="6">
                  <h5>Account ID :</h5>
                  <v-text-field v-model="propertyDetails.accountId" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>

                <v-col md="12">
                  <h5>Property Address :</h5>
                  <v-text-field v-model="propertyDetails.property_address" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="4">
                  <h5>Gas Safety Certificate Expiry Date :</h5>
                  <v-text-field v-model="propertyDetails.gas_safety_certificate_exp_date" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="4">
                  <h5>ECP Expiry Date :</h5>
                  <v-text-field v-model="propertyDetails.ecp_exp_date" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="4">
                  <h5>ECIR Expiry Date :</h5>
                  <v-text-field v-model="propertyDetails.ecir_exp_date" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
                <v-col md="12">
                  <h5>Property Creation :</h5>
                  <v-text-field v-model="propertyDetails.created" class="purple-input"
                    style="margin-top: -14px; margin-right: 30px" readonly />
                </v-col>
              </v-row>

            </v-form>
          </template>

        </base-material-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6" sm="3" v-for="(parts, index) in propertyDetails.property_details" :key="index">
        <v-card :loading="loading" class="mx-auto my-12" max-width="600">
          <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
          </template>

          <!-- <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img> -->
          <v-carousel>
            <v-carousel-item v-for="(item, i) in parts.property_images" :key="i" :src="apiURL + item.url"
              reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
          </v-carousel>
          <v-card-title>{{ parts.name }}</v-card-title>

          <v-card-text>
            <div>{{ parts.description }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>
<script>
import {
  getPropertDetailApi,

} from "@/services/admin";
import Icons from "../dashboard/component/Icons.vue";
import VComponent from "../../components/base/VComponent.vue";
import DateFilter from "@/components/dateFilter";
import moment from "moment";

export default {
  components: { Icons, VComponent, DateFilter },
  props: {
    hideDefaultFooter: {
      type: Boolean,
      default: true,
    },
    maxRows: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      apiURL: process.env.VUE_APP_API + "/",
      propertyDetails: {},
    };
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    this.getPropertDetail()
  },
  methods: {

    getPropertDetail() {
      getPropertDetailApi(this.$route.params.id).then((res) => {
        this.propertyDetails = res.data;
        // this.propertyDetails.main_img = this.apiURL + this.propertyDetails.main_img
        // const imgData = _arrayBufferToBase64(image)
        this.propertyDetails.signature_inspector = this._arrayBufferToBase64(this.propertyDetails.signature_inspector.data)
        this.propertyDetails.signature_tenant = this._arrayBufferToBase64(this.propertyDetails.signature_tenant.data)
        console.log('this.propertyDetails.signature_inspector', this.propertyDetails.signature_inspector);
      });
    },

    _arrayBufferToBase64(buffer) {
      var binary = '';
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return binary;
    },


    getReadableDate(date) {
      const d = new Date(date).toUTCString();
      return date.substr(0, 7);
    },


    getBookingReadableDate(date) {
      const d = new Date(date)
      return d.toLocaleString()
      // }
      //   return `${d.toString().substring(4, 10)}, ${d
      //     .toString()
      //     .substring(11, 15)}`
    },

  },
};
</script>
<style>
.line-container {
  padding-left: 6rem !important;
}

.line-container .item-tag {
  width: 200px;
}
</style>
tryrty
