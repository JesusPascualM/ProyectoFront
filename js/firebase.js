import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js';
import { getDatabase, ref, onValue ,set} from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js';
import { mostrarPreguntasYRespuestas } from './functions.js';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js';

window.addEventListener("load", () => {
    document.getElementById("botonCrearRegistro").addEventListener("click", (e) => {
    e.preventDefault();
    registerUser();
    });
  
  document.getElementById("botonInicioSesion").addEventListener("click", (e) => {
    e.preventDefault();
    loginUser();
  });
});

function loginUser() {
  const app = initFireBase();
  const auth = getAuth(app);
  const email = document.getElementById("emailUsuario").value;
  const password = document.getElementById("passwordUsuario").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(response => {  
  document.getElementById("seccionCategorias").style.display = "flex";
  document.getElementById("opcionesLocalStorage").style.display = "flex";
  document.getElementById("contenedorInicioSesion").style.display = "none";
})
    .catch(error => alert(error.code, error.message));
}

function registerUser() {
  const app = initFireBase();
  const form = document.getElementById("CrearRegistro");
  const email = form.email.value;
  const pass = form.password1.value;
  const pass2 = form.password2.value;
  const name = form.name.value;
  const address = form.address.value;
  const age = form.age.value;
  
  const auth = getAuth(app);
if(name && email && address && age){
  if (pass !== '' && pass2 !== '' && pass === pass2) {
    createUserWithEmailAndPassword(auth, email, pass)
      .then(response => {     
        escribirUsuario(response.user.uid, name, email, age, address);
        alert('Te has registrado correctamente,pulsa aceptar para redirigirte al login');
        setTimeout(() => {
          location.reload()
        }, 1000);
      })
      .catch(error => alert(error.code, error.message));
  } else {
    alert('las contraseñas no coinciden')
  }
}else{
  alert('Los campos Nombre,Direccion,edad e Email son obligatorios')
}
  
}
function escribirUsuario(userId, nombre, email, edad, direccion) {

	const app = initFireBase();
	const db = getDatabase(app);
	set(ref(db, 'usuarios/' + userId), {
		userId,
		nombre,
		email,
		edad,
		direccion,
	});
}


function iniciarFireBase() {
  const app = initFireBase();
  getData(app);
}

const initFireBase = () => {
   const firebaseConfig = {
    apiKey: "AIzaSyAmGonSsNmqXUKTfwtlWSAbLVBVlzr1K5o",
    authDomain: "tercerproyecto-20547.firebaseapp.com",
    databaseURL: "https://tercerproyecto-20547-default-rtdb.firebaseio.com",
    projectId: "tercerproyecto-20547",
    storageBucket: "tercerproyecto-20547.appspot.com",
    messagingSenderId: "223526003461",
    appId: "1:223526003461:web:cd3a870b00ff7b3e5b4d6c"
  };
  return initializeApp(firebaseConfig);
};

function getData(app) {
  const database = getDatabase(app);
  const refPreguntas = ref(database, 'results/');
  console.log(refPreguntas);
  onValue(refPreguntas, (snapshot) => {
    const data = snapshot.val();
    mostrarPreguntasYRespuestas(data);
  });
}

export { iniciarFireBase };
