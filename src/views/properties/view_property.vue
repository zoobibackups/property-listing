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
          <template v-slot:heading class="d-flex justify-center align-center">
           <div class="d-flex justify-center align-center">
             <div class="text-h3 font-weight-light">INSPECTION </div>
          </div>
          </template>
          <template>
           

              <v-row class="d-flex justify-center align-center" style="margin-top: 25px">
               <h3>{{propertyDetails?.property_address}} </h3>
                <v-col md="12" class="d-flex justify-center align-center">
                 
                   
                 <v-img :src="apiURL + propertyDetails.main_img" height="300" width="300"
                      lazy-:src="apiURL + propertyDetails.main_img" contain ></v-img>
                
                </v-col>

                <v-col cols="12" class="d-flex justify-center align-center">
                 
                 <table class="styled-table">
                      <tbody>
                          <tr>
                              <td>Inspected By</td>
                              <td>{{propertyDetails?.inspector_name}}</td>
                          </tr>
                          <tr>
                              <td>Tenant’s Name</td>
                              <td>{{propertyDetails?.tenant_name}}</td>
                          </tr>
                          <tr>
                              <td>Date of Inspection</td>
                              <td>{{new Date(propertyDetails?.inspection_date).toLocaleString()}}</td>
                          </tr>
                          <tr>
                              <td>EPC Expiry Date</td>
                              <td>{{new Date(propertyDetails?.ecp_exp_date).toLocaleString()}}</td>
                          </tr>
                          <tr>
                              <td>Gas Safety Certificate Expiry Date</td>
                              <td>{{new Date(propertyDetails?.gas_safety_certificate_exp_date).toLocaleString()}}</td>
                          </tr>
                          <tr>
                              <td>EICR Expiry Date</td>
                              <td>{{new Date(propertyDetails?.ecir_exp_date).toLocaleString()}}</td>
                          </tr>
                         
                      </tbody>
                  </table>
                 
                </v-col>
              </v-row>

               <v-row>
               
                <v-col md="12">
                  <h2 style="color:blue; margin-left:20px">Summary</h2>
                  <div style="margin:20px;border: 1px solid #dddddd;height:50px;">
                    <p style="margin-left:10px;margin-top:15px">{{propertyDetails?.final_remarks}}</p>
                  </div>
                 
                </v-col>

               
              </v-row>
               <v-row>
               
                <v-col md="12">
                  <h2 style="color:blue; margin-left:20px">Important Information</h2>
                  <div style="margin:20px;border: 1px solid #dddddd;">
                    <h3 style="margin-left:15px;margin-top:8px">What is an Inventory Check-In Report?</h3>
                    <p style="margin-left:15px;margin-top:8px">The Inventory Check-In Report provides a fair, objective and impartial record of the general condition of the contents of the Property as well as its internal condition at the outset of the
lease of the Property.</p>
                    <h3 style="margin-left:15px;margin-top:8px">What are the benefits of using this Report?</h3>
                    <p style="margin-left:15px;margin-top:8px">The importance of a professional inventory and statement of condition cannot be underestimated. Government advice indicates that Inventories and statements of condition are 'strongly
recommended' as a means to reduce dispute about the deposit at the end of a tenancy. It is in the Tenant's interests to carefully check this Inventory Check-In Report and to highlight any
discrepancies as soon as possible and in any event no later than five working days after this Inventory Check-In Report is completed. Any outstanding discrepancies found at the end of the
tenancy will be highlighted in an Inventory Outgoing Report and may affect the retention or release of a tenancy deposit.</p>
                    <h3 style="margin-left:15px;margin-top:8px">Is the report aimed at the landlord or the tenant?</h3>
                    <p style="margin-left:15px;margin-top:8px">The Inventory Check-In Report is objective and contains photographic evidence, it may be relied upon and used by the Landlord, the Tenant and Letting Agent.</p>
                    <h3 style="margin-left:15px;margin-top:8px">What does this Report tell you?</h3>
                    <p style="margin-left:15px;margin-top:8px">The Inventory Check-In Report provides a clear and easy to follow statement of condition for each of the main elements of the property on a room by room basis, together with its contents
