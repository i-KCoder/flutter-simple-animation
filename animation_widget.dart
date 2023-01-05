import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class AnimationWidget extends StatefulWidget {
  const AnimationWidget({super.key});

  @override
  State<StatefulWidget> createState() => AnimationWidgetState();
}
class AnimationWidgetState extends State<AnimationWidget> with TickerProviderStateMixin{

  late AnimationController controller;
  late Animation colorAnimation;
  late Animation sizeAnimation;

  @override
  void initState(){
    super.initState();
    controller = AnimationController(vsync: this, duration: const Duration(seconds: 2));
    colorAnimation = ColorTween(begin: Colors.blue, end: Colors.purple).animate(controller);
    sizeAnimation = Tween(begin: 100.0, end: 200.0).animate(controller);
    controller.addListener(() {
      setState(() {

      });
    });
    controller.repeat();
  }


  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        height: sizeAnimation.value,
        width: sizeAnimation.value,
        color: colorAnimation.value
      ),
    );
  }

  @override
  void dispose(){
    controller.dispose();
    super.dispose();
  }

}
