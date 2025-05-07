import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { stations } from '../lib/stations';
import { fares } from '../lib/fares';

type Line = 'MRT3' | 'LRT1' | 'LRT2';
type FareType = 'SJT' | 'SVC';

export default function RideScreen() {
  const [selectedLines, setSelectedLines] = useState<Line[]>([]);
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [hasConcession, setHasConcession] = useState(false);

  const lines: Line[] = ['MRT3', 'LRT1', 'LRT2'];
  const fareTypes: FareType[] = ['SJT', 'SVC'];

  // Combine stations from selected lines
  const combinedStations = selectedLines.flatMap((line) => stations[line]);

  const toggleLineSelection = (line: Line) => {
    setSelectedLines((prevLines) =>
      prevLines.includes(line)
        ? prevLines.filter((l) => l !== line)
        : [...prevLines, line]
    );
    setFromStation('');
    setToStation('');
  };

  const calculateFare = (
    line: Line,
    from: string,
    to: string,
    type: FareType
  ) => {
    if (!from || !to || from === to) return null;

    const fareData = fares[line]?.[type];
    if (!fareData) return null;

    let baseFare: number | null = null;

    if (
      fareData[from as keyof typeof fareData] &&
      fareData[from as keyof typeof fareData][to]
    ) {
      baseFare = fareData[from as keyof typeof fareData][to];
    } else if (
      fareData[to as keyof typeof fareData] &&
      fareData[to as keyof typeof fareData][from]
    ) {
      baseFare = fareData[to as keyof typeof fareData][from];
    }

    if (baseFare && hasConcession) {
      baseFare = Math.round(baseFare * 0.8); // Apply 20% discount
    }

    return baseFare;
  };

  const renderStationItem = ({ item }: { item: typeof combinedStations[0] }) => {
    const isSelected = fromStation === item.name || toStation === item.name;
    return (
      <TouchableOpacity
        style={[
          styles.stationCard,
          isSelected && styles.selectedCard,
        ]}
        onPress={() => {
          if (!fromStation || (fromStation && toStation)) {
            setFromStation(item.name);
            setToStation('');
          } else if (fromStation && !toStation) {
            setToStation(item.name);
          }
        }}
      >
        <Image
          source={
            typeof item.image === 'string'
              ? { uri: item.image }
              : item.image
          }
          style={styles.stationImage}
        />
        <Text style={styles.stationLabel}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ride Fare Calculator</Text>

      {/* Line Selector */}
      <View style={styles.lineSelector}>
        {lines.map((line) => (
          <TouchableOpacity
            key={line}
            style={[
              styles.lineButton,
              selectedLines.includes(line) && styles.lineButtonActive,
            ]}
            onPress={() => toggleLineSelection(line)}
          >
            <Text
              style={[
                styles.lineText,
                selectedLines.includes(line) && styles.lineTextActive,
              ]}
            >
              {line}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Concession Toggle */}
      <TouchableOpacity
        onPress={() => setHasConcession(!hasConcession)}
        style={[
          styles.concessionToggle,
          hasConcession && styles.concessionToggleActive,
        ]}
      >
        <Text style={styles.concessionText}>
          {hasConcession ? 'Concession Card: ON' : 'Concession Card: OFF'}
        </Text>
      </TouchableOpacity>

      {/* Station Selection */}
      <Text style={styles.sectionLabel}>Select Stations</Text>
      <FlatList
        data={combinedStations}
        renderItem={renderStationItem}
        keyExtractor={(item) => item.name}
        numColumns={3}
        contentContainerStyle={styles.stationGrid}
      />

      {/* Fare Display */}
      <View style={styles.fareBox}>
        <Text style={styles.fareTitle}>Fare Summary:</Text>
        {selectedLines.map((line) => (
          <View key={line}>
            <Text style={styles.lineFareTitle}>{line}</Text>
            {fareTypes.map((type) => {
              const fare = calculateFare(line, fromStation, toStation, type);
              return (
                <Text key={type} style={styles.fareText}>
                  {type}: {fare !== null ? `₱${fare}` : 'N/A'}
                </Text>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  lineSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  lineButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
  },
  lineButtonActive: {
    backgroundColor: '#3b82f6',
  },
  lineText: {
    fontWeight: '600',
    color: '#111827',
  },
  lineTextActive: {
    color: '#fff',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  stationGrid: {
    justifyContent: 'space-between',
  },
  stationCard: {
    flex: 1,
    margin: 4,
    alignItems: 'center',
    borderRadius: 12,
    padding: 6,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedCard: {
    borderColor: '#3b82f6',
    backgroundColor: '#dbeafe',
  },
  stationImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 6,
  },
  stationLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  fareBox: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  fareTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  lineFareTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  fareText: {
    fontSize: 16,
    marginBottom: 6,
  },
  concessionToggle: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    alignItems: 'center',
  },
  concessionToggleActive: {
    backgroundColor: '#10b981',
  },
  concessionText: {
    fontWeight: '600',
    color: '#111827',
  },
});
