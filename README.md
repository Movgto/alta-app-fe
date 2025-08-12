# Alta App - Frontend

## 📋 Descripción del Proyecto

**Alta App** es una aplicación web moderna para la gestión integral de clientes empresariales. Permite registrar, visualizar, editar y administrar información detallada de clientes, incluyendo documentos digitales como contratos, identificaciones y archivos corporativos.

### 🎯 Objetivo

Proporcionar una plataforma intuitiva y eficiente para empresas que necesitan administrar información de clientes de manera centralizada, con capacidades de almacenamiento de documentos y gestión de datos empresariales.

## ✨ Características Principales

### 🏢 Gestión de Clientes
- **Registro completo de clientes** con información empresarial
- **Validación de RFC** y datos fiscales
- **Información de contacto** (teléfono, email, representante legal)
- **Edición y actualización** de datos existentes

### 📄 Gestión de Documentos
- **Subida de archivos** (PDF, imágenes, documentos Office)
- **Visualizador integrado** para PDFs e imágenes
- **Almacenamiento seguro** en formato base64
- **Descarga de documentos** originales

### 🎨 Interfaz de Usuario
- **Diseño responsivo** para escritorio y móviles
- **Material Design** con Angular Material
- **Iconografía moderna** con Heroicons
- **Experiencia de usuario optimizada**

### 🔧 Funcionalidades Técnicas
- **Validación de formularios** en tiempo real
- **Manejo de estados** con RxJS
- **Lazy loading** para optimización
- **Gestión de errores** y notificaciones

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular 18+** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Angular Material** - Componentes UI
- **Tailwind CSS** - Utilidades de estilo
- **RxJS** - Programación reactiva
- **ng-icons** - Iconografía

### Herramientas de Desarrollo
- **Angular CLI** - Herramientas de desarrollo
- **Node.js & npm** - Gestión de dependencias
- **ESLint** - Linting de código
- **Prettier** - Formateo de código

## 🚀 Información de despliegue
El despliegue de esta aplicación fué realizado utilizando un conjunto de servicios en la nube de Google Cloud, Firebase y AWS:
- Este proyecto frontend fúe desplegado con `Firebase Hosting` y `Firebase Functions` para las funciones de SSR y la redirección de llamadas https hacia el servidor de la API.
- El backend ha sido desplegado con otro servicio de Google: `App Engine` conectado a una base de datos `MySQL` que a su vez es proveida por un servidor web con el servicio de `Amazon Web Services`: `Aurora and RDS`.

Puedes ver este proyecto en acción [aquí](https://alta-app-firebase.web.app).

## ⚙️ Instalación y Configuración

### Prerrequisitos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [npm](https://www.npmjs.com/) (viene con Node.js)
- [Angular CLI](https://angular.io/cli)

```bash
npm install -g @angular/cli
```

### Instalación

1. **Clonar el repositorio:**
    ```bash
    git clone https://github.com/movgto/alta-app-fe.git
    cd alta-app-fe
    ```

2. **Instalar dependencias:**
    ```bash
    npm install
    ```

### Desarrollo

**Ejecutar servidor de desarrollo:**
```bash
ng serve
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente al hacer cambios.

**Ejecutar tests:**
```bash
ng test
```

**Ejecutar linting:**
```bash
ng lint
```

### Construcción para Producción

```bash
ng build --configuration=production
```

Los archivos generados se almacenarán en el directorio `dist/`.

## 🔗 Funcionalidades por Módulo

### 🏠 Página Principal (Home)
- Lista de clientes registrados
- Acciones rápidas (ver, editar, eliminar)

### ➕ Registro de Clientes
- Formulario completo de registro
- Validación en tiempo real
- Subida de documentos
- Confirmación de registro

### 👁️ Visualización y Edición
- Vista detallada del cliente
- Edición de información
- Visualizador de documentos integrado
- Actualización de archivos

### 📎 Gestión de Documentos
- Visor de PDFs embebido
- Soporte para imágenes
- Descarga de archivos originales
- Validación de tipos de archivo

## 🌐 Integración con Backend

La aplicación está diseñada para integrarse con una API REST hecha en **Python** que proporciona:

- **GET /clients** - Lista de clientes
- **POST /clients** - Registro de nuevos clientes
- **GET /clients/:id** - Obtener cliente específico
- **PUT /clients/:id** - Actualizar cliente
- **DELETE /clients/:id** - Eliminar cliente

### Configuración de API

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Convenciones de Código

- Usar **TypeScript** estricto
- Seguir las **guías de estilo de Angular**
- Implementar **componentes reutilizables**
- Documentar **interfaces y servicios**
- Usar **naming conventions** descriptivos

## 🐛 Reporte de Bugs

Para reportar bugs o solicitar nuevas funcionalidades, por favor abre un [issue](https://github.com/tu-usuario/alta-app-fe/issues) en el repositorio.

## 📞 Soporte

Si necesitas ayuda o tienes preguntas sobre el proyecto:

- 📧 Email: maromvz@gmail.com

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

**Desarrollado con ❤️ usando Angular y TypeScript**