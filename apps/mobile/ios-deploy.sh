appPath=$(PWD)/ios/App
xcworkspace=$(PWD)/ios/App/App.xcworkspace
buildPath=$PWD/ios/build

npx cap sync ios
cd ios/App
OUTPUT=$(./update-version.sh)
IFS=$'\n' read -rd '' -a split <<<"$OUTPUT"
version=${split[4]}
cd ../..

xcodebuild -workspace $xcworkspace -scheme App -sdk iphoneos -configuration AppStoreDistribution archive -archivePath $buildPath/App.xcarchive
xcodebuild -exportArchive -archivePath $buildPath/App.xcarchive -exportOptionsPlist $appPath/exportOption.plist -exportPath $buildPath
xcrun altool --upload-app -f "$buildPath/App.ipa" -u ruedagato@gmail.com -p myvh-zphe-rnhs-bysl

git add .
git commit -m "v$version"
git push
