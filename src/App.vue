<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
    </v-app-bar>
    <v-main>
      <text-editor> </text-editor>

      <div>
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import TextEditor from "./components/TextEditor.vue";
export default {
  name: "App",
  components: {
    TextEditor,
  },

  data: () => ({
    //
  }),
};
</script>
