

var app = angular.module("QuestionApp", ["QuestionApp.controllers", "ngRoute"]);

//app.config(['$locationProvider', function ($locationProvider) {
//    $locationProvider.hashPrefix('');
//}]);

app.config(["$routeProvider", function ($routeProvider, $locationProvider) {
    $routeProvider        
        .when("/", { templateUrl: "QuestionPartials/Questions.html", controller: "QuestionController" })
        .when("/addQuestion", { templateUrl: "QuestionPartials/AddQuestions.html", controller: "QuestionController" })
        //.when("/addQuestion", { templateUrl: "QuestionPartials/Questions.html", controller: "QuestionController" })
        .when("/editQuestion/:id", { templateUrl: "QuestionPartials/EditQuestion.html", controller: "QuestionEditController" })
        //.when("/deleteQuestion", { templateUrl: "QuestionPartials/Questions.html", controller: "QuestionController" })
        .otherwise({ redirectTo: "/" });
}]);