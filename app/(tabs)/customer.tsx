import { Button } from 'react-native-paper';
import { ScrollView, Text, View, SafeAreaView, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import ICustomer from "../../model/ICustomer";

export default function Customer() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const [customer, setCustomer] = useState<ICustomer[]>([]);

    function handleSubmit() {
        if (!name || !email || !address) {
            alert("All fields are required!");
            return;
        }

        // Check if customer already exists (Prevent duplicate emails)
        if (customer.some(cust => cust.email === email)) {
            alert("Customer with this email already exists!");
            return;
        }

        const newCustomer: ICustomer = { name, address, email };
        setCustomer([...customer, newCustomer]);

        // Clear input fields after submission
        clearFields();

    }

    function handleUpdate() {
        if (!email) {
            alert("Enter an email to update the customer!");
            return;
        }

        setCustomer(prevCustomers =>
            prevCustomers.map(cust =>
                cust.email === email ? { ...cust, name, address } : cust
            )
        );

        alert("Customer updated successfully!");
        clearFields();
    }

    function handleDelete() {
        if (!email) {
            alert("Enter an email to delete the customer!");
            return;
        }

        const updatedList = customer.filter(cust => cust.email !== email);

        if (updatedList.length === customer.length) {
            alert("No customer found with this email!");
            return;
        }

        setCustomer(updatedList);
        alert("Customer deleted successfully!");

        clearFields();
    }
    function clearFields() {
        setName('');
        setEmail('');
        setAddress('');
    }

    return (
        <SafeAreaView style={styles.layout}>
            <View style={styles.container}>
                <View style={styles.dataInput}>
                    <TextInput value={name} onChangeText={setName} placeholder="Name" style={styles.input} />
                    <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input} keyboardType="email-address" />
                    <TextInput value={address} onChangeText={setAddress} placeholder="Address" style={styles.input} />
                    <Button theme={{ colors: { primary: '#C8E6C9' , text: 'black' } }} mode="contained" onPress={(handleSubmit)} labelStyle={{ color: 'black' }}>
                        Add Customer
                    </Button>
                    <Button theme={{ colors: { primary: '#E1BEE7' } }} mode="contained" onPress={(handleUpdate)} labelStyle={{ color: 'black' }}>
                        Update Customer
                    </Button>
                    <Button theme={{ colors: { primary: '#FFCCBC' } }} mode="contained" onPress={(handleDelete)} labelStyle={{ color: 'black' }}>
                        Delete Customer
                    </Button>
                </View>
                <ScrollView>
                    <View>
                        {customer.map((customer, index) => (
                            <View key={index} style={styles.dataDisplay}>
                                <Text>{customer.name}</Text>
                                <Text>{customer.email}</Text>
                                <Text>{customer.address}</Text>
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
        margin:4,
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