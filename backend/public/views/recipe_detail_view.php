<?php
require_once '../backend/models/Recipe_verwerk.php';
require_once '../backend/models/Comment_verwerk.php';
$recipeModel = new Recipe_verwerk($pdo);
$commentModel = new Comment_verwerk($pdo);

$recipe = $recipeModel->getRecipe($_GET['id']);
$comments = $commentModel->getComments($_GET['id']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glepra - <?php echo $recipe['title']; ?></title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>

<div class="container mt-5">
    <h2><?php echo $recipe['title']; ?></h2>
    <p><strong>Ingredients:</strong></p>
    <p><?php echo nl2br(htmlspecialchars($recipe['ingredients'])); ?></p>
    <p><strong>Instructions:</strong></p>
    <p><?php echo nl2br(htmlspecialchars($recipe['instructions'])); ?></p>
    
    <h4>Comments</h4>
    <form action="../backend/controllers/RecipeController.php" method="POST">
        <div class="form-group">
            <input type="hidden" name="recipe_id" value="<?php echo $recipe['id']; ?>">
            <textarea class="form-control" name="comment" required></textarea>
        </div>
        <button type="submit" name="add_comment" class="btn btn-primary">Add Comment</button>
    </form>
    
    <div class="mt-3">
        <?php foreach ($comments as $comment): ?>
            <div class="border p-2 mb-2">
                <strong><?php echo htmlspecialchars($comment['username']); ?></strong>: <?php echo htmlspecialchars($comment['comment']); ?>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
