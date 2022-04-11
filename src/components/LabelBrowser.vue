<template>
  <v-card class="mx-auto" max-width="700" tile>
    <v-btn @click="toggleShowCreator()"> Add label</v-btn>
    <div class="label__crator" v-if="showCreator">
      <LabelCreator v-bind:mode="'create'" />
    </div>
    <v-list-item v-for="label in getLabels" :key="'_'+label.id">
      <Label :info="label"/>
    </v-list-item>
  </v-card>
</template>
<script>
import LabelCreator from "./LabelCreator.vue";
import Label from "./Label.vue";

export default {
    data: () => ({
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
    toggleShowCreator(){
      this.showCreator = !this.showCreator;
    }
  }
};
</script>
