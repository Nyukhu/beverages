<template>
  <v-app>
    <v-content>
      <BeerViewer/>
    </v-content>
  </v-app>
</template>

<script>
import BeerViewer from './components/BeerViewer'

export default {
  name: 'App',
  components: {
    BeerViewer
  },
  data () {
    return {
      //
    }
  }
}
</script>
