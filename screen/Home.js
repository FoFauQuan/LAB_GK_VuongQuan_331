import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Appbar, Button, List,TextInput } from "react-native-paper"
import firestore from"@react-native-firebase/firestore"
import { logout, useMyContextController } from "../src/Index"


const Home =({navigation})=>{
    const [controller,dispatch] = useMyContextController();
    const ref = firestore().collection('todos');
    const [newToDo,setNewToDo]=useState("")
    const [loading,setLoading] =useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [todos,setToDo]=useState([])
    const { userLogin } = controller;
    
    const handerLogout=()=>{
        logout(dispatch)
    }
    useEffect(() => {
        if (userLogin == null)
          navigation.navigate("Login")
      }, [userLogin]);
    
    useEffect(() => {
        const unsubscribe = ref.onSnapshot(collection => {
            const result = [];
            collection.forEach(doc => {
                const { title, complete } = doc.data();
                result.push({
                    id: doc.id,
                    title,
                    complete
                });
            });
            result.sort((a, b) => a.title.localeCompare(b.title));
            // Đặt setToDo bên trong callback của onSnapshot
            setToDo(result);

            if (loading) {
                setLoading(false);
              }
        });
        
        // Trả về một hàm để unsubscribe khi không cần thiết nữa
        return () => unsubscribe();
    }, [todos]);
    useEffect(() => {
        if (newToDo.trim() !== "") {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [newToDo]);


    const addNewTodo=()=>{
        ref.add(
            {
                title: newToDo,
                complete: false
            }
            
        )
        .then(setNewToDo(''))
        .catch(e=>console.log(e.message))
    };

    const toggleComplete=(id,complete)=>{
        ref.doc(id)
        .update({
            complete: !complete,
        });
    }

    const renderItem =({item})=>{
        const {id,title,complete} = item
        return(
            <List.Item
                style = {{
                   
                }} 
                title={<Text style={{ fontSize: 16 }}>{title}</Text>}
                onPress={()=>toggleComplete(id,complete)}
                right={() => (
                    <Button icon="delete"  onPress={() => deleteTodo(id)}>
                    </Button>
                )}
                            
            />    
        )
    }
    const deleteTodo = (id) => {
        ref.doc(id)
          .delete()
          .then(() => {
            console.log("Todo deleted successfully");
          })
          .catch((error) => {
            console.error("Error removing todo: ", error);
          });
      };

    return(
        <View style={{flex:1,backgroundColor:'#E8AC59'}}>
            <Appbar style={{backgroundColor:'#E8AC59'}}>
                <Appbar.Content title='Home'/>
                {userLogin && userLogin.fullname && (
                    <Text style={{ color: 'black',fontSize:20, marginRight:20 }}>Hello, {userLogin.fullname}</Text>
                )}
                <Appbar.Action icon='logout' size={30} onPress={handerLogout} />
            </Appbar>
            <View style={{flexDirection:"row"}}>
            <TextInput
            style = {{
                flex:1,
                margin:5,
                backgroundColor:'#DDCAB8',
                borderRadius:10
            }} 
            label={'New Todo'}
            value={newToDo}
            onChangeText={setNewToDo}
            >
            </TextInput>
            <Button
            style={{
                
                height:50,
                width:'auto',
                marginTop:10,
                backgroundColor:'#D1B9A2',
                justifyContent:"flex-end",
            }}
            onPress={addNewTodo}
            disabled={buttonDisabled}>
                <Text
                style={{
                    flexGrow:1,
                    fontSize:22,
                    color:"black"
                }} 
                >ADD</Text>
            </Button>
            </View>
            {userLogin && userLogin.fullname && (
                    <Text style={{ color: 'black',fontSize:20, marginRight:20 }}>Danh sách của {userLogin.fullname}</Text>
                )}
            <FlatList
                style={{
                    flexGrow: 1,
                    margin:5,
                    backgroundColor:'#DABC9D',
                }}
                data = {todos}
                keyExtractor={item =>item.id}
                renderItem={renderItem}
            />
        </View>
    )
}
export default Home;