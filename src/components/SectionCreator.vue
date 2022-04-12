<template>
  <div class="section-creator">
    <h1 class="section-creator__header">{{ getMode }} section</h1>
    <v-text-field
      class="section-creator__text-filed"
      label="Section name"
      hide-details="auto"
      v-model="sectionName"
    ></v-text-field>
    <v-row justify="center">
      <v-btn color="success" @click="confirmSection()">Ok</v-btn>
      <v-btn color="error" @click="$emit('cancelFunc')">Cancel</v-btn>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "Section-Creator",
  props: {
    info: {},
    mode: String,
  },
  computed: {
    getMode() {
      return this.mode;
    },
    getThisInfo(){
      return this.info;
    }
  },
  data() {
    return {
      sectionName: "",
      rules: [(value) => !!value || "Required."],
    };
  },
  methods: {
    addSection() {
      this.$store.dispatch("addNewSection", {
        name: this.sectionName,
      });
    },
    editSection() {
      const sectionObj = {};
      sectionObj.id = this.getThisInfo.id;
      if (this.sectionName !== "") sectionObj.name = this.sectionName;
      else sectionObj.name = this.getThisInfo.name;
      this.$store.dispatch("updateSection", sectionObj);
    },
    confirmSection() {
      if (this.getMode === "create") {
        this.addSection();
      } else this.editSection();
      this.$emit("cancelFunc");
    },
  },
  mounted() {
    if (this.mode !== "create") {
      if (this.getThisInfo !== undefined) {
        if (this.getThisInfo.name !== undefined)
          this.sectionName = this.getThisInfo.name;
      }
    }
  },
};
</script>

<style scoped lang="scss">
.section-creator {
  &__text-filed {
    margin-bottom: 15px;
  }
}
</style>
