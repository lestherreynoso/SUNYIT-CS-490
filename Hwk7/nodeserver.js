

var connect = require('connect');

var srv = connect.createServer( connect.static(__dirname) );

srv.listen(8900);



//     http://127.0.0.1:8900/blackjack.html
//        for desktop browsers
//  but
//     http://10.0.2.2:8900/blackjack.html
//        for attached Android devices or emulators


