import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { Platform } from "react-native";
import * as Linking from "expo-linking";
import Button from "./Button";

type Props = {
  strategy: string,
  children: React.ReactNode
}

WebBrowser.maybeCompleteAuthSession();

export default function OAuthButton({ strategy, children }: Props) {
  React.useEffect(() => {
    if (Platform.OS !== "android") return;

    void WebBrowser.warmUpAsync();
    return () => {
      if (Platform.OS !== "android") return;

      void WebBrowser.coolDownAsync();
    };
  }, []);

  const { startOAuthFlow } = useOAuth({ strategy });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <Button onPress={onPress}>
      { children }
    </Button>
  );
}