import 'package:flutter/material.dart';
import 'app_router.dart';
import 'app_routes.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Brand Xpress Advanced Editor',
      initialRoute: AppRoutes.splash, // your friend is building this
      onGenerateRoute: AppRouter.generateRoute,
      theme: ThemeData(
        useMaterial3: true,
      ),
    );
  }
}
