# Control Vehicular Profesional - Estructura Separada

## Descripción
Este proyecto ha sido refactorizado desde un único archivo `index.html` monolítico a una estructura modular con archivos HTML independientes por sección/vista, manteniendo toda la funcionalidad y estilos originales.

## Estructura de Archivos

```
├── login.html              # Pantalla de autenticación
├── dashboard.html          # Dashboard principal con sidebar
├── fleet.html              # Gestión de flota de vehículos
├── reservations.html       # Formulario de reserva de vehículos
├── logbook.html            # Bitácora digital de movimientos
├── reports.html            # Reportes y salida rápida de vehículos
├── assets.js               # JavaScript compartido (lógica, estado, renderización)
└── index.html              # Archivo original (conservado para referencia)
```

## Descripción de Cada Archivo

### `login.html`
- **Propósito**: Pantalla de autenticación
- **Funcionalidades**:
  - Formulario de ingreso con email y contraseña
  - Validaciones básicas del lado del cliente
  - Almacenamiento del email en localStorage
  - Redirección al dashboard tras autenticación exitosa
  - Toast de notificación

### `dashboard.html`
- **Propósito**: Página principal del sistema
- **Componentes**:
  - Sidebar de navegación (Desktop)
  - Header móvil con menú hamburguesa
  - Métricas de flota (disponibles, en uso, mantenimiento, pendientes)
  - Acceso rápido a todas las secciones
  - Resumen de estado de flota
  - Últimos registros de bitácora

### `fleet.html`
- **Propósito**: Gestión y monitoreo de la flota de vehículos
- **Funcionalidades**:
  - Grid de vehículos con estado actual
  - Filtros por estado (Todos, Disponible, En Uso, Mantenimiento)
  - Búsqueda por placa, modelo, tipo
  - Indicadores de kilometraje y combustible
  - Botones para toggle de mantenimiento
  - Botón rápido de reserva desde tarjeta

### `reservations.html`
- **Propósito**: Formulario para solicitar reserva de vehículos
- **Funcionalidades**:
  - Formulario con campos: fecha, hora, destino, motivo
  - Selector de vehículos disponibles
  - Selección rápida de vehículos lateral
  - Validaciones de campos requeridos
  - Creación automática de logs pendientes

### `logbook.html`
- **Propósito**: Bitácora digital de movimientos de vehículos
- **Funcionalidades**:
  - Estadísticas de registros (total, correctos, pendientes)
  - Tabla de movimientos con búsqueda y filtro por fecha
  - Botón para marcar viajes como completados
  - Vista detallada de los últimos registros
  - Indicadores visuales de estado

### `reports.html`
- **Propósito**: Registro de salida rápida e incidencias
- **Funcionalidades**:
  - Formulario de despacho instantáneo
  - Campos: vehículo, kilometraje, combustible, destino, motivo
  - Protocolo de seguridad visible
  - Creación automática de registros en bitácora
  - Actualización de estado vehicular

### `assets.js`
- **Propósito**: Lógica compartida del sistema
- **Contenido**:
  - Datos iniciales (INITIAL_VEHICLES, INITIAL_LOGS, INITIAL_RESERVATIONS)
  - Estado global de la aplicación
  - Persistencia en localStorage
  - Funciones de toast/notificaciones
  - Autenticación (logout)
  - Gestión de vistas y navegación
  - Gestión de filtros
  - Funciones de submit de formularios
  - Motor de renderización
  - Funciones de cálculo de estadísticas

## Flujo de Uso

1. **Inicio**: Usuario accede a `login.html`
2. **Autenticación**: Ingresa email y contraseña (demo)
3. **Redirección**: Se redirige a `dashboard.html`
4. **Navegación**: Usa el sidebar para acceder a:
   - Dashboard (resumen)
   - Fleet (ver vehículos)
   - Reservations (reservar)
   - Logbook (historial)
   - Reports (salida rápida)
5. **Logout**: Botón en sidebar redirige a login

## Características Técnicas

### Tecnologías
- **HTML5**: Estructura semántica
- **Tailwind CSS**: Framework de diseño responsivo (CDN)
- **Lucide Icons**: Iconografía (CDN)
- **Vanilla JavaScript**: Sin dependencias externas (aparte de CDNs)

### Gestión de Estado
- **localStorage**: Persistencia de datos entre sesiones
  - `fleet_vehicles`: Lista de vehículos
  - `fleet_logs`: Bitácora de movimientos
  - `fleet_reservations`: Reservas realizadas
  - `userEmail`: Email del usuario autenticado

### Responsividad
- Diseño mobile-first
- Sidebar colapsable en móviles
- Tablas responsivas con scroll horizontal
- Grid adaptable

### Validaciones
- Campos requeridos en formularios
- Validación de email
- Rango de combustible (1-100%)
- Comprobaciones de vehículos disponibles

## Instalación y Uso

### Requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexión a Internet (para CDNs)

### Instrucciones
1. Descargar o clonar todos los archivos
2. Abrir `login.html` en el navegador
3. Ingresar con el email de demo: `jvargasarciniega@gmail.com`
4. Contraseña: Cualquiera (es solo demo)

### Sin Servidor
Este proyecto funciona completamente sin servidor. Todos los datos se almacenan en el navegador (localStorage).

## Migración desde index.html

Si está actualizando desde la versión monolítica:

1. **Backup**: Guardar una copia de `index.html` original
2. **Reemplazo**: Los nuevos archivos reemplazan la funcionalidad del original
3. **Compatibilidad**: 100% compatible con la funcionalidad anterior
4. **URLs**: Cambiar puntos de entrada a `login.html` en lugar de `index.html`

## Mejoras de la Nueva Estructura

✅ **Modularidad**: Cada página tiene su responsabilidad clara  
✅ **Mantenibilidad**: Más fácil de actualizar y debuggear  
✅ **Escalabilidad**: Estructura preparada para crecimiento  
✅ **Claridad**: Código más legible y organizado  
✅ **SEO**: Mejor estructura para cada página  
✅ **Performance**: Cada archivo descarga menos assets  

## Notas de Desarrollo

- El archivo `assets.js` debe estar en el mismo directorio que los HTML
- Los iconos de Lucide se renderizan automáticamente en cada carga
- El estado persiste entre navegación de páginas
- Todos los estilos usan Tailwind CSS (clases inline)

## Troubleshooting

**Los datos se borran al actualizar**
- Limpiar cache del navegador
- Verificar que localStorage no esté deshabilitado
- Comprobar espacio de almacenamiento disponible

**Iconos no aparecen**
- Verificar conexión a Internet
- Limpiar cache y recargar
- Comprobar que Lucide CDN esté accesible

**Formularios no funcionan**
- Abrir consola del navegador (F12)
- Verificar que `assets.js` se cargó correctamente
- Comprobar que los IDs de formularios coincidan

---

**Versión**: 2.0 (Estructura separada)  
**Última actualización**: 2026-05-22  
**Autor**: Tribunal Superior de Justicia
