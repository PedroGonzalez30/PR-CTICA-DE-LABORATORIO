import {useState} from 'react';
import {View, Text, Pressable, ScrollView, StyleSheet} from 'react-native';
import * as Location from 'expo-location';

export default function Ubicacion() {

    const [coords, setCoords] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [permiso, setPermiso] = useState('pendiente');

    async function obtenerUbicacion() {
        setCargando(true);
        setError(null);
        try {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setPermiso('denegado');
                setError('Permiso de ubicacion denegado. Puedes volver a intentarlo o activarlo en los ajustes del telefono.');
                return;
            }
            setPermiso('concedido');
            const pos = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });
            setCoords(pos.coords);
        }catch (e) {
            setError(`No se pudo obtener la ubicacion: ${e.message}`);
        }finally {
            setCargando(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>Ubicacion</Text>

            <Text>Permiso: {permiso}</Text>

            <Pressable style={[styles.boton, cargando && styles.deshabilitado]} onPress={obtenerUbicacion} disabled={cargando}>
                <Text style={styles.textoBoton}>{cargando ? 'Obteniendo...' : 'Obtener mi ubicacion'}</Text>
            </Pressable>

            {cargando && <Text>Buscando señal GPS...</Text>}
            {error && <Text style={styles.error}>{error}</Text>}

            {coords && (
                <View style={styles.bloque}>
                    <Text>Latitud: {coords.latitude.toFixed(6)}</Text>
                    <Text>Longitud: {coords.longitude.toFixed(6)}</Text>
                    <Text>Precision reportada: {coords.accuracy?.toFixed(1)} m</Text>
                    <Text style={styles.nota}>La precision es una estimacion</Text>
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 10,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    bloque: {
        gap: 6,
    },
    boton: {
        backgroundColor: '#2563eb',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    deshabilitado: {
        backgroundColor: '#9ca3af',
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
    },
    error: {
        color: '#ff0000',
    },
    nota: {
        color: '#6b7280',
        fontSize: 13,
    },
});