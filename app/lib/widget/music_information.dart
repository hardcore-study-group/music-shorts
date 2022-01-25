import "package:flutter/material.dart";

class MusicInformation extends StatelessWidget {
  String title;
  String artist;
  double leading;
  bool isBold;
  bool isAlignLeft;

  MusicInformation({
    Key? key,
    required this.title,
    required this.artist,
    this.leading = 0,
    this.isBold = false,
    this.isAlignLeft = true,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        child: Column(
          crossAxisAlignment: (this.isAlignLeft
              ? CrossAxisAlignment.start
              : CrossAxisAlignment.center),
          children: [
            Text(
              title,
              style: TextStyle(
                fontWeight: (this.isBold ? FontWeight.bold : FontWeight.normal),
                fontSize: 16,
                color: Color(0xffffffff),
              ),
            ),
            SizedBox(height: this.leading as double),
            Text(
              artist,
              style: TextStyle(
                fontSize: 14,
                color: Color(0xff888888),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
