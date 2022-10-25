<template>
  <div class="center">
    <img alt="WebRocket logo" src="./assets/WebRocket.png">

    <div class="list">
      <h3>People</h3>

      <ul>
        <li
          v-for="(item, index) in people"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Api from '@/plugins/api';
import store from '@/store';

@Options({})
export default class App extends Vue {
  api!: Api;

  async mounted() {
    this.api = new Api('ws://localhost:8081');
    store.commit('SET_PEOPLE', await this.api.people);
  }

  // eslint-disable-next-line class-methods-use-this
  get people(): string[] {
    return store.getters.GET_PEOPLE;
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;700&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.list {
  width: 250px;
}

li {
  text-align: left;
}
</style>
