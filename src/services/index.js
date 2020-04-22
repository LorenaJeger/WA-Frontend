import axios from 'axios'

//vezan uz konkretni backend
let Service = axios.create({         //metoda koja instancira novu varijablu za komunikaciju s backend-om
    baseURL: 'http://localhost:3000',  //atribut koji kaže gdje se backend nalazi
    timeout: 1000                      //atribut koji kaže da ima 1 sek da svaki poziv prema backend-u uspije
})

//nas objekt za sve pozive oji se ticu Postova
let Posts = {   
    
     async Random(){
        let response= await Service.get('/posts_rand');

        let doc= response.data;

        return{
            id:doc.id,
            url:doc.source,
            email: doc.createdBy,
            title: doc.title,
            posted_at: Number(doc.postedAt)
        };
    }, 
    

    add(post){
        return Service.post("/posts",post);
    },
//jedan objekt za remontirati pa ga direktno vracamo
    async getOne(id) {
        let response = await Service.get(`/posts/${id}`)
        let doc= response.data;
        return{
            id:doc.id,
            url: doc.source,
            email: doc.createdBy,
            title:doc.title,
            posted_at: Number(doc.postedAt)
        };
    },

    async getAll(searchTerm){
        let options= {};

        if(searchTerm){
            options.params={
                _any: searchTerm
            };
        }
    
    //svaki objekt remontirati pa imamo map jer imamo polje
        let response = await Service.get('/posts',options);   //Service.get zove instancu axiosa nad URL-om, dodaj rutu i vraća promise
        return response.data.map(doc => {
            return {
              id: doc._id,
              url: doc.source,
              email: doc.createdBy,
              title:doc.title,
              posted_at: Number(doc.postedAt)
            }; 
        }); 
    }     
    };
    
    



export { Service, Posts }    //eksportamo Service za ručne pozive ili Posts za metode