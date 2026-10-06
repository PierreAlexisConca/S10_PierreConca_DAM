import {
    Pressable,
    StyleSheet,
    Text,
} from 'react-native';

import { colors } from '../../constants/colors';
import { theme } from '../../constants/theme';

type AppButtonProps = {
  title: string;
  onPress: () => void;
};

export const AppButton = ({
  title,
  onPress,
}: AppButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {({ pressed }) => (
        <Text style={[styles.text, pressed && styles.textPressed]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: theme.radius.medium,
    alignItems: 'center',
    marginTop: 8,
  },

  buttonPressed: {
    backgroundColor: '#1D4ED8',
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },

  text: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.button,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  textPressed: {
    opacity: 0.9,
  },
});
