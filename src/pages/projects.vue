<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const projects_test = ref([]);

const saveToLocal = () => {
  localStorage.setItem('projects_data', JSON.stringify(projects_test.value));
};

const add_project = () => {
  let maxNumber = 0;

  projects_test.value.forEach(p => {
    const match = p.project_name.match(/\d+/);
    if (match) {
      const num = parseInt(match[0]);
      if (num > maxNumber) maxNumber = num;
    }
  });
  const nextNumber = maxNumber + 1;
  const newProject = {
    project_name: `PROYECTO ${nextNumber}`,
    id_project: Date.now()
  };

  projects_test.value.push(newProject);
  saveToLocal();
};

const go_project_towers = (id_project) => {
  router.push(`/project_towers/${id_project}`);
};

onMounted(() => {
  const savedProjects = localStorage.getItem('projects_data');
  if (savedProjects) {
    projects_test.value = JSON.parse(savedProjects);
  } else {
    projects_test.value = [
      { project_name: "PROYECTO 1", id_project: 1 }
    ];
    saveToLocal();
  }
});
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