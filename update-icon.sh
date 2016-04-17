#! /bin/sh

rm -rf tmp
mkdir -p tmp/app.iconset/

curl ls8h.com/yosemite-icon/api -F "icon_image=@src/icon.png" -F "base_color=#4080c0" > tmp/icon.png
sips -Z 16 tmp/icon.png --out tmp/app.iconset/icon_16x16.png
sips -Z 32 tmp/icon.png --out tmp/app.iconset/icon_16x16@2x.png
sips -Z 32 tmp/icon.png --out tmp/app.iconset/icon_32x32.png
sips -Z 64 tmp/icon.png --out tmp/app.iconset/icon_32x32@2x.png
sips -Z 128 tmp/icon.png --out tmp/app.iconset/icon_128x128.png
sips -Z 256 tmp/icon.png --out tmp/app.iconset/icon_128x128@2x.png
sips -Z 256 tmp/icon.png --out tmp/app.iconset/icon_256x256.png
sips -Z 512 tmp/icon.png --out tmp/app.iconset/icon_256x256@2x.png
sips -Z 512 tmp/icon.png --out tmp/app.iconset/icon_512x512.png
sips -Z 1024 tmp/icon.png --out tmp/app.iconset/icon_512x512@2x.png
(cd tmp && iconutil -c icns app.iconset && mv app.icns ../src/)
(cd tmp && convert icon.png -define icon:auto-resize ../src/app.ico)

sips -Z 18 src/icon.png --out src/tray-icon.png

rm -rf tmp
