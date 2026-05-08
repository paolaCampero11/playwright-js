# Framework final con POM y Allure

Este branch contiene una plantilla base de automatización con Playwright y JavaScript.

El objetivo es que sirva como base para el trabajo práctico final.

## Qué incluye este branch

- estructura Page Object Model (POM)
- datos de prueba en archivo JSON
- reporter HTML de Playwright
- integración con Allure
- ejecución en Chrome visible

---

# Instalación

## Instalar dependencias

```bash
npm install
```
Instalar Playwright y navegadores si fuera necesario
```
npx playwright install
```

Instalar Allure CLI. Si no está instalado:

```bash
npm install -g allure
```

Verificar instalación:

```
allure --version
```
**Ejecutar pruebas:**

```
npx playwright test
```
Las pruebas se ejecutarán en Chrome visible.

Ver reporte HTML de Playwright
```
npx playwright show-report
```
Generar reporte Allure

```
allure generate ./allure-results --clean -o ./allure-report
```

Abrir reporte Allure
```
allure open ./allure-report
```

## Pre requisitos para reporte Allure

Java (requerido para Allure)

Allure necesita Java para generar los reportes.

**Verificar instalación:**
```
java -version
```
Si no está instalado descargar desde:

https://adoptium.net/

**Configurar variable de entorno JAVA_HOME**

Después de instalar Java es necesario configurar la variable de entorno.

**Ejemplo en Windows:**

JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17

**Agregar también al PATH:**

%JAVA_HOME%\bin

**Verificar nuevamente:**
```
java -version
```
---
## Estructura del proyecto

**data/** Contiene datos de prueba reutilizables.

**pages/** Contiene las Page Objects del framework.

**tests/** Contiene los casos de prueba.

## Qué archivo modificar para adaptar esta plantilla

**Cambiar URL base**

Modificar en: playwright.config.js

**Cambiar datos de usuario**

Modificar en: data/users.json

**Cambiar locators de login**

Modificar en: pages/LoginPage.js

**Agregar nuevas páginas**

Crear nuevos archivos dentro de: pages/

**Agregar nuevas pruebas**

Crear nuevos archivos dentro de: tests/