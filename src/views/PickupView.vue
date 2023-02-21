<template>
 <h1> id: {{ id }}</h1>
</template>

<script>
export default {
  name: "PickupView",

  components: {},
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
</script>
