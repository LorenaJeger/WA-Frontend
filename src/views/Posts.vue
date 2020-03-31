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

   async fetchPosts(term) {
      term = term || store.searchTerm
     
     let pretraga = async(term) =>{
          let response= await fetch(`http://localhost:3000/posts?title=${term}`)
          let data= await response.json()  
          return data //Promise(array) svih postova koji udovoljavaju term
     }
      
          let terms= term.split(" ")
          console.log("terms", terms)

        let promises = terms.map(e => pretraga(e))   //za svaki e napravi pretragu i vrati array novo nastalih objekata
        console.log("promises", promises)

       let results=  await Promise.all(promises)  //sve promise cekamo awaitom,  posto imamo vise promisa imamo promise.all kao paramtar prima array promisa sve ih priceka i zajednicki rezlutat vraca u varijablu results
       console.log("results", results)

      //let array2= [ [1,2], [3,4], [5,6] ]
      // []=> [1, 2, 3, 4, 5, 6]
     let rezlutat =  results.reduce(  (final,e)=> final.concat(e), [])
      console.log("rezlutat", rezlutat)

          let data = rezlutat

          let finalni= {}
        data.forEach(post => finalni[post.id]= post)
        console.log(finalni)
       // let finalni= {kljuc: vrijednost: // kljuc se ne smije ponavljati u objektu}


        data = Object.values(finalni)

          console.log("Podaci s backenda", data)
          this.posts= data.map(doc => {
            return {id: doc.id, url: doc.source, email: doc.createdBy, title: doc.title, posted_at: Number(doc.postedAt)}
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