import 'package:go_router/go_router.dart';
import '../features/auth/login_page.dart';
import '../features/onboarding/walkthrough.dart';
import '../features/home/home_screen.dart';

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
        builder: (context, state) => const Walkthrough(),
      ),
      GoRoute(
        path: '/home',
        builder: (context, state) => const HomeScreen(),
      ),
    ],
  );
}
