package com.tribi;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactlibrary.RNReactNativeDocViewerPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.transistorsoft.rnbackgroundgeolocation.RNBackgroundGeolocation;
import com.kevinejohn.RNMixpanel.RNMixpanel;
import com.wix.autogrowtextinput.AutoGrowTextInputPackage;
import com.rnfs.RNFSPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.keychain.KeychainPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.airbnb.android.react.maps.MapsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNReactNativeDocViewerPackage(),
            new ReactNativePushNotificationPackage(),
            new ReactNativeContacts(),
            new RNBackgroundGeolocation(),
            new RNMixpanel(),
            new AutoGrowTextInputPackage(),
            new RNFSPackage(),
            new ImageResizerPackage(),
            new ImagePickerPackage(),
            new KeychainPackage(),
            new MapsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
