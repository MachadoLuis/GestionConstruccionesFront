<script setup>
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router"

const towers = ref([])
const router = useRoute()
const id_project = router.params.test


const get_towers_by_project = (project_name) => {
  if(project_name === 'PROYECTO1'){
    towers.value = [
      {tower_name: 'TORRE1'},
      {tower_name: 'TORRE2'},
      {tower_name: 'TORRE3'},
      {tower_name: 'TORRE4'},
      {tower_name: 'TORRE5'}
    ]
  }else{
    towers.value = [
      {tower_name: 'TORRE2'},
      {tower_name: 'TORRE2'},
      {tower_name: 'TORRE2'},
      {tower_name: 'TORRE2'},
      {tower_name: 'TORRE2'}
    ]
  }
}

const add_tower = () => {
  towers.value.push({tower_name: 'TORRE AÑADIDA'});
}

onMounted(() => {
  get_towers_by_project(id_project)
})
</script>

<template>
  <v-container>
    <v-card class="overflow-y-auto py-2" height="595px" style="background-color:transparent">
      <v-row>
        <v-col v-for="tower in towers" cols="4" class="d-flex flex-column">
          <v-card class="align-self-center" width="100px" height="100px" style="background-color:#9B16F3" >
            <div class="d-flex justify-center" style="height:100%">
              <v-icon :size="65" class="align-self-center">mdi-office-building</v-icon>
            </div>
          </v-card>
          <span style="color:#9B16F3">{{ tower.tower_name }}</span>
        </v-col>
        <v-col cols="4" class="d-flex flex-column">
          <v-card @click="add_tower()" class="align-self-center" width="100px" height="100px" style="background-color:#A188FB">
            <div class="d-flex justify-center" style="height:100%">
              <v-icon :size="65" class="align-self-center">mdi-office-building</v-icon>
            </div>
          </v-card>
          <span style="color:#A188FB">Añadir Torre</span>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>