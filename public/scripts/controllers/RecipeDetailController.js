(function() {

    'use strict';

    angular.module('app')
        .controller('RecipeDetailController', function ($scope, $location, dataService) {

            dataService.getFooditems(function (response) {
                $scope.foodItems = response.data;
            });
            // populate fields with edited recipe details or create empty object if new recipe
            let recipeId = $location.path().split('/')[2];
            if (recipeId !== undefined) {
                dataService.getRecipe(recipeId, function (response) {
                    $scope.recipe = response.data;
                    console.log($scope.recipe);
                });
            } else {
                $scope.recipe = {};
                $scope.recipe.ingredients = [];
                $scope.recipe.steps = [];
            }

            dataService.getCategories(function (response) {
                $scope.categories = response.data;
            });

            // must add track by to the ng-options in the template! --> ng-options="category.name as category.name for category in categories track by category.name"
            $scope.updateRecipeCategory = function (selectedCategory) {
                console.log(selectedCategory);
                let index = $scope.categories.findIndex(category => category.name == selectedCategory);
                $scope.recipe.category = $scope.categories[index].name;

            };

            $scope.clearForm = function () {
                $scope.recipe = {};
                $location.path('/');
            };

            // add new recipe to the DB or update existing one
            $scope.saveRecipe = function () {
                if ($location.path() === '/add') {
                    dataService.addRecipe($scope.recipe, function () {
                        console.log($scope.recipe);
                        $location.path('/');
                    }, errorCallback)
                } else {
                    dataService.updateRecipe($scope.recipe._id, $scope.recipe, function () {
                        console.log('Recipe ' + $scope.recipe.name + ' updated');
                        console.log($scope.recipe);
                        $location.path('/');
                    }, errorCallback)
                }
            };

            $scope.addIngredient = function () {
                $scope.recipe.ingredients.push({item: '', condition: '', amount: ''});
            };

            $scope.deleteIngredient = function (ingredients, index) {
                ingredients.splice(index, 1);
            };

            $scope.addStep = function () {
                $scope.recipe.steps.push({description: ''});
            };

            $scope.deleteStep = function (steps, index) {
                steps.splice(index, 1);
            };

            // for future work - express does not return errors yet
            function errorCallback(response) {
                console.log('errorCallback');
                $scope.errors = response.data.errors;
                $scope.listErrors = [];
                for (let error in errors) {
                    $scope.listErrors.push(errors[error]);
                }
            }
        });
})();