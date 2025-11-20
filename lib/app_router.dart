import 'package:flutter/material.dart';
import 'app_routes.dart';

// import your screens
import 'features/auth/login_page.dart';
import 'features/auth/signup_page.dart';

class AppRouter {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {

      case AppRoutes.splash:
        return MaterialPageRoute(
          builder: (_) => const Scaffold(
            body: Center(child: Text("Splash Loading...")),
          ),
        );

      case AppRoutes.login:
        return MaterialPageRoute(
          builder: (_) => const LoginPage(),
        );

      case AppRoutes.signup:
        return MaterialPageRoute(
          builder: (_) => const SignupPage(),
        );

      default:
        return MaterialPageRoute(
          builder: (_) => const Scaffold(
            body: Center(child: Text("Route Not Found")),
          ),
        );
    }
  }
}
