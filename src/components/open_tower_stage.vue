<script setup>
import {computed, onMounted, ref, watch, watchEffect, nextTick} from 'vue'
import OpenStageForm from '@/components/open_stage_form.vue'
import TaskStageForm from '@/components/task_stage_form.vue'
import UpdateTaskForm from '@/components/update_task_form.vue'

const stage = ref(null)
const current_stage_bool = ref(false)
const current_stage = ref('')

const tab = ref('one')
const edit_modal = ref(false)
const edit_task = ref(null)
const tasks_stage = ref([])

  const stage_items = [
    {stage: 'Etapa 1', value: 'tasks_1', key: 'stage1'},
    {stage: 'Etapa 2', value: 'tasks_2', key: 'stage2'},
    {stage: 'Etapa 3', value: 'tasks_3', key: 'stage3'},
    {stage: 'Etapa 4', value: 'tasks_4', key: 'stage4'},
  ]

  const checkStatus = () => {
    const states = JSON.parse(localStorage.getItem('stages_status') || '{}')
    current_stage_bool.value = states[stage.value] === true

    if (current_stage_bool.value) {
      recharge()
    }
  }

  const handleStageOpened = () => {
    checkStatus()
  }

  const recharge = async () => {
    const data = localStorage.getItem(current_stage.value)
    tasks_stage.value = data ? [...JSON.parse(data)] : []
  }

  const remove_task = (task_name) => {
    tasks_stage.value = tasks_stage.value.filter((task) => task.name !== task_name)
    localStorage.setItem(current_stage.value, JSON.stringify(tasks_stage.value))
  }

  const select_editing_task = (task) => {
    edit_task.value = task
    edit_modal.value = true
  }

  watch(stage, (newKey) => {
    const selected = stage_items.find(item => item.key === newKey)
    if (selected) {
      current_stage.value = selected.value
      checkStatus()
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
  if(!localStorage.getItem('tasks_4')){
    const initialData = [
        {name: "Trabajo 1", description: "Descripcion", workers: 100, status: "Abierto"},
        {name: "Trabajo 2", description: "Descripcion", workers: 100, status: "Abierto"},
        {name: "Trabajo 3", description: "Descripcion", workers: 100, status: "Abierto"}
    ]
    localStorage.setItem('tasks_4', JSON.stringify(initialData))
  }
  stage.value = 'stage1'
  checkStatus()
})
</script>

<template>
  <v-container style="background-color:transparent">
    <v-sheet style="background-color:transparent">
      <v-select
          v-model="stage"
          :items="stage_items"
          item-title="stage"
          item-value="key"
          label="Selecciona una Etapa"
          variant="outlined"
          base-color="#9B16F3"
          color="#9B16F3"
          class="custom-select"
      />
      <v-sheet v-if="stage" color="transparent">
        <div v-if="!current_stage_bool">
          <OpenStageForm
              :stage_key="stage"
              @stage_open="handleStageOpened"
          />
        </div>
        <v-card v-else color="#F5F5F5" elevation="2" rounded="lg">
          <v-sheet elevation="0" color="transparent">
            <v-tabs v-model="tab" color="white" bg-color="transparent" hide-slider class="custom-tabs">
              <v-tab class="tab-box mr-2" value="one" @click="recharge()">Trabajos de Etapa</v-tab>
              <v-tab class="tab-box" value="two" style="border-top-right-radius:8px">Agregar Tarea</v-tab>
            </v-tabs>

            <v-divider></v-divider>

            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="one">
                <v-sheet class="pa-5" color="#A188FB" height="400px" border="0">
                  <v-row class="font-weight-bold mb-2">
                    <v-col>Trabajo</v-col>
                    <v-col>Descripcion</v-col>
                    <v-col>Trabajadores</v-col>
                    <v-col>Estado</v-col>
                    <v-col class="text-right"></v-col>
                  </v-row>

                  <v-virtual-scroll :items="tasks_stage" height="300" :key="tasks_stage.length">
                    <template v-slot:default="{ item: task }">
                      <v-row class="align-center border-bottom py-2">
                        <v-col>{{ task.name }}</v-col>
                        <v-col>{{ task.description}}</v-col>
                        <v-col>{{ task.workers }}</v-col>
                        <v-col>{{ task.status }}</v-col>
                        <v-col class="text-right">
                          <v-icon @click="select_editing_task(task)" class="mr-2">mdi-pencil</v-icon>
                          <v-icon @click="remove_task(task.name)">mdi-close</v-icon>
                        </v-col>
                      </v-row>
                    </template>
                  </v-virtual-scroll>

                  <!-- Modal de Edición -->
                  <v-dialog v-model="edit_modal" max-width="600px" persistent attach="body">
                    <v-card style="background-color: #A188FB !important; color: white">
                      <v-card-title class="pa-4 pb-0">
                        <span class="text-h5">Editar Trabajo</span>
                      </v-card-title>
                      <v-card-text class="pa-4">
                        <UpdateTaskForm
                            :task_data="edit_task"
                            :current_stage="current_stage"
                            @updated="recharge(); edit_modal = false"
                            @close="edit_modal = false"
                        />
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </v-sheet>
              </v-tabs-window-item>

              <v-tabs-window-item value="two">
                <v-sheet class="pa-5" color="transparent" height="400px">
                  <TaskStageForm
                      :target_stage="current_stage"
                      @task_added="recharge(); tab = 'one'"
                  />
                </v-sheet>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-sheet>
        </v-card>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.tab-box {
  background-color: #9B16F3 !important;
  color: white !important;
  text-transform: none !important;
  transition: 0.3s;
}

.tab-box.v-tab--selected {
  background-color:#A188FB !important;
  opacity: 1;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.3);
}


.custom-tabs :deep(.v-tabs-bar) {
  border-bottom: none !important;
}

.custom-select :deep(.v-field__input),
.custom-select :deep(.v-label),
.custom-select :deep(.v-field__outline) {
  color: #9B16F3 !important;
  opacity: 1;
}

.custom-select :deep(.v-select__selection-text) {
  color: #9B16F3 !important;
}
</style>