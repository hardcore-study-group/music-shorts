import 'package:app/page/player_page.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';

class Playlist extends StatefulWidget {
  const Playlist({Key? key}) : super(key: key);

  @override
  State<Playlist> createState() => _PlaylistState();
}

class _PlaylistState extends State<Playlist> {
  List playlist = [];

  void shuffle() {
    Navigator.push(
        context,
        MaterialPageRoute(
            settings:
                RouteSettings(arguments: PlayerPageScreenArguments(null, true)),
            builder: (context) => const PlayerPage()));
  }

  void init() async {
    HttpsCallable callable =
        FirebaseFunctions.instance.httpsCallable('getMyPlaylist');
    dynamic result = await callable();
    setState(() {
      playlist = List.from(result.data);
    });
  }

  @override
  void initState() {
    init();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Playlist',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 16,
            )),
        actions: [
          SizedBox(
            width: 60,
            child: MaterialButton(
                onPressed: shuffle,
                child: const Icon(
                  MdiIcons.shuffle,
                  color: Colors.white,
                  size: 24,
                )),
          )
        ],
      ),
      body: ListView.builder(
          itemCount: playlist.length,
          itemBuilder: (context, index) {
            final item = playlist[index];
            return Dismissible(
                key: Key(item["id"]),
                onDismissed: (direction) async {
                  setState(() {
                    playlist.removeAt(index);
                  });
                  await FirebaseFunctions.instance.httpsCallable(
                      'removePlaylistOneTrack')({"id": item["id"]});
                },
                background: Container(color: Colors.red),
                child: MaterialButton(
                    height: 64,
                    // width: double.infinity,
                    onPressed: () => {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  settings: RouteSettings(
                                      arguments: PlayerPageScreenArguments(
                                          item["id"], false)),
                                  builder: (context) => const PlayerPage()))
                        },
                    padding: const EdgeInsets.fromLTRB(16, 0, 16, 0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        ClipRRect(
                            borderRadius: BorderRadius.circular(4),
                            child: Image.network(
                              item["track"]["image"],
                              fit: BoxFit.cover,
                              width: 36,
                              height: 36,
                            )),
                        Container(
                            margin: const EdgeInsets.fromLTRB(16, 0, 0, 0),
                            height: 36,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  item["track"]["name"],
                                  style: const TextStyle(color: Colors.white),
                                ),
                                Text(
                                  "${item["track"]["artist_names"].join(", ")} ・ ${(item["track"]["duration_ms"] / 60000).floor()}:${((item["track"]["duration_ms"] / 1000) % 60).floor()}",
                                  style: const TextStyle(
                                    color: Color(0xFF888888),
                                    fontSize: 12,
                                  ),
                                )
                              ],
                            ))
                      ],
                    )));
          }),
    );
  }
}
