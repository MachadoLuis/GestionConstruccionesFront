<script setup>
import {useField, useForm} from "vee-validate";
import {onMounted, ref} from "vue";
import user_json from "@/data/user.json"
import {useRouter} from "vue-router";

const router = useRouter()

const users = ref([])
const current_user = ref({})

const {handleSubmit} = useForm({
  validationSchema:{
    user_name(value) {return value ? true: 'Usuario Obligatorio'},
    user_password(value) {return value ? true: 'Contraseña Obligatoria'}
  }
})
const user_name = useField('user_name')
const user_password = useField('user_password')

const submit = handleSubmit(values => {
  current_user.value = users.value.find(u => u.user_name === values.user_name && u.user_password === values.user_password)
  if(!current_user.value) {
    console.log("No se encontro usuario")
    return
  }
  console.log("Usuario actual: ", current_user.value)
})

const go_to_register = () => {
  router.push("/register")
}

onMounted(() => {
  users.value = user_json
  console.log(users.value)
})
</script>

<template>
  <v-sheet class="fill-height d-flex" style="background-color:#9B16F3">
    <v-container class="align-self-center d-flex flex-column ga-4" max-width="30rem">
      <h2>Granite Resonance</h2>
      <form @submit.prevent= "submit">
        <v-text-field
          v-model="user_name.value.value"
          :error-messages="user_name.errorMessage.value"
          label="Usuario"
        />
        <v-text-field
            v-model="user_password.value.value"
            :error-messages="user_password.errorMessage.value"
            label="Contraseña"
        />
        <v-btn color="#A188FB" width="100%" type="submit" >Iniciar Sesion</v-btn>
      </form>
      <v-spacer></v-spacer>
      <span>¿No cuentas con una cuenta?<span @click="go_to_register" style="cursor:pointer"> Registrate</span></span>
    </v-container>
  </v-sheet>

</template>

<style scoped>

</style>