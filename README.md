# APKGenerator
Create your apk directly in Termux using this cli tool.

## Offline working apk
qjs APKGenerator.js -a myAssets -n ga.stringmanolo.linterna -t Linterna 
## Only online apk 
qjs APKGenerator.js -u https://example.com -n ga.stringmanolo.example -t Example

## Install
You need the follow packages:
+ Quickjs
+ Git
+ Aapt
+ Apksigner
+ Dx
+ Ecj
+ Curl
+ buildAPKs
+ APKGenerator (this script)

Make sure you hace access to ~/storage/downloads folder.  
If you don't run ```termux-setup-storage``` (You need to run it for sure if you hace installed Termux for the first time.  

Install everything by pasting following command ```yes | pkg install quickjs git aapt apksigner dx ecj curl; curl -O https://raw.githubusercontent.com/BuildAPKs/buildAPKs/master/setup.buildAPKs.bash && bash setup.buildAPKs.bash && cp ~/buildAPKs/scripts/bash/build/build.one.bash ~/../usr/bin/ && chmod +775 ~/../usr/bin/build.one.bash; git clone https://github.com/StringManolo/APKGenerator && cd APKGenerator```  

### Notice
The --permissions arguments it's not made yet. You can manually manage tyem by edit the AndroidManifest.xml file. You don't need to since have internet permission by default.  

Be free to open a new issue if you find any problem. Or contact me in telegram https://t.me/stringmanolo @StringManolo if you are stuck or need more information or assistence on a proyect.

At the moment this program need internet connection since is downloading APKGeneratorBase repo everytime you run the command. Make sure to rename move or delete the folder APKGeneratorBase (your build proyect) before you run again the APKGenerator.js.

## FAQ
+ How can i change the app icon?
I created the default icon using https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html, download the .zip file, move the zip file in the path APKGeneratorBase/src/main/ remove the web_hi_res_512.png file and the res folder. Unzip the .zip, remove the .zip.

+ How to use the APKGenerator.js  
It's like a python script. You usually run them using ```python myScript```. You use ```qjs APKGenerator.js``` instead. You display help message run ```qjs APKGenerator.js --help```

 
