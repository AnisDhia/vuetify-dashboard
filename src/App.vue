<template>
  <v-app>
    <NavRail/>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavRail from './components/NavRail';

export default {
  name: 'App',
  components: {
    NavRail,
  },
  data: () => ({
    
  }),
};
</script>
