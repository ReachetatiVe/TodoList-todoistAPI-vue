<template>
  <ProjectBrowser />
</template>

<script>
// @ is an alias to /src
import ProjectBrowser from "@/components/ProjectBrowser.vue";

export default {
  name: "AuthorizationView",
  components: {
    ProjectBrowser,
  },
};
</script>
