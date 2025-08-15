<style scoped>
.blog-component {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

</style>
<template>
  <div class="blog-component">
    
    <h1>Page {{ pageTitle }}</h1>
  
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: "blogHomeComponent",

  computed: {
    pageTitle() {
      let title = this.$store.getters['blog/pageTitle'];

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
