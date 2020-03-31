import axios from 'axios'

//vezan uz konkretni backend
let Service = axios.create({         //metoda koja instancira novu varijablu za komunikaciju s backend-om
    baseURL: 'http://localhost:3000',  //atribut koji kaže gdje se backend nalazi
    timeout: 1000                      //atribut koji kaže da ima 1 sek da svaki poziv prema backend-u uspije
})

//vezani uz pojedine rute
let Posts = {             //napravili instancu koja će korisiti Service, unutra spremamo metode za dohvat postova
    async create(data) {
        let serverData = {
            createdBy: data.user,
            postedAt: data.posted_at,
            source: data.url,
            title: data.title,
        };
        console.log("Spremam na backend", data)

        await Service.post("/posts", serverData)

        return
    },
    async getAll(searchTerm) {      //ovo će biti zamjena za fetchPosts u Posts.vue(služi za dohvat i pretragu)
        let response = await Service.get(`/posts?_any=${searchTerm}`)   //Service.get zove instancu axiosa nad URL-om, dodaj rutu i vraća promise
        let posts = response.data.map(doc => {
            return {
              id: doc.id,
              url: doc.source,
              email: doc.createdBy,
              title:doc.title,
              posted_at: Number(doc.postedAt)
            }; 
        }); 
        return posts      
    }
    
    

}

export { Service, Posts }    //eksportamo Service za ručne pozive ili Posts za metode