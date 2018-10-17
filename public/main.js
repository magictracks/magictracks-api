var app = feathers();
// Connect to a different URL
var restClient = feathers.rest('http://localhost:3030')

// Configure an AJAX library (see below) with that client
app.configure(restClient.fetch(window.fetch));

// Connect to the `http://localhost:3030/resources` service
// const resources = app.service('resources');
// const sections = app.service('sections');
const playlists = app.service('playlists');


/**
 * RESOURCE API CALLS
 */
class ResourcesAPI {
  constructor(){
    this.resources = app.service('resources');
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.patch = this.patch.bind(this);
  }

  /**
   * findAll()
   * returns all the resources
   */
   async findAll(){
     try{
       let response = await this.resources.find({});
       return response;
     } catch(err){
       return err;
     }
  }

  /**
   * findById()
   * find 1 resource by the id
   * { query: { status: 'read', user: '10' } }
   */
  async findById(id){
    try{
      let response = await this.resources.find({
        query:{
          _id:id
        }
      });
      return response;
    } catch(err){
      return err
    }
  }

  /**
   * create()
   * find 1 resource by the id
   * { query: { status: 'read', user: '10' } }
   */
  async create(payload){
    try{
      let response = await this.resources.create(payload);
      return response;
    } catch(err){
      return err
    }
  }

  /**
   * findById()
   * find 1 resource by the id
   * { query: { status: 'read', user: '10' } }
   */
  async deleteById(id){
    try{
      let response = await this.resources.delete({
        query:{
          _id:id
        }
      });
      return response;
    } catch(err){
      return err
    }
  }

  /**
   * findById()
   * find 1 resource by the id
   * { query: { status: 'read', user: '10' } }
   */
  async patch(id, payload){
    try{
      let response = await this.resources.patch(id, payload);
      return response;
    } catch(err){
      return err
    }
  }


}


class SectionsAPI{
  constructor(){

    this.sections = app.service('sections');
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.patch = this.patch.bind(this);
  }


  /**
   * findAll()
   * returns all the sections
   */
   async findAll(){
     try{
       let response = await this.sections.find({});
       return response;
     } catch(err){
       return err;
     }
  }

  /**
   * findById()
   * find 1 section by the id
   * { query: { status: 'read', user: '10' } }
   */
  async findById(id){
    try{
      let response = await this.sections.find({
        query:{
          _id:id
        }
      });
      return response;
    } catch(err){
      return err
    }
  }

  /**
   * create()
   * create 1 section
   * { query: { status: 'read', user: '10' } }
   */
  async create(payload){
    try{
      let response = await this.sections.create(payload);
      return response;
    } catch(err){
      return err
    }
  }

  /**
   * deleteById()
   * find 1 section by the id
   * { query: { status: 'read', user: '10' } }
   */
  async deleteById(id){
    try{
      let response = await this.sections.delete({
        query:{
          _id:id
        }
      });
      return response;
    } catch(err){
      return err
    }
  }

  /**
   * patch()
   * find 1 section by the id
   * { query: { status: 'read', user: '10' } }
   */
  async patch(id, payload){
    try{
      let response = await this.sections.patch(id, payload);
      return response;
    } catch(err){
      return err
    }
  }


}

const resourcesAPI = new ResourcesAPI();
const sectionsAPI = new SectionsAPI();



// resources-findAll
document.querySelector("#resources-findAll").addEventListener("click", async function(e){
  let result = await resourcesAPI.findAll();

  document.querySelector("#resources-findAll-result").innerHTML = JSON.stringify(result.data);
})

// resources-findById
document.querySelector("#resources-findById").addEventListener("click", async function(e){
  let result = await resourcesAPI.findById("5bc507165686ad95c5929953");
  document.querySelector("#resources-findbyId-result").innerHTML = JSON.stringify(result.data);
})



document.querySelector("#resources-create").addEventListener("click", async function(e){
  let dummyResourceData = {
    title:"Test from API, Random Number: " + Math.random()*100,
    description: "Test from API, Random Number: " + Math.random()*100,
    url:"DELETEME",
    keywords: ["TEST", "TEST"],
    difficulty:["BEGINNER"],
    imageUrl:"https://raw.githubusercontent.com/knittingmachine/knittingmachine-docs/master/docs/concept/illustrations/img/frustrated-student.png"
  }

  let result = await resourcesAPI.create(dummyResourceData);
  document.querySelector("#resources-create-result").innerHTML = JSON.stringify(result);
})


document.querySelector("#resources-create-form").addEventListener("submit", async function(e){
  e.preventDefault();

  console.log(e.target);
  let form = new FormData(e.target)

  let dummyResourceData = {
    title: form.get("title"),
    description: form.get("description"),
    url: form.get("url"),
    keywords:["TEST", "AUTOMATED"],
    difficulty: form.get("difficulty"),
    imageUrl: form.get("imageUrl")
  }

  let result = await resourcesAPI.create(dummyResourceData);
  document.querySelector("#resources-create-form-result").innerHTML = JSON.stringify(result);
})

// delete by id
document.querySelector("#resources-deleteById").addEventListener("click", async function(e){
  let result = await resourcesAPI.deleteById("5bc507165686ad95c5929953");
  document.querySelector("#resources-deleteById-result").innerHTML = JSON.stringify(result);
})

document.querySelector("#resources-patch").addEventListener("click", async function(e){
  let result = await resourcesAPI.patch("5bc507165686ad95c5929953", {title:"woo hoo! super mega bueno"});
  document.querySelector("#resources-patch-result").innerHTML = JSON.stringify(result);
})


// resourceAPI.patch("5bc74501ac401e06a53fe5c7",).then((data, err)=>{
//   console.log(data);
// });
