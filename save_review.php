<?php
header('Content-Type: text/html; charset=utf-8');

// Параметры подключения
$db_host = 'localhost';
$db_name = 'trebricon_reviews';
$db_user = 'root';
$db_pass = ''; // Пароль по умолчанию в OpenServer пустой

try {
    // Подключение к БД
    $db = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Получение данных из формы
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $review_text = $_POST['review'] ?? '';
    
    // Подготовка SQL запроса
    $stmt = $db->prepare("INSERT INTO reviews (name, email, review_text) VALUES (?, ?, ?)");
    $stmt->execute([$name, $email, $review_text]);
    
    // Ответ об успешном сохранении
    echo json_encode(['success' => true, 'message' => 'Отзыв отправлен на модерацию']);
} catch(PDOException $e) {
    // Обработка ошибок
    echo json_encode(['success' => false, 'message' => 'Ошибка: ' . $e->getMessage()]);
}
?>