---

## Data Heirarchy:

---

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

-- tags
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

---

## API Endpoints

---

## Resources

API endpoints for the resources database

## `/resources/all`

### GET: `/resources/all`

- returns an ARRAY of the sections

```

```

## `/resources/id/:id`

### GET: `/resources/id/:id`

- finds the data by id and returns it

```

```

### PATCH: `/resources/id/:id`

- finds the data by id and returns the updated data

```

```

### DELETE: `/resources/id/:id`

- finds the data by id and returns "resource removed" when it has been removed

```

```

## Sections

API endpoints for the sections database

## `/sections`

## `/sections/all`

### GET: `/sections/all`

- returns an array of all the sections

```

```

## `/sections/id/:id`

### GET: `/sections/id/:id`

- returns a JSON object of the section with the specified ObjectId in the db

```

```

### PATCH: `/sections/id/:id`

- returns a json of the updated values.
- NOTE: if you want to $push or remove values from an array, see:
  - /sections/id/:id/appendOne/:property/
  - /sections/id/:id/removeOne/:property/

```

```

### DELETE: `/sections/id/:id`

- - using the id provided, remove the specified section from the database
- sends "section removed" in a {} as as response

```

```

## `/sections/id/:id/appendOne/:property`

### PATCH: `/sections/id/:id/appendOne/:property`

- using the property specified in the URL, push one value from the payload to that array


## `/sections/id/:id/removeOne/:property`

### PATCH: `/sections/id/:id/removeOne/:property`

- using the property specified in the URL, pull the value specified from that array


## `/sections/addJSON`

### create: `/sections/addJSON`

- add a json object to the sections DB, and interatively add in the resources that are part of it


---
## Playlists

## `/playlists/addJSON`

### create: `/playlists/addJSON`

- add a json object to the playlist DB, and interatively add in the sections and  resources that are part of it


---

## Tags

API endpoints for the tags database

## `/tags/all`

### GET: `/tags/all`

- returns an ARRAY of the sections

```

```

## `/resources/id/:id`

### GET: `/tags/id/:id`

- finds the data by id and returns it

```

```

### PATCH: `/tags/id/:id`

- finds the data by id and returns the updated data

```

```

### DELETE: `/tags/id/:id`

- finds the data by id and returns "tag removed" when it has been removed

```

```
