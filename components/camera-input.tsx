import Feather from '@expo/vector-icons/Feather';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraInput() {
  const [permission, requestPermission] = useCameraPermissions();
  const [uri, setUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);

  const takePicture = async () => {
    const picture = await cameraRef.current?.takePictureAsync();
    if (picture?.uri) setUri(picture.uri);
  };

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <TouchableOpacity onPress={requestPermission} style={styles.imagePlaceholder}>
        <Feather name="camera" size={32} color="#666" />
        <Text style={styles.imageText}>Take photo (mock upload)</Text>
      </TouchableOpacity>
    );
  }

  if (uri) {
    return (
      <View>
        <Image source={{ uri }} style={{ width: '100%', aspectRatio: 1 }} />
        <Pressable onPress={() => setUri(null)}>
          <Text style={styles.retakeBtnText}>Take another picture</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.cameraWrapper}>
      <CameraView ref={cameraRef} style={styles.camera}>
        <View style={styles.shutterContainer}>
          <Pressable onPress={takePicture}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}>
                <View style={styles.shutterBtnInner} />
              </View>
            )}
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePlaceholder: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderRadius: 16,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageText: {
    color: '#666',
    marginTop: 8,
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 20,
  },
  cameraWrapper: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  camera: {
    flex: 1,
  },
  shutterContainer: {
    position: 'absolute',
    bottom: 20,
    left: '30%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderColor: 'white',
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  retakeBtnText: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: '-50%' }],
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
