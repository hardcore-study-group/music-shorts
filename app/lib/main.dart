import 'package:app/page/auth_verify_page.dart';
import 'package:app/page/playlist_page.dart';
import 'package:app/page/premium_require_spotify_page.dart';
import 'package:app/page/profile_page.dart';
import 'package:app/page/signin_page.dart';
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

  // print("user info");
  // print(FirebaseAuth.instance.currentUser);

  runApp(MaterialApp(
      title: 'Music Shorts',
      theme: ThemeData(
          scaffoldBackgroundColor: const Color(0xFF222222),
          splashColor: const Color(0x88000000),
          disabledColor: const Color(0x88000000),
          // iconTheme: const IconThemeData(size: 16),
          appBarTheme: const AppBarTheme(
              toolbarHeight: 56,
              backgroundColor: Color(0x00000000),
              elevation: 0)),
      initialRoute: '/playlist',
      debugShowCheckedModeBanner: false,
      onGenerateRoute: (settings) {
        switch (settings.name) {
          case '/':
            return MaterialPageRoute(builder: (context) => const HomePage());
          case '/player':
            return MaterialPageRoute(builder: (context) => const PlayerPage());
          case '/signin':
            return MaterialPageRoute(builder: (context) => const SigninPage());
          case '/profile':
            return MaterialPageRoute(builder: (context) => const ProfilePage());
          case '/playlist':
            return MaterialPageRoute(builder: (context) => const Playlist());
          case '/premium_require_spotify':
            return MaterialPageRoute(
                builder: (context) => const PremiumRequireSpotifyPage());
        }
        // Handle '/verify/:id'
        var uri = Uri.parse(settings.name!);
        if (uri.pathSegments.length == 2 &&
            uri.pathSegments.first == 'verify') {
          var token = uri.pathSegments[1];
          return MaterialPageRoute(
              builder: (context) => AuthVerify(token: token));
        }
      }));
}
