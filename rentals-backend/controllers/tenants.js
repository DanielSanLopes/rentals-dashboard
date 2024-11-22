import {db} from "../db.js";

export const createTenant = (req, res) => {
    const createOne = "INSERT INTO tenants(`nome`, `cpf`, `tamanhoKitnet`, `inadimplente`, `mesesDeInadimplencia`, `valorAluguel`) VALUES (?);"

    const values = [
        req.body.nome,
        req.body.cpf,
        req.body.tamanhoKitnet,
        req.body.inadimplente,
        req.body.mesesDeInadimplencia,
        req.body.valorAluguel,
    ];


    db.query (createOne, [values], (error, data) => {
        if (error)
            return res.json(error)

        return res.status(200).json("Inquilino criado");
    })
}

export const getTenants  = (_, res) => {

    const selectAll = "SELECT * FROM tenants";

    db.query (selectAll, (error, data) => {

        if (error)
            return res.json(error)

        return res.status(200).json(data);
    })
}

export const updateTenant = (req, res) => {
    const updateOne = "UPDATE tenants SET `nome`=?, `cpf`=?,`tamanhoKitnet`=?,`inadimplente`=?,`mesesDeInadimplencia`=?,`valorAluguel`=? WHERE `id`= " + req.params.id +";"

    const values = [
        req.body.nome,
        req.body.cpf,
        req.body.tamanhoKitnet,
        req.body.inadimplente,
        req.body.mesesDeInadimplencia,
        req.body.valorAluguel,
    ]

    db.query (updateOne, [values], (error, data) => {

        if (error)
            return res.json(error)

        return res.status(200).json("Inquilino atualizado");
    })
}

export const deleteTenant = (req, res) => {
    const deleteOne = "DELETE FROM tenants WHERE `id` = ?"

    db.query (deleteOne, [req.params.id], (error, data) => {

        if (error)
            return res.json(error).json("Inquilino excluído")

    })
}