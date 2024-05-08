import { useState } from "react";
import { Alert, View,Image,StyleSheet, TouchableOpacity } from "react-native";
import {TextInput,Button, Text, HelperText} from "react-native-paper";
import { createAccount } from "../src/Index";


const Register =({navigation})=>{
    const[email,setEmail] = useState("");
    const[password,setPassword] =useState("");
    const[fullname,setFullName] =useState("");
    const[passwordComfirm,setPasswordComfirm] =useState("");
    const[showpassword,setShowPassword] =useState('');
    const[showpasswordConfirm,setShowPasswordConfirm] =useState('');
    
    const handleCreateAccount = async () => {
        const role = "customer";
    
        try {
          const createdUser = await createAccount(fullname, email, password, role);

          navigation.navigate("Login"); // Redirect to Login screen
        } catch (error) {
          Alert.alert("Error", "An error occurred: " + error.message);
        }
      };
    const hasErrorPassword =()=> password.length<6
    const hasErrorPasswordConfirm =()=> passwordComfirm != password
    const hasErrorEmail =()=> !email.includes("@")

    return(
        <View style={{flex:1,justifyContent:"center",backgroundColor:'#DABC9D'}}>
            <View style={{        
            alignItems:'center'
            }}>
            <Image
                source={require("../assets/logo.jpg")}
                style={{width: 150,
                    height: 150,
                    marginVertical: 40,}}
            />
            </View>
            <TextInput style={MyStyle.text}
                mode="outlined"
                theme={{roundness: 10}}
                label={"Fullname"}
                value={fullname}
                onChangeText={setFullName}
            />
            <TextInput style={MyStyle.text}
                mode="outlined"
                theme={{roundness: 10}}
                label={"Email"}
                value={email}
                onChangeText={setEmail}
            />
            <HelperText style={MyStyle.texthelp} type="error" visible={hasErrorEmail()}>
                Sai dia chi email
            </HelperText>
            <TextInput
                style={MyStyle.text}
                mode="outlined"
                theme={{roundness: 10}}
                label={"Password"}
                value={password}
                secureTextEntry={!showpassword}
                onChangeText={setPassword}
                right={
                    <TextInput.Icon 
                    icon ={showpassword? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showpassword)}
                    />}
            />
            <HelperText style={MyStyle.texthelp} type="error" visible={hasErrorPassword()}>
                Password it nhat 6 ki tu
            </HelperText>
            <TextInput
                style={MyStyle.text}
                mode="outlined"
                theme={{roundness: 10}}
                label={"PasswordComfirm"}
                value={passwordComfirm}
                secureTextEntry={!showpasswordConfirm}
                onChangeText={setPasswordComfirm}
                right={
                <TextInput.Icon 
                icon ={showpasswordConfirm ? "eye-off" : "eye"}
                onPress={() => setShowPasswordConfirm(!showpasswordConfirm)}
                />}
            />         
            <HelperText type="error" visible={hasErrorPasswordConfirm()}>
                Password Confirm khong khop
            </HelperText>
            <Button mode ="contained"
                style={MyStyle.buttonlogin}
                onPress={handleCreateAccount}
                disabled={hasErrorEmail()||hasErrorPassword()||hasErrorPasswordConfirm()}
            >
                Register
            </Button>
            <View style={{ flexDirection:'row',alignSelf:"center" }}>
                <Text style={{ color: 'black',fontSize:15 }}>Already have an account ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: 'white',fontSize:15 }}>
                        Log In
                    </Text>
                </TouchableOpacity>
                </View>
        </View>
    )
}
export default Register;
const MyStyle = StyleSheet.create({
    text:{
        marginVertical:2,
        marginHorizontal:30,
        backgroundColor:'#DDCAB8',
    },
    texthelp:{
        marginHorizontal:30,
    },
    buttonlogin:{
        height:45,
        width:'auto',
        marginVertical:2,
        marginHorizontal:30,
        backgroundColor:'#E8AC59',
        justifyContent:'center',
    }

})