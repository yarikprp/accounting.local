export function getFirebaseErrorMessage(errorCode) {
  const errorMessages = {
    "auth/user-not-found": "Пользователь с таким email не найден!",
    "auth/wrong-password": "Неверный пароль!",
    "auth/invalid-email": "Некорректный email!",
    "auth/too-many-requests": "Слишком много попыток входа. Попробуйте позже!",

    "auth/email-already-in-use": "Этот email уже используется!",
    "auth/weak-password": "Слишком слабый пароль!",
    "auth/operation-not-allowed": "Регистрация отключена!",
  };

  return errorMessages[errorCode] || "Произошла ошибка!";
}
