import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('myvideo') myVideo: any;
  
  title = 'peerchatting';
  peer;
  anotherId;
  myId;
  constructor(){

  }
  ngOnInit(){
    this.peer = new Peer();
    let video;
    setTimeout(() => {
      this.myId = this.peer.id;
      video = this.myVideo.nativeElement;
    }, 3000);
    this.peer.on('connection', function(conn) {
      conn.on('data', function(data){
        // Will print 'hi!'
        console.log(data);
      });
    });

    var n = <any>navigator;
    
    n.getUserMedia =  ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia );
    
    this.peer.on('call', function(call) {
      
      n.getUserMedia({video: true, audio: true}, function(stream) {
        call.answer(stream);
        call.on('stream', function(remotestream){
          video.stream = remotestream;
          video.play();
        })
      }, function(err) {
        console.log('Failed to get stream', err);
      })
    })
  }
  connect(){
    var conn = this.peer.connect(this.anotherId);
    // on open will be launch when you successfully connect to PeerServer
    conn.on('open', function(){
    // here you have conn.id
    alert('hii');
    conn.send('hi!');
});
  }
  videoconnect(){
    let video = this.myVideo.nativeElement;
    var localvar = this.peer;
    var fname = this.anotherId;
    
    //var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
    var n = <any>navigator;
    
    n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );
    
    n.getUserMedia({video: true, audio: true}, function(stream) {
      var call = localvar.call(fname, stream);
      call.on('stream', function(remotestream) {
        video.stream = remotestream;
        video.play();
      })
    }, function(err){
      console.log('Failed to get stream', err);
    })
    
    
  }
}
