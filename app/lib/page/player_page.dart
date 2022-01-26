import 'package:app/widget/music_controller.dart';
import 'package:flutter/material.dart';
import 'package:app/widget/music_information.dart';
// import 'package:spotify_sdk/platform_channels.dart';
// import 'package:spotify_sdk/spotify_sdk.dart';

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
        title: const Text('Player',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 16,
            )),
        backgroundColor: const Color(0xff222222),
        elevation: 0,
        automaticallyImplyLeading: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios),
          onPressed: () {},
        ),
      ),
      body: Container(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        color: const Color(0xff222222),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 20),
              child: MusicInformation(
                title: _title,
                artist: _artist,
                leading: 8,
                isBold: true,
                isAlignLeft: false,
              ),
            ),
            Image.network(_imageUrl),
            const SizedBox(height: 20),
            MusicController(),
          ],
        ),
      ),
    );
  }
}
