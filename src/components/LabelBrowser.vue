<template>
  <v-card class="mx-auto label-browser" max-width="700" tile>
    <div class="label-browser__controls">
      <v-btn
        @click="toggleShowCreator()"
        class="label-browser__control"
        color="primary"
      >
        Add label</v-btn
      >
    </div>
    <div class="label-browser__creator" v-if="showCreator">
      <LabelCreator v-bind:mode="'create'" v-on:cancelFunc="toggleShowCreator" />
    </div>
    <v-expansion-panels v-model="panel" multiple class="label-browser__labels">
      <Label :info="label" v-for="label in getLabels" :key="'_' + label.id" />
    </v-expansion-panels>
  </v-card>
</template>
<script>
import LabelCreator from "./LabelCreator.vue";
import Label from "./Label.vue";

export default {
  data: () => ({
    panel: [],
    showCreator: false,
  }),
  components: {
    LabelCreator,
    Label,
  },
  computed: {
    getLabels() {
      return this.$store.getters.GET_LABELS;
    },
  },
  methods: {
    toggleShowCreator() {
      this.showCreator = !this.showCreator;
    },
  },
};
</script>
<style lang="scss" scoped>
.label-browser {
  position: relative;
  &__controls {
    padding: 10px;
    margin-bottom: 15px;
  }
}
</style>
