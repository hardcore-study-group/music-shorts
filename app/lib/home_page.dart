import 'package:flutter/material.dart';
import 'package:app/widget/music_slide.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          MusicSlide(),
        ],
      ),
    );
  }
}

// account_circle_outlined, playlist_play_rounded