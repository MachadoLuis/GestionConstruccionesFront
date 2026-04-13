<script setup>

</script>

<template>
  <v-container fluid>
    <v-app-bar :elevation="2" style="background-color:#9B16F3">
      <v-app-bar-title style="flex: 0 1 auto; min-width: min-content;">GraniteResonance</v-app-bar-title>
      <v-spacer></v-spacer>
      <template v-slot:append>
        <v-btn>
          Cuenta Empresa
          <v-icon>mdi-briefcase-account</v-icon>
        </v-btn>
        <v-btn>
          Proyectos
          <v-icon>mdi-home-city</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <v-row class="justify">
      <v-col cols="12">
        <h1 style="font-size:2em; color:#9B16F3">Introduccion a Sistema GraniteResonance</h1>
      </v-col>
      <v-col cols="12">
        <p style="color:#633AF8">El uso de este Sistema de Gestion en Manejo de construcciones...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>