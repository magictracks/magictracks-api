# Knitting Machine API

> API for the various Knitting Machine project data

---

## API Endpoints

---

See: [API.md](API.md)

---

## Applications details

---

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

## Loading dummy data

To load in dummy data for the application to work with (when we have actual data, we can rather use the latest data dump, but for now let's start with this, updated: 2018-10-22):

Terminal window 1:

```
mongod
```

Terminal window 2:

```
npm start
```

Terminal window 3:

```
# add some resources in /data/resources.json
npm run resources2db

# add some sections in /data/sections.json
npm run sections2db

# add some playlists in /data/playlists.json
npm run playlists2db

# add some tags in /data/tags.json
npm run tags2db
```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

### Developing and writing tests:

TBD

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

**0.1.0**

- Initial release

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
