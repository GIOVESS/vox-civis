import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.voxcivis.app",
  appName: "VoxCivis",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#10b981",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      spinnerColor: "#ffffff",
      splashFullScreen: true,
      splashImmersive: true,
    },
    Geolocation: {
      permissions: {
        android: {
          geolocation: {
            alias: "location",
            required: false,
          },
        },
      },
    },
  },
}

export default config

