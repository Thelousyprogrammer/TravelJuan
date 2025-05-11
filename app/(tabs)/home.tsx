import { stations as allLinesStations, StationList, StationMap } from '@/data/lib/stationData';
import { Ionicons } from '@expo/vector-icons';
import firebaseAuth from '@react-native-firebase/auth';
import * as Location from 'expo-location';
import haversine from 'haversine-distance';
import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  const [userName, setUserName] = useState('User');
  // Use the imported StationList type for the state
  const [nearestStation, setNearestStation] = useState<StationList | null>(null);

  useEffect(() => {
    const user = firebaseAuth().currentUser;
    if (user) {
      setUserName(user.displayName || user.email?.split('@')[0] || 'User');
    }
  }, []);

  useEffect(() => {
    getNearestStationFromLocalData();
  }, []);

  const getNearestStationFromLocalData = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Denied", "Location permission is needed to find the nearest station.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const userCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const allStationsFlattened: StationList[] = [];
      (Object.keys(allLinesStations) as Array<keyof StationMap>).forEach(lineKey => {
        allStationsFlattened.push(...allLinesStations[lineKey]);
      });

      if (allStationsFlattened.length === 0) {
        console.log('No local stations found in stationData.ts!');
        setNearestStation(null);
        return;
      }

      const validStations = allStationsFlattened.filter(s =>
        typeof s.latitude === 'number' && typeof s.longitude === 'number'
      );

      if (validStations.length === 0) {
        console.log('No local stations with valid coordinates found.');
        setNearestStation(null);
        return;
      }

      const closest = validStations.reduce((prev, curr) => {
        const distPrev = haversine(userCoords, { latitude: prev.latitude, longitude: prev.longitude });
        const distCurr = haversine(userCoords, { latitude: curr.latitude, longitude: curr.longitude });
        return distCurr < distPrev ? curr : prev;
      });

      setNearestStation(closest);

    } catch (error) {
      console.error("Error getting nearest station from local data:", error);
      Alert.alert("Error", "Could not process station data.");
      setNearestStation(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TravelJuan</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>

      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Good morning,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      {nearestStation ? (
        <View style={styles.stationSection}>
          <Text style={styles.stationText}>{nearestStation.name.toUpperCase()}</Text>
          <Text style={styles.nearestText}>Nearest train station</Text>
          <Image source={nearestStation.image} style={styles.stationImage} resizeMode="cover"/>
        </View>
      ) : (
        <View style={styles.stationSection}>
            <Text style={styles.nearestText}>Finding nearest station...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: { fontSize: 20, fontWeight: 'bold', color: 'red' },
  greeting: { padding: 15 },
  greetingText: { fontSize: 16, color: '#666' },
  userName: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  stationSection: { padding: 15, alignItems: 'center' },
  stationText: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  nearestText: { fontSize: 14, color: '#666', marginBottom: 10, textAlign: 'center' },
  stationImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#e0e0e0', // Placeholder while image loads or if it fails
  },
});

export default HomeScreen;