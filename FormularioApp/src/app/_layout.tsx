import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitle: 'Registro de Curso',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 17,
            color: '#111827',
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: '#F0F4FF',
          },
        }}
      />
    </>
  );
}
