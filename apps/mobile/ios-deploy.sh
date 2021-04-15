appPath=$(PWD)/ios/App
xcworkspace=$(PWD)/ios/App/App.xcworkspace
buildPath=$PWD/ios/build

npx cap sync ios
.$appPath/update-version.sh

# xcodebuild -workspace $xcworkspace -scheme App -sdk iphoneos -configuration AppStoreDistribution archive -archivePath $buildPath/App.xcarchive
# xcodebuild -exportArchive -archivePath $buildPath/App.xcarchive -exportOptionsPlist $appPath/exportOption.plist -exportPath $buildPath
# xcrun altool --upload-app -f "$buildPath/App.ipa" -u ruedagato@gmail.com -p myvh-zphe-rnhs-bysl
