# Fase 1: Construcción del Frontend (Angular)
FROM node:18 AS build-frontend

# Establece el directorio de trabajo
WORKDIR /app/frontend

# Copia los archivos de configuración del frontend
COPY Frontend/package*.json ./

# Instala las dependencias del frontend
RUN npm install

# Copia el código del frontend y compílalo
COPY Frontend/ .
RUN npm run build -- --output-path=dist

# Fase 2: Construcción del Backend y Servidor Final
FROM node:22.11.0

# Establece el directorio de trabajo para el backend
WORKDIR /app

# Copia los archivos de configuración del backend
COPY Backend/package*.json ./

# Instala las dependencias del backend
RUN npm install

# Copia el código del backend
COPY Backend/ .

# Copia los archivos generados del frontend al directorio público del backend
# Esto asume que tu backend está configurado para servir archivos estáticos desde una carpeta como "public"
COPY --from=build-frontend /app/frontend/dist ./public

# Expone el puerto que usa la aplicación
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "index.js"]
