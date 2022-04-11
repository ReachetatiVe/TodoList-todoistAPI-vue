<template>
  <div class="label-creator">
    <h1 class="label-creator__header">{{ getMode }} label</h1>
    <v-text-field
      class="label-creator__text-filed"
      label="label name"
      hide-details="auto"
      v-model="labelName"
    ></v-text-field>
    <v-menu
      offset-y
      outlined
      class="label-creator__menu"
      max-height="250"
      max-width="250"
      min-width="200"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="label-creator__menu-btn"
          color="secondary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <div class="label-creator__color-item">
            <p>Pick color</p>
            <span
              class="label-creator__color"
              v-bind:style="{ backgroundColor: color.hex }"
            ></span>
          </div>
        </v-btn>
      </template>
      <v-list class="label-creator__color-items">
        <v-list-item
          v-for="color in getColors"
          :key="color.id"
          @click="pickColor(color)"
        >
          <v-list-item-title>
            <div class="label-creator__color-item">
              {{ color.name }}
              <span
                class="label-creator__color"
                v-bind:style="{ backgroundColor: color.hex }"
              ></span>
            </div>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <div>
      <v-btn @click="confirmLabel()" color="success">Ok</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: "Label-Creator",
  props: {
    info: {},
    mode: String,
  },
  data() {
    return {
      labelName: "",
      color: {},
    };
  },
  computed: {
    getMode() {
      return this.mode;
    },
    getColors() {
      return this.$store.getters.GET_COLORS;
    },
  },

  methods: {
    pickColor(color) {
      this.color = color;
    },
    confirmLabel() {
      if (this.mode === "create") this.addLabel();
      else this.editLabel();
      this.$emit("toggleOverlay");
    },
    addLabel() {
      const labelObj = {};
      if (this.labelName !== "") {
        labelObj.name = this.labelName;
        if (this.color.id === null || this.color.id === undefined)
          labelObj.color = 33;
        else labelObj.color = this.color.id;
        this.$store.dispatch("addNewLabel", labelObj);
      }
    },
    editLabel() {
      console.log("Опа а я редактор");
      const labelObj = {};
      labelObj.id = this.info.id;
      if (this.labelName !== "") labelObj.name = this.labelName;
      else labelObj.name = this.info.name;
      if (this.color.id === null || this.color.id === undefined)
        labelObj.color = this.info.color;
      else labelObj.color = this.color.id;
      console.log(labelObj);
      this.$store.dispatch("updateLabel", labelObj);
    },
  },
  mounted() {
    this.color = this.getColors[0];
  },
};
</script>

<style scoped lang="scss">
.label-creator {
  padding: 15px;
  // .label-creator__header

  &__color {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin: 0 5px;
    align-items: center;
  }
  &__color-item {
    display: flex;
    justify-content: space-between;
    p {
      margin: 0;
      padding: 0;
    }
  }
  &__text-filed {
    margin-bottom: 15px;
  }
  &__menu-btn {
    margin-bottom: 15px;
  }
}
</style>
