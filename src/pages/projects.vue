<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const projects = ref([
  {project_name: 'PROYECTO1'},
  {project_name: 'PROYECTO2'},
  {project_name: 'PROYECTO3'},
  {project_name: 'PROYECTO4'},
  {project_name: 'PROYECTO5'},
  {project_name: 'PROYECTO6'}
]);

const add_project = () => {
  projects.value.push({project_name: 'PROYECTO7'});
}

const go_to_project = (project_name) => {
  router.push(`/towers/${project_name}`)
}

const get_projects = () => {}

onMounted(() => {
})

</script>

<template>
  <v-container>
    <v-card class="overflow-y-auto py-2" height="595px" style="background-color:transparent">
      <v-row>
        <v-col v-for="project in projects" cols="4" class="d-flex flex-column">
          <v-card class="align-self-center" width="100px" height="100px" style="background-color:#9B16F3" >
            <div class="d-flex justify-center" style="height:100%" @click="go_to_project(project.project_name)">
              <v-icon :size="65" class="align-self-center">mdi-office-building</v-icon>
            </div>
          </v-card>
          <span style="color:#9B16F3">{{ project.project_name }}</span>
        </v-col>
        <v-col cols="4" class="d-flex flex-column">
          <v-card @click="add_project()" class="align-self-center" width="100px" height="100px" style="background-color:#A188FB">
            <div class="d-flex justify-center" style="height:100%">
              <v-icon :size="65" class="align-self-center">mdi-office-building</v-icon>
            </div>
          </v-card>
          <span style="color:#A188FB">Añadir Proyecto</span>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>