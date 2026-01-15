import HomeScreen from "../screens/HomeScreen.vue";
import AboutScreen from "../screens/AboutScreen.vue";

const routes = [
    {path: '/', name: 'Home', component: HomeScreen},
    {path: '/about', name: 'About', component: AboutScreen}
];

export {routes as core_routes};