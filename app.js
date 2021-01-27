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
      searchByTraits(people);
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

/*======================================================================*/
//function to search traits
function searchByTraits(people){
  let chosenTraits = promptTraits("Please choose the traits for which you would like to search, leaving one space between each trait. For example: gender height weight eyecolor occupation");//Prompt to choose which traits to search for
  let chosenTraitsArr = chosenTraits.split(" ");//Turn resulting string to array
  let traitValuesArr = [];

  for (let i = 0; i < chosenTraitsArr.length; i++) { //Iterate though the array to determine which traits were chosen
    if (chosenTraitsArr[i].toLowerCase() === "gender") {
      traitValuesArr.push(promptGender("Gender Search:" + "\n" + "Please enter either male or female.").toLowerCase());
      // genderValue = prompt("Gender Search:" + "\n" + "Please enter either male or female.").toLowerCase();
    }
    else if (chosenTraitsArr[i] === "height") {
      traitValuesArr.push(parseInt(promptHeightWeight("Height Search:" + "\n" + "Please enter an integer for height in inches without any punctuation.")));
      // heightValue = prompt("Height Search:" + "\n" + "Please enter an integer for height in inches without any punctuation.");
    }
    else if (chosenTraitsArr[i] === "weight") {
      traitValuesArr.push(parseInt(promptHeightWeight("Weight Search:" + "\n" + "Please enter an integer for weight in pounds without any punctuation.")));
      // weightValue = prompt("Weight Search:" + "\n" + "Please enter an integer for weight in pounds without any punctuation.");
    }
     else if (chosenTraitsArr[i].toLowerCase() === "eyecolor") {
      traitValuesArr.push(prompt("Eye Color Search:" + "\n" + "Please enter a color.").toLowerCase());
      // eyeColorValue = prompt("Eye Color Search:" + "\n" + "Please enter a color.").toLowerCase();
    }
    else if (chosenTraitsArr[i].toLowerCase() === "occupation") {
      traitValuesArr.push(prompt("Occupation Search:" + "\n" + "Please enter an occupation.").toLowerCase());
      // occupationValue = prompt("Occupation Search:" + "\n" + "Please enter an occupation.").toLowerCase();
    }
  }

  let searchResults = [];
  let gender = [];
  for (let i = 0; i < chosenTraitsArr.length; i++){
    if (chosenTraitsArr[i] === "gender") {
      gender = people.filter(function(list) {
        if (list.gender === traitValuesArr[i]) {
          return true;
        }
        else {
          return false;
        }
      })
    }
  }
  let height = [];
  for (let i = 0; i < chosenTraitsArr.length; i++){
    if (chosenTraitsArr[i] === "height") {
      height = people.filter(function(list) {
        if (list.height === traitValuesArr[i]) {
          return true;
        }
        else {
          return false;
        }
      })
    }
  }
  let weight = [];
  for (let i = 0; i < chosenTraitsArr.length; i++){
    if (chosenTraitsArr[i] === "weight") {
      weight = people.filter(function(list) {
        if (list.weight === traitValuesArr[i]) {
          return true;
        }
        else {
          return false;
        }
      })
    }
  }
  let eyecolor = [];
  for (let i = 0; i < chosenTraitsArr.length; i++){
    if (chosenTraitsArr[i] === "eyecolor") {
      eyecolor = people.filter(function(list) {
        if (list.eyeColor === traitValuesArr[i]) {
          return true;
        }
        else {
          return false;
        }
      })
    }
  }
  let occupation = [];
  for (let i = 0; i < chosenTraitsArr.length; i++){
    if (chosenTraitsArr[i] === "occupation") {
      occupation = people.filter(function(list) {
        if (list.occupation === traitValuesArr[i]) {
          return true;
        }
        else {
          return false;
        }
      })
    }
  }

  if (gender.length > 0) {
    for (let i = 0; i < gender.length; i++)
    searchResults.push(gender[i].firstName + " " + gender[i].lastName )
  }
  if (height.length > 0) {
    for (let i = 0; i < height.length; i++)
    searchResults.push(height[i].firstName + " " + height[i].lastName )
  }
  if (weight.length > 0) {
    for (let i = 0; i < weight.length; i++)
    searchResults.push(weight[i].firstName + " " + weight[i].lastName )
  }
  if (eyecolor.length > 0) {
    for (let i = 0; i < eyecolor.length; i++)
    searchResults.push(eyecolor[i].firstName + " " + eyecolor[i].lastName )
  }
  if (occupation.length > 0) {
    for (let i = 0; i < occupation.length; i++)
    searchResults.push(occupation[i].firstName + " " + occupation[i].lastName )
  }

  function findRepeats(arra1) {
    var object = {};
    var result = [];

    arra1.forEach(function (item) {
      if(!object[item])
          object[item] = 0;
        object[item] += 1;
    })

    for (var prop in object) {
       if(object[prop] >= chosenTraitsArr.length) {
           result.push(prop);
       }
    }
    if (result.length >= 1) {
      let verticalList = "";
      if (result.length >= 1) { //Displays all the results in a vertical list with a new person for each row to make it easier for the user to read
        for (let i = 0; i < result.length; i++) {
          verticalList += result[i] + "\n";
        }
      }
      else {
        verticalList = "Sorry. No one was found that meets that criteria."
      }
      return verticalList;
    }
  }

  alert("The following people met your search criteria: " + "\n" + findRepeats(searchResults));
  return app(people);

}

 /*======================================================================*/

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()){
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
  for (let i = 0; i < person.length; i++) { //Loop through whoever is in the "people" array to find anyone in the dataset who's ID matches either of the IDs in the "parents" array and returns a new array "descendants"
    descendants = people.filter(function(list) {
      if (person[i].id === list.parents[0] || person[i].id === list.parents[1]) {
        return true;
      }
      else{
        return false;
      }
    })
  }
  for (let i = 0; i < descendants.length; i++) { //Loop through anyone that was added to the descendants array and push those values to a new array of listDescendants"
    listDescendants.push(descendants[i].firstName + " " + descendants[i].lastName);
  }
  person = descendants; //Feed the values from descendants into person to overwrite the original values to when the function is called again, it begins by searching for children of the children found in the beginning of the function
  if (counter < people.length && person.length >= 1) { //Using recursion, reiterate through the entire dataset with the function to find all descendants
    return displayDescendants(person, people, counter + 1);
  }
  if (listDescendants.length >= 1) { //Displays all the descendants in a vertical list with a new person for each row to make it easier for the user to read
    let verticalList = "";
    for (let i = 0; i < listDescendants.length; i++) {
      verticalList += listDescendants[i] + "\n";
    }
      alert("The following are all descendants:" + "\n" + verticalList); //Display the vertical list of descencdants found
      verticalList = ""; //These values need to be "reset" to empty so if the person does another search, it doesn't add the results from a previous search to the new search results
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

// helper function to prompt and validate the input from the user when choosing which traits to use for search
function promptTraits (input) {
    var response = prompt(input).trim().toLowerCase();
    var responseArr = response.split(" ");
    let valid = "";
    if (responseArr.length > 1) {
      for (let i = 0; i < responseArr.length; i++) {
        if (responseArr[i] === "gender" || responseArr[i] === "height" || responseArr[i] === "weight" || responseArr[i] === "eyecolor" || responseArr[i] === "occupation") {
          valid = true;
        }
        else {
          valid = false;
        }
      }
      if (valid === false) {
        alert("Your response was invalid. Please choose which traits you would like to search for leaving one space between each trait (i.e.) gender height weight eyecolor occupation");
        return promptTraits(input);
      }
      else {
        return response;
      }
    }
    else {
      alert("Your response was invalid. Please choose at least 2 traits you would like to search for leaving one space between each trait (i.e. 'gender height weight eyecolor occupation')");
      return promptTraits(input);
    }
}

function promptGender (input) {
  let response = prompt(input).trim().toLowerCase();
  let valid;
  if (response === "male" || response === "female") {
    valid = true;
  }
  else {
    valid = false;
  }
  if (valid === false) {
    alert("Your response was invalid. Please choose either 'male' or 'female'.");
    return promptGender(input);
  }
  else {
    return response;
  }
}

function promptHeightWeight (input) {
  let response = prompt(input).trim().toLowerCase();
  let valid;
  let regex = new RegExp(/\b(\d)+\b/);
  if (regex.test(response)) {
    valid = true;
  }
  else {
    valid = false;
  }
  if (valid === false) {
    alert("Your response was invalid. Please choose an integer.");
    return promptHeightWeight(input);
  }
  else {
    return response;
  }
}

// function that checks for immediate family members - spouse/parents/siblings/children
function immediateFamily(person, people){

  //Iterate over every objects' id# to see if it matches the person's parent#

  function findParents(person, people){
    
    let foundParent = people.filter(function(parentID){
        if(parentID.id === person[0].parents[0] || parentID.id === person[0].parents[1]){
          return true;
        } else {
          return false;
        }
    })
      return foundParent;
  }

  let parentsFunction = findParents(person, people);
  let listOfParents = "";

    if(parentsFunction.length > 0){
      for(let i=0; i<parentsFunction.length; i++)
        listOfParents += parentsFunction[i].firstName + " " + parentsFunction[i].lastName + "\n"; 
    }

  //Iterate over every objects' parent# to see if it matches the person's parent#

  function findSiblings(person, people){
    
        let foundSibling = people.filter(function(siblingIdentifier){
          for (let i = 0; i < siblingIdentifier.parents.length; i++) {
            if((person[0].parents[0] === siblingIdentifier.parents[i] || person[0].parents[1] === siblingIdentifier.parents[i]) && person[0].id != siblingIdentifier.id) {
              return true;
            } else {
              return false;
          }
          }
        }) 

      return foundSibling;
  }

  let siblingsFunction = findSiblings(person, people);
  let listOfSiblings ="";
      
    if(siblingsFunction.length > 0){
      for(let i=0; i<siblingsFunction.length; i++)
        listOfSiblings += siblingsFunction[i].firstName + " " + siblingsFunction[i].lastName + "\n";
    } else{
      siblingsFunction = "None Found";
    }
  

  //Iterate over every objects' id# to see if it matches the person's currentSpouse#

  function findSpouse(person, people){

    let foundSpouse = people.filter(function(spouseID){
      if(spouseID.id === person[0].currentSpouse){
        return true;
      } else {
        return false;
      }
  })

    return foundSpouse[0].firstName + " " + foundSpouse[0].lastName;
  }

  
  //A function to call all the above functions

  function displayImmediateFamily(person, people){
    let printParents = listOfParents;
    let printSiblings = listOfSiblings;
    let printSpouse = findSpouse(person, people);

    let familyAlert = alert("Parents: \n" + printParents + "\nSiblings: \n" + printSiblings + "\nSpouse: " + printSpouse);

  }

  //Now call everything

  let familyInformation = displayImmediateFamily(person, people);
}
