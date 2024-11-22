import React from "react";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";


const Table = styled.table`
    width:100%;
    background-color:#fff;
    padding:10px;
    box-shadow:0px 0px 5px #ccc;
    border-radius:5px;
    max-width:1400px;
    margin:20px auto;
    word-break: break-all;
`;

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom:5px;

    @media (max-width:500px){
        ${(props)=> props.onlyWeb && "display: none"}
    }
`;

export const Td = styled.td`
    padding=top:15px;
    text-align:${props=> (props.alignCenter?"center":"start")};
    width: ${(props)=> props.width? props.width:"auto"}

    @media (max-width:500px){
        ${props=> props.onlyWeb && "display:none"}
    }
`;

const List = ({tenants, setTenants, setOnEdit})=>{

    const handleEdit = (item) => {
        setOnEdit(item);
    }

    const handleDelete = async (id) => {
        await fetch(`http://localhost:8800/delete/${id}`, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(({data})=>{
            const newTenants = tenants.filter((user) => user.id !== id)
            setTenants(newTenants)
            toast.success(data) 
        })
        .catch(({error})=> toast.error(error))

        setOnEdit(null)
    };


    return(
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>CPF</Th>
                    <Th>Tamanho</Th>
                    <Th>Inadimplente</Th>
                    <Th>Meses</Th>
                    <Th>Aluguel</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    tenants.map((item, index)=>(
                        <Tr key={index}>
                            <Td width="20%">{item.nome}</Td>
                            <Td width="15%">{item.cpf}</Td>
                            <Td width="10%">{item.tamanhoKitnet}</Td>
                            <Td width="15%"><input type="checkbox" checked={item.inadimplente == 1}></input></Td>
                            <Td width="10%">{item.mesesDeInadimplencia}</Td>
                            <Td width="10%">{item.valorAluguel}</Td>
                            <Td align="center" width="5%">
                                <FaEdit onClick={()=> handleEdit(item)}/>
                            </Td>
                            <Td align="center" width="5%">
                                <FaTrash onClick={()=> handleDelete(item.id)}/>
                            </Td>
                        </Tr>
                    ))
                }
            </Tbody>
        </Table>
    )
}


export default List


// nome varchar(100) not null,
// cpf varchar(11) not null,
// tamanhoKitnet enum ('p','m','g') not null,
// inadimplente boolean default false,
// mesesDeInadimplencia int unsigned default 0,
// valorAluguel 