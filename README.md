# MoioManagement

This is the description of how to setup development environment for the Moio-managemet

## GIT branches
* master: represents the production branch
* develop: represents the testing branch where code is tried and tested before production

## Development Environment
### Pre-Requisites
* git
* nodejs
* npm
* angular-cli

Update your npm: `$ npm i -g npm`

Install the Angular CLI globally: `$ npm install -g @angular/cli`

Clone the repo to the host that you want to run from AM-Gitlab. Get the URL and the credentials, from the PO or the CTO (Alex Rückert: alexander.rueckert@appsolute-mobility.com)

`$ git clone [GITLAB URL]`

This will create a new folder `moio_management`

cd into the folder and checkout the develop-branch

`$ cd moio_management`

`$ git checkout develop` (or use your IDE to checkout develop)

Next, install NPM-packages:

`$ npm install`

That's it. You are now ready to start coding and run the moio_management

### Run the app locally
To run the app locally, start a server with:

`$ npm start`

This will build the app and start a server on localhost:4200. For the other environment commands you can run, check under the `"scripts"` in the `package.json` file:

```json
"scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "build:prod": "ng build --prod",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "build:stage": "ng build --configuration=stage && node ./tasks/deploy-stage.js"
  },

```

Check this against the `angular.json` under `"configurations"` and `environment.*.ts` files in the `/environments` for the correct API-url which you want to use in your local machine.

### Creating your own environment
To work with a local env-file copy the `environment.ts` and give the copied file
a unique name, e.g. `environment.calvin.ts`. Make sure, the content is the same as
in the environment.ts.

Next open the angular.json in the root-dir of the project.
Look for the section 'configurations'.
Create a new configuration and name it uniquely. Take note of the name
as we need it later. At least your new configuration should look like the following:

```json
"calvin": {
  "fileReplacements": [
      {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.calvin.ts"
      }
  ]
}
```
Note the name of the configuration.

Finally open `package.json` and add a new run configuration in the scripts-section:
```
"start:calvin": "ng serve --host 0.0.0.0 --port 4200 --configuration=calvin",
```

If you want to start the application with your environment enabled run this command:

`$ npm run start:calvin`

## Deploy the App to the Stage-Server
### Building dependencies
Build dependencies are:
* nodejs / npm
* angular-cli installed globally
* the cloned repo
* all packages from the package.json installed in the project folder

### Building
So if you want to build you need to setup your local dev-environment.

We use the npm-SCP2 package to connect to the remote server via SCP and upload
the build-package to the destination.

NOTE: The SCP command will not remove files on the destination, it will just
overwrite existing files. It might be a good idea to clean up the remote directory
with a FTP-program from time to time.

To build and upload the app run:

`$ npm run build:stage`

to build and upload the content of `dist` folder in project-dir.

If something changes for the remote server or the API-url look into the files:
* tasks/deploy-stage.js
* src/environments/environment.stage.ts

and adjust the files to your needs.
