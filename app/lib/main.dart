import 'package:app/page/premium_require_spotify_page.dart';
import 'package:app/page/signin_page.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:app/page/home_page.dart';
import 'package:app/page/player_page.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  print(FirebaseAuth.instance.currentUser);

  runApp(MaterialApp(
    title: 'Music shorts',
    theme: ThemeData(
        scaffoldBackgroundColor: const Color(0xFF333333),
        splashColor: const Color(0x88000000),
        disabledColor: const Color(0x88000000),
        // iconTheme: const IconThemeData(size: 16),
        appBarTheme: const AppBarTheme(
            toolbarHeight: 56,
            backgroundColor: Color(0x00000000),
            elevation: 0)),
    initialRoute: '/',
    debugShowCheckedModeBanner: false,
    routes: {
      '/': (context) => const HomePage(),
      '/player': (context) => const PlayerPage(),
      '/signin': (context) => const SigninPage(),
      '/premium_require_spotify': (context) =>
          const PremiumRequireSpotifyPage(),
    },
  ));
}
