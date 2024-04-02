import { useEffect } from "react";
import Home from "./pages/Home";
import { Box, useColorMode } from "@chakra-ui/react";
import Form from "./components/Form";
import Navbar from "./components/Global/Navbar";
import {Routes, Route} from 'react-router-dom'
import useApi from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import Drag from "./components/Drag";
import Error from "./pages/Error";
import Footer from "./components/Global/Footer";

function App() {

	const { colorMode, toggleColorMode } = useColorMode();
	window.localStorage.setItem("darkMode", 'true')
	
	useEffect(() => {
		const darkModeCookie = window.localStorage.getItem("darkMode");
		if (darkModeCookie === "true")
			toggleColorMode();
	}, []);

	const {accountData} = useApi()

    return (
		<Box bg={'black'} minH={'100vh'}>
			<Navbar/>
			<Routes>
				<Route path="/" element={<Home/>}/>
				{accountData?.accountNo?
					<Route path="/createPoll" element={<Form/>}/>
					:""
				}

				{accountData?.accountNo?
					<Route path="/vote/:id" element={<Drag/>}/>
					:""
				}
				{accountData?.accountNo?
					<Route path="/dashboard" element={<Dashboard />} />
					:""
				}

				<Route path="*" element={<Error/>}/>
			</Routes>
			<Footer/>
		</Box>
    );
}

export default App;
