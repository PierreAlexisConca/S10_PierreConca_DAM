import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { colors } from '../../constants/colors';
import { theme } from '../../constants/theme';

type AppInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  hasError?: boolean;
  errorMessage?: string;
};

export const AppInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  hasError = false,
  errorMessage,
}: AppInputProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        style={[
          styles.input,
          hasError && styles.inputError,
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />

      {hasError && errorMessage ? (
        <Text style={styles.errorText}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.spacing.medium,
  },

  label: {
    fontSize: theme.fontSize.body,
    fontWeight: '600',
    color: colors.text,
    marginBottom: theme.spacing.small,
  },

  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: theme.radius.medium,
    padding: 14,
    fontSize: theme.fontSize.body,
    color: colors.text,
    backgroundColor: '#FAFAFA',
  },

  inputError: {
    borderColor: colors.error,
    backgroundColor: '#FFF5F5',
  },

  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 5,
    fontWeight: '500',
  },
});
