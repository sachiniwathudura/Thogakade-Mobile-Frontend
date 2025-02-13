import { SafeAreaView, ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button } from "react-native-paper";
import ICustomer from "../../model/ICustomer";
import IItem from "../../model/IItem";

export default function PlaceOrder() {
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null);
    const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [orders, setOrders] = useState<{ customer: ICustomer; item: IItem; quantity: number }[]>([]);

    const customers: ICustomer[] = [
        { customerId: 1, name: "John Doe", email: "john@example.com", address: "123 Street" },
        { customerId: 2, name: "Jane Doe", email: "jane@example.com", address: "456 Avenue" }
    ];

    const items: IItem[] = [
        { code: 101, name: "Laptop", quantity: 10, price: 1200 },
        { code: 102, name: "Phone", quantity: 20, price: 800 }
    ];

    function handleOrder() {
        if (!selectedCustomer || !selectedItem || quantity <= 0) {
            alert("Please select a customer, an item, and enter a valid quantity.");
            return;
        }

        const newOrder = { customer: selectedCustomer, item: selectedItem, quantity };
        setOrders([...orders, newOrder]);

        alert("Order placed successfully!");
    }

    return (
        <SafeAreaView style={styles.layout}>
            <View style={styles.container}>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Select Customer</Text>
                    <Picker
                        selectedValue={selectedCustomer}
                        onValueChange={(itemValue) => setSelectedCustomer(itemValue)}
                        style={styles.input}
                    >
                        <Picker.Item label="Select Customer" value={null} />
                        {customers.map((customer) => (
                            <Picker.Item key={customer.customerId} label={customer.name} value={customer} />
                        ))}
                    </Picker>

                    <Text style={styles.label}>Select Item</Text>
                    <Picker
                        selectedValue={selectedItem}
                        onValueChange={(itemValue) => setSelectedItem(itemValue)}
                        style={styles.input}
                    >
                        <Picker.Item label="Select Item" value={null} />
                        {items.map((item) => (
                            <Picker.Item key={item.code} label={item.name} value={item} />
                        ))}
                    </Picker>

                    <Text style={styles.label}>Quantity</Text>
                    <TextInput
                        value={quantity.toString()}
                        onChangeText={(text) => setQuantity(Number(text) || 1)}
                        keyboardType="numeric"
                        placeholder="Quantity"
                        style={styles.input}
                    />

                    <Button theme={{ colors: { primary: '#81D4FA' } }} mode="contained" onPress={handleOrder} style={styles.button}>
                        Place Order
                    </Button>
                </View>

                <ScrollView style={styles.ordersContainer}>
                    <Text style={styles.orderSummaryHeader}>Order Summary:</Text>
                    {orders.map((order, index) => (
                        <View key={index} style={styles.orderCard}>
                            <Text style={styles.orderText}><Text style={styles.bold}>Customer:</Text> {order.customer ? order.customer.name : 'N/A'}</Text>
                            <Text style={styles.orderText}><Text style={styles.bold}>Item:</Text> {order.item ? order.item.name : 'N/A'}</Text>
                            <Text style={styles.orderText}><Text style={styles.bold}>Quantity:</Text> {order.quantity}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#F0F4F8', // Soft gradient background
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },

    formContainer: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginVertical: 8,
        color: '#333',
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        padding: 12,
        width: '100%',
        borderRadius: 8,
        marginVertical: 12,
        fontSize: 16,
        backgroundColor: '#FAFAFA',
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        width: '50%',
        marginLeft:'25%',
    },
    ordersContainer: {
        width: '100%',
        marginTop: 10,
    },
    orderSummaryHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    orderCard: {
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    orderText: {
        fontSize: 16,
        color: '#444',
    },
    bold: {
        fontWeight: '600',
        color: '#333',
    },
});