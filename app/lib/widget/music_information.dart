import "package:flutter/material.dart";

class MusicInformation extends StatelessWidget {
  String title;
  String artist;

  MusicInformation({
    Key? key,
    required this.title,
    required this.artist,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: TextStyle(
                fontSize: 16,
                color: Color(0xffffffff),
              ),
            ),
            Text(
              artist,
              style: TextStyle(
                fontSize: 14,
                color: Color(0xff888888),
              ),
            ),
            SizedBox(
              height: 64,
            )
          ],
        ),
      ),
    );
  }
}
