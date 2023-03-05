# Tracking Plan App
This is a sample application for generating tracking plans and their associated events. It consists of a front-end React app and a back-end Node.js app.

## Setting up the database
The application uses PostgreSQL as its database. You can set up PostgreSQL locally or use a cloud-based service such as AWS RDS. Use the following configurations. 
```
PG_USER=postgres
PG_HOST=localhost
PG_DATABASE=tracking_plan
PG_PASSWORD=password
PG_PORT=5432
```

Once you have PostgreSQL running, you can create a new database called tracking_plan and run the following SQL scripts to create the necessary tables:

```
CREATE TABLE tracking_plan (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description VARCHAR,
  is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE event (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description VARCHAR,
  rules VARCHAR NOT NULL,
  is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE tracking_plan_event_mapping (
  id SERIAL PRIMARY KEY,
  tracking_plan_id INTEGER NOT NULL,
  event_id INTEGER NOT NULL,
  is_deleted BOOLEAN DEFAULT false,
  FOREIGN KEY (tracking_plan_id) REFERENCES tracking_plan(id),
  FOREIGN KEY (event_id) REFERENCES event(id)
);
```

## Running the front-end React app
To run the front-end React app, you need to:

Clone the repository from Git: 
`git clone https://github.com/kanishkkatara/tracking-plan-ui.git`
Install dependencies: npm install
Build the app: `npm run build`
Start the app: `npm start`
The app should now be running at `http://localhost:3001`.

## Running the back-end Node.js app
To run the back-end Node.js app, you need to:

Clone the repository from Git: `git clone https://github.com/kanishkkatara/tracking-plan.git`
Install dependencies: `npm install`
Build the app: `npm run build`
Start the app: `npm run start`
Run tests: `npm run test`
The app should now be running at `http://localhost:3000`.

## Environment variables
The back-end Node.js app uses environment variables to configure the database connection and other settings. Change the configurations if not using the default ones.