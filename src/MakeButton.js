import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
} from 'react-native';
import styles from './Style';
import firebase from 'react-native-firebase';

export default class MakeButton extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: [],
            txt: ''
        }
    }

    
    componentDidMount(){
        var col = this.props.col;
        var row = this.props.row;
        var flag = 0;
        firebase.database().ref().child("users").once("value")
        .then((result) => {
            result.forEach((resultChild) => {
                    var key = resultChild.key
                    var nametest = resultChild.child('name').val().slice(1,3)
                    var name = nametest.concat(" ")
                    console.log(name)
                    var time = firebase.database().ref("users/"+key+"/timetable/"+col+"/"+row)
                    time.on("value", (tt) => {
                        if(tt.val() === false && flag === 0){
                            this.setState({
                                name : this.state.name.concat(name)
                            })
                        } else if(tt.val() == null && flag === 0){
                            this.setState({
                                name : this.state.name.concat(this.props.text)
                            })
                            flag = 1
                        }
                })
            })
    })
}


    render() {
        return(
            <TouchableOpacity style={[styles.tileButton, this.props.style]}>
                <Text style={styles.tileText}>{this.state.name}</Text>
            </TouchableOpacity>
        )
    }
}