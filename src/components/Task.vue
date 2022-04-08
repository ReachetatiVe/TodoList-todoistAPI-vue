<template>
  <div class="task">
    <h3 class="task__header" @click="toggleOverlay()">{{ info.content }}</h3>
    <div class="task__description">
      {{ info.description }}
    </div>
    <v-overlay :value="showOverlay">
      <v-btn color="success" @click="showOverlay = false"> Hide Overlay </v-btn>
    </v-overlay>
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
      showOverlay: false,
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
    toggleOverlay() {
      this.showOverlay = !this.showOverlay;
    },
  },
};
</script>

<style lang="scss" scoped>
.task {
    cursor: pointer;
		// .task__header
		&__header {

		}

		// .task__description
		&__description {
      max-width: 75%;
		}
}

</style>
