import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from './Elements';

interface StreakModalProps {
  visible: boolean;
  onClose: () => void;
  streak: number;
  gamesPlayed: number;
  lastPlayedAt?: Date;
}

export const StreakModal: React.FC<StreakModalProps> = ({
  visible,
  onClose,
  streak,
  gamesPlayed,
  lastPlayedAt
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.container} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <TouchableOpacity 
          style={styles.content} 
          activeOpacity={1}
          onPress={e => e.stopPropagation()}
        >
          <Text style={styles.title}>Streak Statistics</Text>
          
          <View style={styles.statRow}>
            <Text style={styles.label}>Current Streak:</Text>
            <Text style={styles.value}>{streak} days</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.label}>Games Played:</Text>
            <Text style={styles.value}>{gamesPlayed}</Text>
          </View>

          {lastPlayedAt && (
            <View style={styles.statRow}>
              <Text style={styles.label}>Last Played:</Text>
              <Text style={styles.value}>
                {new Date(lastPlayedAt).toLocaleDateString()}
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: colors.backgroundColor,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    borderWidth: 1,
    borderColor: colors.firstNeutralColor,
  },
  title: {
    fontSize: 24,
    color: colors.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  label: {
    color: colors.white,
    fontSize: 16,
  },
  value: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: colors.firstNeutralColor,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
  },
});
