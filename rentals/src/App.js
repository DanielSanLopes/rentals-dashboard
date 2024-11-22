import Global from "./styles/global";
import styled from "styled-components";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import Form from "./components/Form.js";
import List from "./components/List.js"
import { useEffect, useState } from "react";

const Container = styled.div `
  width:100%;
  max-width:800%;
  margin-top:20px;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:10px;
`;

const Title = styled.h2``;


function App() {

  const [tenants, setTenants] = useState([]);
  const [onEdit, setOnEdit] = useState(null)

  const getTenants = async ()=> {
    try{
      const res = await fetch("http://localhost:8800", {method:"GET"})
      let t = await res.json()
      setTenants(t.sort((a,b)=>(a.nome > b.nome ? 1:-1)))
    }catch(error){
      toast.error(error)
    }
  }

  useEffect(()=>{
    getTenants();
  }, [setTenants])

  return (
    <>
      <Container>
        <Title>Tenants</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getTenants={getTenants}/>
        <List tenants={tenants}  setTenants={setTenants} setOnEdit={setOnEdit}/>
      </Container>
      <ToastContainer autoClose={3000} 
        // position={toast.POSITION.BOTTOM_LEFT}
      />
      <Global/>
    </>
  );
}

export default App;
