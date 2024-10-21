import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView, TouchableOpacity } from 'react-native';

const App = () => {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [caesarResult, setCaesarResult] = useState('');
  const [vigenereResult, setVigenereResult] = useState('');

  // Función para cifrado César
  const caesarCipher = (str, shift) => {
    return str
      .split('')
      .map(char => {
        if (/[a-zA-Z]/.test(char)) {
          const code = char.charCodeAt(0);
          const a = code >= 65 && code <= 90 ? 65 : 97; // Ajustar para mayúsculas o minúsculas
          return String.fromCharCode(((code - a + shift) % 26) + a);
        }
        return char;
      })
      .join('');
  };

  // Función para cifrado Vigenère
  const vigenereCipher = (str, key) => {
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (/[a-zA-Z]/.test(char)) {
        const code = char.charCodeAt(0);
        const a = code >= 65 && code <= 90 ? 65 : 97; // Ajustar para mayúsculas o minúsculas
        const shift = key[keyIndex % key.length].toLowerCase().charCodeAt(0) - 97;
        result += String.fromCharCode(((code - a + shift) % 26) + a);
        keyIndex++;
      } else {
        result += char; // Mantener caracteres no alfabéticos
      }
    }
    
    return result;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Cifrado César Vigenére</Text>

        <TextInput
          style={styles.input}
          placeholder="Texto"
          placeholderTextColor="#888"
          value={text}
          onChangeText={setText}
        />
        <TextInput
          style={styles.input}
          placeholder="Clave"
          placeholderTextColor="#888"
          value={key}
          onChangeText={setKey}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => setCaesarResult(caesarCipher(text, 3))}
        >
          <Text style={styles.buttonText}>Cifrado César</Text>
        </TouchableOpacity>
        <Text style={styles.result}>Resultado César: {caesarResult}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setVigenereResult(vigenereCipher(text, key))}
        >
          <Text style={styles.buttonText}>Cifrar Vigenére</Text>
        </TouchableOpacity>
        <Text style={styles.result}>Cifrado Vigenére: {vigenereResult}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#e9ecef',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40',
  },
  input: {
    height: 50,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 10,
    fontSize: 16,
    color: '#495057',
  },
});

export default App;
