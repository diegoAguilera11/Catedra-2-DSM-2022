import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Modal,
  TextInput,
  Alert,
  Pressable,
  Image
} from 'react-native';

import {
  HelperText,
  List,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';

import DatePicker from 'react-native-date-picker';
import axios from 'axios';

const App = () => {

  const [text, setText] = React.useState('');
  const onChangeText = text => setText(text);
  const [productos, setProductos] = useState([]);
  const [ordenes, setOrdenes] = useState([]);



  const [modalMesero, setModalMesero] = useState(false);
  const [modalCliente, setModalCliente] = useState(false);

  const [nombre, setNombre] = useState('');
  const [mesa, setMesa] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setfecha] = useState(new Date())


  useEffect(() => {

    consultarAPI()
  }, [])


  const consultarAPI = async () => {
    const url = 'https://dummyjson.com/products';

    const response = await axios
      .get(url)
      .then(res => {
        setProductos(res.data['products']);
      })
      .catch(error => console.log(error))
  }

  const ingresarOrden = () => {

    if (mesa === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return
    }
    const orden = {
      id: new Date(),
      mesa,
      nombre,
      rut,
      email,
      fecha,
      descripcion,
      estado: 'INGRESADO'
    }
    setOrdenes([...ordenes, orden]);

    // Se limpia el formulario
    setMesa('');
    setNombre('');
    setRut('');
    setEmail('');
    setfecha(new Date());
    setDescripcion('');

    setModalCliente(false);
    Alert.alert('Exito', 'La orden fue ingresada correctamente');
  }

  const eliminarOrden = (id) => {

    setOrdenes(ordenes.filter(orden => orden.id !== id))
  }

  const marcarEntregado = (item) => {

    item.estado = 'ENTREGADO'
    setModalMesero(false);
  }

  const marcarEliminado = (item) => {

    item.estado = 'CANCELADO'
    setModalMesero(false);

  }

  // const hasErrors = () => {
  //   return !text.includes('@');
  // };

  // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <View>
    //     <TextInput label="Email" value={text} onChangeText={onChangeText} />
    //     <HelperText type="error" visible={hasErrors()}>
    //       Campo email invalido
    //     </HelperText>
    //   </View>
    //   <View>
    //     <Card>
    //       <Card.Title
    //         title="Card Title"
    //         subtitle="Card Subtitle"
    //         left={LeftContent}
    //       />
    //       <Card.Content>
    //         <Title>Card title</Title>
    //         <Paragraph>Card content</Paragraph>
    //       </Card.Content>
    //       <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
    //       <Card.Actions>
    //         <Button>Cancel</Button>
    //         <Button>Ok</Button>
    //       </Card.Actions>
    //     </Card>

    //     <DatePicker date={date} onDateChange={setDate} />
    //   </View>
    // </SafeAreaView>

    <View>
      <Text>Prueba 2 React Native</Text>

      <Button style={{ marginTop: 30 }} mode="contained" onPress={() => setModalCliente(true)}>
        Ingresar orden
      </Button>

      <Button style={{ marginTop: 30 }} mode="contained" onPress={() => setModalMesero(true)}>
        Ver orden
      </Button>

      <FlatList
        style={styles.contenedorFlatListP}
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.contenidoFlatListP}>
              <View style={{flex: 1}}>
                <Text style={{fontWeight:'bold', color: '#DA7313'}}>Name:<Text style={{fontWeight: '600', color: '#000'}}>{item.title}</Text></Text>
                <Text style={{fontWeight:'bold', color: '#DA7313'}}>Description: <Text style={{fontWeight: '600', color: '#000'}}>{item.description}</Text></Text>
                <Text style={{fontWeight:'bold', color: '#DA7313'}}>Price: <Text style={{fontWeight: '600', color: '#000'}}>{item.price}</Text></Text>
              </View>
              <Image style={{ width: 70, height: 70 }} source={{ uri: item.images[0] }} />
            </View>
          )
        }}
      />

      {modalCliente && (

        <Modal animationType='slide' visible={modalCliente}>
          <ScrollView style={{ backgroundColor: '#06B0C8', flex: 1 }}>
            <Button style={{ marginVertical: 20, marginHorizontal: 30 }} mode="contained" onPress={() => setModalCliente(false)}>
              Cerrar
            </Button>
            <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: '#000', marginVertical: 10 }}>Nueva Orden</Text>

            <View style={{ flex: 1, backgroundColor: '#FFF', borderRadius: 20, margin: 10 }}>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.label}>Número de mesa</Text>
                <TextInput
                  style={styles.input}
                  value={mesa}
                  onChangeText={setMesa}
                  placeholder='Ingresa tu número de mesa .Ej: 5'
                />
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                  style={styles.input}
                  value={nombre}
                  onChangeText={setNombre}
                  placeholder='Ingresa tu nombre .Ej: Pedro'
                />
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={styles.label}>RUT</Text>
                <TextInput
                  style={styles.input}
                  value={rut}
                  onChangeText={setRut}
                  placeholder='Ingresa tu RUT .Ej: 11.111.111-K'
                />
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={styles.label}>Correo Eléctronico</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder='Ingresa tu correo eléctronico .Ej: diego@correo.com'
                />
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={styles.label}>Fecha</Text>
                <DatePicker
                  style={styles.input}
                  date={fecha}
                  onDateChange={setfecha}
                />
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                  multiline={true}
                  maxLength={200}
                  style={styles.inputDescripcion}
                  value={descripcion}
                  onChangeText={setDescripcion}
                  placeholder='2 Fideos con salsa.'
                />
              </View>
              <Button style={{ marginVertical: 10, marginHorizontal: 30 }} mode="contained" onPress={() => ingresarOrden()}>
                Enviar Orden
              </Button>
            </View>
          </ScrollView>
        </Modal>
      )}

      {modalMesero && (

        <Modal animationType='slide' visible={modalMesero}>
          <View>
            <Button style={{ marginTop: 30 }} mode="contained" onPress={() => setModalMesero(false)}>
              Cerrar
            </Button>
            <Text>Ver Ordenes</Text>

            <FlatList
              style={styles.contenedorFlatList}
              data={ordenes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.contenidoFlatList}>
                    <View style={{ flex: 1 }}>
                      <Text  style={{fontWeight: '600', color: '#000'}}>{item.nombre}</Text>
                      <Text  style={{fontWeight: '600', color: '#000'}}>{item.descripcion}</Text>
                      <Text  style={{fontWeight: '600', color: '#000'}}>{item.estado}</Text>
                    </View>

                    <View>
                      <Pressable style={{ backgroundColor: '#EED747', borderRadius: 20, marginTop: 10 }} onPress={() => marcarEliminado(item)}>
                        <Text  style={{fontWeight: '600', color: '#000'}}>Cancelar</Text>
                      </Pressable>

                      <Pressable style={{ backgroundColor: '#66CD2F', borderRadius: 20, marginTop: 10 }} onPress={() => marcarEntregado(item)}>
                        <Text  style={{fontWeight: '600', color: '#000'}}>Entregado</Text>
                      </Pressable>

                      <Pressable style={{ backgroundColor: '#CD2F2F', borderRadius: 20, marginTop: 10 }} onPress={() => eliminarOrden(item.id)}>
                        <Text  style={{fontWeight: '600', color: '#000'}}>Eliminar</Text>
                      </Pressable>
                    </View>

                  </View>

                )
              }}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  input: {
    marginHorizontal: 10,
    backgroundColor: '#C6C6C6',
    borderRadius: 20
  },
  inputDescripcion: {
    marginHorizontal: 10,
    backgroundColor: '#C6C6C6',
    borderRadius: 20,
    paddingVertical: 30
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  contenedorFlatList: {
    backgroundColor: '#C85B06',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20
  },
  contenedorFlatListP: {
    backgroundColor: '#73B8B9',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20
  },
  contenidoFlatList: {
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row'
  },
  contenidoFlatListP: {
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  }
});

export default App;
