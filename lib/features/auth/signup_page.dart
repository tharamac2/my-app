import 'package:flutter/material.dart';
<<<<<<< HEAD

class SignupPage extends StatelessWidget {
  const SignupPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Text("Signup Page")),
=======
import 'widgets/custom_input.dart';
import 'widgets/primary_button.dart';
import '../../app_routes.dart';

class SignupPage extends StatefulWidget {
  const SignupPage({super.key});

  @override
  State<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  final nameCtrl = TextEditingController();
  final emailCtrl = TextEditingController();
  final phoneCtrl = TextEditingController();
  final passCtrl = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(22),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 30),

              Text(
                "Create Account ✨",
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Colors.blue[900],
                ),
              ),
              const SizedBox(height: 6),

              const Text(
                "Join us today",
                style: TextStyle(color: Colors.grey, fontSize: 15),
              ),

              const SizedBox(height: 40),

              CustomInput(label: "Full Name", controller: nameCtrl),
              const SizedBox(height: 20),

              CustomInput(label: "Email", controller: emailCtrl),
              const SizedBox(height: 20),

              CustomInput(label: "Phone Number", controller: phoneCtrl),
              const SizedBox(height: 20),

              CustomInput(
                label: "Password",
                controller: passCtrl,
                isPassword: true,
              ),

              const SizedBox(height: 30),

              PrimaryButton(
                text: "Create Account",
                onPressed: () {},
              ),

              const SizedBox(height: 30),

              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("Already have an account?"),
                  TextButton(
                    onPressed: () {
                      Navigator.pushNamed(context, AppRoutes.login);
                    },
                    child: const Text("Login"),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
>>>>>>> 95497341d0bfd7ca05aadc2e761674c48c399761
    );
  }
}
