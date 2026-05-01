<script setup>
import {useRouter} from "vue-router";
const router = useRouter();
const go_to_projects = () => {
  router.push("/projects");
}
</script>

<template>
  <v-container fluid class="pa-8">
    <v-app-bar :elevation="2" style="background-color:#9B16F3" color="white">
      <v-app-bar-title class="font-weight-bold" style="color:#F5F5F5">GraniteResonance</v-app-bar-title>
      <v-spacer></v-spacer>
      <template v-slot:append>
        <v-btn variant="text" style="color:#F5F5F5">
          Cuenta Empresa
          <v-icon end>mdi-briefcase-account</v-icon>
        </v-btn>
        <v-btn variant="text" style="color:#F5F5F5" @Click="go_to_projects">
          Proyectos
          <v-icon end>mdi-home-city</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-row class="mt-12 justify-center">
      <v-col cols="12" md="10" lg="8" class="text-center">
        <h1 class="text-h3 font-weight-black mb-4" style="color:#9B16F3">
          Gestión de Construcción Inteligente
        </h1>
        <p class="text-h6 mb-8" style="color:#633AF8">
          GraniteResonance es la solución integral para el control de etapas,
          seguimiento de torres y optimización de recursos en proyectos inmobiliarios de gran escala.
        </p>
        <v-divider class="mb-8" :thickness="2" color="#9B16F3"></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-card class="mx-auto pa-4" elevation="4" border="t-xl" style="border-color: #9B16F3 !important ; background-color:#A188FB">
          <v-list-item profile>
            <template v-slot:prepend>
              <v-avatar color="#9B16F3">
                <v-icon color="white">mdi-domain</v-icon>
              </v-avatar>
            </template>
            <v-list-item-title class="text-h6 font-weight-bold">Control de Torres</v-list-item-title>
          </v-list-item>
          <v-card-text style="color:#F5F5F5">
            Visualiza el progreso individual de cada torre. Gestiona múltiples proyectos de forma independiente con persistencia de datos local.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="mx-auto pa-4" elevation="4" border="t-xl" style="border-color: #9B16F3 !important ; background-color:#A188FB">
          <v-list-item profile>
            <template v-slot:prepend>
              <v-avatar color="#9B16F3">
                <v-icon color="white">mdi-list-status</v-icon>
              </v-avatar>
            </template>
            <v-list-item-title class="text-h6 font-weight-bold">Etapas de Obra</v-list-item-title>
          </v-list-item>
          <v-card-text style="color:#F5F5F5">
            Divide tus proyectos en etapas críticas. Registra tareas, estados de avance y descripciones detalladas por cada nivel de construcción.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="mx-auto pa-4" elevation="4" border="t-xl" style="border-color: #9B16F3 !important ; background-color:#A188FB">
          <v-list-item profile>
            <template v-slot:prepend>
              <v-avatar color="#9B16F3">
                <v-icon color="white">mdi-account-group</v-icon>
              </v-avatar>
            </template>
            <v-list-item-title class="text-h6 font-weight-bold">Personal Asignado</v-list-item-title>
          </v-list-item>
          <v-card-text style="color:#F5F5F5">
            Administra los trabajadores y roles en cada sección del proyecto, asegurando que cada tarea tenga el equipo adecuado para su ejecución.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>