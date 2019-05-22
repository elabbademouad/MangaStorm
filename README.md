# MangaStorm
An open source project that features an hybrid app for arabic Manga reading, and an API Layer for data provision, and a scrapping tool.

# Screenshots

<img src="https://drive.google.com/uc?export=view&id=1euQoFL--RWjDNFa9zV04oZZwlsf73p6s" width="200px" style="display: inline;"/> <img src="https://drive.google.com/uc?export=view&id=1AxQVYh7ym60q6rSMsmM9elU8tFT6Oi--" width="200px" style="display: inline;"/> <img src="https://drive.google.com/uc?export=view&id=1_49rJYXDt-TsFT1THTufwaAHDHLNFKee" width="200px" style="display: inline;"/> <img src="https://drive.google.com/uc?export=view&id=1XeFO4doF7B4texWJMFogs8j2-3qdOzLn" width="200px" style="display: inline;"/> <img src="https://drive.google.com/uc?export=view&id=1qFVU0bhq-IN6E8PpLUxYdKTcM9uAkHtp" width="200px" style="display: inline;"/> <img src="https://drive.google.com/uc?export=view&id=1jeSswFlPeLpYXjk-x3rsts5SQqjFrnm5" width="200px" style="display: inline;"/> 

# Software Design:
<img src="https://drive.google.com/uc?export=view&id=1JYrUA7BuMRsHunGbevNZQXuWwE_zQpaL" width="600px"/> 

* The presentation layer (WEB, Mobile) depends on RESTAPI layer.
* The Application (business) Layer is totally independent of other layers and frameworks.
* The Infrastructure Layer provides implementations for the Application needs.
* The RESTAPI Layer depends on Application Layer and the Infrastructure Layer.
* The DataScraping Tool depends on  the Infrastructure Layer.

## Layers
### Application
This layer developed using dotnet core class library. It represents the application business logic and contains :
* Repository interfaces (implemented in Infrastructure layer)
* Entities
* Exceptions
* Services (injected in REST API layer)
* Validations 
### Infrastructure
This layer represents the data access layer developed using dotnet core class library. It contains the implementation of Application layer's interfaces

### Prensentation
#### Mobile
This layer represents the mobile presentation developed using Ionic
#### WEB
This layer represents the WEB presentation developed using Angular
### DataScraping
This tool is for scraping data from other website and it's a console application developed using dotnet core.
Later, it will be used by REST API layer in order to automate fetching new Manga based on user recommendation
# Installation
## Prerequisites

Install the following, before starting : 

* [dotnet core 2.2](https://dotnet.microsoft.com/download)
* [NodeJS](https://nodejs.org)
* [MongoDB](https://www.mongodb.com/download-center/community)

## Backend

To install backend project dependencies, point to RESTAPI folder:

```
cd [project-folder]/02-API/RestApi
```

then run :

```
dotnet restore
``` 

The backend is now ready to be launched via
```
dotnet run
```
## Frontend
### Mobile

To install frontend project dependencies, point to 01-Presentation/Mobile/ folder:

```
cd [project-folder]/01-Presentation/Mobile/
```
then run :
```
npm install
```
The mobile is now ready to be launched via :
```
ionic serve
```
