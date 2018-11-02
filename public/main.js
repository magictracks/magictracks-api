var app = feathers();
// Connect to a different URL
var restClient = feathers.rest('http://localhost:3030')

// Configure an AJAX library (see below) with that client
app.configure(restClient.fetch(window.fetch));

// Connect to the `http://localhost:3030/resources` service
const resources = app.service('resources');
const sections = app.service('sections');
const playlists = app.service('playlists');



class Auth {
    constructor(){
     
        this.getCredentials = this.getCredentials.bind(this);
    }

    // Retrieve email/password object from the login/signup page
    getCredentials = () => {
        const user = {
        email: document.querySelector('[name="email"]').value,
        password: document.querySelector('[name="password"]').value
        };
    
        return user;
    };
}