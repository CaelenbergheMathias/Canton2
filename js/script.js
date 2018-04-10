
//
// Engine script loader
//

function include(url) {
  
    var sc = document.createElement('script');
    sc.src = url;
    document.head.appendChild(sc);
  }
  
  include('js/background.js');
  include('js/phaser.js');
  include('js/peasant.js');
  