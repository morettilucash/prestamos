# API RESTful Para prestamistas

Instalar Nodemon Global
> npm install -g nodemon

# Migracion de tablas: 
## Generar Script SQL:

Windows: 
> ts-node node_modules\typeorm\cli.js migration:generate -n NombreMigracion

> Linux:
> ts-node node_modules/typeorm/cli.js migration:generate -n NombreMigracion


Ejecutar Script:
> Windows:
> ts-node node_modules\typeorm\cli.js migration:run

> Linux:
> ts-node node_modules/typeorm/cli.js migration:run
 
Arrancar Proyecto
> nodemon exec