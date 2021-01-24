"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/


// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(person.length < 1) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person);
    break;
    case "family":
      immediateFamily(person, people,);
    break;
    case "descendants":
      displayDescendants(person, people, 0);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

// function to capitalize the first letter of each name (titlecase)
function titleCase (str) {
  str = str.toLowerCase().split(" ");
  for (let i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}


function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === titleCase(firstName) && person.lastName === titleCase(lastName)){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let age = calculate_age(person[0].dob);
  let personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "Height: " + person[0].height + "\n";
  personInfo += "Weight: " + person[0].weight + "\n";
  personInfo += "Age: " + age + "\n";
  personInfo += "Eye Color: " + person[0].eyeColor + "\n";
  personInfo += "Occupation: " + person[0].occupation + "\n";
  alert(personInfo);
}

//Function to find and dispay all descendants of the person searched for
let listDescendants = [];
function displayDescendants(person, people, counter) {
  let descendants = [];
  for (let i = 0; i < person.length; i++) { 
    descendants = people.filter(function(list) {
      if (person[i].id === list.parents[0] || person[i].id === list.parents[1]) {
        return true;
      }
      else{
        return false;
      }
    })
  }
  for (let i = 0; i < descendants.length; i++) {
    listDescendants.push(descendants[i].firstName + " " + descendants[i].lastName);
  }
  person = descendants;
  if (counter < people.length && person.length >= 1) {
    return displayDescendants(person, people, counter + 1);
  }
  if (listDescendants.length >= 1) {
    let verticalList = "";
    for (let i = 0; i < listDescendants.length; i++) {
      verticalList += listDescendants[i] + "\n";
    }
      alert("The following are all descendants:" + "\n" + verticalList);
      verticalList = "";
      listDescendants = []
  }
  else {
    alert("No descendants were found.")
  }
}

//function to calculate age
function calculate_age(dob) {
  let newDOB = Date.parse(dob);
  let diff_ms = Date.now() - newDOB;
  let age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

// function that checks for immediate family members - spouse/parents/siblings/children
function immediateFamily(person, people){

  //Iterate over every objects' id# to see if it matches the person's parent#

  function findParents(person, people){
    let parentID = person[0].parents;

    let foundParent = people.filter(function(parentID){
        if(people[0] === parentID){
          return true;
        } else {
          return false;
        }
    })
      return foundParent;
  }

  //Iterate over every objects' parent# to see if it matches the person's parent#

  function findSiblings(person, people){
    let siblingIdentifier = person[0].parents;

    let foundSibling = people.filter(function(siblingIdentifier){
      if(people[10] === siblingIdentifier){
        return true;
      } else {
        return false;
      }
  })
    return foundSibling;
  }

  //Iterate over every objects' id# to see if it matches the person's currentSpouse#

  function findSpouse(person, people){
    let spouseID = person[0].currentSpouse;

    let foundSpouse = people.filter(function(people){
      if(people[0].id === spouseID){
        return true;
      } else {
        return false;
      }
  })

    return foundSpouse;
  }

  //Iterate over every objects' parent# to see if it matches the person's id#

  function findChildren(person, people){
    let childrenID = person[0].id;

    let foundChildren = people.filter(function(childrenID){
      if(people[10] === childrenID){
        return true;
      } else {
        return false;
      }
  })
    return foundChildren;
  }

  //A function to call all the above functions

  function displayImmediateFamily(person, people){
    let printParents = findParents(person, people);
    let printSiblings = findSiblings(person, people);
    let printSpouse = findSpouse(person, people);
    let printChildren = findChildren(person, people);

    let familyAlert = alert("Parents: " + printParents + "\nSiblings: " + printSiblings + "\nSpouse: " + printSpouse + "\nChildern: " + printChildren);

  }

  //Now call everything

  let familyInformation = displayImmediateFamily(person, people);
}
