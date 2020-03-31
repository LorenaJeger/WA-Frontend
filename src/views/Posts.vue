<template>
  <div v-if="store.authenticated">
    <button @click="newImage()" type="Novi post" class="btn btn-primary ml-2">Post new image</button>
    <div @click="gotoDetails(post)" :key="post.id" v-for="post in posts">
      <InstagramCard :info="post"/>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store.js";
import { Posts } from "@/services";
export default {
  data() {
    //return store;
    return {
      store: store,
      posts: []
    }
  },
  name: "posts",
  mounted() {
    this.fetchPosts()
  },
  methods: {
    async fetchPosts(term) {  //uzima neki pojam za pretragu
      term = term || store.searchTerm  //ako pojam ne postoji uzima ga iz store-a i prosljeđuje u getAll()
      
      this.posts = await Posts.getAll(term) //getAll pričeka odgovor i spremi u postove(zamjena za fetch)
    },
    gotoDetails(card) {
      this.$router.push({path: `post/${card.id}`})
    },
    newImage() {
      this.$router.push({name: 'newpost'}).catch(err => console.log(err))
    }
  },
  components: {
    InstagramCard
  },
  watch: {
    "store.searchTerm": _.debounce(function() {
      this.fetchPosts()
    }, 500)     //milisekunde koje ce on cekati da korisnik nesto upise
  }
}
</script>

<style scoped>
  button {
    margin-bottom: 20px
  }
</style>