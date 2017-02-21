

angular.module("QuestionApp.controllers", [])
.controller("QuestionController", function ($scope, QuestionService, $routeParams, $location, $window) {
    $scope.message = "Message from question controller";

    $scope.rowToDisplay = 10;
    $scope.sortColumn1 = "Date";
    $scope.reverseSort = false;
    $scope.sortData = function (column) {
        $scope.reverseSort = ($scope.sortColumn1 == column) ? !$scope.reverseSort : false;
        $scope.sortColumn1 = column;
    }

    $scope.getSortClass = function (column) {
        if ($scope.sortColumn1 == column) {
            return $scope.reverseSort ? 'arrowDown' : 'arrowUp';
        }
        return '';
    }
    $scope.removeText = function () {
        
    }

    //Data processing with server side
    //This is the way of fetching data from post factory
    QuestionService.getQuestionFromDB().then(function (d) {
        $scope.listOfQuestion = d.data.list;
    })

    $scope.addQuestionToDB = function () {
        NProgress.start();
        QuestionService.addQuestionToDB($scope.Question);   //This is why, we used Question.title and so on in AddQuestion.html   
        $location.path('/');
        //$window.location.href = '/';

    }

    $scope.deleteQuestion = function (id) {
        QuestionService.deleteQuestionFromDB(id);
    }
})
.controller("QuestionEditController", function ($scope, QuestionService, $routeParams) {
    $scope.message1 = "Edit page";
    QuestionService.getQuestionByID($routeParams.id).then(function (d) {  //$routeParams.id is the id in the url
        $scope.Question = d.data.question;
    })

    $scope.updatePlayer = function () {
        QuestionService.updateQuestionToDB($scope.Question);
    }
})
.factory("QuestionService", ["$http", function ($http, $route, $location) {
    var fac = {};

    fac.getQuestionFromDB = function () {
        return $http.get("/Home/GetQuestions");
    }

    fac.addQuestionToDB = function (question) {
        return $http.post("/Home/AddQuestion", question).success(function (response) {
            //alert(response.status);
            //document.getElementById("title").value = "";
            //document.getElementById("question").value = "";
            NProgress.done();
            //$location.path('/');
            //window.location.href = '/';
        });
    }

    fac.getQuestionByID = function (id) {
        return $http.get("/Home/GetQuestionByID", { params: { id: id } });
    }

    fac.updateQuestionToDB = function (question) {
        return $http.post("/Home/UpdateQuestion", question).success(function (response) {
            alert(response.status);
        })
    }
    fac.deleteQuestionFromDB = function (id) {
        return $http.post("/Home/DeleteQuestion", { id: id }).success(function (response) {
            alert(response.status);
            // $route.reload();
        })
    }

    return fac;
}])
