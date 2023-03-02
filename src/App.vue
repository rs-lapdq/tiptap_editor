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
      <v-btn color="primary" @click="handleSubmitForm">Submit form</v-btn>
      <text-editor2 v-model="content"> </text-editor2>
      <pre v-html="content"></pre>
    </v-main>
  </v-app>
</template>

<script>
import TextEditor2 from "./components/TextEditor2.vue";
export default {
  name: "App",
  components: {
    TextEditor2,
  },

  data: () => ({
    content: "",
  }),
  methods: {
    handleSubmitForm() {
      console.log(this.content);
    },
  },
};
</script>
