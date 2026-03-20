import { StyleSheet, Text, View } from 'react-native';

import { WuiButton } from '../../../src/components/WuiButton/WuiButton';
import {
  WuiButtonColor,
  WuiButtonSize,
} from '../../../src/components/WuiButton/WuiButtonProps';

export type HeaderProps = {
  user?: { name: string };
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
};

export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
  <View>
    <View style={styles.wrapper}>
      <View style={styles.logoContainer}>
        <Text style={styles.h1}>Acme</Text>
      </View>
      <View style={styles.buttonContainer}>
        {user ? (
          <>
            <Text>Welcome, </Text>
            <Text style={styles.userName}>{user.name}!</Text>

            <WuiButton
              style={styles.button}
              size={WuiButtonSize.S}
              onPress={onLogout}
              label="Log out"
            />
          </>
        ) : (
          <>
            <WuiButton
              style={styles.button}
              size={WuiButtonSize.S}
              onPress={onLogin}
              label="Log in"
            />

            <WuiButton
              style={styles.button}
              color={WuiButtonColor.PRIMARY}
              size={WuiButtonSize.S}
              onPress={onCreateAccount}
              label="Sign up"
            />
          </>
        )}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  h1: {
    fontWeight: '900',
    fontSize: 20,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 10,
    color: 'black',
    alignSelf: 'flex-start',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontWeight: '700',
  },
});
