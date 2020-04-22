<template>
<div>
   <div v-if="post_dana" style="border: 5px solid blue">
    <div @click="gotoDetails(post_dana)">
      <InstagramCard :info="post_dana"/>
      
    </div>
  </div>
 
  <div v-if="store.authenticated">
    <p> </p>
    <button @click="newImage()" type="Novi post" class="btn btn-primary ml-2">Post new image</button>
    <div @click="gotoDetails(post)" :key="post.id" v-for="post in posts">
      <InstagramCard :info="post"/>
    </div>
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
      posts: [],
      post_dana: {}
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
      this.post_dana= await Posts.Random();
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