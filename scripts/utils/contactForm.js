// DOM elements
const closeBtn = document.querySelector('.close');
const contactBtn = document.querySelector('.contact_button');
const modalbg = document.querySelector('#contact_modal');
const inputs = Array.from(document.forms.reserve.querySelectorAll('input,textarea'));
const form = document.querySelector('form');
const firstName = document.getElementById('first');

// object of input data
const inputValues = {};
 
// *****************************************************
// Event listeners
window.addEventListener('keyup', closeModalKey);
contactBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

// Functions
function closeModalKey(e) {
  if (modalbg.style.display === 'block' && e.key === 'Escape') {
    closeModal();
  }
}
function openModal() {
  modalbg.style.display = 'block';
  firstName.focus();
}
function closeModal() {
  modalbg.style.display = 'none';
}


// /*************************************************
// error messages object
const errorMessages = {
    firstName:{
        error1:'Veuillez entrer votre prénom',
        error2:'"Veuillez ne pas entrer de caractères spéciaux ou de nombres"',
        error3:'Veuillez entrer au moins 2 caractères '
    } ,
   lastName:{
        error1:'Veuillez entrer votre nom',
        error2:'"Veuillez ne pas entrer de caractères spéciaux ou de nombres"',
        error3:'Veuillez entrer au moins 2 caractères '
    },
    email:{
        error1:'Veuillez entrer votre email',
        error2:'Veuillez entrer un  email valide',
    },
    message:{
        error1:'Veuillez entrer votre message ',
        error2: 'Veuillez entrer un message avec un minimum de 10 caractères.',
    }
}
// a function  that add an attribute data-error with a specified message-error to an element 
const setErrorMessage = (element, message) => {
        element.parentElement.setAttribute('data-error', message);
}
// a function that makes the attribute data-error visible or  non-visible
//depends on validation rules 
const setError = (element, etatError) => { 
        element.setAttribute('data-error-visible', etatError);
      console.log('function2');
        element.parentElement.setAttribute('data-error-visible', etatError);
}
// a function that removes the attribute from an element
const removeError = (element) => {
        element.parentElement.removeAttribute('data-error') ; 
}

// function that validate  user  input 'firstName' ===> return true if valid or false if invalid "
const firstNameValidation = () => {
    const firstName = document.getElementById('first');
    
    if  (firstName.value.trim() === '' ) {
        setError(firstName, true);
        setErrorMessage(firstName, errorMessages.firstName.error1);
        return false;
    }
    if (!firstName.value.match(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/)){
        setError(firstName, true);
        setErrorMessage(firstName, errorMessages.firstName.error2);
        return false;
    }
    if (firstName.value.trim().length < 2 ){
        setError(firstName, true);
        setErrorMessage(firstName, errorMessages.firstName.error3);
        return false;
    }
        setError(firstName, false);
        removeError(firstName);
        inputValues['firstName']= firstName.value;
        return true;
}


// function that validate  user  input 'lastName' ===> return true if valid or false if invalid "
const  lastNameValidation = () => {
    const lastName = document.getElementById('last');
   
    if  (lastName.value.trim() === '' ) {
        setError(lastName, true);
        setErrorMessage(lastName, errorMessages.lastName.error1);
        return false;
    }
    if (!lastName.value.match(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/)){
        setError(lastName, true);
        setErrorMessage(lastName, errorMessages.lastName.error2);
        return false;
    }
    if (lastName.value.trim().length < 2 ) {
        setError(lastName, true);
        setErrorMessage(lastName, errorMessages.lastName.error3);
        return false;
    }
        setError(lastName, false);
        removeError(lastName);
        inputValues['lastName']= lastName.value;
        return true;
}

// function that validate  user  input 'email' ===> return true if valid or false if invalid "
const  emailValidation= () => {
    const email = document.getElementById('email');
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if  (email.value.trim() === '' ) {
        setError(email, true);
        setErrorMessage(email, errorMessages.email.error1);
        return false;
    }
    if (!email.value.trim().match(emailRegex)) {
        setError(email, true);
        setErrorMessage(email, errorMessages.email.error2);
        return false;
    }
        setError(email, false);
        removeError(email);
        inputValues['email']= email.value;
        return true;
}
// function that validate  user  input 'message' ===> return true if valid or false if invalid "
const messageValidation = () => {
    const message = document.getElementById('message');

    if  (message.value.trim() === '' ) {
        setError(message, true);
        setErrorMessage(message, errorMessages.message.error1);
        return false;
    }
    if (message.value.trim().length < 10 ) {
        setError(message, true);
        setErrorMessage(message, errorMessages.message.error2);
        return false;
    }
        setError(message, false);
        removeError(message);
        inputValues['message']= message.value;
        return true;
};



// track the events of input fields when the user clicks on them 
inputs.forEach((field) => {
   field.addEventListener('input', (e) => {
    console.log(e.target.id);
        switch (e.target.id) {
           
        case 'first':
            firstNameValidation();
            break;
        case 'last':
            lastNameValidation();
            break;
        case 'email':
            emailValidation();
            break;
        case 'message':
            messageValidation();
            break;
        default:
            null;
        }
    });
});

  
// function to ensure that all fields  of input are "valid" in order to submit the form 
 const formValidation= () => (firstNameValidation() && lastNameValidation() && emailValidation() && messageValidation())
    ? true : false;


// submit form valid 
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (formValidation()) {
        console.log(inputValues);
        form.reset();//reset the form 
    } else {
        //invalid input error message
        console.error("Le formulaire n'est pas valide. Veuillez vérifier les données saisies.");
        // excute functions that check the validation of input fields
        firstNameValidation() 
        lastNameValidation() 
        emailValidation() 
        messageValidation()
    }
});


