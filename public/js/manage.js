function usclick(obj){
    if(obj.innerHTML=="已上架"){
       obj.innerHTML="已下架";
       obj.style.backgroundColor="gray"
    }
    else if(obj.innerHTML=="已下架"){
       obj.innerHTML="已上架";
       obj.style.backgroundColor="#D03E3F"
    };
    
}
