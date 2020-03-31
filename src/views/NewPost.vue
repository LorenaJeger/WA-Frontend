<template>
  <form @submit.prevent="postImage" class="mb-5">
    <input type="text" v-model="postTitle"/>
    <br/><br/>
    <croppa :width="400" :height="400" v-model="imageData"></croppa>
    <button type="submit" class="btn btn-primary ml-2">Post image</button>
    
  </form>
</template>

<script>
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store.js";
import { Posts } from '@/services'

export default {
  data() {
    return store
  },
  name: "newpost",
  methods: {

      postImage() {
      
      this.imageData.generateBlob(blobData => {
        if (blobData != null) {
          // ako koristimo "/" u nazivu slike, Storage fino napravi direktorij.
          // Konkretno u ovom primjeru imat ćemo direktorij nazvan po mailu korisnika.
          // Slika će biti nazvana po trenutnom vremenu kako bi imali jedinstveni naziv slike.
          let imageName = this.userEmail + "/" + Date.now() + ".png";
          
          storage
            .ref(imageName)
            .put(blobData)
            .then(result => {
              result.ref.getDownloadURL()
                .then(url => {

              let post= {
                user:this.userEmail,
                posted_at:Date.now(),
                url: url,
                title:this.postTitle
              }
              
                Posts.create(post)
                .then(()=> {

                 this.$router.push({name:"posts"})

                })
                
                })
                .catch(e=> {
                  console.error(e)
                })
            })
            .catch(e => {
              console.error(e)
            })
        }
      }); // da... zatvaranje zagrada nakon ovoga noćna je mora!
    }
  }
};
</script>

<style lang="scss">

.card-body {
  padding: 0px;
}

img:hover {
  cursor: pointer;
}

.btn-post {
  width: 200px;
}

.croppa-container {
  border: 3px dashed gray;
  width: 400px;
  display: block;
  margin-bottom: 10px;
}
</style>