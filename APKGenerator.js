let cli = {
  args: scriptArgs // to make node compatible code
};

let run = command => {
  let p = std.popen(command, "r"),
  msg = "",
  r = "";

  while(( r = p.getline() ) != null) {
    msg += r + "\n";
  }
  return msg;
}


for (let i in cli.args) {
  const value = cli.args[+i + 1];
  switch(cli.args[i]) {
    case "-a":
    case "--assets":
      cli.assets = value;
    break;
    
    case "-h":
    case "--help":
      cli.help = true;
    break;

    case "-n":
    case "--name":
      cli.name = value;
    break;

    case "-p":
    case "--permission":
    case "--permissions":
      cli.permission = value;
    break;

    case "-t":
    case "--title":
      cli.title = value;
    break;

    case "-u":
    case "--url":
      cli.url = value;
    break;
  }
}

(() => {
  if (cli.help) {
    console.log(`usage [engine] APKGenerator.js [arguments]

engine:
+ qjs --std
+ node

arguments:
+ -a, --assets        Folder path of your web files.
+ -h, --help          This message
+ -n, --name          App name, Ex: ga.stringmanolo.myapp
+ -p, --permissions   List of comma separated values.
+ -t, --title         App title
+ -u, --url           Your apk is a browser loading your webpage.

Assets, folder path is the name of the folder cointining the files. You need an index.html file, that will be loaded.
Name is the id to identify your app uniquely. Is a convention to use the name of your domain, if you have one.
Permissions accepts a list of comma separated values, Ex: INTERNET,VIBRATE
Title is the name of the apk once installed.
Url is a url of the webpage you want to build the apk from. Requires internet conection.

You can build your apk from an assets folder (works offline) or from a online webpage (add your url same as if you were manually visiting the webpage in a browser).

If you want to build from url and also have a diferent look on your apk or special version without play around with the files, you can read the X-REQUESTED-WITH header. Should have your apk name as directive. Ex: X-REQUESTED-WITH: ga.stringmanolo.myapp 
Then you can change/serve a different version of your web when detecting this HTTP header directive in server side.  

`);
    return;
  } else if (!cli.assets && !cli.url) {
    console.log("Error: You need to provide -a or -u arguments.");
    return;
  } else {
    if (!/git/gi.test(run("git --version"))) {
      console.log("You need to install git.");
      return;
    }
    
    console.log("Cloning APKGeneratorBase using git cli tool...");
    run("git clone https://github.com/stringmanolo/APKGeneratorBase");
    let aux = {}; 
    if (cli.name) {
      const androidManifest = std.loadFile("APKGeneratorBase/src/main/AndroidManifest.xml");
      aux.fd = std.open("APKGeneratorBase/src/main/AndroidManifest.xml", "w");
      aux.fd.puts(androidManifest.replace(/com\.mimarca\.MiPrimeraApp/g, cli.name));
      aux.fd.close(); 

      const actividadPrincipal = std.loadFile("APKGeneratorBase/src/main/java/ActividadPrincipal.java");
      aux.fd = std.open("APKGeneratorBase/src/main/java/ActividadPrincipal.java", "w");
      aux.fd.puts(actividadPrincipal.replace(/package com\.mimarca\.MiPrimeraApp/g, `package ${cli.name}`));
      aux.fd.close();
       
      const interfazJS = std.loadFile("APKGeneratorBase/src/main/java/JSInterface.java");
      aux.fd = std.open("APKGeneratorBase/src/main/java/JSInterface.java", "w");
      aux.fd.puts(interfazJS.replace(/package com\.mimarca\.MiPrimeraApp/g, `package ${cli.name}`));
      aux.fd.close();
    } if (cli.title) {
      const strings = std.loadFile("APKGeneratorBase/src/main/res/values/strings.xml", "w");
      aux.fd = std.open("APKGeneratorBase/src/main/res/values/strings.xml", "w");
      aux.fd.puts(strings.replace(/T\ítulo/g, cli.title));
      aux.fd.close();
    } 

    if (cli.assets) {
      let files = run(`ls ${cli.assets}`).split("\n");
      files.splice(files.length - 1, 1);
      let filesAux = [];
      for(let i in files) {
        if (!files[i] == "APKGenerator.js") {
          filesAux.push(files[i]);
        }
      }
      run(`rm APKGeneratorBase/src/main/assets/* && mkdir APKGeneratorBase/src/main/assets; cp -r ./${cli.assets}/* APKGeneratorBase/src/main/assets/`);
       
    } else {
      if (cli.url) {
        const actPrincipal = std.loadFile("APKGeneratorBase/src/main/java/ActividadPrincipal.java");
      aux.fd = std.open("APKGeneratorBase/src/main/java/ActividadPrincipal.java", "w");
      aux.fd.puts(actPrincipal.replace(/file\:\/\/\/android_asset\/index\.html/g, cli.url));
      aux.fd.close();
      }
    }
    if (cli.permissions) {
      console.log("-p, --permissions is not developed yet.");
    }

    console.log(run(`cd APKGeneratorBase/src/main && build.one.bash && mv APKGeneratorBase ${cli.title}`));
  } 
})();
