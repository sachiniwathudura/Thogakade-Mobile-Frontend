import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";
import IItem from "../../model/IItem";
import { Button } from 'react-native-paper';

export default function Item(){
    const[code,setCode]=useState("");
    const[name,setName]=useState("");
    const[quantity,setQuantity]=useState(0);
    const[price,setPrice]=useState(0);

    const[items,setItem]=useState<IItem[]>([]);


    function handleSubmit() {
        if(!code||!name||!quantity||!price){
            alert("All item fields required")
            return;
        }

        //duplicate code
        if (items.some(item => item.code === code)) {
            alert("Item with this code already exists!");
            return;
        }
        const newItem : IItem = {code,name,quantity,price};
        setItem([...items,newItem]);

        clearFields();

    }

    function clearFields() {
        setCode("");
        setName('');
        setQuantity(0);
        setPrice(0);
    }

    function handleUpdate() {
        if(!code){
            alert("Enter an code to update the Item!");
            return;

        }

        setItem(prevItems =>
            prevItems.map(item=>
                item.code===code?{...item,name,quantity,price}:item
            )
        );
        alert("Item updated successfully!");
        clearFields();

    }

    function handleDelete() {
        if(!code){
            alert("Enter an code to delete the Item!");
            return;
        }
        const ItemList=items.filter(item=>item.code!==code);
        if (ItemList.length === items.length) {
            alert("No Item found with this code!");
            return;
        }

        setItem(ItemList);
        alert("Item deleted successfully!");

        clearFields();
    }

    return (
        <SafeAreaView style={styles.layout}>
            <View style={styles.container}>
                <View style={styles.dataInput}>
                    <TextInput value={code} onChangeText={setCode} placeholder="Code" style={styles.input} />
                    <TextInput value={name} onChangeText={setName} placeholder="name" style={styles.input}/>
                    <TextInput
                        value={quantity === 0 ? "" : quantity.toString()}
                        onChangeText={(text) => setQuantity(Number(text) || 0)}
                        keyboardType="numeric"
                        placeholder="quantity"
                        style={styles.input}
                    />
                    <TextInput
                        value={price === 0 ? "" : price.toString()}
                        onChangeText={(text) => setPrice(Number(text) || 0)}
                        keyboardType="numeric"
                        placeholder="price"
                        style={styles.input}
                    />
                    <Button theme={{ colors: { primary: '#C8E6C9' , text: 'black' } }} mode="contained" onPress={(handleSubmit)} labelStyle={{ color: 'black' }}>
                        Add Item
                    </Button>
                    <Button theme={{ colors: { primary: '#E1BEE7' } }} mode="contained" onPress={(handleUpdate)} labelStyle={{ color: 'black' }}>
                        Update Item
                    </Button>
                    <Button theme={{ colors: { primary: '#FFCCBC' } }} mode="contained" onPress={(handleDelete)} labelStyle={{ color: 'black' }}>
                        Delete Item
                    </Button>

                </View>

                <ScrollView>
                    <View>
                        {items.map((item,index) => (
                            <View key={index} style={styles.dataDisplay}>
                                <Text>{item.code}</Text>
                                <Text>{item.name}</Text>
                                <Text>{item.quantity}</Text>
                                <Text>{item.price}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        paddingTop: 0,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dataInput: {
        width: '80%',
        padding: 10,
        gap: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '100%',
        borderRadius: 5,
    },
    dataDisplay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        gap:10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});