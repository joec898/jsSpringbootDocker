<template>
    <v-row class="addrow">
        <!-- Error Snackbar -->
        <v-snackbar v-model="UeSnackbar" color="error" top :timeout="4000">
            <span>Error! Email Taken. Try other Email.</span>
            <v-btn text  color="white" @click="UeSnackbar=false" class="ml-4"><v-icon>mdi-window-close</v-icon></v-btn>
        </v-snackbar>

        <!-- success Snackbar -->
        <v-snackbar v-model="UsSnackbar" color="success" top :timeout="4000">
            <span>Awesome! You Update a employee. </span>
            <v-btn text  color="white" @click="UsSnackbar=false" class="ml-4"><v-icon>mdi-window-close</v-icon></v-btn>
        </v-snackbar>

        <v-dialog
            v-model="dialog"
            max-width="600px"
        >
            <!-- Edite Button -->
            <template v-slot:activator="{ on, attrs}">
                <v-btn color="blue"
                text small
                v-bind="attrs"
                v-on="on"
                class="mx-7"
                @click="open(name, jobTitle, email, phone, imageUrl, id)"
                >
                    <v-icon>mdi-account-edit</v-icon>
                </v-btn>
            </template>

            <!-- Card -->
            <v-card>
                <v-card-title primary-title>
                    <span class="headline">Edite Employee</span>
                </v-card-title>

                <v-card-text>
                    <!-- Form -->
                    <v-form class="px-3" ref="form">
                        <v-text-field
                            name="name"
                            label="Name"
                            :rules="inputRules"
                            v-model="name"
                        ></v-text-field>

                        <v-text-field
                            name="jobTitle"
                            label="Title"
                            :rules="inputRules"
                            v-model="jobTitle"
                        ></v-text-field>

                        <v-text-field
                            name="email"
                            label="Email"
                            :rules="inputRules"
                            v-model="email"
                        ></v-text-field>

                        <v-text-field
                            name="phone"
                            label="Phone"
                            :rules="inputRules"
                            v-model="phone"
                        ></v-text-field>

                        <v-text-field
                            name="imageUrl"
                            label="Image Url"
                            v-model="imageUrl"
                        ></v-text-field>

                        <!-- Save Button -->
                        <v-btn dark class="blue mx-0 mt-3"
                        @click="putData()"
                        :loading="loading" >Edite employee</v-btn>
                        <!-- Close Button -->
                        <v-btn text color="grey" @click="dialog=false" class="mt-3">Close</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import axios from 'axios'
import config from '../config.js'

export default {
    name: "EditePopup",
    props: [
        "name",
        "jobTitle",
        "email",
        "phone",
        "imageUrl",
        "id"
    ],
    data() {
        return {
            dialog: null,
            Name: '',
            JobTitle: '',
            Email: '',
            Phone: '',
            ImageUrl: '',
            Id: '',
            inputRules: [
                v => !!v || 'That is required',
                v => v.length >= 3 || 'Minimum length is 3 characters',
            ],
            loading: false,
            UeSnackbar: false,
            UsSnackbar : false,
        }
    },
    methods: {
        open(name, jobTitle, email,phone, imageUrl, id){
            // Declaration
            this.Name = name;
            this.JobTitle = jobTitle;
            this.Email = email;
            this.Phone = phone;
            this.ImageUrl = imageUrl;
            this.Id = Number(id);
        },
        putData(){
            this.data = {
                    name : this.name,
                    jobTitle : this.jobTitle,
                    email : this.email,
                    phone: this.phone,
                    imageUrl: this.imageUrl,
                    id: this.id
                }
            // Put
            if(this.$refs.form.validate()){
                this.loading = true;

                //axios.put(`${config.apiBaseUrl}/update/${this.id}?name=${this.Name}&jobTitle=${this.JobTitle}&email=${this.Email}&phone=${this.Phone}&imageUrl=${this.ImageUrl}`).then(() => {

                axios.put(`${config.apiBaseUrl}/update`, this.data).then(() => {
                    // Close
                    this.loading = false;
                    this.dialog = false;

                    // Event

                    this.$emit('employeeUpdate')
                    this.UsSnackbar = true;
                }).catch(() => {
                    this.loading = false;
                    this.UeSnackbar = true;
                    //this.email = "";
                })
            }
        },
    },
}
</script>