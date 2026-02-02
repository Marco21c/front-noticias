# Frontend - Sitio Web de Noticias

Frontend de un sitio web de noticias desarrollado con React, TypeScript y Tailwind CSS. Este repositorio contiene la interfaz de usuario del proyecto, proporcionando una experiencia moderna y responsiva para la visualización y búsqueda de noticias.

## 📋 Descripción

Este proyecto es la interfaz de usuario de un sistema de gestión de noticias. Permite a los usuarios navegar, buscar y visualizar noticias de manera intuitiva. La aplicación está construida con tecnologías modernas y sigue las mejores prácticas de desarrollo frontend.

### Características principales

- 🎨 Interfaz moderna y responsiva con Tailwind CSS
- 🔍 Búsqueda de noticias en tiempo real
- 📱 Diseño adaptable a diferentes dispositivos
- ⚡ Rendimiento optimizado con Vite
- 🔄 Gestión de estado con React Query
- 🧭 Navegación con React Router
- 📅 Formateo de fechas con dayjs

## 🚀 Instalación

### Requisitos previos

Asegúrate de tener instalado en tu sistema:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn** o **pnpm** (gestor de paquetes)

### Pasos de instalación

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd front-noticias
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_DEV=true
VITE_BACKEND_URL=http://localhost:3000/api
VITE_URL_HOST=https://api.produccion.com
```

**Nota:** 
- `VITE_DEV`: Indica si estás en modo desarrollo (`true`) o producción (`false`)
- `VITE_BACKEND_URL`: URL del backend para desarrollo
- `VITE_URL_HOST`: URL del backend para producción

4. **Iniciar el servidor de desarrollo**

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

## 💻 Uso

### Comandos disponibles

- **`npm run dev`**: Inicia el servidor de desarrollo con hot-reload
- **`npm run build`**: Compila el proyecto para producción
- **`npm run preview`**: Previsualiza la build de producción localmente
- **`npm run lint`**: Ejecuta el linter para verificar el código

### Desarrollo local

Una vez instaladas las dependencias y configuradas las variables de entorno:

1. Ejecuta `npm run dev` para iniciar el servidor de desarrollo
2. Abre tu navegador en la URL que Vite indique (generalmente `http://localhost:5173`)
3. Los cambios se reflejarán automáticamente gracias al hot-reload

### Estructura del proyecto

```
front-noticias/
├── src/
│   ├── components/        # Componentes reutilizables
│   │   └── ui/           # Componentes de UI base
│   ├── hooks/            # Custom hooks
│   ├── interfaces/       # Definiciones de tipos TypeScript
│   ├── lib/              # Utilidades y configuraciones
│   ├── mocks/            # Datos de prueba
│   ├── pages/            # Páginas y componentes de página
│   │   └── components/   # Componentes específicos de páginas
|   |   └── panel/        # Componentes para CRUD de noticias y categorias  
│   ├── services/         # Servicios de API
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Punto de entrada
├── public/               # Archivos estáticos
├── package.json          # Dependencias y scripts
└── vite.config.ts        # Configuración de Vite
```

### Desarrollo

1. El proyecto utiliza **TypeScript** para tipado estático
2. Los estilos se manejan con **Tailwind CSS**
3. Las peticiones HTTP se realizan mediante **Axios** configurado en `src/lib/axios.ts`
4. El estado del servidor se gestiona con **React Query** (`@tanstack/react-query`)
5. El enrutamiento se maneja con **React Router DOM**

### Componentes principales

- **Navbar**: Barra de navegación principal
- **NewsCard**: Tarjeta para mostrar noticias individuales
- **NewsList**: Lista de noticias
- **SearchBar**: Barra de búsqueda
- **Footer**: Pie de página
- **PanelUser**: Panel de control para crud de Noticias
- **Register**: Registro de Usuarios
- **Login**: Login de Usuarios
- **NewsDetail**: Detalles de una noticia

## 🛠️ Tecnologías utilizadas

### Core

- **React** ^19.2.0 - Biblioteca de UI
- **TypeScript** ~5.9.3 - Tipado estático
- **Vite** ^7.2.4 - Build tool y dev server

### Estilos

