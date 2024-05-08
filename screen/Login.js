import { useEffect, useState } from "react";
import {  View, Alert, Image, StyleSheet,TouchableOpacity } from "react-native";
import {TextInput,Button, Text} from "react-native-paper";
import { login, useMyContextController } from "../src/Index";


const Login =({navigation})=>{
    const [controller,dispatch] = useMyContextController();
    const[email,setEmail] = useState("");
    const[password,setPassword] =useState("");
    const[showpassword,setShowPassword] =useState('');
    const {userLogin} = controller
    
    useEffect(()=>{
         if(userLogin !== null){
            if(userLogin.role =="customer"){
                navigation.navigate("Home");
                setEmail('')
                setPassword('')
            }
            else{
                navigation.navigate("Home")
            }
                
        }
    },[userLogin])
    const handerLogin=()=>{
        login(dispatch,email,password)
    }

    const hasErrorPassword =()=> password.length<6
    const hasErrorEmail =()=> !email.includes("@")
    const isDisabled = hasErrorPassword() || hasErrorEmail() || email === '' || password === '';
    return(
        <View style={{        
            flex:1,
            backgroundColor:'#DABC9D'
            }}>
            <View style={{        
            alignItems:'center'
            }}>
            <Image
                source={require("../assets/logo.jpg")}
                style={{width: 150,
                    height: 150,
                    marginVertical: 80,}}
            />
            </View>
            <View>
                <TextInput style={MyStyle.text}
                    placeholder={"Email"}
                    mode="outlined"
                    theme={{roundness: 10}}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput style={MyStyle.text}
                    //label={"Password"}
                    mode="outlined"
                    theme={{roundness: 10}}
                    placeholder={"Password"}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showpassword}
                    right={
                        <TextInput.Icon 
                        icon ={showpassword? "eye-off" : "eye"}
                        onPress={() => setShowPassword(!showpassword)}
                        />}
                />
                <Button
                style={MyStyle.buttonlogin}
                mode ="contained"
                onPress={handerLogin}
                disabled={isDisabled}
                >
                <Text
                style={{
                    fontSize:25,
                    color:"#5F5548"
                }} 
                >Login</Text>
                </Button>
                <View style={{ flexDirection:'row',alignSelf:"center" }}>
                <Text style={{ color: 'black',fontSize:15 }}>Don't have a account ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: 'white',fontSize:15 }}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default Login;

const MyStyle = StyleSheet.create({
    text:{
        marginVertical:10,
        marginHorizontal:30,
        backgroundColor:'#DDCAB8',
    },
    buttonlogin:{
        height:50,
        width:'auto',
        marginVertical:10,
        marginHorizontal:30,
        backgroundColor:'#E8AC59',
        justifyContent:'center',
    }

})
