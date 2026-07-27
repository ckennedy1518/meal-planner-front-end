import { MaterialCommunityIcons } from '@expo/vector-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faJar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useMealPlannerStore } from '../state/useMealPlannerStore';
import { Mode } from '../utilities/types';

library.add(faJar, faUser);

export function FooterSelector(): React.JSX.Element {
    const modeSelected: Mode | null = useMealPlannerStore(
        (state) => state.mode
    );

    const handlePress = (buttonPressed: Mode): void => {
        useMealPlannerStore.getState().setMode(buttonPressed);
    };

    return (
        <View style={styles.footerSelectorContainer}>
            <TouchableOpacity
                style={[
                    styles.footerButton,
                    styles.footerButtonLeft,
                    (modeSelected === null || modeSelected === 'cook') &&
                        styles.footerButtonActive
                ]}
                onPress={() => handlePress('cook')}
            >
                <MaterialCommunityIcons name="pot-steam" size={40} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.footerButton,
                    styles.footerButtonMiddle,
                    modeSelected === 'pantry' && styles.footerButtonActive
                ]}
                onPress={() => handlePress('pantry')}
            >
                <FontAwesomeIcon icon="jar" size={40} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.footerButton,
                    styles.footerButtonMiddle,
                    modeSelected === 'plan' && styles.footerButtonActive
                ]}
                onPress={() => handlePress('plan')}
            >
                <MaterialCommunityIcons name="notebook" size={40} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.footerButton,
                    styles.footerButtonRight,
                    modeSelected === 'settings' && styles.footerButtonActive
                ]}
                onPress={() => handlePress('settings')}
            >
                <FontAwesomeIcon icon="user" size={40} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footerSelectorContainer: {
        position: 'absolute',
        bottom: 20,
        left: 24,
        right: 24,
        flexDirection: 'row',
        height: 64,
        backgroundColor: '#ffffff',
        borderRadius: 32,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10
    },
    footerButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerButtonActive: {
        backgroundColor: '#bbbbbb'
    },
    footerButtonLeft: {
        borderRightWidth: 1,
        borderRightColor: 'rgba(0, 0, 0, 0.1)'
    },
    footerButtonMiddle: {
        borderRightWidth: 1,
        borderRightColor: 'rgba(0, 0, 0, 0.1)'
    },
    footerButtonRight: {
        borderRightWidth: 1,
        borderRightColor: 'rgba(0, 0, 0, 0.1)'
    }
});
