<template>
  <v-list-item-content>
    <v-list-item-title>
      <div class="label">
        <span class="label-color" v-bind:style="{ color: getColorById }">
          {{ " " + info.name }}
        </span>
        <div class="label__controls">
          <v-btn
            outlined
            elevation="2"
            icon
            class="label__control"
            small
            ><v-icon hover @click.stop="toggleOverlay()">{{
              icons.mdiPencil
            }}</v-icon>
          </v-btn>
          <v-btn 
            outlined
            elevation="2"
            icon
            color="red darken-2"
            class="label__control"
            small
            ><v-icon hover @click.stop="deleteLabel()">{{
              icons.mdiDelete
            }}</v-icon>
          </v-btn>
        </div>
      </div>
    </v-list-item-title>
        <v-overlay :value="showOverlay">
      <template>
        <LabelCreator v-bind:mode="'edit'" v-bind:info="this.info" v-on:toggleOverlay="toggleOverlay"/>
      </template>
    </v-overlay>
  </v-list-item-content>
</template>
<script>
import { mdiPencil, mdiDelete } from "@mdi/js";
import LabelCreator from "./LabelCreator.vue";
export default {
  name: "LabelItem",
  props: {
    info: {},
  },
  data: () => ({
    icons: {
      mdiPencil,
      mdiDelete,
    },
    showOverlay: false,
  }),
  methods: {
    deleteLabel() {
      console.log(this.info);
      this.$store.dispatch("deleteLabel", this.info.id);
    },
    toggleOverlay(){
      this.showOverlay = !this.showOverlay;
    }
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
  components: {
    LabelCreator,
  }
};
</script>

<style scoped lang="scss">
.label {
  display: flex;
  max-width: 60%;
  justify-content: space-between;
  align-items: center;
  &__controls{
    position: relative;
  }
  &__control{
    margin-right: 10px;
    &:last-child{
      margin-right: 0;
    }
  }
}
.label-color {
  display: inline-block;
  border-radius: 5%;
  padding: 5px;
  border: 1px solid;
}
</style>
