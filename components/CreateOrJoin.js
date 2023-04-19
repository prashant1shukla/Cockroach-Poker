import React, { useState, useEffect } from 'react'
// import './CreateOrJoin.css'
import useJSON from '../pages/useJSON';
import { database } from './firebase';
import { app } from './firebase'
import Link from 'next/link';
export default function CreateOrJoin({ Setstatus, database, SetRoom, user, setplayerkey }) {
    // console.log("database",database);
    const [createdata_col, setcreatedata_col] = useState("#fff");
    const [createdata_text, setcreatedata_text] = useState("* A-Z a-z 0-9 _");
    const [join, setjoin] = useState(true);
    const [nop, setnop] = useState();
    const [create_room, setcreate_room] = useState(false);
    const [room_create, setroom_create] = useState()
    const [room_name, setroom_name] = useState()
    const [temp_room,set_temp_room] = useState()

    // const ref=firebase?.database().ref("rooms/abcde/data")
    const [rooms,setrooms] =useState(null);
    // console.log(rooms);

    useEffect(() => {
        // setnop(2);
        setcreate_room(false);
        database.collection("RoomNames").onSnapshot((snap)=>{
            setrooms(snap.docs.map(doc=>(doc.data())));
        })
    }, [])

    // function CheckCreatingRoom(e){
    //     setcreate_room(false);
    //     const room_name=e.target.value;
    //     // console.log(room_name);
    //     // const ref2 = 
    //     // if(ref2){
    //     //     console.log("This is ref2 = ",ref2);
    //     // }
    //     setcreatedata_col("red");
    //     if(room_name.length===0){
    //         setcreatedata_text("RoomName Can't be Empty");
    //         return;
    //     }
    //     if(room_name.length<4){
    //         setcreatedata_text("Minimum length is 4");
    //         return;
    //     }
    //     var regex=/^[a-zA-Z0-9]+(?:_[A-Za-z0-9]+)*$/;
    //     if(!room_name.match(regex)){
    //         setcreatedata_text("Invalid RoomName ( only alpabets and numbers ) ");
    //         return;
    //     }
    //     setcreatedata_col("blue");
    //     setcreatedata_text("Checking...");
    //     firebase?.database().ref("RoomNames/"+room_name).once('value',snap=>{
    //         console.log("Hello this is sameer")
    //         const val=snap.val();
    //         var exists=true;
    //         if(val===null){
    //             exists=false;
    //         }
    //         if(exists){
    //             setcreatedata_col("red");
    //             setcreatedata_text("Roomname Exsists");
    //         }
    //         else{
    //             setcreatedata_col("#0f0");
    //             setcreatedata_text("Room Available");
    //             setcreate_room(true);
    //             SetRoom(room_name);
    //             setroom_create(room_name)
    //         }
    //     })
    // }
    async function Create() {
        setroom_create(room_name)
        // console.log(room_create)
        const json = {
            data: {
                nop: Number(nop),
                currentnop: 1,
                status: "queuing",
                myturn: 0,
                room_name:room_name
            },
            players: [{
                    name: user.displayName,
                    img: user.photoURL,
                    ready: false
                
        }]
        }
        await database.collection('RoomNames').doc(room_name).set(json);
        database.collection("RoomNames").doc(room_name).onSnapshot((snap)=>{
            SetRoom(snap.data());
          })
          Setstatus("queuing");
        // ------------>redirect, UseParams 
        setcreate_room(true);
        setplayerkey("client_0");
        // console.log("Girls: ",firebase?.database().ref("RoomNames/"+room_create));
        // await firebase?.database().ref("RoomNames/"+room_create).set({
        //     players : "1/"+nop,
        //     roomname : room_create,
        //     status : "queuing"
        // });
        // await firebase?.database().ref("RoomNames/"+room_create).set(json);
        // const _json=get7s(nop);
        // await firebase?.database().ref("RoomNames/"+room_create+"/data/cards/").set(JSON.stringify(_json));
        // await firebase?.database().ref("RoomNames/"+room_create+"/data/hidden/").set(JSON.stringify(_json.hide));
    }

    async function Join(val) {
        // await database.collection('RoomNames').doc(room_name).set(json)
        database.collection("RoomNames").doc(val).onSnapshot((shot)=>{
            let value = shot.data();
            value = value.data;
            console.log("The list is : ",value);
            // const cur_nop = value.currentnop;
            // const new_nop = Number(cur_nop + 1);
            // console.log(cur_nop + " / " + new_nop);
            // database().collection("RoomNames/" + val + "/data/currentnop/").set(new_nop);
            // let temp_ = value;
            // temp_ = {...temp_,cur_nop:new_nop}
            // database.collection('RoomNames').doc(val).update({data:temp_});
            // var playerref = "client_" + cur_nop;
        // database().collection("RoomNames/" + val + "/players/" + playerref).set({
        //         name: user.displayName,
        //         img: user.photoURL,
        //         ready: false
        //     });

        //Sameer trying starts
            var temp = shot.data();
            temp = temp.players;
            temp.push({
                name: user.displayName,
                img: user.photoURL,
                ready: false
            })
            database.collection('RoomNames').doc(val).update({
                players:temp
            })
            window.location.replace(`/Game/${val}`);
        //Sameering trying ends
            // setplayerkey("client_" + (new_nop - 1));
        // database().collection("RoomNames/" + val + "/players").set(new_nop + "/" + value.nop);
        //     if (new_nop === Number(value.nop)) {
        //         console.log("Start");
        //     database().collection("RoomNames/" + val + "/status/").set("started");
        //     database().collection("RoomNames/" + val + "/data/status/").set("isallready");
            // }
        })
        // await database().collection("RoomNames/" + val + "/data/").once('room_name', shot => {
        //     const value = shot.val();
        //     const cur_nop = value.currentnop;
        //     const new_nop = Number(cur_nop + 1);
        //     console.log(cur_nop + " / " + new_nop);
        //     database().collection("RoomNames/" + val + "/data/currentnop/").set(new_nop);
        //     var playerref = "client_" + cur_nop;
        // database().collection("RoomNames/" + val + "/players/" + playerref).set({
        //         name: user.displayName,
        //         img: user.photoURL,
        //         ready: false
        //     });
        //     setplayerkey("client_" + (new_nop - 1));
        // database().collection("RoomNames/" + val + "/players").set(new_nop + "/" + value.nop);
        //     if (new_nop === Number(value.nop)) {
        //         console.log("Start");
        //     database().collection("RoomNames/" + val + "/status/").set("started");
        //     database().collection("RoomNames/" + val + "/data/status/").set("isallready");
        //     }
        // })// await SetRoom(_roomname);

        //prashant trying:
        // setroom_create(room_name)
        // console.log(room_create)
        const json = {
            // data: {
            //     nop: Number(nop),
            //     currentnop: 2,
            //     status: "queuing",
            //     myturn: 0,
            //     room_name:room_name
            // },
            players: [{
                    name: user.displayName,
                    img: user.photoURL,
                    ready: false
                
        }]
        }
//         await database.collection('RoomNames').doc(val).collection('players').add({
//             name: user.displayName,
//             img: user.photoURL,
//             ready: false
        
// });

// await database.collection('RoomNames').doc(val).collection('players').onSnapshot(doc => {
//     doc.docs.push(json);
//     console.log("hi priyank");
//     console.log(doc);
//     // console.log(database.collection('RoomNames').doc(val).collection('players').get());
//     // saveditems1.push(...json);
    
//    });

        // await database.collection('RoomNames').doc(val).add(json);

        //for linking to the new webpage:
        const _roomname = val;
        // window.location.replace(`/Game/${val}`);
        
    }
    function Toogle() {
        setcreatedata_text("* A-Z a-z 0-9 _");
        setcreatedata_col("#fff");
        setcreate_room(false);
        setjoin(!join);

    }
    function Change_nop(e) {
        const val = e.target.value;
        setnop(val);
    }
    return (
        <div >
            <div className="select" >
                <span className={join ? "a text-white" : ""} onClick={Toogle}>CreateRoom</span>
                <span className={join ? "" : "a text-white"} onClick={Toogle}>JoinRoom</span>
            </div>
            {join ?
                <div>
                    <h2 style={{color:'text-cyan-400'}}>Available Game Rooms</h2>
                    <div className="rooms">
                        {rooms?.map((room,id) => {
                            console.log(room)
                            if (room?.data.status !== "queuing")
                                return (<div ></div>);
                            return (
                                <div key={id} className="room text-white"  onClick={() => Join(room?.data.room_name)}>
                                    <div className="roomname">{room?.data.room_name}</div>
                                    <div className="num">{room?.data.players}</div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                :
                <div className="create" >
                    <div className="qn text-white">Enter RoomName</div>
                    <input type="text " placeholder="Valid Roomname " onChange={(e) => { setroom_name(e.target.value) }} />
                    <div className="error text-white" style={{ color: createdata_col }}>{createdata_text}</div>
                    <div className="qn text-white">Select Number of Players</div>
                    <div className="select text-white" style={{ marginTop: "3vh" }}>
                        <input type="radio" name="COR" value="2" onClick={Change_nop} defaultChecked />2
                        <input type="radio" name="COR" value="3" onClick={Change_nop} />3
                        <input type="radio" name="COR" value="4" onClick={Change_nop} />4
                        <input type="radio" name="COR" value="5" onClick={Change_nop} />5
                    </div>
                    <button className="create_btn text-white"  onClick={Create}>Create Room</button>
                </div>
            }
        </div>
    )
}