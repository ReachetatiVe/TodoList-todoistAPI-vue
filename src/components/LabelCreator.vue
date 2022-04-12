<template>
  <div class="label-creator">
    <h1 class="label-creator__header">{{ getMode }} label</h1>
    <v-text-field
      class="label-creator__text-filed"
      label="label name"
      hide-details="auto"
      v-model="labelName"
      :rules="rules"
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
      <v-btn color="error" @click="$emit('cancelFunc')">Cancel</v-btn>
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
      rules: [(value) => !!value || "Required."],
    };
  },
  computed: {
    getMode() {
      return this.mode;
    },
    getColors() {
      return this.$store.getters.GET_COLORS;
    },
    getThisInfo() {
      return this.info;
    },
  },

  methods: {
    pickColor(color) {
      this.color = color;
    },
    confirmLabel() {
      if (this.mode === "create") this.addLabel();
      else this.editLabel();

    },
    addLabel() {
      const labelObj = {};
      if (this.labelName !== "") {
        labelObj.name = this.labelName;
        if (this.color.id === null || this.color.id === undefined)
          labelObj.color = 33;
        else labelObj.color = this.color.id;
        this.$store.dispatch("addNewLabel", labelObj);
              this.$emit("toggleOverlay");
      }
    },
    editLabel() {
      const labelObj = {};
      labelObj.id = this.getThisInfo.id;
      if (this.labelName !== "") labelObj.name = this.labelName;
      else labelObj.name = this.getThisInfo.name;
      if (this.color.id === null || this.color.id === undefined)
        labelObj.color = this.getThisInfo.color;
      else labelObj.color = this.color.id;
      this.$store.dispatch("updateLabel", labelObj);
            this.$emit("toggleOverlay");
    },
    getColorById(colorId) {
      return this.getColors.find((item) => item.id === colorId);
    },
  },
  mounted() {
    if (this.mode !== "create") {
      if (this.getThisInfo !== undefined) {
        if (this.getThisInfo.name !== undefined)
          this.labelName = this.getThisInfo.name;
        if (
          this.getThisInfo.color !== null &&
          this.getThisInfo.color !== undefined
        )
          this.color = this.getColorById(this.getThisInfo.color);
      }
    }
    else this.color = this.getColors[0];
  },
};
</script>

<style scoped lang="scss">
.label-creator {
  padding: 15px;

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
