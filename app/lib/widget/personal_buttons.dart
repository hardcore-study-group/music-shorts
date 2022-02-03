import 'package:app/page/profile_page.dart';
import "package:flutter/material.dart";

class PersonalButtons extends StatelessWidget {
  const PersonalButtons({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(
        top: 50,
        right: 10,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: const [
          ProfileButton(),
          PlayListButton(),
        ],
      ),
    );
  }
}

class ProfileButton extends StatelessWidget {
  const ProfileButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () {
        Navigator.push(context,
            MaterialPageRoute(builder: (context) => const ProfilePage()));
      },
      child: Column(
        children: const [
          Icon(
            Icons.account_circle_rounded,
            color: Colors.white,
            size: 30,
          ),
        ],
      ),
    );
  }
}

class PlayListButton extends StatelessWidget {
  const PlayListButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () {
        print('playlist clicked');
      },
      child: Column(
        children: const [
          Icon(
            Icons.playlist_play_rounded,
            color: Colors.white,
            size: 30,
          ),
        ],
      ),
    );
  }
}
