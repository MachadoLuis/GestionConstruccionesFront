<script setup>
import TowerHistoryStage from '@/components/tower_history_stage.vue'
import {inject, ref, watch} from 'vue'
import {useRoute} from 'vue-router'

const current_route = useRoute()
const id_tower = current_route.params.id_tower
const current_stage = inject('stage_info')
const tasks_shown = ref([
  {task_name:"ETAPA1", task_description:"NOSEE", task_workers: 100, task_delayed: true},
  {task_name:"ETAPA1", task_description:"NOSEE", task_workers: 50, task_delayed: true},
  {task_name:"ETAPA1", task_description:"NOSEE", task_workers: 70, task_delayed: true},
  {task_name:"ETAPA1", task_description:"NOSEE", task_workers: 10, task_delayed: true}
])

const get_tower_stage_tasks = async (id_tower) => {}

watch(current_stage, () => {
  tasks_shown.value.forEach(task => {task.task_name = `ETAPA${current_stage.value}`})
  console.log("LANZADO DESDE LA PAGINA DE TOWER INFO",current_stage.value)
})
</script>

<template>
  <v-container>
    <TowerHistoryStage :tower_info="{id_tower, current_stage}" :tower_stage_tasks="tasks_shown"></TowerHistoryStage>
  </v-container>
</template>

<style scoped>

</style>