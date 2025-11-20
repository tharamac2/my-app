import 'package:go_router/go_router.dart';
import 'package:flutter/material.dart';

// Correct imports based on your folder structure
import '../../features/auth/login_page.dart';
import '../../features/auth/splash_screen.dart';
import '../../features/onboarding/walkthrough_screen.dart';
import '../../features/home/home_screen.dart';

class AppRouter {
  static final GoRouter router = GoRouter(
    initialLocation: '/splash',

    routes: [
      GoRoute(
        path: '/splash',
        builder: (context, state) => const SplashScreen(),
      ),

      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginPage(),
      ),

      GoRoute(
        path: '/walkthrough',
        builder: (context, state) => const WalkthroughScreen(),
      ),

      GoRoute(
        path: '/home',
        builder: (context, state) => const HomeScreen(),
      ),
    ],
  );
}
