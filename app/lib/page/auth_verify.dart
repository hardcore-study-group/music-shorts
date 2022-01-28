import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class AuthVerify extends StatefulWidget {
  final String token;

  const AuthVerify({Key? key, required this.token}) : super(key: key);

  @override
  State<AuthVerify> createState() => _AuthVerifyState();
}

class _AuthVerifyState extends State<AuthVerify> {
  @override
  void initState() {
    super.initState();
    () async {
      await FirebaseAuth.instance.signInWithCustomToken(widget.token);
      // navigate to root screen
      Navigator.pushNamedAndRemoveUntil(context, '/', (_) => false);
    }();
  }

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