if appropriate. This report comments on and highlights defects or aspects of poor condition that have been identified by the Inventory Clerk. Defects in condition will either be described in
the narrative of the report or evidenced in the photographs included in the report. Please Note: where no comment on the condition of an element or item of contents is made by the
Inventory Clerk, the element or item is taken to be in good condition and without defect.</p>
                    <h3 style="margin-left:15px;margin-top:8px">What does the report not tell you?</h3>
                    <p style="margin-left:15px;margin-top:8px">Whilst every effort is made to ensure objectivity and accuracy, the Inventory Check-In Report provides no guarantee of the adequacy, compliance with standards or safety of any contents or
equipment. The report will provide a record that such items exist in the property as at the date of the Inventory Check-In Report and the superficial condition of same. The report is not a
building survey, a structural survey or a valuation, will not necessarily mention structural defects and does not give any advice on the cost of any repair work, or the types of repair which
should be used.</p>
                    <h3 style="margin-left:15px;margin-top:8px">What is inspected and not inspected?</h3>
                    <p style="margin-left:15px;margin-top:8px">The Inventory Clerk carries out a visual inspection of the inside of the main building together with any contents and will carry out a general inspection of the remainder of the building
including the exterior cosmetic elements and any permanent outbuildings. For properties let on an unfurnished basis, the inspection will include floor coverings, curtains, curtain tracks,
blinds and kitchen appliances if appropriate, but will exclude other contents. Gardens and their contents will be inspected and reported upon. The inspection is non-invasive. The means
that the Inventory Clerk does not take up carpets, floor coverings or floor boards, move large items of furniture, test services, remove secured panels or undo electrical fittings. Especially
valuable contents such as antiques, personal items or items of jewellery are excluded from the report. Kitchenware will be inspected but individual items will not be condition rated.
Common parts in relation to flats, exterior structural elements of the main building and the structure of any outbuildings will not be inspected. Roof spaces and cellars are not inspected.
Areas which are locked or where full access is not possible, for example, attics or excessively full cupboards or outbuildings are not inspected.</p>
                    <h3 style="margin-left:15px;margin-top:8px">What is a Mid-Term Inspection Report?</h3>
                    <p style="margin-left:15px;margin-top:8px">The Mid-Term Inspection Report provides a fair, objective and impartial record of the general condition of the contents of the Property as well as its internal condition during the lease of
the Property. Any defects and maintenance issues noted during the inspection are highlighted in the report. The tenants are required to rectify the issues which come under their
obligations as per the terms & conditions of the tenancy agreement. Similarly, the landlord of the property will be asked to deal with the maintenance issues accordingly.</p>
                    <h3 style="margin-left:15px;margin-top:8px">What is a Check-Out Report?</h3>
                    <p style="margin-left:15px;margin-top:8px">The Check-Out Report provides a fair, objective and impartial record of the general condition of the contents of the Property as well as its internal condition at the end of the lease of the
