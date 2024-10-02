<?php
class Recipe_verwerk {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAllRecipes() {
        $stmt = $this->pdo->query("SELECT * FROM recipes");
        return $stmt->fetchAll();
    }

    public function addRecipe($userId, $title, $ingredients, $instructions) {
        $stmt = $this->pdo->prepare("INSERT INTO recipes (user_id, title, ingredients, instructions) VALUES (?, ?, ?, ?)");
        $stmt->execute([$userId, $title, $ingredients, $instructions]);
    }

    public function getRecipe($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM recipes WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }
}
?>
