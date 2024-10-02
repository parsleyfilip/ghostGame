<?php
class Comment_verwerk {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getComments($recipeId) {
        $stmt = $this->pdo->prepare("SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE recipe_id = ?");
        $stmt->execute([$recipeId]);
        return $stmt->fetchAll();
    }

    public function addComment($recipeId, $userId, $comment) {
        $stmt = $this->pdo->prepare("INSERT INTO comments (recipe_id, user_id, comment) VALUES (?, ?, ?)");
        $stmt->execute([$recipeId, $userId, $comment]);
    }
}
?>
