import { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { TextInput } from 'react-native-paper';
import CustomModal from './components/Customodal'
import useAbortableFetch from './hooks/useAbortableFetch'

const ALL_STATIONS_URL = 'https://tie.digitraffic.fi/api/weathercam/v1/stations'
const SINGLE_STATION_URL = 'https://tie.digitraffic.fi/api/weathercam/v1/stations/'

export default function App() {

  const [allStations, setAllStations] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStation, setSelectedStation] = useState('')
  const [stationData, setStationData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  const urlRef = useRef()
  const { data, error, loading } = useAbortableFetch(urlRef.current)

  useEffect(() => {
    findAllStations()
  }, [])

  const findAllStations = async () => {
    fetch(ALL_STATIONS_URL)
      .then(respose => respose.json())
      .then((json) => {
        const filteredResponse = json.features.map(station => ({
          id: station.properties.id,
          name: station.properties.name
            .replace(/_/g, ' ')
            .split(' ').slice(1).join(' ')
        }))
        setAllStations(filteredResponse)
      }).catch((error) => {
        console.log(error)
      })
  }

  const filteredStations = allStations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleStationPress = async (station) => {
    setSelectedStation(station)
    const response = await fetch(`https://tie.digitraffic.fi/api/weathercam/v1/stations/` + station.id);
    const json = await response.json()
    setStationData(json.properties)
    console.log(stationData.presets[0].imageUrl)
    setModalVisible(true)
  }

  return (

    <View style={styles.container}>

      <Text style={styles.headerText}>Kelikamerahaku</Text>
      <TextInput
        style={styles.field}
        placeholder='Etsi nimellä...'
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {searchTerm.length > 1 && <FlatList
        data={filteredStations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listContainer} onPress={() => handleStationPress(item)}>
            <Image style={styles.icon} source={require('./assets/cctv.png')} />
            <Text style={styles.list}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />}

      <CustomModal
        visible={modalVisible}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalText={selectedStation.name}
        stationData={stationData}
      >
      </CustomModal>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
    margin: 8
  },
  headerText: {
    paddingTop: 32,
    fontSize: 32
  },
  text: {
    alignItems: 'center'
  },
  listContainer: {
    fontSize: 32,
    padding: 4,
    borderWidth: 1,
    flexDirection: 'row'
  },
  field: {
    marginTop: 8,
    marginBottom: 16
  },
  icon: {
    width: 32,
    height: 32,
  }

});
