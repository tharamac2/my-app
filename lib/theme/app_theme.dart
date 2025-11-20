import 'package:flutter/material.dart';
import 'text_theme.dart';

class AppTheme {
  static ThemeData lightTheme = ThemeData(
    brightness: Brightness.light,
    primarySwatch: Colors.blue,
    scaffoldBackgroundColor: Colors.white,
    textTheme: AppTextTheme.textTheme,
    useMaterial3: true,
  );
}
