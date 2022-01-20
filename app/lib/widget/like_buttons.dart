import "package:flutter/material.dart";

class LikeButtons extends StatelessWidget {
  const LikeButtons({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          ThumbsUpButton(),
          SizedBox(height: 24),
          ThumbsDownButton(),
        ],
      ),
    );
  }
}

class ThumbsUpButton extends StatelessWidget {
  const ThumbsUpButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () {
        print('like cllicked');
      },
      child: Column(
        children: [
          Icon(
            Icons.thumb_up_alt,
            color: Colors.white,
            size: 30,
          ),
          Text(
            "like",
            style: TextStyle(
              color: Colors.white,
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }
}

class ThumbsDownButton extends StatelessWidget {
  const ThumbsDownButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () {
        print('dislike cllicked');
      },
      child: Column(
        children: [
          Icon(
            Icons.thumb_down_alt,
            color: Colors.white,
            size: 30,
          ),
          Text(
            "dislike",
            style: TextStyle(
              color: Colors.white,
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }
}