- **Tailwind CSS** ^3.4.19 - Framework de CSS utility-first
- **tailwindcss-animate** ^1.0.7 - Animaciones para Tailwind
- **PostCSS** ^8.5.6 - Procesador de CSS

### Estado y Datos

- **@tanstack/react-query** ^5.90.17 - Gestión de estado del servidor
- **axios** ^1.13.2 - Cliente HTTP

### Routing

- **react-router-dom** ^7.12.0 - Enrutamiento

## 📝 Estado del proyecto

**En desarrollo** 🚧

Actualmente el proyecto cuenta con:

- ✅ Creación del proyecto base
- ✅ Estructura inicial de carpetas
- ✅ Implementación del Navbar
- ✅ Implementación de Home
- ✅ Configuración inicial del entorno de desarrollo
- ✅ Configuración de variables de entorno y axios
- ✅ Creación e implementación del servicio get News
- ✅ Sistema de routing básico
- ✅ Componentes UI reutilizables
- ✅ Configuración de deploy en Vercel
- ✅ Crud de noticias
- ✅ Visualizacion de noticia.
- ✅ Login de Usuarios.
- ✅ Registro de Nuevo Usuario.
- ✅ Uso de context para autenticaciones.




## 🚢 Deploy

### Deploy en Vercel

Este proyecto está configurado para desplegarse fácilmente en Vercel.

#### Opción 1: Deploy mediante CLI de Vercel

1. **Instala Vercel CLI** (si no lo tienes instalado):

```bash
npm i -g vercel
```

2. **Inicia sesión en Vercel**:

```bash
vercel login
```

3. **Despliega el proyecto**:

```bash
vercel
```

4. **Para producción**:

```bash
vercel --prod
```

#### Opción 2: Deploy mediante GitHub

1. Conecta tu repositorio de GitHub con Vercel
2. Vercel detectará automáticamente que es un proyecto Vite
3. Configura las variables de entorno en el dashboard de Vercel:
   - `VITE_DEV` = `false` (para producción)
   - `VITE_BACKEND_URL` = URL de tu backend de desarrollo (opcional)
   - `VITE_URL_HOST` = URL de tu backend de producción

#### Configuración de variables de entorno en Vercel

1. Ve a tu proyecto en el dashboard de Vercel
2. Navega a **Settings** → **Environment Variables**
3. Agrega las siguientes variables:
   - `VITE_DEV`: `false` (para producción)
   - `VITE_URL_HOST`: URL de tu API de producción
   - `VITE_BACKEND_URL`: URL de tu API de desarrollo (opcional)

**Nota:** El archivo `vercel.json` ya está configurado para manejar las rutas de React Router correctamente.

## 🤝 Contribución

Este proyecto está en desarrollo activo. Si deseas contribuir:

1. Haz un fork del repositorio
2. Crea una rama desde `main` para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios
4. Asegúrate de que el código pase el linter (`npm run lint`)
5. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
6. Push a la rama (`git push origin feature/nueva-funcionalidad`)
7. Abre un Pull Request con una descripción clara de los cambios

### Guías de contribución

- Sigue las convenciones de código existentes
- Asegúrate de que tu código esté tipado correctamente con TypeScript
- Escribe código limpio y legible
- Agrega comentarios cuando sea necesario

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

La Licencia MIT es una licencia de software libre permisiva que permite el uso, copia, modificación, fusión, publicación, distribución, sublicencia y/o venta de copias del software, siempre y cuando se incluya el aviso de copyright y la notificación de permiso en todas las copias o partes sustanciales del software.

Ver el archivo `LICENSE` en la raíz del proyecto para más detalles.

## 👥 Autores

Este proyecto fue desarrollado por:

- **Marcos Condori** - [GitHub](https://github.com/Marco21c)
- **Ezequiel Pacheco** - [GitHub](https://github.com/EzePacheco)
- **Andres Chaile** - [GitHub](https://github.com/andres777c)
- **Leonardo Alcedo** - [GitHub](https://github.com/leo99902)

---

**Nota:** Este proyecto está en constante desarrollo. Si encuentras algún problema o tienes sugerencias, por favor abre un issue en el repositorio.