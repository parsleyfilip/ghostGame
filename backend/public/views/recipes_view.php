<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glepra - Recipes</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>

<div class="container mt-5">
    <h2>Recipes</h2>
    <a href="add_recipe_view.php" class="btn btn-primary mb-3">Add Recipe</a>
    <div class="list-group">
        <?php foreach ($recipes as $recipe): ?>
            <a href="recipe_detail_view.php?id=<?php echo $recipe['id']; ?>" class="list-group-item list-group-item-action">
                <?php echo $recipe['title']; ?>
            </a>
        <?php endforeach; ?>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
