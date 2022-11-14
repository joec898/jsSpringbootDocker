<template>
  <v-row  class="deletrow">

    <v-btn color="blue" text small   @click.stop="dialog = true">
        <v-icon>mdi-delete</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="460"
      class="py-7"
    >
      <v-card>
        <v-card-title class="text-h6 py-7">
          Are you shore for delet this Employee ?
        </v-card-title>


        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red"
            text
            @click="deletData(id)"
            :loading="loading"
          >
            Delet
          </v-btn>

          <v-btn
            color="grey"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from 'axios'
import config from '../config.js'

  export default {
    name: "DeletPopup",
    data () {
      return {
        dialog: false,
        loading: false
      }
    },
    props: [
        "id",
    ],
    methods: {
        deletData(id){
            this.loading = true;
            // Delete
            axios.delete(`${config.apiBaseUrl}/delete/${id}`).then(() => {

                // Send Request
                this.$emit('deletEmployee')
                // close
                this.dialog = false;
                this.loading = false;
            });
        }
    },
  }
</script>