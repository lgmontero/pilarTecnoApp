import React,{ Component } from 'react';
import Login from'../screens/Login';
import LoginSignIn from'../screens/LoginSignIn';
import LoginSignUp from'../screens/LoginSignUp';
import{ createStackNavigator }from'@react-navigation/stack';

const LoginStack = createStackNavigator();

 const LoginAccess = (props)=>{
    return(<LoginStack.Navigator >
        <LoginStack.Screen 
                name= "LogIn" 
                component={Login} 
                options={{
                title: '',
                animationEnabled: false,
                headerStyle: {
                    backgroundColor: `rgba( 24, 54, 82, 0.52)`,
                },
                headerTintColor: 'rgb(118, 177, 195)',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        <LoginStack.Screen 
        name= "SignIn" 
        component={LoginSignIn} 
        options={{                
                animationEnabled: false,
                headerStyle: {
                    backgroundColor: `rgba( 255, 134, 20, 0.67)`,
                },
                headerTintColor: 'rgb(44, 33, 9)',
                headerTitleStyle: {
                    fontWeight: '200',
                    fontSize: 28
                },}}/>
        <LoginStack.Screen 
        name= "SignUp" 
        component={LoginSignUp}
        options={{                
            animationEnabled: false,
            headerStyle: {
                backgroundColor: `rgba( 255, 134, 20, 0.67)`,
            },
            headerTintColor: 'rgb(44, 33, 9)',
            headerTitleStyle: {
                fontWeight: '200',
                fontSize: 28
            },}}/>
        </LoginStack.Navigator>
        )
    }

    export default (LoginAccess);
