import { MaterialCommunityIcons } from '@expo/vector-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faJar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TouchableOpacity, View } from 'react-native';
import { useMealPlannerStore } from '../state/useMealPlannerStore';
import '../styles/landingScreen.scss';
import { Mode } from '../utilities/types';

library.add(faJar);

export function FooterSelector(): React.JSX.Element {
    const handlePress = (buttonPressed: Mode): void => {
        useMealPlannerStore.getState().setMode(buttonPressed);
    };

    return (
        <View className="footerSelectorContainer">
            <TouchableOpacity
                className="footerButtonLeft"
                onPress={() => handlePress('cook')}
            >
                <MaterialCommunityIcons name="pot-steam" size={40} />
            </TouchableOpacity>
            <TouchableOpacity
                className="footerButtonMiddle"
                onPress={() => handlePress('pantry')}
            >
                <FontAwesomeIcon icon="jar" size={40} />
            </TouchableOpacity>
            <TouchableOpacity
                className="footerButtonRight"
                onPress={() => handlePress('plan')}
            >
                <MaterialCommunityIcons name="notebook" size={40} />
            </TouchableOpacity>
        </View>
    );
}
