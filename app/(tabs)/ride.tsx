import { Line as FareLine, fares, faresData, LRT1StationName, LRT2StationName, TicketType } from '@/data/lib/fares';
import { stations as allLinesStationsData, StationList, StationMap } from '@/data/lib/stationData';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StationMapModal from '../components/StationMapModal';

const findStationByNameAndLine = (name: string, line: FareLine, stationData: StationMap): StationList | null => {
  const lineStations = stationData[line as keyof StationMap];
  if (!lineStations) return null;
  return lineStations.find(s => s.name === name) || null;
};

const RideScreen = () => {
  const staticDepartureStationName = 'Anonas';
  const staticDepartureStationLine: FareLine = 'LRT2';
  const staticArrivalStationName = 'Carriedo';
  const staticArrivalStationLine: FareLine = 'LRT1';

  const [departureStation, setDepartureStation] = useState<StationList | null>(null);
  const [arrivalStation, setArrivalStation] = useState<StationList | null>(null);

  const [selectedTicketType, setSelectedTicketType] = useState<TicketType | null>(null);
  const [computedFare, setComputedFare] = useState<number | null>(null);
  const [journeySegments, setJourneySegments] = useState<Array<{ line: FareLine, from: string, to: string, sjt: number, svc: number }>>([]);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);

  useEffect(() => {
    const depStation = findStationByNameAndLine(staticDepartureStationName, staticDepartureStationLine, allLinesStationsData);
    const arrStation = findStationByNameAndLine(staticArrivalStationName, staticArrivalStationLine, allLinesStationsData);

    if (depStation) setDepartureStation(depStation);
    else console.error(`Static departure station "${staticDepartureStationName}" on line "${staticDepartureStationLine}" not found.`);

    if (arrStation) setArrivalStation(arrStation);
    else console.error(`Static arrival station "${staticArrivalStationName}" on line "${staticArrivalStationLine}" not found.`);
  }, []);

  useEffect(() => {
    setSelectedTicketType(null);
    setComputedFare(null);
    setJourneySegments([]);
  }, [departureStation, arrivalStation]);

  const getFare = (
    fromStationData: StationList | null,
    toStationData: StationList | null,
    ticketType: TicketType
  ): { fare: number | null, segments: Array<{ line: FareLine, from: string, to: string, sjt: number, svc: number }> } => {
    if (!fromStationData || !toStationData) {
      return { fare: null, segments: [] };
    }

    const segmentsResult: Array<{ line: FareLine, from: string, to: string, sjt: number, svc: number }> = [];
    let totalFare = 0;

    if (fromStationData.line === toStationData.line) {
      const currentLine = fromStationData.line as FareLine; // e.g., 'LRT1'
      const lineFareMatrixSJT = faresData[currentLine]?.SJT;
      const lineFareMatrixSVC = faresData[currentLine]?.SVC;

      let sjtFare: number | undefined;
      let svcFare: number | undefined;

      // Type-safe access for same-line journey
      if (lineFareMatrixSJT && fromStationData.name in lineFareMatrixSJT) {
        const fromSJT = lineFareMatrixSJT[fromStationData.name as keyof typeof lineFareMatrixSJT];
        if (fromSJT && toStationData.name in fromSJT) {
          sjtFare = fromSJT[toStationData.name as keyof typeof fromSJT];
        }
      }
      if (lineFareMatrixSVC && fromStationData.name in lineFareMatrixSVC) {
        const fromSVC = lineFareMatrixSVC[fromStationData.name as keyof typeof lineFareMatrixSVC];
        if (fromSVC && toStationData.name in fromSVC) {
          svcFare = fromSVC[toStationData.name as keyof typeof fromSVC];
        }
      }

      if (sjtFare !== undefined && svcFare !== undefined) {
        segmentsResult.push({
          line: currentLine,
          from: fromStationData.name,
          to: toStationData.name,
          sjt: sjtFare,
          svc: svcFare,
        });
        totalFare = ticketType === 'SJT' ? sjtFare : svcFare;
      } else {
        Alert.alert("Fare Not Found", `Direct fare for ${fromStationData.name} to ${toStationData.name} on ${currentLine} not available.`);
        return { fare: null, segments: [] };
      }
    } else {
      // Hardcoded transfer logic (Anonas LRT2 <-> Carriedo LRT1)
      if (fromStationData.name === 'Anonas' && fromStationData.line === 'LRT2' &&
          toStationData.name === 'Carriedo' && toStationData.line === 'LRT1') {

        const lrt2Start = 'Anonas' as LRT2StationName; // Use direct literals or cast to specific station name type
        const lrt2Transfer = 'Recto' as LRT2StationName;
        const lrt1Transfer = 'Doroteo Jose' as LRT1StationName;
        const lrt1End = 'Carriedo' as LRT1StationName;

        const seg1Sjt = fares.LRT2.SJT[lrt2Start]?.[lrt2Transfer];
        const seg1Svc = fares.LRT2.SVC[lrt2Start]?.[lrt2Transfer];
        const seg2Sjt = fares.LRT1.SJT[lrt1Transfer]?.[lrt1End];
        const seg2Svc = fares.LRT1.SVC[lrt1Transfer]?.[lrt1End];

        if (seg1Sjt !== undefined && seg1Svc !== undefined && seg2Sjt !== undefined && seg2Svc !== undefined) {
          segmentsResult.push(
            { line: 'LRT2', from: lrt2Start, to: lrt2Transfer, sjt: seg1Sjt, svc: seg1Svc },
            { line: 'LRT1', from: lrt1Transfer, to: lrt1End, sjt: seg2Sjt, svc: seg2Svc }
          );
          totalFare = ticketType === 'SJT' ? (seg1Sjt + seg2Sjt) : (seg1Svc + seg2Svc);
        } else {
           Alert.alert("Transfer Fare Error", "Fare details for Anonas to Carriedo transfer are incomplete in fare data.");
           return { fare: null, segments: [] };
        }
      }
      else if (fromStationData.name === 'Carriedo' && fromStationData.line === 'LRT1' &&
               toStationData.name === 'Anonas' && toStationData.line === 'LRT2') {

        const lrt1Start = 'Carriedo' as LRT1StationName;
        const lrt1Transfer = 'Doroteo Jose' as LRT1StationName;
        const lrt2Transfer = 'Recto' as LRT2StationName;
        const lrt2End = 'Anonas' as LRT2StationName;

        const seg1Sjt = fares.LRT1.SJT[lrt1Start]?.[lrt1Transfer];
        const seg1Svc = fares.LRT1.SVC[lrt1Start]?.[lrt1Transfer];
        const seg2Sjt = fares.LRT2.SJT[lrt2Transfer]?.[lrt2End];
        const seg2Svc = fares.LRT2.SVC[lrt2Transfer]?.[lrt2End];

        if (seg1Sjt !== undefined && seg1Svc !== undefined && seg2Sjt !== undefined && seg2Svc !== undefined) {
          segmentsResult.push(
            { line: 'LRT1', from: lrt1Start, to: lrt1Transfer, sjt: seg1Sjt, svc: seg1Svc },
            { line: 'LRT2', from: lrt2Transfer, to: lrt2End, sjt: seg2Sjt, svc: seg2Svc }
          );
          totalFare = ticketType === 'SJT' ? (seg1Sjt + seg2Sjt) : (seg1Svc + seg2Svc);
        } else {
           Alert.alert("Transfer Fare Error", "Fare details for Carriedo to Anonas transfer are incomplete in fare data.");
           return { fare: null, segments: [] };
        }
      }

      else {
        Alert.alert("Multi-Line Fare Not Implemented", "Fare calculation for this specific multi-line journey is not yet supported.");
        return { fare: null, segments: [] };
      }
    }
    return { fare: totalFare, segments: segmentsResult };
  };

  const handleComputeFare = (type: TicketType) => {
    if (!departureStation || !arrivalStation) {
      Alert.alert("Station Info Missing", "Departure or arrival station data is not loaded.");
      return;
    }
    setSelectedTicketType(type);
    const { fare, segments } = getFare(departureStation, arrivalStation, type);
    setComputedFare(fare);
    setJourneySegments(segments);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>RIDE</Text>
          <TouchableOpacity onPress={() => setIsMapModalVisible(true)} style={styles.viewMapButton}>
            <Text style={styles.viewMapButtonText}>View All Stations</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Depart From:</Text>
          {departureStation ? (
            <>
              <Text style={styles.station}>{departureStation.name} ({departureStation.line})</Text>
              <Image source={departureStation.image} style={styles.stationImage} resizeMode="cover"/>
              <View style={styles.statusContainer}>
                <Text style={styles.statusText}>CROWD DENSITY: <Text style={styles.light}>LIGHT</Text></Text>
                <Text style={styles.statusText}>STATUS: <Text style={styles.departing}>TRAIN DEPARTING</Text></Text>
              </View>
            </>
          ) : <Text style={styles.stationLoading}>Loading departure station...</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Arrive To:</Text>
          {arrivalStation ? (
            <>
              <Text style={styles.station}>{arrivalStation.name} ({arrivalStation.line})</Text>
              <Image source={arrivalStation.image} style={styles.stationImage} resizeMode="cover"/>
              <View style={styles.statusContainer}>
                <Text style={styles.statusText}>CROWD DENSITY: <Text style={styles.average}>AVERAGE</Text></Text>
                <Text style={styles.statusText}>STATUS: <Text style={styles.arriving}>TRAIN ARRIVING</Text></Text>
              </View>
            </>
          ) : <Text style={styles.stationLoading}>Loading arrival station...</Text>}
        </View>

        {(departureStation && arrivalStation) && (
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>TOTAL FARE</Text>
            <View style={styles.fareCard}>
                {journeySegments.length > 0 ? journeySegments.map((segment, index) => (
                <Text key={index} style={styles.fareText}>
                    {segment.line} Route: {segment.from} to {segment.to}:
                    <Text style={styles.fareAmount}> P{segment.sjt} (SJT) / P{segment.svc} (SVC)</Text>
                </Text>
                )) : (
                    <Text style={styles.fareText}>Press "USE SVC" or "USE SJT" to calculate fare.</Text>
                )}

                {computedFare !== null && selectedTicketType && (
                <Text style={styles.totalFareText}>
                    Total Fare ({selectedTicketType}): <Text style={styles.fareAmount}>P{computedFare}</Text>
                </Text>
                )}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleComputeFare('SVC')}>
                <View style={styles.buttonSolid}><Text style={styles.buttonText}>USE SVC</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleComputeFare('SJT')}>
                <View style={styles.buttonSolid}><Text style={styles.buttonText}>USE SJT</Text></View>
                </TouchableOpacity>
            </View>
            </View>
        )}
      </ScrollView>

      <View style={styles.bottomNavContainer}>
         <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}><Text style={styles.navText}>Home</Text></TouchableOpacity>
          <TouchableOpacity style={styles.navItem}><Text style={styles.navText}>Ride</Text></TouchableOpacity>
          <TouchableOpacity style={styles.navItem}><Text style={styles.navText}>Orders</Text></TouchableOpacity>
          <TouchableOpacity style={styles.navItem}><Text style={styles.navText}>Profile</Text></TouchableOpacity>
        </View>
      </View>

      <StationMapModal
        visible={isMapModalVisible}
        onClose={() => setIsMapModalVisible(false)}
      />
    </View>
  );
};

// Styles remain the same as your last provided version
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2526',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  headerContainer: {
    backgroundColor: '#2A3B4C',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  viewMapButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FF8C00',
    borderRadius: 5,
  },
  viewMapButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#2A3B4C',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FF00FF',
    marginBottom: 8,
  },
  station: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  stationLoading: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
    marginVertical: 20,
  },
  stationImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 12,
    alignSelf: 'center',
    backgroundColor: '#3A4B5C'
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  statusText: {
    fontSize: 14,
    color: '#D3D3D3',
    fontWeight: '400',
  },
  light: { color: '#00FF00', fontWeight: '600' },
  average: { color: '#FFFF00', fontWeight: '600' },
  departing: { color: '#00FF00', fontWeight: '600' },
  arriving: { color: '#FFFF00', fontWeight: '600' },
  fareCard: {
    backgroundColor: '#3A4B5C',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  fareText: {
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 22,
  },
  totalFareText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
  fareAmount: {
    color: '#FF00FF',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonSolid: {
    backgroundColor: '#FF8C00',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2A3B4C',
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default RideScreen;