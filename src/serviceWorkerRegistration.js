// serviceWorkerRegistration.js

// Si deseas registrar el service worker en producción
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname === '127.0.0.1'
  );
  
  export function register() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        // El service worker no funcionará si PUBLIC_URL está en un dominio diferente.
        return;
      }
  
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          // En localhost, verificar si el service worker ya está registrado
          checkValidServiceWorker(swUrl);
        } else {
          // En producción, registrar el service worker
          registerValidSW(swUrl);
        }
      });
    }
  }
  
  function registerValidSW(swUrl) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('Service Worker registrado:', registration);
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
  }
  
  function checkValidServiceWorker(swUrl) {
    // Verificar si el service worker ya está registrado
    fetch(swUrl)
      .then((response) => {
        if (
          response.status === 404 ||
          response.headers.get('content-type').indexOf('javascript') === -1
        ) {
          // No hay un archivo service worker válido, por lo que se eliminará
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister();
          });
        } else {
          // Hay un service worker válido, así que registrar el service worker
          registerValidSW(swUrl);
        }
      })
      .catch(() => {
        console.log('No se pudo contactar con el servidor para verificar el service worker.');
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }
  