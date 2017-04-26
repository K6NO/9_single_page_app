(function(){
    'use strict';

    angular.module('app')
        .controller('RecipesController',  function ($scope, $location, $filter, dataService) {

            // get all recipes and categories
            dataService.getRecipes(function (response) {
                $scope.recipes = response.data;
            });

            dataService.getCategories(function (response) {
                $scope.categories = response.data;
            });

            // limit recipes when category <select> is switched
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

            // transfer user to the recipe details screen when edit or add new buttons are clicked
            $scope.editRecipe = function (recipe) {
                $location.path('/edit/' + recipe._id);
            };

            $scope.addRecipe = function () {
                $location.path('/add');
            };

            // delete button click handler (confirmation is in the confirm.js directive)
            $scope.deleteRecipe = function (recipe) {
                dataService.deleteRecipe(recipe._id, function () {
                    dataService.getRecipes(function (response) {
                        $scope.recipes = response.data;
                    });
                });
            }
        });
})();
