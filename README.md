# Portafolio Web - Carlos Lamas

## 🚀 Descripción
Página web portafolio profesional ultra-moderna para Carlos Lamas, Ingeniero Mecánico especializado en CAD, análisis estructural y mantenimiento industrial. Construida con tecnologías web modernas y diseño responsivo.

## ✨ Características Modernas

### 🎨 Diseño
- **Estilo**: Modern Minimalism con efectos Glassmorphism
- **Paleta de colores**: Sistema dual Light/Dark mode
- **Tipografía**: Poppins (títulos) e Inter (cuerpo)
- **Responsive**: Diseño adaptable móvil-first
- **Animaciones**: Scroll animations, partículas flotantes, efectos hover

### 🌟 Funcionalidades Avanzadas
- **🌙 Dark/Light Mode**: Toggle automático con preferencias guardadas
- **🌍 Multiidioma**: Español e Inglés con persistencia
- **🎭 Partículas Interactivas**: Sistema de partículas con efectos de mouse
- **📱 Navegación Móvil**: Menú hamburguesa animado
- **⚡ Scroll Animations**: Intersection Observer para animaciones suaves
- **🎯 Glassmorphism**: Efectos de vidrio esmerilado y transparencias
- **⌨️ Atajos de Teclado**: Ctrl+D (dark mode), Ctrl+L (idioma), Escape (menú)

### 🖼️ Contenido Visual
- **Imágenes profesionales**: CAD, mantenimiento, planos técnicos
- **Fotos de perfil**: Imágenes profesionales optimizadas
- **Iconografía**: FontAwesome 6.4.0 para consistencia visual
- **Gradientes**: Efectos visuales modernos con CSS

## 📂 Estructura del Proyecto
```
/
├── index.html              # Página principal
├── styles.css              # Estilos principales (1,720 líneas)
├── script.js               # JavaScript moderno (823 líneas)
├── README.md               # Documentación
├── imgs/                   # Imágenes profesionales
│   ├── profile_photo_6.jpg
│   ├── cad_design_1.jpg
│   ├── cad_software_1.jpg
│   ├── maintenance_1.jpg
│   ├── maintenance_2.jpg
│   ├── blueprint_2.jpg
│   └── ...
└── cv/                     # Currículum (para futuras versiones)
```

## 🚀 Instrucciones de Despliegue

### 1. GitHub Pages (Recomendado - Gratuito)

