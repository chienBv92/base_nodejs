# Database
### Create migration
```shell
npm run typeorm migration:create -- --name=CreateUserTable
```

### Run migration
```shell
npm run typeorm migration:run
```

### Reverts last executed migration
```shell
npm run typeorm migration:revert
```

# Run
### Install package
```shell
npm run i
```
### Develop
```shell
npm run dev
```
### Production
Delete folder dist before build
```shell
npm run prod
```

# Coding style
```shell
npm run lint:fix
```
