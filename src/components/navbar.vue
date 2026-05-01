<script setup>
const props = defineProps({
  items_list: {
    type: Array,
    required: true
  }
})

const emits = defineEmits(["tower_stage", "view"])
const item_clicked = (stage) => {
  if(stage) {
    emits("tower_stage", stage)
  }
}
const change_view = (view) => {
  if(view) {
    emits("view", view)
  }
}
</script>

<template>
  <v-navigation-drawer
      permanent
      elevation="2"
      color="#9B16F3"
  >
    <v-list-item
        prepend-icon="mdi-account-hard-hat"
        title="Constructora Ramos"
        subtitle="Grupo Montero"
        class="pa-4"
    ></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <template v-for="item_list in props.items_list">
        <v-list-group v-if="item_list.list_group">
          <template v-slot:activator="{ props: activatorProps }">
            <v-list-item v-bind="activatorProps" :title="item_list.list_group.title" @click="change_view(item_list.view)">
            </v-list-item>
          </template>
          <v-list-item v-for="item_list in item_list.list_group.children_list" :title="item_list.title" @click="item_clicked(item_list.stage); change_view(item_list.view)">

          </v-list-item>
        </v-list-group>

        <v-list-item v-else :title="item_list.title" @click="change_view(item_list.view)">
        </v-list-item>
      </template>

    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>