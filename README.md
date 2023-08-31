# Deployment

### Vercel

##### UmiJS

```json
// .vercel/project.json
{
  "projectId": "PROJECT_ID",
  "orgId": "ORG_ID",
  "settings": {
    "createdAt": 1694410908518,
    "framework": "umijs",
    "devCommand": "yarn dev:APP_NAME",
    "installCommand": "yarn install",
    "buildCommand": "yarn build:APP_NAME",
    "outputDirectory": "apps/APP_NAME/dist",
    "rootDirectory": null,
    "directoryListing": false,
    "nodeVersion": "NODE_VERSION"
  }
}
// Example
{
  "projectId": "prj_zxM7qloAdWw9kxxvkz25qARJ9fw3",
  "orgId": "IAJZnmPzE0WcVxAUqMDbMFRO",
  "settings": {
    "createdAt": 1694410908518,
    "framework": "umijs",
    "devCommand": "yarn dev:tcns",
    "installCommand": "yarn install",
    "buildCommand": "yarn build:tcns",
    "outputDirectory": "apps/tcns/dist",
    "rootDirectory": null,
    "directoryListing": false,
    "nodeVersion": "16.x"
  }
}
```
