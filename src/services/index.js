import axios from 'axios'

// instanca axios-a za potrebe Fipugram backenda 

let Service = axios.create({    
    baseURL: 'http://localhost:3000/',    
    timeout: 1000



})
// naš objekt za sve pozive koji se dotiču `Post`ova 
let Posts = {    
    add(post) {        
        return Service.post('/posts', post)    
    },    
    async getAll(searchTerm) {
        let response = await Service.get(`/posts?title=${searchTerm}`);
        let posts = response.data.map(doc => {
          return {
            id: doc.id,
            url: doc.source,
            email: doc.createdBy,
            title: doc.title,
            posted_at: Number(doc.postedAt)
          };
        });
    
        return posts;
      }
    };


export { Service, Posts } // exportamo Service za ručne pozive ili Posts za metode.

