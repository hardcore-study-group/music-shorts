import 'package:app/util/hex_color.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

class PremiumRequireSpotifyPage extends StatefulWidget {
  const PremiumRequireSpotifyPage({Key? key}) : super(key: key);

  @override
  State<PremiumRequireSpotifyPage> createState() =>
      _PremiumRequireSpotifyPageState();
}

class _PremiumRequireSpotifyPageState extends State<PremiumRequireSpotifyPage> {
  void _launchURL() async {
    const _url = "https://www.spotify.com/premium"; // spotify premium link
    if (!await launch(_url, forceSafariVC: false)) {
      // open url with browser
      throw "Could not launch $_url";
    }
  }

  void _signOut() async {
    await FirebaseAuth.instance.signOut();
    Navigator.pushNamedAndRemoveUntil(context, '/', (_) => false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Premium',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 16,
            )),
      ),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(16, 24, 16, 24),
        child: Column(
          children: [
            Container(
                margin: const EdgeInsets.fromLTRB(8, 0, 8, 40),
                alignment: Alignment.centerLeft,
                child:
                    const Text('This service need a premium spotify account.',
                        style: TextStyle(
                          height: 1.5,
                          color: Color(0xffffffff),
                        ))),
            MaterialButton(
                minWidth: double.infinity,
                height: 64,
                color: HexColor('#1DB954'),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(32),
                ),
                onPressed: _launchURL,
                padding: const EdgeInsets.all(0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      MdiIcons.spotify,
                      color: HexColor('#ffffff'),
                      size: 24,
                    ),
                    Container(width: 8),
                    Text(
                      'Upgrade to premium',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: HexColor('#ffffff'),
                      ),
                    ),
                  ],
                )),
            Container(
              margin: const EdgeInsets.fromLTRB(0, 8, 0, 0),
              child: TextButton(
                  onPressed: _signOut,
                  child: const Text(
                    'or sign out',
                    style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: Colors.white),
                  )),
            )
          ],
        ),
      ),
    );
  }
}
