<template>
  <v-col class="section-creator">
    <v-row>
      <h1 class="section-creator__header">{{ getMode }} section</h1>
    </v-row>
    <v-row>
      <v-text-field
        class="section-creator__text-filed"
        label="Section name"
        hide-details="auto"
        v-model="sectionName"
      >
      </v-text-field>
    </v-row>
    <v-row justify="center" class="section-creator__btns">
      <v-btn color="success" @click="confirmSection()" class="section-creator__btn">Ok</v-btn>
      <v-btn color="error" @click="$emit('cancelFunc')" class="section-creator__btn">Cancel</v-btn>
    </v-row>
  </v-col>
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
    getThisInfo() {
      return this.info;
    },
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
  &__btns{
    position: relative;
  }
  &__btn{
    margin-right: 10px;
    &:last-child{
      margin-right: 0;
    }
  }
}
</style>
