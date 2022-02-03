import 'package:app/page/signin_page.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Profile',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 16,
              )),
        ),
        body: Column(
          children: [
            MaterialButton(
                height: 64,
                minWidth: double.infinity,
                onPressed: () async => {
                      if (FirebaseAuth.instance.currentUser == null)
                        {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => const SigninPage()))
                        }
                      else
                        {
                          await FirebaseAuth.instance.signOut(),
                          Navigator.pop(context)
                        }
                    },
                child: Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                        FirebaseAuth.instance.currentUser == null
                            ? "Sign in"
                            : "Sign out",
                        style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold)))),
            MaterialButton(
                height: 64,
                minWidth: double.infinity,
                onPressed: () async =>
                    {await launch("https://music-shorts.com/agreement")},
                child: const Align(
                    alignment: Alignment.centerLeft,
                    child: Text("Agreement",
                        style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold)))),
            MaterialButton(
                height: 64,
                minWidth: double.infinity,
                onPressed: () async =>
                    {await launch("https://music-shorts.com/privacy-policy")},
                child: const Align(
                    alignment: Alignment.centerLeft,
                    child: Text("Privacy policy",
                        style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold)))),
            MaterialButton(
                height: 64,
                minWidth: double.infinity,
                onPressed: () async => {
                      await launch(
                          "https://music-shorts.com/open-source-license")
                    },
                child: const Align(
                    alignment: Alignment.centerLeft,
                    child: Text("Open source license",
                        style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold)))),
            MaterialButton(
                height: 64,
                minWidth: double.infinity,
                onPressed: () async =>
                    {await launch("mailto:coderhyun476@gmail.com")},
                child: const Align(
                    alignment: Alignment.centerLeft,
                    child: Text("Contect us",
                        style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold)))),
            MaterialButton(
                height: 64,
                minWidth: double.infinity,
                onPressed: () async => {
                      await launch("https://www.instagram.com/dev_hyun/",
                          forceSafariVC: false)
                    },
                child: const Align(
                    alignment: Alignment.centerLeft,
                    child: Text("Instagram",
                        style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold)))),
          ],
        ));
  }
}
