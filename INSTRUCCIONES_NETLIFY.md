# Guía de Sincronización con Netlify 🚀

## Opción 1: Sincronización Automática (Recomendado)

Para que los cambios se sincronicen automáticamente con Netlify:

### Paso 1: Subir el repositorio a GitHub
1. Abre Terminal/PowerShell en la carpeta del proyecto
2. Ejecuta:
   ```bash
   git add .
   git commit -m "Inicializar proyecto"
   git push origin main
   ```

### Paso 2: Conectar GitHub a Netlify
1. Ve a [netlify.com](https://netlify.com)
2. Inicia sesión o regístrate
3. Haz clic en "New site from Git"
4. Selecciona GitHub y autoriza
5. Selecciona tu repositorio "Cumplea-os"
6. Haz clic en "Deploy"

**Resultado**: Cada vez que hagas cambios y hagas `git push`, Netlify desplegará automáticamente tu sitio.

---

## Opción 2: Sincronización Manual

Si prefieres controlar cuándo sincronizar:

1. Realiza tus cambios en el archivo local
2. Abre Terminal en la carpeta del proyecto
3. Ejecuta:
   ```bash
   git add .
   git commit -m "Tu mensaje de cambio"
   git push origin main
   ```
4. Netlify desplegará automáticamente

---

## Opción 3: Go Live (VS Code Live Share)

Para compartir tu sitio en tiempo real mientras desarrollas:

1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html` y selecciona "Open with Live Server"
3. Tu sitio estará disponible en `http://localhost:5500`
4. Usa VS Code Live Share para compartir con otros

---

## Notas Importantes

✅ **Los cambios se guardan en localStorage**: Al hacer cambios en la página, se guardan automáticamente en el navegador

✅ **El archivo netlify.toml está configurado**: Ya está listo para que Netlify despliegue tu sitio

⚠️ **Para sincronizar permanentemente**: Necesitas hacer `git push` o conectar a Netlify como se describe arriba

---

## Deshabilitar el Spellcheck ✓
Ya está configurado en todos los textareas - Los textos no mostrará líneas rojas de error ortográfico.

---

**¿Necesitas ayuda?** Contáctame para configurar cualquiera de estas opciones.
