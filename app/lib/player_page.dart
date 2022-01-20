import 'package:flutter/material.dart';
import 'package:app/widget/music_information.dart';

class PlayerPage extends StatefulWidget {
  const PlayerPage({Key? key}) : super(key: key);

  @override
  _PlayerPageState createState() => _PlayerPageState();
}

class _PlayerPageState extends State<PlayerPage> {
  final String _imageUrl =
      // "https://image.bugsm.co.kr/album/images/500/222/22287.jpg"; // mm
      "https://image.bugsm.co.kr/album/images/500/151758/15175845.jpg"; // pch
  final String _title = "Peaches (feat.Daniel Caesar & Giveon)";
  final String _artist = "Justin Bieber, Daniel Caesar, Giveon";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AppBar Example'),
      ),
      body: Container(
        color: Color(0xff222222),
        child: Column(
          children: [
            MusicInformation(title: _title, artist: _artist),
            Image.network(_imageUrl),
          ],
        ),
      ),
    );
  }
}
