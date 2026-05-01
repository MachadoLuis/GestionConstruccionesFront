<script setup>
import {computed, onMounted, ref, watch, watchEffect} from 'vue'
import OpenStageForm from '@/components/open_stage_form.vue'
import TaskStageForm from '@/components/task_stage_form.vue'
import UpdateTaskForm from '@/components/update_task_form.vue'

const open_stage_bool = ref(false)
const stage = ref()
const current_stage_bool = ref(false)

const tab = ref('one')
const edit_modal = ref(false)
const edit_task = ref()
const current_stage = ref('tasks')

const tasks_stage = ref(JSON.parse(localStorage.getItem(current_stage.value) || '[]'))
const stage_items = [
  {stage: 'Etapa1', value: 'tasks', key:"stage1"},
  {stage: 'Etapa2', value: 'tasks2', key:"stage2"},
  {stage: 'Etapa3', value: 'tasks3', key:"stage3"},
  {stage: 'Etapa4', value: 'tasks4', key:"stage4"},
]

const add_task_test = (tarea, descripcion, trabajadores) => {
  tasks_stage.value.push({Tarea: tarea, Descripcion: descripcion, Trabajadores: trabajadores})
  localStorage.setItem('tasks', JSON.stringify(tasks_stage.value))
}

const add_task = () => {
  tasks_stage.value = JSON.parse(localStorage.getItem(current_stage.value))
}

const remove_task = (task_name) => {
  tasks_stage.value = tasks_stage.value.filter((task) => task.Trabajo !== task_name)
  localStorage.setItem(current_stage.value, JSON.stringify(tasks_stage.value))
}

const select_editing_task = (task) => {
  edit_task.value = task
  edit_modal.value = true
}

const recharge = () => {
  if (current_stage.value === 1){
    tasks_stage.value = JSON.parse(localStorage.getItem('tasks'))

  }else if (current_stage.value === 2){
    tasks_stage.value = JSON.parse(localStorage.getItem('tasks2'))

  }else if (current_stage.value === 3){
    tasks_stage.value = JSON.parse(localStorage.getItem('tasks3'))

  }else if (current_stage.value === 4){
    tasks_stage.value = JSON.parse(localStorage.getItem('tasks4'))
  }
}

watch(current_stage, () =>{
  console.log("se lanza el current_stage")
  if (current_stage.value === 'tasks'){
    tasks_stage.value = JSON.parse(localStorage.getItem(current_stage.value))
  }else if (current_stage.value === 'tasks2'){
    tasks_stage.value = JSON.parse(localStorage.getItem(current_stage.value))

  }else if (current_stage.value === 'tasks3'){
    tasks_stage.value = JSON.parse(localStorage.getItem(current_stage.value))

  }else if (current_stage.value === 'tasks4'){
    tasks_stage.value = JSON.parse(localStorage.getItem(current_stage.value))
  }
})
watch(stage, () =>{
  const states = JSON.parse(localStorage.getItem('stages_status') || '{}')
  const selectedStage = stage_items.find(item => item.key === stage.value)
  if(selectedStage){
    current_stage_bool.value = states[selectedStage.key] || false
  }
})

