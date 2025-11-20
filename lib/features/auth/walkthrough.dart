import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../theme/app_routes.dart';

class WalkthroughScreen extends StatelessWidget {
  const WalkthroughScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Text("Walkthrough Page")),
      floatingActionButton: FloatingActionButton(
        onPressed: () => context.go(AppRoutes.login),
        child: const Icon(Icons.arrow_forward),
      ),
    );
  }
}
