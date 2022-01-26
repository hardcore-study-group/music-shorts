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
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        child: Column(
          crossAxisAlignment: (isAlignLeft
              ? CrossAxisAlignment.start
              : CrossAxisAlignment.center),
          children: [
            Text(
              title,
              style: TextStyle(
                fontWeight: (isBold ? FontWeight.bold : FontWeight.normal),
                fontSize: 16,
                color: const Color(0xffffffff),
              ),
            ),
            SizedBox(height: leading),
            Text(
              artist,
              style: const TextStyle(
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
