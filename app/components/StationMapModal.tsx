import React from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { stations } from '../../data/lib/stationData';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const StationMapModal: React.FC<Props> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.header}>
        <Text style={styles.title}>Station Map View</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.close}>Close</Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 14.5995,
          longitude: 120.9842,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        {Object.entries(stations).map(([line, stationList]) =>
          stationList.map((station, index) => (
            <Marker
              key={`${line}-${index}`}
              coordinate={{
                latitude: station.latitude,
                longitude: station.longitude,
              }}
              title={station.name}
              description={`Line: ${line}`}
              pinColor={
                line === 'MRT3' ? 'blue' : line === 'LRT1' ? 'green' : 'purple'
              }
            >
              <Callout>
                <View style={{ width: 200 }}>
                  <Text style={{ fontWeight: 'bold' }}>{station.name}</Text>
                  <Text>Nearby Landmarks:</Text>
                  <FlatList
                    data={station.landmarks}
                    keyExtractor={(item, idx) => `${station.name}-${idx}`}
                    renderItem={({ item }) => <Text>• {item}</Text>}
                  />
                </View>
              </Callout>
            </Marker>
          ))
        )}
      </MapView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  close: { color: 'blue' },
  map: { flex: 1 },
});

export default StationMapModal;