Property. Normally, the return of the tenancy deposit is based on the outcome of the Check-Out report.</p>
                   
                  </div>
                 
                </v-col>

               
              </v-row>
               <v-row>
               
                <v-col md="12">
                  <h2 style="color:blue; margin-left:20px">Metres and Alarms</h2>
                  <div style="display:flex; justify-content:space-between;">
                    <div style="margin:20px;border: 1px solid #dddddd;width:500px;">
                      <div style="display:flex; justify-content:space-between;">
                        <h5 style="margin-left:10px;margin-top:5px;padding:10px">Pre-Paid Gas Meter:{{propertyDetails?.gas_meter}}</h5>
                        <h5 style="margin-left:10px;margin-top:5px;padding:10px">Reading:{{propertyDetails?.gas_meter_reading}}</h5>
                      </div>
                       <hr style="color:blue;margin:2px">
                       <v-img :src="apiURL + propertyDetails.gas_meter_img" cover ></v-img>
                    </div>
                    <div style="margin:20px;border: 1px solid #dddddd;width:500px;">
                      <div style="display:flex; justify-content:space-between;">
                        <h5 style="margin-left:10px;margin-top:5px;padding:10px">Pre-Paid Electricity Meter:{{propertyDetails?.electricity_meter}}</h5>
                        <h5 style="margin-left:10px;margin-top:5px;padding:10px">Reading:{{propertyDetails?.electricity_meter_reading}}</h5>
                      </div>
                      <hr style="color:blue;margin:2px">
                      <v-img :src="apiURL + propertyDetails.electricity_meter_img" cover ></v-img>
                    </div>
                    
                  </div>

                  
                 
                </v-col>

               
              </v-row>

               <v-row>
               
                <v-col md="12">
                 
                  <div style="display:flex; justify-content:space-between;">
                    <div style="margin:20px;border: 1px solid #dddddd;width:500px;">
                      <div style="display:flex; justify-content:space-between;">
                        <h5 style="margin-left:10px;margin-top:5px;padding:10px">Heating System:{{propertyDetails?.heating_system}}</h5>
                        
                      </div>
                       <hr style="color:blue;margin:2px">
                       <v-img :src="apiURL + propertyDetails.heating_system_img" cover ></v-img>
                    </div>
                    <div style="margin:20px;border: 1px solid #dddddd;width:500px;">
                      <div style="display:flex; justify-content:space-between;">
                        <h5 style="margin-left:10px;margin-top:5px;padding:10px">Water Meter:{{propertyDetails?.water_meter}}</h5>
                        <h5 style="margin-left:10px;margin-top:5px;padding:10px">Reading:{{propertyDetails?.water_meter_reading}}</h5>
                      </div>
                      <hr style="color:blue;margin:2px">
                      <v-img :src="apiURL + propertyDetails.water_meter_img" cover ></v-img>
                    </div>
                    
                   </div>
                 
                </v-col>

               
              </v-row>

               <v-row>
               
                <v-col md="12">
                  
                  <div style="display:flex; justify-content:space-between;">
                    <div style="margin:20px;border: 1px solid #dddddd;width:500px;">
                      <div style="display:flex; justify-content:space-between;">
                        <h5 style="margin-left:10px;margin-top:5px;padding:10px">Smoke Alarm:{{propertyDetails?.smoke_alarm}}</h5>
                        
                      </div>
                       <hr style="color:blue;margin:2px">
                       <div style="display:flex; justify-content:space-between;">
                        <v-img :src="apiURL + propertyDetails.smoke_alarm_front_img" cover height="120" width="100" style="margin:2px"></v-img>
                        <v-img :src="apiURL + propertyDetails.smoke_alarm_back_img" cover height="120" width="100" style="margin:2px"></v-img>
                       </div>
                      
                    </div>
                    <div style="margin:20px;border: 1px solid #dddddd;width:500px;">
                      <div style="display:flex; justify-content:space-between;">
                        <h5 style="margin-left:10px;margin-top:5px;padding:10px">CO Alarm:{{propertyDetails?.co_alarm}}</h5>
                        
                      </div>
                      <hr style="color:blue;margin:2px">
                      <div style="display:flex; justify-content:space-between;">
                       <v-img :src="apiURL + propertyDetails.co_alarm_front_img" cover height="120" width="100" style="margin:2px"></v-img>
                      <v-img :src="apiURL + propertyDetails.co_alarm_back_img" cover height="120" width="100" style="margin:2px"></v-img>
                      </div>
                     
                    </div>
                    
                  </div>
                 
                </v-col>

               
              </v-row>

              <v-row>
               
                <v-col md="12"  v-for="(parts, index) in propertyDetails.property_details" :key="index">
                  
                  <div>
                    <div >
                      <h4 style="color:blue; margin-left:20px">{{parts?.name}}</h4>  
                    </div>
                    <table class="styled-table-2" style="margin-left:20px">
                    <thead>
                        <tr>
                          <th>
                            Description
                          </th>
                          <th>
                            Details
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>Floor</td>
                              <td>{{parts?.floor}}</td>
                          </tr>
                          <tr>
                              <td>Walls</td>
                              <td>{{parts?.walls}}</td>
                          </tr>
                          <tr>
                              <td>Ceiling</td>
                              <td>{{parts?.ceiling}}</td>
                          </tr>
                          <tr>
                              <td>Windows</td>
                              <td>{{parts?.windows}}</td>
                          </tr>
                          <tr>
                              <td>Doors</td>
                              <td>{{parts?.doors}}</td>
                          </tr>
                          <tr>
                              <td>Description</td>
                              <td>{{parts?.description }}</td>
                          </tr>
                         
                      </tbody>
                  </table>
                  <div style="display:flex;flex-wrap: wrap;justify-content: flex-start;margin-left:20px">
                      <v-img v-for="(item, i) in parts.property_images" :key="i" :src="apiURL + item.url" cover height="200" width="200" style="flex: 0 0 192px; margin:2px"></v-img>
                  </div>
                    
                   </div>
                 
                </v-col>

               
              </v-row>

              <v-row>
               
                <v-col md="12">
                  
                  <div>
                    <div >
                      <h4 style="color:blue; margin-left:20px">Advise For Tenant:</h4>  
                      <p style="border-bottom: 3px solid #dddddd;margin-left:20px">{{propertyDetails?.advised_tenant_to}}</p>  

                    </div>
                     <div >
                      <h4 style="color:blue; margin-left:20px">Advise For Landlord:</h4>  
                      <p style="border-bottom: 3px solid #dddddd;margin-left:20px">{{propertyDetails?.asked_landlord_to}}</p>  

                    </div>

                    
                    
                   </div>
                 
                </v-col>

               
              </v-row>


               <v-row class="d-flex justify-center align-center" style="margin-top: 25px">
               <h4 style="color:blue;">Declaration</h4>  
                <v-col md="12" class="d-flex justify-center align-center">
                 
                   
                 <p>This inventory provides a record of the contents of the property and the property’s internal condition. The person preparing the inventory is not an expert in fabrics, wood, materials,
