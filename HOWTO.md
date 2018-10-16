# How to documentation


## generate authentication routes

```
➜  knittingmachine-api git:(master) ✗ feathers generate authentication
? What authentication providers do you want to use? Other PassportJS strategies
not in this list can still be configured manually. Username + Password (Local)
? What is the name of the user (entity) service? users
? What kind of service is it? Mongoose
? What is the database connection string? mongodb://localhost:27017/knittingmach
ine_api
```

## Create services for resources, sections, playlists, and tags

```
➜  knittingmachine-api git:(master) ✗ feathers generate service
? What kind of service is it? Mongoose
? What is the name of the service? resources
? Which path should the service be registered on? /resources
? Does the service require authentication? Yes
```

```
➜  knittingmachine-api git:(master) ✗ feathers generate service
? What kind of service is it? Mongoose
? What is the name of the service? sections
? Which path should the service be registered on? /sections
? Does the service require authentication? Yes
```

```

➜  knittingmachine-api git:(master) ✗ feathers generate service
? What kind of service is it? Mongoose
? What is the name of the service? playlists
? Which path should the service be registered on? /playlists
? Does the service require authentication? Yes
```

```
➜  knittingmachine-api git:(master) ✗ feathers generate service
? What kind of service is it? Mongoose
? What is the name of the service? tags
? Which path should the service be registered on? /tags
? Does the service require authentication? No
```
