var needle = require('needle');
var fs = require('fs');


var config = {
    port: 1238,
    ip: '192.168.0.14',
    host: 'http://192.168.0.14:1238',
}

needle.get(config.host, function (e, r) {
    if (r.body) {
        var Amatch = matchAll(r.body, /<script[^<]*<\/script>/g);
        Amatch = Amatch.join('\n')
        Amatch = Amatch.replace(/src="/g, 'src="' + config.host)
        Amatch = Amatch.replace(/localhost/g, config.ip)
        // Amatch = Amatch.replace('src="/', 'src="http://localhost:'+config.port)
        // console.log(scripts)
        getOldScripts(function (d) {

            var foo = replaceScripts(d, Amatch)
            writeNewScripts(foo)

        });
        // console.log(Amatch)
        // writeNewScripts(Amatch)
    }
});

function writeNewScripts(data) {
    fs.writeFile("src/index.html", data, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

function replaceScripts(oldFile, newScripts) {
    var oldScripts = oldFile.match(/<!--meteor-config-->[\s\S]*?<!--meteor-config-end-->/g)
    console.log(oldScripts[0])
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    console.log(newScripts)
    var xxx = oldFile.replace(oldScripts[0], newScripts);
    // console.log(xxx)
    return xxx

}

function getOldScripts(cb) {

    fs.readFile('src/index.html', 'utf8', function (e, d) {
        if (e) {
            return console.log(e);
        }

        cb(d)
        //   var oldScripts = d.match(/<!--meteor-config-->.*<!--meteor-config-end-->/)
        //   var oldScripts = d.match(/<!--meteor-config-->[\s\S]*?<!--meteor-config-end-->/g)
        // //   var oldScripts = d.match(/<!--.*-->/g)
        //   console.log(oldScripts);
    });
}



function matchAll(str, regex) {
    var res = ['<!--meteor-config-->'];
    var m;
    if (regex.global) {
        while (m = regex.exec(str)) {

            res.push(m[0]);
        }
    } else {
        if (m = regex.exec(str)) {
            res.push(m[1]);
        }
    }
    res.push('<!--meteor-config-end-->');

    return res;
}