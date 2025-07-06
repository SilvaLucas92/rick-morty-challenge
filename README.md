# 🧪 Rick & Morty Explorer

Aplicación desarrollada en **React + TypeScript** que consume la API pública de Rick & Morty para mostrar personajes, filtrarlos, marcarlos como favoritos y visualizar sus detalles. 


---

## 🌐 Demo en producción

La aplicación está desplegada en Vercel:

🔗 [https://rick-morty-challenge-pi.vercel.app](https://rick-morty-challenge-pi.vercel.app)


---

## 🚀 Cómo inicializar el proyecto

1. **Clonar el repositorio**

   ```bash
   https://github.com/SilvaLucas92/rick-morty-challenge.git
   ```

2. **Instalar las dependencias**

   ```bash
   npm install
   ```


3. **Ejecutar la aplicación en modo desarrollo**

   ```bash
   npm run dev
   ```

   La app estará disponible en `http://localhost:5173`.

4. **Ejecutar los tests**

   ```bash
   npm test
   ```


## 🧩 Estructura del proyecto

```text
src/
├── components/      → Componentes reutilizables
├── context/         → Contextos globales 
├── hooks/           → Custom hooks 
├── pages/           → Vistas principales (Home, CharacterDetail, Favorites)
├── types/           → Tipado global TypeScript
├── utils/           → Funciones utilitarias y constantes
├── App.tsx          → Definición de rutas principales
├── main.tsx         → Punto de entrada de la app
```

---

## ⚠️ Limitaciones y notas

* Los favoritos se almacenan en **localStorage**; se perderán al limpiar el almacenamiento del navegador o cambiar de dispositivo.
* No se incluyen pruebas E2E (End-to-End), solo unitarias e integradas.


