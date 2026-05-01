<script setup>
import {useField, useForm} from "vee-validate";
import {onMounted, ref, computed} from "vue";

const tasks_status = ['Añadida', 'En Curso', 'En Pausa', 'Atrasada']

const props = defineProps({
  task_data: {
    type: Object,
    required: true,
  },
  current_stage: {
    type: String,
    required: true,
  }
})
const tasks_stage = ref()
const emit = defineEmits(['updated', 'close'])
const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value) { return value ? true : 'Trabajo es obligatorio' },
    description() { return true },
    workers(value) { return value ? true : 'Los trabajadores son obligatorios' },
    status(value) { return value ? true : 'El estado es obligatorio' }
  }
})

const task = useField('name')
const description = useField('description')
const workers = useField('workers')
const status = useField('status')


const submit = handleSubmit(values => {
  const taskIndex = tasks_stage.value.findIndex((t) => t.name === props.task_data.name)

  if (taskIndex !== -1) {
    tasks_stage.value[taskIndex] = { ...values }

    localStorage.setItem(props.current_stage, JSON.stringify(tasks_stage.value))

    emit('updated')
  }
})
const cancel = () => {
  emit('close')
}

onMounted(() => {
  const savedTasks = localStorage.getItem(props.current_stage)
  tasks_stage.value = savedTasks ? JSON.parse(savedTasks) : []

  task.value.value = props.task_data.name
  description.value.value = props.task_data.description
  workers.value.value = props.task_data.workers
  status.value.value = props.task_data.status
})

</script>

<template>
  <form @submit.prevent = "submit">
    <v-text-field
        v-model="task.value.value"
        :error-messages="task.errorMessage.value"
        label="Nombre del Trabajo"
        variant="outlined"
    />
    <v-text-field
        v-model="description.value.value"
        label="Descripción"
        variant="outlined"
    />
    <v-text-field
        v-model.number="workers.value.value"
        type="number"
        :error-messages="workers.errorMessage.value"
        label="Cantidad de Trabajadores"
        variant="outlined"
    />
    <v-select
        v-model="status.value.value"
        :error-messages="status.errorMessage.value"
        label="Estado de la Tarea"
        :items="tasks_status"
        variant="outlined"
    />
    <div class="d-flex ga-2">
      <v-btn color="error"  @click="cancel">Cancelar</v-btn>
      <v-btn color="#9B16F3" type="submit" variant="elevated">Guardar Cambios</v-btn>
    </div>
  </form>
</template>

<style scoped>

</style>