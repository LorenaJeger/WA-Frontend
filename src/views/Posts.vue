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
    fetchPosts() {
      fetch(`http://localhost:3000/posts?_any=${this.store.searchTerm}`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log("Podaci s backenda", data)
          this.posts = data.map(doc => {
            return {
              id: doc.id,
              url: doc.source,
              email: doc.createdBy,
              title:doc.title,
              posted_at: Number(doc.postedAt)
            }
          })
        })
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