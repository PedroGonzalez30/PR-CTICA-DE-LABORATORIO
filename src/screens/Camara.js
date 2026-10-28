import {useRef, useState} from 'react';
import {View, Text, Image, Pressable, ScrollView, StyleSheet} from 'react-native';
import {CameraView, useCameraPermissions} from 'expo-camera';

export default function CamaraScreen() {

    const cameraRef = useRef(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [fotoUri, setFotoUri] = useState(null);
    const [listo, setListo] = useState(false);
    const [capturando, setCapturando] = useState(false);
    const [error, setError] = useState(null);

    async function tomarFoto() {
        if (!listo || capturando) return;
        setCapturando(true);
        setError(null);
        try {
            const foto = await cameraRef.current?.takePictureAsync();
            if (foto?.uri) setFotoUri(foto.uri);
        }catch (e) {
            setError(`No se pudo tomar la foto: ${e.message}`);
        }finally {
            setCapturando(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>Camara</Text>

            {!permission && <Text>Verificando permiso de camara...</Text>}

            {permission && !permission.granted && (
                <View style={styles.bloque}>
                    <Text>Necesitamos acceso a la camara para mostrar la vista previa y tomar fotografias. Las fotos no se guardan ni se comparten.</Text>
                    {!permission.canAskAgain && <Text style={styles.error}>El sistema ya no permite preguntar de nuevo. Activa el permiso desde los ajustes del telefono.</Text>}
                    <Pressable style={styles.boton} onPress={requestPermission}>
                        <Text style={styles.textoBoton}>Conceder permiso</Text>
                    </Pressable>
                </View>
            )}

            {permission?.granted && (
                <View style={styles.bloque}>
                    <CameraView
                        ref={cameraRef}
                        style={styles.camara}
                        facing="back"
                        onCameraReady={() => setListo(true)}
                    />
                    {!listo && <Text>Iniciando camara...</Text>}
                    {error && <Text style={styles.error}>{error}</Text>}
                    <Pressable
                        style={[styles.boton, (!listo || capturando) && styles.deshabilitado]}
                        onPress={tomarFoto}
                        disabled={!listo || capturando}
                    >
                        <Text style={styles.textoBoton}>{capturando ? 'Capturando...' : 'Tomar foto'}</Text>
                    </Pressable>
                    {fotoUri && <Image source={{uri: fotoUri}} style={styles.foto} />}
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bloque: {
        gap: 10,
    },
    camara: {
        height: 320,
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
    foto: {
        width: '100%',
        height: 320,
    },
});