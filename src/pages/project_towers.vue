<script setup>
import {ref, onMounted} from "vue";
import {useRouter,useRoute} from "vue-router"
const towers = ref([])

const router = useRouter();
const current_route = useRoute()
const id_project = current_route.params.id_project

const towers_test = ref([
  {id_tower:1,tower_number:1, id_project:id_project},
  {id_tower:2,tower_number:2, id_project:id_project},
  {id_tower:3,tower_number:3, id_project:id_project},
  {id_tower:4,tower_number:4, id_project:id_project},
  {id_tower:5,tower_number:5, id_project:id_project},

])

const get_towers_by_project = async (id_project) => {
  const res = await fetch(`http://localhost:2828/towers/${id_project}`)
  if(res.ok){
    towers.value = await res.json()
    console.log(towers.value)
  }else{
    console.log("Error", res.error)
  }
}

const add_tower = () => {
  towers.value.push({tower_name: 'TORRE AÑADIDA'});
}

const go_tower_info = (id_tower) => {
  router.push(`/project_towers/tower_info/${id_tower}`)
}

onMounted(() => {
  console.log(towers_test.value)
  console.log(id_project)
})
</script>

<template>
  <v-container>
    <v-card class="overflow-y-auto py-2" height="595px" style="background-color:transparent">
      <v-row>
        <v-col v-for="tower in towers_test" cols="4" class="d-flex flex-column">
          <v-card class="align-self-center" width="100px" height="100px" style="background-color:#9B16F3" >
            <div class="d-flex justify-center" style="height:100%" @click="go_tower_info(tower.id_tower)">
              <v-icon :size="65" class="align-self-center">mdi-office-building</v-icon>
            </div>
          </v-card>
          <span style="color:#9B16F3">Torre {{tower.tower_number}}</span>
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