// CustomHeader.jsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ onOptionsPress }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.headerContainer}>
            {/* Custom Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={30} color="#FF4801" />
            </TouchableOpacity>

            {/* Options Button */}
            <TouchableOpacity style={styles.details} onPress={onOptionsPress}>
                <Ionicons name="ellipsis-horizontal" size={22} color="#FF4801" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 60,
    },
    details: {
        marginRight: 14,
    }
});

export default CustomHeader;