onMounted(() => {
  if (!localStorage.getItem('stages_status')) {
    const initialStatus = {
      stage1: false,
      stage2: false,
      stage3: false,
      stage4: true
    }
    localStorage.setItem('stages_status', JSON.stringify(initialStatus))
  }

  if(localStorage.getItem('tasks')){
    return
  }
  const stage1 = [
    {Trabajo: "Tarea1 ETAPA1", Descripcion: "Descripcion", Trabajadores: "100", Estado: "En curso"},
    {Trabajo: "Tarea2 ETAPA1", Descripcion: "Descripcion", Trabajadores: "100", Estado: "Tardia"},
    {Trabajo: "Tarea3 ETAPA1", Descripcion: "Descripcion", Trabajadores: "100", Estado: "En Pausa"},
  ]

  const stage2 = [
    {Trabajo: "Tarea ETAPA2", Descripcion: "Descripcion", Trabajadores: "100", Estado: "En curso"},
    {Trabajo: "Tarea ETAPA2", Descripcion: "Descripcion", Trabajadores: "100", Estado: "Tardia"},
    {Trabajo: "Tarea ETAPA2", Descripcion: "Descripcion", Trabajadores: "100", Estado: "En Pausa"},
  ]

  const stage3 = [
    {Trabajo: "Tarea1 ETAPA3", Descripcion: "Descripcion", Trabajadores: "100", Estado: "En curso"},
    {Trabajo: "Tarea2 ETAPA3", Descripcion: "Descripcion", Trabajadores: "100", Estado: "Tardia"},
    {Trabajo: "Tarea3 ETAPA3", Descripcion: "Descripcion", Trabajadores: "100", Estado: "En Pausa"},
  ]

  const stage4 = [
    {Trabajo: "Tarea1 ETAPA4", Descripcion: "Descripcion", Trabajadores: "100", Estado: "En curso"},
    {Trabajo: "Tarea2 ETAPA4", Descripcion: "Descripcion", Trabajadores: "100", Estado: "Tardia"},
    {Trabajo: "Tarea3 ETAPA4", Descripcion: "Descripcion", Trabajadores: "100", Estado: "En Pausa"},
  ]

  localStorage.setItem('tasks', JSON.stringify(stage1))
  localStorage.setItem('tasks2', JSON.stringify(stage2))
  localStorage.setItem('tasks3', JSON.stringify(stage3))
  localStorage.setItem('tasks4', JSON.stringify(stage4))

  tasks_stage.value = JSON.parse(localStorage.getItem('tasks'))

})
</script>

<template>
  <v-container style="background-color:red">
    <v-sheet>
      <v-select
          v-model="stage"
        :items="stage_items"
        item-title="stage"
        item-value="key"
        label="Selecciona una Etapa"
      />
      <OpenStageForm v-if="!current_stage_bool"></OpenStageForm>
      <v-card v-else>
        <v-sheet elevation="2">
          <v-tabs v-model="tab" color="primary">
            <v-tab value="one" @click="add_task()">Tareas Activas</v-tab>
            <v-tab value="two">Agregar Tarea</v-tab>
          </v-tabs>

          <v-divider></v-divider>

          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="one">
              <v-sheet class="pa-5" color="purple" height="400px">
                <v-select
                    v-model = "current_stage"
                    :items="stage_items"
                    label="Seleccionar Etapa"
                    item-title="stage"
                    item-value="value"
                    variant="outlined"
                ></v-select>
                <v-row>
                  <v-col>Trabajo</v-col>
                  <v-col>Descripcion</v-col>
                  <v-col>Trabajadores</v-col>
                  <v-col>Estado</v-col>
                  <v-col></v-col>
                </v-row>
                <v-virtual-scroll :items="tasks_stage">
                  <template v-slot:default="{item:task}">
                    <v-row>
                      <v-col>{{task.Trabajo}}</v-col>
                      <v-col>{{task.Descripcion}}</v-col>
                      <v-col>{{task.Trabajadores}}</v-col>
                      <v-col>{{task.Estado}}</v-col>
                      <v-col>
                        <v-icon @click="select_editing_task(task)">mdi-pencil</v-icon>
                        <v-icon @click="remove_task(task.Trabajo)">mdi-close</v-icon>
                      </v-col>
                    </v-row>

                  </template>
                </v-virtual-scroll>
                <v-dialog v-model="edit_modal">
                  <v-card>
                    <UpdateTaskForm @updated="recharge" :task_data="edit_task" :current_stage=current_stage></UpdateTaskForm>
                  </v-card>
                </v-dialog>
              </v-sheet>
            </v-tabs-window-item>

            <v-tabs-window-item value="two">
              <v-sheet class="pa-5" color="brown" height="400px">
                <TaskStageForm></TaskStageForm>
              </v-sheet>
            </v-tabs-window-item>

          </v-tabs-window>
        </v-sheet>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<style scoped>

</style>