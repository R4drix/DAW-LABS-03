# Imagen base de Node.js
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar todo el proyecto al contenedor
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto que usa Node
EXPOSE 3000

# Ejecutar el servidor
CMD ["node", "backend/server.js"]