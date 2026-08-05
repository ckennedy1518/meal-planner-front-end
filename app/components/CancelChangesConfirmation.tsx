import { useCallback } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useMealPlannerStore } from '../state/useMealPlannerStore';
import { ThemedText } from './ThemedText';

interface ICancelChangesConfirmation {
    setIsCancelChangesModalOpen: (isOpen: boolean) => void;
    setIsPantryInEditMode: (isInEditMode: boolean) => void;
}

export function CancelChangesConfirmation(
    props: ICancelChangesConfirmation
): React.JSX.Element {
    const { setIsCancelChangesModalOpen, setIsPantryInEditMode } = props;

    const handleCancel = useCallback(() => {
        useMealPlannerStore.getState().resetChanges();
        setIsCancelChangesModalOpen(false);
        setIsPantryInEditMode(false);
    }, [setIsCancelChangesModalOpen, setIsPantryInEditMode]);

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={true}
                    onRequestClose={() => setIsCancelChangesModalOpen(false)}
                >
                    <View style={styles.container}>
                        <ThemedText style={styles.message} type="title">
                            Are you sure you want to discard your changes?
                        </ThemedText>
                        <View style={styles.buttonsRow}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.button,
                                    styles.discardButton,
                                    pressed ? styles.buttonPressed : null
                                ]}
                                onPress={handleCancel}
                            >
                                <ThemedText style={styles.buttonText}>
                                    Discard Changes
                                </ThemedText>
                            </Pressable>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.button,
                                    styles.goBackButton,
                                    pressed ? styles.buttonPressed : null
                                ]}
                                onPress={() =>
                                    setIsCancelChangesModalOpen(false)
                                }
                            >
                                <ThemedText style={styles.buttonText}>
                                    Go Back
                                </ThemedText>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24
    },
    message: {
        textAlign: 'center',
        marginBottom: 24
    },
    buttonsRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8
    },
    discardButton: {
        backgroundColor: '#d9534f'
    },
    goBackButton: {
        backgroundColor: '#6c757d'
    },
    buttonPressed: {
        opacity: 0.8
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '600'
    }
});
