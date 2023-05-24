import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios"

export default function DataTable() {
 
const [users,setUsers] = useState([]);
const [searchUser,setSearchUser] = useState("");
const [filterUser, setFilterUser] = useState([]);
 const GetApiData = async () => {
    await axios
      .get("https://mock-api.mortgagebasket.co.uk/v1/users?pageSize=100")
      .then((res: any) => {
        setUsers(res?.data?.data)
        setFilterUser(res?.data?.data);
        
      });
  };

  const columns = [
    { field: "imageUrl", headerName: "",width:100, 
    renderCell: (item: any) =>  {
        return (
          <div style={{marginTop:"10px"}} >
            <img style={{width:"100px",height:"100px",padding:"10px"}} src={item.row.imageUrl} alt="img" />
          </div>
        );
    }},
    { field: "name", headerName: "Name" ,width:300},
    {
      field: "email",
      headerName: "Email",
      width:400
    },
    {
      field: "date_of_birth",
      headerName: "Date of birth",
      width:200
    },
  ];

  const rows = filterUser;

  useEffect(() => {
      if (searchUser !== ""){
             const filter = users?.filter(
               (ele: any) =>
                 ele?.name.includes(searchUser) ||
                 ele?.email.includes(searchUser)
             );
             setFilterUser(filter);
      }else{
         setFilterUser(users);
      }  
  }, [searchUser]);

  useEffect(() => {
  GetApiData();

  },[])
  return (
    <div style={{ padding: "20px" }}>
      <input
        style={{
          width: "400px",
          height: "40px",
          border: "1px solid #e0e0e0",
          outline: "none",
          borderRadius: "5px",
          padding: "5px",
          color: "#777777",
          fontSize: "14px",
        }}
        value={searchUser}
        onChange={(e:any) => setSearchUser(e.target.value)}
        type="text"
        placeholder="filter with name..."
      />
      <div
        style={{
          height: 400,
          width: "100%",
          marginTop: "20px",
          border: "1px solid #e0e0e0",
          borderRadius: "5px",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
}
