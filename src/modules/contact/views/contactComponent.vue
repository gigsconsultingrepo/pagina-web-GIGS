<style scoped>
.contact-component {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

</style>
<template>
  <div class="contact-component">
    
    <h1>Page {{ pageTitle }}</h1>
  
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: "contactHomeComponent",

  computed: {
    pageTitle() {
      let title = this.$store.getters['contact/pageTitle'];

      return title;
    },
    
  },
  watch: {
   
  },
  data() {
    return {
    }
  },
  methods: {
  },

  mounted() {
  }
};
</script>
