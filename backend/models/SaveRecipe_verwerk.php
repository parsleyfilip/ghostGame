<?php
class SaveRecipe_verwerk {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function saveRecipe($userId, $recipeId) {
        $stmt = $this->pdo->prepare("SELECT * FROM saved_recipes WHERE user_id = ? AND recipe_id = ?");
        $stmt->execute([$userId, $recipeId]);
        
        if ($stmt->rowCount() == 0) {
            $stmt = $this->pdo->prepare("INSERT INTO saved_recipes (user_id, recipe_id) VALUES (?, ?)");
            $stmt->execute([$userId, $recipeId]);

            $stmt = $this->pdo->prepare("UPDATE recipes SET saves = saves + 1 WHERE id = ?");
            $stmt->execute([$recipeId]);
        }
    }

    public function getTrendingUsers() {
        $stmt = $this->pdo->query("
            SELECT users.username, COUNT(saved_recipes.id) AS save_count 
            FROM saved_recipes 
            JOIN users ON saved_recipes.user_id = users.id 
            GROUP BY users.id 
            ORDER BY save_count DESC 
            LIMIT 10
        ");
        return $stmt->fetchAll();
    }
}
?>
