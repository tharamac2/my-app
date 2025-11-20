import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'controllers/auth_controller.dart';
import '../../core/widgets/app_textfield.dart';
import '../../core/widgets/app_button.dart';
import '../../app_routes.dart';

class LoginPage extends StatelessWidget {
  LoginPage({super.key});

  final emailCtrl = TextEditingController();
  final passwordCtrl = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthController>(context);

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            
            Text("Login", style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
            SizedBox(height: 30),

            AppTextField(
              controller: emailCtrl,
              hint: "Email",
            ),

            SizedBox(height: 15),

            AppTextField(
              controller: passwordCtrl,
              hint: "Password",
              obscureText: true,
            ),

            SizedBox(height: 25),

            AppButton(
              text: auth.isLoading ? "Loading..." : "Login",
              onTap: () async {
                final success = await auth.login(
                  emailCtrl.text.trim(),
                  passwordCtrl.text.trim(),
                );

                if (success) {
                  Navigator.pushNamed(context, AppRoutes.home);
                }
              },
            ),

            SizedBox(height: 20),

            GestureDetector(
              onTap: () {
                Navigator.pushNamed(context, AppRoutes.signup);
              },
              child: Text("Create an account", style: TextStyle(color: Colors.blue)),
            )
          ],
        ),
      ),
    );
  }
}
