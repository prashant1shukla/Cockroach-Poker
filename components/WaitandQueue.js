import React,{ useState , useEffect} from 'react';
export default function WaitandQueue({ database , playerkey , room , players , data , isallready }) {
    const [iamready,setiamready]=useState(false);
    console.log("players in w&Q",players);
    // useEffect(()=>{
    //     database?.ref("Rooms/"+room+"/players/"+playerkey+"/ready").once('value',shot=>{setiamready(shot.val())});
    //     // eslint-disable-next-line
    // },[])
    function setready(){
        // if(isallready!==1)
        //     return;
        // database.ref("Rooms/"+room+"/players/"+playerkey+"/ready").set(true);
        // database.ref("Rooms/"+room+"/players/").once('value',shot=>{
        //     const val=shot.val();
        //     var count=0,ready_count=0;
        //     for(var i in val){
        //         count++;
        //         if(val[i].ready===true)
        //             ready_count++;
        //     }
        //     if(count===ready_count){
        //         database.ref("Rooms/"+room+"/data/status/").set("started");
        //     }
        // })
        // setiamready(true);
    }
    return (
        <div>
            <h2 style={{color:"#afa"}}>Room : {room?.data.room_name}</h2>
            <h2 style={{color:"#f79"}}>Waiting for others {room?.data?.currentnop+"/"+room?.data?.nop}</h2>
            {
                players?.map( (_player) =>{
                return ( 
                        <div style={{display:"flex",width:"100%",maxWidth:"300px",margin:"auto",alignItems:"center"}} >
                            <h2 style={{flexGrow:1}}>{_player.client_0?.name}</h2>
                            <img src={_player.client_0?.img} style={{width:"40px",height:"40px",borderRadius:"10px"}} alt="Error loading"/>
                        </div>
                    )
                })
            }
            {!iamready?
            <button style={{borderColor : iamready?"#fff":"#0f0",opacity:isallready===1?1:0.5,color:iamready?"#fff":"#0f0"}} onClick={setready}>Ready</button>
            :<h2>Please Wait others to confirm</h2>
            }
        </div>
    )
}