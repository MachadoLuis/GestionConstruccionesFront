<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const projects = ref([])
const projects_test = ref([
  {project_name:"PROYECTO1", id_project:1},
  {project_name:"PROYECTO2", id_project:2},
  {project_name:"PROYECTO3", id_project:3},
  {project_name:"PROYECTO4", id_project:4},
  {project_name:"PROYECTO5", id_project:5},
])

const add_project = () => {
  projects_test.value.push({project_name: 'PROYECTO7'});
}

const go_project_towers = (id_project) => {
  router.push(`/project_towers/${id_project}`)
}

const get_projects = async () => {
  const res = await fetch("http://localhost:2828/projects")
  if(res.ok){
    projects_test.value = await res.json()
    console.log(projects_test.value)
  }else{
    console.log("Error", res.error)
  }

}

onMounted(() => {
})

</script>

<template>
  <v-container>
    <v-card class="overflow-y-auto py-2" height="595px" style="background-color:transparent">
      <v-row>
        <v-col v-for="project in projects_test" cols="4" class="d-flex flex-column">
          <v-card class="align-self-center" width="100px" height="100px" style="background-color:#9B16F3" >
            <div class="d-flex justify-center" style="height:100%" @click="go_project_towers(project.id_project)">
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