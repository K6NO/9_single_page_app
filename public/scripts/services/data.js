(function() {

    'use strict';

    angular.module('app')
        .service('dataService', function ($http) {

            //GET /api/recipes - Gets all of the recipes.
            this.getRecipes = function (successCallback, errorCallback) {
                $http.get('/api/recipes')
                    .then(successCallback)
            };

            //GET /api/categories - Gets all of the categories.
            this.getCategories = function (successCallback, errorCallback) {
                $http.get('/api/categories')
                    .then(successCallback)
            };

            //GET /api/fooditems - Gets all of the food items.
            this.getFooditems = function (successCallback, errorCallback) {
                $http.get('/api/fooditems')
                    .then(successCallback)
            };

            //GET /api/recipes?category={category} - Gets all of the recipes for the specified category.
            this.getRecipiesInCategory = function (category, successCallback, errorCallback) {
                $http.get('/api/recipes?category=' + category)
                    .then(successCallback)
            }

            //GET /api/recipes/{id} - Gets the recipe for the specified ID.
            this.getRecipe = function (id, callback, errorCallback) {
                $http.get('/api/recipes/' + id)
                    .then(callback)
            }

            //PUT /api/recipes/{id} - Updates the recipe for the specified ID.
            this.updateRecipe = function (id, recipe, successCallback, errorCallback) {
                $http.put('/api/recipes/' + id, recipe)
                    .then(successCallback, errorCallback)
            }

            //POST /api/recipes - Adds a recipe.
            this.addRecipe = function (recipe, successCallback, errorCallback) {
                $http.post('/api/recipes', recipe)
                    .then(successCallback, errorCallback)
            };

            //DELETE /api/recipes/{id} - Deletes the recipe for the specified ID.
            this.deleteRecipe = function (id, successCallback, errorCallback) {
                $http.delete('/api/recipes/' + id)
                    .then(successCallback)
            }
        });
})();