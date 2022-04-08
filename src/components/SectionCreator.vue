<template>
  <div class="section-creator">
    <h1 class="section-creator__header">Create section</h1>
    <v-text-field
      class="section-creator__text-filed"
      label="Section name"
      hide-details="auto"
      v-model="sectionName"
    ></v-text-field>
    <v-btn @click="addSection" color="success">Ok</v-btn>
  </div>
</template>
<script>
export default {
  name: "Section-Creator",
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
