export type StationList = {
    name: string;
    latitude: number;
    longitude: number;
    line: 'LRT1' | 'LRT2' | 'MRT3';
    image: any;
    landmarks?: string[];
  };
  
  export type StationMap = {
    [key in 'LRT1' | 'LRT2' | 'MRT3']: StationList[];
  };
  
  export const stations: StationMap = {
    LRT1: [
        {
          name: 'Fernando Poe Jr. Station',
          latitude: 14.638056,
          longitude: 121.003333,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/FPJ.jpg'),
          landmarks: [
            'EDSA Carousel Bus Stop - Roosevelt',
            'Muñoz Market',
            'STI College Muñoz-EDSA',
            'Waltermart North EDSA',
            'SM City North EDSA (Continue By Jeep)',
          ]
        },
        {
          name: 'Balintawak Station',
          latitude: 14.6575,
          longitude: 121.003889,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/Balintawak.jpg'),
          landmarks: [
            'Puregold Balintawak',
            'Balintawak Market',
            'Ayala Malls Cloverleaf (Continue By Shuttle)',
            'Balintawak Cloverleaf Park',
            'Juliana Wet and Dry Market',
          ]
        },
        {
          name: 'Monumento Station',
          latitude: 14.656944,
          longitude: 120.998611,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/YAMAHA_Monumento.jpg'),
          landmarks: [
            'Andres Bonifacio National Monument',
            'SM City Grand Central Mall NCR',
            'Manila Central University',
            'SM Hypermart Monumento',
            'Araneta Square Mall',
          ]
        },
        {
          name: '5th Avenue Station',
          latitude: 14.645833,
          longitude: 120.996667,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/5thAve.jpeg'),
          landmarks: [
            'La Loma Catholic Cemetery',
            'San Pancracio Parish Church',
            'Manila Chinese Cemetery North Gate',
          ]
        },
        {
          name: 'R. Papa Station',
          latitude: 14.637222,
          longitude: 120.995278,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/R_Papa.jpg'),
          landmarks: [
            'Chinese Cemetery R. Papa Gate',
            'San Pancracio Parish Church (Diocese of Caloocan)',
            'Matang Tubig Basketball Court',
          ]
        },
        {
          name: 'Abad Santos Station',
          latitude: 14.630833,
          longitude: 120.994722,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/Abad_Santos.jpg'),
          landmarks: [
            'Renzo Sports & Resto Bar',
            'San Pancracio Parish Church (Diocese of Caloocan)',
            'Chinese Cemetery South Gate',
          ]
        },
        {
          name: 'Blumentritt Station',
          latitude: 14.623056,
          longitude: 120.991944,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/Blumentritt.jpg'),
          landmarks: [
            'PNR Blumentritt Station (Defunct)',
            'San Roque de Manila Parish (Archdiocese of Manila)',
            'Puregold Blumentritt',
          ]
        },
        {
          name: 'Tayuman Station',
          latitude: 14.616667,
          longitude: 120.988889,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/Tayuman.jpg'),
          landmarks: [
            'SM City San Lazaro',
            'Department of Health (DOH) - San Lazaro Compound',
            'Archdiocesan Shrine of Espiritu Santo (Archdiocese of Manila)',
            'Jose R. Reyes Memorial Medical Center',
            'Tayuman Center Mall',
          ]
        },
        {
          name: 'Bambang Station',
          latitude: 14.610833,
          longitude: 120.9875,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/Bambang.jpg'),
          landmarks: [
            'Bambang Market',
            'Manila Business College',
            'Puregold Zurbaran',
            'Dayao-Capiral Ancestral House',
          ]
        },
        {
          name: 'Doroteo Jose Station',
          latitude: 14.606111,
          longitude: 120.984444,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/Doroteo_Jose.jpg'),
          landmarks: [
            'Transfer to: LRT 2 - Recto Station',
            'Manila City Jail',
            'Manila Grand Opera Hotel',
            'Philippine Rabbit Bus Lines Terminal',
            'Odeon Terminal Mall',
          ]
        },
        {
          name: 'Carriedo Station',
          latitude: 14.599722,
          longitude: 120.983611,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/Carriedo.jpg'),
          landmarks: [
            'FEATI University',
            'Minor Basilica and National Shrine of Jesus Nazareno - St. John the Baptist Parish',
            'Roman Santos Building',
            'Plaza Lacson',
            'Plaza Sta Cruz',
          ]
        },
        {
          name: 'Central Terminal Station',
          latitude: 14.594722,
          longitude: 120.983056,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/Central.jpg'),
          landmarks: [
            'Pasig Ferry Lawton',
            'Intramuros',
            'Arroceros Forest Park',
            'Manila Central Post Office',
            'Pasig River Esplanade',
          ]
        },
        {
          name: 'United Nations Station',
          latitude: 14.582222,
          longitude: 120.984722,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/United_Nations.jpg'),
          landmarks: [
            'Rizal Park',
            'National Museum of Natural History',
            'National Museum of Anthropology',
            'National Museum of Fine Arts',
            'National Library of the Philippines',
          ]
        },
        {
          name: 'Pedro Gil Station',
          latitude: 14.573333,
          longitude: 120.986111,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/Pedro_Gil.jpg'),
          landmarks: [
            'Philippine General Hospital',
            'University of the Philippines Manila',
            'Philippine Christian University',
            'Philippine Women’s University',
            'Manila Science High School',
          ]
        },
        {
          name: 'Quirino Avenue Station',
          latitude: 14.5675,
          longitude: 120.988056,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/Quirino.jpg'),
          landmarks: [
            'One Taft Residences',
            'Harvard Suites',
            'MNLA Fitness Gym',
            'Vellagio Tower',
            'Manila Zoo (Continue By Jeep)',
          ]
        },
        {
          name: 'Vito Cruz Station',
          latitude: 14.558056,
          longitude: 120.9925,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/Vito_Cruz.jpeg'),
          landmarks: [
            'De La Salle University Manila',
            'De La Salle-College of Saint Benilde Taft Campus',
            'Museum of Contemporary Art and Design Manila',
            'Rizal Memorial Stadium',
            'Rizal Memorial Coliseum',
          ]
        },
        {
          name: 'Gil Puyat Station',
          latitude: 14.550556,
          longitude: 120.994722,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/Gil_Puyat.jpeg'),
          landmarks: [
            'World Trade Center Metro Manila (Continue By Jeep)',
            'Arellano University - Jose Abad Santos Campus',
            'DLTB Co. Bus Buendia Terminal',
            'Jac Liner Buendia Terminal',
          ]
        },
        {
          name: 'Libertad Station',
          latitude: 14.543056,
          longitude: 120.996389,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/Libertad.jpg'),
          landmarks: [
            'Victory Mall Pasay',
            'Puregold Libertad',
            'Cuneta Astrodome (Continue By Jeep)',
          ]
        },
        {
          name: 'EDSA Station',
          latitude: 14.5375,
          longitude: 120.997222,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/EDSA.jpg'),
          landmarks: [
            'Transfer to: MRT 3 - Taft Ave. Station',
            'EDSA Carousel Bus Stop - Taft Avenue',
            'Metro Point Mall',
            'Rotonda Terminal Pasay',
            'SM Mall of Asia (MOA) (Continue By Jeep)',
          ]
        },
        {
          name: 'Baclaran Station',
          latitude: 14.534444,
          longitude: 120.998333,
          line: 'LRT1',
          image: require('../../assets/images/LRT1/Baclaran.jpg'),
          landmarks: [
            'Baclaran Flea Market',
            'MyMall',
            'Two Shopping Center',
            'Baclaran Super Mall',
          ]
        },
        {
          name: "Redemptorist-Aseana Station",
          latitude: 14.53028,
          longitude: 120.99294,
          line: "LRT1",
          image: require("../../assets/images/LRT1/Redemptorist_Aseana.jpg"),
          landmarks: [
            'National Shrine of Our Mother of Perpetual Help',
            'Aseana City',
            'Department of Foreign Affairs - Office of Consular Affairs - ASEANA',
            'S&R Aseana-Baclaran',
            'City of Dreams Manila',
          ]
        },
        {
          name: "MIA Road Station",
          latitude: 14.51843,
          longitude: 120.99299,
          line: "LRT1",
          image: require("../../assets/images/LRT1/MIA.jpg"),
          landmarks: [
            'Ayala Malls Manila Bay',
            'Palacio de Memoria',
            'SMDC Breeze Residences by RedDoorz',
          ]
        },
        {
          name: "PITX Station",
          latitude: 14.50848,
          longitude: 120.99128,
          line: "LRT1",
          image: require("../../assets/images/LRT1/PITX.jpg"),
          landmarks: [
            'Parañaque Integrated Terminal Exchange (PITX)',
            'Imperial Plaza',
            'SSK Business Building',
          ]
        },
        {
          name: "Ninoy Aquino Avenue Station",
          latitude: 14.49864,
          longitude: 120.99436,
          line: "LRT1",
          image: require("../../assets/images/LRT1/Ninoy_Aquino.jpg"),
          landmarks: [
            'Ninoy Aquino International Airport (NAIA) Terminal 1 (Continue By Taxi)',
            'Ninoy Aquino International Airport (NAIA) Terminal 2 (Continue By Taxi)',
            'Puregold Parañaque',
            'S&R Parañaque',
            'Duty Free Philippines Fiesta Mall',
          ]
        },
        {
          name: "Dr. Santos Station",
          latitude: 14.4853,
          longitude: 120.98956,
          line: "LRT1",
          image: require("../../assets/images/LRT1/Dr._Santos.jpg"),
          landmarks: [
            'SM City Sucat Building B',
            'The Philippine STAR Parañaque Office',
            'El Shaddai Shrine',
          ]
        }
      ],
  
    LRT2: [
        {
          name: 'Antipolo Station',
          latitude: 14.624722,
          longitude: 121.121111,
          line: 'LRT2',
          image: require('../../assets/images/LRT2/Antipolo.jpg'),
          landmarks: [
            'Antipolo Cathedral (Continue By Jeep/Bus/Tricycle)',
            'East Gate Business Center and Terminal',
            'SM City Masinag',
            'Kingsville Arcade',
          ]
        },
        {
          name: 'Marikina-Pasig Station',
          latitude: 14.620278,
          longitude: 121.100278,
          line: 'LRT2',
          image: require('../../assets/images/LRT2/Marikina_Pasig.jpg'),
          landmarks: [
            'Robinsons Place Metro East',
            'Sta. Lucia East Grand Mall',
            'Q Plaza',
          ]
        },
        {
          name: 'Santolan Station',
          latitude: 14.622139,
          longitude: 121.085917,
          line: 'LRT2',
          image: require('../../assets/images/LRT2/Santolan_LRT.jpg'),
          landmarks: [
            'SM City Marikina',
            'Ayala Malls Feliz (Continue By Jeep/Bus)',
            'BFCT East Metro Transport Terminal',
            'BFCT Bagsakan Market',
          ]
        },
        {
          name: 'Katipunan Station',
          latitude: 14.631097,
          longitude: 121.072958,
          line: 'LRT2',
          image: require('../../assets/images/LRT2/Katipunan.jpg'),
          landmarks: [
            'University of the Philippines - Diliman (Continue By Jeep)',
            'Ateneo de Manila University (Continue By Jeep)',
            'Miriam College (Continue By Jeep)',
            'UP Town Center (Continue By Jeep)',
            'Real Monasterio ​de Santa Clara de Manila',
          ]
        },
        {
          name: 'Anonas Station',
          latitude: 14.628,
          longitude: 121.064694,
          line: 'LRT2',
          image: require('../../assets/images/LRT2/Anonas.jpg'),
          landmarks: [
            'Technological Institute of the Philippines (TIP) - Quezon City',
            'World Citi Colleges (WCC) - Quezon City',
            'World Citi Medical Center',
            'Hi-Top Supermart',
            'Coffeespot Ermin Garcia Ave.',
          ]
        },
        {
          name: 'Araneta Center-Cubao Station',
          latitude: 14.622678,
          longitude: 121.052636,
          line: 'LRT2',
          image: require('../../assets/images/LRT2/Cubao_LRT.jpg'),
          landmarks: [
            'Transfer to: MRT 3 - Araneta Center-Cubao Station',
            'Gateway Mall Complex 1 and 2',
            'Farmers Plaza',
            'Araneta Coliseum',
            'Ali Mall',
          ]
        },
        {
          name: 'Betty Go-Belmonte Station',
          latitude: 14.618333,
          longitude: 121.0425,
          line: 'LRT2',
          image: require('../../assets/images/LRT2/Betty_Go_Belmonte.jpg'),
          landmarks: [
            'Immaculate Conception Cathedral (Diocese of Cubao)',
            'Titus Brandsma Center',
            'The Three King Temple',
          ]
        },
        {
          name: 'Gilmore Station',
          latitude: 14.613333,
          longitude: 121.033889,
          line: 'LRT2',
          image: require('../../assets/images/LRT2/Gilmore.jpg'),
          landmarks: [
            'Gilmore IT Center',
            'Robinsons Magnolia',
            'St. Paul University - Quezon City',
            'Broadway Centrum',
          ]
        },
        {
          name: 'J. Ruiz Station',
          latitude: 14.610556,
          longitude: 121.026111,
          line: 'LRT2',
          image: require('../../assets/images/LRT2/J._Ruiz.jpg'),
          landmarks: [
            'Pinaglabanan Shrine',
            'St. John the Baptist Church',
            'San Juan City Hall',
          ]
        },
        {
          name: 'V. Mapa Station',
          latitude: 14.607778,
          longitude: 121.021389,
          line: 'LRT2',
          image: require('../../assets/images/LRT2/V._Mapa.jpg'),
          landmarks: [
            'SM City Sta. Mesa',
            'SMDC Mezza Residences',
            'University of the East Ramon Magsaysay Memorial Medical Center (UERM)',
            'Central Colleges of the Philippines',
          ]
        },
        {
          name: 'Pureza Station',
          latitude: 14.604167,
          longitude: 121.008056,
          line: 'LRT2',
          image: require('../../assets/images/LRT2/Pureza.jpg'),
          landmarks: [
            'PNR Sta. Mesa Station (Defunct)',
            'Polytechnic University of the Philippines (PUP) - Sta. Mesa',
            'Eulogio "Amang" Rodriguez Institute of Science and Technology (EARIST)',
            'Sta. Mesa Fire Station No. 8',
            'Pureza PUP Ferry Terminal',
          ]
        },
        {
          name: 'Legarda Station',
          latitude: 14.604444,
          longitude: 120.997222,
          line: 'LRT2',
          image: require('../../assets/images/LRT2/Legarda.jpg'),
          landmarks: [
            'Technological Institute of the Philippines (TIP) - Manila',
            'National University (NU) - Manila',
            'San Beda University - Manila',
            'University of the East (UE) - Manila',
            'Pontifical and Royal University of Santo Tomas (UST) (Continue By Pedicab)',
          ]
        },
        {
          name: 'Recto Station',
          latitude: 14.603333,
          longitude: 120.983889,
          line: 'LRT2',
          image: require('../../assets/images/LRT2/Recto.jpg'),
          landmarks: [
            'Transfer to: LRT 1 - Doroteo Jose Station',
            'Far Eastern University (FEU) - Manila',
            'Isetann Cinerama Complex',
            'Manila City Jail',
          ]
        },
      ],
    
      MRT3: [
        {
          name: 'North Avenue Station',
          latitude: 14.654911,
          longitude: 121.031029,
          line: 'MRT3',
          image: require('../../assets/images/MRT3/North_Ave.jpg'),
          landmarks: [
            'EDSA Carousel Bus Stop - North Avenue',
            'Trinoma Mall',
            'SM North EDSA',
            'Ayala Malls Vertis North',
          ]
        },
        {
          name: 'Quezon Avenue Station',
          latitude: 14.646551,
          longitude: 121.036266,
          line: 'MRT3',
          image: require('../../assets/images/MRT3/Quezon_Ave.jpg'),
          landmarks: [
            'EDSA Carousel Bus Stop - Quezon Avenue',
            'Etron Centris',
            'Centris Station Mall',
            'ABS-CBN Broadcasting Center',
            'PBB House',
          ]
        },
        {
          name: 'GMA-Kamuning Station',
          latitude: 14.637021,
          longitude: 121.042394,
          line: 'MRT3',
          image: require('../../assets/images/MRT3/GMA_Kamuning.jpg'),
          landmarks: [
            'EDSA Carousel Bus Stop - Katipunan',
            'GMA Network Center',
            'Hisbeans Cafe',
            'Manuel L. Quezon University',
            'Adonis Entertainment Bar',
          ]
        },
        {
          name: 'Araneta Center-Cubao Station',
          latitude: 14.621446,
          longitude: 121.053704,
          line: 'MRT3',
          image: require('../../assets/images/MRT3/Cubao_MRT.jpg'),
          landmarks: [
            'Transfer to: LRT 2 - Araneta Center-Cubao Station',
            'Gateway Mall Complex',
            'Farmers Plaza',
            'Araneta Coliseum',
            'Ali Mall',
          ]
        },
        {
          name: 'Santolan-Annapolis Station',
          latitude: 14.607762,
          longitude: 121.056342,
          line: 'MRT3',
          image: require('../../assets/images/MRT3/Santolan_MRT.jpg'),
          landmarks: [
            'EDSA Carousel Bus Stop - Santolan',
            'PNP (Camp Crame) Headquarters',
            'Camp Aguinaldo',
            'Armed Forces of the Philippines (AFP) Museum',
            'EDSA People Power Monument',
          ]
        },
        {
          name: 'Ortigas Station',
          latitude: 14.586, 
          longitude: 121.0564,
          line: 'MRT3',
          image: require('../../assets/images/MRT3/Ortigas.jpg'),
          landmarks: [
            'EDSA Carousel Bus Stop - Ortigas',
            'SM Megamall',
            'Robinsons Galleria Ortigas',
            'National Shrine of Mary, Queen of Peace - EDSA Shrine (Archdiocese of Manila)',
            'Department of Migrant Workers (DMW) - Ortigas',
          ]
        },
        {
          name: 'Shaw Boulevard Station',
          latitude: 14.582151,
          longitude: 121.053689,
          line: 'MRT3',
          image: require('../../assets/images/MRT3/Shaw_Blvd.jpg'),
          landmarks: [
            'Shangri-La Plaza',
            'Starmall EDSA-Shaw',
            'Greenfield District Pavilion',
            'Mandala Park (Continue By Jeep)',
          ]
        },
        {
          name: 'Boni Station',
          latitude: 14.577235,
          longitude: 121.046125,
          line: 'MRT3',
          image: require('../../assets/images/MRT3/Boni.jpg'),
          landmarks: [
            'Rizal Technological University (RTU) - Main Campus',
            'SMDC Light Mall',
            'Philippine Red Cross National Headquarters',
            'TV5 Media Center',
          ]
        },
        {
          name: 'Guadalupe Station',
          latitude: 14.566082,
          longitude: 121.045744,
          line: 'MRT3',
          image: require('../../assets/images/MRT3/Guadalupe.jpg'),
          landmarks: [
            'Guadalupe Ferry Terminal',
            'Guadalupe Commercial Complex',
            'Loyola Memorial Chapels and Crematorium',
            'Guadalupe Park',
          ]
        },
        {
          name: 'Buendia Station',
          latitude: 14.554937,
          longitude: 121.034706,
          line: 'MRT3',
          image: require('../../assets/images/MRT3/Buendia.jpg'),
          landmarks: [
            'EDSA Carousel Bus Stop - Buendia',
            'SM Cyber Two',
            'SM Cyber Makati One',
            'DTI International Office',
            'Urdaneta Park',
          ]
        },
        {
          name: 'Ayala Station',
          latitude: 14.550107,
          longitude: 121.028469,
          line: 'MRT3',
          image: require('../../assets/images/MRT3/Ayala.jpg'),
          landmarks: [
            'EDSA Carousel Bus Stop - Ayala',
            'One Ayala',
            'Greenbelt Mall',
            'SM Makati',
            'Ayala Museum',
          ]
        },
        {
          name: 'Magallanes Station',
          latitude: 14.541006,
          longitude: 121.017759,
          line: 'MRT3',
          image: require('../../assets/images/MRT3/Magallanes.jpg'),
          landmarks: [
            'PNR EDSA Station (Defunct)',
            'Southgate Mall',
            'San Lorenzo Place Mall',
            'Magallanes Interchange Park',
          ]
        },
        {
          name: 'Taft Avenue Station',
          latitude: 14.536972,
          longitude: 121.001709,
          line: 'MRT3',
          image: require('../../assets/images/MRT3/Taft_Ave.jpg'),
          landmarks: [
            'Transfer to: LRT 1 - EDSA Station',
            'Metro Point Mall',
            'EDSA Carousel Bus Stop - Taft Avenue',
            'SM Mall of Asia (MOA) (Continue By Jeep)',
          ]
        },
      ]
    };