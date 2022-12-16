/**
 * WEB222 – Final Assignment
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       <Chun Kit Li>
 *      Student ID: <156232217>
 *      Date:       <12 Dec, 2022>
 *      Section:    <NFF>
 */



window.addEventListener('DOMContentLoaded', function(){
  console.log('window DOMContentLoaded');

  // ==================== Code for responsive navbar ====================
  let menu = document.querySelector('.menuIcon');
  let navbar = document.querySelector('.navLinks');
  
  // Making the navbar responsive using a menu icon
  menu.addEventListener('click', function() {
      navbar.classList.toggle('open-menu');
      menu.classList.toggle('move');
  });
  
  // The navbar should collapse on small screens when scrolled
  window.onscroll = () => {
      navbar.classList.remove('open-menu');
      menu.classList.remove('move');
  }
  
  // ==================== Form Validation Code ====================
  let messages = [];
  const form = document.querySelector('.contactForm');
  const errorElement = document.querySelector('error');
  
  form.addEventListener('submit', (e) => {
      messages = [];
  
      // Calling all the validation functions
      validateName();
      validatePostalCode();
      validateMessage();
  
      // Only validating the pay rate if hiring option was clicked
      if (clicked > 0) {
          payRateValidation();
      }
  
      // Displaying the errors
      if (messages.length > 0) {
          e.preventDefault();
          errorElement.innerHTML = `
          <h3>Incorrect Inputs Provided:</h3>
          <pre>${messages.join('\r\n')}</pre>
          `;
      }
  })
  
  form.addEventListener('reset', (e) => {
      messages = [];
      errorElement.innerHTML = '';
  })
  
  // Validation for the name input
  function validateName() {
      const inputName = document.getElementById('name');
      if(nullChecker(inputName, 'Name')) {
          areAlphabets(inputName, '- Name should be valid - All characters should be alphabetical');
      }
  }
  
  // Validation for postal code
  function validatePostalCode() {
      let postalCode = document.getElementById('postalCode');
      let validRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
      if (!(postalCode.value.match(validRegex))) {
          messages.push("- Invalid Postal Code");
      }
  }
  
  // Validation for message
  function validateMessage() {
      const message = document.getElementById('message');
      if (nullChecker(message, 'Message')) {
          if (address.value.length < 10) {
              messages.push("- Insufficient Message Length.");
          }
      }
  }
  
  // Validation for the pay rate input field
  function payRateValidation() {
      let payRateInput = document.getElementById('hiring-rate-input');
      if (payRateInput.value < 15.5) {
          messages.push("Hour rate should be greater than minimum rate if you want to hire me.")
      }
  }
  
  // Ensures that the element is not empty
  function nullChecker(element, elementName) {
      result = true;
      if (element.value === '' || element.value == null) {
          messages.push(`- ${elementName} is required`);
          result = false;
      }
  
      return result;
  }
  
  // Ensures that all the characters in the input field are alphabets
  function areAlphabets(element, message) {
      let validRegex = /^[A-Za-z\s]+$/;
      if (!(element.value.match(validRegex))) {
          messages.push(message);
      }
  }

// ==================== Code for getting the pay rate input field when hiring option is chosen ====================
let hiringButton = document.getElementById('hiring');
let questionButton = document.getElementById('question');
let commentButton = document.getElementById('comment');

// Variable to make sure that the form is only printed once no matter how many times the hiring button is clicked
var clicked = 0;

// Adding event listeners
hiringButton.addEventListener('click', function() {
    if (clicked == 0) {
        generatePayRateInput();
        clicked++;
    }
});

questionButton.addEventListener('click', function() {
    if (clicked > 0) {
        deletePayRateInput();
        clicked = 0;
    }
});

commentButton.addEventListener('click', function() {
    if (clicked > 0) {
        deletePayRateInput();
        clicked = 0;
    }
});

// Function to generate the pay rate input field
function generatePayRateInput() {
    let break1 = document.createElement('br');
    break1.id = 'b1';
    let break2 = document.createElement('br');
    break2.id = 'b2';
    let break3 = document.createElement('br');
    break3.id = 'b3';

    // Creating a label
    let label = document.createElement("label");

    //let text = document.createTextNode("Expected Hourly Rate: ");
    label.appendChild(text);
    label.id = 'hiringRateLabel';

    // Creating the input Field
    const input = document.createElement("input");
    input.id = 'hiringRateInput';
    input.type = 'number';
    input.placeholder = 'Hourly Pay';
    input.step = '0.1';
    input.classList.add('format')

    document.querySelector(".radioButtons").appendChild(break1);
    document.querySelector(".radioButtons").appendChild(break2);
    document.querySelector(".radioButtons").appendChild(label);
    document.querySelector(".radioButtons").appendChild(break3);
    document.querySelector(".radioButtons").appendChild(input);
}

// Function to delete the pay rate input field
function deletePayRateInput() {
    let label = document.getElementById('hiringRateLabel');
    let input = document.getElementById('hiringRateInput');
    let div = document.querySelector(".radioButtons");
    let b1 = document.getElementById('b1');
    let b2 = document.getElementById('b2');
    let b3 = document.getElementById('b3');

    div.removeChild(b1);
    div.removeChild(b2);
    div.removeChild(b3);
    div.removeChild(input);
    div.removeChild(label);
}


})



