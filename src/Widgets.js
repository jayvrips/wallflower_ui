import React from "react";

export function dropdown(items_dict, selected_key, callback){
  let item_elems = [];

  for(let key in items_dict){
    let item_key = key;
    item_elems.push(<option value={key}>{items_dict[key]}</option>)
  };

  return(
    <select onChange={(event)=>{callback(event.target.value)}} value={selected_key}>
      {item_elems}
    </select>
  );
}
