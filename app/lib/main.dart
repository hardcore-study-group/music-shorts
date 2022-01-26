import 'package:app/page/premium_require_spotify_page.dart';
import 'package:app/page/signin_page.dart';
import 'package:app/page/signin_with_spotify_page.dart';
import 'package:flutter/material.dart';
import 'package:app/page/home_page.dart';
import 'package:app/page/player_page.dart';

void main() {
  runApp(MaterialApp(
    title: 'Music shorts',
    theme: ThemeData(
        scaffoldBackgroundColor: const Color(0xFF333333),
        splashColor: const Color(0x88000000),
        disabledColor: const Color(0x88000000),
        iconTheme: const IconThemeData(size: 16),
        appBarTheme: const AppBarTheme(
            toolbarHeight: 56,
            backgroundColor: Color(0x00000000),
            elevation: 0)),
    initialRoute: '/signin',
    debugShowCheckedModeBanner: false,
    routes: {
      '/': (context) => const HomePage(),
      '/player': (context) => const PlayerPage(),
      '/signin': (context) => const SigninPage(),
      '/signin_with_spotify': (context) => const SigninWithSpotifyPage(),
      '/premium_require_spotify': (context) =>
          const PremiumRequireSpotifyPage(),
    },
  ));
}
