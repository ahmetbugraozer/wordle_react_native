import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, shadows } from './Elements';
import { useAuth } from '../contexts/AuthContext';
import { LoginModal, RegisterModal } from './auth/AuthModals';
import { StreakModal } from './StreakModal';
import { ConfirmationModal } from './ConfirmationModal';

export const ProfileButton: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true); // Başlangıçta true olarak ayarla
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showStreakPrompt, setShowStreakPrompt] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.streakContainer}>
        {user && (
          <Text style={styles.streakText}>{user.streak}</Text>
        )}
        <TouchableOpacity
          onPress={() => {
            if (user) {
              setShowStreakModal(true);
            } else {
              setShowStreakPrompt(true);
              setTimeout(() => setShowStreakPrompt(false), 3000);
            }
          }}
        >
          <MaterialIcons name="local-fire-department" size={24} color="#FF4136" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => {
        setShowPrompt(false);
        setShowDropdown(!showDropdown);
      }}>
        <MaterialIcons name="account-circle" size={24} color="white" />
      </TouchableOpacity>

      {showDropdown && (
        <TouchableOpacity 
          style={styles.dropdownOverlay} 
          activeOpacity={1}
          onPress={() => setShowDropdown(false)}
        >
          <TouchableOpacity 
            style={styles.dropdown}
            activeOpacity={1}
            onPress={e => e.stopPropagation()}
          >
            {user ? (
              <>
                <Text style={styles.dropdownText}>{user.displayName}</Text>
                <TouchableOpacity 
                  style={styles.dropdownItem} 
                  onPress={() => {
                    setShowDropdown(false);
                    setShowLogoutConfirmation(true);
                  }}
                >
                  <Text style={styles.dropdownText}>Sign Out</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity 
                  style={styles.dropdownItem} 
                  onPress={() => {
                    setShowLoginModal(true);
                    setShowDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dropdownItem}
                  onPress={() => {
                    setShowRegisterModal(true);
                    setShowDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownText}>Register</Text>
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      )}

      {!user && showPrompt && (
        <View style={styles.prompt}>
          <Text style={styles.promptText}>
            Sign in to get unlimited plays!
          </Text>
          <TouchableOpacity 
            style={styles.promptClose}
            onPress={() => setShowPrompt(false)}
          >
            <Text style={styles.promptCloseText}>×</Text>
          </TouchableOpacity>
        </View>
      )}

      {user && (
        <StreakModal
          visible={showStreakModal}
          onClose={() => setShowStreakModal(false)}
          streak={user.streak}
          gamesPlayed={user.gamesPlayed}
          lastPlayedAt={user.lastPlayedAt?.toDate()}
        />
      )}

      <LoginModal 
        visible={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
      <RegisterModal 
        visible={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)} 
      />

      {showStreakPrompt && !user && (
        <View style={styles.streakPrompt}>
          <Text style={styles.streakPromptText}>
            Sign in to track your streak!
          </Text>
        </View>
      )}

      <ConfirmationModal
        visible={showLogoutConfirmation}
        onClose={() => setShowLogoutConfirmation(false)}
        onConfirm={logout}
        title="Sign Out"
        message="Are you sure you want to sign out?"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  streakText: {
    color: colors.white,
    fontSize: 16,
    marginRight: 5,
    fontWeight: 'bold',
  },
  streakPrompt: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    width: 200,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  streakPromptText: {fontFamily: "poppins",
    color: colors.black,
    fontSize: 14,
  },
  dropdownOverlay: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    zIndex: 998,
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#2F2F2F',
    borderRadius: 12,
    padding: 5,
    minWidth: 180,
    ...shadows.default,
    borderWidth: 1,
    borderColor: '#404040',
    zIndex: 999,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  dropdownText: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 10,
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#404040',
    marginVertical: 5,
  },
  prompt: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 10,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  promptText: {
    color: colors.black,
    fontSize: 14,
    marginRight: 20,
  },
  promptClose: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
  },
  promptCloseText: {
    color: colors.grey,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
