import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
  return (
    // <Stack>
    //   <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //   <Stack.Screen name="+not-found" />
    // </Stack>

    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Main',
          }}
        />
        {/* <Drawer.Screen
          name="user/[id]" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'User',
            title: 'overview',
          }}
        /> */}
      </Drawer>
    </GestureHandlerRootView>
  );
}
