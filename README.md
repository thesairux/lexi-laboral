# Lexi Laboral

App con mecánicas de juego para aprender lo básico del trabajo en Chile: el sueldo mínimo, las horas de trabajo, las horas extra, las vacaciones, el contrato, tus derechos, la seguridad en el trabajo y cómo reclamar. Está pensada para un **stand**: los chicos y chicas de 10 a 17 años escanean un código QR y juegan desde el celular, con la ayuda de Lexi, un castor con casco de obra.

- 4 unidades, 20 lecciones y 200 preguntas sencillas.
- Antes de cada lección, un resumen rápido de 3 tarjetas.
- Cada nivel tiene solo 5 preguntas, para que den ganas de terminarlo.
- Los datos vienen de la ley chilena vigente a octubre de 2026. La app no muestra las fuentes, pero cada pregunta guarda internamente de qué artículo sale, para poder actualizarla.

## Cómo correrla

Necesitas [Node.js](https://nodejs.org) 20 o superior.

```bash
npm install
npm run dev
```

Después abre la dirección que aparece en la terminal (normalmente http://localhost:5173).

| Comando | Para qué sirve |
|---|---|
| `npm run dev` | Abre la app en modo desarrollo |
| `npm run build` | Revisa los tipos y genera la versión final en `dist/` |
| `npm run preview` | Muestra la versión final (con instalación y uso sin internet) |
| `npm test` | Corre las pruebas de la lógica del juego |
| `npm run validar` | Revisa que el banco de preguntas esté bien armado y sea sencillo |
| `npm run contenido` | Extrae el texto de archivos nuevos para crear preguntas |

## Publicarla gratis y hacer el código QR

1. Corre `npm run build`. La carpeta lista para subir es `dist/`.
2. Entra a **app.netlify.com/drop**, crea una cuenta gratis y arrastra la carpeta `dist` completa.
3. Netlify te da un enlace del tipo `https://nombre.netlify.app`. Lo puedes cambiar en **Project configuration → General → Change project name** (hazlo antes de crear el QR).
4. Haz el código QR con ese enlace en cualquier generador de QR gratuito e imprímelo para el stand.
5. Para actualizarla: corre `npm run build` de nuevo y, en Netlify, entra a tu sitio → **Deploys** y arrastra otra vez la carpeta `dist`. El enlace y el QR siguen siendo los mismos.

La app es una PWA: desde el celular se puede instalar en la pantalla de inicio (Android: menú ⋮ → **Instalar app**; iPhone: **Compartir → Agregar a inicio**) y funciona sin internet después de abrirla una vez. En `npm run dev` no se instala a propósito, para no interferir con la recarga automática mientras se programa.

## Qué hay en cada carpeta

| Carpeta | Contenido |
|---|---|
| `src/content/` | Preguntas: `unidad-1.json` a `unidad-4.json`, `glosario.json` y el formato en `types.ts` |
| `src/lib/` | Lógica del juego: XP, vidas, racha, sesiones, repaso espaciado, logros, tienda, sonidos y progreso |
| `src/hooks/` | Estado del jugador (guardado en el dispositivo) y utilidades |
| `src/components/` | Lexi y su ropa, botones, barra superior, nodos del camino, confeti, gráficos, glosario y los 8 tipos de ejercicio |
| `src/screens/` | Pantallas: bienvenida, camino, resumen, sesión, resultado, practicar, logros, tienda y perfil |
| `public/` | Íconos de la app y `manifest.webmanifest` (instalación como app) |
| `scripts/` | `validar-contenido.mjs`, `contenido.mjs` y la plantilla del service worker (uso sin internet) |
| `respaldo/` | Versiones anteriores de las preguntas: `contenido-v1/` (6 unidades del curso) y `contenido-v2/` (4 unidades del curso, sencillas) |
| `para-el-qr/` | Lexi en PNG grande (círculo, ícono y fondo transparente) para el centro del QR y los carteles |
| `TEMARIO.md` | Temario, datos verificados y decisiones del proyecto |

## Reglas del juego

- **Resumen antes de practicar:** cada lección parte con 3 tarjetas cortas. Se pueden volver a ver desde el camino.
- **Niveles de 5 preguntas.** Lo que fallas se repite al final del nivel.
- **Coronas:** cada lección tiene 3 niveles: "Lo básico" (solo preguntas fáciles), "Un poco más" y "Casos de la vida real". Ganar la primera corona desbloquea la lección siguiente.
- **XP:** 1 por acierto y 1 extra desde el tercer acierto seguido. Al terminar un nivel se suman 5 por completarlo, 5 si no hubo errores y 3 si fue rápido.
- **Vidas:** 5. Se pierde una por error en lecciones, checkpoints y desafíos legendarios. Se recupera una cada 30 minutos y una por cada repaso terminado. Los repasos no gastan vidas.
- **Racha y meta diaria:** la racha suma un día por cada día con al menos una lección; la meta diaria es de 10, 20, 30 o 50 XP.
- **Desafío legendario:** con 3 coronas, 5 preguntas difíciles con máximo 1 error. Si lo superas, el nodo queda dorado.
- **Checkpoint:** al final de cada unidad, 8 preguntas de todas sus lecciones. Con 70 % se aprueba la unidad completa.
- **Practicar y modo examen:** repaso inteligente de lo que te cuesta, y exámenes de 5, 10 o 15 preguntas que se aprueban con 60 %.
- **Glosario:** las palabras clave aparecen subrayadas; al tocarlas se ve su definición.
- **Gemas y tienda:** las gemas se ganan al terminar lecciones, con la meta diaria, los logros, los checkpoints y los cofres. En la tienda hay comodines 50/50, Doble XP, vidas, protector de racha y ropa para Lexi. No hay compras con dinero real.

En **Perfil → Ajustes** se cambia la meta diaria, se silencian los sonidos, se apagan las animaciones y se reinicia el progreso.

### Privacidad

Todo se guarda solo en el navegador de cada celular (`localStorage`). No hay cuentas, servidor, anuncios ni compras. Solo se pide un apodo opcional.

## Mantener los datos al día

Algunos datos cambian con el tiempo. Revísalos antes de cada evento:

| Dato | Valor actual | Cuándo cambia | Dónde está |
|---|---|---|---|
| Sueldo mínimo (18 a 65 años) | $553.553 desde el 1 de mayo de 2026 | Se reajusta el 1 de enero de 2027 según el IPC, y normalmente cada año por ley | Busca `553.553` en `src/content/unidad-1.json` y `glosario.json` |
| Sueldo mínimo (menores de 18) | $412.938 desde el 1 de mayo de 2026 | Junto con el anterior | Busca `412.938` en `src/content/unidad-1.json` y `glosario.json` |
| Jornada máxima | 42 horas semanales desde el 26 de abril de 2026 | Baja a 40 horas el 26 de abril de 2028 | Lección "Tus horas de trabajo" y `glosario.json` |
| Retención de boletas de honorarios | 15,25 % en 2026 | Sube a 16 % el 1 de enero de 2027 y a 17 % en 2028 (Ley 21.133) | Busca `15,25` en `src/content/unidad-4.json` y `glosario.json` |

El valor vigente del sueldo mínimo está en la página de la Dirección del Trabajo (dt.gob.cl, sección Consultas). Después de cambiar un dato, corre `npm run validar`, `npm run build` y vuelve a subir la carpeta `dist`.

## Cómo agregar o editar contenido

Todo el contenido está en `src/content/`. La app lee sola cualquier archivo `unidad-N.json` que haya ahí.

### Editar una pregunta

Busca su `id` (por ejemplo `u1-l3-e04`: unidad 1, lección 3, pregunta 4) en `src/content/unidad-1.json`, cambia el texto y corre `npm run validar`.

### Reglas para que las preguntas sean sencillas

`npm run validar` revisa todas estas reglas y avisa qué pregunta no las cumple:

- Pregunta de 20 palabras como máximo, caso de 35, alternativa de 9, explicación de 35 y tarjeta de resumen de 35.
- Palabras de todos los días. Una sola alternativa correcta, y las demás claramente equivocadas.
- No se piden números de artículos de memoria: se puede dar el número y preguntar de qué trata, nunca al revés.
- Completar con 3 o 4 fichas, verdadero o falso en un solo paso, 3 o 4 pares, 3 o 4 pasos, 2 o 3 trozos en "encuentra el error" y 2 categorías con 4 o 5 elementos para clasificar.
- Cada lección tiene al menos 10 preguntas, con al menos 5 fáciles (dificultad 1), y de 2 a 6 tarjetas de resumen.
- Los datos deben estar verificados en la ley oficial ([LeyChile](https://www.bcn.cl/leychile) o la Dirección del Trabajo).

### Formato de una unidad y una lección

```json
{
  "unidad": 3,
  "titulo": "Nombre de la unidad",
  "descripcion": "Una frase sobre lo que se aprende",
  "fueraDelMaterial": false,
  "cofreDespuesDe": 3,
  "lecciones": [
    {
      "id": "u3-l1",
      "numero": 1,
      "titulo": "Título corto",
      "objetivo": "Qué vas a poder hacer al terminar",
      "tipoNodo": "leccion",
      "guia": [ ... de 2 a 6 tarjetas de resumen ... ],
      "ejercicios": [ ... al menos 10 preguntas ... ]
    }
  ]
}
```

`cofreDespuesDe` es el número de la lección después de la cual aparece el cofre de gemas (una lección intermedia).

Cada tarjeta del resumen tiene este formato:

```json
{
  "titulo": "¿Cuánto es?",
  "texto": "Desde el 1 de mayo de 2026 es de $553.553 al mes si tienes entre 18 y 65 años, y de $412.938 si tienes menos de 18.",
  "fuentes": [{ "archivo": "Ley N° 21.830", "articulo": "Arts. 1 y 2 Ley 21.830", "fueraDelMaterial": true }],
  "revisar": false
}
```

### Campos de toda pregunta

| Campo | Qué es |
|---|---|
| `id` | `u{unidad}-l{lección}-e{nn}`, sin repetirse. Ejemplo: `u1-l3-e04` |
| `unidad`, `leccion` | Números que coinciden con el `id` |
| `tipo` | Uno de los 8 tipos de abajo |
| `dificultad` | 1 = fácil · 2 = media · 3 = caso de la vida real |
| `concepto` | Etiqueta corta del tema (ej. `"horas-extra"`); el repaso agrupa por concepto |
| `enunciado` | La pregunta |
| `explicacion` | Lo que se muestra después de responder: la respuesta y por qué |
| `fuente` | De dónde sale el dato (`archivo` y `articulo`). **No se muestra en la app**; sirve para actualizar el contenido |
| `revisar` | `true` si el dato hay que confirmarlo; en ese caso se agrega `notaRevision` |

### Los 8 tipos de pregunta

Los ejemplos son preguntas reales del banco, sin los campos comunes. La app desordena las alternativas, las fichas, los pares y los pasos al mostrarlos.

**Selección múltiple**: siempre 4 alternativas; `respuesta` es la posición de la correcta (0 a 3).

```json
{ "tipo": "seleccion_multiple",
  "enunciado": "¿Cuánto es el sueldo mínimo para mayores de 18 años desde mayo de 2026?",
  "opciones": ["$100.000", "$553.553", "$1.500.000", "$53.000"],
  "respuesta": 1 }
```

**Caso práctico**: igual que la selección múltiple, más una historia breve en `caso`.

```json
{ "tipo": "caso_practico",
  "caso": "Camila tiene 19 años y trabaja jornada completa. Le ofrecen $450.000 al mes.",
  "enunciado": "¿Es legal ese sueldo?",
  "opciones": ["Sí, si ella acepta", "Sí, porque es joven", "No: es menos que el mínimo", "Sí, si es su primer trabajo"],
  "respuesta": 2 }
```

**Verdadero o falso**: `respuesta` es `true` o `false`.

```json
{ "tipo": "verdadero_falso",
  "enunciado": "El tiempo de colación cuenta como hora trabajada.",
  "respuesta": false }
```

**Completar**: el enunciado lleva un solo `___` y `banco` trae 3 o 4 fichas para tocar.

```json
{ "tipo": "completar",
  "enunciado": "Cada hora extra se paga con un ___% más.",
  "respuesta": "50",
  "banco": ["50", "5", "500"] }
```

**Unir pares**: 3 o 4 pares.

```json
{ "tipo": "unir_pares",
  "enunciado": "Une cada dato de las horas extra.",
  "pares": [
    { "a": "Máximo de horas extra al día", "b": "2 horas" },
    { "a": "Cuánto más se pagan", "b": "Un 50% más" },
    { "a": "Duración máxima del acuerdo", "b": "3 meses" }
  ] }
```

**Ordenar**: 3 o 4 pasos, escritos en el orden correcto.

```json
{ "tipo": "ordenar",
  "enunciado": "Ordena de menos a más tiempo.",
  "pasos": ["La colación: 30 minutos", "El máximo en un día: 10 horas", "La jornada desde 2028: 40 horas", "La jornada de hoy: 42 horas"] }
```

**Encuentra el error**: la frase va dividida en 2 o 3 `segmentos`; `respuesta` es el equivocado y `correccion`, cómo debería decir.

```json
{ "tipo": "identificar_error",
  "enunciado": "Toca la parte que está equivocada.",
  "segmentos": ["La jornada semanal se reparte en 5 o 6 días, ", "y puede durar 15 horas en un día."],
  "respuesta": 1,
  "correccion": "y nunca más de 10 horas en un día." }
```

**Clasificar**: 2 categorías y 4 o 5 elementos; `categoria` es la posición de su categoría.

```json
{ "tipo": "clasificar",
  "enunciado": "Si tienes 16 años, ¿está permitido?",
  "categorias": ["Permitido", "Prohibido"],
  "elementos": [
    { "texto": "Trabajar con permiso escrito", "categoria": 0 },
    { "texto": "Trabajar 6 horas en época de clases", "categoria": 0 },
    { "texto": "Hacer horas extra", "categoria": 1 },
    { "texto": "Trabajar en un comercio a las 23:00", "categoria": 1 }
  ] }
```

### Glosario

`src/content/glosario.json` tiene las palabras que se pueden tocar en las preguntas y los resúmenes: `termino`, `alias` (otras formas en que aparece), `definicion`, `unidad`, `fuente` y `revisar`.

### Agregar contenido desde archivos nuevos

Si llegan apuntes o documentos nuevos, cópialos en la raíz del proyecto o en una carpeta `materia/` y corre `npm run contenido`. El script extrae su texto a `contenido-fuente/` y escribe `contenido-fuente/PEDIDO.md` con las reglas para escribir las preguntas. Lo más rápido es abrir [Claude Code](https://claude.com/claude-code) en esta carpeta y pedirle: *"Sigue las instrucciones de contenido-fuente/PEDIDO.md"*. Para leer PDF se usa `pdftotext`, que viene con [Git for Windows](https://git-scm.com/download/win).

## Estado del proyecto

| Etapa | Estado |
|---|---|
| App con juego completo (camino, coronas, vidas, racha, tienda, logros, repaso, examen, PWA) | Lista |
| Contenido para stand: 4 unidades del día a día, niveles de 5 preguntas y resumen rápido | Lista |
