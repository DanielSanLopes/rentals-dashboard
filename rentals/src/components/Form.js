import React, { useEffect, useRef } from "react"
import { toast } from "react-toastify";
import styled from "styled-components"

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap:10px;
    flex-wrap:wrap;
    background-color:#fff;
    padding:20px;
    box-shadow:0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width:120px
    padding:0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding:10px;
    cursor:pointer;
    border-radius:5px;
    border:none;
    background-color: #2c73d2;
    color: white;
    height:42px;
`;

const Form = ({getTenants, onEdit, setOnEdit}) => {

    const ref = useRef();

    useEffect(()=>{
        if (onEdit){
            const tenant = ref.current;

            tenant.nome.value = onEdit.nome;
            tenant.cpf.value = onEdit.cpf;
            tenant.tamanhoKitnet.value = onEdit.tamanhoKitnet;
            tenant.inadimplente.value = onEdit.inadimplente;
            tenant.mesesDeInadimplencia.value = onEdit.mesesDeInadimplencia;
            tenant.valorAluguel.value = onEdit.valorAluguel;

        }
    }, [onEdit])

    const valorAluguel = async (event)=>{

        event.preventDefault();
        
        const tenant = ref.current;

        if (!tenant.nome.value ||
            !tenant.cpf.value ||
            !tenant.tamanhoKitnet.value ||
            !tenant.mesesDeInadimplencia.value ||
            !tenant.valorAluguel.value){
            
            return toast.warn("Preencha todos os campos!")
        }

        if(onEdit){
            await fetch("http://localhost:8800/update/" + onEdit.id, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    nome: tenant.nome.value,
                    cpf: tenant.cpf.value,
                    tamanhoKitnet: tenant.tamanhoKitnet.value,
                    inadimplente: tenant.inadimplente.checked?true:false,
                    mesesDeInadimplencia: tenant.mesesDeInadimplencia.value,
                    valorAluguel: tenant.valorAluguel.value,
                })
            })
            .then((data)=> toast.success(data))
            .catch((error)=> toast.success(error))
        }else{
            await fetch("http://localhost:8800/", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    nome: tenant.nome.value,
                    cpf: tenant.cpf.value,
                    tamanhoKitnet: tenant.tamanhoKitnet.value,
                    inadimplente: tenant.inadimplente.checked?true:false,
                    mesesDeInadimplencia: tenant.mesesDeInadimplencia.value,
                    valorAluguel: tenant.valorAluguel.value,
                })
            })
            .then((data)=> toast.success(data))
            .catch((error)=> toast.success(error))
        }

        // tenant.nome.value = "";
        // tenant.cpf.value = "";
        // tenant.tamanhoKitnet.value = "";
        // tenant.inadimplente.value = "";
        // tenant.mesesDeInadimplencia.value = "";
        // tenant.valorAluguel.value = "";

        setOnEdit(null)
        getTenants()
    }

    return(
        <FormContainer ref={ref} onSubmit={valorAluguel}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome" type="text"></Input>
            </InputArea>
            <InputArea>
                <Label>CPF</Label>
                <Input name="cpf" type="text"></Input>
            </InputArea>
            <InputArea>
                <Label>Tamanho do Kitnet</Label>
                <Input  name="tamanhoKitnet" type="text"></Input>
            </InputArea>
            <InputArea>
                <Label>Inadimplente</Label>
                <Input style={{height:"20px", width:"20px", marginBottom:"20px"}} name="inadimplente" type="checkbox"></Input>
            </InputArea>
            <InputArea>
                <Label>Meses de Inadimplência</Label>
                <Input  name="mesesDeInadimplencia" type="number"></Input>
            </InputArea>
            <InputArea>
                <Label>Valor do Aluguel</Label>
                <Input  name="valorAluguel" type="number"></Input>
            </InputArea>
            <Button  type="submit">Salvar</Button>
        </FormContainer>
    )
}

export default Form



// nome varchar(100) not null,
// cpf varchar(11) not null,
// tamanhoKitnet enum ('p','m','g') not null,
// inadimplente boolean default false,
// mesesDeInadimplencia int unsigned default 0,
// valorAluguel 