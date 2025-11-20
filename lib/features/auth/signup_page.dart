import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'controllers/auth_controller.dart';
import '../../core/widgets/app_button.dart';
import '../../core/widgets/app_textfield.dart';
import '../../app_routes.dart';

class SignupPage extends StatelessWidget {
  SignupPage({super.key});

  final nameCtrl = TextEditingController();
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

            Text("Create Account", style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
            SizedBox(height: 30),

            AppTextField(controller: nameCtrl, hint: "Full Name"),
            SizedBox(height: 15),

            AppTextField(controller: emailCtrl, hint: "Email"),
            SizedBox(height: 15),

            AppTextField(controller: passwordCtrl, hint: "Password", obscureText: true),
            SizedBox(height: 25),

            AppButton(
              text: auth.isLoading ? "Please wait..." : "Register",
              onTap: () async {
                final success = await auth.signup(
                  name: nameCtrl.text.trim(),
                  email: emailCtrl.text.trim(),
                  password: passwordCtrl.text.trim(),
                );

                if (success) {
                  Navigator.pushNamed(context, AppRoutes.home);
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
