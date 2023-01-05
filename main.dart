import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'iK Coder',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'iK Coder'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Center(child:Text(widget.title)),
      ),
      body: const Center(
        child:AnimationWidget()
      ),// This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}



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