antiques etc nor a qualified surveyor. The inventory should not be used as an accurate description of each piece of furniture and equipment. Any areas of dilapidation or defect at the
commencement of the tenancy need to be reported to the landlord/agency within 7 days of the commencement of tenancy. All items and areas listed in the property are in good,
clean, serviceable condition unless otherwise stated.</p>  
                
                </v-col>

               
              </v-row>

               <v-row>
               
                <v-col md="12">
                  
                  <div style="display:flex; justify-content:space-between;">
                    <div style="margin:20px;border: 1px solid #dddddd;width:500px;">
                      <div style="display:flex; justify-content:center;">
                       <h2 style=" margin-left:20px">Tenant’S Signature</h2>
                      </div>
                      <div style="display:flex; justify-content:center;">
                       <v-img :src="propertyDetails?.signature_tenant" cover height="200" width="200" style="margin: 20px"></v-img>
                      </div>
                       
                       
                    </div>
                    <div style="margin:20px;border: 1px solid #dddddd;width:500px;">
                      <div style="display:flex; justify-content:center;">
                        <h2 style=" margin-left:20px">Inspector’s Signature</h2>
                      </div>
                      <div style="display:flex; justify-content:center;">
                        <v-img :src="propertyDetails?.signature_inspector" cover height="200" width="200" style="margin: 20px"></v-img>
                      </div>
                      
                    </div>
                    
                  </div>

                  
                 
                </v-col>

               
              </v-row>
              

            
          </template>

        </base-material-card>
      </v-col>
    </v-row>

   
  </v-container>

</template>
<script>
import {getPropertDetailApi,} from "@/services/admin";
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
