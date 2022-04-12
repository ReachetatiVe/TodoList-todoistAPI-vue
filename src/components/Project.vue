<template>
  <v-list-item-content>
    <v-list-item-title @click="makeProjectCurrent()">
      <span class="project-color" v-bind:style="{ backgroundColor: getColorById }"></span>{{" "+info.name }}
    </v-list-item-title>
  </v-list-item-content>
</template>

<script>
// @ is an alias to /src

export default {
  name: "project-item",
  props: {
    info: {},
  },
  data() {
    return {};
  },
  computed: {
    getColorById() {
      let color = "#fff";
      this.$store.getters.GET_COLORS.forEach((element) => {
        if (element.id === this.info.color) color = element.hex;
      });
      return color;
    },
  },
  methods: {
    makeProjectCurrent() {
      this.$emit("toggleProjectBrowser");
      this.$store.commit("SET_CURRENT_PROJECT", this.info);
    },
  },
};
</script>

<style scoped lang="scss">
.project-color {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
</style>
