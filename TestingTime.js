//global variables
var questions = []
var users = [];
var responses = []
var count = 0;

//constructor for Question object
function Question(id, question, answers) {
  this.id = id;
  this.question = question;
  this.answers = answers
}

//constructor for User object
function User(id, email) {
  this.id = id;
  this.email = email;
}

//constructor for Response object
function Response(userId, questionId, answeredIndex) {
  this.userId = userId;
  this.questionId = questionId;
  this.answeredIndex = answeredIndex;
}

//instantiate Question object for type of phone
var phoneQuestion = new Question("1", "What smartphone do you own?", ["Android", "iPhone", "Windows", "others"]);

//instantiate Question object for travel
var travelQuestion = new Question("2", "How do you travel most regularly?", ["By car","By public transport", "others"]);

//add both question objects into the questions array
questions.push(phoneQuestion);
questions.push(travelQuestion);

//instantiates new User objects with sample data and pushes them into the users array
var user1 = new User ("1", "a.gmail.com");
var user2 = new User ("2", "b.gmail.com");
var user3 = new User ("3", "c.gmail.com");
users.push(user1);
users.push(user2);
users.push(user3);

//function to quickly instantiate Response objects and populate the responses array
//parameter is an array of arrays
//[[userId, questionId, answeredIndex]]
function createResponseObjects(array) {
  for (var i = 0; i < array.length; i++) {
    var response = new Response (array[i][0], array[i][1], array[i][2]);
    responses.push(response);
  }
}
//calls function to create resposne objects with sample response data
createResponseObjects([["3", "2", 0],["1", "1", 1],["2", "2", 3],["2", "1", 2],["3", "1", 1],["1", "2", 0],["4", "2", 2],["4", "1", 2],["5", "1", 1],["5", "2", 0]]);


//MAIN FUNCTION
//returns the number of people who answered both questions in a specified way
//assumes that each user has answered both questions
//assumes data may not be in order
function answerCount(desiredPhoneAnswer, desiredTravelAnswer) {
  //sorts the objects in the responses array by userId first and then by questionId
  responses.sort(function(obj1,obj2){
    if (obj1.userId === obj2.userId){
       return (obj1.questionId - obj2.questionId);
    } else if(obj1.userId > obj2.userId){
       return 1;
    } else if(obj1.userId < obj2.userId){
       return -1;
    }
  });

  //checks to see if the user's answer for the first question is the response we are looking for
  //and checks to see if the user's answer to the second question is also the response we want
  //increments the count variable if both conditions are met
  for(var i = 0; i < responses.length -1; i+=2) {
    if (responses[i]["answeredIndex"] === desiredPhoneAnswer && responses[i+1]["answeredIndex"] === desiredTravelAnswer) {
      count++;
    }
  }
  return count;
}

//calls function using "iPhone" and "car" as the desired responses.
answerCount(1,0);
