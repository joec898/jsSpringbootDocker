<template>
    <div class="table">

        <!-- Snackbar -->
        <v-snackbar v-model="snackbar" color="success" top :timeout="4000">
            <span>Awesome! You added a new employee.</span>
            <v-btn text color="white" @click="snackbar=false" class="ml-4"><v-icon>mdi-window-close</v-icon></v-btn>
        </v-snackbar>
        <v-container grid-list-xs class="my-10">
            <v-layout row wrap class="mybtns">
                <!-- Add new Employee -->
                <Popup @employeeAdded="afterAdded()" />

                <!-- Refresh -->
                <v-btn
                color="blue"
                elevation="0" e small text class="mb-7 mx-3"
                @click="getData()" >
                    <v-icon small left>mdi-refresh</v-icon>
                    <span class="caption text-lowercase">Refresh</span>
                </v-btn>
            </v-layout>
            <!-- Card if no have any employee -->
            <v-card v-if="showEm" >
                <v-card-text>
                    No have any employee...
                </v-card-text>
            </v-card>
            <!-- container card  -->
            <v-card  v-for="Employee in Employees" :key="Employee.id" :class="`pa-1 project ${Employee.color}` ">
                <v-layout row wrap class="pa-2 ">
                    <v-flex xs10 md2>
                        <div class="caption grey--text">Name</div>
                        <div>{{Employee.name }}</div>
                    </v-flex>

                    <v-flex xs8 md2>
                        <div class="caption grey--text">Title</div>
                        <div>{{Employee.jobTitle}}</div>
                    </v-flex>

                    <v-flex xs12 md2>
                        <div class="caption grey--text">Email</div>
                        <div>{{Employee.email}}</div>
                    </v-flex>

                    <v-flex xs10 md2>
                        <div class="caption grey--text">Phone</div>
                        <div>{{Employee.phone}}</div>
                    </v-flex>

                    <v-flex xs12 md2>
                        <div class="caption grey--text">Image Url</div>
                        <div>{{Employee.imageUrl}}</div>
                    </v-flex>

                    <v-flex xs10 md2 left>
                        <div class="caption grey--text">.</div>
                        <div right>
                            <!-- Edite Button -->
                            <EditePopup
                            :name="Employee.name"
                            :jobTitle="Employee.jobTitle"
                            :email="Employee.email"
                            :phone="Employee.phone"
                            :imageUrl="Employee.imageUrl"
                            :id="Employee.id"
                            @employeeUpdate="getData()"
                            />
                            <!-- Delet Button -->
                            <DeletPopup :id="Employee.id" @deletEmployee="getData()" />
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>

        </v-container>
    </div>
</template>

<script>
import Popup from '@/components/Popup'
import DeletPopup from '@/components/DeletPopup'
import EditePopup from '@/components/EditePopup'
import axios from 'axios'
import config from '../config.js'



    export default {
        name: "Table",
        components: {
            Popup,
            DeletPopup,
            EditePopup,
        },
        data() {
            return {
                colors : ['_teal', '_orange', '_tomato'],
                num : 0,
                snackbar : false,
                Employees: null,
                numEmployee: 0,
                showEm: false

            }
        },
        methods: {
            choseColer(){
                this.num = Math.floor(Math.random() * 3);
            },
            getData(){
                axios.get(`${config.apiBaseUrl}/all`).then(response => {
                   this.Employees = response.data
                    this.Employees.forEach(element => {
                        element.color = this.colors[this.num]
                        this.choseColer()
                        this.numEmployee++
                    })
                    if (this.numEmployee < 1){
                        this.showEm = true
                    }else{this.showEm = false}
                })

            },
            afterAdded(){
                this.snackbar = true;
                this.getData()
            },
        },
        mounted() {
            this.choseColer(),
            this.getData()

        }
    }
</script>

<style lang="scss" scoped>

</style>