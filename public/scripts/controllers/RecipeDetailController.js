'use strict';
angular.module('app')
    .controller('RecipeDetailController', function ($scope, $location, dataService) {
        let recipeId = $location.path().split('/')[2];
        if (recipeId !== undefined) {
            dataService.getRecipe(recipeId, function (response) {
                $scope.recipe = response.data;
            });
        } else {
            $scope.recipe = {};
            $scope.recipe.ingredients = [];
            $scope.recipe.steps = [];
        }
        dataService.getCategories(function (response) {
            $scope.categories = response.data;
            if($scope.recipe){
                let index = $scope.categories.findIndex(category => category.name == $scope.recipe.category);
                $scope.selectedCategory = $scope.categories[index];
            }
        });

        dataService.getFooditems(function (response) {
            $scope.foodItems = response.data;
            console.log($scope.foodItems)
        });

        $scope.clearForm = function() {
            $scope.recipe = {};
            $location.path('/');
        };

        $scope.saveRecipe = function () {
            if($location.path() === '/add'){
                dataService.addRecipe($scope.recipe, function (response) {
                    console.log('Recipe added');
                    console.log(response);
                    $location.path('/');
                }, errorCallback)
            } else {
                dataService.updateRecipe($scope.recipe._id, $scope.recipe, function () {
                    console.log('Recipe ' + $scope.recipe.name + ' updated');
                    $location.path('/');
                }, errorCallback)
            }
        };
        
        $scope.addIngredient = function () {
            $scope.recipe.ingredients.push({item : '', condition : '', amount : ''});
        };

        $scope.deleteIngredient = function (ingredients, index) {
            ingredients.splice(index, 1);
        };

        $scope.addStep = function () {
            $scope.recipe.steps.push({description : ''});
        };

        $scope.deleteStep = function (steps, index) {
            steps.splice(index, 1);
        };

        function errorCallback (response) {
            console.log('errorCallback');
            $scope.errors = response.data.errors;
            $scope.listErrors = [];
            for(let error in errors){
                $scope.listErrors.push(errors[error]);
            }
        }
    });