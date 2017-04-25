'use strict';

angular.module('app')
    .controller('RecipesController',  function ($scope, $location, $filter, dataService) {

        //$scope.selectedCategory = {};

        dataService.getRecipes(function (response) {
            $scope.recipes = response.data;
        });

        dataService.getCategories(function (response) {
            $scope.categories = response.data;
            console.log(response.data);
        });

        // not working
        $scope.limitRecipesByCategory = function (category) {
            if (category !== null){
                dataService.getRecipiesInCategory(category.name, function (response) {
                    $scope.recipes = response.data;
                });
            } else {
                dataService.getRecipes(function (response) {
                    $scope.recipes = response.data;
                });
            }
        };

        $scope.editRecipe = function (recipe) {
            $location.path('/edit/' + recipe._id);
        };

        $scope.addRecipe = function () {
            $location.path('/add');
        };

        $scope.deleteRecipe = function (recipe) {
            console.log(recipe._id);
            dataService.deleteRecipe(recipe._id, function () {
                dataService.getRecipes(function (response) {
                    $scope.recipes = response.data;
                });
            });
        }

    });