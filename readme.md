
The idea here is to provide an out of the box CMS style schema and data which can help customers get started with Directus.

  

Currently using Bryant's CMS demo schema (agency os) as a template.

  

There are some outstanding issues with the schema endpoints.

**Current Limitations:**
1. This is untested against large volumes of data.
2. It won't work against collections where "Allow NULL values" is disabled.
3. if your source Directus system uses automatics incremental IDs, you will need to reset the auto incrementer in your DB.
4. When loading data, your destination Directus system should be blank to start with.
  

**Instructions:**

  

Please ensure both your API keys have Admin access.

  

**Extracting from source:**

  

1. Rename .env.example to .env and update your values.

2. Run "npm run extract" to extract everything from the source system.

3. All the data will be stored in the 'source' folder.

  

**Loading to destination:**

  

1. Currently, it's most reliable if the destinateion system is fresh / blank

2. Run "npm run load"

  

**Current state:**

  

1. Currently untested against larger data sets.

2. No error handling

3. Legacy files need to be cleaned up / removed

4. Need some enhancement around copying project settings.