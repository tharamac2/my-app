import 'package:flutter/material.dart';
import '../../../data/services/firebase_auth_service.dart';
import '../../../data/repositories/user_repository.dart';

class AuthController extends ChangeNotifier {
  final FirebaseAuthService _authService = FirebaseAuthService();
  final UserRepository _userRepository = UserRepository();

  bool isLoading = false;

  Future<bool> login(String email, String password) async {
    isLoading = true;
    notifyListeners();

    final user = await _authService.login(email, password);

    isLoading = false;
    notifyListeners();

    return user != null;
  }

  Future<bool> signup({
    required String name,
    required String email,
    required String password,
  }) async {
    isLoading = true;
    notifyListeners();

    final user = await _authService.register(email, password);

    if (user != null) {
      await _userRepository.saveUser(
        user.uid,
        {
          "name": name,
          "email": email,
          "createdAt": DateTime.now().toString(),
        },
      );

      isLoading = false;
      notifyListeners();
      return true;
    }

    isLoading = false;
    notifyListeners();
    return false;
  }
}
