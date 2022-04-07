<template>
  <div>
    <h3>{{ info.content }}</h3>
    <p>
      {{ info.description }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Section-page",
  props: {
    info: {},
  },
  data() {
    return {
      checked: false,
    };
  },
  computed: {
    getSections() {
      return this.$store.getters.GET_SECTIONS;
    },
  },
  methods: {
    getTasks() {
      this.$store.dispatch("getTasksInProject");
    },
  },
};
</script>
