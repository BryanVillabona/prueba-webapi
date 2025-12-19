# Backend Developer

Se evidencia explicación y solución de los ejercicios propuestos.

---

## Parte 1: SQL Server

A continuación, detallo el análisis y la solución aplicada a los errores lógicos encontrados en los Store Procedures.

### Ejercicio 1: El promedio incorrecto
**Análisis del problema:**
El error principal está en el `SELECT`, ya que la función `AVG` omite los valores nulos al calcular el promedio. Para este caso, según el escenario planteado, no se debe omitir el valor sino tratarlo como 0.

**Solución:**
Para corregirlo, se hizo uso de la función `ISNULL` dentro del cálculo. Esto convierte los valores nulos en 0 antes de operar, garantizando que el promedio tome en cuenta todos los registros correctamente.

### Ejercicio 2: El reporte de totales por día
**Análisis del problema:**
Existían problemas al filtrar por fechas (debido a que `DATETIME` incluye horas) y al sumar valores nulos (que pueden resultar en `NULL` en lugar de 0).

**Solución:**
* Uso `CAST` para convertir el campo `FechaVenta` a tipo `DATE`. Esto permite comparar solamente la fecha ignorando la hora exacta.
* Utilizo la función `ISNULL` nuevamente para asegurar que, si el total de ventas es nulo, se retorne un 0 y no un valor nulo.

---

## Parte 2: Web API (Node.js)

Se implementó una API REST utilizando **Node.js** y **Express**.

### Instalación y Ejecución

1.  Instalar las dependencias:
    ```bash
    npm install
    ```
2.  Iniciar el servidor:
    ```bash
    node app.js
    ```
    *Al iniciar, la aplicación cargará en memoria 1,000,000 de registros simulados. Esperar el mensaje "productos cargados".*

### Endpoints

#### 1. Contador de Frecuencia de Palabras
Recibe un texto y devuelve un JSON con la cantidad de veces que aparece cada palabra.

* **Método:** `POST`
* **URL:** `/api/utils/word-frequency`
* **Body (JSON):**
    ```json
    {
      "texto": "Hola hola, mundo"
    }
    ```
* **Lógica aplicada:** Se normalizó el texto a minúsculas y se eliminaron signos de puntuación básicos antes de realizar el conteo.

#### 2. Búsqueda Eficiente de Datos (1 Millón de Registros)
Busca un producto por su ID de manera instantánea.

* **Método:** `GET`
* **URL:** `/api/productos/search/:id`
* **Ejemplo:** `/api/productos/search/999999`

**Explicación de la Estructura de Datos**
Se utilizó un **Objeto de JavaScript** ya que funciona como un diccionario donde la *key* es el id del producto, asi evitamos recorrer todo un array porque tiene que recorrer toda la lista, mientras que el objeto tiene un acceso directo por clave.

```javascript
const producto = baseDeDatos[idBuscado];