#### Opción A: Repositorio Personal
1. **Crear repositorio en GitHub**
   - Ve a [github.com](https://github.com) y crea una cuenta
   - Clic en "New repository"
   - Nombre: `carlos-lamas-portfolio` o similar
   - Marca "Public" para usar GitHub Pages gratis
   - Clic "Create repository"

2. **Subir archivos**
   ```bash
   # Clonar tu repositorio
   git clone https://github.com/TU-USUARIO/carlos-lamas-portfolio.git
   cd carlos-lamas-portfolio
   
   # Copiar todos los archivos del proyecto aquí
   # (index.html, styles.css, script.js, carpeta imgs/)
   
   # Commit y push
   git add .
   git commit -m "Initial portfolio commit"
   git push origin main
   ```

3. **Activar GitHub Pages**
   - Ve a tu repositorio en GitHub
   - Settings > Pages
   - Source: "Deploy from a branch"
   - Branch: "main" / "root"
   - Clic "Save"
   - Tu sitio estará disponible en: `https://TU-USUARIO.github.io/carlos-lamas-portfolio`

#### Opción B: Página de Usuario (carloslamas.github.io)
1. **Crear repositorio especial**
   - Nombre del repositorio debe ser exactamente: `TU-USUARIO.github.io`
   - Example: Si tu usuario es "carloslamas", el repositorio debe llamarse "carloslamas.github.io"
   - Hacer público y crear README

2. **Subir archivos**
   - Sigue los mismos pasos que arriba

3. **Activar Pages**
   - GitHub automáticamente detectará que es un sitio de usuario
   - Disponible en: `https://carloslamas.github.io`

### 2. Netlify (Recomendado - Fácil)

1. **Crear cuenta**
   - Ve a [netlify.com](https://netlify.com)
   - Regístrate con GitHub, GitLab o email

2. **Subir archivos**
   - **Opción A - Drag & Drop:**
     - Simplemente arrastra la carpeta del proyecto a Netlify
     - Se desplegará automáticamente
   
   - **Opción B - Con Git:**
     - Conectar tu repositorio de GitHub
     - Netlify detectará automáticamente los archivos

3. **Configurar dominio (opcional)**
   - En Site settings > Domain management
   - Puedes usar subdominio gratuito de Netlify
   - O conectar tu propio dominio

4. **URL resultante**
   - Algo como: `https://amazing-newton-123456.netlify.app`
   - Puedes cambiar el nombre en Site settings

### 3. Vercel (Rápido - Ideal para desarrolladores)

1. **Crear cuenta**
   - Ve a [vercel.com](https://vercel.com)
   - Regístrate con GitHub

2. **Importar proyecto**
   - Clic "New Project"
   - Importar desde GitHub
   - Selecciona tu repositorio

3. **Configurar**
   - Framework Preset: "Other"
   - Build Command: (vacío)
   - Output Directory: (vacío)
   - Install Command: (vacío)

4. **Desplegar**
   - Clic "Deploy"
   - URL: `https://tu-proyecto.vercel.app`

### 4. Alternativas Adicionales

#### Surge.sh (Simple - Línea de comandos)
```bash
# Instalar surge
npm install -g surge

# Ir a la carpeta del proyecto
cd carlos-lamas-portfolio

# Desplegar
surge
# Seguir las instrucciones, elegir dominio
```

#### Firebase Hosting (Google)
1. Instalar Firebase CLI: `npm install -g firebase-tools`
2. `firebase login`
3. `firebase init hosting`
4. `firebase deploy`

## 🔧 Configuración Post-Despliegue

### Actualizar Enlaces de Contacto
Después del despliegue, actualiza estos elementos:

1. **Email**: Cambia `carlos.lamas@email.com` por tu email real
2. **Teléfono**: Actualiza `+34 600 000 000` por tu número
3. **LinkedIn**: Verifica que el enlace de LinkedIn sea correcto
4. **CV**: Sube tu CV a una carpeta `cv/` y actualiza el enlace de descarga

### Personalización Adicional

#### Cambiar Colores
Edita las variables CSS en `styles.css`:
```css
:root {
    --primary-500: #TU-COLOR;    /* Color principal */
    --primary-700: #TU-COLOR-OSCURO;  /* Color hover */
}
```

#### Cambiar Fuentes
Actualiza en `<head>` de `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=TU-FUENTE" rel="stylesheet">
```

#### Añadir Más Secciones
Copia la estructura de una sección existente y modifica:
1. Añadir el contenido en `index.html`
2. Estilos en `styles.css`
3. Funcionalidad en `script.js` (si es necesario)

### SEO y Optimización

#### Meta Tags Básicos
El HTML ya incluye:
- Open Graph para redes sociales
- Meta descripción optimizada
- Twitter Cards
- Schema.org markup (preparado)

#### Añadir Analytics
```html
<!-- Google Analytics (opcional) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🎯 Recomendaciones de Despliegue

### Para Principiantes: GitHub Pages
- ✅ Completamente gratuito
- ✅ Fácil de configurar
- ✅ Integración con GitHub
- ✅ Certificados SSL automáticos
- ❌ Solo sitios estáticos

### Para Facilidad: Netlify
- ✅ Despliegue súper rápido
- ✅ Drag & drop simple
- ✅ Formularios incluidos
- ✅ CDN global automático
- ✅ Branch previews

### Para Velocidad: Vercel
- ✅ Despliegue más rápido
- ✅ Optimizaciones automáticas
- ✅ Edge functions (futuro)
- ✅ Excelente para desarrolladores
- ❌ Menos features para principiantes

## 📱 Características Responsivas

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1200px  
- **Desktop**: > 1200px

### Optimizaciones Móviles
- Menú hamburguesa animado
- Touch-friendly buttons
- Imágenes optimizadas para carga rápida
- Scroll horizontal eliminado

## 🎨 Personalización de Colores

### Light Mode
- Background: #F8F9FA
- Primary: #0057B7
- Surface: #FFFFFF
- Text: #212529

### Dark Mode
- Background: #0F172A
- Primary: #3B82F6
- Surface: #1E293B
- Text: #F8FAFC

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Variables, Grid, Flexbox, Animations
- **JavaScript ES6+**: Módulos, Async/Await, Classes
- **Canvas API**: Sistema de partículas
- **Intersection Observer**: Scroll animations
- **LocalStorage**: Persistencia de preferencias
- **FontAwesome**: Iconografía
- **Google Fonts**: Tipografía web

## 📞 Soporte y Contacto

Si necesitas ayuda con el despliegue:

1. **GitHub Issues**: Si usas GitHub, abre un issue
2. **Email**: carlos.lamas@email.com
3. **LinkedIn**: [Carlos Lamas](https://linkedin.com/in/carlos-lamas-a75551150/)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Eres libre de usar, modificar y distribuir este código para proyectos personales y comerciales.

---

**¡Tu portafolio está listo para impresionar a reclutadores y clientes!** 🚀

*Creado por MiniMax Agent - Portafolio profesional moderno y multiidioma*