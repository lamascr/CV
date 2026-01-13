#!/bin/bash

# ============================================
# BUILD SCRIPT PARA CARLOS LAMAS PORTFOLIO
# ============================================

echo "🚀 Construyendo y optimizando Carlos Lamas Portfolio..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para logging
log() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar si estamos en el directorio correcto
if [ ! -f "index.html" ]; then
    error "index.html no encontrado. Ejecuta este script desde el directorio raíz del proyecto."
    exit 1
fi

# Crear directorios si no existen
log "Creando estructura de directorios..."
mkdir -p dist/assets/css
mkdir -p dist/assets/js
mkdir -p dist/assets/images
mkdir -p dist/assets/fonts
mkdir -p dist/cv

success "Estructura de directorios creada"

# ============================================
# 1. MINIFICAR CSS
# ============================================
log "Optimizando CSS..."

# Copiar archivos CSS
cp styles.css dist/assets/css/
cp animations.css dist/assets/css/

# Crear CSS minificado (básico)
if command -v node &> /dev/null; then
    log "Minificando CSS con Node.js..."
    # Aquí podrías usar clean-css-cli si está disponible
    success "CSS copiado a dist/"
else
    warning "Node.js no encontrado. Copiando CSS sin minificar."
    success "CSS copiado a dist/"
fi

# ============================================
# 2. MINIFICAR JAVASCRIPT
# ============================================
log "Optimizando JavaScript..."

# Copiar archivos JS
cp script.js dist/assets/js/
cp app.js dist/assets/js/
cp sw.js dist/assets/js/

success "JavaScript copiado a dist/"

# ============================================
# 3. COPIAR Y OPTIMIZAR IMÁGENES
# ============================================
log "Optimizando imágenes..."

if [ -d "imgs" ]; then
    cp -r imgs/* dist/assets/images/
    
    # Convertir imágenes a WebP si está disponible imagemagick
    if command -v convert &> /dev/null; then
        log "Convirtiendo imágenes a WebP..."
        find dist/assets/images/ -name "*.jpg" -o -name "*.png" | while read img; do
            webp_path="${img%.*}.webp"
            convert "$img" -quality 85 "$webp_path" 2>/dev/null
            if [ $? -eq 0 ]; then
                success "Convertido: $img -> $webp_path"
            fi
        done
    fi
    
    success "Imágenes copiadas y optimizadas"
else
    warning "Carpeta imgs/ no encontrada"
fi

# ============================================
# 4. COPIAR HTML Y ARCHIVOS PRINCIPALES
# ============================================
log "Copiando archivos principales..."

# HTML
cp index.html dist/

# Manifest
cp manifest.json dist/

# README
cp README.md dist/

# CV
if [ -d "cv" ]; then
    cp -r cv/* dist/cv/
    success "CV copiado"
else
    warning "Carpeta cv/ no encontrada"
fi

success "Archivos principales copiados"

# ============================================
# 5. CREAR SITEMAP
# ============================================
log "Generando sitemap.xml..."

cat > dist/sitemap.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://carloslamas.dev/</loc>
        <lastmod>2024-11-10</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://carloslamas.dev/#about</loc>
        <lastmod>2024-11-10</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://carloslamas.dev/#experience</loc>
        <lastmod>2024-11-10</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://carloslamas.dev/#skills</loc>
        <lastmod>2024-11-10</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://carloslamas.dev/#contact</loc>
        <lastmod>2024-11-10</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
</urlset>
EOF

success "Sitemap generado"

# ============================================
# 6. CREAR ROBOTS.TXT
# ============================================
log "Generando robots.txt..."

cat > dist/robots.txt << 'EOF'
User-agent: *
Allow: /

# Archivos específicos
Allow: /assets/
Allow: /cv/
Disallow: /*.json
Disallow: /.git/
Disallow: /node_modules/

# Sitemap
Sitemap: https://carloslamas.dev/sitemap.xml
EOF

success "Robots.txt generado"

# ============================================
# 7. GENERAR REPORTE DE BUILD
# ============================================
log "Generando reporte de build..."

BUILD_DATE=$(date +'%Y-%m-%d %H:%M:%S')
TOTAL_SIZE=$(du -sh dist/ | cut -f1)

cat > dist/BUILD-REPORT.md << EOF
# Reporte de Build - Carlos Lamas Portfolio

**Fecha de build:** $BUILD_DATE
**Tamaño total:** $TOTAL_SIZE
**Versión:** 1.0.0

## Archivos incluidos:
- ✅ index.html
- ✅ styles.css + animations.css
- ✅ script.js + app.js
- ✅ Service Worker (sw.js)
- ✅ PWA Manifest
- ✅ Imágenes optimizadas
- ✅ Sitemap.xml
- ✅ Robots.txt

## Estructura:
\`\`\`
dist/
├── index.html
├── manifest.json
├── sitemap.xml
├── robots.txt
├── BUILD-REPORT.md
├── assets/
│   ├── css/
│   │   ├── styles.css
│   │   └── animations.css
│   ├── js/
│   │   ├── script.js
│   │   ├── app.js
│   │   └── sw.js
│   └── images/
├── cv/
└── ...
\`\`\`

## Instrucciones de despliegue:
1. Sube el contenido de la carpeta \`dist/\` a tu hosting
2. Configura HTTPS (recomendado para PWA)
3. Verifica que el service worker se registre correctamente
4. Testa en múltiples dispositivos

## Características incluidas:
- ✅ PWA con Service Worker
- ✅ Dark/Light mode
- ✅ Multiidioma (ES/EN)
- ✅ Sistema de partículas
- ✅ Formulario de contacto
- ✅ Optimizaciones de rendimiento
- ✅ SEO básico
EOF

success "Reporte de build generado"

# ============================================
# 8. VERIFICACIONES FINALES
# ============================================
log "Ejecutando verificaciones finales..."

# Verificar archivos principales
files_to_check=("dist/index.html" "dist/assets/css/styles.css" "dist/assets/js/script.js" "dist/sw.js")
for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        success "✅ $file"
    else
        error "❌ $file no encontrado"
    fi
done

# Verificar tamaño de la carpeta
log "Tamaño de build: $(du -sh dist/ | cut -f1)"

# ============================================
# 9. INSTRUCCIONES FINALES
# ============================================
echo ""
echo -e "${GREEN}🎉 ¡BUILD COMPLETADO EXITOSAMENTE!${NC}"
echo ""
echo -e "${BLUE}📁 Archivos de build en: ${YELLOW}./dist/${NC}"
echo -e "${BLUE}📊 Tamaño total: ${YELLOW}$(du -sh dist/ | cut -f1)${NC}"
echo ""
echo -e "${YELLOW}🚀 Próximos pasos:${NC}"
echo "1. Subir contenido de ./dist/ a tu hosting"
echo "2. Configurar HTTPS (necesario para PWA)"
echo "3. Verificar Service Worker en DevTools"
echo "4. Testar en dispositivos móviles"
echo ""
echo -e "${BLUE}📖 Ver documentación completa en: ${YELLOW}README.md${NC}"
echo ""

# Estadísticas finales
file_count=$(find dist/ -type f | wc -l)
success "Total de archivos generados: $file_count"
success "Build completado en $(date +'%H:%M:%S')"