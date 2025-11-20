import 'package:flutter/material.dart';
<<<<<<< HEAD
import 'theme/app_theme.dart';
import 'theme/app_router.dart';
=======
import 'app_routes.dart';
import 'app_router.dart';
>>>>>>> 95497341d0bfd7ca05aadc2e761674c48c399761

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
<<<<<<< HEAD
    return MaterialApp.router(
      title: 'My App',
      theme: AppTheme.lightTheme,
      routerConfig: AppRouter.router, // <--- This works now
=======
    return MaterialApp(
      debugShowCheckedModeBanner: false,

      title: 'Brand Xpress',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),

      initialRoute: AppRoutes.splash,  
      onGenerateRoute: AppRouter.generateRoute,
>>>>>>> 95497341d0bfd7ca05aadc2e761674c48c399761
    );
  }
}
