import 'package:flutter/material.dart';

class SliderController {
  double sliderValue;
  SliderController(this.sliderValue);
}

class MusicController extends StatefulWidget {
  String uri;

  MusicController({
    Key? key,
    this.uri = '',
  }) : super(key: key);

  @override
  _MusicControllerState createState() => _MusicControllerState();
}

class _MusicControllerState extends State<MusicController> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: const [
          MusicSlider(),
          SizedBox(height: 24),
          MusicButtons(),
        ],
      ),
    );
  }
}

class MusicSlider extends StatelessWidget {
  const MusicSlider({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SliderTheme(
          data: const SliderThemeData(
            thumbColor: Color(0xffbb86fc),
            thumbShape: RoundSliderThumbShape(
              enabledThumbRadius: 6,
              elevation: 0,
            ),
            trackHeight: 2,
            trackShape: RectangularSliderTrackShape(),
            activeTrackColor: Color(0xffbb86fc),
            inactiveTrackColor: Color(0x88bb86fc),
          ),
          child: Slider(
            min: 0,
            max: 240,
            value: 71,
            onChanged: (double newValue) {},
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 24),
              child: Text(
                '1:11',
                style: TextStyle(color: Colors.white),
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 24),
              child: Text(
                '3:57',
                style: TextStyle(color: Colors.white),
              ),
            ),
          ],
        )
      ],
    );
  }
}

class MusicButtons extends StatelessWidget {
  const MusicButtons({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: const [
        PreviousButton(),
        SizedBox(width: 40),
        PlayButton(),
        SizedBox(width: 40),
        NextButton(),
      ],
    );
  }
}

class PreviousButton extends StatelessWidget {
  const PreviousButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () {
        print('previous cllicked');
      },
      child: const Icon(
        Icons.skip_previous,
        color: Colors.white,
        size: 40,
      ),
    );
  }
}

class PlayButton extends StatelessWidget {
  const PlayButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () {
        print('like cllicked');
      },
      child: const Icon(
        Icons.play_arrow,
        color: Colors.white,
        size: 40,
      ),
    );
  }
}

class NextButton extends StatelessWidget {
  const NextButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () {
        print('like cllicked');
      },
      child: const Icon(
        Icons.skip_next,
        color: Colors.white,
        size: 40,
      ),
    );
  }
}
