var config = {
    apiKey: "AIzaSyAsNZlUEfQ9Nq8GAMGrfshHUCE_FTqC-6E",
    authDomain: "davidjl-aboutme.firebaseapp.com",
    databaseURL: "https://davidjl-aboutme.firebaseio.com",
    projectId: "davidjl-aboutme",
    storageBucket: "davidjl-aboutme.appspot.com",
    messagingSenderId: "734513722226"
};
firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
    e.preventDefault();
    var nombre = getInputVal('nombre');
    var email = getInputVal('email');
    var asunto = getInputVal('asunto');
    var mensaje = getInputVal('mensaje');

    saveMessage(nombre, email, asunto, mensaje);

    document.getElementById('contactForm').reset();
    document.querySelector('.alerta').style.display = 'block';
    document.querySelector('.alerta').style.animation = '1s alerta forwards';

    setTimeout(function(){
        document.querySelector('.alerta').style.animation = '1s alerta_quitar forwards';
    },5000);
    setTimeout(function(){
        document.querySelector('.alerta').style.display = 'none';
        document.querySelector('.footer_animation').style.animation = '1s subir_footer forwards';
    },6000);

    // Clear form

}

// Function to get get form values
function getInputVal(id){
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(nombre, email, asunto, mensaje){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        nombre: nombre,
        email:email,
        asunto:asunto,
        mensaje:mensaje
    });
}