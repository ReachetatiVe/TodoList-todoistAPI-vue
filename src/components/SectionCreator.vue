<template>
  <div class="section-creator">
    <h1 class="section-creator__header">{{ getMode }} section</h1>
    <v-text-field
      class="section-creator__text-filed"
      label="Section name"
      hide-details="auto"
      v-model="sectionName"
    ></v-text-field>
    <v-btn @click="confirmSection()" color="success">Ok</v-btn>
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
  },
  data() {
    return {
      sectionName: "",
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
      sectionObj.id = this.info.id;
      //Если имя не изменилось то оставить прежним
      if (this.sectionName !== "") sectionObj.name = this.sectionName;
      else sectionObj.name = this.info.name;
      this.$store.dispatch("updateSection", sectionObj);
    },
    confirmSection() {
      if (this.getMode === "create") {
        this.addSection();
      } else this.editSection();
    },
  },
};
</script>

<style lang="scss">
.section-creator {
  // .section-creator__header

  &__header {
  }

  // .section-creator__text-filed

  &__text-filed {
    margin-bottom: 15px;
  }

  // .section-creator__select

  &__select {
  }
}
</style>
