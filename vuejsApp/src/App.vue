<template>
  <v-app>
    <Navbar/>
    <v-main color="grey lighten-2">
      <v-container grid-list-xs class="mt-1">
        <Table/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Table from '@/components/Table'

export default {
  name: 'App',

  components: {
    Navbar,
    Table,
  },

  data: () => ({
    //
  }),
};
</script>
