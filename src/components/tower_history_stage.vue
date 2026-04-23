<script setup>
import {onMounted, ref} from 'vue'

const props = defineProps({
  tower_info: {
    type: Object,
  },
  tower_stage_tasks:{
    type:Array,
    required:true
  }
})

onMounted(() => {
  console.log(props.tower_info.id_tower)
})
</script>

<template>
  <v-card class="rounded-0" style="background-color:red">
    <h4 class="text-left">Torre {{props.tower_info.id_tower}} - Etapa {{props.tower_info.current_stage}}</h4>
    <h4 class="text-left">Se aperturo en dd/mm/aa</h4>
    <h4 class="text-left">Tareas</h4>
    <v-sheet style="border: 2px solid blue; background-color:green">
      <v-row class="ma-0 border-b" align="center">
        <v-col cols="3">
          <span class="text-truncate">Nombre</span>
        </v-col>
        <v-col cols="4">
          <span class="text-truncate"> Descripcion</span>
        </v-col>
        <v-col cols="3">
          <span>Trabajadores</span>
        </v-col>
        <v-col cols="2" class="text-center">
          <span>Delayed</span>
        </v-col>
      </v-row>
      <v-virtual-scroll :items="props.tower_stage_tasks">
        <template v-slot:default="{item:tower_stage_task}">
          <v-row  align="center">
            <v-col cols="3">
              <span class="text-truncate">{{ tower_stage_task.task_name }}</span>
            </v-col>
            <v-col cols="4">
              <span class="text-truncate">{{ tower_stage_task.task_description }}</span>
            </v-col>
            <v-col cols="3">
              <span>{{ tower_stage_task.task_workers }}</span>
            </v-col>
            <v-col cols="2" class="text-center">
              <span>{{ tower_stage_task.task_delayed ? 'Sí' : 'No' }}</span>
            </v-col>
          </v-row>
        </template>
      </v-virtual-scroll>
    </v-sheet>
  </v-card>
</template>

<style scoped>

</style>