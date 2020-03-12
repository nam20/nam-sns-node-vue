<template>
  <div id="app">
    <v-app id="inspire">
  
    <v-app-bar
      app
      color="cyan"
      dark
    >

      <v-toolbar-title >
        <router-link to='/' style="color: white;text-decoration: none;">node-sns</router-link>
        
      </v-toolbar-title>
      <v-spacer />
      
      
      <v-btn :to="`/profile`" color="cyan" :style="{ display: 'flex', alignItems: 'center' }">프로필</v-btn>

     </v-app-bar>
         <v-row no-gutters>
        <v-col cols="12" md="4">
            <login-form />
        </v-col>
        <v-col cols="12" md="8">
            <router-view></router-view>
        </v-col>
            
        </v-row>

  </v-app>
  </div>
</template>

<script>

import loginForm from './components/loginForm'

export default {
    components:{
      loginForm
    }
}

</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>