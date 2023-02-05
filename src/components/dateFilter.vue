<template>
  <!-- <v-col
    cols="12"
    sm="6"
    md="4"
  > -->
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateRangeText"
        label="Filter by Date"
        prepend-inner-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        solo
        class="mr-2"
        clearable
        v-on="on"
      />
    </template>
    <v-date-picker v-model="date" scrollable range>
      <v-spacer />
      <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(date)"> OK </v-btn>
    </v-date-picker>
  </v-dialog>
  <!-- </v-col> -->
</template>
<script>
import moment from 'moment'
export default {
  name: "DateFilter",
  props: {
    initDate: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      modal: false,
      date: this.initDate ? this.initDate : [],
      text: [],
    };
  },
  computed: {
    dateRangeText() {
      console.log("====================================");
      console.log(this.date);
      console.log("====================================");

      // this.text[0]= new Date(moment(this.text[0]).format('YYYY/MM/DD'))
      // this.text[1]= new Date(moment(this.text[1]).format('YYYY/MM/DD'))
      this.text[0]= moment(this.date[0]).format('YYYY/MM/DD')
      this.text[1]= moment(this.date[1]).format('YYYY/MM/DD')

      console.log("=========text===========================");
      console.log(this.text[0], this.text[1]);
      console.log("====================================");

      return this.text.join(" ~ ");
    },
  },
  watch: {
    date(newValue) {
      this.$emit("dateChange", newValue);
    },
  },
};
</script>
