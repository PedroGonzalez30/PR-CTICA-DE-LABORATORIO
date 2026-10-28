import {useState} from 'react';
import {View, Text, Pressable, StyleSheet, Platform, StatusBar} from 'react-native';
import Camara from './src/screens/Camara';
import Ubicacion from './src/screens/Ubicacion';
import Brujula from './src/screens/Brujula';

const ESPACIO_SUPERIOR = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 50;

const MODULOS = ['Camara', 'Ubicacion', 'Brujula'];

export default function App() {

    const [activo, setActivo] = useState('Camara');

    return (
        <View style={styles.container}>
            <Text style={styles.encabezado}>Explorador movil</Text>

            <View style={styles.barra}>
                {MODULOS.map((m) => (
                    <Pressable key={m} style={[styles.tab, activo === m && styles.tabActivo]} onPress={() => setActivo(m)}>
                        <Text style={[styles.tabTexto, activo === m && styles.tabTextoActivo]}>{m}</Text>
                    </Pressable>
                ))}
            </View>

            <View style={styles.contenido}>
                {activo === 'Camara' && <Camara />}
                {activo === 'Ubicacion' && <Ubicacion />}
                {activo === 'Brujula' && <Brujula />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: ESPACIO_SUPERIOR,
    },
    encabezado: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 12,
    },
    barra: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    tabActivo: {
        borderBottomWidth: 3,
        borderBottomColor: '#2563eb',
    },
    tabTexto: {
        color: '#6b7280',
    },
    tabTextoActivo: {
        color: '#2563eb',
        fontWeight: 'bold',
    },
    contenido: {
        flex: 1,
    },
});