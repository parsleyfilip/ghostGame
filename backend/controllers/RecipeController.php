<?php
require_once '../config/database.php';
require_once '../models/Recipe_verwerk.php';
require_once '../models/Comment_verwerk.php';
require_once '../models/SaveRecipe_verwerk.php';

session_start();
$recipeModel = new Recipe_verwerk($pdo);
$commentModel = new Comment_verwerk($pdo);
$saveRecipeModel = new SaveRecipe_verwerk($pdo);

// Fetch all recipes
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $recipes = $recipeModel->getAllRecipes(); // Method to fetch all recipes
}

// Handle adding a new recipe
if (isset($_POST['add_recipe'])) {
    $userId = $_SESSION['user_id']; // Get user ID from session
    $title = $_POST['title'];
    $ingredients = $_POST['ingredients'];
    $instructions = $_POST['instructions'];
    $recipeModel->addRecipe($userId, $title, $ingredients, $instructions);
    header("Location: ../views/recipes_view.php"); // Redirect to recipes page
    exit();
}

// Handle comments
if (isset($_POST['add_comment'])) {
    $recipeId = $_POST['recipe_id'];
    $userId = $_SESSION['user_id'];
    $comment = $_POST['comment'];
    $commentModel->addComment($recipeId, $userId, $comment);
    header("Location: ../views/recipe_detail_view.php?id=" . $recipeId); // Redirect back to the recipe detail page
    exit();
}
?>
