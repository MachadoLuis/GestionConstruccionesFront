<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const current_route = useRoute();
const id_project = current_route.params.id_project;

const storageKey = `towers_project_${id_project}`;
const towers_test = ref([]);

const saveToLocal = () => {
  localStorage.setItem(storageKey, JSON.stringify(towers_test.value));
};

const add_tower = () => {

  let maxNumber = 0;
  towers_test.value.forEach(t => {
    if (t.tower_number > maxNumber) maxNumber = t.tower_number;
  });

  const nextNumber = maxNumber + 1;

  const new_tower = {
    id_tower: Date.now(),
    tower_number: nextNumber,
    id_project: id_project
  };

  towers_test.value.push(new_tower);
  saveToLocal();
};

const go_tower_info = (id_tower) => {
  router.push(`/tower_info/${id_tower}`);
};
onMounted(() => {
  const savedTowers = localStorage.getItem(storageKey);
  if (savedTowers) {
    towers_test.value = JSON.parse(savedTowers);
  } else {
    towers_test.value = [
      { id_tower: 1, tower_number: 1, id_project: id_project },
      { id_tower: 2, tower_number: 2, id_project: id_project },
    ];
    saveToLocal();
  }
});
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