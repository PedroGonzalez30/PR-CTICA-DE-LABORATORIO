import {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Magnetometer} from 'expo-sensors';

export default function Brujula() {

    const [disponible, setDisponible] = useState(null);
    const [datos, setDatos] = useState({x: 0, y: 0, z: 0});
    const [angulo, setAngulo] = useState(0);

    useEffect(() => {
        let sub = null;

        async function iniciar() {
            const ok = await Magnetometer.isAvailableAsync();
            setDisponible(ok);
            if (!ok) return;
            Magnetometer.setUpdateInterval(250);
            sub = Magnetometer.addListener(({x, y, z}) => {
                setDatos({x, y, z});
                setAngulo((Math.atan2(y, x) * 180 / Math.PI + 360) % 360);
            });
        }

        iniciar();

        return () => {
            if (sub) sub.remove();
        };
    }, []);

    function direccion(grados) {
        const puntos = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
        return puntos[Math.round(grados / 45) % 8];
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>Brujula</Text>

            {disponible === null && <Text>Verificando sensor...</Text>}
            {disponible === false && <Text style={styles.error}>Sensor no disponible</Text>}

            {disponible && (
                <View style={styles.bloque}>
                    <Text style={styles.grados}>{angulo.toFixed(0)}° {direccion(angulo)}</Text>
                    <Text>X: {datos.x.toFixed(2)} µT</Text>
                    <Text>Y: {datos.y.toFixed(2)} µT</Text>
                    <Text>Z: {datos.z.toFixed(2)} µT</Text>
                    <Text style={styles.nota}>Direccion aproximada, no es un rumbo calibrado.</Text>                
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
    grados: {
        fontSize: 40,
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