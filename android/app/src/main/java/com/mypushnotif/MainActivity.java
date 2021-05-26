package com.mypushnotif;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
    }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MyPushNotif";
  }
}
