// import {Tabs} from "expo-router";
//
// function TabLayout() {
//     return (
//         <Tabs>
//             <Tabs.Screen name='index' options={{headerTitle:'Home', title:'Home'}}/>
//             <Tabs.Screen name='customer' options={{headerTitle:'Customer', title:'Customer'}} />
//             <Tabs.Screen name='item' options={{headerTitle:'Item', title:'Item'}} />
//         </Tabs>
//     );
// }
// export default TabLayout;

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Import icons from expo

function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name='index'
                options={{
                    headerTitle: 'Home',
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='customer'
                options={{
                    headerTitle: 'Customer',
                    title: 'Customer',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='item'
                options={{
                    headerTitle: 'Item',
                    title: 'Item',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cube-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='placeOrder'
                options={{
                    headerTitle: 'placeOrder',
                    title: 'placeOrder',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>

    );
}

export default TabLayout;
