# Knitting Machine API

> API for the various Knitting Machine project data


***
## API Endpoints
***

### Data Heirarchy:


```
-- playlist
  |
  section
    |
    resource
    |
    resource
    |
    resource

```

- **Playlists**:
  - A Playlist is an ordered list of Sections
- **Sections**:
  - A Section is an ordered list of Resources
- **Resources**:
  - A Resource is an individual, tagged and "enriched" hyperlink

- **Tags**:
  - tags are human generated tags for the resources, sections, and playlists to aid in search


#### Playlists

**Properties:**

```
{
  title:"",
  description:"",
  url:"",
  tags:[],
  keywords:[],
  createdBy:"",
  sections:[]
}
```


#### Sections

**Properties:**

```
{
  title:"",
  description:"",
  url:"",
  tags:[],
  keywords:[],
  createdBy:"",
  resources:[]
}
```



#### Resources

**Properties:**

```
{
  title:"",
  description:"",
  url:"",
  tags:[],
  keywords:[],
  submittedBy:[],
  submissionCount: INT,
  difficulty:"",
  imageUrl:""
}

```

<!--
### GET /resources


```
<insert example endpoint here>
```

### GET /sections

```
<insert example endpoint here>
```

### GET /playlists

```
<insert example endpoint here>
``` -->



***
## Applications details
***

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/knittingmachine-api; npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
