<script setup>
import {useField, useForm} from "vee-validate";
import {ref, watch} from "vue";

const props = defineProps({
  target_stage: {
    type: String,
    default: 'tasks'
  }
})
  const current_local_stage = ref('tasks')

  const tasks_stage = ref(JSON.parse(localStorage.getItem(props.target_stage) || '[]'))
  const emit = defineEmits(['task_added'])

  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      name(value) {
        if (value?.length >= 3) return true
        return 'El nombre del trabajo debe tener al menos 3 caracteres'
      },
      description() {
        return true
      },
      workers(value) {
        if (value > 0) return true
        return 'Debe haber al menos 1 trabajador'
      }
    }
  })
  const task = useField('name')
  const description = useField('description')
  const workers = useField('workers')

  const submit = handleSubmit(values => {
    const new_task = {
      name: values.name,
      description: values.description || 'Sin descripción',
      workers: values.workers,
      status: "Abierto"
    }
    alert(JSON.stringify(new_task, null, 2))
    const currentTasks = JSON.parse(localStorage.getItem(props.target_stage) || '[]')
    currentTasks.push(new_task)
    localStorage.setItem(props.target_stage, JSON.stringify(currentTasks))

    emit('task_added')
  })

  watch(() => props.target_stage, (newStage) => {
    tasks_stage.value = JSON.parse(localStorage.getItem(newStage) || '[]')
  })
</script>

<template>
  <form @submit.prevent="submit">
    <v-text-field
        v-model="task.value.value"
        :error-messages="task.errorMessage.value"
        label="Nombre del Trabajo"
        variant="solo"
        bg-color="#A188FB"
        base-color="white"
        color="white"
        flat
    />
    <v-text-field
        v-model="description.value.value"
        label="Descripción (Opcional)"
        variant="solo"
        bg-color="#A188FB"
        base-color="white"
        color="white"
        flat
    />
    <v-text-field
        v-model.number="workers.value.value"
        type="number"
        :error-messages="workers.errorMessage.value"
        label="Cantidad de Trabajadores"
        variant="solo"
        bg-color="#A188FB"
        base-color="white"
        color="white"
        flat
    />
    <v-btn type="submit" color="#9B16F3">Enviar</v-btn>
    <v-btn @click="handleReset" color="#9B16F3">Limpiar</v-btn>
  </form>
</template>

<style scoped>

</style>