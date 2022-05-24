import { Component } from "react";
import CarouselContainer from './CarouselContainer';
import BottomContainer from './BottomContainer';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import PractitionerList from '../components/Practitioner/PractitionerList.js';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default class Home extends Component{
    constructor(props) {
        super(props);

        this.state = {
            value: 'login',
            isLoggedIn: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn !== this.state.isLoggedIn) {
          this.setState({ isLoggedIn: nextProps.isLoggedIn });
        }
      }

    handleChange = (e, value) => {
        this.setState({
            value
        });
    }

    render(){
        const isLoggedIn = this.state.isLoggedIn;

        return(
            <div style={{ display: 'flex', flex: '1 1 auto'}} >
                <div style={{ flex: 1}}>
                    <div style={{ display: 'flex', height: '100%', flexDirection: 'column'}}>
                        <div style={{ flex: '1 1 auto', height: '100%', position: 'relative'}}>
                            <CarouselContainer />
                        </div>
                        <div style={{ height: '200px'}}>
                            <PractitionerList filter={false} />
                        </div>
                    </div>

                </div>
                {!isLoggedIn && (
                    <Box style={{ width: '400px', padding: '20px'}} sx={{ boxShadow: 3 }}>
                    <Box sx={{ width: '100%', typography: 'body1'}}>
                        <TabContext value={this.state.value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={this.handleChange}>
                                    <Tab label="Login" value="login" />
                                </TabList>
                            </Box>
                            <TabPanel value="login">
                                <Login handleLogin={this.props.handleLogin} />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Box>
                )}
                
            </div>
        )
        
    }
}