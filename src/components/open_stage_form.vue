<script setup>
import {ref, watch} from "vue";
import {useField, useForm} from "vee-validate";

const props = defineProps({
  stage_key: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['stage_open'])

const capataces = ref(['Fernando Lopez', 'Andres Salinas', 'Arely Machuca'])

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    capataz(value) {
      if (value) return true
      return 'Selecciona un capataz.'
    },
    opening_date(value) {
      if (value) return true
      return 'Selecciona una Fecha de Apertura'
    },
    closing_date(value) {
      if (value) return true
      return 'Selecciona una Fecha de Cierre'
    }
  }
})

const menu_opening_date = ref(false)
const menu_closing_date = ref(false)

const capataz = useField('capataz')
const opening_date = useField('opening_date')
const closing_date = useField('closing_date')

const format_date = (date_field) => {
  const value = date_field.value.value
  if (!value) return ''
  const new_date = new Date(value)
  return new_date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const submit = handleSubmit(values => {
  localStorage.setItem(`info_${props.stage_key}`, JSON.stringify(values))

  const states = JSON.parse(localStorage.getItem('stages_status') || '{}')
  states[props.stage_key] = true
  localStorage.setItem('stages_status', JSON.stringify(states))

  const tasksKey = props.stage_key === 'stage1' ? 'tasks_1' :
      props.stage_key === 'stage2' ? 'tasks_2' :
          props.stage_key === 'stage3' ? 'tasks_3' : 'tasks_4'

  if (!localStorage.getItem(tasksKey)) {
    localStorage.setItem(tasksKey, JSON.stringify([]))
  }

  emit('stage_open')
})
</script>

<template>
  <v-card class="pa-6" color="transparent" elevation="0">
    <form @submit.prevent="submit">
      <v-select
          v-model="capataz.value.value"
          :error-messages="capataz.errorMessage.value"
          label="Seleccionar Capataz"
          :items="capataces"
          variant="solo"
          bg-color="#A188FB"
          base-color="white"
          color="white"
          flat
          class="mb-2"
      />

      <v-menu v-model="menu_opening_date" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-text-field
              :model-value="format_date(opening_date)"
              :error-messages="opening_date.errorMessage.value"
              v-bind="props"
              label="Fecha de Apertura"
              variant="solo"
              bg-color="#A188FB"
              base-color="white"
              color="white"
              flat
              class="mb-2"
          />
        </template>
        <v-date-picker
            v-model="opening_date.value.value"
            @update:model-value="menu_opening_date = false"
            color="#9B16F3"
        ></v-date-picker>
      </v-menu>

      <v-menu v-model="menu_closing_date" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-text-field
              :model-value="format_date(closing_date)"
              :error-messages="closing_date.errorMessage.value"
              v-bind="props"
              label="Fecha Estimada de Cierre"
              variant="solo"
              bg-color="#A188FB"
              base-color="white"
              color="white"
              flat
              class="mb-4"
          />
        </template>
        <v-date-picker
            v-model="closing_date.value.value"
            @update:model-value="menu_closing_date = false"
            color="#9B16F3"
        ></v-date-picker>
      </v-menu>

      <div class="d-flex">
        <v-btn class="me-4" type="submit" color="#9B16F3" theme="dark">
          Abrir Etapa
        </v-btn>
        <v-btn @click="handleReset" variant="outlined" color="#9B16F3">
          Limpiar
        </v-btn>
      </div>
    </form>
  </v-card>
</template>

<style scoped>

</style>